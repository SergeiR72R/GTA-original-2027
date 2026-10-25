# Задание для Claude в Chrome: текстуры 3D-моделей зданий (3)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Бесшовные текстуры материалов для моделей знаковых зданий и типовых домов
> (камень, штукатурка, стекло, черепица, патина…). Картинка должна
> бесшовно повторяться по краям — без рамки и без предмета в центре.
> План: docs/PLAN_TEXTURES.md.

## Сначала — одна картинка на согласование

1. Сгенерируй **только № 359** (`textures/m_hosp_louver.png`).
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

# Список (3): № 359, 360, 361

## Текстуры (3)

### 359. `textures/m_hosp_louver.png` — Текстура модели: Стекло с белыми ламелями (башня Сами Офера)

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Glass curtain wall of a modern hospital tower: teal-blue reflective glass with thin vertical mullions, crossed by evenly spaced thick white horizontal sun-shade louvers (one louver band per storey, about a quarter of the storey height), soft sky reflections in the glass.
```

### 360. `textures/m_helipad.png` — Текстура модели: Вертолётная площадка на крыше (сверху)

- [ ] Новая картинка, формат квадрат 1:1.

```
Texture for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no words or other letters except the single big letter H, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Top-down view of a circular rooftop hospital helipad deck: dark grey non-slip surface filling the whole square, a large white letter H in the centre, a wide white circle around it, a thin yellow outer ring near the edges, small white touchdown marks; centred and symmetric. (Not seamless: one helipad covering the whole image.)
```

### 361. `textures/m_kids_panels.png` — Текстура модели: Цветные панели детской больницы (Дана-Двек)

- [ ] Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Playful facade of a children's hospital: irregular vertical rectangular panels in bright cheerful colours (red, orange, yellow, lime green, sky blue, white), matte finish, thin seams, cheerful but tidy.
```

