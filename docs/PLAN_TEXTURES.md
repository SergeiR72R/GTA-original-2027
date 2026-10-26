# План текстур 3D-моделей

> Правило: к каждой новой модели сразу план текстур и промпты в задание на
> генерацию. Текстуры общие для всех моделей — бесшовные материалы
> (assets/gen/textures/m_*.png). Пока картинки нет, модель окрашена цветом.
> Задание — CLAUDE_CHROME_ASSETS_MODELTEX.md (вертолёт — CLAUDE_CHROME_ASSETS_HELI.md), промпты — js/asset-manifest.js
> (MODEL_TEXTURES), материалы → текстуры — tools/models/lib.py (TEX).
> Файл собирается tools/build-asset-docs.js.

## Текстуры

| № | Файл | Что это | Есть |
|---|---|---|---|
| 318 | textures/m_stone.png | Камень Яффо (известняк) | да |
| 319 | textures/m_trim.png | Светлый камень карнизов | да |
| 320 | textures/m_concrete.png | Бетон | да |
| 321 | textures/m_white.png | Белая штукатурка баухауза | да |
| 322 | textures/m_beige.png | Бежевая штукатурка 1960-х | да |
| 323 | textures/m_ochre.png | Охра (эклектика) | да |
| 324 | textures/m_brick.png | Терракотовая штукатурка церкви | да |
| 325 | textures/m_brown.png | Коричневая мозаика 1960-х | да |
| 326 | textures/m_glass.png | Тёмное стекло фасада | да |
| 327 | textures/m_glassB.png | Синее стекло (Азриэли) | да |
| 328 | textures/m_metal.png | Металлические панели | да |
| 329 | textures/m_roofT.png | Черепица (сверху) | да |
| 330 | textures/m_patina.png | Патина купола | да |
| 331 | textures/m_gold.png | Золото луковицы | да |
| 332 | textures/m_blueroof.png | Синий купол со звёздами | да |
| 333 | textures/m_shutter.png | Ставни-«трисим» | да |
| 334 | textures/m_wood.png | Старая деревянная дверь | да |
| 335 | textures/m_roofflat.png | Плоская крыша | да |
| 336 | textures/m_graffiti.png | Граффити на бетоне | да |
| 337 | textures/m_rust.png | Ржавый металл | да |
| 338 | textures/m_paint_red.png | Красная краска по металлу | да |
| 339 | textures/m_water.png | Вода фонтана | да |
| 340 | textures/m_bh_cream.png | Баухауз: кремовая штукатурка | да |
| 341 | textures/m_bh_pastel.png | Баухауз: пастельно-розовая штукатурка | да |
| 342 | textures/m_60_grey.png | Дом 60-х: серая «шуба» | да |
| 343 | textures/m_60_stone.png | Дом 60-х: облицовка иерусалимским камнем | да |
| 344 | textures/m_ecl_pink.png | Эклектика: лососевая штукатурка | да |
| 345 | textures/m_ecl_blue.png | Эклектика: серо-голубая штукатурка | да |
| 348 | textures/m_pinkpaint.png | Розовая краска балконов («Опера») | да |
| 358 | textures/m_hosp_panel.png | Белые фасадные панели больницы (Ихилов) | да |
| 359 | textures/m_hosp_louver.png | Стекло с белыми ламелями (башня Сами Офера) | да |
| 360 | textures/m_helipad.png | Вертолётная площадка на крыше (сверху) | да |
| 361 | textures/m_kids_panels.png | Цветные панели детской больницы (Дана-Двек) | да |
| 371 | textures/m_heli_olive.png | Вертолёт: оливковая краска корпуса с панелями | — |
| 372 | textures/m_heli_metal.png | Вертолёт: тёмный металл (двигатели, пилоны, лыжи) | — |
| 373 | textures/m_heli_canopy.png | Вертолёт: стекло кабины | — |
| 374 | textures/m_heli_blade.png | Вертолёт: лопасти винтов | — |

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
| Типовой дом: 1960-е | m_beige, m_concrete, m_glass, m_glassB, m_metal, m_roofflat, m_shutter, m_white | cap |
| Типовой дом: баухауз | m_concrete, m_glass, m_glassB, m_roofflat, m_stone, m_white | cap |
| Типовой дом: эклектика 1920-х | m_concrete, m_ochre, m_roofflat, m_trim | cap, dark, shutterG |
| ichilov | m_concrete, m_glass, m_glassB, m_patina, m_helipad, m_hosp_panel, m_kids_panels, m_hosp_louver, m_metal, m_paint_red, m_roofflat, m_white | cap, dark |
| Штаб в Кирье | m_concrete, m_glass, m_metal, m_paint_red, m_white | cap, yellow |
| Маяк Яффо | m_paint_red, m_stone, m_trim, m_white | cap, dark, yellow |
| Арена «Менора» | m_concrete, m_glass, m_metal, m_white | cap |
| Башня «Опера» (Алленби) | m_concrete, m_glass, m_glassB, m_pinkpaint, m_roofflat, m_white | cap, dark |
| Фонтан на площади у «Оперы» | m_concrete, m_water | foam |
| Электростанция Ридинг | m_concrete, m_glass, m_paint_red, m_white | cap |
| Русская церковь | m_blueroof, m_gold, m_patina, m_white | cap, dark |
| Башня Шалом | m_brown, m_glass, m_metal | cap |
| Церковь Св. Петра | m_brick, m_gold, m_roofT, m_stone, m_wood | cap, dark |
| Армейский вертолёт: корпус | m_heli_metal, m_heli_canopy, m_heli_olive | black, lamp, navG, navR |
| Армейский вертолёт: несущий винт | m_heli_blade, m_heli_metal | heliTip |
| Армейский вертолёт: хвостовой винт | m_heli_blade, m_heli_metal | heliTip |

Без текстуры остаются проёмы окон, краска (ставни, разметка, колёса фонтана) и фонарь маяка.

Окна моделей (материалы dark, glass, glassB) ночью светятся вразнобой — карта горящих окон рисуется кодом.

## Три отделки каждого типового дома

Одна модель — три вида: вариант 1 — как в модели, 2 и 3 — свои текстуры и цвет (пока текстуры нет).

| Дом | Вариант 2 | Вариант 3 |
|---|---|---|
| Типовой дом: баухауз | white → m_bh_cream (#efe6d2) | white → m_bh_pastel (#ecd6cf) |
| Типовой дом: 1960-е | beige → m_60_grey (#b8b6b0) | beige → m_60_stone (#dccfb0) |
| Типовой дом: эклектика 1920-х | ochre → m_ecl_pink (#e3a58f); shutterG → цвет (#3d5f86) | ochre → m_ecl_blue (#a9bccb); shutterG → цвет (#7a4b2c) |
