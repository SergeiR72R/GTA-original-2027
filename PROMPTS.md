# Промпты для генерации графики в Gemini

Игра сама подхватит картинки из папки `assets/gen/`. Если какого-то файла нет,
вместо него используется встроенная процедурная графика, так что генерировать
можно по частям, хоть по одной картинке.

## Как пользоваться

1. Скопируйте **общий стиль** (ниже) и добавьте к нему промпт нужного объекта.
2. Сохраните результат в PNG под указанным именем в нужную папку:
   `assets/gen/textures/`, `assets/gen/chars/`, `assets/gen/vehicles/`, `assets/gen/props/`.
3. Запускайте игру через `start.sh` / `start.bat`, а не двойным щелчком по
   `index.html`. Только так игра может сама убрать фон-хромакей и обрезать
   пустые края. Если открывать файл с диска, нужны PNG с уже прозрачным фоном.

### Требования к картинкам

| Что | Фон | Ориентация | Размер |
|---|---|---|---|
| Текстуры (`textures/`) | без фона, бесшовная | вид строго сверху | квадрат, 1024×1024 |
| Персонажи (`chars/`) | **сплошной пурпурный #FF00FF** | вид сверху, **лицом вправо** | квадрат, 1024×1024 |
| Машины (`vehicles/`) | **сплошной пурпурный #FF00FF** | вид сверху, **носом вверх** | вертикальный, например 768×1024 |
| Объекты (`props/`) | **сплошной пурпурный #FF00FF** | вид сверху | квадрат, 1024×1024 |

* Фон должен быть одного цвета, без градиента, теней на фоне и «шахматки».
  Игра определяет цвет фона по углам картинки и вырезает его.
* Если Gemini нарисовал машину боком (носом вправо), игра повернёт её сама.
  Персонажа, который смотрит не вправо, лучше повернуть в любом редакторе.
* На картинке должен быть один объект по центру, без надписей (если надпись
  не указана в промпте), без рамок и без логотипов реальных брендов.

---

## Общий стиль (вставлять в начало каждого промпта)

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized
illustration in the style of a modern indie top-down crime game, crisp outlines,
soft cel shading with light coming from the top-left, warm Mediterranean
daylight colors, high detail but readable at small size, single object centered,
no text, no logos, no watermark.
```

Для персонажей, машин и объектов добавляйте в конец:

```
Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the
background, no gradient, no checkerboard.
```

Для текстур — в конец:

```
Seamless tileable texture, fills the entire square edge to edge, no object in the
center, no perspective, no vignette, no shadow gradient.
```

---

## 1. Текстуры → `assets/gen/textures/`

| Файл | Промпт (после общего стиля) |
|---|---|
| `asphalt.png` | Worn city asphalt road surface seen from above, dark grey with fine aggregate grain, subtle tire wear, a few faint patches and tiny cracks, Tel Aviv street in summer. Area covers about 4×4 meters. |
| `sidewalk.png` | Israeli city sidewalk made of small interlocking concrete paving blocks (grey and faded red-brown rows), slightly dusty, a few stains, seen from above. About 2×2 meters, roughly 12 blocks across. |
| `jaffa_stone.png` | Old Jaffa pavement made of large worn limestone blocks (warm Jerusalem stone, cream and honey colors), irregular joints with sand in them, seen from above. About 2×2 meters. |
| `plaza.png` | Large light beige stone slabs of a modern Tel Aviv city square, subtle variations between slabs, clean joints, seen from above. About 2×2 meters. |
| `sand.png` | Fine Mediterranean beach sand, pale golden, gentle wind ripples, a few footprints and tiny shells, seen from above. About 4×4 meters. |
| `grass.png` | Sun-dried park lawn in Tel Aviv, mix of green and yellowish patches, short grass blades, seen from above. About 4×4 meters. |
| `water.png` | Turquoise-blue Mediterranean sea water seen from above, gentle small waves and sun glints, slightly deeper blue variations. About 4×4 meters. |
| `deck.png` | Weathered wooden boardwalk planks of Tel Aviv port, warm brown, visible plank gaps and nail heads, seen from above. About 2×2 meters. |
| `scrub.png` | Dry Mediterranean scrubland ground: dusty olive-green bushes, dry yellow grass, small stones, seen from above. About 4×4 meters. |
| `roof_gravel.png` | Flat Israeli apartment rooftop surface: white bitumen waterproof coating, slightly dirty with water stains and patches, seen from above. Mostly light, will be tinted in game. |
| `roof_tiles.png` | Terracotta clay roof tiles, rows of orange-red tiles seen straight from above, slight weathering. |
| `roof_metal.png` | Corrugated metal warehouse roof seen from above, light grey with parallel ridges, a little rust. |

---

## 2. Персонажи → `assets/gen/chars/`

Для всех персонажей добавляйте после общего стиля:

```
A single person seen from directly above (bird's-eye view, top of the head and
shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the
front of the body point to the right side of the image), arms relaxed.
Character fills about 70% of the image.
```

Для варианта с оружием (`*_gun.png`) замените «arms relaxed» на:
`both arms extended forward to the right holding a compact pistol`.

### Главный герой и сюжетные персонажи

| Файл | Кто это | Промпт |
|---|---|---|
| `player.png` | **Лёва Гольдман**, новый репатриант из Петербурга | Young man in his late 20s, short light-brown hair, wearing a white-and-navy horizontally striped sailor shirt (telnyashka), dark blue jeans, white sneakers, a small backpack strap visible. |
| `player_gun.png` | Лёва с пистолетом | То же + вариант с оружием. |
| `itzik.png` | **Ицик «Фалафель»**, хозяин ларька на Шуке | Stocky bald man in his 50s with a thick black mustache, green short-sleeve shirt with an apron, gold watch, cheerful market vendor. |
| `moshe.png` | **Моше**, бухгалтер | Thin elderly man with a black kippah, white button-up shirt, holding a worn leather briefcase, glasses. |
| `shmulik.png` | **Шмулик**, хозяин квартиры | Chubby middle-aged man in a tank top and shorts, flip-flops, gold chain, holding a phone and a bunch of keys. |
| `dvora.png` | **Двора**, учительница ульпана | Woman in her 60s with short curly grey hair, colorful scarf, holding a stack of Hebrew textbooks. |
| `shabak.png` | **Дани**, куратор из Шабака | Fit man in his 40s, plain dark polo shirt and dark trousers, short dark hair, sunglasses, small earpiece, discreet. |
| `police.png` / `police_gun.png` | Израильский полицейский | Israeli police officer in a dark navy-blue uniform with light-blue shoulder details, dark cap, utility belt. |

### Фракции

| Файл | Фракция | Промпт |
|---|---|---|
| `russian.png` / `russian_gun.png` | **Бригада «Одесса»** (Рамат-Ган) | Tough man with a shaved head, black leather jacket over a black t-shirt, thick gold chain, dark trousers, pale skin, intimidating 1990s-gangster vibe. |
| `russian_boss.png` | **Сёма Кац**, глава «Одессы» | Heavy-set man in his 50s, shaved head, black leather coat over a burgundy silk shirt, several gold rings and a big gold chain, smug look. |
| `arab.png` / `arab_gun.png` | **Клан Аль-Бахар** (Яффо) | Young man in a white tracksuit with black side stripes, short black hair with a neat fade, dark sunglasses, white sneakers, confident stance. |
| `arab_boss.png` | **Абу-Карим**, глава клана | Dignified man in his 60s with a short grey beard, cream-colored linen suit, prayer beads in one hand, calm and authoritative. |
| `lions.png` / `lions_gun.png` | **«Львы Гондэра»** (юг Тель-Авива) | Young Ethiopian-Israeli man, short black hair, yellow hoodie with green stripes along the sleeves, black joggers, stylish sneakers, friendly but tough look. Respectful, non-caricatured depiction. |
| `lions_boss.png` | **Абеба**, лидер «Львов» | Ethiopian-Israeli man in his early 30s, short neat hair and trimmed beard, olive bomber jacket over a yellow t-shirt, headphones around the neck (he runs a music studio). Respectful, non-caricatured depiction. |
| `iran.png` / `iran_gun.png` | **Иранская сеть** (агенты) | Man in a plain grey suit with a dark tie, short black hair, short dark beard, dark sunglasses, anonymous secret-agent look. |

### Прохожие (`civ_1.png` … `civ_12.png`)

| Файл | Промпт |
|---|---|
| `civ_1.png` | Young Tel Aviv woman with long dark hair, colorful summer dress, sunglasses on her head, tote bag. |
| `civ_2.png` | Haredi (ultra-Orthodox) man in a black suit and wide-brimmed black hat, white shirt, side curls. |
| `civ_3.png` | Israeli soldier in olive-green IDF uniform with a rifle slung across the back, beret on the shoulder strap. |
| `civ_4.png` | Older man with a white crocheted kippah, short-sleeve checked shirt, carrying a plastic shopping bag. |
| `civ_5.png` | Young hipster man with a beard and man-bun, tank top, shorts, holding an iced coffee. |
| `civ_6.png` | Elderly Russian-speaking woman with dyed red hair, cardigan, pushing a small shopping trolley. |
| `civ_7.png` | Teenage boy with a cap backwards, oversized t-shirt, riding pose holding an electric scooter handle. |
| `civ_8.png` | Woman in a modest long skirt and headscarf (tichel), carrying a baby carrier. |
| `civ_9.png` | Middle-aged office worker in a light blue shirt with rolled sleeves, lanyard badge, phone in hand. |
| `civ_10.png` | Beach-goer man in swim shorts with a towel on the shoulder and a pair of matkot paddles. |
| `civ_11.png` | Arab-Israeli woman in a stylish hijab and long coat, holding shopping bags. Respectful depiction. |
| `civ_12.png` | Tourist with a sun hat, camera around the neck, sunburned shoulders, map in hand. |
| `cat.png` | Skinny Tel Aviv street cat, ginger tabby, seen from above, walking to the right. |

---

## 3. Машины → `assets/gen/vehicles/`

Для всех машин добавляйте после общего стиля:

```
A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE
VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly
visible, generic design without any real brand badges or logos.
```

| Файл | Промпт |
|---|---|
| `sedan_1.png` | Generic white compact family sedan, slightly dusty. |
| `sedan_2.png` | Generic silver sedan. |
| `sedan_3.png` | Generic dark grey sedan with a small dent on the door. |
| `sedan_4.png` | Generic dark blue sedan. |
| `hatch_1.png` | Small white city hatchback. |
| `hatch_2.png` | Small red city hatchback. |
| `hatch_3.png` | Old beige hatchback from the 1990s, faded paint. |
| `suv_1.png` | White mid-size SUV with roof rails. |
| `suv_2.png` | Black mid-size SUV with tinted windows. |
| `lux.png` | Long black luxury executive sedan with tinted windows and chrome details (gangster car of the «Одесса» brigade). |
| `taxi.png` | White sedan taxi with a yellow roof sign that reads «מונית» in Hebrew. |
| `police.png` | Israeli police SUV: white body with blue and fluorescent yellow-green Battenburg-style side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood. |
| `ambulance.png` | White emergency ambulance van with red stripes and orange roof lights, generic red cross-free medical markings. |
| `van.png` | White delivery van, plain. |
| `van_iran.png` | Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. |
| `pickup.png` | White pickup truck with an open cargo bed containing a few crates (Al-Bahar clan). |
| `sherut.png` | Yellow shared minibus taxi (sherut) with a big route number «4» on the roof. |
| `bus.png` | Green-and-white Israeli city bus, long, with roof air-conditioning units, generic, no company logo. |
| `garbage.png` | Green municipal garbage truck with a yellow stripe at the back. |
| `scooter.png` | Delivery motor scooter with a big orange insulated food box on the back reading «8bis». |
| `moto.png` | Black sport motorcycle. |
| `hatch_lions.png` | Yellow tuned hatchback with a green racing stripe along the middle (Lions of Gondar crew). |

---

## 4. Объекты улиц → `assets/gen/props/`

| Файл | Промпт |
|---|---|
| `palm.png` | Date palm tree seen from directly above: radial green fronds around a brown center, a few orange date clusters. |
| `ficus.png` | Large ficus street tree crown seen from above, dense round dark-green foliage. |
| `bougainvillea.png` | Bougainvillea bush seen from above, bright magenta-pink flowers over green leaves. |
| `bottle_cage.png` | Israeli plastic bottle recycling cage seen from above: square metal mesh cage painted yellow, full of plastic bottles. |
| `trash_bin.png` | Large green municipal garbage container on wheels, seen from above, lid closed. |
| `bus_stop.png` | Israeli city bus stop shelter seen from above: long transparent roof panel on a metal frame with a bench, wider than tall. |
| `umbrella.png` | Beach umbrella seen from above, alternating white and turquoise segments. |
| `lifeguard_tower.png` | Tel Aviv beach lifeguard hut on stilts seen from above, white with a red stripe on the roof. |
| `market_stall.png` | Market stall at Shuk HaCarmel seen from above: colorful striped awning covering crates of fruit and spices. |

---

## Советы

* Генерируйте все машины в одном чате: так Gemini лучше держит единый стиль.
  Можно начать с фразы «Use exactly the same art style as the previous image».
* Если персонаж получился «в изометрии» (видно лицо спереди), добавьте:
  `strictly from above, like a drone shot, we see the top of the head`.
* Можно генерировать сразу несколько вариантов и класть лучший.
* Текстуры проверяйте на бесшовность: в игре они повторяются плиткой.
