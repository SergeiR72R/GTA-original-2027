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
};

const City = {
  W: 96,
  H: 96,
  V: [8, 20, 32, 44, 56, 68, 80, 92], // левые колонки вертикальных дорог
  HR: [6, 18, 30, 42, 54, 66, 78, 92], // верхние строки горизонтальных дорог
  VNAMES: ['Тайелет', 'Бен-Йехуда', 'Дизенгоф', 'Ибн-Гвироль', 'Леонардо да Винчи', 'Дерех Намир', 'Шоссе Аялон', 'Жаботински'],
  HNAMES: ['Рокех', 'Арлозоров', 'Фришман', 'Бограшов', 'Алленби', 'Эйлат', 'Салама', 'Яффо-Порт'],

  // Районы по кварталам [by][bx]
  LAYOUT: [
    ['port', 'port', 'north', 'north', 'park', 'north', 'ramatgan'],
    ['tayelet', 'center', 'center', 'rabin', 'north', 'north', 'ramatgan'],
    ['tayelet', 'center', 'dizengoff', 'center', 'sarona', 'azrieli', 'ramatgan'],
    ['tayelet', 'center', 'center', 'center', 'hospital', 'south', 'ramatgan'],
    ['tayelet', 'shuk', 'rothschild', 'rothschild', 'south', 'police', 'ramatgan'],
    ['nevetzedek', 'nevetzedek', 'florentin', 'florentin', 'paint', 'busstation', 'ramatgan'],
    ['jaffa', 'jaffa', 'jaffa', 'florentin', 'south', 'south', 'ramatgan'],
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
    // Яффский порт: море заходит в юго-западный угол
    for (let y = 86; y < H; y++) for (let x = 5; x < 8; x++) this.type[this.idx(x, y)] = T_SEA;

    // Кварталы
    for (let by = 0; by < 7; by++) {
      for (let bx = 0; bx < 7; bx++) {
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
    for (let y = 8; y < 86; y += 3) {
      this.decor.push({ k: 'palm', x: 7 * TILE + 44, y: y * TILE + rng.range(0, 40), h: rng.range(70, 95), r: rng() * TAU });
      if (rng() < 0.7) this.decor.push({ k: 'umbrella', x: 5 * TILE + rng.range(20, 150), y: y * TILE + rng.range(0, 150), h: 22, c: rng.pick(['#e94f37', '#f6c90e', '#3fa7d6', '#ffffff', '#59cd90']) });
    }
    // Деревья в парке Яркон
    for (let i = 0; i < 70; i++) {
      const x = rng.range(9, 95) * TILE, y = rng.pick([rng.range(0.2, 1.8), rng.range(4.2, 5.6)]) * TILE;
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
    };
    b.wall = style.wall || shade(b.roof, 0.82);
    const n = rng.int(style.solar ? 0 : 0, style.solar || 0);
    for (let i = 0; i < n; i++) b.items.push({ t: 'solar', u: rng.range(0.15, 0.8), v: rng.range(0.15, 0.8) });
    const ac = rng.int(0, style.ac || 0);
    for (let i = 0; i < ac; i++) b.items.push({ t: 'ac', u: rng.range(0.1, 0.85), v: rng.range(0.1, 0.85) });
    if (style.pool && rng() < 0.6) b.items.push({ t: 'pool', u: 0.2, v: 0.2, w: 0.45, h: 0.35 });
    if (style.tiles) b.items.push({ t: 'tiles' });
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
    const generic = (style, maxS, pEmpty = 0.12) => {
      this.splitLots(inner, rng, maxS, lots);
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
          this.lotBuilding(l, style, rng);
        }
      }
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
        this.addBuilding({ kind: 'circle', cx, cy, r: 58, h0: 0, h1: 10, roof: '#7fc4d8', wall: '#9a9a9a', items: [{ t: 'fountain' }], floors: 99 });
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
        this.addBuilding({ kind: 'circle', cx: bxp + bw * 0.22, cy: byp + bh * 0.3, r: 70, h0: 36, h1: 300, roof: '#a9c8d8', wall: '#6d8fa3', items: [], floors: 14, glass: true });
        this.addBuilding({ kind: 'poly', pts: [[bxp + bw * 0.55, byp + bh * 0.12], [bxp + bw * 0.78, byp + bh * 0.55], [bxp + bw * 0.38, byp + bh * 0.58]], h0: 36, h1: 270, roof: '#b4cfdb', wall: '#5f8397', items: [], floors: 14, glass: true });
        this.addBuilding({ kind: 'rect', x: bxp + bw * 0.62, y: byp + bh * 0.62, w: 120, h: 120, h0: 36, h1: 240, roof: '#9fbfcf', wall: '#58798d', items: [{ t: 'ac', u: 0.5, v: 0.5 }], floors: 14, glass: true });
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
      case 'jaffa': {
        if (bx === 1) {
          // площадь с часовой башней
          this.fill(ix, iy, iw, ih, T_PLAZA);
          this.fill(ix + 3, iy + 4, 2, 2, T_BUILD);
          this.addBuilding({ kind: 'rect', x: (ix + 3) * TILE + 30, y: (iy + 4) * TILE + 30, w: 68, h: 68, h0: 0, h1: 150, roof: '#c9a46a', wall: '#b88f55', items: [{ t: 'clock' }], floors: 30 });
          this.splitLots({ x: ix, y: iy + 7, w: iw, h: ih - 7 }, rng, 3, lots);
          this.splitLots({ x: ix, y: iy, w: iw, h: 3 }, rng, 3, lots);
          for (const l of lots) this.lotBuilding(l, S.jaffa, rng);
        } else {
          generic(S.jaffa, 3, 0.1);
        }
        break;
      }
      case 'ramatgan': generic(S.tower, 4, 0.15); break;
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
    for (let i = 0; i < cw * ch; i++) this.dgrid.push([]);
    for (const d of this.decor) {
      const cx = clamp(Math.floor(d.x / TILE / CHUNK), 0, cw - 1), cy = clamp(Math.floor(d.y / TILE / CHUNK), 0, ch - 1);
      this.dgrid[cy * cw + cx].push(d);
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
    P.start = { x: 6.5 * TILE, y: 40.5 * TILE }; // пляж Гордон
    P.shuk = side(1, 4, 'N');
    P.jaffaClock = this.tc(this.blockRect(1, 6).x0 + 4, this.blockRect(1, 6).y0 + 3);
    P.florentin = side(3, 5, 'N');
    P.florentinCar = this.tc(52, 67); // на улице у Флорентина
    P.nevetzedek = side(1, 5, 'E');
    P.azrieli = side(5, 2, 'S');
    P.beach = { x: 6.3 * TILE, y: 28 * TILE };
    P.port = side(0, 0, 'S', 1);
    P.portGarage = this.tc(this.blockRect(0, 0).x0 + 2, this.blockRect(0, 0).y1 - 1);
    P.hospital = side(4, 3, 'S');
    P.police = side(5, 4, 'S');
    P.paint = this.tc(this.blockRect(4, 5).x0 + 5, this.blockRect(4, 5).y0 + 4);
    P.uzi = { x: 6.5 * TILE, y: 22 * TILE };
    P.pistol = side(2, 5, 'N', 2);
    // Телефоны-автоматы — у каждого свой «заказчик»
    P.phone1 = side(1, 4, 'E');
    P.phone2 = side(2, 3, 'S');
  },

  districtAt(px, py) {
    const x = Math.floor(px / TILE), y = Math.floor(py / TILE);
    if (x < 5) return DISTRICTS.sea;
    if (x < 8) return y < 86 ? DISTRICTS.beach : DISTRICTS.jaffa;
    if (y < 6) return DISTRICTS.park;
    let bx = 0, by = 0;
    for (let i = 0; i < 7; i++) if (x >= this.V[i]) bx = i;
    for (let i = 0; i < 7; i++) if (y >= this.HR[i]) by = i;
    if (x >= 92) bx = 6;
    if (y >= 92) by = 6;
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
  pathTo(sx, sy, gx, gy, maxNodes = 4000) {
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

  drawTile(g, tx, ty) {
    const px = tx * TILE, py = ty * TILE;
    const tt = this.t(tx, ty);
    const r = makeRng(tx * 7919 + ty * 104729);
    const speck = (cols, n, sz) => { for (let i = 0; i < n; i++) { g.fillStyle = r.pick(cols); g.fillRect(px + r() * TILE, py + r() * TILE, sz, sz); } };
    switch (tt) {
      case T_SEA: {
        const deep = clamp(tx / 5, 0, 1);
        g.fillStyle = `rgb(${30 + deep * 20},${100 + deep * 40},${165 + deep * 20})`;
        g.fillRect(px, py, TILE, TILE);
        g.strokeStyle = 'rgba(255,255,255,0.18)'; g.lineWidth = 2;
        for (let i = 0; i < 2; i++) { const yy = py + r() * TILE, xx = px + r() * 40; g.beginPath(); g.moveTo(xx, yy); g.quadraticCurveTo(xx + 10, yy - 4, xx + 20, yy); g.stroke(); }
        if (this.t(tx + 1, ty) === T_SAND) { g.fillStyle = 'rgba(255,255,255,0.6)'; for (let y = 0; y < TILE; y += 8) g.fillRect(px + TILE - 6 + Math.sin((py + y) * 0.2) * 3, py + y, 6, 8); }
        break;
      }
      case T_SAND: g.fillStyle = '#ecd9a4'; g.fillRect(px, py, TILE, TILE); speck(['#e0c98e', '#f5e6bd', '#d9c088'], 14, 2); break;
      case T_RIVER: g.fillStyle = '#3d86a6'; g.fillRect(px, py, TILE, TILE); g.fillStyle = 'rgba(255,255,255,0.12)'; g.fillRect(px + r() * 50, py + r() * 60, 14, 2); break;
      case T_GRASS: g.fillStyle = '#7aa84e'; g.fillRect(px, py, TILE, TILE); speck(['#6c9844', '#88b55b', '#5f8a3b'], 18, 3); break;
      case T_BOUND: g.fillStyle = '#56703e'; g.fillRect(px, py, TILE, TILE); speck(['#46602f', '#64804a'], 20, 6); break;
      case T_ROAD: {
        g.fillStyle = (tx === 80 || tx === 81) ? '#323236' : '#3b3b40'; g.fillRect(px, py, TILE, TILE);
        speck(['#444449', '#35353a'], 10, 2);
        break;
      }
      case T_WALK: {
        g.fillStyle = '#c9c2b4'; g.fillRect(px, py, TILE, TILE);
        g.strokeStyle = 'rgba(0,0,0,0.07)'; g.lineWidth = 1;
        for (let i = 16; i < TILE; i += 16) { g.beginPath(); g.moveTo(px + i, py); g.lineTo(px + i, py + TILE); g.moveTo(px, py + i); g.lineTo(px + TILE, py + i); g.stroke(); }
        break;
      }
      case T_PLAZA: {
        const jaffa = ty > 78 && tx < 44;
        g.fillStyle = jaffa ? '#d8bd8c' : '#d9d0bd'; g.fillRect(px, py, TILE, TILE);
        g.strokeStyle = jaffa ? 'rgba(120,80,30,0.15)' : 'rgba(0,0,0,0.06)';
        for (let i = 0; i < TILE; i += 32) for (let j = 0; j < TILE; j += 32) g.strokeRect(px + i + 1, py + j + 1, 30, 30);
        break;
      }
      case T_DECK: {
        g.fillStyle = '#a97c52'; g.fillRect(px, py, TILE, TILE);
        g.fillStyle = 'rgba(0,0,0,0.12)';
        for (let i = 0; i < TILE; i += 8) g.fillRect(px, py + i, TILE, 1);
        break;
      }
      case T_PARKING: {
        g.fillStyle = '#4a4a4f'; g.fillRect(px, py, TILE, TILE);
        g.fillStyle = 'rgba(255,255,255,0.5)';
        for (let i = 0; i < TILE; i += 32) g.fillRect(px + i, py + 4, 2, 24);
        break;
      }
      case T_BUILD: {
        // земля под зданием (видна по краям) — тротуар/плитка
        g.fillStyle = '#bdb6a6'; g.fillRect(px, py, TILE, TILE);
        break;
      }
    }
  },

  drawMarkings(g, tx, ty) {
    const tt = this.t(tx, ty);
    const px = tx * TILE, py = ty * TILE;
    if (tt === T_WALK) {
      // бордюр со стороны дороги
      g.fillStyle = '#8f897c';
      if (this.isRoad(tx, ty - 1)) g.fillRect(px, py, TILE, 3);
      if (this.isRoad(tx, ty + 1)) g.fillRect(px, py + TILE - 3, TILE, 3);
      if (this.isRoad(tx - 1, ty)) g.fillRect(px, py, 3, TILE);
      if (this.isRoad(tx + 1, ty)) g.fillRect(px + TILE - 3, py, 3, TILE);
      return;
    }
    if (tt !== T_ROAD) return;
    const i = this.idx(tx, ty);
    const lv = this.laneV[i], lh = this.laneH[i];
    const hw = tx === 80 || tx === 81;
    if (lv === 2 && lh < 0) {
      // разделительная линия между полосами (правый край левой полосы)
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
    // стены
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const a = b.pts[i], c = b.pts[j];
      const ex = c[0] - a[0], ey = c[1] - a[1];
      // внешняя нормаль (обход по часовой в экранных координатах)
      const nx = ey, ny = -ex;
      const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2;
      if ((cam.x - mx) * nx + (cam.y - my) * ny <= 0) continue;
      const len = Math.hypot(nx, ny) || 1;
      // освещение: солнце с северо-запада
      const light = 0.62 + 0.3 * ((-nx / len) * 0.6 + (-ny / len) * 0.8);
      ctx.fillStyle = shade(b.wall, light);
      ctx.beginPath();
      ctx.moveTo(P0[i][0], P0[i][1]); ctx.lineTo(P0[j][0], P0[j][1]);
      ctx.lineTo(P1[j][0], P1[j][1]); ctx.lineTo(P1[i][0], P1[i][1]);
      ctx.closePath(); ctx.fill();
      // этажи / окна
      const fh = b.floors || 24;
      if (b.h1 - b.h0 > fh * 1.3) {
        ctx.strokeStyle = b.glass ? 'rgba(200,235,255,0.35)' : 'rgba(40,40,60,0.28)';
        ctx.lineWidth = b.glass ? 2 : 3;
        ctx.beginPath();
        for (let h = b.h0 + fh; h < b.h1 - 6; h += fh) {
          const s = 1 + h * PERSPECTIVE;
          ctx.moveTo(cam.x + (a[0] - cam.x) * s, cam.y + (a[1] - cam.y) * s);
          ctx.lineTo(cam.x + (c[0] - cam.x) * s, cam.y + (c[1] - cam.y) * s);
        }
        ctx.stroke();
      }
    }
    // крыша
    ctx.fillStyle = b.roof;
    ctx.beginPath();
    ctx.moveTo(P1[0][0], P1[0][1]);
    for (let i = 1; i < n; i++) ctx.lineTo(P1[i][0], P1[i][1]);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = shade(b.roof, 0.75); ctx.lineWidth = 3; ctx.stroke();
    if (b.items.length || b.label) this.drawRoofItems(ctx, b, P1, s1, cam);
  },

  drawRoofItems(ctx, b, P1, s, cam) {
    // для прямоугольных и круглых — система координат крыши
    const x0 = cam.x + (b.bb.x0 - cam.x) * s, y0 = cam.y + (b.bb.y0 - cam.y) * s;
    const w = (b.bb.x1 - b.bb.x0) * s, h = (b.bb.y1 - b.bb.y0) * s;
    ctx.save();
    ctx.translate(x0, y0);
    for (const it of b.items) {
      const ux = it.u * w, vy = it.v * h;
      switch (it.t) {
        case 'solar': {
          // солнечный бойлер — «дуд шемеш»
          const k = s;
          ctx.fillStyle = '#1f3b5c'; ctx.fillRect(ux, vy, 22 * k, 16 * k);
          ctx.strokeStyle = '#9fb7cc'; ctx.lineWidth = 1; ctx.strokeRect(ux, vy, 22 * k, 16 * k);
          ctx.fillStyle = '#f2f2ee'; ctx.fillRect(ux - 1 * k, vy - 9 * k, 24 * k, 8 * k);
          ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(ux - 1 * k, vy - 2 * k, 24 * k, 2 * k);
          break;
        }
        case 'ac': ctx.fillStyle = '#d9d9d9'; ctx.fillRect(ux, vy, 12 * s, 10 * s); ctx.fillStyle = '#888'; ctx.beginPath(); ctx.arc(ux + 6 * s, vy + 5 * s, 3.5 * s, 0, TAU); ctx.fill(); break;
        case 'pool': ctx.fillStyle = '#4fc3e8'; ctx.fillRect(ux, vy, it.w * w, it.h * h); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(ux, vy, it.w * w, it.h * h); break;
        case 'tiles': {
          ctx.strokeStyle = 'rgba(120,40,20,0.35)'; ctx.lineWidth = 2; ctx.beginPath();
          for (let y = 6; y < h; y += 7 * s) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
          ctx.moveTo(0, 0); ctx.lineTo(w / 2, h / 2); ctx.lineTo(w, 0); ctx.moveTo(0, h); ctx.lineTo(w / 2, h / 2); ctx.lineTo(w, h);
          ctx.stroke();
          break;
        }
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
    if (b.label === 'H') {
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.3, 0, TAU); ctx.stroke();
      ctx.fillStyle = '#e53935'; ctx.font = `bold ${Math.min(w, h) * 0.35}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('H', w / 2, h / 2);
    } else if (b.label === 'POLICE') {
      ctx.fillStyle = '#fff'; ctx.font = `bold ${h * 0.22}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('משטרה', w / 2, h / 2);
    } else if (b.label === 'PAINT') {
      ctx.fillStyle = '#ffeb3b'; ctx.font = `bold ${h * 0.28}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ПОКРАСКА', w / 2, h / 2);
      ctx.fillStyle = '#e91e63'; ctx.fillRect(w * 0.1, h * 0.75, w * 0.2, h * 0.1); ctx.fillStyle = '#03a9f4'; ctx.fillRect(w * 0.4, h * 0.75, w * 0.2, h * 0.1); ctx.fillStyle = '#8bc34a'; ctx.fillRect(w * 0.7, h * 0.75, w * 0.2, h * 0.1);
    }
    ctx.restore();
  },

  drawDecor(ctx, d, cam, time) {
    const s = 1 + d.h * PERSPECTIVE;
    const tx = cam.x + (d.x - cam.x) * s, ty = cam.y + (d.y - cam.y) * s;
    switch (d.k) {
      case 'palm': {
        ctx.strokeStyle = '#8a6a3f'; ctx.lineWidth = 6;
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(tx, ty); ctx.stroke();
        const sway = Math.sin(time * 1.3 + d.r) * 0.08;
        ctx.save(); ctx.translate(tx, ty); ctx.rotate(d.r + sway); ctx.scale(s, s);
        for (let i = 0; i < 7; i++) {
          ctx.rotate(TAU / 7);
          ctx.fillStyle = i % 2 ? '#2e8b3e' : '#3aa24a';
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(18, -12, 40, -2); ctx.quadraticCurveTo(18, 4, 0, 0); ctx.fill();
        }
        ctx.fillStyle = '#6b4f2a'; ctx.beginPath(); ctx.arc(0, 0, 5, 0, TAU); ctx.fill();
        ctx.restore();
        break;
      }
      case 'tree': case 'treeS': {
        const im = Assets.img[d.k === 'tree' ? 'tree_large' : 'tree_small'];
        const sc = (d.s || (d.k === 'tree' ? 0.55 : 0.6)) * s;
        if (im && im.width) ctx.drawImage(im, tx - im.width * sc / 2, ty - im.height * sc / 2, im.width * sc, im.height * sc);
        break;
      }
      case 'umbrella': {
        ctx.save(); ctx.translate(tx, ty);
        for (let i = 0; i < 8; i++) {
          ctx.fillStyle = i % 2 ? d.c : '#ffffff';
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 22 * s, i / 8 * TAU, (i + 1) / 8 * TAU); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        break;
      }
      case 'stall': {
        // фрукты на прилавке, сверху — навес
        ctx.fillStyle = d.fr;
        for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(d.x - 22 + i * 11, d.y + 26, 5, 0, TAU); ctx.fill(); }
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
    this.minimap = c;
  },
};

// Палитры районов
const STYLES = {
  bauhaus: { hmin: 34, hmax: 80, roofs: ['#f4f1ea', '#ece6d8', '#f7f4ef', '#e8e2d2', '#ded7c6'], solar: 3, ac: 3, floor: 22 },
  hotel: { hmin: 110, hmax: 210, roofs: ['#f2f2f2', '#e6edf2', '#efe9df'], wall: '#cfd8de', pool: true, ac: 4, floor: 20 },
  warehouse: { hmin: 26, hmax: 44, roofs: ['#9a9a96', '#a65d3c', '#7d8a94', '#8e7f6a'], ac: 2, floor: 99 },
  cityhall: { hmin: 150, hmax: 160, roofs: ['#d8d4cc'], wall: '#b9b2a6', ac: 6, floor: 18 },
  templer: { hmin: 20, hmax: 28, roofs: ['#c0583a', '#b84f33'], wall: '#e9dcc0', tiles: true, floor: 99 },
  mall: { hmin: 36, hmax: 36, roofs: ['#c6c6c6'], ac: 8, floor: 99 },
  hospital: { hmin: 90, hmax: 100, roofs: ['#f2f2f2'], wall: '#d9dfe3', ac: 5, floor: 18 },
  police: { hmin: 40, hmax: 48, roofs: ['#3c5a86'], wall: '#d6d6d6', ac: 3, floor: 20 },
  garage: { hmin: 26, hmax: 30, roofs: ['#5b4a6d'], wall: '#cfc8d8', floor: 99 },
  busstation: { hmin: 80, hmax: 90, roofs: ['#8d8d8a'], wall: '#77776f', ac: 10, floor: 20 },
  concrete: { hmin: 30, hmax: 70, roofs: ['#c9c4b8', '#b8b2a5', '#d2ccbf'], solar: 2, ac: 3, floor: 22 },
  florentin: { hmin: 28, hmax: 60, roofs: ['#b9a88d', '#a39b8a', '#c7b79a', '#9d968a'], solar: 2, ac: 4, floor: 20 },
  nevetzedek: { hmin: 18, hmax: 30, roofs: ['#c96a43', '#b65a3a', '#d27b4f'], wall: '#efe2c9', tiles: true, floor: 99 },
  jaffa: { hmin: 22, hmax: 55, roofs: ['#d9b47a', '#cfa86b', '#e0bf87'], wall: '#c49a5c', solar: 1, floor: 22 },
  tower: { hmin: 140, hmax: 280, roofs: ['#9fb8c8', '#8fa9ba', '#b6c4cc', '#7f98a8'], wall: '#5f7a8c', ac: 5, floor: 16 },
};

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
