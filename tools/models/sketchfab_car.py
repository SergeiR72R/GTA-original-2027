# Машины со Sketchfab (glTF) → 3D-машина игры: убираем невидимое сверху (салон,
# днище, подвеска, внутренние стороны бамперов, прозрачные колпаки фар),
# упрощаем сетку, запекаем все текстуры в один атлас 1024² (+ затенение во
# впадинах) и выгружаем треугольники по группам, как tools/models/car.py:
# краска (paint), остальное (rest), фары (lampF), фонари (lampR).
# У машины без своей раскраски кузова краска в атласе белая — цвет задаёт игра.
#
# Запуск (Blender как модуль Python, pip install bpy), архивы — как скачаны со
# Sketchfab (формат glTF):
#   python tools/models/sketchfab_car.py <ключ> <архив.zip | папка с scene.gltf> [--render папка]
# Ключи и источники — SOURCES ниже; модели пишутся в assets/models/cars_sf.js
# (дописываются к уже собранным). Авторы и лицензии — assets/models/CREDITS.txt.
import os, sys, json, math, base64, struct, tempfile, zipfile, re
import bpy, bmesh
import numpy as np
from mathutils import Vector, Matrix

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
OUT = os.path.join(ROOT, 'assets', 'models', 'cars_sf.js')
ATLAS = 1024

# ключ: (название, ссылка, доля треугольников после упрощения кузова, колёс)
SOURCES = {
    'car_kiri86': ("Kiri '86 - Low poly model", 'https://sketchfab.com/3d-models/kiri-86-low-poly-model-5c17c582ef9549798f694b660feea42a', 0.55, 0.22),
    'car_canyon_taxi': ("Canyon '75 Taxi - Low poly model", 'https://sketchfab.com/3d-models/canyon-75-taxi-low-poly-model-9e8f92a215784f3d8aaaaeab1bef54c4', 0.55, 0.22),
    'car_fairheaven_cop': ("Fairheaven LT '80 Cop Cruiser - Low poly model", 'https://sketchfab.com/3d-models/fairheaven-lt-80-cop-cruiser-low-poly-model-61766c1e6e1e4b2b803c174f33433a74', 0.55, 0.22),
}
# части, которых сверху не видно, и прозрачные колпаки поверх фар
DROP = re.compile(r'^[^_]+_(bottom|suspension|engine|exhaust|headlights_glass|taillights_glass)_', re.I)   # по имени детали, не материала
INSIDE = re.compile(r'interior|steering|seat', re.I)   # салон виден в окна — оставляем, но совсем грубо
WINDOWS = re.compile(r'windshield|rear_window|body_glass|glass_driver|glass_passenger|window', re.I)
LIGHTS = re.compile(r'headlight|blinker|reverse|brake|taillight|light', re.I)


def load(src):
    if src.endswith('.zip'):
        d = tempfile.mkdtemp()
        zipfile.ZipFile(src).extractall(d)
        src = d
    if os.path.isdir(src):
        for dp, _, fs in os.walk(src):
            for f in fs:
                if f.endswith('.gltf') or f.endswith('.glb'):
                    return os.path.join(dp, f)
    return src


def prepare(path, ratio_body, ratio_wheel):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=path)
    objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    for o in objs:
        if DROP.search(o.name) and not WINDOWS.search(o.name):
            bpy.data.objects.remove(o)
    objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    # где перёд: центр передних фар (по имени части)
    hv = [o.matrix_world @ v.co for o in objs if re.search(r'headlight', o.name, re.I) for v in o.data.vertices]
    head = sum(hv, Vector()) / len(hv) if hv else Vector((1, 1, 0))
    # роли частей: окна — тёмное стекло, фары/фонари, колёса, кузов
    for o in objs:
        role = 'window' if WINDOWS.search(o.name) else 'light' if LIGHTS.search(o.name) else 'wheel' if 'wheel' in o.name.lower() else 'paint' if 'bodymat' in o.name.lower() else 'rest'
        o['role'] = role
        md = o.modifiers.new('dec', 'DECIMATE')
        md.ratio = ratio_wheel if role == 'wheel' else 0.15 if INSIDE.search(o.name) else ratio_body if len(o.data.polygons) > 150 else 1.0
    # всё в одну сетку (модификаторы и положения применяются), роль — в атрибут граней
    deps = bpy.context.evaluated_depsgraph_get()
    bm = bmesh.new()
    roles = ['paint', 'rest', 'window', 'light', 'wheel']
    mats = []
    for o in objs:
        me = bpy.data.meshes.new_from_object(o.evaluated_get(deps))
        me.transform(o.matrix_world)
        n0 = len(bm.faces)
        off = len(mats)
        mats += list(me.materials)
        tmp = bmesh.new(); tmp.from_mesh(me)
        for f in tmp.faces:
            f.material_index += off
        rl = tmp.faces.layers.int.new('role')
        for f in tmp.faces:
            f[rl] = roles.index(o['role'])
        tmp.to_mesh(me); tmp.free()
        bm.from_mesh(me)
        bpy.data.meshes.remove(me)
    for o in objs:
        bpy.data.objects.remove(o)
    me = bpy.data.meshes.new('car')
    bm.to_mesh(me); bm.free()
    for m in mats:
        me.materials.append(m)
    o = bpy.data.objects.new('car', me)
    bpy.context.scene.collection.objects.link(o)
    # в начало координат (низ — на земле), нос — к +Y Blender (там передние фары)
    lo = Vector((1e9,) * 3); hi = -lo
    for v in me.vertices:
        lo = Vector(map(min, lo, v.co)); hi = Vector(map(max, hi, v.co))
    c = (lo + hi) / 2
    me.transform(Matrix.Translation((-c.x, -c.y, -lo.z)))
    head = head - Vector((c.x, c.y, 0))
    if abs(head.x) > abs(head.y):
        ang = math.pi / 2 if head.x > 0 else -math.pi / 2     # поворот (x, y) так, что фары → +Y
    else:
        ang = 0 if head.y > 0 else math.pi
    me.transform(Matrix.Rotation(ang, 4, 'Z'))
    return o


def glass_and_paint(o, tint):
    """Перед запеканием: окна — тёмное стекло, краска — белая (если цвет задаёт игра)."""
    for m in o.data.materials:
        if not m or not m.use_nodes:
            continue
        b = next((n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'), None)
        if not b:
            continue
        bc = b.inputs['Base Color']
        if 'bodymat' in m.name.lower() and tint and not bc.is_linked:
            bc.default_value = (0.85, 0.85, 0.85, 1)
        b.inputs['Alpha'].default_value = 1.0
        # текстуры — по исходной развёртке (новая будет активной для атласа)
        for n in m.node_tree.nodes:
            if n.type == 'TEX_IMAGE' and not n.inputs['Vector'].is_linked:
                uvn = m.node_tree.nodes.new('ShaderNodeUVMap'); uvn.uv_map = o.data.uv_layers[0].name
                m.node_tree.links.new(uvn.outputs[0], n.inputs['Vector'])
    # окна — отдельный материал тёмного стекла
    gm = bpy.data.materials.new('_glass'); gm.use_nodes = True
    gb = gm.node_tree.nodes['Principled BSDF']; gb.inputs['Base Color'].default_value = (0.035, 0.05, 0.07, 1)
    o.data.materials.append(gm)
    gi = len(o.data.materials) - 1
    rl = o.data.attributes['role'].data
    for f in o.data.polygons:
        if rl[f.index].value == 2:
            f.material_index = gi


def bake(o):
    me = o.data
    for x in list(bpy.context.scene.objects):   # пустышки из glTF — прочь
        if x.type != 'MESH':
            bpy.data.objects.remove(x)
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    atlas_uv = me.uv_layers.new(name='atlas')
    me.uv_layers.active = atlas_uv
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(60), island_margin=0.004)
    bpy.ops.object.mode_set(mode='OBJECT')
    img = bpy.data.images.new('atlas', ATLAS, ATLAS)
    for m in me.materials:
        it = m.node_tree.nodes.new('ShaderNodeTexImage'); it.image = img
        uvn = m.node_tree.nodes.new('ShaderNodeUVMap'); uvn.uv_map = 'atlas'
        m.node_tree.links.new(uvn.outputs[0], it.inputs['Vector'])
        m.node_tree.nodes.active = it
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 4; sc.cycles.device = 'CPU'
    sc.render.bake.target = 'IMAGE_TEXTURES'
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, margin=4, use_clear=True)
    ao = bpy.data.images.new('ao', ATLAS, ATLAS)
    for m in me.materials:
        m.node_tree.nodes.active.image = ao
    sc.cycles.samples = 32
    bpy.ops.object.bake(type='AO', margin=4, use_clear=True)
    c = np.array(img.pixels[:]).reshape(-1, 4)
    a = np.array(ao.pixels[:]).reshape(-1, 4)[:, :1]
    c[:, :3] *= 0.45 + 0.55 * a
    img.pixels = c.ravel().tolist()
    path = os.path.join(tempfile.mkdtemp(), 'atlas.jpg')
    img.filepath_raw = path; img.file_format = 'JPEG'
    sc.render.image_settings.quality = 88
    img.save()
    return path, img


def export(o, atlas_path, tint):
    me = o.data
    me.calc_loop_triangles()
    uvs = me.uv_layers['atlas'].data
    rl = me.attributes['role'].data
    lo = Vector((1e9,) * 3); hi = -lo
    for v in me.vertices:
        lo = Vector(map(min, lo, v.co)); hi = Vector(map(max, hi, v.co))
    order = ['paint', 'rest', 'lampF', 'lampR']
    by = {g: {'pos': [], 'nor': [], 'uv': []} for g in order}
    for t in me.loop_triangles:
        role = rl[t.polygon_index].value
        cy = sum(me.vertices[v].co.y for v in t.vertices) / 3
        g = 'paint' if role == 0 else ('lampF' if cy > 0 else 'lampR') if role == 3 else 'rest'
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
    b64 = lambda a: base64.b64encode(struct.pack('<%df' % len(a), *a)).decode()
    tex = 'data:image/jpeg;base64,' + base64.b64encode(open(atlas_path, 'rb').read()).decode()
    return {'tris': len(pos) // 9, 'pos': b64(pos), 'nor': b64(nor), 'uv': b64(uv), 'groups': groups, 'tex': tex,
            'w': round(hi.x - lo.x, 3), 'l': round(hi.y - lo.y, 3), 'h': round(hi.z - lo.z, 3), 'tint': tint}


def preview(o, img, out_dir, key):
    for m in o.data.materials:
        nt = m.node_tree
        for n in list(nt.nodes):
            if n.type != 'OUTPUT_MATERIAL':
                nt.nodes.remove(n)
        out = [n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL'][0]
        bs = nt.nodes.new('ShaderNodeBsdfPrincipled'); bs.inputs['Roughness'].default_value = 0.5
        it = nt.nodes.new('ShaderNodeTexImage'); it.image = img
        uvn = nt.nodes.new('ShaderNodeUVMap'); uvn.uv_map = 'atlas'
        nt.links.new(uvn.outputs[0], it.inputs['Vector'])
        nt.links.new(it.outputs['Color'], bs.inputs['Base Color']); nt.links.new(bs.outputs[0], out.inputs[0])
    sc = bpy.context.scene
    bpy.ops.mesh.primitive_plane_add(size=14)
    g = bpy.context.active_object
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
    for i, loc in enumerate([(4.5, 5.5, 2.6), (-4.5, -5.5, 2.6), (0.01, -4.0, 9.0)]):
        cam.location = Vector(loc)
        cam.rotation_euler = (Vector((0, 0, 0.6)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
        sc.render.filepath = os.path.join(out_dir, f'{key}_{i}.png')
        bpy.ops.render.render(write_still=True)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    out_dir = sys.argv[sys.argv.index('--render') + 1] if '--render' in sys.argv else None
    if out_dir in args:
        args.remove(out_dir)
    key, src = args[0], args[1]
    title, url, rb, rw = SOURCES[key]
    o = prepare(load(src), rb, rw)
    tint = not any(m.node_tree.nodes.get('Principled BSDF') and m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].is_linked
                   for m in o.data.materials if m and 'bodymat' in m.name.lower() and m.use_nodes)
    glass_and_paint(o, tint)
    atlas, img = bake(o)
    data = export(o, atlas, tint)
    data['title'], data['src'] = title, url
    print(f'{key}: {data["tris"]} треугольников, {data["l"]}×{data["w"]}×{data["h"]} м, краска от игры: {tint}')
    if out_dir:
        import shutil
        shutil.copy(atlas, os.path.join(out_dir, key + '_atlas.jpg'))
        preview(o, img, out_dir, key)
    all_ = {}
    if os.path.exists(OUT):
        txt = open(OUT).read()
        all_ = json.loads(txt[txt.index('|| {}, ') + 7:txt.rindex(');')])
    all_[key] = data
    with open(OUT, 'w') as f:
        f.write('// Сгенерировано tools/models/sketchfab_car.py — не править руками\n')
        f.write('window.GEN_MODELS = Object.assign(window.GEN_MODELS || {}, ' + json.dumps(all_, sort_keys=True) + ');\n')


if __name__ == '__main__':
    main()
