# Пешеход в 3D уровня прохожих GTA 3: «хипстер» с Ротшильда (прохожий civ_5) —
# борода, пучок, зелёная майка, тёмные джинсы, серые кеды, айс-кофе в правой руке.
# Цельная фигура (≈ 7 000 треугольников) с вылепленными мышцами и плавными
# сгибами в суставах на общем скелете (tools/models/rig.py); голова с лицом,
# объёмные борода, волосы и пучок, кисти с пальцами, кеды со шнурками, ремень,
# подвороты джинсов и стакан — на своих костях.
# Текстура — один атлас 512×512, запекается в Blender из сгенерированных кусков
# (assets/gen/textures/ped_hip_*: лицо, волосы, майка, джинсы, кожа, кеды; промпты —
# js/asset-manifest.js, PED_TEXTURES). Пока куска нет — на его месте цвет.
# Запуск (Blender как модуль Python, pip install bpy):
#   python tools/models/ped.py [--render папка]
# Пишет assets/models/ped.js. Метры, лицом к +Y Blender (в игре — к −z), Z вверх.
import os, sys, json, math, base64, re, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
from mathutils import Vector
import rig
from rig import BONES, BI, C3, b64, skin_weights

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
KEY = 'ped_hipster'
ATLAS = 512

# материал: (кусок текстуры, метров на повтор, цвет-заглушка sRGB)
MATS = {
    'shirt': ('ped_hip_tank', 0.35, (0.20, 0.38, 0.25)), 'pants': ('ped_hip_jeans', 0.35, (0.20, 0.21, 0.24)),
    'skin': ('ped_hip_skin', 0.30, (0.93, 0.74, 0.58)), 'hair': ('ped_hip_hair', 0.15, (0.33, 0.22, 0.13)),
    'shoes': ('ped_hip_shoes', 0.20, (0.50, 0.52, 0.55)), 'sole': (None, 1, (0.92, 0.92, 0.90)),
    'head': ('ped_hip_face', 1, (0.93, 0.74, 0.58)), 'cup': (None, 1, (0.88, 0.92, 0.94)),
    'coffee': (None, 1, (0.55, 0.36, 0.22)), 'straw': (None, 1, (0.10, 0.10, 0.10)),
    'body': (None, 1, (0.5, 0.5, 0.5)),
    'beard': ('ped_hip_hair', 0.10, (0.27, 0.18, 0.11)), 'belt': (None, 1, (0.26, 0.17, 0.10)), 'buckle': (None, 1, (0.72, 0.72, 0.70)),
}
NAMES = list(MATS)
# лицо — проекция спереди на голову: X от −FX до FX, Z от FZ0 до FZ1 (метры)
FX, FZ0, FZ1 = 0.105, 1.555, 1.865


# ---------------------------------------------------------------- геометрия
def new_obj(name, bm, mat, bone=None):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(o)
    o.data.materials.append(bpy.data.materials[mat])
    a = me.attributes.new('fb', 'INT', 'POINT')   # кость, к которой часть прибита целиком (−1 — веса по суставам)
    for i in range(len(me.vertices)):
        a.data[i].value = BI[bone] if bone else -1
    return o


def ball(c, r, mat, bone, seg=10, rings=6):
    """Шар-эллипсоид: r — (rx, ry, rz)."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=1)
    for v in bm.verts:
        v.co = Vector((c[0] + v.co.x * r[0], c[1] + v.co.y * r[1], c[2] + v.co.z * r[2]))
    return new_obj('ball', bm, mat, bone)


def cyl(c, z0, z1, r0, r1, mat, bone, n=10, cap=True):
    bm = bmesh.new()
    lo = [bm.verts.new((c[0] + r0 * math.cos(i * 2 * math.pi / n), c[1] + r0 * math.sin(i * 2 * math.pi / n), z0)) for i in range(n)]
    hi = [bm.verts.new((c[0] + r1 * math.cos(i * 2 * math.pi / n), c[1] + r1 * math.sin(i * 2 * math.pi / n), z1)) for i in range(n)]
    for i in range(n):
        bm.faces.new((lo[i], lo[(i + 1) % n], hi[(i + 1) % n], hi[i]))
    if cap:
        bm.faces.new(list(reversed(lo))); bm.faces.new(hi)
    return new_obj('cyl', bm, mat, bone)


def rbox(x0, y0, z0, x1, y1, z1, mat, bone, bevel=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    for v in bm.verts:
        v.co = Vector(((x0 + x1) / 2 + v.co.x * (x1 - x0), (y0 + y1) / 2 + v.co.y * (y1 - y0), (z0 + z1) / 2 + v.co.z * (z1 - z0)))
    if bevel:
        bmesh.ops.bevel(bm, geom=list(bm.edges), offset=bevel, segments=2, affect='EDGES', profile=0.5)
    return new_obj('box', bm, mat, bone)


def g(x):
    return math.exp(-x * x)


def loft(secs, mat, bone, n=12, e=2.6, axis='y', cap=True):
    """Тело по сечениям вдоль оси: (s, c1, c2, hw, hh) — для оси y центр (x, z),
    для оси z — (x, y); hw/hh — полуширина и полувысота (глубина)."""
    bm = bmesh.new()
    rings = []
    for s, c1, c2, hw, hh in secs:
        ring = []
        for i in range(n):
            a = 2 * math.pi * (i + 0.5) / n
            ca, sa = math.cos(a), math.sin(a)
            u = c1 + hw * math.copysign(abs(ca) ** (2 / e), ca)
            w = c2 + hh * math.copysign(abs(sa) ** (2 / e), sa)
            ring.append(bm.verts.new((u, s, w) if axis == 'y' else (u, w, s)))
        rings.append(ring)
    for r0, r1 in zip(rings, rings[1:]):
        for i in range(n):
            bm.faces.new((r0[i], r0[(i + 1) % n], r1[(i + 1) % n], r1[i]))
    if cap:
        bm.faces.new(rings[0]); bm.faces.new(list(reversed(rings[-1])))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return new_obj('loft', bm, mat, bone)


def capsule(p0, p1, r, mat, bone, seg=8, rings=6):
    """Вытянутый эллипсоид между двумя точками (палец, большой палец)."""
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    q = Vector((0, 0, 1)).rotation_difference(d.normalized())
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=1)
    for v in bm.verts:
        v.co = (p0 + p1) / 2 + q @ Vector((v.co.x * r, v.co.y * r, v.co.z * (d.length / 2 + r * 0.6)))
    return new_obj('capsule', bm, mat, bone)


def near(p):
    """Ближайшая кость (с поправкой на толщину), доля длины и точка на её оси."""
    best = None
    for i, (n, par, h, t) in enumerate(BONES):
        h, t = Vector(h), Vector(t)
        d, s, L = rig.seg(p, h, t)
        k = d / rig.THICK[n.split('.')[0]]
        if best is None or k < best[0]:
            best = (k, n, s / L, h + (t - h) * (s / L))
    return best[1:]


def body():
    """Тело одной сеткой: «скелет» из точек с радиусами → Skin + сглаживание, потом
    лепка: грудь, живот, лопатки, ягодицы, дельты, бицепсы, предплечья, икры."""
    V = {'pelvis': ((0, 0, 0.93), (0.165, 0.115)), 'belly': ((0, 0.012, 1.10), (0.16, 0.122)),
         'chest': ((0, 0.005, 1.30), (0.185, 0.115)), 'neckb': ((0, 0, 1.45), (0.13, 0.085)), 'neckt': ((0, 0.01, 1.60), (0.052, 0.052))}
    E = [('pelvis', 'belly'), ('belly', 'chest'), ('chest', 'neckb'), ('neckb', 'neckt')]
    for s, n in ((-1, 'L'), (1, 'R')):
        V['sh' + n] = ((s * 0.2, 0, 1.42), (0.064, 0.064)); V['el' + n] = ((s * 0.25, 0, 1.18), (0.044, 0.044))
        V['wr' + n] = ((s * 0.26, 0, 0.965), (0.034, 0.028))
        V['hip' + n] = ((s * 0.095, 0, 0.88), (0.088, 0.088)); V['kn' + n] = ((s * 0.1, 0, 0.52), (0.062, 0.062))
        V['an' + n] = ((s * 0.1, 0, 0.13), (0.05, 0.05))
        E += [('neckb', 'sh' + n), ('sh' + n, 'el' + n), ('el' + n, 'wr' + n), ('pelvis', 'hip' + n), ('hip' + n, 'kn' + n), ('kn' + n, 'an' + n)]
    names = list(V)
    me = bpy.data.meshes.new('body')
    me.from_pydata([V[k][0] for k in names], [(names.index(a), names.index(b)) for a, b in E], [])
    o = bpy.data.objects.new('body', me)
    bpy.context.scene.collection.objects.link(o)
    bpy.context.view_layer.objects.active = o
    sk = o.modifiers.new('skin', 'SKIN')
    for i, k in enumerate(names):
        me.skin_vertices[0].data[i].radius = V[k][1]
    me.skin_vertices[0].data[0].use_root = True
    o.modifiers.new('sub', 'SUBSURF').levels = 2
    bpy.ops.object.modifier_apply(modifier='skin')
    bpy.ops.object.modifier_apply(modifier='sub')
    # лепка
    for v in o.data.vertices:
        p = v.co.copy()
        n, t, c = near(p)
        r = p - c
        r = r.normalized() if r.length > 1e-6 else Vector((0, 1, 0))
        ax, z = abs(p.x), p.z
        if n in ('hips', 'spine', 'chest'):
            if p.y > 0:
                p.y += 0.02 * g((z - 1.335) / 0.055) * g((ax - 0.085) / 0.055)          # грудные
                p.y += 0.016 * g((z - 1.09) / 0.07) * g(p.x / 0.09)                    # животик
                p.y -= 0.004 * g(p.x / 0.02) * g((z - 1.2) / 0.12)                     # линия по центру
            else:
                p.y -= 0.013 * g((z - 1.37) / 0.055) * g((ax - 0.1) / 0.045)           # лопатки
                p.y += 0.006 * g(p.x / 0.022) * (1 if 1.0 < z < 1.45 else 0)           # ложбинка позвоночника
                p.y -= 0.024 * g((z - 0.86) / 0.06) * g((ax - 0.075) / 0.055)          # ягодицы
            p.z += 0.012 * g((ax - 0.11) / 0.04) * g((z - 1.46) / 0.03)                # трапеции
        elif n.startswith('upperarm'):
            p += r * (0.012 * g((t - 0.1) / 0.16))                                     # дельта
            p += r * (0.011 * g((t - 0.55) / 0.2) * max(0.0, r.y) + 0.006 * g((t - 0.5) / 0.25) * max(0.0, -r.y))  # бицепс, трицепс
        elif n.startswith('forearm'):
            p += r * (0.011 * g((t - 0.22) / 0.2) - 0.004 * g((t - 1) / 0.12))
        elif n.startswith('thigh'):
            p += r * (0.008 * g((t - 0.25) / 0.3))
        elif n.startswith('shin'):
            p += r * (0.016 * g((t - 0.3) / 0.16) * max(0.0, -r.y))                    # икры
        v.co = p
    # майка, джинсы и открытая кожа — маской в шейдере (shader, 'body'): ровные края
    o.data.materials.append(bpy.data.materials['body'])
    a = o.data.attributes.new('fb', 'INT', 'POINT')
    for i in range(len(o.data.vertices)):
        a.data[i].value = -1
    # ремень с пряжкой и подвороты джинсов — по обхвату тела в этих местах
    vs = [v.co for v in o.data.vertices]
    def girth(z0, z1, cx=None):
        pts = [p for p in vs if z0 < p.z < z1 and (abs(p.x) < 0.2 if cx is None else (p.x > 0) == (cx > 0) and abs(p.x - cx) < 0.09)]
        return max(abs(p.x - (cx or 0)) for p in pts), max(p.y for p in pts), min(p.y for p in pts)
    hw, y1, y0 = girth(0.96, 1.0)
    loft([(0.962, 0, (y1 + y0) / 2, hw + 0.007, (y1 - y0) / 2 + 0.007), (0.998, 0, (y1 + y0) / 2, hw + 0.007, (y1 - y0) / 2 + 0.007)], 'belt', None, n=20, e=2.4, axis='z')
    rbox(-0.022, y1 + 0.004, 0.966, 0.022, y1 + 0.012, 0.995, 'buckle', None, bevel=0.003)
    for s in (-1, 1):
        cw, cy1, cy0 = girth(0.13, 0.2, s * 0.1)
        loft([(0.135, s * 0.1, (cy1 + cy0) / 2, cw + 0.008, (cy1 - cy0) / 2 + 0.008), (0.175, s * 0.1, (cy1 + cy0) / 2, cw + 0.006, (cy1 - cy0) / 2 + 0.006)], 'pants', None, n=14, e=2.2, axis='z')
    return o


HEAD_C = Vector((0, 0.012, 1.70))


def head_shape(u):
    """Точка головы по направлению u (единичная сфера): череп, надбровья,
    глазницы, скулы, губы, челюсть и подбородок."""
    x, y, z = u.x * 0.088, u.y * 0.104, u.z * 0.122
    if u.z < -0.1:
        x *= 1 - 0.3 * min(1.0, (-u.z - 0.1) / 0.8)                          # челюсть уже
    if u.z < -0.5 and u.y > 0.3:
        y += 0.012 * u.y * (-u.z - 0.5) * 2                                    # подбородок
    if u.y < 0 and u.z > -0.3:
        y *= 1.08; z += 0.004                                                  # затылок
    f = max(0.0, u.y)
    y += 0.009 * g((u.z - 0.3) / 0.1) * g(u.x / 0.65) * f                      # надбровья
    y -= 0.011 * g((u.z - 0.13) / 0.09) * g((abs(u.x) - 0.36) / 0.16) * f       # глазницы
    x += math.copysign(0.006, u.x) * g((u.z + 0.05) / 0.13) * g((abs(u.x) - 0.72) / 0.2) * f   # скулы
    y += 0.007 * g((u.z + 0.37) / 0.06) * g(u.x / 0.3) * f                     # губы
    return HEAD_C + Vector((x, y, z))


def head():
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=16, radius=1)
    unit = {}
    for v in bm.verts:
        unit[v.index] = v.co.normalized()
        v.co = head_shape(unit[v.index])
    bm.normal_update()
    # объёмные борода с усами и волосы — оболочки над головой
    def shell(pred, off, mat):
        sb = bmesh.new()
        mp = {}
        for f in bm.faces:
            us = [unit[v.index] for v in f.verts]
            if not all(pred(u) for u in us):
                continue
            vs = []
            for v in f.verts:
                if v.index not in mp:
                    mp[v.index] = sb.verts.new(v.co + v.normal * off(unit[v.index]))
                vs.append(mp[v.index])
            sb.faces.new(vs)
        new_obj('shell', sb, mat, 'head')
    mouth = lambda u: abs(u.x) < 0.3 and -0.45 < u.z < -0.3 and u.y > 0.75
    beard = lambda u: u.z < (-0.22 if u.y > 0.6 else -0.02) and u.y > -0.45 and not mouth(u)
    hair = lambda u: (u.z > 0.42 and u.y < 0.8) or u.z > 0.62 or (u.y < -0.15 and u.z > -0.22) or (abs(u.x) > 0.86 and u.z > 0.0 and u.y < 0.3)
    shell(beard, lambda u: 0.012 + 0.008 * max(0.0, -u.z - 0.5), 'beard')
    shell(hair, lambda u: 0.009, 'hair')
    new_obj('head', bm, 'head', 'head')
    # нос: спинка, кончик, крылья ноздрей
    loft([(1.745, 0, 0.106, 0.008, 0.004), (1.722, 0, 0.118, 0.011, 0.007), (1.70, 0, 0.13, 0.014, 0.01),
          (1.685, 0, 0.136, 0.018, 0.012), (1.675, 0, 0.122, 0.022, 0.013), (1.672, 0, 0.11, 0.015, 0.01)], 'head', 'head', n=8, e=2.2, axis='z')
    for s in (-1, 1):
        ball((s * 0.088, -0.004, 1.695), (0.011, 0.024, 0.034), 'skin', 'head', seg=8, rings=6)
    ball((0, -0.06, 1.85), (0.045, 0.042, 0.04), 'hair', 'head', seg=10, rings=6)       # пучок
    capsule((0, -0.045, 1.83), (0, -0.07, 1.86), 0.012, 'hair', 'head')                   # резинка-основание


def hands():
    # ладонь, большой палец и пальцы двумя «парами», как у прохожих GTA 3
    for s, n in ((-1, 'L'), (1, 'R')):
        x = s * 0.262
        ball((x, 0.004, 0.905), (0.022, 0.04, 0.046), 'skin', 'hand.' + n, seg=8, rings=6)
        for dy in (0.016, -0.014):
            capsule((x + s * 0.002, dy, 0.868), (x - s * 0.006, dy + 0.012, 0.815), 0.0115, 'skin', 'hand.' + n)
        capsule((x - s * 0.012, 0.034, 0.9), (x - s * 0.022, 0.05, 0.862), 0.011, 'skin', 'hand.' + n)


def shoes():
    # кеды: подошва с поднятым носком, верх, язычок и белые шнурки
    for s, n in ((-1, 'L'), (1, 'R')):
        x, b = s * 0.1, 'foot.' + n
        loft([(0.198, x, 0.034, 0.025, 0.012), (0.18, x, 0.026, 0.048, 0.02), (0.13, x, 0.02, 0.056, 0.02), (0.05, x, 0.02, 0.052, 0.02),
              (-0.03, x, 0.02, 0.047, 0.02), (-0.07, x, 0.024, 0.042, 0.022), (-0.082, x, 0.03, 0.028, 0.016)], 'sole', b, n=14, e=3.0)
        loft([(0.188, x, 0.05, 0.026, 0.016), (0.165, x, 0.058, 0.047, 0.03), (0.11, x, 0.07, 0.051, 0.04), (0.04, x, 0.085, 0.05, 0.055),
              (-0.03, x, 0.095, 0.046, 0.06), (-0.068, x, 0.088, 0.04, 0.052), (-0.076, x, 0.084, 0.026, 0.03)], 'shoes', b, n=14, e=2.6)
        rbox(x - 0.02, 0.02, 0.128, x + 0.02, 0.07, 0.152, 'shoes', b, bevel=0.006)
        for yy, zz in ((0.135, 0.103), (0.105, 0.117), (0.075, 0.13), (0.045, 0.141)):
            rbox(x - 0.03, yy - 0.004, zz - 0.003, x + 0.03, yy + 0.004, zz + 0.004, 'sole', b)


def cup():
    # айс-кофе: стакан, кофе внутри (нижняя часть темнее), крышка-купол, соломинка
    c = (0.30, 0.03)
    cyl(c, 0.80, 0.885, 0.034, 0.039, 'coffee', 'hand.R')
    cyl(c, 0.885, 0.95, 0.039, 0.044, 'cup', 'hand.R')
    ball((c[0], c[1], 0.95), (0.044, 0.044, 0.018), 'cup', 'hand.R', seg=10, rings=4)
    cyl((0.305, 0.035), 0.95, 1.02, 0.006, 0.006, 'straw', 'hand.R', n=5)


# ---------------------------------------------------------------- текстура
def piece(name):
    """Сгенерированный кусок текстуры: файл в assets/gen/textures или из bundle.js."""
    if not name:
        return None
    for ext in ('png', 'jpg', 'webp'):
        p = os.path.join(ROOT, 'assets', 'gen', 'textures', name + '.' + ext)
        if os.path.exists(p):
            return bpy.data.images.load(p)
    if not hasattr(piece, 'bundle'):
        p = os.path.join(ROOT, 'assets', 'gen', 'bundle.js')
        s = open(p, encoding='utf-8').read() if os.path.exists(p) else ''
        m = re.match(r'\s*window\.GEN_BUNDLE\s*=\s*(\{.*\})\s*;?\s*$', s, re.S)
        piece.bundle = json.loads(m.group(1)) if m else {}
    url = piece.bundle.get('textures/' + name)
    if not url:
        return None
    head, data = url.split(',', 1)
    ext = 'webp' if 'webp' in head else 'png' if 'png' in head else 'jpg'
    p = os.path.join(tempfile.mkdtemp(), name + '.' + ext)
    open(p, 'wb').write(base64.b64decode(data))
    return bpy.data.images.load(p)


def lin(c):
    return (*[x ** 2.2 for x in c], 1)


def shader(mat, name):
    """Цвет материала для запекания: бесшовный кусок «кубом» по метрам или цвет;
    голова — лицо проекцией спереди, по бокам и сзади волосы / кожа шеи / борода."""
    tex, tile, col = MATS[name]
    nt = mat.node_tree
    N = nt.nodes
    for n in list(N):
        if n.type != 'OUTPUT_MATERIAL':
            N.remove(n)
    out = [n for n in N if n.type == 'OUTPUT_MATERIAL'][0]
    em = N.new('ShaderNodeBsdfDiffuse')
    nt.links.new(em.outputs[0], out.inputs[0])
    tc = N.new('ShaderNodeTexCoord')
    gn = N.new('ShaderNodeNewGeometry')
    gz = N.new('ShaderNodeSeparateXYZ'); nt.links.new(gn.outputs['Normal'], gz.inputs[0])

    def finish(sock):
        # нарисованный свет, как в текстурах прохожих GTA 3: сверху светлее, снизу темнее
        k = N.new('ShaderNodeMath'); k.operation = 'MULTIPLY_ADD'
        nt.links.new(gz.outputs['Z'], k.inputs[0]); k.inputs[1].default_value = 0.13; k.inputs[2].default_value = 0.9
        vm = N.new('ShaderNodeVectorMath'); vm.operation = 'SCALE'
        nt.links.new(sock, vm.inputs[0]); nt.links.new(k.outputs[0], vm.inputs['Scale'])
        nt.links.new(vm.outputs[0], em.inputs['Color'])

    def boxed(img, size):
        mp = N.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1 / size,) * 3
        nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
        it = N.new('ShaderNodeTexImage'); it.image = img; it.projection = 'BOX'; it.projection_blend = 0.25
        nt.links.new(mp.outputs[0], it.inputs['Vector'])
        return it.outputs['Color']

    def color(c):
        rgb = N.new('ShaderNodeRGB'); rgb.outputs[0].default_value = lin(c)
        return rgb.outputs[0]

    def math_node(op, *args):
        m = N.new('ShaderNodeMath'); m.operation = op
        for i, v in enumerate(args):
            if v is None:
                continue
            if isinstance(v, (int, float)):
                m.inputs[i].default_value = v
            else:
                nt.links.new(v, m.inputs[i])
        return m.outputs[0]

    def mix(fac, a, b):
        m = N.new('ShaderNodeMix'); m.data_type = 'RGBA'
        nt.links.new(fac, m.inputs['Factor'])
        nt.links.new(a, m.inputs[6]); nt.links.new(b, m.inputs[7])
        return m.outputs[2]

    if name == 'body':
        # майка, джинсы, кожа — по месту на теле (поза покоя, руки вдоль тела)
        sep = N.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Object'], sep.inputs[0])
        X, Y, Z = sep.outputs['X'], sep.outputs['Y'], sep.outputs['Z']
        ax = math_node('ABSOLUTE', X)
        mul = lambda *a: a[0] if len(a) == 1 else math_node('MULTIPLY', a[0], mul(*a[1:]))
        gt = lambda a, b: math_node('GREATER_THAN', a, b)
        lt = lambda a, b: math_node('LESS_THAN', a, b)
        neck = math_node('MULTIPLY_ADD', Z, 0.6, 0.075 - 1.42 * 0.6)
        skin_m = math_node('MAXIMUM', gt(Z, 1.5), math_node('MAXIMUM',
            math_node('MAXIMUM', mul(gt(Z, 1.25), gt(ax, 0.145)), mul(lt(Z, 1.25), gt(ax, 0.195))),
            math_node('MAXIMUM', mul(gt(Y, 0), gt(Z, 1.42), math_node('LESS_THAN', ax, neck)), mul(lt(Y, 0), gt(Z, 1.44), lt(ax, 0.06)))))
        pants_m = mul(lt(Z, 0.99), lt(ax, 0.2))
        part = lambda k: (boxed(piece(MATS[k][0]), MATS[k][1]) if piece(MATS[k][0]) else color(MATS[k][2]))
        finish(mix(pants_m, mix(skin_m, part('shirt'), part('skin')), part('pants')))
        return
    if name != 'head':
        img = piece(tex)
        finish(boxed(img, tile) if img else color(col))
        return
    # голова: что вокруг лица
    sep = N.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Object'], sep.inputs[0])
    geo = N.new('ShaderNodeNewGeometry')
    nsep = N.new('ShaderNodeSeparateXYZ'); nt.links.new(geo.outputs['Normal'], nsep.inputs[0])
    hair_img, skin_img = piece(MATS['hair'][0]), piece(MATS['skin'][0])
    hair = boxed(hair_img, 0.15) if hair_img else color(MATS['hair'][2])
    skin = boxed(skin_img, 0.3) if skin_img else color(MATS['skin'][2])
    top = math_node('GREATER_THAN', sep.outputs['Z'], 1.64)                       # волосы сверху и сзади
    beard = math_node('MULTIPLY', math_node('LESS_THAN', sep.outputs['Z'], 1.675), math_node('GREATER_THAN', nsep.outputs['Y'], -0.55))
    side = mix(math_node('MAXIMUM', top, beard), skin, hair)
    face = piece(tex) or placeholder_face()
    if face:
        # проекция спереди: X → u, Z → v
        mp = N.new('ShaderNodeMapping')
        mp.inputs['Location'].default_value = (FX / (2 * FX), -FZ0 / (FZ1 - FZ0), 0)
        mp.inputs['Scale'].default_value = (1 / (2 * FX), 1 / (FZ1 - FZ0), 1)
        comb = N.new('ShaderNodeCombineXYZ')
        nt.links.new(sep.outputs['X'], comb.inputs['X']); nt.links.new(sep.outputs['Z'], comb.inputs['Y'])
        nt.links.new(comb.outputs[0], mp.inputs['Vector'])
        it = N.new('ShaderNodeTexImage'); it.image = face; it.extension = 'EXTEND'
        nt.links.new(mp.outputs[0], it.inputs['Vector'])
        front = math_node('MULTIPLY', math_node('SUBTRACT', nsep.outputs['Y'], 0.05), 3.0)
        front = math_node('MINIMUM', math_node('MAXIMUM', front, 0.0), 1.0)
        finish(mix(front, side, it.outputs['Color']))


def placeholder_face():
    """Лицо-заглушка, пока нет сгенерированного: волосы, брови, глаза, нос, губы, борода.
    Высоты (v от подбородка к макушке) — как у головы: глаза 0,52, губы 0,32."""
    import numpy as np
    S = 256
    v, x = np.mgrid[0:S, 0:S] / (S - 1.0)
    x = (x - 0.5) * 2
    ax = np.abs(x)
    col = lambda c: np.array(c, dtype=float)
    img = np.ones((S, S, 3)) * col(MATS['skin'][2]) * (1 - 0.12 * x * x)[..., None]
    def put(mask, c, a=1.0):
        img[mask] = img[mask] * (1 - a) + col(c) * a
    hair, dark = col(MATS['hair'][2]), (0.12, 0.08, 0.06)
    rng = np.random.default_rng(3)
    put(v > 0.70 + 0.04 * x * x, hair)                                                     # волосы
    put((np.abs(v - (0.59 + 0.025 * (1 - ((ax - 0.3) / 0.2) ** 2))) < 0.017) & (ax > 0.1) & (ax < 0.5), hair * 0.8)   # брови
    eye = ((ax - 0.3) / 0.13) ** 2 + ((v - 0.52) / 0.034) ** 2 < 1
    put(eye, (0.95, 0.93, 0.88))
    put(((ax - 0.3) ** 2 + (v - 0.52) ** 2) < 0.036 ** 2, (0.38, 0.22, 0.12))              # радужка
    put(((ax - 0.3) ** 2 + (v - 0.52) ** 2) < 0.016 ** 2, dark)                            # зрачок
    put(eye & (v > 0.535), dark, 0.8)                                                      # верхнее веко
    put((np.abs(ax - 0.075) < 0.012) & (v > 0.4) & (v < 0.56), (0.7, 0.5, 0.4), 0.35)      # тени у носа
    put(((ax - 0.055) / 0.03) ** 2 + ((v - 0.405) / 0.012) ** 2 < 1, (0.35, 0.2, 0.16))     # ноздри
    beard = (v < 0.41) & ~((ax / 0.2) ** 2 + ((v - 0.32) / 0.03) ** 2 < 1)
    put(beard, hair * (0.85 + 0.3 * rng.random((S, S, 1)))[beard] if False else hair * 0.9)
    put((ax / 0.17) ** 2 + ((v - 0.32) / 0.028) ** 2 < 1, (0.62, 0.34, 0.3))               # губы
    put((np.abs(v - 0.32) < 0.004) & (ax < 0.15), (0.3, 0.12, 0.1))
    px = np.concatenate([img.clip(0, 1) ** 2.2, np.ones((S, S, 1))], axis=2)
    im = bpy.data.images.new('face_stub', S, S)
    im.pixels = px.ravel().tolist()
    return im


def unwrap_and_bake(o):
    """Развёртка в один атлас (голове — больше места) и запекание цвета."""
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(55), island_margin=0.02)
    bpy.ops.object.mode_set(mode='OBJECT')
    # лицо в атласе крупнее: увеличиваем островки головы до упаковки
    uv = o.data.uv_layers.active.data
    hi = NAMES.index('head')
    for f in o.data.polygons:
        if o.data.materials[f.material_index].name == 'head':
            for li in f.loop_indices:
                uv[li].uv *= 3.0
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.pack_islands(margin=0.01, rotate=True)
    bpy.ops.object.mode_set(mode='OBJECT')
    img = bpy.data.images.new('atlas', ATLAS, ATLAS)
    for m in o.data.materials:
        shader(m, m.name)
        it = m.node_tree.nodes.new('ShaderNodeTexImage'); it.image = img
        m.node_tree.nodes.active = it
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 4; sc.cycles.device = 'CPU'
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, margin=6, use_clear=True)
    # затенение во впадинах и складках (AO) — впекаем в цвет
    ao = bpy.data.images.new('ao', ATLAS, ATLAS)
    for m in o.data.materials:
        m.node_tree.nodes.active.image = ao
    sc.cycles.samples = 48
    bpy.ops.object.bake(type='AO', margin=6, use_clear=True)
    import numpy as np
    c = np.array(img.pixels[:]).reshape(-1, 4)
    a = np.array(ao.pixels[:]).reshape(-1, 4)[:, :1]
    c[:, :3] *= 0.45 + 0.55 * a
    img.pixels = c.ravel().tolist()
    path = os.path.join(tempfile.mkdtemp(), 'atlas.jpg')
    img.filepath_raw = path; img.file_format = 'JPEG'
    sc.render.image_settings.quality = 90
    img.save()
    # дальше (превью) — модель с запечённым атласом
    for m in o.data.materials:
        nt = m.node_tree
        for n in list(nt.nodes):
            if n.type != 'OUTPUT_MATERIAL':
                nt.nodes.remove(n)
        out = [n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL'][0]
        bs = nt.nodes.new('ShaderNodeBsdfPrincipled'); bs.inputs['Roughness'].default_value = 0.8
        it = nt.nodes.new('ShaderNodeTexImage'); it.image = img
        nt.links.new(it.outputs['Color'], bs.inputs['Base Color']); nt.links.new(bs.outputs[0], out.inputs[0])
    return path


# ---------------------------------------------------------------- сборка
def build():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for k in MATS:
        m = bpy.data.materials.new(k); m.use_nodes = True
    body(); head(); hands(); shoes(); cup()
    objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active
    o.name = KEY
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.quads_convert_to_tris()
    bpy.ops.object.mode_set(mode='OBJECT')
    for f in o.data.polygons:
        f.use_smooth = True
    # веса: части на своих костях целиком, тело — плавно по суставам
    fb = o.data.attributes['fb'].data
    W = []
    for v in o.data.vertices:
        W.append([(fb[v.index].value, 1.0)] if fb[v.index].value >= 0 else skin_weights(v.co))
    return o, W


def deform(o, W, rg):
    """Группы вершин и модификатор скелета — для превью в Blender."""
    for n, *_ in BONES:
        o.vertex_groups.new(name=n)
    for vi, ws in enumerate(W):
        for b, w in ws:
            o.vertex_groups[BONES[b][0]].add([vi], w, 'REPLACE')
    md = o.modifiers.new('rig', 'ARMATURE'); md.object = rg


def export(o, W, atlas_path):
    me = o.data
    me.calc_loop_triangles()
    cn = me.corner_normals
    uvs = me.uv_layers.active.data
    pos, nor, uv, si, sw = [], [], [], [], []
    for t in me.loop_triangles:
        for li, vi in zip(t.loops, t.vertices):
            pos += list(C3 @ me.vertices[vi].co)
            nor += list(C3 @ cn[li].vector)
            u = uvs[li].uv; uv += [u.x, u.y]
            ws = (W[vi] + [(0, 0.0)])[:2]
            si += [ws[0][0], ws[1][0]]; sw += [ws[0][1], ws[1][1]]
    bones = [{'name': n, 'parent': BI[p] if p else -1, 'head': [round(x, 4) for x in C3 @ Vector(h)]} for n, p, h, _ in BONES]
    tex = 'data:image/jpeg;base64,' + base64.b64encode(open(atlas_path, 'rb').read()).decode()
    return {'tris': len(pos) // 9, 'pos': b64(pos), 'nor': b64(nor), 'uv': b64(uv), 'si': b64(si), 'sw': b64(sw), 'bones': bones, 'tex': tex}


def preview(o, rg, out_dir):
    """Вид с трёх сторон в ходьбе, беге и с глотком кофе; атлас рядом."""
    sc = bpy.context.scene
    bpy.ops.mesh.primitive_plane_add(size=8)
    g = bpy.context.active_object; g.name = '_ground'
    gm = bpy.data.materials.new('_ground'); gm.use_nodes = True
    gm.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.45, 0.42, 0.38, 1)
    g.data.materials.append(gm)
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.6, 0.72, 0.9, 1)
    sun = bpy.data.objects.new('_sun', bpy.data.lights.new('sun', 'SUN'))
    sun.data.energy = 3.5; sun.rotation_euler = (math.radians(40), 0, math.radians(-35))
    sc.collection.objects.link(sun)
    cam = bpy.data.objects.new('_cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
    cam.data.lens = 50
    sc.cycles.samples = 24
    sc.render.resolution_x, sc.render.resolution_y = 360, 480
    shots = [('idle', 0.0, (1.3, 2.6, 1.6)), ('idle', 0.62, (0.4, 2.4, 1.7)), ('walk', 0.0, (2.9, 0.4, 1.2)), ('walk', 0.25, (2.9, 0.4, 1.2)),
             ('run', 0.0, (2.9, 0.4, 1.2)), ('walk', 0.5, (-1.6, -2.4, 1.6)), ('idle', 0.0, (0.01, 0.6, 4.0)), ('run', 0.6, (1.8, 2.2, 1.6))]
    for i, (name, t, loc) in enumerate(shots):
        rg.animation_data_clear()
        rig.pose(rg, *rig.ANIMS[name][0](t))
        bpy.context.view_layer.update()
        cam.location = Vector(loc)
        cam.rotation_euler = (Vector((0, 0, 1.0)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
        sc.render.filepath = os.path.join(out_dir, f'p{i}.png')
        bpy.ops.render.render(write_still=True)


def main():
    out_dir = sys.argv[sys.argv.index('--render') + 1] if '--render' in sys.argv else None
    o, W = build()
    atlas = unwrap_and_bake(o)
    rg = rig.armature()
    data = export(o, W, atlas)
    data['anims'] = {name: rig.bake(rg, name) for name in rig.ANIMS}
    print(f'{KEY}: {data["tris"]} треугольников, костей {len(BONES)}, атлас {ATLAS}², анимации: ' + ', '.join(f'{k} {v["frames"]}' for k, v in data['anims'].items()))
    with open(os.path.join(ROOT, 'assets', 'models', 'ped.js'), 'w') as f:
        f.write('// Сгенерировано tools/models/ped.py — не править руками\n')
        f.write('window.GEN_MODELS = Object.assign(window.GEN_MODELS || {}, ' + json.dumps({KEY: data}, sort_keys=True) + ');\n')
    if out_dir:
        import shutil
        shutil.copy(atlas, os.path.join(out_dir, 'atlas.jpg'))
        deform(o, W, rg)
        preview(o, rg, out_dir)


if __name__ == '__main__':
    main()
