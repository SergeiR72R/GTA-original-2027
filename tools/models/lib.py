# Общие детали для low-poly моделей зданий (Blender как модуль Python, bpy).
# Единицы — метры, ось Z вверх, «юг» игры — это −Y Blender (главный фасад).
# Цвета — в вершинах (без текстур): материал = имя цвета из палитры.
import bpy, bmesh, math, os, json, base64, struct, random
from mathutils import Vector

PAL = {}
RND = random.Random(7)
# окна (материал dark на плоских фигурах): каждое — целиком один из WIN_KINDS
# вариантов атласа окон в игре (рама, стекло, шторы/жалюзи; горит или нет)
WIN_KINDS = 4

# Текстуры материалов (бесшовные, assets/gen/textures/<имя>.png): материал модели →
# (текстура, метров на один повтор, яркость). Нет картинки — цвет из палитры.
# Список и промпты — js/asset-manifest.js (MODEL_TEXTURES), план — docs/PLAN_TEXTURES.md
TEX = {
    'stone': ('m_stone', 2.5, 1.0), 'trim': ('m_trim', 2.0, 1.0), 'concrete': ('m_concrete', 4.0, 1.0),
    'concreteD': ('m_concrete', 4.0, 0.78), 'white': ('m_white', 3.0, 1.0), 'beige': ('m_beige', 3.0, 1.0),
    'ochre': ('m_ochre', 3.0, 1.0), 'brick': ('m_brick', 3.0, 1.0), 'brown': ('m_brown', 3.0, 1.0),
    'brownL': ('m_brown', 3.0, 1.3), 'glass': ('m_glass', 4.0, 1.0), 'glassB': ('m_glassB', 4.0, 1.0),
    'metal': ('m_metal', 3.0, 1.0), 'roofT': ('m_roofT', 2.5, 1.0), 'dome': ('m_patina', 2.5, 1.0),
    'green': ('m_patina', 2.5, 0.9), 'gold': ('m_gold', 2.0, 1.0), 'blue': ('m_blueroof', 2.0, 1.0),
    'shutter': ('m_shutter', 2.0, 1.0), 'wood': ('m_wood', 1.5, 1.0), 'roof': ('m_roofflat', 4.0, 1.0),
    'graffiti1': ('m_graffiti', 4.0, 1.0), 'graffiti2': ('m_graffiti', 4.0, 1.0), 'graffiti3': ('m_graffiti', 4.0, 1.0),
    'rust': ('m_rust', 2.0, 1.0), 'red': ('m_paint_red', 2.0, 1.0), 'water': ('m_water', 3.0, 1.0),
    'pink': ('m_pinkpaint', 2.0, 1.0),
    # Ихилов: панели, стекло с ламелями, вертолётная площадка (на всю фигуру), цветной детский корпус
    'hpanel': ('m_hosp_panel', 6.0, 1.0), 'louver': ('m_hosp_louver', 8.0, 1.0),
    'helipad': ('m_helipad', 1.0, 1.0), 'kids': ('m_kids_panels', 8.0, 1.0),
    # армейский вертолёт (heli.py): краска с панелями, тёмный металл, стекло кабины, лопасти
    'heliOlive': ('m_heli_olive', 3.0, 1.0), 'heliDark': ('m_heli_metal', 1.5, 1.0),
    'heliGlass': ('m_heli_canopy', 1.5, 1.0), 'heliBlade': ('m_heli_blade', 2.0, 1.0),
}


def reset(palette):
    """Новая пустая сцена и палитра {имя: (r, g, b)} в sRGB 0..1."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    RND.seed(7)
    PAL.clear()
    PAL.update(palette)
    for k, c in palette.items():
        m = bpy.data.materials.new(k)
        m.use_nodes = True
        b = m.node_tree.nodes['Principled BSDF']
        b.inputs['Base Color'].default_value = (*[x ** 2.2 for x in c], 1)
        b.inputs['Roughness'].default_value = 0.85


def _obj(name, bm, mat):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(o)
    o.data.materials.append(bpy.data.materials[mat])
    return o


def box(x0, y0, z0, x1, y1, z1, mat):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    for v in bm.verts:
        v.co = Vector(((x0 + x1) / 2 + v.co.x * (x1 - x0), (y0 + y1) / 2 + v.co.y * (y1 - y0), (z0 + z1) / 2 + v.co.z * (z1 - z0)))
    return _obj('box', bm, mat)


def prism(cx, cy, z0, z1, r0, r1, n, mat, rot=None, cap=True):
    """n-угольная призма / усечённый конус; r1 = 0 — острый конус."""
    if rot is None:
        rot = math.pi / n
    bm = bmesh.new()
    ring = lambda r, z: [bm.verts.new((cx + r * math.cos(rot + i * 2 * math.pi / n), cy + r * math.sin(rot + i * 2 * math.pi / n), z)) for i in range(n)]
    lo = ring(r0, z0)
    if r1 > 0:
        hi = ring(r1, z1)
        for i in range(n):
            bm.faces.new((lo[i], lo[(i + 1) % n], hi[(i + 1) % n], hi[i]))
        if cap:
            bm.faces.new(hi)
    else:
        top = bm.verts.new((cx, cy, z1))
        for i in range(n):
            bm.faces.new((lo[i], lo[(i + 1) % n], top))
    if cap:
        bm.faces.new(list(reversed(lo)))
    return _obj('prism', bm, mat)


def dome(cx, cy, z0, r, h, mat, seg=12, rings=4, onion=False):
    """Купол (onion=True — луковица: шире в середине, острый верх)."""
    bm = bmesh.new()
    rows = []
    for j in range(rings):
        t = j / rings
        if onion:
            rr = r * (1.0 + 0.35 * math.sin(t * math.pi)) * (1 - t) ** 0.7
            z = z0 + h * t
        else:
            a = t * math.pi / 2
            rr, z = r * math.cos(a), z0 + h * math.sin(a)
        rows.append([bm.verts.new((cx + rr * math.cos(i * 2 * math.pi / seg), cy + rr * math.sin(i * 2 * math.pi / seg), z)) for i in range(seg)])
    top = bm.verts.new((cx, cy, z0 + h))
    for j in range(rings - 1):
        for i in range(seg):
            bm.faces.new((rows[j][i], rows[j][(i + 1) % seg], rows[j + 1][(i + 1) % seg], rows[j + 1][i]))
    for i in range(seg):
        bm.faces.new((rows[-1][i], rows[-1][(i + 1) % seg], top))
    return _obj('dome', bm, mat)


def arch_outline(w, h, n=4, round_top=False):
    """Контур арки (u, z) от земли: стрельчатая или полукруглая (round_top)."""
    spring = h - (w / 2 if round_top else h * 0.4)
    pts = [(-w / 2, 0), (w / 2, 0), (w / 2, spring)]
    for i in range(1, n):
        a = i / n * math.pi / 2
        if round_top:
            pts.append((w / 2 * math.cos(a), spring + w / 2 * math.sin(a)))
        else:
            pts.append((w / 2 * math.cos(a) ** 0.8, spring + (h - spring) * math.sin(a)))
    pts.append((0, h))
    for x, z in reversed(pts[3:-1]):
        pts.append((-x, z))
    pts.append((-w / 2, spring))
    return pts


def plate(pts2d, origin, u, normal, depth, mat):
    """Плоская фигура на стене: (u вдоль стены, z вверх), выдавлена наружу на depth."""
    o, u, n = Vector(origin), Vector(u), Vector(normal)
    bm = bmesh.new()
    back = [bm.verts.new(o + u * x + Vector((0, 0, z))) for x, z in pts2d]
    front = [bm.verts.new(o + u * x + Vector((0, 0, z)) + n * depth) for x, z in pts2d]
    bm.faces.new(front)
    bm.faces.new(list(reversed(back)))
    k = len(pts2d)
    for i in range(k):
        bm.faces.new((back[i], back[(i + 1) % k], front[(i + 1) % k], front[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    o = _obj('plate', bm, mat)
    o['win'] = RND.randrange(WIN_KINDS)  # для окон: какой вариант из атласа
    return o


SIDES = {
    # сторона: (начало стены, направление вдоль, наружная нормаль) для прямоугольника x0..x1, y0..y1
    'S': lambda x0, y0, x1, y1: ((x0, y0), (1, 0, 0), (0, -1, 0), x1 - x0),
    'N': lambda x0, y0, x1, y1: ((x1, y1), (-1, 0, 0), (0, 1, 0), x1 - x0),
    'W': lambda x0, y0, x1, y1: ((x0, y1), (0, -1, 0), (-1, 0, 0), y1 - y0),
    'E': lambda x0, y0, x1, y1: ((x1, y0), (0, 1, 0), (1, 0, 0), y1 - y0),
}


def openings(rect, sides, count, z, shape, mat, frame=None, frame_pad=0.25, depth=0.12):
    """Ряд окон/арок по сторонам прямоугольника: shape — контур (u, z)."""
    x0, y0, x1, y1 = rect
    for s in sides:
        (ox, oy), u, n, L = SIDES[s](x0, y0, x1, y1)
        k = count if isinstance(count, int) else max(1, int(L / count))
        for i in range(k):
            t = (i + 0.5) / k * L
            base = (ox + u[0] * t, oy + u[1] * t, z)
            if frame:
                fs = [(x * (1 + frame_pad), zz * (1 + frame_pad * 0.5) - frame_pad * 0.3) for x, zz in shape]
                plate(fs, base, u, n, depth * 0.6, frame)
            plate(shape, base, u, n, depth, mat)


def rect_shape(w, h):
    return [(-w / 2, 0), (w / 2, 0), (w / 2, h), (-w / 2, h)]


def export_data():
    """Геометрия сцены для игры: x — восток, y — высота, z — юг (= −Y Blender).
    Треугольники сгруппированы по материалам (groups: [материал, начало, число вершин]),
    uv — кубическая развёртка в повторах текстуры материала."""
    by = {}
    lo = Vector((1e9, 1e9, 1e9)); hi = -lo
    for o in bpy.context.scene.objects:
        if o.type != 'MESH' or o.name.startswith('_'):
            continue
        name0 = o.data.materials[0].name
        sc = TEX.get(name0, (None, 3.0))[1]
        bm = bmesh.new(); bm.from_mesh(o.data)
        bmesh.ops.triangulate(bm, faces=bm.faces)
        bm.normal_update()
        # окно: развёртка на всю фигуру (0..1) в своей колонке атласа окон
        win = name0 == 'dark' and 'win' in o
        if win:
            nrm = (o.matrix_world.to_3x3() @ max(bm.faces, key=lambda f: f.calc_area()).normal).normalized()
            wax = max(range(3), key=lambda i: abs(nrm[i]))
            pick = lambda p: (p.y, p.z) if wax == 0 else (p.x, p.z) if wax == 1 else (p.x, p.y)
            pts = [pick(o.matrix_world @ v.co) for v in bm.verts]
            u0, u1 = min(p[0] for p in pts), max(p[0] for p in pts)
            w0, w1 = min(p[1] for p in pts), max(p[1] for p in pts)
            col = o['win']
        # fit: верх фигуры — одна картинка на всю фигуру (разметка вертолётной площадки)
        fit = 'fit' in o
        if fit:
            fp = [o.matrix_world @ v.co for v in bm.verts]
            fx0, fx1 = min(p.x for p in fp), max(p.x for p in fp)
            fy0, fy1 = min(p.y for p in fp), max(p.y for p in fp)
        for f in bm.faces:
            n = (o.matrix_world.to_3x3() @ f.normal).normalized()
            ax = max(range(3), key=lambda i: abs(n[i]))
            # верх и низ стекла и окон — без окон и света: глухая крышка
            name = 'cap' if name0 in ('glass', 'glassB', 'dark') and ax == 2 else name0
            L = by.setdefault(name, {'pos': [], 'nor': [], 'uv': []})
            for v in f.verts:
                p = o.matrix_world @ v.co
                lo = Vector(map(min, lo, p)); hi = Vector(map(max, hi, p))
                # как h3() в игре: высотки сжимаем, иначе упираются в камеру
                z = p.z if p.z <= 24 else 24 + (p.z - 24) * 0.4
                L['pos'] += [p.x, z, -p.y]
                L['nor'] += [n.x, n.z, -n.y]
                if win:
                    u, w = pick(p)
                    fu = (u - u0) / ((u1 - u0) or 1); fw = (w - w0) / ((w1 - w0) or 1)
                    L['uv'] += [(col + 0.04 + fu * 0.92) / WIN_KINDS, fw]
                    continue
                if fit and ax == 2:
                    L['uv'] += [(p.x - fx0) / ((fx1 - fx0) or 1), (p.y - fy0) / ((fy1 - fy0) or 1)]
                    continue
                u, w = (p.y, p.z) if ax == 0 else (p.x, p.z) if ax == 1 else (p.x, p.y)
                L['uv'] += [u / sc, w / sc]
        bm.free()
    pos, nor, col, uv, groups = [], [], [], [], []
    for name in sorted(by):
        L = by[name]
        t = TEX.get(name)  # [материал, начало, вершин, текстура или None, яркость]
        groups.append([name, len(pos) // 3, len(L['pos']) // 3, t[0] if t else None, t[2] if t else 1.0])
        pos += L['pos']; nor += L['nor']; uv += L['uv']
        col += list(PAL.get(name, (0.42, 0.47, 0.52))) * (len(L['pos']) // 3)
    b64 = lambda a: base64.b64encode(struct.pack('<%df' % len(a), *a)).decode()
    return {'tris': len(pos) // 9, 'top': round(hi.z, 2), 'pos': b64(pos), 'nor': b64(nor), 'col': b64(col), 'uv': b64(uv), 'groups': groups}


def render(path, kind='hero', size=640):
    """Превью: hero — вид 3/4, game — сверху под углом, как в игре."""
    sc = bpy.context.scene
    objs = [o for o in sc.objects if o.type == 'MESH']
    lo = Vector((1e9, 1e9, 1e9)); hi = -lo
    for o in objs:
        for v in o.data.vertices:
            p = o.matrix_world @ v.co
            lo = Vector(map(min, lo, p)); hi = Vector(map(max, hi, p))
    c = (lo + hi) / 2
    R = max((hi - lo).length, 10)
    if '_ground' not in bpy.data.objects:
        bpy.ops.mesh.primitive_plane_add(size=R * 4, location=(c.x, c.y, 0))
        g = bpy.context.active_object; g.name = '_ground'
        gm = bpy.data.materials.new('_ground'); gm.use_nodes = True
        gm.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.5, 0.45, 0.36, 1)
        g.data.materials.append(gm)
        w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
        w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.55, 0.7, 0.9, 1)
        w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.6
        sun = bpy.data.objects.new('_sun', bpy.data.lights.new('sun', 'SUN'))
        sun.data.energy = 4.0; sun.rotation_euler = (math.radians(40), 0, math.radians(-35))
        sc.collection.objects.link(sun)
        cam = bpy.data.objects.new('_cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
        sc.render.engine = 'CYCLES'; sc.cycles.samples = 24; sc.cycles.device = 'CPU'
    sc.render.resolution_x = sc.render.resolution_y = size
    cam = bpy.data.objects['_cam']
    if kind == 'hero':
        loc = c + Vector((0.75, -1.0, 0.45)).normalized() * R * 1.25
        loc.z = max(loc.z, hi.z * 0.5 + 3)
        tgt = Vector((c.x, c.y, hi.z * 0.42))
    else:
        loc = Vector((c.x, c.y - R * 0.55, R * 1.6 + hi.z))
        tgt = Vector((c.x, c.y, 0))
    cam.location = loc; cam.data.lens = 32
    cam.rotation_euler = (tgt - loc).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)
