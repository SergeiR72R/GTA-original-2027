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
  W: 0, H: 0, // считаются в layout()
  NB: 10, // суперкварталов по горизонтали и вертикали
  V: [], HR: [], VW: [], HW: [], // начало и ширина каждой большой улицы

  // Улицы как в Тель-Авиве: главные идут вдоль моря (с севера на юг), поперечные —
  // от моря вглубь. Профиль поперёк улицы: A — полоса на юг/запад, B — на север/
  // восток (правостороннее движение), P — аллея бульвара, M — разделительная Аялона.
  ROAD_PROFILES: { std: 'AB', oneA: 'AA', oneB: 'BB', ave: 'AABB', blvd: 'AAPPPBB', hwy: 'AAAMMBBB' },
  ROAD_KIND: { minor: 1, std: 2, oneA: 2, oneB: 2, ave: 3, blvd: 4, hwy: 5, ring: 6 },
  VROADS: [['std', 'Тайелет'], ['oneA', 'Ха-Яркон'], ['oneB', 'Бен-Йехуда'], ['ave', 'Дизенгоф'], ['ave', 'Ибн-Гвироль'], ['std', 'Леонардо да Винчи'],
    ['ave', 'Дерех Бегин'], ['hwy', 'Шоссе Аялон'], ['ave', 'Жаботински'], ['std', 'Бялик'], ['std', 'Абба Гилель']],
  HROADS: [['ave', 'Рокех'], ['blvd', 'Нордау'], ['ave', 'Арлозоров'], ['std', 'Фришман'], ['std', 'Бограшов'], ['ave', 'Алленби'],
    ['blvd', 'Ротшильд'], ['ave', 'Эйлат'], ['std', 'Салама'], ['blvd', 'Иерусалимский бульвар'], ['std', 'Яффо-Порт']],
  BUS_LANES: { V: [4, 8], H: [5] }, // красные автобусные полосы: Ибн-Гвироль, Жаботински, Алленби
  // ширина суперкварталов (с тротуаром), разная — сетка неровная
  COLW: [15, 17, 18, 17, 18, 16, 18, 16, 18, 17],
  ROWH: [15, 18, 18, 17, 18, 17, 18, 17, 18, 17],
  // тихие внутренние улицы суперквартала по районам: [ось, доля, профиль]
  MINORS: {
    center: [['h', 0.5, 'std']], north: [['h', 0.5, 'std']], florentin: [['h', 0.5, 'oneB'], ['v', 0.5, 'oneA']],
    south: [['h', 0.5, 'std'], ['v', 0.5, 'std']], ramatgan: [['v', 0.5, 'std']], rgshops: [['h', 0.5, 'std']],
    jaffa: [['h', 0.5, 'std']], shikun: [['v', 0.5, 'std']], nevetzedek: [['v', 0.5, 'oneB']],
  },
  // здесь стоят достопримечательности — без внутренних улиц
  NO_MINOR: ['1,0', '3,4', '4,4', '3,7', '0,7', '8,4', '0,5', '5,9'],

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
    return { x0: this.V[bx] + this.VW[bx], x1: this.V[bx + 1] - 1, y0: this.HR[by] + this.HW[by], y1: this.HR[by + 1] - 1 };
  },

  // Положение больших улиц и размер города
  layout() {
    const P = this.ROAD_PROFILES;
    this.VW = this.VROADS.map(([k]) => P[k].length);
    this.HW = this.HROADS.map(([k]) => P[k].length);
    this.VNAMES = this.VROADS.map((r) => r[1]);
    this.HNAMES = this.HROADS.map((r) => r[1]);
    this.V = []; let x = 8;
    for (let i = 0; i < this.VROADS.length; i++) { this.V.push(x); x += this.VW[i] + (i < this.NB ? this.COLW[i] : 0); }
    this.HR = []; let y = 6;
    for (let i = 0; i < this.HROADS.length; i++) { this.HR.push(y); y += this.HW[i] + (i < this.NB ? this.ROWH[i] : 0); }
    this.W = x + 2; this.H = y + 2;
    this.JAFFA_SEA = this.HR[8]; // южнее — море подходит к Яффо и Аджами
  },

  // Полоса дороги: тип клетки, направление, вид улицы
  lane(x, y, ch, axis, kind) {
    if (!this.inside(x, y)) return;
    const i = this.idx(x, y);
    if (ch === 'P' || ch === 'M') {
      // аллея и разделительная — только там, где не проходит поперечная улица
      if (this.type[i] !== T_ROAD) { this.type[i] = ch === 'P' ? T_PLAZA : T_GRASS; this.median[i] = ch === 'P' ? 1 : 2; }
      return;
    }
    const d = axis === 'v' ? (ch === 'A' ? 2 : 0) : (ch === 'A' ? 3 : 1);
    this.type[i] = T_ROAD;
    this.bid[i] = -1;
    if (axis === 'v') this.laneV[i] = d; else this.laneH[i] = d;
    if (!this.roadKind[i] || kind > this.roadKind[i]) this.roadKind[i] = kind;
  },

  // Улица-отрезок: ось, первая клетка поперёк, от и до вдоль, профиль
  street(axis, at, from, to, prof, kind) {
    const s = this.ROAD_PROFILES[prof];
    for (let k = 0; k < s.length; k++) for (let t = from; t <= to; t++) {
      if (axis === 'v') this.lane(at + k, t, s[k], 'v', kind); else this.lane(t, at + k, s[k], 'h', kind);
    }
  },

  // Перекрёсток: клетки с движением по обеим осям
  isJunction(x, y) { if (!this.inside(x, y)) return false; const i = this.idx(x, y); return this.laneV[i] >= 0 && this.laneH[i] >= 0; },

  // Светофоры: на пересечениях больших улиц, кроме двух обычных (там уступают)
  findLights() {
    this.lightId = new Int16Array(this.W * this.H).fill(-1);
    this.lights = [];
    for (let i = 0; i < this.V.length; i++) for (let j = 0; j < this.HR.length; j++) {
      const kv = this.ROAD_KIND[this.VROADS[i][0]], kh = this.ROAD_KIND[this.HROADS[j][0]];
      if (kv <= 2 && kh <= 2) continue;
      const L = { x0: this.V[i], y0: this.HR[j], x1: this.V[i] + this.VW[i] - 1, y1: this.HR[j] + this.HW[j] - 1, off: (i * 7 + j * 5) % 18 };
      L.id = this.lights.length; this.lights.push(L);
      for (let y = L.y0; y <= L.y1; y++) for (let x = L.x0; x <= L.x1; x++) this.lightId[this.idx(x, y)] = L.id;
    }
  },

  // Столбы светофора на углах: северо-запад и юго-восток показывают сигнал для
  // движения север–юг, северо-восток и юго-запад — для восток–запад
  lightCorners(L) {
    const a = 10;
    return [[L.x0 * TILE - a, L.y0 * TILE - a, true], [(L.x1 + 1) * TILE + a, L.y0 * TILE - a, false],
      [(L.x1 + 1) * TILE + a, (L.y1 + 1) * TILE + a, true], [L.x0 * TILE - a, (L.y1 + 1) * TILE + a, false]];
  },

  // Цикл 18 с: север–юг зелёный 7 с, жёлтый 2, потом восток–запад так же
  lightState(id, vertical) {
    const t = ((World.time || 0) + this.lights[id].off) % 18;
    const ns = t < 7 ? 'g' : t < 9 ? 'y' : 'r';
    const ew = t < 9 ? 'r' : t < 16 ? 'g' : 'y';
    return vertical ? ns : ew;
  },

  // Центр клетки в пикселях
  tc(tx, ty) { return { x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 }; },

  generate() {
    this.signs = [];
    this.models = []; // детальные 3D-модели (assets/models): в 3D заменяют свои простые объёмы
    this.houses = []; // типовые дома-модели (одна сетка на вид, много копий)
    this.layout();
    const W = this.W, H = this.H;
    this.type = new Uint8Array(W * H);
    this.laneV = new Int8Array(W * H).fill(-1);
    this.laneH = new Int8Array(W * H).fill(-1);
    this.bid = new Int16Array(W * H).fill(-1);
    this.roadKind = new Uint8Array(W * H);
    this.median = new Uint8Array(W * H);
    this.busLane = new Uint8Array(W * H);
    this.touches = []; // где внутренние улицы упираются в большие
    this.pass = new Uint8Array(W * H); // проходы во дворы и переулки — их не загромождаем
    this.arches = [];
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

    // Суперкварталы; в жилых районах их делят тихие внутренние улицы
    for (let by = 0; by < this.NB; by++) {
      for (let bx = 0; bx < this.NB; bx++) {
        const r = this.blockRect(bx, by);
        const d = this.LAYOUT[by][bx];
        for (let y = r.y0; y <= r.y1; y++) for (let x = r.x0; x <= r.x1; x++) this.type[this.idx(x, y)] = T_WALK;
        const minors = this.NO_MINOR.includes(bx + ',' + by) ? null : this.MINORS[d];
        if (!minors) { this.genBlock(bx, by, r, d, rng); continue; }
        // режем квартал внутренними улицами и заполняем каждую часть
        let xs = [r.x0], ys = [r.y0];
        const xe = [], ye = [];
        for (const [ax, frac, prof] of minors) {
          const w = this.ROAD_PROFILES[prof].length;
          if (ax === 'h') {
            const at = r.y0 + Math.round((r.y1 - r.y0 + 1 - w) * frac);
            this.street('h', at, r.x0, r.x1, prof, 1);
            this.touches.push({ axis: 'h', at, prof, ci: bx }, { axis: 'h', at, prof, ci: bx + 1 });
            ye.push(at - 1); ys.push(at + w);
          } else {
            const at = r.x0 + Math.round((r.x1 - r.x0 + 1 - w) * frac);
            this.street('v', at, r.y0, r.y1, prof, 1);
            this.touches.push({ axis: 'v', at, prof, ci: by }, { axis: 'v', at, prof, ci: by + 1 });
            xe.push(at - 1); xs.push(at + w);
          }
        }
        xe.push(r.x1); ye.push(r.y1);
        xs.sort((a, b) => a - b); xe.sort((a, b) => a - b); ys.sort((a, b) => a - b); ye.sort((a, b) => a - b);
        for (let a = 0; a < xs.length; a++) for (let b = 0; b < ys.length; b++) {
          this.genBlock(bx, by, { x0: xs[a], x1: xe[a], y0: ys[b], y1: ye[b] }, d, rng);
        }
      }
    }

    // Большие улицы: сначала вдоль моря, потом поперечные; на пересечениях
    // у клетки оба направления — это перекрёсток
    const vy0 = this.HR[0], vy1 = this.HR[this.HR.length - 1] + this.HW[this.HW.length - 1] - 1;
    const hx0 = this.V[0], hx1 = this.V[this.V.length - 1] + this.VW[this.VW.length - 1] - 1;
    this.VROADS.forEach(([prof], i) => this.street('v', this.V[i], vy0, vy1, prof, this.ROAD_KIND[prof]));
    this.HROADS.forEach(([prof], j) => this.street('h', this.HR[j], hx0, hx1, prof, this.ROAD_KIND[prof]));
    // внутренние улицы продолжаются через большую — получается перекрёсток
    for (const t of this.touches) {
      const s = this.ROAD_PROFILES[t.prof];
      if (t.axis === 'h') {
        if (t.ci >= this.V.length) continue;
        for (let k = 0; k < s.length; k++) for (let x = this.V[t.ci]; x < this.V[t.ci] + this.VW[t.ci]; x++) {
          const i = this.idx(x, t.at + k);
          if (this.type[i] !== T_ROAD) { this.type[i] = T_ROAD; this.median[i] = 0; this.roadKind[i] = 1; }
          this.laneH[i] = s[k] === 'A' ? 3 : 1;
        }
      } else {
        if (t.ci >= this.HR.length) continue;
        for (let k = 0; k < s.length; k++) for (let y = this.HR[t.ci]; y < this.HR[t.ci] + this.HW[t.ci]; y++) {
          const i = this.idx(t.at + k, y);
          if (this.type[i] !== T_ROAD) { this.type[i] = T_ROAD; this.median[i] = 0; this.roadKind[i] = 1; }
          this.laneV[i] = s[k] === 'A' ? 2 : 0;
        }
      }
    }
    // автобусные полосы — крайние справа по ходу
    for (const i of this.BUS_LANES.V) { const x0 = this.V[i], x1 = x0 + this.VW[i] - 1; for (let y = vy0; y <= vy1; y++) for (const x of [x0, x1]) if (!this.isJunction(x, y)) this.busLane[this.idx(x, y)] = 1; }
    for (const j of this.BUS_LANES.H) { const y0 = this.HR[j], y1 = y0 + this.HW[j] - 1; for (let x = hx0; x <= hx1; x++) for (const y of [y0, y1]) if (!this.isJunction(x, y)) this.busLane[this.idx(x, y)] = 1; }
    this.findLights();
    // деревья и киоски на аллеях бульваров
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = this.idx(x, y);
      if (this.median[i] !== 1) continue;
      if ((x + y) % 2 === 0) this.decor.push({ k: 'treeS', x: x * TILE + 32, y: y * TILE + 32, h: 36, s: 0.55 });
      else if (rng() < 0.08) this.decor.push({ k: 'bench', x: x * TILE + 32, y: y * TILE + 32, h: 0, low: true, d: 0 });
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

    this.landmarks();
    this.buildArches();
    this.typicalHouses(makeRng(4242));
    this.fillEmpty(makeRng(77));
    this.indexBuildings();
    this.definePlaces();
    this.buildMinimap();
  },

  // Типовые дома Тель-Авива (модели из Blender) вместо части обычных коробок:
  // баухауз, дом 1960-х со ставнями, эклектика 1920-х. Только в 3D: стены,
  // 2D и миникарта — прежние. Фасад — к улице
  typicalHouses(rng) {
    const KIND = { bauhaus: 'house_bauhaus', concrete: 'house_60s', florentin: 'house_eclectic' };
    const open = (x, y) => { const t = this.t(x, y); return t === T_WALK || t === T_ROAD || t === T_PLAZA; };
    for (const b of this.buildings) {
      const key = KIND[b.style];
      if (!key || b.kind !== 'rect' || b.removed || b.landmark || b.arch || b.model || b.label || b.h0 || rng() > 0.45) continue;
      const tx = Math.round((b.x - 4) / TILE), ty = Math.round((b.y - 4) / TILE), tw = Math.round((b.w + 8) / TILE), th = Math.round((b.h + 8) / TILE);
      if (tw < 2 || th < 2 || tw > 3 || th > 3) continue;
      // сторона с улицей: юг, север, запад, восток
      const side = (dx, dy, n) => { for (let k = 0; k < n; k++) if (open(dx < 0 ? tx - 1 : dx > 0 ? tx + tw : tx + k, dy < 0 ? ty - 1 : dy > 0 ? ty + th : ty + k)) return true; return false; };
      const rot = side(0, 1, tw) ? 0 : side(0, -1, tw) ? Math.PI : side(-1, 0, th) ? -Math.PI / 2 : side(1, 0, th) ? Math.PI / 2 : 0;
      b.model = key;
      this.houses.push({ key, x: b.x + b.w / 2, y: b.y + b.h / 2, w: b.w + 8, h: b.h + 8, rot, v: Math.floor(rng() * 3) });
    }
  },

  // Арки: над проходом во двор — дом на высоте второго этажа, продолжение
  // соседних. Под аркой можно пройти и проехать
  buildArches() {
    for (const a of this.arches) {
      if (this.t(a.x, a.y) !== T_PLAZA) continue;
      const vert = a.w === 1; // проход поперёк северной или южной полосы
      const n1 = vert ? this.bid[this.idx(a.x - 1, a.y)] : this.bid[this.idx(a.x, a.y - 1)];
      const n2 = vert ? this.bid[this.idx(a.x + 1, a.y)] : this.bid[this.idx(a.x, a.y + 1)];
      const b1 = this.buildings[n1], b2 = this.buildings[n2];
      if (!b1 || !b2 || b1.removed || b2.removed || b1.landmark || b2.landmark || b1.glass || b2.glass) continue;
      const h1 = Math.min(b1.h1, b2.h1);
      if (h1 < 46) continue; // над одноэтажными лавками арки не бывает
      const x = a.x * TILE, y = a.y * TILE;
      this.addBuilding(Object.assign({}, b1, {
        x: vert ? x - 4 : x + 4, y: vert ? y + 4 : y - 4,
        w: vert ? TILE + 8 : a.w * TILE - 8, h: vert ? a.h * TILE - 8 : TILE + 8,
        h0: 24, h1, items: [], shops: false, arch: true,
      }));
    }
  },

  // Детальная 3D-модель (assets/models) вместо объёмов, добавленных начиная с n0:
  // центр участка (cx, cy) и его размер w × h — в пикселях мира
  modelize(key, n0, cx, cy, w, h, rot = 0) {
    for (let i = n0; i < this.buildings.length; i++) this.buildings[i].model = key;
    this.models.push({ key, x: cx, y: cy, w, h, rot });
  },
  // то же для участка в клетках
  modelTiles(key, n0, tx, ty, tw, th) { this.modelize(key, n0, (tx + tw / 2) * TILE, (ty + th / 2) * TILE, tw * TILE, th * TILE); },

  addBuilding(b) {
    b.id = this.buildings.length;
    this.buildings.push(b);
    return b;
  },

  // Деталь достопримечательности: по умолчанию без окон (floors 99)
  piece(o) { return this.addBuilding(Object.assign({ h0: 0, items: [], floors: 99, roof: o.wall, landmark: true }, o)); },
  // Цилиндр в клетках (центр tx, ty — в клетках, можно дробно)
  cyl(tx, ty, r, h0, h1, wall, style = 'plain', roof) { return this.piece({ kind: 'circle', cx: tx * TILE, cy: ty * TILE, r, h0, h1, wall, roof: roof || wall, style }); },
  // Полосатый цилиндр: трубы, маяк, мачта
  bands(tx, ty, r, h0, h1, n, a, b) { const st = (h1 - h0) / n; for (let i = 0; i < n; i++) this.cyl(tx, ty, r, h0 + i * st, h0 + (i + 1) * st, i % 2 ? b : a); },
  // «Луковица» купола: стопка сужающихся колец
  onion(tx, ty, r, h0, col) {
    const k = [[1, 0.35], [0.85, 0.3], [0.6, 0.22], [0.32, 0.18]];
    let h = h0;
    for (const [rr, hh] of k) { this.cyl(tx, ty, r * rr, h, h + r * hh, col); h += r * hh; }
    return h;
  },
  // Коробка в клетках с отступом, непроходимая
  box(tx, ty, tw, th, h0, h1, wall, roof, style = 'plain', extra = {}) {
    const b = this.piece(Object.assign({ kind: 'rect', x: tx * TILE + 4, y: ty * TILE + 4, w: tw * TILE - 8, h: th * TILE - 8, h0, h1, wall, roof, style }, extra));
    this.markSolid(tx, ty, tw, th, b.id);
    return b;
  },

  // Расчистить участок под достопримечательность: убрать дома, декор, парковку
  clearRect(x0, y0, w, h, tt) {
    const inR = (px, py) => px >= x0 * TILE && px < (x0 + w) * TILE && py >= y0 * TILE && py < (y0 + h) * TILE;
    for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) {
      const id = this.bid[this.idx(x, y)];
      if (id >= 0 && !this.buildings[id].removed) {
        const b = this.buildings[id];
        b.removed = true;
        // весь лот снесённого дома становится площадкой
        for (let yy = Math.floor(b.y / TILE); yy <= Math.floor((b.y + b.h - 1) / TILE); yy++) for (let xx = Math.floor(b.x / TILE); xx <= Math.floor((b.x + b.w - 1) / TILE); xx++) {
          if (this.bid[this.idx(xx, yy)] === id) { this.bid[this.idx(xx, yy)] = -1; this.type[this.idx(xx, yy)] = tt; }
        }
      }
      if (this.type[this.idx(x, y)] !== T_ROAD) this.type[this.idx(x, y)] = tt;
    }
    this.decor = this.decor.filter((d) => !inR(d.x, d.y));
    this.parkingSpots = this.parkingSpots.filter((p) => !inR(p.x, p.y));
  },

  // Достопримечательности районов — из простых объёмов, поэтому одинаково
  // видны в 2D и 3D. Квадраты в клетках внутри кварталов (см. LAYOUT).
  landmarks() {
    // вывеска знакового здания — на стойке у тротуара под его южной стеной
    const sign = (b, text, sub, bg, fg) => this.labelNear({ x: b.x + b.w / 2, y: b.y + b.h + 30 }, { text, sub, bg, fg });
    // начало внутренней части квартала (после тротуара)
    const I = (bx, by) => { const r = this.blockRect(bx, by); return { x: r.x0 + 1, y: r.y0 + 1, w: r.x1 - r.x0 - 1, h: r.y1 - r.y0 - 1 }; };
    let o;
    // Порт: электростанция Ридинг — корпус и две полосатые трубы
    o = I(1, 0);
    this.clearRect(o.x + 1, o.y + 1, 6, 5, T_DECK);
    let n0 = this.buildings.length;
    const rd = this.box(o.x + 1, o.y + 2, 6, 3, 0, 70, '#b9b0a2', '#8f8f8f', 'power');
    this.bands(o.x + 2.5, o.y + 3.5, 17, 0, 300, 8, '#c62828', '#f5f5f5');
    this.bands(o.x + 5.5, o.y + 3.5, 17, 0, 300, 8, '#c62828', '#f5f5f5');
    this.modelTiles('reading', n0, o.x + 1, o.y + 1, 6, 5);
    sign(rd, 'רדינג', 'электростанция Ридинг', '#b71c1c', '#fff');
    // Ротшильд: башня Шалом и театр Габима
    o = I(3, 4);
    this.clearRect(o.x, o.y, 4, 3, T_WALK);
    n0 = this.buildings.length;
    const sh = this.box(o.x, o.y, 4, 3, 0, 420, '#7b6a58', '#8d7b68', 'tower', { floors: 16 });
    this.modelTiles('shalom', n0, o.x, o.y, 4, 3);
    sign(sh, 'מגדל שלום', 'башня Шалом', '#4e342e', '#ffe0b2');
    o = I(4, 4);
    this.clearRect(o.x + o.w - 4, o.y + o.h - 4, 4, 4, T_PLAZA);
    this.markSolid(o.x + o.w - 4, o.y + o.h - 4, 4, 4);
    n0 = this.buildings.length;
    this.cyl(o.x + o.w - 2, o.y + o.h - 2, 100, 0, 52, '#e8e4da', 'arena', '#f2f2f2');
    this.cyl(o.x + o.w - 2, o.y + o.h - 2, 76, 52, 64, '#d7d2c6', 'plain', '#ffffff');
    this.modelTiles('habima', n0, o.x + o.w - 4, o.y + o.h - 4, 4, 4);
    // Кирья: мачта связи на штабе
    const kq = this.buildings.find((b) => b.label === 'KIRYA');
    if (kq) {
      n0 = this.buildings.length;
      this.bands((kq.x + kq.w / 2) / TILE, (kq.y + kq.h / 2) / TILE, 7, kq.h1, kq.h1 + 230, 6, '#d32f2f', '#fafafa');
      kq.model = 'kirya';
      this.modelize('kirya', n0, kq.x + kq.w / 2, kq.y + kq.h / 2, kq.w + 8, kq.h + 8);
    }
    // Яффо: церковь Святого Петра с колокольней и маяк в гавани
    o = I(3, 7);
    this.clearRect(o.x + 1, o.y + 1, 5, 4, T_PLAZA);
    n0 = this.buildings.length;
    const ch = this.box(o.x + 1, o.y + 2, 4, 3, 0, 70, '#dcbc85', '#c9a46a', 'church', { stone: true });
    this.box(o.x + 5, o.y + 1, 1, 2, 0, 175, '#d6b47c', '#b88f55', 'church', { stone: true });
    this.onion(o.x + 3, o.y + 3.5, 34, 70, '#b88f55');
    this.modelTiles('stpeter', n0, o.x + 1, o.y + 1, 5, 4);
    sign(ch, 'כנסיית פטרוס', 'церковь Св. Петра', '#6d4c41', '#fff3e0');
    o = I(0, 7);
    this.clearRect(o.x, o.y + 3, 1, 1, T_DECK);
    this.markSolid(o.x, o.y + 3, 1, 1);
    n0 = this.buildings.length;
    this.bands(o.x + 0.5, o.y + 3.5, 18, 0, 150, 5, '#fafafa', '#d32f2f');
    this.cyl(o.x + 0.5, o.y + 3.5, 12, 150, 168, '#fff59d');
    this.cyl(o.x + 0.5, o.y + 3.5, 16, 168, 174, '#c62828');
    this.modelTiles('lighthouse', n0, o.x, o.y + 3, 1, 1);
    // Рамат-Ган: православная церковь с луковицами — приход «земляков»
    o = I(8, 4);
    const ox = o.x + 1, oy = o.y + 1;
    this.clearRect(ox, oy, 4, 4, T_PLAZA);
    n0 = this.buildings.length;
    const rc = this.box(ox, oy, 4, 4, 0, 55, '#f2eee6', '#e0dbd0', 'church');
    this.cyl(ox + 2, oy + 2, 40, 55, 92, '#f5f5f5');
    const top = this.onion(ox + 2, oy + 2, 50, 92, '#d4a017');
    this.cyl(ox + 2, oy + 2, 3, top, top + 34, '#d4a017');
    for (const [dx, dy] of [[-1.35, -1.35], [1.35, -1.35], [-1.35, 1.35], [1.35, 1.35]]) {
      this.cyl(ox + 2 + dx, oy + 2 + dy, 14, 55, 78, '#f5f5f5');
      this.onion(ox + 2 + dx, oy + 2 + dy, 18, 78, '#1e88e5');
    }
    this.modelTiles('ruchurch', n0, ox, oy, 4, 4);
    sign(rc, 'ЦЕРКОВЬ', 'русский приход', '#1565c0', '#ffd54f');
    // Пляж: заброшенный Дельфинариум
    const dy0 = this.HR[4] + 3;
    this.clearRect(5, dy0, 3, 3, T_SAND);
    n0 = this.buildings.length;
    const dl = this.box(5, dy0, 3, 3, 0, 22, '#9fb0b8', '#8a9aa2', 'arena');
    this.modelTiles('dolphinarium', n0, 5, dy0, 3, 3);
    sign(dl, 'דולפינריום', 'заброшенный дельфинарий', '#455a64', '#e0f7fa');
    // Набережная: мечеть Хасан-Бек с минаретом
    o = I(0, 5);
    this.clearRect(o.x, o.y + 1, 4, 4, T_PLAZA);
    n0 = this.buildings.length;
    const mq = this.box(o.x, o.y + 2, 3, 3, 0, 45, '#e3cfa4', '#d9c49a', 'mosque', { stone: true });
    this.onion(o.x + 1.5, o.y + 3.5, 42, 45, '#c8b48a');
    this.markSolid(o.x + 3, o.y + 1, 1, 1);
    this.cyl(o.x + 3.5, o.y + 1.5, 13, 0, 165, '#e8d5a8');
    this.cyl(o.x + 3.5, o.y + 1.5, 19, 118, 124, '#d4bf90');
    this.cyl(o.x + 3.5, o.y + 1.5, 9, 165, 190, '#9e9e9e');
    // в 3D вместо этих объёмов — модель из Blender (tools/models/hassanbek.py), участок 4 × 4
    this.modelTiles('hassanbek', n0, o.x, o.y + 1, 4, 4);
    sign(mq, 'מסגד חסן בק', 'мечеть Хасан-Бек', '#00695c', '#fff');
    // Конец Алленби у набережной: башня «Опера» и круглый фонтан на площади перед ней
    o = I(0, 4);
    const oy0 = o.y + o.h - 6;
    this.clearRect(o.x, oy0, 9, 6, T_PLAZA);
    n0 = this.buildings.length;
    const op = this.box(o.x + 3, oy0, 6, 6, 0, 330, '#f2f0ec', '#e9c9c4', 'tower');
    this.modelTiles('opera', n0, o.x + 3, oy0, 6, 6);
    sign(op, 'מגדל האופרה', 'башня «Опера»', '#ad1457', '#fff');
    n0 = this.buildings.length;
    this.fill(o.x + 1, oy0 + 2, 1, 1, T_BUILD);
    this.addBuilding({ kind: 'circle', cx: (o.x + 1.5) * TILE, cy: (oy0 + 2.5) * TILE, r: 86, h0: 0, h1: 10, roof: '#7fc4d8', wall: '#9a9a9a', items: [{ t: 'fountain' }], floors: 99, style: 'fountain', landmark: true });
    this.modelTiles('operafountain', n0, o.x, oy0 + 1, 3, 3);
    // Юг: арена «Менора» в шхунот
    o = I(5, 9);
    this.clearRect(o.x + 1, o.y + 1, 6, 6, T_PLAZA);
    this.markSolid(o.x + 1, o.y + 1, 6, 6);
    n0 = this.buildings.length;
    this.cyl(o.x + 4, o.y + 4, 170, 0, 58, '#cfd8dc', 'arena', '#90a4ae');
    this.cyl(o.x + 4, o.y + 4, 140, 58, 72, '#b0bec5', 'plain', '#cfd8dc');
    this.cyl(o.x + 4, o.y + 4, 95, 72, 82, '#cfd8dc', 'plain', '#eceff1');
    this.modelTiles('menora', n0, o.x + 1, o.y + 1, 6, 6);
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
    // Застройка по сетке клеток: 0 — дом, 1 — двор, 2 — проход. Дома режем на
    // участки так, чтобы каждый выходил на улицу, во двор или в переулок
    const buildGrid = (area, grid, style, maxS) => {
      const { x: ax, y: ay, w: aw, h: ah } = area;
      const G = (x, y) => (x < ax || y < ay || x >= ax + aw || y >= ay + ah ? -1 : grid[(y - ay) * aw + x - ax]);
      const lots = [];
      for (let y = ay; y < ay + ah; y++) for (let x = ax; x < ax + aw; x++) {
        if (G(x, y) !== 0) continue;
        let runX = 0; while (G(x + runX, y) === 0) runX++;
        let runY = 0; while (G(x, y + runY) === 0) runY++;
        // не оставляем полосок в одну клетку
        const w = runX <= maxS + 1 ? runX : Math.min(rng.int(2, maxS), runX - 2);
        let h = runY <= maxS + 1 ? runY : 2;
        for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) if (G(xx, yy) !== 0) { h = yy - y; break; }
        h = Math.max(1, h);
        for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) grid[(yy - ay) * aw + xx - ax] = 3;
        lots.push({ x, y, w, h });
      }
      // дом без выхода на улицу, во двор или в переулок — значит, его нет:
      // на его месте внутренний садик (световой колодец)
      const open = (x, y) => { const v = G(x, y); return v === -1 || v === 1 || v === 2; };
      for (const l of lots) {
        let ok = false;
        for (let k = 0; k < l.w && !ok; k++) ok = open(l.x + k, l.y - 1) || open(l.x + k, l.y + l.h);
        for (let k = 0; k < l.h && !ok; k++) ok = open(l.x - 1, l.y + k) || open(l.x + l.w, l.y + k);
        if (!ok) l.well = true;
      }
      for (const l of lots) {
        if (l.well) {
          this.fill(l.x, l.y, l.w, l.h, T_GRASS);
          this.decor.push({ k: 'tree', x: (l.x + l.w / 2) * TILE, y: (l.y + l.h / 2) * TILE, h: 40, s: 0.6 });
        } else if (l.w * l.h === 1) {
          // клетка-огрызок — палисадник с деревом
          this.fill(l.x, l.y, 1, 1, T_GRASS);
          this.decor.push({ k: 'treeS', x: (l.x + 0.5) * TILE, y: (l.y + 0.5) * TILE, h: 34, s: 0.5 });
        } else this.lotBuilding(l, pickStyle(style), rng);
      }
    };
    // проход во двор; часть — арка: дом над проходом на высоте второго этажа
    const passage = (x, y, w, h, arch) => {
      this.fill(x, y, w, h, T_PLAZA);
      for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) this.pass[this.idx(xx, yy)] = 1;
      if (arch) this.arches.push({ x, y, w, h });
    };
    // двор: парковка, садик или мощёный двор с баками и великами
    const yard = (x, y, w, h) => {
      if (w < 1 || h < 1) return;
      const narrow = w < 2 || h < 2;
      const roll = rng();
      if (w * h >= 30) {
        // большой двор — сквер: газон, дорожки крестом, деревья и скамейки
        this.fill(x, y, w, h, T_GRASS);
        const mx = x + Math.floor(w / 2), my = y + Math.floor(h / 2);
        this.fill(x, my, w, 1, T_PLAZA); this.fill(mx, y, 1, h, T_PLAZA);
        for (let i = 0; i < w * h / 5; i++) this.decor.push({ k: rng() < 0.5 ? 'tree' : 'treeS', x: rng.range(x + 0.3, x + w - 0.3) * TILE, y: rng.range(y + 0.3, y + h - 0.3) * TILE, h: 40, s: rng.range(0.5, 0.8) });
        return;
      }
      if (!narrow && roll < 0.4) {
        this.fill(x, y, w, h, T_PARKING);
        for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) if (rng() < 0.45) this.parkingSpots.push({ x: (xx + 0.5) * TILE, y: (yy + 0.5) * TILE, a: rng.pick([0, Math.PI]) });
      } else if (!narrow && roll < 0.7) {
        this.fill(x, y, w, h, T_GRASS);
        for (let i = 0; i < Math.max(1, w * h / 3); i++) this.decor.push({ k: rng() < 0.6 ? 'treeS' : 'tree', x: rng.range(x + 0.3, x + w - 0.3) * TILE, y: rng.range(y + 0.3, y + h - 0.3) * TILE, h: 40, s: rng.range(0.45, 0.7) });
      } else {
        this.fill(x, y, w, h, T_PLAZA);
        for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) {
          const r = rng();
          const cx = (xx + rng.range(0.25, 0.75)) * TILE, cy = (yy + rng.range(0.25, 0.75)) * TILE;
          if (r < 0.12) this.decor.push({ k: 'bin', x: cx, y: cy, h: 0, low: true, a: rng.pick([0, Math.PI / 2]) });
          else if (r < 0.2) this.decor.push({ k: 'bikes', x: cx, y: cy, h: 0, low: true, d: rng.int(0, 3) });
          else if (r < 0.28) this.decor.push({ k: 'scooterE', x: cx, y: cy, h: 0, low: true, a: rng() * TAU });
          else if (r < 0.4 && !narrow) this.decor.push({ k: 'treeS', x: cx, y: cy, h: 34, s: 0.5 });
        }
      }
    };
    // Квартал по периметру: дома полосой в две клетки фасадом на улицу,
    // внутри двор, во двор ведут проходы и арки
    const courtyard = (style, maxS, area = inner) => {
      const { x: ax, y: ay, w: aw, h: ah } = area;
      const d = 2;
      if (aw < 2 * d + 1 || ah < 2 * d + 1) { generic(style, maxS, 0.12, area); return; }
      const grid = new Uint8Array(aw * ah);
      const set = (x, y, v) => { grid[(y - ay) * aw + x - ax] = v; };
      for (let y = ay + d; y < ay + ah - d; y++) for (let x = ax + d; x < ax + aw - d; x++) set(x, y, 1);
      // проходы: по одному-два на сторону, не меньше двух на квартал
      const doors = [];
      const sides = [0, 1, 2, 3].filter(() => rng() < 0.75);
      while (sides.length < 2) { const k = rng.int(0, 3); if (!sides.includes(k)) sides.push(k); }
      for (const sd of sides) {
        const along = sd % 2 === 0 ? aw : ah; // 0 — север, 1 — восток, 2 — юг, 3 — запад
        const n = along - 2 * d >= 9 ? 2 : 1;
        for (let k = 0; k < n; k++) {
          const t = d + Math.floor((along - 2 * d) * (k + rng.range(0.25, 0.75)) / n);
          if (sd === 0) doors.push({ x: ax + t, y: ay, w: 1, h: d });
          if (sd === 2) doors.push({ x: ax + t, y: ay + ah - d, w: 1, h: d });
          if (sd === 3) doors.push({ x: ax, y: ay + t, w: d, h: 1 });
          if (sd === 1) doors.push({ x: ax + aw - d, y: ay + t, w: d, h: 1 });
        }
      }
      for (const p of doors) for (let y = p.y; y < p.y + p.h; y++) for (let x = p.x; x < p.x + p.w; x++) set(x, y, 2);
      buildGrid(area, grid, style, maxS);
      yard(ax + d, ay + d, aw - 2 * d, ah - 2 * d);
      for (const p of doors) passage(p.x, p.y, p.w, p.h, rng() < 0.4);
    };
    // Яффо и Неве-Цедек: дома плотно, насквозь — узкие переулки с изломом
    const alleys = (style, maxS, area = inner) => {
      const { x: ax, y: ay, w: aw, h: ah } = area;
      const wide = aw >= ah, L = wide ? aw : ah, S2 = wide ? ah : aw;
      if (S2 < 5) { generic(style, maxS, 0.12, area); return; }
      const grid = new Uint8Array(aw * ah);
      const cell = (u, v) => (wide ? (u - 0) + (v) * aw : (v) + (u) * aw); // u — вдоль, v — поперёк
      // продольный переулок с изломом посередине
      let v = rng.int(2, S2 - 3);
      const bend = rng.int(Math.floor(L / 3), Math.floor(2 * L / 3));
      const v2 = clamp(v + rng.pick([-1, 1]), 2, S2 - 3);
      for (let u = 0; u < L; u++) {
        grid[cell(u, u < bend ? v : v2)] = 2;
        if (u === bend) grid[cell(u, v)] = 2;
      }
      // поперечные переулки
      const n = L >= 12 ? 2 : 1;
      for (let k = 0; k < n; k++) {
        const u = Math.floor(L * (k + rng.range(0.3, 0.7)) / n);
        if (Math.abs(u - bend) < 2) continue;
        for (let w2 = 0; w2 < S2; w2++) grid[cell(u, w2)] = 2;
      }
      const cells = [];
      for (let i = 0; i < grid.length; i++) if (grid[i] === 2) cells.push(i);
      buildGrid(area, grid, style, maxS);
      for (const i of cells) passage(ax + i % aw, ay + Math.floor(i / aw), 1, 1, false);
    };
    // Белый город по Геддесу: отдельные дома на своих участках в зелени, между
    // ними промежуток; в середине суперквартала — общественный сад
    const geddes = (style) => {
      this.fill(ix, iy, iw, ih, T_GRASS);
      const row = (y, h) => {
        let x = ix;
        while (x + 2 <= ix + iw) {
          const w = Math.min(rng() < 0.55 ? 2 : 3, ix + iw - x);
          if (w < 2) break;
          this.lotBuilding({ x, y, w, h }, style, rng);
          x += w + 1;
        }
      };
      const hh = Math.min(2, ih);
      row(iy, hh);
      if (ih >= 5) row(iy + ih - hh, hh);
      // сад между рядами домов: деревья, скамейки, дорожка
      if (ih >= 6) {
        const gy0 = iy + hh + 1, gy1 = iy + ih - hh - 2;
        const path = gy1 - gy0 >= 2 ? Math.floor((gy0 + gy1) / 2) : -1;
        for (let y = gy0 - 1; y <= gy1 + 1; y++) for (let x = ix; x < ix + iw; x++) {
          if (y === path) { this.type[this.idx(x, y)] = T_PLAZA; continue; }
          if (this.type[this.idx(x, y)] === T_BUILD) continue;
          if (rng() < (y < gy0 || y > gy1 ? 0.15 : 0.4)) this.decor.push({ k: rng() < 0.7 ? 'treeS' : 'tree', x: x * TILE + rng.range(14, 50), y: y * TILE + rng.range(14, 50), h: 40, s: rng.range(0.5, 0.8) });
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
        courtyard(S.hotel, 4); // отели вокруг двора с бассейнами и садом
        for (let y = r.y0; y <= r.y1; y += 2) this.decor.push({ k: 'palm', x: r.x0 * TILE + 20, y: y * TILE + 32, h: 85, r: rng() * TAU });
        break;
      }
      case 'dizengoff': {
        // Кикар Дизенгоф: одностороннее кольцо против часовой стрелки вокруг площади
        // с фонтаном и четыре улицы-«спицы» к соседним большим улицам
        const cx = Math.floor((r.x0 + r.x1) / 2), cy = Math.floor((r.y0 + r.y1) / 2), R = 4;
        const lx0 = cx - R, lx1 = cx + R, ly0 = cy - R, ly1 = cy + R;
        const ring = (x, y, ax, d) => { const i = this.idx(x, y); this.type[i] = T_ROAD; if (ax === 'v') this.laneV[i] = d; else this.laneH[i] = d; this.roadKind[i] = 6; };
        this.fill(lx0 + 1, ly0 + 1, 2 * R - 1, 2 * R - 1, T_PLAZA);
        for (let x = lx0; x <= lx1; x++) { ring(x, ly0, 'h', 3); ring(x, ly1, 'h', 1); }
        for (let y = ly0; y <= ly1; y++) { ring(lx0, y, 'v', 2); ring(lx1, y, 'v', 0); }
        // спицы: въезд вливается в кольцо, у выезда кольцу добавляем направление наружу
        this.street('v', cx - 1, r.y0, ly0 - 1, 'std', 1); ring(cx, ly0, 'v', 0);
        this.street('v', cx - 1, ly1 + 1, r.y1, 'std', 1); ring(cx - 1, ly1, 'v', 2);
        this.street('h', cy - 1, r.x0, lx0 - 1, 'std', 1); ring(lx0, cy - 1, 'h', 3);
        this.street('h', cy - 1, lx1 + 1, r.x1, 'std', 1); ring(lx1, cy, 'h', 1);
        this.touches.push({ axis: 'v', at: cx - 1, prof: 'std', ci: by }, { axis: 'v', at: cx - 1, prof: 'std', ci: by + 1 },
          { axis: 'h', at: cy - 1, prof: 'std', ci: bx }, { axis: 'h', at: cy - 1, prof: 'std', ci: bx + 1 });
        // фонтан в центре и пальмы вокруг
        const fx = (cx + 0.5) * TILE, fy = (cy + 0.5) * TILE;
        this.fill(cx - 1, cy - 1, 3, 3, T_BUILD);
        const nF = this.buildings.length;
        this.addBuilding({ kind: 'circle', cx: fx, cy: fy, r: 70, h0: 0, h1: 10, roof: '#7fc4d8', wall: '#9a9a9a', items: [{ t: 'fountain' }], floors: 99, style: 'fountain' });
        this.modelize('agam', nF, fx, fy, 140, 140);
        for (let i = 0; i < 8; i++) this.decor.push({ k: 'palm', x: fx + Math.cos(i / 8 * TAU) * 170, y: fy + Math.sin(i / 8 * TAU) * 170, h: 80, r: i });
        // четверти вокруг кольца — дома Белого города
        const q = (x0, y0, x1, y1) => { if (x1 - x0 >= 1 && y1 - y0 >= 1) generic(S.bauhaus, 3, 0.1, { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 }); };
        q(ix, iy, cx - 3, ly0 - 2); q(cx + 2, iy, ix + iw - 1, ly0 - 2);
        q(ix, ly1 + 2, cx - 3, iy + ih - 1); q(cx + 2, ly1 + 2, ix + iw - 1, iy + ih - 1);
        q(ix, ly0, lx0 - 2, cy - 3); q(ix, cy + 2, lx0 - 2, ly1);
        q(lx1 + 2, ly0, ix + iw - 1, cy - 3); q(lx1 + 2, cy + 2, ix + iw - 1, ly1);
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
        const nAz = this.buildings.length;
        const pod = this.lotBuilding({ x: ix + 1, y: iy + 1, w: iw - 2, h: ih - 3 }, S.mall, rng);
        pod.h1 = 36;
        const bxp = pod.x, byp = pod.y, bw = pod.w, bh = pod.h;
        this.addBuilding({ kind: 'circle', cx: bxp + bw * 0.22, cy: byp + bh * 0.3, r: 70, h0: 36, h1: 300, roof: '#a9c8d8', wall: '#6d8fa3', items: [], floors: 14, glass: true, style: 'tower' });
        this.addBuilding({ kind: 'poly', pts: [[bxp + bw * 0.55, byp + bh * 0.12], [bxp + bw * 0.78, byp + bh * 0.55], [bxp + bw * 0.38, byp + bh * 0.58]], h0: 36, h1: 270, roof: '#b4cfdb', wall: '#5f8397', items: [], floors: 14, glass: true, style: 'tower' });
        this.addBuilding({ kind: 'rect', x: bxp + bw * 0.62, y: byp + bh * 0.62, w: 120, h: 120, h0: 36, h1: 240, roof: '#9fbfcf', wall: '#58798d', items: [{ t: 'ac', u: 0.5, v: 0.5 }], floors: 14, glass: true, style: 'tower' });
        this.modelize('azrieli', nAz, bxp + bw / 2, byp + bh / 2, bw, bh);
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
        generic(S.bauhaus, 3, 0, { x: ix, y: iy, w: iw, h: 3 });
        courtyard(S.bauhaus, 3, { x: ix, y: iy + 5, w: iw, h: ih - 5 });
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
        courtyard(S.concrete, 3, { x: ix, y: iy + 6, w: iw, h: ih - 6 });
        break;
      }
      case 'paint': {
        this.fill(ix, iy, iw, ih, T_PARKING);
        const b = this.lotBuilding({ x: ix + 2, y: iy, w: iw - 4, h: 3 }, S.garage, rng);
        b.label = 'PAINT';
        courtyard(S.florentin, 3, { x: ix, y: iy + 6, w: iw, h: ih - 6 });
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
        const nCl = this.buildings.length;
        this.addBuilding({ kind: 'rect', x: (ix + 3) * TILE + 30, y: (iy + 4) * TILE + 30, w: 68, h: 68, h0: 0, h1: 150, roof: '#c9a46a', wall: '#b88f55', items: [{ t: 'clock' }], floors: 30, style: 'jaffa' });
        this.modelize('clocktower', nCl, (ix + 3) * TILE + 64, (iy + 4) * TILE + 64, 68, 68);
        alleys(S.jaffa, 3, { x: ix, y: iy + 7, w: iw, h: ih - 7 });
        generic(S.jaffa, 3, 0, { x: ix, y: iy, w: iw, h: 3 });
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
          courtyard(S.jaffa, 3, { x: ix, y: iy + 3, w: iw, h: ih - 3 });
        } else courtyard(S.jaffa, 3);
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
        courtyard(S.bauhaus, 3, { x: ix, y: iy + 6, w: iw, h: ih - 6 });
        break;
      }
      case 'bursa': {
        // биржа алмазов: стеклянные башни и одна «бриллиантовая»
        this.fill(ix, iy, iw, ih, T_PLAZA);
        for (const l of [{ x: ix, y: iy, w: 3, h: 3 }, { x: ix + iw - 3, y: iy, w: 3, h: 3 }, { x: ix, y: iy + ih - 3, w: 3, h: 3 }]) {
          const b = this.lotBuilding(l, S.tower, rng);
          b.h1 = rng.range(220, 320); b.glass = true;
        }
        if (by === 1) {
          // «Городские ворота» — самая высокая башня, с короной на крыше
          const gate = this.buildings[this.buildings.length - 3];
          gate.h1 = 520; gate.style = 'citygate';
          const nG = this.buildings.length;
          this.piece({ kind: 'rect', x: gate.x + 18, y: gate.y + 18, w: gate.w - 36, h: gate.h - 36, h0: 520, h1: 560, wall: '#37474f', roof: '#263238', style: 'plain' });
          gate.model = 'citygate';
          this.modelize('citygate', nG, gate.x + gate.w / 2, gate.y + gate.h / 2, gate.w + 8, gate.h + 8);
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
      case 'rgshops': courtyard([[S.concrete, 3], [S.florentin, 1]], 3); sidewalkTrees(0.3); break;
      case 'shikun': {
        // «шикуны»: длинные бетонные дома среди газонов
        this.fill(ix, iy, iw, ih, T_GRASS);
        for (let y = iy + 1; y + 2 <= iy + ih; y += 5) {
          const half = Math.floor((iw - 3) / 2);
          if (half >= 3) { this.lotBuilding({ x: ix + 1, y, w: half, h: 2 }, S.concrete, rng); this.lotBuilding({ x: ix + 2 + half, y, w: iw - 3 - half, h: 2 }, S.concrete, rng); }
          else if (iw >= 4) this.lotBuilding({ x: ix + 1, y, w: iw - 2, h: 2 }, S.concrete, rng);
        }
        for (let i = 0; i < iw * ih / 10; i++) this.decor.push({ k: 'treeS', x: rng.range(ix, ix + iw) * TILE, y: rng.range(iy, iy + ih) * TILE, h: 34, s: 0.5 });
        break;
      }
      case 'south': courtyard([[S.concrete, 3], [S.florentin, 2]], 3); break;
      case 'jaffa': alleys(S.jaffa, 3); break;
      case 'ramatgan': courtyard([[S.tower, 2], [S.concrete, 3]], 4); sidewalkTrees(0.3); break;
      case 'north': geddes(S.bauhaus); sidewalkTrees(0.6); break;
      case 'center': geddes(S.bauhaus); sidewalkTrees(0.5); break;
      case 'nevetzedek': alleys(S.nevetzedek, 2); break;
      case 'florentin': courtyard(S.florentin, 3); break;
      default: courtyard(S.concrete, 3); break;
    }
  },

  indexBuildings() {
    const cw = Math.ceil(this.W / CHUNK), ch = Math.ceil(this.H / CHUNK);
    this.bgrid = [];
    for (let i = 0; i < cw * ch; i++) this.bgrid.push([]);
    for (const b of this.buildings) {
      if (b.removed) continue;
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
    // точка на тротуаре у стороны квартала; если там внутренняя улица — сдвигаемся вдоль
    const side = (bx, by, where, off = 0) => {
      const r = this.blockRect(bx, by);
      const mx = Math.floor((r.x0 + r.x1) / 2) + off, my = Math.floor((r.y0 + r.y1) / 2) + off;
      const horiz = where === 'S' || where === 'N';
      const px = where === 'W' ? r.x0 : where === 'E' ? r.x1 : mx, py = where === 'N' ? r.y0 : where === 'S' ? r.y1 : my;
      for (let k = 0; k < 8; k++) for (const sg of [1, -1]) {
        const x = horiz ? px + sg * k : px, y = horiz ? py : py + sg * k;
        if (this.isWalkway(x, y)) return this.tc(x, y);
      }
      return this.tc(px, py);
    };
    const P = this.places;
    this.side = side;
    P.start = { x: 6.5 * TILE, y: (this.HR[4] - 2) * TILE }; // пляж Гордон
    P.shuk = side(1, 4, 'N');
    P.jaffaClock = this.tc(this.blockRect(1, 7).x0 + 4, this.blockRect(1, 7).y0 + 4); // площадь перед башней
    P.florentin = side(3, 5, 'N');
    P.florentinCar = this.tc(this.blockRect(3, 5).x0 + 4, this.HR[6]); // на улице у Флорентина
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

    // Вывески — не на крышах, а на стойке у тротуара, и только у знаковых мест
    // (решение пользователя: «не со всеми»). Магазинные надписи — на витринах.
    this.labelNear(P.flat, { text: 'ФЛОРЕНТИН 12', sub: 'дира', bg: '#5d4037', fg: '#ffe0b2' });
    this.labelNear(P.klita, { text: 'משרד הקליטה', sub: 'Мисрад а-Клита', bg: '#1565c0', fg: '#fff' });
    this.labelNear(P.ulpan, { text: 'אולפן', sub: 'Ульпан «Алеф»', bg: '#00897b', fg: '#fff' });
    this.labelNear(P.bank, { text: 'בנק', sub: 'Банк', bg: '#283593', fg: '#fff' });
    this.labelNear(P.ruHQ, { text: 'РЕСТОРАН «ОДЕССА»', sub: '', bg: '#b71c1c', fg: '#ffd54f' });
    this.labelNear(P.arHQ, { text: 'מוסך אל-בחר', sub: 'гараж Аль-Бахар', bg: '#eeeeee', fg: '#212121' });
    this.labelNear(P.lionsHQ, { text: 'GONDAR GARAGE', sub: 'студия и мастерская', bg: '#1b7f3a', fg: '#f2c230' });
    this.labelNear(P.gunShop, { text: 'חנות נשק', sub: 'Оружие «Шломо и сыновья»', bg: '#263238', fg: '#ffca28' });
    this.labelNear(P.police, { text: 'משטרה', sub: 'Полиция', bg: '#1d4fa3', fg: '#fff' });
    this.labelNear(P.hospital, { text: 'בית חולים', sub: 'Больница', bg: '#c62828', fg: '#fff' });
    this.labelNear(P.paint, { text: 'ПОКРАСКА', sub: 'сменить цвет — сбросить розыск', bg: '#5b4a6d', fg: '#ffeb3b' });
    const sign = (bx, by, where, off, text, sub, bg, fg) => this.labelNear(side(bx, by, where, off), { text, sub, bg, fg });
    sign(7, 0, 'S', 0, 'הבורסה', 'Биржа алмазов', '#37474f', '#b3e5fc');
    sign(6, 1, 'S', 0, 'הקריה', 'Кирья — штаб', '#33691e', '#fff');
    sign(2, 7, 'S', 0, 'שוק הפשפשים', 'блошиный рынок', '#5d4037', '#ffd54f');
    sign(0, 7, 'E', 0, 'נמל יפו', 'Яффский порт', '#0277bd', '#fff');
    sign(6, 5, 'S', 0, 'התחנה המרכזית', 'Центральная автостанция', '#424242', '#fff');
    sign(8, 7, 'N', 0, 'שוק התקווה', 'Шук а-Тиква', '#c62828', '#fff');
    sign(2, 4, 'N', 0, 'נחלת בנימין', 'ярмарка мастеров', '#6a1b9a', '#fff');
  },

  // Вывеска на стойке у тротуара рядом с точкой (у входа в здание)
  labelNear(p, sign) {
    this.signs = this.signs || [];
    const tx = Math.floor(p.x / TILE), ty = Math.floor(p.y / TILE);
    let at = { x: p.x, y: p.y };
    if (!this.isWalkway(tx, ty)) {
      for (let r = 1; r < 4 && at === p; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (this.isWalkway(tx + dx, ty + dy)) { at = this.tc(tx + dx, ty + dy); dy = dx = r + 1; }
    }
    this.signs.push(Object.assign({ x: at.x + 18, y: at.y - 6 }, sign));
  },

  // Вывески на стойках (2D): табличка с надписью, сверху её видно целиком
  drawSigns(ctx, view) {
    for (const s of this.signs || []) {
      if (s.x < view.x0 - 80 || s.x > view.x1 + 80 || s.y < view.y0 - 60 || s.y > view.y1 + 60) continue;
      const c = s.cv || (s.cv = Facades.signBoard(s));
      const w = 74, h = w * c.height / c.width;
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(s.x - w / 2 + 4, s.y - h / 2 + 5, w, h);
      ctx.fillStyle = '#555'; ctx.fillRect(s.x - w * 0.36, s.y + h / 2 - 2, 3, 6); ctx.fillRect(s.x + w * 0.36 - 3, s.y + h / 2 - 2, 3, 6);
      ctx.drawImage(c, s.x - w / 2, s.y - h / 2, w, h);
    }
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

  // Пустых участков быть не должно: всё, где в радиусе клетки нет ни одной
  // детали, заполняем по месту — тротуары, газоны, площади, парковки, пляж, порт.
  // Ничего из этого не мешает ехать: детали не твёрдые.
  fillEmpty(rng) {
    const W = this.W, H = this.H;
    const occ = new Uint8Array(W * H);
    const mark = (x, y, r = 1) => { for (let oy = -r; oy <= r; oy++) for (let ox = -r; ox <= r; ox++) { const xx = x + ox, yy = y + oy; if (xx >= 0 && yy >= 0 && xx < W && yy < H) occ[yy * W + xx] = 1; } };
    for (const d of this.decor) mark(Math.floor(d.x / TILE), Math.floor(d.y / TILE));
    for (const p of this.parkingSpots) mark(Math.floor(p.x / TILE), Math.floor(p.y / TILE), 0);
    const distKey = (x, y) => {
      if (x < 8) return y < this.JAFFA_SEA ? 'beach' : 'ajami';
      if (y < 6) return 'park';
      const { bx, by } = this.blockAt((x + 0.5) * TILE, (y + 0.5) * TILE);
      return this.LAYOUT[by][bx];
    };
    const MARKET = { shuk: 1, flea: 1, hatikva: 1, levinsky: 1, nahalat: 1, busstation: 1 };
    const CAFE = { center: 1, north: 1, rothschild: 1, nahalat: 1, dizengoff: 1, nevetzedek: 1, florentin: 1, sarona: 1, jaffaclock: 1, jaffaport: 1, tayelet: 1, rabin: 1 };
    const FLOWERS = ['#e91e63', '#ffeb3b', '#ff7043', '#ab47bc', '#ffffff'];
    const SPRAY = ['#e53935', '#1e88e5', '#43a047', '#8e24aa', '#212121', '#ff9800'];
    const pickW = (list) => { let sum = 0; for (const it of list) sum += it[1]; let r = rng() * sum; for (const it of list) { r -= it[1]; if (r <= 0) return it[0]; } return list[0][0]; };
    const order = [];
    for (let y = 1; y < H - 1; y++) for (let x = 8; x < W - 1; x++) order.push(y * W + x);
    for (let y = 1; y < H - 1; y++) for (let x = 5; x < 8; x++) order.push(y * W + x);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
    let ads = 0;
    // на больших площадях — крупные элементы: клумбы с деревом и фонтанчики со скамейками
    for (const i of order) {
      const x = i % W, y = Math.floor(i / W);
      if (x % CHUNK < 1 || x % CHUNK > CHUNK - 2 || y % CHUNK < 1 || y % CHUNK > CHUNK - 2 || rng() > 0.4) continue;
      let ok = true;
      for (let oy = -1; oy <= 1 && ok; oy++) for (let ox = -1; ox <= 1 && ok; ox++) { const j = i + oy * W + ox; if (occ[j] || this.pass[j] || this.type[j] !== T_PLAZA) ok = false; }
      if (!ok) continue;
      const cx = (x + 0.5) * TILE, cy = (y + 0.5) * TILE;
      if (rng() < 0.65) {
        this.decor.push({ k: 'bed', x: cx, y: cy, h: 0, low: true, c: rng.pick(FLOWERS) });
        this.decor.push(rng() < 0.5 ? { k: 'tree', x: cx, y: cy, h: 40, s: rng.range(0.6, 0.8) } : { k: 'palm', x: cx, y: cy, h: rng.range(70, 95), r: rng() * TAU });
      } else {
        this.decor.push({ k: 'fountainS', x: cx, y: cy, h: 0, low: true });
        for (let d = 0; d < 4; d++) if (rng() < 0.7) this.decor.push({ k: 'bench', x: cx + DIRS[d].x * 58, y: cy + DIRS[d].y * 58, h: 0, low: true, d: (d + 2) % 4 });
      }
      mark(x, y, 2);
    }
    for (const i of order) {
      if (occ[i] || this.pass[i]) continue;
      const x = i % W, y = Math.floor(i / W), t = this.type[i];
      if (t === T_ROAD || t === T_BUILD || t === T_SEA || t === T_BOUND || t === T_RIVER) continue;
      // дорога рядом: с какой стороны и какая
      let side = -1, kind = 0;
      for (let d = 0; d < 4; d++) { const xx = x + DIRS[d].x, yy = y + DIRS[d].y; if (this.isRoad(xx, yy)) { side = d; kind = this.roadKind[this.idx(xx, yy)]; break; } }
      const cx = (x + rng.range(0.3, 0.7)) * TILE, cy = (y + rng.range(0.3, 0.7)) * TILE;
      const dk = distKey(x, y);
      const push = (o) => { this.decor.push(Object.assign({ x: cx, y: cy, h: 0 }, o)); };
      const tree = () => push({ k: rng() < 0.4 ? 'tree' : 'treeS', h: 40, s: rng.range(0.45, 0.75) });
      let what;
      if (t === T_WALK && side >= 0) {
        what = pickW([['tree', 4], ['planter', 3], ['bin', 2], ['hydrant', 2], ['elbox', 2], ['scooterE', 2], ['bikes', 1], ['adcol', kind >= 2 ? 1.2 : 0.3], ['cafe', CAFE[dk] ? 2 : 0], ['stall', MARKET[dk] ? 2 : 0]]);
      } else if (t === T_WALK) {
        what = pickW([['tree', 3], ['bench', 2], ['planter', 2], ['bin', 1], ['cafe', CAFE[dk] ? 2 : 0.5], ['bikes', 1], ['cage', 1], ['scooterE', 1], ['stall', MARKET[dk] ? 3 : 0]]);
      } else if (t === T_GRASS) {
        what = side >= 0 && kind >= 3 && rng() < 0.45 ? 'billboard' : pickW([['tree', 6], ['bush', 3], ['bench', 1], ['picnic', dk === 'park' ? 2 : 0.6], ['playground', 0.8], ['palm', 1]]);
      } else if (t === T_PLAZA) {
        what = pickW([['bench', 2], ['planter', 2], ['palm', 2], ['cafe', CAFE[dk] ? 4 : 1], ['kiosk', 1], ['adcol', 1], ['umbrella', CAFE[dk] ? 1.5 : 0.3], ['stall', MARKET[dk] ? 4 : 0.3], ['scooterE', 1], ['tree', 1.5]]);
      } else if (t === T_PARKING) {
        what = pickW([['spot', 4], ['cart', 1], ['stain', 2], ['bin', 1]]);
      } else if (t === T_SAND) {
        what = pickW([['umbrella', 3], ['towel', 2], ['lounger', 2], ['palm', 0.6]]);
      } else if (t === T_DECK) {
        what = pickW([['container', 3], ['crates', 3], ['bollard', 1], ['stain', 1]]);
      } else what = 'tree';
      switch (what) {
        case 'tree': tree(); break;
        case 'bush': push({ k: 'treeS', h: 14, s: rng.range(0.28, 0.4) }); break;
        case 'palm': push({ k: 'palm', h: rng.range(60, 90), r: rng() * TAU, dates: rng() < 0.3 }); break;
        case 'planter': push({ k: 'planter', low: true, c: rng.pick(FLOWERS) }); break;
        case 'hydrant': push({ k: 'hydrant', low: true }); break;
        case 'elbox': push({ k: 'elbox', low: true, d: Math.max(0, side), c: rng.pick(SPRAY) }); break;
        case 'bin': push({ k: 'bin', low: true, a: side % 2 ? 0 : Math.PI / 2 }); break;
        case 'bench': push({ k: 'bench', low: true, d: side >= 0 ? side : rng.int(0, 3) }); break;
        case 'bikes': push({ k: 'bikes', low: true, d: Math.max(0, side) }); break;
        case 'cage': push({ k: 'cage', low: true }); break;
        case 'scooterE': push({ k: 'scooterE', low: true, a: rng() * TAU }); break;
        case 'cafe': push({ k: 'cafe', low: true, a: rng() * TAU, c: rng.pick(['#37474f', '#c62828', '#2e7d32', '#1565c0']) }); if (rng() < 0.4) push({ k: 'umbrella', h: 22, c: rng.pick(['#ffffff', '#e94f37', '#3fa7d6']) }); break;
        case 'umbrella': push({ k: 'umbrella', h: 22, c: rng.pick(['#e94f37', '#f6c90e', '#3fa7d6', '#ffffff', '#59cd90']) }); break;
        case 'picnic': push({ k: 'picnic', low: true, a: rng() * TAU }); break;
        case 'playground': {
          // площадка 2 × 2, если рядом есть место
          let ok = x + 1 < W && y + 1 < H && x % CHUNK < CHUNK - 1 && y % CHUNK < CHUNK - 1; // целиком в одном участке земли
          for (let oy = 0; oy < 2 && ok; oy++) for (let ox = 0; ox < 2 && ok; ox++) { const j = (y + oy) * W + x + ox; if (occ[j] || this.type[j] !== T_GRASS) ok = false; }
          if (ok) { this.decor.push({ k: 'playground', x: (x + 1) * TILE, y: (y + 1) * TILE, h: 0, low: true }); mark(x + 1, y + 1); } else tree();
          break;
        }
        case 'billboard': {
          // щит лицом к дороге, у самой обочины
          const D = DIRS[side];
          push({ k: 'billboard', x: (x + 0.5) * TILE + D.x * 6, y: (y + 0.5) * TILE + D.y * 6, h: 60, d: side, ad: ads++ % ADS.length });
          mark(x, y, 2);
          break;
        }
        case 'adcol': push({ k: 'adcol', h: 50 }); break;
        case 'kiosk': push({ k: 'kiosk', h: 30, v: rng.int(0, 3), c: rng.pick(['#2e7d32', '#00695c', '#f5f5f5', '#6d4c41']) }); break;
        case 'stall': push({ k: 'stall', h: 16, c: rng.pick(['tent_blue', 'tent_red']), fr: rng.pick(['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#8ac926', '#ff006e']) }); break;
        case 'spot': this.parkingSpots.push({ x: cx, y: cy, a: rng.pick([0, Math.PI]) }); break;
        case 'cart': push({ k: 'cart', low: true, a: rng() * TAU }); break;
        case 'stain': push({ k: 'stain', low: true, a: rng() * TAU }); break;
        case 'bollard': push({ k: 'bollard', low: true }); break;
        case 'towel': push({ k: 'towel', low: true, c: rng.pick(['#e91e63', '#03a9f4', '#ffeb3b', '#4caf50']), r: rng.range(-0.4, 0.4) }); break;
        case 'lounger': push({ k: 'lounger', low: true, r: rng.range(-0.3, 0.3), c: rng.pick(['#1e88e5', '#ef6c00', '#43a047']) }); break;
        case 'container': push({ k: 'container', h: 36, a: rng.pick([0, Math.PI / 2]), c: rng.pick(['#c62828', '#1565c0', '#2e7d32', '#ef6c00', '#6d4c41']), two: rng() < 0.35, c2: rng.pick(['#00838f', '#ad1457', '#f9a825']) }); mark(x, y, 2); break;
        case 'crates': push({ k: 'crates', h: 20 }); break;
      }
      // на площадях и в парке погуще: мелочь может стоять в соседней клетке
      mark(x, y, (t === T_PLAZA || t === T_SAND || dk === 'park') && rng() < 0.5 ? 0 : 1);
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
    if (this.laneV[i] >= 0 && this.laneH[i] < 0) { const k = this.V.findIndex((v, n) => x >= v && x < v + this.VW[n]); return k >= 0 ? this.VNAMES[k] : null; }
    if (this.laneH[i] >= 0 && this.laneV[i] < 0) { const k = this.HR.findIndex((v, n) => y >= v && y < v + this.HW[n]); return k >= 0 ? this.HNAMES[k] : null; }
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
  pathTo(sx, sy, gx, gy, maxNodes = 40000) {
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
        this.texTile(g, this.roadKind[this.idx(tx, ty)] === 5 ? 'asphaltDark' : 'asphalt', tx, ty, px, py);
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
    const kind = this.roadKind[i];
    // красная автобусная полоса (נת״צ)
    if (this.busLane[i]) { g.fillStyle = 'rgba(190,45,40,0.42)'; g.fillRect(px, py, TILE, TILE); }
    const d0 = lv >= 0 && lh < 0 ? lv : lh >= 0 && lv < 0 ? lh : -1;
    if (d0 >= 0) {
      // линия на краю клетки со стороны sideDir
      const edge = (sideDir, col, w, dash, off = 0) => {
        g.fillStyle = col;
        const vert = sideDir % 2 === 1;
        const pos = sideDir === 1 ? TILE - w - off : sideDir === 2 ? TILE - w - off : off;
        for (let t = 0; t < TILE; t += dash ? 32 : TILE) {
          const len = dash ? 18 : TILE;
          if (vert) g.fillRect(px + pos, py + t + (dash ? 7 : 0), w, len); else g.fillRect(px + t + (dash ? 7 : 0), py + pos, len, w);
        }
      };
      // слева по ходу: встречная — осевая, попутная — пунктир между полосами
      const L = (d0 + 3) % 4, nx = tx + DIRS[L].x, ny = ty + DIRS[L].y;
      if (this.isRoad(nx, ny) && !this.isJunction(nx, ny)) {
        const j = this.idx(nx, ny), nd = d0 % 2 === 0 ? this.laneV[j] : this.laneH[j];
        if (nd === (d0 + 2) % 4) {
          if (kind >= 3) edge(L, '#f2c94c', 3, false, 2); // двойная сплошная на проспектах
          else edge(L, '#eeeeee', 3, true, 0);
        } else if (nd === d0) edge(L, '#e8e8e8', 2, true, 0);
      }
      // шоссе: жёлтая кромка у разделительной и обочины
      if (kind === 5) for (const sd of [L, (d0 + 1) % 4]) { const ex = tx + DIRS[sd].x, ey = ty + DIRS[sd].y; if (!this.isRoad(ex, ey)) edge(sd, '#f2c94c', 4, false, 3); }
      // перед перекрёстком — «зебра» и стоп-линия
      const fx = tx + DIRS[d0].x, fy = ty + DIRS[d0].y;
      if (this.isJunction(fx, fy) && kind !== 6) {
        this.zebra(g, tx, ty, d0 % 2 === 0);
        g.fillStyle = '#f4f4f4';
        if (d0 === 0) g.fillRect(px, py + 28, TILE, 4); else if (d0 === 2) g.fillRect(px, py + TILE - 32, TILE, 4);
        else if (d0 === 1) g.fillRect(px + TILE - 32, py, 4, TILE); else g.fillRect(px + 28, py, 4, TILE);
      }
    }
    const d = d0;
    // стрелки полосы за две клетки до перекрёстка
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
    // вписываем с сохранением пропорций картинки — без растяжения
    const k = Math.min(w / im.width, h / im.height), dw = im.width * k, dh = im.height * k;
    ctx.drawImage(im, -dw / 2, -dh / 2, dw, dh);
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
    this.drawSigns(ctx, view);
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
      case 'planter': {
        if (this.prop(ctx, 'planter', d.x, d.y, 30, 30)) break;
        // кадка с цветами
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.arc(d.x + 3, d.y + 3, 12, 0, TAU); ctx.fill();
        ctx.fillStyle = '#a1887f'; ctx.beginPath(); ctx.arc(d.x, d.y, 12, 0, TAU); ctx.fill();
        ctx.fillStyle = '#558b2f'; ctx.beginPath(); ctx.arc(d.x, d.y, 9, 0, TAU); ctx.fill();
        for (let i = 0; i < 6; i++) { ctx.fillStyle = d.c; ctx.beginPath(); ctx.arc(d.x + Math.cos(i * 1.7) * 6, d.y + Math.sin(i * 1.7) * 6, 2.6, 0, TAU); ctx.fill(); }
        break;
      }
      case 'hydrant': {
        if (this.prop(ctx, 'hydrant', d.x, d.y, 16, 16)) break;
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.arc(d.x + 2, d.y + 2, 6, 0, TAU); ctx.fill();
        ctx.fillStyle = '#d32f2f'; ctx.beginPath(); ctx.arc(d.x, d.y, 6, 0, TAU); ctx.fill();
        ctx.fillStyle = '#ffeb3b'; ctx.beginPath(); ctx.arc(d.x, d.y, 2.5, 0, TAU); ctx.fill();
        break;
      }
      case 'elbox': {
        if (this.prop(ctx, 'elbox', d.x, d.y, 30, 20, rot)) break;
        // электрический шкаф, исписанный граффити
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(rot);
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(-11, -5, 26, 14);
        ctx.fillStyle = '#9e9e9e'; ctx.fillRect(-13, -7, 26, 14);
        ctx.strokeStyle = d.c; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-10, 2); ctx.quadraticCurveTo(-4, -8, 2, 2); ctx.quadraticCurveTo(7, 8, 10, -3); ctx.stroke();
        ctx.restore();
        break;
      }
      case 'cafe': {
        if (this.prop(ctx, 'cafe_set', d.x, d.y, 50, 50, d.a)) break;
        // столик и стулья уличного кафе
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.arc(d.x + 3, d.y + 3, 10, 0, TAU); ctx.fill();
        ctx.fillStyle = '#eeeeee'; ctx.beginPath(); ctx.arc(d.x, d.y, 10, 0, TAU); ctx.fill();
        ctx.fillStyle = d.c;
        for (let i = 0; i < 3; i++) { const an = d.a + i * TAU / 3; ctx.fillRect(d.x + Math.cos(an) * 17 - 5, d.y + Math.sin(an) * 17 - 5, 10, 10); }
        ctx.fillStyle = '#795548'; ctx.beginPath(); ctx.arc(d.x - 3, d.y - 2, 2.5, 0, TAU); ctx.arc(d.x + 3, d.y + 2, 2.5, 0, TAU); ctx.fill();
        break;
      }
      case 'picnic': {
        if (this.prop(ctx, 'picnic_table', d.x, d.y, 46, 34, d.a)) break;
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.a);
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(-18, -12, 40, 28);
        ctx.fillStyle = '#8d6e63'; ctx.fillRect(-20, -6, 40, 12); ctx.fillStyle = '#6d4c41'; ctx.fillRect(-20, -14, 40, 5); ctx.fillRect(-20, 9, 40, 5);
        ctx.restore();
        break;
      }
      case 'playground': {
        if (this.prop(ctx, 'playground', d.x, d.y, 118, 118)) break;
        // песочница, горка и качели (2 × 2 клетки)
        ctx.save(); ctx.translate(d.x, d.y);
        ctx.fillStyle = '#e8c27a'; ctx.fillRect(-56, -56, 112, 112);
        ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 4; ctx.strokeRect(-56, -56, 112, 112);
        ctx.fillStyle = '#e53935'; ctx.fillRect(-44, -40, 16, 46); ctx.fillStyle = '#ffeb3b'; ctx.fillRect(-42, 6, 12, 30);
        ctx.strokeStyle = '#1e88e5'; ctx.lineWidth = 3; ctx.strokeRect(6, -44, 40, 26);
        ctx.fillStyle = '#212121'; ctx.fillRect(14, -34, 8, 4); ctx.fillRect(30, -34, 8, 4);
        ctx.fillStyle = '#43a047'; ctx.beginPath(); ctx.arc(26, 24, 18, 0, TAU); ctx.fill();
        ctx.fillStyle = '#fff59d'; ctx.beginPath(); ctx.arc(26, 24, 8, 0, TAU); ctx.fill();
        ctx.restore();
        break;
      }
      case 'lounger': {
        if (this.prop(ctx, 'lounger', d.x, d.y, 20, 40, d.r)) break;
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.r);
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(-7, -14, 18, 34);
        ctx.fillStyle = '#fafafa'; ctx.fillRect(-9, -18, 18, 36); ctx.fillStyle = d.c; ctx.fillRect(-9, -18, 18, 10);
        ctx.restore();
        break;
      }
      case 'cart': {
        if (this.prop(ctx, 'shopping_cart', d.x, d.y, 20, 28, d.a)) break;
        // брошенная тележка из супермаркета
        ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(d.a);
        ctx.strokeStyle = '#90a4ae'; ctx.lineWidth = 1.5; ctx.strokeRect(-8, -12, 16, 22);
        for (let i = -8; i <= 8; i += 4) { ctx.beginPath(); ctx.moveTo(i, -12); ctx.lineTo(i, 10); ctx.stroke(); }
        ctx.fillStyle = '#e53935'; ctx.fillRect(-9, 10, 18, 3);
        ctx.restore();
        break;
      }
      case 'bed': {
        if (this.prop(ctx, 'flower_bed', d.x, d.y, 182, 182)) break;
        // клумба 3 × 3 клетки в каменном бортике
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(d.x - 86, d.y - 86, 176, 176);
        ctx.fillStyle = '#bdb3a0'; ctx.fillRect(d.x - 90, d.y - 90, 180, 180);
        ctx.fillStyle = '#5d8a3a'; ctx.fillRect(d.x - 82, d.y - 82, 164, 164);
        ctx.fillStyle = '#6fa046'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.arc(d.x - 70 + (i * 37) % 140, d.y - 70 + (i * 53) % 140, 9, 0, TAU); ctx.fill(); }
        ctx.fillStyle = d.c; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(d.x - 76 + (i * 41) % 152, d.y - 76 + (i * 67) % 152, 3, 0, TAU); ctx.fill(); }
        break;
      }
      case 'fountainS': {
        if (this.prop(ctx, 'fountain_small', d.x, d.y, 88, 88)) break;
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.arc(d.x + 4, d.y + 4, 42, 0, TAU); ctx.fill();
        ctx.fillStyle = '#cfc6b4'; ctx.beginPath(); ctx.arc(d.x, d.y, 42, 0, TAU); ctx.fill();
        ctx.fillStyle = '#4fb3d9'; ctx.beginPath(); ctx.arc(d.x, d.y, 35, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(d.x, d.y, 22 + Math.sin(time * 3) * 3, 0, TAU); ctx.stroke();
        ctx.fillStyle = '#e8e2d4'; ctx.beginPath(); ctx.arc(d.x, d.y, 9, 0, TAU); ctx.fill();
        break;
      }
      case 'stain': {
        ctx.fillStyle = 'rgba(20,20,25,0.28)'; ctx.beginPath(); ctx.ellipse(d.x, d.y, 14, 9, d.a, 0, TAU); ctx.fill();
        break;
      }
      case 'bollard': {
        ctx.fillStyle = '#37474f'; ctx.beginPath(); ctx.arc(d.x, d.y, 6, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#fbc02d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(d.x, d.y, 4, 0, TAU); ctx.stroke();
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
      case 'billboard': {
        const a = DIR_ANGLE[d.d];
        ctx.save(); ctx.translate(tx, ty); ctx.rotate(a); ctx.scale(s, s);
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(-60, 6, 124, 40);
        ctx.drawImage(d.poster || Facades.adPoster(d.ad), -62, -20, 124, 44);
        ctx.restore();
        break;
      }
      case 'adcol': {
        if (this.prop(ctx, 'ad_column', tx, ty, 34 * s, 34 * s)) break;
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.arc(d.x + 5, d.y + 5, 15, 0, TAU); ctx.fill();
        ctx.fillStyle = '#2e5d3a'; ctx.beginPath(); ctx.arc(tx, ty, 16 * s, 0, TAU); ctx.fill();
        ctx.fillStyle = '#ffd54f'; ctx.beginPath(); ctx.arc(tx, ty, 6 * s, 0, TAU); ctx.fill();
        break;
      }
      case 'kiosk': {
        if (this.prop(ctx, 'kiosk', tx, ty, 56 * s, 50 * s)) break;
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(d.x - 22, d.y - 16, 54, 46);
        const im = Facades.awning(d.v);
        ctx.drawImage(im, tx - 27 * s, ty - 23 * s, 54 * s, 46 * s);
        break;
      }
      case 'container': {
        if (this.prop(ctx, 'container_top', tx, ty, 38 * s, 114 * s, d.a || 0)) break;
        ctx.save(); ctx.translate(tx, ty); ctx.rotate(d.a || 0); ctx.scale(s, s);
        ctx.fillStyle = d.two ? d.c2 : d.c; ctx.fillRect(-18, -56, 36, 112);
        ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1; for (let i = -50; i < 56; i += 8) { ctx.beginPath(); ctx.moveTo(-18, i); ctx.lineTo(18, i); ctx.stroke(); }
        ctx.restore();
        break;
      }
      case 'crates': {
        if (this.prop(ctx, 'crates', tx, ty, 46, 46)) break;
        for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#a1887f' : '#8d6e63'; ctx.fillRect(tx + (i % 2) * 22 - 21, ty + Math.floor(i / 2) * 22 - 21, 20, 20); ctx.strokeStyle = '#5d4037'; ctx.strokeRect(tx + (i % 2) * 22 - 21, ty + Math.floor(i / 2) * 22 - 21, 20, 20); }
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
