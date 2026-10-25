# Знаковые здания и типовые дома Тель-Авива — low-poly модели для 3D-режима.
#   python tools/models/landmarks.py [имя ...] [--render папка]
# Без имён строит всё. Пишет assets/models/models.js (window.GEN_MODELS),
# с --render — превью каждой модели (вид 3/4 и сверху, как в игре).
# Единицы — метры, 1 клетка = 4 м. Участок модели (w × d) совпадает с участком
# здания на карте (js/map.js), центр — в начале координат, юг игры — −Y.
import sys, os, math, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import reset, box, prism, dome, plate, openings, arch_outline, rect_shape, export_data, render, SIDES

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
PAL = {
    'stone': (0.89, 0.81, 0.64), 'trim': (0.95, 0.90, 0.78), 'dark': (0.16, 0.15, 0.14), 'glass': (0.22, 0.33, 0.40),
    'glassB': (0.30, 0.48, 0.62), 'concrete': (0.66, 0.64, 0.60), 'concreteD': (0.50, 0.49, 0.47), 'white': (0.95, 0.95, 0.93),
    'red': (0.78, 0.16, 0.14), 'roofT': (0.75, 0.36, 0.22), 'brick': (0.80, 0.52, 0.33), 'gold': (0.86, 0.66, 0.16),
    'blue': (0.16, 0.42, 0.78), 'brown': (0.45, 0.36, 0.28), 'brownL': (0.62, 0.52, 0.41), 'metal': (0.58, 0.62, 0.66),
    'green': (0.20, 0.42, 0.28), 'water': (0.25, 0.58, 0.72), 'yellow': (0.95, 0.78, 0.18), 'beige': (0.86, 0.80, 0.70),
    'ochre': (0.88, 0.72, 0.48), 'shutter': (0.86, 0.84, 0.78), 'wood': (0.42, 0.27, 0.15), 'graffiti1': (0.85, 0.25, 0.55),
    'graffiti2': (0.20, 0.65, 0.85), 'graffiti3': (0.95, 0.75, 0.15), 'rust': (0.55, 0.32, 0.20),
}
MODELS = {}


def model(fn):
    MODELS[fn.__name__] = fn
    return fn


def bands(cx, cy, z0, z1, r0, r1, n, a, b, seg=10):
    for i in range(n):
        t0, t1 = i / n, (i + 1) / n
        prism(cx, cy, z0 + (z1 - z0) * t0, z0 + (z1 - z0) * t1, r0 + (r1 - r0) * t0, r0 + (r1 - r0) * t1, seg, a if i % 2 == 0 else b)


def parapet(x0, y0, x1, y1, z, h, t, mat, merlons=0.0):
    box(x0, y0, z, x1, y0 + t, z + h, mat); box(x0, y1 - t, z, x1, y1, z + h, mat)
    box(x0, y0 + t, z, x0 + t, y1 - t, z + h, mat); box(x1 - t, y0 + t, z, x1, y1 - t, z + h, mat)
    if merlons:
        x = x0 + 0.3
        while x < x1 - 0.3:
            box(x - 0.25, y0, z + h, x + 0.25, y0 + t, z + h + merlons, mat); box(x - 0.25, y1 - t, z + h, x + 0.25, y1, z + h + merlons, mat); x += 1.4
        y = y0 + 1.0
        while y < y1 - 0.8:
            box(x0, y - 0.25, z + h, x0 + t, y + 0.25, z + h + merlons, mat); box(x1 - t, y - 0.25, z + h, x1, y + 0.25, z + h + merlons, mat); y += 1.4


def gable_roof(x0, y0, x1, y1, z, rise, mat, along='x'):
    """Двускатная крыша над прямоугольником, конёк вдоль оси along."""
    import bmesh, bpy
    from lib import _obj
    bm = bmesh.new()
    if along == 'x':
        ym = (y0 + y1) / 2
        v = [bm.verts.new(p) for p in [(x0, y0, z), (x1, y0, z), (x1, y1, z), (x0, y1, z), (x0, ym, z + rise), (x1, ym, z + rise)]]
        for f in [(0, 1, 5, 4), (2, 3, 4, 5), (0, 4, 3), (1, 2, 5), (3, 2, 1, 0)]:
            bm.faces.new([v[i] for i in f])
    else:
        xm = (x0 + x1) / 2
        v = [bm.verts.new(p) for p in [(x0, y0, z), (x1, y0, z), (x1, y1, z), (x0, y1, z), (xm, y0, z + rise), (xm, y1, z + rise)]]
        for f in [(1, 2, 5, 4), (3, 0, 4, 5), (0, 1, 4), (2, 3, 5), (3, 2, 1, 0)]:
            bm.faces.new([v[i] for i in f])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _obj('roof', bm, mat)


def cross(x, y, z, s, mat):
    box(x - 0.08 * s, y - 0.08 * s, z, x + 0.08 * s, y + 0.08 * s, z + 1.6 * s, mat)
    box(x - 0.5 * s, y - 0.08 * s, z + 0.95 * s, x + 0.5 * s, y + 0.08 * s, z + 1.15 * s, mat)


def solar(x, y, z, rot=False):
    """Солнечный бойлер на крыше: бак-цилиндр и наклонная панель."""
    if rot:
        box(x - 0.5, y - 0.9, z, x + 0.5, y + 0.9, z + 0.25, 'concreteD')
        box(x - 0.45, y - 0.85, z + 0.25, x + 0.45, y + 0.85, z + 0.35, 'glassB')
    else:
        box(x - 0.9, y - 0.5, z, x + 0.9, y + 0.5, z + 0.25, 'concreteD')
        box(x - 0.85, y - 0.45, z + 0.25, x + 0.85, y + 0.45, z + 0.35, 'glassB')
    prism(x, y + 0.9, z, z + 1.1, 0.35, 0.35, 8, 'white')


# ---------------------------------------------------------------- знаковые здания
@model
def reading():
    # электростанция Ридинг: длинный бетонный корпус, высокие окна, две полосатые трубы. Участок 6 × 5 клеток
    box(-12, -6, 0, 12, 6, 9, 'concrete')
    box(-12.2, -6.2, 8.6, 12.2, 6.2, 9.2, 'concreteD')
    box(7, -6, 0, 12, 6, 12, 'concrete')              # повыше — котельная
    box(6.8, -6.2, 11.6, 12.2, 6.2, 12.2, 'concreteD')
    openings((-12, -6, 7, 6), 'SN', 1.6, 1.2, rect_shape(0.9, 6.0), 'glass')
    openings((7, -6, 12, 6), 'SNE', 1.6, 1.5, rect_shape(0.9, 8.5), 'glass')
    for x in (-9, -3, 3):
        box(x - 1.2, -2, 9, x + 1.2, 2, 10.6, 'concreteD')   # вентиляционные будки
    for cx in (-6.0, 4.0):
        bands(cx, 0, 9, 34, 1.7, 1.15, 8, 'red', 'white')
        prism(cx, 0, 34, 34.6, 1.35, 1.35, 10, 'concreteD')
    box(-12, 6, 0, -4, 9.5, 2.5, 'concreteD')            # трансформаторы во дворе
    return 24, 20


@model
def shalom():
    # башня Шалом: стилобат универмага и строгая высотка 1960-х с вертикальными рёбрами. Участок 4 × 3
    box(-8, -6, 0, 8, 6, 6, 'brownL')
    box(-8.2, -6.2, 5.6, 8.2, 6.2, 6.3, 'brown')
    openings((-8, -6, 8, 6), 'SEW', 2.2, 0.4, rect_shape(1.8, 4.2), 'glass')
    box(-6, -4, 6, 6, 4, 36, 'brown')
    for i in range(13):
        x = -6 + i
        box(x - 0.12, -4.35, 6, x + 0.12, -4.0, 36, 'brownL')
        box(x - 0.12, 4.0, 6, x + 0.12, 4.35, 36, 'brownL')
    for j in range(9):
        y = -4 + j
        box(-6.35, y - 0.12, 6, -6.0, y + 0.12, 36, 'brownL')
        box(6.0, y - 0.12, 6, 6.35, y + 0.12, 36, 'brownL')
    openings((-6, -4, 6, 4), 'SN', 12, 7, rect_shape(0.7, 28.5), 'glass', depth=0.05)
    openings((-6, -4, 6, 4), 'EW', 8, 7, rect_shape(0.7, 28.5), 'glass', depth=0.05)
    box(-2.5, -2, 36, 2.5, 2, 38.5, 'brownL')
    prism(0, 0, 38.5, 44, 0.2, 0.08, 4, 'metal')
    return 16, 12


@model
def habima():
    # театр Габима: низкий белый барабан с колоннадой, нависающий диск крыши. Участок 4 × 4
    prism(0, 0, 0, 0.35, 7.8, 7.8, 24, 'trim')
    prism(0, 0, 0.35, 6.0, 5.6, 5.6, 24, 'glass')
    for i in range(16):
        a = i * 2 * math.pi / 16
        prism(6.3 * math.cos(a), 6.3 * math.sin(a), 0.35, 6.0, 0.22, 0.22, 6, 'white')
    prism(0, 0, 6.0, 6.6, 7.0, 7.0, 24, 'white')
    prism(0, 0, 6.6, 9.0, 4.6, 4.6, 20, 'white')
    openings((-4.6, -4.6, 4.6, 4.6), 'S', 3, 7.0, rect_shape(1.2, 1.4), 'glass')
    prism(0, 0, 9.0, 9.4, 5.0, 5.0, 20, 'trim')
    return 16, 16


@model
def kirya():
    # штаб в Кирье: бетонная башня с выступающими углами, вертолётная площадка, красно-белая мачта. 3 × 3
    box(-5, -5, 0, 5, 5, 26, 'concrete')
    for sx in (-1, 1):
        for sy in (-1, 1):
            box(sx * 5.4 - 0.9, sy * 5.4 - 0.9, 0, sx * 5.4 + 0.9, sy * 5.4 + 0.9, 27, 'concreteD')
    for z in range(2, 26, 3):
        box(-5.05, -5.05, z, 5.05, 5.05, z + 1.3, 'glass')
    prism(0, 0, 27, 27.5, 4.8, 4.8, 16, 'concreteD')
    prism(0, 0, 27.5, 27.55, 3.4, 3.4, 16, 'yellow')
    prism(0, 0, 27.55, 27.6, 3.0, 3.0, 16, 'concreteD')
    bands(3.8, 3.8, 27, 44, 0.9, 0.35, 6, 'red', 'white', seg=4)
    for z in (33, 38):
        box(3.8 - 1.2, 3.8 - 0.06, z, 3.8 + 1.2, 3.8 + 0.06, z + 0.12, 'metal')
        prism(3.8, 3.8 - 0.7, z + 0.6, z + 0.9, 0.5, 0.5, 8, 'white')
    return 12, 12


@model
def stpeter():
    # церковь Св. Петра в Яффо: охристый неф с черепичной крышей, барочный фронтон на запад, колокольня. 5 × 4
    box(-10, -8, 0, 6, 4, 11, 'brick')
    box(-10.2, -8.2, 10.6, 6.2, 4.2, 11.2, 'stone')
    gable_roof(-9.6, -7.6, 6, 3.6, 11.2, 3.6, 'roofT', along='x')
    # западный фасад: высокий фронтон с завитками
    plate([(-6, 0), (6, 0), (6, 13), (4.5, 13.8), (3, 15.5), (0, 17.5), (-3, 15.5), (-4.5, 13.8), (-6, 13)], (-10, -2, 0), (0, 1, 0), (-1, 0, 0), 0.6, 'stone')
    plate(arch_outline(2.4, 5.0, round_top=True), (-10.6, -2, 0), (0, 1, 0), (-1, 0, 0), 0.15, 'wood')
    prism(-10.7, -2, 9.5, 9.6, 1.1, 1.1, 12, 'dark', rot=0)
    cross(-10.4, -2, 17.5, 1.2, 'gold')
    openings((-10, -8, 6, 4), 'SN', 4, 3.0, arch_outline(1.3, 4.0, round_top=True), 'dark', frame='stone')
    # колокольня в северо-восточном углу участка
    box(6.2, 0.2, 0, 9.8, 7.8, 19, 'brick')
    box(6.0, 0.0, 18.6, 10.0, 8.0, 19.3, 'stone')
    openings((6.2, 0.2, 9.8, 7.8), 'SNEW', 1, 14.5, arch_outline(1.3, 3.2, round_top=True), 'dark', frame='stone')
    prism(8, 4, 19.3, 21.5, 2.0, 2.0, 8, 'stone')
    dome(8, 4, 21.5, 2.0, 2.4, 'roofT', seg=8, rings=3)
    cross(8, 4, 23.9, 1.0, 'gold')
    return 20, 16


@model
def lighthouse():
    # Яффский маяк: каменный домик смотрителя и бело-красная башня с фонарём. 1 × 1
    box(-2, -2, 0, 2, 2, 3.5, 'stone')
    box(-2.1, -2.1, 3.3, 2.1, 2.1, 3.7, 'trim')
    prism(0.6, 0.6, 3.7, 15, 1.1, 0.85, 10, 'white')
    for z in (7, 11):
        prism(0.6, 0.6, z, z + 1.2, 1.05, 1.0, 10, 'red')
    prism(0.6, 0.6, 15, 15.3, 1.3, 1.3, 10, 'dark')
    prism(0.6, 0.6, 15.3, 16.8, 0.75, 0.75, 10, 'yellow')
    dome(0.6, 0.6, 16.8, 0.9, 1.0, 'red', seg=10, rings=3)
    return 4, 4


@model
def ruchurch():
    # русская православная церковь: белый крестовый храм, золотая луковица и четыре синие. 4 × 4
    box(-5, -5, 0, 5, 5, 10, 'white')
    box(-7.4, -2.8, 0, 7.4, 2.8, 8, 'white')
    box(-2.8, -7.4, 0, 2.8, 7.4, 8, 'white')
    for (x0, y0, x1, y1) in [(-7.4, -2.8, 7.4, 2.8), (-2.8, -7.4, 2.8, 7.4)]:
        gable_roof(x0, y0, x1, y1, 8, 1.4, 'green', along='x' if x1 - x0 > y1 - y0 else 'y')
    box(-5.1, -5.1, 9.8, 5.1, 5.1, 10.2, 'green')
    openings((-7.4, -2.8, 7.4, 2.8), 'EW', 1, 2.5, arch_outline(1.2, 3.4, round_top=True), 'dark')
    openings((-2.8, -7.4, 2.8, 7.4), 'SN', 1, 2.5, arch_outline(1.2, 3.4, round_top=True), 'dark')
    prism(0, 0, 10.2, 14.5, 2.6, 2.6, 12, 'white')
    openings((-2.6, -2.6, 2.6, 2.6), 'SNEW', 1, 11, arch_outline(0.8, 2.2, round_top=True), 'dark')
    dome(0, 0, 14.5, 2.9, 5.5, 'gold', seg=14, rings=6, onion=True)
    cross(0, 0, 20.0, 1.3, 'gold')
    for sx in (-1, 1):
        for sy in (-1, 1):
            x, y = sx * 4.0, sy * 4.0
            prism(x, y, 10.2, 12.6, 1.0, 1.0, 10, 'white')
            dome(x, y, 12.6, 1.15, 2.4, 'blue', seg=10, rings=5, onion=True)
            cross(x, y, 15.0, 0.7, 'gold')
    return 16, 16


@model
def dolphinarium():
    # заброшенный Дельфинариум на пляже: облезлые бетонные уступы, граффити, пустые окна. 3 × 3
    box(-6, -6, 0, 6, 6, 3.5, 'concreteD')
    box(-4.5, -3, 3.5, 6, 6, 7, 'concrete')
    for i in range(5):  # ступени трибун к морю (на запад)
        box(-6 + i * 0.3, -6, 3.5, -5.7 + i * 0.3, -3, 3.5 + (i + 1) * 0.6, 'concrete')
    openings((-6, -6, 6, 6), 'SE', 2.0, 1.0, rect_shape(1.2, 1.6), 'dark')
    openings((-4.5, -3, 6, 6), 'S', 3, 4.5, rect_shape(2.0, 1.5), 'dark')
    for k, (x, z, w, h, c) in enumerate([(-3, 0.3, 2.6, 1.6, 'graffiti1'), (1.5, 0.4, 2.2, 1.4, 'graffiti2'), (4.2, 0.2, 1.6, 2.0, 'graffiti3')]):
        plate(rect_shape(w, h), (x, -6, z), (1, 0, 0), (0, -1, 0), 0.03, c)
    box(1, 0, 7, 4, 3, 7.4, 'rust')
    box(-3, 2, 7, -2.6, 2.4, 9.5, 'rust')
    box(-3.2, 2.2, 9.5, 0.5, 2.3, 10.8, 'rust')   # рама от старой вывески
    return 12, 12


@model
def menora():
    # арена «Менора»: круглая чаша с вертикальными рёбрами и ступенчатой крышей. 6 × 6
    prism(0, 0, 0, 0.4, 11.6, 11.6, 28, 'concreteD')
    prism(0, 0, 0.4, 7.5, 10.6, 10.6, 28, 'glass')
    for i in range(28):
        a = i * 2 * math.pi / 28
        x, y = 10.75 * math.cos(a), 10.75 * math.sin(a)
        box(x - 0.3, y - 0.3, 0.4, x + 0.3, y + 0.3, 7.5, 'metal')
    prism(0, 0, 7.5, 8.3, 11.2, 11.2, 28, 'metal')
    prism(0, 0, 8.3, 9.6, 10.2, 8.4, 28, 'white')
    prism(0, 0, 9.6, 10.8, 8.4, 6.0, 28, 'metal')
    prism(0, 0, 10.8, 11.8, 6.0, 3.2, 28, 'white')
    prism(0, 0, 11.8, 12.2, 3.2, 3.2, 20, 'metal')
    box(-3, -12.2, 0, 3, -10.4, 4.0, 'concrete')
    box(-3.4, -12.6, 4.0, 3.4, -10.2, 4.4, 'metal')
    return 24, 24


@model
def azrieli():
    # Азриэли: торговый подиум и три башни — круглая, треугольная, квадратная. Подиум 56 × 52 м (масштаб под участок)
    W, D = 56.0, 52.0
    X = lambda u: -W / 2 + u * W
    Y = lambda v: D / 2 - v * D
    box(X(0), Y(1), 0, X(1), Y(0), 8, 'concrete')
    for z in (2.5, 5.5):
        box(X(0) - 0.05, Y(1) - 0.05, z, X(1) + 0.05, Y(0) + 0.05, z + 1.4, 'glassB')
    # круглая — самая высокая
    cx, cy = X(0.22), Y(0.3)
    prism(cx, cy, 8, 37, 5.0, 5.0, 24, 'glassB')
    for z in range(10, 37, 4):
        prism(cx, cy, z, z + 0.35, 5.1, 5.1, 24, 'metal')
    prism(cx, cy, 37, 38.5, 4.6, 4.6, 24, 'metal')
    prism(cx, cy, 38.5, 38.7, 2.8, 2.8, 16, 'yellow')
    # треугольная
    import bmesh
    from lib import _obj
    tri = [(X(0.55), Y(0.12)), (X(0.78), Y(0.55)), (X(0.38), Y(0.58))]
    def tri_prism(z0, z1, mat, k=1.0):
        mx, my = sum(p[0] for p in tri) / 3, sum(p[1] for p in tri) / 3
        pts = [(mx + (x - mx) * k * 0.6, my + (y - my) * k * 0.6) for x, y in tri]
        bm = bmesh.new()
        lo = [bm.verts.new((x, y, z0)) for x, y in pts]; hi = [bm.verts.new((x, y, z1)) for x, y in pts]
        bm.faces.new(lo); bm.faces.new(list(reversed(hi)))
        for i in range(3):
            bm.faces.new((lo[i], lo[(i + 1) % 3], hi[(i + 1) % 3], hi[i]))
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        _obj('tri', bm, mat)
    tri_prism(8, 34, 'glassB')
    for z in range(10, 34, 4):
        tri_prism(z, z + 0.35, 'metal', 1.015)
    tri_prism(34, 35.5, 'metal', 0.97)
    # квадратная
    sx, sy, s = X(0.62) + 3.75, Y(0.62) - 3.75, 3.75
    box(sx - s, sy - s, 8, sx + s, sy + s, 31, 'glassB')
    for z in range(10, 31, 4):
        box(sx - s - 0.1, sy - s - 0.1, z, sx + s + 0.1, sy + s + 0.1, z + 0.35, 'metal')
    box(sx - s + 0.5, sy - s + 0.5, 31, sx + s - 0.5, sy + s - 0.5, 32.5, 'metal')
    return W, D


@model
def clocktower():
    # часовая башня Яффо: три яруса из известняка, часы на четыре стороны, зубцы. Участок 68 × 68 px (4,25 м)
    s = 2.1
    box(-s, -s, 0, s, s, 8, 'stone')
    box(-s - 0.15, -s - 0.15, 7.7, s + 0.15, s + 0.15, 8.2, 'trim')
    plate(arch_outline(1.6, 3.6), (0, -s, 0), (1, 0, 0), (0, -1, 0), 0.1, 'wood')
    box(-s + 0.2, -s + 0.2, 8.2, s - 0.2, s - 0.2, 14.5, 'stone')
    openings((-s + 0.2, -s + 0.2, s - 0.2, s - 0.2), 'SNEW', 1, 9.4, arch_outline(0.9, 2.6), 'dark', frame='trim')
    box(-s, -s, 14.5, s, s, 15.0, 'trim')
    box(-s + 0.4, -s + 0.4, 15.0, s - 0.4, s - 0.4, 19.5, 'stone')
    for side in 'SNEW':
        (ox, oy), u, n, L = SIDES[side](-s + 0.4, -s + 0.4, s - 0.4, s - 0.4)
        c = (ox + u[0] * L / 2, oy + u[1] * L / 2, 17.2)
        ring = [(1.05 * math.cos(a * math.pi / 8), 1.05 * math.sin(a * math.pi / 8)) for a in range(16)]
        plate(ring, (c[0], c[1], c[2]), u, n, 0.12, 'white')
        plate([(-0.05, 0), (0.05, 0), (0.05, 0.75), (-0.05, 0.75)], (c[0], c[1], c[2]), u, n, 0.16, 'dark')
        plate([(0, -0.05), (0.55, -0.05), (0.55, 0.05), (0, 0.05)], (c[0], c[1], c[2]), u, n, 0.16, 'dark')
    parapet(-s + 0.3, -s + 0.3, s - 0.3, s - 0.3, 19.5, 0.5, 0.3, 'trim', merlons=0.5)
    box(-0.7, -0.7, 19.5, 0.7, 0.7, 21.5, 'stone')
    prism(0, 0, 21.5, 22.5, 0.95, 0.0, 4, 'roofT', rot=math.pi / 4)
    return 4.25, 4.25


@model
def citygate():
    # «Городские ворота» (биржа): самая высокая стеклянная башня с уступами и «короной». 3 × 3
    box(-5.6, -5.6, 0, 5.6, 5.6, 34, 'glass')
    box(-4.6, -4.6, 34, 4.6, 4.6, 42, 'glass')
    for x in (-5.65, 5.25):
        box(x, -5.65, 0, x + 0.4, 5.65, 34, 'metal')
    for z in range(4, 34, 5):
        box(-5.7, -5.7, z, 5.7, 5.7, z + 0.3, 'metal')
    for sx in (-1, 1):
        for sy in (-1, 1):
            box(sx * 4.6 - 0.25, sy * 4.6 - 0.25, 42, sx * 4.6 + 0.25, sy * 4.6 + 0.25, 47, 'metal')
    parapet(-4.85, -4.85, 4.85, 4.85, 46.5, 0.7, 0.5, 'metal')
    return 12, 12


@model
def agam():
    # фонтан Агама на площади Дизенгоф: бассейн и колонна из цветных зубчатых колёс. Круг r ≈ 4,4 м
    prism(0, 0, 0, 0.6, 4.4, 4.4, 24, 'concrete')
    prism(0, 0, 0.6, 0.65, 4.0, 4.0, 24, 'water')
    for i, c in enumerate(['red', 'yellow', 'blue', 'green', 'red', 'yellow']):
        z = 0.65 + i * 0.95
        prism(0, 0, z, z + 0.75, 1.8 - i * 0.12, 1.8 - i * 0.12, 12, c, rot=i * 0.25)
        prism(0, 0, z + 0.75, z + 0.95, 0.5, 0.5, 8, 'metal')
    return 8.8, 8.8


# ---------------------------------------------------------------- типовые дома (участок 8 × 8 м, растягивается под лот)
@model
def house_bauhaus():
    # баухауз Белого города: на сваях, ленточные окна, скруглённые балконы, бойлер на крыше
    for x in (-3.4, 0, 3.4):
        for y in (-3.0, 3.0):
            box(x - 0.18, y - 0.18, 0, x + 0.18, y + 0.18, 2.8, 'white')
    box(-1.6, -1.2, 0, 1.6, 2.6, 2.8, 'stone')
    box(-3.7, -3.3, 2.8, 3.7, 3.3, 11.2, 'white')
    for z in (3.9, 6.6, 9.3):
        for side in 'SN':
            (ox, oy), u, n, L = SIDES[side](-3.7, -3.3, 3.7, 3.3)
            plate(rect_shape(5.2, 1.0), (ox + u[0] * L / 2, oy + u[1] * L / 2, z), u, n, 0.06, 'glass')
        prism(-3.3, -3.0, z - 1.0, z - 0.8, 1.45, 1.45, 14, 'white')     # скруглённый балкон: плита
        prism(-3.3, -3.0, z - 0.8, z + 0.1, 1.45, 1.45, 14, 'white', cap=False)
        prism(3.3, -3.0, z - 1.0, z - 0.8, 1.45, 1.45, 14, 'white')
        prism(3.3, -3.0, z - 0.8, z + 0.1, 1.45, 1.45, 14, 'white', cap=False)
    plate(rect_shape(0.8, 7.6), (0, -3.3, 3.1), (1, 0, 0), (0, -1, 0), 0.06, 'glass')  # «термометр» лестницы
    parapet(-3.7, -3.3, 3.7, 3.3, 11.2, 0.5, 0.2, 'white')
    box(1.2, 0.6, 11.2, 3.2, 2.8, 13.2, 'white')
    solar(-1.6, 0.5, 11.2)
    return 8, 8


@model
def house_60s():
    # дом 1960–70-х: четыре этажа на столбах, балконы во всю ширину, закрытые ставнями, кондиционеры, бойлеры
    for x in (-3.4, 3.4):
        for y in (-3.0, 3.0):
            box(x - 0.3, y - 0.3, 0, x + 0.3, y + 0.3, 2.6, 'concrete')
    box(-2.0, -1.5, 0, 2.0, 3.2, 2.6, 'concreteD')
    box(-3.8, -3.0, 2.6, 3.8, 3.4, 13.6, 'beige')
    for k in range(4):
        z = 2.6 + k * 2.75
        for y0, sgn in ((-3.0, -1), (3.4, 1)):
            box(-3.8, y0 if sgn > 0 else y0 - 1.1, z, 3.8, y0 + 1.1 if sgn > 0 else y0, z + 0.2, 'concrete')
            yb = y0 + sgn * 1.05
            box(-3.8, min(yb, yb + sgn * 0.12), z + 0.2, 3.8, max(yb, yb + sgn * 0.12), z + 1.1, 'concrete')
            # ставни-«трисим» закрывают половину балкона
            sh = -3.8 + (k % 2) * 3.8
            box(sh, min(yb, yb + sgn * 0.08), z + 1.1, sh + 3.8, max(yb, yb + sgn * 0.08), z + 2.55, 'shutter')
        box(3.8, -1.0 + k * 0.4, z + 1.5, 4.3, -0.2 + k * 0.4, z + 2.1, 'white')   # кондиционер
        openings((-3.8, -3.0, 3.8, 3.4), 'EW', 2, z + 0.9, rect_shape(1.0, 1.2), 'glass')
    parapet(-3.8, -3.0, 3.8, 3.4, 13.6, 0.6, 0.2, 'beige')
    for x in (-2.4, 0, 2.4):
        solar(x, -1.2, 13.6, rot=False)
    box(1.5, 1.2, 13.6, 3.2, 3.0, 15.4, 'beige')
    prism(-2.8, 2.6, 13.6, 17, 0.05, 0.05, 4, 'metal')
    return 8, 8


@model
def house_eclectic():
    # эклектика 1920-х (Флорентин, Неве-Цедек): охра, арки лавок внизу, высокие окна с зелёными ставнями, кованый балкон
    box(-3.8, -3.6, 0, 3.8, 3.6, 10.5, 'ochre')
    box(-3.95, -3.75, 3.3, 3.95, 3.75, 3.6, 'trim')
    box(-4.0, -3.8, 10.2, 4.0, 3.8, 10.7, 'trim')
    openings((-3.8, -3.6, 3.8, 3.6), 'S', 3, 0, arch_outline(1.7, 2.9, round_top=True), 'dark', frame='trim')
    for z in (4.3, 7.4):
        for side in 'SNEW':
            (ox, oy), u, n, L = SIDES[side](-3.8, -3.6, 3.8, 3.6)
            for i in range(3):
                t = (i + 0.5) / 3 * L
                b = (ox + u[0] * t, oy + u[1] * t, z)
                plate(rect_shape(0.9, 2.0), b, u, n, 0.08, 'dark')
                for s in (-1, 1):
                    plate(rect_shape(0.45, 2.0), (b[0] + u[0] * s * 0.7, b[1] + u[1] * s * 0.7, z), u, n, 0.1, 'green')
    box(-1.6, -4.6, 4.2, 1.6, -3.6, 4.4, 'trim')            # кованый балкон
    box(-1.6, -4.65, 4.4, 1.6, -4.55, 5.3, 'dark')
    parapet(-3.8, -3.6, 3.8, 3.6, 10.7, 0.6, 0.2, 'ochre')
    plate([(-1.5, 0), (1.5, 0), (0, 1.0)], (0, -3.6, 11.3), (1, 0, 0), (0, -1, 0), 0.25, 'trim')
    for x in (-2, 1.5):
        prism(x, 1.5, 10.7, 12.0, 0.6, 0.6, 10, 'concreteD')
    return 8, 8


# ---------------------------------------------------------------- сборка
def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    out_dir = sys.argv[sys.argv.index('--render') + 1] if '--render' in sys.argv else None
    if out_dir in args:
        args.remove(out_dir)
    names = args or list(MODELS)
    path = os.path.join(ROOT, 'assets', 'models', 'models.js')
    data = {}
    if os.path.exists(path) and args:
        txt = open(path).read()
        data = json.loads(txt[txt.index('|| {}, ') + 7:txt.rindex(');')])
    for name in names:
        reset(PAL)
        w, d = MODELS[name]()
        e = export_data()
        e['w'], e['d'] = w, d
        data[name] = e
        print(f'{name}: {e["tris"]} треугольников, {w}×{d} м, высота {e["top"]} м')
        if out_dir:
            render(os.path.join(out_dir, name + '_hero.png'), 'hero')
            render(os.path.join(out_dir, name + '_game.png'), 'game')
    with open(path, 'w') as f:
        f.write('// Сгенерировано tools/models/landmarks.py — не править руками\n')
        f.write('window.GEN_MODELS = Object.assign(window.GEN_MODELS || {}, ' + json.dumps(data, sort_keys=True) + ');\n')


main()
