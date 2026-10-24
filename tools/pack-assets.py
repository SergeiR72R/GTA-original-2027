#!/usr/bin/env python3
"""Упаковка сгенерированных картинок в assets/gen/bundle.js (WebP как data-URL).

Игра берёт картинки из bundle.js: так они работают и в 3D при открытии
index.html с диска. Новые картинки кладите в assets/gen/<категория>/<имя>.png
(после tools/import.html — фон уже вырезан) и запустите:

    python3 tools/pack-assets.py          # добавить/заменить и удалить исходники
    python3 tools/pack-assets.py --keep   # не удалять исходники
    python3 tools/pack-assets.py --despill  # убрать розовую кайму у упакованных

Нужен Pillow (pip install pillow).
"""
import base64, io, json, os, re, sys
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
GEN = os.path.join(ROOT, 'assets', 'gen')
BUNDLE = os.path.join(GEN, 'bundle.js')
# Наибольшая сторона и качество WebP по категориям
LIMITS = {'textures': (512, 82), 'facades': (768, 80), 'portraits': (384, 85),
          'vehicles': (512, 88), 'chars': (512, 88), 'props': (512, 88)}


def load_bundle():
    if not os.path.exists(BUNDLE):
        return {}
    s = open(BUNDLE, encoding='utf-8').read()
    m = re.match(r'\s*window\.GEN_BUNDLE\s*=\s*(\{.*\})\s*;?\s*$', s, re.S)
    return json.loads(m.group(1)) if m else {}


def despill(im):
    """Убирает розовую кайму от пурпурного фона по краю спрайта."""
    import numpy as np
    from PIL import ImageFilter
    a = np.asarray(im.convert('RGBA')).astype(np.int16)
    alpha = Image.fromarray(a[..., 3].astype('uint8'))
    # край: полупрозрачные пиксели и полоса в 3 px у прозрачного фона
    edge = (np.asarray(alpha.filter(ImageFilter.MinFilter(7))) < 250) & (a[..., 3] > 0)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    pink = edge & (r > g + 25) & (b > g + 25)
    m = np.minimum(np.minimum(r, b), g + 18)
    a[..., 0] = np.where(pink, m, r)
    a[..., 2] = np.where(pink, m, b)
    # совсем «фоновые» полупрозрачные пиксели — прозрачнее
    a[..., 3] = np.where(pink & (a[..., 3] < 200), a[..., 3] // 3, a[..., 3])
    return Image.fromarray(a.astype('uint8'), 'RGBA')


def encode(im, cat):
    side, q = LIMITS.get(cat, (512, 85))
    k = min(1.0, side / max(im.size))
    if k < 1:
        im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    opaque = cat in ('textures', 'facades', 'portraits')
    im = im.convert('RGB') if opaque else despill(im)
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=q, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()


def main():
    keep = '--keep' in sys.argv
    bundle = load_bundle()
    added = []
    # --despill: убрать розовую кайму у уже упакованных спрайтов
    if '--despill' in sys.argv:
        for k, v in list(bundle.items()):
            cat = k.split('/')[0]
            if cat in ('vehicles', 'chars', 'props'):
                bundle[k] = encode(Image.open(io.BytesIO(base64.b64decode(v.split(',', 1)[1]))), cat)
    for cat in sorted(LIMITS):
        d = os.path.join(GEN, cat)
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            name, ext = os.path.splitext(f)
            if ext.lower() not in ('.png', '.jpg', '.jpeg', '.webp'):
                continue
            p = os.path.join(d, f)
            bundle[cat + '/' + name] = encode(Image.open(p), cat)
            added.append(cat + '/' + name)
            if not keep:
                os.remove(p)
    with open(BUNDLE, 'w', encoding='utf-8') as out:
        out.write('window.GEN_BUNDLE = ' + json.dumps(bundle, ensure_ascii=False, sort_keys=True, separators=(",", ":")) + ';\n')
    print('добавлено/заменено: %d, всего в bundle.js: %d, размер %.1f МБ'
          % (len(added), len(bundle), os.path.getsize(BUNDLE) / 1e6))


if __name__ == '__main__':
    main()
