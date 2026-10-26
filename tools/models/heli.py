# Армейский ударный вертолёт (вымышленный, без настоящих знаков) — low-poly
# модель для 3D-режима игры: тандемная кабина, короткие крылья с блоками НУР и
# ракетами, хвостовая балка с килем, лыжи. Три части — корпус, несущий винт и
# хвостовой винт: винты крутит игра (js/render3d.js, syncHeli).
# Запуск (Blender как модуль Python, pip install bpy):
#   python tools/models/heli.py [--render папка]
# Пишет assets/models/heli.js. Единицы — метры, нос смотрит на +Y Blender
# (в игре — на −z), ось вращения несущего винта — Z, хвостового — X.
import os, sys, json, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
from mathutils import Vector
from lib import reset, export_data, render, box, prism, plate, _obj

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')

# цвета, пока нет текстур (tools/models/lib.py TEX: heli* → m_heli_*)
PAL = {
    'heliOlive': (0.34, 0.37, 0.21), 'heliDark': (0.18, 0.19, 0.18), 'heliGlass': (0.13, 0.19, 0.23),
    'heliBlade': (0.14, 0.14, 0.14), 'heliTip': (0.92, 0.76, 0.16), 'black': (0.05, 0.05, 0.05),
    'navR': (0.95, 0.12, 0.10), 'navG': (0.12, 0.85, 0.25), 'lamp': (1.0, 0.95, 0.80),
}
ROTOR = (0.0, -0.3, 4.38)    # ступица несущего винта
TAIL = (-0.3, -9.75, 3.95)   # ступица хвостового винта (слева от киля)


def loft(secs, mat, n=12, e=2.6, axis='y', cap=True):
    """Тело по сечениям: secs — (s, c1, c2, hw, hh), s — вдоль оси, c1/c2 — центр
    сечения (для оси y: x и z, для оси x: y и z), hw/hh — полуширина и полувысота.
    Сечение — суперэллипс (e = 2 — эллипс, больше — ближе к прямоугольнику)."""
    bm = bmesh.new()
    rings = []
    for s, c1, c2, hw, hh in secs:
        ring = []
        for i in range(n):
            a = 2 * math.pi * (i + 0.5) / n
            ca, sa = math.cos(a), math.sin(a)
            u = c1 + hw * math.copysign(abs(ca) ** (2 / e), ca)
            w = c2 + hh * math.copysign(abs(sa) ** (2 / e), sa)
            ring.append(bm.verts.new((u, s, w) if axis == 'y' else (s, u, w)))
        rings.append(ring)
    for r0, r1 in zip(rings, rings[1:]):
        for i in range(n):
            bm.faces.new((r0[i], r0[(i + 1) % n], r1[(i + 1) % n], r1[i]))
    if cap:
        bm.faces.new(rings[0])
        bm.faces.new(list(reversed(rings[-1])))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _obj('loft', bm, mat)


def beam(p0, p1, r, mat, n=4):
    """Тонкая балка (стойка лыж, штанга) между двумя точками."""
    p0, p1 = Vector(p0), Vector(p1)
    d = (p1 - p0).normalized()
    a = d.cross(Vector((0, 0, 1)) if abs(d.z) < 0.9 else Vector((1, 0, 0))).normalized()
    b = d.cross(a)
    bm = bmesh.new()
    ring = lambda p: [bm.verts.new(p + (a * math.cos(i * 2 * math.pi / n + math.pi / n) + b * math.sin(i * 2 * math.pi / n + math.pi / n)) * r) for i in range(n)]
    lo, hi = ring(p0), ring(p1)
    for i in range(n):
        bm.faces.new((lo[i], lo[(i + 1) % n], hi[(i + 1) % n], hi[i]))
    bm.faces.new(lo); bm.faces.new(list(reversed(hi)))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _obj('beam', bm, mat)


def cyl(x, z, y0, y1, r, mat, n=8, nose=0.0):
    """Цилиндр вдоль Y (блок ракет, ракета); nose — длина острого носа спереди."""
    secs = [(y1 + nose, x, z, 0.02, 0.02)] if nose else []
    secs += [(y1, x, z, r, r), (y0, x, z, r, r)]
    return loft(secs, mat, n=n, e=2.0)


def body():
    # фюзеляж с хвостовой балкой: узкий, сужается к носу и к хвосту
    loft([(7.95, 0, 1.55, 0.12, 0.12), (7.55, 0, 1.55, 0.42, 0.45), (6.8, 0, 1.6, 0.62, 0.68), (5.6, 0, 1.7, 0.72, 0.9),
          (4.0, 0, 1.85, 0.8, 1.05), (2.0, 0, 1.95, 0.92, 1.15), (0.0, 0, 2.0, 0.95, 1.2), (-1.6, 0, 2.1, 0.85, 1.05),
          (-3.0, 0, 2.35, 0.48, 0.62), (-5.5, 0, 2.55, 0.33, 0.4), (-8.6, 0, 2.75, 0.26, 0.3), (-9.95, 0, 2.85, 0.2, 0.25)], 'heliOlive', n=12)
    # тандемная кабина: стрелок впереди и ниже, пилот сзади и выше; рамы переплёта
    loft([(6.55, 0, 2.3, 0.15, 0.1), (6.0, 0, 2.45, 0.5, 0.42), (5.0, 0, 2.65, 0.62, 0.55), (4.0, 0, 2.8, 0.6, 0.55), (3.6, 0, 2.8, 0.5, 0.45)], 'heliGlass', n=10, e=2.4)
    loft([(4.05, 0, 3.0, 0.42, 0.32), (3.5, 0, 3.05, 0.6, 0.6), (2.4, 0, 3.2, 0.62, 0.62), (1.5, 0, 3.2, 0.55, 0.5), (1.1, 0, 3.15, 0.3, 0.3)], 'heliGlass', n=10, e=2.4)
    for y, zc, hw, hh in ((5.0, 2.65, 0.64, 0.57), (3.7, 2.82, 0.56, 0.5), (2.4, 3.2, 0.64, 0.64)):
        loft([(y + 0.06, 0, zc, hw, hh), (y - 0.06, 0, zc, hw, hh)], 'heliOlive', n=10, e=2.4)
    # двигатели по бокам, воздухозаборники и выхлоп, отведённый вбок-вверх
    for sx in (-1, 1):
        x = sx * 0.88
        loft([(1.25, x, 3.0, 0.36, 0.36), (0.9, x, 3.02, 0.42, 0.42), (-1.8, x, 3.05, 0.42, 0.42), (-2.6, x, 3.1, 0.28, 0.28)], 'heliOlive', n=10, e=2.3)
        loft([(1.27, x, 3.0, 0.26, 0.26), (1.2, x, 3.0, 0.26, 0.26)], 'black', n=10, e=2.0)
        beam((x, -2.3, 3.15), (x + sx * 0.45, -2.9, 3.35), 0.2, 'heliDark', n=8)
        beam((x + sx * 0.46, -2.91, 3.355), (x + sx * 0.5, -2.96, 3.37), 0.15, 'black', n=8)
    # обтекатель и вал несущего винта
    loft([(0.9, 0, 3.1, 0.3, 0.2), (0.3, 0, 3.4, 0.55, 0.45), (-1.2, 0, 3.4, 0.55, 0.45), (-2.2, 0, 3.0, 0.3, 0.25)], 'heliOlive', n=10, e=2.6)
    prism(ROTOR[0], ROTOR[1], 3.7, ROTOR[2] - 0.05, 0.2, 0.16, 8, 'heliDark')
    # короткие крылья с лёгким обратным V; на них блоки НУР и пары ракет
    for sx in (-1, 1):
        loft([(sx * 0.8, -0.2, 2.0, 0.75, 0.12), (sx * 3.4, -0.4, 1.82, 0.5, 0.08)], 'heliOlive', n=8, e=4.0, axis='x')
        box(sx * 3.38 - 0.05, -0.55, 1.75, sx * 3.38 + 0.05, -0.25, 1.9, 'navG' if sx > 0 else 'navR')
        x = sx * 1.75
        box(x - 0.07, -0.5, 1.6, x + 0.07, 0.1, 1.95, 'heliDark')
        cyl(x, 1.33, -1.5, 0.95, 0.33, 'heliOlive', n=10)
        loft([(0.97, x, 1.33, 0.27, 0.27), (0.9, x, 1.33, 0.27, 0.27)], 'black', n=10, e=2.0)
        x = sx * 2.8
        box(x - 0.06, -0.6, 1.55, x + 0.06, 0.2, 1.88, 'heliDark')
        box(x - 0.35, -0.9, 1.5, x + 0.35, 0.5, 1.58, 'heliDark')
        for dx in (-0.2, 0.2):
            cyl(x + dx, 1.38, -0.95, 0.9, 0.09, 'heliDark', n=6, nose=0.3)
    # пушка под носом и шар прицела на самом носу
    prism(0, 5.9, 0.38, 0.85, 0.3, 0.26, 8, 'heliDark')
    cyl(0, 0.52, 6.0, 7.5, 0.05, 'black', n=6)
    loft([(8.2, 0, 1.35, 0.05, 0.05), (8.05, 0, 1.35, 0.28, 0.28), (7.7, 0, 1.35, 0.32, 0.32), (7.45, 0, 1.4, 0.2, 0.2)], 'heliGlass', n=10, e=2.0)
    # фара-прожектор под брюхом
    box(-0.25, 3.0, 0.72, 0.25, 3.5, 0.85, 'lamp')
    # хвост: стреловидный киль, стабилизатор, огонь на конце балки
    plate([(0, 2.9), (1.6, 2.95), (1.95, 4.7), (1.3, 4.7)], (-0.09, -8.4, 0), (0, -1, 0), (1, 0, 0), 0.18, 'heliOlive')
    loft([(-1.6, -8.9, 2.85, 0.35, 0.05), (1.6, -8.9, 2.85, 0.35, 0.05)], 'heliOlive', n=8, e=4.0, axis='x')
    prism(TAIL[0] + 0.05, TAIL[1], 3.85, 4.05, 0.12, 0.12, 6, 'heliDark')
    box(-0.06, -10.05, 2.75, 0.06, -9.95, 2.9, 'lamp')
    # лыжи с загнутыми носами и стойки
    for sx in (-1, 1):
        x = sx * 1.15
        loft([(2.55, x, 0.42, 0.06, 0.06), (2.3, x, 0.2, 0.07, 0.07), (2.0, x, 0.12, 0.07, 0.07), (-2.4, x, 0.12, 0.07, 0.07)], 'heliDark', n=6, e=2.0, cap=True)
        for y in (1.4, -1.3):
            beam((sx * 0.62, y, 1.0), (x, y, 0.13), 0.06, 'heliDark')
    # антенны
    beam((0, -1.5, 3.6), (0, -2.2, 4.1), 0.025, 'heliDark')
    beam((0, -4.5, 2.9), (0, -4.9, 3.3), 0.025, 'heliDark')


def rotor():
    # несущий винт: 4 лопасти с жёлтыми законцовками, ступица; центр — (0, 0, 0)
    prism(0, 0, -0.18, 0.2, 0.36, 0.3, 8, 'heliDark')
    prism(0, 0, 0.2, 0.36, 0.3, 0.08, 8, 'heliDark')
    for k in range(4):
        objs = [box(0.3, -0.12, -0.06, 0.75, 0.12, 0.06, 'heliDark'),
                box(0.75, -0.27, -0.04, 6.6, 0.27, 0.04, 'heliBlade'),
                box(6.6, -0.27, -0.04, 7.2, 0.27, 0.04, 'heliTip')]
        for o in objs:
            o.rotation_euler = (0, 0, k * math.pi / 2)


def tail_rotor():
    # хвостовой винт: 4 лопасти в плоскости YZ, ось — X; центр — (0, 0, 0)
    loft([(-0.12, 0, 0, 0.14, 0.14), (0.12, 0, 0, 0.14, 0.14)], 'heliDark', n=8, e=2.0, axis='x')
    for k in range(4):
        objs = [box(-0.025, -0.1, 0.12, 0.025, 0.1, 1.1, 'heliBlade'), box(-0.025, -0.1, 1.1, 0.025, 0.1, 1.3, 'heliTip')]
        for o in objs:
            o.rotation_euler = (k * math.pi / 2, 0, 0)


def main():
    out_dir = sys.argv[sys.argv.index('--render') + 1] if '--render' in sys.argv else None
    game = lambda p: [round(p[0], 3), round(p[2], 3), round(-p[1], 3)]   # Blender → игра
    data = {}
    for name, build in (('heli', body), ('heli_rotor', rotor), ('heli_tail', tail_rotor)):
        reset(PAL)
        build()
        if name == 'heli' and out_dir:   # превью — с винтами на месте
            for part, at in ((rotor, ROTOR), (tail_rotor, TAIL)):
                before = set(bpy.context.scene.objects)
                part()
                bpy.context.view_layer.update()
                for o in set(bpy.context.scene.objects) - before:
                    o.location = at
                    o.name = '_' + o.name   # в экспорт корпуса не попадают
        bpy.context.view_layer.update()
        e = export_data()
        if name == 'heli':
            e['rotor'], e['tail'] = game(ROTOR), game(TAIL)
            if out_dir:
                for o in bpy.context.scene.objects:
                    if o.type == 'MESH' and o.name.startswith('_'):
                        o.name = o.name[1:]
                render(os.path.join(out_dir, 'heli_hero.png'), 'hero')
                render(os.path.join(out_dir, 'heli_game.png'), 'game')
        data[name] = e
        print(f'{name}: {e["tris"]} треугольников')
    path = os.path.join(ROOT, 'assets', 'models', 'heli.js')
    with open(path, 'w') as f:
        f.write('// Сгенерировано tools/models/heli.py — не править руками\n')
        f.write('window.GEN_MODELS = Object.assign(window.GEN_MODELS || {}, ' + json.dumps(data, sort_keys=True) + ');\n')


if __name__ == "__main__":
    main()
