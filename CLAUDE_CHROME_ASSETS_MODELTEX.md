# Задание для Claude в Chrome: текстуры 3D-моделей зданий (22)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Бесшовные текстуры материалов для моделей знаковых зданий и типовых домов
> (камень, штукатурка, стекло, черепица, патина…). Картинка должна
> бесшовно повторяться по краям — без рамки и без предмета в центре.
> План: docs/PLAN_TEXTURES.md.

## Сначала — одна картинка на согласование

1. Сгенерируй **только № 318** (`textures/m_stone.png`).
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

# Список (22): № 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339

## Текстуры (22)

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

