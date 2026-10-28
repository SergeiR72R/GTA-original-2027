# Общий скелет людей и их анимации (Blender как модуль Python, bpy): 16 костей,
# ключевые кадры ходьбы, бега, ожидания (с глотком кофе) и позы убитого;
# запекание кадров в повороты и сдвиги костей для игры (js/render3d.js) и веса
# вершин для цельной фигуры. Метры, лицом к +Y Blender (в игре — к −z), Z вверх.
import math, base64, struct
import bpy
from mathutils import Vector, Matrix

# кости: имя, родитель, начало, конец (метры)
BONES = [
    ('hips', None, (0, 0, 0.95), (0, 0, 1.05)),
    ('spine', 'hips', (0, 0, 1.05), (0, 0, 1.30)),
    ('chest', 'spine', (0, 0, 1.30), (0, 0, 1.50)),
    ('head', 'chest', (0, 0, 1.50), (0, 0, 1.80)),
]
for s, n in ((-1, 'L'), (1, 'R')):
    BONES += [
        ('upperarm.' + n, 'chest', (s * 0.22, 0, 1.45), (s * 0.25, 0, 1.18)),
        ('forearm.' + n, 'upperarm.' + n, (s * 0.25, 0, 1.18), (s * 0.26, 0, 0.94)),
        ('hand.' + n, 'forearm.' + n, (s * 0.26, 0, 0.94), (s * 0.26, 0, 0.85)),
        ('thigh.' + n, 'hips', (s * 0.10, 0, 0.95), (s * 0.10, 0, 0.52)),
        ('shin.' + n, 'thigh.' + n, (s * 0.10, 0, 0.52), (s * 0.10, 0, 0.10)),
        ('foot.' + n, 'shin.' + n, (s * 0.10, 0, 0.10), (s * 0.10, 0.13, 0.04)),
    ]
BI = {b[0]: i for i, b in enumerate(BONES)}


# ---------------------------------------------------------------- скелет
def armature():
    arm = bpy.data.armatures.new('rig')
    o = bpy.data.objects.new('rig', arm)
    bpy.context.scene.collection.objects.link(o)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT')
    for name, parent, h, t in BONES:
        b = arm.edit_bones.new(name)
        b.head, b.tail, b.roll = h, t, 0
        if parent:
            b.parent = arm.edit_bones[parent]
            b.use_connect = False
    bpy.ops.object.mode_set(mode='OBJECT')
    for pb in o.pose.bones:
        pb.rotation_mode = 'QUATERNION'
    return o


# ---------------------------------------------------------------- анимации
def rot(axis, deg):
    return Matrix.Rotation(math.radians(deg), 3, axis)


def pose(rig, R, loc=None):
    """R: {кость: матрица поворота в осях покоя (X — вперёд/назад для рук и ног,
    Z — вокруг вертикали, Y — в стороны)}; loc — сдвиг таза (метры, Z вверх)."""
    for name, pb in rig.pose.bones.items():
        rest = pb.bone.matrix_local.to_3x3()
        m = rest.inverted() @ R.get(name, Matrix.Identity(3)) @ rest
        pb.rotation_quaternion = m.to_quaternion()
        pb.location = (0, 0, 0)
    if loc:
        hips = rig.pose.bones['hips']
        hips.location = hips.bone.matrix_local.to_3x3().inverted() @ Vector(loc)


def key(rig, f):
    for pb in rig.pose.bones:
        pb.keyframe_insert('rotation_quaternion', frame=f)
        pb.keyframe_insert('location', frame=f)


def cyc(t, k=1):
    return math.cos(2 * math.pi * k * t), math.sin(2 * math.pi * k * t)


def walk(t):
    c, s = cyc(t)
    R = {}
    for side, sg in (('L', 1), ('R', -1)):
        cc, ss = c * sg, s * sg
        R['thigh.' + side] = rot('X', 24 * cc)
        R['shin.' + side] = rot('X', -6 - 48 * max(0.0, -ss) ** 1.2)
        R['foot.' + side] = rot('X', -10 * cc + 12 * max(0.0, -ss))
    R['upperarm.L'] = rot('X', -20 * c) @ rot('Y', 6)
    R['forearm.L'] = rot('X', 18 - 8 * c)
    R['upperarm.R'] = rot('X', 8 + 7 * c) @ rot('Y', -6)   # с кофе — рука почти не машет
    R['forearm.R'] = rot('X', 72)
    R['hand.R'] = rot('X', -72)   # стакан стоит ровно
    R['hips'] = rot('Z', 6 * c)
    R['spine'] = rot('X', -3) @ rot('Z', -4 * c)
    R['chest'] = rot('Z', -5 * c)
    R['head'] = rot('Z', 3 * c) @ rot('X', 2)
    return R, (0, 0, -0.025 * math.cos(4 * math.pi * t))


def run(t):
    c, s = cyc(t)
    R = {}
    for side, sg in (('L', 1), ('R', -1)):
        cc, ss = c * sg, s * sg
        R['thigh.' + side] = rot('X', 12 + 42 * cc)
        R['shin.' + side] = rot('X', -25 - 80 * max(0.0, -ss) ** 0.9)
        R['foot.' + side] = rot('X', -12 * cc + 20 * max(0.0, -ss))
    R['upperarm.L'] = rot('X', -42 * c) @ rot('Y', 10)
    R['forearm.L'] = rot('X', 85)
    R['upperarm.R'] = rot('X', 30 * c + 10) @ rot('Y', -10)   # бежит, расплёскивая кофе
    R['forearm.R'] = rot('X', 88)
    R['hand.R'] = rot('X', -80)
    R['hips'] = rot('Z', 9 * c)
    R['spine'] = rot('X', -10) @ rot('Z', -6 * c)
    R['chest'] = rot('X', -4) @ rot('Z', -8 * c)
    R['head'] = rot('X', 10) @ rot('Z', 5 * c)
    return R, (0, 0, -0.05 + 0.05 * abs(math.sin(2 * math.pi * t)))


def idle(t):
    # стоит, дышит; во второй половине цикла отпивает кофе
    b = math.sin(2 * math.pi * t)
    sip = max(0.0, math.sin(math.pi * (t - 0.45) / 0.4)) if 0.45 <= t <= 0.85 else 0.0
    R = {'chest': rot('X', 1.5 * b), 'head': rot('X', 2 * b - 14 * sip) @ rot('Z', 6 * math.sin(2 * math.pi * t * 0.5) * (1 - sip)),
         'upperarm.L': rot('X', 4) @ rot('Y', 5), 'forearm.L': rot('X', 10),
         'upperarm.R': rot('X', 10 + 38 * sip) @ rot('Y', -6 - 14 * sip), 'forearm.R': rot('X', 72 + 62 * sip), 'hand.R': rot('X', -72 - 30 * sip),
         'thigh.L': rot('Y', 3), 'thigh.R': rot('Y', -3)}
    return R, (0, 0, 0)


def dead(t):
    # лежит на спине (игра кладёт фигуру): руки раскинуты, ноги врозь
    return {'upperarm.L': rot('Y', 75), 'upperarm.R': rot('Y', -60), 'forearm.L': rot('X', 25), 'forearm.R': rot('X', 40),
            'thigh.L': rot('Y', 12), 'thigh.R': rot('Y', -8), 'shin.R': rot('X', -20), 'head': rot('Z', 30)}, (0, 0, 0)


# имя: (функция, кадров в цикле, шаг ключей)
ANIMS = {'walk': (walk, 24, 3), 'run': (run, 16, 2), 'idle': (idle, 60, 3), 'dead': (dead, 1, 1)}


# ---------------------------------------------------------------- экспорт
C3 = Matrix(((1, 0, 0), (0, 0, 1), (0, -1, 0)))   # Blender (x, y, z) → игра (x, z, −y)
C4 = C3.to_4x4()


def bone_worlds(rig):
    """Матрица кости в игре: деформация от покоя, сдвинутая в начало кости."""
    W = []
    for name, *_ in BONES:
        pb = rig.pose.bones[name]
        D = pb.matrix @ pb.bone.matrix_local.inverted()
        W.append(D @ Matrix.Translation(pb.bone.head_local))
    return W


def bake(rig, name):
    fn, N, step = ANIMS[name]
    rig.animation_data_clear()
    for f in list(range(0, N, step)) + [N]:
        R, loc = fn((f % N) / N)
        pose(rig, R, loc)
        key(rig, f)
    rig.animation_data.action.name = name
    rig.animation_data.action.use_fake_user = True
    q, p = [], []
    for f in range(N):
        bpy.context.scene.frame_set(f)
        bpy.context.view_layer.update()
        W = bone_worlds(rig)
        for i, (bn, parent, *_) in enumerate(BONES):
            L = (W[BI[parent]].inverted() @ W[i]) if parent else W[i]
            G = C4 @ L @ C4.inverted()
            t, r, _ = G.decompose()
            q += [r.x, r.y, r.z, r.w]
            p += list(t)
    return {'frames': N, 'q': b64(q), 'p': b64(p)}


def b64(a):
    return base64.b64encode(struct.pack('<%df' % len(a), *a)).decode()


# ---------------------------------------------------------------- веса
def seg(p, h, t):
    """Расстояние от точки до отрезка кости и положение проекции вдоль неё (м)."""
    d = t - h
    L = d.length
    s = max(0.0, min(L, (p - h).dot(d) / L))
    return (p - (h + d * (s / L))).length, s, L


# примерная толщина тела у кости (м): с ней ближайшая кость выбирается верно
THICK = {'hips': 0.16, 'spine': 0.16, 'chest': 0.18, 'head': 0.1, 'upperarm': 0.06, 'forearm': 0.045,
         'hand': 0.04, 'thigh': 0.085, 'shin': 0.06, 'foot': 0.05}


def skin_weights(p, zone=0.07, allow=None):
    """Веса вершины цельной фигуры: ближайшая кость, у суставов — плавно пополам
    с соседней (родителем у начала кости, продолжением — у конца).
    allow — какие кости рассматривать (None — все). Возвращает [(кость, вес), …]."""
    best = None
    for i, (n, par, h, t) in enumerate(BONES):
        if allow is not None and n not in allow:
            continue
        d, s, L = seg(p, Vector(h), Vector(t))
        d /= THICK[n.split('.')[0]]   # толстый торс «ближе», чем тонкая рука рядом
        if best is None or d < best[0] - 1e-6:
            best = (d, i, s, L)
    _, i, s, L = best
    n, par, h, t = BONES[i]
    if par is not None and s < zone:
        w = 0.5 + 0.5 * s / zone
        return [(i, w), (BI[par], 1 - w)]
    kids = [j for j, b in enumerate(BONES) if b[1] == n and Vector(b[2]) == Vector(t)]
    if len(kids) == 1 and L - s < zone:
        w = 0.5 + 0.5 * (L - s) / zone
        return [(i, w), (kids[0], 1 - w)]
    return [(i, 1.0)]
