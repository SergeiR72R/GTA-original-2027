// Главный цикл: ввод, камера, спавн трафика и прохожих, столкновения, отрисовка.
'use strict';

const SAVE_KEY = 'hamsin_tlv_save_v2';

// Израильская неделя начинается с воскресенья
const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

// Игровые часы: 1 секунда = 2 минуты. Ночь, шаббат и хамсин.
const Clock = {
  min: 8 * 60, // минуты с начала воскресенья
  hamsinDay: -1,
  lastDay: -1,
  reset(m) { this.min = m || 8 * 60; this.lastDay = -1; },
  get day() { return Math.floor(this.min / 1440) % 7; },
  get hour() { return (this.min % 1440) / 60; },
  update(dt) {
    this.min += dt * 2;
    const dayN = Math.floor(this.min / 1440);
    if (dayN !== this.lastDay) {
      this.lastDay = dayN;
      if (Math.random() < 0.35) this.hamsinDay = dayN;
      if (this.day === 5) Game.message('Пятница: всё закрывается к шаббату. Автобусы встанут вечером — шеруты ходят.', 5);
    }
    const sh = this.shabbat;
    if (sh !== this.wasShabbat) { this.wasShabbat = sh; if (sh) Game.message('Шаббат шалом! Автобусы не ходят, на улицах тише.', 5); else if (this.wasShabbat === false) Game.message('Шаббат закончился — шавуа тов!', 4); }
    const hm = this.hamsin;
    if (hm !== this.wasHamsin) { this.wasHamsin = hm; if (hm) Game.message('ХАМСИН! Жара +40°, пыль из пустыни.', 4); }
  },
  get shabbat() { const d = this.day, h = this.hour; return (d === 5 && h >= 18) || (d === 6 && h < 19); },
  // сила хамсина 0..1: мгла наползает с 9:30 до 11:30 и медленно оседает
  // с 16:30 до 20:00 — уже в сумерках, вместе с темнотой
  get hamsinK() {
    if (Math.floor(this.min / 1440) !== this.hamsinDay) return 0;
    const h = this.hour;
    const s = (x) => x * x * (3 - 2 * x);
    return s(clamp((h - 9.5) / 2, 0, 1)) * s(clamp((20 - h) / 3.5, 0, 1));
  },
  get hamsin() { return this.hamsinK > 0.25; },
  // 0 — день, 1 — глубокая ночь
  get dark() {
    const h = this.hour;
    if (h < 5) return 1;
    if (h < 7) return 1 - (h - 5) / 2;
    if (h < 17.5) return 0;
    if (h < 19.5) return (h - 17.5) / 2;
    return 1;
  },
  get temp() {
    const h = this.hour;
    const base = 24 + 7 * Math.sin((h - 9) / 24 * TAU);
    return Math.round(base + 12 * this.hamsinK);
  },
  text() {
    const h = Math.floor(this.hour), m = Math.floor(this.min % 60);
    return `${DAYS[this.day]} ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  },
};

// Какие машины ездят по городу (вес)
const TRAFFIC_MIX = [
  ['sedan', 30], ['hatch', 20], ['suv', 12], ['taxi', 8], ['van', 5], ['pickup', 4], ['moto', 4],
  ['scooter', 5], ['sherut', 4], ['bus', 4], ['garbage', 1], ['ambulance', 1], ['lux', 2],
];

const Game = {
  canvas: null,
  ctx: null,
  dpr: 1,
  vw: 0,
  vh: 0,
  zoom: 1,
  zoomTotal: 1,
  cam: { x: 0, y: 0 },
  shakeAmt: 0,
  state: 'loading', // loading | title | play | pause | down | end
  keys: {},
  pressed: {},
  mouse: { x: 0, y: 0, down: false, active: false, moved: 0 },
  last: 0,
  downT: 0,
  stats: { kills: 0, cars: 0 },
  titleT: 0,

  init() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.bindInput();
    const bar = document.getElementById('loadbar');
    Assets.load((p) => { bar.style.width = Math.min(100, Math.round(p * 100)) + '%'; }).then(() => {
      Tex.init();
      // 3D-режим (WebGL), если доступен; иначе — 2D. ?2d в адресе — принудительно 2D
      this.gl = R3.init(document.getElementById('gl'));
      City.generate();
      if (this.gl) { R3.build(); R3.resize(this.vw, this.vh); }
      else document.getElementById('gl').style.display = 'none';
      this.setupWorld();
      document.getElementById('loading').classList.add('hidden');
      this.showTitle();
      requestAnimationFrame((t) => this.loop(t));
    });
  },

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.vw = window.innerWidth; this.vh = window.innerHeight;
    this.canvas.width = Math.floor(this.vw * this.dpr);
    this.canvas.height = Math.floor(this.vh * this.dpr);
    this.canvas.style.width = this.vw + 'px';
    this.canvas.style.height = this.vh + 'px';
    if (this.gl) R3.resize(this.vw, this.vh);
  },

  // ---------------------------------------------------------------- ввод
  bindInput() {
    const block = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Tab'];
    window.addEventListener('keydown', (e) => {
      if (block.includes(e.code)) e.preventDefault();
      if (!this.keys[e.code]) this.pressed[e.code] = true;
      this.keys[e.code] = true;
      Sound.resume();
      if (e.code === 'Escape') this.togglePause();
      if (e.code === 'KeyM') Sound.toggleMute();
      if ((e.code === 'F3' || e.code === 'KeyP') && this.gl) { e.preventDefault(); this.showPerf = !this.showPerf; }
      if (e.code === 'KeyO' && this.gl && this.state !== 'title') this.message('Качество графики: ' + R3.cycleQuality(), 3);
      if (e.code === 'KeyV' && this.gl && this.state === 'play') { this.topDown = !this.topDown; this.message(this.topDown ? 'Камера: строго сверху' : 'Камера: с наклоном — видно фасады', 2); }
    });
    window.addEventListener('keyup', (e) => { this.keys[e.code] = false; });
    window.addEventListener('blur', () => { this.keys = {}; if (this.state === 'play') this.togglePause(); });
    this.canvas.addEventListener('mousemove', (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; this.mouse.active = true; this.mouse.moved = World.time; });
    this.canvas.addEventListener('mousedown', (e) => { if (e.button === 0) { this.mouse.down = true; this.mouse.moved = World.time; } Sound.resume(); });
    window.addEventListener('mouseup', () => { this.mouse.down = false; });
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    document.getElementById('btn-new').onclick = () => this.startGame(true);
    document.getElementById('btn-continue').onclick = () => this.startGame(false);
    document.getElementById('btn-resume').onclick = () => this.togglePause();
    document.getElementById('btn-free').onclick = () => { document.getElementById('end').classList.add('hidden'); this.state = 'play'; };
  },

  key(...codes) { return codes.some((c) => this.keys[c]); },
  hit(...codes) { return codes.some((c) => this.pressed[c]); },

  togglePause() {
    if (this.state === 'play') { this.state = 'pause'; document.getElementById('pause').classList.remove('hidden'); Sound.setEngine(false, 0); Sound.setRadio(false); Sound.setSiren(0); }
    else if (this.state === 'pause') { this.state = 'play'; document.getElementById('pause').classList.add('hidden'); }
  },

  // ---------------------------------------------------------------- мир
  setupWorld() {
    const P = City.places;
    World.player = new Ped(P.flat.x, P.flat.y, { look: Looks.player(), ai: 'player', a: 0 });
    const pl = World.player;
    pl.hp = 100; pl.armor = 0; pl.money = 500; pl.ammo = { pistol: 0, uzi: 0 }; pl.weapon = null; pl.bust = 0;
    this.placeHomeScooter();
    // такси у Шука — для подработки
    const tx = City.tc(31, 54);
    const taxi = new Car(tx.x, tx.y, Math.PI, { type: 'taxi' });
    taxi.keep = true;
    World.cars.push(taxi);
    // постоянные предметы
    World.pickups.push(new Pickup(P.hospital.x + 40, P.hospital.y + 10, 'health'));
    World.pickups.push(new Pickup(City.tc(33, 50).x, City.tc(33, 50).y, 'health'));
    World.pickups.push(new Pickup(City.tc(62, 80).x, City.tc(62, 80).y, 'pistol', { ammo: 24 }));
    World.pickups.push(new Pickup(City.tc(10, 88).x, City.tc(10, 88).y, 'health'));
    World.pickups.push(new Pickup(City.tc(86, 24).x, City.tc(86, 24).y, 'uzi', { ammo: 60 }));
    World.pickups.push(new Pickup(City.tc(24, 12).x, City.tc(24, 12).y, 'money', { amount: 500 }));
    this.cam.x = pl.x; this.cam.y = pl.y;
    // заполняем окрестности трафиком сразу
    for (let i = 0; i < 40; i++) this.spawnTraffic(true);
    for (let i = 0; i < 40; i++) this.spawnPed(true);
  },

  startGame(fresh) {
    Sound.resume();
    document.getElementById('title').classList.add('hidden');
    const save = this.loadSave();
    const pl = World.player;
    const P = City.places;
    if (pl.car) this.exitCar(true);
    pl.x = P.flat.x; pl.y = P.flat.y; pl.hp = 100; pl.armor = 0; pl.dead = false;
    pl.ammo = { pistol: 0, uzi: 0 }; pl.weapon = null;
    Wanted.reset();
    const sv = !fresh && save ? save : null;
    Factions.reset(sv && sv.rep);
    Jobs.reset(sv);
    Clock.reset(sv && sv.clock);
    if (sv) { pl.money = sv.money; Missions.reset(sv.index); Missions.word = sv.word || 0; }
    else { pl.money = 500; Missions.reset(0); Missions.word = 0; this.bigText('ХАМСИН', 'Часть 1: Тель-Авив', '#ffd23f'); }
    this.placeHomeScooter();
    this.cam.x = pl.x; this.cam.y = pl.y;
    this.state = 'play';
  },

  showTitle() {
    this.state = 'title';
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('btn-continue').style.display = this.loadSave() ? '' : 'none';
  },

  // Скутер «Шмоне-Бис» соседа у подъезда
  placeHomeScooter() {
    const P = City.places;
    if (this.homeScooter && !this.homeScooter.dead && World.cars.includes(this.homeScooter) && dist(this.homeScooter.x, this.homeScooter.y, P.flat.x, P.flat.y) < 300) return;
    const sc = new Car(P.flat.x - 22, P.flat.y + 26, 0, { type: 'scooter' });
    sc.keep = true;
    World.cars.push(sc);
    this.homeScooter = sc;
  },

  save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        index: Missions.index, money: World.player.money, rep: Factions.rep, word: Missions.word,
        deliveries: Jobs.deliveries, rides: Jobs.rides, clock: Clock.min,
      }));
    } catch (e) { /* без сохранений */ }
  },
  loadSave() {
    try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); return s && typeof s.index === 'number' ? s : null; } catch (e) { return null; }
  },

  addMoney(n) {
    const pl = World.player;
    pl.money = Math.max(0, pl.money + n);
    if (n > 0 && n < 1000) World.particles.push({ x: pl.x, y: pl.y - 20, k: 'money', t: 0, life: 1.2, vx: 0, vy: -40, s: 1, text: '+₪' + n });
  },
  message(t, d) { HUD.message(t, d); },
  bigText(a, b, c) { HUD.bigText(a, b, c); },
  shake(n) { this.shakeAmt = Math.max(this.shakeAmt, n); },

  // ---------------------------------------------------------------- спавн
  inView(x, y, m = 80) {
    if (this.gl && R3.bounds) { const b = R3.bounds; return x > b.x0 - m && x < b.x1 + m && y > b.y0 - m && y < b.y1 + m; }
    const z = this.zoomTotal;
    return Math.abs(x - this.cam.x) < this.vw / 2 / z + m && Math.abs(y - this.cam.y) < this.vh / 2 / z + m;
  },

  findRoadSpawn(px, py, rmin, rmax, allowVisible) {
    for (let i = 0; i < 30; i++) {
      const a = rand(0, TAU), r = rand(rmin, rmax);
      const tx = Math.floor((px + Math.cos(a) * r) / TILE), ty = Math.floor((py + Math.sin(a) * r) / TILE);
      if (!City.isRoad(tx, ty)) continue;
      const i0 = City.idx(tx, ty);
      const lv = City.laneV[i0], lh = City.laneH[i0];
      if ((lv >= 0) === (lh >= 0)) continue; // не на перекрёстке
      const c = City.tc(tx, ty);
      if (!allowVisible && this.inView(c.x, c.y)) continue;
      if (World.cars.some((o) => dist2(o.x, o.y, c.x, c.y) < 90 * 90)) continue;
      return { x: c.x, y: c.y, dir: lv >= 0 ? lv : lh };
    }
    return null;
  },

  spawnTraffic(initial) {
    const pl = World.player;
    const p = this.findRoadSpawn(pl.x, pl.y, initial ? 200 : 900, 1500, initial);
    if (!p) return;
    // на территории фракции — её машины
    const fac = City.factionAt(p.x, p.y);
    let type = pickWeighted(TRAFFIC_MIX);
    if (Clock.shabbat && type === 'bus') type = 'sherut';
    if (Clock.shabbat && chance(0.5)) return; // в шаббат улицы пустеют
    const police = chance(0.05);
    const isFac = fac && chance(0.35);
    if (isFac) type = FACTIONS[fac].car;
    const c = new Car(p.x, p.y, DIR_ANGLE[p.dir], { type: police ? 'police' : type, ai: 'traffic', faction: isFac ? fac : null });
    c.dir = p.dir;
    c.driver = new Ped(p.x, p.y, isFac ? { faction: fac, ai: 'gang', weapon: 'pistol' } : police ? { look: Looks.police(), ai: 'cop', weapon: 'pistol' } : {});
    c.driver.car = c;
    c.siren = false;
    const v = DIRS[p.dir];
    c.vx = v.x * 120; c.vy = v.y * 120;
    World.cars.push(c);
  },

  spawnPed(initial) {
    const pl = World.player;
    for (let i = 0; i < 20; i++) {
      const a = rand(0, TAU), r = initial ? rand(150, 1200) : rand(700, 1300);
      const tx = Math.floor((pl.x + Math.cos(a) * r) / TILE), ty = Math.floor((pl.y + Math.sin(a) * r) / TILE);
      if (!City.isWalkway(tx, ty)) continue;
      const c = City.tc(tx, ty);
      if (!initial && this.inView(c.x, c.y)) continue;
      const cat = chance(0.08);
      const p = new Ped(c.x + rand(-16, 16), c.y + rand(-16, 16), cat ? { look: Looks.cat(), ai: 'cat', hp: 10 } : {});
      if (cat) p.r = 6;
      p.target = { x: tx, y: ty };
      World.peds.push(p);
      return;
    }
  },

  manageSpawns() {
    const pl = World.player;
    const traffic = World.cars.filter((c) => c.ai === 'traffic' && !c.dead).length;
    if (traffic < 30) this.spawnTraffic(false);
    const alive = World.peds.filter((p) => !p.dead).length;
    if (alive < 45) this.spawnPed(false);
    // припаркованные машины во дворах
    for (const s of City.parkingSpots) {
      const d2 = dist2(s.x, s.y, pl.x, pl.y);
      if (!s.car && d2 < 1300 * 1300 && d2 > 500 * 500 && !this.inView(s.x, s.y) && s.roll === undefined) {
        s.roll = Math.random() < 0.65;
        if (s.roll) {
          const t = pickWeighted([['sedan', 35], ['hatch', 25], ['suv', 15], ['moto', 6], ['scooter', 6], ['van', 6], ['pickup', 5], ['taxi', 2]]);
          s.car = new Car(s.x, s.y, s.a + rand(-0.1, 0.1), { type: t }); s.car.spot = s; World.cars.push(s.car);
        }
      }
      if (d2 > 1700 * 1700) s.roll = undefined;
    }
    // убираем далёкое
    for (let i = World.cars.length - 1; i >= 0; i--) {
      const c = World.cars[i];
      if (c === pl.car || c.mission || c.keep) continue;
      const lim = c.police && c.ai === 'police' ? 2400 : 1900;
      if (dist2(c.x, c.y, pl.x, pl.y) > lim * lim) {
        if (c.spot) c.spot.car = null;
        World.cars.splice(i, 1);
      }
    }
    for (let i = World.peds.length - 1; i >= 0; i--) {
      const p = World.peds[i];
      if (p.mission) continue;
      const d2 = dist2(p.x, p.y, pl.x, pl.y);
      if (d2 > 1700 * 1700 || (p.dead && d2 > 1100 * 1100) || (p.dead && World.time - p.deadT > 40 && !this.inView(p.x, p.y))) World.peds.splice(i, 1);
    }
    for (let i = World.pickups.length - 1; i >= 0; i--) if (World.pickups[i].dead) World.pickups.splice(i, 1);
  },

  // ---------------------------------------------------------------- игрок
  enterCar() {
    const pl = World.player;
    let best = null, bd = 75 * 75;
    for (const c of World.cars) {
      if (c.dead || c.speed > 160 || c.locked) continue; // locked — уже чужая (сдана по миссии)
      const d = dist2(c.x, c.y, pl.x, pl.y);
      if (d < bd) { bd = d; best = c; }
    }
    if (!best) return;
    // бандиты не отдают машину — выходят драться
    if (best.gang && best.driver && best.driver !== 'player') GangCars.exit(best);
    if (best.driver && best.driver !== 'player') {
      // выкидываем водителя
      const drv = best.driver;
      bailOut(best);
      if (drv.ai === 'cop') { Wanted.set(Math.max(Wanted.level, 2)); }
      else { drv.scare(pl.x, pl.y); Wanted.crime('carjack', pl.x, pl.y); }
      Sound.play('punch', 0.7);
    }
    if (best.passenger && best.passenger !== Missions.active?.moshe) { const p = best.passenger; best.passenger = null; p.car = null; p.x = best.x + 30; p.y = best.y; World.peds.push(p); p.scare(pl.x, pl.y); }
    best.driver = 'player';
    best.ai = null;
    best.siren = false;
    if (best.spot) { best.spot.car = null; best.spot = null; }
    pl.car = best;
    Sound.play('door', 0.8);
    Sound.setRadio(true);
    if (Sound.radioOn) this.message('📻 Хамсин FM — R: выключить радио', 3);
  },

  exitCar(silent) {
    const pl = World.player;
    const c = pl.car;
    if (!c) return;
    const f = c.fwd;
    let x = c.x - f.y * -(c.w / 2 + 16), y = c.y + f.x * -(c.w / 2 + 16);
    if (City.solidAt(x, y)) { x = c.x - f.y * (c.w / 2 + 16); y = c.y + f.x * (c.w / 2 + 16); }
    if (City.solidAt(x, y)) { x = c.x + f.x * (c.l / 2 + 14); y = c.y + f.y * (c.l / 2 + 14); }
    if (City.solidAt(x, y)) { x = c.x - f.x * (c.l / 2 + 14); y = c.y - f.y * (c.l / 2 + 14); }
    pl.x = x; pl.y = y;
    pl.a = c.a - Math.PI / 2;
    c.driver = null;
    pl.car = null;
    Sound.setEngine(false, 0);
    Sound.setRadio(false);
    if (!silent) Sound.play('door', 0.8);
  },

  playerHurt(n, why) {
    const pl = World.player;
    if (pl.dead || this.state !== 'play') return;
    if (pl.armor > 0) { const a = Math.min(pl.armor, n * 0.7); pl.armor -= a; n -= a; }
    pl.hp -= n;
    this.shake(4);
    if (pl.hp <= 0) this.wasted(why);
  },

  wasted() {
    const pl = World.player;
    if (pl.dead) return;
    pl.dead = true; pl.hp = 0;
    if (pl.car) { const c = pl.car; this.exitCar(true); pl.x = c.x; pl.y = c.y; }
    World.decals.push({ k: 'blood', x: pl.x, y: pl.y, a: 0, s: 1.4 });
    this.state = 'down';
    this.downT = 4;
    this.downKind = 'dead';
    Missions.onPlayerDown();
    HUD.bigText('ТЫ ПОГИБ', 'Больница «Ихилов» выставит счёт: ₪ 1 000', '#ff4040', 4);
    Sound.play('fail', 1);
  },

  busted() {
    const pl = World.player;
    if (pl.dead || this.state !== 'play') return;
    pl.dead = true;
    if (pl.car) this.exitCar(true);
    this.state = 'down';
    this.downT = 4;
    this.downKind = 'busted';
    Missions.onPlayerDown();
    HUD.bigText('АРЕСТОВАН', 'Залог: ₪ 1 500, оружие конфисковано', '#4fa3ff', 4);
    Sound.play('fail', 1);
  },

  respawn() {
    const pl = World.player;
    const P = this.downKind === 'dead' ? City.places.hospital : City.places.police;
    pl.x = P.x; pl.y = P.y + 10;
    pl.hp = 100; pl.dead = false; pl.bust = 0;
    pl.ammo = { pistol: 0, uzi: 0 }; pl.weapon = null;
    pl.money = Math.max(0, pl.money - (this.downKind === 'dead' ? 1000 : 1500));
    Wanted.reset();
    // убираем погоню
    for (let i = World.cars.length - 1; i >= 0; i--) if (World.cars[i].police && World.cars[i].ai === 'police') World.cars.splice(i, 1);
    for (let i = World.peds.length - 1; i >= 0; i--) if (World.peds[i].ai === 'cop') World.peds.splice(i, 1);
    this.cam.x = pl.x; this.cam.y = pl.y;
    this.state = 'play';
    this.save();
  },

  partComplete() {
    this.state = 'end';
    Sound.setEngine(false, 0); Sound.setSiren(0);
    document.getElementById('end-money').textContent = formatMoney(World.player.money);
    document.getElementById('end').classList.remove('hidden');
  },

  cycleWeapon() {
    const pl = World.player;
    const list = [null, 'pistol', 'uzi'].filter((w) => w === null || pl.ammo[w] > 0);
    const i = list.indexOf(pl.weapon);
    pl.weapon = list[(i + 1) % list.length];
    Sound.play('weapon', 0.5);
  },

  updatePlayer(dt) {
    const pl = World.player;
    if (pl.dead) return;
    pl.cool -= dt;
    this.dialogCool = Math.max(0, (this.dialogCool || 0) - dt);
    if (this.hit('KeyF', 'Enter', 'NumpadEnter') && !this.dialogCool) { if (pl.car) { if (pl.car.speed < 140) this.exitCar(); } else this.enterCar(); }

    if (pl.car) {
      const c = pl.car;
      const thr = (this.key('KeyW', 'ArrowUp') ? 1 : 0) - (this.key('KeyS', 'ArrowDown') ? 1 : 0);
      const st = (this.key('KeyD', 'ArrowRight') ? 1 : 0) - (this.key('KeyA', 'ArrowLeft') ? 1 : 0);
      c.drive(dt, thr, st, this.key('Space'));
      pl.x = c.x; pl.y = c.y;
      if (c.skid && c.speed > 100 && Math.random() < 0.5) addSkid(c);
      if (this.hit('KeyH')) Sound.horn();
      if (this.hit('KeyR')) { Sound.radioOn = !Sound.radioOn; Sound.setRadio(true); this.message(Sound.radioOn ? '📻 Хамсин FM' : '📻 Радио выключено', 2); }
      Sound.setEngine(!c.dead, clamp(c.speed / c.maxSpeed, 0, 1));
      // покраска
      const ps = City.places.paint;
      if (Wanted.level > 0 && dist(c.x, c.y, ps.x, ps.y) < 90 && c.speed < 120) {
        if (pl.money >= 500) {
          this.addMoney(-500);
          Wanted.reset();
          c.color = pickWeighted(CAR_PALETTE.filter((x) => x[0] !== c.color));
          c.genKey = null; // перекрашенная машина рисуется встроенным спрайтом нового цвета
          c.dents = [];
          if (c.police) { c.police = false; c.type = 'suv'; c.T = VTYPES.suv; }
          c.hp = c.maxHp;
          Sound.play('mission', 0.8);
          this.message('Машина перекрашена, розыск снят (−₪500)', 4);
        } else if (!this.paintMsg || World.time - this.paintMsg > 5) { this.paintMsg = World.time; this.message('Покраска стоит ₪500 — денег не хватает'); }
      }
      return;
    }

    // ---- пешком
    let mx = (this.key('KeyD', 'ArrowRight') ? 1 : 0) - (this.key('KeyA', 'ArrowLeft') ? 1 : 0);
    let my = (this.key('KeyS', 'ArrowDown') ? 1 : 0) - (this.key('KeyW', 'ArrowUp') ? 1 : 0);
    const ml = Math.hypot(mx, my);
    pl.moving = ml > 0;
    if (ml > 0) {
      mx /= ml; my /= ml;
      const sp = this.key('ShiftLeft', 'ShiftRight') ? 90 : 165;
      pl.step(mx * sp * dt, my * sp * dt);
      pl.walkAnim += dt * 12;
      pl.stepT = (pl.stepT || 0) - dt;
      if (pl.stepT <= 0) { pl.stepT = 0.33; Sound.play('step' + randi(0, 1), 0.15); }
    }
    const mouseAim = this.mouse.active && World.time - this.mouse.moved < 3;
    if (mouseAim) {
      const z = this.zoomTotal;
      let wx = this.cam.x + (this.mouse.x - this.vw / 2) / z, wy = this.cam.y + (this.mouse.y - this.vh / 2) / z;
      if (this.gl) { const g = R3.screenToGround(this.mouse.x, this.mouse.y); wx = g.x; wy = g.y; }
      pl.a = Math.atan2(wy - pl.y, wx - pl.x);
    } else if (ml > 0) {
      pl.a += wrapAngle(Math.atan2(my, mx) - pl.a) * Math.min(1, dt * 14);
    }
    if (this.hit('Tab', 'KeyQ')) this.cycleWeapon();
    if (this.hit('Digit1')) pl.weapon = null;
    if (this.hit('Digit2') && pl.ammo.pistol > 0) pl.weapon = 'pistol';
    if (this.hit('Digit3') && pl.ammo.uzi > 0) pl.weapon = 'uzi';
    const fire = this.key('Space', 'ControlLeft', 'ControlRight') || this.mouse.down;
    if (fire && pl.cool <= 0) {
      const w = pl.weapon;
      if (!w) {
        pl.cool = WEAPONS.fists.cd;
        for (const p of World.peds) {
          if (p.dead) continue;
          const d = dist(p.x, p.y, pl.x, pl.y);
          if (d < 34 && Math.abs(wrapAngle(Math.atan2(p.y - pl.y, p.x - pl.x) - pl.a)) < 1.1) {
            p.hurt(WEAPONS.fists.dmg, 'player', pl.x, pl.y);
            if (p.ai === 'cop') Wanted.crime('shootcop', p.x, p.y);
            Sound.play('punch', 0.8);
            break;
          }
        }
      } else {
        pl.cool = WEAPONS[w].cd;
        pl.ammo[w]--;
        fireBullet(pl, w, pl.a);
        if (pl.ammo[w] <= 0) { pl.weapon = pl.ammo.uzi > 0 ? 'uzi' : pl.ammo.pistol > 0 ? 'pistol' : null; }
      }
    }
  },

  // ---------------------------------------------------------------- столкновения
  collide(dt) {
    // раздвигаем машины, только если не упрёмся в стену
    const nudge = (c, sx, sy) => { if (!c.hitsWall(c.x + sx, c.y + sy, c.a)) { c.x += sx; c.y += sy; } };
    const cars = World.cars;
    const pl = World.player;
    for (let i = 0; i < cars.length; i++) {
      const a = cars[i];
      for (let j = i + 1; j < cars.length; j++) {
        const b = cars[j];
        if (dist2(a.x, a.y, b.x, b.y) > 110 * 110) continue;
        // все точки касания пары машин — но урон считаем один раз за удар
        let maxRv = 0, hx = 0, hy = 0;
        const cA = a.circles(), cB = b.circles();
        for (let ia = 0; ia < cA.length; ia++) for (let ib = 0; ib < cB.length; ib++) {
          const ca = cA[ia], cb = cB[ib];
          const dx = cb.x - ca.x, dy = cb.y - ca.y;
          const d = Math.hypot(dx, dy), m = ca.r + cb.r;
          if (d >= m || d === 0) continue;
          const nx = dx / d, ny = dy / d;
          const push = (m - d) / 2;
          nudge(a, -nx * push, -ny * push); nudge(b, nx * push, ny * push);
          const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (rv < 0) {
            const imp = -rv * 0.8;
            a.vx -= nx * imp; a.vy -= ny * imp; b.vx += nx * imp; b.vy += ny * imp;
            if (-rv > maxRv) { maxRv = -rv; hx = (ca.x + cb.x) / 2; hy = (ca.y + cb.y) / 2; }
          }
        }
        if (maxRv > 130 && World.time - (a.lastCrash || -9) > 0.5 && World.time - (b.lastCrash || -9) > 0.5) {
          a.lastCrash = b.lastCrash = World.time;
          const by = a.driver === 'player' ? 'player' : b.driver === 'player' ? 'player' : null;
          // лобовое на 200 км/ч — около 20% «здоровья» обычной машины
          const dmg = (maxRv - 130) * 0.05;
          a.damage(dmg, b.driver === 'player' ? 'player' : null, hx, hy);
          b.damage(dmg, a.driver === 'player' ? 'player' : null, hx, hy);
          if (by || dist2(a.x, a.y, pl.x, pl.y) < 500 * 500) Sound.play('crash' + randi(0, 2), clamp(maxRv / 300, 0.2, 1));
          spawnSparks(hx, hy, 5);
          if (by) this.shake(clamp(maxRv / 60, 1, 8));
          // водитель трафика злится и сигналит
          if (by) { if (a.ai === 'traffic' && a.driver) a.honk(); if (b.ai === 'traffic' && b.driver) b.honk(); }
        }
      }
      // машина и люди
      const sp = a.speed;
      if (sp < 25) continue;
      const peds = World.peds;
      for (let k = 0; k < peds.length; k++) {
        const p = peds[k];
        if (p.dead || p.car) continue;
        if (Math.abs(p.x - a.x) > 120 || Math.abs(p.y - a.y) > 120) continue;
        if (!a.contains(p.x, p.y, p.r)) continue;
        if (sp > 85) {
          p.kill(a.driver === 'player' ? 'player' : 'car');
          p.x += a.vx * 0.05; p.y += a.vy * 0.05;
          a.vx *= 0.92; a.vy *= 0.92;
          if (a.driver === 'player') this.stats.kills++;
        } else {
          const dx = p.x - a.x, dy = p.y - a.y, d = Math.hypot(dx, dy) || 1;
          p.step(dx / d * 6, dy / d * 6);
          p.scare(a.x, a.y);
        }
      }
      if (!pl.car && !pl.dead && a.contains(pl.x, pl.y, 9)) {
        // один удар от одной машины — не чаще раза в секунду
        if (sp > 85 && World.time - (a.hitPl || -9) > 1) {
          a.hitPl = World.time;
          this.playerHurt(sp * 0.09, 'car');
          spawnBlood(pl.x, pl.y, 4);
          Sound.play('punch', 0.7);
          a.vx *= 0.8; a.vy *= 0.8;
        }
        // выталкиваем вбок, за пределы корпуса
        const f = a.fwd;
        const lr = (pl.x - a.x) * -f.y + (pl.y - a.y) * f.x;
        const side = lr >= 0 ? 1 : -1;
        const need = a.w / 2 + 10 - Math.abs(lr);
        if (need > 0) pl.step(-f.y * side * Math.min(need, 14), f.x * side * Math.min(need, 14));
      }
    }
  },

  // ---------------------------------------------------------------- цикл
  loop(t) {
    const real = (t - (this.last || t)) / 1000;
    const dt = Math.min(0.05, real);
    this.last = t;
    if (this.gl) R3.frame(real);
    try {
      this.update(dt);
      this.render(dt);
    } catch (e) {
      console.error(e);
    }
    this.pressed = {};
    requestAnimationFrame((tt) => this.loop(tt));
  },

  update(dt) {
    if (this.state === 'pause' || this.state === 'loading') return;
    const pl = World.player;
    if (Missions.dialog && this.state === 'play') {
      // во время звонка мир на паузе
      if (this.hit('Enter', 'NumpadEnter', 'Space', 'KeyF')) { Missions.advanceDialog(); this.dialogCool = 0.35; }
      Sound.setEngine(false, 0);
      return;
    }
    World.time += dt;
    if (this.state === 'play') this.updatePlayer(dt);
    if (this.state === 'down') {
      this.downT -= dt;
      if (this.downT <= 0) this.respawn();
    }
    const bust0 = pl.bust;
    for (const c of World.cars) c.update(dt);
    for (let i = World.peds.length - 1; i >= 0; i--) { const p = World.peds[i]; if (p) p.update(dt); }
    if (pl.bust === bust0) pl.bust = 0;
    this.collide(dt);
    updateBullets(dt);
    updateParticles(dt);
    for (const p of World.pickups) p.update(dt);
    if (this.state === 'play') {
      Wanted.update(dt);
      Police.update(dt);
      Missions.update(dt);
      Factions.update(dt);
      Jobs.update(dt);
    }
    if (this.state !== 'title') Clock.update(dt);
    else Clock.min += dt * 30; // заставка: сутки пролетают быстро
    this.night = Clock.dark * 0.74;
    this.manageSpawns();
    // взорванные машины со временем убираем
    for (let i = World.cars.length - 1; i >= 0; i--) {
      const c = World.cars[i];
      if (c.dead && c.burn < 0 && c !== pl.car) { c.wreckT = (c.wreckT || 0) + dt; if (c.wreckT > 60 && !this.inView(c.x, c.y)) World.cars.splice(i, 1); }
    }
    if (pl.car && pl.car.dead && pl.car.burn < 0) this.exitCar(true);
    Sound.updateRadio();
    this.updateCamera(dt);
  },

  updateCamera(dt) {
    const pl = World.player;
    let tx = pl.x, ty = pl.y, tz = 1;
    if (this.state === 'title') {
      // облёт города на заставке
      this.titleT += dt;
      tx = City.W * TILE / 2 + Math.cos(this.titleT * 0.05) * 1400;
      ty = City.H * TILE / 2 + Math.sin(this.titleT * 0.05) * 1400;
      tz = 0.75;
      this.cam.x = tx; this.cam.y = ty;
    } else {
      if (pl.car) {
        tx += pl.car.vx * 0.45; ty += pl.car.vy * 0.45;
        tz = clamp(1 - pl.car.speed / 750, 0.6, 1);
      }
      this.cam.x = lerp(this.cam.x, tx, Math.min(1, dt * 4));
      this.cam.y = lerp(this.cam.y, ty, Math.min(1, dt * 4));
    }
    this.zoom = lerp(this.zoom, tz, Math.min(1, dt * 1.5));
    const base = clamp(Math.min(this.vw, this.vh) / 760, 0.65, 1.5);
    this.zoomTotal = this.zoom * base;
    this.shakeAmt = Math.max(0, this.shakeAmt - dt * 30);
  },

  render(dt) {
    const ctx = this.ctx;
    const z = this.zoomTotal;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.state === 'loading') { ctx.fillStyle = '#2a6f9f'; ctx.fillRect(0, 0, this.vw, this.vh); return; }
    const sx = rand(-1, 1) * this.shakeAmt, sy = rand(-1, 1) * this.shakeAmt;
    const view = {
      x0: this.cam.x - this.vw / 2 / z, x1: this.cam.x + this.vw / 2 / z,
      y0: this.cam.y - this.vh / 2 / z, y1: this.cam.y + this.vh / 2 / z,
    };
    if (this.gl) {
      // 3D-сцена на нижнем холсте, поверх — прозрачный слой интерфейса
      R3.render(view, this.cam, sx, sy, this.night || 0);
      ctx.clearRect(0, 0, this.vw, this.vh);
      this.drawOverlay(ctx, dt);
      return;
    }
    ctx.fillStyle = '#2a6f9f';
    ctx.fillRect(0, 0, this.vw, this.vh);
    ctx.setTransform(this.dpr * z, 0, 0, this.dpr * z, this.dpr * (this.vw / 2 - this.cam.x * z + sx), this.dpr * (this.vh / 2 - this.cam.y * z + sy));
    // за краем карты: на западе море, в остальных сторонах — пригороды
    ctx.fillStyle = '#56703e';
    ctx.fillRect(view.x0 - 50, view.y0 - 50, view.x1 - view.x0 + 100, view.y1 - view.y0 + 100);
    if (view.x0 < 5 * TILE) { ctx.fillStyle = '#2a6f9f'; ctx.fillRect(view.x0 - 50, view.y0 - 50, 5 * TILE - view.x0 + 50, view.y1 - view.y0 + 100); }
    City.drawGround(ctx, view);
    City.drawSea(ctx, view, World.time);
    drawDecals(ctx, view);
    City.drawLow(ctx, view, World.time);
    this.drawMarkers(ctx);
    for (const p of World.pickups) if (this.inView(p.x, p.y)) p.draw(ctx);
    for (const p of World.peds) if (p.dead && this.inView(p.x, p.y)) p.draw(ctx);
    const pl = World.player;
    if (pl.dead && this.state === 'down' && !pl.car) { pl.dead = true; pl.draw(ctx); }
    for (const c of World.cars) if (this.inView(c.x, c.y, 120)) c.draw(ctx);
    for (const p of World.peds) if (!p.dead && this.inView(p.x, p.y)) p.draw(ctx);
    if (!pl.car && !pl.dead && this.state !== 'title') {
      pl.weapon = pl.weapon || null;
      pl.draw(ctx);
    }
    drawBullets(ctx);
    drawParticles(ctx);
    City.nightWin = [];
    City.drawTall(ctx, view, this.cam, World.time);
    this.drawLighting(ctx, view, sx, sy);

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (Clock.hamsinK > 0) this.drawHamsin(ctx, Clock.hamsinK * (1 - 0.6 * Clock.dark));
    if (Strikes.on) this.drawAlarm(ctx);
    if (this.state === 'down') {
      ctx.fillStyle = this.downKind === 'dead' ? 'rgba(120,0,0,0.25)' : 'rgba(0,30,120,0.25)';
      ctx.fillRect(0, 0, this.vw, this.vh);
    }
    if (this.state !== 'title') HUD.draw(ctx, this.vw, this.vh, this.state === 'pause' ? 0 : dt);
  },

  // Ночь: затемнение с «дырами» от фонарей, фар и огня; светящиеся окна
  // Готовые круглые «пятна» света: рисовать картинку дешевле, чем градиент
  lightSprite(color) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    return c;
  },

  drawLighting(ctx, view, sx, sy) {
    const night = this.night;
    if (night < 0.02) return;
    if (!this.holeSpr) { this.holeSpr = this.lightSprite('rgba(0,0,0,1)'); this.warmSpr = this.lightSprite('rgba(255,190,110,1)'); }
    // маска в пониженном разрешении — свет всё равно мягкий
    const W = Math.ceil(this.canvas.width / 3), H = Math.ceil(this.canvas.height / 3);
    if (!this.lightCv) this.lightCv = document.createElement('canvas');
    const lc = this.lightCv;
    if (lc.width !== W || lc.height !== H) { lc.width = W; lc.height = H; }
    const g = lc.getContext('2d');
    const z = this.zoomTotal;
    const k = this.dpr / 3;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalCompositeOperation = 'source-over';
    g.globalAlpha = 1;
    g.clearRect(0, 0, W, H);
    g.fillStyle = `rgba(6,10,38,${night})`;
    g.fillRect(0, 0, W, H);
    g.setTransform(k * z, 0, 0, k * z, k * (this.vw / 2 - this.cam.x * z + sx), k * (this.vh / 2 - this.cam.y * z + sy));
    g.globalCompositeOperation = 'destination-out';
    const spr = this.holeSpr;
    const hole = (x, y, r, a) => { g.globalAlpha = a; g.drawImage(spr, x - r, y - r, r * 2, r * 2); };
    const glows = [];
    for (const l of City.lamps) {
      if (l.x < view.x0 - 150 || l.x > view.x1 + 150 || l.y < view.y0 - 150 || l.y > view.y1 + 150) continue;
      hole(l.x, l.y, 130, 0.9); glows.push(l);
    }
    for (const c of World.cars) {
      if (c.dead || !c.driver || !this.inView(c.x, c.y, 200)) continue;
      const f = c.fwd;
      hole(c.x + f.x * (c.l / 2 + 90), c.y + f.y * (c.l / 2 + 90), 105, 0.85);
      if (c.siren) hole(c.x, c.y, 90, 0.6);
    }
    for (const p of World.particles) if (p.k === 'fire' || p.k === 'flash') hole(p.x, p.y, 50, 0.5);
    const pl = World.player;
    hole(pl.x, pl.y, 70, 0.5);
    // тёплое свечение фонарей — прямо в маске
    g.globalCompositeOperation = 'source-over';
    g.globalAlpha = 0.16 * night;
    for (const l of glows) g.drawImage(this.warmSpr, l.x - 100, l.y - 100, 200, 200);
    g.globalAlpha = 1;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(lc, 0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();
    // окна
    if (City.nightWin.length) {
      ctx.setLineDash([9, 7]);
      for (const w of City.nightWin) {
        ctx.strokeStyle = w[5] < 8 ? `rgba(255,214,130,${0.85 * night})` : `rgba(190,220,255,${0.6 * night})`;
        ctx.lineWidth = w[4];
        ctx.lineDashOffset = w[5];
        ctx.beginPath(); ctx.moveTo(w[0], w[1]); ctx.lineTo(w[2], w[3]); ctx.stroke();
      }
      ctx.setLineDash([]); ctx.lineDashOffset = 0;
    }
  },

  // Хамсин: жёлтая пыльная мгла
  // тревога: красные края экрана пульсируют в такт сирене
  drawAlarm(ctx) {
    const a = 0.1 + 0.12 * (0.5 + 0.5 * Math.sin(World.time * TAU * 0.22));
    const g = ctx.createRadialGradient(this.vw / 2, this.vh / 2, Math.min(this.vw, this.vh) * 0.35, this.vw / 2, this.vh / 2, Math.max(this.vw, this.vh) * 0.75);
    g.addColorStop(0, 'rgba(255,0,0,0)');
    g.addColorStop(1, `rgba(220,0,0,${a.toFixed(3)})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.vw, this.vh);
  },

  drawHamsin(ctx, k) {
    ctx.fillStyle = `rgba(214,150,60,${(0.22 * k).toFixed(3)})`;
    ctx.fillRect(0, 0, this.vw, this.vh);
    if (!this.dust) this.dust = Array.from({ length: 120 }, () => ({ x: rand(0, 1), y: rand(0, 1), s: rand(0.5, 2) }));
    ctx.fillStyle = `rgba(240,200,140,${(0.45 * k).toFixed(3)})`;
    const t = World.time;
    for (const d of this.dust) {
      const x = ((d.x + t * 0.05 * d.s) % 1) * this.vw, y = ((d.y + Math.sin(t + d.x * 10) * 0.01) % 1) * this.vh;
      ctx.fillRect(x, y, 2 * d.s + 1, 1);
    }
  },

  // Интерфейс поверх 3D: всплывающие суммы, хамсин, затемнение при смерти/аресте, HUD
  drawOverlay(ctx, dt) {
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    for (const p of World.particles) {
      if (p.k !== 'money') continue;
      const k = 1 - p.t / p.life;
      const [x, y] = R3.worldToScreen(p.x, p.y, 20);
      ctx.fillStyle = `rgba(80,220,90,${k})`; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.text || '₪', x, y);
    }
    if (Clock.hamsinK > 0) this.drawHamsin(ctx, Clock.hamsinK * (1 - 0.6 * Clock.dark));
    if (Strikes.on) this.drawAlarm(ctx);
    if (this.state === 'down') {
      ctx.fillStyle = this.downKind === 'dead' ? 'rgba(120,0,0,0.25)' : 'rgba(0,30,120,0.25)';
      ctx.fillRect(0, 0, this.vw, this.vh);
    }
    if (this.state !== 'title') HUD.draw(ctx, this.vw, this.vh, this.state === 'pause' ? 0 : dt);
    if (this.showPerf) this.drawPerf(ctx);
  },

  // F3: частота кадров, время кадра, разрешение 3D, качество и видеокарта
  drawPerf(ctx) {
    const P = R3.perf;
    const q = R3.mode === 'auto' ? `авто → ${QUALITY[R3.autoLevel].name}` : QUALITY[R3.mode].name;
    const lines = [
      `FPS ${P.fps || '…'} · кадр ${P.ms ? P.ms.toFixed(1) : '…'} мс (худший ${P.maxMs ? P.maxMs.toFixed(0) : '…'} мс)`,
      `3D: разрешение ×${R3.ratio.toFixed(2)} · качество: ${q} · тени ${R3.renderer.shadowMap.enabled ? 'вкл' : 'выкл'}`,
      `вызовов ${R3.renderer.info.render.calls} · треугольников ${R3.renderer.info.render.triangles}`,
      `GPU: ${R3.gpuName}`,
    ];
    ctx.font = '13px monospace';
    const w = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 20;
    ctx.fillStyle = 'rgba(0,0,0,0.65)'; ctx.fillRect(this.vw - w - 16, this.vh - 100, w, 84);
    ctx.fillStyle = P.ms > 19 ? '#ff8a65' : '#9be15d'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    lines.forEach((l, i) => ctx.fillText(l, this.vw - w - 6, this.vh - 80 + i * 19));
  },

  drawMarkers(ctx) {
    // ракеты: красный круг с отсчётом и тень падающей ракеты
    for (const st of Strikes.list) {
      if (st.hit === 'icpt') continue;
      const k = clamp(st.t / st.fuse, 0, 1);
      ctx.fillStyle = 'rgba(255,40,40,0.22)'; ctx.beginPath(); ctx.arc(st.x, st.y, 120 * k, 0, TAU); ctx.fill();
      ctx.strokeStyle = `rgba(255,30,30,${0.55 + 0.45 * Math.abs(Math.sin(st.t * (6 + k * 10)))})`; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(st.x, st.y, 116, 0, TAU); ctx.stroke();
      const fall = clamp(1 - (st.fuse - st.t) / 1.4, 0, 1);
      if (fall > 0) { ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.arc(st.x + Math.cos(st.from) * 300 * (1 - fall), st.y + Math.sin(st.from) * 300 * (1 - fall), 8, 0, TAU); ctx.fill(); }
    }
    // телефоны-автоматы
    for (const key of ['phone1', 'phone2', 'phoneFlat', 'phoneRu', 'phoneAr', 'phoneLions']) {
      const p = City.places[key];
      if (!this.inView(p.x, p.y)) continue;
      const ringing = Missions.phonePlace() === p;
      if (ringing) {
        const k = (World.time * 1.5) % 1;
        ctx.strokeStyle = `rgba(255,210,63,${1 - k})`; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(p.x, p.y, 14 + k * 30, 0, TAU); ctx.stroke();
      }
      ctx.fillStyle = '#1565c0'; ctx.fillRect(p.x - 9, p.y - 9, 18, 18);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('☎', p.x, p.y + 1);
    }
    // цель миссии на земле
    const obj = Missions.active && Missions.active.target;
    if (obj && !(obj instanceof Car) && !(obj instanceof Ped)) {
      const k = (World.time * 1.2) % 1;
      ctx.strokeStyle = `rgba(255,210,63,${0.9 - k * 0.6})`; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(obj.x, obj.y, 30 + k * 30, 0, TAU); ctx.stroke();
      ctx.fillStyle = 'rgba(255,210,63,0.25)';
      ctx.beginPath(); ctx.arc(obj.x, obj.y, 34, 0, TAU); ctx.fill();
    }
    // мастерская покраски
    const ps = City.places.paint;
    if (this.inView(ps.x, ps.y)) {
      ctx.strokeStyle = Wanted.level > 0 ? 'rgba(233,30,99,0.8)' : 'rgba(233,30,99,0.35)';
      ctx.setLineDash([10, 8]); ctx.lineWidth = 3;
      ctx.strokeRect(ps.x - 60, ps.y - 60, 120, 120);
      ctx.setLineDash([]);
    }
  },
};

window.addEventListener('load', () => Game.init());
