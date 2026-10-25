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
const ORTAL = 'Орталь (Мисрад а-Клита)';
const SHMULIK = 'Шмулик';
const DVORA = 'Двора (учительница)';

// Портрет в окне звонка: кто говорит → portrait_<ключ> (js/portraits.js)
const PORTRAIT_OF = {
  [HERO]: 'leva', [ITZIK]: 'itzik', [SEMA]: 'sema', [ABU]: 'abu', [ABEBA]: 'abeba',
  [DANI]: 'dani', [ALI]: 'ali', [ORTAL]: 'ortal', [SHMULIK]: 'shmulik', [DVORA]: 'dvora',
};

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
    const g = new Ped(home.x, home.y, { faction, ai: 'gang', weapon: opts.weapon || factionWeapon(faction), hp: opts.hp || 70, home, boss: opts.boss && i === 0 });
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
// who — имя («Моше») или { acc: 'Розу Львовну', nom: 'Роза Львовна', dead: 'Роза Львовна пострадала' }
function passengerStep(m, ped, dest, dt, who) {
  const pl = World.player;
  const W = typeof who === 'string' ? { acc: who, nom: who, dead: who + ' погиб.' } : who;
  if (ped.dead) return 'fail:' + W.dead;
  if (!m.pstage) m.pstage = 0;
  if (m.pstage === 0) {
    m.text = pl.car ? `Забери: ${W.acc} (остановись рядом)` : `Найди машину и забери: ${W.acc}`;
    m.target = ped;
    if (pl.car && !pl.car.moto && pl.car.speed < 40 && dist(pl.car.x, pl.car.y, ped.x, ped.y) < 160) { ped.ai = 'board'; m.pstage = 1; }
  } else if (m.pstage === 1) {
    m.text = `Подожди, пока ${W.nom} сядет`;
    m.target = ped;
    if (!pl.car) { ped.ai = 'idle'; m.pstage = 0; }
    else if (ped.car) { m.pstage = 2; ped.mission = null; ped.seat = true; if (m.rideTime) m.timer = m.rideTime; return 'boarded'; }
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
  // упёрлись — сдаём назад с вывернутым рулём
  if (c.recover > 0) { c.recover -= dt; c.drive(dt, -1, c.recoverSteer, false); return dist(c.x, c.y, gx, gy); }
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
  if (thr > 0 && c.speed < 20) c.stuck += dt; else c.stuck = Math.max(0, c.stuck - dt * 2);
  if (c.stuck > 1.2) { c.stuck = 0; c.recover = 0.8; c.recoverSteer = -Math.sign(diff || 1); }
  return dist(c.x, c.y, gx, gy);
}

// Беглец на машине: катается между дальними точками города, подальше от игрока
const FLEE_SPOTS = ['beach', 'port', 'azrieli', 'hospital', 'bank', 'jaffaClock', 'nevetzedek', 'shuk', 'florentin', 'flat'];
function fleeDrive(c, dt, cruise) {
  const pl = World.player;
  if (!c.fleeTo || dist(c.x, c.y, c.fleeTo.x, c.fleeTo.y) < 150) {
    const opts = FLEE_SPOTS.map((k) => City.places[k]).filter((p) => p && p !== c.fleeTo && dist(p.x, p.y, c.x, c.y) > 500);
    opts.sort((a, b) => dist2(b.x, b.y, pl.x, pl.y) - dist2(a.x, a.y, pl.x, pl.y));
    c.fleeTo = opts[randi(0, Math.min(2, opts.length - 1))];
  }
  driveTo(c, c.fleeTo.x, c.fleeTo.y, dt, cruise);
}

// Цель далеко дольше limit секунд — ушла
function escaped(m, o, dt, limit = 8) {
  const pl = World.player;
  if (dist(pl.x, pl.y, o.x, o.y) > 1300) m.away = (m.away || 0) + dt;
  else m.away = 0;
  return m.away > limit;
}

// Враги миссии вместе с бандитами из машин погони (машину — пока они в ней)
function foesWithChasers(foes, cars) {
  const out = foes ? foes.filter((g) => !g.dead) : [];
  for (const c of cars || []) {
    if (c.ai === 'gang' && !c.dead) { out.push(c); continue; }
    for (const g of c.gang || []) if (!g.dead && g.mission && !g.car) out.push(g);
  }
  return out;
}

// Ракетный обстрел: метки на земле, через пару секунд — удар.
// «Железный купол» сбивает часть ракет ещё в воздухе.
const Strikes = {
  list: [],
  on: false,
  start() { this.list.length = 0; this.on = true; Sound.setAlarm(true); },
  clear() { this.list.length = 0; this.on = false; Sound.setAlarm(false); },
  add(x, y, fuse) {
    // летят с востока (со стороны Ирана) и чуть с юга — так их видно с наклонной камеры
    this.list.push({ x, y, t: 0, fuse, from: rand(-0.1, 0.45) * Math.PI, icpt: chance(0.25) ? fuse - rand(0.45, 0.7) : 0, hit: null, end: 0 });
  },
  update(dt) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const s = this.list[i];
      s.t += dt;
      if (!s.hit && s.icpt && s.t >= s.icpt) { s.hit = 'icpt'; s.end = s.t + 0.8; Sound.noiseBurst(0.9, 500, 0.3); }
      if (!s.hit && s.t >= s.fuse) { s.hit = 'boom'; s.end = s.t; blast(s.x, s.y, { r: 120, plDmg: 55, carDmg: 50, shake: 16 }); }
      if (s.hit && s.t >= s.end) this.list.splice(i, 1);
    }
  },
};

// длина пролога: после него начинаются главы (js/chapter1.js)
const PROLOGUE_LEN = 9; // с миссиями друзей (js/prologue.js)
const MISSIONS = [
  // ===================== Акт 1: Алия =====================
  {
    title: 'Алия',
    phone: null,
    intro: [
      ['', 'Тель-Авив, хамсин. Лёва Гольдман три дня назад прилетел из Петербурга. Съёмная «дира» во Флорентине, два соседа и вентилятор, который пугает больше, чем греет.'],
      [ORTAL, 'Алло, Лев Гольдман? Это Мисрад а-Клита. Ваш теудат-оле готов, но мы закрываемся через две минуты. Не успеете — приходите через месяц.'],
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
      [SHMULIK, 'Лёва, мотек! Договор — это хорошо, но мне нужен залог. И двенадцать чеков вперёд. И арнона на тебе, ты знал?'],
      [HERO, 'У меня пока только «корзина абсорбции»...'],
      [SHMULIK, 'Тогда работай! Мой племянник возит еду в «Шмоне-Бис». Бери скутер, нажимай J и доставь три заказа. Ялла!'],
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
      // на полпути гонщика замечает патруль
      if (!m.cops && m.timer < 65 && pl.car && pl.car.speed > 200) {
        m.cops = true;
        Wanted.set(Math.max(Wanted.level, 1));
        Game.message('Патруль засёк, как ты пролетел на красный! Пакет лучше не показывать полиции.', 4);
      }
      m.text = pl.car ? 'Доставь пакет к часовой башне в Яффо' : 'Найди машину и вези пакет в Яффо';
      m.target = City.places.jaffaClock;
      if (dist(pl.x, pl.y, m.target.x, m.target.y) < 90) return 'ok';
    },
  },
  {
    title: 'Ульпан',
    phone: null,
    intro: [
      [DVORA, 'Лев! Урок иврита через полторы минуты. Опоздавших я не пускаю, даже если они из Петербурга и очень вежливые.'],
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
      m.gadi = new Ped(p.x + 44, p.y + 10, { look: Looks.named('gadi', Object.assign(Looks.civilian(), { shirt: '#6a1b9a' })), ai: 'idle', hp: 60 });
      World.peds.push(m.gadi);
      World.pickups.push(new Pickup(City.places.pistol.x, City.places.pistol.y, 'pistol', { ammo: 36, once: true }));
    },
    update(m, dt) {
      const pl = World.player, c = m.car;
      if (c.dead) {
        if (c.driver && c.driver !== 'player') bailOut(c);
        Wanted.set(Math.max(Wanted.level, 1));
        return 'ok';
      }
      // Гади замечает Лёву (или выстрелы по джипу) и удирает
      if (!m.fled && !m.gadi.dead && (dist(pl.x, pl.y, c.x, c.y) < 260 || c.hp < c.maxHp)) {
        m.fled = true;
        World.peds.splice(World.peds.indexOf(m.gadi), 1);
        c.driver = m.gadi; m.gadi.car = c; c.ai = 'scripted';
        Game.message('Гади: «Я всё отдам в пятницу!» — и даёт по газам', 3);
      }
      m.target = c;
      if (!m.fled || c.driver !== m.gadi) { m.text = 'Уничтожь красный джип Гади во Флорентине'; return; }
      fleeDrive(c, dt, 230);
      m.text = 'Гади удирает! Догони и уничтожь красный джип';
      if (escaped(m, c, dt)) return 'fail:Гади скрылся. Долг так и висит.';
    },
    cleanup(m) {
      if (m.car) { m.car.mission = null; if (m.car.ai === 'scripted') m.car.ai = null; }
      if (m.gadi && !m.gadi.car) m.gadi.ai = 'walk';
    },
  },
];

// Старые миссии второй половины: их сюжет переезжает в главы 2–3 и финал
// (docs/PLAN_STORY_CH1.md). Пока не в игре — код пригодится при переработке.
const RESERVE_MISSIONS = [
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
      c.hp = c.maxHp = Math.round(c.maxHp * 1.6); // бронированный — переживёт погоню
      World.cars.push(c);
      m.car = c;
      m.guards = spawnGroup('arab', { x: p.x, y: p.y + 70 }, 4, { spread: 60 });
      for (const g of m.guards) g.mission = null;
      m.chasers = [];
      m.chaseT = 0;
    },
    update(m, dt) {
      const pl = World.player;
      if (m.car.dead) return 'fail:Лимузин уничтожен. Сёма этого не простит.';
      // охрана замечает, если подойти к лимузину или затеять стрельбу
      if (!m.alarm && (dist(pl.x, pl.y, m.car.x, m.car.y) < 230 || pl.car === m.car || m.guards.some((g) => g.dead || g.alert > 0))) {
        m.alarm = true;
        for (const g of m.guards) { g.mission = 'target'; g.alert = 8; }
        Game.message('Охрана: «Эй! Это машина Абу-Карима!»', 3);
      }
      if (pl.car !== m.car) {
        m.text = m.alarm ? 'Охрана подняла тревогу — прыгай в лимузин!' : 'Угони чёрный лимузин в Яффо';
        m.target = m.car;
        return;
      }
      if (!m.angry) {
        m.angry = true;
        Factions.change('arab', -30);
        for (let i = 0; i < 2; i++) { const c = GangCars.spawn('arab', pl.x, pl.y, { min: 450, max: 800 }); if (c) m.chasers.push(c); }
        Game.message('Клан Аль-Бахар погнался за лимузином!', 3);
      }
      // через полминуты подтягивается ещё одна машина
      m.chaseT += dt;
      if (m.chaseT > 30 && !m.extra) { m.extra = true; const c = GangCars.spawn('arab', pl.x, pl.y, { min: 600, max: 900 }); if (c) m.chasers.push(c); }
      const tail = m.chasers.some((c) => c.ai === 'gang' && !c.dead);
      m.text = tail ? 'Гони лимузин в Рамат-Ган — за тобой погоня!' : 'Гони лимузин к ресторану «Одесса» в Рамат-Гане';
      m.target = City.places.ruHQ;
      if (dist(pl.x, pl.y, m.target.x, m.target.y) < 110) {
        // лимузин остаётся у ресторана — теперь он снова Сёмин, Лёва выходит
        const c = m.car;
        c.vx = c.vy = 0;
        Game.exitCar();
        c.locked = true; c.keep = true;
        Factions.change('russian', 25);
        return 'ok';
      }
    },
    cleanup(m) { if (m.car) m.car.mission = null; for (const g of m.guards || []) g.mission = null; GangCars.release(m.chasers); },
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
      const c = World.player.car;
      if (r === 'boarded') { Game.message('Моше: «Только не гони! Ой-вей...»'); m.hp0 = c.hp; m.oy = 0; }
      if (m.pstage === 2 && c && m.hp0 !== undefined) {
        // каждый удар — по нервам Моше; разбитая машина — сердечный приступ
        const lost = (m.hp0 - c.hp) / c.maxHp;
        if (lost > m.oy + 0.08) { m.oy = lost; Game.message(pick(['Моше: «Ой-вей! Моё сердце!»', 'Моше: «Осторожнее, я ещё не подписал завещание!»', 'Моше: «Это была машина или стена?!»']), 2.5); }
        if (lost > 0.35) return 'fail:У Моше прихватило сердце. Налоговая подождёт, Ицик — нет.';
        m.text = `Отвези Моше в Азриэли (нервы Моше: ${Math.round(100 - lost / 0.35 * 100)}%)`;
      }
      if (r === 'arrived') { m.moshe.ai = 'walk'; return 'ok'; }
      if (r && r.startsWith('fail')) return r;
    },
    cleanup(m) { if (m.moshe) m.moshe.mission = null; },
  },
  {
    title: 'Крыша',
    phone: null,
    intro: [
      [ABEBA, 'Лёва, привет! Это Абеба, из ульпана. Помнишь, я говорил про нашу мастерскую? Есть работа: перегнать пару машин, подкрасить, кое-что починить.'],
      [ABEBA, 'Платим честно, без «конвертов». Мастерская «Gondar Garage» на юге, у автовокзала.'],
      [HERO, 'Честная работа? В этом городе? Уже еду.'],
    ],
    reward: 3000,
    outro: 'Абеба: Ты не обязан был за нас вступаться, Лёва. Но ты свой. Теперь у тебя на юге есть братья.',
    after: [
      [SEMA, 'Ты положил моих пацанов, земляк. Мне без разницы, кто начал. В «Одессе» тебя больше не ждут.'],
      [HERO, 'Они стреляли первыми, Сёма. Выбора не было.'],
      [SEMA, 'Выбор есть всегда. Ты его сделал.'],
    ],
    start(m) {
      m.foes = [];
      m.allies = null;
      m.chasers = [];
    },
    update(m) {
      const pl = World.player, P = City.places.lionsHQ;
      // Лёва едет на работу — и попадает на «сбор дани»
      if (!m.raid) {
        m.text = pl.car ? 'Приезжай в мастерскую «Львов Гондэра» у автовокзала' : 'Найди машину и приезжай в мастерскую «Львов Гондэра»';
        m.target = P;
        if (dist(pl.x, pl.y, P.x, P.y) > 230) return;
        m.raid = true;
        m.allies = spawnAllies(2);
        m.foes = spawnGroup('russian', { x: P.x, y: P.y - 10 }, 4, { spread: 80 });
        const c = GangCars.spawn('russian', P.x, P.y, { min: 260, max: 420, visible: true });
        if (c) m.chasers.push(c);
        Game.bigText('НАЛЁТ!', 'Бригада «Одесса» приехала за «данью»', '#ff5252');
        Game.message('«Одесса»: «Опа, земляк! Ты теперь с этими? Значит, и с тебя причитается!» Выбора нет — отбивайся.', 5);
      }
      // когда сборщиков почти не осталось — подъезжает их подмога
      if (!m.reinf && m.foes.filter((g) => !g.dead).length <= 2) {
        m.reinf = true;
        const c = GangCars.spawn('russian', P.x, P.y, { min: 400, max: 700 });
        if (c) { m.chasers.push(c); Game.message('Абеба: Ещё машина «Одессы»!', 3); }
      }
      const left = foesWithChasers(m.foes, m.chasers);
      m.text = `Отбейся от «Одессы» у мастерской «Львов» (осталось: ${m.foes.filter((g) => !g.dead).length + GangCars.alive(m.chasers)})`;
      m.target = nearestAlive(left) || P;
      if (!left.length && m.reinf) { Factions.change('lions', 35); Factions.change('russian', -45); return 'ok'; }
    },
    cleanup(m) { for (const a of m.allies || []) { a.mission = null; a.ai = 'gang'; a.home = { x: a.x, y: a.y }; } GangCars.release(m.chasers); },
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
      m.chasers = [];
    },
    update(m) {
      if (m.itzik.dead) return 'fail:Ицик погиб. Шук осиротел.';
      const P = City.places.shuk;
      // вторая волна — пикап с подмогой
      if (!m.wave2 && m.foes.filter((g) => !g.dead).length <= 2) {
        m.wave2 = true;
        const c = GangCars.spawn('arab', P.x, P.y, { min: 450, max: 750 });
        if (c) { m.chasers.push(c); Game.message('Ицик: Ещё едут! Пикап с юга!', 3); }
      }
      const left = foesWithChasers(m.foes, m.chasers);
      m.text = `Защити Ицика и Шук (нападающих: ${m.foes.filter((g) => !g.dead).length + GangCars.alive(m.chasers)})`;
      m.target = nearestAlive(left);
      if (!left.length && m.wave2) { Factions.change('arab', -20); return 'ok'; }
    },
    cleanup(m) { if (m.itzik) { m.itzik.mission = null; m.itzik.ai = 'walk'; } GangCars.release(m.chasers); },
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
      [DANI, 'Задержи их до приезда группы, только без геройства. У вышки спасателей на пляже, рядом с портом, наш человек оставил тебе узи и бронежилет.'],
    ],
    reward: 15000,
    outro: 'Дани: Сеть накрыта. Спасибо, Лёва — без тебя они бы ушли. С полицией я договорился: розыск снят.',
    start(m) {
      const p = City.places.iranSafe;
      m.foes = spawnGroup('iran', { x: p.x, y: p.y + 10 }, 5, { spread: 80, hp: 80 });
      // фургон — на ближайшей улице, чтобы мог сразу уехать
      const r = Game.findRoadSpawn(p.x, p.y, 60, 260, true) || { x: p.x + 60, y: p.y - 70, dir: 0 };
      const c = new Car(r.x, r.y, DIR_ANGLE[r.dir], { type: 'van', faction: 'iran' });
      c.mission = 'target'; c.hp = c.maxHp = 200;
      c.driver = new Ped(c.x, c.y, { faction: 'iran', ai: 'gang', weapon: 'pistol', hp: 80 });
      c.driver.car = c;
      World.cars.push(c);
      m.van = c;
      // фургон уходит в дальний конец города
      const far = [City.places.port, City.places.azrieli, City.places.hospital].filter(Boolean);
      far.sort((a, b) => dist2(b.x, b.y, p.x, p.y) - dist2(a.x, a.y, p.x, p.y));
      m.dest = far[0];
      World.pickups.push(new Pickup(6.5 * TILE, 12 * TILE, 'uzi', { ammo: 150, once: true }));
      World.pickups.push(new Pickup(6.5 * TILE, 13 * TILE, 'armor', { once: true }));
    },
    update(m, dt) {
      const pl = World.player, v = m.van;
      if (!v.dead && !m.vanGo && (dist(pl.x, pl.y, v.x, v.y) < 330 || v.hp < v.maxHp)) {
        m.vanGo = true; v.ai = 'scripted';
        Game.message('Дани: Фургон уходит! Не дай ему увезти оборудование!', 4);
      }
      if (m.vanGo && !v.dead && v.driver && v.driver !== 'player') {
        if (driveTo(v, m.dest.x, m.dest.y, dt, 165) < 140) return 'fail:Фургон с оборудованием ушёл. Дани в ярости.';
      }
      // водитель подбитого фургона отстреливается
      if (v.dead && v.driver && v.driver !== 'player') {
        const d = v.driver;
        bailOut(v);
        d.ai = 'gang'; d.mission = 'target'; d.alert = 8; d.home = { x: d.x, y: d.y };
        m.foes.push(d);
      }
      const left = m.foes.filter((g) => !g.dead);
      m.text = m.vanGo && !v.dead ? `Фургон уходит — уничтожь его! (агентов: ${left.length})` : `Останови иранских агентов (${left.length}) и уничтожь их фургон${v.dead ? ' ✔' : ''}`;
      m.target = m.vanGo && !v.dead ? v : nearestAlive(m.foes) || (v.dead ? null : v);
      if (!left.length && m.van.dead) { Wanted.reset(); Factions.change('arab', 15); return 'ok'; }
    },
    cleanup(m) { if (m.van) { m.van.mission = null; if (m.van.ai === 'scripted') m.van.ai = null; } },
  },
  {
    title: 'Цева Адом',
    phone: null,
    intro: [
      [DANI, 'Лёва, слушай внимательно. Мы накрыли их сеть — и Тегеран решил «ответить». Ракеты уже в воздухе.'],
      [DANI, '«Железный купол» собьёт не всё. Видишь красный круг на земле — беги оттуда: через пару секунд туда прилетит.'],
      [HERO, 'В Питере самое страшное, что падает с неба, — сосульки...'],
    ],
    reward: 5000,
    outro: 'Дани: Отбой тревоги. Ты цел — это главное. Сегодня весь Гуш-Дан выучил слово «мамад».',
    start(m) {
      const pl = World.player;
      m.timer = 60; m.spawnT = 2.5; m.vx = 0; m.vy = 0; m.lx = pl.x; m.ly = pl.y;
      Strikes.start();
      World.pickups.push(new Pickup(pl.x + 50, pl.y + 10, 'armor', { once: true }));
      Game.message('Сирена! «Цева адом» — красная тревога. Бронежилет рядом.', 4);
    },
    update(m, dt) {
      const pl = World.player;
      m.timer -= dt;
      Strikes.update(dt);
      // скорость игрока — ракеты целят с упреждением
      if (dt > 0) { m.vx = lerp(m.vx, (pl.x - m.lx) / dt, 0.1); m.vy = lerp(m.vy, (pl.y - m.ly) / dt, 0.1); }
      m.lx = pl.x; m.ly = pl.y;
      const prog = clamp(1 - m.timer / 60, 0, 1);
      m.spawnT -= dt;
      if (m.timer > 2.5 && m.spawnT <= 0 && Strikes.list.length < 6) {
        m.spawnT = lerp(1.7, 0.8, prog) * rand(0.8, 1.2);
        const salvo = chance(lerp(0.1, 0.4, prog)) ? 2 : 1;
        for (let i = 0; i < salvo; i++) {
          const fuse = rand(2.0, 2.6);
          if (i === 0 && chance(0.55)) Strikes.add(pl.x + m.vx * fuse * 0.7 + rand(-50, 50), pl.y + m.vy * fuse * 0.7 + rand(-50, 50), fuse);
          else {
            // случайные — по улицам и дворам, не по крышам
            for (let k = 0; k < 8; k++) {
              const a = rand(0, TAU), r = rand(110, 380), x = pl.x + Math.cos(a) * r, y = pl.y + Math.sin(a) * r;
              if (!City.solidAt(x, y)) { Strikes.add(x, y, fuse); break; }
            }
          }
        }
      }
      m.text = m.timer > 0 ? `Цева адом! Уворачивайся от ракет — до отбоя ${Math.ceil(m.timer)} с` : 'Последние ракеты...';
      m.target = null;
      if (m.timer <= 0 && !Strikes.list.length) return 'ok';
    },
    cleanup() { Strikes.clear(); },
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
      m.chasers = [];
      m.ride = 0;
    },
    update(m, dt) {
      if (m.step === 0) {
        const r = passengerStep(m, m.itzik, City.places.arHQ, dt, 'Ицик');
        if (m.pstage === 2) {
          m.text = 'Отвези Ицика на встречу с Абу-Каримом в Яффо';
          // «Одесса» узнала о встрече и садится на хвост
          m.ride += dt;
          if (m.ride > 10 && !m.chasers.length) {
            const pl = World.player;
            const c = GangCars.spawn('russian', pl.x, pl.y, { min: 500, max: 800 });
            if (c) { m.chasers.push(c); Game.message('Ицик: За нами «Одесса»! Жми, Лёва!', 3); }
          }
        }
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
    cleanup(m) { if (m.itzik) { m.itzik.mission = null; m.itzik.ai = 'walk'; } GangCars.release(m.chasers); },
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
      m.boss.weapon = 'ak';
      m.allies = null;
      m.cars = [];
      for (let i = 0; i < 2; i++) { const c = new Car(p.x + 80 + i * 60, p.y + 120, 0, { type: 'lux', faction: 'russian' }); c.keep = true; World.cars.push(c); m.cars.push(c); }
    },
    update(m, dt) {
      const pl = World.player, b = m.boss;
      if (!m.allies && dist(pl.x, pl.y, City.places.ruHQ.x, City.places.ruHQ.y) < 700) { m.allies = spawnAllies(3); Game.message('Абеба: «Львы», вперёд!'); }
      const left = m.foes.filter((g) => !g.dead);
      // ранен или охрана тает — Сёма бежит к лимузину
      if (!m.run && !b.dead && m.allies && (b.hp < 130 || left.length <= 3)) {
        m.runCar = m.cars.filter((c) => !c.dead && !c.driver).sort((x, y) => dist2(x.x, x.y, b.x, b.y) - dist2(y.x, y.y, b.x, b.y))[0];
        if (m.runCar) { m.run = true; b.ai = 'idle'; Game.message('Сёма: «Пацаны, прикройте!» — бежит к машине', 3); }
      }
      const c = m.runCar;
      if (m.run && !b.dead && !b.car && c && !c.dead && !c.driver) {
        b.moveTo(c.x, c.y, 140, dt);
        if (dist(b.x, b.y, c.x, c.y) < c.w / 2 + 18) {
          World.peds.splice(World.peds.indexOf(b), 1);
          c.driver = b; b.car = c; c.ai = 'scripted'; c.mission = 'target';
        }
      } else if (m.run && b.car && c.dead) {
        // машина подбита — дальше пешком, с автоматом
        bailOut(c);
        b.ai = 'gang'; b.alert = 8; b.home = { x: b.x, y: b.y };
      } else if (m.run && b.car === c && c.driver === b) {
        fleeDrive(c, dt, 240);
        if (escaped(m, c, dt)) return 'fail:Сёма ушёл. Охота не окончена.';
      } else if (m.run && !b.car && b.ai === 'idle' && (!c || c.dead || c.driver)) { b.ai = 'gang'; b.alert = 8; }
      if (b.car) { m.text = 'Сёма удирает на лимузине — останови его!'; m.target = b.car; }
      else {
        m.text = b.dead ? `Добей охрану «Одессы» (осталось: ${left.length})` : `Ресторан «Одесса»: найди Сёму Каца (охраны: ${left.length - 1})`;
        m.target = b.dead ? nearestAlive(m.foes) : b;
      }
      if (!left.length) { Factions.change('lions', 25); Factions.change('russian', -100, true); return 'ok'; }
    },
    cleanup(m) {
      for (const a of m.allies || []) { a.mission = null; a.ai = 'gang'; a.home = { x: a.x, y: a.y }; }
      for (const c of m.cars || []) { c.keep = false; c.mission = null; if (c.ai === 'scripted') c.ai = null; }
    },
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
  cp: null,          // контрольная точка { index, si } — с неё повторяем после провала
  resumeStage: 0,

  reset(index, cp) {
    this.index = index || 0;
    this.active = null;
    this.done = this.index >= MISSIONS.length;
    this.dialog = null;
    this.retry = 1.5;
    this.cp = cp && cp.index === this.index ? cp : null;
    Strikes.clear();
  },

  blocking() { return !!this.active; },

  // есть контрольная точка в текущей миссии — повтор приходит звонком на мобильный
  atCp() { return !!(this.cp && this.cp.index === this.index && this.cp.si > 0); },

  // Активный телефон (звонит) — точка из City.places
  phonePlace() {
    if (this.active || this.done || this.dialog || this.atCp()) return null;
    const m = MISSIONS[this.index];
    return m && m.phone ? City.places[m.phone] : null;
  },

  call() {
    const def = MISSIONS[this.index];
    Sound.play('phone', 0.8);
    if (this.atCp()) {
      const si = this.cp.si;
      this.dialog = { lines: [['', `${def.title}: повтор с контрольной точки «${def.stageName(si)}».`]], i: 0, done: () => { this.resumeStage = si; this.begin(); }, title: def.title };
      return;
    }
    if (def.card) HUD.bigText(def.card[0], def.card[1], '#ffd23f', 5);
    this.dialog = { lines: typeof def.intro === 'function' ? def.intro() : def.intro, i: 0, done: () => this.begin(), title: def.title };
  },

  begin() {
    const def = MISSIONS[this.index];
    const m = { def, text: '', target: null, timer: null };
    def.start(m);
    this.active = m;
    Game.bigText(def.title, def.sub || 'Миссия ' + (this.index + 1) + ' из ' + MISSIONS.length);
  },

  fail(reason) {
    const m = this.active;
    if (!m) return;
    if (m.def.cleanup) m.def.cleanup(m);
    this.active = null;
    this.retry = 6;
    Story.talk.length = 0;
    Sound.play('jFail', 0.8);
    Game.bigText('ПРОВАЛ', reason || 'Миссия провалена', '#ff5252');
    if (this.atCp()) setTimeout(() => Game.message('Сейчас позвонят — продолжишь с контрольной точки'), 4000);
    else if (m.def.phone) setTimeout(() => Game.message('Телефон снова звонит — попробуй ещё раз'), 4000);
  },

  update(dt) {
    const pl = World.player;
    Story.prompt = null;
    Story.update(dt);
    // миссии без телефона (и повторы с контрольной точки) приходят звонком на мобильный
    if (!this.active && !this.dialog && !this.done && MISSIONS[this.index] && (MISSIONS[this.index].phone === null || this.atCp()) && !pl.dead) {
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
    this.cp = null;
    Game.addMoney(m.def.reward);
    Sound.play('jWin', 0.9);
    const sign = m.def.reward < 0 ? '−' : '+';
    Game.bigText('МИССИЯ ВЫПОЛНЕНА', sign + formatMoney(Math.abs(m.def.reward)), '#7CFC9A');
    if (m.def.outro) Game.message(m.def.outro, 6);
    // слово дня из ульпана
    const w = WORDS[this.word % WORDS.length];
    this.word++;
    HUD.wordOfDay(w);
    this.index++;
    Game.save();
    // следующая миссия без телефона позвонит только после разговора «после миссии»
    this.retry = 1e9;
    // разговор «после миссии», затем вечерние новости (js/news.js), потом — дальше по сюжету
    const chain = [];
    if (m.def.after) chain.push({ lines: m.def.after, title: '' });
    if (m.def.news) chain.push({ lines: m.def.news, title: '12-й канал · вечерние новости', tv: true });
    if (chain.length) {
      const next = () => {
        const c = chain.shift();
        if (!c) { this.afterNext(); return; }
        this.dialog = { lines: c.lines, i: 0, done: next, title: c.title, tv: c.tv };
        Sound.play(c.tv ? 'ui' : 'phone', 0.6);
      };
      setTimeout(next, 2500);
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
    Sound.play('ui', 0.5);
    d.i++;
    if (d.i >= d.lines.length) { this.dialog = null; d.done(); }
  },

  // ответ в диалоге с выбором
  choose(i) {
    const d = this.dialog;
    if (!d || !d.choices) return;
    Sound.play('ui', 0.6);
    this.dialog = null;
    d.choices[i].fn();
    if (d.done) d.done();
  },

  // диалог с выбором ответа (мир на паузе): choices = [{ label, fn }]
  ask(lines, choices, done) {
    this.dialog = { lines, i: 0, choices, done, title: '' };
    Sound.play('phone', 0.5);
  },

  // разговор посреди миссии (мир на паузе), потом done()
  talk(lines, done) {
    this.dialog = { lines, i: 0, done: done || (() => {}), title: '' };
    Sound.play('phone', 0.5);
  },

  // точка, на которую указывает стрелка
  objective() {
    if (this.active && this.active.target) return this.active.target;
    return this.phonePlace() || Jobs.objective();
  },
};
