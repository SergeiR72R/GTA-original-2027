// Звук: сэмплы Kenney (CC0) + синтез через WebAudio (выстрелы, взрывы,
// мотор, сирена, клаксон и простое «радио» с восточным мотивом).
'use strict';

const Sound = {
  ctx: null,
  master: null,
  muted: false,
  engine: null,
  siren: null,
  radioOn: true,
  radio: null,
  // станции: 0 — старые пластинки на иврите, 1 — восточный ритм (синтез), 2 — выключено
  station: 0,
  song: null,

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    this.master.connect(this.ctx.destination);
    this.noiseBuf = this.makeNoise(1.5);
  },

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  toggleMute() {
    this.muted = !this.muted;
    if (this.master) this.master.gain.value = this.muted ? 0 : 0.5;
  },

  makeNoise(sec) {
    const len = Math.floor(this.ctx.sampleRate * sec);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  },

  // «Ток» ракетки маткот по мячу: короткий деревянный щелчок
  tok(vol = 0.3) {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(1300 + Math.random() * 300, t); o.frequency.exponentialRampToValueAtTime(500, t + 0.05);
    const g = ctx.createGain(); g.gain.setValueAtTime(clamp(vol, 0, 1), t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + 0.08);
  },

  // Глухой удар кузова: низкий шумовой «бум» (под звук аварии)
  thud(vol = 0.6) {
    if (!this.ctx || this.muted) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(420, t); f.frequency.exponentialRampToValueAtTime(90, t + 0.18);
    const g = ctx.createGain(); g.gain.setValueAtTime(clamp(vol, 0, 1) * 1.4, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t, Math.random() * 0.5, 0.25);
  },

  // Сэмпл из файла; vol 0..1. Если такого ключа нет — случайный из вариантов name0, name1, …
  play(name, vol = 1) {
    if (this.muted) return;
    let base = Assets.snd[name];
    if (!base) {
      const g = this.groups || (this.groups = {});
      const list = g[name] || (g[name] = Object.keys(Assets.snd).filter((k) => k.length === name.length + 1 && k.startsWith(name) && /\d$/.test(k)));
      base = list.length && Assets.snd[list[Math.floor(Math.random() * list.length)]];
    }
    if (!base) return;
    try {
      const a = base.cloneNode();
      a.volume = clamp(vol, 0, 1) * 0.6;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* без звука */ }
  },

  // Звук в точке мира: тише с расстоянием, за range — не слышно
  at(name, x, y, vol = 1, range = 700) {
    const pl = World.player;
    const d = Math.hypot(x - pl.x, y - pl.y);
    if (d < range) this.play(name, vol * (1 - d / range));
  },

  // не чаще раза в gap секунд для ключа (пули, рикошеты)
  can(key, gap) {
    const t = performance.now() / 1000, c = this.cool || (this.cool = {});
    if (t - (c[key] || 0) < gap) return false;
    c[key] = t;
    return true;
  },

  noiseBurst(dur, freq, vol, type = 'lowpass') {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.15), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t, Math.random() * 0.5, dur + 0.05);
  },

  gunshot(heavy, boom) {
    if (boom) this.noiseBurst(0.35, 1400, 0.9); // дробовик — глухой раскат
    this.noiseBurst(heavy ? 0.12 : 0.18, heavy ? 3500 : 2600, heavy ? 0.5 : 0.7);
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(180, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.08);
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 0.12);
  },

  explosion() {
    this.noiseBurst(1.2, 900, 1.0);
    this.noiseBurst(0.4, 4000, 0.4, 'bandpass');
  },

  // vol — громкость (далёкие гудки тише), len — длительность
  horn(vol = 0.08, len = 0.35) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const pitch = rand(0.85, 1.15);
    for (const fr of [392, 494]) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'square';
      o.frequency.value = fr * pitch;
      g.gain.setValueAtTime(0.0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.02);
      g.gain.setValueAtTime(vol, t + len - 0.05);
      g.gain.linearRampToValueAtTime(0, t + len);
      o.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + len + 0.05);
    }
  },

  // Мотор: пила + фильтр, частота зависит от скорости
  setEngine(on, speed01) {
    if (!this.ctx) return;
    if (on && !this.engine) {
      const o = this.ctx.createOscillator();
      const o2 = this.ctx.createOscillator();
      const f = this.ctx.createBiquadFilter();
      const g = this.ctx.createGain();
      o.type = 'sawtooth'; o2.type = 'square';
      f.type = 'lowpass'; f.frequency.value = 400;
      g.gain.value = 0;
      o.connect(f); o2.connect(f); f.connect(g); g.connect(this.master);
      o.start(); o2.start();
      this.engine = { o, o2, f, g };
    }
    if (!this.engine) return;
    const t = this.ctx.currentTime;
    if (!on) {
      this.engine.g.gain.setTargetAtTime(0, t, 0.05);
      return;
    }
    const fr = 38 + speed01 * 95;
    this.engine.o.frequency.setTargetAtTime(fr, t, 0.05);
    this.engine.o2.frequency.setTargetAtTime(fr * 0.5, t, 0.05);
    this.engine.f.frequency.setTargetAtTime(250 + speed01 * 900, t, 0.05);
    this.engine.g.gain.setTargetAtTime(0.05 + speed01 * 0.04, t, 0.05);
  },

  // Сирена полиции: громкость зависит от расстояния до ближайшей машины
  setSiren(vol) {
    if (!this.ctx) return;
    if (vol > 0 && !this.siren) {
      const o = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lg = this.ctx.createGain();
      const g = this.ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = 800;
      lfo.type = 'square';
      lfo.frequency.value = 1.4;
      lg.gain.value = 180;
      lfo.connect(lg); lg.connect(o.frequency);
      g.gain.value = 0;
      o.connect(g); g.connect(this.master);
      o.start(); lfo.start();
      this.siren = { o, lfo, g };
    }
    if (this.siren) this.siren.g.gain.setTargetAtTime(clamp(vol, 0, 1) * 0.06, this.ctx.currentTime, 0.1);
  },

  // Сирена воздушной тревоги: медленный вой вверх-вниз
  setAlarm(on) {
    if (!this.ctx) return;
    if (on && !this.alarm) {
      const o = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lg = this.ctx.createGain();
      const g = this.ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.value = 520;
      lfo.type = 'sine';
      lfo.frequency.value = 0.22;
      lg.gain.value = 190;
      lfo.connect(lg); lg.connect(o.frequency);
      const f = this.ctx.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = 1400;
      g.gain.value = 0;
      o.connect(f); f.connect(g); g.connect(this.master);
      o.start(); lfo.start();
      this.alarm = { o, lfo, g };
    }
    if (!this.alarm) return;
    const t = this.ctx.currentTime;
    if (on) this.alarm.g.gain.setTargetAtTime(0.045, t, 0.4);
    else {
      const a = this.alarm;
      this.alarm = null;
      a.g.gain.setTargetAtTime(0, t, 0.6);
      a.o.stop(t + 3); a.lfo.stop(t + 3);
    }
  },

  // ---------- Фон города ----------
  // Записи (прибой, сверчки) — зацикленные файлы; гул улиц, рынок и ветер —
  // синтез; птицы, чайки и далёкие гудки — редкие случайные события.
  amb: null,

  makeAmbience() {
    const ctx = this.ctx;
    const loop = (key) => { const b = Assets.snd[key]; if (!b) return null; const a = b.cloneNode(); a.loop = true; a.volume = 0; a._v = 0; return a; };
    const noise = () => { const n = ctx.createBufferSource(); n.buffer = this.noiseBuf; n.loop = true; n.start(); return n; };
    const chain = (src, type, freq, q) => { const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; const g = ctx.createGain(); g.gain.value = 0; src.connect(f); f.connect(g); g.connect(this.master); return { f, g }; };
    // гул улиц: низкий шум
    const hum = chain(noise(), 'lowpass', 230, 0.5);
    // ветер хамсина: полоса, которая «гуляет»
    const wind = chain(noise(), 'bandpass', 500, 0.8);
    // гомон рынка: три «голоса» — узкие полосы шума с быстрой сменой громкости
    const market = ctx.createGain(); market.gain.value = 0; market.connect(this.master);
    const voices = [];
    for (let i = 0; i < 3; i++) {
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 500 + i * 250; f.Q.value = 5;
      const g = ctx.createGain(); g.gain.value = 0;
      noise().connect(f); f.connect(g); g.connect(market);
      voices.push({ f, g });
    }
    return { waves: loop('ambWaves'), crickets: loop('ambCrickets'), hum, wind, market, voices, birdT: 2, gullT: 4, honkT: 5, talkT: 0, crickT: 8, crickOn: false };
  },

  // плавно ведём громкость зацикленного файла; на нуле — пауза
  loopVol(a, target, dt) {
    if (!a) return;
    a._v += clamp(target - a._v, -dt * 0.5, dt * 0.5);
    a.volume = clamp(a._v, 0, 1);
    if (a._v > 0.01 && a.paused) { const p = a.play(); if (p && p.catch) p.catch(() => {}); }
    else if (a._v <= 0.005 && !a.paused) a.pause();
  },

  ambience(dt) {
    if (!this.ctx || !World.player || !City.type) return;
    const A = this.amb || (this.amb = this.makeAmbience());
    const ctx = this.ctx, t = ctx.currentTime;
    const pl = World.player;
    const on = Game.state === 'play' && !this.muted ? (pl.car ? 0.5 : 1) : 0; // в машине глуше
    const k = City.blockKeyAt(pl.x, pl.y);
    const day = 1 - Clock.dark, hk = Clock.hamsinK, shab = Clock.shabbat;
    const sea = clamp(1 - (pl.x / TILE - 6) / 9, 0, 1) + (k === 'port' || k === 'jaffaport' ? 0.5 : 0);
    const green = pl.y < 6 * TILE || ['park', 'levinsky', 'sarona', 'north', 'ajami', 'rothschild'].includes(k);
    const market = ['shuk', 'hatikva', 'flea', 'nahalat'].includes(k) && day > 0.5 && !shab;
    this.loopVol(A.waves, on * clamp(sea, 0, 1) * 0.6, dt);
    // сверчки — только в зелёных районах и не всё время: стрекочут
    // несколько секунд, потом долго молчат
    A.crickT -= dt;
    if (A.crickT <= 0) { A.crickOn = !A.crickOn; A.crickT = A.crickOn ? rand(5, 10) : rand(20, 45); }
    this.loopVol(A.crickets, A.crickOn && green ? on * Clock.dark * 0.12 * (1 - hk) : 0, dt);
    A.hum.g.gain.setTargetAtTime(on * (0.025 + 0.035 * day) * (shab ? 0.4 : 1) * (1 - 0.6 * clamp(sea, 0, 1)), t, 0.6);
    A.wind.g.gain.setTargetAtTime(on * hk * (0.03 + 0.05 * Math.abs(Math.sin(t * 0.37) * Math.sin(t * 0.13))), t, 0.4);
    A.wind.f.frequency.setTargetAtTime(380 + 420 * Math.abs(Math.sin(t * 0.21)), t, 0.8);
    A.market.gain.setTargetAtTime(on * (market ? 0.06 : 0), t, 0.8);
    if (market) {
      // «слоги»: голоса то громче, то тише, тембр плавает
      A.talkT -= dt;
      if (A.talkT <= 0) {
        A.talkT = rand(0.08, 0.16);
        for (const v of A.voices) { v.g.gain.setTargetAtTime(Math.random() < 0.6 ? rand(0.3, 1) : 0, t, 0.03); v.f.frequency.setTargetAtTime(rand(350, 1200), t, 0.05); }
      }
    }
    if (!on) return;
    // птицы в зелёных районах днём
    A.birdT -= dt;
    if (A.birdT <= 0) { A.birdT = rand(1.5, 5); if (green && day > 0.6 && hk < 0.3) this.chirp(0.03 * on); }
    // чайки у моря
    A.gullT -= dt;
    if (A.gullT <= 0) { A.gullT = rand(4, 11); if (sea > 0.4 && day > 0.5) this.gull(0.035 * on); }
    // далёкие гудки — израильская улица без них не бывает (в шаббат — реже)
    A.honkT -= dt;
    if (A.honkT <= 0) { A.honkT = rand(5, 14) * (shab ? 3 : 1); if (day > 0.2 && sea < 0.8) this.horn(rand(0.008, 0.02) * on, rand(0.15, 0.6)); }
  },

  // трель птицы: несколько коротких свистов вверх
  chirp(vol) {
    const ctx = this.ctx, t = ctx.currentTime, base = rand(2600, 4200);
    let t0 = t;
    for (let i = 0, n = randi(2, 5); i < n; i++) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(base * rand(0.9, 1.1), t0);
      o.frequency.exponentialRampToValueAtTime(base * rand(1.2, 1.6), t0 + 0.06);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.08);
      o.connect(g); g.connect(this.master);
      o.start(t0); o.stop(t0 + 0.1);
      t0 += rand(0.09, 0.17);
    }
  },

  // крик чайки: «кии-ау» с дрожанием
  gull(vol) {
    const ctx = this.ctx, t = ctx.currentTime;
    for (let i = 0, n = randi(1, 3); i < n; i++) {
      const t0 = t + i * rand(0.35, 0.5);
      const o = ctx.createOscillator(), lfo = ctx.createOscillator(), lg = ctx.createGain(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = 'sawtooth'; lfo.frequency.value = rand(14, 22); lg.gain.value = 40;
      lfo.connect(lg); lg.connect(o.frequency);
      o.frequency.setValueAtTime(rand(1300, 1600), t0); o.frequency.exponentialRampToValueAtTime(rand(800, 1000), t0 + 0.32);
      f.type = 'bandpass'; f.frequency.value = 1300; f.Q.value = 3;
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.34);
      o.connect(f); f.connect(g); g.connect(this.master);
      o.start(t0); lfo.start(t0); o.stop(t0 + 0.36); lfo.stop(t0 + 0.36);
    }
  },

  // ---------- Радио «Хамсин FM» ----------
  // Станции с песнями: «Новая волна» — израильская инди-музыка на иврите под
  // Creative Commons (в т. ч. NC: игра бесплатная), «Старые пластинки» — записи
  // 1915–1925 гг., общественное достояние. Авторы и лицензии — assets/radio/CREDITS.txt.
  // Добавить песню: файл в assets/radio/ и строка сюда
  SONGS: [
    { list: 'new', file: 'suno_avak_rock', title: '«Пыль дорог» (אבק הדרכים)', who: 'Хамсин FM, рок-версия' },
    { list: 'new', file: 'suno_avak_mizrahi', title: '«Пыль дорог» (אבק הדרכים)', who: 'Хамсин FM, мизрахи-кантри' },
    { list: 'new', file: 'rosenfeld_jeans', title: '«Ба-джинс ве-сандалим» (בג׳ינס וסנדלים)', who: 'Ави Розенфельд, 2010' },
    { list: 'new', file: 'rosenfeld_hayam', title: '«Ха-ям» (הים)', who: 'Ави Розенфельд, 2010' },
    { list: 'new', file: 'rosenfeld_ahava', title: '«Ха-ахава шели» (האהבה שלי)', who: 'Ави Розенфельд, 2012' },
    { list: 'old', file: 'nes_ziona', title: '«Нес Циона» (נס ציונה)', who: 'Яков Медведев, 1916' },
    { list: 'old', file: 'shir_avoda', title: '«Шир ха-авода» (שיר העבודה)', who: 'Яков Медведев, 1916' },
    { list: 'old', file: 'ahavat_raya', title: '«Ахават рая» (אהבת רעיה)', who: 'Мордехай Гершман, 1923' },
    { list: 'old', file: 'talmidei_hachamim', title: '«Талмидей хахамим» (תלמידי חכמים)', who: 'Давид Ройтман, 1925' },
    { list: 'old', file: 'hatikva', title: '«Ха-Тиква» (התקווה)', who: 'Мейер Каневский, 1915' },
  ],
  // станции по кругу (R): песни списка list, синтезатор или тишина
  STATIONS: [
    { name: '📻 Хамсин FM · Новая волна', list: 'new' },
    { name: '📻 Хамсин FM · Старые пластинки', list: 'old' },
    { name: '📻 Хамсин FM · Восточный ритм', synth: true },
    { name: '📻 Радио выключено' },
  ],

  // R: следующая станция
  nextStation() {
    this.station = (this.station + 1) % this.STATIONS.length;
    const st = this.STATIONS[this.station];
    this.radioOn = !!(st.list || st.synth);
    for (const k in this.players) this.players[k].shown = false;
    return st.name;
  },

  // Плеер песен станции: один <audio>, по кругу в случайном порядке. Работает и с диска
  songPlayer(list) {
    this.players = this.players || {};
    if (this.players[list]) return this.players[list];
    const songs = this.SONGS.filter((t) => t.list === list);
    const order = songs.map((_, i) => i).sort(() => Math.random() - 0.5);
    const el = new Audio();
    el.preload = 'auto';
    const S = this.players[list] = { el, songs, order, k: 0, vol: 0, failed: 0, shown: false };
    const load = () => { el.src = 'assets/radio/' + songs[S.order[S.k]].file + '.mp3'; S.shown = false; };
    S.next = () => { S.k = (S.k + 1) % S.order.length; load(); if (S.vol > 0.01) el.play().catch(() => {}); };
    el.addEventListener('ended', S.next);
    // нет файла — следующая; ни одной — станция молчит
    el.addEventListener('error', () => { if (++S.failed < S.order.length) S.next(); });
    el.addEventListener('playing', () => { S.failed = 0; });
    load();
    return S;
  },

  radioStart() {
    if (!this.ctx || this.radio) return;
    const g = this.ctx.createGain();
    g.gain.value = 0;
    g.connect(this.master);
    this.radio = { g, step: 0, next: this.ctx.currentTime + 0.1, on: false };
  },

  // Включает и выключает станции updateRadio по тому, в машине ли игрок; здесь — только подготовка
  setRadio() {
    if (this.ctx) this.radioStart();
  },

  updateRadio() {
    // песни: громкость плавно идёт к нужной, в тишине плеер на паузе
    const pl = World.player;
    const inCar = Game.state === 'play' && pl && pl.car && !pl.dead;
    const st = this.STATIONS[this.station] || {};
    if (inCar && st.list && !this.muted) this.songPlayer(st.list);
    for (const list in this.players || {}) {
      const S = this.players[list];
      const songOn = inCar && st.list === list && !this.muted;
      const want = songOn ? 0.45 : 0;
      S.vol += Math.sign(want - S.vol) * Math.min(Math.abs(want - S.vol), 0.03);
      S.el.volume = clamp(S.vol, 0, 1);
      if (songOn && S.el.paused) S.el.play().catch(() => {});
      if (!songOn && S.vol <= 0.001 && !S.el.paused) S.el.pause();
      if (songOn && !S.shown && !S.el.paused && S.el.currentTime > 0.2) {
        S.shown = true;
        const t = S.songs[S.order[S.k]];
        Game.message(`📻 ${t.title} — ${t.who}`, 4);
      }
    }
    // восточный ритм — только на своей станции
    if (this.radio) {
      const on = inCar && !!st.synth;
      if (on !== this.radio.on) { this.radio.on = on; this.radio.g.gain.setTargetAtTime(on ? 0.35 : 0, this.ctx.currentTime, 0.2); }
    } else if (inCar && st.synth) this.radioStart();
    const r = this.radio;
    if (!r || !r.on || this.muted) return;
    const ctx = this.ctx;
    const bpm = 112;
    const stepDur = 60 / bpm / 4;
    // Фригийский доминантовый от ре: D Eb F# G A Bb C
    const scale = [0, 1, 4, 5, 7, 8, 10, 12];
    const base = 293.66;
    // мелодия на 32 шага (индекс в ладу или -1 — пауза)
    const mel = [4, -1, 3, 2, 1, -1, 2, -1, 0, -1, -1, 1, 2, -1, 1, 0,
      4, -1, 5, 4, 3, -1, 2, 3, 2, -1, 1, -1, 0, -1, -1, -1];
    const bass = [0, -1, -1, 0, -1, -1, 4, -1];
    // дум-тек: 1 = дум, 2 = тек, 3 = ка
    const drum = [1, 0, 3, 2, 0, 3, 1, 0, 1, 0, 3, 2, 0, 3, 2, 3];
    while (r.next < ctx.currentTime + 0.2) {
      const t = r.next;
      const s = r.step;
      const dr = drum[s % 16];
      if (dr === 1) this.drumHit(t, 90, 0.5, 0.18);
      else if (dr === 2) this.drumHit(t, 2600, 0.28, 0.05, true);
      else if (dr === 3) this.drumHit(t, 4200, 0.12, 0.03, true);
      const m = mel[s % 32];
      if (m >= 0 && (Math.floor(s / 32) % 4 !== 3 || s % 2 === 0)) {
        this.note(t, base * Math.pow(2, scale[m] / 12), stepDur * 1.6, 'sawtooth', 0.09);
      }
      if (s % 4 === 0) {
        const b = bass[(s / 4) % 8];
        if (b >= 0) this.note(t, base / 4 * Math.pow(2, scale[b] / 12), stepDur * 3, 'triangle', 0.22);
      }
      r.next += stepDur;
      r.step++;
    }
  },

  note(t, freq, dur, type, vol) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    // лёгкое «восточное» вибрато
    o.frequency.linearRampToValueAtTime(freq * 1.006, t + dur * 0.6);
    f.type = 'lowpass';
    f.frequency.value = 2200;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(f); f.connect(g); g.connect(this.radio.g);
    o.start(t); o.stop(t + dur + 0.05);
  },

  drumHit(t, freq, vol, dur, noise) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur + 0.1);
    g.connect(this.radio.g);
    if (noise) {
      const src = ctx.createBufferSource();
      src.buffer = this.noiseBuf;
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 2;
      src.connect(f); f.connect(g);
      src.start(t, Math.random(), dur + 0.1);
    } else {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq * 1.8, t);
      o.frequency.exponentialRampToValueAtTime(freq * 0.7, t + dur);
      o.connect(g);
      o.start(t); o.stop(t + dur + 0.1);
    }
  },
};
