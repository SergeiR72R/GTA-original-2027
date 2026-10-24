// Загрузка спрайтов и звуков. Всё грузится через <img>/<audio>,
// поэтому игра работает даже при открытии index.html прямо с диска.
'use strict';

// Список генерируемых картинок (GEN_FILES) — в js/asset-manifest.js

const Assets = {
  img: {},
  snd: {},
  gen: {},
  genCount: 0,
  total: 0,
  loaded: 0,

  imageList() {
    const list = {};
    for (const o of ['tree_large', 'tree_small', 'tent_blue', 'tent_red', 'weapon_gun', 'weapon_machine']) {
      list[o] = `assets/objects/${o}.png`;
    }
    return list;
  },

  // Звуки: Kenney (CC0) и две записи с OpenGameArt (CC0) — см. assets/sounds/CREDITS.txt.
  // Ключи с цифрой на конце — варианты одного звука: Sound.play('crash') берёт случайный.
  soundList() {
    const S = 'assets/sounds/';
    return {
      crash0: S + 'impactMetal_heavy_000.ogg', crash1: S + 'impactMetal_heavy_001.ogg', crash2: S + 'impactMetal_heavy_002.ogg',
      crash3: S + 'impactMetal_heavy_003.ogg', crash4: S + 'impactMetal_heavy_004.ogg',
      punch0: S + 'impactPunch_medium_000.ogg', punch1: S + 'impactPunch_heavy_000.ogg', punch2: S + 'impactPunch_heavy_001.ogg',
      splat: S + 'impactSoft_heavy_000.ogg',
      fall: S + 'impactSoft_medium_000.ogg',
      glass: S + 'impactGlass_heavy_000.ogg',
      glassL: S + 'impactGlass_light_000.ogg',
      glassM: S + 'impactGlass_medium_000.ogg',
      hitCar0: S + 'impactMetal_light_000.ogg', hitCar1: S + 'impactMetal_light_001.ogg', hitCar2: S + 'impactMetal_light_002.ogg',
      hitWall0: S + 'impactGeneric_light_000.ogg', hitWall1: S + 'impactGeneric_light_001.ogg', hitWall2: S + 'impactGeneric_light_002.ogg',
      bounce: S + 'impactPlate_light_000.ogg',
      step0: S + 'footstep_concrete_000.ogg', step1: S + 'footstep_concrete_001.ogg', step2: S + 'footstep_concrete_002.ogg', step3: S + 'footstep_concrete_003.ogg',
      grass0: S + 'footstep_grass_000.ogg', grass1: S + 'footstep_grass_001.ogg',
      doorOpen: S + 'doorOpen_1.ogg',
      doorClose0: S + 'doorClose_1.ogg', doorClose1: S + 'doorClose_2.ogg',
      coins0: S + 'handleCoins.ogg', coins1: S + 'handleCoins2.ogg',
      click: S + 'metalClick.ogg',
      latch: S + 'metalLatch.ogg',
      belt: S + 'beltHandle1.ogg',
      ui: S + 'click3.ogg',
      uiSel: S + 'switch7.ogg',
      jWin: S + 'jingles_SAX02.ogg',
      jJob: S + 'jingles_STEEL02.ogg',
      jFail: S + 'jingles_SAX01.ogg',
      jDown: S + 'jingles_STEEL01.ogg',
      ambWaves: S + 'amb_waves.ogg',
      ambCrickets: S + 'amb_crickets.ogg',
      mission: S + 'confirmation_004.ogg',
      pickup: S + 'confirmation_001.ogg',
      fail: S + 'error_004.ogg',
      door: S + 'drop_002.ogg',
      phone: S + 'maximize_006.ogg',
      weapon: S + 'switch_002.ogg',
    };
  },

  load(onProgress) {
    const imgs = this.imageList();
    const snds = this.soundList();
    const keys = Object.keys(imgs);
    this.total = keys.length + Object.keys(snds).length;
    const tick = () => { this.loaded++; onProgress && onProgress(this.loaded / this.total); };

    const imgPromises = keys.map((k) => new Promise((res) => {
      const im = new Image();
      im.onload = () => { tick(); res(); };
      im.onerror = () => { console.warn('Не удалось загрузить', imgs[k]); tick(); res(); };
      im.src = imgs[k];
      this.img[k] = im;
    }));

    // Звуки не блокируют старт: если браузер не умеет ogg — просто будет тише.
    const sndPromises = Object.entries(snds).map(([k, src]) => new Promise((res) => {
      const a = new Audio();
      let done = false;
      const fin = () => { if (!done) { done = true; tick(); res(); } };
      a.addEventListener('canplaythrough', fin, { once: true });
      a.addEventListener('error', fin, { once: true });
      setTimeout(fin, 2500);
      a.preload = 'auto';
      a.src = src;
      this.snd[k] = a;
    }));

    // Сгенерированные картинки: отсутствующие файлы просто пропускаются
    const genPromises = [];
    for (const cat in GEN_FILES) {
      for (const name of GEN_FILES[cat]) {
        genPromises.push(new Promise((res) => {
          const im = new Image();
          im.onload = () => { this.gen[cat + '/' + name] = this.prepare(im, cat); this.genCount++; res(); };
          im.onerror = () => res();
          // bundle.js из импортёра — те же картинки как data-URL: так они работают и в 3D при запуске с диска
          const b = window.GEN_BUNDLE && window.GEN_BUNDLE[cat + '/' + name];
          im.src = b || `assets/gen/${cat}/${name}.png`;
        }));
      }
    }

    return Promise.all(imgPromises.concat(sndPromises, genPromises));
  },

  // Убираем однотонный фон (хромакей по цвету углов), обрезаем пустые края,
  // машины разворачиваем носом вверх. Работает при запуске через start.sh;
  // при открытии файла с диска браузер запрещает читать пиксели — тогда
  // картинка используется как есть (нужен прозрачный фон).
  prepare(im, cat) {
    if (cat === 'textures' || cat === 'facades' || cat === 'portraits') return im;
    const c = document.createElement('canvas');
    const maxS = 512;
    const k = Math.min(1, maxS / Math.max(im.width, im.height));
    c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
    const g = c.getContext('2d');
    g.drawImage(im, 0, 0, c.width, c.height);
    let data;
    try { data = g.getImageData(0, 0, c.width, c.height); } catch (e) { return c; }
    const d = data.data, W = c.width, H = c.height;
    // цвет фона — по четырём углам
    const corners = [0, (W - 1) * 4, (H - 1) * W * 4, ((H - 1) * W + W - 1) * 4];
    let br = 0, bg = 0, bb = 0, ba = 0;
    for (const i of corners) { br += d[i]; bg += d[i + 1]; bb += d[i + 2]; ba += d[i + 3]; }
    br /= 4; bg /= 4; bb /= 4; ba /= 4;
    if (ba > 200) {
      for (let i = 0; i < d.length; i += 4) {
        const dd = Math.abs(d[i] - br) + Math.abs(d[i + 1] - bg) + Math.abs(d[i + 2] - bb);
        if (dd < 70) d[i + 3] = 0;
        else if (dd < 140) {
          d[i + 3] = Math.round(d[i + 3] * (dd - 70) / 70);
          // убираем ореол цвета фона
          if (bg > br && bg > bb) d[i + 1] = Math.min(d[i + 1], (d[i] + d[i + 2]) / 2);
          if (br > 150 && bb > 150 && bg < 100) { d[i] = Math.min(d[i], d[i + 1] + 40); d[i + 2] = Math.min(d[i + 2], d[i + 1] + 40); }
        }
      }
    }
    // обрезка по непрозрачным пикселям
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (d[(y * W + x) * 4 + 3] > 30) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    g.putImageData(data, 0, 0);
    if (x1 < 0) return c;
    let out = document.createElement('canvas');
    out.width = x1 - x0 + 1; out.height = y1 - y0 + 1;
    out.getContext('2d').drawImage(c, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
    if (cat === 'vehicles' && out.width > out.height * 1.15) {
      // машина нарисована боком (носом вправо) — разворачиваем носом вверх
      const r = document.createElement('canvas');
      r.width = out.height; r.height = out.width;
      const rg = r.getContext('2d');
      rg.translate(r.width / 2, r.height / 2); rg.rotate(-Math.PI / 2);
      rg.drawImage(out, -out.width / 2, -out.height / 2);
      out = r;
    }
    return out;
  },
};
