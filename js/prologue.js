// Пролог: миссии с друзьями Лёвы — Семёном, Димой и Данисом
// (план — docs/PLAN_PROLOGUE_FRIENDS.md). Встают в пролог между прежними.
// Все персонажи вымышлены; внешность друзей — по фото пользователя.
'use strict';

const SEMYON = 'Семён';
const DIMA = 'Дима';
const DANIS = 'Данис';
const BUYER = 'Покупатель Моти';
const RAGER = 'Буйный водитель';
Object.assign(PORTRAIT_OF, { [SEMYON]: 'semyon', [DIMA]: 'dima', [DANIS]: 'danis' });
// пока нет сгенерированных портретов — рисуем кодом
Object.assign(PORTRAIT_LOOKS, {
  dima: { bg: '#90a4ae', skin: '#efc6a8', hair: 'short', hairColor: '#5d4037', top: 'polo', shirt: '#9e9e9e', mouth: 'calm', nose: 10, phoneEar: true },
  danis: { bg: '#ff7043', skin: '#e2b08c', hair: 'neat', hairColor: '#1c1c1c', top: 'polo', shirt: '#212121', mouth: 'grin', stubble: true, nose: 10 },
  semyon: { bg: '#80cbc4', skin: '#f0c8a8', hair: 'curly', hairColor: '#6d4c41', top: 'tank', shirt: '#f5f5f5', mouth: 'smirk', nose: 11 },
});
const lookDima = () => Looks.named('dima', Object.assign(Looks.civilian(), { shirt: '#9e9e9e', pants: '#2d3e63', hair: '#5d4037', style: 'short' }));
const lookDanis = () => Looks.named('danis', Object.assign(Looks.civilian(), { shirt: '#212121', pants: '#8fa8c8', hair: '#1c1c1c', style: 'short' }));
const lookSemyon = () => Looks.named('semyon', Object.assign(Looks.civilian(), { shirt: '#f5f5f5', pants: '#6b5b45', hair: '#6d4c41', style: 'short' }));

// Машина друга: своя картинка (vehicles/<key>), пока её нет — рисует код нужным цветом
// LEVA_VW — старый «Фолькс» Лёвы, тарантайка (пока нет картинки — рисует код)
const LEVA_VW = ['leva_vw', '#93a9b5'], SOLARIS = ['solaris', '#8d9298'], CIVIC = ['civic', '#f4f4f2'], CHINA_EV = ['china_ev', '#eef0ec'];
function friendCar(c, [key, color]) {
  c.color = color;
  c.genKey = Assets.gen['vehicles/' + key] ? key : null;
  c.keep = true;
  return c;
}
function prPut(p, car, type = 'sedan') { return friendCar(Story.putPlayer(p, type, car[1]), car); }

// ---------------------------------------------------------------- места
function prP() {
  const P = chP();
  if (P.pr) return P;
  P.pr = true;
  const S = City.side;
  P.prNewFlat = S(2, 1, 'S');      // новая квартира Семёна, Старый Север
  P.prLot = S(7, 6, 'N');          // площадка подержанных машин, Южный Тель-Авив
  P.prDealer = S(8, 3, 'W');       // салон китайских машин, Рамат-Ган
  P.prTest = [cross(8, 6), cross(8, 8), cross(6, 8), cross(6, 6)];
  P.prRage = P.c1Ayalon;           // тут подрезали Даниса
  return P;
}

// ---------------------------------------------------------------- матрас на крыше
// Шкала «держится» падает от скорости выше 60 км/ч, резких поворотов и
// ударов; в хамсин — быстрее. Ноль — матрас съехал: остановиться и поправить.
function mattressStep(m, c, dt) {
  const gust = 1 + 1.8 * Clock.hamsinK;
  const sp = c.speed, turn = Math.abs(c.av || 0);
  let loss = Math.max(0, sp - 167) * 0.05 + Math.max(0, turn - 1.1) * sp * 0.012;
  if (Clock.hamsinK > 0.3 && sp > 60) loss += 1.6 * Clock.hamsinK;
  let grip = (m.grip ?? 100) - loss * gust * dt;
  if (c.hp < (m.mHp ?? c.hp) - 1) grip -= (m.mHp - c.hp) * 2.5; // удар сразу ослабляет ремни
  m.mHp = c.hp;
  m.grip = clamp(grip, 0, 100);
  c.roofTilt = m.loose ? 0.5 : (1 - m.grip / 100) * 0.25 * Math.sin(World.time * 7);
  if (m.grip <= 0 && !m.loose) {
    m.loose = true; m.looseN = (m.looseN || 0) + 1; m.everLoose = true;
    Game.bigText('МАТРАС СЪЕХАЛ!', 'Остановись и поправь, пока не улетел', '#ff9800');
    Story.say([[SEMYON, 'Лёва! Он съезжает! Я держу его рукой через окно, но рука у меня одна!']]);
  }
  if (m.loose) {
    // едешь с болтающимся матрасом — улетит
    if (sp > 90) m.flyT = (m.flyT || 0) + dt; else m.flyT = Math.max(0, (m.flyT || 0) - dt);
    if (m.flyT > 5) return 'fail:Матрас сорвало ветром и унесло под колёса автобуса. Семён спит на полу.';
    m.text = 'Матрас съехал! Остановись, выйди и поправь его (держи E у машины)';
    m.target = c;
    if (Story.hold(m, 'retie' + m.looseN, c, 1.6, 'перетянуть ремни', { r: 70 })) { m.loose = false; m.grip = 70; m.flyT = 0; c.roofTilt = 0; }
    return 'loose';
  }
  return null;
}

// ---------------------------------------------------------------- «Матрас»
const PR_MATTRESS = staged({
  title: 'Матрас',
  sub: 'Пролог · переезд Семёна',
  phone: null,
  giver: SEMYON,
  intro: [
    [SEMYON, 'Лёва, привет, это Семён. Да, тот, который спит за стенкой. Я переезжаю — нашёл квартиру в Старом Севере, с балконом!'],
    [SEMYON, 'Вещей у меня немного, а вот матрас... Можешь на своей тарантайке нас с матрацем подкинуть? Привяжем матрас на крышу — и поехали. Только плавно.'],
  ],
  reward: 800,
  outro: 'Семён: Четвёртый переезд за год. Хозяин сказал «без животных и без вечеринок». Про матрасы ничего не говорил!',
  init(m) { prP(); },
  done() { Clock.forceTarget = 0; },
  stages: [
    {
      name: 'Погрузка',
      start(m) {
        const P = prP();
        m.car = friendCar(Story.carOnRoad(m, P.flat, 30, 220, { type: 'hatch', color: LEVA_VW[1] }), LEVA_VW);
        m.car.locked = false;
        m.semyon = Story.ped(m, P.flat.x + 20, P.flat.y, { ai: 'idle', look: lookSemyon(), hp: 100, name: SEMYON });
        m.semyon.mission = 'ally';
      },
      update(m) {
        const pl = pl_(), c = m.car;
        if (m.semyon.dead) return 'fail:Семён пострадал. Переезд отменяется.';
        if (c.dead) return 'fail:Фолькс сгорел. Туда ему и дорога.';
        if (!m.tied) {
          m.text = 'Привяжи матрас Семёна к крыше Фолькса (держи E у машины)';
          m.target = c;
          if (Story.hold(m, 'tie', c, 2, 'привязать матрас к крыше', { r: 70 })) {
            m.tied = true; c.roof = 'mattress';
            Story.seat(m.semyon, c);
            Story.say([[SEMYON, 'Два ремня, узел «как у папы на даче». Держится намертво. Наверное.']]);
          }
          return;
        }
        m.text = 'Садись за руль Фолькса (F)';
        m.target = c;
        if (pl.car === c) return 'next';
      },
    },
    {
      name: 'В дорогу',
      resume(m) {
        const c = m.car = prPut(prP().flat, LEVA_VW, 'hatch');
        c.roof = 'mattress';
        m.semyon = Story.ped(m, c.x, c.y, { ai: 'idle', look: lookSemyon(), hp: 100, name: SEMYON });
        Story.seat(m.semyon, c);
      },
      start(m) {
        m.grip = 100; m.loose = false; m.mHp = m.car.hp;
        m.d0 = dist(m.car.x, m.car.y, prP().prNewFlat.x, prP().prNewFlat.y);
      },
      update(m, dt) {
        const pl = pl_(), c = m.car, P = prP();
        if (c.dead) return 'fail:Фолькс разбит, матрас — в пепел.';
        if (pl.car !== c) {
          if (!m.loose) { m.text = 'Вернись за руль Фолькса — Семён и матрас ждут'; m.target = c; return; }
        }
        const r = mattressStep(m, c, dt);
        if (r && r.startsWith('fail')) return r;
        if (r === 'loose') return;
        const d = dist(c.x, c.y, P.prNewFlat.x, P.prNewFlat.y);
        m.text = `Вези матрас в Старый Север, не гони · держится: ${Math.round(m.grip)}%`;
        m.target = P.prNewFlat;
        if (m.stageT > 6) Story.sayOnce(m, 'a', [[SEMYON, 'Это мой четвёртый переезд за год. Первый хозяин продал квартиру, второй решил, что ему нужен «хадар авода», третий — что я слишком громко дышу.'], [HERO, 'А в Питере ты сколько раз переезжал?'], [SEMYON, 'Ни разу. Двадцать восемь лет в одной комнате с бабушкиным сервантом.']]);
        if (m.stageT > 28) Story.sayOnce(m, 'b', [[SEMYON, 'Новый хозяин — Ави. Очень приятный. Попросил залог за три месяца, двенадцать чеков и фото моего дедушки.']]);
        // поворот: посреди дороги поднимается хамсин
        if (d < m.d0 * 0.62 && !m.hamsin) {
          m.hamsin = true; Clock.forceTarget = 0.9;
          Game.bigText('ХАМСИН!', 'Ветер рвёт матрас — езжай ещё мягче', '#ffb300');
          Story.say([[SEMYON, 'Ну конечно. Хамсин. В день переезда. Это знак, Лёва. Знак, что надо было брать надувной.']]);
        }
        if (d < 1000) return 'next';
      },
    },
    {
      name: 'Объезд',
      resume(m) {
        const P = prP();
        const c = m.car = prPut({ x: P.prNewFlat.x + 900, y: P.prNewFlat.y + 400 }, LEVA_VW, 'hatch');
        c.roof = 'mattress';
        m.semyon = Story.ped(m, c.x, c.y, { ai: 'idle', look: lookSemyon(), hp: 100, name: SEMYON });
        Story.seat(m.semyon, c);
        Clock.forceTarget = 0.9;
      },
      start(m) {
        m.grip = m.grip ?? 100; m.loose = false; m.mHp = m.car.hp;
        // демонстрация перекрывает улицу впереди, по пути к новой квартире
        const c = m.car, P = prP();
        const path = City.pathTo(Math.floor(c.x / TILE), Math.floor(c.y / TILE), Math.floor(P.prNewFlat.x / TILE), Math.floor(P.prNewFlat.y / TILE));
        const tile = path && path[Math.min(path.length - 1, 7)];
        const at = tile ? City.tc(tile.x, tile.y) : { x: (c.x + P.prNewFlat.x) / 2, y: (c.y + P.prNewFlat.y) / 2 };
        m.crowd = Story.gang(m, null, at, 8, { weapon: 'fists', spread: 70, hp: 45 });
        for (const g of m.crowd) { g.ai = 'idle'; g.mission = null; g.look = Looks.named('protester', Object.assign(Looks.civilian(), { shirt: '#1565c0' })); }
        m.crowdAt = at;
        Game.message('Впереди демонстрация — улицу перекрыли. Объезжай переулками', 4);
        Story.say([[SEMYON, 'Демонстрация. Флаги, барабаны, «Демократия!». Я бы присоединился, но у меня на крыше матрас.']]);
      },
      update(m, dt) {
        const pl = pl_(), c = m.car, P = prP();
        if (c.dead) return 'fail:Фолькс разбит, матрас — в пепел.';
        if (m.crowd.some((g) => g.dead) && !m.hitCrowd) { m.hitCrowd = true; Wanted.set(Math.max(Wanted.level, 2)); Game.message('Ты сбил демонстранта! Полиция уже едет', 3); }
        if (pl.car !== c && !m.loose) { m.text = 'Вернись за руль Фолькса'; m.target = c; return; }
        const r = mattressStep(m, c, dt);
        if (r && r.startsWith('fail')) return r;
        if (r === 'loose') return;
        m.text = `Объезжай демонстрацию и вези матрас к новой квартире · держится: ${Math.round(m.grip)}%`;
        m.target = P.prNewFlat;
        if (stopAt(P.prNewFlat, 130) && c.speed < 25) return 'next';
      },
    },
    {
      name: 'Занести',
      resume(m) {
        const P = prP();
        const c = m.car = prPut(P.prNewFlat, LEVA_VW, 'hatch');
        c.roof = 'mattress';
        m.semyon = Story.ped(m, c.x, c.y, { ai: 'idle', look: lookSemyon(), hp: 100, name: SEMYON });
        Story.seat(m.semyon, c);
      },
      start(m) {
        Clock.forceTarget = 0;
        const c = m.car, s = m.semyon;
        if (s.car) { c.passenger = null; s.car = null; s.x = c.x + 30; s.y = c.y; World.peds.push(s); s.ai = 'idle'; }
        Story.say([[SEMYON, 'Приехали! Третий этаж, лифта нет. Бери за тот край.']]);
      },
      update(m) {
        const c = m.car;
        if (m.semyon.dead) return 'fail:Семён пострадал у самого подъезда.';
        m.text = 'Занеси матрас с Семёном в подъезд (держи E у машины)';
        m.target = c;
        if (Story.hold(m, 'carry', c, 2.5, 'снять и занести матрас', { r: 75 })) {
          c.roof = null;
          if (!m.everLoose) { Game.addMoney(300); Game.message('Бонус: матрас ни разу не съехал (+₪300)', 4); }
          return 'next';
        }
      },
    },
  ],
});

// ---------------------------------------------------------------- «Солярис уходит»
const PR_SOLARIS = staged({
  title: 'Солярис уходит',
  sub: 'Пролог · Дима продаёт машину',
  phone: null,
  giver: DIMA,
  intro: [
    [DIMA, 'Лёва, это Дима. Продаю «Солярис» — нашёл покупателя на «Яд-штаим». Беру китайца. Китайцы сейчас — топ за свои деньги, я всё посчитал.'],
    [DIMA, 'Поможешь? Отгоним машину на площадку, покажем покупателю — и сразу в салон. Ты за рулём: я нервничаю, когда продаю.'],
  ],
  reward: 1200,
  outro: 'Дима: Новая машина за цену подержанной, без ключа и без инструкции на русском. Мечта! Спасибо, Лёва. С меня ужин. Скромный.',
  init(m) { prP(); },
  stages: [
    {
      name: 'Перегнать',
      start(m) {
        const P = prP();
        m.car = friendCar(Story.carOnRoad(m, P.flat, 30, 220, { type: 'sedan', color: SOLARIS[1] }), SOLARIS);
        m.dima = Story.ped(m, P.flat.x + 20, P.flat.y, { ai: 'idle', look: lookDima(), hp: 100, name: DIMA });
        m.dima.mission = 'ally';
        m.pstage = 0;
      },
      update(m, dt) {
        const pl = pl_(), P = prP();
        if (m.car.dead) return 'fail:«Солярис» сгорел. Продавать нечего.';
        if (pl.car !== m.car && m.pstage !== 2) { m.text = 'Садись в серый «Солярис» Димы (F)'; m.target = m.car; if (m.dima.ai === 'board') m.dima.ai = 'idle'; m.pstage = 0; return; }
        const r = passengerStep(m, m.dima, P.prLot, dt, { acc: 'Диму', nom: 'Дима', dead: 'Дима пострадал.' });
        if (r && r.startsWith('fail')) return r;
        if (m.pstage === 2) {
          m.text = 'Отгони «Солярис» на площадку «Яд-штаим» в Южном Тель-Авиве';
          Story.sayOnce(m, 'a', [[DIMA, 'Объявление: «Солярис», 2016-й, один хозяин, не бит, не крашен. Почти правда.'], [DIMA, 'Покупатель торгуется по ватсапу с шести утра. Учи слово: «мециаа» — выгодная сделка. Он говорит его каждые две минуты.']]);
        }
        if (r === 'arrived') { m.dima.mission = 'ally'; return 'next'; }
      },
    },
    {
      name: 'Тест-драйв',
      resume(m) {
        const P = prP();
        m.car = prPut(P.prLot, SOLARIS);
        m.dima = Story.ped(m, P.prLot.x + 30, P.prLot.y, { ai: 'idle', look: lookDima(), hp: 100, name: DIMA });
      },
      start(m) {
        const c = m.car;
        m.buyer = new Ped(c.x, c.y, { ai: 'idle', look: Looks.named('buyer', Object.assign(Looks.civilian(), { shirt: '#ffb74d' })), hp: 80, name: BUYER });
        Story.own(m).peds.push(m.buyer);
        Story.seat(m.buyer, c);
        m.gi = 0; m.hp0 = c.hp;
        Story.say([[BUYER, 'Шалом! Моти. Ну давай, покажи, как она едет. Мециаа или не мециаа — сейчас узнаем.']]);
      },
      update(m) {
        const pl = pl_(), c = m.car, P = prP();
        if (c.dead) return 'fail:«Солярис» сгорел на тест-драйве. Моти почему-то передумал.';
        if (pl.car !== c) { m.text = 'Садись за руль «Соляриса» — тест-драйв'; m.target = c; return; }
        const scratched = c.hp < m.hp0 - 1;
        if (scratched) Story.sayOnce(m, 'scr', [[BUYER, 'Эй, эй! Это была царапина? Минус пятьсот шекелей, ахи.']]);
        if (m.gi < P.prTest.length) {
          const g = P.prTest[m.gi];
          m.target = g;
          m.text = `Тест-драйв для покупателя: точка ${m.gi + 1} из ${P.prTest.length}${scratched ? ' · уже поцарапал' : ' · без единой царапины'}`;
          if (near(g, 150)) { m.gi++; if (m.gi === 2) Story.say([[BUYER, 'Мягко идёт. Кондиционер дует? Дует. Мециаа.']]); }
          return;
        }
        m.target = P.prLot;
        m.text = 'Верни покупателя на площадку';
        if (stopAt(P.prLot, 130) && c.speed < 25) {
          m.clean = !scratched;
          return 'next';
        }
      },
    },
    {
      name: 'Мошенник',
      resume(m) {
        const P = prP();
        m.car = prPut(P.prLot, SOLARIS);
        m.dima = Story.ped(m, P.prLot.x + 30, P.prLot.y, { ai: 'idle', look: lookDima(), hp: 100, name: DIMA });
        m.buyer = new Ped(m.car.x, m.car.y, { ai: 'idle', look: Looks.named('buyer', Object.assign(Looks.civilian(), { shirt: '#ffb74d' })), hp: 80, name: BUYER });
        Story.own(m).peds.push(m.buyer);
        Story.seat(m.buyer, m.car);
      },
      start(m) {
        const c = m.car;
        if (pl_().car === c) Game.exitCar();
        // покупатель пересаживается за руль и уезжает
        c.passenger = null; m.buyer.seat = false;
        c.driver = m.buyer; m.buyer.car = c;
        c.ai = 'scripted'; c.mission = 'target'; c.rams = 3; c.locked = true;
        Game.bigText('МОШЕННИК!', 'Перевод — фальшивый скриншот', '#ff5252');
        Story.say([[BUYER, 'Деньги ушли, мамой клянусь! Ну всё, я поехал, мециаа!'], [DIMA, 'Лёва... это не банк. Это картинка из фотошопа! Он угоняет мою машину! Догони, только не разбей её!']]);
      },
      update(m, dt) {
        const c = m.car, b = m.buyer;
        if (c.dead) return 'fail:«Солярис» сгорел. Дима продал его... металлолому.';
        if (!c.stalled && Story.stalled(c, 0.5)) { b.ai = 'runner'; b.runSpeed = 135; b.mission = 'target'; Story.say([[DIMA, 'Он выскочил! Держи его!']]); }
        if (c.stalled) {
          if (b.dead) return 'next';
          m.target = b;
          m.text = 'Моти удирает пешком — догони и схвати';
          if (Story.caught(b)) { Story.say([[BUYER, 'Ладно, ладно! Это была... тестовая сделка!']]); return 'next'; }
          if (dist(b.x, b.y, pl_().x, pl_().y) > 1300) return 'fail:Моти скрылся в переулках. Хорошо хоть машина цела.';
          return;
        }
        if (needCar(m, 'Найди машину и догони «Солярис» (подойди к машине, F)')) return;
        fleeDrive(c, dt, 250);
        m.target = c;
        m.text = 'Догони «Солярис» и останови таранами — аккуратно, его ещё продавать';
        if (escaped(m, c, dt, 12)) return 'fail:«Солярис» ушёл. Дима теперь ездит на автобусе.';
      },
    },
    {
      name: 'Салон',
      resume(m) {
        const P = prP();
        Story.putPlayer(P.prLot, 'sedan');
        m.dima = Story.ped(m, P.prLot.x + 30, P.prLot.y, { ai: 'idle', look: lookDima(), hp: 100, name: DIMA });
      },
      start(m) {
        m.pstage = 0;
        if (m.car && !m.car.dead) { m.car.mission = null; }
        // Дима ждал на площадке: если город его «забыл», пока шла погоня, — он снова там
        const P = prP(), d = m.dima;
        if (!World.peds.includes(d) && !d.car) { d.x = P.prLot.x + 30; d.y = P.prLot.y; d.dead = false; World.peds.push(d); }
        d.mission = 'ally'; d.ai = 'idle';
        Story.say([[DIMA, 'Машину сдадим в полицию с этим «покупателем», заберу потом. А в салоне меня ждут! Едем на чём есть.']]);
      },
      update(m, dt) {
        const P = prP(), pl = pl_();
        if (!m.atDealer) {
          if (needCar(m, 'Найди машину и забери Диму (подойди к машине, F)')) return;
          const r = passengerStep(m, m.dima, P.prDealer, dt, { acc: 'Диму', nom: 'Дима', dead: 'Дима пострадал.' });
          if (r && r.startsWith('fail')) return r;
          if (m.pstage === 2) {
            m.text = 'Вези Диму в салон китайских машин в Рамат-Гане';
            Story.sayOnce(m, 'a', [[DIMA, 'Китаец, Лёва! Камеры по кругу, экран как телевизор, массаж в сиденье — и всё за цену «Короллы». Немцы плачут, японцы нервно курят.']]);
          }
          if (r === 'arrived') { m.atDealer = true; m.dima.mission = 'ally'; Game.exitCar(); }
          return;
        }
        m.target = P.prDealer;
        m.text = 'Зайди с Димой в салон и оформи покупку (держи E)';
        if (Story.hold(m, 'buy', P.prDealer, 2, 'оформить покупку', { r: 80 })) return 'next';
      },
    },
    {
      name: 'Домой на новой',
      resume(m) {
        const P = prP();
        Story.putPlayer(P.prDealer);
        m.dima = Story.ped(m, P.prDealer.x + 30, P.prDealer.y, { ai: 'idle', look: lookDima(), hp: 100, name: DIMA });
      },
      start(m) {
        const P = prP();
        m.ev = friendCar(Story.carOnRoad(m, P.prDealer, 20, 200, { type: 'suv', color: CHINA_EV[1] }), CHINA_EV);
        m.pstage = 0;
        Story.say([[DIMA, 'Вот она! Белая, тихая, пахнет пластиком. Садись, первым поведёшь ты — я боюсь её поцарапать.']]);
      },
      update(m, dt) {
        const P = prP(), pl = pl_();
        if (m.ev.dead) return 'fail:Новая машина сгорела в первый же день. Гарантия этого не покрывает.';
        if (pl.car !== m.ev && m.pstage !== 2) { m.text = 'Садись в нового «китайца» Димы (F)'; m.target = m.ev; if (m.dima.ai === 'board') m.dima.ai = 'idle'; m.pstage = 0; return; }
        const r = passengerStep(m, m.dima, P.flat, dt, { acc: 'Диму', nom: 'Дима', dead: 'Дима пострадал.' });
        if (r && r.startsWith('fail')) return r;
        if (m.pstage === 2) {
          m.text = 'Отвези Диму домой на новой машине';
          Story.sayOnce(m, 'a', [[RADIO, '你好! שלום! Ассистент: «Поверните направо. 请右转. פנה ימינה».'], [DIMA, 'Он говорит на трёх языках сразу…']]);
          if (m.stageT > 25) Story.sayOnce(m, 'b', [[DIMA, 'Через пять лет я её продам. Ну или поменяю... хотя бы на велосипед.']]);
        }
        if (r === 'arrived') {
          if (m.clean) { Game.addMoney(300); Game.message('Бонус: тест-драйв без единой царапины (+₪300)', 4); }
          return 'next';
        }
      },
    },
  ],
});

// ---------------------------------------------------------------- «Подрезал»
const PR_CIVIC = staged({
  title: 'Подрезал',
  sub: 'Пролог · Данис попал в переделку',
  phone: null,
  giver: DANIS,
  intro: [
    [DANIS, 'Лёва! Лёва, это Данис! Я на Аялоне, просто ехал... ну, чуть быстрее, чем все. Подрезал одного — а он меня догнал и встал поперёк!'],
    [DANIS, 'Он вылез с битой! И друг его тоже! Я заперся в «Цивике», но они бьют стёкла! Приезжай, быстрее!'],
  ],
  reward: 1500,
  outro: 'Данис: Зеркало — пятьсот шекелей, фара — тысяча, гордость — бесценна. Спасибо, брат. Я теперь езжу сто двадцать. Ну, сто тридцать.',
  init(m) { prP(); },
  stages: [
    {
      name: 'Срочно на Аялон',
      start(m) {
        const P = prP();
        m.timer = 80;
        m.civic = friendCar(Story.carOnRoad(m, P.prRage, 20, 160, { type: 'sedan', color: CIVIC[1] }), CIVIC);
        m.civic.locked = true; m.civic.hp = m.civic.maxHp = 220; // побит, но держится
        m.civic.damage(70, null, m.civic.x, m.civic.y - 20);
        // Данис отбежал на обочину — не под колёса
        const side = walkNear(Math.floor(m.civic.x / TILE), Math.floor(m.civic.y / TILE));
        m.danis = Story.ped(m, side.x, side.y, { ai: 'idle', look: lookDanis(), hp: 200, name: DANIS });
        m.danis.mission = 'ally';
        m.rcar = friendCar(Story.carOnRoad(m, m.civic, 70, 200, { type: 'suv', color: '#1b1b1b' }), ['none', '#1b1b1b']);
        m.rcar.locked = true;
      },
      update(m, dt) {
        const P = prP();
        m.timer -= dt;
        if (m.timer <= 0) return 'fail:Не успел. Данис в больнице, «Цивик» разбит. Буйный уехал.';
        if (needCar(m, 'Найди машину и мчись на Аялон к Данису (подойди к машине, F)')) return;
        m.target = m.civic;
        m.text = `Мчись на Аялон — Даниса бьют! Осталось ${Math.ceil(m.timer)} с`;
        if (near(m.civic, 380)) return 'next';
      },
    },
    {
      name: 'Отбить Даниса',
      resume(m) {
        const P = prP();
        Story.putPlayer(P.prRage, 'hatch');
        m.civic = friendCar(Story.carOnRoad(m, P.prRage, 20, 160, { type: 'sedan', color: CIVIC[1] }), CIVIC);
        m.civic.locked = true; m.civic.hp = m.civic.maxHp = 220;
        m.civic.damage(70, null, m.civic.x, m.civic.y - 20);
        const side = walkNear(Math.floor(m.civic.x / TILE), Math.floor(m.civic.y / TILE));
        m.danis = Story.ped(m, side.x, side.y, { ai: 'idle', look: lookDanis(), hp: 200, name: DANIS });
        m.danis.mission = 'ally';
        m.rcar = friendCar(Story.carOnRoad(m, m.civic, 70, 200, { type: 'suv', color: '#1b1b1b' }), ['none', '#1b1b1b']);
        m.rcar.locked = true;
      },
      start(m) {
        const c = m.civic;
        m.foes = Story.gang(m, null, { x: c.x + 50, y: c.y + 30 }, 2, { weapon: 'bat', spread: 30, hp: 90 });
        m.rager = m.foes[0]; m.rager.name = RAGER;
        for (const g of m.foes) { g.look = Object.assign(Looks.civilian(), { shirt: g === m.rager ? '#263238' : '#5d4037', style: 'bald' }); g.alert = 8; }
        Game.bigText('ДРАКА НА ДОРОГЕ', 'Двое с битами бьют Даниса', '#ff5252');
        Story.say([[RAGER, 'Ты меня подрезал, ялла! Сейчас научу ездить!'], [DANIS, 'Лёва, это он! Который в кепке! То есть без кепки!']]);
      },
      update(m) {
        if (m.danis.dead) return 'fail:Даниса забили битой. Ты опоздал на несколько секунд.';
        const r = m.rager, friend = m.foes[1];
        m.target = nearestAlive(m.foes);
        m.text = 'Отбей Даниса — прогони двоих с битами';
        // буйный проигрывает драку — бежит к своей машине и уезжает
        if (!r.dead && (r.hp < 50 || friend.dead)) {
          const c = m.rcar;
          const i = World.peds.indexOf(r); if (i >= 0) World.peds.splice(i, 1);
          r.car = c; c.driver = r; c.ai = 'scripted'; c.mission = 'target'; c.rams = 3; c.locked = true;
          if (!friend.dead) { friend.ai = 'flee'; friend.flee = 8; friend.threat = { x: pl_().x, y: pl_().y }; friend.mission = null; }
          return 'next';
        }
        if (r.dead) { m.ragerDead = true; return 'next'; }
      },
    },
    {
      name: 'Погоня на «Цивике»',
      resume(m) {
        const P = prP();
        const c = m.civic = prPut(P.prRage, CIVIC);
        c.hp = c.maxHp = 220; c.damage(70, null, c.x, c.y - 20);
        m.danis = new Ped(c.x, c.y, { ai: 'idle', look: lookDanis(), hp: 100, name: DANIS });
        Story.own(m).peds.push(m.danis);
        Story.seat(m.danis, c);
        m.rcar = friendCar(Story.carOnRoad(m, P.prRage, 200, 400, { type: 'suv', color: '#1b1b1b' }), ['none', '#1b1b1b']);
        m.rager = Story.driver(m, m.rcar, { ai: 'idle', look: Object.assign(Looks.civilian(), { shirt: '#263238', style: 'bald' }), hp: 50, name: RAGER });
        m.rcar.ai = 'scripted'; m.rcar.mission = 'target'; m.rcar.rams = 3; m.rcar.locked = true;
      },
      start(m) {
        if (m.ragerDead) return;
        const c = m.civic;
        c.locked = false;
        if (!m.danis.car) { m.danis.ai = 'idle'; }
        Story.say([[DANIS, 'Он мне зеркало снёс! И фару! Бери «Цивик», я сяду рядом — догоним!']]);
      },
      update(m, dt) {
        if (m.ragerDead) return 'next';
        const pl = pl_(), c = m.civic, rc = m.rcar;
        if (m.danis.dead) return 'fail:Данис погиб. Из-за зеркала.';
        if (c.dead) return 'fail:«Цивик» сгорел. Данис рыдает на обочине.';
        // сначала — в «Цивик» с Данисом
        if (!m.danis.car) {
          if (pl.car !== c) { m.text = 'Садись за руль «Цивика» Даниса (F)'; m.target = c; return; }
          if (dist(m.danis.x, m.danis.y, c.x, c.y) < 160 && c.speed < 30) m.danis.ai = 'board';
          m.text = 'Подожди, пока Данис сядет'; m.target = m.danis;
          return;
        }
        if (pl.car !== c) { m.text = 'Вернись за руль «Цивика»'; m.target = c; return; }
        if (rc.dead || rc.stalled) {
          if (rc.driver && rc.driver !== 'player') bailOut(rc);
          if (m.rager && !m.rager.dead) { m.rager.ai = 'flee'; m.rager.flee = 10; m.rager.threat = { x: pl.x, y: pl.y }; }
          Story.say([[DANIS, 'Удирает пешком! Пусть бежит. Главное — зеркало отомщено!']]);
          return 'next';
        }
        if (!Story.stalled(rc, 0.5)) fleeDrive(rc, dt, 270);
        m.target = rc;
        m.text = 'Догони чёрный джип буйного и останови таранами';
        Story.sayOnce(m, 'a', [[DANIS, 'Не жалей «Цивик»! То есть жалей! Но догони!']]);
        if (escaped(m, rc, dt, 12)) return 'fail:Буйный ушёл. Данис запомнил номер, но номер был наполовину заклеен.';
      },
    },
    {
      name: 'Полиция',
      resume(m) {
        const P = prP();
        const c = m.civic = prPut(P.prRage, CIVIC);
        c.hp = c.maxHp = 220; c.damage(100, null, c.x, c.y - 20);
        m.danis = new Ped(c.x, c.y, { ai: 'idle', look: lookDanis(), hp: 100, name: DANIS });
        Story.own(m).peds.push(m.danis);
        Story.seat(m.danis, c);
      },
      start(m) {
        Wanted.set(Math.max(Wanted.level, 1));
        Story.say([[DANIS, 'Сирена! Кто-то вызвал полицию. Если нас остановят — я опять буду объяснять про «чуть быстрее, чем все». Уходим!']]);
      },
      update(m) {
        const pl = pl_(), c = m.civic;
        if (m.danis.dead) return 'fail:Данис погиб.';
        if (c.dead) return 'fail:«Цивик» сгорел.';
        if (pl.car !== c) { m.text = 'Вернись за руль «Цивика» — Данис внутри'; m.target = c; return; }
        m.target = null;
        m.text = 'Оторвись от полиции (сбрось звёзды розыска)';
        if (Wanted.level === 0) return 'next';
      },
    },
    {
      name: 'К механику',
      resume(m) {
        const c = m.civic = prPut(City.places.hospital, CIVIC);
        c.hp = c.maxHp = 220; c.damage(100, null, c.x, c.y - 20);
        m.danis = new Ped(c.x, c.y, { ai: 'idle', look: lookDanis(), hp: 100, name: DANIS });
        Story.own(m).peds.push(m.danis);
        Story.seat(m.danis, c);
      },
      update(m) {
        const pl = pl_(), c = m.civic, P = prP();
        if (m.danis.dead) return 'fail:Данис погиб.';
        if (c.dead) return 'fail:«Цивик» сгорел по дороге к механику.';
        if (pl.car !== c) { m.text = 'Вернись за руль «Цивика»'; m.target = c; return; }
        m.target = P.c1Garage;
        m.text = 'Довези Даниса и побитый «Цивик» к механику в Рамат-Гане';
        if (m.stageT > 4) Story.sayOnce(m, 'a', [[HERO, 'Данис, сколько ты ехал по Аялону?'], [DANIS, 'Ну... сто сорок. Но аккуратно! Я же поворотники включал.'], [HERO, 'Ты включал поворотники на ста сорока?'], [DANIS, 'Я культурный человек, Лёва.']]);
        if (stopAt(P.c1Garage, 130) && c.speed < 25) return 'ok';
      },
    },
  ],
});

// встраиваем в пролог: «Матрас» после «Горячей доставки», «Солярис» и «Подрезал» после «Ульпана»
MISSIONS.splice(4, 0, PR_MATTRESS);
MISSIONS.splice(6, 0, PR_SOLARIS, PR_CIVIC);
