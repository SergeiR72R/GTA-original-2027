// Сюжет первой части «Тель-Авив».
// Лёва Гольдман — новый репатриант из Питера. Берётся за любую работу.
// Все персонажи, организации и события вымышлены.
'use strict';

const HERO = 'Лёва';
const ITZIK = 'Ицик «Фалафель»';
const SEMA = 'Сёма Кац';
const ABU = 'Абу-Карим';
const ABEBA = 'Абеба';
const DANI = 'Дани (Шабак)';
const ALI = '«Али» (Телеграм)';

// Слово дня из ульпана — после каждой миссии
const WORDS = [
  ['סבבה', 'сабаба', 'отлично, всё супер'], ['יאללה', 'ялла', 'давай, погнали'], ['בלאגן', 'балаган', 'бардак (да, из русского!)'],
  ['תכלס', 'тахлес', 'по делу, короче'], ['אחי', 'ахи', 'братан'], ['בסדר', 'беседер', 'нормально, ок'],
  ['לאט לאט', 'лат-лат', 'потихоньку'], ['חבל על הזמן', 'хавáль аль а-зман', 'обалденно (досл. «жаль времени»)'],
  ['פראייר', 'фраер', 'лох — тот, кого обманули'], ['חוצפה', 'хуцпа', 'наглость'], ['תיק', 'тик', 'папка, досье'],
  ['ארנונה', 'арнона', 'муниципальный налог — бойся его'], ['מזל טוב', 'мазаль тов', 'поздравляю'],
  ['שקט', 'шекет', 'тишина!'], ['יהיה בסדר', 'йихье беседер', 'всё будет хорошо — национальный девиз'],
];

// ---------- помощники миссий ----------
function nearestCar(x, y, filter) {
  let best = null, bd = Infinity;
  for (const c of World.cars) {
    if (c.dead || c.police || (filter && !filter(c))) continue;
    const d = dist2(c.x, c.y, x, y);
    if (d < bd) { bd = d; best = c; }
  }
  return best;
}

function spawnGroup(faction, p, n, opts = {}) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU;
    const home = { x: p.x + Math.cos(a) * (opts.spread || 60), y: p.y + Math.sin(a) * (opts.spread || 60) };
    if (City.solidAt(home.x, home.y)) { home.x = p.x; home.y = p.y; }
    const g = new Ped(home.x, home.y, { faction, ai: 'gang', weapon: opts.weapon || (i % 3 === 0 ? 'uzi' : 'pistol'), hp: opts.hp || 70, home, boss: opts.boss && i === 0 });
    if (opts.boss && i === 0) { g.hp = opts.bossHp || 220; g.name = opts.bossName; }
    g.mission = 'target';
    World.peds.push(g);
    out.push(g);
  }
  return out;
}

function spawnAllies(n) {
  const pl = World.player;
  const out = [];
  for (let i = 0; i < n; i++) {
    const g = new Ped(pl.x + rand(-40, 40), pl.y + rand(-40, 40), { faction: 'lions', ai: 'follow', weapon: 'pistol', hp: 120 });
    if (City.solidAt(g.x, g.y)) { g.x = pl.x; g.y = pl.y; }
    g.mission = 'ally';
    World.peds.push(g);
    out.push(g);
  }
  return out;
}

function nearestAlive(list) {
  const pl = World.player;
  let best = null, bd = Infinity;
  for (const g of list) { if (g.dead) continue; const d = dist2(g.x, g.y, pl.x, pl.y); if (d < bd) { bd = d; best = g; } }
  return best;
}

// Пассажир: забрать (остановиться рядом) и довезти до точки
function passengerStep(m, ped, dest, dt, who) {
  const pl = World.player;
  if (ped.dead) return 'fail:' + who + ' погиб.';
  if (!m.pstage) m.pstage = 0;
  if (m.pstage === 0) {
    m.text = pl.car ? `Забери: ${who} (остановись рядом)` : `Найди машину и забери: ${who}`;
    m.target = ped;
    if (pl.car && !pl.car.moto && pl.car.speed < 40 && dist(pl.car.x, pl.car.y, ped.x, ped.y) < 160) { ped.ai = 'board'; m.pstage = 1; }
  } else if (m.pstage === 1) {
    m.text = `Подожди, пока ${who} сядет`;
    m.target = ped;
    if (!pl.car) { ped.ai = 'idle'; m.pstage = 0; }
    else if (ped.car) { m.pstage = 2; ped.mission = null; if (m.rideTime) m.timer = m.rideTime; return 'boarded'; }
  } else {
    if (m.timer !== null && m.timer !== undefined) { m.timer -= dt; if (m.timer <= 0) return 'fail:Опоздали.'; }
    m.target = dest;
    if (!ped.car || !pl.car || pl.car.passenger !== ped) return 'fail:Ты потерял пассажира!';
    if (pl.car.dead) return 'fail:Машина разбита.';
    if (dist(pl.x, pl.y, dest.x, dest.y) < 100 && pl.car.speed < 60) {
      const c = pl.car;
      c.passenger = null; ped.car = null;
      ped.x = c.x + 30; ped.y = c.y; ped.ai = 'idle'; ped.target = null;
      World.peds.push(ped);
      return 'arrived';
    }
  }
  return null;
}

// Машина NPC едет к точке по дорогам
function driveTo(c, gx, gy, dt, cruise) {
  c.pathT = (c.pathT || 0) - dt;
  if (!c.path || c.pathT <= 0) {
    c.pathT = 0.8;
    c.path = City.pathTo(Math.floor(c.x / TILE), Math.floor(c.y / TILE), Math.floor(gx / TILE), Math.floor(gy / TILE));
  }
  let tx = gx, ty = gy;
  if (c.path && c.path.length > 1) {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < Math.min(c.path.length, 12); i++) { const q = c.path[i]; const d = dist2(c.x, c.y, q.x * TILE + 32, q.y * TILE + 32); if (d < bd) { bd = d; bi = i; } }
    const q = c.path[Math.min(c.path.length - 1, bi + 2)];
    tx = q.x * TILE + 32; ty = q.y * TILE + 32;
  }
  const want = Math.atan2(tx - c.x, -(ty - c.y));
  const diff = wrapAngle(want - c.a);
  let thr = c.fspeed < cruise ? 0.8 : 0;
  if (Math.abs(diff) > 0.6 && c.speed > 90) thr = -0.3;
  // впереди помеха: ждём, потом сигналим и протискиваемся
  if (c.obstacleAhead()) {
    c.blockT = (c.blockT || 0) + dt;
    if (c.blockT < 1.5) thr = c.fspeed > 5 ? -1 : 0;
    else { c.honk(); thr = 0.6; }
  } else c.blockT = 0;
  c.drive(dt, thr, clamp(diff * 2.4, -1, 1), false);
  return dist(c.x, c.y, gx, gy);
}

const MISSIONS = [
  // ===================== Акт 1: Алия =====================
  {
    title: 'Алия',
    phone: null,
    intro: [
      ['', 'Тель-Авив, хамсин. Лёва Гольдман три дня назад прилетел из Петербурга. Съёмная «дира» во Флорентине, два соседа и вентилятор, который пугает больше, чем греет.'],
      ['Орталь (Мисрад а-Клита)', 'Алло, Лев Гольдман? Это Мисрад а-Клита. Ваш теудат-оле готов, но мы закрываемся через две минуты. Не успеете — приходите через месяц.'],
      [HERO, 'Две минуты?! Ладно... У подъезда стоит скутер соседа. Он же не будет против?'],
    ],
    reward: 1500,
    outro: 'Орталь: Вот ваш теудат-оле и первая часть «корзины абсорбции». Следующий!',
    start(m) { m.timer = 120; },
    update(m, dt) {
      m.timer -= dt;
      if (m.timer <= 0) return 'fail:Окошко закрылось. «Приходите завтра» — первое слово, которое учит каждый оле.';
      m.text = World.player.car ? 'Успей в Мисрад а-Клита до закрытия' : 'Садись на скутер у подъезда (F) и успей в Мисрад а-Клита';
      m.target = City.places.klita;
      if (dist(World.player.x, World.player.y, m.target.x, m.target.y) < 80) return 'ok';
    },
  },
  {
    title: 'Залог',
    phone: 'phoneFlat',
    giver: 'Шмулик, хозяин квартиры',
    intro: [
      ['Шмулик', 'Лёва, мотек! Договор — это хорошо, но мне нужен залог. И двенадцать чеков вперёд. И арнона на тебе, ты знал?'],
      [HERO, 'У меня пока только «корзина абсорбции»...'],
      ['Шмулик', 'Тогда работай! Мой племянник возит еду в «Шмоне-Бис». Бери скутер, нажимай J и доставь три заказа. Ялла!'],
    ],
    reward: -1200,
    outro: 'Шмулик: Беседер, залог принят. Чеки не забудь! И не кури на балконе.',
    start(m) { m.base = Jobs.deliveries; },
    update(m) {
      const done = Jobs.deliveries - m.base;
      const pl = World.player;
      if (Jobs.active === 'delivery') { m.text = `Доставки «Шмоне-Бис»: ${done} из 3`; m.target = Jobs.objective(); }
      else if (pl.car && pl.car.type === 'scooter') { m.text = 'Нажми J, чтобы начать смену «Шмоне-Бис»'; m.target = null; }
      else { m.text = 'Найди скутер «Шмоне-Бис» (оранжевый короб) — один у дома'; m.target = nearestCar(pl.x, pl.y, (c) => c.type === 'scooter'); }
      if (done >= 3) return 'ok';
    },
  },
  {
    title: 'Шалом, Ицик',
    phone: null,
    intro: [
      [ITZIK, 'Алло, это тот курьер, который привёз мне фалафель на Шук? Я Ицик. Ты доехал за семь минут — по Алленби в пятницу! Ты псих или гонщик?'],
      [HERO, 'Скорее гонщик. В Питере таксовал.'],
      [ITZIK, 'Мне нужен водитель, а не курьер на скутере. Найди нормальную машину — и ко мне на Шук а-Кармель. Ларёк с зелёным навесом.'],
    ],
    reward: 1000,
    outro: 'Ицик: Хорошо водишь. Для начала сойдёт.',
    start() {},
    update(m) {
      const pl = World.player;
      if (!pl.car || pl.car.moto) {
        m.text = 'Найди машину (подойди и нажми F)';
        m.target = nearestCar(pl.x, pl.y, (c) => !c.moto);
        return;
      }
      m.text = 'Приезжай на Шук а-Кармель';
      m.target = City.places.shuk;
      if (dist(pl.x, pl.y, m.target.x, m.target.y) < 80) return 'ok';
    },
  },
  {
    title: 'Горячая доставка',
    phone: 'phone1',
    giver: ITZIK,
    intro: [
      [ITZIK, 'Вот пакет. Что внутри — не твоё дело. Пахнет фалафелем — и хорошо.'],
      [ITZIK, 'Отвези к часовой башне в Яффо. У тебя 90 секунд, клиент не любит ждать.'],
    ],
    reward: 2500,
    outro: 'Ицик: Клиент доволен. Значит, и я доволен.',
    start(m) { m.timer = 90; },
    update(m, dt) {
      const pl = World.player;
      m.timer -= dt;
      if (m.timer <= 0) return 'fail:Опоздал. Клиент ушёл, а с ним и деньги.';
      m.text = pl.car ? 'Доставь пакет к часовой башне в Яффо' : 'Найди машину и вези пакет в Яффо';
      m.target = City.places.jaffaClock;
      if (dist(pl.x, pl.y, m.target.x, m.target.y) < 90) return 'ok';
    },
  },
  {
    title: 'Ульпан',
    phone: null,
    intro: [
      ['Двора (учительница)', 'Лев! Урок иврита через полторы минуты. Опоздавших я не пускаю, даже если они из Петербурга и очень вежливые.'],
    ],
    reward: 300,
    outro: 'Двора: Сегодня учим слово «савланут» — терпение. Оно вам понадобится.',
    after: [
      [ABEBA, 'Эй, ты тот парень, что гоняет на скутере как сумасшедший? Я Абеба. Мы с братом приехали из Гондэра, а теперь у нас мастерская и студия в южном Тель-Авиве.'],
      [ABEBA, 'Тут все новенькие, кто-то из Петербурга, кто-то из Аддис-Абебы. Если будут проблемы — заходи к нам. Мы своих не бросаем.'],
    ],
    start(m) { m.timer = 90; },
    update(m, dt) {
      m.timer -= dt;
      if (m.timer <= 0) return 'fail:Двора закрыла дверь перед твоим носом. «Савланут», Лев.';
      m.text = 'Успей в ульпан на урок иврита';
      m.target = City.places.ulpan;
      if (dist(World.player.x, World.player.y, m.target.x, m.target.y) < 80) return 'ok';
    },
  },
  {
    title: 'Должник из Флорентина',
    phone: 'phone2',
    giver: ITZIK,
    intro: [
      [ITZIK, 'Во Флорентине есть художник — Гади. Граффити рисует, а долги не отдаёт.'],
      [ITZIK, 'Его красный джип стоит у баров. Сделай так, чтобы машины у него больше не было. Пистолет — за углом от телефона.'],
    ],
    reward: 3000,
    outro: 'Ицик: Гади всё понял и уже несёт деньги. Хорошая работа.',
    start(m) {
      const p = City.places.florentinCar;
      const c = new Car(p.x, p.y, 0, { type: 'suv', color: '#b3262d' });
      c.mission = 'target';
      c.hp = c.maxHp = 160;
      World.cars.push(c);
      m.car = c;
      World.pickups.push(new Pickup(City.places.pistol.x, City.places.pistol.y, 'pistol', { ammo: 36, once: true }));
    },
    update(m) {
      m.text = 'Уничтожь красный джип Гади во Флорентине';
      m.target = m.car;
      if (m.car.dead) { Wanted.set(Math.max(Wanted.level, 1)); return 'ok'; }
    },
    cleanup(m) { if (m.car) m.car.mission = null; },
  },
  // ===================== Акт 2: Фракции =====================
  {
    title: 'Земляк',
    phone: 'phoneRu',
    giver: SEMA,
    intro: [
      [SEMA, 'Слышь, земляк, ты ж питерский? Я Сёма, бригада «Одесса». Наши ребята рассказали, как ты по Алленби гоняешь.'],
      [SEMA, 'В Яффо, у людей Абу-Карима, стоит чёрный лимузин. Раньше был мой — проиграл в нарды, но нечестно. Пригони его к ресторану «Одесса» в Рамат-Гане.'],
      [HERO, 'А люди Абу-Карима не будут против?'],
      [SEMA, 'Будут. Поэтому я и плачу четыре тысячи.'],
    ],
    reward: 4000,
    outro: 'Сёма: Вот это я понимаю — земляк! Заходи, у нас пельмени лучше, чем в Питере.',
    start(m) {
      const p = City.places.luxCar;
      const c = new Car(p.x, p.y, Math.PI / 2, { type: 'lux', faction: 'russian' });
      c.mission = 'target';
      World.cars.push(c);
      m.car = c;
      m.guards = spawnGroup('arab', { x: p.x, y: p.y + 70 }, 3, { spread: 50 });
      for (const g of m.guards) g.mission = null;
    },
    update(m) {
      const pl = World.player;
      if (m.car.dead) return 'fail:Лимузин уничтожен. Сёма этого не простит.';
      if (pl.car !== m.car) {
        m.text = 'Угони чёрный лимузин в Яффо';
        m.target = m.car;
        return;
      }
      if (!m.angry) { m.angry = true; for (const g of m.guards) { g.mission = 'target'; g.alert = 8; } Factions.change('arab', -30); }
      m.text = 'Гони лимузин к ресторану «Одесса» в Рамат-Гане';
      m.target = City.places.ruHQ;
      if (dist(pl.x, pl.y, m.target.x, m.target.y) < 110) { Factions.change('russian', 25); return 'ok'; }
    },
    cleanup(m) { if (m.car) m.car.mission = null; for (const g of m.guards || []) g.mission = null; },
  },
  {
    title: 'Бухгалтер',
    phone: 'phone1',
    giver: ITZIK,
    intro: [
      [ITZIK, 'Мой бухгалтер, Моше, ждёт в Неве-Цедеке. Его нужно срочно отвезти в Азриэли.'],
      [ITZIK, 'У него встреча с налоговой. Не опоздай и не разбей машину — у Моше слабое сердце.'],
    ],
    reward: 3500,
    outro: 'Ицик: Моше доехал живым и даже не поседел. Ну, почти.',
    start(m) {
      const p = City.places.nevetzedek;
      m.moshe = new Ped(p.x, p.y, { look: Looks.named('moshe', Object.assign(Looks.civilian(), { style: 'kippah', kippah: '#212121', shirt: '#f5f5f5' })), ai: 'idle', hp: 60 });
      m.moshe.mission = 'target';
      World.peds.push(m.moshe);
      m.rideTime = 100;
    },
    update(m, dt) {
      const r = passengerStep(m, m.moshe, City.places.azrieli, dt, 'Моше');
      if (r === 'boarded') Game.message('Моше: «Только не гони! Ой-вей...»');
      if (m.pstage === 2) m.text = 'Отвези Моше в Азриэли';
      if (r === 'arrived') { m.moshe.ai = 'walk'; return 'ok'; }
      if (r && r.startsWith('fail')) return r;
    },
    cleanup(m) { if (m.moshe) m.moshe.mission = null; },
  },
  {
    title: 'Крыша',
    phone: 'phoneLions',
    giver: ABEBA,
    intro: [
      [ABEBA, 'Лёва, беда. Люди Сёмы из «Одессы» пришли к нам в гараж. Говорят, теперь мы платим им «за защиту».'],
      [ABEBA, 'Мы двадцать лет строили эту мастерскую с отцом. Платить бандитам не будем. Поможешь? Нас трое, с тобой — четверо.'],
      [HERO, 'Сёма называл меня земляком... Но земляки так не поступают. Еду.'],
    ],
    reward: 3000,
    outro: 'Абеба: Ты свой, Лёва. Теперь у тебя в южном Тель-Авиве есть братья.',
    after: [[SEMA, 'Ты кому помогаешь, земляк?! Ты пожалеешь. В «Одессе» тебя больше не ждут.']],
    start(m) {
      const p = City.places.lionsHQ;
      m.foes = spawnGroup('russian', { x: p.x, y: p.y - 10 }, 4, { spread: 70 });
      m.allies = null;
    },
    update(m) {
      const pl = World.player;
      const left = m.foes.filter((g) => !g.dead);
      if (!m.allies && dist(pl.x, pl.y, City.places.lionsHQ.x, City.places.lionsHQ.y) < 500) { m.allies = spawnAllies(2); Game.message('Абеба: Мы с тобой!'); }
      m.text = `Выгони сборщиков «Одессы» из гаража «Львов» (осталось: ${left.length})`;
      m.target = nearestAlive(m.foes) || City.places.lionsHQ;
      if (!left.length) { Factions.change('lions', 35); Factions.change('russian', -45); return 'ok'; }
    },
    cleanup(m) { for (const a of m.allies || []) { a.mission = null; a.ai = 'gang'; a.home = { x: a.x, y: a.y }; } },
  },
  {
    title: 'Налёт на Шук',
    phone: 'phone1',
    giver: ITZIK,
    intro: [
      [ITZIK, 'Лёва! Люди Абу-Карима узнали, кто увёл их лимузин. Думают, это я тебя послал. Они едут на Шук!'],
      [ITZIK, 'Защити ларёк. И меня, если не трудно. Я слишком красивый, чтобы умирать в пятницу перед шаббатом.'],
    ],
    reward: 5000,
    outro: 'Ицик: Фух. Шук будет говорить об этом неделю. Держи, заслужил.',
    start(m) {
      const p = City.places.shuk;
      m.itzik = new Ped(p.x + 40, p.y + 30, { look: Looks.named('itzik', Object.assign(Looks.civilian(), { style: 'bald', shirt: '#2e7d32', bag: null })), ai: 'idle', hp: 160 });
      m.itzik.mission = 'ally';
      World.peds.push(m.itzik);
      m.foes = spawnGroup('arab', { x: p.x, y: p.y - 160 }, 5, { spread: 90 });
    },
    update(m) {
      if (m.itzik.dead) return 'fail:Ицик погиб. Шук осиротел.';
      const left = m.foes.filter((g) => !g.dead);
      m.text = `Защити Ицика и Шук (нападающих: ${left.length})`;
      m.target = nearestAlive(m.foes);
      if (!left.length) { Factions.change('arab', -20); return 'ok'; }
    },
    cleanup(m) { if (m.itzik) { m.itzik.mission = null; m.itzik.ai = 'walk'; } },
  },
  // ===================== Акт 3: Иранская сеть =====================
  {
    title: 'Сообщение в Телеграме',
    phone: null,
    intro: [
      [ALI, 'Привет, брат. Видел твой пост «ищу любую работу». Есть простая: сфотографировать пару зданий в Кирье. ₪5000 в крипте. Никаких вопросов.'],
      [HERO, '...Сфотографировать военную базу за деньги от незнакомца в Телеграме. Даже в Питере такие «вакансии» пахнут плохо.'],
      ['', 'Лёва звонит на горячую линию Шабака.'],
      [DANI, 'Правильно сделал. Таких, как ты, вербуют каждую неделю: новенький, денег нет, иврита мало. Подыграй им.'],
      [DANI, 'Возьми у них «аванс» в Сароне, потом проследи за серым фургоном. Не подъезжай близко — их водитель параноик.'],
    ],
    reward: 2000,
    outro: 'Дани: Отличная работа. Мы знаем, где их квартира. Жди звонка.',
    start(m) { m.step = 0; },
    update(m, dt) {
      const pl = World.player;
      if (m.step === 0) {
        m.text = 'Забери «аванс» у связного в Сароне';
        m.target = City.places.iranMeet;
        if (dist(pl.x, pl.y, m.target.x, m.target.y) < 70) {
          m.step = 1;
          const p = Game.findRoadSpawn(m.target.x, m.target.y, 150, 400, true) || { x: m.target.x + 100, y: m.target.y, dir: 0 };
          m.van = new Car(p.x, p.y, DIR_ANGLE[p.dir], { type: 'van', faction: 'iran' });
          m.van.driver = new Ped(p.x, p.y, { faction: 'iran', ai: 'gang', weapon: 'pistol' });
          m.van.driver.car = m.van;
          m.van.mission = 'target';
          m.van.ai = 'scripted';
          World.cars.push(m.van);
          m.close = 0;
          Game.message('Конверт с «авансом» у тебя. Серый фургон трогается!', 4);
        }
        return;
      }
      const v = m.van;
      if (v.dead) return 'fail:Фургон уничтожен — след потерян. Дани недоволен.';
      const sp = City.places.iranSafe;
      const left = driveTo(v, sp.x, sp.y, dt, 170);
      const d = dist(pl.x, pl.y, v.x, v.y);
      m.text = d < 150 ? 'Слишком близко! Отстань от фургона' : 'Следуй за серым фургоном, держи дистанцию';
      m.target = v;
      if (d < 150) { m.close += dt; if (m.close > 3) return 'fail:Водитель тебя заметил. Операция сорвана.'; }
      else m.close = Math.max(0, m.close - dt);
      if (d > 1100) return 'fail:Ты потерял фургон из виду.';
      if (left < 120) { v.ai = null; v.mission = null; return 'ok'; }
    },
    cleanup(m) { if (m.van) { m.van.mission = null; m.van.ai = 'traffic'; } },
  },
  {
    title: 'Конспиративная квартира',
    phone: null,
    intro: [
      [DANI, 'Это они. Иранская сеть: вербуют новых репатриантов, платят за поджоги и фотографии, готовят что-то серьёзное в порту.'],
      [DANI, 'Наш спецназ будет через двадцать минут. А у них — грузовик с оборудованием и пять агентов, которые уже сматываются.'],
      [DANI, 'Задержи их. Узи и бронежилет — у вышки спасателей на пляже, рядом с портом. Официально нас там не было.'],
    ],
    reward: 15000,
    outro: 'Дани: Сеть накрыта. Страна тебе благодарна — неофициально, конечно. Розыск снят.',
    start(m) {
      const p = City.places.iranSafe;
      m.foes = spawnGroup('iran', { x: p.x, y: p.y + 10 }, 5, { spread: 80, weapon: 'uzi', hp: 80 });
      const c = new Car(p.x + 60, p.y - 70, 0, { type: 'van', faction: 'iran' });
      c.mission = 'target'; c.hp = c.maxHp = 200;
      World.cars.push(c);
      m.van = c;
      World.pickups.push(new Pickup(6.5 * TILE, 12 * TILE, 'uzi', { ammo: 150, once: true }));
      World.pickups.push(new Pickup(6.5 * TILE, 13 * TILE, 'armor', { once: true }));
    },
    update(m) {
      const left = m.foes.filter((g) => !g.dead);
      m.text = `Останови иранских агентов (${left.length}) и уничтожь их фургон${m.van.dead ? ' ✔' : ''}`;
      m.target = nearestAlive(m.foes) || (m.van.dead ? null : m.van);
      if (!left.length && m.van.dead) { Wanted.reset(); Factions.change('arab', 15); return 'ok'; }
    },
    cleanup(m) { if (m.van) m.van.mission = null; },
  },
  {
    title: 'Перемирие',
    phone: 'phoneAr',
    giver: ABU,
    intro: [
      [ABU, 'Ты Лёва? Я Абу-Карим. Мой племянник Карим чуть не взял деньги у тех людей из Телеграма. Ты их остановил. Я это помню.'],
      [ABU, 'Война с Ицеком — глупость. Шук кормит и евреев, и арабов. Привези Ицика ко мне в Яффо, мы поговорим как мужчины. За кофе.'],
    ],
    reward: 6000,
    outro: 'Абу-Карим: Кофе с кардамоном — и мир. Ты хороший человек, Лёва. Для фраера.',
    after: [[ITZIK, 'Мир с Абу-Каримом... Кто бы мог подумать. Но Сёма этого так не оставит, Лёва. Будь осторожен.']],
    start(m) {
      const p = City.places.shuk;
      m.itzik = new Ped(p.x, p.y + 20, { look: Looks.named('itzik', Object.assign(Looks.civilian(), { style: 'bald', shirt: '#2e7d32', bag: null })), ai: 'idle', hp: 160 });
      m.itzik.mission = 'target';
      World.peds.push(m.itzik);
      m.step = 0;
    },
    update(m, dt) {
      if (m.step === 0) {
        const r = passengerStep(m, m.itzik, City.places.arHQ, dt, 'Ицик');
        if (m.pstage === 2) m.text = 'Отвези Ицика на встречу с Абу-Каримом в Яффо';
        if (r && r.startsWith('fail')) return r;
        if (r === 'arrived') {
          m.step = 1;
          m.itzik.mission = 'ally';
          const p = City.places.arHQ;
          m.foes = spawnGroup('russian', { x: p.x + 40, y: p.y - 220 }, 5, { spread: 90 });
          Game.bigText('ЗАСАДА!', 'Бригада «Одесса» сорвала переговоры', '#ff5252');
        }
        return;
      }
      if (m.itzik.dead) return 'fail:Ицик погиб. Перемирие сорвано.';
      const left = m.foes.filter((g) => !g.dead);
      m.text = `Отбейся от бригады «Одесса» (осталось: ${left.length})`;
      m.target = nearestAlive(m.foes);
      if (!left.length) { Factions.change('arab', Math.max(45, 30 - Factions.rep.arab)); Factions.change('russian', -20); return 'ok'; }
    },
    cleanup(m) { if (m.itzik) { m.itzik.mission = null; m.itzik.ai = 'walk'; } },
  },
  {
    title: 'Последний тост',
    phone: 'phoneLions',
    giver: ABEBA,
    intro: [
      [ABEBA, 'Сёма сжёг наш гараж. Никто не пострадал, но студия... Там были записи моего отца.'],
      [ABEBA, 'Сегодня он празднует в «Одессе» в Рамат-Гане. Мы идём туда. Ты с нами, брат?'],
      [HERO, 'Он называл меня земляком. Пора сказать ему последний тост.'],
    ],
    reward: 15000,
    outro: 'Абеба: Всё. «Одессы» больше нет. Отец бы гордился нами.',
    start(m) {
      const p = City.places.ruHQ;
      m.foes = spawnGroup('russian', { x: p.x + 20, y: p.y }, 6, { spread: 110, boss: true, bossHp: 260, bossName: SEMA });
      m.boss = m.foes[0];
      m.boss.weapon = 'uzi';
      m.allies = null;
      for (let i = 0; i < 2; i++) { const c = new Car(p.x + 80 + i * 60, p.y + 120, 0, { type: 'lux', faction: 'russian' }); World.cars.push(c); }
    },
    update(m) {
      const pl = World.player;
      if (!m.allies && dist(pl.x, pl.y, City.places.ruHQ.x, City.places.ruHQ.y) < 700) { m.allies = spawnAllies(3); Game.message('Абеба: «Львы», вперёд!'); }
      const left = m.foes.filter((g) => !g.dead);
      m.text = m.boss.dead ? `Добей охрану «Одессы» (осталось: ${left.length})` : `Ресторан «Одесса»: найди Сёму Каца (охраны: ${left.length - 1})`;
      m.target = m.boss.dead ? nearestAlive(m.foes) : m.boss;
      if (!left.length) { Factions.change('lions', 25); Factions.change('russian', -100, true); return 'ok'; }
    },
    cleanup(m) { for (const a of m.allies || []) { a.mission = null; a.ai = 'gang'; a.home = { x: a.x, y: a.y }; } },
  },
  {
    title: 'Горячий ветер',
    phone: null,
    intro: [
      [ITZIK, 'Ты что устроил в Рамат-Гане?! Вся полиция Гуш-Дана на ушах!'],
      [ITZIK, 'Сбрось хвост. Если надо — перекрась тачку во Флорентине. Потом гони в мой гараж в порту. Там тебя никто не найдёт.'],
    ],
    reward: 20000,
    outro: 'Ицик: Добро пожаловать в семью, хабиби. Это только начало.',
    start() { Wanted.set(Math.max(Wanted.level, 4)); },
    update(m) {
      const pl = World.player;
      if (Wanted.level > 0) {
        m.text = 'Уйди от полиции (или перекрась машину во Флорентине)';
        m.target = pl.car ? City.places.paint : null;
        return;
      }
      m.text = pl.car ? 'Приезжай в гараж в порту' : 'Найди машину и приезжай в гараж в порту';
      m.target = City.places.portGarage;
      if (pl.car && dist(pl.x, pl.y, m.target.x, m.target.y) < 90) return 'ok';
    },
  },
];

const Missions = {
  index: 0,      // следующая миссия
  active: null,  // текущая
  done: false,
  dialog: null,
  retry: 0,
  word: 0,

  reset(index) {
    this.index = index || 0;
    this.active = null;
    this.done = this.index >= MISSIONS.length;
    this.dialog = null;
    this.retry = 1.5;
  },

  blocking() { return !!this.active; },

  // Активный телефон (звонит) — точка из City.places
  phonePlace() {
    if (this.active || this.done || this.dialog) return null;
    const m = MISSIONS[this.index];
    return m && m.phone ? City.places[m.phone] : null;
  },

  call() {
    const def = MISSIONS[this.index];
    Sound.play('phone', 0.8);
    this.dialog = { lines: def.intro, i: 0, done: () => this.begin(), title: def.title };
  },

  begin() {
    const def = MISSIONS[this.index];
    const m = { def, text: '', target: null, timer: null };
    def.start(m);
    this.active = m;
    Game.bigText(def.title, 'Миссия ' + (this.index + 1) + ' из ' + MISSIONS.length);
  },

  fail(reason) {
    const m = this.active;
    if (!m) return;
    if (m.def.cleanup) m.def.cleanup(m);
    this.active = null;
    this.retry = 6;
    Sound.play('fail', 0.8);
    Game.bigText('ПРОВАЛ', reason || 'Миссия провалена', '#ff5252');
    if (m.def.phone) setTimeout(() => Game.message('Телефон снова звонит — попробуй ещё раз'), 4000);
  },

  update(dt) {
    const pl = World.player;
    // миссии без телефона приходят звонком на мобильный
    if (!this.active && !this.dialog && !this.done && MISSIONS[this.index].phone === null && !pl.dead) {
      this.retry -= dt;
      if (this.retry <= 0) this.call();
    }
    const ph = this.phonePlace();
    if (ph && !pl.car && !pl.dead && dist(pl.x, pl.y, ph.x, ph.y) < 34) this.call();
    const m = this.active;
    if (!m) return;
    const r = m.def.update(m, dt);
    if (r === 'ok') this.complete();
    else if (typeof r === 'string' && r.startsWith('fail')) this.fail(r.slice(5));
  },

  complete() {
    const m = this.active;
    if (m.def.cleanup) m.def.cleanup(m);
    this.active = null;
    Game.addMoney(m.def.reward);
    Sound.play('mission', 1);
    const sign = m.def.reward < 0 ? '−' : '+';
    Game.bigText('МИССИЯ ВЫПОЛНЕНА', sign + formatMoney(Math.abs(m.def.reward)), '#7CFC9A');
    if (m.def.outro) Game.message(m.def.outro, 6);
    // слово дня из ульпана
    const w = WORDS[this.word % WORDS.length];
    this.word++;
    HUD.wordOfDay(w);
    this.index++;
    Game.save();
    if (m.def.after) {
      setTimeout(() => { this.dialog = { lines: m.def.after, i: 0, done: () => this.afterNext(), title: '' }; Sound.play('phone', 0.6); }, 2500);
      return;
    }
    this.afterNext();
  },

  afterNext() {
    if (this.index >= MISSIONS.length) {
      this.done = true;
      setTimeout(() => Game.partComplete(), 2500);
    } else if (MISSIONS[this.index].phone === null) {
      this.retry = 4;
    } else {
      const def = MISSIONS[this.index];
      setTimeout(() => Game.message(`☎ Звонит телефон-автомат${def.giver ? ' — ' + def.giver : ''}. Ищи жёлтую стрелку`), 3500);
    }
  },

  // Игрок погиб/арестован — миссия сорвана
  onPlayerDown() {
    if (this.active) this.fail('Миссия сорвана');
  },

  advanceDialog() {
    const d = this.dialog;
    if (!d) return;
    d.i++;
    if (d.i >= d.lines.length) { this.dialog = null; d.done(); }
  },

  // точка, на которую указывает стрелка
  objective() {
    if (this.active && this.active.target) return this.active.target;
    return this.phonePlace() || Jobs.objective();
  },
};
