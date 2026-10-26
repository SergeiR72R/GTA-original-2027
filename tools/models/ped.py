# Пешеход в 3D: «хипстер» с Ротшильда (прохожий civ_5) — борода, пучок, зелёная
# майка, тёмные джинсы, кеды и айс-кофе в правой руке. Low-poly фигура из частей
# на скелете (15 костей), каждая часть целиком следует за своей костью.
# Анимации — ключевые кадры в Blender (walk, run, idle, dead), запекаются по
# кадрам в повороты и сдвиги костей; игра крутит кости сама (js/render3d.js).
# Запуск (Blender как модуль Python, pip install bpy):
#   python tools/models/ped.py [--render папка]
# Пишет assets/models/ped.js. Метры, лицом к +Y Blender (в игре — к −z), Z вверх.
import os, sys, json, math, base64, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
from mathutils import Vector, Matrix, Quaternion
from lib import reset, _obj

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')

# материалы = цвета вершин (sRGB 0..1); игра может перекрасить по имени материала
COLORS = {
    'skin': (0.93, 0.74, 0.58), 'shirt': (0.20, 0.38, 0.25), 'pants': (0.20, 0.21, 0.24),
    'shoes': (0.50, 0.52, 0.55), 'sole': (0.92, 0.92, 0.90), 'hair': (0.33, 0.22, 0.13),
    'eyes': (0.08, 0.06, 0.05), 'cup': (0.86, 0.90, 0.92), 'coffee': (0.55, 0.36, 0.22), 'straw': (0.10, 0.10, 0.10),
}

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


# ---------------------------------------------------------------- геометрия
def limb(p0, p1, r0, r1, mat, n=8, sq=1.0):
    """Сужающийся цилиндр между двумя точками; sq — сплющивание поперёк (по Y)."""
    p0, p1 = Vector(p0), Vector(p1)
    d = (p1 - p0).normalized()
    a = Vector((1, 0, 0)) if abs(d.x) < 0.9 else Vector((0, 1, 0))
    a = (a - d * a.dot(d)).normalized()
    b = d.cross(a)
    bm = bmesh.new()
    ring = lambda p, r: [bm.verts.new(p + (a * math.cos(i * 2 * math.pi / n) + b * sq * math.sin(i * 2 * math.pi / n)) * r) for i in range(n)]
    lo, hi = ring(p0, r0), ring(p1, r1)
    for i in range(n):
        bm.faces.new((lo[i], lo[(i + 1) % n], hi[(i + 1) % n], hi[i]))
    bm.faces.new(lo); bm.faces.new(list(reversed(hi)))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _obj('limb', bm, mat)


def loftz(secs, mat, n=10, e=2.6):
    """Тело по горизонтальным сечениям: (z, cx, cy, полуширина, полуглубина)."""
    bm = bmesh.new()
    rings = []
    for z, cx, cy, hw, hd in secs:
        ring = []
        for i in range(n):
            t = 2 * math.pi * (i + 0.5) / n
            c, s = math.cos(t), math.sin(t)
            ring.append(bm.verts.new((cx + hw * math.copysign(abs(c) ** (2 / e), c), cy + hd * math.copysign(abs(s) ** (2 / e), s), z)))
        rings.append(ring)
    for r0, r1 in zip(rings, rings[1:]):
        for i in range(n):
            bm.faces.new((r0[i], r0[(i + 1) % n], r1[(i + 1) % n], r1[i]))
    bm.faces.new(rings[0]); bm.faces.new(list(reversed(rings[-1])))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _obj('loft', bm, mat)


def ball(c, r, mat, seg=8, rings=4, sz=1.0):
    """Низкополигональный шар (пучок волос, кисть руки); sz — сплющивание по Z."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=r)
    for v in bm.verts:
        v.co = Vector((c[0] + v.co.x, c[1] + v.co.y, c[2] + v.co.z * sz))
    return _obj('ball', bm, mat)


def boxp(x0, y0, z0, x1, y1, z1, mat):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    for v in bm.verts:
        v.co = Vector(((x0 + x1) / 2 + v.co.x * (x1 - x0), (y0 + y1) / 2 + v.co.y * (y1 - y0), (z0 + z1) / 2 + v.co.z * (z1 - z0)))
    return _obj('box', bm, mat)


def body():
    """Части фигуры: {кость: [объекты]} — в позе покоя (руки вдоль тела)."""
    P = {}
    add = lambda bone, *objs: P.setdefault(bone, []).extend(objs)
    add('hips', loftz([(0.86, 0, 0, 0.17, 0.11), (0.98, 0, 0, 0.175, 0.115), (1.06, 0, 0, 0.165, 0.11)], 'pants'))
    add('spine', loftz([(1.04, 0, 0, 0.165, 0.115), (1.18, 0, 0.005, 0.175, 0.125), (1.31, 0, 0.0, 0.18, 0.125)], 'shirt'))
    # майка: на груди и спине, плечи открыты; ключицы и плечи — кожа
    add('chest', loftz([(1.29, 0, 0, 0.18, 0.125), (1.40, 0, 0, 0.19, 0.125), (1.47, 0, 0, 0.17, 0.11)], 'shirt'),
        loftz([(1.46, 0, 0, 0.215, 0.10), (1.50, 0, 0, 0.19, 0.09), (1.53, 0, 0, 0.09, 0.06)], 'skin'),
        limb((0, 0, 1.49), (0, 0.01, 1.60), 0.055, 0.05, 'skin', n=8))
    # голова: чуть крупнее жизни — читается сверху; борода, волосы с пучком, глаза, нос
    add('head', loftz([(1.57, 0, 0.01, 0.085, 0.09), (1.64, 0, 0.0, 0.10, 0.11), (1.74, 0, 0.0, 0.10, 0.115), (1.82, 0, -0.005, 0.085, 0.10), (1.85, 0, -0.01, 0.05, 0.06)], 'skin', n=10, e=2.4),
        loftz([(1.555, 0, 0.035, 0.07, 0.065), (1.60, 0, 0.04, 0.095, 0.08), (1.665, 0, 0.035, 0.103, 0.083)], 'hair', n=10, e=2.4),
        loftz([(1.72, 0, -0.012, 0.104, 0.118), (1.80, 0, -0.012, 0.092, 0.108), (1.855, 0, -0.015, 0.06, 0.07), (1.87, 0, -0.02, 0.02, 0.02)], 'hair', n=10, e=2.4),
        ball((0, -0.05, 1.86), 0.045, 'hair'),
        boxp(-0.06, 0.105, 1.705, -0.03, 0.118, 1.725, 'eyes'), boxp(0.03, 0.105, 1.705, 0.06, 0.118, 1.725, 'eyes'),
        boxp(-0.012, 0.11, 1.66, 0.012, 0.14, 1.70, 'skin'))
    for s, n in ((-1, 'L'), (1, 'R')):
        add('upperarm.' + n, limb((s * 0.225, 0, 1.47), (s * 0.25, 0, 1.18), 0.058, 0.048, 'skin'))
        add('forearm.' + n, limb((s * 0.25, 0, 1.19), (s * 0.26, 0, 0.94), 0.047, 0.04, 'skin'))
        add('hand.' + n, ball((s * 0.26, 0.0, 0.89), 0.05, 'skin', seg=6, rings=4, sz=1.3))
        add('thigh.' + n, limb((s * 0.10, 0, 0.97), (s * 0.10, 0, 0.52), 0.085, 0.066, 'pants'))
        add('shin.' + n, limb((s * 0.10, 0, 0.53), (s * 0.10, 0, 0.11), 0.065, 0.055, 'pants'))
        add('foot.' + n, boxp(s * 0.10 - 0.055, -0.06, 0.035, s * 0.10 + 0.055, 0.19, 0.12, 'shoes'),
            boxp(s * 0.10 - 0.06, -0.065, 0.0, s * 0.10 + 0.06, 0.20, 0.035, 'sole'))
    # айс-кофе в правой руке: прозрачный стакан, кофе, соломинка
    add('hand.R', loftz([(0.80, 0.30, 0.03, 0.035, 0.035), (0.94, 0.30, 0.03, 0.043, 0.043)], 'cup', n=8, e=2.0),
        loftz([(0.81, 0.30, 0.03, 0.033, 0.033), (0.90, 0.30, 0.03, 0.039, 0.039)], 'coffee', n=8, e=2.0),
        limb((0.30, 0.03, 0.93), (0.31, 0.035, 1.0), 0.006, 0.006, 'straw', n=4))
    return P


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


def attach(rig, parts):
    """Каждая часть следует за своей костью (родитель — кость), позиция не меняется."""
    bpy.context.view_layer.update()
    for bone, objs in parts.items():
        pb = rig.pose.bones[bone]
        m = rig.matrix_world @ pb.matrix @ Matrix.Translation((0, pb.bone.length, 0))
        for ob in objs:
            ob.parent, ob.parent_type, ob.parent_bone = rig, 'BONE', bone
            ob.matrix_parent_inverse = m.inverted()
            ob['bone'] = BI[bone]


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


def export(rig):
    rig.data.pose_position = 'REST'
    bpy.context.view_layer.update()
    mats = list(COLORS)
    pos, nor, mid, bone = [], [], [], []
    for ob in bpy.context.scene.objects:
        if ob.type != 'MESH' or 'bone' not in ob:
            continue
        m = mats.index(ob.data.materials[0].name)
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.triangulate(bm, faces=bm.faces)
        bm.normal_update()
        for f in bm.faces:
            n = C3 @ (ob.matrix_world.to_3x3() @ f.normal).normalized()
            for v in f.verts:
                pos += list(C3 @ (ob.matrix_world @ v.co))
                nor += list(n)
                mid.append(m)
                bone.append(ob['bone'])
        bm.free()
    rig.data.pose_position = 'POSE'
    bones = [{'name': n, 'parent': BI[p] if p else -1, 'head': [round(x, 4) for x in C3 @ Vector(h)]} for n, p, h, _ in BONES]
    return {'tris': len(pos) // 9, 'pos': b64(pos), 'nor': b64(nor), 'mid': b64(mid), 'bone': b64(bone),
            'mats': mats, 'colors': [list(COLORS[k]) for k in mats], 'bones': bones}


def preview(rig, out_dir):
    """Кадры ходьбы, бега и глотка кофе сбоку — для проверки."""
    from lib import render
    render(os.path.join(out_dir, 'ped_hero.png'), 'hero', 512)
    sc = bpy.context.scene
    cam = bpy.data.objects['_cam']
    cam.data.lens = 50
    for name in ('walk', 'run', 'idle'):
        fn, N, _ = ANIMS[name]
        rig.animation_data_clear()
        for k in range(4):
            t = k / 4 if name != 'idle' else 0.45 + k * 0.1
            pose(rig, *fn(t))
            bpy.context.view_layer.update()
            for side, loc in (('side', (4.5, 0.6, 1.1)), ('34', (2.6, 3.2, 2.0))):
                cam.location = Vector(loc)
                cam.rotation_euler = (Vector((0, 0, 0.95)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
                sc.render.resolution_x, sc.render.resolution_y = 300, 400
                sc.render.filepath = os.path.join(out_dir, f'{name}_{k}_{side}.png')
                bpy.ops.render.render(write_still=True)


def main():
    out_dir = sys.argv[sys.argv.index('--render') + 1] if '--render' in sys.argv else None
    reset(COLORS)
    parts = body()
    rig = armature()
    attach(rig, parts)
    data = export(rig)
    data['anims'] = {name: bake(rig, name) for name in ANIMS}
    print(f'ped: {data["tris"]} треугольников, костей {len(BONES)}, анимации: ' + ', '.join(f'{k} {v["frames"]}' for k, v in data['anims'].items()))
    with open(os.path.join(ROOT, 'assets', 'models', 'ped.js'), 'w') as f:
        f.write('// Сгенерировано tools/models/ped.py — не править руками\n')
        f.write('window.GEN_MODELS = Object.assign(window.GEN_MODELS || {}, ' + json.dumps({'ped_hipster': data}, sort_keys=True) + ');\n')
    if out_dir:
        preview(rig, out_dir)


if __name__ == '__main__':
    main()
