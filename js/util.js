// Общие помощники: математика, случайные числа, мелочи.
'use strict';

const TILE = 64;
const TAU = Math.PI * 2;

// Направления: 0 = север (вверх), 1 = восток, 2 = юг, 3 = запад
const DIRS = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];
// Угол поворота спрайта для направления (спрайты машин смотрят вверх)
const DIR_ANGLE = [0, Math.PI / 2, Math.PI, -Math.PI / 2];

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function lerp(a, b, t) { return a + (b - a) * t; }
function dist(ax, ay, bx, by) { const dx = bx - ax, dy = by - ay; return Math.sqrt(dx * dx + dy * dy); }
function dist2(ax, ay, bx, by) { const dx = bx - ax, dy = by - ay; return dx * dx + dy * dy; }
function rand(a, b) { return a + Math.random() * (b - a); }
function randi(a, b) { return Math.floor(a + Math.random() * (b - a + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function chance(p) { return Math.random() < p; }

// Нормализация угла в диапазон [-PI, PI]
function wrapAngle(a) {
  while (a > Math.PI) a -= TAU;
  while (a < -Math.PI) a += TAU;
  return a;
}

// Детерминированный генератор (mulberry32) — чтобы город всегда был одинаковым
function makeRng(seed) {
  let s = seed >>> 0;
  const f = function () {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  f.range = (a, b) => a + f() * (b - a);
  f.int = (a, b) => Math.floor(a + f() * (b - a + 1));
  f.pick = (arr) => arr[Math.floor(f() * arr.length)];
  return f;
}

function formatMoney(n) {
  return '₪ ' + Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Пересечение отрезка с окружностью: возвращает t (0..1) или -1
function segCircle(x1, y1, x2, y2, cx, cy, r) {
  const dx = x2 - x1, dy = y2 - y1;
  const fx = x1 - cx, fy = y1 - cy;
  const a = dx * dx + dy * dy;
  const b = 2 * (fx * dx + fy * dy);
  const c = fx * fx + fy * fy - r * r;
  let disc = b * b - 4 * a * c;
  if (disc < 0 || a === 0) return -1;
  disc = Math.sqrt(disc);
  const t1 = (-b - disc) / (2 * a);
  if (t1 >= 0 && t1 <= 1) return t1;
  const t2 = (-b + disc) / (2 * a);
  if (t2 >= 0 && t2 <= 1) return 0;
  return -1;
}
