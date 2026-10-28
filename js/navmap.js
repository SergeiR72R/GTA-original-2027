// Карта города по M: оружейные, чёрный рынок и покраски. На значке можно
// поставить свою метку (и снять): маршрут по дорогам рисуется на мини-карте,
// к метке ведёт голубая стрелка — вместе с жёлтой стрелкой миссии.
'use strict';

const NavMap = {
  open: false,
  sel: 0,
  mark: null,    // { kind, name, p } — своя метка
  path: null,    // маршрут к метке: клетки дороги
  pathT: 0,

  // все значки карты
  points() {
    const out = [];
    for (const s of SHOPS) out.push({ kind: s.place === 'blackMarket' ? 'black' : 'gun', name: s.name, p: Shops.place(s) });
    for (const q of City.places.paints) out.push({ kind: 'paint', name: q.name, p: q.p });
    return out;
  },

  toggle() {
    this.open = !this.open;
    Sound.play(this.open ? 'uiSel' : 'ui', 0.5);
    if (this.open) {
      // выбран значок с меткой или ближайший к игроку
      const pts = this.points(), pl = World.player;
      const i = this.mark ? pts.findIndex((q) => q.p === this.mark.p) : -1;
      this.sel = i >= 0 ? i : pts.reduce((b, q, k) => (dist(q.p.x, q.p.y, pl.x, pl.y) < dist(pts[b].p.x, pts[b].p.y, pl.x, pl.y) ? k : b), 0);
      this.mouseWas = Game.mouse.down; this.mx = Game.mouse.x; this.my = Game.mouse.y;
    }
  },

  setMark(q) {
    if (this.mark && this.mark.p === q.p) { this.clear(); Game.message('Метка снята', 2); return; }
    this.mark = q; this.path = null; this.pathT = 0;
    Game.message(T('Метка: {0}', T(q.name)), 2.5);
  },

  clear() { this.mark = null; this.path = null; },

  // ввод, пока карта открыта (мир на паузе)
  input(game) {
    const pts = this.points(), n = pts.length;
    if (game.hit('Escape', 'KeyM')) { this.open = false; return; }
    if (game.hit('ArrowRight', 'ArrowDown', 'KeyD', 'KeyS', 'Tab')) { this.sel = (this.sel + 1) % n; Sound.play('uiSel', 0.4); }
    if (game.hit('ArrowLeft', 'ArrowUp', 'KeyA', 'KeyW')) { this.sel = (this.sel + n - 1) % n; Sound.play('uiSel', 0.4); }
    if (game.hit('Enter', 'NumpadEnter', 'Space')) this.setMark(pts[this.sel]);
    if (game.hit('Delete', 'Backspace') && this.mark) { this.clear(); Game.message('Метка снята', 2); }
    // мышь: наведение выбирает значок, клик ставит или снимает метку
    const m = game.mouse, down = m.down && !this.mouseWas;
    const moved = m.x !== this.mx || m.y !== this.my;
    this.mouseWas = m.down; this.mx = m.x; this.my = m.y;
    if (this.view && (down || moved)) {
      let best = -1, bd = 22;
      pts.forEach((q, k) => { const [x, y] = this.view.at(q.p); const d = Math.hypot(x - m.x, y - m.y); if (d < bd) { bd = d; best = k; } });
      if (best >= 0) this.sel = best;
      if (best >= 0 && down) this.setMark(pts[best]);
    }
  },

  // маршрут пересчитываем раз в секунду; на месте метка снимается
  update(dt) {
    const pl = World.player;
    if (!this.mark || pl.dead) return;
    const p = this.mark.p;
    if (dist(pl.x, pl.y, p.x, p.y) < 80) {
      Game.message(T('Ты на месте: {0}', T(this.mark.name)), 3);
      Sound.play('uiSel', 0.5);
      this.clear();
      return;
    }
    this.pathT -= dt;
    if (this.pathT > 0) return;
    this.pathT = 1;
    // ведём до ближайшей к цели дороги (покраска во Флорентине — внутри стоянки)
    const gx = Math.floor(p.x / TILE), gy = Math.floor(p.y / TILE);
    const g = City.isRoad(gx, gy) ? { x: gx, y: gy } : City.nearestRoad(gx, gy) || { x: gx, y: gy };
    this.path = City.pathTo(Math.floor(pl.x / TILE), Math.floor(pl.y / TILE), g.x, g.y, City.W * City.H);
  },

  // куда показывать стрелке: в машине — на клетку маршрута в нескольких
  // клетках впереди, пешком — прямо на метку
  aim() {
    const pl = World.player, p = this.mark.p;
    if (!pl.car || !this.path || this.path.length < 2) return p;
    const tx = pl.x / TILE, ty = pl.y / TILE;
    let bi = 0, bd = Infinity;
    for (let i = 0; i < this.path.length; i++) { const q = this.path[i], d = (q.x + 0.5 - tx) ** 2 + (q.y + 0.5 - ty) ** 2; if (d < bd) { bd = d; bi = i; } }
    const q = this.path[Math.min(this.path.length - 1, bi + 4)];
    return bi >= this.path.length - 3 ? p : City.tc(q.x, q.y);
  },

  // ---------------------------------------------------------------- рисование

  // голубая стрелка у героя — дополнительно к жёлтой стрелке миссии
  drawArrow(ctx, vw, vh) {
    const pl = World.player;
    if (!this.mark || pl.dead || this.open) return;
    const p = this.mark.p;
    if (dist(p.x, p.y, pl.x, pl.y) < 120) return;
    const a = this.aim();
    const z = Game.zoomTotal;
    let sx = vw / 2 + (pl.x - Game.cam.x) * z, sy = vh / 2 + (pl.y - Game.cam.y) * z;
    if (Game.gl) [sx, sy] = R3.worldToScreen(pl.x, pl.y, 10);
    const ang = Math.atan2(a.y - pl.y, a.x - pl.x);
    ctx.save();
    ctx.translate(sx + Math.cos(ang) * 96, sy + Math.sin(ang) * 96);
    ctx.rotate(ang);
    ctx.fillStyle = '#4fc3f7'; ctx.strokeStyle = '#01304a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(-7, -11); ctx.lineTo(-3, 0); ctx.lineTo(-7, 11); ctx.closePath();
    ctx.stroke(); ctx.fill();
    ctx.restore();
  },

  // подпись над мини-картой: какая метка стоит и сколько до неё
  drawLabel(ctx, vw, vh) {
    if (!this.mark || this.open) return;
    const pl = World.player, p = this.mark.p;
    const size = Math.min(190, vw * 0.28);
    const he = I18N.he;
    this.text(ctx, T('Метка: {0} · {1}', T(this.mark.name), this.km(dist(pl.x, pl.y, p.x, p.y))), he ? 16 + size : 16, vh - size - 26, 15, '#4fc3f7', he ? 'right' : 'left');
  },

  text(ctx, s, x, y, size, color, align) { HUD.text(ctx, s, x, y, size, color, align); },

  // расстояние по-человечески: город сжат, как в GTA2, поэтому клетку
  // считаем ≈ 20 м — тогда через весь город выходит ≈ 4 км, как в Тель-Авиве
  km(d) {
    const m = d / TILE * 20;
    const km = (m / 1000).toFixed(1);
    return m < 1000 ? T('{0} м', Math.round(m / 10) * 10) : T('{0} км', I18N.lang === 'ru' ? km.replace('.', ',') : km);
  },

  // маршрут на мини-карте (toMap — пересчёт мира в пиксели мини-карты)
  drawRoute(ctx, toMap) {
    if (!this.mark) return;
    ctx.strokeStyle = '#4fc3f7'; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (this.path && this.path.length > 1) {
      ctx.beginPath();
      this.path.forEach((q, i) => { const [x, y] = toMap((q.x + 0.5) * TILE, (q.y + 0.5) * TILE); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.stroke();
    }
  },

  icon(ctx, kind, x, y, s) {
    ctx.lineWidth = 2; ctx.strokeStyle = '#000';
    if (kind === 'paint') {
      // баллончик с краской
      ctx.fillStyle = '#ab47bc'; ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.fillRect(x - s * 0.3, y - s * 0.35, s * 0.6, s * 0.9); ctx.fillRect(x - s * 0.15, y - s * 0.6, s * 0.3, s * 0.25);
      ctx.fillStyle = '#ffeb3b'; ctx.beginPath(); ctx.arc(x + s * 0.55, y - s * 0.55, s * 0.18, 0, TAU); ctx.fill();
    } else {
      // ромб: оружейная — оранжевый, чёрный рынок — тёмный с оранжевой каймой
      ctx.fillStyle = kind === 'black' ? '#263238' : '#ff9800'; ctx.strokeStyle = kind === 'black' ? '#ff9800' : '#000';
      ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s, y); ctx.lineTo(x, y + s); ctx.lineTo(x - s, y); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = kind === 'black' ? '#ff9800' : '#222';
      ctx.fillRect(x - s * 0.45, y - s * 0.2, s * 0.8, s * 0.25); ctx.fillRect(x - s * 0.45, y - s * 0.2, s * 0.25, s * 0.6);
    }
  },

  // большая карта на весь экран
  draw(ctx, vw, vh) {
    if (!this.open) return;
    const pts = this.points(), pl = World.player;
    ctx.fillStyle = 'rgba(8,12,20,0.92)'; ctx.fillRect(0, 0, vw, vh);
    const top = 60, bottom = 92;
    const k = Math.min((vw - 40) / City.W, (vh - top - bottom) / City.H);
    const mw = City.W * k, mh = City.H * k, x0 = (vw - mw) / 2, y0 = top;
    const at = (p) => [x0 + p.x / TILE * k, y0 + p.y / TILE * k];
    this.view = { at };
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(City.minimap, x0, y0, mw, mh);
    ctx.imageSmoothingEnabled = true;
    ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 2; ctx.strokeRect(x0, y0, mw, mh);
    // названия районов — по центру их кварталов
    if (!this.labels) {
      const acc = {};
      for (let by = 0; by < City.NB; by++) for (let bx = 0; bx < City.NB; bx++) {
        const key = City.LAYOUT[by][bx], r = City.blockRect(bx, by);
        const a = acc[key] || (acc[key] = { x: 0, y: 0, n: 0 });
        a.x += (r.x0 + r.x1) / 2; a.y += (r.y0 + r.y1) / 2; a.n++;
      }
      this.labels = Object.entries(acc).filter(([key]) => DISTRICTS[key]).map(([key, a]) => ({ name: DISTRICTS[key], x: a.x / a.n * TILE, y: a.y / a.n * TILE }));
    }
    // подписи, которые налезли бы на уже написанные, пропускаем
    const fs = Math.max(10, Math.min(13, k * 3.5)), used = [];
    ctx.font = `normal ${fs}px "Trebuchet MS", "Segoe UI", sans-serif`;
    for (const l of this.labels) {
      const [x, y] = at(l), name = T(l.name), w = ctx.measureText(name).width + 6;
      const r = { x0: x - w / 2, x1: x + w / 2, y0: y - fs, y1: y + 4 };
      if (used.some((u) => r.x0 < u.x1 && r.x1 > u.x0 && r.y0 < u.y1 && r.y1 > u.y0)) continue;
      used.push(r);
      HUD.text(ctx, name, x, y, fs, 'rgba(255,255,255,0.8)', 'center', 'normal');
      ctx.font = `normal ${fs}px "Trebuchet MS", "Segoe UI", sans-serif`;
    }
    // маршрут к метке
    this.drawRoute(ctx, (x, y) => at({ x, y }));
    // значки
    pts.forEach((q, i) => {
      const [x, y] = at(q.p);
      if (i === this.sel) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 17 + Math.sin(World.time * 6) * 1.5, 0, TAU); ctx.stroke(); }
      if (this.mark && this.mark.p === q.p) { ctx.strokeStyle = '#4fc3f7'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 13, 0, TAU); ctx.stroke(); }
      this.icon(ctx, q.kind, x, y, 9);
    });
    // цель миссии и игрок
    const obj = Missions.objective();
    if (obj) {
      const [x, y] = at(obj);
      ctx.fillStyle = '#ffd23f'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) { const r = i % 2 ? 4 : 10, a = -Math.PI / 2 + i * Math.PI / 5; ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    const [px, py] = at(pl);
    ctx.save(); ctx.translate(px, py); ctx.rotate(pl.car ? pl.car.a : pl.a + Math.PI / 2);
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(6, 7); ctx.lineTo(-6, 7); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    // заголовок, выбранный значок, подсказки
    HUD.text(ctx, 'Карта Тель-Авива', vw / 2, 38, 26, '#ffd23f', 'center');
    const q = pts[this.sel];
    const marked = this.mark && this.mark.p === q.p;
    HUD.text(ctx, T('{0} — {1}', T(q.name), this.km(dist(pl.x, pl.y, q.p.x, q.p.y))) + (marked ? T(' · метка стоит') : ''), vw / 2, vh - 56, 20, marked ? '#4fc3f7' : '#fff', 'center');
    HUD.text(ctx, marked ? '←→ / Tab — выбрать · Enter — снять метку · M — закрыть' : '←→ / Tab — выбрать · Enter — поставить метку · M — закрыть', vw / 2, vh - 26, 15, '#aaa', 'center', 'normal');
    // легенда
    const lg = [['gun', 'Оружейная'], ['black', 'Чёрный рынок'], ['paint', 'Покраска']];
    lg.forEach(([kind, label], i) => {
      const lx = I18N.he ? vw - 30 : 30, ly = top + 16 + i * 26;
      this.icon(ctx, kind, lx, ly, 8);
      HUD.text(ctx, label, I18N.he ? lx - 16 : lx + 16, ly + 5, 14, '#ddd', I18N.he ? 'right' : 'left', 'normal');
    });
  },
};
