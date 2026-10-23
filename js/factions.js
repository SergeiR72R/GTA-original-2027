// Фракции: репутация, территории, кто где тусуется.
// Все организации и персонажи вымышлены.
'use strict';

const GREETINGS = {
  russian: ['Здорово, земляк!', 'Как жизнь, братан?', 'Сёма передаёт привет.', 'Ну чё, освоился?'],
  arab: ['Ахлан, сахби!', 'Ялла, всё спокойно.', 'Абу-Карим тебя уважает.', 'Салам, брат.'],
  lions: ['Ахи! Как дела?', 'Заходи в студию, послушаешь новый трек.', 'Абеба про тебя спрашивал.', 'Сабаба, брат!'],
};

const Factions = {
  rep: { russian: 0, arab: 0, lions: 0 },
  spawnT: 0,

  reset(rep) {
    this.rep = Object.assign({ russian: 0, arab: 0, lions: 0 }, rep || {});
  },

  change(f, n, silent) {
    if (!(f in this.rep)) return;
    const was = this.rep[f];
    this.rep[f] = clamp(this.rep[f] + n, -100, 100);
    if (!silent && Math.abs(n) >= 10) Game.message(`${FACTIONS[f].name}: ${n > 0 ? '+' : ''}${n} к уважению`, 3);
    if (was > -25 && this.rep[f] <= -25) Game.message(`${FACTIONS[f].name} теперь стреляют в тебя без разговоров!`, 4);
    if (was < 25 && this.rep[f] >= 25) Game.message(`${FACTIONS[f].name} считают тебя своим.`, 4);
  },

  hostile(f) { return f === 'iran' || (f in this.rep && this.rep[f] <= -25); },

  onKill(f) { this.change(f, -6, true); },
  onHurt(f) { if (this.rep[f] > -25) this.change(f, -2, true); },

  // Бойцы фракций стоят группами на своей территории
  update(dt) {
    const pl = World.player;
    this.spawnT -= dt;
    if (this.spawnT > 0) return;
    this.spawnT = 1.5;
    const f = City.factionAt(pl.x, pl.y);
    if (!f) return;
    const near = World.peds.filter((p) => p.faction === f && !p.dead && !p.mission).length;
    if (near >= 6) return;
    for (let i = 0; i < 15; i++) {
      const a = rand(0, TAU), r = rand(500, 900);
      const x = pl.x + Math.cos(a) * r, y = pl.y + Math.sin(a) * r;
      const tx = Math.floor(x / TILE), ty = Math.floor(y / TILE);
      if (!City.isWalkway(tx, ty) || City.factionAt(x, y) !== f || Game.inView(x, y)) continue;
      const c = City.tc(tx, ty);
      const n = randi(2, 3);
      for (let k = 0; k < n; k++) {
        const home = { x: c.x + rand(-20, 20), y: c.y + rand(-20, 20) };
        World.peds.push(new Ped(home.x, home.y, { faction: f, ai: 'gang', weapon: chance(0.7) ? 'pistol' : 'uzi', hp: 70, home }));
      }
      return;
    }
  },
};
