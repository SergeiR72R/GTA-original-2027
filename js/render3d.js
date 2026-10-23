// 3D-отрисовка на WebGL (Three.js): дома-коробки с фасадами, крыши с деталями,
// солнце с тенями, ночное освещение, машины-коробки со спрайтом сверху,
// люди и эффекты. Игровая логика остаётся 2D: мир (x, y) → (X, Z), высота — Y.
// Если WebGL недоступен, игра рисуется старым 2D-рендером.
'use strict';

const HS = 2.6;           // во сколько раз в 3D дома выше, чем в 2D-режиме
// высота в 3D: обычные дома заметно выше, высотки — с ограничением, чтобы не упирались в камеру
function h3(h) { return h <= 100 ? h * HS : 100 * HS + (h - 100) * 0.8; }
const CAR_H = { sedan: 15, hatch: 15, suv: 19, lux: 15, taxi: 15, police: 19, ambulance: 26, van: 26, pickup: 17, sherut: 26, bus: 32, garbage: 30, scooter: 7, moto: 7 };
const FACADE_OF = {
  bauhaus: 'bauhaus', florentin: 'florentin', hotel: 'hotel', warehouse: 'warehouse', cityhall: 'cityhall', templer: 'templer',
  mall: 'mall', hospital: 'hospital', police: 'police', garage: 'garage', busstation: 'busstation', concrete: 'concrete',
  nevetzedek: 'nevetzedek', jaffa: 'jaffa', tower: 'tower', fountain: 'concrete',
};
const SHOP_STYLES = { bauhaus: 1, florentin: 1, concrete: 1, jaffa: 1, nevetzedek: 1 };
const FACADE_VARIANTS = { bauhaus: 3, florentin: 3, concrete: 3 };
const PILOTIS_STYLES = { bauhaus: 1, concrete: 1 };
const SHOP_GEN_MAX = 8;
const TINTED = { bauhaus: 1, florentin: 1, concrete: 1, nevetzedek: 1, cityhall: 1, hospital: 1, police: 1, busstation: 1, garage: 1 };
const FOV = 50;
const TILT = 0.58; // наклон камеры (≈33°), чтобы видеть фасады; клавиша V — строго сверху, как в GTA2
// сгенерированные фасады (assets/gen/facades) для стилей районов
const FACADE_GEN = {
  bauhaus: 'facade_bauhaus', florentin: 'facade_florentin', jaffa: 'facade_jaffa', templer: 'facade_jaffa', nevetzedek: 'facade_nevetzedek',
  concrete: 'facade_concrete', hospital: 'facade_concrete', police: 'facade_concrete', busstation: 'facade_concrete', cityhall: 'facade_concrete',
  hotel: 'facade_hotel', tower: 'facade_tower', mall: 'facade_tower', warehouse: 'facade_warehouse', garage: 'facade_warehouse',
};
const LAMP_LIGHTS = 8;   // точечный свет ночных фонарей (днём выключен совсем)
// Качество графики: разрешение 3D-сцены, тени, число фонарей-источников света
const QUALITY = {
  high: { name: 'высокое', ratio: 1.5, shadow: 2048, lamps: 8 },
  medium: { name: 'среднее', ratio: 1.0, shadow: 1024, lamps: 4 },
  low: { name: 'низкое', ratio: 0.75, shadow: 0, lamps: 0 },
};
const QUALITY_ORDER = ['auto', 'high', 'medium', 'low'];

// Набор треугольников с нормалями, UV и цветами вершин — потом одна сетка
class Batch {
  constructor() { this.p = []; this.n = []; this.u = []; this.c = []; }
  vert(x, y, z, nx, ny, nz, u, v, col) { this.p.push(x, y, z); this.n.push(nx, ny, nz); this.u.push(u, v); this.c.push(col.r, col.g, col.b); }
  // четырёхугольник a-b-c-d против часовой стрелки, если смотреть снаружи
  quad(a, b, c, d, n, uv, col) {
    const V = (p, t) => this.vert(p[0], p[1], p[2], n[0], n[1], n[2], t[0], t[1], col);
    V(a, uv[0]); V(b, uv[1]); V(c, uv[2]);
    V(a, uv[0]); V(c, uv[2]); V(d, uv[3]);
  }
  // произвольный выпуклый многоугольник; нормаль из первых трёх точек, наружу/вверх
  poly(pts, col, uvf, up) {
    const [a, b, c] = pts;
    let nx = (b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1]);
    let ny = (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]);
    let nz = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    // порядок обхода должен совпадать с нормалью, иначе грань считается «изнанкой»
    if (up && ny < 0) { nx = -nx; ny = -ny; nz = -nz; pts = pts.slice().reverse(); }
    for (let i = 1; i < pts.length - 1; i++) for (const p of [pts[0], pts[i], pts[i + 1]]) {
      const t = uvf ? uvf(p) : [0, 0];
      this.vert(p[0], p[1], p[2], nx, ny, nz, t[0], t[1], col);
    }
  }
  // готовая геометрия Three.js (будет переведена в несвязанные треугольники)
  geo(g, col, uvf) {
    const ng = g.index ? g.toNonIndexed() : g;
    const P = ng.attributes.position.array, N = ng.attributes.normal.array, U = ng.attributes.uv ? ng.attributes.uv.array : null;
    const cols = Array.isArray(col) ? col : null;
    for (let i = 0; i < P.length / 3; i++) {
      const cc = cols ? cols[Math.floor(i / 3) % cols.length] : col;
      const t = uvf ? uvf(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]) : U ? [U[i * 2], U[i * 2 + 1]] : [0, 0];
      this.vert(P[i * 3], P[i * 3 + 1], P[i * 3 + 2], N[i * 3], N[i * 3 + 1], N[i * 3 + 2], t[0], t[1], cc);
    }
    if (ng !== g) ng.dispose();
    g.dispose();
  }
  box(cx, y0, cz, w, h, d, col, rotY) {
    const g = new THREE.BoxGeometry(w, h, d);
    if (rotY) g.rotateY(rotY);
    g.translate(cx, y0 + h / 2, cz);
    this.geo(g, col);
  }
  cyl(cx, y0, cz, rt, rb, h, seg, col, rotX, rotZ) {
    const g = new THREE.CylinderGeometry(rt, rb, h, seg);
    if (rotX) g.rotateX(rotX);
    if (rotZ) g.rotateZ(rotZ);
    g.translate(cx, y0 + (rotX || rotZ ? 0 : h / 2), cz);
    this.geo(g, col);
  }
  // плоскость, лежащая горизонтально (для крон, навесов, флагов, свечения)
  flat(cx, y, cz, w, d, rot, col) {
    const g = new THREE.PlaneGeometry(w, d);
    g.rotateX(-Math.PI / 2);
    if (rot) g.rotateY(-rot);
    g.translate(cx, y, cz);
    this.geo(g, col);
  }
  get empty() { return this.p.length === 0; }
  mesh(mat) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    g.computeBoundingSphere();
    return new THREE.Mesh(g, mat);
  }
}

const COL = (hex) => new THREE.Color(hex);
const WHITE = new THREE.Color(1, 1, 1);

const R3 = {
  ok: false,
  mats: {},
  chunks: new Map(),
  cars: new Map(),
  peds: new Map(),
  pickups: new Map(),
  decals: new Map(),
  extras: new Map(),

  // ---------------------------------------------------------------- запуск
  init(canvas) {
    if (typeof THREE === 'undefined' || /[?&]2d\b/.test(location.search)) return false;
    try {
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    } catch (e) { console.warn('WebGL недоступен — 2D-режим', e); return false; }
    const r = this.renderer;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFShadowMap;
    // какая видеокарта реально рисует (для диагностики, F3)
    try {
      const gl = r.getContext(), ext = gl.getExtension('WEBGL_debug_renderer_info');
      this.gpuName = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    } catch (e) { this.gpuName = '?'; }
    this.aniso = r.capabilities.getMaxAnisotropy();
    this.scene = new THREE.Scene();
    this.scene.background = COL('#2a6f9f');
    // туман есть всегда (иначе его появление пересобирает шейдеры);
    // без хамсина он отодвинут далеко за край экрана
    this.scene.fog = new THREE.Fog(0xd9a55e, 1e7, 2e7);
    this.camera = new THREE.PerspectiveCamera(FOV, 1, 50, 8000);
    this.camera.up.set(0, 0, -1);
    this.hemi = new THREE.HemisphereLight(0xfff6e8, 0x5d5a50, 0.6);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xfff1d6, 0.75);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0008;
    this.sun.shadow.normalBias = 1.5;
    const sc = this.sun.shadow.camera;
    sc.left = -1500; sc.right = 1500; sc.top = 1500; sc.bottom = -1500; sc.near = 10; sc.far = 4000;
    this.scene.add(this.sun, this.sun.target);
    // точечный свет: 2 всегда в сцене (мигалки погони, фары игрока), фонари — только ночью.
    // Число источников меняется лишь между «днём» и «ночью», шейдеры для обоих случаев
    // готовятся заранее (prewarm), чтобы на закате не было подвисания.
    this.sirenLights = [];
    for (let i = 0; i < 2; i++) { const l = new THREE.PointLight(0xff2a2a, 0, 260, 1.6); this.scene.add(l); this.sirenLights.push(l); }
    this.lampLights = [];
    for (let i = 0; i < LAMP_LIGHTS; i++) { const l = new THREE.PointLight(0xffc27a, 0, 300, 1.6); l.visible = false; this.scene.add(l); this.lampLights.push(l); }
    this.nearLamps = [];
    this.frameNo = 0;
    this.perf = { times: [], evalT: 0, slow: 0, fast: 0, lastDrop: -99, fps: 0, ms: 0, maxMs: 0 };
    let saved = 'auto';
    try { saved = localStorage.getItem('hamsin_quality') || 'auto'; } catch (e) { /* без сохранения */ }
    this.mode = QUALITY_ORDER.includes(saved) ? saved : 'auto';
    this.autoLevel = 'high';
    this.dropTaintedGen();
    this.ok = true;
    return true;
  },

  // Картинки, открытые с диска (file://), WebGL использовать не может — берём встроенные
  dropTaintedGen() {
    let dropped = 0;
    const c = document.createElement('canvas'); c.width = c.height = 1;
    const g = c.getContext('2d');
    for (const k of Object.keys(Assets.gen)) {
      try { g.clearRect(0, 0, 1, 1); g.drawImage(Assets.gen[k], 0, 0, 1, 1); g.getImageData(0, 0, 1, 1); }
      catch (e) { delete Assets.gen[k]; dropped++; }
    }
    if (dropped) {
      Tex.cache = {}; Tex.patterns = {};
      console.warn(`3D: ${dropped} сгенерированных картинок нельзя использовать при запуске с диска. Запустите start.sh или распакуйте bundle.js из импортёра.`);
      this.taintWarn = dropped;
    }
  },

  resize(w, h) {
    if (!this.ok) return;
    this.w = w; this.h = h;
    this.renderer.setPixelRatio(this.ratio || 1);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

  // ---------------------------------------------------------------- качество и производительность
  get q() { return QUALITY[this.mode === 'auto' ? this.autoLevel : this.mode]; },

  applyQuality(first) {
    const q = this.q;
    this.maxRatio = Math.min(window.devicePixelRatio || 1, q.ratio);
    this.ratio = this.maxRatio;
    const shadows = q.shadow > 0;
    const changed = !first && this.renderer.shadowMap.enabled !== shadows;
    this.renderer.shadowMap.enabled = shadows;
    this.sun.castShadow = shadows;
    if (shadows && this.sun.shadow.mapSize.x !== q.shadow) {
      this.sun.shadow.mapSize.set(q.shadow, q.shadow);
      if (this.sun.shadow.map) { this.sun.shadow.map.dispose(); this.sun.shadow.map = null; }
    }
    // тени включили/выключили — материалам нужны другие шейдеры
    if (changed) this.scene.traverse((o) => { if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.needsUpdate = true; }); });
    if (this.w) this.resize(this.w, this.h);
    if (!first) this.prewarm();
  },

  setMode(mode) {
    this.mode = mode;
    try { localStorage.setItem('hamsin_quality', mode); } catch (e) { /* без сохранения */ }
    if (mode === 'auto') this.autoLevel = 'high';
    this.applyQuality();
  },

  cycleQuality() {
    this.setMode(QUALITY_ORDER[(QUALITY_ORDER.indexOf(this.mode) + 1) % QUALITY_ORDER.length]);
    return this.mode === 'auto' ? `авто (${QUALITY[this.autoLevel].name})` : QUALITY[this.mode].name;
  },

  // Заранее компилируем шейдеры для «дня» и «ночи», чтобы переход не давал рывка
  prewarm() {
    const lamps = this.lampLights;
    lamps.forEach((l) => { l.visible = false; });
    this.renderer.compile(this.scene, this.camera);
    lamps.forEach((l, i) => { l.visible = i < this.q.lamps; });
    this.renderer.compile(this.scene, this.camera);
    lamps.forEach((l) => { l.visible = false; });
    this.nightLights = false;
  },

  // Учёт времени кадров; в режиме «авто» плавно меняем разрешение 3D-сцены
  frame(realDt) {
    const P = this.perf;
    // пауза после скрытой вкладки — не показатель скорости
    if (realDt <= 0 || realDt > 1 || document.hidden) return;
    P.times.push(realDt * 1000);
    if (P.times.length > 120) P.times.shift();
    P.evalT += realDt;
    if (P.evalT < 1.5) return;
    P.evalT = 0;
    const sorted = P.times.slice().sort((a, b) => a - b);
    const med = sorted[Math.floor(sorted.length / 2)];
    P.ms = med; P.fps = Math.round(1000 / med); P.maxMs = sorted[sorted.length - 1];
    if (this.mode !== 'auto' || Game.state === 'pause') return;
    const now = performance.now() / 1000;
    if (med > 19.5) {
      P.slow++; P.fast = 0;
      if (this.ratio > 0.62) {
        this.ratio = Math.max(0.6, this.ratio - 0.15); P.lastDrop = now;
        this.resize(this.w, this.h);
      } else if (P.slow >= 3 && this.autoLevel !== 'low') {
        this.autoLevel = this.autoLevel === 'high' ? 'medium' : 'low'; P.slow = 0; P.lastDrop = now;
        this.applyQuality();
        this.ratio = Math.min(this.maxRatio, 0.9); this.resize(this.w, this.h);
      }
    } else if (med < 17.4) {
      P.slow = 0; P.fast++;
      // повышаем осторожно, чтобы разрешение не «прыгало» туда-сюда
      if (P.fast >= 6 && now - P.lastDrop > 30 && this.ratio < this.maxRatio) { this.ratio = Math.min(this.maxRatio, this.ratio + 0.1); P.fast = 0; this.resize(this.w, this.h); }
    }
  },

  tex(src, repeat) {
    const t = src.isTexture ? src : new THREE.CanvasTexture(src);
    t.anisotropy = this.aniso;
    if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
    return t;
  },

  // ---------------------------------------------------------------- материалы
  buildMaterials() {
    const M = this.mats;
    const side = THREE.DoubleSide;
    const facadeMat = (map, emissive, ud) => {
      const m = new THREE.MeshLambertMaterial({ map: this.tex(map, true), emissiveMap: this.tex(emissive, true), emissive: WHITE, emissiveIntensity: 0, vertexColors: true, side });
      m.userData = ud;
      return m;
    };
    // фасады: сгенерированные (2 пролёта × 2 этажа) или процедурные (4 × 2, у типовых домов — 3 варианта)
    for (const st of new Set(Object.values(FACADE_OF))) {
      const gen = Assets.gen['facades/' + FACADE_GEN[st]];
      const n = FACADE_VARIANTS[st] || 1;
      for (let v = 0; v < n; v++) {
        if (gen) M[`f_${st}_${v}`] = facadeMat(gen, this.windowGlow(gen), { fw: FACADE_H * gen.width / gen.height, fh: FACADE_H, gen: true });
        else { const f = Facades.facade(st, v); M[`f_${st}_${v}`] = facadeMat(f.map, f.emissive, { fw: FACADE_W, fh: FACADE_H }); }
      }
    }
    // витрины первых этажей: сгенерированные (одна витрина на картинку) вперемешку с процедурными (4 в ряд)
    this.shopMats = [];
    for (let i = 0; i < SHOP_GEN_MAX; i++) {
      const gen = Assets.gen['facades/shop_' + (i + 1)];
      if (!gen) continue;
      M['shopg' + i] = facadeMat(gen, this.windowGlow(gen), { fw: FLOOR_H * gen.width / gen.height, fh: FLOOR_H, gen: true });
      this.shopMats.push('shopg' + i);
    }
    for (let i = 0; i < 6; i++) {
      const f = Facades.shopfront(i);
      M['shop' + i] = facadeMat(f.map, f.emissive, { fw: FACADE_W, fh: FLOOR_H });
      this.shopMats.push('shop' + i);
    }
    // первый этаж на сваях
    const pil = Facades.pilotis();
    M.pil = facadeMat(pil.map, pil.emissive, { fw: FACADE_W, fh: FLOOR_H, gen: true });
    for (const r of ['roofGravel', 'roofTiles', 'roofMetal']) M[r] = new THREE.MeshLambertMaterial({ map: this.tex(Tex.get(r), true), vertexColors: true, side });
    M.roofGlass = new THREE.MeshLambertMaterial({ vertexColors: true, side });
    M.props = new THREE.MeshLambertMaterial({ vertexColors: true, side });
    const foliage = (c) => new THREE.MeshLambertMaterial({ map: this.tex(c), alphaTest: 0.5, side, vertexColors: true });
    M.palm = foliage(Facades.palm());
    M.tree0 = foliage(Facades.tree(0));
    M.tree1 = foliage(Facades.tree(1));
    M.boug = foliage(Facades.bougainvillea());
    M.flag = foliage(Facades.flag());
    for (let i = 0; i < 4; i++) M['awn' + i] = foliage(Facades.awning(i));
    M.lampHead = new THREE.MeshBasicMaterial({ color: 0x9aa0a6 });
    M.glow = new THREE.MeshBasicMaterial({ map: this.tex(Facades.glow('rgba(255,190,110,1)')), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 });
    M.headlights = new THREE.MeshBasicMaterial({ map: this.tex(Facades.headlights()), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 });
    M.sirenR = new THREE.MeshBasicMaterial({ map: this.tex(Facades.glow('rgba(255,40,40,1)')), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    M.sirenB = new THREE.MeshBasicMaterial({ map: this.tex(Facades.glow('rgba(60,120,255,1)')), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    M.ground = new THREE.MeshLambertMaterial({ color: 0x56703e });
    M.water = new THREE.MeshBasicMaterial({ map: this.tex(Facades.water(), true), transparent: true, depthWrite: false, opacity: 0.6 });
    M.markRed = new THREE.MeshBasicMaterial({ color: 0xff3b3b });
    M.markGreen = new THREE.MeshBasicMaterial({ color: 0x4caf50 });
    M.markYellow = new THREE.MeshBasicMaterial({ color: 0xffd400 });
    M.ring = new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.8, side, depthWrite: false });
    M.phone = new THREE.MeshLambertMaterial({ color: 0x1565c0 });
    this.facadeMats = Object.keys(M).filter((k) => k.startsWith('f_') || k.startsWith('shop')).map((k) => M[k]);
  },

  // Карта ночного свечения для сгенерированного фасада: тёмные стёкла окон
  // загораются тёплым светом (примерно половина окон)
  windowGlow(img) {
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0);
    let data;
    try { data = g.getImageData(0, 0, c.width, c.height); } catch (e) { g.fillStyle = '#000'; g.fillRect(0, 0, c.width, c.height); return c; }
    const d = data.data, W = c.width, cell = Math.max(8, Math.round(W / 24));
    const rng = makeRng(W * 7 + c.height);
    const lit = new Map();
    for (let i = 0; i < d.length; i += 4) {
      const p = i / 4, x = p % W, y = (p / W) | 0;
      const lum = 0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];
      const glass = lum < 105 && d[i + 2] >= d[i] - 12;
      const key = ((y / cell) | 0) * 1000 + ((x / cell) | 0);
      if (!lit.has(key)) lit.set(key, rng() < 0.45);
      if (glass && lit.get(key)) { d[i] = 255; d[i + 1] = 205; d[i + 2] = 130; } else { d[i] = d[i + 1] = d[i + 2] = 0; }
    }
    g.putImageData(data, 0, 0);
    return c;
  },

  // ---------------------------------------------------------------- статичный город
  build() {
    this.buildMaterials();
    const S = this.scene;
    // земля за краем карты и море на западе
    const out = new THREE.Mesh(new THREE.PlaneGeometry(30000, 30000).rotateX(-Math.PI / 2), this.mats.ground);
    out.position.set(City.W * TILE / 2, -2, City.H * TILE / 2); out.receiveShadow = true; S.add(out);
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(12000, 30000).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x2a6f9f }));
    sea.position.set(-6000 + 5 * TILE, -1, City.H * TILE / 2); S.add(sea);
    // анимированная рябь поверх моря
    const wg = new THREE.PlaneGeometry(5 * TILE, City.H * TILE).rotateX(-Math.PI / 2);
    this.waterTex = this.mats.water.map;
    this.waterTex.repeat.set(5 * TILE / 160, City.H * TILE / 160);
    this.water = new THREE.Mesh(wg, this.mats.water);
    this.water.position.set(2.5 * TILE, 0.4, City.H * TILE / 2);
    S.add(this.water);

    const cw = Math.ceil(City.W / CHUNK), ch = Math.ceil(City.H / CHUNK);
    for (let cy = 0; cy < ch; cy++) for (let cx = 0; cx < cw; cx++) {
      const batches = {};
      const B = (m) => batches[m] || (batches[m] = new Batch());
      for (const b of City.bgrid[cy * cw + cx]) this.building(b, B);
      for (const d of City.dgrid[cy * cw + cx]) this.decor(d, B);
      for (const k in batches) {
        if (batches[k].empty) continue;
        const m = batches[k].mesh(this.mats[k]);
        const glowy = k === 'glow' || k === 'lampHead';
        m.castShadow = !glowy;
        m.receiveShadow = !glowy && k !== 'palm' && !k.startsWith('tree');
        S.add(m);
      }
    }
    // таблички и вывески на крышах — отдельными плоскостями
    for (const b of City.buildings) if (b.sign || b.label) this.roofSign(b);
    this.applyQuality(true);
    // заранее рисуем спрайты всех машин всех цветов: первый показ не даст рывка
    for (const t in VTYPES) {
      const cols = new Set(CAR_PALETTE.map((c) => c[0]));
      if (VTYPES[t].color) cols.add(VTYPES[t].color);
      for (const f in FACTIONS) if (FACTIONS[f].car === t) Vehicles.sprite(t, FACTIONS[f].carColor || VTYPES[t].color || '#141518', f);
      for (const c of cols) Vehicles.sprite(t, c);
    }
  },

  building(b, B) {
    const style = FACADE_OF[b.style] || 'concrete';
    const y0 = h3(b.h0), y1 = h3(b.h1);
    const tint = TINTED[style] ? COL(b.style === 'nevetzedek' || b.style === 'jaffa' ? b.wall : b.roof).lerp(WHITE, 0.25) : WHITE;
    const pts = b.pts;
    const n = pts.length;
    const tall = b.kind === 'rect' && y1 - y0 > FLOOR_H * 2.2;
    const shops = b.shops && SHOP_STYLES[b.style] && tall;
    // дом на сваях — типичный тель-авивский баухауз и шикун
    const pilotis = !shops && tall && PILOTIS_STYLES[b.style] && b.id % 5 < 2;
    const shopMat = shops ? this.shopMats[b.id % this.shopMats.length] : pilotis ? 'pil' : null;
    const fmat = `f_${style}_${b.id % (FACADE_VARIANTS[style] || 1)}`;
    for (let i = 0; i < n; i++) {
      const a = pts[i], c = pts[(i + 1) % n];
      const len = Math.hypot(c[0] - a[0], c[1] - a[1]);
      const nx = (c[1] - a[1]) / len, nz = -(c[0] - a[0]) / len;
      const wall = (mat, ya, yb, vOff) => {
        const ud = this.mats[mat].userData;
        const u1 = len / ud.fw, vh = ud.fh;
        // сгенерированные фасады уже раскрашены — не тонируем
        const col = mat.startsWith('shop') || ud.gen ? WHITE : tint;
        B(mat).quad([c[0], ya, c[1]], [a[0], ya, a[1]], [a[0], yb, a[1]], [c[0], yb, c[1]], [nx, 0, nz],
          [[0, vOff], [u1, vOff], [u1, vOff + (yb - ya) / vh], [0, vOff + (yb - ya) / vh]], col);
      };
      if (shopMat) {
        // разные витрины на разных стенах одного дома
        const sm = shops ? this.shopMats[(b.id + i) % this.shopMats.length] : shopMat;
        wall(sm, y0, y0 + FLOOR_H, 0);
        wall(fmat, y0 + FLOOR_H, y1, 0);
      } else wall(fmat, y0, y1, (b.id % 2) * 0.5);
    }
    // крыша
    const rc = COL(b.roof);
    const roofMat = b.glass ? 'roofGlass' : (b.texture || 'roofGravel');
    const uvw = (p) => [p[0] / 128, p[2] / 128];
    if (b.texture === 'roofTiles' && b.kind === 'rect') this.pitchedRoof(b, y1, B(roofMat), rc);
    else B(roofMat).poly(pts.map((p) => [p[0], y1, p[1]]), rc, uvw, true);
    if (b.parapet && b.kind === 'rect' && !b.glass) {
      const pc = COL(b.roof).multiplyScalar(1.04), t = 4, ph = 6;
      const { x0, y0: z0, x1, y1: z1 } = b.bb;
      const P = B('props');
      P.box((x0 + x1) / 2, y1, z0 + t / 2, x1 - x0, ph, t, pc);
      P.box((x0 + x1) / 2, y1, z1 - t / 2, x1 - x0, ph, t, pc);
      P.box(x0 + t / 2, y1, (z0 + z1) / 2, t, ph, z1 - z0 - 2 * t, pc);
      P.box(x1 - t / 2, y1, (z0 + z1) / 2, t, ph, z1 - z0 - 2 * t, pc);
    }
    if (b.items.length) this.roofItems(b, y1, B);
  },

  // Двускатная черепичная крыша (Неве-Цедек, Сарона)
  pitchedRoof(b, y, R, col) {
    const { x0, y0: z0, x1, y1: z1 } = b.bb;
    const w = x1 - x0, d = z1 - z0;
    const rh = Math.min(w, d) * 0.32;
    const uv = (p) => [(p[0] + p[1] * 0.5) / 64, (p[2] + p[1] * 0.5) / 64];
    if (w >= d) {
      const zc = (z0 + z1) / 2, ra = [x0 + d / 2, y + rh, zc], rb = [x1 - d / 2, y + rh, zc];
      R.poly([[x0, y, z0], [x1, y, z0], rb, ra], col, uv, true);
      R.poly([[x1, y, z1], [x0, y, z1], ra, rb], col, uv, true);
      R.poly([[x0, y, z1], [x0, y, z0], ra], col.clone().multiplyScalar(0.9), uv, true);
      R.poly([[x1, y, z0], [x1, y, z1], rb], col.clone().multiplyScalar(0.9), uv, true);
    } else {
      const xc = (x0 + x1) / 2, ra = [xc, y + rh, z0 + w / 2], rb = [xc, y + rh, z1 - w / 2];
      R.poly([[x0, y, z1], [x0, y, z0], ra, rb], col, uv, true);
      R.poly([[x1, y, z0], [x1, y, z1], rb, ra], col, uv, true);
      R.poly([[x0, y, z0], [x1, y, z0], ra], col.clone().multiplyScalar(0.9), uv, true);
      R.poly([[x1, y, z1], [x0, y, z1], rb], col.clone().multiplyScalar(0.9), uv, true);
    }
  },

  roofItems(b, y, B) {
    const P = B('props');
    const { x0, y0: z0, x1, y1: z1 } = b.bb;
    const W = x1 - x0, D = z1 - z0;
    for (const it of b.items) {
      const x = x0 + it.u * W, z = z0 + it.v * D;
      switch (it.t) {
        case 'solar': {
          // «дуд шемеш»: наклонная панель и белый бак на стойках
          const g = new THREE.BoxGeometry(22, 2, 16); g.rotateX(-0.45); g.translate(x + 11, y + 6, z + 8); P.geo(g, COL('#1f3b5c'));
          const fr = new THREE.BoxGeometry(23, 1, 17); fr.rotateX(-0.45); fr.translate(x + 11, y + 5.4, z + 8); P.geo(fr, COL('#9fb7cc'));
          P.cyl(x + 11, y + 12, z - 3, 4.5, 4.5, 24, 10, COL('#f2f2ee'), 0, Math.PI / 2);
          P.box(x + 2, y, z - 3, 2, 10, 2, COL('#888888')); P.box(x + 20, y, z - 3, 2, 10, 2, COL('#888888'));
          break;
        }
        case 'tank': P.cyl(x, y, z, 7, 7, 12, 10, COL('#2a2a2a')); break;
        case 'ac': P.box(x + 6, y, z + 5, 12, 8, 10, COL('#e0e0e0')); P.cyl(x + 6, y + 8, z + 5, 3.5, 3.5, 0.6, 8, COL('#888888')); break;
        case 'stairs': P.box(x + 11, y, z + 9, 22, 20, 18, COL(b.roof).multiplyScalar(0.92)); P.box(x + 11, y, z + 18.2, 8, 14, 0.6, COL('#6d4c41')); break;
        case 'antenna': P.box(x, y, z, 1.5, 30, 1.5, COL('#666666')); P.box(x, y + 26, z, 16, 1, 1, COL('#666666')); P.box(x, y + 21, z, 10, 1, 1, COL('#666666')); break;
        case 'dish': P.cyl(x, y + 6, z, 6, 6, 1.5, 12, COL('#f5f5f5'), 0.7); P.box(x, y, z, 1.5, 6, 1.5, COL('#999999')); break;
        case 'laundry': {
          P.box(x + 20, y + 12, z, 40, 0.6, 0.6, COL('#777777'));
          for (let i = 0; i < 5; i++) P.box(x + 4 + i * 8, y + 4, z, 5, 8, 1, COL(it.c[i % 3]));
          break;
        }
        case 'plants': for (let i = 0; i < 4; i++) { P.box(x + i * 9, y, z, 7, 6, 7, COL('#8d5a3b')); P.box(x + i * 9, y + 6, z, 8, 6, 8, COL(i % 2 ? '#43a047' : '#e91e63')); } break;
        case 'flag': P.box(x, y, z, 1.5, 40, 1.5, COL('#dddddd')); B('flag').flat(x + 13, y + 40, z + 6, 26, 17, 0, WHITE); break;
        case 'pool': {
          const pw = it.w * W, pd = it.h * D;
          P.box(x + pw / 2, y, z + pd / 2, pw + 6, 1.2, pd + 6, COL('#ffffff'));
          P.box(x + pw / 2, y + 0.2, z + pd / 2, pw, 1.2, pd, COL('#3fb6e0'));
          break;
        }
        case 'fountain': P.cyl((x0 + x1) / 2, y, (z0 + z1) / 2, W * 0.2, W * 0.22, 6, 16, COL('#e6eef2')); P.cyl((x0 + x1) / 2, y + 6, (z0 + z1) / 2, 3, 3, 30, 8, COL('#cfd8dc')); break;
        case 'clock': P.box((x0 + x1) / 2, y, (z0 + z1) / 2, W * 0.6, 14, D * 0.6, COL('#c9a46a')); P.cyl((x0 + x1) / 2, y + 14, (z0 + z1) / 2, W * 0.22, W * 0.22, 1, 16, COL('#efe7d2')); break;
      }
    }
  },

  // Плоская вывеска на крыше
  roofSign(b) {
    const c = document.createElement('canvas');
    const w = b.bb.x1 - b.bb.x0, h = b.bb.y1 - b.bb.y0;
    let sw, sh;
    const g = c.getContext('2d');
    if (b.label === 'H') {
      c.width = c.height = 256; sw = sh = Math.min(w, h) * 0.7;
      g.strokeStyle = '#fff'; g.lineWidth = 14; g.beginPath(); g.arc(128, 128, 110, 0, TAU); g.stroke();
      g.fillStyle = '#e53935'; g.font = 'bold 150px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('H', 128, 136);
    } else {
      const sg = b.sign || (b.label === 'POLICE' ? { text: 'משטרה', bg: '#1d4fa3', fg: '#fff' } : { text: 'ПОКРАСКА', bg: '#5b4a6d', fg: '#ffeb3b' });
      c.width = 512; c.height = sg.sub ? 160 : 112;
      g.fillStyle = sg.bg; g.fillRect(0, 0, c.width, c.height);
      g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 6; g.strokeRect(6, 6, c.width - 12, c.height - 12);
      g.fillStyle = sg.fg; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = 'bold 64px Arial, sans-serif'; g.fillText(sg.text, 256, sg.sub ? 58 : 58, 480);
      if (sg.sub) { g.font = '40px Arial, sans-serif'; g.fillText(sg.sub, 256, 122, 480); }
      sw = Math.min(w * 0.9, 180); sh = sw * c.height / c.width;
    }
    const m = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: this.tex(c), emissive: WHITE, emissiveMap: this.tex(c), emissiveIntensity: 0 }));
    const y = h3(b.h1) + (b.label === 'H' ? 0.6 : 10);
    m.position.set((b.bb.x0 + b.bb.x1) / 2, y, b.label === 'H' ? (b.bb.y0 + b.bb.y1) / 2 : b.bb.y0 + h * 0.62);
    this.scene.add(m);
    if (b.label !== 'H') {
      // стойки билборда
      const legs = new Batch();
      legs.box(m.position.x - sw * 0.35, h3(b.h1), m.position.z, 2, 10, 2, COL('#555555'));
      legs.box(m.position.x + sw * 0.35, h3(b.h1), m.position.z, 2, 10, 2, COL('#555555'));
      this.scene.add(legs.mesh(this.mats.props));
      (this.signMats || (this.signMats = [])).push(m.material);
    }
  },

  decor(d, B) {
    const P = B('props');
    const trunk = COL('#7b5a33');
    switch (d.k) {
      case 'palm': {
        const h = d.h * 2.2;
        // ствол слегка изогнут: два сегмента
        P.cyl(d.x, 0, d.y, 3, 4.5, h * 0.55, 6, trunk);
        P.cyl(d.x + 2, h * 0.55, d.y + 1, 2.6, 3, h * 0.45, 6, trunk);
        B('palm').flat(d.x + 2, h, d.y + 1, 100, 100, d.r, WHITE);
        B('palm').flat(d.x + 2, h - 6, d.y + 1, 80, 80, d.r + 0.4, COL('#cfcfcf'));
        break;
      }
      case 'tree': case 'treeS': {
        const s = (d.s || (d.k === 'tree' ? 0.55 : 0.6)) * (d.k === 'tree' ? 214 : 141);
        const h = (d.h || 40) * 1.8;
        P.cyl(d.x, 0, d.y, 3, 4, h, 6, trunk);
        B(Math.floor(d.x + d.y) % 2 ? 'tree0' : 'tree1').flat(d.x, h, d.y, s, s, (d.x * 0.01) % TAU, WHITE);
        break;
      }
      case 'bougainvillea': B('boug').flat(d.x, 9, d.y, 46, 46, d.r, WHITE); P.cyl(d.x, 0, d.y, 4, 6, 9, 6, COL('#4a6b2f')); break;
      case 'lamp': {
        const D = DIRS[d.d];
        const hx = d.x + D.x * 16, hz = d.y + D.y * 16;
        P.cyl(d.x, 0, d.y, 1.6, 2.2, 90, 6, COL('#4a4f55'));
        P.box((d.x + hx) / 2, 88, (d.y + hz) / 2, Math.abs(hx - d.x) + 2, 2, Math.abs(hz - d.y) + 2, COL('#4a4f55'));
        B('lampHead').box(hx, 85, hz, 10, 3, 10, WHITE);
        B('glow').flat(hx, 1.2, hz, 240, 240, 0, WHITE);
        d.hx = hx; d.hz = hz;
        break;
      }
      case 'flag': P.cyl(d.x, 0, d.y, 1.2, 1.5, d.h * 1.6, 6, COL('#cccccc')); B('flag').flat(d.x + 14, d.h * 1.6, d.y + 8, 28, 19, 0, WHITE); break;
      case 'lifeguard': {
        const h = 40;
        for (const [ox, oz] of [[-16, -16], [16, -16], [-16, 16], [16, 16]]) P.box(d.x + ox, 0, d.y + oz, 2.5, h, 2.5, COL('#8d6e63'));
        P.box(d.x, h, d.y, 44, 22, 44, COL('#f5f5f5'));
        P.box(d.x, h + 22, d.y, 48, 3, 48, COL('#e53935'));
        break;
      }
      case 'umbrella': {
        P.cyl(d.x, 0, d.y, 0.8, 0.8, 30, 4, COL('#dddddd'));
        // купол из 8 цветных сегментов
        for (let i = 0; i < 8; i++) {
          const a0 = i / 8 * TAU, a1 = (i + 1) / 8 * TAU;
          P.poly([[d.x, 39, d.y], [d.x + Math.cos(a0) * 24, 30, d.y + Math.sin(a0) * 24], [d.x + Math.cos(a1) * 24, 30, d.y + Math.sin(a1) * 24]], i % 2 ? COL(d.c) : WHITE, null, true);
        }
        break;
      }
      case 'stall': {
        P.box(d.x, 0, d.y + 18, 54, 8, 14, COL('#8d6e63'));
        for (let i = 0; i < 5; i++) P.box(d.x - 22 + i * 11, 8, d.y + 18, 8, 5, 8, COL(d.fr));
        P.box(d.x - 26, 0, d.y - 20, 2, 26, 2, COL('#777777')); P.box(d.x + 26, 0, d.y - 20, 2, 26, 2, COL('#777777'));
        B('awn' + (Math.floor(d.x / 64) % 4)).flat(d.x, 26, d.y, 62, 54, 0, WHITE);
        break;
      }
    }
  },

  // ---------------------------------------------------------------- земля по чанкам
  groundChunk(cx, cy) {
    const key = cy * 100 + cx;
    let o = this.chunks.get(key);
    if (o) { o.used = true; return; }
    const size = CHUNK * TILE;
    const src = City.getChunk(cx, cy);
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    g.drawImage(src, 0, 0);
    // низкие объекты (клетки, мусорки, остановки…) вжигаем в текстуру земли
    g.save(); g.translate(-cx * size, -cy * size);
    const cw = Math.ceil(City.W / CHUNK);
    for (const d of City.lgrid[cy * cw + cx]) if (d.k !== 'matkot') City.drawLowItem(g, d, 0);
    g.restore();
    const t = this.tex(c);
    this.renderer.initTexture(t); // загружаем в видеокарту сразу, а не в момент первого показа
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: t }));
    m.position.set(cx * size + size / 2, 0, cy * size + size / 2);
    m.receiveShadow = true;
    this.scene.add(m);
    this.chunks.set(key, { mesh: m, used: true });
  },

  // Участки земли: видимые создаём сразу, соседние — заранее, по одному за кадр
  updateGround(view) {
    const cs = CHUNK * TILE;
    const cw = Math.ceil(City.W / CHUNK), ch = Math.ceil(City.H / CHUNK);
    for (const o of this.chunks.values()) o.used = false;
    const range = (m) => [
      Math.max(0, Math.floor((view.x0 - m) / cs)), Math.min(cw - 1, Math.floor((view.x1 + m) / cs)),
      Math.max(0, Math.floor((view.y0 - m) / cs)), Math.min(ch - 1, Math.floor((view.y1 + m) / cs)),
    ];
    let budget = 1;
    const ensure = (m, force) => {
      const [x0, x1, y0, y1] = range(m);
      for (let cy = y0; cy <= y1; cy++) for (let cx = x0; cx <= x1; cx++) {
        const o = this.chunks.get(cy * 100 + cx);
        if (o) { o.used = true; continue; }
        if (force || budget > 0) { budget--; this.groundChunk(cx, cy); }
      }
    };
    ensure(40, true);  // то, что уже на экране, — обязательно
    ensure(900, false); // запас вокруг — постепенно
    if (this.chunks.size > 120) {
      for (const [k, o] of this.chunks) {
        if (o.used) continue;
        this.scene.remove(o.mesh); o.mesh.geometry.dispose(); o.mesh.material.map.dispose(); o.mesh.material.dispose();
        this.chunks.delete(k);
        if (this.chunks.size <= 100) break;
      }
    }
  },

  // ---------------------------------------------------------------- машины
  makeCar(car) {
    const h = CAR_H[car.type] || 15;
    const cv = document.createElement('canvas');
    cv.width = Math.ceil(car.w * 2); cv.height = Math.ceil(car.l * 2);
    const top = new THREE.MeshLambertMaterial({ map: this.tex(cv) });
    const side = new THREE.MeshLambertMaterial({ color: COL(car.color).multiplyScalar(0.7) });
    const body = new THREE.Mesh(new THREE.BoxGeometry(car.w, h, car.l), [side, side, top, side, side, side]);
    body.position.y = h / 2 + (car.moto ? 1 : 3);
    body.castShadow = true; body.receiveShadow = true;
    const grp = new THREE.Group();
    grp.add(body);
    // колёса — тёмная полоса под кузовом
    if (!car.moto) {
      const wheels = new THREE.Mesh(new THREE.BoxGeometry(car.w + 2, 5, car.l * 0.8), new THREE.MeshLambertMaterial({ color: 0x151515 }));
      wheels.position.y = 3; grp.add(wheels);
    }
    const head = new THREE.Mesh(new THREE.PlaneGeometry(car.w * 2.6, 170).rotateX(-Math.PI / 2), this.mats.headlights);
    head.position.set(0, 1.5, -car.l / 2 - 85);
    grp.add(head);
    const o = { grp, body, cv, top, side, head, key: '', h };
    if (car.police || car.type === 'ambulance') {
      o.lr = new THREE.Mesh(new THREE.BoxGeometry(car.w * 0.32, 3, 6), new THREE.MeshBasicMaterial({ color: car.police ? 0xff2a2a : 0xff9800 }));
      o.lb = new THREE.Mesh(new THREE.BoxGeometry(car.w * 0.32, 3, 6), new THREE.MeshBasicMaterial({ color: car.police ? 0x3f8cff : 0xff2a2a }));
      const ly = h + (car.moto ? 1 : 3) + 1.5, lz = car.police ? -car.l * 0.06 : -car.l / 2 + 14;
      o.lr.position.set(-car.w * 0.18, ly, lz); o.lb.position.set(car.w * 0.18, ly, lz);
      o.glowR = new THREE.Mesh(new THREE.PlaneGeometry(120, 120).rotateX(-Math.PI / 2), this.mats.sirenR); o.glowR.position.set(-20, 2, lz);
      o.glowB = new THREE.Mesh(new THREE.PlaneGeometry(120, 120).rotateX(-Math.PI / 2), this.mats.sirenB); o.glowB.position.set(20, 2, lz);
      grp.add(o.lr, o.lb, o.glowR, o.glowB);
    }
    this.scene.add(grp);
    return o;
  },

  drawCarTex(o, car) {
    const g = o.cv.getContext('2d');
    const w = car.w, l = car.l;
    g.clearRect(0, 0, o.cv.width, o.cv.height);
    g.save(); g.scale(o.cv.width / w, o.cv.height / l); g.translate(w / 2, l / 2);
    const stage = car.stage;
    let shown = 0;
    if (car.genKey) {
      const gi = Vehicles.genForStage(car.genKey, stage);
      g.drawImage(gi.img, -w / 2, -l / 2, w, l);
      shown = gi.stage;
    } else {
      const spr = Vehicles.sprite(car.type, car.color, car.faction);
      g.drawImage(spr, -spr.width / 4, -spr.height / 4, spr.width / 2, spr.height / 2);
    }
    if (stage >= 1 && stage <= 2 && shown < stage) Vehicles.drawDamage(g, car, stage);
    else if (stage === 0 && car.dents.length) Vehicles.drawDamage(g, car, 0);
    if (car.moto && car.driver) {
      const L = car.driver === 'player' ? World.player.look : car.driver.look;
      if (L) { g.save(); g.translate(0, 4); g.rotate(-Math.PI / 2); drawPersonLook(g, L, 0, false, null, false); g.restore(); }
    }
    if (car.dead && shown < 3) { g.fillStyle = 'rgba(25,20,18,0.85)'; g.fillRect(-w / 2, -l / 2, w, l); }
    g.restore();
    o.top.map.needsUpdate = true;
    o.side.color.copy(COL(car.dead && shown < 3 ? '#2a2420' : car.color)).multiplyScalar(0.7);
  },

  syncCars(view, night) {
    const fn = this.frameNo;
    let budget = 2;
    for (const car of World.cars) {
      car._r3 = fn; // машина ещё существует
      let o = this.cars.get(car);
      const inView = !(car.x < view.x0 - 200 || car.x > view.x1 + 200 || car.y < view.y0 - 200 || car.y > view.y1 + 200);
      if (!inView) { if (o) o.grp.visible = false; continue; }
      if (!o) {
        if (budget-- <= 0) continue; // остальные — в следующих кадрах
        o = this.makeCar(car); this.cars.set(car, o);
      }
      o.grp.visible = true;
      // текстуру перерисовываем только при смене вида/повреждений
      const st = car.stage * 1000 + car.dents.length * 10 + (car.dead ? 1 : 0) + (car.driver ? 2 : 0);
      if (st !== o.st || car.color !== o.color || car.genKey !== o.genKey || car.type !== o.type) {
        o.st = st; o.color = car.color; o.genKey = car.genKey; o.type = car.type;
        this.drawCarTex(o, car);
      }
      o.grp.position.set(car.x, 0, car.y);
      o.grp.rotation.y = -car.a;
      o.head.visible = night > 0.05 && !!car.driver && !car.dead;
      if (o.lr) {
        const on = Math.floor(World.time * 6) % 2 === 0;
        const live = !car.dead && (car.siren || car.type === 'ambulance' && car.driver);
        o.lr.visible = o.lb.visible = !car.dead;
        o.lr.material.color.setHex(live && on ? 0xff2a2a : 0x551010);
        o.lb.material.color.setHex(live && !on ? 0x3f8cff : 0x10204a);
        o.glowR.visible = live && on; o.glowB.visible = live && !on;
      }
    }
    for (const [car, o] of this.cars) if (car._r3 !== fn) this.dropCar(car, o);
  },

  dropCar(car, o) {
    this.scene.remove(o.grp);
    o.grp.traverse((m) => { if (m.geometry) m.geometry.dispose(); });
    o.top.map.dispose(); o.top.dispose(); o.side.dispose();
    if (o.lr) { o.lr.material.dispose(); o.lb.material.dispose(); }
    this.cars.delete(car);
  },

  // ---------------------------------------------------------------- люди
  makePed() {
    const cv = document.createElement('canvas'); cv.width = cv.height = 80;
    const mat = new THREE.MeshLambertMaterial({ map: this.tex(cv), transparent: true, depthWrite: false });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(40, 40).rotateX(-Math.PI / 2), mat);
    m.renderOrder = 2;
    this.scene.add(m);
    return { m, cv, key: '' };
  },

  drawPed(o, p) {
    const moving = p.moving && !p.dead;
    const q = moving ? Math.round(p.walkAnim / (Math.PI / 4)) : 0;
    const key = (moving ? q % 8 : 's') + '|' + p.weapon + '|' + p.dead;
    if (key === o.key) return;
    // шаги можно пропустить, а смену оружия или смерть — нет
    if (o.key && moving && this.pedBudget-- <= 0) return;
    o.key = key;
    const g = o.cv.getContext('2d');
    g.clearRect(0, 0, 80, 80);
    g.save(); g.translate(40, 40); g.scale(2, 2);
    drawPersonLook(g, p.look, q * Math.PI / 4, moving, p.weapon, p.dead);
    g.restore();
    o.m.material.map.needsUpdate = true;
  },

  syncPeds(view) {
    const fn = this.frameNo;
    this.pedBudget = 16;
    let budget = 4;
    const pl = World.player;
    const showPl = pl && !pl.car && Game.state !== 'title';
    const n = World.peds.length + (showPl ? 1 : 0);
    for (let i = 0; i < n; i++) {
      const p = i < World.peds.length ? World.peds[i] : pl;
      p._r3 = fn;
      let o = this.peds.get(p);
      if (p.car || p.x < view.x0 - 60 || p.x > view.x1 + 60 || p.y < view.y0 - 60 || p.y > view.y1 + 60) {
        if (o) { o.m.visible = false; if (o.mark) o.mark.visible = false; }
        continue;
      }
      if (!o) {
        if (budget-- <= 0 && p !== pl) continue;
        o = this.makePed(); this.peds.set(p, o);
      }
      o.m.visible = true;
      this.drawPed(o, p);
      o.m.position.set(p.x, p.dead ? 1.5 : 3.5, p.y);
      o.m.rotation.y = -p.a;
      // метка над головой: цель, союзник, пассажир такси
      const markMat = p.dead ? null : p.mission === 'target' ? this.mats.markRed : p.mission === 'ally' ? this.mats.markGreen : p.fare ? this.mats.markYellow : null;
      if (markMat) {
        if (!o.mark) { o.mark = new THREE.Mesh(new THREE.ConeGeometry(7, 14, 4).rotateX(Math.PI), markMat); this.scene.add(o.mark); }
        o.mark.material = markMat;
        o.mark.visible = true;
        o.mark.position.set(p.x, 46 + Math.sin(World.time * 6) * 4, p.y);
        o.mark.rotation.y = World.time * 2;
      } else if (o.mark) o.mark.visible = false;
    }
    for (const [p, o] of this.peds) {
      if (p._r3 === fn && !(p === pl && !showPl)) continue;
      this.scene.remove(o.m); o.m.geometry.dispose(); o.m.material.map.dispose(); o.m.material.dispose();
      if (o.mark) { this.scene.remove(o.mark); o.mark.geometry.dispose(); }
      this.peds.delete(p);
    }
  },

  // ---------------------------------------------------------------- предметы, маркеры
  pickupTex(kind) {
    const key = 'pk_' + kind;
    if (this.mats[key]) return this.mats[key];
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    g.translate(32, 32);
    if (kind === 'health') { g.fillStyle = '#e53935'; g.beginPath(); g.moveTo(0, 18); g.bezierCurveTo(-30, -4, -18, -30, 0, -12); g.bezierCurveTo(18, -30, 30, -4, 0, 18); g.fill(); }
    else if (kind === 'armor') { g.fillStyle = '#455a64'; g.beginPath(); g.moveTo(-18, -18); g.lineTo(18, -18); g.lineTo(16, 18); g.lineTo(-16, 18); g.closePath(); g.fill(); g.fillStyle = '#90a4ae'; g.fillRect(-12, -12, 24, 8); }
    else if (kind === 'money') { g.fillStyle = '#3fae49'; g.fillRect(-22, -13, 44, 26); g.fillStyle = '#fff'; g.font = 'bold 20px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('₪', 0, 1); }
    else {
      // пистолет / узи
      g.fillStyle = '#222'; g.fillRect(-20, -6, kind === 'uzi' ? 40 : 30, 10); g.fillRect(kind === 'uzi' ? 2 : -8, 2, 8, 14);
      if (kind === 'uzi') g.fillRect(-14, 2, 6, 18);
    }
    this.mats[key] = new THREE.MeshBasicMaterial({ map: this.tex(c), transparent: true, depthWrite: false });
    return this.mats[key];
  },

  syncPickups(view) {
    const seen = new Set();
    for (const p of World.pickups) {
      if (!p.active || p.x < view.x0 - 50 || p.x > view.x1 + 50 || p.y < view.y0 - 50 || p.y > view.y1 + 50) continue;
      seen.add(p);
      let o = this.pickups.get(p);
      if (!o) {
        o = new THREE.Group();
        const icon = new THREE.Mesh(new THREE.PlaneGeometry(30, 30).rotateX(-Math.PI / 2), this.pickupTex(p.kind));
        icon.position.y = 12; icon.renderOrder = 3;
        const glow = new THREE.Mesh(new THREE.PlaneGeometry(56, 56).rotateX(-Math.PI / 2), this.mats.glowPick || (this.mats.glowPick = new THREE.MeshBasicMaterial({ map: this.tex(Facades.glow('rgba(255,255,140,1)')), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.6 })));
        glow.position.y = 1.5;
        o.add(icon, glow); o.icon = icon;
        this.scene.add(o); this.pickups.set(p, o);
      }
      o.position.set(p.x, Math.sin(World.time * 4) * 2, p.y);
      o.icon.rotation.y = World.time * 1.5;
    }
    for (const [p, o] of this.pickups) if (!seen.has(p)) { this.scene.remove(o); o.traverse((m) => m.geometry && m.geometry.dispose()); this.pickups.delete(p); }
  },

  // телефоны, круг цели, мастерская покраски, игроки в маткот
  syncMarkers(view) {
    const X = this.extras;
    const get = (key, make) => { let o = X.get(key); if (!o) { o = make(); this.scene.add(o); X.set(key, o); } return o; };
    for (const key of ['phone1', 'phone2', 'phoneFlat', 'phoneRu', 'phoneAr', 'phoneLions']) {
      const p = City.places[key];
      const o = get(key, () => {
        const grp = new THREE.Group();
        const box = new THREE.Mesh(new THREE.BoxGeometry(14, 22, 10), this.mats.phone); box.position.y = 11; box.castShadow = true;
        const ring = new THREE.Mesh(new THREE.RingGeometry(16, 20, 32).rotateX(-Math.PI / 2), this.mats.ring.clone());
        ring.position.y = 1.5;
        grp.add(box, ring); grp.ring = ring;
        return grp;
      });
      o.position.set(p.x, 0, p.y);
      const ringing = Missions.phonePlace() === p;
      o.ring.visible = ringing;
      if (ringing) { const k = (World.time * 1.5) % 1; o.ring.scale.setScalar(1 + k * 1.8); o.ring.material.opacity = 1 - k; }
    }
    const obj = Missions.active && Missions.active.target;
    const tgt = get('target', () => {
      const grp = new THREE.Group();
      const ring = new THREE.Mesh(new THREE.RingGeometry(30, 36, 40).rotateX(-Math.PI / 2), this.mats.ring);
      const disc = new THREE.Mesh(new THREE.CircleGeometry(34, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.25, depthWrite: false }));
      ring.position.y = 1.6; disc.position.y = 1.4;
      grp.add(ring, disc); grp.ring = ring;
      return grp;
    });
    const isPlace = obj && !(obj instanceof Car) && !(obj instanceof Ped);
    tgt.visible = !!isPlace;
    if (isPlace) { tgt.position.set(obj.x, 0, obj.y); tgt.ring.scale.setScalar(1 + ((World.time * 1.2) % 1) * 0.9); }
    const ps = City.places.paint;
    const paint = get('paint', () => {
      const g = new THREE.BufferGeometry().setFromPoints([[-60, -60], [60, -60], [60, 60], [-60, 60]].map(([x, z]) => new THREE.Vector3(x, 1.5, z)));
      return new THREE.LineLoop(g, new THREE.LineDashedMaterial({ color: 0xe91e63, dashSize: 10, gapSize: 8, transparent: true }));
    });
    if (!paint.dashed) { paint.computeLineDistances(); paint.dashed = true; }
    paint.position.set(ps.x, 0, ps.y);
    paint.material.opacity = Wanted.level > 0 ? 1 : 0.4;
    // игроки в маткот на пляже
    const cw = Math.ceil(City.W / CHUNK), cs = CHUNK * TILE;
    for (let cy = Math.max(0, Math.floor(view.y0 / cs)); cy <= Math.min(Math.ceil(City.H / CHUNK) - 1, Math.floor(view.y1 / cs)); cy++) {
      for (let cx = Math.max(0, Math.floor(view.x0 / cs)); cx <= Math.min(cw - 1, Math.floor(view.x1 / cs)); cx++) {
        for (const d of City.lgrid[cy * cw + cx]) {
          if (d.k !== 'matkot') continue;
          const o = get(d, () => {
            const grp = new THREE.Group();
            d.l1 = d.l1 || Looks.civilian(); d.l2 = d.l2 || Looks.civilian();
            for (const [L, sgn] of [[d.l1, -1], [d.l2, 1]]) {
              const cv = document.createElement('canvas'); cv.width = cv.height = 80;
              const g = cv.getContext('2d'); g.translate(40, 40); g.scale(2, 2);
              drawPersonLook(g, L, 0, false, null, false);
              g.fillStyle = '#5d4037'; g.beginPath(); g.arc(10, -6, 4, 0, TAU); g.fill();
              const m = new THREE.Mesh(new THREE.PlaneGeometry(40, 40).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: this.tex(cv), transparent: true, depthWrite: false }));
              m.position.set(Math.cos(d.a) * 35 * sgn, 3.5, Math.sin(d.a) * 35 * sgn);
              m.rotation.y = -(d.a + (sgn > 0 ? Math.PI : 0));
              grp.add(m);
            }
            const ball = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6), new THREE.MeshLambertMaterial({ color: 0xffeb3b }));
            ball.castShadow = true;
            grp.add(ball); grp.ball = ball;
            return grp;
          });
          o.position.set(d.x, 0, d.y);
          const tt = (Math.sin(World.time * 3 + d.ph) + 1) / 2;
          o.ball.position.set(Math.cos(d.a) * 70 * (tt - 0.5), 8 + Math.sin(tt * Math.PI) * 18, Math.sin(d.a) * 70 * (tt - 0.5));
        }
      }
    }
  },

  // ---------------------------------------------------------------- пули, частицы, следы
  initFx() {
    this.bulletGeo = new THREE.BufferGeometry();
    this.bulletGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(400 * 6), 3));
    this.bullets = new THREE.LineSegments(this.bulletGeo, new THREE.LineBasicMaterial({ color: 0xfff0b4 }));
    this.bullets.frustumCulled = false;
    this.scene.add(this.bullets);
    const mk = (size, color, additive) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(700 * 3), 3));
      geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(700 * 3), 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size, map: this.tex(Facades.glow(color)), vertexColors: true, transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, opacity: additive ? 1 : 0.6 }));
      pts.frustumCulled = false;
      this.scene.add(pts);
      return pts;
    };
    this.fx = { fire: mk(26, 'rgba(255,255,255,1)', true), spark: mk(7, 'rgba(255,255,255,1)', true), smoke: mk(46, 'rgba(255,255,255,1)', false), blood: mk(8, 'rgba(255,255,255,1)', false), flash: mk(28, 'rgba(255,255,255,1)', true) };
    const dtex = (draw) => { const c = document.createElement('canvas'); c.width = c.height = 64; draw(c.getContext('2d')); return new THREE.MeshBasicMaterial({ map: this.tex(c), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 }); };
    this.decalMats = {
      blood: dtex((g) => { g.fillStyle = 'rgba(140,10,10,0.8)'; g.beginPath(); g.ellipse(30, 32, 22, 15, 0.3, 0, TAU); g.fill(); g.beginPath(); g.ellipse(48, 42, 9, 6, 0, 0, TAU); g.fill(); }),
      skid: dtex((g) => { g.fillStyle = 'rgba(20,20,20,0.45)'; g.fillRect(6, 16, 10, 32); g.fillRect(48, 16, 10, 32); }),
      burn: dtex((g) => { const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(10,10,10,0.7)'); gr.addColorStop(1, 'rgba(10,10,10,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); }),
    };
    this.decalGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  },

  syncFx(view) {
    // пули
    const bp = this.bulletGeo.attributes.position.array;
    let n = 0;
    for (const b of World.bullets) {
      if (n >= 400) break;
      bp.set([b.x, 14, b.y, b.x - b.vx * 0.012, 14, b.y - b.vy * 0.012], n * 6); n++;
    }
    this.bulletGeo.setDrawRange(0, n * 2);
    this.bulletGeo.attributes.position.needsUpdate = true;
    // частицы
    const buf = {};
    for (const k in this.fx) buf[k] = 0;
    for (const p of World.particles) {
      const fx = this.fx[p.k];
      if (!fx || buf[p.k] >= 700) continue;
      const i = buf[p.k]++;
      const k = 1 - p.t / p.life;
      const pos = fx.geometry.attributes.position.array, col = fx.geometry.attributes.color.array;
      let y = 18, r = 1, g = 1, bl = 1;
      if (p.k === 'fire') { y = 20 + p.t * 40; r = 1; g = 0.45 + 0.45 * k; bl = 0.15 * k; r *= k; g *= k; bl *= k; }
      else if (p.k === 'smoke') { y = 30 + p.t * 50; const v = 0.25 + 0.1 * k; r = g = bl = v; }
      else if (p.k === 'spark') { r = k; g = 0.9 * k; bl = 0.5 * k; }
      else if (p.k === 'blood') { y = 6; r = 0.6; g = 0.03; bl = 0.03; }
      else if (p.k === 'flash') { y = 14; r = 1; g = 0.95; bl = 0.7; }
      pos[i * 3] = p.x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = p.y;
      col[i * 3] = r; col[i * 3 + 1] = g; col[i * 3 + 2] = bl;
    }
    for (const k in this.fx) {
      const g = this.fx[k].geometry;
      g.setDrawRange(0, buf[k]);
      g.attributes.position.needsUpdate = true; g.attributes.color.needsUpdate = true;
    }
    // следы на земле
    const live = new Set(World.decals);
    for (const d of World.decals) {
      if (this.decals.has(d) || d.x < view.x0 - 80 || d.x > view.x1 + 80 || d.y < view.y0 - 80 || d.y > view.y1 + 80) continue;
      const m = new THREE.Mesh(this.decalGeo, this.decalMats[d.k]);
      const s = d.k === 'burn' ? 110 * d.s : d.k === 'blood' ? 34 * d.s : 34;
      m.scale.set(s, 1, s);
      m.position.set(d.x, 0.8, d.y);
      m.rotation.y = -d.a;
      m.renderOrder = 1;
      this.scene.add(m); this.decals.set(d, m);
    }
    for (const [d, m] of this.decals) if (!live.has(d)) { this.scene.remove(m); this.decals.delete(d); }
  },

  // ---------------------------------------------------------------- свет и погода
  updateLighting(cam, night) {
    const k = clamp(night / 0.74, 0, 1);
    const h = Clock.hour;
    // солнце идёт с востока на запад через юг; ночью — слабая луна
    const day = h >= 5.5 && h <= 19;
    const ang = day ? (h - 5.5) / 13.5 * Math.PI : ((h + 24 - 19) % 24) / 10.5 * Math.PI;
    const dir = new THREE.Vector3(Math.cos(ang), Math.max(0.25, Math.sin(ang)) * 1.4, 0.45).normalize();
    this.sun.position.set(cam.x + dir.x * 1800, dir.y * 1800, cam.y + dir.z * 1800);
    this.sun.target.position.set(cam.x, 0, cam.y);
    const dusk = clamp(1 - Math.abs(h - 18.3) / 1.6, 0, 1) + clamp(1 - Math.abs(h - 6.2) / 1.2, 0, 1);
    this.sun.color.setRGB(1, 0.94 - 0.2 * dusk, 0.84 - 0.4 * dusk);
    this.sun.intensity = lerp(0.78, 0.12, k);
    if (!day) this.sun.color.setRGB(0.6, 0.7, 1);
    this.hemi.intensity = lerp(0.62, 0.2, k);
    this.hemi.color.setRGB(1 - 0.5 * k, 0.97 - 0.42 * k, 0.92 - 0.2 * k);
    this.scene.background.setRGB(0.16 - 0.12 * k, 0.43 - 0.35 * k, 0.62 - 0.4 * k);
    // окна и вывески светятся, фонари горят
    for (const m of this.facadeMats) m.emissiveIntensity = k * 0.95;
    for (const m of this.signMats || []) m.emissiveIntensity = k * 0.6;
    this.mats.lampHead.color.setHex(k > 0.35 ? 0xfff3c4 : 0x9aa0a6);
    this.mats.glow.opacity = k * 0.42;
    this.mats.headlights.opacity = k * 0.55;
    // хамсин — жёлтая пыльная мгла, наползает и уходит плавно
    const hk = Clock.hamsinK, fog = this.scene.fog;
    if (hk > 0.001) {
      fog.near = this.camH * 0.75 / hk; fog.far = this.camH * 2.2 / hk;
      const bg = this.scene.background;
      bg.setRGB(lerp(bg.r, 0.85, hk), lerp(bg.g, 0.65, hk), lerp(bg.b, 0.37, hk));
      this.sun.color.setRGB(this.sun.color.r, this.sun.color.g * (1 - 0.1 * hk), this.sun.color.b * (1 - 0.25 * hk));
    } else { fog.near = 1e7; fog.far = 2e7; }
    // мигалки погони и фары игрока — 2 постоянных источника
    const pl = World.player;
    const now = World.time;
    let used = 0;
    for (const c of World.cars) {
      if (used >= 2) break;
      if (!c.police || !c.siren || c.dead || dist2(c.x, c.y, cam.x, cam.y) > 900 * 900) continue;
      const l = this.sirenLights[used++];
      l.position.set(c.x, 30, c.y); l.color.setHex(Math.floor(now * 6) % 2 ? 0x3f6cff : 0xff2a2a); l.intensity = 1.4;
    }
    if (used < 2 && k > 0.05 && pl.car && !pl.car.dead) {
      const f = pl.car.fwd, l = this.sirenLights[used++];
      l.position.set(pl.car.x + f.x * (pl.car.l / 2 + 60), 24, pl.car.y + f.y * (pl.car.l / 2 + 60)); l.color.setHex(0xfff0d0); l.intensity = 1.6 * k;
    }
    for (let i = used; i < 2; i++) this.sirenLights[i].intensity = 0;
    // фонари: днём их нет в расчёте вовсе (каждый источник стоит времени на каждом пикселе)
    const nightOn = k > 0.12 && this.q.lamps > 0;
    if (nightOn !== this.nightLights) {
      this.nightLights = nightOn;
      this.lampLights.forEach((l, i) => { l.visible = nightOn && i < this.q.lamps; });
    }
    if (!nightOn) return;
    if (this.frameNo % 6 === 0) {
      // ближайшие фонари: простой отбор без сортировки всего списка
      const near = this.nearLamps; near.length = 0;
      const maxN = this.q.lamps;
      for (const l of City.lamps) {
        if (l.hx === undefined) continue;
        const d = dist2(l.hx, l.hz, cam.x, cam.y);
        if (d > 1000 * 1000) continue;
        if (near.length < maxN) { near.push([d, l]); near.sort((a, b) => a[0] - b[0]); }
        else if (d < near[maxN - 1][0]) { near[maxN - 1] = [d, l]; near.sort((a, b) => a[0] - b[0]); }
      }
    }
    for (let i = 0; i < this.q.lamps; i++) {
      const L = this.lampLights[i], n = this.nearLamps[i];
      if (n) { L.position.set(n[1].hx, 80, n[1].hz); L.intensity = 1.25 * k; } else L.intensity = 0;
    }
  },

  // ---------------------------------------------------------------- кадр
  // Точка на земле (y = 0) под пикселем экрана
  ray(nx, ny) {
    const v = new THREE.Vector3(nx, ny, 0.5).unproject(this.camera).sub(this.camera.position).normalize();
    const p = this.camera.position;
    const t = v.y < -0.02 ? -p.y / v.y : 4000;
    return { x: p.x + v.x * t, y: p.z + v.z * t };
  },

  screenToGround(px, py) { return this.ray(px / Game.vw * 2 - 1, -(py / Game.vh * 2 - 1)); },

  worldToScreen(x, y, h = 0) {
    const v = new THREE.Vector3(x, h, y).project(this.camera);
    return [(v.x + 1) / 2 * Game.vw, (1 - v.y) / 2 * Game.vh];
  },

  // Видимая часть земли (при наклоне — трапеция, берём охватывающий прямоугольник)
  groundBounds(cx, cy) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [nx, ny] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const p = this.ray(nx, ny);
      x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y);
    }
    const cap = 2600;
    return { x0: Math.max(x0, cx - cap), x1: Math.min(x1, cx + cap), y0: Math.max(y0, cy - cap), y1: Math.min(y1, cy + cap) };
  },

  tilt: TILT,

  render(view, cam, sx, sy, night) {
    const vh = Game.vh, z = Game.zoomTotal;
    // расстояние до камеры подобрано так, чтобы масштаб в центре экрана совпадал с 2D
    const H = (vh / z) / 2 / Math.tan(FOV * Math.PI / 360);
    this.camH = H;
    this.tilt = lerp(this.tilt, Game.topDown ? 0 : TILT, 0.12);
    const tx = cam.x + sx, tz = cam.y + sy;
    this.camera.position.set(tx, H * Math.cos(this.tilt), tz + H * Math.sin(this.tilt));
    this.camera.near = Math.max(20, H * 0.2); this.camera.far = H * 2.8 + 400;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(tx, 0, tz);
    this.camera.updateMatrixWorld();
    view = this.bounds = this.groundBounds(cam.x, cam.y);
    this.frameNo++;
    // тени — только вокруг видимой части, а не на весь горизонт при наклонной камере
    const sc = this.sun.shadow.camera, r = Math.min(1400, Math.max(view.x1 - view.x0, view.y1 - view.y0) * 0.55 + 150);
    if (Math.abs(sc.right - r) > 50) { sc.left = -r; sc.right = r; sc.top = r; sc.bottom = -r; sc.updateProjectionMatrix(); }
    if (!this.fxReady) { this.initFx(); this.fxReady = true; }
    this.updateGround(view);
    this.updateLighting(cam, night);
    this.syncCars(view, night);
    this.syncPeds(view);
    this.syncPickups(view);
    this.syncMarkers(view);
    this.syncFx(view);
    this.waterTex.offset.set((World.time * 0.02) % 1, (World.time * 0.013) % 1);
    this.renderer.render(this.scene, this.camera);
  },
};
