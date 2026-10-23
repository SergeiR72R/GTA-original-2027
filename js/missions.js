// Сюжет первой части: «Тель-Авив». Задания выдаёт Ицик «Фалафель» Бараки
// через телефоны-автоматы. Все персонажи и события вымышлены.
'use strict';

const BOSS = 'Ицик «Фалафель»';

const MISSIONS = [
  {
    title: 'Шалом, Тель-Авив',
    phone: null, // стартует сразу
    intro: [
      [BOSS, 'Алло! Ты племянник Бори? Отлично. Боря сказал, ты хорошо водишь.'],
      [BOSS, 'Мне нужен водитель, а не турист. Найди себе машину — любую, никто не обидится. Ну, почти никто.'],
      [BOSS, 'Подъезжай ко мне на Шук а-Кармель. Ларёк с зелёным навесом, не перепутаешь.'],
    ],
    reward: 1000,
    outro: 'Неплохо. Для начала сойдёт.',
    start(m) { m.step = World.player.car ? 1 : 0; },
    update(m) {
      const pl = World.player;
      if (m.step === 0) {
        m.text = 'Угони машину: подойди к ней и нажми F / Enter';
        m.target = nearestCar(pl.x, pl.y);
        if (pl.car) m.step = 1;
      } else {
        m.text = 'Приезжай на Шук а-Кармель';
        m.target = City.places.shuk;
        if (dist(pl.x, pl.y, m.target.x, m.target.y) < 70) return 'ok';
      }
    },
  },
  {
    title: 'Горячая доставка',
    phone: 'phone1',
    intro: [
      [BOSS, 'Вот пакет. Что внутри — не твоё дело. Пахнет фалафелем — и хорошо.'],
      [BOSS, 'Отвези его к часовой башне в Яффо. У тебя 90 секунд, клиент не любит ждать.'],
    ],
    reward: 2500,
    outro: 'Клиент доволен. Значит, и я доволен.',
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
    title: 'Должник из Флорентина',
    phone: 'phone2',
    intro: [
      [BOSS, 'Есть во Флорентине один художник — Гади. Граффити рисует, а долги не отдаёт.'],
      [BOSS, 'Его красный «жук» стоит на улице у баров. Сделай так, чтобы машины у него больше не было.'],
      [BOSS, 'Пистолет лежит за углом от телефона. Только не шуми при копах.'],
    ],
    reward: 3000,
    outro: 'Гади всё понял и уже несёт деньги. Хорошая работа.',
    start(m) {
      const p = City.places.florentinCar;
      const c = new Car(p.x, p.y, 0, { color: 'red', big: true });
      c.mission = 'target';
      c.hp = c.maxHp = 140;
      World.cars.push(c);
      m.car = c;
      m.gun = new Pickup(City.places.pistol.x, City.places.pistol.y, 'pistol', { ammo: 36, once: true });
      World.pickups.push(m.gun);
    },
    update(m) {
      m.text = 'Уничтожь красную машину Гади во Флорентине';
      m.target = m.car;
      if (m.car.dead) { Wanted.set(Math.max(Wanted.level, 1)); return 'ok'; }
    },
    cleanup(m) { if (m.car) m.car.mission = null; },
  },
  {
    title: 'Бухгалтер',
    phone: 'phone1',
    intro: [
      [BOSS, 'Мой бухгалтер, Моше, ждёт в Неве-Цедеке. Его нужно срочно отвезти в Азриэли.'],
      [BOSS, 'У него встреча с очень серьёзными людьми. Не опоздай и не разбей машину — у Моше слабое сердце.'],
    ],
    reward: 3500,
    outro: 'Моше доехал живым и даже не поседел. Ну, почти.',
    start(m) {
      const p = City.places.nevetzedek;
      m.moshe = new Ped(p.x, p.y, { skin: 'manOld', ai: 'idle', hp: 60 });
      m.moshe.mission = 'target';
      World.peds.push(m.moshe);
      m.step = 0;
    },
    update(m, dt) {
      const pl = World.player;
      const mo = m.moshe;
      if (mo.dead) return 'fail:Моше погиб. Ицик будет очень недоволен.';
      if (m.step === 0) {
        m.text = pl.car ? 'Забери Моше в Неве-Цедеке (остановись рядом)' : 'Найди машину и забери Моше в Неве-Цедеке';
        m.target = mo;
        if (pl.car && !pl.car.moto && pl.car.speed < 40 && dist(pl.car.x, pl.car.y, mo.x, mo.y) < 160) { mo.ai = 'board'; m.step = 1; }
      } else if (m.step === 1) {
        m.text = 'Подожди, пока Моше сядет';
        m.target = mo;
        if (!pl.car) { mo.ai = 'idle'; m.step = 0; }
        else if (mo.car) { m.step = 2; m.timer = 100; mo.mission = null; Game.message('Моше: «Только не гони! Ой-вей...»'); }
      } else {
        m.timer -= dt;
        m.text = 'Отвези Моше в Азриэли';
        m.target = City.places.azrieli;
        if (!mo.car || !pl.car || pl.car.passenger !== mo) return 'fail:Ты потерял пассажира!';
        if (pl.car.dead) return 'fail:Машина разбита, Моше в шоке.';
        if (m.timer <= 0) return 'fail:Опоздали на встречу.';
        if (dist(pl.x, pl.y, m.target.x, m.target.y) < 100 && pl.car.speed < 60) {
          // высаживаем
          const c = pl.car;
          c.passenger = null; mo.car = null;
          mo.x = c.x + 30; mo.y = c.y; mo.ai = 'walk'; mo.target = null;
          World.peds.push(mo);
          return 'ok';
        }
      }
    },
    cleanup(m) { if (m.moshe) m.moshe.mission = null; },
  },
  {
    title: 'Шакалы на пляже',
    phone: 'phone2',
    intro: [
      [BOSS, 'Банда «Шакалы» торгует дрянью на моём пляже. На пляже Гордон, у самой воды.'],
      [BOSS, 'Их четверо, и они вооружены. Узи спрятан у спасательной вышки севернее. Пусть больше не возвращаются.'],
    ],
    reward: 5000,
    outro: null,
    start(m) {
      const b = City.places.beach;
      m.gang = [];
      for (let i = 0; i < 4; i++) {
        const home = { x: b.x + rand(-40, 60), y: b.y + i * 70 - 100 };
        const g = new Ped(home.x, home.y, { skin: 'hitman1', ai: 'gang', weapon: i === 0 ? 'uzi' : 'pistol', hp: 70, home });
        g.mission = 'target';
        World.peds.push(g);
        m.gang.push(g);
      }
      m.uzi = new Pickup(City.places.uzi.x, City.places.uzi.y, 'uzi', { ammo: 120, once: true });
      World.pickups.push(m.uzi);
    },
    update(m) {
      const left = m.gang.filter((g) => !g.dead);
      m.text = `Разберись с «Шакалами» на пляже Гордон (осталось: ${left.length})`;
      const pl = World.player;
      let best = null, bd = Infinity;
      for (const g of left) { const d = dist2(g.x, g.y, pl.x, pl.y); if (d < bd) { bd = d; best = g; } }
      m.target = best;
      if (!left.length) return 'ok';
    },
  },
  {
    title: 'Горячий ветер',
    phone: null, // звонок сразу после «Шакалов»
    intro: [
      [BOSS, 'Ты что устроил?! Вся полиция Гуш-Дана на ушах!'],
      [BOSS, 'Сбрось хвост. Если надо — перекрась тачку в мастерской во Флорентине. Потом гони в гараж в порту.'],
    ],
    reward: 10000,
    outro: 'Добро пожаловать в семью, хабиби. Это только начало.',
    start() { Wanted.set(Math.max(Wanted.level, 3)); },
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

function nearestCar(x, y) {
  let best = null, bd = Infinity;
  for (const c of World.cars) {
    if (c.dead || c.police) continue;
    const d = dist2(c.x, c.y, x, y);
    if (d < bd) { bd = d; best = c; }
  }
  return best;
}

const Missions = {
  index: 0,      // следующая миссия
  active: null,  // текущая
  done: false,
  dialog: null,

  reset(index) {
    this.index = index || 0;
    this.active = null;
    this.done = this.index >= MISSIONS.length;
    this.dialog = null;
    this.retry = 1.5;
  },

  // Активный телефон (звонит) — точка из City.places
  phonePlace() {
    if (this.active || this.done || this.dialog) return null;
    const m = MISSIONS[this.index];
    return m && m.phone ? City.places[m.phone] : null;
  },

  call() {
    const def = MISSIONS[this.index];
    Sound.play('phone', 0.8);
    this.dialog = {
      lines: def.intro, i: 0,
      done: () => this.begin(),
      title: def.title,
    };
  },

  begin() {
    const def = MISSIONS[this.index];
    const m = { def, text: '', target: null, timer: null };
    def.start(m);
    this.active = m;
    Game.bigText(def.title, 'Миссия ' + (this.index + 1) + ' из ' + MISSIONS.length);
  },

  retry: 0,

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
    // миссии без телефона Ицик предлагает сам — звонком на мобильный
    if (!this.active && !this.dialog && !this.done && MISSIONS[this.index].phone === null && !pl.dead) {
      this.retry -= dt;
      if (this.retry <= 0) this.call();
    }
    // телефон зазвонил — подходим пешком
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
    Game.bigText('МИССИЯ ВЫПОЛНЕНА', '+' + formatMoney(m.def.reward), '#7CFC9A');
    if (m.def.outro) Game.message(BOSS + ': «' + m.def.outro + '»', 6);
    this.index++;
    Game.save();
    if (this.index >= MISSIONS.length) {
      this.done = true;
      setTimeout(() => Game.partComplete(), 2500);
    } else if (MISSIONS[this.index].phone === null) {
      this.retry = 3;
    } else {
      setTimeout(() => Game.message('Звонит телефон-автомат — ищи мигающую стрелку'), 3500);
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
    return this.phonePlace();
  },
};
