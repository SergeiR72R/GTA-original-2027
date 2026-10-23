// Загрузка спрайтов и звуков. Всё грузится через <img>/<audio>,
// поэтому игра работает даже при открытии index.html прямо с диска.
'use strict';

const Assets = {
  img: {},
  snd: {},
  total: 0,
  loaded: 0,

  imageList() {
    const list = {};
    for (const c of ['black', 'blue', 'green', 'red', 'yellow']) {
      for (let n = 1; n <= 5; n++) list[`car_${c}_${n}`] = `assets/cars/car_${c}_small_${n}.png`;
      list[`moto_${c}`] = `assets/cars/motorcycle_${c}.png`;
    }
    list.car_red_big = 'assets/cars/car_red_1.png';
    list.car_black_big = 'assets/cars/car_black_1.png';
    for (const p of ['hitman1', 'manBlue', 'manBrown', 'manOld', 'soldier1', 'survivor1', 'womanGreen']) {
      for (const s of ['stand', 'gun', 'machine', 'hold']) list[`${p}_${s}`] = `assets/chars/${p}_${s}.png`;
    }
    for (const o of ['tree_large', 'tree_small', 'tent_blue', 'tent_red', 'tent_blue_large', 'tent_red_large',
      'barrel_red', 'barrel_blue', 'cone_straight', 'barrier_white', 'oil', 'skidmark_short_1',
      'skidmark_short_2', 'rock1', 'weapon_gun', 'weapon_machine']) {
      list[o] = `assets/objects/${o}.png`;
    }
    return list;
  },

  soundList() {
    return {
      crash0: 'assets/sounds/impactMetal_heavy_000.ogg',
      crash1: 'assets/sounds/impactMetal_heavy_001.ogg',
      crash2: 'assets/sounds/impactMetal_heavy_002.ogg',
      punch: 'assets/sounds/impactPunch_medium_000.ogg',
      splat: 'assets/sounds/impactSoft_heavy_000.ogg',
      glass: 'assets/sounds/impactGlass_heavy_000.ogg',
      step0: 'assets/sounds/footstep_concrete_000.ogg',
      step1: 'assets/sounds/footstep_concrete_001.ogg',
      mission: 'assets/sounds/confirmation_004.ogg',
      pickup: 'assets/sounds/confirmation_001.ogg',
      fail: 'assets/sounds/error_004.ogg',
      door: 'assets/sounds/drop_002.ogg',
      phone: 'assets/sounds/maximize_006.ogg',
      weapon: 'assets/sounds/switch_002.ogg',
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

    return Promise.all(imgPromises.concat(sndPromises));
  },
};
