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

## Какие текстуры у каких моделей

| Модель | Текстуры | Без текстуры (цвет) |
|---|---|---|
| Мечеть Хасан-Бек | m_patina, m_gold, m_roofflat, m_stone, m_trim, m_wood | dark |
| Фонтан Агама | m_concrete, m_metal, m_paint_red, m_water | paintBlue, paintGreen, yellow |
| Азриэли | m_concrete, m_glassB, m_metal | yellow |
| «Городские ворота» | m_glass, m_metal | — |
| Часовая башня Яффо | m_roofT, m_stone, m_trim, m_white, m_wood | dark |
| Дельфинариум | m_concrete, m_graffiti, m_rust | dark |
| Театр Габима | m_glass, m_trim, m_white | — |
| Типовой дом: 1960-е | m_beige, m_concrete, m_glass, m_glassB, m_metal, m_shutter, m_white | — |
| Типовой дом: баухауз | m_concrete, m_glass, m_glassB, m_stone, m_white | — |
| Типовой дом: эклектика 1920-х | m_concrete, m_ochre, m_trim | dark, shutterG |
| Штаб в Кирье | m_concrete, m_glass, m_metal, m_paint_red, m_white | yellow |
| Маяк Яффо | m_paint_red, m_stone, m_trim, m_white | dark, yellow |
| Арена «Менора» | m_concrete, m_glass, m_metal, m_white | — |
| Электростанция Ридинг | m_concrete, m_glass, m_paint_red, m_white | — |
| Русская церковь | m_blueroof, m_gold, m_patina, m_white | dark |
| Башня Шалом | m_brown, m_glass, m_metal | — |
| Церковь Св. Петра | m_brick, m_gold, m_roofT, m_stone, m_wood | dark |

Без текстуры остаются проёмы окон, краска (ставни, разметка, колёса фонтана) и фонарь маяка.
