# Промпты для генерации графики

Полный список картинок для игры с готовыми промптами. Номера совпадают с
импортёром `tools/import.html`. Хотите, чтобы всё сгенерировал агент, —
используйте [CLAUDE_CHROME_ASSETS.md](CLAUDE_CHROME_ASSETS.md) (задание для
Claude в Chrome).

Файл собирается автоматически из `js/asset-manifest.js`:
`node tools/build-asset-docs.js`.

## Как пользоваться

1. Генерируйте в Gemini по промптам ниже. Машина: сначала базовая картинка,
   потом в **том же чате** три правки — лёгкие повреждения (`_d1`), тяжёлые
   (`_d2`), сгоревший остов (`_d3`).
2. Скачанные файлы перетащите в `tools/import.html` (откройте его в браузере
   прямо из папки игры). Он разложит их по именам в порядке скачивания,
   уберёт пурпурный фон, обрежет края, развернёт машины носом вверх и соберёт
   ZIP.
3. Распакуйте ZIP в папку игры — появится `assets/gen/…`.

Можно положить PNG и вручную: `assets/gen/<папка>/<имя>.png` (имена ниже).
Всё, чего нет, игра рисует сама. Стадии урона машин необязательны: без них
повреждения рисуются кодом поверх целой машины.

### Требования

| Что | Фон | Ориентация | Формат |
|---|---|---|---|
| Машины | сплошной #FF00FF | вид сверху, **нос вверх** | 3:4, например 768×1024 |
| Персонажи | сплошной #FF00FF | вид сверху, **лицом вправо** | квадрат |
| Объекты | сплошной #FF00FF | вид сверху | квадрат |
| Текстуры | без фона, бесшовная | вид сверху | квадрат 1024×1024 |

# Список (142)

## Машины (88)

### 1. `vehicles/sedan_1.png` — Седан белый

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic white compact family sedan, slightly dusty. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 2. `vehicles/sedan_1_d1.png` — Седан белый — лёгкие повреждения

Правка картинки `sedan_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 3. `vehicles/sedan_1_d2.png` — Седан белый — тяжёлые повреждения

Правка картинки `sedan_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 4. `vehicles/sedan_1_d3.png` — Седан белый — сгоревший остов

Правка картинки `sedan_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 5. `vehicles/sedan_2.png` — Седан серебристый

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic silver sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 6. `vehicles/sedan_2_d1.png` — Седан серебристый — лёгкие повреждения

Правка картинки `sedan_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 7. `vehicles/sedan_2_d2.png` — Седан серебристый — тяжёлые повреждения

Правка картинки `sedan_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 8. `vehicles/sedan_2_d3.png` — Седан серебристый — сгоревший остов

Правка картинки `sedan_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 9. `vehicles/sedan_3.png` — Седан тёмно-серый

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark grey sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 10. `vehicles/sedan_3_d1.png` — Седан тёмно-серый — лёгкие повреждения

Правка картинки `sedan_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 11. `vehicles/sedan_3_d2.png` — Седан тёмно-серый — тяжёлые повреждения

Правка картинки `sedan_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 12. `vehicles/sedan_3_d3.png` — Седан тёмно-серый — сгоревший остов

Правка картинки `sedan_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 13. `vehicles/sedan_4.png` — Седан тёмно-синий

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Generic dark blue sedan. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 14. `vehicles/sedan_4_d1.png` — Седан тёмно-синий — лёгкие повреждения

Правка картинки `sedan_4` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 15. `vehicles/sedan_4_d2.png` — Седан тёмно-синий — тяжёлые повреждения

Правка картинки `sedan_4` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 16. `vehicles/sedan_4_d3.png` — Седан тёмно-синий — сгоревший остов

Правка картинки `sedan_4` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 17. `vehicles/hatch_1.png` — Хэтчбек белый

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Small white city hatchback. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 18. `vehicles/hatch_1_d1.png` — Хэтчбек белый — лёгкие повреждения

Правка картинки `hatch_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 19. `vehicles/hatch_1_d2.png` — Хэтчбек белый — тяжёлые повреждения

Правка картинки `hatch_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 20. `vehicles/hatch_1_d3.png` — Хэтчбек белый — сгоревший остов

Правка картинки `hatch_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 21. `vehicles/hatch_2.png` — Хэтчбек красный

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Small red city hatchback. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 22. `vehicles/hatch_2_d1.png` — Хэтчбек красный — лёгкие повреждения

Правка картинки `hatch_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 23. `vehicles/hatch_2_d2.png` — Хэтчбек красный — тяжёлые повреждения

Правка картинки `hatch_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 24. `vehicles/hatch_2_d3.png` — Хэтчбек красный — сгоревший остов

Правка картинки `hatch_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 25. `vehicles/hatch_3.png` — Хэтчбек старый бежевый

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Old beige hatchback from the 1990s, faded paint. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 26. `vehicles/hatch_3_d1.png` — Хэтчбек старый бежевый — лёгкие повреждения

Правка картинки `hatch_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 27. `vehicles/hatch_3_d2.png` — Хэтчбек старый бежевый — тяжёлые повреждения

Правка картинки `hatch_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 28. `vehicles/hatch_3_d3.png` — Хэтчбек старый бежевый — сгоревший остов

Правка картинки `hatch_3` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 29. `vehicles/suv_1.png` — Джип белый

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White mid-size SUV with roof rails. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 30. `vehicles/suv_1_d1.png` — Джип белый — лёгкие повреждения

Правка картинки `suv_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 31. `vehicles/suv_1_d2.png` — Джип белый — тяжёлые повреждения

Правка картинки `suv_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 32. `vehicles/suv_1_d3.png` — Джип белый — сгоревший остов

Правка картинки `suv_1` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 33. `vehicles/suv_2.png` — Джип чёрный

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black mid-size SUV with tinted windows. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 34. `vehicles/suv_2_d1.png` — Джип чёрный — лёгкие повреждения

Правка картинки `suv_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 35. `vehicles/suv_2_d2.png` — Джип чёрный — тяжёлые повреждения

Правка картинки `suv_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 36. `vehicles/suv_2_d3.png` — Джип чёрный — сгоревший остов

Правка картинки `suv_2` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 37. `vehicles/lux.png` — Чёрный лимузин бригады «Одесса»

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 38. `vehicles/lux_d1.png` — Чёрный лимузин бригады «Одесса» — лёгкие повреждения

Правка картинки `lux` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 39. `vehicles/lux_d2.png` — Чёрный лимузин бригады «Одесса» — тяжёлые повреждения

Правка картинки `lux` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 40. `vehicles/lux_d3.png` — Чёрный лимузин бригады «Одесса» — сгоревший остов

Правка картинки `lux` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 41. `vehicles/taxi.png` — Такси

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 42. `vehicles/taxi_d1.png` — Такси — лёгкие повреждения

Правка картинки `taxi` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 43. `vehicles/taxi_d2.png` — Такси — тяжёлые повреждения

Правка картинки `taxi` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 44. `vehicles/taxi_d3.png` — Такси — сгоревший остов

Правка картинки `taxi` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 45. `vehicles/police.png` — Полиция

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Israeli police SUV: white body with blue and fluorescent yellow-green checkered side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 46. `vehicles/police_d1.png` — Полиция — лёгкие повреждения

Правка картинки `police` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 47. `vehicles/police_d2.png` — Полиция — тяжёлые повреждения

Правка картинки `police` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 48. `vehicles/police_d3.png` — Полиция — сгоревший остов

Правка картинки `police` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 49. `vehicles/ambulance.png` — Скорая

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White emergency ambulance van with red stripes and orange roof lights, generic medical markings without any cross or star symbol. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 50. `vehicles/ambulance_d1.png` — Скорая — лёгкие повреждения

Правка картинки `ambulance` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 51. `vehicles/ambulance_d2.png` — Скорая — тяжёлые повреждения

Правка картинки `ambulance` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 52. `vehicles/ambulance_d3.png` — Скорая — сгоревший остов

Правка картинки `ambulance` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 53. `vehicles/van.png` — Фургон

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Plain white delivery van. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 54. `vehicles/van_d1.png` — Фургон — лёгкие повреждения

Правка картинки `van` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 55. `vehicles/van_d2.png` — Фургон — тяжёлые повреждения

Правка картинки `van` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 56. `vehicles/van_d3.png` — Фургон — сгоревший остов

Правка картинки `van` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 57. `vehicles/van_iran.png` — Фургон иранских агентов

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Dark charcoal-grey windowless van with tinted windows, suspicious, no markings. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 58. `vehicles/van_iran_d1.png` — Фургон иранских агентов — лёгкие повреждения

Правка картинки `van_iran` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 59. `vehicles/van_iran_d2.png` — Фургон иранских агентов — тяжёлые повреждения

Правка картинки `van_iran` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 60. `vehicles/van_iran_d3.png` — Фургон иранских агентов — сгоревший остов

Правка картинки `van_iran` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 61. `vehicles/pickup.png` — Пикап клана Аль-Бахар

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 62. `vehicles/pickup_d1.png` — Пикап клана Аль-Бахар — лёгкие повреждения

Правка картинки `pickup` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 63. `vehicles/pickup_d2.png` — Пикап клана Аль-Бахар — тяжёлые повреждения

Правка картинки `pickup` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 64. `vehicles/pickup_d3.png` — Пикап клана Аль-Бахар — сгоревший остов

Правка картинки `pickup` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 65. `vehicles/sherut.png` — Шерут (маршрутка)

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Yellow shared minibus taxi with a big route number «4» painted on the roof (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 66. `vehicles/sherut_d1.png` — Шерут (маршрутка) — лёгкие повреждения

Правка картинки `sherut` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 67. `vehicles/sherut_d2.png` — Шерут (маршрутка) — тяжёлые повреждения

Правка картинки `sherut` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 68. `vehicles/sherut_d3.png` — Шерут (маршрутка) — сгоревший остов

Правка картинки `sherut` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 69. `vehicles/bus.png` — Городской автобус

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long green-and-white city bus with roof air-conditioning units, generic, no company logo. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 70. `vehicles/bus_d1.png` — Городской автобус — лёгкие повреждения

Правка картинки `bus` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 71. `vehicles/bus_d2.png` — Городской автобус — тяжёлые повреждения

Правка картинки `bus` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 72. `vehicles/bus_d3.png` — Городской автобус — сгоревший остов

Правка картинки `bus` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 73. `vehicles/garbage.png` — Мусоровоз

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Green municipal garbage truck with a yellow stripe at the back. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 74. `vehicles/garbage_d1.png` — Мусоровоз — лёгкие повреждения

Правка картинки `garbage` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 75. `vehicles/garbage_d2.png` — Мусоровоз — тяжёлые повреждения

Правка картинки `garbage` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 76. `vehicles/garbage_d3.png` — Мусоровоз — сгоревший остов

Правка картинки `garbage` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 77. `vehicles/scooter.png` — Скутер «Шмоне-Бис»

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Delivery motor scooter with a big orange insulated food box on the back that reads «8bis» (the only text allowed). Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 78. `vehicles/scooter_d1.png` — Скутер «Шмоне-Бис» — лёгкие повреждения

Правка картинки `scooter` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 79. `vehicles/scooter_d2.png` — Скутер «Шмоне-Бис» — тяжёлые повреждения

Правка картинки `scooter` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 80. `vehicles/scooter_d3.png` — Скутер «Шмоне-Бис» — сгоревший остов

Правка картинки `scooter` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 81. `vehicles/moto.png` — Мотоцикл

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Black sport motorcycle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 82. `vehicles/moto_d1.png` — Мотоцикл — лёгкие повреждения

Правка картинки `moto` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 83. `vehicles/moto_d2.png` — Мотоцикл — тяжёлые повреждения

Правка картинки `moto` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 84. `vehicles/moto_d3.png` — Мотоцикл — сгоревший остов

Правка картинки `moto` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 85. `vehicles/hatch_lions.png` — Хэтчбек «Львов Гондэра»

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Yellow tuned hatchback with a single green racing stripe along the middle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 86. `vehicles/hatch_lions_d1.png` — Хэтчбек «Львов Гондэра» — лёгкие повреждения

Правка картинки `hatch_lions` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 87. `vehicles/hatch_lions_d2.png` — Хэтчбек «Львов Гондэра» — тяжёлые повреждения

Правка картинки `hatch_lions` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 88. `vehicles/hatch_lions_d3.png` — Хэтчбек «Львов Гондэра» — сгоревший остов

Правка картинки `hatch_lions` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```


## Персонажи (33)

### 89. `chars/player.png` — Лёва Гольдман (герой)

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man in his late 20s, short light-brown hair, wearing a white-and-navy horizontally striped sailor shirt, dark blue jeans, white sneakers, a small backpack strap visible. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 90. `chars/player_gun.png` — Лёва с пистолетом

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Young man in his late 20s, short light-brown hair, white-and-navy horizontally striped sailor shirt, dark blue jeans. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 91. `chars/police.png` — Полицейский

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Israeli police officer in a dark navy-blue uniform with light-blue shoulder details, dark cap, utility belt. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 92. `chars/police_gun.png` — Полицейский с пистолетом

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Israeli police officer in a dark navy-blue uniform with light-blue shoulder details, dark cap, utility belt. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 93. `chars/russian.png` — Боец бригады «Одесса»

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Tough man with a shaved head, black leather jacket over a black t-shirt, thick gold chain, dark trousers, pale skin, 1990s-gangster vibe. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 94. `chars/russian_gun.png` — Боец «Одессы» с пистолетом

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Tough man with a shaved head, black leather jacket over a black t-shirt, thick gold chain, dark trousers, pale skin. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 95. `chars/russian_boss.png` — Сёма Кац, глава «Одессы»

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Heavy-set man in his 50s, shaved head, black leather coat over a burgundy silk shirt, several gold rings and a big gold chain, smug look. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 96. `chars/arab.png` — Боец клана Аль-Бахар

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man in a white tracksuit with black side stripes, short black hair with a neat fade, dark sunglasses, white sneakers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 97. `chars/arab_gun.png` — Боец Аль-Бахар с пистолетом

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Young man in a white tracksuit with black side stripes, short black hair, dark sunglasses. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 98. `chars/arab_boss.png` — Абу-Карим, глава клана

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Dignified man in his 60s with a short grey beard, cream-colored linen suit, prayer beads in one hand, calm and authoritative. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 99. `chars/lions.png` — Боец «Львов Гондэра»

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young Ethiopian-Israeli man, short black hair, yellow hoodie with green stripes along the sleeves, black joggers, stylish sneakers. Respectful, non-caricatured depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 100. `chars/lions_gun.png` — Боец «Львов» с пистолетом

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Young Ethiopian-Israeli man, short black hair, yellow hoodie with green stripes along the sleeves, black joggers. Respectful, non-caricatured depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 101. `chars/lions_boss.png` — Абеба, лидер «Львов»

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Ethiopian-Israeli man in his early 30s, short neat hair and trimmed beard, olive bomber jacket over a yellow t-shirt, headphones around the neck. Respectful, non-caricatured depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 102. `chars/iran.png` — Иранский агент

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Man in a plain grey suit with a dark tie, short black hair, short dark beard, dark sunglasses, anonymous secret-agent look. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 103. `chars/iran_gun.png` — Иранский агент с пистолетом

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image. Man in a plain grey suit with a dark tie, short black hair, short dark beard, dark sunglasses. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 104. `chars/shabak.png` — Дани из Шабака

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Fit man in his 40s, plain dark polo shirt and dark trousers, short dark hair, sunglasses, small earpiece, discreet. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 105. `chars/itzik.png` — Ицик «Фалафель»

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Stocky bald man in his 50s with a thick black mustache, green short-sleeve shirt with an apron, gold watch, cheerful market vendor. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 106. `chars/moshe.png` — Моше, бухгалтер

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Thin elderly man with a black kippah, white button-up shirt, holding a worn leather briefcase, glasses. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 107. `chars/shmulik.png` — Шмулик, хозяин квартиры

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Chubby middle-aged man in a tank top and shorts, flip-flops, gold chain, holding a phone and a bunch of keys. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 108. `chars/dvora.png` — Двора, учительница ульпана

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Woman in her 60s with short curly grey hair, colorful scarf, holding a stack of textbooks. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 109. `chars/civ_1.png` — Прохожая

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young Tel Aviv woman with long dark hair, colorful summer dress, sunglasses on her head, tote bag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 110. `chars/civ_2.png` — Харедим

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Ultra-Orthodox man in a black suit and wide-brimmed black hat, white shirt, side curls. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 111. `chars/civ_3.png` — Солдат

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Israeli soldier in olive-green uniform with a rifle slung across the back. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 112. `chars/civ_4.png` — Пожилой в кипе

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Older man with a white crocheted kippah, short-sleeve checked shirt, carrying a plastic shopping bag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 113. `chars/civ_5.png` — Хипстер

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young hipster man with a beard and man-bun, tank top, shorts, holding an iced coffee. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 114. `chars/civ_6.png` — Бабушка с тележкой

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Elderly woman with dyed red hair, cardigan, pushing a small shopping trolley. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 115. `chars/civ_7.png` — Подросток

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Teenage boy with a cap worn backwards, oversized t-shirt, holding an electric scooter handle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 116. `chars/civ_8.png` — Женщина в тихеле

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Woman in a modest long skirt and headscarf (tichel), carrying a baby carrier. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 117. `chars/civ_9.png` — Офисный работник

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Middle-aged office worker in a light blue shirt with rolled sleeves, lanyard badge, phone in hand. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 118. `chars/civ_10.png` — Пляжник с маткот

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Beach-goer man in swim shorts with a towel on the shoulder and a pair of beach paddles. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 119. `chars/civ_11.png` — Женщина в хиджабе

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Woman in a stylish hijab and long coat, holding shopping bags. Respectful depiction. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 120. `chars/civ_12.png` — Турист

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Tourist with a sun hat, camera around the neck, sunburned shoulders, map in hand. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 121. `chars/cat.png` — Уличная кошка

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Skinny ginger tabby street cat seen from directly above, walking to the right. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Объекты улиц (9)

### 122. `props/palm.png` — Финиковая пальма

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Date palm tree seen from directly above: radial green fronds around a brown center, a few orange date clusters. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 123. `props/ficus.png` — Фикус

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Large ficus street tree crown seen from above, dense round dark-green foliage. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 124. `props/bougainvillea.png` — Бугенвиллея

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Bougainvillea bush seen from above, bright magenta-pink flowers over green leaves. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 125. `props/bottle_cage.png` — Клетка для бутылок

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Plastic bottle recycling cage seen from above: square metal mesh cage painted yellow, full of plastic bottles. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 126. `props/trash_bin.png` — Мусорный контейнер

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Large green municipal garbage container on wheels, seen from above, lid closed. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 127. `props/bus_stop.png` — Остановка

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. City bus stop shelter seen from above: long transparent roof panel on a metal frame with a bench, wider than tall. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 128. `props/umbrella.png` — Пляжный зонтик

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Beach umbrella seen from above, alternating white and turquoise segments. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 129. `props/lifeguard_tower.png` — Вышка спасателей

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Beach lifeguard hut on stilts seen from above, white with a red stripe on the roof. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 130. `props/market_stall.png` — Прилавок Шука

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Market stall seen from above: colorful striped awning covering crates of fruit and spices. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Текстуры (12)

### 131. `textures/asphalt.png` — Асфальт

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Worn city asphalt road surface seen from above, dark grey with fine aggregate grain, subtle tire wear, a few faint patches and tiny cracks. Area covers about 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 132. `textures/sidewalk.png` — Тротуарная плитка

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. City sidewalk made of small interlocking concrete paving blocks (grey and faded red-brown rows), slightly dusty, a few stains, seen from above. About 2x2 meters, roughly 12 blocks across. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 133. `textures/jaffa_stone.png` — Камень Яффо

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Old pavement made of large worn limestone blocks (warm cream and honey colors), irregular joints with sand in them, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 134. `textures/plaza.png` — Плиты площади

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Large light beige stone slabs of a modern city square, subtle variations between slabs, clean joints, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 135. `textures/sand.png` — Песок пляжа

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Fine Mediterranean beach sand, pale golden, gentle wind ripples, a few footprints and tiny shells, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 136. `textures/grass.png` — Газон

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Sun-dried park lawn, mix of green and yellowish patches, short grass blades, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 137. `textures/water.png` — Море

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Turquoise-blue Mediterranean sea water seen from above, gentle small waves and sun glints. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 138. `textures/deck.png` — Настил порта

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Weathered wooden boardwalk planks, warm brown, visible plank gaps and nail heads, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 139. `textures/scrub.png` — Сухой кустарник

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Dry Mediterranean scrubland ground: dusty olive-green bushes, dry yellow grass, small stones, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 140. `textures/roof_gravel.png` — Плоская крыша

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Flat apartment rooftop surface: white bitumen waterproof coating, slightly dirty with water stains and patches, seen from above. Mostly light. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 141. `textures/roof_tiles.png` — Черепица

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Terracotta clay roof tiles, rows of orange-red tiles seen straight from above, slight weathering. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 142. `textures/roof_metal.png` — Металлическая крыша

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Corrugated metal warehouse roof seen from above, light grey with parallel ridges, a little rust. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

