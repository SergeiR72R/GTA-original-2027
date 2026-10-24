# Задание для Claude в Chrome: недостающие ассеты (42)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Единое задание: всё, чего пока нет в игре (42) — «Фолькс» Лёвы, у машин — со стадиями повреждений. Файл собирается автоматически.

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

# Список (42): № 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317

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

