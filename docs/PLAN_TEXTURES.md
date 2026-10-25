# План текстур 3D-моделей

> Правило: к каждой новой модели сразу план текстур и промпты в задание на
> генерацию. Текстуры общие для всех моделей — бесшовные материалы
> (assets/gen/textures/m_*.png). Пока картинки нет, модель окрашена цветом.
> Задание — CLAUDE_CHROME_ASSETS_MODELTEX.md, промпты — js/asset-manifest.js
> (MODEL_TEXTURES), материалы → текстуры — tools/models/lib.py (TEX).
> Файл собирается tools/build-asset-docs.js.

## Текстуры

| № | Файл | Что это | Есть |
|---|---|---|---|
| 318 | textures/m_stone.png | Камень Яффо (известняк) | — |
| 319 | textures/m_trim.png | Светлый камень карнизов | — |
| 320 | textures/m_concrete.png | Бетон | — |
| 321 | textures/m_white.png | Белая штукатурка баухауза | — |
| 322 | textures/m_beige.png | Бежевая штукатурка 1960-х | — |
| 323 | textures/m_ochre.png | Охра (эклектика) | — |
| 324 | textures/m_brick.png | Терракотовая штукатурка церкви | — |
| 325 | textures/m_brown.png | Коричневая мозаика 1960-х | — |
| 326 | textures/m_glass.png | Тёмное стекло фасада | — |
| 327 | textures/m_glassB.png | Синее стекло (Азриэли) | — |
| 328 | textures/m_metal.png | Металлические панели | — |
| 329 | textures/m_roofT.png | Черепица (сверху) | — |
| 330 | textures/m_patina.png | Патина купола | — |
| 331 | textures/m_gold.png | Золото луковицы | — |
| 332 | textures/m_blueroof.png | Синий купол со звёздами | — |
| 333 | textures/m_shutter.png | Ставни-«трисим» | — |
| 334 | textures/m_wood.png | Старая деревянная дверь | — |
| 335 | textures/m_roofflat.png | Плоская крыша | — |
| 336 | textures/m_graffiti.png | Граффити на бетоне | — |
| 337 | textures/m_rust.png | Ржавый металл | — |
| 338 | textures/m_paint_red.png | Красная краска по металлу | — |
| 339 | textures/m_water.png | Вода фонтана | — |
| 340 | textures/m_bh_cream.png | Баухауз: кремовая штукатурка | — |
| 341 | textures/m_bh_pastel.png | Баухауз: пастельно-розовая штукатурка | — |
| 342 | textures/m_60_grey.png | Дом 60-х: серая «шуба» | — |
| 343 | textures/m_60_stone.png | Дом 60-х: облицовка иерусалимским камнем | — |
| 344 | textures/m_ecl_pink.png | Эклектика: лососевая штукатурка | — |
| 345 | textures/m_ecl_blue.png | Эклектика: серо-голубая штукатурка | — |
| 348 | textures/m_pinkpaint.png | Розовая краска балконов («Опера») | — |

## Какие текстуры у каких моделей

| Модель | Текстуры | Без текстуры (цвет) |
|---|---|---|
| Мечеть Хасан-Бек | m_patina, m_gold, m_roofflat, m_stone, m_trim, m_wood | cap, dark |
| Фонтан Агама | m_concrete, m_metal, m_paint_red, m_water | paintBlue, paintGreen, yellow |
| Азриэли | m_concrete, m_glassB, m_metal | cap, yellow |
| «Городские ворота» | m_glass, m_metal | cap |
| Часовая башня Яффо | m_roofT, m_stone, m_trim, m_white, m_wood | cap, dark |
| Дельфинариум | m_concrete, m_graffiti, m_rust | cap, dark |
| Театр Габима | m_glass, m_trim, m_white | cap |
| Типовой дом: 1960-е | m_beige, m_concrete, m_glass, m_glassB, m_metal, m_shutter, m_white | cap |
| Типовой дом: баухауз | m_concrete, m_glass, m_glassB, m_stone, m_white | cap |
| Типовой дом: эклектика 1920-х | m_concrete, m_ochre, m_trim | cap, dark, shutterG |
| Штаб в Кирье | m_concrete, m_glass, m_metal, m_paint_red, m_white | cap, yellow |
| Маяк Яффо | m_paint_red, m_stone, m_trim, m_white | cap, dark, yellow |
| Арена «Менора» | m_concrete, m_glass, m_metal, m_white | cap |
| Башня «Опера» (Алленби) | m_concrete, m_glass, m_glassB, m_pinkpaint, m_roofflat, m_white | cap, dark |
| Фонтан на площади у «Оперы» | m_concrete, m_water | foam |
| Электростанция Ридинг | m_concrete, m_glass, m_paint_red, m_white | cap |
| Русская церковь | m_blueroof, m_gold, m_patina, m_white | cap, dark |
| Башня Шалом | m_brown, m_glass, m_metal | cap |
| Церковь Св. Петра | m_brick, m_gold, m_roofT, m_stone, m_wood | cap, dark |

Без текстуры остаются проёмы окон, краска (ставни, разметка, колёса фонтана) и фонарь маяка.

Окна моделей (материалы dark, glass, glassB) ночью светятся вразнобой — карта горящих окон рисуется кодом.

## Три отделки каждого типового дома

Одна модель — три вида: вариант 1 — как в модели, 2 и 3 — свои текстуры и цвет (пока текстуры нет).

| Дом | Вариант 2 | Вариант 3 |
|---|---|---|
| Типовой дом: баухауз | white → m_bh_cream (#efe6d2) | white → m_bh_pastel (#ecd6cf) |
| Типовой дом: 1960-е | beige → m_60_grey (#b8b6b0) | beige → m_60_stone (#dccfb0) |
| Типовой дом: эклектика 1920-х | ochre → m_ecl_pink (#e3a58f); shutterG → цвет (#3d5f86) | ochre → m_ecl_blue (#a9bccb); shutterG → цвет (#7a4b2c) |
