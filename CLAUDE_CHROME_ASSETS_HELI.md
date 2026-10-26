# Задание для Claude в Chrome: текстуры 3D-модели армейского вертолёта (4)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Бесшовные текстуры для low-poly 3D-модели вымышленного армейского ударного
> вертолёта (tools/models/heli.py): краска корпуса с панелями и заклёпками,
> тёмный металл, стекло кабины, лопасти. Картинка должна бесшовно повторяться
> по краям — без рамки и без предмета в центре, **без знаков, флагов, номеров
> и надписей**. Пока картинки нет, модель окрашена цветом.
>
> Готовые файлы — `textures/<имя>.png` (1024×1024) в папку на Google Диске,
> как обычно. План: docs/PLAN_TEXTURES.md.

## Сначала — одна картинка на согласование

1. Сгенерируй **только № 371** (`textures/m_heli_olive.png`).
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

# Список (4): № 371, 372, 373, 374

## Текстуры (4)

### 371. `textures/m_heli_olive.png` — Текстура модели: Вертолёт: оливковая краска корпуса с панелями

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of the outer surface of a military helicopter for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no numbers, no letters, no insignia, no flags, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Matte olive-drab military paint (around #4B5320) on aircraft aluminium skin: large rectangular access panels outlined by thin dark seams, neat rows of small flush rivets along the seams, a couple of small hatches with latches, subtle dust, slightly faded patches and light scuffs. One uniform olive colour, no camouflage blotches, no markings.
```

### 372. `textures/m_heli_metal.png` — Текстура модели: Вертолёт: тёмный металл (двигатели, пилоны, лыжи)

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of the outer surface of a military helicopter for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no numbers, no letters, no insignia, no flags, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Dark gunmetal-grey painted steel with fine scratches, oil and soot stains, small hex bolts and a few narrow vent slots; matte, slightly worn bright edges.
```

### 373. `textures/m_heli_canopy.png` — Текстура модели: Вертолёт: стекло кабины

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of the outer surface of a military helicopter for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no numbers, no letters, no insignia, no flags, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Dark tinted armoured cockpit glass of a helicopter: smoky blue-green glass with soft diagonal sky reflections and faint streaks, very subtle and even; no frames, no pilots, nothing behind the glass.
```

### 374. `textures/m_heli_blade.png` — Текстура модели: Вертолёт: лопасти винтов

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of the outer surface of a military helicopter for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no numbers, no letters, no insignia, no flags, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Matte charcoal-black composite helicopter rotor blade surface: very fine lengthwise grain, faint sanding marks, light dust; almost uniform.
```

