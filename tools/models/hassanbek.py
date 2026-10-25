# Мечеть Хасан-Бек на набережной — low-poly модель для 3D-режима игры.
# Запуск (Blender как модуль Python, pip install bpy):
#   python tools/models/hassanbek.py [--render папка]
# Пишет assets/models/hassanbek.js (геометрия для js/render3d.js) и, с
# --render, превью-картинки. Единицы — метры, 1 клетка игры = 4 м.
# Участок 4×4 клетки: молельный зал — юго-запад 3×3, минарет — клетка на
# северо-востоке, остальное — двор. Главный фасад с аркадой смотрит на юг (−Y).
import bpy, bmesh, math, os, sys, json, base64, struct
from mathutils import Vector, Matrix

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# ---------------------------------------------------------------- материалы
COL = {
    'stone': (0.89, 0.81, 0.64), 'trim': (0.95, 0.90, 0.78), 'dark': (0.20, 0.17, 0.14),
    'glass': (0.16, 0.22, 0.26), 'roof': (0.80, 0.73, 0.58), 'dome': (0.58, 0.66, 0.62),
    'gold': (0.85, 0.66, 0.18), 'wood': (0.42, 0.27, 0.15),
}
MATS = {}
for k, c in COL.items():
    m = bpy.data.materials.new(k)
    m.diffuse_color = (*c, 1)
    m.use_nodes = True
    bsdf = m.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (*[x ** 2.2 for x in c], 1)
    bsdf.inputs['Roughness'].default_value = 0.85
    MATS[k] = m

def obj(name, me, mat):
    o = bpy.data.objects.new(name, me)
    scene.collection.objects.link(o)
    o.data.materials.append(MATS[mat])
    return o

def box(name, x0, y0, z0, x1, y1, z1, mat):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    for v in bm.verts:
        v.co = Vector(((x0 + x1) / 2 + v.co.x * (x1 - x0), (y0 + y1) / 2 + v.co.y * (y1 - y0), (z0 + z1) / 2 + v.co.z * (z1 - z0)))
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    return obj(name, me, mat)

def prism(name, cx, cy, z0, z1, r0, r1, n, mat, rot=0.0, cap=True):
    # n-угольная призма/усечённая пирамида (r1=0 — конус)
    bm = bmesh.new()
    lo = [bm.verts.new((cx + r0 * math.cos(rot + i * 2 * math.pi / n), cy + r0 * math.sin(rot + i * 2 * math.pi / n), z0)) for i in range(n)]
    if r1 > 0:
        hi = [bm.verts.new((cx + r1 * math.cos(rot + i * 2 * math.pi / n), cy + r1 * math.sin(rot + i * 2 * math.pi / n), z1)) for i in range(n)]
        for i in range(n):
            bm.faces.new((lo[i], lo[(i + 1) % n], hi[(i + 1) % n], hi[i]))
        if cap: bm.faces.new(hi)
    else:
        top = bm.verts.new((cx, cy, z1))
        for i in range(n):
            bm.faces.new((lo[i], lo[(i + 1) % n], top))
    if cap: bm.faces.new(list(reversed(lo)))
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    return obj(name, me, mat)

def dome(name, cx, cy, z0, r, h, mat, seg=12, rings=4):
    bm = bmesh.new()
    rows = []
    for j in range(rings):
        a = j / rings * math.pi / 2
        rows.append([bm.verts.new((cx + r * math.cos(a) * math.cos(i * 2 * math.pi / seg), cy + r * math.cos(a) * math.sin(i * 2 * math.pi / seg), z0 + h * math.sin(a))) for i in range(seg)])
    top = bm.verts.new((cx, cy, z0 + h))
    for j in range(rings - 1):
        for i in range(seg):
            bm.faces.new((rows[j][i], rows[j][(i + 1) % seg], rows[j + 1][(i + 1) % seg], rows[j + 1][i]))
    for i in range(seg):
        bm.faces.new((rows[-1][i], rows[-1][(i + 1) % seg], top))
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    return obj(name, me, mat)

def arch_outline(w, h, n=4):
    # стрельчатая арка: прямые стенки до 60% высоты, сверху два дуговых ската
    pts = [(-w / 2, 0), (w / 2, 0), (w / 2, h * 0.6)]
    for i in range(1, n + 1):
        t = i / n
        pts.append((w / 2 * math.cos(t * math.pi / 2) ** 0.8, h * 0.6 + h * 0.4 * math.sin(t * math.pi / 2)))
    pts[-1] = (0, h)
    for i in range(n - 1, 0, -1):
        x, z = pts[3 + i - 1]
        pts.append((-x, z))
    pts.append((-w / 2, h * 0.6))
    return pts

def wall_shape(name, pts2d, origin, axis_u, normal, depth, mat):
    # плоская фигура (окно, проём) на стене: pts2d в координатах (u вдоль стены, z вверх), выдавлена на depth наружу
    o, u, nrm = Vector(origin), Vector(axis_u), Vector(normal)
    bm = bmesh.new()
    back = [bm.verts.new(o + u * x + Vector((0, 0, z))) for x, z in pts2d]
    front = [bm.verts.new(o + u * x + Vector((0, 0, z)) + nrm * depth) for x, z in pts2d]
    n = len(pts2d)
    bm.faces.new(front)
    bm.faces.new(list(reversed(back)))  # задняя грань: фигура замкнута, нормали считаются верно
    for i in range(n):
        bm.faces.new((back[i], back[(i + 1) % n], front[(i + 1) % n], front[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    return obj(name, me, mat)

# ---------------------------------------------------------------- молельный зал
X0, X1, Y0, Y1, H = -7.6, 3.6, -7.6, 3.6, 8.0
CORE_Y0 = -5.4            # южная стена отступает — перед ней аркада
box('hall', X0, CORE_Y0, 0, X1, Y1, H, 'stone')
box('plinth', X0 - 0.15, CORE_Y0 - 0.15, 0, X1 + 0.15, Y1 + 0.15, 0.6, 'trim')
box('cornice', X0 - 0.25, CORE_Y0 - 0.25, H - 0.5, X1 + 0.25, Y1 + 0.25, H - 0.21, 'trim')
# парапет с зубцами
P = 0.35
for (a, b, c, d) in [(X0, CORE_Y0, X1, CORE_Y0 + P), (X0, Y1 - P, X1, Y1), (X0, CORE_Y0 + P, X0 + P, Y1 - P), (X1 - P, CORE_Y0 + P, X1, Y1 - P)]:
    box('parapet', a, b, H, c, d, H + 0.5, 'trim')
for i in range(int((X1 - X0) / 1.4) + 1):
    x = X0 + 0.3 + i * 1.4
    if x > X1 - 0.3: break
    box('merlon', x - 0.25, CORE_Y0 + 0.01, H + 0.49, x + 0.25, CORE_Y0 + P - 0.01, H + 1.1, 'trim')
    box('merlon', x - 0.25, Y1 - P + 0.01, H + 0.49, x + 0.25, Y1 - 0.01, H + 1.1, 'trim')
for i in range(int((Y1 - CORE_Y0) / 1.4) + 1):
    y = CORE_Y0 + 0.3 + i * 1.4
    if y > Y1 - 0.3: break
    box('merlon', X0 + 0.01, y - 0.25, H + 0.49, X0 + P - 0.01, y + 0.25, H + 1.1, 'trim')
    box('merlon', X1 - P + 0.01, y - 0.25, H + 0.49, X1 - 0.01, y + 0.25, H + 1.1, 'trim')
box('roof', X0 + P, CORE_Y0 + P, H - 0.05, X1 - P, Y1 - P, H + 0.05, 'roof')
# купол на восьмигранном барабане
CX, CY = (X0 + X1) / 2, (CORE_Y0 + Y1) / 2
prism('drum', CX, CY, H, H + 1.4, 3.0, 3.0, 8, 'trim', rot=math.pi / 8)
dome('dome', CX, CY, H + 1.4, 3.0, 2.6, 'dome')
prism('finial', CX, CY, H + 4.0, H + 4.9, 0.12, 0.0, 6, 'gold')

# стрельчатые окна: светлая рамка и тёмный проём, по три на стену
def windows(side):
    if side == 'S':
        o, u, n, L, y = (X0, CORE_Y0, 0), (1, 0, 0), (0, -1, 0), X1 - X0, None
    elif side == 'N':
        o, u, n, L = (X1, Y1, 0), (-1, 0, 0), (0, 1, 0), X1 - X0
    elif side == 'W':
        o, u, n, L = (X0, Y1, 0), (0, -1, 0), (-1, 0, 0), Y1 - CORE_Y0
    else:
        o, u, n, L = (X1, CORE_Y0, 0), (0, 1, 0), (1, 0, 0), Y1 - CORE_Y0
    k = 3
    for i in range(k):
        t = (i + 0.5) / k * L
        base = Vector(o) + Vector(u) * t + Vector((0, 0, 2.0))
        frame = [(x, z) for x, z in arch_outline(1.9, 4.4)]
        hole = [(x, z + 0.25) for x, z in arch_outline(1.3, 3.8)]
        wall_shape('wframe', frame, base, u, n, 0.08, 'trim')
        wall_shape('wglass', hole, base, u, n, 0.14, 'dark')
for s in 'SNWE':
    windows(s)
# главный вход в середине южной стены
door = arch_outline(2.2, 4.2)
wall_shape('doorframe', [(x * 1.3, z * 1.12) for x, z in door], (CX, CORE_Y0, 0.0), (1, 0, 0), (0, -1, 0), 0.1, 'trim')
wall_shape('door', door, (CX, CORE_Y0, 0.0), (1, 0, 0), (0, -1, 0), 0.18, 'wood')

# аркада перед южным фасадом: пять стрельчатых арок на колоннах, плоская кровля
AY0, AY1, AH = Y0, CORE_Y0, 5.2
box('arcade_roof', X0, AY0, AH, X1, AY1, AH + 0.6, 'trim')
box('arcade_floor', X0 + 0.02, AY0 + 0.03, 0, X1 - 0.02, AY1, 0.25, 'trim')
NA = 5
span = (X1 - X0) / NA
for i in range(NA + 1):
    x = X0 + i * span
    box('column', x - 0.3, AY0 - 0.03, 0, x + 0.3, AY0 + 0.6, AH - 0.01, 'stone')
for i in range(NA):
    x0 = X0 + i * span + 0.27
    w = span - 0.54                       # чуть заходит в колонны — без совпадающих граней
    # стена над пролётом с вырезом стрельчатой арки: верхняя кромка прямая, нижняя — по арке
    spring = AH - 2.6                     # пята арки
    arch = arch_outline(w, AH - 0.15, 4)  # контур арки от земли (u от −w/2 до w/2)
    curve = [(x, z) for x, z in arch if z >= spring - 1e-6 and not (z == 0)]
    curve = sorted(curve, key=lambda q: q[0])  # слева направо по дуге
    poly = [(-w / 2, AH), (-w / 2, spring)] + [q for q in curve if abs(q[0]) < w / 2 - 1e-6 or q[1] > spring] + [(w / 2, spring), (w / 2, AH)]
    wall_shape('spandrel', poly, (x0 + w / 2, AY0 + 0.06, 0), (1, 0, 0), (0, -1, 0), 0.45, 'stone')
for i in range(NA + 1):
    x = X0 + i * span
    box('merlon_a', x - 0.25, AY0 + 0.01, AH + 0.59, x + 0.25, AY0 + 0.4, AH + 1.1, 'trim')

# ---------------------------------------------------------------- минарет (северо-восточная клетка)
MX, MY = 6.0, 6.0
box('m_base', MX - 1.7, MY - 1.7, 0, MX + 1.7, MY + 1.7, 9.0, 'stone')
box('m_base_cornice', MX - 1.9, MY - 1.9, 8.6, MX + 1.9, MY + 1.9, 9.1, 'trim')
prism('m_trans', MX, MY, 9.1, 10.2, 1.75, 1.3, 8, 'stone', rot=math.pi / 8)
prism('m_shaft', MX, MY, 10.2, 23.0, 1.3, 1.15, 8, 'stone', rot=math.pi / 8)
for z in (13.5, 18.0):
    prism('m_band', MX, MY, z, z + 0.35, 1.32, 1.3, 8, 'trim', rot=math.pi / 8)
# узкие окошки-бойницы по сторонам ствола
for i in range(4):
    a = i * math.pi / 2 + math.pi / 8 + math.pi / 8
    for z in (15.0, 19.8):
        cx, cy = MX + math.cos(a) * 1.18, MY + math.sin(a) * 1.18
        u = (-math.sin(a), math.cos(a), 0)
        wall_shape('m_slit', arch_outline(0.35, 1.3, 2), (cx, cy, z), u, (math.cos(a), math.sin(a), 0), 0.08, 'dark')
# балкон муэдзина: консоли, площадка, ограждение
prism('m_corbel', MX, MY, 22.2, 23.2, 1.15, 2.0, 8, 'trim', rot=math.pi / 8)
prism('m_balcony', MX, MY, 23.2, 23.55, 2.05, 2.05, 8, 'trim', rot=math.pi / 8)
for i in range(8):
    a0, a1 = math.pi / 8 + i * math.pi / 4, math.pi / 8 + (i + 1) * math.pi / 4
    p0 = Vector((MX + 2.0 * math.cos(a0), MY + 2.0 * math.sin(a0), 23.55))
    p1 = Vector((MX + 2.0 * math.cos(a1), MY + 2.0 * math.sin(a1), 23.55))
    d = (p1 - p0)
    wall_shape('m_rail', [(0, 0), (d.length, 0), (d.length, 0.9), (0, 0.9)], p0, d.normalized(), Vector((math.cos((a0 + a1) / 2), math.sin((a0 + a1) / 2), 0)), 0.12, 'trim')
prism('m_upper', MX, MY, 23.55, 27.4, 0.95, 0.9, 8, 'stone', rot=math.pi / 8)
prism('m_upcorn', MX, MY, 27.4, 27.8, 0.9, 1.15, 8, 'trim', rot=math.pi / 8)
prism('m_cone', MX, MY, 27.8, 31.6, 1.15, 0.0, 8, 'dome', rot=math.pi / 8)
prism('m_rod', MX, MY, 31.5, 32.3, 0.07, 0.07, 4, 'gold')
# полумесяц: две дуги из коротких брусков
for i in range(7):
    a = -math.pi * 0.75 + i * math.pi * 1.5 / 6
    x, z = MX + 0.45 * math.cos(a), 32.75 + 0.45 * math.sin(a)
    box('crescent', x - 0.07, MY - 0.06, z - 0.07, x + 0.07, MY + 0.06, z + 0.07, 'gold')

# ---------------------------------------------------------------- экспорт для игры
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib
lib.PAL.update(COL)
data = lib.export_data()
data['w'], data['d'] = 16, 16
path = os.path.join(ROOT, 'assets', 'models', 'hassanbek.js')
with open(path, 'w') as f:
    f.write('// Сгенерировано tools/models/hassanbek.py — не править руками\n')
    f.write('window.GEN_MODELS = window.GEN_MODELS || {};\nwindow.GEN_MODELS.hassanbek = ' + json.dumps(data) + ';\n')
print('triangles:', data['tris'], '->', path)

# ---------------------------------------------------------------- превью
if '--render' in sys.argv:
    out = sys.argv[sys.argv.index('--render') + 1]
    bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0))
    g = bpy.context.active_object
    gm = bpy.data.materials.new('ground'); gm.use_nodes = True
    gm.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.55, 0.47, 0.34, 1)
    g.data.materials.append(gm)
    w = bpy.data.worlds.new('w'); scene.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.55, 0.7, 0.9, 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.6
    sun = bpy.data.objects.new('sun', bpy.data.lights.new('sun', 'SUN'))
    sun.data.energy = 4.0; sun.rotation_euler = (math.radians(40), 0, math.radians(-35))
    scene.collection.objects.link(sun)
    scene.render.engine = 'CYCLES'; scene.cycles.samples = 48; scene.cycles.device = 'CPU'
    scene.render.resolution_x, scene.render.resolution_y = 900, 900
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); scene.collection.objects.link(cam); scene.camera = cam
    def shot(name, loc, target, lens=35):
        cam.location = loc; cam.data.lens = lens
        d = Vector(target) - Vector(loc)
        cam.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
        scene.render.filepath = os.path.join(out, name)
        bpy.ops.render.render(write_still=True)
    shot('hassanbek_hero.png', (26, -36, 16), (1, 0, 13), lens=32)
    shot('hassanbek_game.png', (0, -26, 46), (0, 0, 4), lens=40)
