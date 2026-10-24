// Процедурные машины: типы, характеристики и отрисовка спрайтов.
// Спрайт рисуется один раз в 2× разрешении и кешируется.
'use strict';

// Израильская улица: в основном белые и серебристые машины
const CAR_PALETTE = [
  ['#f4f4f2', 30], ['#c9ccd0', 20], ['#8d9298', 14], ['#1f2124', 10], ['#24365c', 6],
  ['#b3262d', 6], ['#d8cbb0', 4], ['#2f5a3c', 3], ['#6fa3c8', 3], ['#e0b52a', 2], ['#7b1f2e', 2],
];

function pickWeighted(list) {
  let sum = 0;
  for (const it of list) sum += it[1];
  let r = Math.random() * sum;
  for (const it of list) { r -= it[1]; if (r <= 0) return it[0]; }
  return list[0][0];
}

const VTYPES = {
  sedan: { name: 'Седан', w: 34, l: 66, hp: 100, max: 360, acc: 260, grip: 9, turn: 2.6 },
  hatch: { name: 'Хэтчбек', w: 32, l: 56, hp: 85, max: 340, acc: 270, grip: 9.5, turn: 2.8 },
  suv: { name: 'Джип', w: 37, l: 70, hp: 130, max: 350, acc: 250, grip: 8.5, turn: 2.4 },
  lux: { name: 'Чёрный лимузин', w: 37, l: 76, hp: 140, max: 400, acc: 290, grip: 9, turn: 2.4, color: '#141518' },
  taxi: { name: 'Такси', w: 34, l: 66, hp: 100, max: 350, acc: 260, grip: 9, turn: 2.6, color: '#f4f4f2' },
  police: { name: 'Полиция', w: 37, l: 70, hp: 170, max: 410, acc: 300, grip: 9, turn: 2.6, color: '#f6f6f6' },
  ambulance: { name: 'Скорая', w: 40, l: 86, hp: 160, max: 330, acc: 220, grip: 8, turn: 2.2, color: '#fafafa' },
  van: { name: 'Фургон', w: 38, l: 80, hp: 140, max: 300, acc: 210, grip: 8, turn: 2.2 },
  pickup: { name: 'Пикап', w: 37, l: 78, hp: 140, max: 340, acc: 250, grip: 8.5, turn: 2.3 },
  sherut: { name: 'Маршрутка-шерут', w: 40, l: 92, hp: 160, max: 300, acc: 200, grip: 8, turn: 2.1, color: '#f2c21b' },
  bus: { name: 'Автобус', w: 46, l: 150, hp: 320, max: 230, acc: 130, grip: 7, turn: 1.6, color: '#2e8b57' },
  garbage: { name: 'Мусоровоз', w: 44, l: 104, hp: 300, max: 220, acc: 130, grip: 7, turn: 1.7, color: '#4f7f3a' },
  scooter: { name: 'Скутер «Шмоне-Бис»', w: 16, l: 40, hp: 50, max: 330, acc: 320, grip: 14, turn: 3.4, moto: true, color: '#ff6a1a' },
  moto: { name: 'Мотоцикл', w: 18, l: 46, hp: 55, max: 440, acc: 350, grip: 14, turn: 3.2, moto: true },
  // только для миссий: тягач с контейнером и бочка с топливом (взрывается)
  truck: { name: 'Тягач с контейнером', w: 40, l: 120, hp: 420, max: 260, acc: 130, grip: 7, turn: 1.6, color: '#1565c0' },
  barrel: { name: 'Бочка с топливом', w: 17, l: 17, hp: 8, max: 0, acc: 0, grip: 20, turn: 0, color: '#c62828', prop: true },
};

// Масштаб как в GTA2: машина почти во всю полосу (≈0,8 клетки) и длиной ≈1,6
// клетки. Таблица выше — в «старых» единицах, пересчитываем один раз.
const CAR_SCALE = 1.55, CAR_SPEED = 1.2;
for (const t of Object.values(VTYPES)) {
  t.w = Math.min(58, Math.round(t.w * CAR_SCALE));
  t.l = Math.round(t.l * CAR_SCALE);
  t.max = Math.round(t.max * CAR_SPEED);
  t.acc = Math.round(t.acc * CAR_SPEED);
}

const GEN_VEH = {
  sedan: ['sedan_1', 'sedan_2', 'sedan_3', 'sedan_4'], hatch: ['hatch_1', 'hatch_2', 'hatch_3'], suv: ['suv_1', 'suv_2'],
  lux: ['lux'], taxi: ['taxi'], police: ['police'], ambulance: ['ambulance'], van: ['van'], pickup: ['pickup'],
  sherut: ['sherut'], bus: ['bus'], garbage: ['garbage'], scooter: ['scooter'], moto: ['moto'],
  truck: ['truck'], barrel: ['barrel'],
};

// Типы без своих картинок берут похожую готовую и переделывают её кодом:
// 'картинка#как' (см. Vehicles.variant)
const GEN_ALT = {
  suv: ['sedan_2', 'sedan_4', 'sedan_1'], lux: ['sedan_4#lux'], taxi: ['sedan_1#taxi'],
  van: ['van_iran#van'], pickup: ['sedan_1#pickup', 'sedan_2#pickup'],
};

const Vehicles = {
  cache: new Map(),
  variants: new Map(),

  // Какой сгенерированный спрайт (assets/gen/vehicles) взять для типа, если есть
  genKey(type, faction) {
    if (faction === 'lions' && type === 'hatch' && Assets.gen['vehicles/hatch_lions']) return 'hatch_lions';
    if (faction === 'iran' && type === 'van' && Assets.gen['vehicles/van_iran']) return 'van_iran';
    const list = (GEN_VEH[type] || []).filter((k) => Assets.gen['vehicles/' + k]);
    if (list.length) return pick(list);
    const alt = (GEN_ALT[type] || []).filter((k) => Assets.gen['vehicles/' + k.split('#')[0]]);
    return alt.length ? pick(alt) : null;
  },

  // Самая подходящая картинка для стадии урона: ищем _dN, потом стадии ниже.
  // Возвращает { img, stage } — stage показывает, какую стадию картинка уже изображает.
  genForStage(key, stage) {
    const [base, how] = key.split('#');
    let r = { img: Assets.gen['vehicles/' + base], stage: 0 };
    for (let s = stage; s >= 1; s--) {
      const im = Assets.gen['vehicles/' + base + '_d' + s];
      if (im) { r = { img: im, stage: s }; break; }
    }
    if (how) r.img = this.variant(r.img, how, r.stage);
    return r;
  },

  // Переделка готовой картинки под другой тип (кешируется)
  variant(img, how, stage) {
    const id = how + ':' + (img.src || img.width + 'x' + img.height) + ':' + stage;
    let c = this.variants.get(id);
    if (c) return c;
    const w = img.width, h = img.height;
    c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d');
    if (how === 'van') {
      // белый развозной фургон из тёмного
      g.filter = 'grayscale(1) brightness(2.4) contrast(0.85)';
      g.drawImage(img, 0, 0);
      g.filter = 'none';
    } else {
      g.drawImage(img, 0, 0);
    }
    if (how === 'lux') {
      // чёрный лимузин: затемняем, блики остаются
      g.globalCompositeOperation = 'multiply'; g.fillStyle = '#3c3c40'; g.fillRect(0, 0, w, h);
      g.globalCompositeOperation = 'destination-in'; g.drawImage(img, 0, 0);
      g.globalCompositeOperation = 'source-over';
    }
    if (how === 'taxi' && stage < 3) {
      // жёлтый знак «מונית» на крыше
      const sw = w * 0.34, sh = h * 0.07, x = (w - sw) / 2, y = h * 0.5 - sh / 2;
      g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(x + 2, y + 3, sw, sh);
      g.fillStyle = '#ffd21f'; g.fillRect(x, y, sw, sh);
      g.strokeStyle = '#6b5400'; g.lineWidth = Math.max(1, w / 120); g.strokeRect(x, y, sw, sh);
      g.fillStyle = '#222'; g.font = `bold ${Math.round(sh * 0.7)}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('מונית', w / 2, y + sh / 2 + 1);
    }
    if (how === 'pickup') {
      // открытый кузов вместо задней половины: борта, пол, ящики
      const y0 = h * 0.5, mx = w * 0.1;
      // борта — цвета кабины (средний цвет крыши)
      let side = '#d9d9d6';
      try {
        const d = g.getImageData(Math.round(w * 0.35), Math.round(h * 0.42), Math.max(1, Math.round(w * 0.3)), Math.max(1, Math.round(h * 0.06))).data;
        let r = 0, gg = 0, bb = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 200) { r += d[i]; gg += d[i + 1]; bb += d[i + 2]; n++; }
        if (n) side = `rgb(${Math.round(r / n)},${Math.round(gg / n)},${Math.round(bb / n)})`;
      } catch (e) { /* без доступа к пикселям — светлые борта */ }
      g.clearRect(0, y0, w, h - y0);
      g.fillStyle = stage >= 3 ? '#2a2420' : side; g.fillRect(mx, y0, w - mx * 2, h * 0.47);
      g.fillStyle = stage >= 3 ? '#1c1714' : '#4a4a4a'; g.fillRect(mx + w * 0.05, y0 + h * 0.02, w - mx * 2 - w * 0.1, h * 0.42);
      if (stage < 3) for (const [cx, cy] of [[0.35, 0.62], [0.62, 0.6], [0.45, 0.78]]) {
        g.fillStyle = '#a1774a'; g.fillRect(w * cx - w * 0.12, h * cy - h * 0.05, w * 0.24, h * 0.1);
        g.strokeStyle = '#6d4c2b'; g.lineWidth = Math.max(1, w / 90); g.strokeRect(w * cx - w * 0.12, h * cy - h * 0.05, w * 0.24, h * 0.1);
      }
      g.fillStyle = '#c62828'; g.fillRect(mx + w * 0.02, h * 0.965, w * 0.12, h * 0.02); g.fillRect(w - mx - w * 0.14, h * 0.965, w * 0.12, h * 0.02);
    }
    this.variants.set(id, c);
    return c;
  },

  // Процедурные повреждения поверх любой машины (в координатах машины, нос вверх).
  // dents — места реальных ударов: u поперёк (-1 левый борт … 1 правый), v вдоль (-1 нос … 1 корма).
  drawDamage(g, car, stage) {
    const hw = car.w / 2, hl = car.l / 2;
    const r = makeRng(car.seed);
    // вмятины в местах ударов
    for (const d of car.dents) {
      const x = d.u * hw * 0.85, y = d.v * hl * 0.9;
      const s = 4 + 7 * d.s;
      g.fillStyle = `rgba(0,0,0,${0.18 + 0.25 * d.s})`;
      g.beginPath(); g.ellipse(x, y, s, s * 0.7, d.u * 0.8, 0, TAU); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.18)';
      g.beginPath(); g.ellipse(x - s * 0.3, y - s * 0.3, s * 0.4, s * 0.25, 0, 0, TAU); g.fill();
    }
    if (stage === 0) return; // пока только вмятины
    // царапины
    g.strokeStyle = 'rgba(230,230,230,0.55)'; g.lineWidth = 0.8;
    g.beginPath();
    const n = stage >= 2 ? 7 : 3;
    for (let i = 0; i < n; i++) {
      const x = r.range(-hw * 0.9, hw * 0.9), y = r.range(-hl * 0.9, hl * 0.9);
      g.moveTo(x, y); g.lineTo(x + r.range(-6, 6), y + r.range(4, 12));
    }
    g.stroke();
    if (car.moto) return;
    // разбитая фара
    g.fillStyle = '#2b2b2b';
    g.fillRect(r() < 0.5 ? -hw + 3 : hw - 10, -hl + 1, 7, 3);
    // трещина на лобовом
    const wy = -hl * 0.36;
    g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = 0.8;
    g.beginPath();
    const cx = r.range(-hw * 0.4, hw * 0.4);
    const rays = stage >= 2 ? 7 : 2;
    for (let i = 0; i < rays; i++) { const a = r.range(0, TAU); g.moveTo(cx, wy); g.lineTo(cx + Math.cos(a) * r.range(5, 12), wy + Math.sin(a) * r.range(2, 5)); }
    g.stroke();
    if (stage < 2) return;
    // смятый нос или корма — там, куда чаще били
    let front = 0;
    for (const d of car.dents) front += d.v < 0 ? d.s : -d.s;
    const ey = front >= 0 ? -hl : hl, dir = front >= 0 ? 1 : -1;
    g.fillStyle = 'rgba(40,35,30,0.55)';
    g.beginPath(); g.moveTo(-hw, ey);
    for (let i = 0; i <= 8; i++) g.lineTo(-hw + (car.w * i) / 8, ey + dir * r.range(2, 9));
    g.lineTo(hw, ey); g.closePath(); g.fill();
    // копоть и голый металл
    for (let i = 0; i < 4; i++) {
      g.fillStyle = i % 2 ? 'rgba(20,20,20,0.3)' : 'rgba(170,170,175,0.45)';
      g.beginPath(); g.ellipse(r.range(-hw * 0.7, hw * 0.7), r.range(-hl * 0.7, hl * 0.7), r.range(3, 7), r.range(2, 5), r() * 3, 0, TAU); g.fill();
    }
  },

  sprite(type, color, faction) {
    const key = type + color + (faction || '');
    let c = this.cache.get(key);
    if (c) return c;
    const T = VTYPES[type];
    const S = 2, pad = 8;
    c = document.createElement('canvas');
    c.width = (T.w + pad * 2) * S; c.height = (T.l + pad * 2) * S;
    const g = c.getContext('2d');
    g.scale(S, S);
    g.translate(pad + T.w / 2, pad + T.l / 2);
    this.draw(g, type, T.w, T.l, color, faction);
    c.pad = pad;
    this.cache.set(key, c);
    return c;
  },

  rr(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r);
    g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r);
    g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y);
    g.closePath();
  },

  // Корпус легковушки: капот спереди (вверху), багажник сзади
  body(g, w, l, color, opt = {}) {
    const hw = w / 2, hl = l / 2;
    // колёса
    g.fillStyle = '#121212';
    const wy = [-hl * 0.62, hl * 0.62];
    for (const y of wy) { g.fillRect(-hw - 1.5, y - 6, 4, 12); g.fillRect(hw - 2.5, y - 6, 4, 12); }
    // корпус с градиентом (свет слева-сверху)
    const gr = g.createLinearGradient(-hw, 0, hw, 0);
    gr.addColorStop(0, shade(color, 1.08));
    gr.addColorStop(0.5, color);
    gr.addColorStop(1, shade(color, 0.82));
    this.rr(g, -hw, -hl, w, l, opt.round || 8);
    g.fillStyle = gr; g.fill();
    g.lineWidth = 1.5; g.strokeStyle = shade(color, 0.45); g.stroke();
    // зеркала
    g.fillStyle = shade(color, 0.7);
    g.fillRect(-hw - 3, -hl * 0.28, 3, 4); g.fillRect(hw, -hl * 0.28, 3, 4);
    // фары и стопы
    g.fillStyle = '#fff6c8';
    g.fillRect(-hw + 3, -hl + 1, 7, 3); g.fillRect(hw - 10, -hl + 1, 7, 3);
    g.fillStyle = '#c62828';
    g.fillRect(-hw + 3, hl - 3, 6, 2.5); g.fillRect(hw - 9, hl - 3, 6, 2.5);
  },

  glass(g, x, y, w, h, r = 4) {
    const gr = g.createLinearGradient(x, y, x + w, y + h);
    gr.addColorStop(0, '#a9cde0'); gr.addColorStop(0.5, '#6f97ad'); gr.addColorStop(1, '#3e5d70');
    this.rr(g, x, y, w, h, r);
    g.fillStyle = gr; g.fill();
    g.fillStyle = 'rgba(255,255,255,0.35)';
    g.fillRect(x + 2, y + 1.5, w * 0.35, 1.5);
  },

  // Обычная легковушка с кабиной
  car(g, w, l, color, cabin = 0.42, cabinOff = 0.02) {
    this.body(g, w, l, color);
    const hw = w / 2, hl = l / 2;
    // линии капота
    g.strokeStyle = shade(color, 0.7); g.lineWidth = 1;
    g.beginPath(); g.moveTo(-hw * 0.5, -hl + 5); g.lineTo(-hw * 0.45, -hl * 0.45); g.moveTo(hw * 0.5, -hl + 5); g.lineTo(hw * 0.45, -hl * 0.45); g.stroke();
    const cl = l * cabin, cy = -cl / 2 + l * cabinOff;
    // лобовое и заднее стекло, крыша
    this.glass(g, -hw + 4, cy - 2, w - 8, cl * 0.32, 5);
    this.glass(g, -hw + 5, cy + cl * 0.78, w - 10, cl * 0.24, 4);
    const rg = g.createLinearGradient(-hw, 0, hw, 0);
    rg.addColorStop(0, shade(color, 1.12)); rg.addColorStop(1, shade(color, 0.86));
    this.rr(g, -hw + 4, cy + cl * 0.3, w - 8, cl * 0.5, 3);
    g.fillStyle = rg; g.fill();
    // боковые стёкла
    g.fillStyle = '#4c6a7b';
    g.fillRect(-hw + 1.5, cy + 2, 2.5, cl * 0.75); g.fillRect(hw - 4, cy + 2, 2.5, cl * 0.75);
    return { cy, cl };
  },

  draw(g, type, w, l, color, faction) {
    const hw = w / 2, hl = l / 2;
    switch (type) {
      case 'sedan': this.car(g, w, l, color, 0.44, 0.02); break;
      case 'hatch': this.car(g, w, l, color, 0.5, 0.1); break;
      case 'suv': {
        const r = this.car(g, w, l, color, 0.52, 0.06);
        g.strokeStyle = '#222'; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(-hw + 6, r.cy + r.cl * 0.32); g.lineTo(-hw + 6, r.cy + r.cl * 0.78); g.moveTo(hw - 6, r.cy + r.cl * 0.32); g.lineTo(hw - 6, r.cy + r.cl * 0.78); g.stroke();
        break;
      }
      case 'lux': {
        this.car(g, w, l, color, 0.4, 0.04);
        g.fillStyle = '#c0c0c0'; g.fillRect(-6, -hl + 0.5, 12, 2.5); // хромированная решётка
        g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(-hw + 3, -hl + 6, 2, l - 12);
        break;
      }
      case 'taxi': {
        this.car(g, w, l, color, 0.44, 0.02);
        // жёлтая «шашка» на крыше с надписью
        g.fillStyle = '#ffd400'; this.rr(g, -9, -4, 18, 8, 2); g.fill();
        g.strokeStyle = '#8a6d00'; g.lineWidth = 1; g.stroke();
        g.fillStyle = '#222'; g.font = 'bold 5px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('מונית', 0, 0.3);
        break;
      }
      case 'police': {
        const r = this.car(g, w, l, color, 0.52, 0.06);
        // синие полосы по бортам, капот с надписью
        g.fillStyle = '#1d4fa3'; g.fillRect(-hw, -hl * 0.55, 3, l * 0.95); g.fillRect(hw - 3, -hl * 0.55, 3, l * 0.95);
        g.fillStyle = '#1d4fa3'; g.font = 'bold 6px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('משטרה', 0, -hl * 0.65);
        // мигалка (цвет переключается при отрисовке)
        g.fillStyle = '#333'; g.fillRect(-12, r.cy + r.cl * 0.42, 24, 6);
        break;
      }
      case 'ambulance': {
        this.body(g, w, l, color, { round: 6 });
        this.glass(g, -hw + 4, -hl + 6, w - 8, 9, 3);
        g.fillStyle = '#e8e8e8'; g.fillRect(-hw + 3, -hl + 18, w - 6, l - 22);
        g.fillStyle = '#d32f2f'; g.fillRect(-hw, -hl + 22, w, 4); g.fillRect(-hw, hl - 14, w, 4);
        g.fillStyle = '#d32f2f'; g.fillRect(-3, -2, 6, 18); g.fillRect(-9, 4, 18, 6);
        g.fillStyle = '#ff8f00'; g.fillRect(-hw + 4, -hl + 15, 8, 3); g.fillRect(hw - 12, -hl + 15, 8, 3);
        break;
      }
      case 'van': {
        this.body(g, w, l, color, { round: 6 });
        this.glass(g, -hw + 4, -hl + 6, w - 8, 10, 3);
        g.fillStyle = shade(color, 1.05); g.fillRect(-hw + 3, -hl + 19, w - 6, l - 23);
        g.strokeStyle = shade(color, 0.7); g.lineWidth = 1;
        for (let y = -hl + 26; y < hl - 6; y += 12) { g.beginPath(); g.moveTo(-hw + 5, y); g.lineTo(hw - 5, y); g.stroke(); }
        break;
      }
      case 'pickup': {
        this.body(g, w, l, color, { round: 6 });
        this.glass(g, -hw + 4, -hl + 13, w - 8, 9, 3);
        g.fillStyle = shade(color, 1.08); g.fillRect(-hw + 4, -hl + 22, w - 8, 12);
        this.glass(g, -hw + 6, -hl + 33, w - 12, 4, 2);
        // открытый кузов
        g.fillStyle = shade(color, 0.6); g.fillRect(-hw + 3, -hl + 40, w - 6, l - 44);
        g.fillStyle = shade(color, 0.45); g.fillRect(-hw + 6, -hl + 43, w - 12, l - 50);
        g.fillStyle = '#7a5a3a'; g.fillRect(-hw + 8, -hl + 46, 10, 9); g.fillStyle = '#5b6b7a'; g.fillRect(hw - 16, hl - 18, 9, 10);
        break;
      }
      case 'sherut': {
        this.body(g, w, l, color, { round: 7 });
        this.glass(g, -hw + 4, -hl + 7, w - 8, 11, 4);
        g.fillStyle = shade(color, 1.06); g.fillRect(-hw + 3, -hl + 20, w - 6, l - 24);
        // ряды окон
        g.fillStyle = '#4c6a7b';
        for (let y = -hl + 24; y < hl - 10; y += 13) { g.fillRect(-hw + 1, y, 3, 10); g.fillRect(hw - 4, y, 3, 10); }
        g.fillStyle = '#222'; g.font = 'bold 8px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('4', 0, -hl + 30);
        break;
      }
      case 'bus': {
        this.body(g, w, l, '#f2f2f2', { round: 6 });
        g.fillStyle = color; g.fillRect(-hw, -hl + 10, w, 8); g.fillRect(-hw, hl - 18, w, 8);
        this.glass(g, -hw + 3, -hl + 2, w - 6, 9, 3);
        // крыша: кондиционеры и люки
        g.fillStyle = '#d6d6d6'; g.fillRect(-hw + 8, -hl + 30, w - 16, 26);
        g.fillStyle = '#bdbdbd'; g.fillRect(-hw + 12, -hl + 34, w - 24, 18);
        g.fillStyle = '#cfcfcf'; g.fillRect(-8, 10, 16, 14); g.fillRect(-8, 40, 16, 14);
        g.fillStyle = '#4c6a7b';
        for (let y = -hl + 22; y < hl - 22; y += 14) { g.fillRect(-hw + 0.5, y, 2.5, 11); g.fillRect(hw - 3, y, 2.5, 11); }
        g.fillStyle = '#ffb300'; g.font = 'bold 7px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('5 מרכז', 0, -hl + 6.5);
        break;
      }
      case 'truck': {
        // кабина впереди, за ней контейнер с рёбрами
        const cl = Math.min(34, l * 0.22);
        g.save(); g.translate(0, -hl + cl / 2); this.body(g, w - 6, cl, '#eceff1', { round: 5 }); this.glass(g, -hw + 7, -cl / 2 + 3, w - 14, 7, 2); g.restore();
        g.fillStyle = '#212121'; g.fillRect(-hw + 2, -hl + cl, w - 4, 4);
        g.fillStyle = color; g.fillRect(-hw, -hl + cl + 4, w, l - cl - 4);
        g.strokeStyle = shade(color, 0.65); g.lineWidth = 1.2;
        for (let y = -hl + cl + 9; y < hl - 2; y += 6) { g.beginPath(); g.moveTo(-hw + 2, y); g.lineTo(hw - 2, y); g.stroke(); }
        g.strokeStyle = shade(color, 0.45); g.lineWidth = 2; g.strokeRect(-hw + 1, -hl + cl + 5, w - 2, l - cl - 6);
        g.fillStyle = '#fff'; g.font = 'bold 7px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ODESSA LINE', 0, 4);
        break;
      }
      case 'barrel': {
        const r = Math.min(w, l) / 2 - 1;
        g.fillStyle = 'rgba(0,0,0,0.3)'; g.beginPath(); g.arc(2, 2, r, 0, TAU); g.fill();
        g.fillStyle = color; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
        g.strokeStyle = shade(color, 0.6); g.lineWidth = 1.5;
        for (const k of [0.45, 0.8]) { g.beginPath(); g.arc(0, 0, r * k, 0, TAU); g.stroke(); }
        g.fillStyle = '#ffeb3b'; g.beginPath(); g.moveTo(0, -r * 0.35); g.lineTo(r * 0.3, r * 0.2); g.lineTo(-r * 0.3, r * 0.2); g.closePath(); g.fill();
        g.fillStyle = '#222'; g.fillRect(-1, -r * 0.15, 2, r * 0.22);
        break;
      }
      case 'garbage': {
        this.body(g, w, l, color, { round: 5 });
        this.glass(g, -hw + 4, -hl + 4, w - 8, 9, 3);
        g.fillStyle = shade(color, 1.1); g.fillRect(-hw + 3, -hl + 16, w - 6, 8);
        g.fillStyle = shade(color, 0.9); g.fillRect(-hw + 3, -hl + 27, w - 6, l - 31);
        g.strokeStyle = shade(color, 0.6); g.lineWidth = 1.5;
        for (let y = -hl + 34; y < hl - 6; y += 9) { g.beginPath(); g.moveTo(-hw + 5, y); g.lineTo(hw - 5, y); g.stroke(); }
        g.fillStyle = '#ffeb3b'; g.fillRect(-hw + 3, hl - 6, w - 6, 3);
        break;
      }
      case 'scooter': case 'moto': {
        // колёса
        g.fillStyle = '#111'; g.fillRect(-2.5, -hl, 5, 10); g.fillRect(-2.5, hl - 10, 5, 10);
        g.fillStyle = color; this.rr(g, -hw * 0.55, -hl + 6, w * 0.55, l - 14, 4); g.fill();
        g.strokeStyle = shade(color, 0.5); g.lineWidth = 1; g.stroke();
        g.fillStyle = '#333'; g.fillRect(-hw, -hl + 9, w, 2.5); // руль
        g.fillStyle = '#fff6c8'; g.fillRect(-2, -hl + 1, 4, 2);
        if (type === 'scooter') {
          // термокороб доставки
          g.fillStyle = '#ff6a1a'; this.rr(g, -hw - 1, hl - 18, w + 2, 14, 2); g.fill();
          g.strokeStyle = '#a03c00'; g.stroke();
          g.fillStyle = '#fff'; g.font = 'bold 5.5px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('8bis', 0, hl - 11);
        } else {
          g.fillStyle = '#222'; this.rr(g, -4, -2, 8, 16, 3); g.fill();
        }
        break;
      }
    }
    // метки фракций
    if (faction === 'russian') { g.fillStyle = 'rgba(200,200,200,0.5)'; g.fillRect(-hw + 4, hl - 6, w - 8, 1.5); }
    if (faction === 'lions') { g.fillStyle = '#1b7f3a'; g.fillRect(-1.5, -hl + 2, 3, l - 4); }
    if (faction === 'arab') { g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(-hw + 2, -hl + 30, 2, 20); g.fillRect(hw - 4, -hl + 30, 2, 20); }
  },
};
