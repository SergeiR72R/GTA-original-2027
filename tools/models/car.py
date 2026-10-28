# Машина в 3D для камеры с наклоном (в духе машин GTA 3): седан — самая частая
# машина в потоке (VTYPES.sedan). Низкополигональный кузов со скруглёнными углами,
# кабина со стёклами и стойками, бамперы, фары, фонари, решётка, израильские
# жёлтые номера, зеркала, ручки, колёса в арках.
# Текстура — один атлас 1024×1024, запекается в Blender из сгенерированных кусков
# (assets/gen/textures/car_*: краска, стекло, фара, фонарь, решётка, колесо;
# промпты — js/asset-manifest.js, CAR_TEXTURES). Пока куска нет — на его месте
# рисунок-заглушка или цвет. Краска в атласе белая: цвет машины игра задаёт сама.
# Запуск (Blender как модуль Python, pip install bpy):
#   python tools/models/car.py [--render папка]
# Пишет assets/models/car.js. Метры, нос — к +Y Blender (в игре — к −z), Z вверх.
import os, sys, json, math, base64, re, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
import numpy as np
from mathutils import Vector

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
KEY = 'car_sedan'
ATLAS = 1024
L, W, H = 4.40, 1.84, 1.46        # длина, ширина, высота кузова (м)

# материал: (кусок текстуры, способ, метров на повтор / зеркально, цвет-заглушка sRGB, группа в игре)
# способ: tile — бесшовный кусок «кубом» по метрам; fit — картинка на всю деталь
# (вид спереди/сбоку); color — просто цвет. Группа: paint — краска (цвет задаёт
# игра), lampF / lampR — фары и фонари (светятся ночью), rest — всё остальное
MATS = {
    'paint': ('car_paint', 'tile', 1.6, (0.93, 0.93, 0.92), 'paint'),
    'glass': ('car_glass', 'tile', 1.2, (0.16, 0.21, 0.26), 'rest'),
    'trim': (None, 'color', 1, (0.10, 0.10, 0.11), 'rest'),          # чёрный пластик: бамперы, молдинги
    'chrome': (None, 'color', 1, (0.72, 0.74, 0.76), 'rest'),
    'tire': (None, 'color', 1, (0.07, 0.07, 0.07), 'rest'),
    'arch': (None, 'color', 1, (0.03, 0.03, 0.03), 'rest'),
    'under': (None, 'color', 1, (0.05, 0.05, 0.05), 'rest'),
    'wheel': ('car_wheel', 'fit', 'yz', (0.55, 0.56, 0.58), 'rest'),
    'grille': ('car_grille', 'fit', 'xz', (0.12, 0.12, 0.13), 'rest'),
    'plate': ('_plate', 'fit', 'xz', (0.98, 0.80, 0.10), 'rest'),
    'plateR': ('_plate', 'fit', '-xz', (0.98, 0.80, 0.10), 'rest'),
    'headL': ('car_headlight', 'fit', '-xz', (0.92, 0.94, 0.96), 'lampF'),
    'headR': ('car_headlight', 'fit', 'xz', (0.92, 0.94, 0.96), 'lampF'),
    'tailL': ('car_taillight', 'fit', 'xz', (0.75, 0.08, 0.06), 'lampR'),
    'tailR': ('car_taillight', 'fit', '-xz', (0.75, 0.08, 0.06), 'lampR'),
}


# ---------------------------------------------------------------- геометрия
def new_obj(name, bm, mat):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(o)
    o.data.materials.append(bpy.data.materials[mat])
    return o


def box(x0, y0, z0, x1, y1, z1, mat):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    for v in bm.verts:
        v.co = Vector(((x0 + x1) / 2 + v.co.x * (x1 - x0), (y0 + y1) / 2 + v.co.y * (y1 - y0), (z0 + z1) / 2 + v.co.z * (z1 - z0)))
    return new_obj('box', bm, mat)


def loft(secs, mat, n=16, e=5.0, axis='y', cap=True):
    """Тело по сечениям (s, c1, c2, hw, hh): s — вдоль оси, c1/c2 — центр сечения
    (для оси y: x и z, для оси x: y и z). Сечение — суперэллипс: e=2 — эллипс,
    больше — прямоугольник со скруглёнными углами."""
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
        bm.faces.new(rings[0]); bm.faces.new(list(reversed(rings[-1])))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return new_obj('loft', bm, mat)


def beam(p0, p1, r, mat, n=4):
    """Стойка кабины: тонкая балка между двумя точками."""
    p0, p1 = Vector(p0), Vector(p1)
    d = (p1 - p0).normalized()
    a = d.cross(Vector((0, 0, 1)) if abs(d.z) < 0.9 else Vector((1, 0, 0))).normalized()
    b = d.cross(a)
    bm = bmesh.new()
    ring = lambda p: [bm.verts.new(p + (a * math.cos(i * 2 * math.pi / n + math.pi / 4) + b * math.sin(i * 2 * math.pi / n + math.pi / 4)) * r) for i in range(n)]
    lo, hi = ring(p0), ring(p1)
    for i in range(n):
        bm.faces.new((lo[i], lo[(i + 1) % n], hi[(i + 1) % n], hi[i]))
    bm.faces.new(lo); bm.faces.new(list(reversed(hi)))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return new_obj('beam', bm, mat)


def disc(cx, cy, cz, r, w, mat, n=14):
    """Цилиндр вдоль X (колесо, арка)."""
    bm = bmesh.new()
    ring = lambda x: [bm.verts.new((x, cy + r * math.cos(i * 2 * math.pi / n), cz + r * math.sin(i * 2 * math.pi / n))) for i in range(n)]
    lo, hi = ring(cx - w / 2), ring(cx + w / 2)
    for i in range(n):
        bm.faces.new((lo[i], lo[(i + 1) % n], hi[(i + 1) % n], hi[i]))
    bm.faces.new(list(reversed(lo))); bm.faces.new(hi)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return new_obj('disc', bm, mat)


def body():
    hl = L / 2
    # низ кузова: капот ниже, крыша багажника чуть выше, бамперы скруглены
    loft([(hl, 0, 0.56, 0.86, 0.22), (hl - 0.10, 0, 0.60, 0.91, 0.30), (hl - 0.55, 0, 0.66, 0.92, 0.36),
          (0.80, 0, 0.68, 0.92, 0.38), (-1.30, 0, 0.69, 0.92, 0.39), (-hl + 0.32, 0, 0.68, 0.91, 0.37),
          (-hl + 0.06, 0, 0.62, 0.87, 0.29), (-hl, 0, 0.58, 0.84, 0.22)], 'paint', n=20, e=5.0)
    # кабина: лобовое и заднее стекло наклонены, крыша — краска поверх
    loft([(0.92, 0, 1.06, 0.84, 0.02), (0.10, 0, 1.25, 0.76, 0.21), (-0.78, 0, 1.25, 0.76, 0.21), (-1.46, 0, 1.08, 0.82, 0.03)],
         'glass', n=16, e=6.0)
    loft([(0.12, 0, 1.455, 0.70, 0.02), (-0.80, 0, 1.455, 0.70, 0.02)], 'paint', n=16, e=6.0)
    for s in (-1, 1):
        beam((s * 0.80, 0.90, 1.05), (s * 0.69, 0.10, 1.44), 0.045, 'paint')     # передние стойки
        beam((s * 0.69, -0.80, 1.44), (s * 0.78, -1.44, 1.06), 0.06, 'paint')    # задние стойки
        box(s * 0.775 - 0.035, -0.40, 1.05, s * 0.775 + 0.035, -0.30, 1.44, 'paint')   # средняя стойка
        box(min(s * 0.88, s * 1.01), 0.70, 1.00, max(s * 0.88, s * 1.01), 0.80, 1.10, 'paint')       # зеркала
        box(s * 0.925 - 0.01, 0.10, 0.88, s * 0.925 + 0.01, 0.24, 0.91, 'chrome')     # ручки дверей
        box(s * 0.925 - 0.01, -0.80, 0.88, s * 0.925 + 0.01, -0.66, 0.91, 'chrome')
        box(s * 0.92 - 0.012, -1.60, 0.42, s * 0.92 + 0.012, 1.55, 0.50, 'trim')      # молдинг по низу двери
    # бамперы — чёрный пластик
    box(-0.88, hl - 0.06, 0.28, 0.88, hl + 0.06, 0.50, 'trim')
    box(-0.86, -hl - 0.06, 0.30, 0.86, -hl + 0.06, 0.52, 'trim')
    # решётка, фары, фонари, номера — детали со своими картинками
    box(-0.36, hl - 0.02, 0.56, 0.36, hl + 0.025, 0.70, 'grille')
    box(-0.86, hl - 0.18, 0.64, -0.42, hl - 0.02, 0.76, 'headL')
    box(0.42, hl - 0.18, 0.64, 0.86, hl - 0.02, 0.76, 'headR')
    box(-0.88, -hl - 0.03, 0.72, -0.44, -hl + 0.20, 0.88, 'tailL')
    box(0.44, -hl - 0.03, 0.72, 0.88, -hl + 0.20, 0.88, 'tailR')
    box(-0.26, hl + 0.06, 0.33, 0.26, hl + 0.075, 0.45, 'plate')
    box(-0.26, -hl - 0.075, 0.55, 0.26, -hl - 0.06, 0.67, 'plateR')
    box(-0.85, -1.9, 0.20, 0.85, 1.9, 0.32, 'under')
    # колёса в арках: чёрная арка на боку, шина, диск
    for y in (1.36, -1.30):
        for s in (-1, 1):
            disc(s * 0.915, y, 0.36, 0.43, 0.02, 'arch', n=16)
            disc(s * 0.82, y, 0.33, 0.33, 0.22, 'tire', n=14)
            disc(s * 0.935, y, 0.33, 0.25, 0.012, 'wheel', n=14)


# ---------------------------------------------------------------- текстуры
def piece(name):
    """Сгенерированный кусок текстуры: файл в assets/gen/textures или из bundle.js."""
    if not name or name.startswith('_'):
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


def drawn(name, w=256, h=128):
    """Рисунок-заглушка детали, пока нет сгенерированного куска, и номер (всегда рисуется)."""
    y, x = np.mgrid[0:h, 0:w] / np.array([h, w])[:, None, None]
    c = np.ones((h, w, 4))
    if name == '_plate':   # израильский номер: жёлтый, чёрная рамка, синяя полоска слева, «цифры»
        c[..., :3] = (0.98, 0.80, 0.10)
        c[(x > 0.02) & (x < 0.15), :3] = (0.10, 0.25, 0.62)
        for k in range(7):
            x0 = 0.22 + k * 0.105
            c[(x > x0) & (x < x0 + 0.06) & (y > 0.25) & (y < 0.75), :3] = 0.08
        edge = (x < 0.02) | (x > 0.98) | (y < 0.06) | (y > 0.94)
        c[edge, :3] = 0.05
    elif name == 'car_headlight':
        c[..., :3] = 0.18
        lens = ((x - 0.5) / 0.46) ** 2 + ((y - 0.5) / 0.40) ** 2 < 1
        c[lens, :3] = (0.82, 0.86, 0.90)
        c[(((x - 0.33) / 0.14) ** 2 + ((y - 0.5) / 0.28) ** 2) < 1, :3] = 1.0
    elif name == 'car_taillight':
        c[..., :3] = (0.62, 0.05, 0.04)
        c[(x > 0.62) & (y > 0.2) & (y < 0.8), :3] = (0.95, 0.95, 0.95)
        c[(x > 0.08) & (x < 0.58) & (y > 0.25) & (y < 0.75), :3] = (0.92, 0.12, 0.08)
    elif name == 'car_grille':
        c[..., :3] = 0.10
        c[(np.floor(y * 6) % 2 == 0), :3] = 0.18
        c[(((x - 0.5) / 0.07) ** 2 + ((y - 0.5) / 0.22) ** 2) < 1, :3] = 0.75
    elif name == 'car_wheel':
        r = np.hypot(x - 0.5, y - 0.5)
        c[..., :3] = 0.07
        c[r < 0.40, :3] = 0.62
        ang = np.arctan2(y - 0.5, x - 0.5)
        c[(r < 0.36) & (r > 0.10) & (np.cos(ang * 5) < 0.2), :3] = 0.25
        c[r < 0.08, :3] = 0.45
    else:
        return None
    img = bpy.data.images.new(name, w, h)
    img.pixels = np.flipud(c).ravel().tolist()
    return img


def lin(c):
    return (*[x ** 2.2 for x in c], 1)


def shader(mat):
    """Цвет материала для запекания: кусок «кубом» по метрам, кусок на всю деталь или цвет."""
    tex, how, arg, col, _ = MATS[mat.name]
    nt = mat.node_tree; N = nt.nodes
    for n in list(N):
        if n.type != 'OUTPUT_MATERIAL':
            N.remove(n)
    out = [n for n in N if n.type == 'OUTPUT_MATERIAL'][0]
    bs = N.new('ShaderNodeBsdfPrincipled'); bs.inputs['Roughness'].default_value = 0.8
    nt.links.new(bs.outputs[0], out.inputs[0])
    img = piece(tex) or drawn(tex)
    if not img or how == 'color':
        bs.inputs['Base Color'].default_value = lin(col)
        return
    it = N.new('ShaderNodeTexImage'); it.image = img
    tc = N.new('ShaderNodeTexCoord')
    if how == 'tile':
        it.projection = 'BOX'; it.projection_blend = 0.25
        mp = N.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1 / arg,) * 3
        nt.links.new(tc.outputs['Object'], mp.inputs['Vector']); nt.links.new(mp.outputs[0], it.inputs['Vector'])
    else:
        # на всю деталь: координаты внутри рамки детали (Generated), нужные две оси
        sep = N.new('ShaderNodeSeparateXYZ'); comb = N.new('ShaderNodeCombineXYZ')
        nt.links.new(tc.outputs['Generated'], sep.inputs[0])
        flip = arg.startswith('-'); a, b = arg.lstrip('-')
        if flip:
            inv = N.new('ShaderNodeMath'); inv.operation = 'SUBTRACT'; inv.inputs[0].default_value = 1
            nt.links.new(sep.outputs[a.upper()], inv.inputs[1]); nt.links.new(inv.outputs[0], comb.inputs['X'])
        else:
            nt.links.new(sep.outputs[a.upper()], comb.inputs['X'])
        nt.links.new(sep.outputs[b.upper()], comb.inputs['Y'])
        nt.links.new(comb.outputs[0], it.inputs['Vector'])
    nt.links.new(it.outputs['Color'], bs.inputs['Base Color'])


def unwrap_and_bake(o):
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(50), island_margin=0.01)
    bpy.ops.object.mode_set(mode='OBJECT')
    # детали с картинками в атласе крупнее, иначе фара — несколько пикселей
    uv = o.data.uv_layers.active.data
    for f in o.data.polygons:
        if MATS[o.data.materials[f.material_index].name][1] == 'fit':
            for li in f.loop_indices:
                uv[li].uv *= 2.5
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.pack_islands(margin=0.004, rotate=True)
    bpy.ops.object.mode_set(mode='OBJECT')
    img = bpy.data.images.new('atlas', ATLAS, ATLAS)
    for m in o.data.materials:
        shader(m)
        it = m.node_tree.nodes.new('ShaderNodeTexImage'); it.image = img
        m.node_tree.nodes.active = it
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 4; sc.cycles.device = 'CPU'
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, margin=4, use_clear=True)
    # затенение во впадинах (AO) — впекаем в цвет
    ao = bpy.data.images.new('ao', ATLAS, ATLAS)
    for m in o.data.materials:
        m.node_tree.nodes.active.image = ao
    sc.cycles.samples = 48
    bpy.ops.object.bake(type='AO', margin=4, use_clear=True)
    c = np.array(img.pixels[:]).reshape(-1, 4)
    a = np.array(ao.pixels[:]).reshape(-1, 4)[:, :1]
    c[:, :3] *= 0.5 + 0.5 * a
    img.pixels = c.ravel().tolist()
    path = os.path.join(tempfile.mkdtemp(), 'atlas.jpg')
    img.filepath_raw = path; img.file_format = 'JPEG'
    sc.render.image_settings.quality = 90
    img.save()
    for m in o.data.materials:   # превью — с запечённым атласом
        nt = m.node_tree
        for n in list(nt.nodes):
            if n.type != 'OUTPUT_MATERIAL':
                nt.nodes.remove(n)
        out = [n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL'][0]
        bs = nt.nodes.new('ShaderNodeBsdfPrincipled'); bs.inputs['Roughness'].default_value = 0.5
        it = nt.nodes.new('ShaderNodeTexImage'); it.image = img
        nt.links.new(it.outputs['Color'], bs.inputs['Base Color']); nt.links.new(bs.outputs[0], out.inputs[0])
    return path


# ---------------------------------------------------------------- сборка и выгрузка
def build():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for k in MATS:
        m = bpy.data.materials.new(k); m.use_nodes = True
    body()
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
    return o


def export(o, atlas_path):
    """Треугольники по группам (краска, остальное, фары, фонари); игра: x — вправо,
    y — вверх, z — назад (= −Y Blender)."""
    me = o.data
    me.calc_loop_triangles()
    uvs = me.uv_layers.active.data
    order = ['paint', 'rest', 'lampF', 'lampR']
    by = {g: {'pos': [], 'nor': [], 'uv': []} for g in order}
    for t in me.loop_triangles:
        g = MATS[me.materials[t.material_index].name][4]
        n = t.normal
        for li, vi in zip(t.loops, t.vertices):
            p = me.vertices[vi].co
            by[g]['pos'] += [p.x, p.z, -p.y]
            by[g]['nor'] += [n.x, n.z, -n.y]
            u = uvs[li].uv; by[g]['uv'] += [u.x, u.y]
    pos, nor, uv, groups = [], [], [], []
    for g in order:
        groups.append([g, len(pos) // 3, len(by[g]['pos']) // 3])
        pos += by[g]['pos']; nor += by[g]['nor']; uv += by[g]['uv']
    import struct
    b64 = lambda a: base64.b64encode(struct.pack('<%df' % len(a), *a)).decode()
    tex = 'data:image/jpeg;base64,' + base64.b64encode(open(atlas_path, 'rb').read()).decode()
    return {'tris': len(pos) // 9, 'pos': b64(pos), 'nor': b64(nor), 'uv': b64(uv), 'groups': groups, 'tex': tex,
            'w': W, 'l': L, 'h': H}


def preview(o, out_dir):
    sc = bpy.context.scene
    bpy.ops.mesh.primitive_plane_add(size=14)
    g = bpy.context.active_object; g.name = '_ground'
    gm = bpy.data.materials.new('_ground'); gm.use_nodes = True
    gm.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.3, 0.3, 0.3, 1)
    g.data.materials.append(gm)
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.6, 0.72, 0.9, 1)
    sun = bpy.data.objects.new('_sun', bpy.data.lights.new('sun', 'SUN'))
    sun.data.energy = 3.5; sun.rotation_euler = (math.radians(40), 0, math.radians(-35))
    sc.collection.objects.link(sun)
    cam = bpy.data.objects.new('_cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
    cam.data.lens = 40
    sc.cycles.samples = 24
    sc.render.resolution_x, sc.render.resolution_y = 480, 360
    for i, loc in enumerate([(4.5, 5.5, 2.6), (-4.5, -5.5, 2.6), (6.5, 0.3, 1.2), (0.01, -1.5, 9.0)]):
        cam.location = Vector(loc)
        cam.rotation_euler = (Vector((0, 0, 0.6)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
        sc.render.filepath = os.path.join(out_dir, f'car{i}.png')
        bpy.ops.render.render(write_still=True)


def main():
    out_dir = sys.argv[sys.argv.index('--render') + 1] if '--render' in sys.argv else None
    o = build()
    atlas = unwrap_and_bake(o)
    data = export(o, atlas)
    print(f'{KEY}: {data["tris"]} треугольников, атлас {ATLAS}²')
    if out_dir:
        import shutil
        shutil.copy(atlas, os.path.join(out_dir, 'car_atlas.jpg'))
        preview(o, out_dir)
    path = os.path.join(ROOT, 'assets', 'models', 'car.js')
    with open(path, 'w') as f:
        f.write('// Сгенерировано tools/models/car.py — не править руками\n')
        f.write('window.GEN_MODELS = Object.assign(window.GEN_MODELS || {}, ' + json.dumps({KEY: data}) + ');\n')


if __name__ == '__main__':
    main()
