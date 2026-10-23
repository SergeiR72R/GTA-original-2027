// Машины, пешеходы, пули, частицы, подбираемые предметы.
'use strict';

const World = {
  cars: [],
  peds: [],
  bullets: [],
  particles: [],
  decals: [],
  pickups: [],
  phones: [],
  markers: [],
  player: null,
  time: 0,
};


const WEAPONS = {
  fists: { name: 'Кулаки', cd: 0.4, dmg: 25, sprite: 'stand' },
  pistol: { name: 'Пистолет', cd: 0.32, dmg: 34, carDmg: 6, spread: 0.04, sprite: 'gun' },
  uzi: { name: 'Узи', cd: 0.08, dmg: 20, carDmg: 4, spread: 0.12, sprite: 'machine' },
};

// =====================================================================
//                               МАШИНА
// =====================================================================
// точки корпуса: углы, середины носа/кормы и бортов (доли длины и ширины)
const HULL_F = [1, 1, -1, -1, 1, -1, 0, 0];
const HULL_R = [1, -1, 1, -1, 0, 0, 1, -1];
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
    const hl = this.l / 2 - 2, hw = this.w / 2 - 2;
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
    const turn = this.T.turn * clamp(vf / 140, -1, 1) * (handbrake ? 1.35 : 1);
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
    if (hit && sp > 110 && World.time - this.lastHit > 0.4) {
      this.lastHit = World.time;
      // удар о стену на полной скорости — примерно 15% «здоровья» обычной машины
      const sg = this.fspeed >= 0 ? 1 : -1;
      if (sp > 150) this.damage((sp - 150) * 0.07, null, this.x + this.fwd.x * this.l / 2 * sg, this.y + this.fwd.y * this.l / 2 * sg);
      if (this.driver === 'player' || dist2(this.x, this.y, World.player.x, World.player.y) < 600 * 600) Sound.play('crash' + randi(0, 2), clamp(sp / 400, 0.2, 1));
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
    this.hp -= n;
    if (by === 'player' && this.police) Wanted.crime('hitcop', this.x, this.y);
    if (this.hp <= 0) {
      // машина загорается и взрывается не сразу — есть время выскочить
      this.hp = 0;
      this.dead = true;
      this.burn = 5;
      this.killedBy = by;
      if (this.driver === 'player') Game.message('Машина горит — выпрыгивай (F)!', 3);
    }
  }

  explode() {
    this.burn = -1;
    Sound.explosion();
    Game.shake(14);
    for (let i = 0; i < 26; i++) spawnParticle(this.x, this.y, 'fire');
    for (let i = 0; i < 18; i++) spawnParticle(this.x, this.y, 'smoke');
    World.decals.push({ k: 'burn', x: this.x, y: this.y, a: rand(0, TAU), s: rand(0.9, 1.3) });
    // выбросить водителя
    if (this.driver && this.driver !== 'player') { const d = this.driver; this.driver = null; d.car = null; d.x = this.x + 30; d.y = this.y; World.peds.push(d); d.kill('explosion'); }
    if (this.passenger) { this.passenger.car = null; this.passenger.x = this.x - 30; this.passenger.y = this.y; World.peds.push(this.passenger); this.passenger.kill('explosion'); this.passenger = null; }
    if (this.driver === 'player') Game.playerHurt(200, 'explosion');
    // урон по округе
    for (const c of World.cars) {
      if (c === this || c.dead) continue;
      const d = dist(c.x, c.y, this.x, this.y);
      if (d < 120) { c.damage(45 * (1 - d / 120), this.killedBy); const k = 300 * (1 - d / 130) / (d || 1); c.vx += (c.x - this.x) * k; c.vy += (c.y - this.y) * k; }
    }
    for (const p of World.peds) {
      if (p.dead) continue;
      const d = dist(p.x, p.y, this.x, this.y);
      if (d < 110) p.hurt(120, this.killedBy, this.x, this.y);
      else if (d < 400) p.scare(this.x, this.y);
    }
    const pl = World.player;
    if (!pl.car && !pl.dead) { const d = dist(pl.x, pl.y, this.x, this.y); if (d < 110) Game.playerHurt(80 * (1 - d / 110) + 10, 'explosion'); }
    if (this.killedBy === 'player') { Game.addMoney(this.police ? 500 : 250); if (this.police) Wanted.crime('killcop', this.x, this.y); else Wanted.crime('explode', this.x, this.y); }
  }

  update(dt) {
    if (this.dead) {
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
    if (this.ai === 'traffic' && this.driver) this.trafficAI(dt);
    else if (this.ai === 'police' && this.driver) Police.carAI(this, dt);
    else if (this.ai === 'scripted') { /* управляется миссией */ }
    else this.drive(dt, 0, 0, true);
    if (this.skid && this.speed > 120 && Math.random() < 0.3) addSkid(this);
  }

  // ---------- ИИ городского трафика ----------
  pickNext(tx, ty) {
    let opts = City.laneDirs(tx, ty).filter((d) => d !== (this.dir + 2) % 4);
    if (!opts.length) opts = City.laneDirs(tx, ty);
    if (!opts.length) return null;
    let d = opts.includes(this.dir) && Math.random() < 0.65 ? this.dir : pick(opts);
    this.dir = d;
    return { x: tx + DIRS[d].x, y: ty + DIRS[d].y };
  }

  trafficAI(dt) {
    const tx = Math.floor(this.x / TILE), ty = Math.floor(this.y / TILE);
    if (!this.target || this.recover > 0) {
      if (this.recover > 0) {
        this.recover -= dt;
        this.drive(dt, -0.7, this.recoverSteer, false);
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
    }
    let gx = this.target.x * TILE + TILE / 2, gy = this.target.y * TILE + TILE / 2;
    // если подъехали к центру клетки — берём следующую
    if (dist2(this.x, this.y, gx, gy) < 26 * 26) {
      const nt = this.pickNext(this.target.x, this.target.y);
      if (nt) { this.target = nt; gx = nt.x * TILE + TILE / 2; gy = nt.y * TILE + TILE / 2; }
    }
    const want = Math.atan2(gx - this.x, -(gy - this.y));
    const diff = wrapAngle(want - this.a);
    const steer = clamp(diff * 2.5, -1, 1);
    const highway = tx === 80 || tx === 81;
    let cruise = highway ? 230 : 140;
    if (Math.abs(diff) > 0.35) cruise = 70;
    // не врезаться в то, что впереди
    const block = this.obstacleAhead();
    let throttle = this.fspeed < cruise ? 0.8 : 0;
    if (block) {
      throttle = this.fspeed > 5 ? -1 : 0;
      this.stuck += dt;
      if (block === 'player' && Math.random() < dt * 0.5) { this.honk(); }
    } else this.stuck = Math.max(0, this.stuck - dt);
    if (!block && this.speed < 10 && throttle > 0) this.stuck += dt * 0.5;
    if (this.stuck > 4) { this.stuck = 0; this.recover = 0.9; this.recoverSteer = rand(-1, 1); this.target = null; }
    this.drive(dt, throttle, steer, false);
  }

  honk() {
    if (World.time - this.horn < 2) return;
    this.horn = World.time;
    if (dist2(this.x, this.y, World.player.x, World.player.y) < 500 * 500) Sound.horn();
  }

  obstacleAhead() {
    const f = this.fwd;
    const look = 40 + Math.max(0, this.fspeed) * 0.35;
    const ax = this.x + f.x * (this.l / 2 + look / 2), ay = this.y + f.y * (this.l / 2 + look / 2);
    const rr = look / 2 + 6;
    for (const c of World.cars) {
      if (c === this) continue;
      if (dist2(c.x, c.y, ax, ay) < (rr + c.w / 2) * (rr + c.w / 2)) return c.driver === 'player' ? 'player' : 'car';
    }
    const pl = World.player;
    if (!pl.car && !pl.dead && dist2(pl.x, pl.y, ax, ay) < rr * rr) return 'player';
    for (const p of World.peds) {
      if (p.dead) continue;
      if (dist2(p.x, p.y, ax, ay) < rr * rr) return 'ped';
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
    this.r = 9;
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
    if (dist2(this.x, this.y, World.player.x, World.player.y) < 700 * 700) Sound.play('splat', 0.6);
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
      World.pickups.push(new Pickup(this.x + 8, this.y + 8, this.weapon, { ammo: this.weapon === 'uzi' ? 40 : 12, once: true }));
    }
  }

  scare(fx, fy) {
    if (this.ai !== 'walk' && this.ai !== 'flee') return;
    this.ai = 'flee';
    this.flee = rand(4, 7);
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
    switch (this.ai) {
      case 'walk': this.walkAI(dt); break;
      case 'flee': this.fleeAI(dt); break;
      case 'cop': Police.copAI(this, dt); break;
      case 'gang': this.gangAI(dt); break;
      case 'idle': break;
      case 'board': this.boardAI(dt); break;
      case 'cat': this.catAI(dt); break;
      case 'follow': this.followAI(dt); break;
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
      return;
    }
    this.moveTo(gx, gy, 46, dt);
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
    if (City.isRoad(tx + D.x, ty + D.y) && City.isRoad(tx + D.x * 2, ty + D.y * 2) && City.isWalkway(tx + D.x * 3, ty + D.y * 3) && Math.random() < 0.35) {
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
    if (this.flee <= 0) { this.ai = 'walk'; this.target = null; return; }
    const dx = this.x - this.threat.x, dy = this.y - this.threat.y;
    const d = Math.hypot(dx, dy) || 1;
    let ax = dx / d, ay = dy / d;
    // огибаем препятствия
    if (!this.step(ax * 120 * dt, ay * 120 * dt)) {
      const s = Math.random() < 0.5 ? 1 : -1;
      this.step(-ay * s * 120 * dt, ax * s * 120 * dt);
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
    const hostile = this.mission === 'target' || !this.faction || Factions.hostile(this.faction);
    if (sees && hostile && this.alert <= 0) this.cool = Math.max(this.cool, 0.8); // время на реакцию
    if (sees && hostile) this.alert = 6;
    if (this.alert <= 0 && !hostile && d < 110 && this.faction && Factions.rep[this.faction] >= 25 && World.time - (this.greetT || -99) > 30) {
      this.greetT = World.time;
      Game.message(FACTIONS[this.faction].short + ': ' + pick(GREETINGS[this.faction]), 2.5);
    }
    if (this.alert > 0) {
      this.alert -= dt;
      this.faceTo(pl.x, pl.y);
      if (d > 190) this.moveTo(pl.x, pl.y, 85, dt);
      if (sees && this.cool <= 0 && this.weapon) {
        // узи — короткими очередями
        this.burst = (this.burst || 0) + 1;
        if (this.weapon === 'uzi') this.cool = this.burst % 4 === 0 ? rand(1.0, 1.6) : 0.12;
        else this.cool = rand(0.8, 1.3);
        fireBullet(this, this.weapon, this.a);
      }
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
    this.wander = (this.wander || 0) - dt;
    if (this.wander <= 0) { this.wander = rand(1, 4); this.wa = Math.random() < 0.4 ? null : rand(-Math.PI, Math.PI); }
    if (this.wa !== null && this.wa !== undefined) {
      this.a = this.wa;
      if (!this.step(Math.cos(this.wa) * 30 * dt, Math.sin(this.wa) * 30 * dt)) this.wa = null;
      this.moving = true;
    }
  }

  // Союзник идёт за игроком и стреляет по врагам миссии
  followAI(dt) {
    const pl = World.player;
    let foe = null, fd = 380;
    for (const p of World.peds) {
      if (p.dead || p === this || p.ai !== 'gang' || p.mission !== 'target') continue;
      const d = dist(this.x, this.y, p.x, p.y);
      if (d < fd && City.lineOfSight(this.x, this.y, p.x, p.y)) { fd = d; foe = p; }
    }
    if (foe) {
      this.faceTo(foe.x, foe.y);
      if (this.cool <= 0 && this.weapon) { this.cool = rand(0.5, 0.9); fireBullet(this, this.weapon, this.a); }
      return;
    }
    const tx = pl.car ? pl.car.x : pl.x, ty = pl.car ? pl.car.y : pl.y;
    if (dist(this.x, this.y, tx, ty) > 70) this.moveTo(tx, ty, 150, dt);
  }

  // Пассажир идёт к машине игрока
  boardAI(dt) {
    const car = World.player.car;
    if (!car) return;
    const d = this.moveTo(car.x, car.y, 70, dt);
    if (d < car.w / 2 + 14) {
      this.car = car;
      car.passenger = this;
      World.peds.splice(World.peds.indexOf(this), 1);
      Sound.play('door', 0.6);
    }
  }

  draw(ctx) {
    if (this.car) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a);
    drawPersonLook(ctx, this.look, this.walkAnim, this.moving, this.weapon, this.dead);
    ctx.restore();
    if (this.dead) return;
    if (this.mission === 'target') drawTargetMark(ctx, this.x, this.y - 22);
    else if (this.mission === 'ally') drawTargetMark(ctx, this.x, this.y - 22, '#4caf50');
    else if (this.fare) drawTargetMark(ctx, this.x, this.y - 22, '#ffd400');
  }
}

function drawTargetMark(ctx, x, y, col = '#ff3b3b') {
  const b = Math.sin(World.time * 6) * 3;
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(x - 7, y - 10 + b); ctx.lineTo(x + 7, y - 10 + b); ctx.lineTo(x, y + b); ctx.fill();
}

// =====================================================================
//                         ПУЛИ И ЧАСТИЦЫ
// =====================================================================
function fireBullet(shooter, weapon, angle) {
  const W = WEAPONS[weapon];
  const sp = W.spread + (shooter === World.player ? 0 : 0.09);
  const a = angle + rand(-sp, sp);
  const mx = shooter.x + Math.cos(angle) * 20, my = shooter.y + Math.sin(angle) * 20;
  World.bullets.push({ x: mx, y: my, vx: Math.cos(a) * 1500, vy: Math.sin(a) * 1500, life: 0.45, owner: shooter, weapon });
  spawnParticle(mx, my, 'flash');
  const pl = World.player;
  const d = dist(shooter.x, shooter.y, pl.x, pl.y);
  if (d < 900) Sound.gunshot(weapon === 'uzi');
  // выстрелы пугают прохожих
  for (const p of World.peds) if (!p.dead && dist2(p.x, p.y, shooter.x, shooter.y) < 350 * 350) p.scare(shooter.x, shooter.y);
  if (shooter === pl) Wanted.crime('shoot', pl.x, pl.y);
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
      if (segCircle(b.x, b.y, nx, ny, p.x, p.y, p.r + 2) >= 0) {
        p.hurt(WEAPONS[b.weapon].dmg, byPlayer ? 'player' : 'npc', b.x, b.y);
        if (byPlayer && (p.ai === 'cop')) Wanted.crime('shootcop', p.x, p.y);
        hit = true; break;
      }
    }
    // игрок
    if (!hit && !byPlayer && !pl.dead) {
      if (pl.car) {
        if (pl.car.contains(nx, ny)) { pl.car.damage(WEAPONS[b.weapon].carDmg, 'npc', nx, ny); spawnSparks(nx, ny, 2); hit = true; }
      } else if (segCircle(b.x, b.y, nx, ny, pl.x, pl.y, 11) >= 0) {
        Game.playerHurt(b.weapon === 'uzi' ? 5 : 9, 'shot');
        spawnBlood(pl.x, pl.y, 2);
        hit = true;
      }
    }
    // машины
    if (!hit) {
      for (const c of World.cars) {
        if (c === pl.car && byPlayer) continue;
        if (c.contains(nx, ny)) {
          c.damage(WEAPONS[b.weapon].carDmg, byPlayer ? 'player' : 'npc', nx, ny);
          spawnSparks(nx, ny, 3);
          if (byPlayer && c.driver && c.driver !== 'player' && c.ai === 'traffic' && Math.random() < 0.3) bailOut(c);
          hit = true; break;
        }
      }
    }
    if (!hit && City.solidAt(nx, ny)) { spawnSparks(b.x, b.y, 2); hit = true; }
    b.x = nx; b.y = ny; b.life -= dt;
    if (hit || b.life <= 0) World.bullets.splice(i, 1);
  }
}

// Водитель в панике выскакивает из машины
function bailOut(c) {
  const d = c.driver;
  if (!d || d === 'player') return;
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
    this.ammo = opts.ammo || (kind === 'uzi' ? 60 : kind === 'pistol' ? 24 : 0);
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
      } else {
        pl.ammo[this.kind] = (pl.ammo[this.kind] || 0) + this.ammo;
        pl.weapon = this.kind;
        Game.message(WEAPONS[this.kind].name + ' +' + this.ammo);
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
      const im = Assets.img[this.kind === 'uzi' ? 'weapon_machine' : 'weapon_gun'];
      if (im && im.width) ctx.drawImage(im, -im.width, -im.height, im.width * 2, im.height * 2);
    }
    ctx.restore();
  }
}
