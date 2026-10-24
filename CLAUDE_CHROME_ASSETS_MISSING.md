# Задание для Claude в Chrome: недостающие ассеты (63)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Это всё, чего пока нет в игре: старые картинки, которые не получились или
> пропущены, и новые для пролога. Файл собирается автоматически.

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

# Список (63): № 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 14, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 47, 48, 50, 51, 53, 54, 55, 56, 58, 59, 60, 61, 62, 63, 64, 66, 190, 191, 192, 193, 230, 231, 232, 233, 234, 235, 236, 237, 238, 243, 244, 245, 239, 240, 241, 242

## Машины (56)

### 2. `vehicles/sedan_1_d1.png` — Седан белый — лёгкие повреждения

- [ ] Правка картинки `sedan_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic white compact family sedan, slightly dusty. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 3. `vehicles/sedan_1_d2.png` — Седан белый — тяжёлые повреждения

- [ ] Правка картинки `sedan_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic white compact family sedan, slightly dusty. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 4. `vehicles/sedan_1_d3.png` — Седан белый — сгоревший остов

- [ ] Правка картинки `sedan_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic white compact family sedan, slightly dusty. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 6. `vehicles/sedan_2_d1.png` — Седан серебристый — лёгкие повреждения

- [ ] Правка картинки `sedan_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic silver sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 7. `vehicles/sedan_2_d2.png` — Седан серебристый — тяжёлые повреждения

- [ ] Правка картинки `sedan_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic silver sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 8. `vehicles/sedan_2_d3.png` — Седан серебристый — сгоревший остов

- [ ] Правка картинки `sedan_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic silver sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 9. `vehicles/sedan_3.png` — Седан тёмно-серый

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 10. `vehicles/sedan_3_d1.png` — Седан тёмно-серый — лёгкие повреждения

- [ ] Правка картинки `sedan_3`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_3`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 11. `vehicles/sedan_3_d2.png` — Седан тёмно-серый — тяжёлые повреждения

- [ ] Правка картинки `sedan_3`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_3`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 12. `vehicles/sedan_3_d3.png` — Седан тёмно-серый — сгоревший остов

- [ ] Правка картинки `sedan_3`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_3`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 14. `vehicles/sedan_4_d1.png` — Седан тёмно-синий — лёгкие повреждения

- [ ] Правка картинки `sedan_4`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sedan_4`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark blue sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 29. `vehicles/suv_1.png` — Джип белый

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 30. `vehicles/suv_1_d1.png` — Джип белый — лёгкие повреждения

- [ ] Правка картинки `suv_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 31. `vehicles/suv_1_d2.png` — Джип белый — тяжёлые повреждения

- [ ] Правка картинки `suv_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 32. `vehicles/suv_1_d3.png` — Джип белый — сгоревший остов

- [ ] Правка картинки `suv_1`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_1`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 33. `vehicles/suv_2.png` — Джип чёрный

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 34. `vehicles/suv_2_d1.png` — Джип чёрный — лёгкие повреждения

- [ ] Правка картинки `suv_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 35. `vehicles/suv_2_d2.png` — Джип чёрный — тяжёлые повреждения

- [ ] Правка картинки `suv_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 36. `vehicles/suv_2_d3.png` — Джип чёрный — сгоревший остов

- [ ] Правка картинки `suv_2`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `suv_2`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 37. `vehicles/lux.png` — Чёрный лимузин бригады «Одесса»

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 38. `vehicles/lux_d1.png` — Чёрный лимузин бригады «Одесса» — лёгкие повреждения

- [ ] Правка картинки `lux`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 39. `vehicles/lux_d2.png` — Чёрный лимузин бригады «Одесса» — тяжёлые повреждения

- [ ] Правка картинки `lux`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 40. `vehicles/lux_d3.png` — Чёрный лимузин бригады «Одесса» — сгоревший остов

- [ ] Правка картинки `lux`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 41. `vehicles/taxi.png` — Такси

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 42. `vehicles/taxi_d1.png` — Такси — лёгкие повреждения

- [ ] Правка картинки `taxi`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `taxi`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 43. `vehicles/taxi_d2.png` — Такси — тяжёлые повреждения

- [ ] Правка картинки `taxi`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `taxi`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 44. `vehicles/taxi_d3.png` — Такси — сгоревший остов

- [ ] Правка картинки `taxi`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `taxi`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 47. `vehicles/police_d2.png` — Полиция — тяжёлые повреждения

- [ ] Правка картинки `police`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `police`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Israeli police SUV: white body with blue and fluorescent yellow-green checkered side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 48. `vehicles/police_d3.png` — Полиция — сгоревший остов

- [ ] Правка картинки `police`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `police`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Israeli police SUV: white body with blue and fluorescent yellow-green checkered side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 50. `vehicles/ambulance_d1.png` — Скорая — лёгкие повреждения

- [ ] Правка картинки `ambulance`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `ambulance`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White emergency ambulance van with red stripes and orange roof lights, generic medical markings without any cross or star symbol. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 51. `vehicles/ambulance_d2.png` — Скорая — тяжёлые повреждения

- [ ] Правка картинки `ambulance`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `ambulance`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White emergency ambulance van with red stripes and orange roof lights, generic medical markings without any cross or star symbol. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 53. `vehicles/van.png` — Фургон

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 54. `vehicles/van_d1.png` — Фургон — лёгкие повреждения

- [ ] Правка картинки `van`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 55. `vehicles/van_d2.png` — Фургон — тяжёлые повреждения

- [ ] Правка картинки `van`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 56. `vehicles/van_d3.png` — Фургон — сгоревший остов

- [ ] Правка картинки `van`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 58. `vehicles/van_iran_d1.png` — Фургон иранских агентов — лёгкие повреждения

- [ ] Правка картинки `van_iran`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van_iran`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 59. `vehicles/van_iran_d2.png` — Фургон иранских агентов — тяжёлые повреждения

- [ ] Правка картинки `van_iran`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van_iran`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 60. `vehicles/van_iran_d3.png` — Фургон иранских агентов — сгоревший остов

- [ ] Правка картинки `van_iran`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `van_iran`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 61. `vehicles/pickup.png` — Пикап клана Аль-Бахар

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 62. `vehicles/pickup_d1.png` — Пикап клана Аль-Бахар — лёгкие повреждения

- [ ] Правка картинки `pickup`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 63. `vehicles/pickup_d2.png` — Пикап клана Аль-Бахар — тяжёлые повреждения

- [ ] Правка картинки `pickup`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 64. `vehicles/pickup_d3.png` — Пикап клана Аль-Бахар — сгоревший остов

- [ ] Правка картинки `pickup`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 66. `vehicles/sherut_d1.png` — Шерут (маршрутка) — лёгкие повреждения

- [ ] Правка картинки `sherut`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `sherut`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Yellow shared minibus taxi with a big route number «4» painted on the roof (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 190. `vehicles/truck.png` — Тягач с контейнером

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 191. `vehicles/truck_d1.png` — Тягач с контейнером — лёгкие повреждения

- [ ] Правка картинки `truck`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `truck`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 192. `vehicles/truck_d2.png` — Тягач с контейнером — тяжёлые повреждения

- [ ] Правка картинки `truck`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `truck`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 193. `vehicles/truck_d3.png` — Тягач с контейнером — сгоревший остов

- [ ] Правка картинки `truck`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `truck`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 230. `vehicles/civic.png` — Белый «Цивик» Даниса

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sporty Japanese compact sedan from the late 2000s, slightly lowered, dark tinted windows, black aftermarket alloy wheels, small rear spoiler on the trunk, a few stickers on the rear window (no readable text), no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 231. `vehicles/civic_d1.png` — Белый «Цивик» Даниса — лёгкие повреждения

- [ ] Правка картинки `civic`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `civic`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sporty Japanese compact sedan from the late 2000s, slightly lowered, dark tinted windows, black aftermarket alloy wheels, small rear spoiler on the trunk, a few stickers on the rear window (no readable text), no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 232. `vehicles/civic_d2.png` — Белый «Цивик» Даниса — тяжёлые повреждения

- [ ] Правка картинки `civic`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `civic`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sporty Japanese compact sedan from the late 2000s, slightly lowered, dark tinted windows, black aftermarket alloy wheels, small rear spoiler on the trunk, a few stickers on the rear window (no readable text), no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 233. `vehicles/civic_d3.png` — Белый «Цивик» Даниса — сгоревший остов

- [ ] Правка картинки `civic`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `civic`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sporty Japanese compact sedan from the late 2000s, slightly lowered, dark tinted windows, black aftermarket alloy wheels, small rear spoiler on the trunk, a few stickers on the rear window (no readable text), no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 234. `vehicles/solaris.png` — Серый «Солярис» Димы

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Grey budget Korean-style compact sedan from the mid-2010s, plain and practical, a bit dusty, a small dent on the rear bumper, no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 235. `vehicles/solaris_d1.png` — Серый «Солярис» Димы — лёгкие повреждения

- [ ] Правка картинки `solaris`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `solaris`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Grey budget Korean-style compact sedan from the mid-2010s, plain and practical, a bit dusty, a small dent on the rear bumper, no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 236. `vehicles/solaris_d2.png` — Серый «Солярис» Димы — тяжёлые повреждения

- [ ] Правка картинки `solaris`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `solaris`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Grey budget Korean-style compact sedan from the mid-2010s, plain and practical, a bit dusty, a small dent on the rear bumper, no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 237. `vehicles/solaris_d3.png` — Серый «Солярис» Димы — сгоревший остов

- [ ] Правка картинки `solaris`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `solaris`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Grey budget Korean-style compact sedan from the mid-2010s, plain and practical, a bit dusty, a small dent on the rear bumper, no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 238. `vehicles/china_ev.png` — Новый китайский электрокар

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Brand-new compact electric crossover in pearl-white with a black panoramic glass roof, hidden door handles, a thin full-width light bar at the front and back, clean futuristic Chinese design, no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Персонажи (3)

### 243. `chars/dima.png` — Дима

- [ ] Новая картинка, формат квадрат 1:1. **Приложи к запросу фото этого человека** (его даст пользователь) — внешность берётся с фото, стиль — как у остальных героев игры. Без фото не генерируй — спроси пользователя.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. A man wearing grey t-shirt, dark jeans, sneakers, phone in hand. Base the hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 244. `chars/danis.png` — Данис

- [ ] Новая картинка, формат квадрат 1:1. **Приложи к запросу фото этого человека** (его даст пользователь) — внешность берётся с фото, стиль — как у остальных героев игры. Без фото не генерируй — спроси пользователя.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. A man wearing black t-shirt, light jeans, white sneakers, car keys in hand. Base the hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 245. `chars/semyon.png` — Семён

- [ ] Новая картинка, формат квадрат 1:1. **Приложи к запросу фото этого человека** (его даст пользователь) — внешность берётся с фото, стиль — как у остальных героев игры. Без фото не генерируй — спроси пользователя.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. A man wearing white t-shirt, shorts, flip-flops. Base the hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Объекты улиц (1)

### 239. `props/mattress.png` — Матрас на крышу

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A double bed mattress, white with a light-blue quilted pattern, tied with two orange cargo straps across it, seen from directly above, rectangular, longer than wide. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Портреты для звонков (3)

### 240. `portraits/portrait_dima.png` — Портрет: Дима

- [ ] Новая картинка, формат квадрат 1:1. **Приложи к запросу фото этого человека** (его даст пользователь) — внешность берётся с фото, стиль — как у остальных героев игры. Без фото не генерируй — спроси пользователя.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Dima, Leva's flatmate and fellow immigrant, early 30s, practical and a bit stingy, holding a phone with a car sale ad. Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Background: light grey-blue.
```

### 241. `portraits/portrait_danis.png` — Портрет: Данис

- [ ] Новая картинка, формат квадрат 1:1. **Приложи к запросу фото этого человека** (его даст пользователь) — внешность берётся с фото, стиль — как у остальных героев игры. Без фото не генерируй — спроси пользователя.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Danis, Leva's friend from the ulpan, late 20s, hot-headed street racer, proud of his car, holding his car keys. Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Background: hot orange.
```

### 242. `portraits/portrait_semyon.png` — Портрет: Семён

- [ ] Новая картинка, формат квадрат 1:1. **Приложи к запросу фото этого человека** (его даст пользователь) — внешность берётся с фото, стиль — как у остальных героев игры. Без фото не генерируй — спроси пользователя.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Semyon, Leva's second flatmate, early 30s, calm and easy-going, always moving to a new apartment, hugging a rolled-up pillow. Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Background: mint green.
```

