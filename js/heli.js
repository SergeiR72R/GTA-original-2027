// Армейский вертолёт на 5 звёздах розыска (вымышленный, без настоящих знаков).
// Прилетает через 5–8 с после пятой звезды, кружит над героем и пускает пары
// ракет с упреждением и разбросом — попадает примерно раз из трёх-четырёх, а
// промахи взрывают машины вокруг. Сбить: ≈ 120 попаданий узи/АК или 2 ракеты РПГ.
// Розыск ниже 5 — улетает. Сбитый падает со взрывом; через 40 с — новый.
'use strict';

const Heli = {
  h: null,
  rockets: [],     // ракеты вертолёта: летят сверху к точке на земле
  arriveT: 6,
  respawnT: 0,
  HP: 2400,
  ALT: 230,        // высота полёта (≈ 3 этажа над крышами)

  reset() { this.h = null; this.rockets.length = 0; this.arriveT = 6; this.respawnT = 0; },

  spawn() {
    const pl = World.player, a = rand(0, TAU);
    this.h = { x: pl.x + Math.cos(a) * 1100, y: pl.y + Math.sin(a) * 1100, vx: 0, vy: 0, a: 0, alt: this.ALT, hp: this.HP,
      state: 'hunt', orb: rand(0, TAU), fireT: 2.5, burst: 0, burstT: 0, pod: 1, t: 0, tilt: 0 };
    Game.message('Армейский вертолёт!', 3);
  },

  update(dt) {
    const pl = World.player;
    this.updateRockets(dt);
    const h = this.h;
    if (!h) {
      Sound.setRotor(0);
      this.respawnT -= dt;
      if (Wanted.level >= 5 && Game.state === 'play' && !pl.dead) {
        this.arriveT -= dt;
        if (this.arriveT <= 0 && this.respawnT <= 0) this.spawn();
      } else this.arriveT = rand(5, 8);
      return;
    }
    h.t += dt;
    const d = dist(h.x, h.y, pl.x, pl.y);
    Sound.setRotor(clamp(1 - d / 1500, 0, 1) * (h.state === 'down' ? 0.7 : 1));
    if (h.state === 'down') { this.fall(h, dt); return; }
    if (h.state === 'hunt' && (Wanted.level < 5 || pl.dead)) h.state = 'leave';
    let tx, ty, vmax = 470;
    if (h.state === 'leave') {
      // улетает от героя и исчезает за краем
      const k = d || 1; tx = h.x + (h.x - pl.x) / k * 600; ty = h.y + (h.y - pl.y) / k * 600; vmax = 520;
      if (d > 1600) { this.h = null; this.arriveT = rand(5, 8); return; }
    } else {
      // кружит над героем, за машиной — с упреждением
      h.orb += dt * 0.35;
      const c = pl.car;
      tx = pl.x + Math.cos(h.orb) * 230 + (c ? c.vx * 0.5 : 0);
      ty = pl.y + Math.sin(h.orb) * 230 + (c ? c.vy * 0.5 : 0);
    }
    let dvx = (tx - h.x) * 1.6, dvy = (ty - h.y) * 1.6;
    const sp = Math.hypot(dvx, dvy);
    if (sp > vmax) { dvx *= vmax / sp; dvy *= vmax / sp; }
    const k = Math.min(1, dt * 1.8);
    h.vx += (dvx - h.vx) * k; h.vy += (dvy - h.vy) * k;
    h.x += h.vx * dt; h.y += h.vy * dt;
    // нос — по ходу, на месте — к герою; наклон вперёд на скорости
    const v = Math.hypot(h.vx, h.vy);
    const want = v > 120 ? Math.atan2(h.vx, -h.vy) : Math.atan2(pl.x - h.x, -(pl.y - h.y));
    h.a += wrapAngle(want - h.a) * Math.min(1, dt * 2.5);
    h.tilt = lerp(h.tilt, clamp(v / 470, 0, 1) * 0.22, Math.min(1, dt * 3));
    if (h.state === 'hunt') this.shoot(h, dt, d);
  },

  // пара ракет каждые 3–4 с
  shoot(h, dt, d) {
    h.fireT -= dt;
    if (h.fireT <= 0 && d < 900) { h.fireT = rand(3, 4); h.burst = 2; h.burstT = 0; }
    if (h.burst <= 0) return;
    h.burstT -= dt;
    if (h.burstT > 0) return;
    h.burst--; h.burstT = 0.35; h.pod = -h.pod;
    const pl = World.player, c = pl.car;
    const T = clamp(d / 650, 0.6, 1.3);
    // упреждение по скорости машины и разброс: в стоящего — точнее
    const moving = c && c.speed > 40;
    const err = moving ? rand(60, 210) : rand(0, 70), ea = rand(0, TAU);
    const tx = pl.x + (c ? c.vx * T : 0) + Math.cos(ea) * err, ty = pl.y + (c ? c.vy * T : 0) + Math.sin(ea) * err;
    // ракета сходит с левого или правого пилона
    const px = Math.cos(h.a) * 22 * h.pod, py = Math.sin(h.a) * 22 * h.pod;
    this.rockets.push({ x0: h.x + px, y0: h.y + py, z0: h.alt - 10, tx, ty, t: 0, T, x: h.x, y: h.y, z: h.alt });
    Sound.noiseBurst(0.45, 2200, 0.5);
  },

  updateRockets(dt) {
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.t += dt;
      const u = Math.min(1, r.t / r.T);
      r.x = lerp(r.x0, r.tx, u); r.y = lerp(r.y0, r.ty, u); r.z = r.z0 * (1 - u);
      // дымный след в воздухе
      if (Math.random() < 0.9) { spawnParticle(r.x, r.y, 'smoke'); const p = World.particles[World.particles.length - 1]; if (p) { p.z = r.z - 30; p.life = 0.9; p.vx *= 0.3; p.vy *= 0.3; } }
      if (u >= 1) {
        this.rockets.splice(i, 1);
        blast(r.tx, r.ty, { r: 130, carDmg: 140, plDmg: 70, plCarK: 0.45, by: 'heli', shake: 20 });
      }
    }
  },

  // пуля или ракета РПГ игрока по вертолёту
  hit(n, by) {
    const h = this.h;
    if (!h || h.state === 'down') return;
    h.hp -= n;
    spawnSparks(h.x, h.y, 3);
    if (h.hp > 0) return;
    h.state = 'down'; h.t = 0; h.spin = rand(2.5, 4) * (chance(0.5) ? 1 : -1);
    if (by === 'player') { Game.addMoney(2000); Game.message(T('Вертолёт сбит! +₪{0}', 2000), 4); }
  },

  // подбитый: дымит, крутится, уходит в сторону и падает со взрывом
  fall(h, dt) {
    h.a += h.spin * dt;
    h.alt = Math.max(0, h.alt - dt * (40 + h.t * 60));
    h.vx *= 0.99; h.vy *= 0.99;
    h.x += h.vx * dt * 0.6 + Math.cos(h.t * 2) * 40 * dt; h.y += h.vy * dt * 0.6 + Math.sin(h.t * 2) * 40 * dt;
    if (Math.random() < 0.8) { spawnParticle(h.x, h.y, 'smoke'); const p = World.particles[World.particles.length - 1]; if (p) p.z = h.alt - 20; }
    if (Math.random() < 0.6) { spawnParticle(h.x + rand(-10, 10), h.y + rand(-10, 10), 'fire'); }
    if (h.alt <= 0 || h.t > 4) {
      blast(h.x, h.y, { r: 180, carDmg: 200, plDmg: 90, by: 'heli', shake: 30 });
      World.decals.push({ k: 'burn', x: h.x, y: h.y, a: rand(0, TAU), s: 1.8 });
      this.h = null; this.respawnT = 40;
    }
  },

  // 2D: тень, корпус и винт сверху (в 3D — render3d.syncHeli)
  draw2D(ctx) {
    for (const r of this.rockets) {
      ctx.fillStyle = '#ffb74d'; ctx.beginPath(); ctx.arc(r.x, r.y - r.z * 0.3, 4, 0, TAU); ctx.fill();
    }
    const h = this.h;
    if (!h) return;
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(h.x + 20, h.y + 20, 40, 22, h.a, 0, TAU); ctx.fill();
    ctx.translate(h.x, h.y - h.alt * 0.15); ctx.rotate(h.a);
    const im = Assets.gen['vehicles/heli_military'];
    if (im) ctx.drawImage(im, -40, -60, 80, 120);
    else {
      ctx.fillStyle = '#4b5320'; ctx.fillRect(-4, 10, 8, 50); ctx.fillRect(-14, 52, 28, 6);
      ctx.beginPath(); ctx.ellipse(0, 0, 16, 30, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#20251a'; ctx.beginPath(); ctx.ellipse(0, -16, 9, 12, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#3a4019'; ctx.fillRect(-30, -4, 60, 8);
    }
    // винт
    ctx.rotate(World.time * 25);
    ctx.strokeStyle = 'rgba(30,30,30,0.55)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-62, 0); ctx.lineTo(62, 0); ctx.moveTo(0, -62); ctx.lineTo(0, 62); ctx.stroke();
    ctx.restore();
  },
};
