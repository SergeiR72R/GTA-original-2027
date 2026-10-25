# Задание для Claude в Chrome: недостающие ассеты (73)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Единое задание: всё, чего пока нет в игре (73) — «Фолькс» Лёвы, Текстура модели: Камень Яффо (известняк), Текстура модели: Светлый камень карнизов, Текстура модели: Бетон, Текстура модели: Белая штукатурка баухауза, Текстура модели: Бежевая штукатурка 1960-х, Текстура модели: Охра (эклектика), Текстура модели: Терракотовая штукатурка церкви, Текстура модели: Коричневая мозаика 1960-х, Текстура модели: Тёмное стекло фасада, Текстура модели: Синее стекло (Азриэли), Текстура модели: Металлические панели, Текстура модели: Черепица (сверху), Текстура модели: Патина купола, Текстура модели: Золото луковицы, Текстура модели: Синий купол со звёздами, Текстура модели: Ставни-«трисим», Текстура модели: Старая деревянная дверь, Текстура модели: Плоская крыша, Текстура модели: Граффити на бетоне, Текстура модели: Ржавый металл, Текстура модели: Красная краска по металлу, Текстура модели: Вода фонтана, Текстура модели: Баухауз: кремовая штукатурка, Текстура модели: Баухауз: пастельно-розовая штукатурка, Текстура модели: Дом 60-х: серая «шуба», Текстура модели: Дом 60-х: облицовка иерусалимским камнем, Текстура модели: Эклектика: лососевая штукатурка, Текстура модели: Эклектика: серо-голубая штукатурка, Текстура модели: Розовая краска балконов («Опера»), Портрет: Сергей Аусбендер, аналитик 12-го канала, Портрет: ведущая новостей Яэль, у машин — со стадиями повреждений. Файл собирается автоматически.

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

# Список (73): № 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 348, 346, 347

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


## Персонажи (38)

### 280. `chars/player_dead.png` — Лёва Гольдман (герой) — убитый

- [ ] Приложи к запросу референс **`ref_player.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_player.png (Лёва Гольдман (герой)). Draw EXACTLY this character from ref_player.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Young man in his late 20s, short light-brown hair, wearing a white-and-navy horizontally striped sailor shirt, dark blue jeans, white sneakers, a small backpack strap visible. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 281. `chars/police_dead.png` — Полицейский — убитый

- [ ] Приложи к запросу референс **`ref_police.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_police.png (Полицейский). Draw EXACTLY this character from ref_police.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Israeli police officer in a dark navy-blue uniform with light-blue shoulder details, dark cap, utility belt. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 282. `chars/russian_dead.png` — Боец бригады «Одесса» — убитый

- [ ] Приложи к запросу референс **`ref_russian.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_russian.png (Боец бригады «Одесса»). Draw EXACTLY this character from ref_russian.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Tough man with a shaved head, black leather jacket over a black t-shirt, thick gold chain, dark trousers, pale skin, 1990s-gangster vibe. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 283. `chars/russian_boss_dead.png` — Сёма Кац, глава «Одессы» — убитый

- [ ] Приложи к запросу референс **`ref_russian_boss.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_russian_boss.png (Сёма Кац, глава «Одессы»). Draw EXACTLY this character from ref_russian_boss.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Heavy-set man in his 50s, shaved head, black leather coat over a burgundy silk shirt, several gold rings and a big gold chain, smug look. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 284. `chars/arab_dead.png` — Боец клана Аль-Бахар — убитый

- [ ] Приложи к запросу референс **`ref_arab.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_arab.png (Боец клана Аль-Бахар). Draw EXACTLY this character from ref_arab.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Young man in a white tracksuit with black side stripes, short black hair with a neat fade, dark sunglasses, white sneakers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 285. `chars/arab_boss_dead.png` — Абу-Карим, глава клана — убитый

- [ ] Приложи к запросу референс **`ref_arab_boss.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_arab_boss.png (Абу-Карим, глава клана). Draw EXACTLY this character from ref_arab_boss.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Dignified man in his 60s with a short grey beard, cream-colored linen suit, prayer beads in one hand, calm and authoritative. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 286. `chars/lions_dead.png` — Боец «Львов Гондэра» — убитый

- [ ] Приложи к запросу референс **`ref_lions.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_lions.png (Боец «Львов Гондэра»). Draw EXACTLY this character from ref_lions.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Young Ethiopian-Israeli man, short black hair, yellow hoodie with green stripes along the sleeves, black joggers, stylish sneakers. Respectful, non-caricatured depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 287. `chars/lions_boss_dead.png` — Абеба, лидер «Львов» — убитый

- [ ] Приложи к запросу референс **`ref_lions_boss.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_lions_boss.png (Абеба, лидер «Львов»). Draw EXACTLY this character from ref_lions_boss.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Ethiopian-Israeli man in his early 30s, short neat hair and trimmed beard, olive bomber jacket over a yellow t-shirt, headphones around the neck. Respectful, non-caricatured depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 288. `chars/iran_dead.png` — Иранский агент — убитый

- [ ] Приложи к запросу референс **`ref_iran.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_iran.png (Иранский агент). Draw EXACTLY this character from ref_iran.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Man in a plain grey suit with a dark tie, short black hair, short dark beard, dark sunglasses, anonymous secret-agent look. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 289. `chars/shabak_dead.png` — Дани из Шабака — убитый

- [ ] Приложи к запросу референс **`ref_shabak.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_shabak.png (Дани из Шабака). Draw EXACTLY this character from ref_shabak.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Fit man in his 40s, plain dark polo shirt and dark trousers, short dark hair, sunglasses, small earpiece, discreet. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 290. `chars/itzik_dead.png` — Ицик «Фалафель» — убитый

- [ ] Приложи к запросу референс **`ref_itzik.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_itzik.png (Ицик «Фалафель»). Draw EXACTLY this character from ref_itzik.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Stocky bald man in his 50s with a thick black mustache, green short-sleeve shirt with an apron, gold watch, cheerful market vendor. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 291. `chars/moshe_dead.png` — Моше, бухгалтер — убитый

- [ ] Приложи к запросу референс **`ref_moshe.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_moshe.png (Моше, бухгалтер). Draw EXACTLY this character from ref_moshe.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Thin elderly man with a black kippah, white button-up shirt, holding a worn leather briefcase, glasses. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 292. `chars/shmulik_dead.png` — Шмулик, хозяин квартиры — убитый

- [ ] Приложи к запросу референс **`ref_shmulik.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_shmulik.png (Шмулик, хозяин квартиры). Draw EXACTLY this character from ref_shmulik.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Chubby middle-aged man in a tank top and shorts, flip-flops, gold chain, holding a phone and a bunch of keys. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 293. `chars/dvora_dead.png` — Двора, учительница ульпана — убитый

- [ ] Приложи к запросу референс **`ref_dvora.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_dvora.png (Двора, учительница ульпана). Draw EXACTLY this character from ref_dvora.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Woman in her 60s with short curly grey hair, colorful scarf, holding a stack of textbooks. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 294. `chars/civ_1_dead.png` — Прохожая — убитый

- [ ] Приложи к запросу референс **`ref_civ_1.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_1.png (Прохожая). Draw EXACTLY this character from ref_civ_1.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Young Tel Aviv woman with long dark hair, colorful summer dress, sunglasses on her head, tote bag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 295. `chars/civ_2_dead.png` — Харедим — убитый

- [ ] Приложи к запросу референс **`ref_civ_2.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_2.png (Харедим). Draw EXACTLY this character from ref_civ_2.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Ultra-Orthodox man in a black suit and wide-brimmed black hat, white shirt, side curls. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 296. `chars/civ_3_dead.png` — Солдат — убитый

- [ ] Приложи к запросу референс **`ref_civ_3.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_3.png (Солдат). Draw EXACTLY this character from ref_civ_3.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Israeli soldier in olive-green uniform with a rifle slung across the back. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 297. `chars/civ_4_dead.png` — Пожилой в кипе — убитый

- [ ] Приложи к запросу референс **`ref_civ_4.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_4.png (Пожилой в кипе). Draw EXACTLY this character from ref_civ_4.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Older man with a white crocheted kippah, short-sleeve checked shirt, carrying a plastic shopping bag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 298. `chars/civ_5_dead.png` — Хипстер — убитый

- [ ] Приложи к запросу референс **`ref_civ_5.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_5.png (Хипстер). Draw EXACTLY this character from ref_civ_5.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Young hipster man with a beard and man-bun, tank top, shorts, holding an iced coffee. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 299. `chars/civ_6_dead.png` — Бабушка с тележкой — убитый

- [ ] Приложи к запросу референс **`ref_civ_6.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_6.png (Бабушка с тележкой). Draw EXACTLY this character from ref_civ_6.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Elderly woman with dyed red hair, cardigan, pushing a small shopping trolley. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 300. `chars/civ_7_dead.png` — Подросток — убитый

- [ ] Приложи к запросу референс **`ref_civ_7.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_7.png (Подросток). Draw EXACTLY this character from ref_civ_7.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Teenage boy with a cap worn backwards, oversized t-shirt, holding an electric scooter handle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 301. `chars/civ_8_dead.png` — Женщина в тихеле — убитый

- [ ] Приложи к запросу референс **`ref_civ_8.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_8.png (Женщина в тихеле). Draw EXACTLY this character from ref_civ_8.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Woman in a modest long skirt and headscarf (tichel), carrying a baby carrier. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 302. `chars/civ_9_dead.png` — Офисный работник — убитый

- [ ] Приложи к запросу референс **`ref_civ_9.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_9.png (Офисный работник). Draw EXACTLY this character from ref_civ_9.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Middle-aged office worker in a light blue shirt with rolled sleeves, lanyard badge, phone in hand. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 303. `chars/civ_10_dead.png` — Пляжник с маткот — убитый

- [ ] Приложи к запросу референс **`ref_civ_10.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_10.png (Пляжник с маткот). Draw EXACTLY this character from ref_civ_10.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Beach-goer man in swim shorts with a towel on the shoulder and a pair of beach paddles. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 304. `chars/civ_11_dead.png` — Женщина в хиджабе — убитый

- [ ] Приложи к запросу референс **`ref_civ_11.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_11.png (Женщина в хиджабе). Draw EXACTLY this character from ref_civ_11.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Woman in a stylish hijab and long coat, holding shopping bags. Respectful depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 305. `chars/civ_12_dead.png` — Турист — убитый

- [ ] Приложи к запросу референс **`ref_civ_12.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_civ_12.png (Турист). Draw EXACTLY this character from ref_civ_12.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Tourist with a sun hat, camera around the neck, sunburned shoulders, map in hand. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 306. `chars/garik_dead.png` — Гарик — убитый

- [ ] Приложи к запросу референс **`ref_garik.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_garik.png (Гарик). Draw EXACTLY this character from ref_garik.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Young man with messy dark curly hair, black leather jacket over a red t-shirt, thin gold chain, dark jeans, flashy sneakers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 307. `chars/karim_dead.png` — Карим — убитый

- [ ] Приложи к запросу референс **`ref_karim.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_karim.png (Карим). Draw EXACTLY this character from ref_karim.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Young man with short black hair, plain white hoodie, grey sweatpants, a bit of rope still around one wrist. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 308. `chars/roza_dead.png` — Роза Львовна — убитый

- [ ] Приложи к запросу референс **`ref_roza.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_roza.png (Роза Львовна). Draw EXACTLY this character from ref_roza.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Elderly woman with voluminous auburn curls, purple blouse, long dark skirt, a big handbag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 309. `chars/yoav_dead.png` — Журналист Йоав — убитый

- [ ] Приложи к запросу референс **`ref_yoav.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_yoav.png (Журналист Йоав). Draw EXACTLY this character from ref_yoav.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Man in his 30s with tousled brown hair and glasses, grey hoodie, press badge on a lanyard, laptop bag across the body. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 310. `chars/baba_dead.png` — Бабушка Хая — убитый

- [ ] Приложи к запросу референс **`ref_baba.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_baba.png (Бабушка Хая). Draw EXACTLY this character from ref_baba.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Very old woman with short white curly hair, lilac cardigan, sitting-ready posture, holding a cane. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 311. `chars/protester_dead.png` — Протестующий — убитый

- [ ] Приложи к запросу референс **`ref_protester.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_protester.png (Протестующий). Draw EXACTLY this character from ref_protester.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Young protester in a blue t-shirt holding a large blue-and-white flag on a pole over the shoulder. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 312. `chars/supporter_dead.png` — Сторонник правительства — убитый

- [ ] Приложи к запросу референс **`ref_supporter.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_supporter.png (Сторонник правительства). Draw EXACTLY this character from ref_supporter.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Man in a dark-blue cap and white t-shirt, holding a blue-and-white flag, angry posture. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 313. `chars/mechanic_dead.png` — Механик — убитый

- [ ] Приложи к запросу референс **`ref_mechanic.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_mechanic.png (Механик). Draw EXACTLY this character from ref_mechanic.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Car mechanic in grey oil-stained overalls holding a large wrench. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 314. `chars/runner_dead.png` — Беглец-киоскёр — убитый

- [ ] Приложи к запросу референс **`ref_runner.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_runner.png (Беглец-киоскёр). Draw EXACTLY this character from ref_runner.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. Skinny man in an orange t-shirt and shorts, running pose with one arm forward. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 315. `chars/dima_dead.png` — Дима — убитый

- [ ] Приложи к запросу референс **`ref_dima.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_dima.png (Дима). Draw EXACTLY this character from ref_dima.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. A man wearing grey t-shirt, dark jeans, sneakers, phone in hand. Same face and build as the existing sprite of this character. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 316. `chars/danis_dead.png` — Данис — убитый

- [ ] Приложи к запросу референс **`ref_danis.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_danis.png (Данис). Draw EXACTLY this character from ref_danis.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. A man wearing black t-shirt, light jeans, white sneakers, car keys in hand. Same face and build as the existing sprite of this character. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 317. `chars/semyon_dead.png` — Семён — убитый

- [ ] Приложи к запросу референс **`ref_semyon.png`** из архива `hamsin-refs-dead.zip` (живой персонаж) и используй короткий промпт «Правка». Если приложить картинку нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Use the attached reference image ref_semyon.png (Семён). Draw EXACTLY this character from ref_semyon.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width. A man wearing white t-shirt, shorts, flip-flops. Same face and build as the existing sprite of this character. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
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

### 346. `portraits/portrait_ausbender.png` — Портрет: Сергей Аусбендер, аналитик 12-го канала

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Sergey Ausbender, a self-confident TV political analyst in his 50s: receding hair combed back, reading glasses low on the nose, dark suit with a loosened tie, raised index finger and a know-it-all smirk, as if explaining something obvious and completely wrong. Background: dark blue TV studio with glowing screens.
```

### 347. `portraits/portrait_anchor.png` — Портрет: ведущая новостей Яэль

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Yael, an Israeli evening news anchor in her 30s: big glossy dark hair, red blouse, polite professional smile with one slightly raised eyebrow of disbelief. Background: dark blue TV studio with glowing screens.
```

