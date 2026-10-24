# Задание для Claude в Chrome: ассеты для игры «ХАМСИН»

> Этот файл — инструкция для расширения **Claude в Chrome**. Откройте его
> (или вставьте текст) в боковой панели Claude и скажите:
> «Выполни задание из этого файла». Сгенерированные файлы потом
> раскладываются страницей `tools/import.html` из папки игры.

## Цель

Сгенерировать в **Gemini** (https://gemini.google.com) 229 картинок для
браузерной игры с видом сверху: 93 спрайтов машин (каждая — целая и
три стадии повреждений), 54 персонажей, 30 фасадов и витрин,
23 объектов улиц, 12 текстур и 17 портретов героев для окна звонка. Скачать каждую картинку **ровно один раз и строго по порядку
номеров** из списка ниже.

## Почему важен порядок

Скачанные файлы получают имена вида `Gemini_Generated_Image_….png`, и
переименовать их из браузера нельзя. Пользователь потом перетащит все файлы
в страницу-импортёр, и она разложит их по слотам **в порядке времени
скачивания**. Поэтому:

1. Иди строго по номерам: 1, 2, 3, …
2. На каждый номер скачай **ровно одну** картинку — финальную, удачную.
3. Не скачивай ничего лишнего (неудачные варианты, другие файлы).
4. Если какой-то номер никак не получается — пропусти его и запиши номер
   в отчёт. Пользователь вставит пустой слот в импортёре.

## Как работать в Gemini

1. Открой https://gemini.google.com. Если нужен вход в аккаунт — попроси
   пользователя войти и продолжай после этого.
2. Выбери режим генерации изображений (модель, которая умеет создавать
   и редактировать картинки).
3. Для каждого номера вставь промпт из блока кода **целиком, без изменений**
   и отправь.
4. Дождись картинки и проверь её по чек-листу ниже. Если не подходит —
   попроси исправить в том же чате (например: «Same image, but strictly
   top-down view, front pointing up, solid magenta background»). Можно до
   3 попыток.
5. Удачную картинку скачай кнопкой загрузки в полном размере
   («Download full size image»). Ничего другого не скачивай.
6. Переходи к следующему номеру.

### Машины и их повреждения

Для каждой машины открывай **новый чат** (чтобы правки относились к нужной
машине):

1. Базовая машина — промпт «Новая картинка». Скачай.
2. В этом же чате — промпт `_d1` (лёгкие повреждения). Это **правка
   предыдущей картинки**: та же машина, тот же ракурс, размер и фон.
   Скачай.
3. Затем `_d2` (тяжёлые повреждения) — снова правка, скачай.
4. Затем `_d3` (сгоревший остов) — правка, скачай.

Если правка поменяла машину (другая форма, ракурс, цвет кузова на `_d1`/`_d2`)
— напиши: «Keep exactly the same car as in the first image of this chat,
only add the damage» и повтори.

### Чек-лист каждой картинки

- Вид **строго сверху**, как с дрона; не изометрия и не вид сбоку.
- Машины: **нос смотрит вверх**. Персонажи: **смотрят вправо**.
- Портреты: карикатура по плечи, лицо к зрителю, однотонный фон с
  полутоновыми точками (фон оставляем), в одном комиксном стиле.
- Фон — **сплошной пурпурный (#FF00FF)**, без теней, градиента и «шахматки»
  (у текстур и фасадов фона нет — картинка заполнена целиком; у портретов
  свой цветной фон).
- Фасады и витрины: вид **строго спереди**, как чертёж стены, без неба,
  улицы и перспективы; ровно 2 пролёта окон × 2 этажа (витрина — одна).
- Один объект по центру, без рамок, подписей и логотипов (надписи — только
  те, что прямо указаны в промпте: «מונית», «משטרה», «4», «8bis»).
- Текстуры: бесшовные, без объекта в центре.

### Если что-то пошло не так

- Gemini отказался или выдал ошибку: переформулируй мягче, убрав спорное
  слово, или пропусти номер и запиши его в отчёт.
- Лимит генераций: остановись и сообщи пользователю, на каком номере
  остановился. Продолжить можно позже с этого же номера — импортёр умеет
  начинать с любого слота.
- Нечаянно скачал лишнее: запиши в отчёт, после какого номера это случилось.

### Отчёт в конце

Напиши пользователю:
- последний выполненный номер;
- пропущенные номера;
- номера с лишними скачиваниями (если были).

И напомни: открыть `tools/import.html` из папки игры, перетащить туда все
скачанные файлы, нажать «Скачать ZIP» и распаковать архив в папку игры.

---

# Список ассетов (229)

## Машины (93)

Каждую машину делай в **новом чате**: сначала базовая картинка, затем три правки той же картинки (`_d1`, `_d2`, `_d3`) в этом же чате.

### 1. `vehicles/sedan_1.png` — Седан белый

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic white compact family sedan, slightly dusty. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 2. `vehicles/sedan_1_d1.png` — Седан белый — лёгкие повреждения

- [ ] Правка картинки `sedan_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 3. `vehicles/sedan_1_d2.png` — Седан белый — тяжёлые повреждения

- [ ] Правка картинки `sedan_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 4. `vehicles/sedan_1_d3.png` — Седан белый — сгоревший остов

- [ ] Правка картинки `sedan_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 5. `vehicles/sedan_2.png` — Седан серебристый

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic silver sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 6. `vehicles/sedan_2_d1.png` — Седан серебристый — лёгкие повреждения

- [ ] Правка картинки `sedan_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 7. `vehicles/sedan_2_d2.png` — Седан серебристый — тяжёлые повреждения

- [ ] Правка картинки `sedan_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 8. `vehicles/sedan_2_d3.png` — Седан серебристый — сгоревший остов

- [ ] Правка картинки `sedan_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 9. `vehicles/sedan_3.png` — Седан тёмно-серый

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 10. `vehicles/sedan_3_d1.png` — Седан тёмно-серый — лёгкие повреждения

- [ ] Правка картинки `sedan_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 11. `vehicles/sedan_3_d2.png` — Седан тёмно-серый — тяжёлые повреждения

- [ ] Правка картинки `sedan_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 12. `vehicles/sedan_3_d3.png` — Седан тёмно-серый — сгоревший остов

- [ ] Правка картинки `sedan_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 13. `vehicles/sedan_4.png` — Седан тёмно-синий

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark blue sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 14. `vehicles/sedan_4_d1.png` — Седан тёмно-синий — лёгкие повреждения

- [ ] Правка картинки `sedan_4` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 15. `vehicles/sedan_4_d2.png` — Седан тёмно-синий — тяжёлые повреждения

- [ ] Правка картинки `sedan_4` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 16. `vehicles/sedan_4_d3.png` — Седан тёмно-синий — сгоревший остов

- [ ] Правка картинки `sedan_4` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 17. `vehicles/hatch_1.png` — Хэтчбек белый

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Small white city hatchback. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 18. `vehicles/hatch_1_d1.png` — Хэтчбек белый — лёгкие повреждения

- [ ] Правка картинки `hatch_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 19. `vehicles/hatch_1_d2.png` — Хэтчбек белый — тяжёлые повреждения

- [ ] Правка картинки `hatch_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 20. `vehicles/hatch_1_d3.png` — Хэтчбек белый — сгоревший остов

- [ ] Правка картинки `hatch_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 21. `vehicles/hatch_2.png` — Хэтчбек красный

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Small red city hatchback. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 22. `vehicles/hatch_2_d1.png` — Хэтчбек красный — лёгкие повреждения

- [ ] Правка картинки `hatch_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 23. `vehicles/hatch_2_d2.png` — Хэтчбек красный — тяжёлые повреждения

- [ ] Правка картинки `hatch_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 24. `vehicles/hatch_2_d3.png` — Хэтчбек красный — сгоревший остов

- [ ] Правка картинки `hatch_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 25. `vehicles/hatch_3.png` — Хэтчбек старый бежевый

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Old beige hatchback from the 1990s, faded paint. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 26. `vehicles/hatch_3_d1.png` — Хэтчбек старый бежевый — лёгкие повреждения

- [ ] Правка картинки `hatch_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 27. `vehicles/hatch_3_d2.png` — Хэтчбек старый бежевый — тяжёлые повреждения

- [ ] Правка картинки `hatch_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 28. `vehicles/hatch_3_d3.png` — Хэтчбек старый бежевый — сгоревший остов

- [ ] Правка картинки `hatch_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 29. `vehicles/suv_1.png` — Джип белый

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 30. `vehicles/suv_1_d1.png` — Джип белый — лёгкие повреждения

- [ ] Правка картинки `suv_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 31. `vehicles/suv_1_d2.png` — Джип белый — тяжёлые повреждения

- [ ] Правка картинки `suv_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 32. `vehicles/suv_1_d3.png` — Джип белый — сгоревший остов

- [ ] Правка картинки `suv_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 33. `vehicles/suv_2.png` — Джип чёрный

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 34. `vehicles/suv_2_d1.png` — Джип чёрный — лёгкие повреждения

- [ ] Правка картинки `suv_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 35. `vehicles/suv_2_d2.png` — Джип чёрный — тяжёлые повреждения

- [ ] Правка картинки `suv_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 36. `vehicles/suv_2_d3.png` — Джип чёрный — сгоревший остов

- [ ] Правка картинки `suv_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 37. `vehicles/lux.png` — Чёрный лимузин бригады «Одесса»

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 38. `vehicles/lux_d1.png` — Чёрный лимузин бригады «Одесса» — лёгкие повреждения

- [ ] Правка картинки `lux` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 39. `vehicles/lux_d2.png` — Чёрный лимузин бригады «Одесса» — тяжёлые повреждения

- [ ] Правка картинки `lux` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 40. `vehicles/lux_d3.png` — Чёрный лимузин бригады «Одесса» — сгоревший остов

- [ ] Правка картинки `lux` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 41. `vehicles/taxi.png` — Такси

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 42. `vehicles/taxi_d1.png` — Такси — лёгкие повреждения

- [ ] Правка картинки `taxi` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 43. `vehicles/taxi_d2.png` — Такси — тяжёлые повреждения

- [ ] Правка картинки `taxi` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 44. `vehicles/taxi_d3.png` — Такси — сгоревший остов

- [ ] Правка картинки `taxi` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 45. `vehicles/police.png` — Полиция

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Israeli police SUV: white body with blue and fluorescent yellow-green checkered side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 46. `vehicles/police_d1.png` — Полиция — лёгкие повреждения

- [ ] Правка картинки `police` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 47. `vehicles/police_d2.png` — Полиция — тяжёлые повреждения

- [ ] Правка картинки `police` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 48. `vehicles/police_d3.png` — Полиция — сгоревший остов

- [ ] Правка картинки `police` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 49. `vehicles/ambulance.png` — Скорая

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White emergency ambulance van with red stripes and orange roof lights, generic medical markings without any cross or star symbol. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 50. `vehicles/ambulance_d1.png` — Скорая — лёгкие повреждения

- [ ] Правка картинки `ambulance` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 51. `vehicles/ambulance_d2.png` — Скорая — тяжёлые повреждения

- [ ] Правка картинки `ambulance` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 52. `vehicles/ambulance_d3.png` — Скорая — сгоревший остов

- [ ] Правка картинки `ambulance` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 53. `vehicles/van.png` — Фургон

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 54. `vehicles/van_d1.png` — Фургон — лёгкие повреждения

- [ ] Правка картинки `van` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 55. `vehicles/van_d2.png` — Фургон — тяжёлые повреждения

- [ ] Правка картинки `van` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 56. `vehicles/van_d3.png` — Фургон — сгоревший остов

- [ ] Правка картинки `van` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 57. `vehicles/van_iran.png` — Фургон иранских агентов

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 58. `vehicles/van_iran_d1.png` — Фургон иранских агентов — лёгкие повреждения

- [ ] Правка картинки `van_iran` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 59. `vehicles/van_iran_d2.png` — Фургон иранских агентов — тяжёлые повреждения

- [ ] Правка картинки `van_iran` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 60. `vehicles/van_iran_d3.png` — Фургон иранских агентов — сгоревший остов

- [ ] Правка картинки `van_iran` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 61. `vehicles/pickup.png` — Пикап клана Аль-Бахар

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 62. `vehicles/pickup_d1.png` — Пикап клана Аль-Бахар — лёгкие повреждения

- [ ] Правка картинки `pickup` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 63. `vehicles/pickup_d2.png` — Пикап клана Аль-Бахар — тяжёлые повреждения

- [ ] Правка картинки `pickup` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 64. `vehicles/pickup_d3.png` — Пикап клана Аль-Бахар — сгоревший остов

- [ ] Правка картинки `pickup` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 65. `vehicles/sherut.png` — Шерут (маршрутка)

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Yellow shared minibus taxi with a big route number «4» painted on the roof (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 66. `vehicles/sherut_d1.png` — Шерут (маршрутка) — лёгкие повреждения

- [ ] Правка картинки `sherut` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 67. `vehicles/sherut_d2.png` — Шерут (маршрутка) — тяжёлые повреждения

- [ ] Правка картинки `sherut` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 68. `vehicles/sherut_d3.png` — Шерут (маршрутка) — сгоревший остов

- [ ] Правка картинки `sherut` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 69. `vehicles/bus.png` — Городской автобус

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long green-and-white city bus with roof air-conditioning units, generic, no company logo. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 70. `vehicles/bus_d1.png` — Городской автобус — лёгкие повреждения

- [ ] Правка картинки `bus` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 71. `vehicles/bus_d2.png` — Городской автобус — тяжёлые повреждения

- [ ] Правка картинки `bus` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 72. `vehicles/bus_d3.png` — Городской автобус — сгоревший остов

- [ ] Правка картинки `bus` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 73. `vehicles/garbage.png` — Мусоровоз

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Green municipal garbage truck with a yellow stripe at the back. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 74. `vehicles/garbage_d1.png` — Мусоровоз — лёгкие повреждения

- [ ] Правка картинки `garbage` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 75. `vehicles/garbage_d2.png` — Мусоровоз — тяжёлые повреждения

- [ ] Правка картинки `garbage` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 76. `vehicles/garbage_d3.png` — Мусоровоз — сгоревший остов

- [ ] Правка картинки `garbage` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 77. `vehicles/scooter.png` — Скутер «Шмоне-Бис»

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Delivery motor scooter with a big orange insulated food box on the back that reads «8bis» (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 78. `vehicles/scooter_d1.png` — Скутер «Шмоне-Бис» — лёгкие повреждения

- [ ] Правка картинки `scooter` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 79. `vehicles/scooter_d2.png` — Скутер «Шмоне-Бис» — тяжёлые повреждения

- [ ] Правка картинки `scooter` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 80. `vehicles/scooter_d3.png` — Скутер «Шмоне-Бис» — сгоревший остов

- [ ] Правка картинки `scooter` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 81. `vehicles/moto.png` — Мотоцикл

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black sport motorcycle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 82. `vehicles/moto_d1.png` — Мотоцикл — лёгкие повреждения

- [ ] Правка картинки `moto` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 83. `vehicles/moto_d2.png` — Мотоцикл — тяжёлые повреждения

- [ ] Правка картинки `moto` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 84. `vehicles/moto_d3.png` — Мотоцикл — сгоревший остов

- [ ] Правка картинки `moto` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 85. `vehicles/hatch_lions.png` — Хэтчбек «Львов Гондэра»

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Yellow tuned hatchback with a single green racing stripe along the middle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 86. `vehicles/hatch_lions_d1.png` — Хэтчбек «Львов Гондэра» — лёгкие повреждения

- [ ] Правка картинки `hatch_lions` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 87. `vehicles/hatch_lions_d2.png` — Хэтчбек «Львов Гондэра» — тяжёлые повреждения

- [ ] Правка картинки `hatch_lions` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 88. `vehicles/hatch_lions_d3.png` — Хэтчбек «Львов Гондэра» — сгоревший остов

- [ ] Правка картинки `hatch_lions` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```


## Персонажи (54)

Все персонажи — в одном чате (если чат стал медленным, начни новый и продолжай с того же номера).

### 89. `chars/player.png` — Лёва Гольдман (герой)

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man in his late 20s, short light-brown hair, wearing a white-and-navy horizontally striped sailor shirt, dark blue jeans, white sneakers, a small backpack strap visible. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 90. `chars/player_gun.png` — Лёва с пистолетом

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Young man in his late 20s, short light-brown hair, white-and-navy horizontally striped sailor shirt, dark blue jeans. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 91. `chars/police.png` — Полицейский

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Israeli police officer in a dark navy-blue uniform with light-blue shoulder details, dark cap, utility belt. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 92. `chars/police_gun.png` — Полицейский с пистолетом

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Israeli police officer in a dark navy-blue uniform with light-blue shoulder details, dark cap, utility belt. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 93. `chars/russian.png` — Боец бригады «Одесса»

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Tough man with a shaved head, black leather jacket over a black t-shirt, thick gold chain, dark trousers, pale skin, 1990s-gangster vibe. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 94. `chars/russian_gun.png` — Боец «Одессы» с пистолетом

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Tough man with a shaved head, black leather jacket over a black t-shirt, thick gold chain, dark trousers, pale skin. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 95. `chars/russian_boss.png` — Сёма Кац, глава «Одессы»

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Heavy-set man in his 50s, shaved head, black leather coat over a burgundy silk shirt, several gold rings and a big gold chain, smug look. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 96. `chars/arab.png` — Боец клана Аль-Бахар

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man in a white tracksuit with black side stripes, short black hair with a neat fade, dark sunglasses, white sneakers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 97. `chars/arab_gun.png` — Боец Аль-Бахар с пистолетом

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Young man in a white tracksuit with black side stripes, short black hair, dark sunglasses. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 98. `chars/arab_boss.png` — Абу-Карим, глава клана

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Dignified man in his 60s with a short grey beard, cream-colored linen suit, prayer beads in one hand, calm and authoritative. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 99. `chars/lions.png` — Боец «Львов Гондэра»

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young Ethiopian-Israeli man, short black hair, yellow hoodie with green stripes along the sleeves, black joggers, stylish sneakers. Respectful, non-caricatured depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 100. `chars/lions_gun.png` — Боец «Львов» с пистолетом

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Young Ethiopian-Israeli man, short black hair, yellow hoodie with green stripes along the sleeves, black joggers. Respectful, non-caricatured depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 101. `chars/lions_boss.png` — Абеба, лидер «Львов»

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Ethiopian-Israeli man in his early 30s, short neat hair and trimmed beard, olive bomber jacket over a yellow t-shirt, headphones around the neck. Respectful, non-caricatured depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 102. `chars/iran.png` — Иранский агент

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Man in a plain grey suit with a dark tie, short black hair, short dark beard, dark sunglasses, anonymous secret-agent look. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 103. `chars/iran_gun.png` — Иранский агент с пистолетом

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Man in a plain grey suit with a dark tie, short black hair, short dark beard, dark sunglasses. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 104. `chars/shabak.png` — Дани из Шабака

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Fit man in his 40s, plain dark polo shirt and dark trousers, short dark hair, sunglasses, small earpiece, discreet. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 105. `chars/itzik.png` — Ицик «Фалафель»

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Stocky bald man in his 50s with a thick black mustache, green short-sleeve shirt with an apron, gold watch, cheerful market vendor. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 106. `chars/moshe.png` — Моше, бухгалтер

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Thin elderly man with a black kippah, white button-up shirt, holding a worn leather briefcase, glasses. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 107. `chars/shmulik.png` — Шмулик, хозяин квартиры

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Chubby middle-aged man in a tank top and shorts, flip-flops, gold chain, holding a phone and a bunch of keys. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 108. `chars/dvora.png` — Двора, учительница ульпана

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Woman in her 60s with short curly grey hair, colorful scarf, holding a stack of textbooks. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 109. `chars/civ_1.png` — Прохожая

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young Tel Aviv woman with long dark hair, colorful summer dress, sunglasses on her head, tote bag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 110. `chars/civ_2.png` — Харедим

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Ultra-Orthodox man in a black suit and wide-brimmed black hat, white shirt, side curls. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 111. `chars/civ_3.png` — Солдат

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Israeli soldier in olive-green uniform with a rifle slung across the back. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 112. `chars/civ_4.png` — Пожилой в кипе

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Older man with a white crocheted kippah, short-sleeve checked shirt, carrying a plastic shopping bag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 113. `chars/civ_5.png` — Хипстер

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young hipster man with a beard and man-bun, tank top, shorts, holding an iced coffee. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 114. `chars/civ_6.png` — Бабушка с тележкой

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Elderly woman with dyed red hair, cardigan, pushing a small shopping trolley. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 115. `chars/civ_7.png` — Подросток

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Teenage boy with a cap worn backwards, oversized t-shirt, holding an electric scooter handle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 116. `chars/civ_8.png` — Женщина в тихеле

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Woman in a modest long skirt and headscarf (tichel), carrying a baby carrier. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 117. `chars/civ_9.png` — Офисный работник

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Middle-aged office worker in a light blue shirt with rolled sleeves, lanyard badge, phone in hand. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 118. `chars/civ_10.png` — Пляжник с маткот

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Beach-goer man in swim shorts with a towel on the shoulder and a pair of beach paddles. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 119. `chars/civ_11.png` — Женщина в хиджабе

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Woman in a stylish hijab and long coat, holding shopping bags. Respectful depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 120. `chars/civ_12.png` — Турист

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Tourist with a sun hat, camera around the neck, sunburned shoulders, map in hand. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 121. `chars/cat.png` — Уличная кошка

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Skinny ginger tabby street cat seen from directly above, walking to the right. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Фасады и витрины (30)

Все фасады и витрины — в одном новом чате, **формат 16:9**, вид строго спереди (как чертёж), без неба и перспективы.

### 122. `facades/facade_bauhaus.png` — Фасад баухауз (центр)

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Slightly weathered white plaster Tel Aviv Bauhaus apartment facade: horizontal ribbon windows with white frames, half-lowered grey plastic roller shutters, long curved white balcony slabs, air-conditioner boxes with black drip stains below them, electric cables, potted plants and laundry on balconies.
```

### 123. `facades/facade_florentin.png` — Фасад Флорентина

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Worn beige-grey plaster facade of an old apartment building in a gritty artsy neighbourhood: mismatched roller shutters, rusty balcony railings with laundry, black water stains, peeling plaster, tangled cables, a colourful graffiti piece on the lower part, many air-conditioner boxes, a paper «להשכרה» (for rent) sign on a balcony.
```

### 124. `facades/facade_jaffa.png` — Фасад Яффо (камень)

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Old Ottoman-era facade of warm honey-coloured limestone blocks: tall arched windows with green wooden shutters, small decorative stone details.
```

### 125. `facades/facade_nevetzedek.png` — Фасад Неве-Цедека

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Restored 1900s low-rise facade in pastel plaster (peach or cream): tall rectangular windows with teal wooden shutters, ornamental cornice.
```

### 126. `facades/facade_concrete.png` — Фасад «шикун» (бетон)

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Plain 1960s concrete housing block facade: grey-beige concrete, simple windows, boxy enclosed balconies, many air-conditioner units, water stains.
```

### 127. `facades/facade_hotel.png` — Фасад отеля на набережной

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Modern white beachfront hotel facade: floor-to-ceiling blue-tinted windows and continuous glass balcony railings.
```

### 128. `facades/facade_tower.png` — Фасад стеклянной башни

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Glass curtain wall of a modern office skyscraper: blue reflective glass panels in a dark metal grid.
```

### 129. `facades/facade_warehouse.png` — Фасад склада в порту

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Old port warehouse wall: grey corrugated metal with rust streaks and a large roller door.
```

### 130. `facades/shop_1.png` — Витрина: маколет

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Neighbourhood grocery (makolet) with a blue sign reading «מכולת» and «24/7», stacked plastic crates of drink bottles at the door, white ice-cream freezer, shelves crammed with colourful products behind dirty glass.
```

### 131. `facades/shop_2.png` — Витрина: пицуцийя

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Late-night kiosk (pitzutzia) with a red sign reading «פיצוצייה», a pink neon OPEN sign, snacks and sweets piled in the window, lottery posters.
```

### 132. `facades/shop_3.png` — Витрина: шаварма

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Shawarma joint with a yellow sign reading «שווארמה», a rotating meat spit visible through the window, a black menu board with prices in shekels, plastic chairs outside.
```

### 133. `facades/shop_4.png` — Витрина: фалафельная

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Small falafel stand with a green sign reading «פלאפל», striped awning, counter with colourful salad trays.
```

### 134. `facades/shop_5.png` — Витрина: русский гастроном

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Russian delicatessen with a dark green sign reading «ГАСТРОНОМ» in Cyrillic, hanging sausages, jars and bottles in the window.
```

### 135. `facades/shop_6.png` — Витрина: парикмахерская

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Old barber shop with a dark sign reading «מספרה» and below «Парикмахерская», a red-white-blue barber pole, a mirror and a barber chair inside.
```

### 136. `facades/shop_7.png` — Витрина: ремонт телефонов

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Phone repair and accessories shop with a red sign reading «סלולר», phone cases on the wall, yellow sale stickers on the glass.
```

### 137. `facades/shop_8.png` — Витрина: закрытая лавка «сдаётся»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Closed shop with a lowered grey metal roller shutter covered in colourful graffiti, faded old sign above, a paper sign «להשכרה» with a phone number taped on the shutter.
```


## Объекты улиц (23)

Все объекты — в одном новом чате.

### 138. `props/palm.png` — Финиковая пальма

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Date palm tree seen from directly above: radial green fronds around a brown center, a few orange date clusters. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 139. `props/ficus.png` — Фикус

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Large ficus street tree crown seen from above, dense round dark-green foliage. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 140. `props/bougainvillea.png` — Бугенвиллея

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Bougainvillea bush seen from above, bright magenta-pink flowers over green leaves. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 141. `props/bottle_cage.png` — Клетка для бутылок

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Plastic bottle recycling cage seen from above: square metal mesh cage painted yellow, full of plastic bottles. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 142. `props/trash_bin.png` — Мусорный контейнер

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Large green municipal garbage container on wheels, seen from above, lid closed. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 143. `props/bus_stop.png` — Остановка

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. City bus stop shelter seen from above: long transparent roof panel on a metal frame with a bench, wider than tall. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 144. `props/umbrella.png` — Пляжный зонтик

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Beach umbrella seen from above, alternating white and turquoise segments. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 145. `props/lifeguard_tower.png` — Вышка спасателей

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Beach lifeguard hut on stilts seen from above, white with a red stripe on the roof. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 146. `props/market_stall.png` — Прилавок Шука

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Market stall seen from above: colorful striped awning covering crates of fruit and spices. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Текстуры (12)

Все текстуры — в одном новом чате.

### 147. `textures/asphalt.png` — Асфальт

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Worn city asphalt road surface seen from above, dark grey with fine aggregate grain, subtle tire wear, a few faint patches and tiny cracks. Area covers about 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 148. `textures/sidewalk.png` — Тротуарная плитка

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. City sidewalk made of small interlocking concrete paving blocks (grey and faded red-brown rows), slightly dusty, a few stains, seen from above. About 2x2 meters, roughly 12 blocks across. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 149. `textures/jaffa_stone.png` — Камень Яффо

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Old pavement made of large worn limestone blocks (warm cream and honey colors), irregular joints with sand in them, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 150. `textures/plaza.png` — Плиты площади

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Large light beige stone slabs of a modern city square, subtle variations between slabs, clean joints, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 151. `textures/sand.png` — Песок пляжа

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Fine Mediterranean beach sand, pale golden, gentle wind ripples, a few footprints and tiny shells, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 152. `textures/grass.png` — Газон

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Sun-dried park lawn, mix of green and yellowish patches, short grass blades, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 153. `textures/water.png` — Море

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Turquoise-blue Mediterranean sea water seen from above, gentle small waves and sun glints. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 154. `textures/deck.png` — Настил порта

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Weathered wooden boardwalk planks, warm brown, visible plank gaps and nail heads, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 155. `textures/scrub.png` — Сухой кустарник

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Dry Mediterranean scrubland ground: dusty olive-green bushes, dry yellow grass, small stones, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 156. `textures/roof_gravel.png` — Плоская крыша

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Flat apartment rooftop surface: white bitumen waterproof coating, slightly dirty with water stains and patches, seen from above. Mostly light. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 157. `textures/roof_tiles.png` — Черепица

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Terracotta clay roof tiles, rows of orange-red tiles seen straight from above, slight weathering. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 158. `textures/roof_metal.png` — Металлическая крыша

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Corrugated metal warehouse roof seen from above, light grey with parallel ridges, a little rust. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```


## Портреты для звонков (17)

Все портреты — в одном новом чате, **квадрат**, карикатура по плечи в одном стиле. Если стиль «поплыл», напиши: «Same caricature comic style as the first portrait in this chat».

### 159. `portraits/portrait_leva.png` — Портрет: Лёва Гольдман

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Leva, a Russian-Jewish new immigrant from St. Petersburg in his late 20s: short light-brown hair, sunburnt nose and cheeks, a drop of sweat on the forehead from the heat, tired but stubborn half-smile, white-and-navy striped sailor undershirt (telnyashka). Background: pale sky blue.
```

### 160. `portraits/portrait_itzik.png` — Портрет: Ицик «Фалафель»

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Itzik, a stocky bald Tel Aviv market vendor in his 50s: huge black mustache, bushy eyebrows, wide grin with one gold tooth, green short-sleeve shirt with a white apron, gold watch, holding a falafel pita. Background: warm yellow.
```

### 161. `portraits/portrait_sema.png` — Портрет: Сёма Кац

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Syoma, a heavy-set Russian mobster boss in his 50s: shaved head, square jaw, narrow smug eyes and a crooked smirk, black leather coat over a burgundy silk shirt, thick gold chain, gold rings, raising a small shot glass. Background: dark red.
```

### 162. `portraits/portrait_abu.png` — Портрет: Абу-Карим

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Abu-Karim, a dignified clan elder from Jaffa in his 60s: short neat grey beard, calm wise eyes, cream linen suit with an open collar, prayer beads in one hand, a tiny cup of cardamom coffee in the other. Background: deep teal.
```

### 163. `portraits/portrait_abeba.png` — Портрет: Абеба

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Abeba, an Ethiopian-Israeli community leader in his early 30s: short neat hair and trimmed beard, confident warm smile, olive bomber jacket over a yellow t-shirt, big headphones around the neck. Respectful depiction. Background: green.
```

### 164. `portraits/portrait_dani.png` — Портрет: Дани из Шабака

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Dani, a Shin Bet agent in his 40s: square jaw, deadpan serious face, dark sunglasses, short dark hair, earpiece with a coiled wire, plain dark polo shirt. Background: grey-blue.
```

### 165. `portraits/portrait_ali.png` — Портрет: «Али» из Телеграма

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. A mysterious anonymous online recruiter: a man in a dark hoodie, face mostly hidden in shadow with only a sly smile and glinting eyes, the cold blue glow of a smartphone screen lighting his chin. No app logos. Background: dark navy.
```

### 166. `portraits/portrait_ortal.png` — Портрет: Орталь из Мисрад а-Клита

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Ortal, a bored Israeli government office clerk in her 40s: big curly dyed-blonde hair, long bright pink nails, reading glasses, unimpressed raised eyebrow, holding a paper cup of coffee. Background: pale institutional green.
```

### 167. `portraits/portrait_shmulik.png` — Портрет: Шмулик, хозяин квартиры

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Shmulik, a chubby Tel Aviv landlord in his 50s: receding hair, stubble, scheming grin, white tank top, gold chain, a phone pressed to his ear and a bunch of keys in the other hand. Background: orange.
```

### 168. `portraits/portrait_dvora.png` — Портрет: Двора, учительница ульпана

- [ ] Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Dvora, a strict but kind Hebrew teacher in her 60s: short curly grey hair, colorful orange scarf, reading glasses on the tip of her nose, raised index finger, holding a stack of textbooks. Background: lilac.
```


## Фасады и витрины (30)

Все фасады и витрины — в одном новом чате, **формат 16:9**, вид строго спереди (как чертёж), без неба и перспективы.

### 169. `facades/facade_power.png` — Фасад: электростанция Ридинг

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Industrial facade of a 1930s seaside power station: pale weathered concrete, tall narrow vertical strip windows with rusty steel frames, a faded red stripe along the top, exposed pipes and ventilation grilles.
```

### 170. `facades/facade_church.png` — Фасад: церковь в Яффо

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Facade of an old Franciscan stone church in Jaffa: warm honey-coloured limestone blocks, tall arched windows with simple coloured glass, carved stone cornice and pilasters.
```

### 171. `facades/facade_mosque.png` — Фасад: мечеть Хасан-Бек

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Ottoman-era mosque wall near the sea: pale sand-coloured limestone, a row of pointed arch windows with green wooden shutters and iron grilles, a decorative stone band between floors.
```

### 172. `facades/facade_arena.png` — Фасад: спортивная арена

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Exterior wall of a modern indoor sports arena: horizontal bands of light grey aluminium panels alternating with strips of dark blue glass, white vertical structural ribs.
```

### 173. `facades/facade_citygate.png` — Фасад: башня «Городские ворота»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Curtain wall of the tallest skyscraper in Ramat Gan: dark blue reflective glass with thin vertical silver fins in a very regular grid, a few lit office windows.
```


## Портреты для звонков (17)

Все портреты — в одном новом чате, **квадрат**, карикатура по плечи в одном стиле. Если стиль «поплыл», напиши: «Same caricature comic style as the first portrait in this chat».

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


## Персонажи (54)

Все персонажи — в одном чате (если чат стал медленным, начни новый и продолжай с того же номера).

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


## Машины (93)

Каждую машину делай в **новом чате**: сначала базовая картинка, затем три правки той же картинки (`_d1`, `_d2`, `_d3`) в этом же чате.

### 190. `vehicles/truck.png` — Тягач с контейнером

- [ ] Новая картинка, формат вертикальный 3:4.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 191. `vehicles/truck_d1.png` — Тягач с контейнером — лёгкие повреждения

- [ ] Правка картинки `truck` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 192. `vehicles/truck_d2.png` — Тягач с контейнером — тяжёлые повреждения

- [ ] Правка картинки `truck` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 193. `vehicles/truck_d3.png` — Тягач с контейнером — сгоревший остов

- [ ] Правка картинки `truck` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 194. `vehicles/barrel.png` — Бочка с топливом

- [ ] Новая картинка, формат квадрат 1:1.

```
Top-down game sprite of a REALISTIC vehicle: photorealistic rendering that looks like a high-resolution aerial drone photo taken straight down at noon, orthographic, accurate real-world proportions (a car is about 2.2 times longer than wide), real car paint with subtle clear-coat reflections, dark tinted glass reflecting the sky, visible panel gaps, door handles, side mirrors, windshield wipers, roof details, slight road dust on the lower edges, soft natural light from the top-left. NOT a cartoon: no outlines, no cel shading, no exaggerated shapes, no toy look. Single vehicle centered, no text, no logos, no watermark.  A single red steel fuel drum seen from directly above: round lid with two caps and a yellow hazard triangle, metal rings, filling about 70% of the image. Square image. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Объекты улиц (23)

Все объекты — в одном новом чате.

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


## Фасады и витрины (30)

Все фасады и витрины — в одном новом чате, **формат 16:9**, вид строго спереди (как чертёж), без неба и перспективы.

### 209. `facades/poster_1.png` — Щит: доставка «Шмоне-Бис»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A happy delivery rider on an orange scooter with a big orange delivery box speeding past Tel Aviv palm trees, sunny, dynamic.
```

### 210. `facades/poster_2.png` — Щит: хумус «Абу-Сами»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A big plate of creamy hummus with olive oil, chickpeas and paprika next to warm pita, appetizing close-up, warm earthy colors.
```

### 211. `facades/poster_3.png` — Щит: кондиционеры «Коль-Кар»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A family relaxing in a cool blue living room with an air conditioner blowing snowflakes while a red-hot desert wind blows outside the window, humorous.
```

### 212. `facades/poster_4.png` — Щит: ульпан «Алеф»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. Smiling adult students of different ages in a bright classroom raising their hands, a whiteboard with a big Hebrew letter Alef, friendly.
```

### 213. `facades/poster_5.png` — Щит: лотерея «Мазаль»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. Golden lottery balls and a shower of gold coins and confetti on a purple background, glamorous.
```

### 214. `facades/poster_6.png` — Щит: квартиры в Бат-Яме

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A shiny new residential tower by the sea at sunset with a tiny price tag dangling from it, ironic real-estate ad style.
```

### 215. `facades/poster_7.png` — Щит: тариф «Шалом»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A smartphone with waves of signal bars and stylized data icons flying out of it, turquoise background, energetic.
```

### 216. `facades/poster_8.png` — Щит: мороженое «Лимон»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A huge pink-and-yellow ice cream cone with a lemon slice dripping in the sun on the beach, playful.
```

### 217. `facades/poster_iran.png` — Щит: «Протест оплачивает Иран»

- [ ] Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A dramatic propaganda-style political poster: a crowd of protesters as dark silhouettes with banknotes raining down on them from above, red and black colors, ominous.
```


## Персонажи (54)

Все персонажи — в одном чате (если чат стал медленным, начни новый и продолжай с того же номера).

### 218. `chars/player_walk1.png` — Лёва — шаг левой

- [ ] Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 219. `chars/player_walk2.png` — Лёва — шаг правой

- [ ] Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 220. `chars/player_gun_walk1.png` — Лёва с пистолетом — шаг левой

- [ ] Правка картинки `player_gun` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 221. `chars/player_gun_walk2.png` — Лёва с пистолетом — шаг правой

- [ ] Правка картинки `player_gun` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 222. `chars/russian_boss_walk1.png` — Сёма Кац — шаг левой

- [ ] Правка картинки `russian_boss` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 223. `chars/russian_boss_walk2.png` — Сёма Кац — шаг правой

- [ ] Правка картинки `russian_boss` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 224. `chars/garik_walk1.png` — Гарик — шаг левой

- [ ] Правка картинки `garik` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 225. `chars/garik_walk2.png` — Гарик — шаг правой

- [ ] Правка картинки `garik` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 226. `chars/karim_walk1.png` — Карим — шаг левой

- [ ] Правка картинки `karim` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 227. `chars/karim_walk2.png` — Карим — шаг правой

- [ ] Правка картинки `karim` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 228. `chars/shabak_walk1.png` — Дани из Шабака — шаг левой

- [ ] Правка картинки `shabak` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 229. `chars/shabak_walk2.png` — Дани из Шабака — шаг правой

- [ ] Правка картинки `shabak` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

