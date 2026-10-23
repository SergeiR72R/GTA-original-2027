// Город: генерация карты Тель-Авива (вымышленная, но узнаваемая),
// отрисовка земли чанками, псевдо-3D здания, миникарта, поиск пути.
'use strict';

// Типы клеток
const T_BOUND = 0, T_SEA = 1, T_SAND = 2, T_ROAD = 3, T_WALK = 4, T_BUILD = 5,
  T_GRASS = 6, T_RIVER = 7, T_PLAZA = 8, T_PARKING = 9, T_DECK = 10;

const PERSPECTIVE = 0.0013; // сила «наклона» зданий от центра экрана
const CHUNK = 8; // клеток в чанке земли

const DISTRICTS = {
  port: 'Порт Тель-Авива',
  north: 'Старый Север',
  park: 'Парк Яркон',
  ramatgan: 'Рамат-Ган',
  tayelet: 'Набережная',
  beach: 'Пляж Гордон',
  sea: 'Средиземное море',
  center: 'Центр',
  dizengoff: 'Площадь Дизенгоф',
  rabin: 'Площадь Рабина',
  sarona: 'Сарона',
  azrieli: 'Азриэли',
  shuk: 'Шук а-Кармель',
  rothschild: 'Бульвар Ротшильд',
  south: 'Южный Тель-Авив',
  nevetzedek: 'Неве-Цедек',
  florentin: 'Флорентин',
  busstation: 'Центральная автостанция',
  jaffa: 'Старый Яффо',
  hospital: 'Больница',
  police: 'Полиция',
  paint: 'Покраска «Флорентин»',
  // новые районы
  kirya: 'Кирья',
  nahalat: 'Нахалат Биньямин',
  bursa: 'Биржа алмазов (Рамат-Ган)',
  rgshops: 'Рамат-Ган: улица Бялик',
  levinsky: 'Парк Левински',
  hatikva: 'Шук а-Тиква',
  shikun: 'Шхунот (спальные кварталы)',
  jaffaclock: 'Часовая башня Яффо',
  flea: 'Шук а-Пишпешим (блошиный рынок)',
  ajami: 'Аджами',
  jaffaport: 'Яффский порт',
};

const City = {
  W: 132,
  H: 130,
  NB: 10, // кварталов по горизонтали и вертикали
  V: [8, 20, 32, 44, 56, 68, 80, 92, 104, 116, 128], // левые колонки вертикальных дорог
  HR: [6, 18, 30, 42, 54, 66, 78, 90, 102, 114, 126], // верхние строки горизонтальных дорог
  JAFFA_SEA: 102, // южнее — море подходит к Яффо и Аджами
  VNAMES: ['Тайелет', 'Ха-Яркон', 'Бен-Йехуда', 'Дизенгоф', 'Ибн-Гвироль', 'Леонардо да Винчи', 'Дерех Бегин', 'Шоссе Аялон', 'Жаботински', 'Бялик', 'Абба Гилель'],
  HNAMES: ['Рокех', 'Нордау', 'Арлозоров', 'Фришман', 'Бограшов', 'Алленби', 'Левински', 'Эйлат', 'Салама', 'Йефет', 'Яффо-Порт'],

  // Районы по кварталам [by][bx]. Запад — море, север — Яркон.
  // Банды: «Одесса» — Рамат-Ган за Аялоном (северо-восток), клан Аль-Бахар —
  // Яффо и Аджами (юго-запад), «Львы Гондэра» — юг у автовокзала (юго-восток).
  LAYOUT: [
    ['port', 'port', 'north', 'north', 'park', 'park', 'park', 'bursa', 'ramatgan', 'ramatgan'],
    ['tayelet', 'north', 'north', 'rabin', 'north', 'north', 'kirya', 'bursa', 'rgshops', 'ramatgan'],
    ['tayelet', 'center', 'dizengoff', 'center', 'center', 'sarona', 'azrieli', 'ramatgan', 'rgshops', 'ramatgan'],
    ['tayelet', 'center', 'center', 'center', 'center', 'kirya', 'hospital', 'ramatgan', 'ramatgan', 'ramatgan'],
    ['tayelet', 'shuk', 'nahalat', 'rothschild', 'rothschild', 'center', 'police', 'rgshops', 'ramatgan', 'ramatgan'],
    ['tayelet', 'nevetzedek', 'nevetzedek', 'florentin', 'florentin', 'south', 'busstation', 'busstation', 'south', 'south'],
    ['nevetzedek', 'nevetzedek', 'florentin', 'florentin', 'paint', 'south', 'levinsky', 'south', 'hatikva', 'south'],
    ['jaffaport', 'jaffaclock', 'flea', 'jaffa', 'florentin', 'south', 'south', 'south', 'hatikva', 'shikun'],
    ['ajami', 'jaffa', 'jaffa', 'jaffa', 'jaffa', 'south', 'south', 'hatikva', 'south', 'shikun'],
    ['ajami', 'ajami', 'jaffa', 'jaffa', 'shikun', 'shikun', 'south', 'south', 'shikun', 'shikun'],
  ],

  type: null,
  laneV: null,
  laneH: null,
  buildings: [],
  bgrid: null, // здания по чанкам
  decor: [],
  dgrid: null,
  parkingSpots: [],
  places: {},
  chunkCache: new Map(),
  minimap: null,

  idx(x, y) { return y * this.W + x; },
  inside(x, y) { return x >= 0 && y >= 0 && x < this.W && y < this.H; },
  t(x, y) { return this.inside(x, y) ? this.type[y * this.W + x] : T_BOUND; },

  isSolidT(tt) { return tt === T_BUILD || tt === T_SEA || tt === T_RIVER || tt === T_BOUND; },
  solidAt(px, py) { return this.isSolidT(this.t(Math.floor(px / TILE), Math.floor(py / TILE))); },
  isRoad(x, y) { return this.t(x, y) === T_ROAD; },
  isWalkway(x, y) { const tt = this.t(x, y); return tt === T_WALK || tt === T_PLAZA || tt === T_DECK; },

  blockRect(bx, by) {
    return { x0: this.V[bx] + 2, x1: this.V[bx + 1] - 1, y0: this.HR[by] + 2, y1: this.HR[by + 1] - 1 };
  },

  // Центр клетки в пикселях
  tc(tx, ty) { return { x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 }; },

  generate() {
    const W = this.W, H = this.H;
    this.type = new Uint8Array(W * H);
    this.laneV = new Int8Array(W * H).fill(-1);
    this.laneH = new Int8Array(W * H).fill(-1);
    this.bid = new Int16Array(W * H).fill(-1);
    const rng = makeRng(1948);

    // Парк Яркон с рекой на севере, море и пляж на западе
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        let tt = T_BOUND;
        if (y < 6) tt = (y === 2 || y === 3) ? T_RIVER : T_GRASS;
        if (x < 5) tt = T_SEA;
        else if (x < 8 && y >= 0) tt = (y === 2 || y === 3) ? T_RIVER : T_SAND;
        this.type[this.idx(x, y)] = tt;
      }
    }
    // У Яффо и Аджами пляжа нет — море подходит к набережной
    for (let y = this.JAFFA_SEA; y < H; y++) for (let x = 5; x < 8; x++) this.type[this.idx(x, y)] = T_SEA;

    // Кварталы
    for (let by = 0; by < this.NB; by++) {
      for (let bx = 0; bx < this.NB; bx++) {
        const r = this.blockRect(bx, by);
        for (let y = r.y0; y <= r.y1; y++) for (let x = r.x0; x <= r.x1; x++) this.type[this.idx(x, y)] = T_WALK;
        this.genBlock(bx, by, r, this.LAYOUT[by][bx], rng);
      }
    }

    // Дороги: правостороннее движение
    const vy0 = this.HR[0], vy1 = this.HR[this.HR.length - 1] + 1;
    const hx0 = this.V[0], hx1 = this.V[this.V.length - 1] + 1;
    for (const c of this.V) {
      for (let y = vy0; y <= vy1; y++) {
        this.type[this.idx(c, y)] = T_ROAD; this.laneV[this.idx(c, y)] = 2;
        this.type[this.idx(c + 1, y)] = T_ROAD; this.laneV[this.idx(c + 1, y)] = 0;
      }
    }
    for (const r of this.HR) {
      for (let x = hx0; x <= hx1; x++) {
        this.type[this.idx(x, r)] = T_ROAD; this.laneH[this.idx(x, r)] = 3;
        this.type[this.idx(x, r + 1)] = T_ROAD; this.laneH[this.idx(x, r + 1)] = 1;
      }
    }

    // Пальмы вдоль набережной и зонтики на пляже
    for (let y = 8; y < this.JAFFA_SEA; y += 3) {
      this.decor.push({ k: 'palm', x: 7 * TILE + 44, y: y * TILE + rng.range(0, 40), h: rng.range(70, 95), r: rng() * TAU, dates: rng() < 0.3 });
      if (rng() < 0.7) this.decor.push({ k: 'umbrella', x: 5 * TILE + rng.range(20, 150), y: y * TILE + rng.range(0, 150), h: 22, c: rng.pick(['#e94f37', '#f6c90e', '#3fa7d6', '#ffffff', '#59cd90']) });
      if (rng() < 0.25) this.decor.push({ k: 'towel', x: 5 * TILE + rng.range(30, 160), y: y * TILE + rng.range(0, 150), h: 0, low: true, c: rng.pick(['#e91e63', '#03a9f4', '#ffeb3b', '#4caf50']), r: rng.range(-0.4, 0.4) });
    }
    // Вышки спасателей и игроки в маткот — главный пляжный вид спорта
    for (const y of [14, 40, 66, 92]) this.decor.push({ k: 'lifeguard', x: 6 * TILE + 10, y: y * TILE, h: 34 });
    for (const y of [10, 24, 30, 46, 62, 70, 84, 96]) this.decor.push({ k: 'matkot', x: 5.9 * TILE, y: y * TILE + rng.range(0, 60), h: 0, low: true, ph: rng() * TAU, a: rng.range(-0.4, 0.4) + Math.PI / 2 });
    this.decorateStreets(rng);
    // Деревья в парке Яркон
    for (let i = 0; i < 100; i++) {
      const x = rng.range(9, this.W - 1) * TILE, y = rng.pick([rng.range(0.2, 1.8), rng.range(4.2, 5.6)]) * TILE;
      this.decor.push({ k: rng() < 0.5 ? 'tree' : 'treeS', x, y, h: 40 });
    }

    this.indexBuildings();
    this.definePlaces();
    this.buildMinimap();
  },

  addBuilding(b) {
    b.id = this.buildings.length;
    this.buildings.push(b);
    return b;
  },

  markSolid(x0, y0, w, h, id) {
    for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) {
      this.type[this.idx(x, y)] = T_BUILD;
      if (id !== undefined) this.bid[this.idx(x, y)] = id;
    }
  },

  fill(x0, y0, w, h, tt) {
    for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) this.type[this.idx(x, y)] = tt;
  },

  // Делим участок на лоты
  splitLots(r, rng, maxS, out) {
    const big = r.w > maxS || r.h > maxS;
    if (!big && (rng() < 0.55 || (r.w <= 3 && r.h <= 3))) { out.push(r); return; }
    if (r.w >= r.h && r.w >= 4) {
      const s = rng.int(2, r.w - 2);
      this.splitLots({ x: r.x, y: r.y, w: s, h: r.h }, rng, maxS, out);
      this.splitLots({ x: r.x + s, y: r.y, w: r.w - s, h: r.h }, rng, maxS, out);
    } else if (r.h >= 4) {
      const s = rng.int(2, r.h - 2);
      this.splitLots({ x: r.x, y: r.y, w: r.w, h: s }, rng, maxS, out);
      this.splitLots({ x: r.x, y: r.y + s, w: r.w, h: r.h - s }, rng, maxS, out);
    } else out.push(r);
  },

  // Обычное здание на лоте (в клетках)
  lotBuilding(l, style, rng, opts = {}) {
    const inset = opts.inset !== undefined ? opts.inset : 4;
    const b = {
      kind: 'rect',
      x: l.x * TILE + inset, y: l.y * TILE + inset,
      w: l.w * TILE - inset * 2, h: l.h * TILE - inset * 2,
      h0: 0, h1: rng.range(style.hmin, style.hmax),
      roof: rng.pick(style.roofs), wall: null, items: [],
      floors: style.floor || 24,
      style: style.name,
      shops: rng() < 0.55, // витрины на первом этаже (для 3D-фасадов)
    };
    b.wall = style.wall || shade(b.roof, 0.82);
    const n = rng.int(style.solar ? 0 : 0, style.solar || 0);
    for (let i = 0; i < n; i++) b.items.push({ t: 'solar', u: rng.range(0.15, 0.8), v: rng.range(0.15, 0.8) });
    const ac = rng.int(0, style.ac || 0);
    for (let i = 0; i < ac; i++) b.items.push({ t: 'ac', u: rng.range(0.1, 0.85), v: rng.range(0.1, 0.85) });
    if (style.pool && rng() < 0.6) b.items.push({ t: 'pool', u: 0.2, v: 0.2, w: 0.45, h: 0.35 });
    if (style.tiles) b.items.push({ t: 'tiles' });
    else {
      // выход на крышу, баки, антенны, тарелки, бельё, растения
      if (!style.noStairs && rng() < 0.7) b.items.push({ t: 'stairs', u: rng.range(0.55, 0.75), v: rng.range(0.1, 0.6) });
      if (style.solar && rng() < 0.35) b.items.push({ t: 'tank', u: rng.range(0.1, 0.7), v: rng.range(0.1, 0.7) });
      if (rng() < 0.4) b.items.push({ t: 'antenna', u: rng.range(0.1, 0.9), v: rng.range(0.1, 0.9) });
      if (rng() < 0.3) b.items.push({ t: 'dish', u: rng.range(0.1, 0.8), v: rng.range(0.1, 0.8) });
      if (style.solar && rng() < 0.25) b.items.push({ t: 'laundry', u: rng.range(0.1, 0.5), v: rng.range(0.55, 0.8), c: [rng.pick(SHIRTS), rng.pick(SHIRTS), rng.pick(SHIRTS)] });
      if (style.solar && rng() < 0.2) b.items.push({ t: 'plants', u: rng.range(0.1, 0.8), v: rng.range(0.1, 0.8) });
      if (rng() < 0.06) b.items.push({ t: 'flag', u: rng.range(0.15, 0.8), v: rng.range(0.15, 0.8) });
    }
    b.parapet = !style.tiles && !style.noParapet;
    b.texture = style.tiles ? 'roofTiles' : style.metal ? 'roofMetal' : 'roofGravel';
    b.balconies = !!style.balconies;
    b.stone = !!style.stone;
    Object.assign(b, opts.extra || {});
    this.addBuilding(b);
    this.markSolid(l.x, l.y, l.w, l.h, b.id);
    return b;
  },

  genBlock(bx, by, r, d, rng) {
    const ix = r.x0 + 1, iy = r.y0 + 1, iw = r.x1 - r.x0 - 1, ih = r.y1 - r.y0 - 1;
    const inner = { x: ix, y: iy, w: iw, h: ih };
    const S = STYLES;
    const lots = [];
    // style — стиль или смесь [[стиль, вес], ...]; area — часть квартала
    const pickStyle = (st) => {
      if (!Array.isArray(st)) return st;
      let sum = 0; for (const it of st) sum += it[1];
      let r = rng() * sum; for (const it of st) { r -= it[1]; if (r <= 0) return it[0]; }
      return st[0][0];
    };
    const generic = (style, maxS, pEmpty = 0.12, area = inner) => {
      const lots = [];
      this.splitLots(area, rng, maxS, lots);
      for (const l of lots) {
        const roll = rng();
        if (roll < pEmpty) {
          // двор: парковка или садик
          if (rng() < 0.6 && l.w >= 2 && l.h >= 2) {
            this.fill(l.x, l.y, l.w, l.h, T_PARKING);
            for (let i = 0; i < l.w * l.h / 2; i++) {
              if (rng() < 0.5) this.parkingSpots.push({ x: (l.x + rng.range(0.4, l.w - 0.4)) * TILE, y: (l.y + rng.range(0.4, l.h - 0.4)) * TILE, a: rng.pick([0, Math.PI]) });
            }
          } else {
            this.fill(l.x, l.y, l.w, l.h, T_GRASS);
            this.decor.push({ k: rng() < 0.5 ? 'palm' : 'treeS', x: (l.x + l.w / 2) * TILE, y: (l.y + l.h / 2) * TILE, h: 60, r: rng() * TAU });
          }
        } else {
          this.lotBuilding(l, pickStyle(style), rng);
        }
      }
    };
    // прилавок рынка на клетке (непроходимый)
    const stall = (x, y, fr) => {
      this.markSolid(x, y, 1, 1);
      this.decor.push({ k: 'stall', x: x * TILE + 32, y: y * TILE + 32, h: 16, c: rng.pick(['tent_blue', 'tent_red']), fr: rng.pick(fr) });
    };
    // деревья вдоль тротуаров (фикусы)
    const sidewalkTrees = (p) => {
      for (let x = r.x0; x <= r.x1; x += 2) {
        if (rng() < p) this.decor.push({ k: 'treeS', x: x * TILE + 32, y: r.y0 * TILE + 14, h: 34, s: 0.45 });
        if (rng() < p) this.decor.push({ k: 'treeS', x: x * TILE + 32, y: r.y1 * TILE + 50, h: 34, s: 0.45 });
      }
    };

    switch (d) {
      case 'port': {
        this.fill(ix, iy, iw, ih, T_DECK);
        this.splitLots({ x: ix + 1, y: iy + 1, w: iw - 2, h: ih - 3 }, rng, 6, lots);
        for (const l of lots) if (rng() < 0.8) this.lotBuilding(l, S.warehouse, rng, { inset: 6 });
        for (let x = ix; x < ix + iw; x += 2) this.decor.push({ k: 'palm', x: x * TILE + 32, y: (iy + ih - 1) * TILE + 32, h: 80, r: rng() * TAU });
        break;
      }
      case 'park': {
        this.fill(ix, iy, iw, ih, T_GRASS);
        for (let i = 0; i < 22; i++) this.decor.push({ k: rng() < 0.5 ? 'tree' : 'treeS', x: rng.range(ix, ix + iw) * TILE, y: rng.range(iy, iy + ih) * TILE, h: 40 });
        // дорожка через парк
        this.fill(ix, iy + 4, iw, 1, T_PLAZA);
        this.fill(ix + 4, iy, 1, ih, T_PLAZA);
        break;
      }
      case 'tayelet': {
        this.splitLots(inner, rng, 4, lots);
        for (const l of lots) this.lotBuilding(l, S.hotel, rng);
        for (let y = r.y0; y <= r.y1; y += 2) this.decor.push({ k: 'palm', x: r.x0 * TILE + 20, y: y * TILE + 32, h: 85, r: rng() * TAU });
        break;
      }
      case 'dizengoff': {
        this.fill(ix, iy, iw, ih, T_PLAZA);
        // кольцо невысоких домов по краю площади
        for (const l of [{ x: ix, y: iy, w: 3, h: 2 }, { x: ix + iw - 3, y: iy, w: 3, h: 2 }, { x: ix, y: iy + ih - 2, w: 3, h: 2 }, { x: ix + iw - 3, y: iy + ih - 2, w: 3, h: 2 }]) this.lotBuilding(l, S.bauhaus, rng);
        const cx = (ix + iw / 2) * TILE, cy = (iy + ih / 2) * TILE;
        this.fill(ix + iw / 2 - 1, iy + ih / 2 - 1, 2, 2, T_BUILD);
        this.addBuilding({ kind: 'circle', cx, cy, r: 58, h0: 0, h1: 10, roof: '#7fc4d8', wall: '#9a9a9a', items: [{ t: 'fountain' }], floors: 99, style: 'fountain' });
        for (let i = 0; i < 8; i++) this.decor.push({ k: 'palm', x: cx + Math.cos(i / 8 * TAU) * 200, y: cy + Math.sin(i / 8 * TAU) * 200, h: 80, r: i });
        break;
      }
      case 'rabin': {
        this.fill(ix, iy, iw, ih, T_PLAZA);
        // мэрия — высокая «пластина» на северной стороне
        this.lotBuilding({ x: ix + 1, y: iy, w: iw - 2, h: 2 }, S.cityhall, rng);
        for (let i = 0; i < 6; i++) this.decor.push({ k: 'treeS', x: (ix + 0.5 + i * 1.5) * TILE, y: (iy + ih - 0.5) * TILE, h: 35, s: 0.6 });
        break;
      }
      case 'sarona': {
        this.fill(ix, iy, iw, ih, T_GRASS);
        for (const l of [{ x: ix + 1, y: iy + 1, w: 2, h: 2 }, { x: ix + 5, y: iy + 1, w: 2, h: 2 }, { x: ix + 1, y: iy + 6, w: 2, h: 2 }, { x: ix + 5, y: iy + 6, w: 2, h: 3 }]) this.lotBuilding(l, S.templer, rng);
        this.fill(ix, iy + 4, iw, 1, T_PLAZA);
        for (let i = 0; i < 10; i++) this.decor.push({ k: 'tree', x: rng.range(ix, ix + iw) * TILE, y: rng.range(iy, iy + ih) * TILE, h: 40, s: 0.5 });
        break;
      }
      case 'azrieli': {
        // торговый центр-подиум и три башни: круглая, треугольная и квадратная
        this.fill(ix, iy, iw, ih, T_PLAZA);
        const pod = this.lotBuilding({ x: ix + 1, y: iy + 1, w: iw - 2, h: ih - 3 }, S.mall, rng);
        pod.h1 = 36;
        const bxp = pod.x, byp = pod.y, bw = pod.w, bh = pod.h;
        this.addBuilding({ kind: 'circle', cx: bxp + bw * 0.22, cy: byp + bh * 0.3, r: 70, h0: 36, h1: 300, roof: '#a9c8d8', wall: '#6d8fa3', items: [], floors: 14, glass: true, style: 'tower' });
        this.addBuilding({ kind: 'poly', pts: [[bxp + bw * 0.55, byp + bh * 0.12], [bxp + bw * 0.78, byp + bh * 0.55], [bxp + bw * 0.38, byp + bh * 0.58]], h0: 36, h1: 270, roof: '#b4cfdb', wall: '#5f8397', items: [], floors: 14, glass: true, style: 'tower' });
        this.addBuilding({ kind: 'rect', x: bxp + bw * 0.62, y: byp + bh * 0.62, w: 120, h: 120, h0: 36, h1: 240, roof: '#9fbfcf', wall: '#58798d', items: [{ t: 'ac', u: 0.5, v: 0.5 }], floors: 14, glass: true, style: 'tower' });
        break;
      }
      case 'shuk': {
        // ряды прилавков с навесами и проходы между ними
        this.fill(ix, iy, iw, ih, T_PLAZA);
        for (let y = iy; y < iy + ih; y += 3) {
          for (let x = ix; x < ix + iw; x++) {
            if (y + 1 >= iy + ih) continue;
            if (x === ix + 4) continue; // поперечный проход
            this.markSolid(x, y + 1, 1, 1);
            this.decor.push({ k: 'stall', x: x * TILE + 32, y: (y + 1) * TILE + 32, h: 16, c: rng.pick(['tent_blue', 'tent_red']), fr: rng.pick(['#f28c28', '#e63946', '#ffd166', '#06d6a0', '#8ac926', '#9b5de5']) });
          }
        }
        break;
      }
      case 'rothschild': {
        // бульвар: аллея посередине и дома баухауз
        this.fill(ix, iy + 3, iw, 2, T_PLAZA);
        for (let x = ix; x < ix + iw; x++) this.decor.push({ k: 'treeS', x: x * TILE + 32, y: (iy + 3) * TILE + (x % 2 ? 20 : 108), h: 36, s: 0.55 });
        this.splitLots({ x: ix, y: iy, w: iw, h: 3 }, rng, 3, lots);
        this.splitLots({ x: ix, y: iy + 5, w: iw, h: ih - 5 }, rng, 3, lots);
        for (const l of lots) this.lotBuilding(l, S.bauhaus, rng);
        break;
      }
      case 'hospital': {
        this.fill(ix, iy, iw, ih, T_PLAZA);
        this.lotBuilding({ x: ix + 1, y: iy, w: iw - 2, h: ih - 2 }, S.hospital, rng, { extra: { label: 'H' } });
        break;
      }
      case 'police': {
        this.fill(ix, iy, iw, ih, T_PARKING);
        this.lotBuilding({ x: ix + 1, y: iy, w: iw - 2, h: 4 }, S.police, rng, { extra: { label: 'POLICE' } });
        this.splitLots({ x: ix, y: iy + 6, w: iw, h: ih - 6 }, rng, 3, lots);
        for (const l of lots) this.lotBuilding(l, S.concrete, rng);
        break;
      }
      case 'paint': {
        this.fill(ix, iy, iw, ih, T_PARKING);
        const b = this.lotBuilding({ x: ix + 2, y: iy, w: iw - 4, h: 3 }, S.garage, rng);
        b.label = 'PAINT';
        this.splitLots({ x: ix, y: iy + 6, w: iw, h: ih - 6 }, rng, 3, lots);
        for (const l of lots) this.lotBuilding(l, S.florentin, rng);
        break;
      }
      case 'busstation': {
        this.lotBuilding(inner, S.busstation, rng);
        break;
      }
      case 'jaffaclock': {
        // площадь с часовой башней
        this.fill(ix, iy, iw, ih, T_PLAZA);
        this.fill(ix + 3, iy + 4, 2, 2, T_BUILD);
        this.addBuilding({ kind: 'rect', x: (ix + 3) * TILE + 30, y: (iy + 4) * TILE + 30, w: 68, h: 68, h0: 0, h1: 150, roof: '#c9a46a', wall: '#b88f55', items: [{ t: 'clock' }], floors: 30, style: 'jaffa' });
        this.splitLots({ x: ix, y: iy + 7, w: iw, h: ih - 7 }, rng, 3, lots);
        this.splitLots({ x: ix, y: iy, w: iw, h: 3 }, rng, 3, lots);
        for (const l of lots) this.lotBuilding(l, S.jaffa, rng);
        break;
      }
      case 'flea': {
        // блошиный рынок: столы со старьём между каменными домами
        this.fill(ix, iy, iw, ih, T_PLAZA);
        for (const y of [iy + 3, iy + 6]) for (let x = ix + 1; x < ix + iw - 1; x += 2) stall(x, y, ['#8d6e63', '#a1887f', '#d4a017', '#6d4c41', '#bcaaa4', '#b08d57']);
        generic(S.jaffa, 3, 0, { x: ix, y: iy, w: iw, h: 2 });
        generic(S.jaffa, 3, 0, { x: ix, y: iy + ih - 2, w: iw, h: 2 });
        break;
      }
      case 'ajami': {
        // каменные виллы у моря, сады с пальмами; мечеть с минаретом
        if (by === this.NB - 2) {
          this.lotBuilding({ x: ix + iw - 3, y: iy, w: 3, h: 3 }, S.jaffa, rng, { extra: { mosque: true } });
          this.addBuilding({ kind: 'circle', cx: (ix + iw - 0.5) * TILE, cy: (iy + 0.5) * TILE, r: 15, h0: 0, h1: 170, roof: '#e7cf9c', wall: '#d6bb85', items: [], floors: 99, style: 'jaffa' });
          generic(S.jaffa, 3, 0.3, { x: ix, y: iy, w: iw - 3, h: 3 });
          generic(S.jaffa, 3, 0.3, { x: ix, y: iy + 3, w: iw, h: ih - 3 });
        } else generic(S.jaffa, 3, 0.35);
        break;
      }
      case 'jaffaport': {
        // старая гавань: причалы вокруг воды, склады и рыбный рынок
        this.fill(ix, iy, iw, ih, T_DECK);
        this.fill(ix + 1, iy + 3, iw - 2, ih - 6, T_RIVER);
        generic(S.warehouse, 3, 0.2, { x: ix, y: iy, w: iw, h: 2 });
        generic(S.warehouse, 3, 0.2, { x: ix, y: iy + ih - 2, w: iw, h: 2 });
        for (let x = ix; x < ix + iw; x += 3) this.decor.push({ k: 'palm', x: x * TILE + 32, y: (iy + 2) * TILE + 40, h: 80, r: rng() * TAU });
        break;
      }
      case 'kirya': {
        // военный городок: плац, башня штаба с антеннами, флаги по периметру
        this.fill(ix, iy, iw, ih, T_PLAZA);
        const hq = this.lotBuilding({ x: ix + 3, y: iy + 2, w: 3, h: 3 }, S.tower, rng, { extra: { label: 'KIRYA' } });
        hq.h1 = 270;
        hq.items.push({ t: 'antenna', u: 0.25, v: 0.3 }, { t: 'antenna', u: 0.75, v: 0.6 }, { t: 'dish', u: 0.5, v: 0.2 });
        generic(S.concrete, 3, 0, { x: ix, y: iy + ih - 3, w: 3, h: 2 });
        generic(S.concrete, 3, 0, { x: ix + iw - 3, y: iy + ih - 3, w: 3, h: 2 });
        for (let x = ix; x < ix + iw; x += 2) this.decor.push({ k: 'flag', x: x * TILE + 32, y: iy * TILE + 8, h: 70 });
        break;
      }
      case 'nahalat': {
        // пешеходная улица ярмарки мастеров: прилавки под тентами
        this.fill(ix, iy + 3, iw, 3, T_PLAZA);
        for (let x = ix; x < ix + iw; x += 2) stall(x, iy + 4, ['#ffb74d', '#4fc3f7', '#ce93d8', '#aed581', '#f06292', '#fff176']);
        generic(S.bauhaus, 3, 0.05, { x: ix, y: iy, w: iw, h: 3 });
        generic(S.bauhaus, 3, 0.05, { x: ix, y: iy + 6, w: iw, h: ih - 6 });
        break;
      }
      case 'bursa': {
        // биржа алмазов: стеклянные башни и одна «бриллиантовая»
        this.fill(ix, iy, iw, ih, T_PLAZA);
        for (const l of [{ x: ix, y: iy, w: 3, h: 3 }, { x: ix + iw - 3, y: iy, w: 3, h: 3 }, { x: ix, y: iy + ih - 3, w: 3, h: 3 }]) {
          const b = this.lotBuilding(l, S.tower, rng);
          b.h1 = rng.range(220, 320); b.glass = true;
        }
        const dx = ix + iw - 4, dy = iy + ih - 4;
        this.markSolid(dx, dy, 3, 3);
        const cx = (dx + 1.5) * TILE, cy = (dy + 1.5) * TILE;
        this.addBuilding({ kind: 'poly', pts: [[cx, cy - 92], [cx + 92, cy], [cx, cy + 92], [cx - 92, cy]], h0: 0, h1: 330, roof: '#b4d4e4', wall: '#5f8fa8', items: [], floors: 14, glass: true, style: 'tower' });
        break;
      }
      case 'levinsky': {
        // парк Левински: газон, дорожки крестом, старые фикусы
        this.fill(ix, iy, iw, ih, T_GRASS);
        this.fill(ix, iy + 4, iw, 1, T_PLAZA);
        this.fill(ix + 4, iy, 1, ih, T_PLAZA);
        for (let i = 0; i < 16; i++) this.decor.push({ k: rng() < 0.6 ? 'tree' : 'treeS', x: rng.range(ix, ix + iw) * TILE, y: rng.range(iy, iy + ih) * TILE, h: 40 });
        break;
      }
      case 'hatikva': {
        // Шук а-Тиква: ряды прилавков, по южному краю — дешёвые лавки
        this.fill(ix, iy, iw, ih, T_PLAZA);
        for (let y = iy + 1; y < iy + ih - 3; y += 3) for (let x = ix; x < ix + iw; x++) if (x !== ix + 4) stall(x, y, ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#8ac926', '#ff006e']);
        generic(S.concrete, 3, 0, { x: ix, y: iy + ih - 2, w: iw, h: 2 });
        break;
      }
      case 'rgshops': generic([[S.concrete, 3], [S.florentin, 1]], 3, 0.1); sidewalkTrees(0.3); break;
      case 'shikun': generic(S.concrete, 5, 0.3); break;
      case 'south': generic([[S.concrete, 3], [S.florentin, 2]], 3, 0.1); break;
      case 'jaffa': generic(S.jaffa, 3, 0.1); break;
      case 'ramatgan': generic([[S.tower, 2], [S.concrete, 3]], 4, 0.15); sidewalkTrees(0.3); break;
      case 'north': generic(S.bauhaus, 3, 0.15); sidewalkTrees(0.6); break;
      case 'center': generic(S.bauhaus, 3, 0.12); sidewalkTrees(0.5); break;
      case 'nevetzedek': generic(S.nevetzedek, 2, 0.15); break;
      case 'florentin': generic(S.florentin, 3, 0.12); break;
      default: generic(S.concrete, 3, 0.18); break;
    }
  },

  indexBuildings() {
    const cw = Math.ceil(this.W / CHUNK), ch = Math.ceil(this.H / CHUNK);
    this.bgrid = [];
    for (let i = 0; i < cw * ch; i++) this.bgrid.push([]);
    for (const b of this.buildings) {
      if (b.kind === 'circle') { b.pts = []; for (let i = 0; i < 20; i++) b.pts.push([b.cx + Math.cos(i / 20 * TAU) * b.r, b.cy + Math.sin(i / 20 * TAU) * b.r]); }
      else if (b.kind === 'rect') b.pts = [[b.x, b.y], [b.x + b.w, b.y], [b.x + b.w, b.y + b.h], [b.x, b.y + b.h]];
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const p of b.pts) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); }
      b.bb = { x0, y0, x1, y1 };
      b.cxm = (x0 + x1) / 2; b.cym = (y0 + y1) / 2;
      const cx = clamp(Math.floor(b.cxm / TILE / CHUNK), 0, cw - 1), cy = clamp(Math.floor(b.cym / TILE / CHUNK), 0, ch - 1);
      this.bgrid[cy * cw + cx].push(b);
    }
    this.dgrid = [];
    this.lgrid = [];
    for (let i = 0; i < cw * ch; i++) { this.dgrid.push([]); this.lgrid.push([]); }
    for (const d of this.decor) {
      const cx = clamp(Math.floor(d.x / TILE / CHUNK), 0, cw - 1), cy = clamp(Math.floor(d.y / TILE / CHUNK), 0, ch - 1);
      (d.low ? this.lgrid : this.dgrid)[cy * cw + cx].push(d);
    }
  },

  // Ключевые точки города для миссий и сервисов
  definePlaces() {
    const side = (bx, by, where, off = 0) => {
      const r = this.blockRect(bx, by);
      const mx = Math.floor((r.x0 + r.x1) / 2) + off, my = Math.floor((r.y0 + r.y1) / 2) + off;
      if (where === 'S') return this.tc(mx, r.y1);
      if (where === 'N') return this.tc(mx, r.y0);
      if (where === 'W') return this.tc(r.x0, my);
      return this.tc(r.x1, my);
    };
    const P = this.places;
    this.side = side;
    P.start = { x: 6.5 * TILE, y: 52.5 * TILE }; // пляж Гордон
    P.shuk = side(1, 4, 'N');
    P.jaffaClock = this.tc(this.blockRect(1, 7).x0 + 4, this.blockRect(1, 7).y0 + 4); // площадь перед башней
    P.florentin = side(3, 5, 'N');
    P.florentinCar = this.tc(52, this.HR[6] + 1); // на улице у Флорентина
    P.nevetzedek = side(1, 5, 'E');
    P.azrieli = side(6, 2, 'S');
    P.beach = { x: 6.3 * TILE, y: 34 * TILE };
    P.port = side(0, 0, 'S', 1);
    P.portGarage = this.tc(this.blockRect(0, 0).x0 + 2, this.blockRect(0, 0).y1 - 1);
    P.hospital = side(6, 3, 'S');
    P.police = side(6, 4, 'S');
    P.paint = this.tc(this.blockRect(4, 6).x0 + 5, this.blockRect(4, 6).y0 + 4);
    P.uzi = { x: 6.5 * TILE, y: 28 * TILE };
    P.pistol = side(3, 6, 'N', 2);
    // Жизнь репатрианта
    P.flat = side(3, 5, 'W');
    P.klita = side(2, 1, 'S');
    P.ulpan = side(3, 3, 'N');
    P.bank = side(1, 3, 'E');
    // Рестораны для доставки «Шмоне-Бис»
    P.restaurants = [
      { name: 'Фалафель «Ицик»', dish: 'фалафель в пите', p: side(1, 4, 'S') },
      { name: 'Шаварма «Мизрахи»', dish: 'шаварму в лафе', p: side(2, 5, 'E') },
      { name: 'Хумусия «Абу-Сами»', dish: 'хумус с фулем', p: side(1, 8, 'E') },
      { name: 'Пицца «Наполи»', dish: 'пиццу с цфатской брынзой', p: side(1, 2, 'S') },
      { name: 'Суши «Сакура-Тель-Авив»', dish: 'суши с бататом', p: side(3, 0, 'S') },
      { name: 'Бургер «Сарона»', dish: 'бургер с шакшукой', p: side(5, 2, 'N') },
      { name: 'Гастроном «Берёзка»', dish: 'пельмени и селёдку', p: side(8, 1, 'S') },
      { name: 'Сабих «Ирак»', dish: 'сабих с амбой', p: side(2, 4, 'W') },
      { name: 'Эфиопский ресторан «Лалибела»', dish: 'инджеру с тибсом', p: side(5, 6, 'E') },
      { name: 'Хачапури «Тбилиси»', dish: 'хачапури по-аджарски', p: side(8, 4, 'S') },
      { name: 'Рыбный ресторан «Ха-Намаль»', dish: 'жареную барабульку', p: side(0, 7, 'E') },
    ];
    // Фракции — каждая в своём районе
    P.ruHQ = side(8, 2, 'W');
    P.arHQ = side(2, 8, 'N');
    P.lionsHQ = side(7, 6, 'N');
    P.luxCar = side(3, 8, 'N', -2);
    P.iranMeet = side(5, 2, 'E');
    P.iranSafe = side(1, 0, 'S');
    P.shabak = side(3, 1, 'S');
    // Оружие: легальный магазин во Флорентине и склад «без лишних вопросов» в порту
    P.gunShop = side(3, 6, 'N', -2);
    P.blackMarket = side(0, 0, 'E');
    // Телефоны-автоматы — у каждого свой «заказчик»
    P.phone1 = side(1, 4, 'E');
    P.phone2 = side(2, 3, 'S');
    P.phoneFlat = side(3, 5, 'W', 2);
    P.phoneRu = side(8, 2, 'W', 2);
    P.phoneAr = side(2, 8, 'N', 2);
    P.phoneLions = side(7, 6, 'N', 2);

    // Вывески на крышах
    this.labelNear(P.flat, { text: 'ФЛОРЕНТИН 12', sub: 'дира', bg: '#5d4037', fg: '#ffe0b2' });
    this.labelNear(P.klita, { text: 'משרד הקליטה', sub: 'Мисрад а-Клита', bg: '#1565c0', fg: '#fff' });
    this.labelNear(P.ulpan, { text: 'אולפן', sub: 'Ульпан «Алеф»', bg: '#00897b', fg: '#fff' });
    this.labelNear(P.bank, { text: 'בנק', sub: 'Банк', bg: '#283593', fg: '#fff' });
    this.labelNear(P.ruHQ, { text: 'РЕСТОРАН «ОДЕССА»', sub: '', bg: '#b71c1c', fg: '#ffd54f' });
    this.labelNear(P.arHQ, { text: 'מוסך אל-בחר', sub: 'гараж Аль-Бахар', bg: '#eeeeee', fg: '#212121' });
    this.labelNear(P.lionsHQ, { text: 'GONDAR GARAGE', sub: 'студия и мастерская', bg: '#1b7f3a', fg: '#f2c230' });
    this.labelNear(P.gunShop, { text: 'חנות נשק', sub: 'Оружие «Шломо и сыновья»', bg: '#263238', fg: '#ffca28' });
    this.labelNear(P.blackMarket, { text: 'מחסן', sub: 'склад Рафи', bg: '#4e342e', fg: '#d7ccc8' });
    // приметы районов: Рамат-Ган «по-русски», Яффо, юг
    const sign = (bx, by, where, off, text, sub, bg, fg) => this.labelNear(side(bx, by, where, off), { text, sub, bg, fg });
    sign(8, 1, 'S', 0, 'ГАСТРОНОМ «БЕРЁЗКА»', 'пельмени · селёдка · квас', '#2e7d32', '#fff');
    sign(9, 2, 'W', 0, 'БАНЯ НА БЯЛИКА', 'с веником', '#6d4c41', '#ffe0b2');
    sign(7, 4, 'N', 0, 'КЛУБ «МАТРЁШКА»', 'живая музыка', '#880e4f', '#ffd54f');
    sign(9, 4, 'W', 0, 'КНИГИ · DVD · SIM', 'всё по-русски', '#1565c0', '#fff');
    sign(7, 0, 'S', 0, 'הבורסה', 'Биржа алмазов', '#37474f', '#b3e5fc');
    sign(6, 1, 'S', 0, 'הקריה', 'Кирья — штаб', '#33691e', '#fff');
    sign(1, 8, 'S', 0, 'מאפיית יפו', 'пекарня · бейгале', '#bf6c2f', '#fff3e0');
    sign(0, 8, 'E', 0, 'מסגד', 'мечеть Аджами', '#00695c', '#fff');
    sign(2, 7, 'S', 0, 'שוק הפשפשים', 'блошиный рынок', '#5d4037', '#ffd54f');
    sign(0, 7, 'E', 0, 'נמל יפו', 'рыбный рынок', '#0277bd', '#fff');
    sign(5, 6, 'E', 0, 'LALIBELA', 'эфиопская кухня', '#2e7d32', '#fdd835');
    sign(6, 5, 'S', 0, 'התחנה המרכזית', 'Центральная автостанция', '#424242', '#fff');
    sign(8, 7, 'N', 0, 'שוק התקווה', 'Шук а-Тиква', '#c62828', '#fff');
    sign(2, 4, 'N', 0, 'נחלת בנימין', 'ярмарка мастеров', '#6a1b9a', '#fff');
    for (const r of P.restaurants) this.labelNear(r.p, { text: r.name, sub: '', bg: '#ff6a1a', fg: '#fff' });
    const SIGNS = [
      ['פלאפל', '#2e7d32'], ['שווארמה', '#c62828'], ['מכולת', '#1565c0'], ['קיוסק', '#6a1b9a'],
      ['МАГАЗИН «БЕРЁЗКА»', '#37474f'], ['פיצה', '#e65100'], ['בורקס', '#8d6e63'], ['מספרה', '#ad1457'],
      ['סלולר', '#0277bd'], ['ГАСТРОНОМ', '#4e342e'], ['חומוס', '#827717'], ['קפה', '#5d4037'],
    ];
    const srng = makeRng(42);
    for (const b of this.buildings) {
      if (b.kind !== 'rect' || b.sign || b.h1 > 90 || b.w < 90 || b.h < 90 || b.glass) continue;
      if (srng() < 0.16) { const sg = srng.pick(SIGNS); b.sign = { text: sg[0], bg: sg[1], fg: '#fff' }; }
    }
  },

  // Здание рядом с точкой
  labelNear(p, sign) {
    const tx = Math.floor(p.x / TILE), ty = Math.floor(p.y / TILE);
    let best = -1, bd = 99;
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
      if (!this.inside(tx + dx, ty + dy)) continue;
      const id = this.bid[this.idx(tx + dx, ty + dy)];
      const d = Math.abs(dx) + Math.abs(dy);
      if (id >= 0 && d < bd && this.buildings[id].kind === 'rect') { bd = d; best = id; }
    }
    if (best >= 0) this.buildings[best].sign = sign;
  },

  // Квартал под точкой (дороги относятся к кварталу справа/снизу)
  blockAt(px, py) {
    const x = Math.floor(px / TILE), y = Math.floor(py / TILE);
    let bx = 0, by = 0;
    for (let i = 0; i < this.NB; i++) if (x >= this.V[i]) bx = i;
    for (let i = 0; i < this.NB; i++) if (y >= this.HR[i]) by = i;
    return { bx, by };
  },

  blockKeyAt(px, py) {
    const x = Math.floor(px / TILE), y = Math.floor(py / TILE);
    if (x < 8 || y < 6) return null;
    const { bx, by } = this.blockAt(px, py);
    return this.LAYOUT[by][bx];
  },

  // Чья это территория
  factionAt(px, py) {
    const k = this.blockKeyAt(px, py);
    for (const f in FACTIONS) if (FACTIONS[f].districts.includes(k)) return f;
    return null;
  },

  // Уличные мелочи, по которым узнаётся израильский город
  decorateStreets(rng) {
    this.lamps = [];
    const isX = (x, y) => this.inside(x, y) && this.laneV[this.idx(x, y)] >= 0 && this.laneH[this.idx(x, y)] >= 0;
    for (let ty = 0; ty < this.H; ty++) for (let tx = 0; tx < this.W; tx++) {
      if (this.t(tx, ty) !== T_WALK) continue;
      // с какой стороны дорога
      let side = -1;
      for (let d = 0; d < 4; d++) if (this.isRoad(tx + DIRS[d].x, ty + DIRS[d].y)) { side = d; break; }
      if (side < 0) continue;
      const D = DIRS[side];
      const cx = tx * TILE + 32, cy = ty * TILE + 32;
      const ex = cx + D.x * 26, ey = cy + D.y * 26; // у бордюра
      // бордюр: красно-белый у перекрёстков, сине-белый — платная парковка
      const nearX = isX(tx + D.x + D.y, ty + D.y + D.x) || isX(tx + D.x - D.y, ty + D.y - D.x) || isX(tx + D.x, ty + D.y);
      const i = this.idx(tx, ty);
      this.curb = this.curb || new Uint8Array(this.W * this.H);
      this.curb[i] = nearX ? 1 : ((tx * 3 + ty * 5) % 7 < 3 ? 2 : 0);
      if ((tx + ty) % 4 === 0 && !nearX) {
        const l = { k: 'lamp', x: ex, y: ey, h: 55, d: side };
        this.decor.push(l); this.lamps.push(l);
        continue;
      }
      const r = rng();
      const inX = cx - D.x * 6, inY = cy - D.y * 6;
      if (r < 0.04) this.decor.push({ k: 'cage', x: inX, y: inY, h: 0, low: true });
      else if (r < 0.085) this.decor.push({ k: 'bin', x: inX, y: inY, h: 0, low: true, a: side % 2 ? 0 : Math.PI / 2 });
      else if (r < 0.10 && !nearX) this.decor.push({ k: 'busstop', x: cx + D.x * 8, y: cy + D.y * 8, h: 0, low: true, d: side });
      else if (r < 0.12) this.decor.push({ k: 'bench', x: inX, y: inY, h: 0, low: true, d: side });
      else if (r < 0.14) this.decor.push({ k: 'bougainvillea', x: cx - D.x * 18, y: cy - D.y * 18, h: 8, r: rng() * TAU });
      else if (r < 0.15) this.decor.push({ k: 'flag', x: ex, y: ey, h: 70 });
      else if (r < 0.16 && !nearX) this.decor.push({ k: 'bikes', x: inX, y: inY, h: 0, low: true, d: side });
      else if (r < 0.18) this.decor.push({ k: 'scooterE', x: inX + rng.range(-10, 10), y: inY + rng.range(-10, 10), h: 0, low: true, a: rng() * TAU });
    }
  },

  districtAt(px, py) {
    const x = Math.floor(px / TILE), y = Math.floor(py / TILE);
    if (x < 5) return DISTRICTS.sea;
    if (x < 8) return y < this.JAFFA_SEA ? DISTRICTS.beach : DISTRICTS.ajami;
    if (y < 6) return DISTRICTS.park;
    const { bx, by } = this.blockAt(px, py);
    return DISTRICTS[this.LAYOUT[by][bx]];
  },

  streetAt(px, py) {
    const x = Math.floor(px / TILE), y = Math.floor(py / TILE);
    if (this.t(x, y) !== T_ROAD) return null;
    const i = this.idx(x, y);
    if (this.laneV[i] >= 0 && this.laneH[i] < 0) return this.VNAMES[this.V.indexOf(x - (this.laneV[i] === 0 ? 1 : 0))];
    if (this.laneH[i] >= 0 && this.laneV[i] < 0) return this.HNAMES[this.HR.indexOf(y - (this.laneH[i] === 1 ? 1 : 0))];
    return null;
  },

  // Разрешённые направления движения для трафика в клетке
  laneDirs(x, y) {
    if (!this.isRoad(x, y)) return [];
    const i = this.idx(x, y);
    const out = [];
    for (const d of [this.laneV[i], this.laneH[i]]) {
      if (d < 0) continue;
      if (this.isRoad(x + DIRS[d].x, y + DIRS[d].y)) out.push(d);
    }
    return out;
  },

  // ---------- Поиск пути по дорогам (BFS) для полиции ----------
  bfsBuf: null,
  pathTo(sx, sy, gx, gy, maxNodes = 12000) {
    const W = this.W, N = W * this.H;
    if (!this.bfsBuf) { this.bfsBuf = { prev: new Int32Array(N), q: new Int32Array(N), seen: new Uint32Array(N), stamp: 0 }; }
    const B = this.bfsBuf;
    B.stamp++;
    const passable = (x, y) => { const tt = this.t(x, y); return tt === T_ROAD || tt === T_PARKING || tt === T_PLAZA; };
    if (!passable(sx, sy)) { const s = this.nearestRoad(sx, sy); if (!s) return null; sx = s.x; sy = s.y; }
    if (!passable(gx, gy)) { const g = this.nearestRoad(gx, gy); if (!g) return null; gx = g.x; gy = g.y; }
    const start = sy * W + sx, goal = gy * W + gx;
    let qh = 0, qt = 0;
    B.q[qt++] = start; B.seen[start] = B.stamp; B.prev[start] = -1;
    let found = false, n = 0;
    while (qh < qt && n < maxNodes) {
      const c = B.q[qh++]; n++;
      if (c === goal) { found = true; break; }
      const cx = c % W, cy = (c / W) | 0;
      for (let d = 0; d < 4; d++) {
        const nx = cx + DIRS[d].x, ny = cy + DIRS[d].y;
        if (!this.inside(nx, ny) || !passable(nx, ny)) continue;
        const ni = ny * W + nx;
        if (B.seen[ni] === B.stamp) continue;
        B.seen[ni] = B.stamp; B.prev[ni] = c; B.q[qt++] = ni;
      }
    }
    if (!found) return null;
    const path = [];
    for (let c = goal; c !== -1; c = B.prev[c]) path.push({ x: c % W, y: (c / W) | 0 });
    path.reverse();
    return path;
  },

  nearestRoad(x, y) {
    for (let r = 1; r < 8; r++) {
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
        if (this.isRoad(x + dx, y + dy)) return { x: x + dx, y: y + dy };
      }
    }
    return null;
  },

  // Прямая видимость (для полиции) — шагаем по клеткам
  lineOfSight(ax, ay, bx, by) {
    const d = dist(ax, ay, bx, by);
    const steps = Math.ceil(d / 24);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const tt = this.t(Math.floor(lerp(ax, bx, t) / TILE), Math.floor(lerp(ay, by, t) / TILE));
      if (tt === T_BUILD) return false;
    }
    return true;
  },

  // ---------- Отрисовка земли ----------
  getChunk(cx, cy) {
    const key = cy * 100 + cx;
    let c = this.chunkCache.get(key);
    if (c) { this.chunkCache.delete(key); this.chunkCache.set(key, c); return c; }
    c = document.createElement('canvas');
    c.width = c.height = CHUNK * TILE;
    const g = c.getContext('2d');
    g.translate(-cx * CHUNK * TILE, -cy * CHUNK * TILE);
    for (let pass = 0; pass < 2; pass++) {
      for (let ty = cy * CHUNK; ty < (cy + 1) * CHUNK; ty++) {
        for (let tx = cx * CHUNK; tx < (cx + 1) * CHUNK; tx++) {
          if (pass === 0) this.drawTile(g, tx, ty); else this.drawMarkings(g, tx, ty);
        }
      }
    }
    this.chunkCache.set(key, c);
    if (this.chunkCache.size > 48) this.chunkCache.delete(this.chunkCache.keys().next().value);
    return c;
  },

  // Текстура на клетку: сгенерированная (assets/gen/textures) или процедурная
  texTile(g, name, tx, ty, px, py) {
    const img = Tex.get(name);
    const span = img.span;
    const sub = img.width / span;
    g.drawImage(img, (((tx % span) + span) % span) * sub, (((ty % span) + span) % span) * sub, sub, sub, px, py, TILE, TILE);
  },

  drawTile(g, tx, ty) {
    const px = tx * TILE, py = ty * TILE;
    const tt = this.t(tx, ty);
    const r = makeRng(tx * 7919 + ty * 104729);
    switch (tt) {
      case T_SEA: {
        this.texTile(g, 'water', tx, ty, px, py);
        const deep = 1 - clamp(tx / 5, 0, 1);
        g.fillStyle = `rgba(10,40,90,${deep * 0.35})`; g.fillRect(px, py, TILE, TILE);
        if (this.t(tx + 1, ty) === T_SAND) { g.fillStyle = 'rgba(120,210,220,0.35)'; g.fillRect(px + 40, py, 24, TILE); }
        break;
      }
      case T_SAND: {
        this.texTile(g, 'sand', tx, ty, px, py);
        if (r() < 0.15) { g.fillStyle = 'rgba(0,0,0,0.15)'; g.beginPath(); g.arc(px + r() * 60, py + r() * 60, 2, 0, TAU); g.fill(); }
        break;
      }
      case T_RIVER: this.texTile(g, 'water', tx, ty, px, py); g.fillStyle = 'rgba(40,90,60,0.25)'; g.fillRect(px, py, TILE, TILE); break;
      case T_GRASS: this.texTile(g, 'grass', tx, ty, px, py); break;
      case T_BOUND: this.texTile(g, 'scrub', tx, ty, px, py); break;
      case T_ROAD: {
        this.texTile(g, (tx === 80 || tx === 81) ? 'asphaltDark' : 'asphalt', tx, ty, px, py);
        const v = r();
        if (v < 0.06) {
          // люк
          g.fillStyle = '#2a2a2c'; g.beginPath(); g.arc(px + 20 + r() * 24, py + 20 + r() * 24, 9, 0, TAU); g.fill();
          g.strokeStyle = '#555'; g.lineWidth = 1.5; g.stroke();
        } else if (v < 0.16) {
          // трещины
          g.strokeStyle = 'rgba(15,15,15,0.55)'; g.lineWidth = 1;
          let x = px + r() * 64, y = py + r() * 64;
          g.beginPath(); g.moveTo(x, y);
          for (let i = 0; i < 4; i++) { x += r.range(-12, 12); y += r.range(-12, 12); g.lineTo(x, y); }
          g.stroke();
        } else if (v < 0.2) {
          g.fillStyle = 'rgba(20,20,22,0.35)'; g.fillRect(px + r() * 30, py + r() * 30, 20 + r() * 20, 14 + r() * 16); // заплатка
        } else if (v < 0.24) {
          g.fillStyle = 'rgba(0,0,0,0.25)'; g.beginPath(); g.ellipse(px + 32, py + 32, 10, 6, r() * 3, 0, TAU); g.fill(); // масляное пятно
        }
        break;
      }
      case T_WALK: this.texTile(g, 'sidewalk', tx, ty, px, py); break;
      case T_PLAZA: {
        const jaffa = ty > 78 && tx < 44;
        this.texTile(g, jaffa ? 'jstone' : 'plaza', tx, ty, px, py);
        break;
      }
      case T_DECK: this.texTile(g, 'deck', tx, ty, px, py); break;
      case T_PARKING: {
        this.texTile(g, 'asphalt', tx, ty, px, py);
        g.fillStyle = 'rgba(255,255,255,0.55)';
        for (let i = 0; i < TILE; i += 32) g.fillRect(px + i, py + 4, 2, 24);
        break;
      }
      case T_BUILD: this.texTile(g, 'sidewalk', tx, ty, px, py); g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(px, py, TILE, TILE); break;
    }
  },

  drawMarkings(g, tx, ty) {
    const tt = this.t(tx, ty);
    const px = tx * TILE, py = ty * TILE;
    if (tt === T_WALK) {
      // бордюр со стороны дороги: красно-белый, сине-белый или серый
      const kind = this.curb ? this.curb[this.idx(tx, ty)] : 0;
      const c2 = kind === 1 ? '#d32f2f' : kind === 2 ? '#1e63c4' : '#8f897c';
      const seg = (x, y, w, h, horiz) => {
        const n = horiz ? w : h;
        for (let i = 0; i < n; i += 10) {
          g.fillStyle = (Math.floor(i / 10) % 2 && kind) ? '#f2f2f2' : c2;
          if (horiz) g.fillRect(x + i, y, Math.min(10, n - i), h); else g.fillRect(x, y + i, w, Math.min(10, n - i));
        }
      };
      if (this.isRoad(tx, ty - 1)) seg(px, py, TILE, 4, true);
      if (this.isRoad(tx, ty + 1)) seg(px, py + TILE - 4, TILE, 4, true);
      if (this.isRoad(tx - 1, ty)) seg(px, py, 4, TILE, false);
      if (this.isRoad(tx + 1, ty)) seg(px + TILE - 4, py, 4, TILE, false);
      return;
    }
    if (tt !== T_ROAD) return;
    const i = this.idx(tx, ty);
    const lv = this.laneV[i], lh = this.laneH[i];
    const hw = tx === 80 || tx === 81;
    if (lv === 2 && lh < 0) {
      g.fillStyle = hw ? '#f2c94c' : '#eeeeee';
      if (hw) g.fillRect(px + TILE - 3, py, 6, TILE);
      else for (let y = 0; y < TILE; y += 32) g.fillRect(px + TILE - 2, py + y + 4, 4, 18);
      if (hw) { g.fillStyle = '#ddd'; g.fillRect(px + 2, py, 3, TILE); g.fillRect(px + TILE * 2 - 5, py, 3, TILE); }
      this.zebra(g, tx, ty, true);
    }
    if (lh === 3 && lv < 0) {
      g.fillStyle = '#eeeeee';
      for (let x = 0; x < TILE; x += 32) g.fillRect(px + x + 4, py + TILE - 2, 18, 4);
      this.zebra(g, tx, ty, false);
    }
    if (lv === 0 && lh < 0) this.zebra(g, tx, ty, true);
    if (lh === 1 && lv < 0) this.zebra(g, tx, ty, false);
    // стрелки полосы за две клетки до перекрёстка
    const d = lv >= 0 && lh < 0 ? lv : lh >= 0 && lv < 0 ? lh : -1;
    if (d >= 0) {
      const nx = tx + DIRS[d].x * 2, ny = ty + DIRS[d].y * 2;
      if (this.inside(nx, ny) && this.laneV[this.idx(nx, ny)] >= 0 && this.laneH[this.idx(nx, ny)] >= 0) {
        g.save(); g.translate(px + 32, py + 32); g.rotate(DIR_ANGLE[d]);
        g.fillStyle = 'rgba(240,240,240,0.8)';
        g.fillRect(-3, -2, 6, 18);
        g.beginPath(); g.moveTo(-9, -2); g.lineTo(0, -16); g.lineTo(9, -2); g.fill();
        g.restore();
      }
    }
  },

  // «Зебра» перед перекрёстком
  zebra(g, tx, ty, vertical) {
    const px = tx * TILE, py = ty * TILE;
    const isX = (x, y) => { const j = this.idx(x, y); return this.inside(x, y) && this.laneV[j] >= 0 && this.laneH[j] >= 0; };
    g.fillStyle = 'rgba(240,240,240,0.85)';
    if (vertical) {
      if (isX(tx, ty + 1)) for (let x = 4; x < TILE; x += 12) g.fillRect(px + x, py + TILE - 26, 6, 22);
      if (isX(tx, ty - 1)) for (let x = 4; x < TILE; x += 12) g.fillRect(px + x, py + 4, 6, 22);
    } else {
      if (isX(tx + 1, ty)) for (let y = 4; y < TILE; y += 12) g.fillRect(px + TILE - 26, py + y, 22, 6);
      if (isX(tx - 1, ty)) for (let y = 4; y < TILE; y += 12) g.fillRect(px + 4, py + y, 22, 6);
    }
  },

  // Анимированный прибой поверх воды
  drawSea(ctx, view, time) {
    const x0 = Math.max(0, Math.floor(view.x0 / TILE)), x1 = Math.min(5, Math.ceil(view.x1 / TILE));
    if (x0 >= x1) return;
    const y0 = Math.floor(view.y0 / TILE), y1 = Math.ceil(view.y1 / TILE);
    ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let ty = y0; ty <= y1; ty++) for (let tx = x0; tx < x1; tx++) {
      const ph = (tx * 13 + ty * 7) % 10;
      const ox = ((time * 12 + ph * 6) % 64);
      const y = ty * TILE + ph * 6;
      ctx.moveTo(tx * TILE + ox, y); ctx.quadraticCurveTo(tx * TILE + ox + 8, y - 3, tx * TILE + ox + 16, y);
    }
    ctx.stroke();
    // пена у берега
    const fx = 5 * TILE;
    if (fx > view.x0 - 20 && fx < view.x1 + 20) {
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      for (let y = Math.max(0, y0 * TILE); y < Math.min(this.JAFFA_SEA * TILE, y1 * TILE); y += 6) {
        const w = 6 + Math.sin(y * 0.05 + time * 1.8) * 5 + Math.sin(y * 0.13 - time) * 3;
        ctx.fillRect(fx - w, y, w + 1, 6);
      }
    }
  },

  drawGround(ctx, view) {
    const cs = CHUNK * TILE;
    const cx0 = Math.max(0, Math.floor(view.x0 / cs)), cy0 = Math.max(0, Math.floor(view.y0 / cs));
    const cx1 = Math.min(Math.ceil(this.W / CHUNK) - 1, Math.floor(view.x1 / cs));
    const cy1 = Math.min(Math.ceil(this.H / CHUNK) - 1, Math.floor(view.y1 / cs));
    for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
      ctx.drawImage(this.getChunk(cx, cy), cx * cs, cy * cs);
    }
  },

  // ---------- Псевдо-3D здания и высокие объекты ----------
  drawTall(ctx, view, cam, time) {
    const cw = Math.ceil(this.W / CHUNK);
    const m = 400;
    const cs = CHUNK * TILE;
    const cx0 = Math.max(0, Math.floor((view.x0 - m) / cs)), cy0 = Math.max(0, Math.floor((view.y0 - m) / cs));
    const cx1 = Math.min(cw - 1, Math.floor((view.x1 + m) / cs)), cy1 = Math.min(Math.ceil(this.H / CHUNK) - 1, Math.floor((view.y1 + m) / cs));
    const list = [];
    for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
      for (const b of this.bgrid[cy * cw + cx]) list.push(b);
      for (const d of this.dgrid[cy * cw + cx]) list.push(d);
    }
    // ниже — раньше; при равной высоте дальние от центра — раньше
    list.sort((a, b) => {
      const ha = a.h1 !== undefined ? a.h1 : a.h, hb = b.h1 !== undefined ? b.h1 : b.h;
      return ha - hb;
    });
    for (const o of list) {
      if (o.h1 !== undefined) this.drawBuilding(ctx, o, cam, view);
      else this.drawDecor(ctx, o, cam, time);
    }
  },

  drawBuilding(ctx, b, cam, view) {
    const s1 = 1 + b.h1 * PERSPECTIVE, s0 = 1 + b.h0 * PERSPECTIVE;
    // отсечение по видимой области с учётом наклона
    const rx0 = cam.x + (b.bb.x0 - cam.x) * s1, rx1 = cam.x + (b.bb.x1 - cam.x) * s1;
    const ry0 = cam.y + (b.bb.y0 - cam.y) * s1, ry1 = cam.y + (b.bb.y1 - cam.y) * s1;
    if (Math.max(rx1, b.bb.x1) < view.x0 || Math.min(rx0, b.bb.x0) > view.x1 || Math.max(ry1, b.bb.y1) < view.y0 || Math.min(ry0, b.bb.y0) > view.y1) return;
    const P0 = b.pts.map((p) => [cam.x + (p[0] - cam.x) * s0, cam.y + (p[1] - cam.y) * s0]);
    const P1 = b.pts.map((p) => [cam.x + (p[0] - cam.x) * s1, cam.y + (p[1] - cam.y) * s1]);
    const n = b.pts.length;
    const night = Game.night || 0;
    // стены
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const a = b.pts[i], c = b.pts[j];
      const ex = c[0] - a[0], ey = c[1] - a[1];
      const nx = ey, ny = -ex;
      const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2;
      if ((cam.x - mx) * nx + (cam.y - my) * ny <= 0) continue;
      const len = Math.hypot(nx, ny) || 1;
      const light = 0.62 + 0.3 * ((-nx / len) * 0.6 + (-ny / len) * 0.8);
      ctx.fillStyle = shade(b.wall, light);
      ctx.beginPath();
      ctx.moveTo(P0[i][0], P0[i][1]); ctx.lineTo(P0[j][0], P0[j][1]);
      ctx.lineTo(P1[j][0], P1[j][1]); ctx.lineTo(P1[i][0], P1[i][1]);
      ctx.closePath(); ctx.fill();
      if (b.stone) {
        // кладка из иерусалимского камня
        ctx.strokeStyle = 'rgba(90,60,20,0.18)'; ctx.lineWidth = 1; ctx.beginPath();
        for (let h = b.h0 + 6; h < b.h1; h += 6) {
          const s = 1 + h * PERSPECTIVE;
          ctx.moveTo(cam.x + (a[0] - cam.x) * s, cam.y + (a[1] - cam.y) * s);
          ctx.lineTo(cam.x + (c[0] - cam.x) * s, cam.y + (c[1] - cam.y) * s);
        }
        ctx.stroke();
      }
      // этажи: окна пунктиром, балконы, ставни
      const fh = b.floors || 24;
      if (b.h1 - b.h0 > fh * 1.3) {
        const wlen = Math.hypot(ex, ey);
        for (let h = b.h0 + fh * 0.55; h < b.h1 - 6; h += fh) {
          const s = 1 + h * PERSPECTIVE;
          const x1 = cam.x + (a[0] - cam.x) * s, y1 = cam.y + (a[1] - cam.y) * s;
          const x2 = cam.x + (c[0] - cam.x) * s, y2 = cam.y + (c[1] - cam.y) * s;
          const thick = Math.max(2, Math.min(9, Math.hypot(x2 - x1, y2 - y1) / wlen * fh * 0.4 * (Math.hypot(P1[i][0] - P0[i][0], P1[i][1] - P0[i][1]) / ((b.h1 - b.h0) || 1))));
          ctx.lineWidth = thick;
          ctx.setLineDash(b.glass ? [] : [9, 7]);
          ctx.strokeStyle = b.glass ? 'rgba(170,215,240,0.45)' : 'rgba(45,60,75,0.65)';
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          if (night > 0.25 && !b.glass && (b.id + Math.floor(h)) % 3 !== 0) {
            (this.nightWin || (this.nightWin = [])).push([x1, y1, x2, y2, thick, (b.id * 7 + h) % 16]);
          }
          if (b.balconies) {
            const hb = h - fh * 0.45, sb = 1 + hb * PERSPECTIVE;
            ctx.setLineDash([]);
            ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cam.x + (a[0] - cam.x) * sb, cam.y + (a[1] - cam.y) * sb);
            ctx.lineTo(cam.x + (c[0] - cam.x) * sb, cam.y + (c[1] - cam.y) * sb);
            ctx.stroke();
          }
        }
        ctx.setLineDash([]);
      }
    }
    // крыша
    ctx.beginPath();
    ctx.moveTo(P1[0][0], P1[0][1]);
    for (let i = 1; i < n; i++) ctx.lineTo(P1[i][0], P1[i][1]);
    ctx.closePath();
    ctx.fillStyle = b.roof; ctx.fill();
    if (b.texture && !b.glass) {
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = Tex.pattern(ctx, b.texture);
      ctx.fill();
      ctx.restore();
    }
    if (b.glass) {
      const gr = ctx.createLinearGradient(P1[0][0], P1[0][1], P1[2 % n][0], P1[2 % n][1]);
      gr.addColorStop(0, 'rgba(255,255,255,0.25)'); gr.addColorStop(1, 'rgba(0,30,60,0.15)');
      ctx.fillStyle = gr; ctx.fill();
    }
    ctx.strokeStyle = shade(b.roof, 0.7); ctx.lineWidth = 3; ctx.stroke();
    if (b.parapet && b.kind === 'rect') {
      // бортик по краю крыши с тенью внутрь
      const k = 5 * s1;
      const x0 = P1[0][0], y0 = P1[0][1], x1 = P1[2][0], y1 = P1[2][1];
      ctx.strokeStyle = shade(b.roof, 1.08); ctx.lineWidth = k;
      ctx.strokeRect(x0 + k / 2, y0 + k / 2, x1 - x0 - k, y1 - y0 - k);
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(x0 + k, y0 + k, x1 - x0 - 2 * k, 3 * s1);
      ctx.fillRect(x0 + k, y0 + k, 3 * s1, y1 - y0 - 2 * k);
    }
    if (b.items.length || b.label || b.sign) this.drawRoofItems(ctx, b, P1, s1, cam);
  },

  drawRoofItems(ctx, b, P1, s, cam) {
    const x0 = cam.x + (b.bb.x0 - cam.x) * s, y0 = cam.y + (b.bb.y0 - cam.y) * s;
    const w = (b.bb.x1 - b.bb.x0) * s, h = (b.bb.y1 - b.bb.y0) * s;
    ctx.save();
    ctx.translate(x0, y0);
    for (const it of b.items) {
      const ux = it.u * w, vy = it.v * h;
      const k = s;
      switch (it.t) {
        case 'solar': {
          // солнечный бойлер — «дуд шемеш»: бак и панель
          ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(ux + 3 * k, vy + 3 * k, 22 * k, 16 * k);
          ctx.fillStyle = '#1f3b5c'; ctx.fillRect(ux, vy, 22 * k, 16 * k);
          ctx.strokeStyle = '#9fb7cc'; ctx.lineWidth = 1; ctx.strokeRect(ux, vy, 22 * k, 16 * k);
          ctx.beginPath(); ctx.moveTo(ux + 11 * k, vy); ctx.lineTo(ux + 11 * k, vy + 16 * k); ctx.stroke();
          ctx.fillStyle = '#f2f2ee'; ctx.fillRect(ux - 1 * k, vy - 9 * k, 24 * k, 8 * k);
          ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(ux - 1 * k, vy - 3 * k, 24 * k, 2 * k);
          break;
        }
        case 'tank': ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(ux, vy, 7 * k, 0, TAU); ctx.fill(); ctx.fillStyle = '#444'; ctx.beginPath(); ctx.arc(ux - 2, vy - 2, 3 * k, 0, TAU); ctx.fill(); break;
        case 'ac': ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(ux + 2, vy + 2, 12 * k, 10 * k); ctx.fillStyle = '#e0e0e0'; ctx.fillRect(ux, vy, 12 * k, 10 * k); ctx.fillStyle = '#888'; ctx.beginPath(); ctx.arc(ux + 6 * k, vy + 5 * k, 3.5 * k, 0, TAU); ctx.fill(); break;
        case 'stairs': ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.fillRect(ux + 4 * k, vy + 4 * k, 22 * k, 18 * k); ctx.fillStyle = shade(b.roof, 0.92); ctx.fillRect(ux, vy, 22 * k, 18 * k); ctx.strokeStyle = shade(b.roof, 0.7); ctx.lineWidth = 1.5; ctx.strokeRect(ux, vy, 22 * k, 18 * k); ctx.fillStyle = '#6d4c41'; ctx.fillRect(ux + 7 * k, vy + 16 * k, 8 * k, 2 * k); break;
        case 'antenna': ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ux - 8 * k, vy); ctx.lineTo(ux + 8 * k, vy); ctx.moveTo(ux - 5 * k, vy - 4 * k); ctx.lineTo(ux + 5 * k, vy - 4 * k); ctx.moveTo(ux, vy - 6 * k); ctx.lineTo(ux, vy + 6 * k); ctx.stroke(); break;
        case 'dish': ctx.fillStyle = '#f5f5f5'; ctx.beginPath(); ctx.ellipse(ux, vy, 6 * k, 4.5 * k, 0.5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#999'; ctx.lineWidth = 1; ctx.stroke(); break;
        case 'laundry': {
          ctx.strokeStyle = '#777'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(ux, vy); ctx.lineTo(ux + 40 * k, vy); ctx.moveTo(ux, vy + 8 * k); ctx.lineTo(ux + 40 * k, vy + 8 * k); ctx.stroke();
          for (let i = 0; i < 6; i++) { ctx.fillStyle = it.c[i % 3]; ctx.fillRect(ux + (3 + i * 6) * k, vy + (i % 2 ? 8 : 0) * k, 5 * k, 6 * k); }
          break;
        }
        case 'plants': for (let i = 0; i < 4; i++) { ctx.fillStyle = '#8d5a3b'; ctx.fillRect(ux + i * 9 * k, vy, 7 * k, 7 * k); ctx.fillStyle = i % 2 ? '#43a047' : '#e91e63'; ctx.beginPath(); ctx.arc(ux + (i * 9 + 3.5) * k, vy + 3.5 * k, 4 * k, 0, TAU); ctx.fill(); } break;
        case 'flag': this.drawFlag(ctx, ux, vy, k, Game.time || 0); break;
        case 'pool': ctx.fillStyle = '#4fc3e8'; ctx.fillRect(ux, vy, it.w * w, it.h * h); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(ux, vy, it.w * w, it.h * h); ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(ux + 4, vy + 6, it.w * w - 8, 2); break;
        case 'tiles': break;
        case 'fountain': {
          ctx.fillStyle = '#e6eef2'; ctx.beginPath(); ctx.arc(w / 2, h / 2, w * 0.18, 0, TAU); ctx.fill();
          const tt = performance.now() / 300;
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(w / 2 + Math.cos(tt + i) * w * 0.3, h / 2 + Math.sin(tt + i) * h * 0.3, 3, 0, TAU); ctx.fill(); }
          break;
        }
        case 'clock': {
          ctx.fillStyle = '#efe7d2'; ctx.beginPath(); ctx.arc(w / 2, h / 2, w * 0.3, 0, TAU); ctx.fill();
          ctx.strokeStyle = '#3b2a12'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(w / 2, h / 2); ctx.lineTo(w / 2, h / 2 - w * 0.22); ctx.moveTo(w / 2, h / 2); ctx.lineTo(w / 2 + w * 0.15, h / 2); ctx.stroke();
          break;
        }
      }
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (b.label === 'H') {
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.3, 0, TAU); ctx.stroke();
      ctx.fillStyle = '#e53935'; ctx.font = `bold ${Math.min(w, h) * 0.35}px sans-serif`; ctx.fillText('H', w / 2, h / 2);
    } else if (b.label === 'POLICE') {
      ctx.fillStyle = '#fff'; ctx.font = `bold ${h * 0.22}px sans-serif`; ctx.fillText('משטרה', w / 2, h / 2);
    } else if (b.label === 'PAINT') {
      ctx.fillStyle = '#ffeb3b'; ctx.font = `bold ${h * 0.28}px sans-serif`; ctx.fillText('ПОКРАСКА', w / 2, h / 2);
      ctx.fillStyle = '#e91e63'; ctx.fillRect(w * 0.1, h * 0.75, w * 0.2, h * 0.1); ctx.fillStyle = '#03a9f4'; ctx.fillRect(w * 0.4, h * 0.75, w * 0.2, h * 0.1); ctx.fillStyle = '#8bc34a'; ctx.fillRect(w * 0.7, h * 0.75, w * 0.2, h * 0.1);
    }
    if (b.sign) {
      // вывеска-билборд на крыше
      const sg = b.sign;
      const fs = Math.max(9, Math.min(h * 0.16, 22 * s));
      ctx.font = `bold ${fs}px "Segoe UI", Arial, sans-serif`;
      const tw = Math.min(w * 0.9, ctx.measureText(sg.text).width + 14 * s);
      const sh = fs * (sg.sub ? 2.3 : 1.5);
      const sx = (w - tw) / 2, sy = h * 0.62 - sh / 2;
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(sx + 4 * s, sy + 4 * s, tw, sh);
      ctx.fillStyle = sg.bg; ctx.fillRect(sx, sy, tw, sh);
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5; ctx.strokeRect(sx + 2, sy + 2, tw - 4, sh - 4);
      ctx.fillStyle = sg.fg;
      ctx.fillText(sg.text, w / 2, sy + fs * 0.8, tw - 8);
      if (sg.sub) { ctx.font = `${fs * 0.7}px "Segoe UI", Arial, sans-serif`; ctx.fillText(sg.sub, w / 2, sy + fs * 1.75, tw - 8); }
    }
    ctx.restore();
  },

  drawFlag(ctx, x, y, k, time) {
    // флаг Израиля на шесте
    ctx.fillStyle = '#ddd'; ctx.beginPath(); ctx.arc(x, y, 2 * k, 0, TAU); ctx.fill();
    const wv = Math.sin(time * 4 + x) * 2;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(1, -1, 22, 15 + wv * 0.3);
    ctx.fillStyle = '#1946b4'; ctx.fillRect(1, 1, 22, 2); ctx.fillRect(1, 10 + wv * 0.3, 22, 2);
    ctx.strokeStyle = '#1946b4'; ctx.lineWidth = 0.8;
    const cx = 12, cy = 6.5 + wv * 0.15, r = 3;
    ctx.beginPath(); for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + i * TAU / 3; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } ctx.closePath(); ctx.stroke();
    ctx.beginPath(); for (let i = 0; i < 3; i++) { const a = Math.PI / 2 + i * TAU / 3; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } ctx.closePath(); ctx.stroke();
    ctx.restore();
  },

  // Сгенерированный пропс (assets/gen/props), если есть
  prop(ctx, name, x, y, w, h, a) {
    const im = Assets.gen['props/' + name];
    if (!im) return false;
    ctx.save(); ctx.translate(x, y); if (a) ctx.rotate(a);
    ctx.drawImage(im, -w / 2, -h / 2, w, h);
    ctx.restore();
    return true;
  },

  // Низкие объекты на тротуарах — рисуются до машин и людей
  drawLow(ctx, view, time) {
    const cw = Math.ceil(this.W / CHUNK), cs = CHUNK * TILE;
    const cx0 = Math.max(0, Math.floor((view.x0 - 64) / cs)), cy0 = Math.max(0, Math.floor((view.y0 - 64) / cs));
    const cx1 = Math.min(cw - 1, Math.floor((view.x1 + 64) / cs)), cy1 = Math.min(Math.ceil(this.H / CHUNK) - 1, Math.floor((view.y1 + 64) / cs));
    for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
      for (const d of this.lgrid[cy * cw + cx]) this.drawLowItem(ctx, d, time);
    }
  },

  drawLowItem(ctx, d, time) {
    const rot = d.d !== undefined ? DIR_ANGLE[d.d] : (d.a || 0);
    switch (d.k) {
      case 'cage': {
        // сетчатая клетка для пластиковых бутылок
        if (this.prop(ctx, 'bottle_cage', d.x, d.y, 30, 30)) break;
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(d.x - 11, d.y - 11, 26, 26);
        ctx.fillStyle = '#9ad1e8';
        for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(d.x - 8 + (i % 3) * 8, d.y - 8 + Math.floor(i / 3) * 8, 3.5, 0, TAU); ctx.fill(); }
        ctx.strokeStyle = '#f2c21b'; ctx.lineWidth = 2; ctx.strokeRect(d.x - 13, d.y - 13, 26, 26);
        ctx.lineWidth = 1; ctx.beginPath();
        for (let i = -13; i <= 13; i += 5) { ctx.moveTo(d.x + i, d.y - 13); ctx.lineTo(d.x + i, d.y + 13); ctx.moveTo(d.x - 13, d.y + i); ctx.lineTo(d.x + 13, d.y + i); }
        ctx.stroke();
        break;
      }
      case 'bin': {
        if (this.prop(ctx, 'trash_bin', d.x, d.y, 30, 22, d.a)) break;
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.a);
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(-12, -7, 28, 20);
        ctx.fillStyle = '#2e6b34'; ctx.fillRect(-14, -10, 28, 20);
        ctx.fillStyle = '#3c8a44'; ctx.fillRect(-13, -9, 26, 8);
        ctx.fillStyle = '#1f4a24'; ctx.fillRect(-14, -1, 28, 2);
        ctx.restore();
        break;
      }
      case 'busstop': {
        if (this.prop(ctx, 'bus_stop', d.x, d.y, 60, 26, rot)) break;
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(rot);
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(-26, -6, 56, 18);
        ctx.fillStyle = 'rgba(160,200,220,0.75)'; ctx.fillRect(-28, -10, 56, 16);
        ctx.strokeStyle = '#4a4a4a'; ctx.lineWidth = 2; ctx.strokeRect(-28, -10, 56, 16);
        ctx.fillStyle = '#1b5e20'; ctx.fillRect(18, -16, 8, 8);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 6px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🚌', 22, -12);
        ctx.restore();
        break;
      }
      case 'bench': {
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(rot);
        ctx.fillStyle = '#8d6e63'; for (let i = 0; i < 3; i++) ctx.fillRect(-16, -6 + i * 4, 32, 3);
        ctx.fillStyle = '#333'; ctx.fillRect(-14, -7, 2, 12); ctx.fillRect(12, -7, 2, 12);
        ctx.restore();
        break;
      }
      case 'bikes': {
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(rot + Math.PI / 2);
        for (let i = 0; i < 4; i++) {
          ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(-18 + i * 12, -10); ctx.lineTo(-18 + i * 12, 10); ctx.stroke();
          ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-18 + i * 12, -9, 3, 0, TAU); ctx.arc(-18 + i * 12, 9, 3, 0, TAU); ctx.fill();
        }
        ctx.restore();
        break;
      }
      case 'scooterE': {
        // брошенный электросамокат — неотъемлемая часть Тель-Авива
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.a);
        ctx.fillStyle = '#111'; ctx.fillRect(-12, -2.5, 24, 5);
        ctx.fillStyle = '#4caf50'; ctx.fillRect(-9, -2, 16, 4);
        ctx.fillStyle = '#333'; ctx.fillRect(10, -6, 2, 12);
        ctx.restore();
        break;
      }
      case 'towel': {
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.r);
        ctx.fillStyle = d.c; ctx.fillRect(-10, -18, 20, 36);
        ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(-10, -12, 20, 3); ctx.fillRect(-10, 9, 20, 3);
        ctx.restore();
        break;
      }
      case 'matkot': {
        // двое с ракетками и мячик туда-сюда
        const L1 = d.l1 || (d.l1 = Looks.civilian()), L2 = d.l2 || (d.l2 = Looks.civilian());
        const ca = Math.cos(d.a), sa = Math.sin(d.a);
        const len = 70;
        const tt = (Math.sin(time * 3 + d.ph) + 1) / 2;
        for (const [L, sgn] of [[L1, -1], [L2, 1]]) {
          ctx.save(); ctx.translate(d.x + ca * len / 2 * sgn, d.y + sa * len / 2 * sgn); ctx.rotate(d.a + (sgn > 0 ? Math.PI : 0));
          drawPersonLook(ctx, L, time * 6, false, null, false);
          ctx.fillStyle = '#5d4037'; ctx.beginPath(); ctx.arc(10, -6, 4, 0, TAU); ctx.fill();
          ctx.restore();
        }
        const bx = d.x + ca * len * (tt - 0.5), by = d.y + sa * len * (tt - 0.5);
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.arc(bx + 3, by + 3, 2.5, 0, TAU); ctx.fill();
        ctx.fillStyle = '#ffeb3b'; ctx.beginPath(); ctx.arc(bx, by - Math.sin(tt * Math.PI) * 6, 2.8, 0, TAU); ctx.fill();
        break;
      }
    }
  },

  drawDecor(ctx, d, cam, time) {
    const s = 1 + d.h * PERSPECTIVE;
    const tx = cam.x + (d.x - cam.x) * s, ty = cam.y + (d.y - cam.y) * s;
    switch (d.k) {
      case 'palm': {
        ctx.strokeStyle = '#8a6a3f'; ctx.lineWidth = 6;
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(tx, ty); ctx.stroke();
        const sway = Math.sin(time * 1.3 + d.r) * 0.08;
        if (this.prop(ctx, 'palm', tx, ty, 90 * s, 90 * s, d.r + sway)) break;
        ctx.save(); ctx.translate(tx, ty); ctx.rotate(d.r + sway); ctx.scale(s, s);
        for (let i = 0; i < 9; i++) {
          ctx.rotate(TAU / 9);
          ctx.fillStyle = i % 2 ? '#2e8b3e' : '#3aa24a';
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(18, -12, 42, -2); ctx.quadraticCurveTo(18, 4, 0, 0); ctx.fill();
          ctx.strokeStyle = 'rgba(20,70,25,0.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(18, -5, 40, -2); ctx.stroke();
        }
        if (d.dates) { ctx.fillStyle = '#e07b1a'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(Math.cos(i) * 6, Math.sin(i) * 6, 2.5, 0, TAU); ctx.fill(); } }
        ctx.fillStyle = '#6b4f2a'; ctx.beginPath(); ctx.arc(0, 0, 5, 0, TAU); ctx.fill();
        ctx.restore();
        break;
      }
      case 'tree': case 'treeS': {
        const sc = (d.s || (d.k === 'tree' ? 0.55 : 0.6)) * s;
        if (this.prop(ctx, 'ficus', tx, ty, 140 * sc, 140 * sc, d.x % 6)) break;
        const im = Assets.img[d.k === 'tree' ? 'tree_large' : 'tree_small'];
        if (im && im.width) ctx.drawImage(im, tx - im.width * sc / 2, ty - im.height * sc / 2, im.width * sc, im.height * sc);
        break;
      }
      case 'bougainvillea': {
        if (this.prop(ctx, 'bougainvillea', tx, ty, 44 * s, 44 * s, d.r)) break;
        ctx.save(); ctx.translate(tx, ty); ctx.rotate(d.r);
        ctx.fillStyle = '#3f7d3a'; ctx.beginPath(); ctx.arc(0, 0, 16 * s, 0, TAU); ctx.fill();
        for (let i = 0; i < 14; i++) {
          ctx.fillStyle = i % 3 ? '#d81b8c' : '#f06292';
          ctx.beginPath(); ctx.arc(Math.cos(i * 2.4) * (4 + i % 4 * 3.5) * s, Math.sin(i * 2.4) * (4 + i % 4 * 3.5) * s, 4 * s, 0, TAU); ctx.fill();
        }
        ctx.restore();
        break;
      }
      case 'lamp': {
        ctx.strokeStyle = '#4a4f55'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.fillStyle = (Game.night || 0) > 0.3 ? '#fff3c4' : '#9aa0a6';
        ctx.beginPath(); ctx.ellipse(tx, ty, 6 * s, 4 * s, 0, 0, TAU); ctx.fill();
        break;
      }
      case 'flag': {
        ctx.strokeStyle = '#ccc'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(tx, ty); ctx.stroke();
        this.drawFlag(ctx, tx, ty, s, time);
        break;
      }
      case 'lifeguard': {
        if (this.prop(ctx, 'lifeguard_tower', tx, ty, 70 * s, 70 * s)) break;
        ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 3;
        for (const [ox, oy] of [[-16, -16], [16, -16], [-16, 16], [16, 16]]) { ctx.beginPath(); ctx.moveTo(d.x + ox, d.y + oy); ctx.lineTo(tx + ox * s, ty + oy * s); ctx.stroke(); }
        ctx.fillStyle = '#f5f5f5'; ctx.fillRect(tx - 22 * s, ty - 22 * s, 44 * s, 44 * s);
        ctx.fillStyle = '#e53935'; ctx.fillRect(tx - 22 * s, ty - 22 * s, 44 * s, 8 * s);
        ctx.fillStyle = '#1565c0'; ctx.font = `bold ${8 * s}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('מציל', tx, ty + 4 * s);
        break;
      }
      case 'umbrella': {
        if (this.prop(ctx, 'umbrella', tx, ty, 50 * s, 50 * s, d.x)) break;
        ctx.save(); ctx.translate(tx, ty);
        for (let i = 0; i < 8; i++) {
          ctx.fillStyle = i % 2 ? d.c : '#ffffff';
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 22 * s, i / 8 * TAU, (i + 1) / 8 * TAU); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        break;
      }
      case 'stall': {
        // ящики с фруктами и специями, сверху — навес
        ctx.fillStyle = '#8d6e63'; ctx.fillRect(d.x - 28, d.y + 18, 56, 14);
        for (let i = 0; i < 5; i++) { ctx.fillStyle = i % 2 ? d.fr : shade(d.fr, 0.8); ctx.beginPath(); ctx.arc(d.x - 22 + i * 11, d.y + 25, 5, 0, TAU); ctx.fill(); }
        if (this.prop(ctx, 'market_stall', tx, ty, 62 * s, 56 * s)) break;
        const im = Assets.img[d.c];
        if (im && im.width) ctx.drawImage(im, tx - 30 * s, ty - 30 * s, 60 * s, 52 * s);
        break;
      }
    }
  },

  // ---------- Миникарта ----------
  buildMinimap() {
    const c = document.createElement('canvas');
    c.width = this.W; c.height = this.H;
    const g = c.getContext('2d');
    const img = g.createImageData(this.W, this.H);
    const col = {
      [T_BOUND]: [70, 90, 50], [T_SEA]: [40, 110, 170], [T_SAND]: [236, 217, 164], [T_ROAD]: [70, 70, 76],
      [T_WALK]: [200, 194, 180], [T_BUILD]: [235, 232, 222], [T_GRASS]: [122, 168, 78], [T_RIVER]: [61, 134, 166],
      [T_PLAZA]: [217, 208, 189], [T_PARKING]: [90, 90, 95], [T_DECK]: [169, 124, 82],
    };
    for (let i = 0; i < this.W * this.H; i++) {
      const cc = col[this.type[i]];
      img.data[i * 4] = cc[0]; img.data[i * 4 + 1] = cc[1]; img.data[i * 4 + 2] = cc[2]; img.data[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    // территории банд — цветная подложка кварталов
    for (let by = 0; by < this.NB; by++) for (let bx = 0; bx < this.NB; bx++) {
      const k = this.LAYOUT[by][bx];
      for (const f in FACTIONS) {
        if (!FACTIONS[f].districts.includes(k)) continue;
        const r = this.blockRect(bx, by);
        g.fillStyle = FACTIONS[f].turf; g.globalAlpha = 0.32;
        g.fillRect(r.x0 - 1, r.y0 - 1, r.x1 - r.x0 + 3, r.y1 - r.y0 + 3);
        g.globalAlpha = 1;
      }
    }
    this.minimap = c;
  },
};

// Палитры районов
const STYLES = {
  bauhaus: { hmin: 34, hmax: 80, roofs: ['#f4f1ea', '#ece6d8', '#f7f4ef', '#e8e2d2', '#ded7c6'], solar: 3, ac: 3, floor: 22, balconies: true },
  hotel: { hmin: 110, hmax: 210, roofs: ['#f2f2f2', '#e6edf2', '#efe9df'], wall: '#cfd8de', pool: true, ac: 4, floor: 20 },
  warehouse: { hmin: 26, hmax: 44, roofs: ['#9a9a96', '#a65d3c', '#7d8a94', '#8e7f6a'], ac: 2, floor: 99, metal: true, noParapet: true, noStairs: true },
  cityhall: { hmin: 150, hmax: 160, roofs: ['#d8d4cc'], wall: '#b9b2a6', ac: 6, floor: 18 },
  templer: { hmin: 20, hmax: 28, roofs: ['#c0583a', '#b84f33'], wall: '#e9dcc0', tiles: true, floor: 99 },
  mall: { hmin: 36, hmax: 36, roofs: ['#c6c6c6'], ac: 8, floor: 99 },
  hospital: { hmin: 90, hmax: 100, roofs: ['#f2f2f2'], wall: '#d9dfe3', ac: 5, floor: 18 },
  police: { hmin: 40, hmax: 48, roofs: ['#3c5a86'], wall: '#d6d6d6', ac: 3, floor: 20 },
  garage: { hmin: 26, hmax: 30, roofs: ['#5b4a6d'], wall: '#cfc8d8', floor: 99 },
  busstation: { hmin: 80, hmax: 90, roofs: ['#8d8d8a'], wall: '#77776f', ac: 10, floor: 20 },
  concrete: { hmin: 30, hmax: 70, roofs: ['#c9c4b8', '#b8b2a5', '#d2ccbf'], solar: 2, ac: 3, floor: 22 },
  florentin: { hmin: 28, hmax: 60, roofs: ['#b9a88d', '#a39b8a', '#c7b79a', '#9d968a'], solar: 2, ac: 4, floor: 20, balconies: true },
  nevetzedek: { hmin: 18, hmax: 30, roofs: ['#c96a43', '#b65a3a', '#d27b4f'], wall: '#efe2c9', tiles: true, floor: 99 },
  jaffa: { hmin: 22, hmax: 55, roofs: ['#d9b47a', '#cfa86b', '#e0bf87'], wall: '#c49a5c', solar: 1, floor: 22, stone: true },
  tower: { hmin: 140, hmax: 280, roofs: ['#9fb8c8', '#8fa9ba', '#b6c4cc', '#7f98a8'], wall: '#5f7a8c', ac: 5, floor: 16 },
};

for (const k in STYLES) STYLES[k].name = k;

// Затемнить/осветлить цвет #rrggbb
const _shadeCache = new Map();
function shade(hex, k) {
  const key = hex + k.toFixed(2);
  let v = _shadeCache.get(key);
  if (v) return v;
  let r0, g0, b0;
  if (hex[0] === '#') {
    const n = parseInt(hex.slice(1), 16);
    r0 = (n >> 16) & 255; g0 = (n >> 8) & 255; b0 = n & 255;
  } else {
    [r0, g0, b0] = hex.match(/\d+/g).map(Number);
  }
  const r = clamp(Math.round(r0 * k), 0, 255);
  const g = clamp(Math.round(g0 * k), 0, 255);
  const b = clamp(Math.round(b0 * k), 0, 255);
  v = `rgb(${r},${g},${b})`;
  _shadeCache.set(key, v);
  return v;
}
