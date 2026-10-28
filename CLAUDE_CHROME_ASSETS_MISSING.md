# Задание для Claude в Chrome: недостающие ассеты (8)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Единое задание: всё, чего пока нет в игре (8) — Армейский ударный вертолёт (сверху), Текстура модели: Хипстер: лицо анфас (на всю голову спереди), Текстура модели: Хипстер: волосы, Текстура модели: Хипстер: ткань майки, Текстура модели: Хипстер: джинсы, Текстура модели: Хипстер: кожа рук, Текстура модели: Хипстер: ткань кед, Логотип «ХАМСИН» с надписью. Файл собирается автоматически.

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

# Список (8): № 370, 375, 376, 377, 378, 379, 380, 349

## Машины (1)

### 370. `vehicles/heli_military.png` — Армейский ударный вертолёт (сверху)

- [ ] Новая картинка, формат портрет 3:4 (если нет — 9:16).

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A fictional military attack helicopter seen from directly above (top-down, orthographic), NOSE POINTING UP: slim olive-drab fuselage with a narrow tandem two-seat glass cockpit at the front, short stub wings on both sides with rocket pods under them, a long thin tail boom with a small tail fin and tail rotor at the bottom, only the round main rotor hub on top WITHOUT the long main rotor blades. Matte olive green paint, dark grey details, no national insignia, no numbers, no text, no real-world markings. The helicopter fills about 85% of the image height. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Текстуры (6)

### 375. `textures/ped_hip_face.png` — Текстура модели: Хипстер: лицо анфас (на всю голову спереди)

- [ ] Новая картинка, формат квадрат 1:1.

```
Texture of a FACE for a low-poly 3D video game character head, hand-painted in the style of early-2000s 3D open-world crime games: the face seen strictly from the front, flat even lighting, no shadows, symmetric, filling the WHOLE square edge to edge: the top edge is the hair just above the forehead, the bottom edge is the bottom of the beard under the chin, the left and right edges pass just in front of the ears (no ears, no background, no neck, no shoulders). No glasses, no text, no logos, no watermark. The man from the attached reference image ref_civ_5.png — a young Tel Aviv hipster: light olive-tan skin, warm brown eyes looking straight ahead, thick dark-brown eyebrows, a full well-groomed dark-brown beard and moustache covering the jaw and chin, dark-brown hair combed back (the man-bun is on the back of the head, not visible from the front). Relaxed, slightly ironic expression.
```

### 376. `textures/ped_hip_hair.png` — Текстура модели: Хипстер: волосы

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture for a low-poly 3D character of a stylized crime video game (hand-painted early-2000s 3D game look), orthographic straight-on view of a flat piece of material, fills the entire square edge to edge, even soft flat lighting, no perspective, no shadows, no seams of a garment, no objects, no text, no logos, no watermark. Painterly but realistic, readable at small size. Dark-brown hair combed straight back, seen up close: smooth strands with soft highlights, all running in one direction (top to bottom), uniform.
```

### 377. `textures/ped_hip_tank.png` — Текстура модели: Хипстер: ткань майки

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture for a low-poly 3D character of a stylized crime video game (hand-painted early-2000s 3D game look), orthographic straight-on view of a flat piece of material, fills the entire square edge to edge, even soft flat lighting, no perspective, no shadows, no seams of a garment, no objects, no text, no logos, no watermark. Painterly but realistic, readable at small size. Bottle-green ribbed cotton jersey of a tank top: fine vertical ribs, slightly washed-out, a couple of faint creases, uniform colour.
```

### 378. `textures/ped_hip_jeans.png` — Текстура модели: Хипстер: джинсы

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture for a low-poly 3D character of a stylized crime video game (hand-painted early-2000s 3D game look), orthographic straight-on view of a flat piece of material, fills the entire square edge to edge, even soft flat lighting, no perspective, no shadows, no seams of a garment, no objects, no text, no logos, no watermark. Painterly but realistic, readable at small size. Dark charcoal-grey denim of skinny jeans: diagonal twill weave, slight fading, uniform.
```

### 379. `textures/ped_hip_skin.png` — Текстура модели: Хипстер: кожа рук

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture for a low-poly 3D character of a stylized crime video game (hand-painted early-2000s 3D game look), orthographic straight-on view of a flat piece of material, fills the entire square edge to edge, even soft flat lighting, no perspective, no shadows, no seams of a garment, no objects, no text, no logos, no watermark. Painterly but realistic, readable at small size. Light olive-tan human skin of a forearm: very subtle pores, a few faint freckles and fine dark arm hairs, uniform tone.
```

### 380. `textures/ped_hip_shoes.png` — Текстура модели: Хипстер: ткань кед

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture for a low-poly 3D character of a stylized crime video game (hand-painted early-2000s 3D game look), orthographic straight-on view of a flat piece of material, fills the entire square edge to edge, even soft flat lighting, no perspective, no shadows, no seams of a garment, no objects, no text, no logos, no watermark. Painterly but realistic, readable at small size. Light grey canvas fabric of casual sneakers: fine canvas weave, a little dusty, uniform.
```


## Логотип и заставки (1)

### 349. `ui/logo.png` — Логотип «ХАМСИН» с надписью

- [ ] Новая картинка, формат пейзаж 16:9.

```
Video game title logo for a satirical open-world crime game set in Tel Aviv. The main word is «ХАМСИН» — exactly six Russian Cyrillic capital letters Х, А, М, С, И, Н, spelled exactly like that — in a heavy condensed black serif display typeface with a thick white outline and a hard drop shadow, slightly tilted, in the spirit of classic 2000s crime game title logos. Below it a smaller subtitle «ЧАСТЬ 1: ТЕЛЬ-АВИВ» in the same style. Behind the letters: a huge orange sun setting into the sea, palm silhouettes and a swirl of yellow desert dust (hamsin wind). Isolated on a perfectly flat solid magenta background (#FF00FF), no other text, no watermark. CHECK THE SPELLING: if the letters are wrong, regenerate.
```

