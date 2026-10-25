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
| Фасады, витрины | без фона, заполнена целиком | **вид спереди**, как чертёж стены | 16:9 |
| Текстуры | без фона, бесшовная | вид сверху | квадрат 1024×1024 |
| Портреты | свой цветной фон | по плечи, лицом к зрителю | квадрат |

# Список (357)

## Машины (122)

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

### 37. `vehicles/lux.png` — Чёрный представительский седан

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Long black luxury executive sedan with tinted windows and chrome details. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 38. `vehicles/lux_d1.png` — Чёрный представительский седан — лёгкие повреждения

Правка картинки `lux` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 39. `vehicles/lux_d2.png` — Чёрный представительский седан — тяжёлые повреждения

Правка картинки `lux` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 40. `vehicles/lux_d3.png` — Чёрный представительский седан — сгоревший остов

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

### 61. `vehicles/pickup.png` — Пикап

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White pickup truck with an open cargo bed containing a few wooden crates. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 62. `vehicles/pickup_d1.png` — Пикап — лёгкие повреждения

Правка картинки `pickup` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 63. `vehicles/pickup_d2.png` — Пикап — тяжёлые повреждения

Правка картинки `pickup` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 64. `vehicles/pickup_d3.png` — Пикап — сгоревший остов

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


## Персонажи (108)

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


## Фасады и витрины (30)

### 122. `facades/facade_bauhaus.png` — Фасад баухауз (центр)

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Slightly weathered white plaster Tel Aviv Bauhaus apartment facade: horizontal ribbon windows with white frames, half-lowered grey plastic roller shutters, long curved white balcony slabs, air-conditioner boxes with black drip stains below them, electric cables, potted plants and laundry on balconies.
```

### 123. `facades/facade_florentin.png` — Фасад Флорентина

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Worn beige-grey plaster facade of an old apartment building in a gritty artsy neighbourhood: mismatched roller shutters, rusty balcony railings with laundry, black water stains, peeling plaster, tangled cables, a colourful graffiti piece on the lower part, many air-conditioner boxes, a paper «להשכרה» (for rent) sign on a balcony.
```

### 124. `facades/facade_jaffa.png` — Фасад Яффо (камень)

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Old Ottoman-era facade of warm honey-coloured limestone blocks: tall arched windows with green wooden shutters, small decorative stone details.
```

### 125. `facades/facade_nevetzedek.png` — Фасад Неве-Цедека

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Restored 1900s low-rise facade in pastel plaster (peach or cream): tall rectangular windows with teal wooden shutters, ornamental cornice.
```

### 126. `facades/facade_concrete.png` — Фасад «шикун» (бетон)

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Plain 1960s concrete housing block facade: grey-beige concrete, simple windows, boxy enclosed balconies, many air-conditioner units, water stains.
```

### 127. `facades/facade_hotel.png` — Фасад отеля на набережной

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Modern white beachfront hotel facade: floor-to-ceiling blue-tinted windows and continuous glass balcony railings.
```

### 128. `facades/facade_tower.png` — Фасад стеклянной башни

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Glass curtain wall of a modern office skyscraper: blue reflective glass panels in a dark metal grid.
```

### 129. `facades/facade_warehouse.png` — Фасад склада в порту

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Old port warehouse wall: grey corrugated metal with rust streaks and a large roller door.
```

### 130. `facades/shop_1.png` — Витрина: маколет

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Neighbourhood grocery (makolet) with a blue sign reading «מכולת» and «24/7», stacked plastic crates of drink bottles at the door, white ice-cream freezer, shelves crammed with colourful products behind dirty glass.
```

### 131. `facades/shop_2.png` — Витрина: пицуцийя

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Late-night kiosk (pitzutzia) with a red sign reading «פיצוצייה», a pink neon OPEN sign, snacks and sweets piled in the window, lottery posters.
```

### 132. `facades/shop_3.png` — Витрина: шаварма

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Shawarma joint with a yellow sign reading «שווארמה», a rotating meat spit visible through the window, a black menu board with prices in shekels, plastic chairs outside.
```

### 133. `facades/shop_4.png` — Витрина: фалафельная

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Small falafel stand with a green sign reading «פלאפל», striped awning, counter with colourful salad trays.
```

### 134. `facades/shop_5.png` — Витрина: русский гастроном

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Russian delicatessen with a dark green sign reading «ГАСТРОНОМ» in Cyrillic, hanging sausages, jars and bottles in the window.
```

### 135. `facades/shop_6.png` — Витрина: парикмахерская

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Old barber shop with a dark sign reading «מספרה» and below «Парикмахерская», a red-white-blue barber pole, a mirror and a barber chair inside.
```

### 136. `facades/shop_7.png` — Витрина: ремонт телефонов

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Phone repair and accessories shop with a red sign reading «סלולר», phone cases on the wall, yellow sale stickers on the glass.
```

### 137. `facades/shop_8.png` — Витрина: закрытая лавка «сдаётся»

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no logos, no watermark. Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby. Closed shop with a lowered grey metal roller shutter covered in colourful graffiti, faded old sign above, a paper sign «להשכרה» with a phone number taped on the shutter.
```


## Объекты улиц (25)

### 138. `props/palm.png` — Финиковая пальма

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Date palm tree seen from directly above: radial green fronds around a brown center, a few orange date clusters. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 139. `props/ficus.png` — Фикус

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Large ficus street tree crown seen from above, dense round dark-green foliage. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 140. `props/bougainvillea.png` — Бугенвиллея

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Bougainvillea bush seen from above, bright magenta-pink flowers over green leaves. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 141. `props/bottle_cage.png` — Клетка для бутылок

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Plastic bottle recycling cage seen from above: square metal mesh cage painted yellow, full of plastic bottles. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 142. `props/trash_bin.png` — Мусорный контейнер

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Large green municipal garbage container on wheels, seen from above, lid closed. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 143. `props/bus_stop.png` — Остановка

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. City bus stop shelter seen from above: long transparent roof panel on a metal frame with a bench, wider than tall. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 144. `props/umbrella.png` — Пляжный зонтик

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Beach umbrella seen from above, alternating white and turquoise segments. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 145. `props/lifeguard_tower.png` — Вышка спасателей

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Beach lifeguard hut on stilts seen from above, white with a red stripe on the roof. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 146. `props/market_stall.png` — Прилавок Шука

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Market stall seen from above: colorful striped awning covering crates of fruit and spices. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Текстуры (41)

### 147. `textures/asphalt.png` — Асфальт

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Worn city asphalt road surface seen from above, dark grey with fine aggregate grain, subtle tire wear, a few faint patches and tiny cracks. Area covers about 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 148. `textures/sidewalk.png` — Тротуарная плитка

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. City sidewalk made of small interlocking concrete paving blocks (grey and faded red-brown rows), slightly dusty, a few stains, seen from above. About 2x2 meters, roughly 12 blocks across. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 149. `textures/jaffa_stone.png` — Камень Яффо

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Old pavement made of large worn limestone blocks (warm cream and honey colors), irregular joints with sand in them, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 150. `textures/plaza.png` — Плиты площади

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Large light beige stone slabs of a modern city square, subtle variations between slabs, clean joints, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 151. `textures/sand.png` — Песок пляжа

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Fine Mediterranean beach sand, pale golden, gentle wind ripples, a few footprints and tiny shells, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 152. `textures/grass.png` — Газон

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Sun-dried park lawn, mix of green and yellowish patches, short grass blades, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 153. `textures/water.png` — Море

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Turquoise-blue Mediterranean sea water seen from above, gentle small waves and sun glints. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 154. `textures/deck.png` — Настил порта

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Weathered wooden boardwalk planks, warm brown, visible plank gaps and nail heads, seen from above. About 2x2 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 155. `textures/scrub.png` — Сухой кустарник

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Dry Mediterranean scrubland ground: dusty olive-green bushes, dry yellow grass, small stones, seen from above. About 4x4 meters. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 156. `textures/roof_gravel.png` — Плоская крыша

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Flat apartment rooftop surface: white bitumen waterproof coating, slightly dirty with water stains and patches, seen from above. Mostly light. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 157. `textures/roof_tiles.png` — Черепица

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Terracotta clay roof tiles, rows of orange-red tiles seen straight from above, slight weathering. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```

### 158. `textures/roof_metal.png` — Металлическая крыша

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Corrugated metal warehouse roof seen from above, light grey with parallel ridges, a little rust. Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.
```


## Портреты для звонков (22)

### 159. `portraits/portrait_leva.png` — Портрет: Лёва Гольдман

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Leva, a Russian-Jewish new immigrant from St. Petersburg in his late 20s: short light-brown hair, sunburnt nose and cheeks, a drop of sweat on the forehead from the heat, tired but stubborn half-smile, white-and-navy striped sailor undershirt (telnyashka). Background: pale sky blue.
```

### 160. `portraits/portrait_itzik.png` — Портрет: Ицик «Фалафель»

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Itzik, a stocky bald Tel Aviv market vendor in his 50s: huge black mustache, bushy eyebrows, wide grin with one gold tooth, green short-sleeve shirt with a white apron, gold watch, holding a falafel pita. Background: warm yellow.
```

### 161. `portraits/portrait_sema.png` — Портрет: Сёма Кац

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Syoma, a heavy-set Russian mobster boss in his 50s: shaved head, square jaw, narrow smug eyes and a crooked smirk, black leather coat over a burgundy silk shirt, thick gold chain, gold rings, raising a small shot glass. Background: dark red.
```

### 162. `portraits/portrait_abu.png` — Портрет: Абу-Карим

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Abu-Karim, a dignified clan elder from Jaffa in his 60s: short neat grey beard, calm wise eyes, cream linen suit with an open collar, prayer beads in one hand, a tiny cup of cardamom coffee in the other. Background: deep teal.
```

### 163. `portraits/portrait_abeba.png` — Портрет: Абеба

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Abeba, an Ethiopian-Israeli community leader in his early 30s: short neat hair and trimmed beard, confident warm smile, olive bomber jacket over a yellow t-shirt, big headphones around the neck. Respectful depiction. Background: green.
```

### 164. `portraits/portrait_dani.png` — Портрет: Дани из Шабака

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Dani, a Shin Bet agent in his 40s: square jaw, deadpan serious face, dark sunglasses, short dark hair, earpiece with a coiled wire, plain dark polo shirt. Background: grey-blue.
```

### 165. `portraits/portrait_ali.png` — Портрет: «Али» из Телеграма

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. A mysterious anonymous online recruiter: a man in a dark hoodie, face mostly hidden in shadow with only a sly smile and glinting eyes, the cold blue glow of a smartphone screen lighting his chin. No app logos. Background: dark navy.
```

### 166. `portraits/portrait_ortal.png` — Портрет: Орталь из Мисрад а-Клита

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Ortal, a bored Israeli government office clerk in her 40s: big curly dyed-blonde hair, long bright pink nails, reading glasses, unimpressed raised eyebrow, holding a paper cup of coffee. Background: pale institutional green.
```

### 167. `portraits/portrait_shmulik.png` — Портрет: Шмулик, хозяин квартиры

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Shmulik, a chubby Tel Aviv landlord in his 50s: receding hair, stubble, scheming grin, white tank top, gold chain, a phone pressed to his ear and a bunch of keys in the other hand. Background: orange.
```

### 168. `portraits/portrait_dvora.png` — Портрет: Двора, учительница ульпана

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Dvora, a strict but kind Hebrew teacher in her 60s: short curly grey hair, colorful orange scarf, reading glasses on the tip of her nose, raised index finger, holding a stack of textbooks. Background: lilac.
```


## Фасады и витрины (30)

### 169. `facades/facade_power.png` — Фасад: электростанция Ридинг

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Industrial facade of a 1930s seaside power station: pale weathered concrete, tall narrow vertical strip windows with rusty steel frames, a faded red stripe along the top, exposed pipes and ventilation grilles.
```

### 170. `facades/facade_church.png` — Фасад: церковь в Яффо

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Facade of an old Franciscan stone church in Jaffa: warm honey-coloured limestone blocks, tall arched windows with simple coloured glass, carved stone cornice and pilasters.
```

### 171. `facades/facade_mosque.png` — Фасад: мечеть Хасан-Бек

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Ottoman-era mosque wall near the sea: pale sand-coloured limestone, a row of pointed arch windows with green wooden shutters and iron grilles, a decorative stone band between floors.
```

### 172. `facades/facade_arena.png` — Фасад: спортивная арена

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Exterior wall of a modern indoor sports arena: horizontal bands of light grey aluminium panels alternating with strips of dark blue glass, white vertical structural ribs.
```

### 173. `facades/facade_citygate.png` — Фасад: башня «Городские ворота»

Новая картинка, формат горизонтальный 16:9.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, no text, no logos, no watermark. Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars. Curtain wall of the tallest skyscraper in Ramat Gan: dark blue reflective glass with thin vertical silver fins in a very regular grid, a few lit office windows.
```


## Портреты для звонков (22)

### 174. `portraits/portrait_garik.png` — Портрет: Гарик, племянник Сёмы

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Garik, the hot-headed nephew of a Russian mob boss, early 20s: messy dark curly hair, stubble, cocky crooked smirk, narrowed jealous eyes, black leather jacket over a red t-shirt, thin gold chain, car keys spinning on one finger. Background: bright red.
```

### 175. `portraits/portrait_fira.png` — Портрет: Фира Марковна

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Fira Markovna, an elegant elderly bookkeeper from Odessa in her 70s: neat grey curls, reading glasses on a chain, sharp clever eyes, brown cardigan and a turquoise silk scarf, an old calculator in one hand and a stack of banknotes in the other. Background: warm beige.
```

### 176. `portraits/portrait_botsman.png` — Портрет: Боцман

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Botsman, a silent former sailor in his 60s who runs the port for the gang: bald weathered head, short grey beard, bushy eyebrows, stern squint, striped navy-and-white sailor undershirt under a dark pea coat, a pipe in the corner of his mouth, an anchor tattoo on the hand. Background: slate grey-blue.
```

### 177. `portraits/portrait_roza.png` — Портрет: Роза Львовна

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Roza Lvovna, the mob boss's mother in her late 70s: voluminous auburn-dyed curls, big round glasses, bright lipstick, purple blouse with a brooch, warm but demanding smile, holding a jar of homemade jam. Background: soft pink.
```

### 178. `portraits/portrait_shlomi.png` — Портрет: Шломи, помощник министра

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Shlomi, a slick political aide in his 30s: gelled short black hair, stubble, toothy salesman grin, untucked white shirt with sleeves rolled up, two phones — one at his ear and one in his hand, a small national flag pin. Background: light blue.
```

### 179. `portraits/portrait_yoav.png` — Портрет: журналист Йоав

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Yoav, a stubborn investigative TV journalist in his 30s: tousled brown hair, thick-rimmed glasses, tired eyes, stubble, grey hoodie with a press badge on a lanyard, holding a battered laptop. Background: orange.
```

### 180. `portraits/portrait_karim.png` — Портрет: Карим

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Karim, a young man from Jaffa in his early 20s: short black hair, frightened but brave eyes, a small bruise on the cheekbone, plain white hoodie, holding his own wrist where a rope was. Sympathetic depiction. Background: teal.
```


## Персонажи (108)

### 181. `chars/garik.png` — Гарик

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man with messy dark curly hair, black leather jacket over a red t-shirt, thin gold chain, dark jeans, flashy sneakers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 182. `chars/karim.png` — Карим

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young man with short black hair, plain white hoodie, grey sweatpants, a bit of rope still around one wrist. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 183. `chars/roza.png` — Роза Львовна

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Elderly woman with voluminous auburn curls, purple blouse, long dark skirt, a big handbag. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 184. `chars/yoav.png` — Журналист Йоав

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Man in his 30s with tousled brown hair and glasses, grey hoodie, press badge on a lanyard, laptop bag across the body. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 185. `chars/baba.png` — Бабушка Хая

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Very old woman with short white curly hair, lilac cardigan, sitting-ready posture, holding a cane. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 186. `chars/protester.png` — Протестующий

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Young protester in a blue t-shirt holding a large blue-and-white flag on a pole over the shoulder. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 187. `chars/supporter.png` — Сторонник правительства

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Man in a dark-blue cap and white t-shirt, holding a blue-and-white flag, angry posture. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 188. `chars/mechanic.png` — Механик

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Car mechanic in grey oil-stained overalls holding a large wrench. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 189. `chars/runner.png` — Беглец-киоскёр

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. Skinny man in an orange t-shirt and shorts, running pose with one arm forward. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Машины (122)

### 190. `vehicles/truck.png` — Тягач с контейнером

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 191. `vehicles/truck_d1.png` — Тягач с контейнером — лёгкие повреждения

Правка картинки `truck` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 192. `vehicles/truck_d2.png` — Тягач с контейнером — тяжёлые повреждения

Правка картинки `truck` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 193. `vehicles/truck_d3.png` — Тягач с контейнером — сгоревший остов

Правка картинки `truck` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 194. `vehicles/barrel.png` — Бочка с топливом

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark.  A single red steel fuel drum seen from directly above: round lid with two caps and a yellow hazard triangle, metal rings, filling about 70% of the image. Square image. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Объекты улиц (25)

### 195. `props/planter.png` — Кадка с цветами

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Round terracotta street planter seen from above, full of green leaves and pink and yellow flowers. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 196. `props/hydrant.png` — Гидрант

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Red fire hydrant on a sidewalk seen from directly above, small, with a yellow cap. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 197. `props/elbox.png` — Электрошкаф с граффити

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Grey metal electrical utility cabinet on a sidewalk seen from above, covered in colorful spray-paint tags. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 198. `props/cafe_set.png` — Столик кафе

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Small round white cafe table with three dark chairs around it seen from above, a coffee cup on the table. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 199. `props/picnic_table.png` — Стол для пикника

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Wooden picnic table with two attached benches seen from above. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 200. `props/playground.png` — Детская площадка

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Small children's playground seen from above on a sand-colored rubber surface: a red slide, a blue swing frame, a green round spinner, framed by a low wooden border. Square. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 201. `props/lounger.png` — Лежак

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. White plastic beach sun lounger with a blue towel seen from above, longer than wide. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 202. `props/shopping_cart.png` — Тележка из супермаркета

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Abandoned metal supermarket shopping cart seen from above, red handle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 203. `props/fountain_small.png` — Фонтанчик

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Small round stone fountain with clear blue water seen from above, a stone basin in the middle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 204. `props/flower_bed.png` — Клумба

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Square raised flower bed with a low stone border seen from above, green grass and small bright flowers, a young tree in the center. Square, fills the image. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 205. `props/crates.png` — Ящики

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A stack of four wooden shipping crates seen from above. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 206. `props/container_top.png` — Морской контейнер

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single red corrugated steel shipping container seen from directly above, long and narrow, roof ribs visible, no writing. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 207. `props/kiosk.png` — Киоск

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Small Tel Aviv street kiosk seen from above: a square booth with a striped green-and-white awning roof and a few crates of drinks beside it. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 208. `props/ad_column.png` — Афишная тумба

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. Round green advertising pillar (Morris column) seen from directly above: dark green domed top cap, colorful posters visible around the edge. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Фасады и витрины (30)

### 209. `facades/poster_1.png` — Щит: доставка «Шмоне-Бис»

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A happy delivery rider on an orange scooter with a big orange delivery box speeding past Tel Aviv palm trees, sunny, dynamic.
```

### 210. `facades/poster_2.png` — Щит: хумус «Абу-Сами»

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A big plate of creamy hummus with olive oil, chickpeas and paprika next to warm pita, appetizing close-up, warm earthy colors.
```

### 211. `facades/poster_3.png` — Щит: кондиционеры «Коль-Кар»

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A family relaxing in a cool blue living room with an air conditioner blowing snowflakes while a red-hot desert wind blows outside the window, humorous.
```

### 212. `facades/poster_4.png` — Щит: ульпан «Алеф»

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. Smiling adult students of different ages in a bright classroom raising their hands, a whiteboard with a big Hebrew letter Alef, friendly.
```

### 213. `facades/poster_5.png` — Щит: лотерея «Мазаль»

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. Golden lottery balls and a shower of gold coins and confetti on a purple background, glamorous.
```

### 214. `facades/poster_6.png` — Щит: квартиры в Бат-Яме

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A shiny new residential tower by the sea at sunset with a tiny price tag dangling from it, ironic real-estate ad style.
```

### 215. `facades/poster_7.png` — Щит: тариф «Шалом»

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A smartphone with waves of signal bars and stylized data icons flying out of it, turquoise background, energetic.
```

### 216. `facades/poster_8.png` — Щит: мороженое «Лимон»

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A huge pink-and-yellow ice cream cone with a lemon slice dripping in the sun on the beach, playful.
```

### 217. `facades/poster_iran.png` — Щит: «Протест оплачивает Иран»

Новая картинка, формат горизонтальный 16:9.

```
Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. A dramatic propaganda-style political poster: a crowd of protesters as dark silhouettes with banknotes raining down on them from above, red and black colors, ominous.
```


## Персонажи (108)

### 218. `chars/player_walk1.png` — Лёва — шаг левой

Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 219. `chars/player_walk2.png` — Лёва — шаг правой

Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 220. `chars/player_gun_walk1.png` — Лёва с пистолетом — шаг левой

Правка картинки `player_gun` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 221. `chars/player_gun_walk2.png` — Лёва с пистолетом — шаг правой

Правка картинки `player_gun` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 222. `chars/russian_boss_walk1.png` — Сёма Кац — шаг левой

Правка картинки `russian_boss` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 223. `chars/russian_boss_walk2.png` — Сёма Кац — шаг правой

Правка картинки `russian_boss` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 224. `chars/garik_walk1.png` — Гарик — шаг левой

Правка картинки `garik` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 225. `chars/garik_walk2.png` — Гарик — шаг правой

Правка картинки `garik` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 226. `chars/karim_walk1.png` — Карим — шаг левой

Правка картинки `karim` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 227. `chars/karim_walk2.png` — Карим — шаг правой

Правка картинки `karim` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```

### 228. `chars/shabak_walk1.png` — Дани из Шабака — шаг левой

Правка картинки `shabak` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back. Same art style, same lighting.
```

### 229. `chars/shabak_walk2.png` — Дани из Шабака — шаг правой

Правка картинки `shabak` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back. Same art style, same lighting.
```


## Машины (122)

### 230. `vehicles/civic.png` — Белый «Цивик» Даниса

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. White sporty Japanese compact sedan from the late 2000s, slightly lowered, dark tinted windows, black aftermarket alloy wheels, small rear spoiler on the trunk, a few stickers on the rear window (no readable text), no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 231. `vehicles/civic_d1.png` — Белый «Цивик» Даниса — лёгкие повреждения

Правка картинки `civic` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 232. `vehicles/civic_d2.png` — Белый «Цивик» Даниса — тяжёлые повреждения

Правка картинки `civic` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 233. `vehicles/civic_d3.png` — Белый «Цивик» Даниса — сгоревший остов

Правка картинки `civic` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 234. `vehicles/solaris.png` — Серый «Солярис» Димы

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Grey budget Korean-style compact sedan from the mid-2010s, plain and practical, a bit dusty, a small dent on the rear bumper, no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 235. `vehicles/solaris_d1.png` — Серый «Солярис» Димы — лёгкие повреждения

Правка картинки `solaris` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 236. `vehicles/solaris_d2.png` — Серый «Солярис» Димы — тяжёлые повреждения

Правка картинки `solaris` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 237. `vehicles/solaris_d3.png` — Серый «Солярис» Димы — сгоревший остов

Правка картинки `solaris` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 238. `vehicles/china_ev.png` — Новый китайский кроссовер

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. Brand-new compact Chinese crossover in pearl-white with a black panoramic glass roof, hidden door handles, a thin full-width light bar at the front and back, clean futuristic Chinese design, no badges. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Объекты улиц (25)

### 239. `props/mattress.png` — Матрас на крышу

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A double bed mattress, white with a light-blue quilted pattern, tied with two orange cargo straps across it, seen from directly above, rectangular, longer than wide. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Портреты для звонков (22)

### 240. `portraits/portrait_dima.png` — Портрет: Дима

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Dima, Leva's flatmate and fellow immigrant, early 30s, practical and a bit stingy, holding a phone with a car sale ad. Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Background: light grey-blue.
```

### 241. `portraits/portrait_danis.png` — Портрет: Данис

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Danis, Leva's friend from the ulpan, late 20s, hot-headed street racer, proud of his car, holding his car keys. Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Background: hot orange.
```

### 242. `portraits/portrait_semyon.png` — Портрет: Семён

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Semyon, Leva's second flatmate, early 30s, calm and easy-going, always moving to a new apartment, hugging a rolled-up pillow. Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Background: mint green.
```


## Персонажи (108)

### 243. `chars/dima.png` — Дима

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. A man wearing grey t-shirt, dark jeans, sneakers, phone in hand. Base the hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 244. `chars/danis.png` — Данис

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. A man wearing black t-shirt, light jeans, white sneakers, car keys in hand. Base the hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 245. `chars/semyon.png` — Семён

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single person seen from directly above (bird's-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image. A man wearing white t-shirt, shorts, flip-flops. Base the hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Машины (122)

### 246. `vehicles/lux_odessa.png` — Машина бригады «Одесса»

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Odessa Brigade, a Russian-speaking 1990s-style mafia: an absurdly long black luxury limousine-sedan with a huge chrome grille, gold-plated rims, gold trim along the sides, heavily tinted windows, fluffy dice visible through the windshield. ROOF EMBLEM: a big golden anchor with a small crown on top, inside a blood-red circle with a thick gold ring. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 247. `vehicles/lux_odessa_d1.png` — Машина бригады «Одесса» — лёгкие повреждения

Правка картинки `lux_odessa` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 248. `vehicles/lux_odessa_d2.png` — Машина бригады «Одесса» — тяжёлые повреждения

Правка картинки `lux_odessa` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 249. `vehicles/lux_odessa_d3.png` — Машина бригады «Одесса» — сгоревший остов

Правка картинки `lux_odessa` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 250. `vehicles/pickup_bahar.png` — Пикап клана Аль-Бахар

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Al-Bahar clan from old Jaffa port ("bahar" means sea): a white monster pickup truck on huge off-road tyres and raised suspension, teal-green racing stripes, black roll bar with a row of big round spotlights, the open cargo bed overflowing with crates of bright Jaffa oranges and a fishing net. ROOF EMBLEM: a big teal-green circle with a white stylized curling sea wave and a jumping fish. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 251. `vehicles/pickup_bahar_d1.png` — Пикап клана Аль-Бахар — лёгкие повреждения

Правка картинки `pickup_bahar` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 252. `vehicles/pickup_bahar_d2.png` — Пикап клана Аль-Бахар — тяжёлые повреждения

Правка картинки `pickup_bahar` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 253. `vehicles/pickup_bahar_d3.png` — Пикап клана Аль-Бахар — сгоревший остов

Правка картинки `pickup_bahar` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```


## Объекты улиц (25)

### 254. `props/payphone.png` — Таксофон

Новая картинка, формат квадрат 1:1.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. An Israeli street payphone on a single pole, seen from directly above: a grey metal box under a small curved grey hood with a blue stripe along its edge, a black handset on a coiled cord at one side, slightly worn and scratched, rectangular footprint. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```


## Персонажи (108)

### 255. `chars/player_bat.png` — Лёва с битой

Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: holding a wooden baseball bat in both hands, raised over his right shoulder, ready to swing. Same art style, same lighting.
```

### 256. `chars/player_shotgun.png` — Лёва с дробовиком

Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding a pump-action shotgun with a wooden stock. Same art style, same lighting.
```

### 257. `chars/player_uzi.png` — Лёва с узи

Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding a compact black submachine gun with a short magazine. Same art style, same lighting.
```

### 258. `chars/player_ak.png` — Лёва с автоматом

Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding an assault rifle with a wooden stock and a curved magazine. Same art style, same lighting.
```

### 259. `chars/player_rpg.png` — Лёва с РПГ

Правка картинки `player` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: an olive-green rocket launcher tube resting on his right shoulder and pointing to the right, both hands on its grips. Same art style, same lighting.
```

### 260. `chars/russian_ak.png` — Боец «Одессы» с автоматом

Правка картинки `russian` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding an assault rifle with a wooden stock and a curved magazine. Same art style, same lighting.
```

### 261. `chars/russian_shotgun.png` — Боец «Одессы» с дробовиком

Правка картинки `russian` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding a pump-action shotgun with a wooden stock. Same art style, same lighting.
```

### 262. `chars/arab_uzi.png` — Боец Аль-Бахар с узи

Правка картинки `arab` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding a compact black submachine gun with a short magazine. Same art style, same lighting.
```

### 263. `chars/arab_shotgun.png` — Боец Аль-Бахар с дробовиком

Правка картинки `arab` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding a pump-action shotgun with a wooden stock. Same art style, same lighting.
```

### 264. `chars/lions_bat.png` — Боец «Львов» с битой

Правка картинки `lions` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: holding a wooden baseball bat in both hands, raised over his right shoulder, ready to swing. Same art style, same lighting.
```

### 265. `chars/lions_uzi.png` — Боец «Львов» с узи

Правка картинки `lions` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding a compact black submachine gun with a short magazine. Same art style, same lighting.
```

### 266. `chars/iran_uzi.png` — Иранский агент с узи

Правка картинки `iran` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding a compact black submachine gun with a short magazine. Same art style, same lighting.
```

### 267. `chars/iran_ak.png` — Иранский агент с автоматом

Правка картинки `iran` из этого же чата.

```
Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: both arms extended forward to the right holding an assault rifle with a wooden stock and a curved magazine. Same art style, same lighting.
```


## Машины (122)

### 268. `vehicles/lions_car.png` — Машина «Львов Гондэра»

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. Lions of Gondar, a crew of young Ethiopian-Israeli rappers with their own music studio: a bright yellow tuned street-racer hatchback with a gigantic rear spoiler, wide flared fenders, neon-green underglow, green and red racing stripes, two huge subwoofer speakers visible through the open rear hatch. ROOF EMBLEM: a big roaring lion head wearing a crown, yellow and black, inside a green circle. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 269. `vehicles/lions_car_d1.png` — Машина «Львов Гондэра» — лёгкие повреждения

Правка картинки `lions_car` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 270. `vehicles/lions_car_d2.png` — Машина «Львов Гондэра» — тяжёлые повреждения

Правка картинки `lions_car` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 271. `vehicles/lions_car_d3.png` — Машина «Львов Гондэра» — сгоревший остов

Правка картинки `lions_car` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 272. `vehicles/iran_car.png` — Фургон иранской сети

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, no real brand badges. Vehicle fills about 85% of the image height. CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters. The Iranian spy network pretending to be a carpet delivery company: a dark charcoal-grey boxy van, comically suspicious, bristling with antennas and a satellite dish on the roof edge, blacked-out windows, rolled-up Persian-style carpets strapped to the roof rack along the sides. ROOF EMBLEM: a fake carpet-shop logo — a big rolled red carpet with a single watchful eye in the middle, inside an orange diamond. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 273. `vehicles/iran_car_d1.png` — Фургон иранской сети — лёгкие повреждения

Правка картинки `iran_car` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 274. `vehicles/iran_car_d2.png` — Фургон иранской сети — тяжёлые повреждения

Правка картинки `iran_car` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 275. `vehicles/iran_car_d3.png` — Фургон иранской сети — сгоревший остов

Правка картинки `iran_car` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```

### 276. `vehicles/leva_vw.png` — «Фолькс» Лёвы

Новая картинка, формат вертикальный 3:4.

```
Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark. A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height. A tired old 1990s German compact hatchback (classic boxy two-box shape), faded pale grey-blue paint with sun-bleached roof, the front left door in a different color (matte primer grey), small dents and rust spots, plain steel wheels, two black roof-rack bars, a cracked plastic mirror held with tape, no badges. A lovable clunker. Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.
```

### 277. `vehicles/leva_vw_d1.png` — «Фолькс» Лёвы — лёгкие повреждения

Правка картинки `leva_vw` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.
```

### 278. `vehicles/leva_vw_d2.png` — «Фолькс» Лёвы — тяжёлые повреждения

Правка картинки `leva_vw` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.
```

### 279. `vehicles/leva_vw_d3.png` — «Фолькс» Лёвы — сгоревший остов

Правка картинки `leva_vw` из этого же чата.

```
Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.
```


## Персонажи (108)

### 280. `chars/player_dead.png` — Лёва Гольдман (герой) — убитый

Правка картинки `player` из этого же чата.

```
Use the attached reference image ref_player.png (Лёва Гольдман (герой)). Draw EXACTLY this character from ref_player.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 281. `chars/police_dead.png` — Полицейский — убитый

Правка картинки `police` из этого же чата.

```
Use the attached reference image ref_police.png (Полицейский). Draw EXACTLY this character from ref_police.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 282. `chars/russian_dead.png` — Боец бригады «Одесса» — убитый

Правка картинки `russian` из этого же чата.

```
Use the attached reference image ref_russian.png (Боец бригады «Одесса»). Draw EXACTLY this character from ref_russian.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 283. `chars/russian_boss_dead.png` — Сёма Кац, глава «Одессы» — убитый

Правка картинки `russian_boss` из этого же чата.

```
Use the attached reference image ref_russian_boss.png (Сёма Кац, глава «Одессы»). Draw EXACTLY this character from ref_russian_boss.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 284. `chars/arab_dead.png` — Боец клана Аль-Бахар — убитый

Правка картинки `arab` из этого же чата.

```
Use the attached reference image ref_arab.png (Боец клана Аль-Бахар). Draw EXACTLY this character from ref_arab.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 285. `chars/arab_boss_dead.png` — Абу-Карим, глава клана — убитый

Правка картинки `arab_boss` из этого же чата.

```
Use the attached reference image ref_arab_boss.png (Абу-Карим, глава клана). Draw EXACTLY this character from ref_arab_boss.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 286. `chars/lions_dead.png` — Боец «Львов Гондэра» — убитый

Правка картинки `lions` из этого же чата.

```
Use the attached reference image ref_lions.png (Боец «Львов Гондэра»). Draw EXACTLY this character from ref_lions.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 287. `chars/lions_boss_dead.png` — Абеба, лидер «Львов» — убитый

Правка картинки `lions_boss` из этого же чата.

```
Use the attached reference image ref_lions_boss.png (Абеба, лидер «Львов»). Draw EXACTLY this character from ref_lions_boss.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 288. `chars/iran_dead.png` — Иранский агент — убитый

Правка картинки `iran` из этого же чата.

```
Use the attached reference image ref_iran.png (Иранский агент). Draw EXACTLY this character from ref_iran.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 289. `chars/shabak_dead.png` — Дани из Шабака — убитый

Правка картинки `shabak` из этого же чата.

```
Use the attached reference image ref_shabak.png (Дани из Шабака). Draw EXACTLY this character from ref_shabak.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 290. `chars/itzik_dead.png` — Ицик «Фалафель» — убитый

Правка картинки `itzik` из этого же чата.

```
Use the attached reference image ref_itzik.png (Ицик «Фалафель»). Draw EXACTLY this character from ref_itzik.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 291. `chars/moshe_dead.png` — Моше, бухгалтер — убитый

Правка картинки `moshe` из этого же чата.

```
Use the attached reference image ref_moshe.png (Моше, бухгалтер). Draw EXACTLY this character from ref_moshe.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 292. `chars/shmulik_dead.png` — Шмулик, хозяин квартиры — убитый

Правка картинки `shmulik` из этого же чата.

```
Use the attached reference image ref_shmulik.png (Шмулик, хозяин квартиры). Draw EXACTLY this character from ref_shmulik.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 293. `chars/dvora_dead.png` — Двора, учительница ульпана — убитый

Правка картинки `dvora` из этого же чата.

```
Use the attached reference image ref_dvora.png (Двора, учительница ульпана). Draw EXACTLY this character from ref_dvora.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 294. `chars/civ_1_dead.png` — Прохожая — убитый

Правка картинки `civ_1` из этого же чата.

```
Use the attached reference image ref_civ_1.png (Прохожая). Draw EXACTLY this character from ref_civ_1.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 295. `chars/civ_2_dead.png` — Харедим — убитый

Правка картинки `civ_2` из этого же чата.

```
Use the attached reference image ref_civ_2.png (Харедим). Draw EXACTLY this character from ref_civ_2.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 296. `chars/civ_3_dead.png` — Солдат — убитый

Правка картинки `civ_3` из этого же чата.

```
Use the attached reference image ref_civ_3.png (Солдат). Draw EXACTLY this character from ref_civ_3.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 297. `chars/civ_4_dead.png` — Пожилой в кипе — убитый

Правка картинки `civ_4` из этого же чата.

```
Use the attached reference image ref_civ_4.png (Пожилой в кипе). Draw EXACTLY this character from ref_civ_4.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 298. `chars/civ_5_dead.png` — Хипстер — убитый

Правка картинки `civ_5` из этого же чата.

```
Use the attached reference image ref_civ_5.png (Хипстер). Draw EXACTLY this character from ref_civ_5.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 299. `chars/civ_6_dead.png` — Бабушка с тележкой — убитый

Правка картинки `civ_6` из этого же чата.

```
Use the attached reference image ref_civ_6.png (Бабушка с тележкой). Draw EXACTLY this character from ref_civ_6.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 300. `chars/civ_7_dead.png` — Подросток — убитый

Правка картинки `civ_7` из этого же чата.

```
Use the attached reference image ref_civ_7.png (Подросток). Draw EXACTLY this character from ref_civ_7.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 301. `chars/civ_8_dead.png` — Женщина в тихеле — убитый

Правка картинки `civ_8` из этого же чата.

```
Use the attached reference image ref_civ_8.png (Женщина в тихеле). Draw EXACTLY this character from ref_civ_8.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 302. `chars/civ_9_dead.png` — Офисный работник — убитый

Правка картинки `civ_9` из этого же чата.

```
Use the attached reference image ref_civ_9.png (Офисный работник). Draw EXACTLY this character from ref_civ_9.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 303. `chars/civ_10_dead.png` — Пляжник с маткот — убитый

Правка картинки `civ_10` из этого же чата.

```
Use the attached reference image ref_civ_10.png (Пляжник с маткот). Draw EXACTLY this character from ref_civ_10.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 304. `chars/civ_11_dead.png` — Женщина в хиджабе — убитый

Правка картинки `civ_11` из этого же чата.

```
Use the attached reference image ref_civ_11.png (Женщина в хиджабе). Draw EXACTLY this character from ref_civ_11.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 305. `chars/civ_12_dead.png` — Турист — убитый

Правка картинки `civ_12` из этого же чата.

```
Use the attached reference image ref_civ_12.png (Турист). Draw EXACTLY this character from ref_civ_12.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 306. `chars/garik_dead.png` — Гарик — убитый

Правка картинки `garik` из этого же чата.

```
Use the attached reference image ref_garik.png (Гарик). Draw EXACTLY this character from ref_garik.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 307. `chars/karim_dead.png` — Карим — убитый

Правка картинки `karim` из этого же чата.

```
Use the attached reference image ref_karim.png (Карим). Draw EXACTLY this character from ref_karim.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 308. `chars/roza_dead.png` — Роза Львовна — убитый

Правка картинки `roza` из этого же чата.

```
Use the attached reference image ref_roza.png (Роза Львовна). Draw EXACTLY this character from ref_roza.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 309. `chars/yoav_dead.png` — Журналист Йоав — убитый

Правка картинки `yoav` из этого же чата.

```
Use the attached reference image ref_yoav.png (Журналист Йоав). Draw EXACTLY this character from ref_yoav.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 310. `chars/baba_dead.png` — Бабушка Хая — убитый

Правка картинки `baba` из этого же чата.

```
Use the attached reference image ref_baba.png (Бабушка Хая). Draw EXACTLY this character from ref_baba.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 311. `chars/protester_dead.png` — Протестующий — убитый

Правка картинки `protester` из этого же чата.

```
Use the attached reference image ref_protester.png (Протестующий). Draw EXACTLY this character from ref_protester.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 312. `chars/supporter_dead.png` — Сторонник правительства — убитый

Правка картинки `supporter` из этого же чата.

```
Use the attached reference image ref_supporter.png (Сторонник правительства). Draw EXACTLY this character from ref_supporter.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 313. `chars/mechanic_dead.png` — Механик — убитый

Правка картинки `mechanic` из этого же чата.

```
Use the attached reference image ref_mechanic.png (Механик). Draw EXACTLY this character from ref_mechanic.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 314. `chars/runner_dead.png` — Беглец-киоскёр — убитый

Правка картинки `runner` из этого же чата.

```
Use the attached reference image ref_runner.png (Беглец-киоскёр). Draw EXACTLY this character from ref_runner.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 315. `chars/dima_dead.png` — Дима — убитый

Правка картинки `dima` из этого же чата.

```
Use the attached reference image ref_dima.png (Дима). Draw EXACTLY this character from ref_dima.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 316. `chars/danis_dead.png` — Данис — убитый

Правка картинки `danis` из этого же чата.

```
Use the attached reference image ref_danis.png (Данис). Draw EXACTLY this character from ref_danis.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```

### 317. `chars/semyon_dead.png` — Семён — убитый

Правка картинки `semyon` из этого же чата.

```
Use the attached reference image ref_semyon.png (Семён). Draw EXACTLY this character from ref_semyon.png: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: A single person lying dead flat on the back on the ground, seen from directly above (bird's-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.
```


## Текстуры (41)

### 318. `textures/m_stone.png` — Текстура модели: Камень Яффо (известняк)

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Old Jaffa limestone wall: warm golden-beige rough-cut limestone blocks in regular horizontal courses with lighter mortar joints, weathered and sun-bleached.
```

### 319. `textures/m_trim.png` — Текстура модели: Светлый камень карнизов

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Smooth cream-white dressed limestone / lime plaster surface with faint chisel marks, very subtle, almost uniform.
```

### 320. `textures/m_concrete.png` — Текстура модели: Бетон

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Weathered raw grey concrete with horizontal board-formwork lines, rust streaks and dark water stains.
```

### 321. `textures/m_white.png` — Текстура модели: Белая штукатурка баухауза

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. White-painted smooth lime plaster of a Tel Aviv Bauhaus building, slightly weathered, faint hairline cracks and sun-bleached patches.
```

### 322. `textures/m_beige.png` — Текстура модели: Бежевая штукатурка 1960-х

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Beige-grey sand-coloured rough spray stucco of a 1960s Israeli apartment block, light grime streaks.
```

### 323. `textures/m_ochre.png` — Текстура модели: Охра (эклектика)

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Aged ochre lime plaster, warm yellow-orange, patchy, with a few small peeling spots revealing older plaster underneath.
```

### 324. `textures/m_brick.png` — Текстура модели: Терракотовая штукатурка церкви

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Warm terracotta-orange painted plaster of a Spanish baroque church wall, slightly faded and patchy.
```

### 325. `textures/m_brown.png` — Текстура модели: Коричневая мозаика 1960-х

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Facade cladding of small brown and beige square mosaic tiles in a vertical striped pattern, 1960s modernist tower.
```

### 326. `textures/m_glass.png` — Текстура модели: Тёмное стекло фасада

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Dark tinted glass curtain wall with thin aluminium mullions in a regular rectangular grid, faint sky reflections.
```

### 327. `textures/m_glassB.png` — Текстура модели: Синее стекло (Азриэли)

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Blue reflective glass curtain wall with grey mullions in a regular grid, soft reflections of clouds.
```

### 328. `textures/m_metal.png` — Текстура модели: Металлические панели

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Brushed grey aluminium cladding panels with straight seams and rivets.
```

### 329. `textures/m_roofT.png` — Текстура модели: Черепица (сверху)

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Mediterranean terracotta clay roof tiles seen from directly above, slightly weathered, a little lichen.
```

### 330. `textures/m_patina.png` — Текстура модели: Патина купола

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Oxidized green-grey copper and lead roof sheets with standing seams and patina streaks.
```

### 331. `textures/m_gold.png` — Текстура модели: Золото луковицы

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Gold leaf sheet metal with subtle panel seams and warm reflections.
```

### 332. `textures/m_blueroof.png` — Текстура модели: Синий купол со звёздами

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Blue enamel-painted metal dome sheets with small scattered golden stars.
```

### 333. `textures/m_shutter.png` — Текстура модели: Ставни-«трисим»

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Israeli plastic roller shutter: horizontal light grey slats, slightly dirty.
```

### 334. `textures/m_wood.png` — Текстура модели: Старая деревянная дверь

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Old weathered wooden door planks, dark brown, vertical boards with a few iron nails.
```

### 335. `textures/m_roofflat.png` — Текстура модели: Плоская крыша

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Flat roof covered with whitewashed bitumen membrane, patches, seams and stains, seen from above.
```

### 336. `textures/m_graffiti.png` — Текстура модели: Граффити на бетоне

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Colorful street graffiti tags and throw-ups on a grey concrete wall, abandoned building vibe (no readable words).
```

### 337. `textures/m_rust.png` — Текстура модели: Ржавый металл

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Rusty corroded steel sheet with flaking orange-brown rust.
```

### 338. `textures/m_paint_red.png` — Текстура модели: Красная краска по металлу

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Glossy red paint on steel, slightly chipped and faded.
```

### 339. `textures/m_water.png` — Текстура модели: Вода фонтана

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Clear turquoise fountain water surface with gentle ripples seen from above.
```

### 340. `textures/m_bh_cream.png` — Текстура модели: Баухауз: кремовая штукатурка

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Cream off-white lime plaster of a restored Tel Aviv Bauhaus building, smooth, warm tint, a few faint stains.
```

### 341. `textures/m_bh_pastel.png` — Текстура модели: Баухауз: пастельно-розовая штукатурка

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Pale pastel pink plaster of a renovated Bauhaus building in Tel Aviv, smooth and slightly sun-faded.
```

### 342. `textures/m_60_grey.png` — Текстура модели: Дом 60-х: серая «шуба»

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Grey rough pebble-dash / terrazzo-grit stucco of a 1960s Israeli apartment block, dusty, with dark streaks under the windows.
```

### 343. `textures/m_60_stone.png` — Текстура модели: Дом 60-х: облицовка иерусалимским камнем

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Beige Jerusalem-stone cladding panels in a regular grid, slightly worn, 1960s apartment block facade.
```

### 344. `textures/m_ecl_pink.png` — Текстура модели: Эклектика: лососевая штукатурка

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Aged salmon-pink lime plaster of a 1920s eclectic building in Florentin, patchy, with small cracks.
```

### 345. `textures/m_ecl_blue.png` — Текстура модели: Эклектика: серо-голубая штукатурка

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Aged pale blue-grey lime plaster of a 1920s eclectic building, faded and patchy, a few repaired spots.
```


## Портреты для звонков (22)

### 346. `portraits/portrait_ausbender.png` — Портрет: Сергей Аусбендер, корреспондент 34-го канала

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Sergey Ausbender, a self-confident TV news correspondent: receding hair combed back, reading glasses low on the nose, dark suit with a loosened tie, a TV microphone in one hand and the other index finger raised, a know-it-all smirk, as if explaining something obvious and completely wrong. Background: dark blue TV studio with glowing screens. Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable.
```

### 347. `portraits/portrait_anchor.png` — Портрет: ведущая новостей Яэль

Новая картинка, формат квадрат 1:1.

```
Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark. Yael, an Israeli evening news anchor in her 30s: big glossy dark hair, red blouse, polite professional smile with one slightly raised eyebrow of disbelief. Background: dark blue TV studio with glowing screens.
```


## Текстуры (41)

### 348. `textures/m_pinkpaint.png` — Текстура модели: Розовая краска балконов («Опера»)

Новая картинка, формат квадрат 1:1.

```
Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size. Pale salmon-pink painted concrete of balcony parapets on a 1990s Tel Aviv seafront tower, smooth with light weathering and faint drip stains.
```


## Логотип и заставки (9)

### 349. `ui/logo.png` — Логотип «ХАМСИН» с надписью

Новая картинка, формат горизонтальный 16:9.

```
Video game title logo for a satirical open-world crime game set in Tel Aviv. The main word is «ХАМСИН» — exactly six Russian Cyrillic capital letters Х, А, М, С, И, Н, spelled exactly like that — in a heavy condensed black serif display typeface with a thick white outline and a hard drop shadow, slightly tilted, in the spirit of classic 2000s crime game title logos. Below it a smaller subtitle «ЧАСТЬ 1: ТЕЛЬ-АВИВ» in the same style. Behind the letters: a huge orange sun setting into the sea, palm silhouettes and a swirl of yellow desert dust (hamsin wind). Isolated on a perfectly flat solid magenta background (#FF00FF), no other text, no watermark. CHECK THE SPELLING: if the letters are wrong, regenerate.
```

### 350. `ui/logo_emblem.png` — Эмблема без надписи (под логотип кодом)

Новая картинка, формат горизонтальный 16:9.

```
Video game title emblem WITHOUT ANY TEXT for a satirical open-world crime game set in Tel Aviv: a bold round badge with a huge orange sun setting into the sea, palm silhouettes, a swirl of yellow desert dust (hamsin wind) and the Tel Aviv skyline silhouette — the stepped seafront tower, the round, triangular and square towers, the Jaffa clock tower (see the attached references). Heavy black outlines, flat colors, classic 2000s crime game title art look. Wide empty band across the middle where the title text will be added later. Isolated on a perfectly flat solid magenta background (#FF00FF). NO letters, NO text, NO logos, no watermark.
```

### 351. `ui/loading_1.png` — Заставка: Лёва на набережной

Новая картинка, формат горизонтальный 16:9.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Leva Goldman, a new immigrant from St. Petersburg (ref_portrait_leva.png, ref_player.png): short light-brown hair, sunburnt nose, white-and-navy striped sailor shirt, jeans, sneakers, cocky half-smile, leaning on the hood of his tired old faded grey-blue 1990s hatchback with one door in matte primer grey. Behind him: the Tel Aviv beach promenade at sunset, the white stepped seafront tower with pink balconies (ref_opera.png) and the slender minaret of the seafront mosque (ref_hassanbek.png), palms, a wall of yellow desert dust (hamsin) rolling in over the sea.
```

### 352. `ui/loading_2.png` — Заставка: бригада «Одесса»

Новая картинка, формат горизонтальный 16:9.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Night in Ramat Gan. Syoma Katz, boss of the Odessa Brigade (ref_portrait_sema.png): heavy-set, shaved head, black leather coat over a burgundy silk shirt, thick gold chain, raising a shot glass, smug. Next to him his nephew Garik (ref_portrait_garik.png) in a leather jacket. Behind them their absurdly long black limousine with gold rims and a golden anchor-and-crown emblem on a red circle (ref_lux_odessa.png), and the glowing neon of a Russian restaurant shaped like an anchor (no letters).
```

### 353. `ui/loading_3.png` — Заставка: клан Аль-Бахар

Новая картинка, формат горизонтальный 16:9.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Old Jaffa port at golden hour. Abu-Karim, head of the Al-Bahar clan (ref_portrait_abu.png): dignified, short grey beard, cream linen suit, prayer beads in hand, calm and powerful. Beside him his young nephew Karim (ref_portrait_karim.png) in a white tracksuit. Behind them the white monster pickup with teal stripes, spotlights and crates of Jaffa oranges, a teal wave-and-fish emblem on the roof (ref_pickup_bahar.png), fishing boats and the Jaffa clock tower (ref_clocktower.png).
```

### 354. `ui/loading_4.png` — Заставка: «Львы Гондэра»

Новая картинка, формат горизонтальный 16:9.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. South Tel Aviv near the old central bus station, evening. Abeba, leader of the Lions of Gondar (ref_portrait_abeba.png): Ethiopian-Israeli man in his early 30s, neat beard, olive bomber jacket over a yellow t-shirt, big headphones around his neck, confident warm grin. Two of his crew in yellow hoodies with green stripes (ref_lions.png). Behind them the yellow tuned street-racer hatchback with a huge spoiler and a crowned lion emblem on the roof (ref_lions_car.png) in front of a wall covered in colorful graffiti (no readable words). Respectful, non-caricatured depiction.
```

### 355. `ui/loading_5.png` — Заставка: погоня на Аялоне

Новая картинка, формат горизонтальный 16:9.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Night chase on the Ayalon highway, split into two diagonal comic panels. Big panel: Leva (ref_portrait_leva.png) gripping the wheel of a white sporty Japanese compact sedan (ref_civic.png) at full speed, his friend Danis (ref_portrait_danis.png) yelling in the passenger seat, police cars with flashing red-and-blue lights behind. Small panel: the three towers — round, triangular and square — glowing at night above the highway (ref_azrieli.png).
```

### 356. `ui/loading_6.png` — Заставка: друзья и матрас

Новая картинка, формат горизонтальный 16:9.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Funny comic scene in the White City of Tel Aviv: three friends — Dima (ref_portrait_dima.png), Danis (ref_portrait_danis.png) and Semyon (ref_portrait_semyon.png) — desperately holding a big mattress (ref_mattress.png) strapped to the roof of a tired old 1990s grey-blue hatchback while a yellow desert dust storm (hamsin) blows; white Bauhaus buildings with rounded balconies behind them. Exaggerated expressions, good-natured humor.
```

### 357. `ui/loading_7.png` — Заставка: Шабак и «Али»

Новая картинка, формат горизонтальный 16:9.

```
Loading-screen illustration for a satirical open-world crime video game set in Tel Aviv, Israel, in the style of the iconic hand-painted loading screens of 2010s open-world crime games: bold black ink outlines, flat cel shading with smooth airbrushed gradients, saturated sunset palette (hot orange, magenta, teal), dramatic low camera angle, characters larger than life in confident poses, cinematic diagonal composition, fills the whole 16:9 image edge to edge, no frame, NO text, NO letters, NO logos, NO watermark. Keep every character exactly recognizable from the attached reference images (same face, hair, clothes), drawn in this painted style. Spy thriller mood at night, split into two diagonal comic panels. Left: Dani from the Shin Bet security service (ref_portrait_dani.png) — stern, dark sunglasses, earpiece, dark polo, watching. Right: «Ali», an anonymous recruiter (ref_portrait_ali.png) in a dark hoodie, face in shadow, lit only by the cold blue glow of a smartphone. Between them the military headquarters tower with a helipad and a tall red-and-white antenna mast (ref_kirya.png).
```

