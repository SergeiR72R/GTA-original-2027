// Логотип и экран загрузки в духе GTA V: заставки с героями (ui/loading_*)
// сменяются, пока грузится город; эмблема (ui/logo_emblem) — с надписью
// «ХАМСИН» на ленте (текст рисует игра). Картинок нет — остаётся текстовый логотип.
// Подключается сразу после bundle.js, чтобы заставка появилась как можно раньше.
'use strict';

const Brand = {
  arts: [],
  i: 0,
  timer: 0,

  init() {
    const B = window.GEN_BUNDLE || {};
    const emblem = B['ui/logo_emblem'];
    if (emblem) for (const el of document.querySelectorAll('.brand')) {
      el.querySelector('.emblem').src = emblem;
      el.classList.add('has-emblem');
    }
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
