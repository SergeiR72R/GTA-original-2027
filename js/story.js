// Сюжет по главам: многоэтапные миссии с контрольными точками, разговоры
// в дороге, выбор в диалогах, флаги последствий и мелкие механики глав
// (гонка по точкам, «держи E», погоня пешком, укачивание, плакаты, граффити).
'use strict';

const Story = {
  flags: {},     // последствия выборов: { kioskSpared: true, ... }
  talk: [],      // реплики «в дороге» — мир не останавливается
  prompt: null,  // подсказка «E — действие» с прогрессом
  posters: [],   // плакаты миссий поверх рекламных щитов
  tags: [],      // граффити на тротуаре
  catches: 0,    // для тестов: сколько раз поймали беглеца
  dt: 0.016,

  reset(flags) {
    this.flags = Object.assign({}, flags || {});
    this.talk.length = 0;
    this.prompt = null;
    for (const p of this.posters) p.d.poster = null;
    this.posters.length = 0;
    this.tags.length = 0;
  },

  flag(k, v) { if (v === undefined) return this.flags[k]; this.flags[k] = v; return v; },

  // реплики в машине: [[кто, текст], ...]
  say(lines) {
    for (const [who, text] of lines) this.talk.push({ who, text, t: clamp(text.length * 0.06, 3.2, 8) });
  },
  // один раз за миссию
  sayOnce(m, key, lines) {
    m.said = m.said || {};
    if (m.said[key]) return;
    m.said[key] = true;
    this.say(lines);
  },
  talking() { return this.talk.length > 0; },

  update(dt) {
    this.dt = dt;
    const c = this.talk[0];
    if (c) { c.t -= dt; if (c.t <= 0) this.talk.shift(); }
  },

  // ---------------------------------------------------------------- спавн
  // всё, что миссия создала, — в m.own, чтобы убрать за собой
  own(m) { return m.own || (m.own = { cars: [], peds: [] }); },
  car(m, x, y, a, opts) {
    const c = new Car(x, y, a, opts);
    c.keep = true;
    World.cars.push(c);
    this.own(m).cars.push(c);
    return c;
  },
  carOnRoad(m, near, rmin, rmax, opts) {
    const p = Game.findRoadSpawn(near.x, near.y, rmin, rmax, true) || { x: near.x, y: near.y, dir: 0 };
    return this.car(m, p.x, p.y, DIR_ANGLE[p.dir], opts);
  },
  ped(m, x, y, opts) {
    const p = new Ped(x, y, opts);
    p.mission = 'story'; // не исчезает, когда игрок далеко
    World.peds.push(p);
    this.own(m).peds.push(p);
    return p;
  },
  gang(m, faction, p, n, opts) {
    const g = spawnGroup(faction, p, n, opts);
    this.own(m).peds.push(...g);
    return g;
  },
  chasers(m, faction, n, opts = {}) {
    const pl = World.player, out = [];
    for (let i = 0; i < n; i++) { const c = GangCars.spawn(faction, pl.x, pl.y, Object.assign({ min: 450, max: 800 }, opts)); if (c) out.push(c); }
    const o = this.own(m);
    o.gangCars = (o.gangCars || []).concat(out);
    return out;
  },
  // пассажир сидит в машине миссии: не выходит, когда игрок садится за руль
  seat(p, c) { p.car = c; c.passenger = p; p.seat = true; if (!p.mission) p.mission = 'story'; return p; },
  // водитель-NPC в машине
  driver(m, c, opts) {
    const d = new Ped(c.x, c.y, opts);
    d.car = c; c.driver = d;
    this.own(m).peds.push(d);
    return d;
  },

  release(m) {
    const o = m.own;
    if (!o) return;
    for (const c of o.cars) {
      c.mission = null; c.keep = !!c.stay;
      if (c.ai === 'scripted') c.ai = c.driver && c.driver !== 'player' ? 'traffic' : null;
    }
    GangCars.release(o.gangCars);
    for (const p of o.peds) {
      p.mission = null;
      if (p.ai === 'follow' || p.ai === 'runner' || p.ai === 'idle' || p.ai === 'board') { p.ai = 'walk'; p.target = null; }
    }
    m.own = null;
  },

  // переставить игрока (для контрольных точек); car — тип машины под игроком
  putPlayer(p, car, color) {
    const pl = World.player;
    if (pl.car) Game.exitCar(true);
    pl.x = p.x; pl.y = p.y; pl.dead = false;
    if (car) {
      const r = Game.findRoadSpawn(p.x, p.y, 0, 260, true) || { x: p.x, y: p.y, dir: 0 };
      const c = new Car(r.x, r.y, DIR_ANGLE[r.dir], { type: car, color });
      World.cars.push(c);
      pl.x = c.x; pl.y = c.y;
      c.driver = 'player'; pl.car = c;
    }
    Game.cam.x = pl.x; Game.cam.y = pl.y;
    return pl.car;
  },

  // ---------------------------------------------------------------- действия
  // «Держи E»: стоишь рядом и держишь клавишу. Возвращает true, когда готово.
  hold(m, key, p, secs, label, opts = {}) {
    const pl = World.player;
    m.holds = m.holds || {};
    if (m.holds[key] === 'done') return true;
    const r = opts.r || 56;
    // подъехал на машине к месту, где нужно выйти, — подсказка
    if (!opts.car && pl.car && !pl.dead && dist(pl.x, pl.y, p.x, p.y) < r * 2.5) this.prompt = { label: 'Выйди из машины (F), чтобы ' + label, k: 0, plain: true };
    const ok = !pl.dead && (opts.car ? !!pl.car : !pl.car) && dist(pl.x, pl.y, p.x, p.y) < r;
    if (!ok) { if (m.holds[key]) m.holds[key] = Math.max(0, m.holds[key] - this.dt); return false; }
    const k = (m.holds[key] || 0) + (Game.key('KeyE') || Game.autoHold ? this.dt : 0);
    m.holds[key] = k;
    this.prompt = { label, k: clamp(k / secs, 0, 1) };
    if (k >= secs) { m.holds[key] = 'done'; Sound.play('latch', 0.6); return true; }
    return false;
  },

  // Беглец пешком: догнать и схватить (подбежать вплотную)
  runner(m, x, y, opts = {}) {
    const p = this.ped(m, x, y, Object.assign({ ai: 'runner', hp: 80 }, opts));
    p.runSpeed = opts.speed || 148;
    p.mission = 'target';
    return p;
  },
  caught(p) {
    const pl = World.player;
    if (!p.dead && !pl.car && dist(pl.x, pl.y, p.x, p.y) < 30) { p.ai = 'idle'; this.catches++; return true; }
    return false;
  },

  // Укачивание пассажира: резкие разгоны, торможения, повороты и удары
  comfort(m, c, dt) {
    if (!c || dt <= 0) return m.sick || 0;
    m.sick = m.sick || 0;
    if (m.cpv) {
      const ax = (c.vx - m.cpv.x) / dt, ay = (c.vy - m.cpv.y) / dt;
      const a = Math.hypot(ax, ay);
      if (a > 520) m.sick += (a - 520) * dt * 0.012;
      if (m.chp !== undefined && c.hp < m.chp) m.sick += (m.chp - c.hp) * 1.2;
    }
    m.sick = Math.max(0, m.sick - dt * 1.5);
    m.cpv = { x: c.vx, y: c.vy }; m.chp = c.hp;
    return m.sick;
  },

  // Прижать машину: подбитая сильнее, чем на frac, глохнет, водитель выскакивает
  stalled(c, frac = 0.45) {
    if (c.stalled) return true;
    if (c.dead || c.hp > c.maxHp * frac) return false;
    c.stalled = true; c.locked = true;
    c.ai = null; c.maxSpeed = 0;
    if (c.driver && c.driver !== 'player') { const d = c.driver; bailOut(c); d.ai = 'idle'; d.mission = 'target'; }
    Sound.play('crash', 0.5);
    return true;
  },

  // Фото на ходу: объект в кадре и не дальше d — копится время
  photo(m, key, p, secs, d = 360) {
    m.photos = m.photos || {};
    if (m.photos[key] === 'done') return true;
    const pl = World.player;
    const ok = dist(pl.x, pl.y, p.x, p.y) < d && Game.inView(p.x, p.y, -40);
    m.photos[key] = Math.max(0, (m.photos[key] || 0) + (ok ? this.dt : -this.dt * 2));
    if (ok) this.prompt = { label: '📷 Снимаю...', k: clamp(m.photos[key] / secs, 0, 1) };
    if (m.photos[key] >= secs) { m.photos[key] = 'done'; Sound.play('latch', 0.8); Game.message('📷 Щёлк!', 1.5); return true; }
    return false;
  },

  // Плакат миссии поверх рекламного щита
  poster(d, kind) {
    if (d.poster) return;
    d.poster = Facades.missionPoster(kind);
    this.posters.push({ d });
  },

  // Граффити на тротуаре у стены
  tag(x, y, a, text, color) {
    this.tags.push({ x, y, a, text, color: color || '#e53935', cv: null });
  },
  drawTags(ctx) {
    for (const t of this.tags) {
      ctx.save(); ctx.translate(t.x, t.y); ctx.rotate(t.a);
      ctx.drawImage(Facades.sprayTag(t), -48, -16, 96, 32);
      ctx.restore();
    }
  },

  // Пешеход идёт к точке по проходам (путь считается один раз)
  walkTo(p, g, sp, dt) {
    const tx = Math.floor(p.x / TILE), ty = Math.floor(p.y / TILE), gx = Math.floor(g.x / TILE), gy = Math.floor(g.y / TILE);
    if (!p.wPath || p.wGoal !== gx + ',' + gy) { p.wPath = this.walkPath(tx, ty, gx, gy, 6000); p.wI = 1; p.wGoal = gx + ',' + gy; }
    if (p.wPath && p.wI < p.wPath.length) {
      const q = p.wPath[p.wI];
      if (dist2(p.x, p.y, q.x * TILE + 32, q.y * TILE + 32) < 14 * 14) p.wI++;
      else p.moveTo(q.x * TILE + 32, q.y * TILE + 32, sp, dt);
    } else p.moveTo(g.x, g.y, sp, dt);
    return dist(p.x, p.y, g.x, g.y);
  },

  // Клетки, по которым можно пройти пешком (не стены и не вода)
  walkable(tx, ty) {
    const t = City.t(tx, ty);
    return t !== T_BUILD && t !== T_SEA && t !== T_RIVER && t !== T_BOUND;
  },
  // Путь пешком по клеткам (BFS), до maxN узлов
  walkPath(sx, sy, gx, gy, maxN = 3000) {
    const W = City.W, key = (x, y) => y * W + x;
    const prev = new Map([[key(sx, sy), -1]]);
    const q = [[sx, sy]];
    for (let h = 0; h < q.length && h < maxN; h++) {
      const [x, y] = q[h];
      if (x === gx && y === gy) {
        const out = []; let k = key(x, y);
        while (k !== -1) { out.push({ x: k % W, y: Math.floor(k / W) }); k = prev.get(k); }
        return out.reverse();
      }
      for (const D of DIRS) {
        const nx = x + D.x, ny = y + D.y, nk = key(nx, ny);
        if (prev.has(nk) || !City.inside(nx, ny) || !this.walkable(nx, ny)) continue;
        prev.set(nk, key(x, y)); q.push([nx, ny]);
      }
    }
    return null;
  },
};

// Беглец: убегает от игрока по проходам и дворам, иногда выдыхается
Ped.prototype.runnerAI = function (dt) {
  const pl = World.player;
  this.runT = (this.runT || 0) - dt;
  this.stam = (this.stam === undefined ? 6 : this.stam) - dt;
  if (this.stam < -1.6) this.stam = rand(4, 7);
  const tx = Math.floor(this.x / TILE), ty = Math.floor(this.y / TILE);
  if (!this.runPath || this.runI >= this.runPath.length || this.runT <= 0) {
    this.runT = 2.5;
    let best = null, bs = -Infinity;
    for (let k = 0; k < 14; k++) {
      const a = rand(0, TAU), r = randi(6, 12);
      const gx = tx + Math.round(Math.cos(a) * r), gy = ty + Math.round(Math.sin(a) * r);
      if (!City.inside(gx, gy) || !Story.walkable(gx, gy)) continue;
      // подальше от игрока и не в его сторону
      const s = dist(gx * TILE, gy * TILE, pl.x, pl.y) - dist(this.x, this.y, pl.x, pl.y) * 0.5;
      if (s > bs) { bs = s; best = { x: gx, y: gy }; }
    }
    this.runPath = best ? Story.walkPath(tx, ty, best.x, best.y, 1500) : null;
    this.runI = 1;
  }
  const sp = (this.stam < 0 ? 0.55 : 1) * (this.runSpeed || 148);
  if (this.runPath && this.runI < this.runPath.length) {
    const q = this.runPath[this.runI];
    const gx = q.x * TILE + TILE / 2, gy = q.y * TILE + TILE / 2;
    if (dist2(this.x, this.y, gx, gy) < 14 * 14) this.runI++;
    else this.moveTo(gx, gy, sp, dt);
  } else {
    // некуда бежать — просто от игрока
    const a = Math.atan2(this.y - pl.y, this.x - pl.x);
    this.a = a; this.step(Math.cos(a) * sp * dt, Math.sin(a) * sp * dt); this.moving = true;
  }
};

// ---------------------------------------------------------------- многоэтапная миссия
// def.stages: [{ name, cp, resume(m), start(m), update(m, dt), end(m) }]
// update возвращает 'next' (следующий этап), 'ok' (миссия выполнена) или 'fail:…'.
// cp: false — без контрольной точки на этом этапе (по умолчанию она есть).
// resume(m) готовит мир, если миссию начинают с этого этапа после провала.
function staged(def) {
  const S = def.stages;
  const enter = (m) => { const st = S[m.si]; m.stageT = 0; if (st.start) st.start(m); };
  def.start = (m) => {
    m.si = Missions.resumeStage || 0;
    Missions.resumeStage = 0;
    if (def.init) def.init(m);
    if (m.si > 0 && S[m.si].resume) S[m.si].resume(m);
    enter(m);
  };
  def.update = (m, dt) => {
    m.stageT += dt;
    const r = S[m.si].update(m, dt);
    if (r !== 'next') return r;
    if (S[m.si].end) S[m.si].end(m);
    m.si++;
    if (m.si >= S.length) return 'ok';
    if (S[m.si].cp !== false) { Missions.cp = { index: Missions.index, si: m.si }; Game.message('✔ Контрольная точка', 2); }
    enter(m);
    return null;
  };
  def.cleanup = (m) => {
    const st = S[m.si];
    if (st && st.end) st.end(m);
    if (def.done) def.done(m);
    Story.release(m);
  };
  def.stageName = (si) => (S[si] && S[si].name) || '';
  return def;
}
