// Подработки нового репатрианта: доставка «Шмоне-Бис» на скутере и такси.
// «Шмоне-Бис» — вымышленный сервис доставки.
'use strict';

const CUSTOMER_LINES = [
  'Код домофона 1948#, третий этаж без лифта.',
  'Тода раба, ахи! Держи на чай.',
  'Почему так долго? Ялла, ялла!',
  'А ты откуда — из Питера? У меня соседка из Питера!',
  'Оставь у двери, я на зуме.',
  'Ой, а приборы? Ладно, беседер.',
  'Ты новенький? Добро пожаловать в страну!',
  'Поставь в мамад, там прохладнее.',
  'Звонок не работает, кричи «Шмоне-Бис!».',
  'Опять без соуса... Ладно, пять звёзд, ты старался.',
  'Сдачи не надо — ой, тут же через приложение. Ну, спасибо!',
];

const TAXI_LINES = [
  'Ты новый оле? Я сам приехал в девяносто первом. Всё будет хорошо!',
  'Только не через Аялон, там пробка до самого Холона.',
  'Знаешь, что такое арнона? Нет? Скоро узнаешь, хабиби.',
  'Включи что-нибудь мизрахи, а то тоскливо.',
  'По счётчику, по счётчику! Не надо мне «кабланут».',
  'Мой сын в армии, в Голани. А ты служить будешь?',
  'Тель-Авив — это не Израиль, это пузырь. Но какой пузырь!',
  'Ты на иврите говоришь? «Беседер», «ялла», «сабаба» — уже полдела.',
];

const Jobs = {
  active: null,  // 'delivery' | 'taxi'
  order: null,
  deliveries: 0,
  rides: 0,
  rating: [],
  offT: 0,
  hintT: 0,

  reset(save) {
    this.active = null; this.order = null;
    this.deliveries = (save && save.deliveries) || 0;
    this.rides = (save && save.rides) || 0;
    this.rating = [];
  },

  stars() {
    if (!this.rating.length) return 5;
    return this.rating.reduce((a, b) => a + b, 0) / this.rating.length;
  },

  update(dt) {
    const pl = World.player;
    const car = pl.car;
    // подсказка, как начать смену
    if (!this.active && car && (car.type === 'scooter' || car.type === 'taxi') && !Missions.blocking()) {
      this.hintT -= dt;
      if (this.hintT <= 0) {
        this.hintT = 12;
        Game.message(car.type === 'scooter' ? 'J — начать смену в «Шмоне-Бис»' : 'J — работать таксистом', 4);
      }
    }
    if (Game.hit('KeyJ') && !pl.dead) {
      if (this.active) this.stop('Смена закончена');
      else if (car && car.type === 'scooter') this.start('delivery');
      else if (car && car.type === 'taxi') this.start('taxi');
      else Game.message('Для доставки нужен скутер «Шмоне-Бис», для работы таксистом — такси', 3);
    }
    if (!this.active) return;
    // ушёл с работы
    const needType = this.active === 'delivery' ? 'scooter' : 'taxi';
    if (!car || car.type !== needType) {
      this.offT += dt;
      if (this.offT > 25 || pl.dead) { this.stop(pl.dead ? 'Смена сорвана' : 'Ты бросил смену'); return; }
    } else this.offT = 0;
    if (this.active === 'delivery') this.updateDelivery(dt);
    else this.updateTaxi(dt);
  },

  start(kind) {
    this.active = kind;
    this.order = null;
    this.offT = 0;
    Sound.play('pickup', 0.6);
    Game.message(kind === 'delivery' ? '«Шмоне-Бис»: смена началась. Первый заказ уже в приложении!' : 'Такси: ищи пассажиров с жёлтой меткой', 4);
    if (kind === 'delivery') this.newOrder();
  },

  stop(why) {
    if (this.order && this.order.fare) {
      const f = this.order.fare;
      if (f.car) { const c = f.car; c.passenger = null; f.car = null; f.x = c.x + 30; f.y = c.y; World.peds.push(f); }
      f.fare = false; f.ai = 'walk';
    }
    this.active = null; this.order = null;
    Game.message(why + ` · рейтинг ${this.stars().toFixed(1)}★`, 4);
  },

  randomAddress(minD, maxD) {
    const pl = World.player;
    for (let i = 0; i < 60; i++) {
      const a = rand(0, TAU), r = rand(minD, maxD);
      const tx = Math.floor((pl.x + Math.cos(a) * r) / TILE), ty = Math.floor((pl.y + Math.sin(a) * r) / TILE);
      if (City.t(tx, ty) !== T_WALK) continue;
      let nearB = false;
      for (let d = 0; d < 4; d++) if (City.t(tx + DIRS[d].x, ty + DIRS[d].y) === T_BUILD) nearB = true;
      if (!nearB) continue;
      return City.tc(tx, ty);
    }
    return City.places.shuk;
  },

  newOrder() {
    const pl = World.player;
    const rs = City.places.restaurants.slice().sort((a, b) => dist2(a.p.x, a.p.y, pl.x, pl.y) - dist2(b.p.x, b.p.y, pl.x, pl.y));
    const r = pick(rs.slice(0, 3));
    this.order = { stage: 'pickup', rest: r, target: r.p, timer: null };
    Sound.play('phone', 0.4);
  },

  updateDelivery(dt) {
    const o = this.order;
    if (!o) { this.newOrder(); return; }
    const pl = World.player;
    if (o.timer !== null) {
      o.timer -= dt;
      if (o.timer <= 0) {
        this.rating.push(1);
        Sound.play('fail', 0.5);
        Game.message('Клиент отменил заказ: «Где моя еда?!» ★☆☆☆☆', 4);
        this.order = null;
        return;
      }
    }
    if (dist(pl.x, pl.y, o.target.x, o.target.y) > 70) return;
    if (o.stage === 'pickup') {
      const addr = this.randomAddress(900, 2400);
      const d = dist(pl.x, pl.y, addr.x, addr.y);
      o.stage = 'drop'; o.target = addr; o.timer = Math.round(d / 160 + 22); o.total = o.timer;
      Sound.play('door', 0.5);
      Game.message(`Забрал ${o.rest.dish}. Вези клиенту, ${City.districtAt(addr.x, addr.y)}`, 4);
    } else {
      const tip = Math.round(25 * clamp(o.timer / o.total, 0, 1));
      const stars = tip > 15 ? 5 : tip > 8 ? 4 : 3;
      this.rating.push(stars);
      this.deliveries++;
      Game.addMoney(30 + tip);
      Sound.play('coins', 0.7); Sound.play('jJob', 0.5);
      Game.message(`«${pick(CUSTOMER_LINES)}»  +₪${30 + tip} ${'★'.repeat(stars)}`, 5);
      this.order = null;
      this.nextT = 1.5;
    }
  },

  updateTaxi(dt) {
    const pl = World.player;
    const car = pl.car;
    let o = this.order;
    if (!o) {
      // новый пассажир машет рукой
      const p = this.randomAddress(300, 700);
      const f = new Ped(p.x, p.y, { ai: 'idle' });
      f.fare = true;
      World.peds.push(f);
      this.order = o = { stage: 'wait', fare: f, target: f };
      return;
    }
    const f = o.fare;
    if (f.dead) { Game.message('Пассажир... больше не пассажир.', 3); this.order = null; return; }
    if (o.stage === 'wait') {
      o.target = f;
      if (car && car.speed < 40 && dist(car.x, car.y, f.x, f.y) < 130) { f.ai = 'board'; o.stage = 'board'; }
    } else if (o.stage === 'board') {
      if (!car) { f.ai = 'idle'; o.stage = 'wait'; return; }
      if (f.car) {
        const dest = this.randomAddress(1000, 2800);
        const d = dist(pl.x, pl.y, dest.x, dest.y);
        o.stage = 'ride'; o.target = dest; o.timer = Math.round(d / 190 + 25); o.total = o.timer; o.fareSum = Math.round(d / 18);
        Game.message(`Пассажир: «${pick(TAXI_LINES)}»`, 6);
      }
    } else if (o.stage === 'ride') {
      o.timer -= dt;
      if (!car || car.passenger !== f) { this.order = null; f.fare = false; return; }
      if (o.timer <= 0 && !o.late) { o.late = true; Game.message('Пассажир: «Мы опаздываем! Я не буду платить за это!»', 3); }
      if (dist(pl.x, pl.y, o.target.x, o.target.y) < 90 && car.speed < 60) {
        car.passenger = null; f.car = null; f.x = car.x + 30; f.y = car.y; f.ai = 'walk'; f.fare = false; f.target = null;
        World.peds.push(f);
        const pay = o.late ? Math.round(o.fareSum * 0.4) : o.fareSum + Math.round(15 * clamp(o.timer / o.total, 0, 1));
        this.rides++;
        this.rating.push(o.late ? 2 : 5);
        Game.addMoney(pay);
        Sound.play('coins', 0.7); Sound.play('jJob', 0.5);
        Game.message(`Поездка оплачена: +₪${pay}`, 3);
        this.order = null;
      }
    }
  },

  objective() {
    if (!this.active || !this.order) return null;
    return this.order.target;
  },

  text() {
    if (!this.active) return null;
    const o = this.order;
    if (this.active === 'delivery') {
      if (!o) return '«Шмоне-Бис»: ждём заказ…';
      if (o.stage === 'pickup') return `«Шмоне-Бис»: забери заказ — ${o.rest.name}`;
      return `«Шмоне-Бис»: доставь ${o.rest.dish}   ⏱ ${Math.max(0, Math.ceil(o.timer))}`;
    }
    if (!o) return 'Такси: ищем пассажира…';
    if (o.stage === 'wait' || o.stage === 'board') return 'Такси: подбери пассажира (жёлтая метка), остановись рядом';
    return `Такси: вези пассажира   ⏱ ${Math.max(0, Math.ceil(o.timer))}`;
  },
};
