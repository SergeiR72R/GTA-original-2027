// Магазины оружия: подойди пешком к двери — откроется витрина.
// ↑/↓ или W/S — выбрать, Enter/пробел — купить, цифры — купить сразу, Esc — выйти.
'use strict';

const SHOPS = [
  {
    place: 'gunShop',
    name: 'Оружие «Шломо и сыновья»',
    owner: 'Шломо: «Лицензия? Для нового репатрианта — скидка на всё, кроме лицензии»',
    items: [
      { w: 'bat', price: 150, ammo: 1, label: 'Бейсбольная бита' },
      { w: 'pistol', price: 400, ammo: 24, label: 'Пистолет + 24 патрона' },
      { w: 'shotgun', price: 1200, ammo: 16, label: 'Дробовик + 16 патронов' },
      { kind: 'armor', price: 500, label: 'Бронежилет' },
    ],
  },
  {
    place: 'blackMarket',
    name: 'Склад Рафи (порт)',
    owner: 'Рафи: «Я ничего не продавал, ты ничего не покупал. Наличными»',
    items: [
      { w: 'uzi', price: 1500, ammo: 90, label: 'Узи + 90 патронов' },
      { w: 'ak', price: 3000, ammo: 90, label: 'Автомат АК + 90 патронов' },
      { w: 'grenade', price: 900, ammo: 3, label: 'Гранаты × 3' },
      { w: 'rpg', price: 6000, ammo: 3, label: 'РПГ + 3 выстрела' },
    ],
  },
];

const Shops = {
  open: null,   // открытая витрина
  sel: 0,
  inside: null, // у какой двери стоим (чтобы не открывать снова, пока не отойдёшь)

  place(s) { return City.places[s.place]; },

  // цена и подпись: если оружие уже есть — дешевле, только патроны
  offer(it) {
    const pl = World.player;
    if (it.kind === 'armor') return { price: it.price, label: it.label, ok: pl.armor < 100, note: pl.armor >= 100 ? 'уже надет' : '' };
    const have = pl.ammo[it.w] > 0;
    if (WEAPONS[it.w].melee) return { price: it.price, label: it.label, ok: !have, note: have ? 'уже есть' : '' };
    if (have) return { price: Math.round(it.price * 0.45 / 10) * 10, label: `${WEAPONS[it.w].name}: +${it.ammo} ${it.w === 'grenade' ? 'шт.' : it.w === 'rpg' ? 'выстрела' : 'патронов'}`, ok: true, note: `есть ${pl.ammo[it.w]}` };
    return { price: it.price, label: it.label, ok: true, note: '' };
  },

  update() {
    const pl = World.player;
    if (pl.car || pl.dead) { this.inside = null; return; }
    for (const s of SHOPS) {
      const p = this.place(s);
      const d = dist(pl.x, pl.y, p.x, p.y);
      if (d < 34 && this.inside !== s) { this.inside = s; this.open = s; this.sel = 0; Sound.play('door', 0.6); return; }
      if (d > 70 && this.inside === s) this.inside = null;
    }
  },

  // ввод, пока витрина открыта (мир на паузе)
  input(game) {
    const s = this.open;
    if (game.hit('Escape', 'KeyF', 'Backspace')) { this.open = null; return; }
    if (game.hit('ArrowUp', 'KeyW')) this.sel = (this.sel + s.items.length - 1) % s.items.length;
    if (game.hit('ArrowDown', 'KeyS')) this.sel = (this.sel + 1) % s.items.length;
    if (game.hit('Enter', 'Space')) this.buy(s.items[this.sel]);
    s.items.forEach((it, i) => { if (game.hit('Digit' + (i + 1))) { this.sel = i; this.buy(it); } });
  },

  buy(it) {
    const pl = World.player;
    const o = this.offer(it);
    if (!o.ok) { Game.message(o.note[0].toUpperCase() + o.note.slice(1), 2); return; }
    if (pl.money < o.price) { Game.message(`Не хватает денег: нужно ${formatMoney(o.price)}`, 2.5); Sound.play('fail', 0.4); return; }
    pl.money -= o.price;
    if (it.kind === 'armor') pl.armor = 100;
    else { pl.ammo[it.w] = (pl.ammo[it.w] || 0) + it.ammo; pl.weapon = it.w; }
    Sound.play('pickup', 0.8);
    Game.message(`Куплено: ${o.label} (−${formatMoney(o.price)})`, 2.5);
    Game.save();
  },

  draw(ctx, vw, vh) {
    const s = this.open;
    if (!s) return;
    const pl = World.player;
    const w = Math.min(560, vw - 40), rowH = 58, h = 120 + s.items.length * rowH;
    const x = (vw - w) / 2, y = Math.max(20, (vh - h) / 2);
    ctx.fillStyle = 'rgba(10,12,20,0.92)'; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#ffca28'; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
    HUD.text(ctx, s.name, x + 18, y + 32, 22, '#ffca28');
    HUD.text(ctx, formatMoney(pl.money), x + w - 18, y + 32, 20, '#7CFC9A', 'right');
    ctx.font = 'italic 14px "Trebuchet MS", sans-serif'; ctx.fillStyle = '#bbb'; ctx.textAlign = 'left';
    ctx.fillText(s.owner, x + 18, y + 56, w - 36);
    s.items.forEach((it, i) => {
      const o = this.offer(it), ry = y + 72 + i * rowH, sel = i === this.sel;
      ctx.fillStyle = sel ? 'rgba(255,202,40,0.18)' : 'rgba(255,255,255,0.04)';
      ctx.fillRect(x + 10, ry, w - 20, rowH - 6);
      if (sel) { ctx.strokeStyle = '#ffca28'; ctx.lineWidth = 1.5; ctx.strokeRect(x + 10, ry, w - 20, rowH - 6); }
      // значок на светлой плашке
      ctx.fillStyle = '#e0e0e0'; ctx.fillRect(x + 18, ry + 6, 64, rowH - 18);
      ctx.save(); ctx.translate(x + 50, ry + (rowH - 6) / 2); drawWeaponIcon(ctx, it.kind || it.w, 1.1); ctx.restore();
      const afford = pl.money >= o.price;
      HUD.text(ctx, `${i + 1}. ${o.label}`, x + 96, ry + 24, 17, o.ok ? '#fff' : '#888', 'left', 'normal');
      if (o.note) HUD.text(ctx, o.note, x + 96, ry + 44, 13, '#9e9e9e', 'left', 'normal');
      HUD.text(ctx, formatMoney(o.price), x + w - 24, ry + 32, 18, !o.ok ? '#666' : afford ? '#7CFC9A' : '#ff7b7b', 'right');
    });
    HUD.text(ctx, '↑↓ выбрать · Enter купить · 1–4 сразу · Esc выйти', x + w / 2, y + h - 14, 13, '#aaa', 'center', 'normal');
  },
};
