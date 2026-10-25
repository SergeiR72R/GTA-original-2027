// Перебивка 1, глава 1 «Одесса» и перебивка 2 (план — docs/PLAN_STORY_CH1.md).
// Каждая миссия — несколько этапов с контрольными точками (js/story.js).
// Все персонажи, организации и события вымышлены.
'use strict';

const GARIK = 'Гарик';
const FIRA = 'Фира Марковна';
const BOTSMAN = 'Боцман';
const ROZA = 'Роза Львовна';
const SHLOMI = 'Шломи (помощник министра)';
const YOAV = 'Йоав («Мабат+»)';
const KARIM = 'Карим';
const RADIO = '📻 Хамсин FM';
Object.assign(PORTRAIT_OF, { [GARIK]: 'garik', [FIRA]: 'fira', [BOTSMAN]: 'botsman', [ROZA]: 'roza', [SHLOMI]: 'shlomi', [YOAV]: 'yoav', [KARIM]: 'karim' });

// ---------------------------------------------------------------- места главы
function walkNear(tx, ty) {
  for (let r = 0; r < 8; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
    if (City.isWalkway(tx + dx, ty + dy)) return City.tc(tx + dx, ty + dy);
  }
  return City.tc(tx, ty);
}
function freeNear(tx, ty) {
  for (let r = 0; r < 10; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
    if (Story.walkable(tx + dx, ty + dy) && !City.isRoad(tx + dx, ty + dy)) return City.tc(tx + dx, ty + dy);
  }
  return City.tc(tx, ty);
}
// перекрёсток двух больших улиц (центр)
function cross(v, h) { return City.tc(City.V[v] + Math.floor(City.VW[v] / 2), City.HR[h] + Math.floor(City.HW[h] / 2)); }

function chP() {
  const P = City.places;
  if (P.c1) return P;
  P.c1 = true;
  const S = City.side;
  P.c1Odessa = P.ruHQ;
  P.c1Exchange = S(8, 3, 'W', -2);
  P.c1Laundry = S(9, 3, 'S');
  P.c1Berezka = S(7, 4, 'N');
  P.c1Kiosk = S(8, 4, 'N', 2);
  P.c1Garage = S(9, 4, 'W');
  P.c1Botsman = S(1, 0, 'S', 3);
  P.c1Bursa = S(7, 1, 'W');
  P.c1BusSt = S(6, 5, 'N');
  P.c1Habima = S(4, 4, 'S', 3);
  P.c1Sarona = S(5, 2, 'S');
  P.c1Cafe = S(4, 4, 'N');
  P.c1Mabat = S(5, 4, 'N');
  P.c1Rabin = S(3, 1, 'S');
  P.c1Warehouse = S(4, 5, 'S');
  P.c1Spray = S(3, 5, 'E', 2);
  P.c1Yard = S(9, 2, 'W');
  P.c1Flea = S(2, 7, 'N');
  P.c1Fish = S(0, 7, 'E');
  P.c1JaffaEdge = S(2, 6, 'S');
  P.c1Kirya = S(6, 1, 'S');
  P.c1Allenby = walkNear(City.V[4] + City.VW[4] + 1, City.HR[5] - 1);
  P.c1Ayalon = walkNear(City.V[7] - 1, City.HR[3] + 6);
  P.c1PoliceWall = S(6, 4, 'W');
  P.c1Block = cross(7, 3);
  const br = City.blockRect(0, 0);
  P.c1PortYard = freeNear(Math.floor((br.x0 + br.x1) / 2), Math.floor((br.y0 + br.y1) / 2));
  P.c1Yarkon = freeNear(City.V[4] + 3, 3);
  P.c1ParkCar = walkNear(City.V[4] + 1, 6);
  // прилавки Шука для списка покупок
  const sr = City.blockRect(1, 4);
  const stalls = City.decor.filter((d) => d.k === 'stall' && d.x > sr.x0 * TILE && d.x < (sr.x1 + 1) * TILE && d.y > sr.y0 * TILE && d.y < (sr.y1 + 1) * TILE);
  stalls.sort((a, b) => a.x - b.x);
  const pickS = (k) => { const d = stalls[Math.floor(stalls.length * k)]; return d ? { x: d.x, y: d.y + 44 } : S(1, 4, 'N', Math.round(k * 6) - 3); };
  P.c1Stalls = [pickS(0.15), pickS(0.5), pickS(0.85)];
  // щиты вдоль Ибн-Гвироля
  const ix = (City.V[4] + City.VW[4] / 2) * TILE;
  const bills = City.decor.filter((d) => d.k === 'billboard' && d.y > City.HR[1] * TILE && d.y < City.HR[8] * TILE).sort((a, b) => Math.abs(a.x - ix) - Math.abs(b.x - ix));
  const chosen = [];
  for (const d of bills) { if (chosen.every((c) => dist(c.x, c.y, d.x, d.y) > 6 * TILE)) chosen.push(d); if (chosen.length >= 4) break; }
  chosen.sort((a, b) => a.y - b.y);
  P.c1Bills = chosen;
  // Кирья: три здания для фото
  const inBlock = (b, bx, by) => { const r = City.blockRect(bx, by); return b.cxm > r.x0 * TILE && b.cxm < (r.x1 + 1) * TILE && b.cym > r.y0 * TILE && b.cym < (r.y1 + 1) * TILE; };
  const kb = City.buildings.filter((b) => !b.removed && b.bb && (inBlock(b, 6, 1) || inBlock(b, 5, 3))).sort((a, b) => (b.bb.x1 - b.bb.x0) * (b.bb.y1 - b.bb.y0) - (a.bb.x1 - a.bb.x0) * (a.bb.y1 - a.bb.y0));
  const kq = City.buildings.find((b) => b.label === 'KIRYA');
  const kList = [kq, ...kb.filter((b) => b !== kq)].filter(Boolean);
  const kSel = [];
  for (const b of kList) { if (kSel.every((c) => dist(c.cxm, c.cym, b.cxm, b.cym) > 6 * TILE)) kSel.push(b); if (kSel.length >= 3) break; }
  P.c1KiryaShots = kSel.map((b) => ({ x: b.cxm, y: b.cym }));
  // ворота гонки с Гариком: Бялик → Алленби → Аялон → Арлозоров → «Одесса»
  P.c1Race = [cross(9, 3), cross(9, 5), cross(8, 5), cross(7, 5), cross(7, 2), cross(8, 2), P.ruHQ];
  return P;
}

// ---------------------------------------------------------------- помощники
const pl_ = () => World.player;
function near(p, r = 90) { const pl = pl_(); return dist(pl.x, pl.y, p.x, p.y) < r; }
function onFoot(p, r = 46) { return !pl_().car && near(p, r); }
function stopAt(p, r = 120) { const c = pl_().car; return c ? near(p, r) && c.speed < 60 : near(p, 50); }
// разговор посреди миссии (мир на паузе), пока он идёт — этап ждёт
function talk(m, lines) { m.wait = true; Missions.talk(lines, () => { m.wait = false; }); }
function ask(m, lines, choices) {
  m.wait = true; m.answer = null;
  Missions.ask(lines, choices.map(([label, v]) => ({ label, fn: () => { m.answer = v; } })), () => { m.wait = false; });
}
// без машины — сначала найти машину
function needCar(m, text) {
  const pl = pl_();
  if (pl.car && !pl.car.moto && !pl.car.dead && !pl.car.stalled) return false;
  m.text = text || 'Найди машину (подойди и нажми F)';
  m.target = nearestCar(pl.x, pl.y, (c) => !c.moto && !c.locked && !c.T.prop);
  return true;
}
// союзники-NPC идут за игроком и стреляют по врагам миссии
function allies(m, faction, n, opts = {}) {
  const pl = pl_(), out = [];
  for (let i = 0; i < n; i++) {
    const g = Story.ped(m, pl.x + rand(-40, 40), pl.y + rand(-40, 40), { faction, ai: 'follow', weapon: opts.weapon || 'pistol', hp: opts.hp || 140, look: opts.look });
    if (City.solidAt(g.x, g.y)) { g.x = pl.x; g.y = pl.y; }
    g.mission = 'ally';
    out.push(g);
  }
  return out;
}
// погоня ещё висит на хвосте?
function chasing(cars) { return (cars || []).some((c) => c.ai === 'gang' && !c.dead); }
// преследователи без оружия (сторонники, журналисты): таранят и лезут драться
function pursuers(m, n, type, color, look) {
  const pl = pl_(), out = [];
  for (let i = 0; i < n; i++) {
    const p = Game.findRoadSpawn(pl.x, pl.y, 350, 700, false) || Game.findRoadSpawn(pl.x, pl.y, 200, 900, true);
    if (!p) continue;
    const c = Story.car(m, p.x, p.y, DIR_ANGLE[p.dir], { type, color });
    c.ai = 'gang'; c.noShoot = true; c.mission = 'target';
    c.maxSpeed = c.T.max * 0.92; c.lostT = 0; c.shootT = 99;
    const crew = () => { const g = new Ped(c.x, c.y, { ai: 'gang', weapon: 'fists', hp: 50, look: look ? look() : Looks.civilian() }); g.car = c; g.mission = 'target'; return g; };
    c.driver = crew(); c.gang = [c.driver, crew()];
    Story.own(m).peds.push(...c.gang);
    out.push(c);
  }
  Story.own(m).gangCars = (Story.own(m).gangCars || []).concat(out);
  return out;
}
const lookGarik = () => Looks.named('garik', Object.assign(Looks.russian(), { style: 'short', hair: '#3b2a1c', shirt: '#b71c1c', leather: false }));
const lookKarim = () => Looks.named('karim', Object.assign(Looks.civilian(), { shirt: '#ececec', hair: '#1a1a1a', skin: '#c48b5c' }));
const lookRoza = () => Looks.named('roza', Object.assign(Looks.civilian(), { style: 'curly', hair: '#a1887f', shirt: '#6a1b9a', pants: '#4a148c', skin: '#efc6a8' }));
const lookSema = () => Looks.named('sema', Looks.boss('russian'));
const lookMob = () => Looks.civilian();

// ---------------------------------------------------------------- перебивка 1
const INTERLUDE_1 = staged({
  title: 'Биби, уходи',
  sub: 'Перебивка · работа от «Али»',
  phone: null,
  intro: [
    ['', 'Пролог позади, а чеков на квартиру у Лёвы всё ещё нет. Ночью пищит Телеграм.'],
    [ALI, 'Брат, ты же против правительства? Все против. Напиши «ביבי הביתה» — «Биби, уходи» — в пяти местах. ₪400 за каждую, в крипте. Фото — мне.'],
    [HERO, 'Протест — дело святое. А за деньги — тем более.'],
  ],
  reward: 0,
  outro: 'Гарик (в телефон): «Сёма, тут один водила. Тебе понравится».',
  init(m) { chP(); },
  stages: [
    {
      name: 'Краска',
      update(m) {
        const P = chP();
        m.text = 'Купи баллончики с краской во Флорентине';
        m.target = P.c1Spray;
        if (Story.hold(m, 'spray', P.c1Spray, 1, 'купить баллончики (₪60)')) { Game.addMoney(-60); return 'next'; }
      },
    },
    {
      name: 'Пять стен',
      resume() { Story.putPlayer(chP().c1Spray, 'hatch'); },
      start(m) {
        const P = chP();
        m.walls = [
          { k: 'allenby', p: P.c1Allenby, name: 'остановка на Алленби' },
          { k: 'habima', p: P.c1Habima, name: 'стена кафе у Габимы' },
          { k: 'ayalon', p: P.c1Ayalon, name: 'бетонная стена у Аялона' },
          { k: 'police', p: P.c1PoliceWall, name: 'стена у полицейского участка' },
          { k: 'rabin', p: P.c1Rabin, name: 'площадь Рабина' },
        ];
        Story.say([[HERO, 'Пять стен, две тысячи шекелей. Где тут подвох?']]);
      },
      update(m) {
        if (m.wait) return;
        const pl = pl_();
        const left = m.walls.filter((w) => !w.done);
        if (!left.length) return 'next';
        left.sort((a, b) => dist2(a.p.x, a.p.y, pl.x, pl.y) - dist2(b.p.x, b.p.y, pl.x, pl.y));
        const w = left[0];
        m.target = w.p;
        m.text = T('Граффити «Биби, уходи»: {0} из 5 — ближайшее: {1} (выйди из машины)', 5 - left.length, T(w.name));
        // у кафе выбегает хозяин со шваброй
        if (w.k === 'habima' && !m.owner && near(w.p, 260)) {
          m.owner = Story.ped(m, w.p.x + 40, w.p.y + 30, { ai: 'gang', weapon: 'bat', hp: 60, look: Looks.civilian() });
          m.owner.mission = 'target';
          Game.message('Хозяин кафе: «Только попробуй! Я только что покрасил!»', 3);
        }
        // на площади Рабина протестующие проверяют орфографию
        if (w.k === 'rabin' && m.spelled === 'asked') {
          if (!m.answer) { Game.message('Протестующие: «Опять ошибка! Двора тобой бы не гордилась». Попробуй ещё раз', 3); m.holds.rabin = 0; m.spelled = false; return; }
          Game.message('Протестующие: «Вот, другое дело. Ялла, Биби, домой!»', 3);
          m.spelled = 'ok';
        } else {
          if (!Story.hold(m, w.k, w.p, 2.5, 'рисовать граффити')) return;
          if (w.k === 'rabin' && m.spelled !== 'ok') {
            ask(m, [['', 'Протестующие с флагами окружают Лёву: «Ульпан не закончил? Пишется не так!» Как правильно?']], [['ביבי הבייתה', false], ['ביבי הביתה', true], ['בבי הבתה', false]]);
            m.spelled = 'asked';
            return;
          }
        }
        w.done = true;
        Story.tag(w.p.x, w.p.y + 10, rand(-0.2, 0.2), 'ביבי הביתה', '#e53935');
        Game.addMoney(400);
        if (w.k === 'police') { Wanted.set(Math.max(Wanted.level, 1)); Game.message('Патрульный видел, как ты рисовал у участка!', 3); }
        Sound.play('coins', 0.6);
      },
    },
    {
      name: 'Расплата',
      resume() { Story.putPlayer(chP().c1Rabin, 'hatch'); },
      start(m) {
        Story.say([
          [RADIO, 'Новости. Шабак: иранская разведка через Телеграм платит израильтянам за граффити против правительства. Почти все завербованные начинали с надписей.'],
          [HERO, '...'],
          [HERO, 'Ну конечно. «Брат». Какой я ему брат.'],
          [ALI, 'Красиво получилось, брат. Деньги ждут. И есть новое дело: Кирья, пара фото.'],
        ]);
      },
      update(m) {
        const P = chP();
        if (m.wait) return;
        if (!m.cashed) {
          m.text = 'Обналичь крипту — в Рамат-Гане это делает только обменник Фиры Марковны';
          m.target = P.c1Exchange;
          if (!Story.hold(m, 'cash', P.c1Exchange, 1, 'обналичить крипту')) return;
          m.cashed = true;
          talk(m, [
            [GARIK, 'Крипта? У нас? Ну давай. Комиссия — двадцать процентов, мы же не звери.'],
            [GARIK, 'Слышь, а это не тебя по телевизору показывали? Граффитист с Аялона?'],
            [HERO, 'Меня? Я таксист.'],
          ]);
          return;
        }
        if (!m.chase) {
          m.chase = pursuers(m, 2, 'pickup', '#1565c0', () => Looks.named('supporter', Object.assign(Looks.civilian(), { shirt: '#1565c0' })));
          Game.message('Сторонники правительства узнали тебя по видео из соцсетей — погоня!', 4);
          Game.addMoney(-400);
        }
        m.target = null;
        m.text = 'Оторвись от сторонников правительства';
        if (!chasing(m.chase) && Wanted.level === 0) return 'next';
        if (!chasing(m.chase)) m.text = 'Сбрось розыск';
      },
    },
    {
      name: 'Звонок',
      cp: false,
      start(m) { m.answer = undefined; },
      update(m) {
        if (m.wait) return;
        if (m.answer === null || m.answer === undefined) {
          if (m.asked) return;
          m.asked = true;
          ask(m, [[HERO, 'Номер горячей линии Шабака висит на каждой остановке. Позвонить?']], [['Позвонить в Шабак', 'yes'], ['Промолчать и оставить деньги себе', 'no']]);
          return;
        }
        if (m.answer === 'yes' && !m.called) {
          m.called = true;
          Story.flag('shabak', 1);
          talk(m, [[DANI, 'Записал. Ты не первый и не последний. Деньги оставь, номер «Али» не блокируй. Мы позвоним.']]);
          return;
        }
        return 'ok';
      },
    },
  ],
});

// ---------------------------------------------------------------- глава 1, миссия 1
const C1_ZEMLYAK = staged({
  title: 'Земляк',
  sub: 'Глава 1 «Одесса» · миссия 1 из 10',
  card: ['ГЛАВА 1', '«Одесса»'],
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'Алло. Ты Лёва? Таксист из Питера, который удирает от «патриотов» по Рамат-Гану? Мой племянник Гарик видел. Я Сёма. Сёма Кац.'],
    [SEMA, 'Заезжай в ресторан «Одесса» на Бялик. Покормлю, поговорим. Земляки должны держаться вместе.'],
  ],
  reward: 4000,
  outro: 'Сёма: Вот это я понимаю — земляк! Заходи в любое время, пельмени за счёт заведения.',
  init(m) { chP(); },
  stages: [
    {
      name: 'Знакомство',
      update(m) {
        const P = chP();
        if (m.wait) return;
        if (m.met) return 'next';
        m.text = 'Приезжай в ресторан «Одесса» на улице Бялик';
        m.target = P.c1Odessa;
        if (!stopAt(P.c1Odessa)) return;
        m.met = true;
        if (pl_().car) Game.exitCar();
        talk(m, [
          [SEMA, 'Садись, ешь. Пельмени, селёдочка, «Оливье» — как у мамы. Я приехал в девяносто первом, тогда тут не было ни одного нормального пельменя.'],
          [GARIK, 'Дядя Сёма, он таксист. Таксистов у нас и так полный Рамат-Ган.'],
          [SEMA, 'Гарик ревнует. Давай так: гонка. Гарик на своей, ты на моей серой. Круг через Алленби и Аялон. Придёшь первым — будет работа.'],
          [GARIK, 'Только машину не поцарапай, «таксист».'],
        ]);
      },
    },
    {
      name: 'Гонка с Гариком',
      resume() { Story.putPlayer(chP().c1Odessa); },
      start(m) {
        const P = chP();
        const car = Story.carOnRoad(m, P.c1Odessa, 40, 260, { type: 'sedan', color: '#9e9e9e' });
        m.racer = car;
        const p2 = Game.findRoadSpawn(car.x, car.y, 70, 240, true) || { x: car.x + 70, y: car.y, dir: 0 };
        m.garik = Story.car(m, p2.x, p2.y, DIR_ANGLE[p2.dir], { type: 'sedan', color: '#c62828', faction: 'russian' });
        Story.driver(m, m.garik, { faction: 'russian', ai: 'idle', look: lookGarik(), hp: 120 });
        m.garik.ai = 'scripted'; m.garik.mission = 'target';
        m.gi = 0; m.pi = 0; m.go = -4;
      },
      update(m, dt) {
        const P = chP(), pl = pl_(), G = P.c1Race, g = m.garik;
        if (pl.car !== m.racer) {
          if (m.go > 0) return 'fail:Сёма: «Ты бросил мою машину посреди гонки?!»';
          m.text = 'Садись в серую машину Сёмы (F)';
          m.target = m.racer;
          return;
        }
        if (m.go < 0) {
          m.go += dt;
          m.text = m.go < -1 ? T('Гонка через {0}...', Math.ceil(-m.go - 1)) : 'МАРШ!';
          m.target = G[0];
          if (m.go >= 0) { m.go = 0.01; Sound.play('jWin', 0.4); }
          return;
        }
        m.go += dt;
        if (m.racer.dead) return 'fail:Машина Сёмы сгорела. Работы не будет.';
        // Гарик: едет по воротам, чуть подыгрывает отстающему
        if (!g.dead && g.driver && m.gi < G.length) {
          const lead = m.gi - m.pi;
          const cruise = g.T.max * (lead > 0 ? 0.78 : lead < 0 ? 1.0 : 0.9);
          if (driveTo(g, G[m.gi].x, G[m.gi].y, dt, cruise) < 150) m.gi++;
          if (m.gi >= G.length) return 'fail:Гарик пришёл первым. «Ну что, таксист, счётчик включить?»';
        }
        if (dist(pl.x, pl.y, G[m.pi].x, G[m.pi].y) < 150) {
          m.pi++;
          Sound.play('ui', 0.6);
          if (m.pi >= G.length) return 'next';
        }
        m.target = G[m.pi];
        const pos = m.pi > m.gi || (m.pi === m.gi && dist(pl.x, pl.y, G[m.pi].x, G[m.pi].y) < dist(g.x, g.y, G[m.pi].x, G[m.pi].y)) ? 1 : 2;
        m.text = T('Гонка: ворота {0} из {1} · ты {2}-й{3}', m.pi + 1, G.length, T(pos), T(m.pi === G.length - 1 ? ' — финиш у «Одессы»!' : ''));
        if (m.go > 3 && m.go < 4) Story.sayOnce(m, 'g1', [[GARIK, 'Э, таксист! Это тебе не по Невскому ползать!']]);
      },
      end(m) { if (m.garik) m.garik.ai = null; },
    },
    {
      name: 'Таран',
      resume() { const P = chP(); Story.putPlayer(P.c1JaffaEdge, 'sedan', '#9e9e9e'); },
      start(m) {
        const P = chP(), lp = P.luxCar;
        Story.say([[SEMA, 'Ну ты даёшь! Гарик, не дуйся. Лёва, слушай работу: в Яффо, на стоянке Абу-Карима, стоит мой чёрный лимузин. Проиграл его в нарды. Нечестно.'],
          [SEMA, 'Пригони его обратно — четыре тысячи. Ворота там перекрыты пикапом. Ну, ты понял.']]);
        m.limo = Story.car(m, lp.x, lp.y, Math.PI / 2, { type: 'lux', faction: 'russian' });
        m.limo.hp = m.limo.maxHp = Math.round(m.limo.maxHp * 1.6);
        const g = Game.findRoadSpawn(lp.x, lp.y, 60, 220, true) || { x: lp.x + 90, y: lp.y, dir: 1 };
        m.block = Story.car(m, g.x, g.y, DIR_ANGLE[g.dir] + Math.PI / 2, { type: 'pickup', faction: 'arab' });
        m.block.locked = true; m.block.mission = 'target';
        m.bx = m.block.x; m.by = m.block.y;
        m.guards = Story.gang(m, 'arab', { x: lp.x, y: lp.y + 80 }, 4, { spread: 60 });
        for (const q of m.guards) q.mission = null;
      },
      update(m) {
        if (needCar(m)) return;
        const b = m.block;
        m.text = 'Снеси пикап, который перекрывает въезд на стоянку в Яффо';
        m.target = b;
        if (b.dead || b.hp < b.maxHp * 0.92 || dist(b.x, b.y, m.bx, m.by) > 40) return 'next';
        if (m.guards.some((g) => g.dead || g.alert > 0)) return 'next';
      },
    },
    {
      name: 'Угон',
      cp: false,
      start(m) {
        for (const g of m.guards || []) { g.mission = 'target'; g.alert = 8; }
        Game.message('Охрана: «Эй! Это машина Абу-Карима!»', 3);
        if (m.block) m.block.mission = null;
      },
      update(m) {
        if (m.limo.dead) return 'fail:Лимузин сгорел. Сёма этого не простит.';
        m.text = 'Отстреливайся и прыгай в чёрный лимузин!';
        m.target = m.limo;
        if (pl_().car === m.limo) { Factions.change('arab', -30); return 'next'; }
      },
    },
    {
      name: 'Маячок',
      resume(m) {
        const P = chP();
        const c = Story.putPlayer(P.c1JaffaEdge, 'lux');
        c.faction = 'russian'; c.color = VTYPES.lux.color; c.hp = c.maxHp = Math.round(c.maxHp * 1.6);
        m.limo = c; Story.own(m).cars.push(c); c.keep = true;
      },
      start(m) {
        m.chase = Story.chasers(m, 'arab', 2);
        m.wt = 0; m.extra = false;
        Story.say([[HERO, 'Они как будто знают, куда я еду...'], [SEMA, 'Маячок! Абу-Карим всё метит, даже чайник. Гони в порт, к Боцману, — он снимет.']]);
      },
      update(m, dt) {
        const P = chP(), pl = pl_();
        if (m.limo.dead) return 'fail:Лимузин сгорел. Сёма этого не простит.';
        if (pl.car !== m.limo) { m.text = 'Вернись в лимузин'; m.target = m.limo; return; }
        // клан находит лимузин снова и снова
        if (!chasing(m.chase) && m.stageT > 8 && !m.extra) { m.extra = true; m.chase.push(...Story.chasers(m, 'arab', 1)); }
        if (!m.atBots) {
          m.text = 'В лимузине маячок — гони в порт, в мастерскую Боцмана';
          m.target = P.c1Botsman;
          if (stopAt(P.c1Botsman, 130)) {
            m.atBots = true; m.timer = 22; m.waves = [2.5, 10]; // через сколько секунд подъезжают машины клана
            pl.ammo.uzi = (pl.ammo.uzi || 0) + 120; pl.weapon = 'uzi';
            Sound.play('belt', 0.7); Sound.play('latch', 0.5);
            Game.message('Узи +120', 3);
            Story.say([[BOTSMAN, 'Стой ровно. Двадцать секунд. Держи узи — гости уже едут.'], [BOTSMAN, 'Выходи и встречай их, а я под капотом. И не дай им меня застрелить.']]);
          }
          return;
        }
        m.timer -= dt;
        // машины клана подъезжают к мастерской, бойцы выходят и стреляют
        const passed = 22 - m.timer;
        if (m.waves.length && passed >= m.waves[0]) {
          const got = Story.chasers(m, 'arab', 1, { min: 330, max: 650, crew: 3, speed: 1 });
          if (got.length) { m.waves.shift(); m.chase.push(...got); Game.message('Боцман: «Пикап Аль-Бахара! Они здесь!»', 3); }
        }
        m.text = 'Боцман снимает маячок — продержись! Выйди и отстреливайся из узи';
        m.target = null;
        if (m.timer <= 0) { m.timer = null; return 'next'; }
      },
    },
    {
      name: 'Домой, в Рамат-Ган',
      resume(m) {
        const P = chP();
        const c = Story.putPlayer(P.c1Botsman, 'lux');
        c.faction = 'russian'; c.color = VTYPES.lux.color; c.hp = c.maxHp = Math.round(c.maxHp * 1.6);
        m.limo = c; Story.own(m).cars.push(c); c.keep = true;
      },
      start(m) {
        GangCars.release(m.chase || []);
        Story.say([[BOTSMAN, 'Готово. Без маячка они тебя не найдут. Передай Сёме: с него пол-литра.']]);
      },
      update(m) {
        const P = chP(), pl = pl_();
        if (m.limo.dead) return 'fail:Лимузин сгорел. Сёма этого не простит.';
        if (pl.car !== m.limo) { m.text = 'Вернись в лимузин'; m.target = m.limo; return; }
        m.text = T('Пригони лимузин к ресторану «Одесса» (целость: {0}%)', Math.round(m.limo.hp / m.limo.maxHp * 100));
        m.target = P.c1Odessa;
        if (!stopAt(P.c1Odessa, 130)) return;
        const c = m.limo;
        c.vx = c.vy = 0;
        Game.exitCar();
        c.locked = true; c.stay = true;
        if (c.hp > c.maxHp * 0.7) { Game.addMoney(1000); Game.message('Бонус: лимузин почти целый (+₪1000)', 4); }
        Factions.change('russian', 20);
        return 'ok';
      },
    },
  ],
});

// ---------------------------------------------------------------- миссия 2
const C1_KRYSHA = staged({
  title: 'Крыша для киоска',
  sub: 'Глава 1 «Одесса» · миссия 2 из 10',
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'Лёва, есть работа по профилю: прокатиться по району и собрать членские взносы. Четыре точки на Бялик и вокруг.'],
    [HERO, 'Членские взносы — это как в профсоюзе?'],
    [SEMA, 'Это как в «Одессе». Только без стрельбы, понял? Мы культурные люди. Бить можно.'],
  ],
  reward: 2500,
  outro: 'Сёма: Всё сдал Фире Марковне? Молодец. Она уже посчитала, что ты на сорок шекелей обсчитался. Шучу. Наверное.',
  init(m) { chP(); },
  stages: [
    {
      name: 'Гастроном «Берёзка»',
      update(m) {
        const P = chP();
        m.text = 'Гастроном «Берёзка»: забери взнос';
        m.target = P.c1Berezka;
        if (!Story.hold(m, 'ber', P.c1Berezka, 1, 'забрать конверт')) return;
        Story.say([['Хозяйка «Берёзки»', 'Вот конверт. И пирожки — Гарику передай, он худой совсем.'], [HERO, 'Если бы все так платили...']]);
        return 'next';
      },
    },
    {
      name: 'Киоск',
      resume() { Story.putPlayer(chP().c1Berezka, 'hatch'); },
      update(m) {
        const P = chP();
        if (m.wait) return;
        if (m.answer) {
          Story.flag('kioskSpared', m.answer === 'half');
          if (m.answer === 'half') { Game.addMoney(-500); Game.message('Киоскёр: «Я не забуду, брат. Честно»', 4); }
          return 'next';
        }
        if (!m.runner) {
          m.text = 'Киоск на углу: забери взнос';
          m.target = P.c1Kiosk;
          if (near(P.c1Kiosk, 230)) {
            m.runner = Story.runner(m, P.c1Kiosk.x + 20, P.c1Kiosk.y, { look: Looks.named('runner', Object.assign(Looks.civilian(), { shirt: '#ff7043' })) });
            Game.message('Киоскёр: «Только не сегодня!» — и бежит дворами', 3);
          }
          return;
        }
        m.target = m.runner;
        m.text = 'Догони киоскёра пешком!';
        if (m.runner.dead) return 'fail:Сёма: «Мёртвые взносы не платят, Лёва».';
        if (dist(m.runner.x, m.runner.y, pl_().x, pl_().y) > 1200) return 'fail:Киоскёр скрылся во дворах.';
        if (Story.caught(m.runner)) {
          ask(m, [['Киоскёр', 'Брат, у меня дочка, кредит, арнона! Тут всё, что есть, — шестьсот шекелей.'], [HERO, '...']], [['Забрать всё', 'all'], ['Оставить ему половину (−₪500 тебе)', 'half']]);
        }
      },
    },
    {
      name: 'Автосервис',
      resume() { Story.putPlayer(chP().c1Kiosk, 'hatch'); },
      start(m) {
        const P = chP();
        m.shots0 = Game.shots || 0;
        m.mech = null;
      },
      update(m) {
        const P = chP();
        if (!m.mech) {
          m.text = 'Автосервис: забери взнос';
          m.target = P.c1Garage;
          if (near(P.c1Garage, 200)) {
            m.mech = Story.gang(m, null, P.c1Garage, 3, { weapon: 'bat', spread: 50, hp: 60 });
            for (const q of m.mech) { q.look = Looks.named('mechanic', Object.assign(Looks.civilian(), { shirt: '#455a64' })); q.alert = 8; }
            Game.message('Механики: «Мы платим Абу-Кариму! Вали отсюда!» Дерись без стрельбы — иначе полиция', 4);
          }
          return;
        }
        if ((Game.shots || 0) > m.shots0 && !m.loud) { m.loud = true; Wanted.set(Math.max(Wanted.level, 2)); Game.message('Сёма же просил без стрельбы! Соседи вызвали полицию', 3); }
        const left = m.mech.filter((g) => !g.dead);
        m.text = T('Уложи механиков (осталось: {0})', left.length);
        m.target = nearestAlive(m.mech);
        if (!left.length) { Factions.change('arab', -5); return 'next'; }
      },
    },
    {
      name: 'Облава',
      resume() { Story.putPlayer(chP().c1Garage, 'hatch'); },
      update(m) {
        const P = chP();
        if (!m.raid) {
          m.text = 'Обменник: последний взнос';
          m.target = P.c1Exchange;
          if (near(P.c1Exchange, 170)) {
            m.raid = true;
            Wanted.set(Math.max(Wanted.level, 2));
            Game.bigText('ОБЛАВА!', 'Полиция ждала у обменника', '#4fa3ff');
          }
          return;
        }
        if (Wanted.level > 0) { m.text = 'Уйди от полиции с сумкой денег'; m.target = P.c1Paint || P.paint; return; }
        m.text = 'Спрячь сумку в прачечной Фиры Марковны';
        m.target = P.c1Laundry;
        if (stopAt(P.c1Laundry, 110)) { Factions.change('russian', 10); return 'ok'; }
      },
    },
  ],
});

// ---------------------------------------------------------------- миссия 3
const C1_SHESHBESH = staged({
  title: 'Шеш-беш',
  sub: 'Глава 1 «Одесса» · миссия 3 из 10',
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'Сегодня у нас вечер. Шеш-беш, покер, немного рулетки — культурный досуг. Подпольный, но культурный.'],
    [SEMA, 'Ты — шофёр и немножко вышибала. Привези троих гостей. Адвокат спешит, жена ювелира беременна, профессор... профессор просто профессор.'],
  ],
  reward: 3000,
  outro: 'Сёма: Выручка цела, я цел, ты цел. Казино переедем. Не впервой.',
  init(m) {
    chP();
    // вечер: если ещё день — перематываем
    const h = (Clock.min % 1440) / 60;
    if (h > 5 && h < 20) Clock.min = Math.floor(Clock.min / 1440) * 1440 + 21 * 60;
  },
  stages: [
    {
      name: 'Адвокат',
      start(m) {
        const P = City.places;
        m.pstage = 0; m.timer = null; m.rideTime = 110;
        m.vip = Story.ped(m, P.azrieli.x, P.azrieli.y, { ai: 'idle', look: Object.assign(Looks.civilian(), { shirt: '#263238', pants: '#263238' }) });
        m.vip.mission = 'target';
      },
      update(m, dt) {
        if (needCar(m)) return;
        const r = passengerStep(m, m.vip, chP().c1Odessa, dt, { acc: 'адвоката', nom: 'адвокат', dead: 'Адвокат пострадал.' });
        if (r === 'boarded') Story.say([['Адвокат', 'Быстрее, у меня через полчаса заседание. Шучу, у меня покер. Но быстрее.']]);
        if (m.pstage === 2) m.text = 'Вези адвоката в «Одессу» — он спешит';
        if (r === 'arrived') { m.vip.ai = 'walk'; m.timer = null; return 'next'; }
        if (r && r.startsWith('fail')) return r;
      },
    },
    {
      name: 'Жена ювелира',
      resume() { Story.putPlayer(chP().c1Odessa, 'sedan'); },
      start(m) {
        const P = City.places;
        m.pstage = 0; m.timer = null; m.rideTime = null; m.sick = 0; m.cpv = null;
        m.vip = Story.ped(m, P.hospital.x, P.hospital.y, { ai: 'idle', look: Object.assign(Looks.civilian(), { shirt: '#ec407a', style: 'long' }) });
        m.vip.mission = 'target';
      },
      update(m, dt) {
        if (needCar(m)) return;
        const r = passengerStep(m, m.vip, chP().c1Odessa, dt, { acc: 'жену ювелира', nom: 'жена ювелира', dead: 'Жена ювелира пострадала.' });
        if (r === 'boarded') Story.say([['Жена ювелира', 'Мотек, я на седьмом месяце. Каждая яма — и я рожаю тебе в машине. Понял?']]);
        if (m.pstage === 2) {
          const s = Story.comfort(m, pl_().car, dt);
          if (s > 60) Story.sayOnce(m, 'sick', [['Жена ювелира', 'Ой... Мне нехорошо. Плавнее!']]);
          if (s >= 100) return 'fail:Жену ювелира укачало. Ювелир будет звонить Сёме.';
          m.text = T('Вези жену ювелира плавно (укачало: {0}%)', Math.round(s));
        }
        if (r === 'arrived') { m.vip.ai = 'walk'; return 'next'; }
        if (r && r.startsWith('fail')) return r;
      },
    },
    {
      name: 'Профессор',
      resume() { Story.putPlayer(chP().c1Odessa, 'sedan'); },
      start(m) {
        const P = City.places;
        m.pstage = 0; m.timer = null; m.leg = 0;
        m.vip = Story.ped(m, P.klita.x, P.klita.y, { ai: 'idle', look: Object.assign(Looks.civilian(), { style: 'bald', shirt: '#8d6e63' }) });
        m.vip.mission = 'target';
      },
      update(m, dt) {
        if (needCar(m)) return;
        const P = chP();
        const dest = m.leg === 0 ? City.places.shuk : P.c1Odessa;
        const r = passengerStep(m, m.vip, dest, dt, { acc: 'профессора', nom: 'профессор', dead: 'Профессор пострадал.' });
        if (r === 'boarded' && m.leg === 0) Story.say([['Профессор', 'Молодой человек, сначала — фалафель у Ицика. Без фалафеля я не играю. Это научный факт.']]);
        if (m.pstage === 2) m.text = m.leg === 0 ? 'Профессор требует фалафель — заедь к Ицику на Шук' : 'Вези профессора в «Одессу»';
        if (r === 'arrived') {
          if (m.leg === 0) { m.leg = 1; m.pstage = 0; Story.say([[ITZIK, 'Лёва! Ты теперь возишь профессоров? Держи, профессор, двойной, с амбой.']]); return; }
          m.vip.ai = 'walk'; return 'next';
        }
        if (r && r.startsWith('fail')) return r;
      },
    },
    {
      name: 'Шулер',
      resume() { Story.putPlayer(chP().c1Odessa, 'sedan'); },
      start(m) {
        const P = chP();
        Story.say([[SEMA, 'Лёва! Этот тип от Абу-Карима сдавал себе из рукава. Схватил фишки и к машине! Догони!']]);
        m.thief = Story.carOnRoad(m, P.c1Odessa, 120, 320, { type: 'sedan', color: '#ffeb3b' });
        m.td = Story.driver(m, m.thief, { faction: 'arab', ai: 'idle', hp: 70 });
        m.thief.ai = 'scripted'; m.thief.mission = 'target'; m.thief.rams = 3;
      },
      update(m, dt) {
        const c = m.thief, pl = pl_();
        if (!c.stalled && Story.stalled(c, 0.5)) Game.message('Машина шулера заглохла — забери фишки!', 3);
        if (c.stalled || c.dead) {
          const d = m.td && !m.td.car ? m.td : null;
          const who = d || c;
          m.target = who;
          m.text = 'Забери у шулера фишки';
          if (d && d.dead) return 'next';
          if (Story.hold(m, 'chips', who, 0.8, 'забрать фишки', { r: 60 })) return 'next';
          return;
        }
        fleeDrive(c, dt, 260);
        m.target = c;
        m.text = 'Догони шулера и прижми его машину';
        if (escaped(m, c, dt, 10)) return 'fail:Шулер ушёл с фишками.';
      },
    },
    {
      name: 'Облава на казино',
      resume() { Story.putPlayer(chP().c1Odessa, 'sedan'); },
      start(m) {
        const P = chP();
        Factions.change('arab', -10);
        m.pstage = 0; m.timer = null;
        m.vip = Story.ped(m, P.c1Odessa.x + 30, P.c1Odessa.y, { ai: 'idle', look: lookSema(), name: SEMA });
        m.vip.mission = 'target';
        Wanted.set(Math.max(Wanted.level, 3));
        Game.bigText('ОБЛАВА!', 'Полиция окружает «Одессу»', '#4fa3ff');
      },
      update(m, dt) {
        if (needCar(m)) return;
        const P = chP();
        // с хвостом к Бирже не едем: точка «недостижима», пока есть розыск
        const r = passengerStep(m, m.vip, Wanted.level > 0 ? { x: -1e6, y: -1e6 } : P.c1Bursa, dt, { acc: 'Сёму', nom: 'Сёма', dead: 'Сёма ранен. Казино закрыто навсегда.' });
        if (r === 'boarded') Story.say([
          [SEMA, 'Спокойно. Я считаю. Не мешай мне считать.'],
          [SEMA, 'Три тысячи двести... Лёва, на красный не надо, мы культурные. Хотя... надо.'],
          [SEMA, 'Если перекрасишься во Флорентине — я заплачу. Пятьсот шекелей. Ладно, плачу я.'],
        ]);
        if (m.pstage === 2) {
          m.text = Wanted.level > 0 ? 'Уйди от полиции с Сёмой (можно перекраситься во Флорентине)' : 'Отвези Сёму к Бирже алмазов';
          m.target = Wanted.level > 0 ? City.places.paint : P.c1Bursa;
          if (Wanted.level > 0 && near(P.c1Bursa, 140)) { m.text = 'С хвостом к Сёме нельзя — сначала сбрось розыск'; return; }
        }
        if (r === 'arrived') { m.vip.ai = 'walk'; Factions.change('russian', 10); return 'ok'; }
        if (r && r.startsWith('fail')) return r;
      },
    },
  ],
});

// ---------------------------------------------------------------- миссия 4
const C1_DIAMONDS = staged({
  title: 'Бриллиантовый курьер',
  sub: 'Глава 1 «Одесса» · миссия 4 из 10',
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'Лёва, дело на миллион. Буквально. Кейс с камнями — от Биржи алмазов в Рамат-Гане до ювелира в Неве-Цедеке.'],
    [SEMA, 'Едешь тихо, как пенсионер в шаббат. Никакого внимания. Ювелир закрывается в шесть.'],
  ],
  reward: 5000,
  outro: 'Ювелир: Все камни на месте. Передайте Сёме, что я пересчитал дважды. И что я ему не верю. С любовью.',
  init(m) { chP(); },
  stages: [
    {
      name: 'Кейс',
      update(m) {
        const P = chP();
        m.text = 'Забери кейс у Биржи алмазов в Рамат-Гане';
        m.target = P.c1Bursa;
        if (Story.hold(m, 'case', P.c1Bursa, 1, 'взять кейс')) return 'next';
      },
    },
    {
      name: 'Хвост',
      resume() { Story.putPlayer(chP().c1Bursa, 'hatch', '#9e9e9e'); },
      start(m) {
        m.chase = Story.chasers(m, 'arab', 2, { type: 'moto' }).concat(Story.chasers(m, 'arab', 1, { type: 'suv' }));
        Story.say([[HERO, 'Два мотоцикла и джип. Тихо проехать не получится.'], [SEMA, 'Оторвись! Через Дизенгоф, там кольцо — они на нём запутаются.']]);
      },
      update(m) {
        if (needCar(m)) return;
        const P = City.places;
        m.target = P.nevetzedek;
        m.text = chasing(m.chase) ? 'За тобой хвост — оторвись и вези кейс в Неве-Цедек' : 'Вези кейс к ювелиру в Неве-Цедек';
        // засада — на подъезде или если хвост отстал
        if (m.stageT > 50 || near(P.nevetzedek, 1400) || (!chasing(m.chase) && m.stageT > 15)) return 'next';
      },
    },
    {
      name: 'Засада на светофоре',
      resume() { Story.putPlayer(City.places.florentin, 'hatch', '#9e9e9e'); },
      start(m) {
        GangCars.release(m.chase || []);
        const pl = pl_();
        m.foes = Story.gang(m, 'arab', { x: pl.x, y: pl.y }, 3, { spread: 150, hp: 70 });
        for (const g of m.foes) g.alert = 8;
        Game.bigText('ЗАСАДА!', 'Кейс выхватили через разбитое стекло', '#ff5252');
        Sound.play('glassM', 0.9);
        if (pl.car) pl.car.damage(10, 'npc', pl.x, pl.y);
      },
      update(m) {
        const left = m.foes.filter((g) => !g.dead);
        m.text = T('Отбейся от стрелков на перекрёстке (осталось: {0})', left.length);
        m.target = nearestAlive(m.foes);
        if (!left.length) return 'next';
      },
    },
    {
      name: 'Погоня за кейсом',
      resume() { Story.putPlayer(City.places.florentin, 'hatch', '#9e9e9e'); },
      start(m) {
        const pl = pl_();
        m.thief = Story.carOnRoad(m, pl, 400, 650, { type: 'moto', faction: 'arab' });
        m.td = Story.driver(m, m.thief, { faction: 'arab', ai: 'idle', hp: 60 });
        m.thief.ai = 'scripted'; m.thief.mission = 'target'; m.thief.rams = 3;
        Story.say([[HERO, 'Мотоцикл с кейсом уходит! Тут где-то был скутер...']]);
      },
      update(m, dt) {
        const c = m.thief;
        if (!c.stalled && (c.dead || Story.stalled(c, 0.6))) { c.stalled = true; if (c.driver && c.driver !== 'player') { const d = c.driver; bailOut(c); d.ai = 'idle'; } }
        if (c.stalled) {
          const who = m.td && !m.td.car && !m.td.dead ? m.td : c;
          m.target = who;
          m.text = 'Забери кейс';
          if (Story.hold(m, 'grab', who, 0.6, 'забрать кейс', { r: 70 })) {
            Story.flag('clueG', 1);
            Game.message('В телефоне грабителя: «Курьер выехал. Г.» Кто такой «Г.»?', 5);
            return 'next';
          }
          return;
        }
        fleeDrive(c, dt, 300);
        m.target = c;
        m.text = 'Догони мотоциклиста с кейсом и сбей его';
        if (escaped(m, c, dt, 12)) return 'fail:Кейс уехал. Сёма будет очень расстроен.';
      },
    },
    {
      name: 'Ювелир',
      resume() { Story.putPlayer(City.places.florentin, 'hatch', '#9e9e9e'); },
      start(m) { m.timer = 120; },
      update(m, dt) {
        if (needCar(m)) return;
        m.timer -= dt;
        if (m.timer <= 0) return 'fail:Ювелир закрылся. Кейс с камнями ночует у тебя под подушкой — Сёме это не понравится.';
        const P = City.places;
        m.text = 'Ювелир закрывается — гони в Неве-Цедек!';
        m.target = P.nevetzedek;
        if (stopAt(P.nevetzedek, 120)) { m.timer = null; Factions.change('russian', 15); Factions.change('arab', -15); return 'ok'; }
      },
    },
  ],
});

// ---------------------------------------------------------------- миссия 5
const C1_MAMA = staged({
  title: 'Мама приехала',
  sub: 'Глава 1 «Одесса» · миссия 5 из 10',
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'Лёва, ситуация. Мама приехала из Хайфы. Роза Львовна. У меня встреча, которую нельзя перенести.'],
    [SEMA, 'Покажи ей город. Вежливо. Плавно. Если ей что-то не понравится — мне конец. И тебе.'],
  ],
  reward: 1500,
  outro: 'Роза Львовна: Хороший мальчик. Худой, но хороший. Передай Сёме, чтобы позвонил маме.',
  init(m) { chP(); },
  stages: [
    {
      name: 'Автостанция',
      start(m) {
        const P = chP();
        m.pstage = 0; m.timer = null;
        m.roza = Story.ped(m, P.c1BusSt.x, P.c1BusSt.y, { ai: 'idle', look: lookRoza(), hp: 100, name: ROZA });
        m.roza.mission = 'target';
      },
      update(m, dt) {
        if (needCar(m)) return;
        const r = passengerStep(m, m.roza, { x: -1e6, y: -1e6 }, dt, { acc: 'Розу Львовну', nom: 'Роза Львовна', dead: 'Роза Львовна пострадала.' });
        if (r && r.startsWith('fail')) return r;
        if (m.pstage === 2) {
          Story.say([[ROZA, 'Худой. Не женат? Ну конечно. Сёма тоже был худой, пока не открыл ресторан.']]);
          return 'next';
        }
      },
    },
    {
      name: 'Экскурсия',
      resume(m) {
        const P = chP();
        const c = Story.putPlayer(P.c1BusSt, 'sedan');
        m.roza = new Ped(c.x, c.y, { ai: 'idle', look: lookRoza(), hp: 100, name: ROZA });
        Story.seat(m.roza, c);
        Story.own(m).peds.push(m.roza);
      },
      start(m) {
        const P = chP();
        m.stops = [
          { p: City.places.beach, name: 'набережная', say: [[ROZA, 'В семьдесят третьем мы с папой Сёмы гуляли тут. Он купил мне мороженое и сказал: «Розочка, здесь будет Майами». Ну, почти.']] },
          { p: P.c1Habima, name: 'театр Габима', say: [[ROZA, 'Габима! Я видела здесь «Дибука». Три раза. Ничего не поняла, но плакала все три.']] },
          { p: P.c1Sarona, name: 'Сарона', say: [[ROZA, 'Тут раньше были немецкие дома и коровы. Теперь кофе за тридцать шекелей. Это называется прогресс.']] },
        ];
        m.si2 = 0; m.wt = 0; m.sick = 0; m.cpv = null;
      },
      update(m, dt) {
        const pl = pl_(), c = pl.car;
        if (!c || c.passenger !== m.roza) return 'fail:Ты бросил Розу Львовну посреди дороги. Сёма тебя найдёт.';
        if (c.dead) return 'fail:Машина разбита. Роза Львовна в шоке.';
        const s = Story.comfort(m, c, dt);
        if (s > 60) Story.sayOnce(m, 'sick' + m.si2, [[ROZA, 'Лёвочка, ты везёшь маму или картошку? Плавнее!']]);
        if (s >= 100) return 'fail:Розу Львовну укачало. «Отвези меня обратно на автостанцию. Сёма узнает».';
        const st = m.stops[m.si2];
        m.target = st.p;
        m.text = T('Экскурсия: {0} — остановись рядом ({1} из 3) · укачало: {2}%', T(st.name), m.si2 + 1, Math.round(s));
        if (near(st.p, 170) && c.speed < 30) {
          m.wt += dt;
          if (m.wt > 2.5) { Story.say(st.say); m.si2++; m.wt = 0; if (m.si2 >= m.stops.length) return 'next'; }
        } else m.wt = 0;
      },
    },
    {
      name: 'Шук',
      resume(m) {
        const c = Story.putPlayer(City.places.shuk, 'sedan');
        m.roza = new Ped(c.x, c.y, { ai: 'idle', look: lookRoza(), hp: 100, name: ROZA });
        Story.seat(m.roza, c);
        Story.own(m).peds.push(m.roza);
      },
      start(m) {
        Story.say([[ROZA, 'Теперь на Шук. Мне нужна рыба на фаршированную, хрен и маца. И не спорь: маца в октябре — это нормально.']]);
        m.bought = 0;
      },
      update(m) {
        const P = chP(), pl = pl_();
        if (m.roza.dead) return 'fail:Роза Львовна пострадала. Это конец.';
        if (m.roza.car) {
          m.text = 'Отвези Розу Львовну на Шук а-Кармель';
          m.target = City.places.shuk;
          if (pl.car !== m.roza.car) return 'fail:Ты бросил Розу Львовну.';
          if (stopAt(City.places.shuk, 140) && pl.car.speed < 25) {
            const c = pl.car;
            c.passenger = null; m.roza.car = null;
            m.roza.x = c.x + 30; m.roza.y = c.y; World.peds.push(m.roza);
            m.roza.ai = 'follow'; m.roza.mission = 'ally';
            Game.exitCar();
          }
          return;
        }
        const items = ['рыба', 'хрен', 'маца'];
        if (m.bought >= 3) return 'next';
        const p = P.c1Stalls[m.bought];
        m.target = p;
        m.text = T('Покупки для Розы Львовны: {0} ({1} из 3)', T(items[m.bought]), m.bought + 1);
        if (Story.hold(m, 'buy' + m.bought, p, 1.2, T('торговаться и купить: {0}', T(items[m.bought])), { r: 70 })) {
          Story.say([[['Продавец', ROZA, 'Продавец'][m.bought], ['Для вас, мадам, — сорок шекелей!', 'Сколько? За этот хрен? Молодой человек, я сама этот хрен вырастила бы дешевле!', 'Ладно, ладно, тридцать!'][m.bought]]]);
          m.bought++;
        }
      },
    },
    {
      name: 'Карманник',
      cp: false,
      start(m) {
        const r = m.roza;
        m.thief = Story.runner(m, r.x + 30, r.y + 20, { look: Object.assign(Looks.civilian(), { shirt: '#212121' }), speed: 150 });
        Game.bigText('КАРМАННИК!', 'Кошелёк Розы Львовны с фото мужа', '#ff5252');
        Story.say([[ROZA, 'Мой кошелёк! Там фотография Миши! Лёва, догони его!']]);
      },
      update(m) {
        if (m.roza.dead) return 'fail:Роза Львовна пострадала. Это конец.';
        m.target = m.thief;
        m.text = 'Догони карманника в рядах Шука!';
        if (m.thief.dead) { Story.say([[ROZA, 'Лёва! Ну зачем так... Хотя кошелёк вернул. Спасибо.']]); Factions.change('russian', 10); return 'ok'; }
        if (dist(m.thief.x, m.thief.y, pl_().x, pl_().y) > 1300) return 'fail:Карманник растворился в толпе. Фото Миши потеряно.';
        if (Story.caught(m.thief)) {
          Story.say([[ROZA, 'Вот он, Миша. Спасибо, Лёвочка. Ты хороший мальчик. Сёма на тебя похож. Был.']]);
          Factions.change('russian', 10);
          return 'ok';
        }
      },
      end(m) { if (m.roza && !m.roza.dead) { m.roza.ai = 'walk'; m.roza.mission = null; } },
    },
  ],
});

// ---------------------------------------------------------------- миссия 6
const C1_CARGO = staged({
  title: 'Груз из Одессы',
  sub: 'Глава 1 «Одесса» · миссия 6 из 10',
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'В порту стоит наш контейнер. Водка, икра, всякие ностальгические продукты. Но охрану порта купил Абу-Карим.'],
    [SEMA, 'Боцман знает, какой контейнер. Боцман тебя встретит. Боцман — человек-загадка, не задавай ему вопросов.'],
  ],
  reward: 6000,
  outro: 'Сёма: Груз дома. Боцман сказал, ты видел, что внутри. Забудь. В «Одессе» хорошая память, но короткая.',
  init(m) {
    chP();
    const h = (Clock.min % 1440) / 60;
    if (h > 4 && h < 21) Clock.min = Math.floor(Clock.min / 1440) * 1440 + 23 * 60;
  },
  stages: [
    {
      name: 'Прорыв в порт',
      start(m) {
        const pl = pl_();
        if (!(pl.ammo.ak > 0) && !(pl.ammo.uzi > 0)) { World.pickups.push(new Pickup(pl.x + 30, pl.y, 'ak', { ammo: 90, once: true })); Game.message('Боцман оставил автомат у подъезда', 3); }
      },
      update(m) {
        const P = chP(), y = P.c1PortYard;
        if (!m.foes) {
          m.text = 'Приезжай в порт — охрана куплена кланом, придётся прорываться';
          m.target = y;
          if (!near(y, 600)) return;
          m.foes = Story.gang(m, 'arab', y, 5, { spread: 140, hp: 75 });
          m.barrels = [];
          for (let i = 0; i < 6; i++) {
            const a = i / 6 * TAU, bx = y.x + Math.cos(a) * 110, by = y.y + Math.sin(a) * 110;
            if (City.solidAt(bx, by)) continue;
            const b = Story.car(m, bx, by, 0, { type: 'barrel' }); b.locked = true; m.barrels.push(b);
          }
          Game.message('Стреляй по красным бочкам с топливом — они взрываются', 4);
        }
        const left = m.foes.filter((g) => !g.dead);
        m.text = T('Перебей охрану порта (осталось: {0})', left.length);
        m.target = nearestAlive(m.foes);
        if (!left.length) return 'next';
      },
    },
    {
      name: 'Контейнер',
      resume() { Story.putPlayer(chP().c1PortYard); },
      start(m) {
        const y = chP().c1PortYard;
        const specs = [['синий', '1989', '#1565c0'], ['красный', '1991', '#c62828'], ['синий', '1991', '#1565c0']];
        m.trucks = [];
        let k = 0;
        for (const [cn, num, col] of specs) {
          const p = Game.findRoadSpawn(y.x, y.y, 80 + k * 90, 260 + k * 120, true) || { x: y.x + 100 * k, y: y.y + 120, dir: 0 };
          const t = Story.car(m, p.x, p.y, DIR_ANGLE[p.dir], { type: 'truck', color: col });
          t.cn = cn; t.num = num; t.label = `${cn}, № ${num}`; t.right = num === '1991' && cn === 'синий'; t.locked = true;
          m.trucks.push(t); k++;
        }
        Story.say([[BOTSMAN, 'Номер не скажу — вдруг тебя возьмут. Синий. Цифры — год, когда Сёма приехал в Израиль. Он сам тебе говорил, за пельменями.']]);
      },
      update(m) {
        const pl = pl_();
        const t = m.trucks.filter((q) => !q.opened).sort((a, b) => dist2(a.x, a.y, pl.x, pl.y) - dist2(b.x, b.y, pl.x, pl.y))[0];
        m.text = 'Найди нужный контейнер: синий, год приезда Сёмы';
        m.target = t;
        if (near(t, 110) && m.seen !== t) { m.seen = t; Game.message(T('Контейнер: {0}', T('{0}, № {1}', T(t.cn), t.num)), 3); }
        if (Story.hold(m, 'open' + m.trucks.indexOf(t), t, 1.2, T('открыть контейнер {0}', T('{0}, № {1}', T(t.cn), t.num)), { r: 100 })) {
          if (t.right) return 'next';
          t.opened = true;
          Game.message(T('Не тот: {0} — внутри стиральные машины. Боцман: «Внимательнее»', T('{0}, № {1}', T(t.cn), t.num)), 3);
        }
      },
    },
    {
      name: 'Не водка',
      cp: false,
      update(m) {
        if (m.wait) return;
        if (!m.seenGuns) {
          m.seenGuns = true;
          ask(m, [
            ['', 'Внутри — ящики. Лёва поддевает крышку: в соломе лежат автоматы.'],
            [HERO, 'Боцман. Это не водка.'],
            [BOTSMAN, 'Это не твоё дело. И не моё. Садись в тягач.'],
            [HERO, '(По дороге будет телефон-автомат...)'],
          ], [['Сообщить Шабаку анонимно, с автомата по дороге', 'call'], ['Не моё дело', 'no']]);
          return;
        }
        if (m.answer === 'call') Story.flag('shabak', (Story.flag('shabak') || 0) + 1);
        return 'next';
      },
    },
    {
      name: 'Тягач',
      resume(m) {
        const c = Story.putPlayer(chP().c1PortYard, 'truck', '#1565c0');
        m.truck = c; c.keep = true; Story.own(m).cars.push(c);
      },
      start(m) {
        if (!m.truck) m.truck = m.trucks.find((t) => t.right);
        m.truck.locked = false;
        m.chase = []; m.wave = 0;
        if (Story.flag('shabak') && m.answer === 'call') Story.say([[HERO, 'Алло, горячая линия? Контейнер, порт, автоматы. Нет, имя не скажу.']]);
      },
      update(m) {
        const P = chP(), pl = pl_(), t = m.truck;
        if (t.dead) return 'fail:Тягач сгорел вместе с грузом.';
        if (pl.car !== t) { m.text = 'Садись в тягач с синим контейнером'; m.target = t; return; }
        if (m.wave === 0) { m.wave = 1; m.chase = Story.chasers(m, 'arab', 2); Game.message('Пикапы клана пытаются перегородить дорогу!', 3); }
        if (m.wave === 1 && m.stageT > 45) { m.wave = 2; m.chase.push(...Story.chasers(m, 'arab', 1)); }
        m.text = T('Вези тягач во двор «Одессы» в Рамат-Гане (тягач: {0}%)', Math.round(t.hp / t.maxHp * 100));
        m.target = P.c1Yard;
        if (stopAt(P.c1Yard, 170)) {
          Game.exitCar(); t.locked = true; t.stay = true;
          Factions.change('russian', 15); Factions.change('arab', -20);
          return 'ok';
        }
      },
    },
  ],
});

// ---------------------------------------------------------------- миссия 7
const C1_CAMPAIGN = staged({
  title: 'Грязная кампания',
  sub: 'Глава 1 «Одесса» · миссия 7 из 10',
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'Лёва, я дружу с министром национального порядка Бен-Гевером. Министр любит русских, русские любят порядок, а я люблю, когда меня любит министр.'],
    [SHLOMI, 'Привет, брат! Я Шломи, помощник министра. Перед выборами нам мешают протестующие и один журналист. Надо их немножко... дискредитировать. Ничего личного.'],
    [HERO, 'А если меня поймают?'],
    [SHLOMI, 'Кто поймает? Министр национального порядка — это мы.'],
  ],
  reward: 3500,
  outro: 'Сёма: Шломи доволен. Министр доволен. Протестующие недовольны. Значит, всё работает.',
  init(m) { chP(); },
  stages: [
    {
      name: 'Ноутбук журналиста',
      start(m) {
        const P = chP();
        m.ycar = Story.carOnRoad(m, P.c1Cafe, 40, 220, { type: 'sedan', color: '#f5f5f5' });
        m.ycar.locked = true; m.ycar.mission = 'target';
      },
      update(m) {
        if (!m.got) {
          m.text = 'Кафе на Ротшильде: разбей стекло машины Йоава и забери ноутбук';
          m.target = m.ycar;
          if (!Story.hold(m, 'laptop', m.ycar, 1.5, 'разбить стекло, взять ноутбук', { r: 70 })) return;
          m.got = true;
          Sound.play('glassM', 0.9);
          m.ycar.mission = null;
          Wanted.set(Math.max(Wanted.level, 1));
          m.chase = pursuers(m, 1, 'scooter', '#ff6a1a', () => Looks.named('yoav', Object.assign(Looks.civilian(), { shirt: '#0277bd' }))).concat(pursuers(m, 1, 'moto', '#37474f'));
          Story.say([[YOAV, 'Эй! Мой ноутбук! Там полгода работы! Стой!']]);
          return;
        }
        m.target = null;
        m.text = 'Оторвись от журналиста и оператора';
        if (!chasing(m.chase)) return 'next';
      },
    },
    {
      name: 'Плакаты',
      resume() { Story.putPlayer(chP().c1Cafe, 'hatch'); },
      start(m) {
        const n = chP().c1Bills.length;
        m.done = [0, 1, 2, 3].map((k) => k >= n);
        m.van = null; m.vanDone = n < 3;
        Story.say([[SHLOMI, 'Четыре щита на Ибн-Гвироле. Плакат: «Протест оплачивает Иран». Это не ложь, это... маркетинг.'], [HERO, 'Смешно. Иран действительно платит. Только мне.']]);
      },
      update(m) {
        const P = chP(), B = P.c1Bills, pl = pl_();
        let i = m.done.indexOf(false);
        if (i < 0 && m.vanDone) { Factions.change('russian', 5); return 'next'; }
        // протестующие у второго и третьего щита, их фургон — у третьего
        for (const k of [1, 2]) if (B[k] && !m['pr' + k] && near(B[k], 320)) {
          m['pr' + k] = Story.gang(m, null, { x: B[k].x, y: B[k].y + 40 }, 2, { weapon: 'fists', spread: 50, hp: 45 });
          for (const g of m['pr' + k]) { g.look = Looks.named('protester', Object.assign(Looks.civilian(), { shirt: '#1565c0' })); g.alert = 6; }
          Game.message('Протестующие: «Это ложь! Убирайся!»', 3);
          if (k === 2) { m.van = Story.carOnRoad(m, B[k], 30, 200, { type: 'van', color: '#eceff1' }); m.van.mission = 'target'; m.van.locked = true; m.van.rams = 1; } // одного тарана хватит
        }
        if (m.van && !m.vanDone && Story.stalled(m.van, 0.65)) { m.vanDone = true; m.van.mission = null; Game.message('Фургон с плакатами протестующих смят', 3); }
        if (i < 0) { m.text = 'Протарань фургон протестующих с их плакатами'; m.target = m.van; return; }
        const d = B[i];
        m.target = d;
        m.text = T('Повесь плакат «Протест оплачивает Иран» на щиты Ибн-Гвироля ({0} из {1})', i + 1, B.length);
        if (Story.hold(m, 'bill' + i, d, 2, 'повесить плакат', { r: 90 })) { m.done[i] = true; Story.poster(d, 'iran'); }
      },
    },
    {
      name: 'Провокаторы',
      resume() { Story.putPlayer(chP().c1Bills[0] || chP().c1Cafe, 'hatch'); },
      start(m) {
        const P = chP();
        m.pstage = 0; m.timer = null;
        m.motti = Story.ped(m, P.c1Kirya.x, P.c1Kirya.y, { ai: 'idle', look: Object.assign(Looks.civilian(), { shirt: '#c62828', style: 'shaved' }) });
        m.motti.mission = 'target';
      },
      update(m, dt) {
        if (needCar(m)) return;
        const P = chP();
        const r = passengerStep(m, m.motti, P.c1Rabin, dt, { acc: 'провокатора Мотти', nom: 'Мотти', dead: 'Мотти пострадал.' });
        if (r === 'boarded') Story.say([
          ['Мотти', 'Так, ребята в машине сзади. Вопрос: левые носят сандалии или кроссовки?'],
          ['Мотти', 'Сандалии с носками. И ругать надо «режим». Не правительство — режим. Я в интернете читал.'],
          [HERO, 'Вы хоть раз были на митинге?'],
          ['Мотти', 'Конечно. С другой стороны.'],
        ]);
        if (m.pstage === 2) m.text = 'Отвези провокаторов на митинг на площади Рабина';
        if (r === 'arrived') { m.motti.ai = 'walk'; return 'next'; }
        if (r && r.startsWith('fail')) return r;
      },
    },
    {
      name: 'Мы вас не знаем',
      resume() { Story.putPlayer(chP().c1Rabin, 'hatch'); },
      start(m) {
        talk(m, [
          ['', 'На площади начинается драка. Камеры снимают. Полиция окружает площадь. Провокаторы показывают пальцем на Лёву.'],
          [SHLOMI, 'Кто это? Мы вас не знаем. Никогда не видели. Министерство национального порядка осуждает насилие.'],
        ]);
        m.raised = false;
      },
      update(m) {
        if (m.wait) return;
        if (!m.raised) { m.raised = true; Wanted.set(Math.max(Wanted.level, 3)); }
        if (Wanted.level > 0) {
          m.text = 'Уйди от полиции. А на экранах министр Бен-Гевер обещает «закон и порядок»';
          m.target = City.places.paint;
          return;
        }
        if (!m.answer) {
          if (m.asked) return;
          m.asked = true;
          ask(m, [[HERO, 'Ноутбук журналиста всё ещё у меня. Шломи обещал за него две тысячи. А можно подбросить в редакцию...']], [['Отдать Шломи (+₪2000)', 'shlomi'], ['Подбросить в редакцию «Мабат+»', 'mabat']]);
          return;
        }
        if (m.answer === 'shlomi') { Game.addMoney(2000); Factions.change('russian', 10); return 'ok'; }
        Story.flag('yoavAlly', 1);
        m.text = 'Подбрось ноутбук в редакцию «Мабат+»';
        m.target = chP().c1Mabat;
        if (Story.hold(m, 'drop', chP().c1Mabat, 1, 'оставить ноутбук у двери')) { Story.say([[YOAV, '(записка на ноутбуке) «От анонимного таксиста». Кто бы ты ни был — спасибо.']]); return 'ok'; }
      },
    },
  ],
});

// ---------------------------------------------------------------- миссия 8
const C1_RECOUNT = staged({
  title: 'Пересчёт',
  sub: 'Глава 1 «Одесса» · миссия 8 из 10',
  phone: null,
  giver: SEMA,
  intro: [
    [FIRA, 'Лёвочка, ночью обчистили мой обменник. Сейф вскрыли культурно, без грязи. Значит, свои.'],
    [SEMA, 'Крыса в бригаде. Найди её, Лёва. Ты новенький — ты чистый. Пока.'],
  ],
  reward: 4000,
  outro: 'Сёма: Родная кровь... Ладно. Ты молодец, земляк. Ты даже слишком молодец.',
  init(m) { chP(); },
  stages: [
    {
      name: 'Место преступления',
      start(m) {
        const e = chP().c1Exchange;
        m.clues = [
          { p: { x: e.x + 30, y: e.y - 20 }, t: 'разбитый сейф', msg: 'Сейф вскрыт ключом. Ключ был только у своих.' },
          { p: { x: e.x - 50, y: e.y + 40 }, t: 'следы шин', msg: 'Широкие шины, красная краска на бордюре.' },
          { p: { x: e.x + 70, y: e.y + 50 }, t: 'гильза', msg: 'Гильза от ТТ. В «Одессе» любят ТТ.' },
        ];
      },
      update(m) {
        const left = m.clues.filter((c) => !c.done);
        if (!left.length) return 'next';
        const c = left[0];
        m.target = c.p;
        m.text = T('Осмотри обменник: {0} ({1} из 3)', T(c.t), 4 - left.length);
        if (Story.hold(m, 'clue' + c.t, c.p, 1.2, T('осмотреть: {0}', T(c.t)))) { c.done = true; Game.message('🔍 ' + T(c.msg), 4); }
      },
    },
    {
      name: 'Камеры',
      resume() { Story.putPlayer(chP().c1Exchange); },
      start(m) {
        const P = chP();
        m.cams = Story.flag('kioskSpared') ? [{ p: P.c1Kiosk, t: 'киоск' }] : [{ p: P.c1Kiosk, t: 'киоск' }, { p: P.c1Berezka, t: '«Берёзка»' }, { p: City.side(8, 3, 'N'), t: 'аптека' }];
        if (Story.flag('kioskSpared')) Story.say([['Киоскёр', 'Брат! Ты меня пожалел — я помню. Вот запись, бесплатно. И смотри: красная машина, три часа ночи.']]);
        else Story.say([[HERO, 'Камеры в трёх магазинах. Хозяева, наверное, захотят денег.']]);
      },
      update(m) {
        const left = m.cams.filter((c) => !c.done);
        if (!left.length) return 'next';
        const c = left[0];
        m.target = c.p;
        m.text = T('Записи камер: {0} ({1} из {2})', T(c.t), m.cams.length - left.length + 1, m.cams.length);
        if (Story.hold(m, 'cam' + c.t, c.p, 1.4, Story.flag('kioskSpared') ? 'взять запись' : 'купить запись (₪200)')) {
          c.done = true;
          if (!Story.flag('kioskSpared')) Game.addMoney(-200);
          Game.message('📼 На записи — красная машина у обменника в три часа ночи', 3);
        }
      },
    },
    {
      name: 'Свидетель',
      resume() { Story.putPlayer(chP().c1Kiosk); },
      start(m) {
        const e = chP().c1Exchange;
        m.baba = Story.ped(m, e.x + 90, e.y + 10, { ai: 'idle', look: Looks.named('baba', Object.assign(Looks.civilian(), { style: 'curly', hair: '#e0e0e0', shirt: '#7e57c2' })) });
        m.answer = undefined;
      },
      update(m) {
        if (m.wait) return;
        if (m.answer) return 'next';
        m.text = 'Расспроси бабушку на лавочке — она всё видит';
        m.target = m.baba;
        if (!m.asked && onFoot(m.baba, 50)) {
          m.asked = true;
          ask(m, [['Бабушка Хая', 'Видела, видела. Я всё вижу, я тут с восемьдесят девятого сижу. Что тебе рассказать, сынок?']], [
            ['Какая была машина?', 'car'], ['Кто был за рулём?', 'who'], ['А вы чего не спите в три часа ночи?', 'joke'],
          ]);
        }
      },
      end(m) {
        const lines = { car: [['Бабушка Хая', 'Красная, низкая, музыка бум-бум. Как у племянника вашего главного.']], who: [['Бабушка Хая', 'Кудрявый. В кожанке. Племянник вашего главного, этот, Гарик. Он мне ещё в прошлом году сумку не донёс.']], joke: [['Бабушка Хая', 'В моём возрасте, сынок, сон — это роскошь. А Гарик — нет. Это был Гарик.']] };
        if (m.answer) Story.say(lines[m.answer]);
      },
    },
    {
      name: 'Это Гарик',
      cp: false,
      update(m) {
        if (m.wait) return;
        if (m.told) return 'next';
        m.told = true;
        talk(m, [
          [HERO, 'Красная машина. Кожанка. «Курьер выехал. Г.» — сообщение у грабителя с кейсом. Гарик.'],
          [HERO, 'И крипта, которую я обналичивал у Гарика... Кошелёк тот же, что у «Али». Куда он везёт деньги?'],
        ]);
      },
    },
    {
      name: 'Слежка за Гариком',
      resume() { Story.putPlayer(chP().c1Exchange, 'hatch'); },
      start(m) {
        // Гарик выезжает недалеко от игрока (и после перезапуска с контрольной
        // точки), не вплотную — чтобы было видно, за кем ехать
        const pl = pl_();
        m.g = Story.carOnRoad(m, pl, 350, 600, { type: 'sedan', color: '#c62828', faction: 'russian' });
        m.gd = Story.driver(m, m.g, { faction: 'russian', ai: 'idle', look: lookGarik(), hp: 120, name: GARIK });
        m.g.ai = 'scripted'; m.g.mission = 'target';
        m.close = 0; m.lost = 0;
        Game.message('Красная машина Гарика трогается — за ней!', 3);
      },
      update(m, dt) {
        if (needCar(m)) return;
        const pl = pl_(), g = m.g, dst = City.places.iranMeet;
        if (g.dead) return 'fail:Машина Гарика сгорела — и все ответы вместе с ней.';
        const left = driveTo(g, dst.x, dst.y, dt, 170);
        const d = dist(pl.x, pl.y, g.x, g.y);
        m.target = g;
        m.text = d < 170 ? 'Слишком близко! Гарик заметит' : d > 900 ? 'Гарик уходит — догоняй!' : 'Езжай за Гариком на расстоянии — куда он везёт сумку?';
        if (d < 170) { m.close += dt; if (m.close > 3) { Game.message('Гарик заметил тебя в зеркале!', 3); return 'next'; } } else m.close = Math.max(0, m.close - dt);
        // потерял — только если долго не видно, а не от одного рывка
        if (d > 1100) { m.lost += dt; if (m.lost > 5) return 'fail:Ты потерял Гарика из виду.'; } else m.lost = 0;
        if (left < 130) {
          g.vx = g.vy = 0;
          Story.flag('sawContact', 1);
          Story.say([[HERO, 'Сарона. Гарик отдаёт сумку человеку в сером костюме... Тот самый «брат» из Телеграма, только вживую.'], [GARIK, '(озирается) Чёрт! Таксист!']]);
          return 'next';
        }
      },
    },
    {
      name: 'Погоня за Гариком',
      resume(m) {
        Story.putPlayer(City.places.iranMeet, 'hatch');
      },
      start(m) {
        if (!m.g || m.g.dead) {
          m.g = Story.carOnRoad(m, City.places.iranMeet, 200, 400, { type: 'sedan', color: '#c62828', faction: 'russian' });
          m.gd = Story.driver(m, m.g, { faction: 'russian', ai: 'idle', look: lookGarik(), hp: 120, name: GARIK });
        }
        m.g.ai = 'scripted'; m.g.mission = 'target'; m.g.rams = 3; m.g.maxSpeed = m.g.T.max * 0.95;
        m.answer = undefined; m.asked = false;
      },
      update(m, dt) {
        if (m.wait) return;
        const g = m.g, gd = m.gd;
        if (m.answer) {
          if (m.answer === 'sema') { Story.flag('garikGiven', 1); Factions.change('russian', 20); }
          else { Story.flag('garikFreed', 1); Factions.change('russian', -10); gd.ai = 'flee'; gd.flee = 8; gd.threat = { x: pl_().x, y: pl_().y }; gd.mission = null; }
          return 'ok';
        }
        if (!g.stalled && !g.dead && Story.stalled(g, 0.5)) Game.message('Машина Гарика заглохла!', 3);
        if (g.stalled || g.dead) {
          if (gd.dead) { Story.flag('garikDead', 1); Factions.change('russian', -10); return 'ok'; }
          m.target = gd;
          m.text = 'Хватай Гарика (подбеги вплотную)';
          if (!m.asked && Story.caught(gd)) {
            m.asked = true;
            ask(m, [
              [GARIK, 'Ну давай, сдай меня дяде. Он меня убьёт. Или нет — он же «родная кровь»...'],
              [GARIK, 'Долги, понимаешь? Казино. Эти иранцы платят наличными и ничего не спрашивают. Как и ты, кстати.'],
            ], [['Сдать Гарика Сёме', 'sema'], ['Отпустить: «Уезжай из города»', 'free']]);
          }
          return;
        }
        fleeDrive(g, dt, 280);
        m.target = g;
        m.text = 'Гарик удирает по Аялону — прижми его машину!';
        if (escaped(m, g, dt, 12)) return 'fail:Гарик ушёл.';
      },
    },
  ],
});

// ---------------------------------------------------------------- миссия 9
const C1_JUBILEE = staged({
  title: 'Юбилей',
  sub: 'Глава 1 «Одесса» · миссия 9 из 10',
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'Лёва. Мне шестьдесят. Праздник в «Одессе», всё должно быть идеально.'],
    [SEMA, 'Список: «Наполеон» из «Берёзки», живой осётр у рыбаков в яффской гавани, баянист из Неве-Цедека и фейерверк с блошиного рынка. Пять минут. Ялла, как у вас говорят.'],
  ],
  reward: 5000,
  outro: 'Сёма: Маму вернул. Я этого не забуду, Лёва. Никогда. Но теперь — моя очередь.',
  init(m) { chP(); },
  stages: [
    {
      name: 'Подарки',
      start(m) {
        const P = chP();
        m.timer = 330;
        m.items = [
          { k: 'cake', t: 'торт «Наполеон» в «Берёзке»', p: P.c1Berezka, h: 'забрать торт' },
          { k: 'fish', t: 'живой осётр в яффской гавани', p: P.c1Fish, h: 'схватить осетра' },
          { k: 'acc', t: 'баянист в Неве-Цедеке', p: City.places.nevetzedek, h: 'уговорить баяниста' },
          { k: 'fire', t: 'фейерверк на блошином рынке', p: P.c1Flea, h: 'купить фейерверк' },
        ];
      },
      update(m, dt) {
        const P = chP(), pl = pl_();
        m.timer -= dt;
        if (m.timer <= 0) return 'fail:Праздник начался без подарков. Сёма не разговаривает с тобой. Пока.';
        const left = m.items.filter((i) => !i.done);
        if (!left.length) {
          m.text = 'Всё собрано — вези в «Одессу»!';
          m.target = P.c1Odessa;
          if (stopAt(P.c1Odessa, 140)) { m.timer = null; return 'next'; }
          return;
        }
        left.sort((a, b) => dist2(a.p.x, a.p.y, pl.x, pl.y) - dist2(b.p.x, b.p.y, pl.x, pl.y));
        const it = left[0];
        m.target = it.p;
        m.text = T('Подарки к юбилею: {0} ({1} из 4)', T(it.t), 4 - left.length);
        if (!Story.hold(m, it.k, it.p, it.k === 'fish' || it.k === 'acc' ? 1.5 : 1, it.h)) return;
        it.done = true;
        if (it.k === 'fish') { Story.chasers(m, 'arab', 2); Game.message('Рыбаки клана: «Русским не продаём!» — погоня', 3); Factions.change('arab', -5); }
        if (it.k === 'fire') { pl.ammo.grenade = (pl.ammo.grenade || 0) + 4; Game.message('Фейерверк — 4 ракеты (как гранаты, клавиша 7)', 4); }
        if (it.k === 'cake') Game.message('«Наполеон» на заднем сиденье. Только не тормози резко.', 3);
        if (it.k === 'acc') Story.say([['Баянист', 'За юбилей Сёмы? Поеду. Но на такси: с тобой, говорят, укачивает.']]);
      },
    },
    {
      name: 'Праздник',
      cp: false,
      update(m) {
        if (m.wait) return;
        if (m.toasted) return 'next';
        m.toasted = true;
        if (pl_().car) Game.exitCar();
        talk(m, [
          ['', 'В «Одессе» тосты, «Ой, мороз, мороз» под баян, Роза Львовна танцует с Боцманом. Фира Марковна считает гостей.'],
          [SEMA, 'За то, чтобы у нас всё было, и нам за это ничего не было!'],
          [ROZA, 'Сёма, не пей много. Лёвочка, скушай ещё.'],
          ['', 'С улицы доносится визг шин.'],
        ]);
      },
    },
    {
      name: 'Налёт на «Одессу»',
      resume() { Story.putPlayer(chP().c1Odessa); },
      start(m) {
        const P = chP();
        GangCars.release(Story.own(m).gangCars || []);
        m.foes = Story.gang(m, 'arab', { x: P.c1Odessa.x, y: P.c1Odessa.y - 160 }, 5, { spread: 120, hp: 75 });
        for (const g of m.foes) g.alert = 8;
        m.chase = Story.chasers(m, 'arab', 2, { min: 350, max: 600 });
        m.allies = allies(m, 'russian', 2, { weapon: 'ak' });
        Game.bigText('НАЛЁТ!', 'Клан Аль-Бахар отвечает за всё', '#ff5252');
        const pl = pl_();
        if (!(pl.ammo.pistol > 0) && !(pl.ammo.ak > 0) && !(pl.ammo.uzi > 0)) World.pickups.push(new Pickup(pl.x + 20, pl.y + 20, 'pistol', { ammo: 48, once: true }));
      },
      update(m) {
        const left = foesWithChasers(m.foes, m.chase);
        m.text = T('Отбей налёт на ресторан (осталось: {0})', m.foes.filter((g) => !g.dead).length + GangCars.alive(m.chase));
        m.target = nearestAlive(left);
        if (!left.length && m.stageT > 3) return 'next';
      },
    },
    {
      name: 'Роза',
      resume() { Story.putPlayer(chP().c1Odessa, 'sedan'); },
      start(m) {
        const P = chP();
        m.kv = Story.carOnRoad(m, P.c1Odessa, 200, 420, { type: 'pickup', faction: 'arab' });
        m.kv.hp = m.kv.maxHp = 220;
        m.kd = Story.driver(m, m.kv, { faction: 'arab', ai: 'idle', hp: 80, weapon: 'uzi' });
        m.kv.ai = 'scripted'; m.kv.mission = 'target'; m.kv.rams = 3;
        m.roza = new Ped(m.kv.x, m.kv.y, { ai: 'idle', look: lookRoza(), hp: 100, name: ROZA });
        Story.seat(m.roza, m.kv);
        Story.own(m).peds.push(m.roza);
        talk(m, [[SEMA, 'Они взяли маму! Белый пикап! Лёва, верни маму. Только живой, умоляю...']]);
      },
      update(m, dt) {
        if (m.wait) return;
        const c = m.kv;
        if (c.dead && m.roza.car) return 'fail:Пикап сгорел вместе с Розой Львовной. Ты никогда себе этого не простишь.';
        if (m.roza.dead) return 'fail:Роза Львовна погибла.';
        if (!c.stalled && Story.stalled(c, 0.55)) {
          // похититель выскакивает с узи, Роза — из машины
          if (c.passenger === m.roza) { c.passenger = null; m.roza.car = null; m.roza.x = c.x - 30; m.roza.y = c.y; World.peds.push(m.roza); m.roza.mission = 'ally'; }
          m.kd.ai = 'gang'; m.kd.alert = 8; m.kd.home = { x: m.kd.x, y: m.kd.y };
          Game.message('Пикап заглох! Похититель выскочил с узи', 3);
        }
        if (c.stalled) {
          m.target = m.kd.dead ? m.roza : m.kd;
          m.text = m.kd.dead ? 'Роза Львовна свободна' : 'Убери похитителя, не задень Розу Львовну';
          if (m.kd.dead) { Factions.change('russian', 10); Factions.change('arab', -20); return 'ok'; }
          return;
        }
        fleeDrive(c, dt, 250);
        m.target = c;
        m.text = 'Догони белый пикап и прижми его — аккуратно, там Роза Львовна!';
        if (escaped(m, c, dt, 12)) return 'fail:Пикап с Розой Львовной ушёл.';
      },
      end(m) { if (m.roza && !m.roza.dead && !m.roza.car) { m.roza.ai = 'walk'; m.roza.mission = null; } },
    },
  ],
});

// ---------------------------------------------------------------- миссия 10, финал главы
const C1_LASTRUN = staged({
  title: 'Последний рейс',
  sub: 'Глава 1 «Одесса» · финал главы',
  phone: null,
  giver: SEMA,
  intro: [
    [SEMA, 'Лёва, последнее на сегодня. На складе во Флорентине стоит фургон. Забери посылку и отвези в порт, к кораблю. Вопросов не задавай.'],
    [HERO, 'Какая посылка?'],
    [SEMA, 'Я сказал — вопросов не задавай.'],
  ],
  reward: 8000,
  outro: 'Ицик: Это тебе на новую квартиру. Не благодари. Просто не умирай пока.',
  after: [
    [ITZIK, 'Ты нажил врагов сразу в двух бандах за одну неделю, Лёва. Даже я так не умею. Ночуй у меня в гараже.'],
    ['', 'Ночью пищит Телеграм.'],
    [ALI, 'Брат, слышал, у тебя проблемы с земляками. У меня есть работа. ₪5000.'],
  ],
  init(m) { chP(); },
  stages: [
    {
      name: 'Посылка',
      start(m) {
        const P = chP();
        m.van = Story.carOnRoad(m, P.c1Warehouse, 30, 220, { type: 'van', color: '#37474f' });
        m.van.locked = true; m.van.hp = m.van.maxHp = 220;
      },
      update(m) {
        if (m.wait) return;
        if (m.opened) return 'next';
        m.text = 'Склад во Флорентине: забери «посылку» из фургона';
        m.target = m.van;
        if (!Story.hold(m, 'trunk', m.van, 1.2, 'открыть багажник', { r: 80 })) return;
        m.opened = true;
        const lines = [
          ['', 'В багажнике — связанный парень, ровесник Лёвы. Это Карим, племянник Абу-Карима.'],
          [KARIM, 'Ты же тоже приезжий, да? По акценту слышно. Они меня продадут. На корабль — и всё.'],
          [SEMA, '(звонок) Лёва, ты на месте? Не открывай фургон. Не задавай вопросов, земляк. Просто вези.'],
          [HERO, '...Я таксист, Сёма. Людей вожу. Но не так.'],
        ];
        if (Story.flag('garikFreed')) lines.push([GARIK, '(сообщение) Таксист, это Гарик. Ты меня отпустил — я должен. В порту тебя ждут не с деньгами. Тебя уберут вместе с ним.']);
        talk(m, lines);
      },
    },
    {
      name: 'Побег',
      resume(m) {
        const c = Story.putPlayer(chP().c1Warehouse, 'van', '#37474f');
        m.van = c; Story.own(m).cars.push(c); c.keep = true; c.hp = c.maxHp = 220;
      },
      start(m) {
        m.van.locked = false;
        m.karim = new Ped(m.van.x, m.van.y, { ai: 'idle', look: lookKarim(), hp: 120, name: KARIM });
        Story.seat(m.karim, m.van);
        Story.own(m).peds.push(m.karim);
        m.wave = 0;
      },
      update(m) {
        const pl = pl_(), v = m.van, P = chP();
        if (m.karim.dead) return 'fail:Карим погиб.';
        if (v.dead) return 'fail:Фургон сгорел вместе с Каримом.';
        if (pl.car !== v) { m.text = 'Садись за руль фургона — Карим внутри'; m.target = v; return; }
        if (m.wave === 0) { m.wave = 1; m.chase = Story.chasers(m, 'russian', 3); Game.bigText('ПОБЕГ', 'Бригада «Одесса» перекрывает выезды', '#ff5252'); Story.say([[KARIM, 'Они за нами! Ты правда меня везёшь домой?'], [HERO, 'Держись крепче. Фургон тяжёлый.']]); }
        if (m.wave === 1 && m.stageT > 40) { m.wave = 2; m.chase.push(...Story.chasers(m, 'russian', 1)); }
        m.text = 'Уходи от «Одессы» на восток, через Аялон — к Сароне';
        m.target = P.c1Block;
        if (near(P.c1Block, 330)) return 'next';
      },
    },
    {
      name: 'Блокпост на Аялоне',
      resume(m) {
        const c = Story.putPlayer(chP().c1Block, 'van', '#37474f');
        m.van = c; Story.own(m).cars.push(c); c.keep = true; c.hp = c.maxHp = 220;
        m.karim = new Ped(c.x, c.y, { ai: 'idle', look: lookKarim(), hp: 120, name: KARIM });
        Story.seat(m.karim, c);
        Story.own(m).peds.push(m.karim);
      },
      start(m) {
        const b = chP().c1Block;
        GangCars.release(m.chase || []);
        m.foes = Story.gang(m, 'russian', { x: b.x, y: b.y + 160 }, 4, { spread: 120, hp: 75 });
        for (const g of m.foes) g.alert = 8;
        Story.say([[HERO, 'Блокпост «Одессы»! Карим, голову ниже. Прорываемся.']]);
      },
      update(m) {
        const pl = pl_(), v = m.van;
        if (m.karim.dead) return 'fail:Карим погиб.';
        if (v.dead) return 'fail:Фургон сгорел вместе с Каримом.';
        const left = m.foes.filter((g) => !g.dead);
        if (!left.length) { if (pl.car === v) return 'next'; m.text = 'Блокпост расчищен — садись в фургон'; m.target = v; return; }
        m.text = T('Прорвись через блокпост «Одессы» (осталось: {0}) — дави или стреляй', left.length);
        m.target = nearestAlive(m.foes);
      },
    },
    {
      name: 'Яффо',
      resume(m) {
        const c = Story.putPlayer(chP().c1Block, 'van', '#37474f');
        m.van = c; Story.own(m).cars.push(c); c.keep = true;
        m.karim = new Ped(c.x, c.y, { ai: 'idle', look: lookKarim(), hp: 120, name: KARIM });
        Story.seat(m.karim, c);
        Story.own(m).peds.push(m.karim);
      },
      start(m) { m.out = false; m.chase = []; },
      update(m, dt) {
        const pl = pl_(), k = m.karim, P = chP();
        if (k.dead) return 'fail:Карим погиб у самого дома.';
        if (!m.out) {
          if (!pl.car || pl.car.passenger !== k) { m.text = 'Вернись в машину с Каримом'; m.target = k.car || k; if (!k.car && pl.car && dist(k.x, k.y, pl.car.x, pl.car.y) < 160) k.ai = 'board'; return; }
          m.text = 'Вези Карима к границе Яффо — дальше клан стреляет в тебя без разговоров';
          m.target = P.c1JaffaEdge;
          if (stopAt(P.c1JaffaEdge, 140)) {
            const c = pl.car; c.passenger = null; k.car = null; k.x = c.x + 30; k.y = c.y; World.peds.push(k);
            k.ai = 'idle'; k.mission = 'ally'; k.faction = 'arab'; // свои его не подстрелят
            m.out = true;
            m.chase = Story.chasers(m, 'russian', 2, { min: 400, max: 700 });
            Story.say([[KARIM, 'Дальше я сам. Ты... прикрой. Я скажу дяде, кто меня вытащил.'], [HERO, 'Беги, Карим. Не оглядывайся.']]);
          }
          return;
        }
        Factions.calm('arab'); // при племяннике Абу-Карима клан не стреляет
        const d = Story.walkTo(k, City.places.arHQ, 105, dt);
        m.text = 'Прикрой Карима, пока он идёт к дяде';
        m.target = k;
        if (d < 70) { k.ai = 'idle'; return 'next'; }
      },
    },
    {
      name: 'Развязка',
      resume() { Story.putPlayer(chP().c1JaffaEdge, 'hatch'); },
      start(m) {
        GangCars.release(m.chase || []);
        const lines = [
          [SEMA, 'Ты теперь никто, земляк. Ни квартиры, ни друзей. Посмотри на Флорентин — там твоя «дира» горит.'],
          [HERO, 'Квартира съёмная, Сёма. А совесть — своя.'],
        ];
        Factions.change('russian', -200, true);
        Wanted.set(Math.max(Wanted.level, 3));
        if (Story.flag('shabak')) { lines.push([DANI, 'Лёва, это Дани. Мы за тобой следим. В хорошем смысле. Полицию я отозвал.']); }
        talk(m, lines);
        m.cleared = false;
      },
      update(m) {
        if (m.wait) return;
        if (!m.cleared && Story.flag('shabak')) { m.cleared = true; Wanted.reset(); }
        if (Wanted.level > 0) { m.text = 'Уйди от полиции'; m.target = City.places.paint; return; }
        m.text = 'Ночуй в гараже у Ицика в порту';
        m.target = City.places.portGarage;
        if (stopAt(City.places.portGarage, 120)) return 'ok';
      },
    },
  ],
});

// ---------------------------------------------------------------- перебивка 2
const INTERLUDE_2 = staged({
  title: 'Двойная игра',
  sub: 'Перебивка · «Али» и Шабак',
  phone: null,
  intro: () => {
    const L = [[ALI, 'Брат, работа простая: сфотографируй Кирью. Три здания. ₪5000. Ты же теперь свободный человек.']];
    if (Story.flag('shabak')) L.push([DANI, 'Лёва, это Дани. «Али» тебе написал? Отлично. Подыграй ему. Нам нужно, чтобы они тебе поверили.']);
    else L.push(['', 'Лёва наконец набирает номер горячей линии Шабака.'], [DANI, 'Поздно, но правильно. Подыграй ему. Нам нужно, чтобы они тебе поверили.']);
    return L;
  },
  reward: 5000,
  outro: 'Дани: Оставь себе. Заработал.',
  after: [
    [DANI, 'На ноутбуке — адрес их конспиративной квартиры. Отдыхай, Лёва. Скоро понадобишься.'],
    ['', 'Лёва возвращается в гараж к Ицику. У ворот — фургон без номеров. Дверь отъезжает. Мешок на голову.'],
  ],
  init(m) { chP(); },
  stages: [
    {
      name: 'Фото на ходу',
      start(m) { m.slow = 0; },
      update(m, dt) {
        if (needCar(m)) return;
        const P = chP(), pl = pl_(), S = P.c1KiryaShots;
        const left = S.map((p, i) => [p, i]).filter(([p, i]) => !(m.photos && m.photos['k' + i] === 'done'));
        if (!left.length) return 'next';
        // у базы стоять нельзя — военная полиция
        if (near(S[0], 600) && pl.car.speed < 15) { m.slow += dt; if (m.slow > 4 && Wanted.level === 0) { Wanted.set(1); Game.message('Военная полиция: «Здесь стоять запрещено!»', 3); m.slow = 0; } } else m.slow = 0;
        const [p, i] = left[0];
        m.target = p;
        m.text = T('Сфотографируй Кирью на ходу: {0} из {1} (не останавливайся у базы)', S.length - left.length + 1, S.length);
        Story.photo(m, 'k' + i, p, 2, 380);
      },
    },
    {
      name: 'Поджог в парке Яркон',
      resume() { Story.putPlayer(chP().c1Kirya, 'hatch'); },
      start(m) {
        const P = chP();
        m.old = Story.carOnRoad(m, P.c1ParkCar, 0, 300, { type: 'sedan', color: '#8d6e63' });
        m.old.hp = m.old.maxHp = 60;
        Story.say([[ALI, 'Красивые фото, брат. Следующее: подожги машину в парке Яркон. Сними, как горит.'], [DANI, 'Возьми старую коричневую машину у парка — она наша. Пусть горит на здоровье.']]);
        m.lit = false;
      },
      update(m) {
        const P = chP(), pl = pl_(), c = m.old;
        if (!m.lit) {
          if (c.dead) return 'fail:Машина Шабака сгорела не там.';
          if (pl.car !== c && !m.parked) { m.text = 'Садись в старую коричневую машину Шабака'; m.target = c; return; }
          if (!m.parked) {
            m.text = 'Загони машину в парк Яркон';
            m.target = P.c1Yarkon;
            if (near(P.c1Yarkon, 150) && c.speed < 40) { m.parked = true; Game.exitCar(); }
            return;
          }
          m.text = 'Подожги машину и отбеги';
          m.target = c;
          if (Story.hold(m, 'fire', c, 2, 'поджечь машину', { r: 80 })) { c.damage(9999, null, c.x, c.y); m.lit = true; Game.message('Беги! Сейчас рванёт!', 3); }
          return;
        }
        if (c.burn > 0) { m.text = 'Отбеги подальше!'; m.target = null; return; }
        m.text = 'Сними горящую машину на видео для «Али»';
        m.target = c;
        if (Story.photo(m, 'video', c, 1.5, 420)) return 'next';
      },
    },
    {
      name: 'Проверяющий',
      resume() { Story.putPlayer(chP().c1Yarkon, 'hatch'); },
      start(m) {
        const P = chP();
        m.obs = Story.carOnRoad(m, P.c1Yarkon, 250, 500, { type: 'moto', faction: 'iran' });
        m.od = Story.driver(m, m.obs, { faction: 'iran', ai: 'idle', hp: 70 });
        m.obs.ai = 'scripted'; m.obs.mission = 'target'; m.obs.rams = 1;
        talk(m, [[DANI, 'Мотоциклист у ограды — человек «Али», проверял тебя. Он видел наш фургон! Не дай ему уйти и доложить!']]);
      },
      update(m, dt) {
        if (m.wait) return;
        const c = m.obs, d = m.od;
        if (!c.stalled && (c.dead || Story.stalled(c, 0.6))) { c.stalled = true; if (c.driver && c.driver !== 'player') { bailOut(c); d.ai = 'idle'; } }
        if (c.stalled) {
          if (d.dead) return 'next';
          m.target = d;
          m.text = 'Хватай проверяющего';
          if (Story.caught(d)) { Game.message('Проверяющий в наручниках у людей Дани', 3); d.ai = 'idle'; return 'next'; }
          return;
        }
        fleeDrive(c, dt, 300);
        m.target = c;
        m.text = 'Догони проверяющего на мотоцикле!';
        if (escaped(m, c, dt, 12)) return 'fail:Проверяющий ушёл и всё доложил «Али».';
      },
    },
    {
      name: 'Курьер в Сароне',
      resume() { Story.putPlayer(chP().c1Sarona, 'hatch'); },
      start(m) {
        Story.say([
          [RADIO, 'Министр национального порядка Бен-Гевер: «Поджог в парке Яркон — дело рук левых анархистов. Мы наведём порядок»'],
          [HERO, 'Ага. Анархист — это я, а спички купил Шабак.'],
          [ALI, 'Видео огонь, брат. Курьер с деньгами ждёт в Сароне.'],
        ]);
        m.foes = null; m.van = null;
      },
      update(m, dt) {
        const P = City.places;
        if (!m.foes) {
          m.text = 'Встреться с курьером «Али» в Сароне';
          m.target = P.iranMeet;
          if (!near(P.iranMeet, 220)) return;
          m.foes = Story.gang(m, 'iran', { x: P.iranMeet.x, y: P.iranMeet.y - 60 }, 4, { spread: 110, hp: 80 });
          for (const g of m.foes) g.alert = 8;
          allies(m, null, 2, { look: Looks.shabak(), weapon: 'uzi', hp: 200 });
          Game.bigText('ЗАСАДА!', 'Курьер нервничает — и открывает огонь', '#ff5252');
          return;
        }
        const left = m.foes.filter((g) => !g.dead);
        if (left.length) { m.text = T('Отбейся вместе с людьми Дани (осталось: {0})', left.length); m.target = nearestAlive(m.foes); return; }
        if (!m.van) {
          m.van = Story.carOnRoad(m, P.iranMeet, 200, 450, { type: 'van', faction: 'iran' });
          m.vd = Story.driver(m, m.van, { faction: 'iran', ai: 'idle', hp: 80 });
          m.van.ai = 'scripted'; m.van.mission = 'target'; m.van.hp = m.van.maxHp = 200; m.van.rams = 4;
          Game.message('Дани: Фургон с ноутбуком уходит! Тарань его!', 3);
        }
        const v = m.van;
        if (!v.stalled && (v.dead || Story.stalled(v, 0.5))) v.stalled = true;
        if (v.stalled) {
          if (m.vd && !m.vd.car && !m.vd.dead && m.vd.ai === 'idle') { m.vd.ai = 'gang'; m.vd.alert = 8; m.vd.weapon = 'pistol'; m.vd.home = { x: m.vd.x, y: m.vd.y }; }
          m.target = v;
          m.text = 'Забери ноутбук из фургона';
          if (Story.hold(m, 'laptop', v, 1, 'забрать ноутбук', { r: 90 })) return 'ok';
          return;
        }
        fleeDrive(v, dt, 230);
        m.target = v;
        m.text = 'Фургон с ноутбуком уходит — протарань его!';
        if (escaped(m, v, dt, 12)) return 'fail:Фургон с ноутбуком ушёл. Дани в ярости.';
      },
    },
  ],
});

MISSIONS.push(INTERLUDE_1, C1_ZEMLYAK, C1_KRYSHA, C1_SHESHBESH, C1_DIAMONDS, C1_MAMA, C1_CARGO, C1_CAMPAIGN, C1_RECOUNT, C1_JUBILEE, C1_LASTRUN, INTERLUDE_2);
