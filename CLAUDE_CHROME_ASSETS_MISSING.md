# Задание для Claude в Chrome: недостающие ассеты (35)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Единое задание: всё, чего пока нет в игре (35) — «Фолькс» Лёвы, Текстура модели: Камень Яффо (известняк), Текстура модели: Светлый камень карнизов, Текстура модели: Бетон, Текстура модели: Белая штукатурка баухауза, Текстура модели: Бежевая штукатурка 1960-х, Текстура модели: Охра (эклектика), Текстура модели: Терракотовая штукатурка церкви, Текстура модели: Коричневая мозаика 1960-х, Текстура модели: Тёмное стекло фасада, Текстура модели: Синее стекло (Азриэли), Текстура модели: Металлические панели, Текстура модели: Черепица (сверху), Текстура модели: Патина купола, Текстура модели: Золото луковицы, Текстура модели: Синий купол со звёздами, Текстура модели: Ставни-«трисим», Текстура модели: Старая деревянная дверь, Текстура модели: Плоская крыша, Текстура модели: Граффити на бетоне, Текстура модели: Ржавый металл, Текстура модели: Красная краска по металлу, Текстура модели: Вода фонтана, Текстура модели: Баухауз: кремовая штукатурка, Текстура модели: Баухауз: пастельно-розовая штукатурка, Текстура модели: Дом 60-х: серая «шуба», Текстура модели: Дом 60-х: облицовка иерусалимским камнем, Текстура модели: Эклектика: лососевая штукатурка, Текстура модели: Эклектика: серо-голубая штукатурка, Текстура модели: Розовая краска балконов («Опера»), Портрет: Сергей Аусбендер, корреспондент 34-го канала, Портрет: ведущая новостей Яэль, у машин — со стадиями повреждений. Файл собирается автоматически.
>
> **Фото.** Для пунктов с пометкой о фото пользователь прикладывает фото —
> прикладывай нужное к каждому такому запросу.

## Сначала — одна картинка на согласование

1. Сгенерируй **только № 346** (`portraits/portrait_ausbender.png`).
2. Покажи её пользователю и спроси: «Так подходит? Продолжать?»
3. **Дальше не иди, пока пользователь не ответит «да».** Если просит
   поправить — допиши его уточнение в конец промпта, сгенерируй заново и
   снова спроси. Потом добавляй это же уточнение к похожим пунктам списка.
4. После «да» — весь список по порядку.

## Главное правило: имя файла

После скачивания каждой картинки **дай файлу имя по номеру из списка**,
например `147_asphalt.png` (номер и имя — в заголовке каждого пункта).
Если браузер не даёт переименовать — запиши в отчёт, какой скачанный файл
какому номеру соответствует. Так картинки встанут на свои места, даже если
порядок собьётся. Лишние варианты не скачивай.

## Как работать в Google Flow

1. Открой https://labs.google/fx/tools/flow. Если нужен вход в аккаунт Google —
   попроси пользователя войти и продолжай после этого.
2. Создай проект (или продолжи прежний) и переключись на **генерацию
   изображений**, 1 результат на запрос, формат — как указано у пункта.
3. Вставь промпт из блока кода **целиком** и запусти.
4. Проверь по чек-листу. Не подходит — сгенерируй ещё раз или допиши в конец
   уточнение («strictly top-down view, solid flat magenta background»).
5. Скачай удачную картинку в полном размере и переходи к следующему пункту.

### Стадии повреждений машин

Если Flow умеет брать готовую картинку как образец — бери целую машину и
короткий промпт «Правка», чтобы машина осталась той же. Если нет — полный
промпт.

### Чек-лист

- Машины, персонажи, объекты: вид **строго сверху**, как с дрона. Машины —
  **носом вверх**, персонажи — **смотрят вправо**. Фон — **сплошной пурпурный
  (#FF00FF)**, без теней, градиента и «шахматки».
- Портреты: карикатура по плечи, однотонный цветной фон с точками.
- Фасады и витрины: **вид строго спереди**, как чертёж, без неба и перспективы.
- Текстуры: **бесшовные** — левый край продолжает правый, верхний — нижний;
  без объекта в центре, без виньетки и без неравномерного света.
- Иллюстрации для щитов: на весь кадр, **без букв**.
- Нигде нет логотипов, водяных знаков и рамок.

### Отчёт в конце

Напиши пользователю, какие номера готовы, какие пропущены и (если не
получилось переименовать) какой файл к какому номеру. Файлы пусть загрузит
в **новую** папку Google Диска (например, «Ассеты ГТА 2») — Claude Code сам
разложит их по местам. Скачивай в **PNG или JPG** (не WebP): картинки WebP
из прошлой партии не загрузились.

---

# Список (35): № 276, 277, 278, 279, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 348, 346, 347

## Машины (4)

### 276. `vehicles/leva_vw.png` — «Фолькс» Лёвы

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. A tired old 1990s German compact hatchback (classic boxy two-box shape), faded pale grey-blue paint with sun-bleached roof, the front left door in a different color (matte primer grey), small dents and rust spots, plain steel wheels, two black roof-rack bars, a cracked plastic mirror held with tape, no badges. A lovable clunker. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 277. `vehicles/leva_vw_d1.png` — «Фолькс» Лёвы — лёгкие повреждения

- [ ] Правка картинки `leva_vw`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `leva_vw`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. A tired old 1990s German compact hatchback (classic boxy two-box shape), faded pale grey-blue paint with sun-bleached roof, the front left door in a different color (matte primer grey), small dents and rust spots, plain steel wheels, two black roof-rack bars, a cracked plastic mirror held with tape, no badges. A lovable clunker. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 278. `vehicles/leva_vw_d2.png` — «Фолькс» Лёвы — тяжёлые повреждения

- [ ] Правка картинки `leva_vw`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `leva_vw`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. A tired old 1990s German compact hatchback (classic boxy two-box shape), faded pale grey-blue paint with sun-bleached roof, the front left door in a different color (matte primer grey), small dents and rust spots, plain steel wheels, two black roof-rack bars, a cracked plastic mirror held with tape, no badges. A lovable clunker. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 279. `vehicles/leva_vw_d3.png` — «Фолькс» Лёвы — сгоревший остов

- [ ] Правка картинки `leva_vw`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `leva_vw`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. A tired old 1990s German compact hatchback (classic boxy two-box shape), faded pale grey-blue paint with sun-bleached roof, the front left door in a different color (matte primer grey), small dents and rust spots, plain steel wheels, two black roof-rack bars, a cracked plastic mirror held with tape, no badges. A lovable clunker. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```


## Текстуры (29)

### 318. `textures/m_stone.png` — Текстура модели: Камень Яффо (известняк)

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Old Jaffa limestone wall: warm golden-beige rough-cut limestone blocks in regular horizontal courses with lighter mortar joints, weathered and sun-bleached.
```

### 319. `textures/m_trim.png` — Текстура модели: Светлый камень карнизов

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Smooth cream-white dressed limestone / lime plaster surface with faint chisel marks, very subtle, almost uniform.
```

### 320. `textures/m_concrete.png` — Текстура модели: Бетон

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Weathered raw grey concrete with horizontal board-formwork lines, rust streaks and dark water stains.
```

### 321. `textures/m_white.png` — Текстура модели: Белая штукатурка баухауза

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. White-painted smooth lime plaster of a Tel Aviv Bauhaus building, slightly weathered, faint hairline cracks and sun-bleached patches.
```

### 322. `textures/m_beige.png` — Текстура модели: Бежевая штукатурка 1960-х

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Beige-grey sand-coloured rough spray stucco of a 1960s Israeli apartment block, light grime streaks.
```

### 323. `textures/m_ochre.png` — Текстура модели: Охра (эклектика)

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Aged ochre lime plaster, warm yellow-orange, patchy, with a few small peeling spots revealing older plaster underneath.
```

### 324. `textures/m_brick.png` — Текстура модели: Терракотовая штукатурка церкви

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Warm terracotta-orange painted plaster of a Spanish baroque church wall, slightly faded and patchy.
```

### 325. `textures/m_brown.png` — Текстура модели: Коричневая мозаика 1960-х

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Facade cladding of small brown and beige square mosaic tiles in a vertical striped pattern, 1960s modernist tower.
```

### 326. `textures/m_glass.png` — Текстура модели: Тёмное стекло фасада

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Dark tinted glass curtain wall with thin aluminium mullions in a regular rectangular grid, faint sky reflections.
```

### 327. `textures/m_glassB.png` — Текстура модели: Синее стекло (Азриэли)

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Blue reflective glass curtain wall with grey mullions in a regular grid, soft reflections of clouds.
```

### 328. `textures/m_metal.png` — Текстура модели: Металлические панели

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Brushed grey aluminium cladding panels with straight seams and rivets.
```

### 329. `textures/m_roofT.png` — Текстура модели: Черепица (сверху)

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Mediterranean terracotta clay roof tiles seen from directly above, slightly weathered, a little lichen.
```

### 330. `textures/m_patina.png` — Текстура модели: Патина купола

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Oxidized green-grey copper and lead roof sheets with standing seams and patina streaks.
```

### 331. `textures/m_gold.png` — Текстура модели: Золото луковицы

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Gold leaf sheet metal with subtle panel seams and warm reflections.
```

### 332. `textures/m_blueroof.png` — Текстура модели: Синий купол со звёздами

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Blue enamel-painted metal dome sheets with small scattered golden stars.
```

### 333. `textures/m_shutter.png` — Текстура модели: Ставни-«трисим»

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Israeli plastic roller shutter: horizontal light grey slats, slightly dirty.
```

### 334. `textures/m_wood.png` — Текстура модели: Старая деревянная дверь

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Old weathered wooden door planks, dark brown, vertical boards with a few iron nails.
```

### 335. `textures/m_roofflat.png` — Текстура модели: Плоская крыша

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Flat roof covered with whitewashed bitumen membrane, patches, seams and stains, seen from above.
```

### 336. `textures/m_graffiti.png` — Текстура модели: Граффити на бетоне

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Colorful street graffiti tags and throw-ups on a grey concrete wall, abandoned building vibe (no readable words).
```

### 337. `textures/m_rust.png` — Текстура модели: Ржавый металл

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Rusty corroded steel sheet with flaking orange-brown rust.
```

### 338. `textures/m_paint_red.png` — Текстура модели: Красная краска по металлу

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Glossy red paint on steel, slightly chipped and faded.
```

### 339. `textures/m_water.png` — Текстура модели: Вода фонтана

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Clear turquoise fountain water surface with gentle ripples seen from above.
```

### 340. `textures/m_bh_cream.png` — Текстура модели: Баухауз: кремовая штукатурка

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Cream off-white lime plaster of a restored Tel Aviv Bauhaus building, smooth, warm tint, a few faint stains.
```

### 341. `textures/m_bh_pastel.png` — Текстура модели: Баухауз: пастельно-розовая штукатурка

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Pale pastel pink plaster of a renovated Bauhaus building in Tel Aviv, smooth and slightly sun-faded.
```

### 342. `textures/m_60_grey.png` — Текстура модели: Дом 60-х: серая «шуба»

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Grey rough pebble-dash / terrazzo-grit stucco of a 1960s Israeli apartment block, dusty, with dark streaks under the windows.
```

### 343. `textures/m_60_stone.png` — Текстура модели: Дом 60-х: облицовка иерусалимским камнем

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Beige Jerusalem-stone cladding panels in a regular grid, slightly worn, 1960s apartment block facade.
```

### 344. `textures/m_ecl_pink.png` — Текстура модели: Эклектика: лососевая штукатурка

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Aged salmon-pink lime plaster of a 1920s eclectic building in Florentin, patchy, with small cracks.
```

### 345. `textures/m_ecl_blue.png` — Текстура модели: Эклектика: серо-голубая штукатурка

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Aged pale blue-grey lime plaster of a 1920s eclectic building, faded and patchy, a few repaired spots.
```

### 348. `textures/m_pinkpaint.png` — Текстура модели: Розовая краска балконов («Опера»)

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Pale salmon-pink painted concrete of balcony parapets on a 1990s Tel Aviv seafront tower, smooth with light weathering and faint drip stains.
```


## Портреты для звонков (2)

### 346. `portraits/portrait_ausbender.png` — Портрет: Сергей Аусбендер, корреспондент 34-го канала

- [ ] Новая картинка, формат квадрат 1:1. **Приложи к запросу фото этого человека** (его даст пользователь) — внешность берётся с фото, стиль — как у остальных героев игры. Без фото не генерируй — спроси пользователя.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Sergey Ausbender, a self-confident TV news correspondent: receding hair combed back, reading glasses low on the nose, dark suit with a loosened tie, a TV microphone in one hand and the other index finger raised, a know-it-all smirk, as if explaining something obvious and completely wrong. Background: dark blue TV studio with glowing screens. Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable.
```

### 347. `portraits/portrait_anchor.png` — Портрет: ведущая новостей Яэль

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Yael, an Israeli evening news anchor in her 30s: big glossy dark hair, red blouse, polite professional smile with one slightly raised eyebrow of disbelief. Background: dark blue TV studio with glowing screens.
```

