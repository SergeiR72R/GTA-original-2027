# Задание для Claude в Chrome: недостающие ассеты (99)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Это всё, чего пока нет в игре: старые картинки, которые не получились или
> пропущены, новые для главы 1 и кадры ходьбы героев. Машины — в реалистичном
> стиле. Файл собирается
> автоматически.

## Сначала — одна картинка на согласование

1. Сгенерируй **только № 9** (`vehicles/sedan_3.png`).
2. Покажи её пользователю и спроси: «Так подходит? Продолжать?»
3. **Дальше не иди, пока пользователь не ответит «да».** Если просит
   поправить (реалистичнее, другой ракурс, цвет) — допиши его уточнение в
   конец промпта, сгенерируй заново и снова спроси. Потом добавляй это же
   уточнение ко всем остальным машинам.
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

# Список (99): № 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 14, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 47, 48, 50, 51, 53, 54, 55, 56, 58, 59, 60, 61, 62, 63, 64, 66, 190, 191, 192, 193, 194, 181, 182, 183, 184, 185, 186, 187, 188, 189, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 174, 175, 176, 177, 178, 179, 180, 209, 210, 211, 212, 213, 214, 215, 216, 217

## Машины (48)

### 2. `vehicles/sedan_1_d1.png` — Седан белый — лёгкие повреждения

- [ ] Правка картинки `sedan_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic white compact family sedan, slightly dusty. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 3. `vehicles/sedan_1_d2.png` — Седан белый — тяжёлые повреждения

- [ ] Правка картинки `sedan_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic white compact family sedan, slightly dusty. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 4. `vehicles/sedan_1_d3.png` — Седан белый — сгоревший остов

- [ ] Правка картинки `sedan_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic white compact family sedan, slightly dusty. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 6. `vehicles/sedan_2_d1.png` — Седан серебристый — лёгкие повреждения

- [ ] Правка картинки `sedan_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic silver sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 7. `vehicles/sedan_2_d2.png` — Седан серебристый — тяжёлые повреждения

- [ ] Правка картинки `sedan_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic silver sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 8. `vehicles/sedan_2_d3.png` — Седан серебристый — сгоревший остов

- [ ] Правка картинки `sedan_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic silver sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 9. `vehicles/sedan_3.png` — Седан тёмно-серый

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 10. `vehicles/sedan_3_d1.png` — Седан тёмно-серый — лёгкие повреждения

- [ ] Правка картинки `sedan_3`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_3`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 11. `vehicles/sedan_3_d2.png` — Седан тёмно-серый — тяжёлые повреждения

- [ ] Правка картинки `sedan_3`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_3`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 12. `vehicles/sedan_3_d3.png` — Седан тёмно-серый — сгоревший остов

- [ ] Правка картинки `sedan_3`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_3`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 14. `vehicles/sedan_4_d1.png` — Седан тёмно-синий — лёгкие повреждения

- [ ] Правка картинки `sedan_4`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_4`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark blue sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 29. `vehicles/suv_1.png` — Джип белый

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 30. `vehicles/suv_1_d1.png` — Джип белый — лёгкие повреждения

- [ ] Правка картинки `suv_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 31. `vehicles/suv_1_d2.png` — Джип белый — тяжёлые повреждения

- [ ] Правка картинки `suv_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 32. `vehicles/suv_1_d3.png` — Джип белый — сгоревший остов

- [ ] Правка картинки `suv_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 33. `vehicles/suv_2.png` — Джип чёрный

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 34. `vehicles/suv_2_d1.png` — Джип чёрный — лёгкие повреждения

- [ ] Правка картинки `suv_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 35. `vehicles/suv_2_d2.png` — Джип чёрный — тяжёлые повреждения

- [ ] Правка картинки `suv_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 36. `vehicles/suv_2_d3.png` — Джип чёрный — сгоревший остов

- [ ] Правка картинки `suv_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 37. `vehicles/lux.png` — Чёрный лимузин бригады «Одесса»

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 38. `vehicles/lux_d1.png` — Чёрный лимузин бригады «Одесса» — лёгкие повреждения

- [ ] Правка картинки `lux`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 39. `vehicles/lux_d2.png` — Чёрный лимузин бригады «Одесса» — тяжёлые повреждения

- [ ] Правка картинки `lux`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 40. `vehicles/lux_d3.png` — Чёрный лимузин бригады «Одесса» — сгоревший остов

- [ ] Правка картинки `lux`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 41. `vehicles/taxi.png` — Такси

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 42. `vehicles/taxi_d1.png` — Такси — лёгкие повреждения

- [ ] Правка картинки `taxi`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `taxi`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 43. `vehicles/taxi_d2.png` — Такси — тяжёлые повреждения

- [ ] Правка картинки `taxi`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `taxi`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 44. `vehicles/taxi_d3.png` — Такси — сгоревший остов

- [ ] Правка картинки `taxi`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `taxi`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 47. `vehicles/police_d2.png` — Полиция — тяжёлые повреждения

- [ ] Правка картинки `police`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `police`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Israeli police SUV: white body with blue and fluorescent yellow-green checkered side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 48. `vehicles/police_d3.png` — Полиция — сгоревший остов

- [ ] Правка картинки `police`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `police`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Israeli police SUV: white body with blue and fluorescent yellow-green checkered side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 50. `vehicles/ambulance_d1.png` — Скорая — лёгкие повреждения

- [ ] Правка картинки `ambulance`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `ambulance`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White emergency ambulance van with red stripes and orange roof lights, generic medical markings without any cross or star symbol. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 51. `vehicles/ambulance_d2.png` — Скорая — тяжёлые повреждения

- [ ] Правка картинки `ambulance`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `ambulance`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White emergency ambulance van with red stripes and orange roof lights, generic medical markings without any cross or star symbol. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 53. `vehicles/van.png` — Фургон

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 54. `vehicles/van_d1.png` — Фургон — лёгкие повреждения

- [ ] Правка картинки `van`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 55. `vehicles/van_d2.png` — Фургон — тяжёлые повреждения

- [ ] Правка картинки `van`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 56. `vehicles/van_d3.png` — Фургон — сгоревший остов

- [ ] Правка картинки `van`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 58. `vehicles/van_iran_d1.png` — Фургон иранских агентов — лёгкие повреждения

- [ ] Правка картинки `van_iran`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van_iran`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 59. `vehicles/van_iran_d2.png` — Фургон иранских агентов — тяжёлые повреждения

- [ ] Правка картинки `van_iran`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van_iran`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 60. `vehicles/van_iran_d3.png` — Фургон иранских агентов — сгоревший остов

- [ ] Правка картинки `van_iran`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van_iran`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 61. `vehicles/pickup.png` — Пикап клана Аль-Бахар

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 62. `vehicles/pickup_d1.png` — Пикап клана Аль-Бахар — лёгкие повреждения

- [ ] Правка картинки `pickup`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 63. `vehicles/pickup_d2.png` — Пикап клана Аль-Бахар — тяжёлые повреждения

- [ ] Правка картинки `pickup`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 64. `vehicles/pickup_d3.png` — Пикап клана Аль-Бахар — сгоревший остов

- [ ] Правка картинки `pickup`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 66. `vehicles/sherut_d1.png` — Шерут (маршрутка) — лёгкие повреждения

- [ ] Правка картинки `sherut`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sherut`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Yellow shared minibus taxi with a big route number «4» painted on the roof (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 190. `vehicles/truck.png` — Тягач с контейнером

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 191. `vehicles/truck_d1.png` — Тягач с контейнером — лёгкие повреждения

- [ ] Правка картинки `truck`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `truck`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 192. `vehicles/truck_d2.png` — Тягач с контейнером — тяжёлые повреждения

- [ ] Правка картинки `truck`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `truck`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 193. `vehicles/truck_d3.png` — Тягач с контейнером — сгоревший остов

- [ ] Правка картинки `truck`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `truck`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 194. `vehicles/barrel.png` — Бочка с топливом

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark.  A single red steel fuel drum seen from directly above: round lid with two caps and a yellow hazard triangle, metal rings, filling about 70% of the image. Square image. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Персонажи (21)

### 181. `chars/garik.png` — Гарик

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man with messy dark curly hair, black leather jacket over a red t-shirt, thin gold chain, dark jeans, flashy sneakers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 182. `chars/karim.png` — Карим

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man with short black hair, plain white hoodie, grey sweatpants, a bit of rope still around one wrist. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 183. `chars/roza.png` — Роза Львовна

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Elderly woman with voluminous auburn curls, purple blouse, long dark skirt, a big handbag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 184. `chars/yoav.png` — Журналист Йоав

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Man in his 30s with tousled brown hair and glasses, grey hoodie, press badge on a lanyard, laptop bag across the body. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 185. `chars/baba.png` — Бабушка Хая

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Very old woman with short white curly hair, lilac cardigan, sitting-ready posture, holding a cane. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 186. `chars/protester.png` — Протестующий

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young protester in a blue t-shirt holding a large blue-and-white flag on a pole over the shoulder. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 187. `chars/supporter.png` — Сторонник правительства

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Man in a dark-blue cap and white t-shirt, holding a blue-and-white flag, angry posture. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 188. `chars/mechanic.png` — Механик

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Car mechanic in grey oil-stained overalls holding a large wrench. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 189. `chars/runner.png` — Беглец-киоскёр

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Skinny man in an orange t-shirt and shorts, running pose with one arm forward. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 218. `chars/player_walk1.png` — Лёва — шаг левой

- [ ] Правка картинки `player`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `player`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man in his late 20s, short light-brown hair, wearing a white-and-navy horizontally striped sailor shirt, dark blue jeans, white sneakers, a small backpack strap visible. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back.
```

### 219. `chars/player_walk2.png` — Лёва — шаг правой

- [ ] Правка картинки `player`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `player`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man in his late 20s, short light-brown hair, wearing a white-and-navy horizontally striped sailor shirt, dark blue jeans, white sneakers, a small backpack strap visible. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back.
```

### 220. `chars/player_gun_walk1.png` — Лёва с пистолетом — шаг левой

- [ ] Правка картинки `player_gun`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `player_gun`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Young man in his late 20s, short light-brown hair, white-and-navy horizontally striped sailor shirt, dark blue jeans. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back.
```

### 221. `chars/player_gun_walk2.png` — Лёва с пистолетом — шаг правой

- [ ] Правка картинки `player_gun`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `player_gun`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Young man in his late 20s, short light-brown hair, white-and-navy horizontally striped sailor shirt, dark blue jeans. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back.
```

### 222. `chars/russian_boss_walk1.png` — Сёма Кац — шаг левой

- [ ] Правка картинки `russian_boss`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `russian_boss`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Heavy-set man in his 50s, shaved head, black leather coat over a burgundy silk shirt, several gold rings and a big gold chain, smug look. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back.
```

### 223. `chars/russian_boss_walk2.png` — Сёма Кац — шаг правой

- [ ] Правка картинки `russian_boss`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `russian_boss`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Heavy-set man in his 50s, shaved head, black leather coat over a burgundy silk shirt, several gold rings and a big gold chain, smug look. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back.
```

### 224. `chars/garik_walk1.png` — Гарик — шаг левой

- [ ] Правка картинки `garik`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `garik`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man with messy dark curly hair, black leather jacket over a red t-shirt, thin gold chain, dark jeans, flashy sneakers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back.
```

### 225. `chars/garik_walk2.png` — Гарик — шаг правой

- [ ] Правка картинки `garik`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `garik`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man with messy dark curly hair, black leather jacket over a red t-shirt, thin gold chain, dark jeans, flashy sneakers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back.
```

### 226. `chars/karim_walk1.png` — Карим — шаг левой

- [ ] Правка картинки `karim`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `karim`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man with short black hair, plain white hoodie, grey sweatpants, a bit of rope still around one wrist. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back.
```

### 227. `chars/karim_walk2.png` — Карим — шаг правой

- [ ] Правка картинки `karim`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `karim`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man with short black hair, plain white hoodie, grey sweatpants, a bit of rope still around one wrist. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back.
```

### 228. `chars/shabak_walk1.png` — Дани из Шабака — шаг левой

- [ ] Правка картинки `shabak`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `shabak`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Fit man in his 40s, plain dark polo shirt and dark trousers, short dark hair, sunglasses, small earpiece, discreet. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back.
```

### 229. `chars/shabak_walk2.png` — Дани из Шабака — шаг правой

- [ ] Правка картинки `shabak`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `shabak`). Если нельзя — генерируй по полному промпту. Формат квадрат 1:1.

Правка:

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Fit man in his 40s, plain dark polo shirt and dark trousers, short dark hair, sunglasses, small earpiece, discreet. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Walking pose: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back.
```


## Объекты улиц (14)

### 195. `props/planter.png` — Кадка с цветами

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Round terracotta street planter seen from above, full of green leaves and pink and yellow flowers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 196. `props/hydrant.png` — Гидрант

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Red fire hydrant on a sidewalk seen from directly above, small, with a yellow cap. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 197. `props/elbox.png` — Электрошкаф с граффити

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Grey metal electrical utility cabinet on a sidewalk seen from above, covered in colorful spray-paint tags. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 198. `props/cafe_set.png` — Столик кафе

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Small round white cafe table with three dark chairs around it seen from above, a coffee cup on the table. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 199. `props/picnic_table.png` — Стол для пикника

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Wooden picnic table with two attached benches seen from above. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 200. `props/playground.png` — Детская площадка

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Small children's playground seen from above on a sand-colored rubber surface: a red slide, a blue swing frame, a green round spinner, framed by a low wooden border. Square. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 201. `props/lounger.png` — Лежак

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. White plastic beach sun lounger with a blue towel seen from above, longer than wide. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 202. `props/shopping_cart.png` — Тележка из супермаркета

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Abandoned metal supermarket shopping cart seen from above, red handle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 203. `props/fountain_small.png` — Фонтанчик

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Small round stone fountain with clear blue water seen from above, a stone basin in the middle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 204. `props/flower_bed.png` — Клумба

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Square raised flower bed with a low stone border seen from above, green grass and small bright flowers, a young tree in the center. Square, fills the image. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 205. `props/crates.png` — Ящики

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A stack of four wooden shipping crates seen from above. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 206. `props/container_top.png` — Морской контейнер

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single red corrugated steel shipping container seen from directly above, long and narrow, roof ribs visible, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 207. `props/kiosk.png` — Киоск

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Small Tel Aviv street kiosk seen from above: a square booth with a striped green-and-white awning roof and a few crates of drinks beside it. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 208. `props/ad_column.png` — Афишная тумба

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Round green advertising pillar (Morris column) seen from directly above: dark green domed top cap, colorful posters visible around the edge. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Портреты для звонков (7)

### 174. `portraits/portrait_garik.png` — Портрет: Гарик, племянник Сёмы

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Garik, the hot-headed nephew of a Russian mob boss, early 20s: messy dark curly hair, stubble, cocky crooked smirk, narrowed jealous eyes, black leather jacket over a red t-shirt, thin gold chain, car keys spinning on one finger. Background: bright red.
```

### 175. `portraits/portrait_fira.png` — Портрет: Фира Марковна

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Fira Markovna, an elegant elderly bookkeeper from Odessa in her 70s: neat grey curls, reading glasses on a chain, sharp clever eyes, brown cardigan and a turquoise silk scarf, an old calculator in one hand and a stack of banknotes in the other. Background: warm beige.
```

### 176. `portraits/portrait_botsman.png` — Портрет: Боцман

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Botsman, a silent former sailor in his 60s who runs the port for the gang: bald weathered head, short grey beard, bushy eyebrows, stern squint, striped navy-and-white sailor undershirt under a dark pea coat, a pipe in the corner of his mouth, an anchor tattoo on the hand. Background: slate grey-blue.
```

### 177. `portraits/portrait_roza.png` — Портрет: Роза Львовна

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Roza Lvovna, the mob boss's mother in her late 70s: voluminous auburn-dyed curls, big round glasses, bright lipstick, purple blouse with a brooch, warm but demanding smile, holding a jar of homemade jam. Background: soft pink.
```

### 178. `portraits/portrait_shlomi.png` — Портрет: Шломи, помощник министра

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Shlomi, a slick political aide in his 30s: gelled short black hair, stubble, toothy salesman grin, untucked white shirt with sleeves rolled up, two phones — one at his ear and one in his hand, a small national flag pin. Background: light blue.
```

### 179. `portraits/portrait_yoav.png` — Портрет: журналист Йоав

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Yoav, a stubborn investigative TV journalist in his 30s: tousled brown hair, thick-rimmed glasses, tired eyes, stubble, grey hoodie with a press badge on a lanyard, holding a battered laptop. Background: orange.
```

### 180. `portraits/portrait_karim.png` — Портрет: Карим

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Karim, a young man from Jaffa in his early 20s: short black hair, frightened but brave eyes, a small bruise on the cheekbone, plain white hoodie, holding his own wrist where a rope was. Sympathetic depiction. Background: teal.
```


## Иллюстрации для рекламных щитов (9)

### 209. `facades/poster_1.png` — Щит: доставка «Шмоне-Бис»

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A happy delivery rider on an orange scooter with a big orange delivery box speeding past Tel Aviv palm trees, sunny, dynamic.
```

### 210. `facades/poster_2.png` — Щит: хумус «Абу-Сами»

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A big plate of creamy hummus with olive oil, chickpeas and paprika next to warm pita, appetizing close-up, warm earthy colors.
```

### 211. `facades/poster_3.png` — Щит: кондиционеры «Коль-Кар»

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A family relaxing in a cool blue living room with an air conditioner blowing snowflakes while a red-hot desert wind blows outside the window, humorous.
```

### 212. `facades/poster_4.png` — Щит: ульпан «Алеф»

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. Smiling adult students of different ages in a bright classroom raising their hands, a whiteboard with a big Hebrew letter Alef, friendly.
```

### 213. `facades/poster_5.png` — Щит: лотерея «Мазаль»

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. Golden lottery balls and a shower of gold coins and confetti on a purple background, glamorous.
```

### 214. `facades/poster_6.png` — Щит: квартиры в Бат-Яме

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A shiny new residential tower by the sea at sunset with a tiny price tag dangling from it, ironic real-estate ad style.
```

### 215. `facades/poster_7.png` — Щит: тариф «Шалом»

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A smartphone with waves of signal bars and stylized data icons flying out of it, turquoise background, energetic.
```

### 216. `facades/poster_8.png` — Щит: мороженое «Лимон»

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A huge pink-and-yellow ice cream cone with a lemon slice dripping in the sun on the beach, playful.
```

### 217. `facades/poster_iran.png` — Щит: «Протест оплачивает Иран»

- [ ] Новая картинка, формат пейзаж 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A dramatic propaganda-style political poster: a crowd of protesters as dark silhouettes with banknotes raining down on them from above, red and black colors, ominous.
```

