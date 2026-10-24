# Задание для Claude в Chrome: пролог — друзья Лёвы

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Новые картинки для миссий пролога (номера 230–245): белый «Цивик» Даниса,
> серый «Солярис» Димы, новый китайский электрокар, матрас на крышу,
> портреты и спрайты Димы, Даниса и Семёна.
>
> **Фото.** Для портретов и спрайтов Димы, Даниса и Семёна пользователь
> прикладывает фото. Прикладывай нужное фото к каждому такому запросу.

## Сначала — одна картинка на согласование

1. Сгенерируй **только № 240** (`portraits/portrait_dima.png`).
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

# Список (16): № 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245

## Машины (9)

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

