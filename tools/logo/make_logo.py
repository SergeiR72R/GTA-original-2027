#!/usr/bin/env python3
"""Логотип «ХАМСИН»: надпись вшита в ленту эмблемы (по референсу пользователя).

Берёт эмблему ui/logo_emblem из assets/gen/bundle.js, рисует надпись по дуге
ленты: красно-оранжевая заливка, тёмная обводка и тень вправо-вниз.
Русская — шрифт Oswald Bold, ивритская — Rubik Black (оба OFL, Google Fonts;
положи файлы Oswald-Bold.ttf и Rubik-Black.ttf рядом со скриптом:
https://fonts.google.com/specimen/Oswald и https://fonts.google.com/specimen/Rubik).
Результат: assets/brand/logo_ru.webp, logo_he.webp (для игры, 1000 px) и
hamsin_logo_ru.png, hamsin_logo_he.png (для скачивания, 1468 px) в tools/logo/.

Запуск: python3 tools/logo/make_logo.py   (нужен Pillow с raqm для иврита)
"""
import base64, io, os, re
os.chdir(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.join('..', '..')
_b = open(os.path.join(ROOT, 'assets/gen/bundle.js')).read()
_m = re.search(r'"ui/logo_emblem"\s*:\s*"data:image/\w+;base64,([^"]+)"', _b)
from PIL import Image
Image.open(io.BytesIO(base64.b64decode(_m.group(1)))).save('emblem.png')
from PIL import Image, ImageDraw, ImageFont, features
K = 2  # масштаб: картинка для скачивания вдвое крупнее исходной эмблемы
base = Image.open('emblem.png').convert('RGBA')
base = base.resize((base.width * K, base.height * K), Image.LANCZOS)
W, H = base.size
CX, CY = 371 * K, 344 * K          # середина ленты
SAG, SPAN = 15 * K, 200 * K        # лента изогнута: к краям ниже на ~15 px

def label(text, font, cap, squeeze, rtl=False):
    f = ImageFont.truetype(font, 400)
    kw = {'direction': 'rtl', 'language': 'he'} if rtl and features.check('raqm') else {}
    if rtl and not kw: text = text[::-1]
    stroke = 26
    l, t, r, b = f.getbbox(text, stroke_width=stroke, **kw)
    lay = Image.new('RGBA', (r - l + 80, b - t + 80), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    # тень — тёмная, со сдвигом вправо-вниз
    d.text((40 - l + 26, 40 - t + 30), text, font=f, fill=(27, 13, 5, 255), stroke_width=stroke, stroke_fill=(27, 13, 5, 255), **kw)
    d.text((40 - l, 40 - t), text, font=f, fill=(200, 55, 26, 255), stroke_width=stroke, stroke_fill=(30, 14, 6, 255), **kw)
    # лёгкий блик сверху буквы — как у нарисованного логотипа
    bb = lay.getbbox()
    lay = lay.crop(bb)
    # высота заглавных → cap px, ширина ужата (узкий шрифт)
    h = cap
    w = int(lay.width * h / lay.height * squeeze)
    return lay.resize((w, h), Image.LANCZOS)

def place(lay):
    out = base.copy()
    # изгиб по ленте: каждый столбец опускаем по параболе
    warped = Image.new('RGBA', (lay.width, lay.height + SAG * 2), (0, 0, 0, 0))
    for x in range(lay.width):
        dx = (x - lay.width / 2 + 0.5) / SPAN
        dy = int(round(SAG * dx * dx))
        warped.paste(lay.crop((x, 0, x + 1, lay.height)), (x, dy))
    out.alpha_composite(warped, (CX - lay.width // 2, CY - lay.height // 2))
    return out

ru = place(label('ХАМСИН', 'Oswald-Bold.ttf', 76 * K, 1.0))
he = place(label('חמסין', 'Rubik-Black.ttf', 76 * K, 0.95, rtl=True))
ru.save('hamsin_logo_ru.png'); he.save('hamsin_logo_he.png')
for lang, im in (('ru', ru), ('he', he)):
    im.resize((1000, round(im.height * 1000 / im.width)), Image.LANCZOS).save(os.path.join(ROOT, f'assets/brand/logo_{lang}.webp'), quality=92, method=6)
os.remove('emblem.png')
print('логотипы готовы', ru.size)
