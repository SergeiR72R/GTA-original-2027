# Дополнение для Claude в Chrome: карикатурные машины банд (16)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Дополнение к основному заданию CLAUDE_CHROME_ASSETS_MISSING.md — выполняй
> после него (или вместо его пунктов с теми же номерами).
> Машины четырёх банд в карикатурном виде, с яркой эмблемой банды во всю
> крышу. **Номера 246–253 заменяют** одноимённые пункты основного задания:
> если они уже сгенерированы по старому промпту — сгенерируй заново по этому.

## Сначала — одна картинка на согласование

1. Сгенерируй **только № 246** (`vehicles/lux_odessa.png`).
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

# Список (16): № 246, 247, 248, 249, 250, 251, 252, 253, 268, 269, 270, 271, 272, 273, 274, 275

## Машины (16)

### 246. `vehicles/lux_odessa.png` — Машина бригады «Одесса»

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Odessa Brigade, a Russian-speaking 1990s-style mafia: an absurdly long black luxury limousine-sedan with a huge chrome grille, gold-plated rims, gold trim along the sides, heavily tinted windows, fluffy dice visible through the windshield. ROOF EMBLEM: a big golden anchor with a small crown on top, inside a blood-red circle with a thick gold ring. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 247. `vehicles/lux_odessa_d1.png` — Машина бригады «Одесса» — лёгкие повреждения

- [ ] Правка картинки `lux_odessa`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux_odessa`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Odessa Brigade, a Russian-speaking 1990s-style mafia: an absurdly long black luxury limousine-sedan with a huge chrome grille, gold-plated rims, gold trim along the sides, heavily tinted windows, fluffy dice visible through the windshield. ROOF EMBLEM: a big golden anchor with a small crown on top, inside a blood-red circle with a thick gold ring. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 248. `vehicles/lux_odessa_d2.png` — Машина бригады «Одесса» — тяжёлые повреждения

- [ ] Правка картинки `lux_odessa`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux_odessa`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Odessa Brigade, a Russian-speaking 1990s-style mafia: an absurdly long black luxury limousine-sedan with a huge chrome grille, gold-plated rims, gold trim along the sides, heavily tinted windows, fluffy dice visible through the windshield. ROOF EMBLEM: a big golden anchor with a small crown on top, inside a blood-red circle with a thick gold ring. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 249. `vehicles/lux_odessa_d3.png` — Машина бригады «Одесса» — сгоревший остов

- [ ] Правка картинки `lux_odessa`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lux_odessa`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Odessa Brigade, a Russian-speaking 1990s-style mafia: an absurdly long black luxury limousine-sedan with a huge chrome grille, gold-plated rims, gold trim along the sides, heavily tinted windows, fluffy dice visible through the windshield. ROOF EMBLEM: a big golden anchor with a small crown on top, inside a blood-red circle with a thick gold ring. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 250. `vehicles/pickup_bahar.png` — Пикап клана Аль-Бахар

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Al-Bahar clan from old Jaffa port ("bahar" means sea): a white monster pickup truck on huge off-road tyres and raised suspension, teal-green racing stripes, black roll bar with a row of big round spotlights, the open cargo bed overflowing with crates of bright Jaffa oranges and a fishing net. ROOF EMBLEM: a big teal-green circle with a white stylized curling sea wave and a jumping fish. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 251. `vehicles/pickup_bahar_d1.png` — Пикап клана Аль-Бахар — лёгкие повреждения

- [ ] Правка картинки `pickup_bahar`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup_bahar`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Al-Bahar clan from old Jaffa port ("bahar" means sea): a white monster pickup truck on huge off-road tyres and raised suspension, teal-green racing stripes, black roll bar with a row of big round spotlights, the open cargo bed overflowing with crates of bright Jaffa oranges and a fishing net. ROOF EMBLEM: a big teal-green circle with a white stylized curling sea wave and a jumping fish. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 252. `vehicles/pickup_bahar_d2.png` — Пикап клана Аль-Бахар — тяжёлые повреждения

- [ ] Правка картинки `pickup_bahar`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup_bahar`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Al-Bahar clan from old Jaffa port ("bahar" means sea): a white monster pickup truck on huge off-road tyres and raised suspension, teal-green racing stripes, black roll bar with a row of big round spotlights, the open cargo bed overflowing with crates of bright Jaffa oranges and a fishing net. ROOF EMBLEM: a big teal-green circle with a white stylized curling sea wave and a jumping fish. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 253. `vehicles/pickup_bahar_d3.png` — Пикап клана Аль-Бахар — сгоревший остов

- [ ] Правка картинки `pickup_bahar`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `pickup_bahar`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Al-Bahar clan from old Jaffa port ("bahar" means sea): a white monster pickup truck on huge off-road tyres and raised suspension, teal-green racing stripes, black roll bar with a row of big round spotlights, the open cargo bed overflowing with crates of bright Jaffa oranges and a fishing net. ROOF EMBLEM: a big teal-green circle with a white stylized curling sea wave and a jumping fish. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 268. `vehicles/lions_car.png` — Машина «Львов Гондэра»

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Lions of Gondar, a crew of young Ethiopian-Israeli rappers with their own music studio: a bright yellow tuned street-racer hatchback with a gigantic rear spoiler, wide flared fenders, neon-green underglow, green and red racing stripes, two huge subwoofer speakers visible through the open rear hatch. ROOF EMBLEM: a big roaring lion head wearing a crown, yellow and black, inside a green circle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 269. `vehicles/lions_car_d1.png` — Машина «Львов Гондэра» — лёгкие повреждения

- [ ] Правка картинки `lions_car`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lions_car`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Lions of Gondar, a crew of young Ethiopian-Israeli rappers with their own music studio: a bright yellow tuned street-racer hatchback with a gigantic rear spoiler, wide flared fenders, neon-green underglow, green and red racing stripes, two huge subwoofer speakers visible through the open rear hatch. ROOF EMBLEM: a big roaring lion head wearing a crown, yellow and black, inside a green circle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 270. `vehicles/lions_car_d2.png` — Машина «Львов Гондэра» — тяжёлые повреждения

- [ ] Правка картинки `lions_car`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lions_car`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Lions of Gondar, a crew of young Ethiopian-Israeli rappers with their own music studio: a bright yellow tuned street-racer hatchback with a gigantic rear spoiler, wide flared fenders, neon-green underglow, green and red racing stripes, two huge subwoofer speakers visible through the open rear hatch. ROOF EMBLEM: a big roaring lion head wearing a crown, yellow and black, inside a green circle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 271. `vehicles/lions_car_d3.png` — Машина «Львов Гондэра» — сгоревший остов

- [ ] Правка картинки `lions_car`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `lions_car`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Lions of Gondar, a crew of young Ethiopian-Israeli rappers with their own music studio: a bright yellow tuned street-racer hatchback with a gigantic rear spoiler, wide flared fenders, neon-green underglow, green and red racing stripes, two huge subwoofer speakers visible through the open rear hatch. ROOF EMBLEM: a big roaring lion head wearing a crown, yellow and black, inside a green circle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 272. `vehicles/iran_car.png` — Фургон иранской сети

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. The Iranian spy network pretending to be a carpet delivery company: a dark charcoal-grey boxy van, comically suspicious, bristling with antennas and a satellite dish on the roof edge, blacked-out windows, rolled-up Persian-style carpets strapped to the roof rack along the sides. ROOF EMBLEM: a fake carpet-shop logo — a big rolled red carpet with a single watchful eye in the middle, inside an orange diamond. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 273. `vehicles/iran_car_d1.png` — Фургон иранской сети — лёгкие повреждения

- [ ] Правка картинки `iran_car`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `iran_car`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. The Iranian spy network pretending to be a carpet delivery company: a dark charcoal-grey boxy van, comically suspicious, bristling with antennas and a satellite dish on the roof edge, blacked-out windows, rolled-up Persian-style carpets strapped to the roof rack along the sides. ROOF EMBLEM: a fake carpet-shop logo — a big rolled red carpet with a single watchful eye in the middle, inside an orange diamond. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 274. `vehicles/iran_car_d2.png` — Фургон иранской сети — тяжёлые повреждения

- [ ] Правка картинки `iran_car`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `iran_car`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. The Iranian spy network pretending to be a carpet delivery company: a dark charcoal-grey boxy van, comically suspicious, bristling with antennas and a satellite dish on the roof edge, blacked-out windows, rolled-up Persian-style carpets strapped to the roof rack along the sides. ROOF EMBLEM: a fake carpet-shop logo — a big rolled red carpet with a single watchful eye in the middle, inside an orange diamond. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 275. `vehicles/iran_car_d3.png` — Фургон иранской сети — сгоревший остов

- [ ] Правка картинки `iran_car`: если в Flow можно редактировать картинку или взять её как образец, используй короткий промпт «Правка» (возьми за образец уже готовую `iran_car`). Если нельзя — генерируй по полному промпту. Формат портрет 3:4 (если нет — 9:16).

Правка:

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

Полный промпт:

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. The Iranian spy network pretending to be a carpet delivery company: a dark charcoal-grey boxy van, comically suspicious, bristling with antennas and a satellite dish on the roof edge, blacked-out windows, rolled-up Persian-style carpets strapped to the roof rack along the sides. ROOF EMBLEM: a fake carpet-shop logo — a big rolled red carpet with a single watchful eye in the middle, inside an orange diamond. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

