# Задание для Claude в Chrome: недостающие ассеты (9)

> Откройте этот файл в боковой панели **Claude в Chrome** и скажите:
> «Выполни задание из этого файла».
> Единое задание: всё, чего пока нет в игре (9) — Логотип «ХАМСИН» с надписью, Эмблема без надписи (под логотип кодом), Заставка: Лёва на набережной, Заставка: бригада «Одесса», Заставка: клан Аль-Бахар, Заставка: «Львы Гондэра», Заставка: погоня на Аялоне, Заставка: друзья и матрас, Заставка: Шабак и «Али». Файл собирается автоматически.

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

# Список (9): № 349, 350, 351, 352, 353, 354, 355, 356, 357

## Логотип и заставки (9)

### 349. `ui/logo.png` — Логотип «ХАМСИН» с надписью

- [ ] Новая картинка, формат пейзаж 16:9.

```
Video game title logo for a satirical open-world crime game set in Tel Aviv. The main word is «ХАМСИН» — exactly six Russian Cyrillic capital letters Х, А, М, С, И, Н, spelled exactly like that — in a heavy condensed black serif display typeface with a thick white outline and a hard drop shadow, slightly tilted, in the spirit of classic 2000s crime game title logos. Below it a smaller subtitle «ЧАСТЬ 1: ТЕЛЬ-АВИВ» in the same style. Behind the letters: a huge orange sun setting into the sea, palm silhouettes and a swirl of yellow desert dust (hamsin wind). Isolated on a perfectly flat solid magenta background (#FF00FF), no other text, no watermark. CHECK THE SPELLING: if the letters are wrong, regenerate.
```

### 350. `ui/logo_emblem.png` — Эмблема без надписи (под логотип кодом)

- [ ] Новая картинка, формат пейзаж 16:9. Приложи к запросу референсы из архива `hamsin-refs-brand.zip`: **`ref_opera.png`**, **`ref_azrieli.png`**, **`ref_clocktower.png`** — их имена указаны и в самом промпте.

```
Video game title emblem WITHOUT ANY TEXT for a satirical open-world crime game set in Tel Aviv: a bold round badge with a huge orange sun setting into the sea, palm silhouettes, a swirl of yellow desert dust (hamsin wind) and the Tel Aviv skyline silhouette — the stepped seafront tower, the round, triangular and square towers, the Jaffa clock tower (see the attached references). Heavy black outlines, flat colors, classic 2000s crime game title art look. Wide empty band across the middle where the title text will be added later. Isolated on a perfectly flat solid magenta background (#FF00FF). NO letters, NO text, NO logos, no watermark.
```

### 351. `ui/loading_1.png` — Заставка: Лёва на набережной

- [ ] Новая картинка, формат пейзаж 16:9. Приложи к запросу референсы из архива `hamsin-refs-brand.zip`: **`ref_portrait_leva.png`**, **`ref_player.png`**, **`ref_opera.png`**, **`ref_hassanbek.png`** — их имена указаны и в самом промпте.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Leva Goldman, a new immigrant from St. Petersburg (ref_portrait_leva.png, ref_player.png): short light-brown hair, sunburnt nose, white-and-navy striped sailor shirt, jeans, sneakers, cocky half-smile, leaning on the hood of his tired old faded grey-blue 1990s hatchback with one door in matte primer grey. Behind him: the Tel Aviv beach promenade at sunset, the white stepped seafront tower with pink balconies (ref_opera.png) and the slender minaret of the seafront mosque (ref_hassanbek.png), palms, a wall of yellow desert dust (hamsin) rolling in over the sea.
```

### 352. `ui/loading_2.png` — Заставка: бригада «Одесса»

- [ ] Новая картинка, формат пейзаж 16:9. Приложи к запросу референсы из архива `hamsin-refs-brand.zip`: **`ref_portrait_sema.png`**, **`ref_portrait_garik.png`**, **`ref_lux_odessa.png`** — их имена указаны и в самом промпте.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Night in Ramat Gan. Syoma Katz, boss of the Odessa Brigade (ref_portrait_sema.png): heavy-set, shaved head, black leather coat over a burgundy silk shirt, thick gold chain, raising a shot glass, smug. Next to him his nephew Garik (ref_portrait_garik.png) in a leather jacket. Behind them their absurdly long black limousine with gold rims and a golden anchor-and-crown emblem on a red circle (ref_lux_odessa.png), and the glowing neon of a Russian restaurant shaped like an anchor (no letters).
```

### 353. `ui/loading_3.png` — Заставка: клан Аль-Бахар

- [ ] Новая картинка, формат пейзаж 16:9. Приложи к запросу референсы из архива `hamsin-refs-brand.zip`: **`ref_portrait_abu.png`**, **`ref_portrait_karim.png`**, **`ref_pickup_bahar.png`**, **`ref_clocktower.png`** — их имена указаны и в самом промпте.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Old Jaffa port at golden hour. Abu-Karim, head of the Al-Bahar clan (ref_portrait_abu.png): dignified, short grey beard, cream linen suit, prayer beads in hand, calm and powerful. Beside him his young nephew Karim (ref_portrait_karim.png) in a white tracksuit. Behind them the white monster pickup with teal stripes, spotlights and crates of Jaffa oranges, a teal wave-and-fish emblem on the roof (ref_pickup_bahar.png), fishing boats and the Jaffa clock tower (ref_clocktower.png).
```

### 354. `ui/loading_4.png` — Заставка: «Львы Гондэра»

- [ ] Новая картинка, формат пейзаж 16:9. Приложи к запросу референсы из архива `hamsin-refs-brand.zip`: **`ref_portrait_abeba.png`**, **`ref_lions.png`**, **`ref_lions_car.png`** — их имена указаны и в самом промпте.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. South Tel Aviv near the old central bus station, evening. Abeba, leader of the Lions of Gondar (ref_portrait_abeba.png): Ethiopian-Israeli man in his early 30s, neat beard, olive bomber jacket over a yellow t-shirt, big headphones around his neck, confident warm grin. Two of his crew in yellow hoodies with green stripes (ref_lions.png). Behind them the yellow tuned street-racer hatchback with a huge spoiler and a crowned lion emblem on the roof (ref_lions_car.png) in front of a wall covered in colorful graffiti (no readable words). Respectful, non-caricatured depiction.
```

### 355. `ui/loading_5.png` — Заставка: погоня на Аялоне

- [ ] Новая картинка, формат пейзаж 16:9. Приложи к запросу референсы из архива `hamsin-refs-brand.zip`: **`ref_portrait_leva.png`**, **`ref_portrait_danis.png`**, **`ref_civic.png`**, **`ref_azrieli.png`** — их имена указаны и в самом промпте.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Night chase on the Ayalon highway, split into two diagonal comic panels. Big panel: Leva (ref_portrait_leva.png) gripping the wheel of a white sporty Japanese compact sedan (ref_civic.png) at full speed, his friend Danis (ref_portrait_danis.png) yelling in the passenger seat, police cars with flashing red-and-blue lights behind. Small panel: the three towers — round, triangular and square — glowing at night above the highway (ref_azrieli.png).
```

### 356. `ui/loading_6.png` — Заставка: друзья и матрас

- [ ] Новая картинка, формат пейзаж 16:9. Приложи к запросу референсы из архива `hamsin-refs-brand.zip`: **`ref_portrait_dima.png`**, **`ref_portrait_danis.png`**, **`ref_portrait_semyon.png`**, **`ref_mattress.png`** — их имена указаны и в самом промпте.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Funny comic scene in the White City of Tel Aviv: three friends — Dima (ref_portrait_dima.png), Danis (ref_portrait_danis.png) and Semyon (ref_portrait_semyon.png) — desperately holding a big mattress (ref_mattress.png) strapped to the roof of a tired old 1990s grey-blue hatchback while a yellow desert dust storm (hamsin) blows; white Bauhaus buildings with rounded balconies behind them. Exaggerated expressions, good-natured humor.
```

### 357. `ui/loading_7.png` — Заставка: Шабак и «Али»

- [ ] Новая картинка, формат пейзаж 16:9. Приложи к запросу референсы из архива `hamsin-refs-brand.zip`: **`ref_portrait_dani.png`**, **`ref_portrait_ali.png`**, **`ref_kirya.png`** — их имена указаны и в самом промпте.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Spy thriller mood at night, split into two diagonal comic panels. Left: Dani from the Shin Bet security service (ref_portrait_dani.png) — stern, dark sunglasses, earpiece, dark polo, watching. Right: «Ali», an anonymous recruiter (ref_portrait_ali.png) in a dark hoodie, face in shadow, lit only by the cold blue glow of a smartphone. Between them the military headquarters tower with a helipad and a tall red-and-white antenna mast (ref_kirya.png).
```

