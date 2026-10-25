// Логотип и экран загрузки в духе GTA V: заставки с героями (ui/loading_*)
// сменяются, пока грузится город. Логотип — готовая картинка с надписью на
// ленте (assets/brand/logo_ru|he.webp, tools/logo/make_logo.py), по языку.
// Картинки нет — остаётся текстовый логотип.
// Подключается сразу после bundle.js, чтобы заставка появилась как можно раньше.
'use strict';

const Brand = {
  arts: [],
  i: 0,
  timer: 0,

  init() {
    const B = window.GEN_BUNDLE || {};
    this.setLang();
    this.arts = Object.keys(B).filter((k) => k.startsWith('ui/loading_')).map((k) => B[k]);
    if (!this.arts.length) return;
    document.getElementById('loading').classList.add('has-art');
    this.i = Math.floor(Math.random() * this.arts.length);
    this.show(document.querySelector('#loading .art'));
    // загрузка затянулась — следующая заставка, с плавной сменой
    this.timer = setInterval(() => {
      const layers = document.querySelectorAll('#loading .art');
      const [cur, next] = layers[0].classList.contains('on') ? layers : [layers[1], layers[0]];
      this.i = (this.i + 1) % this.arts.length;
      this.show(next);
      cur.classList.remove('on');
    }, 5000);
  },

  // логотип на языке игры; если картинка не загрузилась — текстовый
  setLang() {
    const src = `assets/brand/logo_${typeof I18N !== 'undefined' && I18N.he ? 'he' : 'ru'}.webp`;
    for (const el of document.querySelectorAll('.brand')) {
      const img = el.querySelector('.emblem');
      if (img.getAttribute('src') === src) continue;
      img.onload = () => el.classList.add('has-emblem');
      img.onerror = () => el.classList.remove('has-emblem');
      img.src = src;
    }
  },

  show(el) {
    el.style.backgroundImage = `url("${this.arts[this.i]}")`;
    el.classList.add('on');
  },

  // город готов: заставка держится хотя бы 3 с от начала загрузки и растворяется
  hide() {
    const el = document.getElementById('loading');
    if (!this.arts.length) { el.classList.add('hidden'); return; }
    setTimeout(() => {
      clearInterval(this.timer);
      el.classList.add('fade');
      setTimeout(() => el.classList.add('hidden'), 800);
    }, Math.max(0, 3000 - performance.now()));
  },
};

Brand.init();
