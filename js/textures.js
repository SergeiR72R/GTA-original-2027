// Процедурные текстуры: асфальт, израильская плитка, иерусалимский камень,
// песок, трава, доски, крыши. Генерируются один раз при старте.
'use strict';

const Tex = {
  make(w, h, fn) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    fn(c.getContext('2d'), w, h);
    return c;
  },

  noise(g, w, h, n, cols, smin, smax, rng) {
    for (let i = 0; i < n; i++) {
      g.fillStyle = rng.pick(cols);
      const s = rng.range(smin, smax);
      g.fillRect(rng() * w, rng() * h, s, s);
    }
  },

  blotches(g, w, h, n, col, rmin, rmax, rng) {
    for (let i = 0; i < n; i++) {
      const x = rng() * w, y = rng() * h, r = rng.range(rmin, rmax);
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, col);
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
  },

  init() {
    const rng = makeRng(777);
    // Асфальт: зерно, пятна, заплатки
    this.asphalt = this.make(256, 256, (g, w, h) => {
      g.fillStyle = '#3c3d42'; g.fillRect(0, 0, w, h);
      this.blotches(g, w, h, 30, 'rgba(0,0,0,0.10)', 10, 40, rng);
      this.blotches(g, w, h, 20, 'rgba(255,255,255,0.04)', 10, 30, rng);
      this.noise(g, w, h, 5000, ['rgba(255,255,255,0.07)', 'rgba(0,0,0,0.15)', 'rgba(120,110,100,0.12)'], 1, 2, rng);
    });
    this.asphaltDark = this.make(256, 256, (g, w, h) => {
      g.drawImage(this.asphalt, 0, 0);
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(0, 0, w, h);
    });
    // Тротуар: серая плитка «кубиками» с рядами красноватых
    this.pavers = this.make(64, 64, (g) => {
      for (let y = 0; y < 64; y += 16) for (let x = 0; x < 64; x += 16) {
        const red = (y / 16) % 4 === 3;
        const v = rng.range(-8, 8);
        g.fillStyle = red ? `rgb(${178 + v},${128 + v},${112 + v})` : `rgb(${200 + v},${195 + v},${184 + v})`;
        g.fillRect(x, y, 16, 16);
        g.fillStyle = 'rgba(255,255,255,0.12)'; g.fillRect(x + 1, y + 1, 14, 2);
        g.fillStyle = 'rgba(0,0,0,0.16)'; g.fillRect(x, y + 15, 16, 1); g.fillRect(x + 15, y, 1, 16);
      }
      this.noise(g, 64, 64, 120, ['rgba(0,0,0,0.08)', 'rgba(255,255,255,0.08)'], 1, 2, rng);
    });
    // Иерусалимский камень (Яффо)
    this.jstone = this.make(64, 64, (g) => {
      g.fillStyle = '#d6b884'; g.fillRect(0, 0, 64, 64);
      for (let row = 0; row < 4; row++) {
        const off = row % 2 ? 12 : 0;
        for (let x = -24; x < 64; x += 24) {
          const v = rng.range(-14, 10);
          g.fillStyle = `rgb(${214 + v},${184 + v},${132 + v})`;
          g.fillRect(x + off + 1, row * 16 + 1, 22, 14);
        }
      }
      this.noise(g, 64, 64, 200, ['rgba(120,80,30,0.12)', 'rgba(255,255,255,0.1)'], 1, 2, rng);
    });
    // Плиты площадей
    this.slabs = this.make(64, 64, (g) => {
      for (let y = 0; y < 64; y += 32) for (let x = 0; x < 64; x += 32) {
        const v = rng.range(-8, 8);
        g.fillStyle = `rgb(${222 + v},${214 + v},${196 + v})`;
        g.fillRect(x, y, 32, 32);
        g.strokeStyle = 'rgba(0,0,0,0.1)'; g.strokeRect(x + 0.5, y + 0.5, 31, 31);
      }
      this.noise(g, 64, 64, 150, ['rgba(0,0,0,0.05)', 'rgba(255,255,255,0.1)'], 1, 2, rng);
    });
    // Песок с рябью
    this.sand = this.make(128, 128, (g, w, h) => {
      g.fillStyle = '#edd9a3'; g.fillRect(0, 0, w, h);
      this.blotches(g, w, h, 12, 'rgba(255,245,215,0.35)', 10, 30, rng);
      g.strokeStyle = 'rgba(190,160,100,0.18)'; g.lineWidth = 1.5;
      for (let i = 0; i < 14; i++) {
        const y = rng() * h, x = rng() * w;
        g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 15, y - 4, x + 30, y); g.stroke();
      }
      this.noise(g, w, h, 700, ['#dcc58c', '#f7ead0', '#cdb27a', '#e8d29a'], 1, 2, rng);
    });
    // Трава
    this.grass = this.make(128, 128, (g, w, h) => {
      g.fillStyle = '#76a447'; g.fillRect(0, 0, w, h);
      this.blotches(g, w, h, 16, 'rgba(40,80,20,0.18)', 10, 28, rng);
      this.blotches(g, w, h, 10, 'rgba(200,220,120,0.15)', 8, 20, rng);
      for (let i = 0; i < 900; i++) {
        g.strokeStyle = rng.pick(['#5f8e38', '#8cbc58', '#6a9a3f', '#99c766']);
        const x = rng() * w, y = rng() * h;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + rng.range(-2, 2), y - rng.range(2, 5)); g.stroke();
      }
    });
    this.scrub = this.make(128, 128, (g, w, h) => {
      g.fillStyle = '#5b7342'; g.fillRect(0, 0, w, h);
      this.blotches(g, w, h, 40, 'rgba(30,50,20,0.35)', 6, 16, rng);
      this.noise(g, w, h, 400, ['#4b6233', '#6f8a52', '#8a9a62'], 2, 4, rng);
    });
    // Деревянный настил порта
    this.deck = this.make(64, 64, (g) => {
      for (let y = 0; y < 64; y += 8) {
        const v = rng.range(-12, 12);
        g.fillStyle = `rgb(${168 + v},${122 + v},${80 + v})`;
        g.fillRect(0, y, 64, 8);
        g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, y + 7, 64, 1);
        g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(rng.int(4, 60), y + 3, 2, 2);
      }
    });
    // Крыши
    this.roofGravel = this.make(128, 128, (g, w, h) => {
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h);
      this.noise(g, w, h, 1500, ['rgba(0,0,0,0.07)', 'rgba(0,0,0,0.04)', 'rgba(255,255,255,0.3)'], 1, 2, rng);
      this.blotches(g, w, h, 6, 'rgba(90,80,60,0.08)', 10, 30, rng);
    });
    this.roofTiles = this.make(32, 32, (g) => {
      g.fillStyle = '#c4613e'; g.fillRect(0, 0, 32, 32);
      for (let y = 0; y < 32; y += 8) {
        g.fillStyle = 'rgba(80,20,10,0.35)'; g.fillRect(0, y + 6, 32, 2);
        for (let x = (y / 8) % 2 ? 4 : 0; x < 32; x += 8) { g.fillStyle = 'rgba(255,200,170,0.18)'; g.fillRect(x, y, 4, 6); }
      }
    });
    this.roofMetal = this.make(32, 32, (g) => {
      g.fillStyle = '#9a9d9f'; g.fillRect(0, 0, 32, 32);
      for (let x = 0; x < 32; x += 6) { g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(x, 0, 2, 32); g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(x + 3, 0, 1, 32); }
    });
    // Вода
    this.water = this.make(128, 128, (g, w, h) => {
      const gr = g.createLinearGradient(0, 0, w, h);
      gr.addColorStop(0, '#2f86b8'); gr.addColorStop(1, '#2a79aa');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
      this.blotches(g, w, h, 14, 'rgba(120,200,230,0.18)', 10, 30, rng);
      this.blotches(g, w, h, 10, 'rgba(10,50,100,0.2)', 10, 30, rng);
      g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 1.5;
      for (let i = 0; i < 18; i++) { const x = rng() * w, y = rng() * h; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 6, y - 3, x + 12, y); g.stroke(); }
    });
    this.sidewalk = this.pavers;
    this.plaza = this.slabs;
    this.patterns = {};
    this.cache = {};
  },

  // Какие файлы можно положить в assets/gen/textures и сколько клеток (64px) покрывает картинка
  GEN: {
    asphalt: ['asphalt', 4], sidewalk: ['sidewalk', 2], jstone: ['jaffa_stone', 2], plaza: ['plaza', 2],
    sand: ['sand', 4], grass: ['grass', 4], water: ['water', 4], deck: ['deck', 2], scrub: ['scrub', 4],
    roofGravel: ['roof_gravel', 0], roofTiles: ['roof_tiles', 0], roofMetal: ['roof_metal', 0],
  },

  // Текстура для клеток: сначала сгенерированная, иначе процедурная
  get(name) {
    let t = this.cache[name];
    if (t) return t;
    if (name === 'asphaltDark') {
      const base = this.get('asphalt');
      t = this.make(base.width, base.height, (g, w, h) => { g.drawImage(base, 0, 0); g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(0, 0, w, h); });
      t.span = base.span;
    } else {
      const gen = this.GEN[name] && Assets.gen['textures/' + this.GEN[name][0]];
      if (gen) { t = gen; t.span = this.GEN[name][1] || 4; }
      else { t = this[name]; t.span = Math.max(1, Math.round(t.width / 64)); }
    }
    this.cache[name] = t;
    return t;
  },

  // Шаблон для заливки крыш (кешируется)
  pattern(ctx, name) {
    let p = this.patterns[name];
    if (!p) {
      const gen = this.GEN[name] && Assets.gen['textures/' + this.GEN[name][0]];
      p = ctx.createPattern(gen || this[name], 'repeat');
      if (gen && p.setTransform) p.setTransform(new DOMMatrix().scale(128 / gen.width));
      this.patterns[name] = p;
    }
    return p;
  },
};
