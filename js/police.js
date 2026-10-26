// Розыск и полиция: уровни звёзд, патрульные машины, полицейские на ногах.
'use strict';

// Розыск копится постепенно: преступления дают «накал», звёзды открываются
// по порогам. Пока полиция тебя не видит, накал медленно остывает.
const HEAT_LEVELS = [0, 1, 4, 9, 16, 25];

const Wanted = {
  heat: 0,
  level: 0,
  unseen: 0,   // сколько секунд полиция не видит игрока
  flash: 0,
  cool: {},    // паузы, чтобы очередь из узи не давала звезду за каждую пулю

  reset() { this.heat = 0; this.level = 0; this.unseen = 0; this.cool = {}; },

  recompute() {
    let lvl = 0;
    for (let i = 1; i < HEAT_LEVELS.length; i++) if (this.heat >= HEAT_LEVELS[i]) lvl = i;
    if (lvl > this.level) { this.flash = 2; this.unseen = 0; }
    this.level = lvl;
  },

  add(n) {
    this.heat = clamp(this.heat + n, 0, 30);
    this.recompute();
  },

  // для миссий: сразу поднять до нужного числа звёзд
  set(n) {
    n = clamp(n, 0, 5);
    if (n === 0) { this.reset(); return; }
    this.heat = Math.max(this.heat, HEAT_LEVELS[n] + 0.5);
    this.unseen = 0;
    this.recompute();
  },

  copNear(x, y, r) {
    for (const c of World.cars) if (c.police && !c.dead && dist2(c.x, c.y, x, y) < r * r) return true;
    for (const p of World.peds) if (p.ai === 'cop' && !p.dead && dist2(p.x, p.y, x, y) < r * r) return true;
    return false;
  },

  ready(kind, gap) {
    if (World.time - (this.cool[kind] || -99) < gap) return false;
    this.cool[kind] = World.time;
    return true;
  },

  crime(kind, x, y) {
    const near = this.copNear(x, y, 600);
    switch (kind) {
      case 'carjack': if (near && this.ready(kind, 2)) this.add(1); break;
      case 'shoot': if (near && this.ready(kind, 3)) this.add(1); break;
      // убийство: свидетель-полицейский — сразу, иначе иногда кто-то звонит в полицию
      case 'kill': if (near) this.add(2); else if (Math.random() < 0.35) this.add(1); break;
      case 'explode': if (near) this.add(2); else if (Math.random() < 0.4) this.add(1); break;
      case 'hitcop': if (this.ready(kind, 3)) this.add(1); break;
      case 'shootcop': if (this.ready(kind, 1)) this.add(3); break;
      case 'killcop': this.add(5); break;
    }
  },

  update(dt) {
    if (this.flash > 0) this.flash -= dt;
    if (this.heat <= 0) return;
    const pl = World.player;
    let seen = false;
    for (const c of World.cars) {
      if (!c.police || c.dead || !c.driver) continue;
      if (dist2(c.x, c.y, pl.x, pl.y) < 520 * 520 && City.lineOfSight(c.x, c.y, pl.x, pl.y)) { seen = true; break; }
    }
    if (!seen) for (const p of World.peds) {
      if (p.ai !== 'cop' || p.dead) continue;
      if (dist2(p.x, p.y, pl.x, pl.y) < 420 * 420 && City.lineOfSight(p.x, p.y, pl.x, pl.y)) { seen = true; break; }
    }
    // вертолёт над головой тоже видит героя: от него уходят покраской или сбив его
    const H = typeof Heli !== 'undefined' && Heli.h;
    if (!seen && H && H.state === 'hunt' && dist2(H.x, H.y, pl.x, pl.y) < 800 * 800) seen = true;
    if (seen) this.unseen = 0;
    else {
      this.unseen += dt;
      // через 6 секунд вне поля зрения накал начинает остывать
      if (this.unseen > 6) {
        this.heat = Math.max(0, this.heat - dt * 0.6);
        const was = this.level;
        let lvl = 0;
        for (let i = 1; i < HEAT_LEVELS.length; i++) if (this.heat >= HEAT_LEVELS[i]) lvl = i;
        this.level = lvl;
        if (lvl < was && lvl === 0) Game.message('Розыск снят', 2);
      }
    }
  },
};

const Police = {
  spawnT: 0,

  // сколько машин гоняется, как часто подъезжают новые, с какого радиуса реагируют патрули
  MAX_CARS: [0, 1, 2, 3, 4, 6],
  SPAWN_GAP: [0, 30, 14, 9, 6, 4],
  ALERT_R: [0, 500, 700, 900, 1100, 1300],
  lastLevel: 0,

  update(dt) {
    const lvl = Wanted.level;
    const pl = World.player;
    if (lvl > this.lastLevel) this.spawnT = Math.max(this.spawnT, this.SPAWN_GAP[lvl] * 0.5);
    this.lastLevel = lvl;
    const cops = World.cars.filter((c) => c.police && !c.dead && c.ai === 'police');
    this.spawnT -= dt;
    if (lvl > 0 && cops.length < this.MAX_CARS[lvl] && this.spawnT <= 0) {
      this.spawnT = this.SPAWN_GAP[lvl];
      const p = Game.findRoadSpawn(pl.x, pl.y, 900, 1300);
      if (p) {
        const c = new Car(p.x, p.y, DIR_ANGLE[p.dir], { police: true, ai: 'police' });
        c.driver = new Ped(p.x, p.y, { look: Looks.police(), ai: 'cop', weapon: copWeapon(lvl), hp: 70 });
        c.driver.car = c;
        c.partner = lvl >= 2 && chance(0.5);
        World.cars.push(c);
      }
    }
    // сирена: громкость по ближайшей погоне
    let near = 99999;
    for (const c of World.cars) if (c.police && c.siren && !c.dead) near = Math.min(near, dist(c.x, c.y, pl.x, pl.y));
    Sound.setSiren(lvl > 0 && near < 1100 ? 1 - near / 1100 : 0, near < 450);
    // когда розыск снят — полицейские возвращаются к патрулю
    if (lvl === 0) {
      for (const c of World.cars) if (c.police && c.ai === 'police') { c.ai = 'traffic'; c.siren = false; c.target = null; c.maxSpeed = c.T.max; }
      for (const p of World.peds) if (p.ai === 'cop' && !p.dead) { p.ai = 'walk'; p.target = null; }
    } else {
      // на погоню реагируют только патрули поблизости, и не больше лимита
      let chasing = cops.length;
      const r = this.ALERT_R[lvl];
      for (const c of World.cars) {
        if (chasing >= this.MAX_CARS[lvl] + 1) break;
        if (c.police && c.ai === 'traffic' && c.driver && dist2(c.x, c.y, pl.x, pl.y) < r * r) { c.ai = 'police'; c.siren = true; chasing++; }
      }
      // на 1–2 звёздах полиция едет осторожнее
      for (const c of World.cars) if (c.police && c.ai === 'police') c.maxSpeed = c.T.max * (lvl <= 2 ? 0.85 : 1);
    }
  },

  carAI(c, dt) {
    const pl = World.player;
    const tx = pl.car ? pl.car.x : pl.x, ty = pl.car ? pl.car.y : pl.y;
    const d = dist(c.x, c.y, tx, ty);
    c.siren = true;
    // игрок пешком рядом — выходим и ловим
    // ...или машина встала неподалёку, а дальше не проехать (игрок во дворе)
    if (!pl.car && ((d < 170 && c.speed < 120) || (d < 450 && c.speed < 60 && (!c.path || c.path.length <= 3)))) {
      this.exitCops(c);
      return;
    }
    if (pl.car && pl.car.speed < 30 && d < 140 && c.speed < 80) {
      this.exitCops(c);
      return;
    }
    // к пешему подъезжаем и тормозим, а не давим; на 1 звезде не таранят
    chaseDrive(c, tx, ty, d, dt, !pl.car || Wanted.level <= 1);
  },

  exitCops(c) {
    const f = c.fwd;
    const out = (side) => {
      const x = c.x + side * -f.y * (c.w / 2 + 14), y = c.y + side * f.x * (c.w / 2 + 14);
      return City.solidAt(x, y) ? { x: c.x - side * -f.y * (c.w / 2 + 14), y: c.y - side * f.x * (c.w / 2 + 14) } : { x, y };
    };
    if (c.driver && c.driver !== 'player') {
      const d = c.driver; d.car = null; const p = out(1); d.x = p.x; d.y = p.y; d.ai = 'cop'; World.peds.push(d);
      c.driver = null;
    }
    if (c.partner) {
      const p = out(-1);
      World.peds.push(new Ped(p.x, p.y, { look: Looks.police(), ai: 'cop', weapon: copWeapon(Wanted.level), hp: 70 }));
      c.partner = false;
    }
    c.ai = null;
  },

  copAI(p, dt) {
    const pl = World.player;
    if (pl.dead || Wanted.level === 0) return;
    const tx = pl.car ? pl.car.x : pl.x, ty = pl.car ? pl.car.y : pl.y;
    const d = dist(p.x, p.y, tx, ty);
    p.faceTo(tx, ty);
    const sees = d < 450 && City.lineOfSight(p.x, p.y, tx, ty);
    // на 3+ звёздах стреляют
    if (Wanted.level >= 3 && sees && d > 60 && p.cool <= 0) {
      p.cool = Wanted.level === 3 ? rand(1.4, 2.2) : Wanted.level === 4 ? rand(1.0, 1.6) : rand(0.7, 1.2);
      fireBullet(p, p.weapon || 'pistol', p.a);
    }
    // садимся обратно в пустую полицейскую машину, если игрок уехал
    if (pl.car && d > 300) {
      for (const c of World.cars) {
        if (c.police && !c.dead && !c.driver && dist2(c.x, c.y, p.x, p.y) < 50 * 50) {
          c.driver = p; p.car = c; c.ai = 'police';
          World.peds.splice(World.peds.indexOf(p), 1);
          return;
        }
      }
      const car = World.cars.find((c) => c.police && !c.dead && !c.driver && dist2(c.x, c.y, p.x, p.y) < 400 * 400);
      if (car) { p.moveTo(car.x, car.y, 120, dt); return; }
    }
    if (d > 20) p.moveTo(tx, ty, pl.car ? 115 : 125, dt);
    // арест
    const close = pl.car ? (d < pl.car.w / 2 + 30 && pl.car.speed < 30) : d < 24;
    if (close) {
      pl.bust += dt;
      if (pl.bust > (pl.car ? 1.2 : 1.0)) Game.busted();
    }
  },
};

// Погоня по дорогам: путь до цели, вблизи — напрямую, выезд из тупика.
// calm — подъезжает и тормозит рядом, а не таранит.
function chaseDrive(c, tx, ty, d, dt, calm) {
  if (c.recover > 0) {
    c.recover -= dt;
    c.drive(dt, -1, c.recoverSteer, false);
    return;
  }
  let gx, gy;
  if (d < 260 && City.lineOfSight(c.x, c.y, tx, ty)) { gx = tx; gy = ty; }
  else {
    c.pathT = (c.pathT || 0) - dt;
    if (!c.path || c.pathT <= 0) {
      c.pathT = 0.6;
      c.path = City.pathTo(Math.floor(c.x / TILE), Math.floor(c.y / TILE), Math.floor(tx / TILE), Math.floor(ty / TILE));
    }
    if (c.path && c.path.length > 1) {
      // ближайшая точка пути и цель на 2 клетки вперёд
      let bi = 0, bd = Infinity;
      for (let i = 0; i < Math.min(c.path.length, 12); i++) {
        const q = c.path[i]; const dd = dist2(c.x, c.y, q.x * TILE + 32, q.y * TILE + 32);
        if (dd < bd) { bd = dd; bi = i; }
      }
      const q = c.path[Math.min(c.path.length - 1, bi + 2)];
      gx = q.x * TILE + 32; gy = q.y * TILE + 32;
    } else { gx = tx; gy = ty; }
  }
  const want = Math.atan2(gx - c.x, -(gy - c.y));
  const diff = wrapAngle(want - c.a);
  let throttle = 1;
  if (Math.abs(diff) > 1.2 && c.speed > 160) throttle = -0.4;
  else if (Math.abs(diff) > 2.2) throttle = 0.4;
  if (calm && d < 400) {
    const limit = Math.max(50, (d - 120) * 0.8);
    if (c.fspeed > limit) throttle = -1; else if (c.fspeed > limit * 0.7) throttle = 0;
  }
  c.drive(dt, throttle, clamp(diff * 2.2, -1, 1), Math.abs(diff) > 1.4 && c.speed > 150);
  if (c.speed < 25) c.stuck += dt; else c.stuck = Math.max(0, c.stuck - dt * 2);
  if (c.stuck > 1.3) { c.stuck = 0; c.recover = 0.8; c.recoverSteer = -Math.sign(diff || 1); }
}

// Оружие полиции растёт с розыском: на 4★ — дробовики, на 5★ — спецназ с АК
function copWeapon(lvl) {
  if (lvl >= 5 && chance(0.5)) return 'ak';
  if (lvl >= 4 && chance(0.4)) return 'shotgun';
  return 'pistol';
}
