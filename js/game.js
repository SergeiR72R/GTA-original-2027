// Главный цикл: ввод, камера, спавн трафика и прохожих, столкновения, отрисовка.
'use strict';

const SAVE_KEY = 'hamsin_tlv_save_v1';

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
    Assets.load((p) => { bar.style.width = Math.round(p * 100) + '%'; }).then(() => {
      City.generate();
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
    World.player = new Ped(P.start.x, P.start.y, { skin: 'survivor1', ai: 'player', a: 0 });
    const pl = World.player;
    pl.hp = 100; pl.money = 500; pl.ammo = { pistol: 0, uzi: 0 }; pl.weapon = null; pl.bust = 0;
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
    pl.x = P.start.x; pl.y = P.start.y; pl.hp = 100; pl.dead = false;
    pl.ammo = { pistol: 0, uzi: 0 }; pl.weapon = null;
    Wanted.reset();
    if (!fresh && save) { pl.money = save.money; Missions.reset(save.index); if (save.index > 0) { pl.x = P.shuk.x; pl.y = P.shuk.y + 40; } }
    else { pl.money = 500; Missions.reset(0); this.bigText('ХАМСИН', 'Часть 1: Тель-Авив', '#ffd23f'); }
    this.cam.x = pl.x; this.cam.y = pl.y;
    this.state = 'play';
  },

  showTitle() {
    this.state = 'title';
    document.getElementById('title').classList.remove('hidden');
    document.getElementById('btn-continue').style.display = this.loadSave() ? '' : 'none';
  },

  save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ index: Missions.index, money: World.player.money })); } catch (e) { /* без сохранений */ }
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
    const moto = chance(0.14);
    const c = new Car(p.x, p.y, DIR_ANGLE[p.dir], { moto, ai: 'traffic' });
    c.dir = p.dir;
    c.driver = new Ped(p.x, p.y, { skin: pick(PED_SKINS) });
    c.driver.car = c;
    // иногда патрульная машина без погони
    if (!moto && chance(0.06)) { c.police = true; c.color = 'blue'; c.sprite = 'car_blue_' + c.variant; c.siren = false; c.driver.skin = 'manBlue'; c.driver.ai = 'cop'; c.driver.weapon = 'pistol'; c.maxHp = c.hp = 160; }
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
      const p = new Ped(c.x + rand(-16, 16), c.y + rand(-16, 16), {});
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
        if (s.roll) { s.car = new Car(s.x, s.y, s.a + rand(-0.1, 0.1), { moto: chance(0.15) }); s.car.spot = s; World.cars.push(s.car); }
      }
      if (d2 > 1700 * 1700) s.roll = undefined;
    }
    // убираем далёкое
    for (let i = World.cars.length - 1; i >= 0; i--) {
      const c = World.cars[i];
      if (c === pl.car || c.mission) continue;
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
      if (c.dead || c.speed > 160) continue;
      const d = dist2(c.x, c.y, pl.x, pl.y);
      if (d < bd) { bd = d; best = c; }
    }
    if (!best) return;
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
    if (this.hit('KeyF', 'Enter', 'NumpadEnter')) { if (pl.car) { if (pl.car.speed < 140) this.exitCar(); } else this.enterCar(); }

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
          const nc = pick(CAR_COLORS.filter((x) => x !== c.color && x !== 'blue'));
          c.color = nc; c.police = false;
          c.sprite = c.moto ? 'moto_' + nc : c.big ? 'car_' + nc + '_big' : `car_${nc}_${c.variant}`;
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
      const wx = this.cam.x + (this.mouse.x - this.vw / 2) / z, wy = this.cam.y + (this.mouse.y - this.vh / 2) / z;
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
    const cars = World.cars;
    const pl = World.player;
    for (let i = 0; i < cars.length; i++) {
      const a = cars[i];
      for (let j = i + 1; j < cars.length; j++) {
        const b = cars[j];
        if (dist2(a.x, a.y, b.x, b.y) > 110 * 110) continue;
        for (const ca of a.circles()) for (const cb of b.circles()) {
          const dx = cb.x - ca.x, dy = cb.y - ca.y;
          const d = Math.hypot(dx, dy), m = ca.r + cb.r;
          if (d >= m || d === 0) continue;
          const nx = dx / d, ny = dy / d;
          const push = (m - d) / 2;
          const ok = (c, sx, sy) => { if (!c.hitsWall(c.x + sx, c.y + sy, c.a)) { c.x += sx; c.y += sy; } };
          ok(a, -nx * push, -ny * push); ok(b, nx * push, ny * push);
          const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (rv < 0) {
            const imp = -rv * 0.8;
            a.vx -= nx * imp; a.vy -= ny * imp; b.vx += nx * imp; b.vy += ny * imp;
            if (-rv > 90) {
              const by = a.driver === 'player' ? 'player' : b.driver === 'player' ? 'player' : null;
              a.damage((-rv - 80) * 0.08, b.driver === 'player' ? 'player' : null);
              b.damage((-rv - 80) * 0.08, a.driver === 'player' ? 'player' : null);
              if (by || dist2(a.x, a.y, pl.x, pl.y) < 500 * 500) Sound.play('crash' + randi(0, 2), clamp(-rv / 300, 0.2, 1));
              spawnSparks((ca.x + cb.x) / 2, (ca.y + cb.y) / 2, 5);
              if (by) this.shake(clamp(-rv / 60, 1, 8));
              // водитель трафика злится и сигналит
              for (const c of [a, b]) if (c.ai === 'traffic' && c.driver && by) c.honk();
            }
          }
        }
      }
      // машина и люди
      const sp = a.speed;
      if (sp < 25) continue;
      for (const p of World.peds) {
        if (p.dead || p.car) continue;
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
        if (sp > 85) {
          this.playerHurt(sp * 0.09, 'car');
          spawnBlood(pl.x, pl.y, 4);
          Sound.play('punch', 0.7);
          a.vx *= 0.8; a.vy *= 0.8;
        }
        const dx = pl.x - a.x, dy = pl.y - a.y, d = Math.hypot(dx, dy) || 1;
        pl.step(dx / d * 10, dy / d * 10);
      }
    }
  },

  // ---------------------------------------------------------------- цикл
  loop(t) {
    const dt = Math.min(0.05, (t - (this.last || t)) / 1000);
    this.last = t;
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
      if (this.hit('Enter', 'NumpadEnter', 'Space', 'KeyF')) Missions.advanceDialog();
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
    }
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
    ctx.fillStyle = '#2a6f9f';
    ctx.fillRect(0, 0, this.vw, this.vh);
    if (this.state === 'loading') return;
    const sx = rand(-1, 1) * this.shakeAmt, sy = rand(-1, 1) * this.shakeAmt;
    const view = {
      x0: this.cam.x - this.vw / 2 / z, x1: this.cam.x + this.vw / 2 / z,
      y0: this.cam.y - this.vh / 2 / z, y1: this.cam.y + this.vh / 2 / z,
    };
    ctx.setTransform(this.dpr * z, 0, 0, this.dpr * z, this.dpr * (this.vw / 2 - this.cam.x * z + sx), this.dpr * (this.vh / 2 - this.cam.y * z + sy));
    // за краем карты: на западе море, в остальных сторонах — пригороды
    ctx.fillStyle = '#56703e';
    ctx.fillRect(view.x0 - 50, view.y0 - 50, view.x1 - view.x0 + 100, view.y1 - view.y0 + 100);
    if (view.x0 < 5 * TILE) { ctx.fillStyle = '#2a6f9f'; ctx.fillRect(view.x0 - 50, view.y0 - 50, 5 * TILE - view.x0 + 50, view.y1 - view.y0 + 100); }
    City.drawGround(ctx, view);
    drawDecals(ctx, view);
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
    City.drawTall(ctx, view, this.cam, World.time);

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.state === 'down') {
      ctx.fillStyle = this.downKind === 'dead' ? 'rgba(120,0,0,0.25)' : 'rgba(0,30,120,0.25)';
      ctx.fillRect(0, 0, this.vw, this.vh);
    }
    if (this.state !== 'title') HUD.draw(ctx, this.vw, this.vh, this.state === 'pause' ? 0 : dt);
  },

  drawMarkers(ctx) {
    // телефоны-автоматы
    for (const key of ['phone1', 'phone2']) {
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
