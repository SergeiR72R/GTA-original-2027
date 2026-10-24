// Процедурные люди: внешность прохожих, героя, полиции и фракций.
// Вид сверху, персонаж смотрит вдоль оси +X.
'use strict';

const SKIN = ['#f1c9a5', '#e8b88f', '#d9a27a', '#c68a62', '#a8714c', '#8a5a3b', '#6b4430'];
const HAIR = ['#2b1d14', '#3b2a1c', '#5a3d25', '#8a6236', '#c49a5a', '#1a1a1a', '#6d6d6d', '#a33f1f'];
const SHIRTS = ['#e53935', '#1e88e5', '#43a047', '#fdd835', '#8e24aa', '#ff7043', '#26a69a', '#f5f5f5', '#212121', '#795548', '#ec407a', '#90caf9', '#cddc39', '#5c6bc0'];

// Фракции
const FACTIONS = {
  russian: { name: 'Бригада «Одесса»', short: 'Бригада', boss: 'Сёма Кац', color: '#c62828', turf: '#e53935', car: 'lux', districts: ['ramatgan', 'bursa', 'rgshops'] },
  arab: { name: 'Клан Аль-Бахар', short: 'Аль-Бахар', boss: 'Абу-Карим', color: '#eeeeee', turf: '#26a69a', car: 'pickup', carColor: '#f2f2ee', districts: ['jaffa', 'jaffaclock', 'flea', 'ajami', 'jaffaport'] },
  lions: { name: '«Львы Гондэра»', short: 'Львы', boss: 'Абеба', color: '#f2c230', turf: '#fbc02d', car: 'hatch', carColor: '#f2c230', districts: ['south', 'busstation', 'levinsky', 'hatikva'] },
  iran: { name: 'Иранская сеть', short: 'Агенты', boss: '«Али»', color: '#78909c', car: 'van', carColor: '#3d4249', districts: [] },
};

const Looks = {
  civilian() {
    const r = Math.random();
    const L = { shirt: pick(SHIRTS), skin: pick(SKIN), hair: pick(HAIR), style: 'short', pants: pick(['#3b4a6b', '#2b2b2b', '#6b5b45', '#4a5a3a', '#7a7a7a']) };
    if (r < 0.28) { L.style = 'long'; L.shirt = pick(['#ec407a', '#f5f5f5', '#ffb74d', '#4dd0e1', '#ba68c8', '#e57373', '#fff176']); }
    else if (r < 0.38) { L.style = 'kippah'; L.kippah = pick(['#1565c0', '#f5f5f5', '#212121', '#6d4c41']); }
    else if (r < 0.44) { L.style = 'haredi'; L.shirt = '#151515'; L.skin = pick(SKIN.slice(0, 4)); }
    else if (r < 0.52) { L.style = 'soldier'; L.shirt = '#5b6b3c'; L.pants = '#4e5c33'; }
    else if (r < 0.60) { L.style = 'cap'; L.cap = pick(['#e53935', '#1e88e5', '#212121', '#f5f5f5', '#fdd835']); }
    else if (r < 0.66) { L.style = 'bald'; }
    else if (r < 0.70) { L.style = 'scarf'; L.scarf = pick(['#5d4037', '#283593', '#4e342e', '#00695c', '#ad1457']); L.shirt = pick(['#37474f', '#5d4037', '#283593']); }
    if (Math.random() < 0.18) L.backpack = pick(['#37474f', '#c62828', '#1565c0', '#2e7d32']);
    if (Math.random() < 0.1) L.bag = pick(['#ff7043', '#8d6e63', '#ffffff']);
    return L;
  },
  player() { return { role: 1, genKey: 'player', shirt: '#f5f5f5', stripes: '#1a3a8a', skin: '#f1c9a5', hair: '#8a6236', style: 'short', pants: '#2d3e63' }; },
  police() { return { role: 1, genKey: 'police', shirt: '#1f2f5a', skin: pick(SKIN), hair: '#222', style: 'cap', cap: '#16244a', badge: true, pants: '#16244a' }; },
  shabak() { return { role: 1, genKey: 'shabak', shirt: '#2b2b2b', skin: '#e8b88f', hair: '#3b2a1c', style: 'short', shades: true, pants: '#2b2b2b' }; },
  russian() { return { role: 1, genKey: 'russian', shirt: '#1c1c1e', leather: true, skin: pick(SKIN.slice(0, 3)), hair: '#c9a87a', style: 'bald', chain: true, pants: '#1f1f22' }; },
  arab() { return { role: 1, genKey: 'arab', shirt: '#ececec', trackStripes: '#111', skin: pick(SKIN.slice(2, 5)), hair: '#1a1a1a', style: 'short', shades: true, pants: '#ececec' }; },
  lions() { return { role: 1, genKey: 'lions', shirt: '#f2c230', hood: true, trim: '#1b7f3a', skin: pick(SKIN.slice(5, 7)), hair: '#111', style: 'short', pants: '#2b2b2b' }; },
  iran() { return { role: 1, genKey: 'iran', shirt: '#5c6168', suit: true, tie: '#202020', skin: pick(SKIN.slice(1, 4)), hair: '#161616', style: 'short', beard: true, shades: true, pants: '#4a4e54' }; },
  boss(f) { const L = this[f](); L.boss = true; L.genKey = f + '_boss'; return L; },
  named(key, base) { const L = base || this.civilian(); L.role = 1; L.genKey = key; return L; },
  cat() { return { cat: true, fur: pick(['#d28a3c', '#3a3a3a', '#f0f0f0', '#9e9e9e', '#c8a27a']) }; },
};

const People = {
  // Рисуем человека в текущей системе координат (уже повернутой и сдвинутой)
  draw(ctx, L, walk, moving, weapon, dead) {
    if (L.cat) return this.drawCat(ctx, L, walk, moving, dead);
    const k = dead ? 0 : Math.sin(walk);
    // тень
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath(); ctx.ellipse(2.5, 2.5, 8, 11, 0, 0, TAU); ctx.fill();
    // ноги
    if (moving || dead) {
      ctx.fillStyle = L.pants || '#333';
      const s = dead ? 0 : k * 5;
      ctx.beginPath(); ctx.ellipse(s, -4, 4, 2.6, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-s, 4, 4, 2.6, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#1b1b1b';
      ctx.beginPath(); ctx.arc(s + 3.5, -4, 2, 0, TAU); ctx.arc(-s + 3.5, 4, 2, 0, TAU); ctx.fill();
    }
    if (L.backpack) { ctx.fillStyle = L.backpack; ctx.fillRect(-9, -6, 5, 12); }
    // руки и оружие
    const skin = L.skin;
    const sleeve = L.leather ? '#1c1c1e' : L.suit ? L.shirt : L.shirt;
    if (weapon && !dead) {
      const len = weapon === 'uzi' ? 13 : 9;
      ctx.fillStyle = sleeve;
      ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(9, -2); ctx.lineTo(9, 1); ctx.lineTo(0, -5); ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(9, 2); ctx.lineTo(9, -1); ctx.lineTo(0, 5); ctx.fill();
      ctx.fillStyle = '#1d1d1d';
      if (weapon === 'bat') { ctx.fillStyle = '#a1662f'; ctx.beginPath(); ctx.moveTo(8, -1.2); ctx.lineTo(24, -2.8); ctx.lineTo(24, 2.8); ctx.lineTo(8, 1.2); ctx.fill(); }
      else if (weapon === 'shotgun' || weapon === 'ak') {
        ctx.fillStyle = weapon === 'ak' ? '#8d5524' : '#6d4c41'; ctx.fillRect(2, -2, 8, 4); // приклад
        ctx.fillStyle = '#1d1d1d'; ctx.fillRect(8, -1.4, 17, 2.8);
        if (weapon === 'ak') { ctx.fillStyle = '#bf6c2f'; ctx.fillRect(13, 1, 3, 5); }
      } else if (weapon === 'rpg') { ctx.fillStyle = '#556b2f'; ctx.fillRect(-4, -2.6, 26, 5.2); ctx.fillStyle = '#8d6e63'; ctx.beginPath(); ctx.moveTo(22, -3.6); ctx.lineTo(28, 0); ctx.lineTo(22, 3.6); ctx.fill(); }
      else if (weapon === 'grenade') { ctx.fillStyle = '#4b5d2a'; ctx.beginPath(); ctx.arc(11, 0, 3.2, 0, TAU); ctx.fill(); }
      else { ctx.fillRect(8, -1.6, len, 3.2); if (weapon === 'uzi') ctx.fillRect(10, 1, 3, 4); }
      ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(9, 0, 2.4, 0, TAU); ctx.fill();
    } else {
      const sw = moving ? -k * 4 : 0;
      const spread = dead ? 6 : 0;
      ctx.fillStyle = sleeve;
      ctx.beginPath(); ctx.ellipse(sw + spread, -9.5 - spread, 3.6, 2.6, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-sw + spread, 9.5 + spread, 3.6, 2.6, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = skin;
      ctx.beginPath(); ctx.arc(sw + 3.5 + spread, -9.5 - spread, 2.1, 0, TAU); ctx.arc(-sw + 3.5 + spread, 9.5 + spread, 2.1, 0, TAU); ctx.fill();
      if (L.bag) { ctx.fillStyle = L.bag; ctx.fillRect(-sw + 1, 11, 6, 5); }
    }
    // туловище
    ctx.fillStyle = L.shirt;
    ctx.beginPath(); ctx.ellipse(0, 0, 6.5, 10.5, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 1; ctx.stroke();
    if (L.stripes) {
      // тельняшка
      ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 6.5, 10.5, 0, 0, TAU); ctx.clip();
      ctx.fillStyle = L.stripes;
      for (let y = -11; y < 11; y += 3.2) ctx.fillRect(-7, y, 14, 1.4);
      ctx.restore();
    }
    if (L.leather) { ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.ellipse(1.5, -4, 3, 4, 0, 0, TAU); ctx.fill(); }
    if (L.trackStripes) { ctx.fillStyle = L.trackStripes; ctx.fillRect(-1, -10.5, 2, 21); }
    if (L.suit) { ctx.fillStyle = '#e0e0e0'; ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(2, -3); ctx.lineTo(2, 3); ctx.fill(); ctx.fillStyle = L.tie; ctx.fillRect(3.5, -0.8, 3, 1.6); }
    if (L.hood) { ctx.fillStyle = shade(L.shirt, 0.8); ctx.beginPath(); ctx.ellipse(-5, 0, 3.5, 6, 0, 0, TAU); ctx.fill(); ctx.fillStyle = L.trim; ctx.fillRect(-1, -10, 2, 20); }
    if (L.badge) { ctx.fillStyle = '#ffd54f'; ctx.fillRect(2, -6, 2.5, 2.5); ctx.fillStyle = '#90caf9'; ctx.fillRect(-2, -10, 4, 2); ctx.fillRect(-2, 8, 4, 2); }
    if (L.style === 'soldier') { ctx.fillStyle = '#2b2b2b'; ctx.save(); ctx.rotate(0.7); ctx.fillRect(-12, -1, 22, 2.5); ctx.restore(); }
    if (L.chain) { ctx.strokeStyle = '#ffd54f'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(2, 0, 5, -1.2, 1.2); ctx.stroke(); }
    if (L.scarf) { ctx.fillStyle = L.scarf; ctx.beginPath(); ctx.ellipse(-1, 0, 6, 7.5, 0, 0, TAU); ctx.fill(); }
    // голова
    this.head(ctx, L);
    if (L.boss) { ctx.strokeStyle = '#ffd54f'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, 13, 0, TAU); ctx.stroke(); }
  },

  head(ctx, L) {
    const s = L.style;
    if (s === 'haredi') {
      ctx.fillStyle = '#0d0d0d'; ctx.beginPath(); ctx.arc(0, 0, 9, 0, TAU); ctx.fill();
      ctx.fillStyle = '#262626'; ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, TAU); ctx.fill();
      ctx.fillStyle = '#3b2a1c'; ctx.fillRect(1, -9.5, 2, 3); ctx.fillRect(1, 6.5, 2, 3); // пейсы
      return;
    }
    if (s === 'scarf') {
      ctx.fillStyle = L.scarf; ctx.beginPath(); ctx.arc(0, 0, 6.4, 0, TAU); ctx.fill();
      ctx.fillStyle = L.skin; ctx.beginPath(); ctx.ellipse(3.5, 0, 2.5, 3.5, 0, 0, TAU); ctx.fill();
      return;
    }
    ctx.fillStyle = L.skin;
    ctx.beginPath(); ctx.arc(0, 0, 5.6, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.arc(5, 0, 1.3, 0, TAU); ctx.fill(); // нос
    if (s === 'bald') {
      ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.beginPath(); ctx.arc(-1, -1.5, 2.2, 0, TAU); ctx.fill();
      ctx.fillStyle = L.hair; ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(-1.5, 0, 5, Math.PI * 0.6, Math.PI * 1.4); ctx.fill(); ctx.globalAlpha = 1;
    } else if (s === 'long') {
      ctx.fillStyle = L.hair; ctx.beginPath(); ctx.arc(-1.2, 0, 6.2, Math.PI * 0.35, Math.PI * 1.65); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-6, 0, 4, 4.5, 0, 0, TAU); ctx.fill();
    } else if (s === 'cap' || s === 'soldier') {
      ctx.fillStyle = s === 'soldier' ? '#4e5c33' : L.cap; ctx.beginPath(); ctx.arc(-0.5, 0, 5.8, 0, TAU); ctx.fill();
      if (s === 'cap') { ctx.fillRect(3, -3.5, 4.5, 7); }
      else { ctx.fillStyle = L.hair; ctx.beginPath(); ctx.arc(-1, 0, 5.4, Math.PI * 0.6, Math.PI * 1.4); ctx.fill(); }
    } else {
      ctx.fillStyle = L.hair; ctx.beginPath(); ctx.arc(-1, 0, 5.8, Math.PI * 0.45, Math.PI * 1.55); ctx.fill();
      if (s === 'kippah') { ctx.fillStyle = L.kippah; ctx.beginPath(); ctx.arc(-1.8, 0, 2.8, 0, TAU); ctx.fill(); }
    }
    if (L.beard) { ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.arc(2, 0, 4.6, -1.1, 1.1); ctx.fill(); }
    if (L.shades) { ctx.fillStyle = '#0b0b0b'; ctx.fillRect(3.2, -4, 2.2, 8); }
  },

  drawCat(ctx, L, walk, moving, dead) {
    const k = moving ? Math.sin(walk * 1.5) * 2 : 0;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(1.5, 1.5, 7, 4, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = L.fur; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-6, 0); ctx.quadraticCurveTo(-11, k * 2, -13, -3 + k); ctx.stroke(); // хвост
    ctx.fillStyle = L.fur;
    ctx.beginPath(); ctx.ellipse(0, 0, 6.5, 3.8, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(6.5, 0, 3.2, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.moveTo(6, -2); ctx.lineTo(7.5, -4.5); ctx.lineTo(8.5, -1.5); ctx.fill();
    ctx.beginPath(); ctx.moveTo(6, 2); ctx.lineTo(7.5, 4.5); ctx.lineTo(8.5, 1.5); ctx.fill();
    if (dead) { ctx.fillStyle = 'rgba(120,0,0,0.6)'; ctx.beginPath(); ctx.arc(0, 0, 4, 0, TAU); ctx.fill(); }
  },
};

// Сгенерированные персонажи (assets/gen/chars). Смотрят вправо (на восток).
const GEN_CIVS = 12;
function genCivList() {
  if (!genCivList.list) {
    genCivList.list = [];
    for (let i = 1; i <= GEN_CIVS; i++) if (Assets.gen['chars/civ_' + i]) genCivList.list.push('civ_' + i);
  }
  return genCivList.list;
}

function drawPersonLook(ctx, L, walk, moving, weapon, dead) {
  let key = L.gen;
  if (key === undefined) {
    // подбираем сгенерированный спрайт один раз
    const civs = genCivList();
    key = L.genKey || (L.cat ? 'cat' : null);
    // пока сгенерированы не все прохожие — смешиваем со встроенными
    if (!key && !L.role && civs.length && Math.random() < civs.length / GEN_CIVS) key = pick(civs);
    if (key && !Assets.gen['chars/' + key]) key = key.replace(/_boss$/, '');
    L.gen = key && Assets.gen['chars/' + key] ? key : null;
    key = L.gen;
  }
  if (!key) { People.draw(ctx, L, walk, moving, weapon, dead); return; }
  // своя картинка для каждого оружия (player_uzi, lions_bat…); пока её нет —
  // огнестрел рисуем общим спрайтом «с пистолетом», биту и гранату — стоящим
  const has = (k) => !!Assets.gen['chars/' + k];
  const base = !weapon || dead ? key : has(key + '_' + weapon) ? key + '_' + weapon
    : weapon !== 'bat' && weapon !== 'grenade' && has(key + '_gun') ? key + '_gun' : key;
  let im = Assets.gen['chars/' + base];
  // шаг: у главных героев — сгенерированные кадры _walk1/_walk2, у остальных
  // ступни выходят из-под фигуры по очереди (спрайт смотрит вправо, вдоль +x)
  let s = moving && !dead ? Math.sin(walk) : 0;
  const w1 = Assets.gen['chars/' + base + '_walk1'], w2 = Assets.gen['chars/' + base + '_walk2'];
  const frames = !!(w1 && w2);
  const size = L.cat ? 22 : 30;
  // масштаб — по стоящему спрайту: кадр шага шире (ноги, руки), фигура не должна прыгать
  const k = size / Math.max(im.width, im.height);
  // при ходьбе чередуем только два кадра шага: стоящий спрайт рисовался отдельно и чуть отличается
  if (frames && s) im = s > 0 ? w1 : w2;
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath(); ctx.ellipse(2.5, 2.5, im.width * k * 0.4, im.height * k * 0.4, 0, 0, TAU); ctx.fill();
  if (frames) s *= 0.4; // ноги уже на картинке — только лёгкое покачивание
  else if (moving && !dead && !L.cat) {
    const stride = size * 0.4, side = size * 0.14;
    ctx.fillStyle = L.shoes || '#2b2724';
    ctx.beginPath(); ctx.ellipse(s * stride, -side, 4, 2.6, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-s * stride, side, 4, 2.6, 0, 0, TAU); ctx.fill();
  }
  ctx.save();
  if (s) { ctx.rotate(s * 0.07); ctx.translate(Math.abs(s) * 0.8, 0); }
  if (dead) ctx.globalAlpha = 0.85;
  ctx.drawImage(im, -im.width * k / 2, -im.height * k / 2, im.width * k, im.height * k);
  ctx.restore();
  ctx.globalAlpha = 1;
  if (L.boss) { ctx.strokeStyle = '#ffd54f'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, 15, 0, TAU); ctx.stroke(); }
}
