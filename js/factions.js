// Фракции: репутация, территории, кто где тусуется.
// Все организации и персонажи вымышлены.
'use strict';

const GREETINGS = {
  russian: ['Здорово, земляк!', 'Как жизнь, братан?', 'Сёма передаёт привет.', 'Ну чё, освоился?'],
  arab: ['Ахлан, сахби!', 'Ялла, всё спокойно.', 'Абу-Карим тебя уважает.', 'Салам, брат.'],
  lions: ['Ахи! Как дела?', 'Заходи в студию, послушаешь новый трек.', 'Абеба про тебя спрашивал.', 'Сабаба, брат!'],
};

// Чем вооружены банды: «Одесса» — «калаши» и ТТ из 90-х, Аль-Бахар — узи
// и дробовики, «Львы» — пистолеты и биты, иранские агенты — узи и АК
const FACTION_ARMS = {
  russian: [['pistol', 5], ['ak', 3], ['shotgun', 1]],
  arab: [['pistol', 4], ['uzi', 3], ['shotgun', 2]],
  lions: [['pistol', 5], ['bat', 3], ['uzi', 1]],
  iran: [['uzi', 3], ['ak', 2], ['pistol', 1]],
};
const factionWeapon = (f) => (FACTION_ARMS[f] ? pickWeighted(FACTION_ARMS[f]) : 'pistol');
// стрелок в машине — без биты
const factionGun = (f) => { const w = factionWeapon(f); return w === 'bat' ? 'pistol' : w; };

const Factions = {
  rep: { russian: 0, arab: 0, lions: 0 },
  spawnT: 0,

  reset(rep) {
    this.rep = Object.assign({ russian: 0, arab: 0, lions: 0 }, rep || {});
  },

  change(f, n, silent) {
    if (!(f in this.rep)) return;
    const was = this.rep[f];
    this.rep[f] = clamp(this.rep[f] + n, -100, 100);
    if (!silent && Math.abs(n) >= 10) Game.message(T('{0}: {1}{2} к уважению', T(FACTIONS[f].name), n > 0 ? '+' : '', n, Math.abs(n) + (n > 0 ? '+' : '-')), 3);
    if (was > -25 && this.rep[f] <= -25) Game.message(T('{0} теперь стреляют в тебя без разговоров!', T(FACTIONS[f].name)), 4);
    if (was < 25 && this.rep[f] >= 25) Game.message(T('{0} считают тебя своим.', T(FACTIONS[f].name)), 4);
  },

  hostile(f) {
    if (this.truce === f && World.time < this.truceT) return false;
    return f === 'iran' || (f in this.rep && this.rep[f] <= -25);
  },

  // короткое перемирие на время этапа миссии: продлевается каждый кадр, само кончается
  calm(f) { this.truce = f; this.truceT = World.time + 1; },

  onKill(f) { this.change(f, -6, true); },
  onHurt(f) { if (this.rep[f] > -25) this.change(f, -2, true); },

  // Бойцы фракций стоят группами на своей территории
  update(dt) {
    const pl = World.player;
    this.spawnT -= dt;
    if (this.spawnT > 0) return;
    this.spawnT = 1.5;
    const f = City.factionAt(pl.x, pl.y);
    if (!f) return;
    const near = World.peds.filter((p) => p.faction === f && !p.dead && !p.mission).length;
    if (near >= 6) return;
    for (let i = 0; i < 15; i++) {
      const a = rand(0, TAU), r = rand(500, 900);
      const x = pl.x + Math.cos(a) * r, y = pl.y + Math.sin(a) * r;
      const tx = Math.floor(x / TILE), ty = Math.floor(y / TILE);
      if (!City.isWalkway(tx, ty) || City.factionAt(x, y) !== f || Game.inView(x, y)) continue;
      const c = City.tc(tx, ty);
      const n = randi(2, 3);
      // половина групп стоит на углу, половина обходит район по тротуарам
      const patrol = chance(0.5);
      let lead = null;
      for (let k = 0; k < n; k++) {
        const home = { x: c.x + rand(-20, 20), y: c.y + rand(-20, 20) };
        const g = new Ped(home.x, home.y, { faction: f, ai: 'gang', weapon: factionWeapon(f), hp: 70, home });
        if (patrol) { g.patrol = true; g.lead = lead; g.target = { x: tx, y: ty }; lead = lead || g; }
        World.peds.push(g);
      }
      return;
    }
  },
};

// Машины банд в миссиях: догоняют игрока, стреляют из окна, к пешему
// выходят и дерутся. Умеренно: держат дистанцию, а не таранят, едут чуть
// медленнее игрока и бросают погоню, если сильно отстали.
const GangCars = {
  spawn(faction, x, y, opts = {}) {
    const p = Game.findRoadSpawn(x, y, opts.min || 450, opts.max || 850, opts.visible);
    if (!p) return null;
    const F = FACTIONS[faction];
    const c = new Car(p.x, p.y, DIR_ANGLE[p.dir], { type: opts.type || F.car, faction, ai: 'gang' });
    const crew = (w) => { const g = new Ped(p.x, p.y, { faction, ai: 'gang', weapon: w, hp: 70 }); g.mission = 'target'; g.car = c; return g; };
    c.driver = crew('pistol');
    c.gang = [c.driver, crew(opts.weapon || factionGun(faction))];
    for (let i = 2; i < (opts.crew || 2); i++) c.gang.push(crew(i % 2 ? 'uzi' : factionGun(faction))); // opts.crew — сколько бойцов в машине
    c.mission = 'target';
    c.maxSpeed = c.T.max * (opts.speed || 0.95);
    c.lostT = 0;
    c.shootT = rand(1.5, 2.5);
    World.cars.push(c);
    return c;
  },

  carAI(c, dt) {
    const pl = World.player;
    if (pl.dead) { c.drive(dt, 0, 0, true); return; }
    const tx = pl.car ? pl.car.x : pl.x, ty = pl.car ? pl.car.y : pl.y;
    const d = dist(c.x, c.y, tx, ty);
    // сильно отстали — бросают погоню
    if (d > 1500) { c.lostT += dt; if (c.lostT > 5) { this.giveUp(c); return; } } else c.lostT = 0;
    // игрок пешком или встал — выходят
    if (!pl.car && ((d < 200 && c.speed < 120) || (d < 450 && c.speed < 60 && (!c.path || c.path.length <= 3)))) { this.exit(c); return; }
    if (pl.car && pl.car.speed < 25 && d < 160 && c.speed < 80) { this.exit(c); return; }
    chaseDrive(c, tx, ty, d, dt, d < 220);
    // стреляют из окна
    c.shootT -= dt;
    if (!c.noShoot && d < 380 && c.shootT <= 0 && City.lineOfSight(c.x, c.y, tx, ty)) {
      const g = c.gang.find((q) => q !== c.driver && !q.dead) || c.driver;
      g.x = c.x; g.y = c.y;
      g.burst = (g.burst || 0) + 1;
      const W = WEAPONS[g.weapon];
      c.shootT = W.burst && g.burst % W.burst !== 0 ? W.cd * 1.6 : rand(W.npcCd[0] + 0.3, W.npcCd[1] + 0.5);
      fireBullet(g, g.weapon, Math.atan2(ty - c.y, tx - c.x));
    }
  },

  exit(c, hurt) {
    const f = c.fwd;
    (c.gang || []).forEach((g, i) => {
      if (g.dead || g.car !== c) return;
      const side = i % 2 ? -1 : 1;
      let x = c.x - side * f.y * (c.w / 2 + 14), y = c.y + side * f.x * (c.w / 2 + 14);
      if (City.solidAt(x, y)) { x = c.x + side * f.y * (c.w / 2 + 14); y = c.y - side * f.x * (c.w / 2 + 14); }
      g.car = null; g.x = x; g.y = y; g.ai = 'gang'; g.alert = 8; g.cool = 0.8; g.home = { x, y };
      if (hurt) g.hp = Math.max(10, g.hp - hurt);
      World.peds.push(g);
    });
    c.driver = null;
    c.ai = null;
  },

  // патрульная машина банды замечает врага (или того, кто её задел): в погоню
  // не бросается — тормозит, бойцы выходят и стреляют
  engage(c, dt) {
    const pl = World.player;
    if (pl.dead || !c.driver || c.driver === 'player' || !c.gang) return false;
    if (!c.stopping) {
      if (!c.provoked && !Factions.hostile(c.faction)) return false;
      if (!c.provoked) {
        const tx = pl.car ? pl.car.x : pl.x, ty = pl.car ? pl.car.y : pl.y;
        if (dist2(c.x, c.y, tx, ty) > 380 * 380 || !City.lineOfSight(c.x, c.y, tx, ty)) return false;
      }
      c.stopping = true;
    }
    c.drive(dt, c.fspeed > 5 ? -1 : 0, 0, true);
    if (c.speed < 40) { if (c.provoked) this.angry(c); this.exit(c); }
    return true;
  },

  // обиделись на игрока: стреляют, даже если банда к нему хорошо относится
  angry(c) { for (const g of c.gang || []) g.grudge = true; },

  // Машина банды патрулирует свой район: быстрее обычной, в салоне двое
  patrol(c, f) {
    c.turf = f;
    c.maxSpeed = c.T.max * 1.2; c.accel *= 1.15;
    const crew = (w) => { const g = new Ped(c.x, c.y, { faction: f, ai: 'gang', weapon: w, hp: 70 }); g.car = c; return g; };
    c.driver = crew(factionGun(f));
    c.gang = [c.driver, crew(factionGun(f))];
  },

  giveUp(c) {
    // патрульная машина возвращается к объезду района
    if (c.turf && c.driver && !c.mission) { c.ai = 'traffic'; c.target = null; c.provoked = false; c.maxSpeed = c.T.max * 1.2; return; }
    c.ai = null; c.mission = null;
    for (const g of c.gang || []) g.mission = null;
  },

  // конец миссии: погоня прекращается, вышедшие бандиты больше не цели миссии
  release(cars) {
    for (const c of cars || []) {
      if (c.ai === 'gang') this.giveUp(c);
      c.mission = null;
      for (const g of c.gang || []) g.mission = null;
    }
  },

  // живые бандиты из этих машин (в машине или уже пешком)
  alive(cars) {
    let n = 0;
    for (const c of cars || []) for (const g of c.gang || []) if (!g.dead && g.mission) n++;
    return n;
  },
};
