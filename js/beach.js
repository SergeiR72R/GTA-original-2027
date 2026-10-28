// Пляж: люди на песке всегда — гуляют вдоль моря и играют в маткот
// (пары с ракетками, мяч летает между ними с характерным «ток-ток»).
'use strict';

const Beach = {
  games: [], // { a, b, t, dir, hits }
  spawnT: 0,

  sand(tx, ty) { return City.t(tx, ty) === T_SAND; },

  // случайная точка на песке рядом с (x, y)
  spotNear(x, y, rmin, rmax) {
    for (let i = 0; i < 20; i++) {
      const a = rand(0, TAU), r = rand(rmin, rmax);
      const tx = Math.floor((x + Math.cos(a) * r) / TILE), ty = Math.floor((y + Math.sin(a) * r) / TILE);
      if (this.sand(tx, ty)) return { x: (tx + rand(0.2, 0.8)) * TILE, y: (ty + rand(0.2, 0.8)) * TILE, tx, ty };
    }
    return null;
  },

  update(dt) {
    const pl = World.player;
    // мяч
    for (let i = this.games.length - 1; i >= 0; i--) {
      const g = this.games[i];
      const ok = (p) => p && !p.dead && p.ai === 'matkot' && World.peds.includes(p);
      if (!ok(g.a) || !ok(g.b)) {
        for (const p of [g.a, g.b]) if (p && p.ai === 'matkot') { p.ai = 'beach'; p.game = null; }
        this.games.splice(i, 1);
        continue;
      }
      g.t += dt / g.fly;
      if (g.t >= 1) {
        g.t = 0; g.dir = -g.dir; g.fly = rand(0.7, 1.0);
        const hit = g.dir > 0 ? g.a : g.b;
        hit.swing = 0.25;
        if (dist2(hit.x, hit.y, pl.x, pl.y) < 600 * 600) Sound.tok(clamp(0.5 - dist(hit.x, hit.y, pl.x, pl.y) / 1400, 0.05, 0.4));
      }
    }
    this.spawnT -= dt;
    if (this.spawnT > 0) return;
    // людей на пляже — до 14 рядом с игроком; появляются за кадром, а пока пляж
    // почти пустой (только пришли) — и в кадре, по нескольку сразу
    const near = World.peds.filter((p) => p.beach && !p.dead && dist2(p.x, p.y, pl.x, pl.y) < 1000 * 1000).length;
    this.spawnT = near < 6 ? 0.15 : 0.7;
    if (near >= 14) return;
    const s = this.spotNear(pl.x, pl.y, near < 6 ? 120 : 320, 950);
    if (!s || (near >= 6 && Game.inView(s.x, s.y))) return;
    if (chance(0.4)) {
      // пара с маткотом: напарник в 2–3 клетках вдоль берега
      const off = rand(130, 190) * (chance(0.5) ? 1 : -1);
      if (!this.sand(s.tx, Math.floor((s.y + off) / TILE))) return;
      const mk = (x, y) => {
        const look = Assets.gen['chars/civ_10'] ? Looks.named('civ_10') : Looks.civilian();
        const p = new Ped(x, y, { look, ai: 'matkot' });
        p.beach = true; p.home = { x, y };
        World.peds.push(p);
        return p;
      };
      const a = mk(s.x, s.y), b = mk(s.x + rand(-20, 20), s.y + off);
      a.partner = b; b.partner = a;
      this.games.push({ a, b, t: rand(0, 1), dir: 1, fly: 0.85 });
    } else {
      const p = new Ped(s.x, s.y, { ai: 'beach', look: chance(0.25) && Assets.gen['chars/civ_10'] ? Looks.named('civ_10') : Looks.civilian() });
      p.beach = true;
      World.peds.push(p);
    }
  },

  // гуляет по песку: идёт к точке неподалёку, стоит, смотрит на море
  walkAI(p, dt) {
    if (p.rest > 0) { p.rest -= dt; return; }
    if (!p.goal || dist2(p.x, p.y, p.goal.x, p.goal.y) < 12 * 12) {
      if (p.goal) { p.rest = rand(1, 5); p.goal = null; if (chance(0.5)) p.a = Math.PI; return; }
      p.goal = this.spotNear(p.x, p.y, 60, 320) || { x: p.x, y: p.y };
    }
    const before = p.x + p.y;
    p.moveTo(p.goal.x, p.goal.y, 38, dt);
    if (p.x + p.y === before) p.goal = null;
  },

  // маткот: стоит на месте, развёрнут к партнёру, перед ударом — шажок
  matkotAI(p, dt) {
    const q = p.partner;
    if (!q) { p.ai = 'beach'; return; }
    p.faceTo(q.x, q.y);
    p.swing = Math.max(0, (p.swing || 0) - dt);
    if (p.swing > 0) { p.moving = true; p.walkAnim += dt * 6; }
    if (p.home && dist2(p.x, p.y, p.home.x, p.home.y) > 20 * 20) p.moveTo(p.home.x, p.home.y, 40, dt);
  },

  // положение мяча: x, y на земле и высота дуги h
  ball(g) {
    const [f, t] = g.dir > 0 ? [g.a, g.b] : [g.b, g.a];
    const k = g.t;
    return { x: f.x + (t.x - f.x) * k, y: f.y + (t.y - f.y) * k, h: Math.sin(k * Math.PI) * 28 + 10 };
  },

  // 2D: тень и мяч
  draw(ctx) {
    for (const g of this.games) {
      const b = this.ball(g);
      if (!Game.inView(b.x, b.y)) continue;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(b.x + 3, b.y + 3, 3, 2, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#ffeb3b'; ctx.beginPath(); ctx.arc(b.x, b.y - b.h * 0.5, 3.2, 0, TAU); ctx.fill();
    }
  },

  reset() { this.games.length = 0; },
};
