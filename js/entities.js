// Машины, пешеходы, пули, частицы, подбираемые предметы.
'use strict';

const World = {
  cars: [],
  peds: [],
  bullets: [],
  projectiles: [], // гранаты и ракеты РПГ
  particles: [],
  decals: [],
  pickups: [],
  phones: [],
  markers: [],
  player: null,
  time: 0,
};


// melee — дальность удара; plDmg — урон по игроку от пули NPC; npcCd — пауза
// между выстрелами у NPC; burst — очередь из N выстрелов; pellets — дробь;
// life — дальность пули (секунды полёта); throw/rocket — гранаты и РПГ
// люди крупнее, как в GTA2 (≈⅓ полосы)
const PED_SCALE = 1.25;

const WEAPONS = {
  fists: { name: 'Кулаки', cd: 0.4, dmg: 25, melee: 34, npcDmg: 6, sprite: 'stand' },
  bat: { name: 'Бита', cd: 0.55, dmg: 50, melee: 44, npcDmg: 14, sprite: 'stand' },
  pistol: { name: 'Пистолет', cd: 0.32, dmg: 34, carDmg: 6, spread: 0.04, plDmg: 9, npcCd: [0.8, 1.3], sprite: 'gun' },
  shotgun: { name: 'Дробовик', cd: 0.85, dmg: 16, carDmg: 4, spread: 0.2, pellets: 6, life: 0.24, plDmg: 6, npcCd: [1.3, 1.9], sprite: 'machine' },
  uzi: { name: 'Узи', cd: 0.08, dmg: 20, carDmg: 4, spread: 0.12, plDmg: 5, burst: 4, npcCd: [1.0, 1.6], sprite: 'machine' },
  ak: { name: 'Автомат АК', cd: 0.11, dmg: 30, carDmg: 7, spread: 0.06, plDmg: 8, burst: 3, npcCd: [1.1, 1.7], life: 0.55, sprite: 'machine' },
  grenade: { name: 'Гранаты', cd: 0.9, throw: true, sprite: 'stand' },
  rpg: { name: 'РПГ', cd: 1.4, rocket: true, sprite: 'machine' },
};
// порядок на клавишах 2–8 (1 — кулаки)
const WEAPON_ORDER = ['bat', 'pistol', 'shotgun', 'uzi', 'ak', 'grenade', 'rpg'];
const emptyAmmo = () => Object.fromEntries(WEAPON_ORDER.map((w) => [w, 0]));

// =====================================================================
//                               МАШИНА
// =====================================================================
// точки корпуса: углы, середины носа/кормы и бортов (доли длины и ширины)
const HULL_F = [1, 1, -1, -1, 1, -1, 0, 0];
const HULL_R = [1, -1, 1, -1, 0, 0, 1, -1];
// крейсерская скорость трафика по виду улицы (City.ROAD_KIND)
const CRUISE = { 0: 120, 1: 110, 2: 160, 3: 200, 4: 200, 5: 300, 6: 90 };

class Car {
  constructor(x, y, a, opts = {}) {
    this.x = x; this.y = y; this.a = a;
    this.vx = 0; this.vy = 0; this.av = 0;
    this.type = opts.police ? 'police' : (opts.type || 'sedan');
    const T = VTYPES[this.type];
    this.T = T;
    this.faction = opts.faction || null;
    this.moto = !!T.moto;
    this.color = opts.color || T.color || (this.faction && FACTIONS[this.faction].carColor) || pickWeighted(CAR_PALETTE);
    this.w = T.w; this.l = T.l;
    this.police = this.type === 'police';
    this.maxHp = T.hp;
    this.hp = this.maxHp;
    this.maxSpeed = opts.maxSpeed || T.max;
    this.accel = T.acc;
    this.genKey = Vehicles.genKey(this.type, this.faction);
    this.dents = [];
    this.seed = randi(1, 1e9);
    this.driver = null; // 'player' | Ped
    this.ai = opts.ai || null; // 'traffic' | 'police' | null
    this.dead = false;
    this.burn = 0;
    this.target = null;
    this.dir = 0;
    this.stuck = 0;
    this.recover = 0;
    this.horn = 0;
    this.mission = null;
    this.passenger = null;
    this.siren = this.police;
    this.lastHit = 0;
    this.skid = 0;
  }

  get speed() { return Math.hypot(this.vx, this.vy); }
  // направление «вперёд»: один и тот же объект, пересчитывается при повороте (меньше мусора для GC)
  get fwd() {
    const f = this._f || (this._f = { x: 0, y: -1, a: 0 });
    if (f.a !== this.a) { f.a = this.a; f.x = Math.sin(this.a); f.y = -Math.cos(this.a); }
    return f;
  }
  get fspeed() { return this.vx * Math.sin(this.a) - this.vy * Math.cos(this.a); }

  // Точки корпуса для проверки столкновений со стенами
  hullPoints(x = this.x, y = this.y, a = this.a) {
    const fx = Math.sin(a), fy = -Math.cos(a), rx = Math.cos(a), ry = Math.sin(a);
    const hl = this.l / 2 - 2, hw = this.w / 2 - 2;
    return [
      [x + fx * hl + rx * hw, y + fy * hl + ry * hw], [x + fx * hl - rx * hw, y + fy * hl - ry * hw],
      [x - fx * hl + rx * hw, y - fy * hl + ry * hw], [x - fx * hl - rx * hw, y - fy * hl - ry * hw],
      [x + fx * hl, y + fy * hl], [x - fx * hl, y - fy * hl],
      [x + rx * hw, y + ry * hw], [x - rx * hw, y - ry * hw],
    ];
  }

  // те же 8 точек корпуса, что в hullPoints, но без создания массивов — вызывается очень часто
  hitsWall(x, y, a) {
    const fx = Math.sin(a), fy = -Math.cos(a), rx = Math.cos(a), ry = Math.sin(a);
    // автобус и мусоровоз трафика вписываются в поворот, чуть задевая углы:
    // иначе на Т-перекрёстке они застревают
    const L = this.l > 150 && this.driver && this.driver !== 'player' ? 150 : this.l;
    const hl = L / 2 - 2, hw = this.w / 2 - 2;
    for (let i = 0; i < 8; i++) {
      const sf = HULL_F[i] * hl, sr = HULL_R[i] * hw;
      if (City.solidAt(x + fx * sf + rx * sr, y + fy * sf + ry * sr)) return true;
    }
    return false;
  }

  // Два круга вдоль корпуса — для столкновений машина-машина
  circles() {
    const f = this.fwd;
    const r = this.w / 2 + 1;
    const n = this.moto ? 1 : Math.max(2, Math.round(this.l / this.w));
    // массив кругов переиспользуется между кадрами
    const out = this._circ || (this._circ = Array.from({ length: n }, () => ({ x: 0, y: 0, r: 0 })));
    if (this.moto) { out[0].x = this.x; out[0].y = this.y; out[0].r = 14; return out; }
    const o = this.l / 2 - this.w / 2;
    for (let i = 0; i < n; i++) { const t = -o + (2 * o) * i / (n - 1); out[i].x = this.x + f.x * t; out[i].y = this.y + f.y * t; out[i].r = r; }
    return out;
  }

  // Точка внутри корпуса (с запасом m)?
  contains(px, py, m = 0) {
    const dx = px - this.x, dy = py - this.y;
    const f = this.fwd;
    const lf = dx * f.x + dy * f.y, lr = dx * -f.y + dy * f.x;
    return Math.abs(lf) < this.l / 2 + m && Math.abs(lr) < this.w / 2 + m;
  }

  // Управление: throttle -1..1, steer -1..1, handbrake bool
  drive(dt, throttle, steer, handbrake) {
    if (this.dead) { throttle = 0; steer = 0; handbrake = true; }
    const fx = Math.sin(this.a), fy = -Math.cos(this.a);
    const rx = Math.cos(this.a), ry = Math.sin(this.a);
    let vf = this.vx * fx + this.vy * fy;
    let vr = this.vx * rx + this.vy * ry;
    const max = this.maxSpeed * (this.hp < this.maxHp * 0.3 ? 0.75 : 1);
    if (throttle > 0) {
      if (vf < -10) vf += 600 * dt * throttle;
      else vf += this.accel * throttle * dt * (1 - Math.max(0, vf) / max * 0.7);
    } else if (throttle < 0) {
      if (vf > 10) vf -= 600 * dt * -throttle;
      else vf = Math.max(vf - this.accel * 0.6 * -throttle * dt, -max * 0.35);
    } else {
      vf -= Math.sign(vf) * Math.min(Math.abs(vf), 90 * dt);
    }
    if (handbrake) vf -= Math.sign(vf) * Math.min(Math.abs(vf), 260 * dt);
    vf = clamp(vf, -max * 0.35, max);
    const grip = handbrake ? 1.6 : this.T.grip;
    const lost = vr * Math.min(1, grip * dt);
    vr -= lost;
    this.skid = Math.abs(vr) > 70 ? 1 : 0;
    // руление зависит от скорости
    // длинным машинам трафика руль покруче — иначе не вписываются в повороты
    const tk = this.l > 150 && this.driver && this.driver !== 'player' ? 1.6 : 1;
    const turn = this.T.turn * tk * clamp(vf / 140, -1, 1) * (handbrake ? 1.35 : 1);
    this.av = steer * turn;
    const na = this.a + this.av * dt;
    if (!this.hitsWall(this.x, this.y, na)) this.a = na;
    const nfx = Math.sin(this.a), nfy = -Math.cos(this.a), nrx = Math.cos(this.a), nry = Math.sin(this.a);
    this.vx = nfx * vf + nrx * vr;
    this.vy = nfy * vf + nry * vr;
    this.move(dt);
  }

  move(dt) {
    const sp = this.speed;
    let hit = false;
    const nx = this.x + this.vx * dt;
    if (!this.hitsWall(nx, this.y, this.a)) this.x = nx; else { hit = true; this.vx *= -0.3; }
    const ny = this.y + this.vy * dt;
    if (!this.hitsWall(this.x, ny, this.a)) this.y = ny; else { hit = true; this.vy *= -0.3; }
    // удар игрока о стену на небольшой скорости — глухой стук
    if (hit && sp > 30 && sp <= 110 && this.driver === 'player' && World.time - this.lastHit > 0.35) {
      this.lastHit = World.time;
      Sound.play('crash', clamp(0.12 + sp / 400, 0.15, 0.4)); Sound.thud(clamp(0.3 + sp / 250, 0.35, 0.8));
    }
    if (hit && sp > 110 && World.time - this.lastHit > 0.4) {
      this.lastHit = World.time;
      // удар о стену на полной скорости — примерно 15% «здоровья» обычной машины
      const sg = this.fspeed >= 0 ? 1 : -1;
      if (sp > 150) this.damage((sp - 150) * 0.07, null, this.x + this.fwd.x * this.l / 2 * sg, this.y + this.fwd.y * this.l / 2 * sg);
      if (this.driver === 'player' || dist2(this.x, this.y, World.player.x, World.player.y) < 600 * 600) { Sound.play('crash', clamp(sp / 400, 0.2, 1)); if (this.driver === 'player') Sound.thud(clamp(sp / 300, 0.5, 1)); }
      spawnSparks(this.x + this.fwd.x * this.l / 2, this.y + this.fwd.y * this.l / 2, 6);
    }
  }

  // 0 — целая, 1 — лёгкие повреждения, 2 — тяжёлые, 3 — сгорела
  get stage() {
    if (this.dead) return 3;
    const k = this.hp / this.maxHp;
    return k > 0.7 ? 0 : k > 0.4 ? 1 : 2;
  }

  // Запоминаем, куда пришёлся удар, — там появится вмятина
  dent(hx, hy, n) {
    const f = this.fwd;
    const dx = hx - this.x, dy = hy - this.y;
    const u = clamp((dx * -f.y + dy * f.x) / (this.w / 2), -1, 1);
    const v = clamp(-(dx * f.x + dy * f.y) / (this.l / 2), -1, 1);
    const s = clamp(n / 12, 0.2, 1);
    const near = this.dents.find((d) => Math.abs(d.u - u) < 0.4 && Math.abs(d.v - v) < 0.25);
    if (near) near.s = Math.min(1, near.s + s * 0.5);
    else { this.dents.push({ u, v, s }); if (this.dents.length > 8) this.dents.shift(); }
  }

  damage(n, by, hx, hy) {
    if (this.dead) return;
    if (hx !== undefined && n > 1.5) this.dent(hx, hy, n);
    const st0 = this.stage;
    this.hp -= n;
    // треснуло стекло, когда машина переходит в следующую стадию урона
    if (this.hp > 0 && this.stage > st0) Sound.at(this.stage === 1 ? 'glassL' : 'glassM', this.x, this.y, 0.7, 600);
    if (by === 'player' && this.police) Wanted.crime('hitcop', this.x, this.y);
    if (by === 'player' && this.turf && this.ai === 'traffic') this.provoked = true; // задел машину банды — погонятся
    if (this.hp <= 0) {
      // машина загорается и взрывается не сразу — есть время выскочить
      this.hp = 0;
      this.dead = true;
      this.burn = this.T.prop ? 0.25 : 5; // бочка взрывается почти сразу
      this.killedBy = by;
      if (this.driver === 'player') Game.message('Машина горит — выпрыгивай (F)!', 3);
    }
  }

  explode() {
    this.burn = -1;
    // выбросить водителя
    if (this.driver && this.driver !== 'player') { const d = this.driver; this.driver = null; d.car = null; d.x = this.x + 30; d.y = this.y; World.peds.push(d); d.kill('explosion'); }
    if (this.passenger) { this.passenger.car = null; this.passenger.x = this.x - 30; this.passenger.y = this.y; World.peds.push(this.passenger); this.passenger.kill('explosion'); this.passenger = null; }
    if (this.driver === 'player') Game.playerHurt(200, 'explosion');
    blast(this.x, this.y, { by: this.killedBy, skip: this });
    if (this.killedBy === 'player' && !this.T.prop) { Game.addMoney(this.police ? 500 : 250); if (this.police) Wanted.crime('killcop', this.x, this.y); else Wanted.crime('explode', this.x, this.y); }
  }

  update(dt) {
    if (this.dead) {
      // бандиты выскакивают из подбитой машины и дерутся пешком
      if (this.gang && this.driver && this.driver !== 'player') GangCars.exit(this, 25);
      if (this.burn > 0) {
        this.burn -= dt;
        // сначала дымит, к концу пламя сильнее
        if (Math.random() < (this.burn > 3 ? 0.3 : 0.7)) spawnParticle(this.x + rand(-10, 10), this.y + rand(-10, 10), 'fire');
        if (Math.random() < 0.3) spawnParticle(this.x, this.y, 'smoke');
        if (this.burn <= 0) this.explode();
      }
      if (this.burn < 0 && Math.random() < 0.08) spawnParticle(this.x, this.y, 'smoke');
      this.drive(dt, 0, 0, true);
      return;
    }
    if (this.hp < this.maxHp * 0.45 && Math.random() < 0.25) spawnParticle(this.x + this.fwd.x * this.l * 0.35, this.y + this.fwd.y * this.l * 0.35, this.hp < this.maxHp * 0.15 ? 'fire' : 'smoke');
    if (this.driver === 'player') return; // управляется в Game
    if (this.ai === 'gang' && this.driver) { GangCars.carAI(this, dt); return; }
    if (this.ai === 'traffic' && this.driver) this.trafficAI(dt);
    else if (this.ai === 'police' && this.driver) Police.carAI(this, dt);
    else if (this.ai === 'scripted') { /* управляется миссией */ }
    else this.drive(dt, 0, 0, true);
    if (this.skid && this.speed > 120 && Math.random() < 0.3) addSkid(this);
  }

  // ---------- ИИ городского трафика ----------
  pickNext(tx, ty) {
    const all = City.laneDirs(tx, ty);
    // на перекрёстке помним, откуда въехали, — развернуться через него нельзя
    if (City.isJunction(tx, ty)) {
      if (!(this.jdir >= 0)) {
        // въезд на перекрёсток: направо можно только из крайней правой полосы
        const d = this.dir, px = tx - DIRS[d].x, py = ty - DIRS[d].y, r = DIRS[(d + 1) % 4];
        this.jdir = d;
        this.jright = !(City.isRoad(px + r.x, py + r.y) && City.laneDirs(px + r.x, py + r.y).includes(d));
      }
    } else this.jdir = -1;
    const back = this.jdir >= 0 ? this.jdir : this.dir;
    let opts = all.filter((d) => d !== (this.dir + 2) % 4 && d !== (back + 2) % 4);
    // как в GTA2: без нужды налево через встречку не поворачиваем
    if (this.jdir >= 0) {
      const strict = opts.filter((d) => d !== (back + 3) % 4 && (d !== (back + 1) % 4 || this.jright));
      if (strict.length) opts = strict;
    }
    if (!opts.length) opts = all.filter((d) => d !== (this.dir + 2) % 4);
    if (!opts.length) opts = all;
    if (!opts.length) return null;
    // машина банды патрулирует свой район: выбираем повороты, что ведут вглубь территории
    if (this.turf && opts.length > 1) {
      const own = opts.filter((d) => City.factionAt((tx + DIRS[d].x * 8 + 0.5) * TILE, (ty + DIRS[d].y * 8 + 0.5) * TILE) === this.turf);
      if (own.length) opts = own;
    }
    // автобус и мусоровоз длиной в три-четыре клетки на перекрёстках едут прямо:
    // поворачивая, они задевают углы домов
    const straight = this.l > 150 ? 1 : 0.7;
    let d = opts.includes(this.dir) && Math.random() < straight ? this.dir : pick(opts);
    this.dir = d;
    return { x: tx + DIRS[d].x, y: ty + DIRS[d].y };
  }

  // Следующая клетка после t — планируем на шаг вперёд, не трогая текущий курс
  plan(t) {
    const d0 = this.dir, j0 = this.jdir, r0 = this.jright;
    this.dir = this.pdir; this.jdir = this.pjdir; this.jright = this.pjright;
    const n = this.pickNext(t.x, t.y);
    if (n) n.d = this.dir;
    this.pdir = this.dir; this.pjdir = this.jdir; this.pjright = this.jright;
    this.dir = d0; this.jdir = j0; this.jright = r0;
    return n;
  }

  trafficAI(dt) {
    const tx = Math.floor(this.x / TILE), ty = Math.floor(this.y / TILE);
    if (this.turf && GangCars.engage(this, dt)) return;
    if (!this.target || this.recover > 0) {
      if (this.recover > 0) {
        // сдаём назад медленно (под 85 уже сбивает) и не на людей
        this.recover -= dt;
        const f = this.fwd, bx = this.x - f.x * (this.l / 2 + 30), by = this.y - f.y * (this.l / 2 + 30);
        const behind = World.peds.some((p) => !p.dead && !p.car && dist2(p.x, p.y, bx, by) < 45 * 45);
        this.drive(dt, behind ? 0.3 : this.speed > 55 ? 0 : -0.7, this.recoverSteer, false);
        return;
      }
      if (City.isRoad(tx, ty)) {
        const dirs = City.laneDirs(tx, ty);
        // выбираем направление, ближайшее к текущему курсу
        let best = dirs[0], bd = 9;
        for (const d of dirs) { const diff = Math.abs(wrapAngle(DIR_ANGLE[d] - this.a)); if (diff < bd) { bd = diff; best = d; } }
        if (best === undefined) best = 0;
        this.dir = best;
        this.target = { x: tx + DIRS[best].x, y: ty + DIRS[best].y };
      } else {
        const r = City.nearestRoad(tx, ty);
        this.target = r || { x: tx, y: ty };
      }
      this.pdir = this.dir; this.pjdir = -1; this.pjright = false;
      this.next = this.plan(this.target);
    }
    let gx = this.target.x * TILE + TILE / 2, gy = this.target.y * TILE + TILE / 2;
    // центр клетки близко или уже позади — берём следующую. Радиус растёт со
    // скоростью: длинная машина не успевает попасть точно в центр и иначе
    // кружит вокруг него
    const f = this.fwd, tdx = gx - this.x, tdy = gy - this.y;
    const reach = clamp(18 + this.fspeed * 0.2, 26, 64);
    if (this.next && (tdx * tdx + tdy * tdy < reach * reach || (tdx * f.x + tdy * f.y < 0 && tdx * tdx + tdy * tdy < TILE * TILE * 2))) {
      this.target = this.next; this.dir = this.next.d;
      this.next = this.plan(this.target);
      gx = this.target.x * TILE + TILE / 2; gy = this.target.y * TILE + TILE / 2;
    } else if (!this.next && tdx * tdx + tdy * tdy < 26 * 26) this.target = null; // тупик — осмотреться заново
    // уступаем: прижимаемся вправо, если на нас несётся игрок или погоня с сиреной
    const yld = this.yieldCheck(tx, ty);
    this.yieldOff = clamp((this.yieldOff || 0) + (yld ? 70 : -40) * dt, 0, 30);
    if (this.yieldOff > 0) { gx += Math.cos(this.a) * this.yieldOff; gy += Math.sin(this.a) * this.yieldOff; }
    // не врезаться в то, что впереди
    const block = this.obstacleAhead();
    // брошенную или разбитую машину объезжаем по соседней полосе, а не ждём
    const bc = this.blockCar;
    if (block === 'car' && bc && bc.speed < 5 && (!bc.driver || bc.dead) && !this.passCar && this.dir !== undefined) {
      const side = [3, 1].find((k) => City.isRoad(tx + DIRS[(this.dir + k) % 4].x, ty + DIRS[(this.dir + k) % 4].y));
      if (side) { this.passCar = bc; this.passT = 6; this.passSide = side === 3 ? -1 : 1; }
    }
    if (this.passCar) {
      const pc = this.passCar, ff = this.fwd;
      this.passT -= dt;
      if (this.passT <= 0 || (pc.x - this.x) * ff.x + (pc.y - this.y) * ff.y < -(this.l + pc.l) / 2 - 10) this.passCar = null;
      else { gx += Math.cos(this.a) * 62 * this.passSide; gy += Math.sin(this.a) * 62 * this.passSide; }
    }
    const want = Math.atan2(gx - this.x, -(gy - this.y));
    const diff = wrapAngle(want - this.a);
    const steer = clamp(diff * 2.5, -1, 1);
    // скорость по виду улицы: шоссе, проспект, обычная, переулок, кольцо
    const kind = City.inside(tx, ty) ? City.roadKind[City.idx(tx, ty)] : 0;
    let cruise = (CRUISE[kind] || 140) * (this.turf ? 1.3 : 1); // банды гоняют быстрее
    if (yld === 2) cruise = Math.min(cruise, 70); // навстречу по нашей полосе — притормаживаем
    if (Math.abs(diff) > 0.35) cruise = 80;
    // впереди поворот — сбрасываем скорость заранее, а не в самом повороте
    else if (this.next && this.next.d !== this.dir && dist2(this.x, this.y, gx, gy) < 150 * 150) cruise = Math.min(cruise, 85);
    if (this.passCar) cruise = Math.min(cruise, 70);
    const light = this.lightGap();
    let throttle = this.fspeed < cruise ? 0.8 : 0;
    if (light !== null) {
      // красный: подъезжаем к стоп-линии и стоим
      const want = Math.max(0, (light - 30) * 2.2);
      throttle = this.fspeed > want ? -1 : this.fspeed < want * 0.8 ? 0.5 : 0;
    }
    if (block) {
      throttle = this.fspeed > 5 ? -1 : 0;
      // в очереди у светофора — не паникуем и не сдаём назад
      this.stuck += block === 'queue' ? dt * 0.12 : dt;
      if (block === 'player' && Math.random() < dt * 0.5) { this.honk(); }
    } else if (this.speed > 20) this.stuck = Math.max(0, this.stuck - dt);
    if (!block && this.speed < 10 && throttle > 0) this.stuck += dt * 0.5;
    if (this.stuck > 4) { this.stuck = 0; this.recover = 0.9; this.recoverSteer = rand(-1, 1); this.target = null; }
    this.drive(dt, throttle, steer, false);
  }

  // 1 — догоняют сзади, 2 — летят навстречу по нашей полосе; 0 — никого.
  // Прижимаемся только из крайней правой полосы, где справа нет попутной.
  yieldCheck(tx, ty) {
    if (this.dir === undefined || City.isJunction(tx, ty)) return 0;
    const r = DIRS[(this.dir + 1) % 4];
    if (City.isRoad(tx + r.x, ty + r.y) && City.laneDirs(tx + r.x, ty + r.y).includes(this.dir)) return 0;
    const f = this.fwd, pc = World.player.car;
    const test = (c) => {
      if (!c || c === this || c.dead || c.speed < 150) return 0;
      const dx = c.x - this.x, dy = c.y - this.y;
      const along = dx * f.x + dy * f.y, lat = Math.abs(dx * f.y - dy * f.x);
      if (lat > 75 || Math.abs(along) > 420) return 0;
      const d = Math.hypot(dx, dy) || 1;
      const closing = -((c.vx - this.vx) * dx + (c.vy - this.vy) * dy) / d;
      if (closing < 90) return 0;
      return along > 0 ? 2 : 1;
    };
    let v = test(pc);
    if (!v && Wanted.level > 0) for (const c of World.cars) if (c.police && c.siren && (v = test(c))) break;
    return v;
  }

  honk() {
    if (World.time - this.horn < 2) return;
    this.horn = World.time;
    if (dist2(this.x, this.y, World.player.x, World.player.y) < 500 * 500) Sound.horn();
  }

  // Светофор впереди: расстояние от носа до края перекрёстка, если нам не зелёный
  lightGap() {
    const tx = Math.floor(this.x / TILE), ty = Math.floor(this.y / TILE), d = this.dir;
    if (d === undefined || City.isJunction(tx, ty)) return null;
    for (let k = 1; k <= 3; k++) {
      const ax = tx + DIRS[d].x * k, ay = ty + DIRS[d].y * k;
      if (!City.isRoad(ax, ay)) return null;
      if (!City.isJunction(ax, ay)) continue;
      const edge = d === 0 ? (ay + 1) * TILE : d === 2 ? ay * TILE : d === 1 ? ax * TILE : (ax + 1) * TILE;
      const nose = d === 0 ? this.y - this.l / 2 : d === 2 ? this.y + this.l / 2 : d === 1 ? this.x + this.l / 2 : this.x - this.l / 2;
      const gap = d === 0 || d === 3 ? nose - edge : edge - nose;
      if (gap < 4) return null; // нос уже на перекрёстке — проезжаем
      // за перекрёстком пробка — не въезжаем, чтобы не запереть поперечных
      let ex = ax, ey = ay;
      while (City.isJunction(ex, ey)) { ex += DIRS[d].x; ey += DIRS[d].y; }
      const cx = (ex + 0.5) * TILE, cy = (ey + 0.5) * TILE;
      for (const c of World.cars) if (c !== this && c.speed < 15 && dist2(c.x, c.y, cx, cy) < 44 * 44) return gap;
      const id = City.lightId[City.idx(ax, ay)];
      if (id < 0) return null;
      const st = City.lightState(id, d % 2 === 0);
      if (st === 'g') return null;
      // жёлтый, а затормозить уже не успеть — едем
      if (st === 'y' && gap < 30 + this.fspeed * 0.3) return null;
      return gap;
    }
    return null;
  }

  obstacleAhead() {
    const f = this.fwd;
    const look = 40 + Math.max(0, this.fspeed) * 0.35;
    const ax = this.x + f.x * (this.l / 2 + look / 2), ay = this.y + f.y * (this.l / 2 + look / 2);
    const rr = look / 2 + 6;
    this.blockCar = null;
    for (const c of World.cars) {
      if (c === this || c === this.passCar) continue;
      if (dist2(c.x, c.y, ax, ay) < (rr + c.w / 2) * (rr + c.w / 2)) {
        this.blockCar = c;
        return c.driver === 'player' ? 'player' : c.ai === 'traffic' && c.driver && !c.dead && (c.speed > 15 || Math.abs(wrapAngle(c.a - this.a)) < 0.6) ? 'queue' : 'car';
      }
    }
    const pl = World.player;
    if (!pl.car && !pl.dead && dist2(pl.x, pl.y, ax, ay) < rr * rr) return 'player';
    // людей видим дальше: тормозной путь длиннее, чем до бампера впереди
    const pl2 = look * 0.6, px0 = ax + f.x * pl2 / 2, py0 = ay + f.y * pl2 / 2, pr = rr + pl2 / 2;
    for (const p of World.peds) {
      if (p.dead || p.car) continue;
      if (dist2(p.x, p.y, px0, py0) < pr * pr) return 'ped';
    }
    return null;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    // тень
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(-this.w / 2 + 4, -this.l / 2 + 5, this.w, this.l);
    // спрайт по стадии урона: сгенерированные _d1/_d2/_d3 или процедурные повреждения
    const stage = this.stage;
    let shown = 0;
    if (this.genKey) {
      const g = Vehicles.genForStage(this.genKey, stage);
      ctx.drawImage(g.img, -this.w / 2, -this.l / 2, this.w, this.l);
      shown = g.stage;
    } else {
      const spr = Vehicles.sprite(this.type, this.color, this.faction);
      const sw = spr.width / 2, sh = spr.height / 2;
      ctx.drawImage(spr, -sw / 2, -sh / 2, sw, sh);
    }
    if (stage >= 1 && stage <= 2 && shown < stage) Vehicles.drawDamage(ctx, this, stage);
    else if (stage === 0 && this.dents.length) Vehicles.drawDamage(ctx, this, 0);
    Vehicles.drawRoof(ctx, this);
    this.wreckShown = shown === 3;
    // седок на мотоцикле/скутере
    if (this.moto && this.driver) {
      const L = this.driver === 'player' ? World.player.look : this.driver.look;
      if (L) { ctx.save(); ctx.translate(0, 4); ctx.rotate(-Math.PI / 2); drawPersonLook(ctx, L, 0, false, null, false); ctx.restore(); }
    }
    if ((this.police || this.type === 'ambulance') && !this.dead) {
      const on = Math.floor(World.time * 6) % 2 === 0;
      const by = this.police ? -this.l * 0.06 : -this.l / 2 + 15;
      if (this.police) {
        ctx.fillStyle = on ? '#ff2a2a' : '#5a0a0a'; ctx.fillRect(-12, by, 12, 6);
        ctx.fillStyle = on ? '#0d2a66' : '#3f8cff'; ctx.fillRect(0, by, 12, 6);
      }
      if (this.siren && !this.dead) {
        ctx.globalAlpha = 0.28;
        ctx.fillStyle = this.police ? (on ? '#ff3030' : '#3080ff') : (on ? '#ff9800' : '#ff3030');
        ctx.beginPath(); ctx.arc(on ? -6 : 6, by + 3, 34, 0, TAU); ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    if (this.mission && !this.dead) {
      ctx.strokeStyle = '#ff3b3b'; ctx.lineWidth = 3;
      ctx.strokeRect(-this.w / 2 - 4, -this.l / 2 - 4, this.w + 8, this.l + 8);
    }
    if (this.jobBox && !this.dead) {
      ctx.strokeStyle = '#ff6a1a'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
      ctx.strokeRect(-this.w / 2 - 4, -this.l / 2 - 4, this.w + 8, this.l + 8); ctx.setLineDash([]);
    }
    if (this.dead && !this.wreckShown) {
      ctx.fillStyle = 'rgba(25,20,18,0.82)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(-this.w / 2, -this.l / 2, this.w, this.l, 8); else ctx.rect(-this.w / 2, -this.l / 2, this.w, this.l);
      ctx.fill();
    }
    ctx.restore();
  }
}

// =====================================================================
//                              ПЕШЕХОД
// =====================================================================
class Ped {
  constructor(x, y, opts = {}) {
    this.x = x; this.y = y;
    this.a = opts.a !== undefined ? opts.a : rand(-Math.PI, Math.PI);
    this.faction = opts.faction || null;
    this.look = opts.look || (this.faction ? (opts.boss ? Looks.boss(this.faction) : Looks[this.faction]()) : Looks.civilian());
    this.ai = opts.ai || 'walk';
    this.name = opts.name || null;
    this.hp = opts.hp || 50;
    this.dead = false;
    this.r = 11;
    this.weapon = opts.weapon || null;
    this.cool = 0;
    this.dir = randi(0, 3);
    this.target = null;
    this.off = rand(-16, 16);
    this.flee = 0;
    this.threat = null;
    this.crossing = false;
    this.car = null;
    this.walkAnim = rand(0, 10);
    this.mission = null;
    this.home = opts.home || null;
    this.alert = 0;
    this.money = randi(5, 60);
    this.bust = 0;
    this.moving = false;
  }

  hurt(n, by, fx, fy) {
    if (this.dead) return;
    this.hp -= n;
    spawnBlood(this.x, this.y, 3);
    if (this.hp <= 0) this.kill(by, fx, fy);
    else if (this.ai === 'walk' || this.ai === 'flee') this.scare(fx !== undefined ? fx : this.x, fy !== undefined ? fy : this.y);
    else if (this.ai === 'gang' || this.ai === 'cop') { this.alert = 10; if (by === 'player' && this.faction) Factions.onHurt(this.faction); }
  }

  kill(by) {
    if (this.dead) return;
    this.dead = true;
    this.hp = 0;
    this.deadT = World.time;
    World.decals.push({ k: 'blood', x: this.x, y: this.y, a: rand(0, TAU), s: rand(0.8, 1.3) });
    if (dist2(this.x, this.y, World.player.x, World.player.y) < 700 * 700) { Sound.play('splat', 0.6); Sound.at('fall', this.x, this.y, 0.6); }
    if (by === 'player') {
      if (this.look.cat) { Game.message('Кошку-то за что?! 😿'); return; }
      Game.addMoney(this.ai === 'cop' ? 100 : this.faction ? 150 : 50);
      if (this.faction) Factions.onKill(this.faction);
      if (this.ai === 'cop') Wanted.crime('killcop', this.x, this.y);
      else if (this.ai !== 'gang') Wanted.crime('kill', this.x, this.y);
      // все вокруг в панике
      for (const p of World.peds) if (!p.dead && p !== this && dist2(p.x, p.y, this.x, this.y) < 300 * 300) p.scare(this.x, this.y);
    }
    if (this.weapon && this.ai !== 'player') {
      World.pickups.push(new Pickup(this.x + 8, this.y + 8, this.weapon, { ammo: { uzi: 40, ak: 30, shotgun: 8, bat: 1 }[this.weapon] || 12, once: true }));
    }
  }

  // k — насколько далеко от опасности (0 — рядом, 1 — на краю квартала): дальние
  // замечают позже и бегут меньше. Уже бегущий разворачивается от новой опасности
  scare(fx, fy, k = 0) {
    if (this.ai !== 'walk' && this.ai !== 'flee' && this.ai !== 'beach' && this.ai !== 'matkot') return;
    if (this.ai !== 'flee') {
      this.calmAI = this.beach ? 'beach' : 'walk';
      this.react = k * 0.6 + rand(0, 0.25);
    }
    this.ai = 'flee';
    this.flee = Math.max(this.flee, rand(6, 10) * (1 - k * 0.4));
    this.threat = { x: fx, y: fy };
  }

  // движение с учётом стен
  step(dx, dy) {
    const r = this.r;
    const ok = (x, y) => !City.solidAt(x - r, y - r) && !City.solidAt(x + r, y - r) && !City.solidAt(x - r, y + r) && !City.solidAt(x + r, y + r);
    let moved = false;
    if (ok(this.x + dx, this.y)) { this.x += dx; moved = true; }
    if (ok(this.x, this.y + dy)) { this.y += dy; moved = true; }
    return moved;
  }

  faceTo(x, y) { this.a = Math.atan2(y - this.y, x - this.x); }

  update(dt) {
    if (this.dead || this.car) return;
    this.cool -= dt;
    this.moving = false;
    // сбитый с мотоцикла лежит и приходит в себя
    if (this.stun > 0) { this.stun -= dt; return; }
    switch (this.ai) {
      case 'walk': this.walkAI(dt); break;
      case 'flee': this.fleeAI(dt); break;
      case 'cop': Police.copAI(this, dt); break;
      case 'gang': this.gangAI(dt); break;
      case 'idle': break;
      case 'board': this.boardAI(dt); break;
      case 'cat': this.catAI(dt); break;
      case 'follow': this.followAI(dt); break;
      case 'runner': this.runnerAI(dt); break;
      case 'beach': Beach.walkAI(this, dt); break;
      case 'matkot': Beach.matkotAI(this, dt); break;
    }
    if (this.moving) this.walkAnim += dt * 10;
  }

  walkAI(dt) {
    const tx = Math.floor(this.x / TILE), ty = Math.floor(this.y / TILE);
    if (!this.target) {
      if (!City.isWalkway(tx, ty) && !City.isRoad(tx, ty)) {
        this.target = this.findWalkway(tx, ty) || { x: tx, y: ty };
      } else this.target = { x: tx, y: ty };
    }
    const d = DIRS[this.dir];
    const gx = this.target.x * TILE + TILE / 2 + (d.y !== 0 ? this.off : 0);
    const gy = this.target.y * TILE + TILE / 2 + (d.x !== 0 ? this.off : 0);
    if (dist2(this.x, this.y, gx, gy) < 8 * 8) {
      this.target = this.nextWalk(this.target.x, this.target.y);
      // патруль банды не уходит со своей территории — разворачивается
      if (this.patrol && City.factionAt((this.target.x + 0.5) * TILE, (this.target.y + 0.5) * TILE) !== this.faction) {
        const back = { x: this.target.x - DIRS[this.dir].x, y: this.target.y - DIRS[this.dir].y };
        this.dir = (this.dir + 2) % 4; this.crossing = false;
        this.target = { x: back.x + DIRS[this.dir].x, y: back.y + DIRS[this.dir].y };
      }
      return;
    }
    // на проезжей части, а машина близко: её полоса ещё впереди — ждём,
    // уже пересекли её путь — перебегаем
    const c = this.crossing && this.carNear(this.x, this.y, 220);
    if (c) {
      const f = c.fwd, lat = (this.x - c.x) * -f.y + (this.y - c.y) * f.x;
      const mx = gx - this.x, my = gy - this.y;
      const toward = (mx * -f.y + my * f.x) * lat < 0; // идём к линии её хода
      if (toward && Math.abs(lat) > c.w / 2 + 8) { this.moving = false; return; }
      this.moveTo(gx, gy, 115, dt);
      return;
    }
    this.moveTo(gx, gy, 46, dt);
  }

  // Едет ли рядом машина к этой точке (пешеход смотрит по сторонам)
  carNear(x, y, r) {
    for (const c of World.cars) {
      if (c.dead || c.speed < 30) continue;
      const dx = x - c.x, dy = y - c.y;
      if (dx * dx + dy * dy > r * r) continue;
      if (dx * c.vx + dy * c.vy > 0) return c;
    }
    return null;
  }

  nextWalk(tx, ty) {
    if (this.crossing) {
      const n = { x: tx + DIRS[this.dir].x, y: ty + DIRS[this.dir].y };
      if (City.isWalkway(tx, ty)) this.crossing = false;
      else return n;
    }
    const opts = [];
    for (let d = 0; d < 4; d++) {
      if (d === (this.dir + 2) % 4) continue;
      if (City.isWalkway(tx + DIRS[d].x, ty + DIRS[d].y)) opts.push(d);
    }
    // иногда переходим дорогу
    const D = DIRS[this.dir];
    if (City.isRoad(tx + D.x, ty + D.y) && City.isRoad(tx + D.x * 2, ty + D.y * 2) && City.isWalkway(tx + D.x * 3, ty + D.y * 3) && Math.random() < 0.35
      && !this.carNear((tx + D.x * 1.5 + 0.5) * TILE, (ty + D.y * 1.5 + 0.5) * TILE, 360)) {
      this.crossing = true;
      return { x: tx + D.x, y: ty + D.y };
    }
    if (!opts.length) { this.dir = (this.dir + 2) % 4; return { x: tx + DIRS[this.dir].x, y: ty + DIRS[this.dir].y }; }
    if (!(opts.includes(this.dir) && Math.random() < 0.7)) this.dir = pick(opts);
    return { x: tx + DIRS[this.dir].x, y: ty + DIRS[this.dir].y };
  }

  findWalkway(tx, ty) {
    for (let r = 1; r < 6; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      if (City.isWalkway(tx + dx, ty + dy)) return { x: tx + dx, y: ty + dy };
    }
    return null;
  }

  moveTo(gx, gy, sp, dt) {
    const dx = gx - this.x, dy = gy - this.y;
    const d = Math.hypot(dx, dy) || 1;
    const want = Math.atan2(dy, dx);
    this.a += wrapAngle(want - this.a) * Math.min(1, dt * 10);
    const ok = this.step(dx / d * sp * dt, dy / d * sp * dt);
    this.moving = true;
    if (!ok) { this.target = null; this.dir = randi(0, 3); }
    return d;
  }

  fleeAI(dt) {
    this.flee -= dt;
    if (this.flee <= 0) { this.ai = this.calmAI || 'walk'; this.target = null; this.goal = null; return; }
    // первые доли секунды — замер и оглянулся на выстрел
    if (this.react > 0) { this.react -= dt; this.faceTo(this.threat.x, this.threat.y); return; }
    const dx = this.x - this.threat.x, dy = this.y - this.threat.y;
    const d = Math.hypot(dx, dy) || 1;
    let ax = dx / d, ay = dy / d;
    // бегом; огибаем препятствия
    const v = 150;
    // упёрся — с полсекунды обходит вдоль стены в одну сторону (не дёргается на месте)
    this.sideT = (this.sideT || 0) - dt;
    if (this.sideT > 0 || !this.step(ax * v * dt, ay * v * dt)) {
      if (this.sideT <= 0) { this.side = this.side || (Math.random() < 0.5 ? 1 : -1); this.sideT = 0.6; }
      const s = this.side, sx = -ay * s + ax * 0.35, sy = ax * s + ay * 0.35;
      if (this.step(sx * v * dt, sy * v * dt)) { ax = sx; ay = sy; }
      else { this.side = -s; this.sideT = 0.6; }
    }
    this.a = Math.atan2(ay, ax);
    this.moving = true;
  }

  gangAI(dt) {
    const pl = World.player;
    if (pl.dead) return;
    const d = dist(this.x, this.y, pl.x, pl.y);
    const sees = d < 420 && City.lineOfSight(this.x, this.y, pl.x, pl.y);
    // нападают сами, только если игрок им враг (или это цель миссии)
    const hostile = this.mission === 'target' || this.grudge || !this.faction || Factions.hostile(this.faction);
    if (sees && hostile && this.alert <= 0) this.cool = Math.max(this.cool, 0.8); // время на реакцию
    if (sees && hostile) this.alert = 6;
    if (this.alert <= 0 && !hostile && d < 110 && this.faction && Factions.rep[this.faction] >= 25 && World.time - (this.greetT || -99) > 30) {
      this.greetT = World.time;
      Game.message(FACTIONS[this.faction].short + ': ' + pick(GREETINGS[this.faction]), 2.5);
    }
    if (this.alert > 0) {
      this.alert -= dt;
      this.faceTo(pl.x, pl.y);
      const W = this.weapon && WEAPONS[this.weapon];
      if (W && W.melee) {
        // с битой — вплотную
        if (d > W.melee - 8) this.moveTo(pl.x, pl.y, 115, dt);
        if (d < W.melee + 6 && this.cool <= 0) {
          this.cool = rand(0.8, 1.1);
          if (pl.car) pl.car.damage(3, 'npc', pl.x, pl.y); else Game.playerHurt(W.npcDmg, 'melee');
          Sound.play('punch', 0.8);
        }
      } else {
        if (d > (this.weapon === 'shotgun' ? 120 : 190)) this.moveTo(pl.x, pl.y, 85, dt);
        if (sees && this.cool <= 0 && W) {
          // автоматы — короткими очередями
          this.burst = (this.burst || 0) + 1;
          this.cool = W.burst && this.burst % W.burst !== 0 ? W.cd * 1.4 : rand(W.npcCd[0], W.npcCd[1]);
          fireBullet(this, this.weapon, this.a);
        }
      }
    } else if (this.patrol) {
      // патруль: ведущий ходит по тротуарам своего района, остальные — за ним
      const L = this.lead;
      if (L && !L.dead && !L.car && L.alert <= 0 && World.peds.includes(L)) {
        if (dist2(this.x, this.y, L.x, L.y) > 36 * 36) this.moveTo(L.x - Math.cos(L.a) * 26, L.y - Math.sin(L.a) * 26, 52, dt);
      } else { this.lead = null; this.walkAI(dt); }
    } else if (this.home) {
      if (dist2(this.x, this.y, this.home.x, this.home.y) > 40 * 40) this.moveTo(this.home.x, this.home.y, 40, dt);
      else this.a += dt * 0.3;
    }
  }

  // Уличные кошки: бродят, убегают от людей и машин
  catAI(dt) {
    const pl = World.player;
    const d = dist(this.x, this.y, pl.x, pl.y);
    if (d < 90) {
      const a = Math.atan2(this.y - pl.y, this.x - pl.x);
      this.a = a;
      if (!this.step(Math.cos(a) * 180 * dt, Math.sin(a) * 180 * dt)) this.step(Math.cos(a + 1.5) * 180 * dt, Math.sin(a + 1.5) * 180 * dt);
      this.moving = true;
      return;
    }
    // кошка на проезжей части, а машина рядом — удирает на тротуар
    const tx = Math.floor(this.x / TILE), ty = Math.floor(this.y / TILE);
    if (City.isRoad(tx, ty) && this.carNear(this.x, this.y, 260)) {
      const w = this.findWalkway(tx, ty);
      if (w) { this.wa = Math.atan2((w.y + 0.5) * TILE - this.y, (w.x + 0.5) * TILE - this.x); this.a = this.wa; this.step(Math.cos(this.wa) * 180 * dt, Math.sin(this.wa) * 180 * dt); this.moving = true; return; }
    }
    this.wander = (this.wander || 0) - dt;
    if (this.wander <= 0) { this.wander = rand(1, 4); this.wa = Math.random() < 0.4 ? null : rand(-Math.PI, Math.PI); }
    if (this.wa !== null && this.wa !== undefined) {
      this.a = this.wa;
      // гуляет по тротуарам и дворам, на дорогу сама не выходит
      const nx = this.x + Math.cos(this.wa) * 20, ny = this.y + Math.sin(this.wa) * 20;
      if (!City.isRoad(tx, ty) && City.isRoad(Math.floor(nx / TILE), Math.floor(ny / TILE))) { this.wa = null; return; }
      if (!this.step(Math.cos(this.wa) * 30 * dt, Math.sin(this.wa) * 30 * dt)) this.wa = null;
      this.moving = true;
    }
  }

  // Союзник идёт за игроком и стреляет по врагам миссии
  followAI(dt) {
    const pl = World.player;
    const tx = pl.car ? pl.car.x : pl.x, ty = pl.car ? pl.car.y : pl.y;
    const dp = dist(this.x, this.y, tx, ty);
    // вооружённый союзник отстреливается, пока игрок рядом; безоружный (Карим) просто не отстаёт
    const W = this.weapon && WEAPONS[this.weapon];
    if (W && !W.melee && dp < 600) {
      let foe = null, fd = 380;
      for (const p of World.peds) {
        if (p.dead || p === this || p.ai !== 'gang' || p.mission !== 'target') continue;
        const d = dist(this.x, this.y, p.x, p.y);
        if (d < fd && City.lineOfSight(this.x, this.y, p.x, p.y)) { fd = d; foe = p; }
      }
      if (foe) {
        this.faceTo(foe.x, foe.y);
        if (this.cool <= 0) { this.cool = rand(0.5, 0.9); fireBullet(this, this.weapon, this.a); }
        return;
      }
    }
    if (dp <= 70) { this.stuckT = 0; return; }
    // рядом — напрямик; далеко или упёрлись в стену — по проходам, как пешеход (цель обновляем не каждый кадр)
    if (dp < 260 && !(this.stuckT > 0)) {
      const x0 = this.x, y0 = this.y;
      this.moveTo(tx, ty, 150, dt);
      if (this.x !== x0 || this.y !== y0) return;
      this.stuckT = 1.5;
    }
    this.stuckT = (this.stuckT || 0) - dt;
    this.fT = (this.fT || 0) - dt;
    if (this.fT <= 0 || !this.fGoal) { this.fT = 0.6; this.fGoal = { x: tx, y: ty }; }
    Story.walkTo(this, this.fGoal, 150, dt);
  }

  // Пассажир идёт к машине игрока
  boardAI(dt) {
    const car = World.player.car;
    if (!car) return;
    const d = this.moveTo(car.x, car.y, 70, dt);
    // машины крупные — садимся, подойдя к борту; застряли у бордюра — всё равно садимся
    this.boardT = (this.boardT || 0) + dt;
    if (d < car.w / 2 + 30 || (this.boardT > 3 && d < 140)) {
      this.boardT = 0;
      this.car = car; this.seat = true;
      car.passenger = this;
      World.peds.splice(World.peds.indexOf(this), 1);
      Sound.play('doorClose', 0.6);
    }
  }

  draw(ctx) {
    if (this.car) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    ctx.scale(PED_SCALE, PED_SCALE);
    drawPersonLook(ctx, this.look, this.walkAnim, this.moving, this.weapon, this.dead || this.stun > 0);
    ctx.restore();
    if (this.dead) return;
    if (this.mission === 'target') drawTargetMark(ctx, this.x, this.y - 22);
    else if (this.mission === 'ally') drawTargetMark(ctx, this.x, this.y - 22, '#4caf50');
    else if (this.fare) drawTargetMark(ctx, this.x, this.y - 22, '#ffd400');
  }
}

// Уличный таксофон сверху: козырёк на столбе, синяя полоса, трубка сбоку —
// пока нет сгенерированной картинки props/payphone
function drawPayphone(ctx, x, y) {
  ctx.save(); ctx.translate(x, y); ctx.scale(1.3, 1.3);
  ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(-9, -6, 22, 18);
  ctx.fillStyle = '#9ea7ad'; ctx.fillRect(-11, -9, 22, 17);
  ctx.fillStyle = '#c9d1d6'; ctx.fillRect(-11, -9, 22, 4);
  ctx.fillStyle = '#1565c0'; ctx.fillRect(-11, 5, 22, 3);
  ctx.fillStyle = '#263238'; ctx.fillRect(-7, -3, 9, 5); ctx.fillRect(-9, -4, 3, 7); ctx.fillRect(1, -4, 3, 7);
  ctx.strokeStyle = '#263238'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(4, 0); ctx.quadraticCurveTo(9, 2, 7, 6); ctx.stroke();
  ctx.fillStyle = '#ffd54f'; ctx.fillRect(5, -6, 4, 3);
  ctx.restore();
}

function drawTargetMark(ctx, x, y, col = '#ff3b3b') {
  const b = Math.sin(World.time * 6) * 3;
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(x - 7, y - 10 + b); ctx.lineTo(x + 7, y - 10 + b); ctx.lineTo(x, y + b); ctx.fill();
}

// =====================================================================
//                         ПУЛИ И ЧАСТИЦЫ
// =====================================================================
// стрельба и взрывы: прохожие в радиусе квартала (≈11 клеток) разбегаются от эпицентра
function panic(x, y, r = 700) {
  for (const p of World.peds) {
    if (p.dead) continue;
    const d2 = dist2(p.x, p.y, x, y);
    if (d2 < r * r) p.scare(x, y, Math.sqrt(d2) / r);
  }
}

function fireBullet(shooter, weapon, angle) {
  const W = WEAPONS[weapon];
  const sp = W.spread + (shooter === World.player ? 0 : 0.09);
  const mx = shooter.x + Math.cos(angle) * 20, my = shooter.y + Math.sin(angle) * 20;
  for (let i = 0; i < (W.pellets || 1); i++) {
    const a = angle + rand(-sp, sp), v = W.pellets ? rand(1250, 1550) : 1500;
    World.bullets.push({ x: mx, y: my, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: W.life || 0.45, owner: shooter, weapon });
  }
  spawnParticle(mx, my, 'flash');
  const pl = World.player;
  const d = dist(shooter.x, shooter.y, pl.x, pl.y);
  if (d < 1100) Sound.shot(weapon, d);
  // выстрелы пугают прохожих в радиусе квартала
  panic(shooter.x, shooter.y);
  if (shooter === pl) { Wanted.crime('shoot', pl.x, pl.y); Game.shots = (Game.shots || 0) + 1; }
}

function updateBullets(dt) {
  const pl = World.player;
  for (let i = World.bullets.length - 1; i >= 0; i--) {
    const b = World.bullets[i];
    const nx = b.x + b.vx * dt, ny = b.y + b.vy * dt;
    let hit = false;
    const byPlayer = b.owner === pl;
    // люди
    for (const p of World.peds) {
      if (p.dead || p === b.owner || p.car) continue;
      if (b.owner.faction && p.faction === b.owner.faction) continue; // бойцы банды своих не задевают
      if (segCircle(b.x, b.y, nx, ny, p.x, p.y, p.r + 2) >= 0) {
        p.hurt(WEAPONS[b.weapon].dmg, byPlayer ? 'player' : 'npc', b.x, b.y);
        if (Sound.can('hitPed', 0.08)) Sound.at('punch', p.x, p.y, 0.35, 500);
        if (byPlayer && (p.ai === 'cop')) Wanted.crime('shootcop', p.x, p.y);
        hit = true; break;
      }
    }
    // игрок
    if (!hit && !byPlayer && !pl.dead) {
      if (pl.car) {
        if (pl.car.contains(nx, ny)) { pl.car.damage(WEAPONS[b.weapon].carDmg, 'npc', nx, ny); spawnSparks(nx, ny, 2); hit = true; if (Sound.can('hitCar', 0.06)) Sound.play('hitCar', 0.6); }
      } else if (segCircle(b.x, b.y, nx, ny, pl.x, pl.y, 11) >= 0) {
        Game.playerHurt(WEAPONS[b.weapon].plDmg || 8, 'shot');
        spawnBlood(pl.x, pl.y, 2);
        hit = true;
      }
    }
    // машины
    if (!hit) {
      for (const c of World.cars) {
        if ((c === pl.car && byPlayer) || c === b.owner.car) continue;
        if (c.contains(nx, ny)) {
          c.damage(WEAPONS[b.weapon].carDmg, byPlayer ? 'player' : 'npc', nx, ny);
          spawnSparks(nx, ny, 3);
          if (Sound.can('hitCar', 0.06)) Sound.at('hitCar', nx, ny, 0.5, 650);
          if (byPlayer && c.driver && c.driver !== 'player' && c.ai === 'traffic' && Math.random() < 0.3) bailOut(c);
          hit = true; break;
        }
      }
    }
    if (!hit && City.solidAt(nx, ny)) { spawnSparks(b.x, b.y, 2); hit = true; if (Sound.can('hitWall', 0.07)) Sound.at('hitWall', nx, ny, 0.35, 550); }
    b.x = nx; b.y = ny; b.life -= dt;
    if (hit || b.life <= 0) World.bullets.splice(i, 1);
  }
}

// Водитель в панике выскакивает из машины
// Значок оружия по центру (пикапы, витрина магазина): ширина ~44·s
function drawWeaponIcon(g, kind, s = 1) {
  const D = '#212121';
  g.save(); g.scale(s, s);
  switch (kind) {
    case 'bat': g.rotate(-0.5); g.fillStyle = '#a1662f'; g.beginPath(); g.moveTo(-20, -2); g.lineTo(13, -5); g.quadraticCurveTo(22, 0, 13, 5); g.lineTo(-20, 2); g.closePath(); g.fill(); g.fillStyle = '#3e2723'; g.fillRect(-22, -2.5, 6, 5); break;
    case 'pistol': g.fillStyle = D; g.fillRect(-12, -6, 24, 7); g.fillRect(-10, 0, 7, 12); break;
    case 'uzi': g.fillStyle = D; g.fillRect(-16, -6, 32, 9); g.fillRect(-3, 2, 6, 15); g.fillRect(-14, 2, 5, 8); break;
    case 'shotgun': g.fillStyle = '#6d4c41'; g.fillRect(-22, -3, 14, 8); g.fillStyle = D; g.fillRect(-8, -4, 30, 5); g.fillStyle = '#5d4037'; g.fillRect(2, 1, 10, 4); break;
    case 'ak': g.fillStyle = '#8d5524'; g.fillRect(-22, -3, 12, 8); g.fillRect(6, -4, 8, 5); g.fillStyle = D; g.fillRect(-10, -5, 32, 5); g.fillStyle = '#bf6c2f'; g.beginPath(); g.moveTo(-4, 0); g.quadraticCurveTo(-2, 12, 4, 14); g.lineTo(8, 12); g.quadraticCurveTo(2, 8, 2, 0); g.fill(); break;
    case 'grenade': g.fillStyle = '#4b5d2a'; g.beginPath(); g.ellipse(0, 3, 9, 11, 0, 0, TAU); g.fill(); g.fillStyle = '#9e9e9e'; g.fillRect(-4, -11, 8, 5); g.strokeStyle = '#9e9e9e'; g.lineWidth = 2; g.beginPath(); g.arc(7, -9, 5, 0, TAU); g.stroke(); break;
    case 'rpg': g.fillStyle = '#556b2f'; g.fillRect(-22, -4, 36, 8); g.fillStyle = '#8d6e63'; g.beginPath(); g.moveTo(14, -7); g.lineTo(24, 0); g.lineTo(14, 7); g.fill(); g.fillStyle = D; g.fillRect(-6, 4, 5, 8); break;
    case 'armor': g.fillStyle = '#455a64'; g.beginPath(); g.moveTo(-14, -14); g.lineTo(14, -14); g.lineTo(12, 14); g.lineTo(-12, 14); g.closePath(); g.fill(); g.fillStyle = '#90a4ae'; g.fillRect(-9, -9, 18, 6); break;
  }
  g.restore();
}

// Гранаты и ракеты РПГ
function throwGrenade(owner, a) {
  World.projectiles.push({ k: 'grenade', x: owner.x + Math.cos(a) * 16, y: owner.y + Math.sin(a) * 16, vx: Math.cos(a) * 430, vy: Math.sin(a) * 430, t: 0, owner, spin: 0 });
  Sound.play('weapon', 0.5);
}

function fireRocket(owner, a) {
  World.projectiles.push({ k: 'rocket', x: owner.x + Math.cos(a) * 24, y: owner.y + Math.sin(a) * 24, vx: Math.cos(a) * 820, vy: Math.sin(a) * 820, a, t: 0, owner });
  Sound.noiseBurst(0.5, 1800, 0.6);
  spawnParticle(owner.x + Math.cos(a) * 20, owner.y + Math.sin(a) * 20, 'flash');
  if (owner === World.player) Wanted.crime('shoot', owner.x, owner.y);
}

function updateProjectiles(dt) {
  const pl = World.player;
  for (let i = World.projectiles.length - 1; i >= 0; i--) {
    const q = World.projectiles[i];
    q.t += dt;
    const byPl = q.owner === pl;
    let boom = false;
    if (q.k === 'grenade') {
      // катится и отскакивает от стен, взрывается через 1,4 с
      const k = Math.max(0, 1 - dt * 1.6);
      q.vx *= k; q.vy *= k; q.spin += dt * Math.hypot(q.vx, q.vy) * 0.05;
      if (City.solidAt(q.x + q.vx * dt, q.y)) { q.vx *= -0.5; if (Math.abs(q.vx) > 40) Sound.at('bounce', q.x, q.y, 0.6); }
      if (City.solidAt(q.x, q.y + q.vy * dt)) { q.vy *= -0.5; if (Math.abs(q.vy) > 40) Sound.at('bounce', q.x, q.y, 0.6); }
      q.x += q.vx * dt; q.y += q.vy * dt;
      boom = q.t >= 1.4;
    } else {
      // ракета летит прямо до первого препятствия
      const nx = q.x + q.vx * dt, ny = q.y + q.vy * dt;
      if (Math.random() < 0.8) spawnParticle(q.x, q.y, 'smoke');
      boom = q.t > 1.5 || City.solidAt(nx, ny);
      for (const c of World.cars) if (!boom && c !== (q.owner.car || null) && !c.dead && c.contains(nx, ny, 4)) { boom = true; q.hitCar = c; }
      for (const p of World.peds) if (!boom && p !== q.owner && !p.dead && !p.car && dist2(p.x, p.y, nx, ny) < 16 * 16) boom = true;
      if (!boom && !byPl && !pl.dead && (pl.car ? pl.car.contains(nx, ny, 4) : dist2(pl.x, pl.y, nx, ny) < 16 * 16)) boom = true;
      q.x = nx; q.y = ny;
    }
    if (boom) {
      World.projectiles.splice(i, 1);
      blast(q.x, q.y, { r: q.k === 'rocket' ? 120 : 105, carDmg: q.k === 'rocket' ? 90 : 60, by: byPl ? 'player' : null, plDmg: 70 });
      // прямое попадание ракеты — машина гарантированно выведена из строя
      if (q.hitCar && !q.hitCar.dead) q.hitCar.damage(q.hitCar.maxHp, byPl ? 'player' : null, q.x, q.y);
      if (byPl) Wanted.crime('explode', q.x, q.y);
    }
  }
}

function drawProjectiles(ctx) {
  for (const q of World.projectiles) {
    ctx.save(); ctx.translate(q.x, q.y);
    if (q.k === 'grenade') { ctx.rotate(q.spin); ctx.fillStyle = '#4b5d2a'; ctx.beginPath(); ctx.ellipse(0, 0, 5, 4, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#9e9e9e'; ctx.fillRect(3, -1.5, 3, 3); }
    else { ctx.rotate(q.a); ctx.fillStyle = '#556b2f'; ctx.fillRect(-8, -2.5, 14, 5); ctx.fillStyle = '#8d6e63'; ctx.beginPath(); ctx.moveTo(6, -3.5); ctx.lineTo(12, 0); ctx.lineTo(6, 3.5); ctx.fill(); ctx.fillStyle = '#ffb74d'; ctx.beginPath(); ctx.arc(-10, 0, 3.5, 0, TAU); ctx.fill(); }
    ctx.restore();
  }
}

// Взрыв: огонь, дым, воронка, урон и отброс машин, люди в радиусе гибнут.
// r — радиус поражения людей; by — кто виноват (для розыска и денег).
function blast(x, y, opts = {}) {
  const r = opts.r || 110;
  Sound.explosion();
  Game.shake(opts.shake || 14);
  for (let i = 0; i < 26; i++) spawnParticle(x, y, 'fire');
  for (let i = 0; i < 18; i++) spawnParticle(x, y, 'smoke');
  World.decals.push({ k: 'burn', x, y, a: rand(0, TAU), s: rand(0.9, 1.3) * r / 110 });
  for (const c of World.cars) {
    if (c === opts.skip || c.dead) continue;
    const d = dist(c.x, c.y, x, y);
    if (d < r + 10) { c.damage((opts.carDmg || 45) * (1 - d / (r + 10)), opts.by, x, y); const k = 300 * (1 - d / (r + 20)) / (d || 1); c.vx += (c.x - x) * k; c.vy += (c.y - y) * k; }
  }
  for (const p of World.peds) {
    if (p.dead) continue;
    const d = dist(p.x, p.y, x, y);
    if (d < r) p.hurt(120, opts.by, x, y);
  }
  panic(x, y, 900);
  const pl = World.player;
  if (!pl.car && !pl.dead) { const d = dist(pl.x, pl.y, x, y); if (d < r) Game.playerHurt((opts.plDmg || 80) * (1 - d / r) + 10, 'explosion'); }
}

// Мотоциклиста таранят — он слетает с мотоцикла и лежит пару секунд
function throwRider(c, hx, hy, by) {
  const d = c.driver;
  if (!d || d === 'player' || !c.moto) return;
  const scripted = c.ai === 'scripted', gang = c.gang && c.gang.includes(d);
  if (gang) GangCars.exit(c); else bailOut(c);
  const dx = d.x - hx, dy = d.y - hy, k = Math.hypot(dx, dy) || 1;
  for (let i = 0; i < 6; i++) d.step(dx / k * 6, dy / k * 6);
  d.stun = 1.8;
  if (scripted) d.ai = 'idle'; // цель миссии: дальше решает миссия
  d.hurt(20, by, hx, hy);
  if (!d.dead) Sound.at('fall', d.x, d.y, 0.8);
  c.ai = null;
  if (scripted) { c.stalled = true; c.locked = true; c.maxSpeed = 0; }
}

function bailOut(c) {
  const d = c.driver;
  if (!d || d === 'player') return;
  // бандиты из машины не убегают — выходят и стреляют
  if (c.turf && c.gang) { GangCars.angry(c); GangCars.exit(c); return; }
  c.driver = null;
  const f = c.fwd;
  d.car = null;
  d.x = c.x - f.y * (c.w / 2 + 14); d.y = c.y + f.x * (c.w / 2 + 14);
  if (City.solidAt(d.x, d.y)) { d.x = c.x + f.y * (c.w / 2 + 14); d.y = c.y - f.x * (c.w / 2 + 14); }
  World.peds.push(d);
  if (d.ai !== 'cop') { d.ai = 'walk'; d.scare(World.player.x, World.player.y); }
}

function spawnParticle(x, y, k) {
  if (World.particles.length > 500) return;
  const p = { x, y, k, t: 0, vx: rand(-40, 40), vy: rand(-40, 40), life: 1, s: 1 };
  if (k === 'fire') { p.life = rand(0.4, 0.9); p.vx = rand(-60, 60); p.vy = rand(-60, 60); p.s = rand(8, 18); }
  if (k === 'smoke') { p.life = rand(1.2, 2.4); p.s = rand(8, 16); p.vx = rand(-15, 15) + 12; p.vy = rand(-25, -5); }
  if (k === 'spark') { p.life = rand(0.15, 0.35); p.vx = rand(-250, 250); p.vy = rand(-250, 250); }
  if (k === 'blood') { p.life = rand(0.3, 0.6); p.vx = rand(-90, 90); p.vy = rand(-90, 90); }
  if (k === 'flash') { p.life = 0.06; p.vx = 0; p.vy = 0; }
  if (k === 'money') { p.life = 1.2; p.vx = 0; p.vy = -40; }
  World.particles.push(p);
}
function spawnSparks(x, y, n) { for (let i = 0; i < n; i++) spawnParticle(x, y, 'spark'); }
function spawnBlood(x, y, n) { for (let i = 0; i < n; i++) spawnParticle(x, y, 'blood'); }

function addSkid(car) {
  World.decals.push({ k: 'skid', x: car.x - car.fwd.x * car.l * 0.3, y: car.y - car.fwd.y * car.l * 0.3, a: car.a, s: 1 });
}

function updateParticles(dt) {
  for (let i = World.particles.length - 1; i >= 0; i--) {
    const p = World.particles[i];
    p.t += dt;
    p.x += p.vx * dt; p.y += p.vy * dt;
    if (p.k === 'fire') { p.vx *= 0.92; p.vy *= 0.92; }
    if (p.t >= p.life) World.particles.splice(i, 1);
  }
  if (World.decals.length > 260) World.decals.splice(0, World.decals.length - 260);
}

function drawDecals(ctx, view) {
  for (const d of World.decals) {
    if (d.x < view.x0 - 60 || d.x > view.x1 + 60 || d.y < view.y0 - 60 || d.y > view.y1 + 60) continue;
    ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.a);
    if (d.k === 'blood') { ctx.fillStyle = 'rgba(140,10,10,0.75)'; ctx.beginPath(); ctx.ellipse(0, 0, 14 * d.s, 10 * d.s, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(10 * d.s, 6, 6 * d.s, 4 * d.s, 0, 0, TAU); ctx.fill(); }
    else if (d.k === 'burn') { ctx.fillStyle = 'rgba(20,20,20,0.5)'; ctx.beginPath(); ctx.ellipse(0, 0, 50 * d.s, 40 * d.s, 0, 0, TAU); ctx.fill(); }
    else if (d.k === 'skid') { ctx.fillStyle = 'rgba(20,20,20,0.35)'; ctx.fillRect(-16, -5, 5, 10); ctx.fillRect(11, -5, 5, 10); }
    ctx.restore();
  }
}

function drawParticles(ctx) {
  for (const p of World.particles) {
    const k = 1 - p.t / p.life;
    switch (p.k) {
      case 'fire': ctx.fillStyle = `rgba(255,${Math.floor(120 + 120 * k)},40,${k})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.s * (0.5 + k * 0.5), 0, TAU); ctx.fill(); break;
      case 'smoke': ctx.fillStyle = `rgba(60,60,60,${k * 0.45})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.s * (2 - k), 0, TAU); ctx.fill(); break;
      case 'spark': ctx.fillStyle = `rgba(255,230,120,${k})`; ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3); break;
      case 'blood': ctx.fillStyle = `rgba(170,10,10,${k})`; ctx.fillRect(p.x - 2, p.y - 2, 4, 4); break;
      case 'flash': ctx.fillStyle = 'rgba(255,240,170,0.9)'; ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, TAU); ctx.fill(); break;
      case 'money': ctx.fillStyle = `rgba(80,220,90,${k})`; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.text || '₪', p.x, p.y); break;
    }
  }
}

function drawBullets(ctx) {
  ctx.strokeStyle = 'rgba(255,240,180,0.9)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (const b of World.bullets) { ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - b.vx * 0.012, b.y - b.vy * 0.012); }
  ctx.stroke();
}

// =====================================================================
//                         ПРЕДМЕТЫ НА ЗЕМЛЕ
// =====================================================================
class Pickup {
  constructor(x, y, kind, opts = {}) {
    this.x = x; this.y = y; this.kind = kind;
    this.ammo = opts.ammo || ({ uzi: 60, pistol: 24, shotgun: 12, ak: 60, grenade: 3, rpg: 2, bat: 1 }[kind] || 0);
    this.amount = opts.amount || 0;
    this.once = !!opts.once;
    this.respawn = 0;
    this.active = true;
  }

  update(dt) {
    if (!this.active) {
      this.respawn -= dt;
      if (this.respawn <= 0) this.active = true;
      return;
    }
    const pl = World.player;
    if (pl.dead || pl.car) return;
    if (dist2(pl.x, pl.y, this.x, this.y) < 24 * 24) {
      if (this.kind === 'armor') {
        pl.armor = 100;
        Game.message('Бронежилет');
      } else if (this.kind === 'health') {
        if (pl.hp >= 100) return;
        pl.hp = 100;
        Game.message('Здоровье восстановлено');
      } else if (this.kind === 'money') {
        Game.addMoney(this.amount);
        Sound.play('coins', 0.8);
      } else {
        Sound.play('belt', 0.7); Sound.play('latch', 0.5);
        pl.ammo[this.kind] = (pl.ammo[this.kind] || 0) + this.ammo;
        pl.weapon = this.kind;
        Game.message(WEAPONS[this.kind].name + (WEAPONS[this.kind].melee ? '' : ' +' + this.ammo));
      }
      Sound.play('pickup', 0.7);
      this.active = false;
      this.respawn = 60;
      if (this.once) this.dead = true;
    }
  }

  draw(ctx) {
    if (!this.active) return;
    const b = Math.sin(World.time * 4) * 2;
    ctx.save();
    ctx.translate(this.x, this.y + b);
    ctx.fillStyle = 'rgba(255,255,140,0.25)';
    ctx.beginPath(); ctx.arc(0, 0, 16 + Math.sin(World.time * 6) * 2, 0, TAU); ctx.fill();
    if (this.kind === 'armor') {
      ctx.fillStyle = '#455a64'; ctx.beginPath(); ctx.moveTo(-9, -9); ctx.lineTo(9, -9); ctx.lineTo(8, 9); ctx.lineTo(-8, 9); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#90a4ae'; ctx.fillRect(-6, -6, 12, 4);
    } else if (this.kind === 'health') {
      ctx.fillStyle = '#e53935';
      ctx.beginPath(); ctx.moveTo(0, 8); ctx.bezierCurveTo(-14, -2, -8, -14, 0, -6); ctx.bezierCurveTo(8, -14, 14, -2, 0, 8); ctx.fill();
    } else if (this.kind === 'money') {
      ctx.fillStyle = '#3fae49'; ctx.fillRect(-10, -6, 20, 12); ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('₪', 0, 0);
    } else {
      const im = (this.kind === 'uzi' || this.kind === 'pistol') && Assets.img[this.kind === 'uzi' ? 'weapon_machine' : 'weapon_gun'];
      if (im && im.width) ctx.drawImage(im, -im.width, -im.height, im.width * 2, im.height * 2);
      else drawWeaponIcon(ctx, this.kind, 0.55);
    }
    ctx.restore();
  }
}
