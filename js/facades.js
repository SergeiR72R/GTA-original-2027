// Процедурные текстуры для 3D-режима: фасады домов по районам, витрины,
// листва, флаги, свечение. Фасад — 4 пролёта × 2 этажа (256×80 игровых px),
// холст в 2× разрешении. Для каждого фасада есть «ночная» карта свечения окон.
'use strict';

const FACADE_W = 256, FACADE_H = 80, FLOOR_H = 40;

const SHOP_SIGNS = [
  ['פלאפל', '#2e7d32'], ['שווארמה', '#c62828'], ['מכולת', '#1565c0'], ['קיוסק', '#6a1b9a'], ['ГАСТРОНОМ', '#4e342e'],
  ['פיצה', '#e65100'], ['בורקס', '#8d6e63'], ['מספרה', '#ad1457'], ['סלולר', '#0277bd'], ['חומוס', '#827717'],
  ['קפה', '#5d4037'], ['БЕРЁЗКА', '#37474f'], ['בית מרקחת', '#00897b'], ['פרחים', '#c2185b'], ['ירקות', '#558b2f'], ['לוטו', '#f9a825'],
];

// Рекламные плакаты (вымышленные): иврит крупно, русский мелко
const ADS = [
  { he: 'שמונה ביס', ru: 'Шмоне-Бис: доставка за 8 минут', bg: '#ff6a1a', fg: '#fff', ic: 'scooter' },
  { he: 'חומוס אבו סמי', ru: 'Хумус «Абу-Сами» — лучший в Яффо', bg: '#827717', fg: '#fff8e1', ic: 'bowl' },
  { he: 'מזגנים כל-קר', ru: 'Кондиционеры «Коль-Кар»: хамсин не страшен', bg: '#0277bd', fg: '#fff', ic: 'snow' },
  { he: 'אולפן אלף', ru: 'Ульпан «Алеф»: иврит за 5 месяцев', bg: '#f5f5f5', fg: '#1565c0', ic: 'alef' },
  { he: 'לוטו מזל', ru: 'Лотерея «Мазаль»: 30 миллионов!', bg: '#6a1b9a', fg: '#ffd54f', ic: 'star' },
  { he: 'דירות בבת ים', ru: 'Квартиры в Бат-Яме — всего от ₪3 млн', bg: '#37474f', fg: '#fff', ic: 'house' },
  { he: 'סלולר שלום', ru: 'Тариф «Шалом»: 100 ГБ за ₪29', bg: '#00897b', fg: '#fff', ic: 'phone' },
  { he: 'גלידה לימון', ru: 'Мороженое «Лимон» — холоднее моря', bg: '#f06292', fg: '#fff', ic: 'ice' },
];

const Facades = {
  cache: {},

  // Дверь подъезда: бетонный козырёк, железная дверь со стеклом, синий номер дома
  door() {
    const c = this.canvas(48, 84), g = c.getContext('2d');
    g.fillStyle = '#ece7db'; g.fillRect(0, 0, 48, 10);           // козырёк
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(2, 10, 44, 4);  // тень под ним
    g.fillStyle = '#d9d2c2'; g.fillRect(4, 14, 40, 70);          // светлая рамка проёма
    g.fillStyle = '#2f6f8f'; g.fillRect(9, 18, 30, 66);          // синяя железная дверь
    g.fillStyle = '#a9cbd8'; g.fillRect(13, 24, 22, 24);         // стекло
    g.fillStyle = 'rgba(255,255,255,0.4)'; g.fillRect(14, 25, 6, 22);
    g.fillStyle = '#d0d0d0'; g.fillRect(33, 54, 3, 8);           // ручка
    g.fillStyle = '#1e5aa8'; g.fillRect(16, 2, 16, 6);           // номер дома
    g.fillStyle = '#fff'; g.fillRect(21, 3, 2, 4); g.fillRect(25, 3, 2, 4);
    return c;
  },

  // Табличка вывески (для стоек у тротуара)
  signBoard(sg) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = sg.sub ? 168 : 116;
    const g = c.getContext('2d');
    g.fillStyle = sg.bg; g.fillRect(0, 0, c.width, c.height);
    g.strokeStyle = 'rgba(255,255,255,0.65)'; g.lineWidth = 7; g.strokeRect(7, 7, c.width - 14, c.height - 14);
    g.fillStyle = sg.fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = 'bold 62px Arial, sans-serif'; g.fillText(sg.text, 256, 60, 480);
    if (sg.sub) { g.font = '36px Arial, sans-serif'; g.fillText(sg.sub, 256, 126, 480); }
    return c;
  },

  // Плакат для щита и тумбы (256 × 128)
  adPoster(i) {
    const key = 'ad' + i;
    if (this.cache[key]) return this.cache[key];
    const a = ADS[i % ADS.length];
    const c = this.canvas(256, 128), g = c.getContext('2d');
    // сгенерированная иллюстрация (assets/gen/facades/poster_N) — подложка, надписи — свои
    const art = Assets.gen['facades/poster_' + (i % ADS.length + 1)];
    if (art) {
      this.cover(g, art, 256, 128);
      g.fillStyle = shade(a.bg, 0.8) + 'dd'; g.fillRect(0, 74, 256, 54);
      g.fillStyle = a.fg; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = 'bold 26px Arial, sans-serif'; g.fillText(a.he, 128, 90, 240);
      g.font = '13px Arial, sans-serif'; g.fillText(a.ru, 128, 115, 244);
      g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 3; g.strokeRect(2, 2, 252, 124);
      this.cache[key] = c;
      return c;
    }
    const gr = g.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, shade(a.bg, 1.12)); gr.addColorStop(1, shade(a.bg, 0.85));
    g.fillStyle = gr; g.fillRect(0, 0, 256, 128);
    // значок слева
    g.save(); g.translate(42, 56); g.fillStyle = a.fg; g.strokeStyle = a.fg; g.lineWidth = 5;
    switch (a.ic) {
      case 'scooter': g.fillRect(-22, -6, 30, 18); g.beginPath(); g.arc(-16, 18, 7, 0, TAU); g.arc(16, 18, 7, 0, TAU); g.fill(); g.fillRect(10, -20, 5, 30); break;
      case 'bowl': g.beginPath(); g.arc(0, 0, 26, 0, Math.PI); g.fill(); g.fillStyle = '#c0a060'; g.beginPath(); g.ellipse(0, 0, 26, 7, 0, 0, TAU); g.fill(); break;
      case 'snow': for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(-26 * Math.cos(k), -26 * Math.sin(k)); g.lineTo(26 * Math.cos(k), 26 * Math.sin(k)); g.stroke(); } break;
      case 'alef': g.font = 'bold 64px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('א', 0, 4); break;
      case 'star': g.beginPath(); for (let k = 0; k < 10; k++) { const r = k % 2 ? 12 : 28, an = k / 10 * TAU - Math.PI / 2; g.lineTo(Math.cos(an) * r, Math.sin(an) * r); } g.fill(); break;
      case 'house': g.fillRect(-20, -4, 40, 30); g.beginPath(); g.moveTo(-26, -2); g.lineTo(0, -28); g.lineTo(26, -2); g.fill(); break;
      case 'phone': g.strokeRect(-14, -26, 28, 52); g.fillRect(-4, 18, 8, 4); break;
      case 'ice': g.beginPath(); g.moveTo(-14, -2); g.lineTo(14, -2); g.lineTo(0, 30); g.fill(); g.beginPath(); g.arc(0, -12, 15, 0, TAU); g.fill(); break;
    }
    g.restore();
    g.fillStyle = a.fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = 'bold 36px Arial, sans-serif'; g.fillText(a.he, 166, 44, 170);
    g.font = '15px Arial, sans-serif'; g.fillText(a.ru, 128, 104, 240);
    g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 3; g.strokeRect(2, 2, 252, 124);
    this.cache[key] = c;
    return c;
  },

  // картинка «под обрез» на весь холст w × h
  cover(g, im, w, h) {
    const k = Math.max(w / im.width, h / im.height);
    g.drawImage(im, (w - im.width * k) / 2, (h - im.height * k) / 2, im.width * k, im.height * k);
  },

  // Плакаты миссий поверх рекламных щитов (256 × 128)
  missionPoster(kind) {
    const key = 'mp_' + kind;
    if (this.cache[key]) return this.cache[key];
    const c = this.canvas(256, 128), g = c.getContext('2d');
    const P = {
      iran: { bg: '#b71c1c', fg: '#fff', he: 'המחאה במימון איראן!', ru: 'Протест оплачивает Иран!' },
    }[kind] || { bg: '#333', fg: '#fff', he: kind, ru: '' };
    g.fillStyle = P.bg; g.fillRect(0, 0, 256, 128);
    const art = Assets.gen['facades/poster_' + kind];
    if (art) { this.cover(g, art, 256, 128); g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(0, 0, 256, 128); }
    else { g.fillStyle = 'rgba(0,0,0,0.25)'; for (let i = 0; i < 6; i++) g.fillRect(0, 20 * i + 8, 256, 3); }
    g.fillStyle = P.fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = 'bold 26px Arial, sans-serif'; g.fillText(P.he, 128, 50, 240);
    g.font = 'bold 18px Arial, sans-serif'; g.fillText(P.ru, 128, 96, 240);
    g.strokeStyle = '#fff'; g.lineWidth = 4; g.strokeRect(3, 3, 250, 122);
    this.cache[key] = c;
    return c;
  },

  // Надпись баллончиком на тротуаре (192 × 64)
  sprayTag(t) {
    if (t.cv) return t.cv;
    const c = this.canvas(192, 64), g = c.getContext('2d');
    g.font = 'bold 40px "Arial Black", Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = t.color; g.globalAlpha = 0.25;
    for (let i = 0; i < 30; i++) g.fillRect(rand(10, 182), rand(8, 56), 2, 2);
    g.globalAlpha = 0.9; g.fillText(t.text, 96, 34, 184);
    g.strokeStyle = t.color; g.lineWidth = 2; g.globalAlpha = 0.6;
    for (let i = 0; i < 4; i++) { const x = rand(30, 160); g.beginPath(); g.moveTo(x, 46); g.lineTo(x + rand(-2, 2), 46 + rand(6, 14)); g.stroke(); }
    t.cv = c;
    return c;
  },

  // Афишная тумба: полоса из плакатов вокруг цилиндра
  adColumn() {
    if (this.cache.adcol) return this.cache.adcol;
    const c = this.canvas(512, 128), g = c.getContext('2d');
    g.fillStyle = '#2e5d3a'; g.fillRect(0, 0, 512, 128);
    for (let k = 0; k < 4; k++) g.drawImage(this.adPoster(k * 2 + 1), k * 128 + 4, 14, 120, 100);
    this.cache.adcol = c;
    return c;
  },

  canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; },

  // Окно с рамой, жалюзи («трисим») и подоконником; иногда — решётка. Возвращает, светится ли окно ночью.
  window(g, e, x, y, w, h, opt, rng) {
    const shutter = rng() < 0.75 ? rng.range(0.15, 0.95) : 0;
    g.fillStyle = opt.frame || '#e8e8e8'; g.fillRect(x - 3, y - 3, w + 6, h + 6);
    const gr = g.createLinearGradient(x, y, x + w, y + h);
    gr.addColorStop(0, '#5f7f93'); gr.addColorStop(1, '#2c3f4c');
    g.fillStyle = gr;
    if (opt.arch) { g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + w / 2); g.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); g.lineTo(x + w, y + h); g.closePath(); g.fill(); }
    else g.fillRect(x, y, w, h);
    g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(x + 3, y + 3, w * 0.3, 3);
    const lit = rng() < 0.45;
    if (lit) {
      e.fillStyle = rng() < 0.7 ? '#ffcf7a' : '#bcd8ff';
      if (opt.arch) { e.beginPath(); e.moveTo(x, y + h); e.lineTo(x, y + w / 2); e.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); e.lineTo(x + w, y + h); e.closePath(); e.fill(); }
      else e.fillRect(x, y + h * shutter, w, h * (1 - shutter));
    }
    if (shutter && !opt.arch) {
      // пластиковые жалюзи
      g.fillStyle = opt.shutter || '#cfcfcf'; g.fillRect(x, y, w, h * shutter);
      g.fillStyle = 'rgba(0,0,0,0.18)';
      for (let yy = y + 3; yy < y + h * shutter; yy += 4) g.fillRect(x, yy, w, 1);
    }
    if (opt.side) {
      // деревянные ставни по бокам
      g.fillStyle = opt.side; g.fillRect(x - 3 - w * 0.42, y - 2, w * 0.42, h + 4); g.fillRect(x + w + 3, y - 2, w * 0.42, h + 4);
      g.fillStyle = 'rgba(0,0,0,0.2)';
      for (let yy = y; yy < y + h; yy += 5) { g.fillRect(x - 3 - w * 0.42, yy, w * 0.42, 1); g.fillRect(x + w + 3, yy, w * 0.42, 1); }
    }
    if (opt.bars || rng() < 0.08) { g.strokeStyle = 'rgba(40,40,40,0.8)'; g.lineWidth = 1.5; for (let xx = x + 4; xx < x + w; xx += 7) { g.beginPath(); g.moveTo(xx, y); g.lineTo(xx, y + h); g.stroke(); } }
    g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(x - 4, y + h + 3, w + 8, 3);
    if (rng() < 0.4) this.drip(g, x + w * 0.2, y + h + 5, w * 0.6, rng.range(8, 22), rng);
    return lit;
  },

  ac(g, x, y) {
    g.fillStyle = '#ececec'; g.fillRect(x, y, 26, 18);
    g.strokeStyle = '#9e9e9e'; g.lineWidth = 1; g.strokeRect(x + 0.5, y + 0.5, 25, 17);
    g.fillStyle = '#8a8a8a'; g.beginPath(); g.arc(x + 9, y + 9, 6, 0, TAU); g.fill();
    g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(x + 13, y + 22, 2, 10); // трубка конденсата
  },

  graffiti(g, x, y, rng) {
    const cols = ['#e91e63', '#00bcd4', '#ffeb3b', '#8bc34a', '#ff5722', '#9c27b0', '#ffffff'];
    g.lineWidth = rng.range(3, 6); g.lineCap = 'round';
    for (let i = 0; i < 3; i++) {
      g.strokeStyle = rng.pick(cols);
      g.beginPath(); g.moveTo(x + rng.range(0, 30), y + rng.range(0, 30));
      for (let k = 0; k < 4; k++) g.quadraticCurveTo(x + rng.range(0, 90), y + rng.range(-10, 40), x + rng.range(0, 90), y + rng.range(0, 40));
      g.stroke();
    }
  },

  // ---------- грязь, провода и прочая «жизнь» на стенах ----------
  grime(g, W, H, rng, k = 1) {
    // общие пятна и выцветание
    Tex.blotches(g, W, H, Math.round(10 * k), 'rgba(70,60,45,0.13)', 12, 46, rng);
    Tex.blotches(g, W, H, Math.round(5 * k), 'rgba(255,255,255,0.10)', 10, 30, rng);
    // чёрные потёки вниз
    for (let i = 0; i < 3 * k; i++) this.drip(g, rng.range(0, W), rng.range(0, H * 0.8), rng.range(5, 10), rng.range(20, 50), rng);
  },

  // мягкий потёк: несколько тонких полос с затуханием вниз
  drip(g, x, y, w, h, rng) {
    const a = rng.range(0.12, 0.26);
    for (let k = 0; k < 3; k++) {
      const xx = x + rng.range(0, w), hh = h * rng.range(0.5, 1), ww = rng.range(1.5, 3.5);
      const gr = g.createLinearGradient(0, y, 0, y + hh);
      gr.addColorStop(0, `rgba(45,40,35,${a})`); gr.addColorStop(1, 'rgba(45,40,35,0)');
      g.fillStyle = gr;
      g.fillRect(xx, y, ww, hh);
    }
  },

  cable(g, x0, y0, x1, y1, sag) {
    g.strokeStyle = 'rgba(20,20,20,0.75)'; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + sag, x1, y1); g.stroke();
  },

  // кондиционер с трубкой и потёком под ним
  acUnit(g, x, y, rng) {
    this.drip(g, x + 6, y + 18, 14, rng.range(25, 50), rng);
    this.ac(g, x, y);
    g.strokeStyle = '#d0d0d0'; g.lineWidth = 2; g.beginPath(); g.moveTo(x + 26, y + 6); g.lineTo(x + 34, y + 6); g.lineTo(x + 34, y - 10); g.stroke();
  },

  // табличка «Сдаётся» на балконе или в окне
  forRent(g, x, y, w, rng) {
    g.fillStyle = '#fffde7'; g.fillRect(x, y, w, w * 0.42);
    g.strokeStyle = '#c62828'; g.lineWidth = 2; g.strokeRect(x + 1, y + 1, w - 2, w * 0.42 - 2);
    g.fillStyle = '#c62828'; g.font = `bold ${w * 0.2}px Arial`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('להשכרה', x + w / 2, y + w * 0.15);
    g.font = `${w * 0.13}px Arial`; g.fillText('05' + rng.int(0, 9) + '-' + rng.int(1000000, 9999999), x + w / 2, y + w * 0.31);
  },

  // Фасад района. Холст 512×160 = 4 пролёта × 2 этажа; у типовых домов — несколько вариантов
  facade(style, variant = 0) {
    const ck = style + '#' + variant;
    if (this.cache[ck]) return this.cache[ck];
    const W = FACADE_W * 2, H = FACADE_H * 2;
    const c = this.canvas(W, H), em = this.canvas(W, H);
    const g = c.getContext('2d'), e = em.getContext('2d');
    e.fillStyle = '#000'; e.fillRect(0, 0, W, H);
    const rng = makeRng([...style].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7) + variant * 1013);
    const bay = W / 4, fl = H / 2;
    const plaster = (base, n) => { g.fillStyle = base; g.fillRect(0, 0, W, H); Tex.noise(g, W, H, n, ['rgba(0,0,0,0.05)', 'rgba(255,255,255,0.08)'], 1, 3, rng); };
    switch (style) {
      case 'tower': case 'mall': {
        // стеклянная навесная стена
        const gr = g.createLinearGradient(0, 0, W, H);
        gr.addColorStop(0, '#9cc3d9'); gr.addColorStop(0.5, '#5f8ea8'); gr.addColorStop(1, '#3d6680');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        g.fillStyle = 'rgba(255,255,255,0.18)'; for (let x = 0; x < W; x += 64) g.fillRect(x + 6, 0, 10, H);
        g.fillStyle = '#2b3e4a';
        for (let x = 0; x < W; x += 32) g.fillRect(x, 0, 3, H);
        for (let y = 0; y < H; y += fl / 2) g.fillRect(0, y, W, 4);
        for (let x = 0; x < W; x += 32) for (let y = 0; y < H; y += fl / 2) if (rng() < 0.4) { e.fillStyle = rng() < 0.6 ? '#ffe2a8' : '#cfe4ff'; e.fillRect(x + 3, y + 4, 29, fl / 2 - 4); }
        break;
      }
      case 'warehouse': case 'garage': {
        g.fillStyle = '#9a9d9f'; g.fillRect(0, 0, W, H);
        for (let x = 0; x < W; x += 8) { g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(x, 0, 3, H); g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(x + 4, 0, 2, H); }
        Tex.blotches(g, W, H, 10, 'rgba(140,70,30,0.28)', 10, 40, rng);
        for (let i = 0; i < 6; i++) this.drip(g, rng.range(0, W), rng.range(0, H * 0.5), 8, rng.range(30, 70), rng);
        g.fillStyle = '#5d6266'; g.fillRect(bay * 1.2, fl * 0.9, bay * 1.6, fl * 1.1); // ворота
        g.fillStyle = 'rgba(0,0,0,0.25)'; for (let y = fl * 0.9; y < H; y += 6) g.fillRect(bay * 1.2, y, bay * 1.6, 1);
        this.graffiti(g, bay * 3, fl * 1.1, rng);
        this.graffiti(g, bay * 0.2, fl * 1.2, rng);
        break;
      }
      case 'jaffa': case 'templer': {
        // иерусалимский камень, арочные окна, зелёные ставни, кондиционеры прямо в камне
        g.fillStyle = style === 'templer' ? '#efe2c4' : '#e3c38e'; g.fillRect(0, 0, W, H);
        for (let row = 0; row < H / 16; row++) {
          const off = row % 2 ? 18 : 0;
          for (let x = -36 + off; x < W; x += 36) { const v = rng.range(-16, 10); g.fillStyle = `rgba(${150 + v},${110 + v},${60 + v},0.18)`; g.fillRect(x + 1, row * 16 + 1, 34, 14); }
        }
        this.grime(g, W, H, rng, 0.6);
        for (let f = 0; f < 2; f++) for (let i = 0; i < 4; i++) {
          if (rng() < 0.15) continue;
          this.window(g, e, i * bay + bay * 0.3, f * fl + 16, bay * 0.4, fl * 0.62, { arch: true, frame: '#d8b880', side: rng.pick(['#2e7d5b', '#2f6d8a', '#3f7f4a']) }, rng);
          if (style === 'jaffa' && rng() < 0.3) this.acUnit(g, i * bay + 4, f * fl + fl * 0.6, rng);
        }
        if (style === 'jaffa') this.cable(g, 0, fl * 0.9, W, fl * 0.95, 14);
        break;
      }
      case 'nevetzedek': {
        plaster(rng.pick(['#f3e0c7', '#e9d3b6', '#f1d9d0', '#e7e1c7']), 500);
        this.grime(g, W, H, rng, 0.4);
        for (let f = 0; f < 2; f++) for (let i = 0; i < 4; i++) this.window(g, e, i * bay + bay * 0.32, f * fl + 18, bay * 0.36, fl * 0.58, { frame: '#f7f2e8', side: rng.pick(['#3b8f7a', '#4f7fa8', '#6b8e4e']) }, rng);
        // бугенвиллея свисает со стены
        for (let i = 0; i < 18; i++) { g.fillStyle = rng.pick(['#d81b8c', '#f06292', '#3f7d3a']); g.beginPath(); g.arc(rng.range(0, 70), rng.range(fl, H), rng.range(4, 8), 0, TAU); g.fill(); }
        break;
      }
      case 'hotel': {
        plaster('#f4f6f7', 300);
        for (let f = 0; f < 2; f++) {
          for (let i = 0; i < 4; i++) {
            g.fillStyle = '#7fa6bd'; g.fillRect(i * bay + 8, f * fl + 10, bay - 16, fl * 0.62);
            if (rng() < 0.5) { e.fillStyle = '#ffd99a'; e.fillRect(i * bay + 8, f * fl + 10, bay - 16, fl * 0.62); }
            if (rng() < 0.3) { g.fillStyle = rng.pick(['#ff7043', '#29b6f6', '#ffffff']); g.fillRect(i * bay + 20, f * fl + fl * 0.6, 20, 8); } // полотенце на перилах
          }
          g.fillStyle = 'rgba(180,220,240,0.75)'; g.fillRect(0, f * fl + fl * 0.66, W, fl * 0.2);
          g.fillStyle = '#ffffff'; g.fillRect(0, f * fl + fl * 0.86, W, fl * 0.14);
        }
        break;
      }
      case 'concrete': case 'hospital': case 'police': case 'busstation': case 'cityhall': {
        // «шикун»: бетон, окна, закрытые балконы, кондиционеры, потёки
        plaster(style === 'busstation' ? '#a3a39b' : rng.pick(['#d9d5cc', '#cfc8b8', '#d6d0c2']), 900);
        this.grime(g, W, H, rng, style === 'concrete' ? 1.4 : 0.8);
        for (let f = 0; f < 2; f++) for (let i = 0; i < 4; i++) {
          if (style === 'concrete' && i % 2 === 1 && rng() < 0.7) {
            // застеклённый балкон: алюминиевые рамы, разные жалюзи
            g.fillStyle = '#bdb7aa'; g.fillRect(i * bay + 6, f * fl + 10, bay - 12, fl - 14);
            g.fillStyle = '#7f8c99'; g.fillRect(i * bay + 12, f * fl + 16, bay - 24, fl * 0.42);
            g.strokeStyle = rng.pick(['#9e9e9e', '#795548', '#e0e0e0']); g.lineWidth = 3;
            for (let k = 0; k < 3; k++) g.strokeRect(i * bay + 12 + k * (bay - 24) / 3, f * fl + 16, (bay - 24) / 3, fl * 0.42);
            if (rng() < 0.5) { e.fillStyle = '#ffcf7a'; e.fillRect(i * bay + 12, f * fl + 16, bay - 24, fl * 0.42); }
            if (rng() < 0.3) { g.fillStyle = '#f5f5f5'; g.beginPath(); g.ellipse(i * bay + bay - 18, f * fl + 22, 8, 6, 0.4, 0, TAU); g.fill(); } // тарелка
          } else this.window(g, e, i * bay + bay * 0.22, f * fl + 16, bay * 0.56, fl * 0.5, { frame: '#efefef', shutter: rng.pick(['#cfcfcf', '#e8e8e8', '#a1887f']) }, rng);
          if (rng() < 0.55) this.acUnit(g, i * bay + bay * 0.74, f * fl + fl * 0.58, rng);
        }
        this.cable(g, 0, rng.range(20, 60), W, rng.range(20, 70), 18);
        if (style === 'concrete' && rng() < 0.4) this.forRent(g, rng.range(20, W - 90), fl + 8, 70, rng);
        break;
      }
      default: { // bauhaus, florentin
        const flor = style === 'florentin';
        const base = flor ? rng.pick(['#e2d6c0', '#d9cdb7', '#e6dccb']) : rng.pick(['#f8f6f1', '#f1ede4', '#ece6da']);
        plaster(base, flor ? 1400 : 500);
        this.grime(g, W, H, rng, flor ? 1.6 : 0.7 + variant * 0.3);
        // штукатурка местами отвалилась
        for (let i = 0; i < (flor ? 4 : 2); i++) { g.fillStyle = 'rgba(150,140,125,0.35)'; g.fillRect(rng.range(0, W - 40), rng.range(0, H - 20), rng.range(14, 40), rng.range(8, 20)); }
        for (let f = 0; f < 2; f++) {
          for (let i = 0; i < 4; i++) {
            this.window(g, e, i * bay + bay * 0.2, f * fl + 14, bay * 0.6, fl * 0.5, { frame: '#ffffff', shutter: rng.pick(['#cfcfcf', '#e9e9e9', '#d7ccc8', '#b0bec5']) }, rng);
            if (rng() < 0.5) this.acUnit(g, i * bay + bay * 0.04, f * fl + fl * 0.6, rng);
          }
          // ленточный балкон баухауза, ржавые перила, цветы в горшках
          g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(0, f * fl + fl * 0.8 + 6, W, 5);
          g.fillStyle = flor ? '#efe6d4' : '#ffffff'; g.fillRect(0, f * fl + fl * 0.72, W, fl * 0.12);
          g.fillStyle = flor ? '#d9cdb5' : '#eceae4'; g.fillRect(0, f * fl + fl * 0.84, W, 4);
          if (flor || variant === 2) { g.strokeStyle = 'rgba(110,60,30,0.7)'; g.lineWidth = 1.5; for (let x = 0; x < W; x += 8) { g.beginPath(); g.moveTo(x, f * fl + fl * 0.6); g.lineTo(x, f * fl + fl * 0.72); g.stroke(); } }
          for (let k = 0; k < 4; k++) if (rng() < 0.5) { const x = rng.range(10, W - 20); g.fillStyle = '#8d5a3b'; g.fillRect(x, f * fl + fl * 0.64, 10, 8); g.fillStyle = rng.pick(['#43a047', '#e91e63', '#66bb6a']); g.beginPath(); g.arc(x + 5, f * fl + fl * 0.62, 7, 0, TAU); g.fill(); }
          if (rng() < 0.45) for (let k = 0; k < 4; k++) { g.fillStyle = rng.pick(SHIRTS); g.fillRect(rng.range(10, W - 30), f * fl + fl * 0.58, 14, 16); }
        }
        this.cable(g, 0, rng.range(10, 50), W, rng.range(10, 60), 20);
        if (rng() < 0.5) this.cable(g, rng.range(0, W / 2), 0, rng.range(W / 2, W), H, 30);
        if (flor) for (let k = 0; k < 2; k++) this.graffiti(g, rng.range(0, W - 100), rng.range(fl + 10, H - 40), rng);
        if (rng() < (flor ? 0.35 : 0.2)) this.forRent(g, rng.range(20, W - 90), rng.range(4, fl * 0.5), 64, rng);
      }
    }
    const res = { map: c, emissive: em };
    this.cache[ck] = res;
    return res;
  },

  // ---------- витрины первых этажей ----------
  // Каждая витрина — 64×40 игровых px (холст 256×160, ×4). Текстура — 4 витрины подряд.
  SHOPS: [
    { t: 'makolet', he: 'מכולת', sub: 'פתוח 24/7', bg: '#1565c0' },
    { t: 'makolet', he: 'מכולת השכונה', sub: 'משלוחים חינם', bg: '#0d47a1' },
    { t: 'pitz', he: 'פיצוצייה', sub: 'לוטו · טוטו · סיגריות', bg: '#d32f2f' },
    { t: 'shawarma', he: 'שווארמה', sub: '₪29 בלאפה', bg: '#f9a825', fg: '#4e2a00' },
    { t: 'falafel', he: 'פלאפל', sub: 'הכי טוב בעיר', bg: '#2e7d32' },
    { t: 'hummus', he: 'חומוסייה', sub: 'חומוס · פול · מסבחה', bg: '#8d6e63' },
    { t: 'barber', he: 'מספרה', sub: 'Парикмахерская', bg: '#263238' },
    { t: 'cell', he: 'סלולר', sub: 'תיקון מכשירים · Ремонт', bg: '#c62828' },
    { t: 'laundry', he: 'מכבסה', sub: 'כביסה וגיהוץ', bg: '#00838f' },
    { t: 'change', he: "צ'יינג'", sub: 'CHANGE  $ € ₪', bg: '#fbc02d', fg: '#1a1a1a' },
    { t: 'gastro', he: 'ГАСТРОНОМ', sub: 'Продукты · מעדנייה', bg: '#33691e' },
    { t: 'flowers', he: 'פרחים', sub: 'זרים ועציצים', bg: '#ad1457' },
    { t: 'keys', he: 'מנעולן', sub: 'פריצת דלתות 24/7', bg: '#455a64' },
    { t: 'shoes', he: 'סנדלר', sub: 'תיקון נעליים', bg: '#5d4037' },
    { t: 'pharm', he: 'בית מרקחת', sub: 'פתוח עד 23:00', bg: '#00897b' },
    { t: 'closed', he: '', sub: '', bg: '#9e9e9e' },
    { t: 'closed', he: '', sub: '', bg: '#9e9e9e' },
  ],

  shopfront(variant) {
    const key = 'shop' + variant;
    if (this.cache[key]) return this.cache[key];
    const S = 4, W = FACADE_W * S, H = FLOOR_H * S;
    const c = this.canvas(W, H), em = this.canvas(W, H);
    const g = c.getContext('2d'), e = em.getContext('2d');
    e.fillStyle = '#000'; e.fillRect(0, 0, W, H);
    const rng = makeRng(991 + variant * 17);
    g.fillStyle = rng.pick(['#d9d2c2', '#cfc6b4', '#d6cfc3']); g.fillRect(0, 0, W, H);
    Tex.noise(g, W, H, 1500, ['rgba(0,0,0,0.06)', 'rgba(255,255,255,0.08)'], 1, 3, rng);
    // в ряду без повторов: первой всегда еда или маколет, закрытых — не больше одной
    const food = this.SHOPS.filter((x) => ['makolet', 'pitz', 'shawarma', 'falafel', 'hummus', 'gastro'].includes(x.t));
    const rest = this.SHOPS.filter((x) => x.t !== 'closed');
    const row = [rng.pick(food)];
    while (row.length < 4) {
      const cand = row.length === 3 && rng() < 0.35 ? this.SHOPS.find((x) => x.t === 'closed') : rng.pick(rest);
      if (!row.includes(cand)) row.push(cand);
    }
    // перемешиваем, чтобы еда не всегда стояла первой
    for (let i = row.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [row[i], row[j]] = [row[j], row[i]]; }
    row.forEach((sh, i) => this.shop(g, e, i * 256, sh, rng));
    // грязь поверх всего этажа и провода над витринами
    this.grime(g, W, H, rng, 1.2);
    this.cable(g, 0, 8, W, 14, 10);
    const res = { map: c, emissive: em };
    this.cache[key] = res;
    return res;
  },

  shop(g, e, x, S, rng) {
    const fg = S.fg || '#ffffff';
    const signLit = rng() < 0.75;
    if (S.t === 'closed') {
      // закрытая лавка: опущенные ставни, граффити, «сдаётся»
      g.fillStyle = '#6d6a62'; g.fillRect(x + 8, 18, 240, 26);
      g.fillStyle = 'rgba(255,255,255,0.2)'; g.font = 'bold 18px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(rng.pick(['פלאפל', 'מכולת', 'בגדים', 'אופטיקה']), x + 128, 31);
      g.fillStyle = '#8f9499'; g.fillRect(x + 12, 48, 232, 112);
      g.fillStyle = 'rgba(0,0,0,0.22)'; for (let y = 50; y < 160; y += 6) g.fillRect(x + 12, y, 232, 2);
      this.graffiti(g, x + 30, 70, rng); this.graffiti(g, x + 130, 90, rng);
      this.forRent(g, x + 150, 56, 80, rng);
      return;
    }
    // вывеска-лайтбокс
    const faded = rng() < 0.3;
    g.fillStyle = S.bg; g.globalAlpha = faded ? 0.7 : 1; g.fillRect(x + 6, 4, 244, 40); g.globalAlpha = 1;
    g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 2; g.strokeRect(x + 8, 6, 240, 36);
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = 'bold 22px Arial, sans-serif'; g.fillText(S.he, x + 128, 18, 230);
    g.font = '11px Arial, sans-serif'; g.fillText(S.sub, x + 128, 34, 230);
    g.font = '9px Arial'; g.textAlign = 'left'; g.fillText('03-' + rng.int(5000000, 6999999), x + 12, 39);
    if (signLit) { e.fillStyle = S.bg; e.fillRect(x + 6, 4, 244, 40); e.fillStyle = fg; e.textAlign = 'center'; e.textBaseline = 'middle'; e.font = 'bold 22px Arial'; e.fillText(S.he, x + 128, 18, 230); }
    // навес — выцветший, с рваным краем
    if (rng() < 0.65) {
      const col = rng.pick(['#c62828', '#1565c0', '#2e7d32', '#ef6c00', '#6a1b9a']);
      for (let k = 0; k < 12; k++) { g.fillStyle = k % 2 ? '#f2efe6' : col; g.fillRect(x + 6 + k * 20.3, 44, 20.3, 14); }
      g.fillStyle = 'rgba(255,255,255,0.2)'; g.fillRect(x + 6, 44, 244, 14);
      g.fillStyle = 'rgba(0,0,0,0.25)';
      for (let k = 0; k < 24; k++) g.fillRect(x + 6 + k * 10.2, 57, 6, rng.range(1, 5));
    }
    // витрина: тёмный интерьер, товары, грязное стекло
    const wy = 60, wh = 96;
    const gr = g.createLinearGradient(0, wy, 0, wy + wh);
    gr.addColorStop(0, '#2c3a44'); gr.addColorStop(1, '#4a5a64');
    g.fillStyle = gr; g.fillRect(x + 10, wy, 236, wh);
    e.fillStyle = rng() < 0.5 ? '#ffe2a8' : '#d7ecff'; e.fillRect(x + 10, wy, 236, wh);
    this.goods(g, x, wy, S.t, rng);
    // дверь из алюминия
    g.strokeStyle = '#b0b7bb'; g.lineWidth = 4; g.strokeRect(x + 180, wy + 4, 56, wh - 4);
    g.strokeRect(x + 10, wy, 236, wh);
    // грязь на стекле, наклейки, объявления
    Tex.blotches(g, 0, 0, 0, 'rgba(0,0,0,0)', 1, 2, rng);
    for (let k = 0; k < 6; k++) { const bx = x + rng.range(14, 230), by = wy + rng.range(4, wh - 10); const r = rng.range(10, 30); const bg2 = g.createRadialGradient(bx, by, 0, bx, by, r); bg2.addColorStop(0, 'rgba(150,130,100,0.28)'); bg2.addColorStop(1, 'rgba(150,130,100,0)'); g.fillStyle = bg2; g.fillRect(bx - r, by - r, r * 2, r * 2); }
    g.fillStyle = 'rgba(255,255,255,0.18)'; g.beginPath(); g.moveTo(x + 30, wy); g.lineTo(x + 60, wy); g.lineTo(x + 30, wy + wh); g.lineTo(x + 14, wy + wh); g.fill();
    for (let k = 0; k < rng.int(2, 6); k++) { g.fillStyle = rng.pick(['#ffeb3b', '#e91e63', '#4caf50', '#ffffff', '#03a9f4']); g.fillRect(x + rng.range(14, 170), wy + rng.range(4, 30), rng.range(8, 16), rng.range(6, 12)); }
    if (rng() < 0.6) {
      g.fillStyle = '#fffde7'; g.fillRect(x + 20, wy + 50, 46, 30);
      g.fillStyle = '#d32f2f'; g.font = 'bold 13px Arial'; g.textAlign = 'center'; g.fillText(rng.pick(['מבצע!', '1+1', 'הנחה', 'Скидка']), x + 43, wy + 62);
      g.font = '9px Arial'; g.fillStyle = '#333'; g.fillText('₪' + rng.int(5, 49) + '.90', x + 43, wy + 74);
    }
  },

  // Что лежит и стоит в витрине и у входа
  goods(g, x, wy, t, rng) {
    const shelf = (cols) => { for (let r = 0; r < 3; r++) for (let k = 0; k < 9; k++) { g.fillStyle = rng.pick(cols); g.fillRect(x + 18 + k * 18, wy + 12 + r * 26, 12, 16); } };
    switch (t) {
      case 'makolet': case 'gastro': {
        shelf(t === 'gastro' ? ['#a1887f', '#d84315', '#fff59d', '#8d6e63', '#c62828'] : ['#e53935', '#fdd835', '#1e88e5', '#43a047', '#ff9800', '#ffffff']);
        if (t === 'gastro') for (let k = 0; k < 5; k++) { g.fillStyle = '#8d3a2a'; g.fillRect(x + 30 + k * 26, wy + 2, 6, 26); }
        // ящики бутылок у входа и морозилка с мороженым
        for (let k = 0; k < 4; k++) { g.fillStyle = rng.pick(['#1565c0', '#2e7d32', '#c62828']); g.fillRect(x + 196 + (k % 2) * 26, wy + 52 + Math.floor(k / 2) * 22, 24, 20); g.fillStyle = 'rgba(255,255,255,0.4)'; g.fillRect(x + 198 + (k % 2) * 26, wy + 54 + Math.floor(k / 2) * 22, 20, 4); }
        g.fillStyle = '#f5f5f5'; g.fillRect(x + 12, wy + 66, 60, 30); g.fillStyle = '#4fc3f7'; g.fillRect(x + 16, wy + 70, 52, 8);
        break;
      }
      case 'pitz': {
        for (let k = 0; k < 40; k++) { g.fillStyle = rng.pick(['#ff5722', '#ffeb3b', '#8bc34a', '#e91e63', '#03a9f4', '#9c27b0']); g.fillRect(x + 16 + rng.range(0, 150), wy + 8 + rng.range(0, 60), 10, 14); }
        g.strokeStyle = '#ff4081'; g.lineWidth = 3; g.strokeRect(x + 120, wy + 8, 50, 20);
        g.fillStyle = '#ff4081'; g.font = 'bold 13px Arial'; g.textAlign = 'center'; g.fillText('OPEN', x + 145, wy + 22);
        break;
      }
      case 'shawarma': {
        // вертел и меню с ценами
        g.fillStyle = '#8d5524'; g.beginPath(); g.moveTo(x + 60, wy + 10); g.lineTo(x + 80, wy + 10); g.lineTo(x + 74, wy + 80); g.lineTo(x + 66, wy + 80); g.closePath(); g.fill();
        g.fillStyle = 'rgba(255,140,0,0.4)'; g.fillRect(x + 82, wy + 10, 6, 70);
        g.fillStyle = '#1b1b1b'; g.fillRect(x + 100, wy + 8, 70, 60);
        g.fillStyle = '#fff'; g.font = '10px Arial'; g.textAlign = 'right';
        ['שווארמה בפיתה ₪25', 'בלאפה ₪29', 'צ׳יפס ₪12', 'שתייה ₪8'].forEach((l, i) => g.fillText(l, x + 166, wy + 22 + i * 13));
        break;
      }
      case 'falafel': case 'hummus': {
        for (let k = 0; k < 8; k++) { g.fillStyle = rng.pick(['#e53935', '#43a047', '#fdd835', '#8d6e63', '#ff7043', '#c5e1a5']); g.fillRect(x + 18 + k * 20, wy + 60, 16, 12); }
        g.fillStyle = '#795548'; g.fillRect(x + 14, wy + 72, 160, 6);
        for (let k = 0; k < 3; k++) { g.fillStyle = '#e0e0e0'; g.fillRect(x + 24 + k * 50, wy + 82, 18, 14); } // пластиковые стулья
        break;
      }
      case 'barber': {
        g.fillStyle = '#90a4ae'; g.fillRect(x + 20, wy + 10, 70, 46); g.fillStyle = 'rgba(255,255,255,0.3)'; g.fillRect(x + 24, wy + 14, 20, 38);
        g.fillStyle = '#212121'; g.fillRect(x + 40, wy + 56, 30, 30);
        // полосатый столб
        for (let k = 0; k < 8; k++) { g.fillStyle = ['#e53935', '#ffffff', '#1e88e5', '#ffffff'][k % 4]; g.fillRect(x + 160, wy + 8 + k * 9, 10, 9); }
        break;
      }
      case 'cell': {
        for (let k = 0; k < 6; k++) { g.fillStyle = '#111'; g.fillRect(x + 20 + k * 25, wy + 14, 18, 32); g.fillStyle = rng.pick(['#42a5f5', '#ab47bc', '#26a69a']); g.fillRect(x + 22 + k * 25, wy + 17, 14, 24); }
        g.fillStyle = '#ffeb3b'; g.fillRect(x + 20, wy + 56, 120, 18); g.fillStyle = '#c62828'; g.font = 'bold 11px Arial'; g.textAlign = 'center'; g.fillText('כיסויים מ-₪20', x + 80, wy + 69);
        break;
      }
      case 'laundry': {
        for (let k = 0; k < 4; k++) { g.fillStyle = '#eceff1'; g.fillRect(x + 18 + k * 40, wy + 30, 34, 40); g.fillStyle = '#546e7a'; g.beginPath(); g.arc(x + 35 + k * 40, wy + 50, 12, 0, TAU); g.fill(); g.fillStyle = 'rgba(144,202,249,0.6)'; g.beginPath(); g.arc(x + 35 + k * 40, wy + 50, 9, 0, TAU); g.fill(); }
        break;
      }
      case 'change': {
        g.fillStyle = '#111'; g.fillRect(x + 20, wy + 10, 140, 50);
        g.fillStyle = '#ff6d00'; g.font = '11px monospace'; g.textAlign = 'left';
        ['USD 3.71  3.79', 'EUR 4.02  4.11', 'RUB 0.040 0.046'].forEach((l, i) => g.fillText(l, x + 26, wy + 24 + i * 14));
        break;
      }
      case 'flowers': {
        for (let k = 0; k < 7; k++) { g.fillStyle = '#607d8b'; g.fillRect(x + 16 + k * 24, wy + 70, 18, 22); for (let j = 0; j < 6; j++) { g.fillStyle = rng.pick(['#e91e63', '#ffeb3b', '#ff5722', '#ffffff', '#9c27b0']); g.beginPath(); g.arc(x + 25 + k * 24 + rng.range(-8, 8), wy + 62 + rng.range(-8, 8), 5, 0, TAU); g.fill(); } }
        break;
      }
      case 'keys': {
        g.fillStyle = '#ffca28'; g.beginPath(); g.arc(x + 60, wy + 30, 14, 0, TAU); g.fill(); g.fillRect(x + 70, wy + 26, 50, 8); g.fillRect(x + 108, wy + 34, 6, 10); g.fillRect(x + 96, wy + 34, 6, 8);
        for (let k = 0; k < 20; k++) { g.fillStyle = '#9e9e9e'; g.fillRect(x + 20 + (k % 10) * 15, wy + 56 + Math.floor(k / 10) * 14, 6, 10); }
        break;
      }
      case 'shoes': { for (let k = 0; k < 8; k++) { g.fillStyle = rng.pick(['#3e2723', '#5d4037', '#212121', '#8d6e63']); g.fillRect(x + 18 + k * 20, wy + 60, 16, 10); } break; }
      case 'pharm': {
        g.fillStyle = '#43a047'; g.fillRect(x + 50, wy + 14, 12, 36); g.fillRect(x + 38, wy + 26, 36, 12);
        shelf(['#ffffff', '#e3f2fd', '#fce4ec', '#e8f5e9']);
        break;
      }
    }
  },

  // Дом на сваях (קומת עמודים): тень, колонны, скутеры, велосипеды, почтовые ящики
  pilotis() {
    if (this.cache.pil) return this.cache.pil;
    const S = 4, W = FACADE_W * S, H = FLOOR_H * S;
    const c = this.canvas(W, H), em = this.canvas(W, H);
    const g = c.getContext('2d'), e = em.getContext('2d');
    e.fillStyle = '#000'; e.fillRect(0, 0, W, H);
    const rng = makeRng(4242);
    const gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, '#1e1f22'); gr.addColorStop(1, '#3a3b3f');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // скутеры и велосипеды в тени
    for (let k = 0; k < 6; k++) {
      const x = rng.range(60, W - 80), y = H - 22;
      if (rng() < 0.6) { g.fillStyle = rng.pick(['#e53935', '#fafafa', '#1e88e5', '#ff6a1a', '#424242']); g.fillRect(x, y - 30, 56, 22); g.fillStyle = '#111'; g.beginPath(); g.arc(x + 8, y, 10, 0, TAU); g.arc(x + 48, y, 10, 0, TAU); g.fill(); }
      else { g.strokeStyle = '#9e9e9e'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 12, 0, TAU); g.moveTo(x + 44, y); g.arc(x + 32, y, 12, 0, TAU); g.moveTo(x, y); g.lineTo(x + 16, y - 20); g.lineTo(x + 32, y); g.stroke(); }
    }
    // почтовые ящики и лампа у входа
    g.fillStyle = '#b0a58a'; g.fillRect(W * 0.45, 40, 80, 50);
    g.strokeStyle = '#6d6252'; g.lineWidth = 2; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) g.strokeRect(W * 0.45 + i * 20, 40 + j * 16, 20, 16);
    e.fillStyle = '#ffcf7a'; e.beginPath(); e.arc(W * 0.42, 24, 10, 0, TAU); e.fill();
    g.fillStyle = '#fff3c4'; g.beginPath(); g.arc(W * 0.42, 24, 6, 0, TAU); g.fill();
    // колонны
    for (let x = 0; x < W; x += 256) {
      g.fillStyle = '#e9e5dc'; g.fillRect(x + 10, 0, 34, H);
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(x + 34, 0, 10, H);
      this.drip(g, x + 14, 0, 26, 50, rng);
    }
    g.fillStyle = '#e9e5dc'; g.fillRect(0, 0, W, 10);
    const res = { map: c, emissive: em };
    this.cache.pil = res;
    return res;
  },

  // Крона пальмы (вид сверху, с прозрачностью)
  palm() {
    if (this.cache.palm) return this.cache.palm;
    const c = this.canvas(256, 256), g = c.getContext('2d');
    g.translate(128, 128);
    for (let i = 0; i < 11; i++) {
      g.rotate(TAU / 11);
      const gr = g.createLinearGradient(0, 0, 120, 0);
      gr.addColorStop(0, '#1f6b2c'); gr.addColorStop(1, i % 2 ? '#4caf50' : '#3a9a45');
      g.fillStyle = gr;
      g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(50, -34, 122, -6); g.quadraticCurveTo(50, 14, 0, 0); g.fill();
      g.strokeStyle = 'rgba(15,60,20,0.7)'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(50, -12, 118, -6); g.stroke();
      g.strokeStyle = 'rgba(20,80,25,0.5)'; g.lineWidth = 1;
      for (let k = 20; k < 110; k += 8) { g.beginPath(); g.moveTo(k, -4 - k * 0.04); g.lineTo(k + 6, -16 + k * 0.05); g.moveTo(k, -2); g.lineTo(k + 6, 8 - k * 0.03); g.stroke(); }
    }
    g.fillStyle = '#e07b1a'; for (let i = 0; i < 8; i++) { g.beginPath(); g.arc(Math.cos(i) * 14, Math.sin(i) * 14, 5, 0, TAU); g.fill(); }
    g.fillStyle = '#6b4f2a'; g.beginPath(); g.arc(0, 0, 10, 0, TAU); g.fill();
    this.cache.palm = c;
    return c;
  },

  // Крона фикуса / лиственного дерева
  tree(variant) {
    const key = 'tree' + variant;
    if (this.cache[key]) return this.cache[key];
    const c = this.canvas(256, 256), g = c.getContext('2d');
    const rng = makeRng(300 + variant);
    const cols = variant % 2 ? ['#2f6b2a', '#3d8a35', '#4f9e3f', '#2a5c25'] : ['#3a7a32', '#4c9440', '#5fae4c', '#326a2b'];
    for (let i = 0; i < 70; i++) {
      const a = rng() * TAU, r = Math.sqrt(rng()) * 92;
      g.fillStyle = rng.pick(cols);
      g.beginPath(); g.arc(128 + Math.cos(a) * r, 128 + Math.sin(a) * r, rng.range(16, 30), 0, TAU); g.fill();
    }
    for (let i = 0; i < 40; i++) {
      const a = rng() * TAU, r = Math.sqrt(rng()) * 80;
      g.fillStyle = 'rgba(200,240,150,0.25)';
      g.beginPath(); g.arc(128 + Math.cos(a) * r - 6, 128 + Math.sin(a) * r - 6, rng.range(4, 9), 0, TAU); g.fill();
    }
    this.cache[key] = c;
    return c;
  },

  bougainvillea() {
    if (this.cache.boug) return this.cache.boug;
    const c = this.canvas(128, 128), g = c.getContext('2d');
    const rng = makeRng(77);
    g.fillStyle = '#3f7d3a'; g.beginPath(); g.arc(64, 64, 50, 0, TAU); g.fill();
    for (let i = 0; i < 60; i++) {
      const a = rng() * TAU, r = Math.sqrt(rng()) * 48;
      g.fillStyle = rng.pick(['#d81b8c', '#f06292', '#c2185b', '#ff80ab']);
      g.beginPath(); g.arc(64 + Math.cos(a) * r, 64 + Math.sin(a) * r, rng.range(4, 8), 0, TAU); g.fill();
    }
    this.cache.boug = c;
    return c;
  },

  awning(variant) {
    const key = 'awn' + variant;
    if (this.cache[key]) return this.cache[key];
    const c = this.canvas(128, 112), g = c.getContext('2d');
    const col = ['#1e88e5', '#ef6c00', '#2e7d32', '#c62828'][variant % 4];
    for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#fafafa' : col; g.fillRect(i * 16, 0, 16, 112); }
    g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(0, 54, 128, 4);
    this.cache[key] = c;
    return c;
  },

  flag() {
    if (this.cache.flag) return this.cache.flag;
    const c = this.canvas(96, 64), g = c.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, 96, 64);
    g.fillStyle = '#1946b4'; g.fillRect(0, 6, 96, 9); g.fillRect(0, 49, 96, 9);
    g.strokeStyle = '#1946b4'; g.lineWidth = 3;
    const tri = (rot) => { g.beginPath(); for (let i = 0; i < 3; i++) { const a = rot + i * TAU / 3; g.lineTo(48 + Math.cos(a) * 13, 32 + Math.sin(a) * 13); } g.closePath(); g.stroke(); };
    tri(-Math.PI / 2); tri(Math.PI / 2);
    this.cache.flag = c;
    return c;
  },

  // Мягкое круглое пятно — для свечения фонарей, фар, частиц
  glow(color) {
    const key = 'glow' + color;
    if (this.cache[key]) return this.cache[key];
    const c = this.canvas(128, 128), g = c.getContext('2d');
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, color); gr.addColorStop(0.4, color.replace(/[\d.]+\)$/, '0.45)')); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    this.cache[key] = c;
    return c;
  },

  // Конус фар (смотрит вверх по холсту)
  // Свет фар на асфальте (вид сверху, машина внизу текстуры): два мягких
  // конуса с размытыми краями, которые дальше сливаются в общее пятно, и
  // яркие пятна у самих фар. Считается по пикселям — без резких граней
  headlights() {
    if (this.cache.head) return this.cache.head;
    const W = 128, H = 256, c = this.canvas(W, H), g = c.getContext('2d');
    const img = g.createImageData(W, H), d = img.data;
    const lamps = [W * 0.34, W * 0.66];
    for (let y = 0; y < H; y++) {
      const v = (H - y) / H; // 0 — у машины, 1 — дальний край
      for (let x = 0; x < W; x++) {
        let a = 0;
        for (const lx of lamps) {
          const dx = (x - lx) / W, dist = Math.hypot(dx, v);
          const ang = Math.atan2(Math.abs(dx), v + 0.05);
          const cone = Math.exp(-Math.pow(ang / 0.42, 2)); // мягкий край конуса
          const fall = Math.pow(1 - Math.min(1, dist / 1.05), 1.6); // гаснет к дальнему краю
          const hot = Math.exp(-Math.pow(dist / 0.12, 2)) * 0.6; // пятно у фары
          a += cone * fall * 0.75 + hot;
        }
        // общая рассеянная засветка перед машиной
        const ex = (x / W - 0.5) / 0.55, ey = (v - 0.25) / 0.45;
        a += Math.exp(-(ex * ex + ey * ey)) * 0.18 * (1 - v);
        // к краям текстуры свет гаснет до нуля — не видно прямоугольника
        const ux = x / (W - 1), ew = Math.min(1, ux / 0.22, (1 - ux) / 0.22), ef = Math.min(1, (1 - v) / 0.15);
        a = Math.min(1, a) * ew * ew * (3 - 2 * ew) * ef;
        const i = (y * W + x) * 4;
        d[i] = 255; d[i + 1] = 238; d[i + 2] = 200; d[i + 3] = Math.round(a * 255);
      }
    }
    g.putImageData(img, 0, 0);
    this.cache.head = c;
    return c;
  },

  water() {
    if (this.cache.water) return this.cache.water;
    const c = this.canvas(256, 256), g = c.getContext('2d');
    const rng = makeRng(5);
    g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 2;
    for (let i = 0; i < 40; i++) { const x = rng() * 256, y = rng() * 256; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 8, y - 4, x + 18, y); g.stroke(); }
    this.cache.water = c;
    return c;
  },
};
