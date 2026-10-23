// Портреты героев в окне звонка: сгенерированные (assets/gen/portraits/)
// или нарисованные кодом карикатуры в комиксном стиле — большая голова,
// толстый контур, полутоновый фон.
'use strict';

// Кто как выглядит. Ключ = имя файла portrait_<ключ>.png
const PORTRAIT_LOOKS = {
  leva: { bg: '#8ec5e8', skin: '#f1c7a5', hair: 'short', hairColor: '#8a5a32', top: 'stripes', shirt: '#f5f5f5', mouth: 'smirk', nose: 9, sunburn: true, sweat: true },
  itzik: { bg: '#f4c542', skin: '#d9a273', hair: 'bald', hairColor: '#222', top: 'apron', shirt: '#2e7d32', mouth: 'grin', goldTooth: true, mustache: 'big', brows: 'bushy', nose: 13, jaw: 1.08 },
  sema: { bg: '#a3272c', skin: '#efc6a8', hair: 'shaved', hairColor: '#6b5a4a', top: 'leather', shirt: '#1b1b1b', inner: '#7b1e2b', mouth: 'smirk', chain: true, nose: 12, jaw: 1.15, eyes: 'narrow' },
  abu: { bg: '#2c7a7b', skin: '#c48b5c', hair: 'short', hairColor: '#9e9e9e', top: 'suit', shirt: '#efe3c8', inner: '#ffffff', mouth: 'calm', beard: 'short', beardColor: '#bdbdbd', brows: 'grey', nose: 12, coffee: true },
  abeba: { bg: '#3f9b4a', skin: '#7a4a2c', hair: 'neat', hairColor: '#151515', top: 'bomber', shirt: '#6b7340', inner: '#f2c230', mouth: 'grin', beard: 'trim', beardColor: '#151515', headphones: true, nose: 9 },
  dani: { bg: '#5d7891', skin: '#d8a882', hair: 'short', hairColor: '#2b2118', top: 'polo', shirt: '#263238', mouth: 'stern', glasses: 'sun', earpiece: true, nose: 10, jaw: 1.12 },
  ali: { bg: '#1c2541', skin: '#b78763', hair: 'hood', hairColor: '#111', top: 'hoodie', shirt: '#22252b', mouth: 'smirk', shadow: true, phone: true, nose: 10 },
  ortal: { bg: '#a8c8a0', skin: '#e2b08c', hair: 'big', hairColor: '#e8c35a', top: 'blouse', shirt: '#d81b60', mouth: 'bored', glasses: 'reading', lashes: true, nose: 9, coffee: true, nails: true },
  shmulik: { bg: '#f08a3c', skin: '#e0a679', hair: 'receding', hairColor: '#3e2c22', top: 'tank', shirt: '#f5f5f5', mouth: 'grin', stubble: true, chain: true, nose: 13, jaw: 1.12, phoneEar: true },
  dvora: { bg: '#b39ddb', skin: '#efc3a2', hair: 'curly', hairColor: '#b0b0b0', top: 'blouse', shirt: '#5e35b1', scarf: '#ff7043', mouth: 'calm', glasses: 'reading', lashes: true, nose: 10, finger: true },
};

const Portraits = {
  cache: {},

  // картинка для говорящего (или null — тогда окно без портрета)
  get(key) {
    if (!key) return null;
    const gen = Assets.gen['portraits/portrait_' + key];
    if (gen) return gen;
    if (!this.cache[key] && PORTRAIT_LOOKS[key]) this.cache[key] = this.draw(PORTRAIT_LOOKS[key]);
    return this.cache[key] || null;
  },

  draw(P) {
    const S = 256;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d');
    const INK = '#141414';
    const ell = (x, y, rx, ry) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); };
    const fillStroke = (fill, w = 4) => { g.fillStyle = fill; g.fill(); g.lineWidth = w; g.strokeStyle = INK; g.stroke(); };
    g.lineJoin = g.lineCap = 'round';

    // фон с полутоновыми точками
    g.fillStyle = P.bg; g.fillRect(0, 0, S, S);
    g.fillStyle = 'rgba(0,0,0,0.13)';
    for (let y = 6; y < S; y += 11) for (let x = 6 + (y % 22 ? 5 : 0); x < S; x += 11) {
      const r = 1 + 2.4 * (x + y) / (2 * S);
      g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    }

    const hx = 128, hy = 112, rx = 60, ry = 70;
    const jaw = P.jaw || 1;

    // капюшон — за головой
    if (P.hair === 'hood') { ell(hx, hy + 8, rx + 26, ry + 26); fillStroke(P.hairColor, 5); }

    // торс
    const torso = () => { g.beginPath(); g.moveTo(14, S + 4); g.quadraticCurveTo(24, 196, 92, 184); g.lineTo(164, 184); g.quadraticCurveTo(232, 196, 242, S + 4); g.closePath(); };
    torso();
    fillStroke(P.top === 'tank' ? P.skin : P.shirt, 5);
    g.save(); torso(); g.clip();
    if (P.top === 'stripes') { g.fillStyle = '#1f3a6e'; for (let y = 196; y < S; y += 16) g.fillRect(0, y, S, 7); }
    if (P.top === 'tank') { g.fillStyle = P.shirt; g.beginPath(); g.moveTo(70, S); g.lineTo(84, 186); g.lineTo(100, 186); g.quadraticCurveTo(128, 228, 156, 186); g.lineTo(172, 186); g.lineTo(186, S); g.closePath(); g.fill(); g.lineWidth = 3; g.strokeStyle = INK; g.stroke(); }
    if (P.top === 'apron') { g.fillStyle = '#f2efe6'; g.fillRect(84, 200, 88, 70); g.strokeStyle = INK; g.lineWidth = 3; g.strokeRect(84, 200, 88, 70); g.beginPath(); g.moveTo(92, 200); g.lineTo(104, 184); g.moveTo(164, 200); g.lineTo(152, 184); g.stroke(); }
    if (P.top === 'leather' || P.top === 'suit' || P.top === 'bomber') {
      g.fillStyle = P.inner; g.beginPath(); g.moveTo(98, 184); g.lineTo(128, 250); g.lineTo(158, 184); g.closePath(); g.fill();
      g.strokeStyle = INK; g.lineWidth = 3;
      g.beginPath(); g.moveTo(98, 184); g.lineTo(118, 252); g.moveTo(158, 184); g.lineTo(138, 252); g.stroke();
      if (P.top === 'leather') { g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(40, 214, 26, 6); g.fillRect(190, 214, 26, 6); }
      if (P.top === 'bomber') { g.fillStyle = '#4b5130'; g.fillRect(92, 182, 72, 8); }
    }
    if (P.top === 'polo') { g.fillStyle = P.shirt; g.strokeStyle = '#90a4ae'; g.lineWidth = 3; g.beginPath(); g.moveTo(100, 186); g.lineTo(122, 214); g.lineTo(128, 196); g.lineTo(134, 214); g.lineTo(156, 186); g.stroke(); }
    if (P.top === 'hoodie') { g.strokeStyle = '#9e9e9e'; g.lineWidth = 3; g.beginPath(); g.moveTo(116, 192); g.lineTo(112, 236); g.moveTo(140, 192); g.lineTo(144, 236); g.stroke(); }
    g.restore();
    if (P.scarf) { g.fillStyle = P.scarf; g.beginPath(); g.moveTo(92, 180); g.quadraticCurveTo(128, 214, 164, 180); g.lineTo(168, 196); g.quadraticCurveTo(128, 232, 88, 196); g.closePath(); fillStroke(P.scarf, 3); g.beginPath(); g.moveTo(140, 206); g.lineTo(150, 250); g.lineTo(132, 250); g.closePath(); fillStroke(P.scarf, 3); }
    if (P.chain) { g.strokeStyle = '#e6b422'; g.lineWidth = 5; g.beginPath(); g.moveTo(104, 186); g.quadraticCurveTo(128, 238, 152, 186); g.stroke(); g.strokeStyle = '#8d6e14'; g.lineWidth = 1.5; g.stroke(); }
    if (P.headphones) { g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.arc(128, 178, 40, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke(); ell(90, 190, 12, 15); fillStroke('#e53935', 3); ell(166, 190, 12, 15); fillStroke('#e53935', 3); }

    // шея и уши
    g.beginPath(); g.rect(108, 160, 40, 30); fillStroke(P.skin, 4);
    ell(hx - rx * jaw + 2, hy + 6, 11, 16); fillStroke(P.skin, 4);
    ell(hx + rx * jaw - 2, hy + 6, 11, 16); fillStroke(P.skin, 4);

    // голова: широкая челюсть у «качков»
    g.beginPath();
    g.moveTo(hx - rx, hy);
    g.bezierCurveTo(hx - rx, hy - ry * 1.3, hx + rx, hy - ry * 1.3, hx + rx, hy);
    g.bezierCurveTo(hx + rx * jaw, hy + ry * 0.75, hx + rx * 0.5, hy + ry, hx, hy + ry);
    g.bezierCurveTo(hx - rx * 0.5, hy + ry, hx - rx * jaw, hy + ry * 0.75, hx - rx, hy);
    g.closePath();
    fillStroke(P.skin, 5);
    const headPath = () => { g.beginPath(); g.moveTo(hx - rx, hy); g.bezierCurveTo(hx - rx, hy - ry * 1.3, hx + rx, hy - ry * 1.3, hx + rx, hy); g.bezierCurveTo(hx + rx * jaw, hy + ry * 0.75, hx + rx * 0.5, hy + ry, hx, hy + ry); g.bezierCurveTo(hx - rx * 0.5, hy + ry, hx - rx * jaw, hy + ry * 0.75, hx - rx, hy); g.closePath(); };

    // щетина и борода
    g.save(); headPath(); g.clip();
    if (P.stubble || P.hair === 'shaved') { g.fillStyle = 'rgba(40,30,25,0.22)'; for (let i = 0; i < 260; i++) { const a = Math.random() * Math.PI * 2, r = Math.random(); const x = hx + Math.cos(a) * rx * r, y = hy + Math.sin(a) * ry * r; if ((P.hair === 'shaved' && y < hy - 30) || (P.stubble && y > hy + 30)) g.fillRect(x, y, 2, 2); } }
    if (P.beard) { g.fillStyle = P.beardColor; g.beginPath(); g.moveTo(hx - rx, hy + 10); g.quadraticCurveTo(hx - rx * 0.6, hy + ry * (P.beard === 'trim' ? 0.95 : 1.1), hx, hy + ry * (P.beard === 'trim' ? 1 : 1.15)); g.quadraticCurveTo(hx + rx * 0.6, hy + ry * (P.beard === 'trim' ? 0.95 : 1.1), hx + rx, hy + 10); g.lineTo(hx + rx * 0.7, hy + 30); g.quadraticCurveTo(hx, hy + 44, hx - rx * 0.7, hy + 30); g.closePath(); g.fill(); }
    if (P.sunburn) { g.fillStyle = 'rgba(230,80,60,0.35)'; ell(hx - 30, hy + 22, 13, 8); g.fill(); ell(hx + 30, hy + 22, 13, 8); g.fill(); }
    if (P.hair === 'bald') { g.fillStyle = 'rgba(255,255,255,0.45)'; ell(hx - 18, hy - 58, 18, 8); g.fill(); }
    g.restore();

    // волосы
    g.fillStyle = P.hairColor; g.strokeStyle = INK; g.lineWidth = 4;
    if (P.hair === 'short' || P.hair === 'neat') {
      g.beginPath(); g.moveTo(hx - rx - 2, hy - 2); g.bezierCurveTo(hx - rx - 6, hy - ry * 1.45, hx + rx + 6, hy - ry * 1.45, hx + rx + 2, hy - 2);
      g.quadraticCurveTo(hx + rx - 8, hy - 36, hx + 20, hy - 44); g.quadraticCurveTo(hx - 10, hy - 30, hx - rx + 6, hy - 30); g.closePath(); g.fill(); g.stroke();
    } else if (P.hair === 'receding') {
      g.beginPath(); g.moveTo(hx - rx - 2, hy + 4); g.quadraticCurveTo(hx - rx - 6, hy - 50, hx - 30, hy - 66); g.quadraticCurveTo(hx - 44, hy - 30, hx - rx + 10, hy - 12); g.closePath(); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(hx + rx + 2, hy + 4); g.quadraticCurveTo(hx + rx + 6, hy - 50, hx + 30, hy - 66); g.quadraticCurveTo(hx + 44, hy - 30, hx + rx - 10, hy - 12); g.closePath(); g.fill(); g.stroke();
    } else if (P.hair === 'curly' || P.hair === 'big') {
      const big = P.hair === 'big' ? 1.35 : 1;
      for (let i = 0; i < 22; i++) {
        const a = Math.PI * (1.02 + i / 21 * 0.96);
        const x = hx + Math.cos(a) * (rx + 4) * big, y = hy - 6 + Math.sin(a) * (ry + 4) * big * 0.95;
        ell(x, y, 17 * big, 17 * big); g.fill(); g.stroke();
      }
      if (big > 1) for (const s of [-1, 1]) for (let k = 0; k < 4; k++) { ell(hx + s * (rx + 18), hy + 6 + k * 18, 18, 16); g.fill(); g.stroke(); }
      g.beginPath(); ell(hx, hy - ry * 0.72, rx * 0.95 * big, 30 * big); g.fill();
    }

    // кипа / тень капюшона
    if (P.kippah) { ell(hx + 10, hy - ry + 4, 26, 10); fillStroke(P.kippah, 3); }

    // брови и глаза
    const ey = hy - 4, ex = 25;
    const browY = ey - 22;
    g.strokeStyle = P.brows === 'grey' ? '#9e9e9e' : P.hairColor === '#b0b0b0' ? '#757575' : '#2a1d14';
    g.lineWidth = P.brows === 'bushy' ? 11 : 7;
    const tilt = { stern: 6, smirk: 3, bored: -2, grin: -4, calm: -2 }[P.mouth] || 0;
    for (const s of [-1, 1]) { g.beginPath(); g.moveTo(hx + s * (ex - 16), browY + tilt + (P.mouth === 'smirk' && s > 0 ? -8 : 0)); g.lineTo(hx + s * (ex + 14), browY - 4); g.stroke(); }
    if (P.glasses === 'sun') {
      g.fillStyle = '#101010';
      for (const s of [-1, 1]) { g.beginPath(); g.roundRect(hx + s * ex - 20, ey - 12, 40, 26, 9); g.fill(); }
      g.fillRect(hx - 6, ey - 6, 12, 5);
      g.fillStyle = 'rgba(255,255,255,0.55)'; for (const s of [-1, 1]) g.fillRect(hx + s * ex - 12, ey - 7, 10, 4);
    } else {
      const open = P.eyes === 'narrow' ? 6 : P.mouth === 'bored' ? 7 : 12;
      for (const s of [-1, 1]) {
        ell(hx + s * ex, ey, 15, open); fillStroke('#fff', 3);
        g.fillStyle = INK; ell(hx + s * ex + 4, ey + (P.mouth === 'bored' ? 2 : 1), 6, Math.min(7, open - 1)); g.fill();
        if (P.mouth === 'bored') { g.fillStyle = P.skin; g.fillRect(hx + s * ex - 16, ey - open - 1, 32, open * 0.9); g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.moveTo(hx + s * ex - 15, ey - open * 0.1); g.lineTo(hx + s * ex + 15, ey - open * 0.1); g.stroke(); }
        if (P.lashes) { g.strokeStyle = INK; g.lineWidth = 2.5; for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(hx + s * (ex + 6 + k * 4), ey - open + 1); g.lineTo(hx + s * (ex + 10 + k * 5), ey - open - 6); g.stroke(); } }
      }
      if (P.glasses === 'reading') { g.strokeStyle = INK; g.lineWidth = 3; for (const s of [-1, 1]) { g.beginPath(); g.roundRect(hx + s * ex - 19, ey - 4, 38, 22, 8); g.stroke(); } g.beginPath(); g.moveTo(hx - 6, ey + 4); g.lineTo(hx + 6, ey + 4); g.stroke(); }
    }

    // нос — главная карикатурная деталь
    const nr = (P.nose || 10) * 1.3;
    g.beginPath(); g.moveTo(hx - 2, ey + 4); g.quadraticCurveTo(hx + nr * 0.8, ey + 16, hx + nr * 0.6, ey + 22 + nr);
    ell(hx + 3, ey + 24 + nr * 0.6, nr, nr * 0.8); fillStroke(P.sunburn ? '#ec9a82' : P.skin, 3.5);

    // рот
    const my = hy + 42;
    g.strokeStyle = INK; g.lineWidth = 4;
    if (P.mustache) { g.fillStyle = '#1a1a1a'; g.beginPath(); g.moveTo(hx - 34, my + 2); g.quadraticCurveTo(hx - 20, my - 18, hx, my - 10); g.quadraticCurveTo(hx + 20, my - 18, hx + 34, my + 2); g.quadraticCurveTo(hx + 18, my - 2, hx, my - 2); g.quadraticCurveTo(hx - 18, my - 2, hx - 34, my + 2); g.fill(); }
    if (P.mouth === 'grin') {
      g.beginPath(); g.moveTo(hx - 26, my); g.quadraticCurveTo(hx, my + 26, hx + 26, my); g.closePath(); fillStroke('#fff', 4);
      g.lineWidth = 1.5; g.beginPath(); g.moveTo(hx - 24, my + 4); g.lineTo(hx + 24, my + 4); g.stroke();
      if (P.goldTooth) { g.fillStyle = '#ffc107'; g.fillRect(hx + 6, my + 1, 8, 7); }
    } else if (P.mouth === 'smirk') {
      g.beginPath(); g.moveTo(hx - 18, my + 6); g.quadraticCurveTo(hx + 6, my + 12, hx + 22, my - 2); g.stroke();
    } else if (P.mouth === 'calm') {
      g.beginPath(); g.moveTo(hx - 16, my + 4); g.quadraticCurveTo(hx, my + 12, hx + 16, my + 4); g.stroke();
    } else if (P.mouth === 'bored') {
      g.beginPath(); g.moveTo(hx - 14, my + 8); g.quadraticCurveTo(hx, my + 4, hx + 14, my + 9); g.stroke();
    } else { g.beginPath(); g.moveTo(hx - 16, my + 6); g.lineTo(hx + 16, my + 6); g.stroke(); }

    // лицо в тени капюшона, свет от телефона снизу
    if (P.shadow) {
      g.save(); headPath(); g.clip();
      const sh = g.createLinearGradient(0, hy - ry, 0, hy + ry);
      sh.addColorStop(0, 'rgba(5,8,20,0.92)'); sh.addColorStop(0.55, 'rgba(5,8,20,0.75)'); sh.addColorStop(1, 'rgba(5,8,20,0.15)');
      g.fillStyle = sh; g.fillRect(0, 0, S, S);
      g.fillStyle = 'rgba(255,255,255,0.9)'; ell(hx - ex, ey, 6, 3); g.fill(); ell(hx + ex, ey, 6, 3); g.fill();
      g.restore();
    }
    if (P.phone) {
      const gl = g.createRadialGradient(150, 236, 4, 150, 236, 70); gl.addColorStop(0, 'rgba(120,200,255,0.55)'); gl.addColorStop(1, 'rgba(120,200,255,0)');
      g.fillStyle = gl; g.fillRect(0, 150, S, 106);
      g.beginPath(); g.roundRect(134, 214, 34, 50, 6); fillStroke('#90caf9', 3);
    }

    // мелочи
    if (P.earpiece) { g.strokeStyle = '#cfd8dc'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(hx + rx * jaw + 2, hy + 10); g.bezierCurveTo(hx + rx + 16, hy + 40, hx + rx - 6, hy + 70, hx + rx + 8, hy + 92); g.stroke(); ell(hx + rx * jaw - 2, hy + 8, 5, 5); fillStroke('#eceff1', 2); }
    if (P.sweat) { g.fillStyle = '#bfe7ff'; g.beginPath(); g.moveTo(hx + 44, hy - 48); g.quadraticCurveTo(hx + 54, hy - 30, hx + 44, hy - 26); g.quadraticCurveTo(hx + 34, hy - 30, hx + 44, hy - 48); fillStroke('#bfe7ff', 2.5); }
    if (P.coffee) { g.beginPath(); g.roundRect(186, 206, 30, 36, 5); fillStroke('#fafafa', 3); g.strokeStyle = '#8d6e63'; g.lineWidth = 3; g.beginPath(); g.moveTo(194, 200); g.quadraticCurveTo(190, 190, 198, 182); g.stroke(); if (P.nails) { g.fillStyle = '#e91e63'; for (let k = 0; k < 3; k++) { ell(184 + k * 10, 214, 4, 6); g.fill(); } } }
    if (P.phoneEar) { g.beginPath(); g.roundRect(hx + rx - 2, hy - 14, 18, 40, 5); fillStroke('#37474f', 3); ell(hx + rx + 18, hy + 30, 14, 12); fillStroke(P.skin, 3); }
    if (P.finger) { g.beginPath(); g.roundRect(196, 150, 16, 50, 8); fillStroke(P.skin, 3); ell(204, 210, 18, 16); fillStroke(P.skin, 3); }
    return c;
  },
};
