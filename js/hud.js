// Интерфейс: деньги, розыск, здоровье, оружие, миникарта, стрелка задания,
// диалоги и крупные надписи.
'use strict';

const HUD = {
  district: '',
  districtT: 0,
  street: '',
  msgs: [],
  big: null,

  drawStar(ctx, x, y, r, filled, color) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? r * 0.45 : r;
      const a = -Math.PI / 2 + i * Math.PI / 5;
      ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    }
    ctx.closePath();
    if (filled) { ctx.fillStyle = color; ctx.fill(); }
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(0,0,0,0.7)'; ctx.stroke();
  },

  text(ctx, s, x, y, size, color, align = 'left', weight = 'bold') {
    ctx.font = `${weight} ${size}px "Trebuchet MS", "Segoe UI", sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = 'alphabetic';
    ctx.lineWidth = Math.max(3, size / 6);
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(0,0,0,0.85)';
    ctx.strokeText(s, x, y);
    ctx.fillStyle = color;
    ctx.fillText(s, x, y);
  },

  draw(ctx, vw, vh, dt) {
    const pl = World.player;
    // ---- деньги и розыск (справа сверху)
    this.text(ctx, formatMoney(pl.money), vw - 20, 44, 34, '#9be15d', 'right');
    for (let i = 0; i < 5; i++) {
      const on = i < Wanted.level;
      const blink = Wanted.flash > 0 && Math.floor(World.time * 8) % 2;
      this.drawStar(ctx, vw - 34 - (4 - i) * 30, 76, 12, on && !blink, on ? '#ffd23f' : null);
    }
    // накал до следующей звезды
    if (Wanted.heat > 0 && Wanted.level < 5) {
      const lo = HEAT_LEVELS[Wanted.level], hi = HEAT_LEVELS[Wanted.level + 1];
      const k = clamp((Wanted.heat - lo) / (hi - lo), 0, 1);
      const bx = vw - 46 - (4 - Wanted.level) * 30;
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(bx, 90, 24, 4);
      ctx.fillStyle = Wanted.unseen > 6 ? '#90caf9' : '#ff8a65'; ctx.fillRect(bx, 90, 24 * k, 4);
    }
    // ---- здоровье и оружие (слева сверху)
    const hpw = 180;
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(18, 18, hpw + 4, 16);
    ctx.fillStyle = pl.hp > 35 ? '#e53935' : (Math.floor(World.time * 4) % 2 ? '#ff7b7b' : '#a01010');
    ctx.fillRect(20, 20, hpw * clamp(pl.hp / 100, 0, 1), 12);
    if (pl.armor > 0) { ctx.fillStyle = '#90a4ae'; ctx.fillRect(20, 33, hpw * clamp(pl.armor / 100, 0, 1), 4); }
    this.text(ctx, '❤ ' + Math.ceil(Math.max(0, pl.hp)) + (pl.armor > 0 ? '  🛡 ' + Math.ceil(pl.armor) : ''), 22, 54, 18, '#fff');
    const w = pl.weapon || 'fists';
    const ammo = WEAPONS[w].melee ? '' : ' × ' + (pl.ammo[w] || 0);
    this.text(ctx, WEAPONS[w].name + ammo, 22, 78, 18, '#ffe082');
    if (pl.car) {
      const kmh = Math.round(pl.car.speed * 0.36);
      this.text(ctx, kmh + ' км/ч', 22, 102, 18, '#b3e5fc');
      const hp = pl.car.hp / pl.car.maxHp;
      ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(18, 110, 104, 10);
      ctx.fillStyle = hp > 0.4 ? '#90caf9' : '#ff8a65'; ctx.fillRect(20, 112, 100 * hp, 6);
    }

    // ---- район / улица (по центру сверху)
    const d = City.districtAt(pl.x, pl.y);
    if (d !== this.district) { this.district = d; this.districtT = 3.5; this.turf = City.factionAt(pl.x, pl.y); }
    if (this.districtT > 0) {
      this.districtT -= dt;
      ctx.globalAlpha = clamp(this.districtT, 0, 1);
      this.text(ctx, this.district, vw / 2, 52, 30, '#fff3c4', 'center');
      // чья это земля
      if (this.turf) this.text(ctx, 'территория: ' + FACTIONS[this.turf].name, vw / 2, 78, 17, FACTIONS[this.turf].turf, 'center');
      ctx.globalAlpha = 1;
    }
    const st = pl.car ? City.streetAt(pl.x, pl.y) : null;
    if (st) this.text(ctx, 'ул. ' + st, vw / 2, this.districtT > 0 ? 80 : 40, 16, '#e0e0e0', 'center', 'normal');

    this.drawMinimap(ctx, vw, vh);
    this.drawObjective(ctx, vw, vh);
    this.drawMessages(ctx, vw, vh, dt);
    this.drawBig(ctx, vw, vh, dt);
    this.drawClock(ctx, vw, vh);
    this.drawRep(ctx, vw, vh);
    this.drawWord(ctx, vw, vh, dt);
    if (Missions.dialog) this.drawDialog(ctx, vw, vh);
    Shops.draw(ctx, vw, vh);
  },

  drawMinimap(ctx, vw, vh) {
    const size = Math.min(190, vw * 0.28);
    const x0 = 16, y0 = vh - size - 16;
    const pl = World.player;
    const span = 34; // клеток по ширине
    const k = size / span;
    ctx.save();
    ctx.beginPath(); ctx.rect(x0, y0, size, size); ctx.clip();
    ctx.fillStyle = '#2f6f9f'; ctx.fillRect(x0, y0, size, size);
    ctx.imageSmoothingEnabled = false;
    const ptx = pl.x / TILE, pty = pl.y / TILE;
    ctx.drawImage(City.minimap, x0 + size / 2 - ptx * k, y0 + size / 2 - pty * k, City.W * k, City.H * k);
    ctx.imageSmoothingEnabled = true;
    const toMap = (wx, wy) => [x0 + size / 2 + (wx / TILE - ptx) * k, y0 + size / 2 + (wy / TILE - pty) * k];
    // магазины оружия — оранжевые ромбы
    for (const sh of SHOPS) {
      const p = Shops.place(sh);
      const [mx, my] = toMap(p.x, p.y);
      ctx.fillStyle = '#ff9800'; ctx.strokeStyle = '#000'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(mx, my - 5); ctx.lineTo(mx + 5, my); ctx.lineTo(mx, my + 5); ctx.lineTo(mx - 5, my); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    // полиция
    for (const c of World.cars) {
      if (!c.police || c.dead) continue;
      const [mx, my] = toMap(c.x, c.y);
      ctx.fillStyle = Math.floor(World.time * 4) % 2 ? '#ff3030' : '#3080ff';
      ctx.fillRect(mx - 3, my - 3, 6, 6);
    }
    // цель
    const obj = Missions.objective();
    if (obj) {
      let [mx, my] = toMap(obj.x, obj.y);
      mx = clamp(mx, x0 + 6, x0 + size - 6); my = clamp(my, y0 + 6, y0 + size - 6);
      ctx.fillStyle = '#ffd23f'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(mx, my, 5 + Math.sin(World.time * 6), 0, TAU); ctx.fill(); ctx.stroke();
    }
    // игрок
    const a = pl.car ? pl.car.a : pl.a + Math.PI / 2;
    ctx.translate(x0 + size / 2, y0 + size / 2); ctx.rotate(a);
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000';
    ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(5, 6); ctx.lineTo(-5, 6); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = 'rgba(0,0,0,0.8)'; ctx.lineWidth = 3; ctx.strokeRect(x0, y0, size, size);
    this.text(ctx, 'N', x0 + size / 2, y0 + 14, 12, '#fff', 'center');
  },

  // Стрелка к цели вокруг игрока + текст задания
  drawObjective(ctx, vw, vh) {
    const pl = World.player;
    const m = Missions.active;
    if (m) {
      const t = m.timer !== null && m.timer !== undefined ? '   ⏱ ' + Math.max(0, Math.ceil(m.timer)) : '';
      this.text(ctx, m.text + t, vw / 2, vh - 28, 20, '#ffe082', 'center');
    } else if (Missions.phonePlace()) {
      this.text(ctx, '☎ Звонит телефон-автомат', vw / 2, vh - 28, 18, '#ffe082', 'center');
    }
    const jt = Jobs.text();
    if (jt) this.text(ctx, jt, vw / 2, vh - (m ? 54 : 28) - (Missions.phonePlace() && !m ? 26 : 0), 17, '#ffb380', 'center');
    const obj = Missions.objective();
    if (!obj || pl.dead) return;
    const z = Game.zoomTotal;
    let sx = vw / 2 + (pl.x - Game.cam.x) * z, sy = vh / 2 + (pl.y - Game.cam.y) * z;
    if (Game.gl) [sx, sy] = R3.worldToScreen(pl.x, pl.y, 10);
    const ang = Math.atan2(obj.y - pl.y, obj.x - pl.x);
    const d = dist(obj.x, obj.y, pl.x, pl.y);
    if (d < 120) return;
    const r = 70;
    ctx.save();
    ctx.translate(sx + Math.cos(ang) * r, sy + Math.sin(ang) * r);
    ctx.rotate(ang);
    const p = 1 + Math.sin(World.time * 6) * 0.12;
    ctx.scale(p, p);
    ctx.fillStyle = '#ffd23f'; ctx.strokeStyle = '#3a2a00'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-8, -13); ctx.lineTo(-3, 0); ctx.lineTo(-8, 13); ctx.closePath();
    ctx.stroke(); ctx.fill();
    ctx.restore();
  },

  // Часы, день недели, температура
  drawClock(ctx, vw) {
    const s = Clock.text() + '  ' + Clock.temp + '°C' + (Clock.shabbat ? '  🕯 Шаббат' : '') + (Clock.hamsin ? '  🌪 Хамсин' : '');
    this.text(ctx, s, vw - 20, 108, 16, Clock.hamsin ? '#ffcc80' : '#e3f2fd', 'right', 'normal');
  },

  // Репутация фракций
  drawRep(ctx, vw) {
    let y = 124;
    for (const f of ['russian', 'arab', 'lions']) {
      const r = Factions.rep[f];
      const x = vw - 20 - 120;
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(x, y, 120, 8);
      ctx.fillStyle = r >= 0 ? '#66bb6a' : '#ef5350';
      if (r >= 0) ctx.fillRect(x + 60, y + 1, 60 * r / 100, 6); else ctx.fillRect(x + 60 + 60 * r / 100, y + 1, -60 * r / 100, 6);
      ctx.fillStyle = '#fff'; ctx.fillRect(x + 59.5, y, 1, 8);
      ctx.fillStyle = FACTIONS[f].color; ctx.fillRect(x - 12, y, 8, 8);
      this.text(ctx, FACTIONS[f].short, x - 18, y + 8, 11, '#ddd', 'right', 'normal');
      y += 14;
    }
  },

  wordOfDay(w) { this.word = { w, t: 9 }; },

  drawWord(ctx, vw, vh, dt) {
    const W = this.word;
    if (!W) return;
    W.t -= dt;
    if (W.t <= 0) { this.word = null; return; }
    ctx.globalAlpha = clamp(Math.min(W.t, 9 - W.t) * 2, 0, 1);
    const x = vw - 260, y = vh - 130;
    ctx.fillStyle = 'rgba(0,60,50,0.88)'; ctx.fillRect(x, y, 244, 112);
    ctx.strokeStyle = '#4db6ac'; ctx.lineWidth = 2; ctx.strokeRect(x, y, 244, 112);
    this.text(ctx, '📖 Слово дня из ульпана', x + 10, y + 20, 13, '#b2dfdb', 'left', 'normal');
    ctx.save(); ctx.direction = 'rtl';
    this.text(ctx, W.w[0], x + 234, y + 50, 24, '#fff', 'right');
    ctx.restore();
    this.text(ctx, W.w[1], x + 10, y + 76, 18, '#ffe082');
    this.text(ctx, '— ' + W.w[2], x + 10, y + 100, 12, '#e0f2f1', 'left', 'normal');
    ctx.globalAlpha = 1;
  },

  message(text, dur = 4) {
    this.msgs.push({ text, t: dur });
    if (this.msgs.length > 4) this.msgs.shift();
  },

  drawMessages(ctx, vw, vh, dt) {
    let y = 130;
    for (let i = this.msgs.length - 1; i >= 0; i--) {
      const m = this.msgs[i];
      m.t -= dt;
      if (m.t <= 0) { this.msgs.splice(i, 1); continue; }
    }
    for (const m of this.msgs) {
      ctx.globalAlpha = clamp(m.t, 0, 1);
      this.text(ctx, m.text, vw / 2, y, 18, '#ffffff', 'center');
      y += 26;
    }
    ctx.globalAlpha = 1;
  },

  bigText(title, sub, color = '#ffd23f', dur = 3.5) {
    this.big = { title, sub, color, t: dur, d: dur };
  },

  drawBig(ctx, vw, vh, dt) {
    const b = this.big;
    if (!b) return;
    b.t -= dt;
    if (b.t <= 0) { this.big = null; return; }
    const a = clamp(Math.min(b.t, b.d - b.t) * 3, 0, 1);
    ctx.globalAlpha = a;
    this.text(ctx, b.title, vw / 2, vh * 0.36, Math.min(64, vw / 12), b.color, 'center');
    if (b.sub) this.text(ctx, b.sub, vw / 2, vh * 0.36 + 44, 24, '#ffffff', 'center');
    ctx.globalAlpha = 1;
  },

  drawDialog(ctx, vw, vh) {
    const d = Missions.dialog;
    const [who, line] = d.lines[d.i];
    const pic = Portraits.get(PORTRAIT_OF[who]);
    const w = Math.min(820, vw - 40), h = pic ? 150 : 130;
    const x = (vw - w) / 2, y = vh - h - 60;
    ctx.fillStyle = 'rgba(10,12,20,0.88)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
    // портрет говорящего слева, текст справа от него
    let tx = x + 18;
    if (pic) {
      const ps = h - 24, px = x + 12, py = y + 12;
      const sw = pic.width || pic.naturalWidth, sh = pic.height || pic.naturalHeight, sq = Math.min(sw, sh);
      ctx.drawImage(pic, (sw - sq) / 2, (sh - sq) / 2, sq, sq, px, py, ps, ps);
      ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 3; ctx.strokeRect(px, py, ps, ps);
      tx = px + ps + 16;
    }
    this.text(ctx, '☎ ' + who, tx, y + 30, 20, '#ffd23f');
    if (d.i === 0) this.text(ctx, d.title, x + w - 18, y + 30, 16, '#9be15d', 'right');
    ctx.font = '18px "Trebuchet MS", "Segoe UI", sans-serif';
    ctx.fillStyle = '#fff'; ctx.textAlign = 'left';
    // перенос строк
    const words = line.split(' ');
    const maxW = x + w - 18 - tx;
    let s = '', yy = y + 62;
    for (const wd of words) {
      if (ctx.measureText(s + wd).width > maxW) { ctx.fillText(s, tx, yy); s = ''; yy += 24; }
      s += wd + ' ';
    }
    ctx.fillText(s, tx, yy);
    const blink = Math.floor(performance.now() / 400) % 2;
    if (blink) this.text(ctx, 'Enter ▶', x + w - 18, y + h - 14, 14, '#aaa', 'right', 'normal');
  },
};
