#!/usr/bin/env python3
"""Упаковка сгенерированных картинок в assets/gen/bundle.js (WebP как data-URL).

Игра берёт картинки из bundle.js: так они работают и в 3D при открытии
index.html с диска. Новые картинки кладите в assets/gen/<категория>/<имя>.png
(после tools/import.html — фон уже вырезан) и запустите:

    python3 tools/pack-assets.py          # добавить/заменить и удалить исходники
    python3 tools/pack-assets.py --keep   # не удалять исходники

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


def encode(im, cat):
    side, q = LIMITS.get(cat, (512, 85))
    k = min(1.0, side / max(im.size))
    if k < 1:
        im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    opaque = cat in ('textures', 'facades', 'portraits')
    im = im.convert('RGB' if opaque else 'RGBA')
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=q, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()


def main():
    keep = '--keep' in sys.argv
    bundle = load_bundle()
    added = []
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
