// Единый список генерируемых ассетов: из него берут данные игра (что грузить),
// импортёр (tools/import.html) и инструкции (PROMPTS.md, CLAUDE_CHROME_ASSETS.md —
// собираются скриптом tools/build-asset-docs.js). Порядок важен: импортёр
// раскладывает скачанные файлы по этому порядку.
'use strict';

const ASSET_STYLE = {
  common: 'Top-down 2D game sprite, orthographic view from directly above, clean stylized illustration in the style of a modern indie top-down crime game, crisp outlines, soft cel shading with light coming from the top-left, warm Mediterranean daylight colors, high detail but readable at small size, single object centered, no text, no logos, no watermark.',
  isolated: 'Isolated on a perfectly flat solid magenta background (#FF00FF), no shadow on the background, no gradient, no checkerboard.',
  texture: 'Seamless tileable texture, fills the entire square edge to edge, no object in the center, no perspective, no vignette, no shadow gradient.',
  person: 'A single person seen from directly above (bird\'s-eye view, top of the head and shoulders visible, feet barely visible), standing, FACING RIGHT (the face and the front of the body point to the right side of the image), arms relaxed. Character fills about 70% of the image.',
  personGun: 'A single person seen from directly above (bird\'s-eye view, top of the head and shoulders visible), standing, FACING RIGHT, both arms extended forward to the right holding a compact pistol. Character fills about 70% of the image.',
  vehicle: 'A single vehicle seen from directly above (top-down, orthographic), FRONT OF THE VEHICLE POINTING UP, perfectly symmetrical, roof, windshield and hood clearly visible, generic design without any real brand badges or logos. Vehicle fills about 85% of the image height.',
};

// Стадии урона машин: правка уже готовой картинки в том же чате
const DAMAGE_STAGES = [
  { suffix: '_d1', title: 'лёгкие повреждения', prompt: 'Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add LIGHT damage only: a few scratches on the paint, a small dent on the front bumper and one door, one cracked headlight, a thin crack in the windshield. The vehicle must stay clearly recognizable.' },
  { suffix: '_d2', title: 'тяжёлые повреждения', prompt: 'Edit the previous image of this exact vehicle. Keep EXACTLY the same vehicle, color, angle, framing, size, position and magenta background. Add HEAVY damage: crumpled hood and front bumper, deep dents on the sides, shattered windshield with spiderweb cracks, broken headlights, missing side mirror, scraped paint showing bare metal, light soot marks. Still the same vehicle shape and outline.' },
  { suffix: '_d3', title: 'сгоревший остов', prompt: 'Edit the previous image of this exact vehicle. Keep EXACTLY the same outline, angle, framing, size, position and magenta background. Turn it into a BURNT-OUT WRECK after a fire: blackened charred body with rust-orange patches, no glass left (dark empty window frames), melted roof, deformed panels, no tires visible as rubber (bare rims), ash residue. No flames, no smoke.' },
];

const VEHICLE_ASSETS = [
  ['sedan_1', 'Седан белый', 'Generic white compact family sedan, slightly dusty.'],
  ['sedan_2', 'Седан серебристый', 'Generic silver sedan.'],
  ['sedan_3', 'Седан тёмно-серый', 'Generic dark grey sedan.'],
  ['sedan_4', 'Седан тёмно-синий', 'Generic dark blue sedan.'],
  ['hatch_1', 'Хэтчбек белый', 'Small white city hatchback.'],
  ['hatch_2', 'Хэтчбек красный', 'Small red city hatchback.'],
  ['hatch_3', 'Хэтчбек старый бежевый', 'Old beige hatchback from the 1990s, faded paint.'],
  ['suv_1', 'Джип белый', 'White mid-size SUV with roof rails.'],
  ['suv_2', 'Джип чёрный', 'Black mid-size SUV with tinted windows.'],
  ['lux', 'Чёрный лимузин бригады «Одесса»', 'Long black luxury executive sedan with tinted windows and chrome details.'],
  ['taxi', 'Такси', 'White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed).'],
  ['police', 'Полиция', 'Israeli police SUV: white body with blue and fluorescent yellow-green checkered side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood (the only text allowed).'],
  ['ambulance', 'Скорая', 'White emergency ambulance van with red stripes and orange roof lights, generic medical markings without any cross or star symbol.'],
  ['van', 'Фургон', 'Plain white delivery van.'],
  ['van_iran', 'Фургон иранских агентов', 'Dark charcoal-grey windowless van with tinted windows, suspicious, no markings.'],
  ['pickup', 'Пикап клана Аль-Бахар', 'White pickup truck with an open cargo bed containing a few wooden crates.'],
  ['sherut', 'Шерут (маршрутка)', 'Yellow shared minibus taxi with a big route number «4» painted on the roof (the only text allowed).'],
  ['bus', 'Городской автобус', 'Long green-and-white city bus with roof air-conditioning units, generic, no company logo.'],
  ['garbage', 'Мусоровоз', 'Green municipal garbage truck with a yellow stripe at the back.'],
  ['scooter', 'Скутер «Шмоне-Бис»', 'Delivery motor scooter with a big orange insulated food box on the back that reads «8bis» (the only text allowed).'],
  ['moto', 'Мотоцикл', 'Black sport motorcycle.'],
  ['hatch_lions', 'Хэтчбек «Львов Гондэра»', 'Yellow tuned hatchback with a single green racing stripe along the middle.'],
];

const CHAR_ASSETS = [
  ['player', 'Лёва Гольдман (герой)', 'Young man in his late 20s, short light-brown hair, wearing a white-and-navy horizontally striped sailor shirt, dark blue jeans, white sneakers, a small backpack strap visible.'],
  ['player_gun', 'Лёва с пистолетом', 'Young man in his late 20s, short light-brown hair, white-and-navy horizontally striped sailor shirt, dark blue jeans.', true],
  ['police', 'Полицейский', 'Israeli police officer in a dark navy-blue uniform with light-blue shoulder details, dark cap, utility belt.'],
  ['police_gun', 'Полицейский с пистолетом', 'Israeli police officer in a dark navy-blue uniform with light-blue shoulder details, dark cap, utility belt.', true],
  ['russian', 'Боец бригады «Одесса»', 'Tough man with a shaved head, black leather jacket over a black t-shirt, thick gold chain, dark trousers, pale skin, 1990s-gangster vibe.'],
  ['russian_gun', 'Боец «Одессы» с пистолетом', 'Tough man with a shaved head, black leather jacket over a black t-shirt, thick gold chain, dark trousers, pale skin.', true],
  ['russian_boss', 'Сёма Кац, глава «Одессы»', 'Heavy-set man in his 50s, shaved head, black leather coat over a burgundy silk shirt, several gold rings and a big gold chain, smug look.'],
  ['arab', 'Боец клана Аль-Бахар', 'Young man in a white tracksuit with black side stripes, short black hair with a neat fade, dark sunglasses, white sneakers.'],
  ['arab_gun', 'Боец Аль-Бахар с пистолетом', 'Young man in a white tracksuit with black side stripes, short black hair, dark sunglasses.', true],
  ['arab_boss', 'Абу-Карим, глава клана', 'Dignified man in his 60s with a short grey beard, cream-colored linen suit, prayer beads in one hand, calm and authoritative.'],
  ['lions', 'Боец «Львов Гондэра»', 'Young Ethiopian-Israeli man, short black hair, yellow hoodie with green stripes along the sleeves, black joggers, stylish sneakers. Respectful, non-caricatured depiction.'],
  ['lions_gun', 'Боец «Львов» с пистолетом', 'Young Ethiopian-Israeli man, short black hair, yellow hoodie with green stripes along the sleeves, black joggers. Respectful, non-caricatured depiction.', true],
  ['lions_boss', 'Абеба, лидер «Львов»', 'Ethiopian-Israeli man in his early 30s, short neat hair and trimmed beard, olive bomber jacket over a yellow t-shirt, headphones around the neck. Respectful, non-caricatured depiction.'],
  ['iran', 'Иранский агент', 'Man in a plain grey suit with a dark tie, short black hair, short dark beard, dark sunglasses, anonymous secret-agent look.'],
  ['iran_gun', 'Иранский агент с пистолетом', 'Man in a plain grey suit with a dark tie, short black hair, short dark beard, dark sunglasses.', true],
  ['shabak', 'Дани из Шабака', 'Fit man in his 40s, plain dark polo shirt and dark trousers, short dark hair, sunglasses, small earpiece, discreet.'],
  ['itzik', 'Ицик «Фалафель»', 'Stocky bald man in his 50s with a thick black mustache, green short-sleeve shirt with an apron, gold watch, cheerful market vendor.'],
  ['moshe', 'Моше, бухгалтер', 'Thin elderly man with a black kippah, white button-up shirt, holding a worn leather briefcase, glasses.'],
  ['shmulik', 'Шмулик, хозяин квартиры', 'Chubby middle-aged man in a tank top and shorts, flip-flops, gold chain, holding a phone and a bunch of keys.'],
  ['dvora', 'Двора, учительница ульпана', 'Woman in her 60s with short curly grey hair, colorful scarf, holding a stack of textbooks.'],
  ['civ_1', 'Прохожая', 'Young Tel Aviv woman with long dark hair, colorful summer dress, sunglasses on her head, tote bag.'],
  ['civ_2', 'Харедим', 'Ultra-Orthodox man in a black suit and wide-brimmed black hat, white shirt, side curls.'],
  ['civ_3', 'Солдат', 'Israeli soldier in olive-green uniform with a rifle slung across the back.'],
  ['civ_4', 'Пожилой в кипе', 'Older man with a white crocheted kippah, short-sleeve checked shirt, carrying a plastic shopping bag.'],
  ['civ_5', 'Хипстер', 'Young hipster man with a beard and man-bun, tank top, shorts, holding an iced coffee.'],
  ['civ_6', 'Бабушка с тележкой', 'Elderly woman with dyed red hair, cardigan, pushing a small shopping trolley.'],
  ['civ_7', 'Подросток', 'Teenage boy with a cap worn backwards, oversized t-shirt, holding an electric scooter handle.'],
  ['civ_8', 'Женщина в тихеле', 'Woman in a modest long skirt and headscarf (tichel), carrying a baby carrier.'],
  ['civ_9', 'Офисный работник', 'Middle-aged office worker in a light blue shirt with rolled sleeves, lanyard badge, phone in hand.'],
  ['civ_10', 'Пляжник с маткот', 'Beach-goer man in swim shorts with a towel on the shoulder and a pair of beach paddles.'],
  ['civ_11', 'Женщина в хиджабе', 'Woman in a stylish hijab and long coat, holding shopping bags. Respectful depiction.'],
  ['civ_12', 'Турист', 'Tourist with a sun hat, camera around the neck, sunburned shoulders, map in hand.'],
  ['cat', 'Уличная кошка', 'Skinny ginger tabby street cat seen from directly above, walking to the right.'],
];

const PROP_ASSETS = [
  ['palm', 'Финиковая пальма', 'Date palm tree seen from directly above: radial green fronds around a brown center, a few orange date clusters.'],
  ['ficus', 'Фикус', 'Large ficus street tree crown seen from above, dense round dark-green foliage.'],
  ['bougainvillea', 'Бугенвиллея', 'Bougainvillea bush seen from above, bright magenta-pink flowers over green leaves.'],
  ['bottle_cage', 'Клетка для бутылок', 'Plastic bottle recycling cage seen from above: square metal mesh cage painted yellow, full of plastic bottles.'],
  ['trash_bin', 'Мусорный контейнер', 'Large green municipal garbage container on wheels, seen from above, lid closed.'],
  ['bus_stop', 'Остановка', 'City bus stop shelter seen from above: long transparent roof panel on a metal frame with a bench, wider than tall.'],
  ['umbrella', 'Пляжный зонтик', 'Beach umbrella seen from above, alternating white and turquoise segments.'],
  ['lifeguard_tower', 'Вышка спасателей', 'Beach lifeguard hut on stilts seen from above, white with a red stripe on the roof.'],
  ['market_stall', 'Прилавок Шука', 'Market stall seen from above: colorful striped awning covering crates of fruit and spices.'],
];

const TEXTURE_ASSETS = [
  ['asphalt', 'Асфальт', 'Worn city asphalt road surface seen from above, dark grey with fine aggregate grain, subtle tire wear, a few faint patches and tiny cracks. Area covers about 4x4 meters.'],
  ['sidewalk', 'Тротуарная плитка', 'City sidewalk made of small interlocking concrete paving blocks (grey and faded red-brown rows), slightly dusty, a few stains, seen from above. About 2x2 meters, roughly 12 blocks across.'],
  ['jaffa_stone', 'Камень Яффо', 'Old pavement made of large worn limestone blocks (warm cream and honey colors), irregular joints with sand in them, seen from above. About 2x2 meters.'],
  ['plaza', 'Плиты площади', 'Large light beige stone slabs of a modern city square, subtle variations between slabs, clean joints, seen from above. About 2x2 meters.'],
  ['sand', 'Песок пляжа', 'Fine Mediterranean beach sand, pale golden, gentle wind ripples, a few footprints and tiny shells, seen from above. About 4x4 meters.'],
  ['grass', 'Газон', 'Sun-dried park lawn, mix of green and yellowish patches, short grass blades, seen from above. About 4x4 meters.'],
  ['water', 'Море', 'Turquoise-blue Mediterranean sea water seen from above, gentle small waves and sun glints. About 4x4 meters.'],
  ['deck', 'Настил порта', 'Weathered wooden boardwalk planks, warm brown, visible plank gaps and nail heads, seen from above. About 2x2 meters.'],
  ['scrub', 'Сухой кустарник', 'Dry Mediterranean scrubland ground: dusty olive-green bushes, dry yellow grass, small stones, seen from above. About 4x4 meters.'],
  ['roof_gravel', 'Плоская крыша', 'Flat apartment rooftop surface: white bitumen waterproof coating, slightly dirty with water stains and patches, seen from above. Mostly light.'],
  ['roof_tiles', 'Черепица', 'Terracotta clay roof tiles, rows of orange-red tiles seen straight from above, slight weathering.'],
  ['roof_metal', 'Металлическая крыша', 'Corrugated metal warehouse roof seen from above, light grey with parallel ridges, a little rust.'],
];

// Полный упорядоченный список: машины (с уроном), персонажи, объекты, текстуры
const ASSET_MANIFEST = (() => {
  const out = [];
  for (const [file, title, desc] of VEHICLE_ASSETS) {
    out.push({ cat: 'vehicles', file, title, kind: 'new', size: '768x1024', prompt: `${ASSET_STYLE.common} ${ASSET_STYLE.vehicle} ${desc} ${ASSET_STYLE.isolated}` });
    for (const st of DAMAGE_STAGES) {
      out.push({ cat: 'vehicles', file: file + st.suffix, title: `${title} — ${st.title}`, kind: 'edit', base: file, size: '768x1024', prompt: st.prompt });
    }
  }
  for (const [file, title, desc, gun] of CHAR_ASSETS) {
    out.push({ cat: 'chars', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common} ${gun ? ASSET_STYLE.personGun : ASSET_STYLE.person} ${desc} ${ASSET_STYLE.isolated}` });
  }
  for (const [file, title, desc] of PROP_ASSETS) {
    out.push({ cat: 'props', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common} ${desc} ${ASSET_STYLE.isolated}` });
  }
  for (const [file, title, desc] of TEXTURE_ASSETS) {
    out.push({ cat: 'textures', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common.replace('single object centered, ', '')} ${desc} ${ASSET_STYLE.texture}` });
  }
  return out;
})();

// Что игра пытается загрузить из assets/gen/
const GEN_FILES = { textures: [], chars: [], vehicles: [], props: [] };
for (const a of ASSET_MANIFEST) GEN_FILES[a.cat].push(a.file);

if (typeof module !== 'undefined') module.exports = { ASSET_MANIFEST, ASSET_STYLE, DAMAGE_STAGES };
