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

  // Сэмпл из файла; vol 0..1
  play(name, vol = 1) {
    if (this.muted) return;
    const base = Assets.snd[name];
    if (!base) return;
    try {
      const a = base.cloneNode();
      a.volume = clamp(vol, 0, 1) * 0.6;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* без звука */ }
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

  gunshot(heavy) {
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

  horn() {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    for (const fr of [392, 494]) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'square';
      o.frequency.value = fr;
      g.gain.setValueAtTime(0.0, t);
      g.gain.linearRampToValueAtTime(0.08, t + 0.02);
      g.gain.setValueAtTime(0.08, t + 0.3);
      g.gain.linearRampToValueAtTime(0, t + 0.35);
      o.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + 0.4);
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

  // ---------- Радио «Хамсин FM» ----------
  // Простой генеративный луп: ритм дарбуки + мелодия во фригийском доминантовом ладу.
  radioStart() {
    if (!this.ctx || this.radio) return;
    const g = this.ctx.createGain();
    g.gain.value = 0;
    g.connect(this.master);
    this.radio = { g, step: 0, next: this.ctx.currentTime + 0.1, on: false };
  },

  setRadio(on) {
    if (!this.ctx) return;
    this.radioStart();
    const want = on && this.radioOn;
    this.radio.on = want;
    this.radio.g.gain.setTargetAtTime(want ? 0.35 : 0, this.ctx.currentTime, 0.2);
  },

  updateRadio() {
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
