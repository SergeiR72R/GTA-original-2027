# Прохожие в 3D уровня прохожих GTA 3 — все виды прохожих игры (спрайты civ_1…civ_12)
# из одного конструктора: цельная фигура (мужская или женская, своя комплекция) на
# общем скелете (tools/models/rig.py) с плавными сгибами в суставах, голова с лицом,
# причёски, бороды и пейсы, одежда (майка, рубашка, костюм, платье, юбка, пальто,
# шорты), головные уборы (кипа, шляпа, кепка, панама, тихель, хиджаб), обувь и вещи
# в руках (стакан, пакеты, тележка, самокат, переноска, телефон, ракетки, карта,
# фотоаппарат, винтовка за спиной). Как человек держит руки — стиль анимаций
# (rig.STYLE): cup, free, carry, push, phone, map; анимации общие на стиль.
# Текстура каждого — атлас 512×512, запекается в Blender из сгенерированных кусков
# (assets/gen/textures/ped_*: лицо анфас и ткани; промпты — js/asset-manifest.js,
# PED_TEXTURES). Пока куска нет — на его месте цвет и лицо-заглушка.
# Запуск (Blender как модуль Python, pip install bpy):
#   python tools/models/people.py [civ_1 civ_5 …] [--render папка]
# Пишет assets/models/peds.js. Метры, лицом к +Y Blender (в игре — к −z), Z вверх.
import os, sys, json, math, base64, re, tempfile, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
import numpy as np
from mathutils import Vector
import rig
from rig import BONES, BI, C3, b64, skin_weights

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
OUT = os.path.join(ROOT, 'assets', 'models', 'peds.js')
ATLAS = 512
FX, FZ0, FZ1 = 0.105, 1.555, 1.865   # лицо — проекция спереди: X от −FX до FX, Z от FZ0 до FZ1

# ---------------------------------------------------------------- кто есть кто
# ткань: (кусок текстуры или None, метров на повтор, цвет sRGB)
SKIN = {'olive': (0.93, 0.74, 0.58), 'light': (0.96, 0.80, 0.68), 'tan': (0.80, 0.58, 0.42), 'pink': (0.98, 0.70, 0.62)}
P = {
    'civ_1': dict(name='Прохожая', female=True, scale=0.97, skin='olive', hair=('long', (0.10, 0.08, 0.07)),
                  top=('ped_w1_dress', 0.35, (0.90, 0.42, 0.20), 'none', 'v'), bottom=None,
                  skirt=('ped_w1_dress', 0.35, (0.90, 0.42, 0.20), 0.50, 0.26), legs='skin', shoes=('sandals', (0.55, 0.36, 0.22)),
                  hat=None, props=['tote', 'glasses_head'], style='free',
                  face='Young Tel Aviv woman with long dark-brown hair parted in the middle, light olive skin, brown eyes, natural make-up, friendly confident look; (sunglasses are pushed up on top of her head, not on the face).'),
    'civ_2': dict(name='Харедим', scale=1.0, skin='light', hair=('short', (0.12, 0.09, 0.07)), beard=('haredi', (0.20, 0.15, 0.11)), payot=True,
                  top=('ped_black_suit', 0.35, (0.07, 0.07, 0.08), 'long', 'suit'), bottom=('ped_black_suit', 0.35, (0.07, 0.07, 0.08), 'long'),
                  skirt=('ped_black_suit', 0.35, (0.07, 0.07, 0.08), 0.72, 0.21), shoes=('shoes', (0.05, 0.05, 0.05)),
                  hat=('black_hat', (0.06, 0.06, 0.06)), props=[], style='free',
                  face='Ultra-Orthodox Jewish man in his 30s: pale skin, a long full dark-brown beard covering the jaw and chin, long curled side-locks (payot) at the temples, brown eyes, calm serious expression; dark hair cropped short (the hat is not visible in this crop).'),
    'civ_3': dict(name='Солдат', scale=1.0, skin='tan', hair=('crop', (0.08, 0.06, 0.05)),
                  top=('ped_idf_uniform', 0.4, (0.36, 0.38, 0.24), 'long_rolled', 'collar'), bottom=('ped_idf_uniform', 0.4, (0.36, 0.38, 0.24), 'long'),
                  shoes=('boots', (0.30, 0.24, 0.17)), hat=None, props=['rifle'], style='free',
                  face='Young Israeli soldier, 20 years old: tanned skin, very short dark buzz-cut hair, brown eyes, clean-shaven, slightly tired but friendly face.'),
    'civ_4': dict(name='Пожилой в кипе', scale=0.96, build=1.08, belly=0.03, skin='light', hair=('fringe', (0.80, 0.80, 0.78)),
                  top=('ped_check_shirt', 0.25, (0.80, 0.86, 0.92), 'short', 'collar'), bottom=('ped_trousers_grey', 0.35, (0.36, 0.37, 0.40), 'long'),
                  shoes=('shoes', (0.30, 0.22, 0.16)), hat=('kippah', (0.97, 0.97, 0.95)), props=['plastic_bag'], style='carry',
                  face='Elderly Israeli man around 70: light skin with wrinkles, bald on top with short white-grey hair on the sides, bushy grey eyebrows, kind tired eyes, clean-shaven, warm half-smile.'),
    'civ_5': dict(name='Хипстер', scale=1.0, skin='olive', hair=('bun', (0.33, 0.22, 0.13)), beard=('full', (0.27, 0.18, 0.11)),
                  top=('ped_hip_tank', 0.35, (0.20, 0.38, 0.25), 'none', 'tank'), bottom=('ped_hip_jeans', 0.35, (0.20, 0.21, 0.24), 'long'),
                  shoes=('sneakers', (0.50, 0.52, 0.55)), hat=None, props=['cup', 'belt'], style='cup', faceTex='ped_hip_face', skinTex='ped_hip_skin', hairTex='ped_hip_hair', shoeTex='ped_hip_shoes',
                  face=None),
    'civ_6': dict(name='Бабушка с тележкой', female=True, scale=0.9, build=1.1, belly=0.03, skin='light', hair=('curly', (0.75, 0.12, 0.10)),
                  top=('ped_cardigan', 0.25, (0.72, 0.45, 0.35), 'long', 'crew'), bottom=None,
                  skirt=('ped_skirt_tweed', 0.3, (0.40, 0.33, 0.30), 0.42, 0.24), legs='tights', shoes=('shoes', (0.22, 0.17, 0.14)),
                  hat=None, props=['trolley'], style='push',
                  face='Elderly woman around 75 from the former USSR: light skin with soft wrinkles, short curly hair dyed bright red, thin pencilled eyebrows, pink lipstick, sharp lively eyes, determined expression.'),
    'civ_7': dict(name='Подросток', scale=0.93, build=0.92, skin='tan', hair=('crop', (0.10, 0.07, 0.05)),
                  top=('ped_tshirt_orange', 0.35, (0.88, 0.45, 0.25), 'short', 'crew'), bottom=('ped_shorts_dark', 0.35, (0.18, 0.20, 0.25), 'shorts'),
                  shoes=('sneakers', (0.15, 0.15, 0.17)), hat=('cap_back', (0.85, 0.42, 0.24)), props=['scooter'], style='push',
                  face='Israeli teenage boy, 15 years old: tanned skin, a few freckles, dark eyes, short dark hair, cheeky bored half-smile (a cap is worn backwards, only its edge is visible at the top).'),
    'civ_8': dict(name='Женщина в тихеле', female=True, scale=0.96, skin='light', hair=('none', (0.2, 0.15, 0.1)),
                  top=('ped_blouse_rust', 0.3, (0.70, 0.36, 0.20), 'long', 'crew'), bottom=None,
                  skirt=('ped_long_skirt_denim', 0.35, (0.20, 0.30, 0.50), 0.14, 0.27), legs='tights', shoes=('shoes', (0.10, 0.10, 0.10)),
                  hat=('tichel', (0.85, 0.48, 0.22)), hatTex='ped_tichel', props=['baby_carrier'], style='carry',
                  face='Religious Jewish woman in her 30s: light skin, warm brown eyes, no make-up, gentle tired smile; the hair is fully covered by a patterned orange headscarf (tichel) tied at the back — only the scarf edge across the forehead is visible.'),
    'civ_9': dict(name='Офисный работник', scale=1.0, build=1.04, belly=0.02, skin='light', hair=('short', (0.30, 0.22, 0.16)),
                  top=('ped_shirt_lightblue', 0.25, (0.70, 0.82, 0.94), 'long_rolled', 'collar'), bottom=('ped_trousers_navy', 0.35, (0.14, 0.17, 0.26), 'long'),
                  shoes=('shoes', (0.12, 0.08, 0.06)), hat=None, props=['phone', 'lanyard'], style='phone',
                  face='Middle-aged Israeli office worker around 45: light skin, receding brown hair, light stubble, tired eyes looking slightly down at a phone, mildly stressed expression.'),
    'civ_10': dict(name='Пляжник с маткот', scale=1.0, skin='tan', hair=('crop', (0.06, 0.05, 0.05)), top=None,
                   bottom=('ped_swim_shorts', 0.3, (0.20, 0.55, 0.65), 'shorts'), shoes=('sandals', (0.15, 0.15, 0.15)), hat=None,
                   props=['towel', 'paddles'], style='carry',
                   face='Tanned Tel Aviv beach guy around 30: deep tan, black short messy hair, dark eyes, light stubble, relaxed happy grin.'),
    'civ_11': dict(name='Женщина в хиджабе', female=True, scale=0.97, skin='olive', hair=('none', (0.2, 0.15, 0.1)),
                   top=('ped_coat_khaki', 0.35, (0.66, 0.60, 0.46), 'long', 'crew'), bottom=None,
                   skirt=('ped_coat_khaki', 0.35, (0.66, 0.60, 0.46), 0.30, 0.25), legs='tights', shoes=('shoes', (0.30, 0.22, 0.16)),
                   hat=('hijab', (0.70, 0.33, 0.22)), hatTex='ped_hijab', props=['shopping_bags'], style='carry',
                   face='Stylish young woman in her 20s wearing a hijab: light olive skin, dark brown eyes with a little eyeliner, soft confident smile; the hair, ears and neck are fully covered by a smooth terracotta-coloured hijab framing the face. Respectful depiction.'),
    'civ_12': dict(name='Турист', scale=1.0, build=1.06, belly=0.035, skin='pink', hair=('short', (0.75, 0.62, 0.40)),
                   top=('ped_hawaiian', 0.3, (0.20, 0.62, 0.62), 'short', 'collar'), bottom=('ped_shorts_khaki', 0.35, (0.72, 0.64, 0.46), 'shorts'),
                   shoes=('sandals', (0.35, 0.25, 0.18)), hat=('sun_hat', (0.86, 0.76, 0.52)), hatTex='ped_straw', props=['camera', 'map'], style='map',
                   face='Sunburned European tourist around 50: very fair skin with red sunburned nose and cheeks, light blond-grey hair, blue eyes, cheerful slightly confused smile (a straw sun hat is above, not visible in this crop).'),
}


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
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    q = Vector((0, 0, 1)).rotation_difference(d.normalized())
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=1)
    for v in bm.verts:
        v.co = (p0 + p1) / 2 + q @ Vector((v.co.x * r, v.co.y * r, v.co.z * (d.length / 2 + r * 0.6)))
    return new_obj('capsule', bm, mat, bone)


def near(p):
    best = None
    for i, (n, par, h, t) in enumerate(BONES):
        h, t = Vector(h), Vector(t)
        d, s, L = rig.seg(p, h, t)
        k = d / rig.THICK[n.split('.')[0]]
        if best is None or k < best[0]:
            best = (k, n, s / L, h + (t - h) * (s / L))
    return best[1:]


def body(C):
    """Тело одной сеткой: «скелет» из точек с радиусами → Skin + сглаживание, потом
    лепка мышц; у женщин — грудь, талия уже, бёдра шире; у полных — живот."""
    F, b, belly = C.get('female'), C.get('build', 1.0), C.get('belly', 0.0)
    w = lambda r: (r[0] * b, r[1] * b)
    V = {'pelvis': ((0, 0, 0.93), w((0.175, 0.12) if F else (0.165, 0.115))),
         'belly': ((0, 0.012 + belly, 1.10), w((0.145 + belly, 0.112 + belly) if F else (0.16 + belly, 0.122 + belly))),
         'chest': ((0, 0.005, 1.30), w((0.165, 0.11) if F else (0.185, 0.115))), 'neckb': ((0, 0, 1.45), w((0.115, 0.08) if F else (0.13, 0.085))),
         'neckt': ((0, 0.01, 1.60), (0.046, 0.046) if F else (0.052, 0.052))}
    E = [('pelvis', 'belly'), ('belly', 'chest'), ('chest', 'neckb'), ('neckb', 'neckt')]
    am = 0.88 if F else 1.0
    for s, n in ((-1, 'L'), (1, 'R')):
        V['sh' + n] = ((s * (0.185 if F else 0.2), 0, 1.42), (0.058 * am * b, 0.058 * am * b)); V['el' + n] = ((s * 0.25, 0, 1.18), (0.044 * am, 0.044 * am))
        V['wr' + n] = ((s * 0.26, 0, 0.965), (0.034 * am, 0.028 * am))
        V['hip' + n] = ((s * 0.095, 0, 0.88), (0.09 * b, 0.09 * b)); V['kn' + n] = ((s * 0.1, 0, 0.52), (0.06 * b, 0.06 * b))
        V['an' + n] = ((s * 0.1, 0, 0.13), (0.048, 0.048))
        E += [('neckb', 'sh' + n), ('sh' + n, 'el' + n), ('el' + n, 'wr' + n), ('pelvis', 'hip' + n), ('hip' + n, 'kn' + n), ('kn' + n, 'an' + n)]
    names = list(V)
    me = bpy.data.meshes.new('body')
    me.from_pydata([V[k][0] for k in names], [(names.index(a), names.index(c)) for a, c in E], [])
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
    mus = 0.5 if F else 1.0
    for v in o.data.vertices:
        p = v.co.copy()
        n, t, c = near(p)
        r = p - c
        r = r.normalized() if r.length > 1e-6 else Vector((0, 1, 0))
        ax, z = abs(p.x), p.z
        if n in ('hips', 'spine', 'chest'):
            if p.y > 0:
                if F:
                    p.y += 0.045 * g((z - 1.30) / 0.06) * g((ax - 0.075) / 0.055)     # грудь
                else:
                    p.y += 0.02 * g((z - 1.335) / 0.055) * g((ax - 0.085) / 0.055)    # грудные
                p.y += (0.016 + belly * 1.5) * g((z - 1.09) / 0.08) * g(p.x / 0.1)     # живот
                p.y -= 0.004 * g(p.x / 0.02) * g((z - 1.2) / 0.12)
            else:
                p.y -= 0.013 * mus * g((z - 1.37) / 0.055) * g((ax - 0.1) / 0.045)
                p.y += 0.006 * g(p.x / 0.022) * (1 if 1.0 < z < 1.45 else 0)
                p.y -= (0.03 if F else 0.024) * g((z - 0.86) / 0.06) * g((ax - 0.075) / 0.055)
            if F:
                p.x *= 1 - 0.07 * g((z - 1.12) / 0.07)                                   # талия
            p.z += 0.012 * mus * g((ax - 0.11) / 0.04) * g((z - 1.46) / 0.03)
        elif n.startswith('upperarm'):
            p += r * (mus * 0.012 * g((t - 0.1) / 0.16))
            p += r * mus * (0.011 * g((t - 0.55) / 0.2) * max(0.0, r.y) + 0.006 * g((t - 0.5) / 0.25) * max(0.0, -r.y))
        elif n.startswith('forearm'):
            p += r * (mus * 0.011 * g((t - 0.22) / 0.2) - 0.004 * g((t - 1) / 0.12))
        elif n.startswith('thigh'):
            p += r * ((0.012 if F else 0.008) * g((t - 0.25) / 0.3))
        elif n.startswith('shin'):
            p += r * (0.016 * mus * g((t - 0.3) / 0.16) * max(0.0, -r.y))
        v.co = p
    o.data.materials.append(bpy.data.materials['body'])
    a = o.data.attributes.new('fb', 'INT', 'POINT')
    for i in range(len(o.data.vertices)):
        a.data[i].value = -1
    vs = [v.co.copy() for v in o.data.vertices]

    def girth(z0, z1, cx=None):
        pts = [p for p in vs if z0 < p.z < z1 and (abs(p.x) < 0.2 if cx is None else (p.x > 0) == (cx > 0) and abs(p.x - cx) < 0.09)]
        return max(abs(p.x - (cx or 0)) for p in pts), max(p.y for p in pts), min(p.y for p in pts)
    body.girth = girth
    if 'belt' in C.get('props', []):
        hw, y1, y0 = girth(0.96, 1.0)
        loft([(0.962, 0, (y1 + y0) / 2, hw + 0.007, (y1 - y0) / 2 + 0.007), (0.998, 0, (y1 + y0) / 2, hw + 0.007, (y1 - y0) / 2 + 0.007)], 'belt', None, n=20, e=2.4, axis='z')
        rbox(-0.022, y1 + 0.004, 0.966, 0.022, y1 + 0.012, 0.995, 'buckle', None, bevel=0.003)
    bt = C.get('bottom')
    if bt and bt[3] == 'long' and C['shoes'][0] == 'sneakers':   # подвороты джинсов
        for s in (-1, 1):
            cw, cy1, cy0 = girth(0.13, 0.2, s * 0.1)
            loft([(0.135, s * 0.1, (cy1 + cy0) / 2, cw + 0.008, (cy1 - cy0) / 2 + 0.008), (0.175, s * 0.1, (cy1 + cy0) / 2, cw + 0.006, (cy1 - cy0) / 2 + 0.006)], 'pants', None, n=14, e=2.2, axis='z')
    return o


def skirt(C):
    """Юбка, подол платья, полы пальто или лапсердака — колоколом от талии (на тазу)."""
    sk = C.get('skirt')
    if not sk:
        return
    hem, flare = sk[3], sk[4]
    hw, y1, y0 = body.girth(0.95, 1.02)
    yc = (y1 + y0) / 2
    secs = [(1.04, 0, yc, hw + 0.012, (y1 - y0) / 2 + 0.012)]
    steps = 5
    for i in range(1, steps + 1):
        u = i / steps
        z = 1.04 + (hem - 1.04) * u
        secs.append((z, 0, yc - 0.03 * u, hw + 0.012 + (flare - hw) * u ** 0.8, (y1 - y0) / 2 + 0.012 + (flare * 0.98 - (y1 - y0) / 2) * u ** 0.8))
    for o in (loft(secs, 'skirt', 'hips', n=20, e=2.2, axis='z', cap=False),
              # подол изнутри — та же ткань (видно сверху в шаге)
              loft([(hem + 0.001, 0, secs[-1][2], secs[-1][3] - 0.004, secs[-1][4] - 0.004), (hem + 0.03, 0, secs[-1][2], secs[-1][3] - 0.01, secs[-1][4] - 0.01)], 'skirt', 'hips', n=20, e=2.2, axis='z', cap=False)):
        a = o.data.attributes['fb']
        for i in range(len(o.data.vertices)):
            a.data[i].value = -2   # низ юбки идёт за бедром своей стороны
    skirt.hem = hem


HEAD_C = Vector((0, 0.012, 1.70))


def head_shape(u, F):
    x, y, z = u.x * (0.084 if F else 0.088), u.y * (0.1 if F else 0.104), u.z * (0.118 if F else 0.122)
    if u.z < -0.1:
        x *= 1 - (0.36 if F else 0.3) * min(1.0, (-u.z - 0.1) / 0.8)
    if u.z < -0.5 and u.y > 0.3:
        y += (0.008 if F else 0.012) * u.y * (-u.z - 0.5) * 2
    if u.y < 0 and u.z > -0.3:
        y *= 1.08; z += 0.004
    f = max(0.0, u.y)
    y += (0.005 if F else 0.009) * g((u.z - 0.3) / 0.1) * g(u.x / 0.65) * f
    y -= 0.011 * g((u.z - 0.13) / 0.09) * g((abs(u.x) - 0.36) / 0.16) * f
    x += math.copysign(0.006, u.x) * g((u.z + 0.05) / 0.13) * g((abs(u.x) - 0.72) / 0.2) * f
    y += (0.009 if F else 0.007) * g((u.z + 0.37) / 0.06) * g(u.x / 0.3) * f
    return HEAD_C + Vector((x, y, z))


def head(C):
    F = C.get('female')
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=16, radius=1)
    unit = {}
    for v in bm.verts:
        unit[v.index] = v.co.normalized()
        v.co = head_shape(unit[v.index], F)
    bm.normal_update()

    def shell(pred, off, mat, noise=0.0):
        sb = bmesh.new()
        mp = {}
        rnd = np.random.default_rng(5)
        for f in bm.faces:
            us = [unit[v.index] for v in f.verts]
            if not all(pred(u) for u in us):
                continue
            vs = []
            for v in f.verts:
                if v.index not in mp:
                    k = off(unit[v.index]) + (noise * rnd.random() if noise else 0)
                    mp[v.index] = sb.verts.new(v.co + v.normal * k)
                vs.append(mp[v.index])
            sb.faces.new(vs)
        new_obj('shell', sb, mat, 'head')
    mouth = lambda u: abs(u.x) < 0.3 and -0.45 < u.z < -0.3 and u.y > 0.75
    hair_pred = lambda u: (u.z > 0.42 and u.y < 0.8) or u.z > 0.62 or (u.y < -0.15 and u.z > -0.22) or (abs(u.x) > 0.86 and u.z > 0.0 and u.y < 0.3)
    style = C['hair'][0]
    covered = C.get('hat') and C['hat'][0] in ('tichel', 'hijab')
    if C.get('beard'):
        long_ = C['beard'][0] == 'haredi'
        beard = lambda u: u.z < (-0.22 if u.y > 0.6 else -0.02) and u.y > -0.45 and not mouth(u)
        shell(beard, (lambda u: 0.014 + 0.05 * max(0.0, -u.z - 0.45)) if long_ else (lambda u: 0.012 + 0.008 * max(0.0, -u.z - 0.5)), 'beard')
    if not covered:
        if style in ('short', 'bun', 'crop'):
            shell(hair_pred, lambda u: 0.005 if style == 'crop' else 0.009, 'hair')
        elif style == 'long':
            shell(lambda u: hair_pred(u) or (u.y < 0.2 and u.z > -0.5), lambda u: 0.013, 'hair')
            loft([(1.76, 0, -0.05, 0.11, 0.05), (1.62, 0, -0.085, 0.13, 0.05), (1.45, 0, -0.08, 0.14, 0.035), (1.38, 0, -0.07, 0.12, 0.02)], 'hair', 'head', n=10, e=2.6, axis='z')
        elif style == 'curly':
            shell(lambda u: hair_pred(u) or (abs(u.x) > 0.7 and u.z > -0.1 and u.y < 0.4), lambda u: 0.022, 'hair', noise=0.012)
        elif style == 'fringe':   # лысина сверху, седина по бокам и сзади
            shell(lambda u: -0.15 < u.z < 0.4 and u.y < 0.25 and (abs(u.x) > 0.6 or u.y < -0.2), lambda u: 0.006, 'hair')
    new_obj('head', bm, 'head', 'head')
    loft([(1.745, 0, 0.106, 0.008, 0.004), (1.722, 0, 0.118, 0.011, 0.007), (1.70, 0, 0.13, 0.014, 0.01),
          (1.685, 0, 0.136, 0.018, 0.012), (1.675, 0, 0.122, 0.022, 0.013), (1.672, 0, 0.11, 0.015, 0.01)], 'head', 'head', n=8, e=2.2, axis='z')
    if not covered:
        for s in (-1, 1):
            ball((s * (0.084 if F else 0.088), -0.004, 1.695), (0.011, 0.024, 0.034), 'skin', 'head', seg=8, rings=6)
    if style == 'bun':
        ball((0, -0.06, 1.85), (0.045, 0.042, 0.04), 'hair', 'head', seg=10, rings=6)
        capsule((0, -0.045, 1.83), (0, -0.07, 1.86), 0.012, 'hair', 'head')
    if C.get('payot'):
        for s in (-1, 1):
            capsule((s * 0.092, 0.03, 1.69), (s * 0.095, 0.035, 1.56), 0.012, 'beard', 'head')
    hat(C)


def hat(C):
    h = C.get('hat')
    if not h:
        return
    k = h[0]
    if k == 'kippah':
        ball((0, -0.02, 1.81), (0.062, 0.062, 0.018), 'hat', 'head', seg=12, rings=5)
    elif k == 'black_hat':
        cyl((0, 0.0), 1.78, 1.92, 0.098, 0.088, 'hat', 'head', n=16)
        cyl((0, 0.0), 1.775, 1.79, 0.19, 0.19, 'hat', 'head', n=20)
        cyl((0, 0.0), 1.79, 1.81, 0.1, 0.1, 'trim', 'head', n=16, cap=False)
    elif k == 'cap_back':
        ball((0, 0.0, 1.76), (0.098, 0.112, 0.085), 'hat', 'head', seg=14, rings=7)
        rbox(-0.065, -0.2, 1.765, 0.065, -0.09, 1.78, 'hat', 'head', bevel=0.01)
    elif k == 'sun_hat':
        ball((0, 0.0, 1.78), (0.1, 0.11, 0.09), 'hat', 'head', seg=14, rings=7)
        cyl((0, 0.0), 1.78, 1.79, 0.2, 0.21, 'hat', 'head', n=20)
        cyl((0, 0.0), 1.79, 1.81, 0.101, 0.1, 'trim', 'head', n=16, cap=False)
    elif k in ('tichel', 'hijab'):
        # платок поверх головы (лицо открыто), узел или драпировка на шею и плечи
        bm = bmesh.new()
        bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=16, radius=1)
        F = C.get('female')
        face = lambda u: u.y > 0.42 and -0.62 < u.z < (0.38 if k == 'hijab' else 0.5) and abs(u.x) < 0.75
        for v in bm.verts:
            u = v.co.normalized()
            v.co = head_shape(u, F) + u * (0.022 if k == 'hijab' else 0.018)
        rm = [f for f in bm.faces if all(face((v.co - HEAD_C).normalized()) for v in f.verts) or (k == 'tichel' and all((v.co - HEAD_C).normalized().z < -0.3 for v in f.verts))]
        bmesh.ops.delete(bm, geom=rm, context='FACES')
        new_obj('scarf', bm, 'hat', 'head')
        if k == 'tichel':
            ball((0, -0.12, 1.74), (0.05, 0.05, 0.06), 'hat', 'head', seg=10, rings=6)
            loft([(1.73, 0, -0.13, 0.04, 0.02), (1.6, 0, -0.14, 0.05, 0.02), (1.5, 0, -0.13, 0.04, 0.015)], 'hat', 'head', n=8, axis='z')
        else:
            loft([(1.6, 0, 0.0, 0.085, 0.085), (1.5, 0, -0.005, 0.15, 0.12), (1.40, 0, -0.01, 0.22, 0.15), (1.36, 0, -0.01, 0.23, 0.155)], 'hat', 'chest', n=20, e=2.4, axis='z', cap=False)


def hands(C):
    for s, n in ((-1, 'L'), (1, 'R')):
        x = s * 0.262
        ball((x, 0.004, 0.905), (0.022, 0.04, 0.046), 'skin', 'hand.' + n, seg=8, rings=6)
        for dy in (0.016, -0.014):
            capsule((x + s * 0.002, dy, 0.868), (x - s * 0.006, dy + 0.012, 0.815), 0.0115, 'skin', 'hand.' + n)
        capsule((x - s * 0.012, 0.034, 0.9), (x - s * 0.022, 0.05, 0.862), 0.011, 'skin', 'hand.' + n)


def shoes(C):
    kind = C['shoes'][0]
    for s, n in ((-1, 'L'), (1, 'R')):
        x, b = s * 0.1, 'foot.' + n
        loft([(0.198, x, 0.034, 0.025, 0.012), (0.18, x, 0.026, 0.048, 0.02), (0.13, x, 0.02, 0.056, 0.02), (0.05, x, 0.02, 0.052, 0.02),
              (-0.03, x, 0.02, 0.047, 0.02), (-0.07, x, 0.024, 0.042, 0.022), (-0.082, x, 0.03, 0.028, 0.016)], 'sole', b, n=14, e=3.0)
        if kind == 'sandals':   # ступня видна: кожа и два ремешка
            loft([(0.185, x, 0.045, 0.024, 0.012), (0.16, x, 0.05, 0.044, 0.02), (0.08, x, 0.06, 0.046, 0.03), (0.0, x, 0.075, 0.042, 0.045),
                  (-0.06, x, 0.07, 0.036, 0.04)], 'skin', b, n=12, e=2.4)
            for yy in (0.12, 0.02):
                rbox(x - 0.05, yy - 0.012, 0.04, x + 0.05, yy + 0.012, 0.075 if yy > 0.1 else 0.09, 'shoes', b)
            continue
        top = 0.12 if kind == 'boots' else 0.095
        loft([(0.188, x, 0.05, 0.026, 0.016), (0.165, x, 0.058, 0.047, 0.03), (0.11, x, 0.07, 0.051, 0.04), (0.04, x, 0.085, 0.05, 0.055),
              (-0.03, x, top, 0.046, 0.06), (-0.068, x, top - 0.007, 0.04, 0.052), (-0.076, x, top - 0.011, 0.026, 0.03)], 'shoes', b, n=14, e=2.6)
        if kind == 'boots':
            cyl((x, -0.01), 0.1, 0.22, 0.055, 0.052, 'shoes', 'shin.' + n, n=12)
        if kind == 'sneakers':
            rbox(x - 0.02, 0.02, 0.128, x + 0.02, 0.07, 0.152, 'shoes', b, bevel=0.006)
            for yy, zz in ((0.135, 0.103), (0.105, 0.117), (0.075, 0.13), (0.045, 0.141)):
                rbox(x - 0.03, yy - 0.004, zz - 0.003, x + 0.03, yy + 0.004, zz + 0.004, 'sole', b)


def props(C):
    for p in C.get('props', []):
        if p == 'cup':
            c = (0.30, 0.03)
            cyl(c, 0.80, 0.885, 0.034, 0.039, 'coffee', 'hand.R')
            cyl(c, 0.885, 0.95, 0.039, 0.044, 'cup', 'hand.R')
            ball((c[0], c[1], 0.95), (0.044, 0.044, 0.018), 'cup', 'hand.R', seg=10, rings=4)
            cyl((0.305, 0.035), 0.95, 1.02, 0.006, 0.006, 'straw', 'hand.R', n=5)
        elif p == 'tote':   # сумка-шоппер на левом плече
            rbox(-0.30, -0.02, 0.86, -0.26, 0.14, 1.12, 'bag', 'chest', bevel=0.01)
            cyl((-0.21, 0.05), 1.12, 1.44, 0.008, 0.008, 'bag', 'chest', n=5)
        elif p == 'glasses_head':
            rbox(-0.07, 0.03, 1.80, 0.07, 0.08, 1.825, 'dark', 'head', bevel=0.008)
        elif p == 'rifle':   # винтовка за спиной на ремне
            rbox(-0.03, -0.17, 0.92, 0.03, -0.13, 1.62, 'dark', 'chest')
            rbox(-0.035, -0.18, 1.18, 0.035, -0.12, 1.30, 'dark', 'chest')
            for z0, x0 in ((1.42, 0.12), (1.0, -0.15)):
                capsule((x0, 0.09, z0), (-x0, -0.13, z0 + (0.25 if x0 > 0 else 0.3)), 0.012, 'strap', 'chest')
        elif p == 'plastic_bag':
            ball((0.27, 0.0, 0.73), (0.08, 0.06, 0.1), 'bag', 'hand.R', seg=10, rings=6)
            capsule((0.262, 0.0, 0.84), (0.27, 0.0, 0.80), 0.01, 'bag', 'hand.R')
        elif p == 'shopping_bags':
            for s, n in ((-1, 'L'), (1, 'R')):
                rbox(s * 0.27 - 0.03, -0.09, 0.58, s * 0.27 + 0.03, 0.09, 0.82, 'bag', 'hand.' + n)
                capsule((s * 0.27, -0.04, 0.82), (s * 0.27, 0.04, 0.86), 0.006, 'bag', 'hand.' + n)
        elif p == 'trolley':   # сумка-тележка перед собой (на тазу), ручка — у рук
            rbox(-0.13, 0.42, 0.18, 0.13, 0.62, 0.72, 'bag', 'hips', bevel=0.02)
            for s in (-1, 1):
                cyl((s * 0.14, 0.40), 0.12, 0.98, 0.009, 0.009, 'metal', 'hips', n=6)
                ball((s * 0.13, 0.62, 0.06), (0.012, 0.05, 0.05), 'dark', 'hips', seg=8, rings=6)
            rbox(-0.16, 0.38, 0.97, 0.16, 0.42, 1.0, 'metal', 'hips')
        elif p == 'scooter':   # электросамокат рядом справа: дека, стойка, руль
            rbox(0.22, -0.45, 0.05, 0.36, 0.42, 0.09, 'dark', 'hips', bevel=0.01)
            for yy in (-0.42, 0.40):
                ball((0.29, yy, 0.06), (0.02, 0.06, 0.06), 'dark', 'hips', seg=8, rings=6)
            cyl((0.29, 0.40), 0.09, 1.0, 0.016, 0.016, 'metal', 'hips', n=8)
            rbox(0.06, 0.38, 0.98, 0.52, 0.42, 1.01, 'dark', 'hips')
        elif p == 'baby_carrier':   # переноска с младенцем в правой руке
            rbox(0.20, -0.18, 0.40, 0.42, 0.22, 0.62, 'bag', 'hand.R', bevel=0.03)
            ball((0.31, 0.12, 0.61), (0.06, 0.06, 0.05), 'skin', 'hand.R', seg=8, rings=6)
            for yy in (-0.15, 0.19):
                cyl((0.262, yy), 0.62, 0.86, 0.008, 0.008, 'metal', 'hand.R', n=5)
        elif p == 'phone':
            rbox(0.24, 0.03, 0.845, 0.29, 0.13, 0.86, 'dark', 'hand.R', bevel=0.005)
        elif p == 'lanyard':
            capsule((-0.06, 0.12, 1.45), (0, 0.15, 1.2), 0.006, 'strap', 'chest')
            capsule((0.06, 0.12, 1.45), (0, 0.15, 1.2), 0.006, 'strap', 'chest')
            rbox(-0.03, 0.14, 1.12, 0.03, 0.155, 1.2, 'cup', 'chest')
        elif p == 'towel':   # полотенце на правом плече
            rbox(0.10, -0.16, 1.18, 0.26, 0.17, 1.47, 'towel', 'chest', bevel=0.02)
        elif p == 'paddles':   # ракетки маткот в левой руке
            cyl((-0.27, 0.02), 0.78, 0.86, 0.014, 0.014, 'wood', 'hand.L', n=6)
            loft([(0.78, -0.27, 0.02, 0.012, 0.11), (0.70, -0.27, 0.02, 0.012, 0.13), (0.58, -0.27, 0.02, 0.012, 0.12), (0.52, -0.27, 0.02, 0.012, 0.06)], 'wood', 'hand.L', n=12, axis='z')
        elif p == 'camera':
            rbox(-0.06, 0.15, 1.18, 0.06, 0.22, 1.26, 'dark', 'chest', bevel=0.01)
            cyl((0.0, 0.25), 1.2, 1.24, 0.025, 0.025, 'dark', 'chest', n=8)
            for s in (-1, 1):
                capsule((s * 0.06, 0.12, 1.45), (s * 0.05, 0.17, 1.25), 0.005, 'strap', 'chest')
        elif p == 'map':   # карта в обеих руках перед собой
            rbox(-0.22, 0.30, 1.04, 0.22, 0.32, 1.24, 'map', 'chest')


# ---------------------------------------------------------------- текстура
def piece(name):
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


def mats_of(C):
    """Материалы человека: (кусок текстуры, метров на повтор, цвет-заглушка)."""
    skin = SKIN[C['skin']]
    top = C.get('top') or (None, 1, skin, 'none', 'bare')
    bt = C.get('bottom') or (None, 1, skin, 'none')
    sk = C.get('skirt') or (None, 1, (0.5, 0.5, 0.5))
    hat = C.get('hat') or (None, (0.5, 0.5, 0.5))
    legs = {'tights': (None, 1, (0.16, 0.15, 0.16)), 'skin': (None, 1, skin)}.get(C.get('legs'), (C.get('skinTex'), 0.30, skin))   # ниже шорт — кожа
    return {
        'top': top[:3], 'pants': (bt[0], bt[1], bt[2]) if C.get('bottom') else legs, 'legs': legs,
        'skin': (C.get('skinTex'), 0.30, skin), 'hair': (C.get('hairTex'), 0.15, C['hair'][1]),
        'beard': (C.get('hairTex'), 0.10, (C.get('beard') or (0, C['hair'][1]))[1]),
        'shoes': (C.get('shoeTex'), 0.20, C['shoes'][1]), 'sole': (None, 1, (0.92, 0.92, 0.90) if C['shoes'][0] == 'sneakers' else (0.12, 0.11, 0.10)),
        'head': (C.get('faceTex') or 'ped_%s_face' % C['key'].replace('_', ''), 1, skin), 'skirt': sk[:3],
        'hat': (C.get('hatTex'), 0.25, hat[1]), 'trim': (None, 1, (0.1, 0.1, 0.1) if hat[0] != 'sun_hat' else (0.2, 0.15, 0.1)),
        'cup': (None, 1, (0.88, 0.92, 0.94)), 'coffee': (None, 1, (0.55, 0.36, 0.22)), 'straw': (None, 1, (0.10, 0.10, 0.10)),
        'belt': (None, 1, (0.26, 0.17, 0.10)), 'buckle': (None, 1, (0.72, 0.72, 0.70)), 'body': (None, 1, (0.5, 0.5, 0.5)),
        'bag': (None, 1, {'civ_1': (0.86, 0.80, 0.66), 'civ_4': (0.95, 0.95, 0.95), 'civ_6': (0.60, 0.20, 0.25), 'civ_8': (0.25, 0.25, 0.28),
                          'civ_11': (0.85, 0.65, 0.75)}.get(C['key'], (0.4, 0.4, 0.4))),
        'dark': (None, 1, (0.08, 0.08, 0.09)), 'metal': (None, 1, (0.65, 0.66, 0.68)), 'strap': (None, 1, (0.12, 0.12, 0.10)),
        'towel': (None, 1, (0.30, 0.55, 0.85)), 'wood': (None, 1, (0.78, 0.60, 0.38)), 'map': (None, 1, (0.85, 0.88, 0.70)),
    }


def shader(mat, name, C, M):
    tex, tile, col = M[name]
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

    part = lambda k: (boxed(piece(M[k][0]), M[k][1]) if piece(M[k][0]) else color(M[k][2]))
    if name == 'body':
        # верх, низ, кожа — по месту на теле (поза покоя, руки вдоль тела)
        sep = N.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Object'], sep.inputs[0])
        X, Y, Z = sep.outputs['X'], sep.outputs['Y'], sep.outputs['Z']
        ax = math_node('ABSOLUTE', X)
        mul = lambda *a: a[0] if len(a) == 1 else math_node('MULTIPLY', a[0], mul(*a[1:]))
        mx = lambda *a: a[0] if len(a) == 1 else math_node('MAXIMUM', a[0], mx(*a[1:]))
        gt = lambda a, b: math_node('GREATER_THAN', a, b)
        lt = lambda a, b: math_node('LESS_THAN', a, b)
        top = C.get('top')
        sleeve, neck = (top[3], top[4]) if top else ('none', 'bare')
        arm = mx(mul(gt(Z, 1.25), gt(ax, 0.145)), mul(lt(Z, 1.25), gt(ax, 0.195)))        # руки (в покое — вдоль тела)
        sleeve_z = {'none': 1.6, 'short': 1.29, 'long_rolled': 1.08, 'long': 0.9}[sleeve]
        arm_skin = mul(arm, lt(Z, sleeve_z)) if sleeve != 'none' else arm
        if neck == 'tank':
            nl = math_node('MULTIPLY_ADD', Z, 0.6, 0.075 - 1.42 * 0.6)
            torso_skin = mx(mul(gt(Y, 0), gt(Z, 1.42), lt(ax, nl)), mul(lt(Y, 0), gt(Z, 1.44), lt(ax, 0.06)))
        elif neck == 'v':
            nl = math_node('MULTIPLY_ADD', Z, 0.5, 0.06 - 1.36 * 0.5)
            torso_skin = mul(gt(Y, 0), gt(Z, 1.36), lt(ax, nl))
        elif neck == 'bare':
            torso_skin = gt(Z, 0.99)
        else:
            torso_skin = gt(Z, 1.5 if neck in ('crew', 'collar') else 1.47)
        skin_m = mx(gt(Z, 1.5), arm_skin, torso_skin)
        bt = C.get('bottom')
        legs_z = {'long': 0.0, 'shorts': 0.55, 'knee': 0.45}.get(bt[3], 0.0) if bt else 2.0
        legs_m = mul(lt(Z, 0.99), lt(ax, 0.2))
        pants_m = mul(legs_m, gt(Z, legs_z))
        upper = mix(skin_m, part('top') if top else part('skin'), part('skin'))
        if neck == 'suit':   # белая рубашка в вырезе пиджака
            shirt = mul(gt(Y, 0), gt(Z, 1.2), lt(ax, math_node('MULTIPLY_ADD', Z, 0.22, 0.02 - 1.2 * 0.22)))
            upper = mix(mul(shirt, math_node('SUBTRACT', 1.0, skin_m)), upper, color((0.95, 0.95, 0.94)))
        lower = mix(pants_m, part('legs'), part('pants'))
        finish(mix(legs_m, upper, lower))
        return
    if name != 'head':
        img = piece(tex)
        finish(boxed(img, tile) if img else color(col))
        return
    sep = N.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Object'], sep.inputs[0])
    geo = N.new('ShaderNodeNewGeometry')
    nsep = N.new('ShaderNodeSeparateXYZ'); nt.links.new(geo.outputs['Normal'], nsep.inputs[0])
    hair = part('hair')
    skin = part('skin')
    top = math_node('GREATER_THAN', sep.outputs['Z'], 1.64)
    if C.get('beard'):
        beard = math_node('MULTIPLY', math_node('LESS_THAN', sep.outputs['Z'], 1.675), math_node('GREATER_THAN', nsep.outputs['Y'], -0.55))
        side = mix(math_node('MAXIMUM', top, beard), skin, part('beard'))
    else:
        side = mix(top, skin, hair)
    face = piece(tex) or placeholder_face(C, M)
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


def placeholder_face(C, M):
    """Лицо-заглушка, пока нет сгенерированного: волосы, брови, глаза, нос, губы, борода."""
    S = 256
    v, x = np.mgrid[0:S, 0:S] / (S - 1.0)
    x = (x - 0.5) * 2
    ax = np.abs(x)
    col = lambda c: np.array(c, dtype=float)
    img = np.ones((S, S, 3)) * col(M['skin'][2]) * (1 - 0.12 * x * x)[..., None]

    def put(mask, c, a=1.0):
        img[mask] = img[mask] * (1 - a) + col(c) * a
    hair, dark = col(M['hair'][2]), (0.12, 0.08, 0.06)
    hatc = C.get('hat')
    if hatc and hatc[0] in ('tichel', 'hijab'):
        put(v > 0.78 + 0.03 * x * x, hatc[1])
        put(ax > 0.86 - 0.3 * np.clip(0.5 - v, 0, 1), hatc[1])
    elif C['hair'][0] not in ('fringe',):
        put(v > 0.72 + 0.04 * x * x, hair)
    put((np.abs(v - (0.59 + 0.025 * (1 - ((ax - 0.3) / 0.2) ** 2))) < (0.012 if C.get('female') else 0.017)) & (ax > 0.1) & (ax < 0.5), hair * 0.7)
    eye = ((ax - 0.3) / 0.13) ** 2 + ((v - 0.52) / 0.034) ** 2 < 1
    put(eye, (0.95, 0.93, 0.88))
    put(((ax - 0.3) ** 2 + (v - 0.52) ** 2) < 0.036 ** 2, (0.38, 0.22, 0.12) if C['skin'] != 'pink' else (0.3, 0.45, 0.7))
    put(((ax - 0.3) ** 2 + (v - 0.52) ** 2) < 0.016 ** 2, dark)
    put(eye & (v > 0.535), dark, 0.8)
    put((np.abs(ax - 0.075) < 0.012) & (v > 0.4) & (v < 0.56), (0.7, 0.5, 0.4), 0.35)
    put(((ax - 0.055) / 0.03) ** 2 + ((v - 0.405) / 0.012) ** 2 < 1, (0.35, 0.2, 0.16))
    if C.get('beard'):
        beard = (v < 0.41) & ~((ax / 0.2) ** 2 + ((v - 0.32) / 0.03) ** 2 < 1)
        put(beard, col(M['beard'][2]) * 0.95)
    put((ax / 0.17) ** 2 + ((v - 0.32) / 0.028) ** 2 < 1, (0.75, 0.30, 0.32) if C.get('female') else (0.62, 0.34, 0.3))
    put((np.abs(v - 0.32) < 0.004) & (ax < 0.15), (0.3, 0.12, 0.1))
    px = np.concatenate([img.clip(0, 1) ** 2.2, np.ones((S, S, 1))], axis=2)
    im = bpy.data.images.new('face_stub', S, S)
    im.pixels = px.ravel().tolist()
    return im


def unwrap_and_bake(o, C, M):
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(55), island_margin=0.02)
    bpy.ops.object.mode_set(mode='OBJECT')
    uv = o.data.uv_layers.active.data
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
        shader(m, m.name, C, M)
        it = m.node_tree.nodes.new('ShaderNodeTexImage'); it.image = img
        m.node_tree.nodes.active = it
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.samples = 4; sc.cycles.device = 'CPU'
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, margin=6, use_clear=True)
    ao = bpy.data.images.new('ao', ATLAS, ATLAS)
    for m in o.data.materials:
        m.node_tree.nodes.active.image = ao
    sc.cycles.samples = 32
    bpy.ops.object.bake(type='AO', margin=6, use_clear=True)
    c = np.array(img.pixels[:]).reshape(-1, 4)
    a = np.array(ao.pixels[:]).reshape(-1, 4)[:, :1]
    c[:, :3] *= 0.45 + 0.55 * a
    img.pixels = c.ravel().tolist()
    path = os.path.join(tempfile.mkdtemp(), 'atlas.jpg')
    img.filepath_raw = path; img.file_format = 'JPEG'
    sc.render.image_settings.quality = 88
    img.save()
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


# ---------------------------------------------------------------- сборка и выгрузка
def build(C, M):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for k in M:
        m = bpy.data.materials.new(k); m.use_nodes = True
    body(C); skirt(C); head(C); hands(C); shoes(C); props(C)
    objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active
    o.name = C['key']
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.quads_convert_to_tris()
    bpy.ops.object.mode_set(mode='OBJECT')
    for f in o.data.polygons:
        f.use_smooth = True
    fb = o.data.attributes['fb'].data
    def skirt_w(p):
        u = max(0.0, min(1.0, (1.04 - p.z) / max(0.05, 1.04 - skirt.hem)))
        w = 0.85 * u ** 1.2
        return [(BI['thigh.L' if p.x < 0 else 'thigh.R'], w), (BI['hips'], 1 - w)] if w > 0.01 else [(BI['hips'], 1.0)]
    W = [[(fb[v.index].value, 1.0)] if fb[v.index].value >= 0 else skirt_w(v.co) if fb[v.index].value == -2 else skin_weights(v.co) for v in o.data.vertices]
    return o, W


def export(o, W, atlas_path):
    """Вершины без повторов (позиция, нормаль, развёртка, кости) + индексы треугольников."""
    me = o.data
    me.calc_loop_triangles()
    cn = me.corner_normals
    uvs = me.uv_layers.active.data
    pos, nor, uv, si, sw, idx = [], [], [], [], [], []
    seen = {}
    for t in me.loop_triangles:
        for li, vi in zip(t.loops, t.vertices):
            u = uvs[li].uv
            nn = C3 @ cn[li].vector
            k = (vi, round(u.x, 5), round(u.y, 5), round(nn.x, 3), round(nn.y, 3), round(nn.z, 3))
            j = seen.get(k)
            if j is None:
                j = seen[k] = len(pos) // 3
                pos += list(C3 @ me.vertices[vi].co)
                nor += list(nn)
                uv += [u.x, u.y]
                ws = (W[vi] + [(0, 0.0)])[:2]
                si += [ws[0][0], ws[1][0]]; sw += [ws[0][1], ws[1][1]]
            idx.append(j)
    bones = [{'name': n, 'parent': BI[p] if p else -1, 'head': [round(x, 4) for x in C3 @ Vector(h)]} for n, p, h, _ in BONES]
    tex = 'data:image/jpeg;base64,' + base64.b64encode(open(atlas_path, 'rb').read()).decode()
    i16 = base64.b64encode(struct.pack('<%dH' % len(idx), *idx)).decode()
    # ужато: нормали — байт на координату, кости — байт, вес первой кости — байт (второй = 1 − первый)
    pk = lambda fmt, a: base64.b64encode(struct.pack('<%d%s' % (len(a), fmt), *a)).decode()
    nq = [max(-127, min(127, round(x * 127))) for x in nor]
    wq = [max(0, min(255, round(sw[i] * 255))) for i in range(0, len(sw), 2)]
    return {'tris': len(idx) // 3, 'pos': b64(pos), 'nor8': pk('b', nq), 'uv': b64(uv), 'si8': pk('B', si), 'sw8': pk('B', wq), 'idx': i16, 'bones': bones, 'tex': tex}


def preview(o, W, out_dir, key):
    rg = rig.armature()
    for n, *_ in BONES:
        o.vertex_groups.new(name=n)
    for vi, ws in enumerate(W):
        for b, w in ws:
            o.vertex_groups[BONES[b][0]].add([vi], w, 'REPLACE')
    md = o.modifiers.new('rig', 'ARMATURE'); md.object = rg
    sc = bpy.context.scene
    bpy.ops.mesh.primitive_plane_add(size=8)
    g_ = bpy.context.active_object; g_.name = '_ground'
    gm = bpy.data.materials.new('_ground'); gm.use_nodes = True
    gm.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (0.45, 0.42, 0.38, 1)
    g_.data.materials.append(gm)
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.6, 0.72, 0.9, 1)
    sun = bpy.data.objects.new('_sun', bpy.data.lights.new('sun', 'SUN'))
    sun.data.energy = 3.5; sun.rotation_euler = (math.radians(40), 0, math.radians(-35))
    sc.collection.objects.link(sun)
    cam = bpy.data.objects.new('_cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
    cam.data.lens = 50
    sc.cycles.samples = 16
    sc.render.resolution_x, sc.render.resolution_y = 300, 400
    for i, (name, t, loc) in enumerate([('idle', 0.0, (1.3, 2.6, 1.6)), ('walk', 0.25, (2.9, 0.4, 1.2)), ('walk', 0.5, (-1.6, -2.4, 1.6))]):
        rg.animation_data_clear()
        rig.pose(rg, *rig.ANIMS[name][0](t))
        bpy.context.view_layer.update()
        cam.location = Vector(loc)
        cam.rotation_euler = (Vector((0, 0, 1.0)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
        sc.render.filepath = os.path.join(out_dir, f'{key}_{i}.png')
        bpy.ops.render.render(write_still=True)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    out_dir = sys.argv[sys.argv.index('--render') + 1] if '--render' in sys.argv else None
    if out_dir in args:
        args.remove(out_dir)
    keys = args or list(P)
    data = {}
    if os.path.exists(OUT):
        txt = open(OUT).read()
        data = json.loads(txt[txt.index('|| {}, ') + 7:txt.rindex(');')])
    for key in keys:
        C = dict(P[key]); C['key'] = key
        M = mats_of(C)
        rig.STYLE = C['style']
        o, W = build(C, M)
        atlas = unwrap_and_bake(o, C, M)
        d = export(o, W, atlas)
        d['style'] = C['style']; d['scale'] = C.get('scale', 1.0)
        name = 'ped_' + key.replace('_', '')
        data[name] = d
        # анимации — общие на стиль рук
        an = 'ped_anims_' + C['style']
        if an not in data or key in args:
            rg = rig.armature()
            data[an] = {'anims': {n: rig.bake(rg, n) for n in rig.ANIMS}}
        print(f'{name} ({C["name"]}): {d["tris"]} треугольников, стиль {C["style"]}')
        if out_dir:
            import shutil
            shutil.copy(atlas, os.path.join(out_dir, key + '_atlas.jpg'))
            preview(o, W, out_dir, key)
    with open(OUT, 'w') as f:
        f.write('// Сгенерировано tools/models/people.py — не править руками\n')
        f.write('window.GEN_MODELS = Object.assign(window.GEN_MODELS || {}, ' + json.dumps(data, sort_keys=True) + ');\n')


if __name__ == '__main__':
    main()
