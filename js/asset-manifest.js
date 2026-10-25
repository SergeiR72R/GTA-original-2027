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
  facade: 'Orthographic straight-on FRONT VIEW of a building facade (elevation drawing, no perspective, no sky, no ground, no street), exactly 2 window bays wide and exactly 2 floors tall, the facade fills the entire image edge to edge, seamless when tiled horizontally and vertically, flat even daylight, no people, no cars.',
  shop: 'Orthographic straight-on FRONT VIEW of ONE ground-floor shopfront of an old Tel Aviv apartment building (elevation drawing, no perspective, no sky, no sidewalk), the shopfront fills the entire image edge to edge: a slightly faded backlit plastic sign box at the top with a phone number, a frayed awning, a slightly dirty shop window with stickers and paper sale ads taped inside, aluminium door, grimy plaster, a few electric cables above, seamless at the left and right edges. Authentic, lived-in, a bit shabby.',
  portrait: 'Head-and-shoulders caricature portrait for the phone-call dialog box of a satirical crime video game set in Tel Aviv: bold comic-book style, thick black ink outlines, flat cel shading, exaggerated proportions (big head, small shoulders, oversized nose and expressive eyebrows), the character looks toward the viewer at a slight three-quarter angle, flat solid single-color background with a subtle halftone dot pattern, square format, head and shoulders fill the frame. Funny and good-natured, never mean; exaggerate expression and props, not ethnic features. No text, no letters, no speech bubbles, no frame, no logos, no watermark.',
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
  ['lux', 'Чёрный представительский седан', 'Long black luxury executive sedan with tinted windows and chrome details.'],
  ['taxi', 'Такси', 'White sedan taxi with a small yellow roof sign that reads «מונית» in Hebrew (the only text allowed).'],
  ['police', 'Полиция', 'Israeli police SUV: white body with blue and fluorescent yellow-green checkered side markings, red-and-blue light bar on the roof, the word «משטרה» on the hood (the only text allowed).'],
  ['ambulance', 'Скорая', 'White emergency ambulance van with red stripes and orange roof lights, generic medical markings without any cross or star symbol.'],
  ['van', 'Фургон', 'Plain white delivery van.'],
  ['van_iran', 'Фургон иранских агентов', 'Dark charcoal-grey windowless van with tinted windows, suspicious, no markings.'],
  ['pickup', 'Пикап', 'White pickup truck with an open cargo bed containing a few wooden crates.'],
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

const FACADE_ASSETS = [
  ['facade_bauhaus', 'Фасад баухауз (центр)', 'Slightly weathered white plaster Tel Aviv Bauhaus apartment facade: horizontal ribbon windows with white frames, half-lowered grey plastic roller shutters, long curved white balcony slabs, air-conditioner boxes with black drip stains below them, electric cables, potted plants and laundry on balconies.'],
  ['facade_florentin', 'Фасад Флорентина', 'Worn beige-grey plaster facade of an old apartment building in a gritty artsy neighbourhood: mismatched roller shutters, rusty balcony railings with laundry, black water stains, peeling plaster, tangled cables, a colourful graffiti piece on the lower part, many air-conditioner boxes, a paper «להשכרה» (for rent) sign on a balcony.'],
  ['facade_jaffa', 'Фасад Яффо (камень)', 'Old Ottoman-era facade of warm honey-coloured limestone blocks: tall arched windows with green wooden shutters, small decorative stone details.'],
  ['facade_nevetzedek', 'Фасад Неве-Цедека', 'Restored 1900s low-rise facade in pastel plaster (peach or cream): tall rectangular windows with teal wooden shutters, ornamental cornice.'],
  ['facade_concrete', 'Фасад «шикун» (бетон)', 'Plain 1960s concrete housing block facade: grey-beige concrete, simple windows, boxy enclosed balconies, many air-conditioner units, water stains.'],
  ['facade_hotel', 'Фасад отеля на набережной', 'Modern white beachfront hotel facade: floor-to-ceiling blue-tinted windows and continuous glass balcony railings.'],
  ['facade_tower', 'Фасад стеклянной башни', 'Glass curtain wall of a modern office skyscraper: blue reflective glass panels in a dark metal grid.'],
  ['facade_warehouse', 'Фасад склада в порту', 'Old port warehouse wall: grey corrugated metal with rust streaks and a large roller door.'],
];

const SHOP_ASSETS = [
  ['shop_1', 'Витрина: маколет', 'Neighbourhood grocery (makolet) with a blue sign reading «מכולת» and «24/7», stacked plastic crates of drink bottles at the door, white ice-cream freezer, shelves crammed with colourful products behind dirty glass.'],
  ['shop_2', 'Витрина: пицуцийя', 'Late-night kiosk (pitzutzia) with a red sign reading «פיצוצייה», a pink neon OPEN sign, snacks and sweets piled in the window, lottery posters.'],
  ['shop_3', 'Витрина: шаварма', 'Shawarma joint with a yellow sign reading «שווארמה», a rotating meat spit visible through the window, a black menu board with prices in shekels, plastic chairs outside.'],
  ['shop_4', 'Витрина: фалафельная', 'Small falafel stand with a green sign reading «פלאפל», striped awning, counter with colourful salad trays.'],
  ['shop_5', 'Витрина: русский гастроном', 'Russian delicatessen with a dark green sign reading «ГАСТРОНОМ» in Cyrillic, hanging sausages, jars and bottles in the window.'],
  ['shop_6', 'Витрина: парикмахерская', 'Old barber shop with a dark sign reading «מספרה» and below «Парикмахерская», a red-white-blue barber pole, a mirror and a barber chair inside.'],
  ['shop_7', 'Витрина: ремонт телефонов', 'Phone repair and accessories shop with a red sign reading «סלולר», phone cases on the wall, yellow sale stickers on the glass.'],
  ['shop_8', 'Витрина: закрытая лавка «сдаётся»', 'Closed shop with a lowered grey metal roller shutter covered in colourful graffiti, faded old sign above, a paper sign «להשכרה» with a phone number taped on the shutter.'],
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

// Портреты героев для окна звонка. Добавлены в конец списка, чтобы номера
// уже сгенерированных картинок не сдвинулись.
const PORTRAIT_ASSETS = [
  ['portrait_leva', 'Портрет: Лёва Гольдман', 'Leva, a Russian-Jewish new immigrant from St. Petersburg in his late 20s: short light-brown hair, sunburnt nose and cheeks, a drop of sweat on the forehead from the heat, tired but stubborn half-smile, white-and-navy striped sailor undershirt (telnyashka). Background: pale sky blue.'],
  ['portrait_itzik', 'Портрет: Ицик «Фалафель»', 'Itzik, a stocky bald Tel Aviv market vendor in his 50s: huge black mustache, bushy eyebrows, wide grin with one gold tooth, green short-sleeve shirt with a white apron, gold watch, holding a falafel pita. Background: warm yellow.'],
  ['portrait_sema', 'Портрет: Сёма Кац', 'Syoma, a heavy-set Russian mobster boss in his 50s: shaved head, square jaw, narrow smug eyes and a crooked smirk, black leather coat over a burgundy silk shirt, thick gold chain, gold rings, raising a small shot glass. Background: dark red.'],
  ['portrait_abu', 'Портрет: Абу-Карим', 'Abu-Karim, a dignified clan elder from Jaffa in his 60s: short neat grey beard, calm wise eyes, cream linen suit with an open collar, prayer beads in one hand, a tiny cup of cardamom coffee in the other. Background: deep teal.'],
  ['portrait_abeba', 'Портрет: Абеба', 'Abeba, an Ethiopian-Israeli community leader in his early 30s: short neat hair and trimmed beard, confident warm smile, olive bomber jacket over a yellow t-shirt, big headphones around the neck. Respectful depiction. Background: green.'],
  ['portrait_dani', 'Портрет: Дани из Шабака', 'Dani, a Shin Bet agent in his 40s: square jaw, deadpan serious face, dark sunglasses, short dark hair, earpiece with a coiled wire, plain dark polo shirt. Background: grey-blue.'],
  ['portrait_ali', 'Портрет: «Али» из Телеграма', 'A mysterious anonymous online recruiter: a man in a dark hoodie, face mostly hidden in shadow with only a sly smile and glinting eyes, the cold blue glow of a smartphone screen lighting his chin. No app logos. Background: dark navy.'],
  ['portrait_ortal', 'Портрет: Орталь из Мисрад а-Клита', 'Ortal, a bored Israeli government office clerk in her 40s: big curly dyed-blonde hair, long bright pink nails, reading glasses, unimpressed raised eyebrow, holding a paper cup of coffee. Background: pale institutional green.'],
  ['portrait_shmulik', 'Портрет: Шмулик, хозяин квартиры', 'Shmulik, a chubby Tel Aviv landlord in his 50s: receding hair, stubble, scheming grin, white tank top, gold chain, a phone pressed to his ear and a bunch of keys in the other hand. Background: orange.'],
  ['portrait_dvora', 'Портрет: Двора, учительница ульпана', 'Dvora, a strict but kind Hebrew teacher in her 60s: short curly grey hair, colorful orange scarf, reading glasses on the tip of her nose, raised index finger, holding a stack of textbooks. Background: lilac.'],
];

// Фасады достопримечательностей (добавлены в конец, номера не сдвигаются)
const LANDMARK_FACADES = [
  ['facade_power', 'Фасад: электростанция Ридинг', 'Industrial facade of a 1930s seaside power station: pale weathered concrete, tall narrow vertical strip windows with rusty steel frames, a faded red stripe along the top, exposed pipes and ventilation grilles.'],
  ['facade_church', 'Фасад: церковь в Яффо', 'Facade of an old Franciscan stone church in Jaffa: warm honey-coloured limestone blocks, tall arched windows with simple coloured glass, carved stone cornice and pilasters.'],
  ['facade_mosque', 'Фасад: мечеть Хасан-Бек', 'Ottoman-era mosque wall near the sea: pale sand-coloured limestone, a row of pointed arch windows with green wooden shutters and iron grilles, a decorative stone band between floors.'],
  ['facade_arena', 'Фасад: спортивная арена', 'Exterior wall of a modern indoor sports arena: horizontal bands of light grey aluminium panels alternating with strips of dark blue glass, white vertical structural ribs.'],
  ['facade_citygate', 'Фасад: башня «Городские ворота»', 'Curtain wall of the tallest skyscraper in Ramat Gan: dark blue reflective glass with thin vertical silver fins in a very regular grid, a few lit office windows.'],
];

// Глава 1 «Одесса» и перебивки: новые герои, тягач, бочка, мелочи улиц и
// иллюстрации для рекламных щитов. Добавлены в конец — номера 1–173 не сдвигаются.
const CH1_PORTRAITS = [
  ['portrait_garik', 'Портрет: Гарик, племянник Сёмы', 'Garik, the hot-headed nephew of a Russian mob boss, early 20s: messy dark curly hair, stubble, cocky crooked smirk, narrowed jealous eyes, black leather jacket over a red t-shirt, thin gold chain, car keys spinning on one finger. Background: bright red.'],
  ['portrait_fira', 'Портрет: Фира Марковна', 'Fira Markovna, an elegant elderly bookkeeper from Odessa in her 70s: neat grey curls, reading glasses on a chain, sharp clever eyes, brown cardigan and a turquoise silk scarf, an old calculator in one hand and a stack of banknotes in the other. Background: warm beige.'],
  ['portrait_botsman', 'Портрет: Боцман', 'Botsman, a silent former sailor in his 60s who runs the port for the gang: bald weathered head, short grey beard, bushy eyebrows, stern squint, striped navy-and-white sailor undershirt under a dark pea coat, a pipe in the corner of his mouth, an anchor tattoo on the hand. Background: slate grey-blue.'],
  ['portrait_roza', 'Портрет: Роза Львовна', 'Roza Lvovna, the mob boss\'s mother in her late 70s: voluminous auburn-dyed curls, big round glasses, bright lipstick, purple blouse with a brooch, warm but demanding smile, holding a jar of homemade jam. Background: soft pink.'],
  ['portrait_shlomi', 'Портрет: Шломи, помощник министра', 'Shlomi, a slick political aide in his 30s: gelled short black hair, stubble, toothy salesman grin, untucked white shirt with sleeves rolled up, two phones — one at his ear and one in his hand, a small national flag pin. Background: light blue.'],
  ['portrait_yoav', 'Портрет: журналист Йоав', 'Yoav, a stubborn investigative TV journalist in his 30s: tousled brown hair, thick-rimmed glasses, tired eyes, stubble, grey hoodie with a press badge on a lanyard, holding a battered laptop. Background: orange.'],
  ['portrait_karim', 'Портрет: Карим', 'Karim, a young man from Jaffa in his early 20s: short black hair, frightened but brave eyes, a small bruise on the cheekbone, plain white hoodie, holding his own wrist where a rope was. Sympathetic depiction. Background: teal.'],
];
const CH1_CHARS = [
  ['garik', 'Гарик', 'Young man with messy dark curly hair, black leather jacket over a red t-shirt, thin gold chain, dark jeans, flashy sneakers.'],
  ['karim', 'Карим', 'Young man with short black hair, plain white hoodie, grey sweatpants, a bit of rope still around one wrist.'],
  ['roza', 'Роза Львовна', 'Elderly woman with voluminous auburn curls, purple blouse, long dark skirt, a big handbag.'],
  ['yoav', 'Журналист Йоав', 'Man in his 30s with tousled brown hair and glasses, grey hoodie, press badge on a lanyard, laptop bag across the body.'],
  ['baba', 'Бабушка Хая', 'Very old woman with short white curly hair, lilac cardigan, sitting-ready posture, holding a cane.'],
  ['protester', 'Протестующий', 'Young protester in a blue t-shirt holding a large blue-and-white flag on a pole over the shoulder.'],
  ['supporter', 'Сторонник правительства', 'Man in a dark-blue cap and white t-shirt, holding a blue-and-white flag, angry posture.'],
  ['mechanic', 'Механик', 'Car mechanic in grey oil-stained overalls holding a large wrench.'],
  ['runner', 'Беглец-киоскёр', 'Skinny man in an orange t-shirt and shorts, running pose with one arm forward.'],
];
const CH1_VEHICLES = [
  ['truck', 'Тягач с контейнером', 'Semi-truck seen from above: a short white cab at the front and a long blue corrugated shipping container on the trailer behind it, the container roof clearly visible with ribs, no writing.', true],
  ['barrel', 'Бочка с топливом', 'A single red steel fuel drum seen from directly above: round lid with two caps and a yellow hazard triangle, metal rings, filling about 70% of the image. Square image.', false],
];
const CH1_PROPS = [
  ['planter', 'Кадка с цветами', 'Round terracotta street planter seen from above, full of green leaves and pink and yellow flowers.'],
  ['hydrant', 'Гидрант', 'Red fire hydrant on a sidewalk seen from directly above, small, with a yellow cap.'],
  ['elbox', 'Электрошкаф с граффити', 'Grey metal electrical utility cabinet on a sidewalk seen from above, covered in colorful spray-paint tags.'],
  ['cafe_set', 'Столик кафе', 'Small round white cafe table with three dark chairs around it seen from above, a coffee cup on the table.'],
  ['picnic_table', 'Стол для пикника', 'Wooden picnic table with two attached benches seen from above.'],
  ['playground', 'Детская площадка', 'Small children\'s playground seen from above on a sand-colored rubber surface: a red slide, a blue swing frame, a green round spinner, framed by a low wooden border. Square.'],
  ['lounger', 'Лежак', 'White plastic beach sun lounger with a blue towel seen from above, longer than wide.'],
  ['shopping_cart', 'Тележка из супермаркета', 'Abandoned metal supermarket shopping cart seen from above, red handle.'],
  ['fountain_small', 'Фонтанчик', 'Small round stone fountain with clear blue water seen from above, a stone basin in the middle.'],
  ['flower_bed', 'Клумба', 'Square raised flower bed with a low stone border seen from above, green grass and small bright flowers, a young tree in the center. Square, fills the image.'],
  ['crates', 'Ящики', 'A stack of four wooden shipping crates seen from above.'],
  ['container_top', 'Морской контейнер', 'A single red corrugated steel shipping container seen from directly above, long and narrow, roof ribs visible, no writing.'],
  ['kiosk', 'Киоск', 'Small Tel Aviv street kiosk seen from above: a square booth with a striped green-and-white awning roof and a few crates of drinks beside it.'],
  ['ad_column', 'Афишная тумба', 'Round green advertising pillar (Morris column) seen from directly above: dark green domed top cap, colorful posters visible around the edge.'],
];
// иллюстрации для щитов: без текста, надписи игра наложит сама
const CH1_POSTERS = [
  ['poster_1', 'Щит: доставка «Шмоне-Бис»', 'A happy delivery rider on an orange scooter with a big orange delivery box speeding past Tel Aviv palm trees, sunny, dynamic.'],
  ['poster_2', 'Щит: хумус «Абу-Сами»', 'A big plate of creamy hummus with olive oil, chickpeas and paprika next to warm pita, appetizing close-up, warm earthy colors.'],
  ['poster_3', 'Щит: кондиционеры «Коль-Кар»', 'A family relaxing in a cool blue living room with an air conditioner blowing snowflakes while a red-hot desert wind blows outside the window, humorous.'],
  ['poster_4', 'Щит: ульпан «Алеф»', 'Smiling adult students of different ages in a bright classroom raising their hands, a whiteboard with a big Hebrew letter Alef, friendly.'],
  ['poster_5', 'Щит: лотерея «Мазаль»', 'Golden lottery balls and a shower of gold coins and confetti on a purple background, glamorous.'],
  ['poster_6', 'Щит: квартиры в Бат-Яме', 'A shiny new residential tower by the sea at sunset with a tiny price tag dangling from it, ironic real-estate ad style.'],
  ['poster_7', 'Щит: тариф «Шалом»', 'A smartphone with waves of signal bars and stylized data icons flying out of it, turquoise background, energetic.'],
  ['poster_8', 'Щит: мороженое «Лимон»', 'A huge pink-and-yellow ice cream cone with a lemon slice dripping in the sun on the beach, playful.'],
  ['poster_iran', 'Щит: «Протест оплачивает Иран»', 'A dramatic propaganda-style political poster: a crowd of protesters as dark silhouettes with banknotes raining down on them from above, red and black colors, ominous.'],
];

// Кадры ходьбы главных героев: правка готового спрайта, только поза ног
const WALK_HEROES = [
  ['player', 'Лёва'], ['player_gun', 'Лёва с пистолетом'], ['russian_boss', 'Сёма Кац'],
  ['garik', 'Гарик'], ['karim', 'Карим'], ['shabak', 'Дани из Шабака'],
];
const WALK_FRAMES = [
  { suffix: '_walk1', title: 'шаг левой', pose: 'his LEFT foot steps forward: the left shoe is clearly visible in front of the body (to the right of the torso), the right shoe is visible behind the body (to the left of the torso), the right arm swings slightly forward and the left arm back' },
  { suffix: '_walk2', title: 'шаг правой', pose: 'his RIGHT foot steps forward: the right shoe is clearly visible in front of the body (to the right of the torso), the left shoe is visible behind the body (to the left of the torso), the left arm swings slightly forward and the right arm back' },
];
const WALK_EDIT = (pose) => `Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, position, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the pose to a natural walking stride seen from directly above: ${pose}. Same art style, same lighting.`;

// Пролог: друзья Лёвы — Дима, Данис, Семён. Внешность — по фото, которые
// пользователь прикладывает в Google Flow (ref: true)
const REF_PHOTO = 'Base the face, hairstyle, facial hair, glasses (if any) and build on the attached reference photo of this real person, caricatured in exactly the same style as the other characters; keep him clearly recognizable.';
const PRO_VEHICLES = [
  ['civic', 'Белый «Цивик» Даниса', 'White sporty Japanese compact sedan from the late 2000s, slightly lowered, dark tinted windows, black aftermarket alloy wheels, small rear spoiler on the trunk, a few stickers on the rear window (no readable text), no badges.', true],
  ['solaris', 'Серый «Солярис» Димы', 'Grey budget Korean-style compact sedan from the mid-2010s, plain and practical, a bit dusty, a small dent on the rear bumper, no badges.', true],
  ['china_ev', 'Новый китайский кроссовер', 'Brand-new compact Chinese crossover in pearl-white with a black panoramic glass roof, hidden door handles, a thin full-width light bar at the front and back, clean futuristic Chinese design, no badges.', false],
];
const PRO_PROPS = [
  ['mattress', 'Матрас на крышу', 'A double bed mattress, white with a light-blue quilted pattern, tied with two orange cargo straps across it, seen from directly above, rectangular, longer than wide.'],
];
const PRO_PEOPLE = [
  ['dima', 'Дима', 'Dima, Leva\'s flatmate and fellow immigrant, early 30s, practical and a bit stingy, holding a phone with a car sale ad.', 'grey t-shirt, dark jeans, sneakers, phone in hand', 'Background: light grey-blue.'],
  ['danis', 'Данис', 'Danis, Leva\'s friend from the ulpan, late 20s, hot-headed street racer, proud of his car, holding his car keys.', 'black t-shirt, light jeans, white sneakers, car keys in hand', 'Background: hot orange.'],
  ['semyon', 'Семён', 'Semyon, Leva\'s second flatmate, early 30s, calm and easy-going, always moving to a new apartment, hugging a rolled-up pillow.', 'white t-shirt, shorts, flip-flops', 'Background: mint green.'],
];

// Банды: узнаваемые машины, таксофон, персонажи с каждым оружием
// Машины банд — карикатурные, суть банды видна с первого взгляда, на крыше
// крупная яркая эмблема банды (вымышленная, без текста)
const GANG_CAR_STYLE = 'CARICATURED cartoon design with exaggerated proportions, like a custom toy car in a satirical crime game: the gang identity must be obvious instantly even at a small size. A LARGE, BRIGHT, bold and simple fictional gang emblem is painted across the whole roof, centered, high contrast, readable from directly above. The emblem is fictional: no real brands, no real flags, no religious or political symbols, no text, no letters.';
const GANG_VEHICLES = [
  ['lux_odessa', 'Машина бригады «Одесса»', 'Odessa Brigade, a Russian-speaking 1990s-style mafia: an absurdly long black luxury limousine-sedan with a huge chrome grille, gold-plated rims, gold trim along the sides, heavily tinted windows, fluffy dice visible through the windshield. ROOF EMBLEM: a big golden anchor with a small crown on top, inside a blood-red circle with a thick gold ring.'],
  ['pickup_bahar', 'Пикап клана Аль-Бахар', 'Al-Bahar clan from old Jaffa port ("bahar" means sea): a white monster pickup truck on huge off-road tyres and raised suspension, teal-green racing stripes, black roll bar with a row of big round spotlights, the open cargo bed overflowing with crates of bright Jaffa oranges and a fishing net. ROOF EMBLEM: a big teal-green circle with a white stylized curling sea wave and a jumping fish.'],
];
const GANG_VEHICLES2 = [
  ['lions_car', 'Машина «Львов Гондэра»', 'Lions of Gondar, a crew of young Ethiopian-Israeli rappers with their own music studio: a bright yellow tuned street-racer hatchback with a gigantic rear spoiler, wide flared fenders, neon-green underglow, green and red racing stripes, two huge subwoofer speakers visible through the open rear hatch. ROOF EMBLEM: a big roaring lion head wearing a crown, yellow and black, inside a green circle.'],
  ['iran_car', 'Фургон иранской сети', 'The Iranian spy network pretending to be a carpet delivery company: a dark charcoal-grey boxy van, comically suspicious, bristling with antennas and a satellite dish on the roof edge, blacked-out windows, rolled-up Persian-style carpets strapped to the roof rack along the sides. ROOF EMBLEM: a fake carpet-shop logo — a big rolled red carpet with a single watchful eye in the middle, inside an orange diamond.'],
];
// Убитые: тот же персонаж лежит на спине, вид сверху, голова — вправо
const DEAD_POSE = 'A single person lying dead flat on the back on the ground, seen from directly above (bird\'s-eye view), the whole body visible from head to feet, the HEAD toward the RIGHT edge of the image and the feet toward the LEFT, arms spread loosely to the sides, eyes closed, a small dark-red blood pool under the torso, comic-book style, not gory. The body fills about 85% of the image width.';
// ref — файл живого персонажа из архива референсов (hamsin-refs-dead.zip)
const DEAD_EDIT = (ref, who) => `Use the attached reference image ${ref} (${who}). Draw EXACTLY this character from ${ref}: the same person, face, hair, clothes, colors, art style, lighting and the solid magenta background. Change ONLY the pose: ${DEAD_POSE}`;

// Текстуры материалов 3D-моделей (tools/models/lib.py TEX): бесшовные, лицом к стене
// (или сверху — для крыш). Модель берёт их сама, когда картинка появится
const MODEL_TEX_STYLE = 'Seamless tileable texture of a building material for a stylized top-down crime game, orthographic straight-on view of a flat surface, fills the entire square edge to edge, even soft daylight, no perspective, no vignette, no objects, no shadows cast by objects, no text, no logos, no watermark. Slightly stylized, painterly but realistic colors, readable at small size.';
const MODEL_TEXTURES = [
  ['m_stone', 'Камень Яффо (известняк)', 'Old Jaffa limestone wall: warm golden-beige rough-cut limestone blocks in regular horizontal courses with lighter mortar joints, weathered and sun-bleached.'],
  ['m_trim', 'Светлый камень карнизов', 'Smooth cream-white dressed limestone / lime plaster surface with faint chisel marks, very subtle, almost uniform.'],
  ['m_concrete', 'Бетон', 'Weathered raw grey concrete with horizontal board-formwork lines, rust streaks and dark water stains.'],
  ['m_white', 'Белая штукатурка баухауза', 'White-painted smooth lime plaster of a Tel Aviv Bauhaus building, slightly weathered, faint hairline cracks and sun-bleached patches.'],
  ['m_beige', 'Бежевая штукатурка 1960-х', 'Beige-grey sand-coloured rough spray stucco of a 1960s Israeli apartment block, light grime streaks.'],
  ['m_ochre', 'Охра (эклектика)', 'Aged ochre lime plaster, warm yellow-orange, patchy, with a few small peeling spots revealing older plaster underneath.'],
  ['m_brick', 'Терракотовая штукатурка церкви', 'Warm terracotta-orange painted plaster of a Spanish baroque church wall, slightly faded and patchy.'],
  ['m_brown', 'Коричневая мозаика 1960-х', 'Facade cladding of small brown and beige square mosaic tiles in a vertical striped pattern, 1960s modernist tower.'],
  ['m_glass', 'Тёмное стекло фасада', 'Dark tinted glass curtain wall with thin aluminium mullions in a regular rectangular grid, faint sky reflections.'],
  ['m_glassB', 'Синее стекло (Азриэли)', 'Blue reflective glass curtain wall with grey mullions in a regular grid, soft reflections of clouds.'],
  ['m_metal', 'Металлические панели', 'Brushed grey aluminium cladding panels with straight seams and rivets.'],
  ['m_roofT', 'Черепица (сверху)', 'Mediterranean terracotta clay roof tiles seen from directly above, slightly weathered, a little lichen.'],
  ['m_patina', 'Патина купола', 'Oxidized green-grey copper and lead roof sheets with standing seams and patina streaks.'],
  ['m_gold', 'Золото луковицы', 'Gold leaf sheet metal with subtle panel seams and warm reflections.'],
  ['m_blueroof', 'Синий купол со звёздами', 'Blue enamel-painted metal dome sheets with small scattered golden stars.'],
  ['m_shutter', 'Ставни-«трисим»', 'Israeli plastic roller shutter: horizontal light grey slats, slightly dirty.'],
  ['m_wood', 'Старая деревянная дверь', 'Old weathered wooden door planks, dark brown, vertical boards with a few iron nails.'],
  ['m_roofflat', 'Плоская крыша', 'Flat roof covered with whitewashed bitumen membrane, patches, seams and stains, seen from above.'],
  ['m_graffiti', 'Граффити на бетоне', 'Colorful street graffiti tags and throw-ups on a grey concrete wall, abandoned building vibe (no readable words).'],
  ['m_rust', 'Ржавый металл', 'Rusty corroded steel sheet with flaking orange-brown rust.'],
  ['m_paint_red', 'Красная краска по металлу', 'Glossy red paint on steel, slightly chipped and faded.'],
  ['m_water', 'Вода фонтана', 'Clear turquoise fountain water surface with gentle ripples seen from above.'],
  // варианты типовых домов (HOUSE_VARIANTS): одна модель — три разных отделки
  ['m_bh_cream', 'Баухауз: кремовая штукатурка', 'Cream off-white lime plaster of a restored Tel Aviv Bauhaus building, smooth, warm tint, a few faint stains.'],
  ['m_bh_pastel', 'Баухауз: пастельно-розовая штукатурка', 'Pale pastel pink plaster of a renovated Bauhaus building in Tel Aviv, smooth and slightly sun-faded.'],
  ['m_60_grey', 'Дом 60-х: серая «шуба»', 'Grey rough pebble-dash / terrazzo-grit stucco of a 1960s Israeli apartment block, dusty, with dark streaks under the windows.'],
  ['m_60_stone', 'Дом 60-х: облицовка иерусалимским камнем', 'Beige Jerusalem-stone cladding panels in a regular grid, slightly worn, 1960s apartment block facade.'],
  ['m_ecl_pink', 'Эклектика: лососевая штукатурка', 'Aged salmon-pink lime plaster of a 1920s eclectic building in Florentin, patchy, with small cracks.'],
  ['m_ecl_blue', 'Эклектика: серо-голубая штукатурка', 'Aged pale blue-grey lime plaster of a 1920s eclectic building, faded and patchy, a few repaired spots.'],
];

// Вечерние новости 34-го канала: корреспондент и ведущая
const NEWS_PORTRAITS = [
  ['portrait_ausbender', 'Портрет: Сергей Аусбендер, корреспондент 34-го канала', 'Sergey Ausbender, a self-confident TV news correspondent: receding hair combed back, reading glasses low on the nose, dark suit with a loosened tie, a TV microphone in one hand and the other index finger raised, a know-it-all smirk, as if explaining something obvious and completely wrong. Background: dark blue TV studio with glowing screens.', true],
  ['portrait_anchor', 'Портрет: ведущая новостей Яэль', 'Yael, an Israeli evening news anchor in her 30s: big glossy dark hair, red blouse, polite professional smile with one slightly raised eyebrow of disbelief. Background: dark blue TV studio with glowing screens.'],
];

const MODEL_TEXTURES_LATE = [
  ['m_pinkpaint', 'Розовая краска балконов («Опера»)', 'Pale salmon-pink painted concrete of balcony parapets on a 1990s Tel Aviv seafront tower, smooth with light weathering and faint drip stains.'],
];

// Три отделки каждого типового дома: материал модели → своя текстура и цвет,
// пока текстуры нет. Вариант 0 — как в модели
const HOUSE_VARIANTS = {
  house_bauhaus: [{}, { white: { tex: 'm_bh_cream', color: '#efe6d2' } }, { white: { tex: 'm_bh_pastel', color: '#ecd6cf' } }],
  house_60s: [{}, { beige: { tex: 'm_60_grey', color: '#b8b6b0' } }, { beige: { tex: 'm_60_stone', color: '#dccfb0' } }],
  house_eclectic: [{}, { ochre: { tex: 'm_ecl_pink', color: '#e3a58f' }, shutterG: { color: '#3d5f86' } }, { ochre: { tex: 'm_ecl_blue', color: '#a9bccb' }, shutterG: { color: '#7a4b2c' } }],
};

// Тарантайка Лёвы: на ней он везёт Семёна с матрасом
const LEVA_CAR = [
  ['leva_vw', '«Фолькс» Лёвы', 'A tired old 1990s German compact hatchback (classic boxy two-box shape), faded pale grey-blue paint with sun-bleached roof, the front left door in a different color (matte primer grey), small dents and rust spots, plain steel wheels, two black roof-rack bars, a cracked plastic mirror held with tape, no badges. A lovable clunker.'],
];
const GANG_PROPS = [
  ['payphone', 'Таксофон', 'An Israeli street payphone on a single pole, seen from directly above: a grey metal box under a small curved grey hood with a blue stripe along its edge, a black handset on a coiled cord at one side, slightly worn and scratched, rectangular footprint.'],
];
const WEAPON_POSE = {
  bat: 'holding a wooden baseball bat in both hands, raised over his right shoulder, ready to swing',
  shotgun: 'both arms extended forward to the right holding a pump-action shotgun with a wooden stock',
  uzi: 'both arms extended forward to the right holding a compact black submachine gun with a short magazine',
  ak: 'both arms extended forward to the right holding an assault rifle with a wooden stock and a curved magazine',
  rpg: 'an olive-green rocket launcher tube resting on his right shoulder and pointing to the right, both hands on its grips',
};
// у героя — всё оружие, у бойцов банд — то, чем банда вооружена (пистолет уже есть: *_gun)
const WEAPON_CHARS = [
  ['player', 'Лёва', ['bat', 'shotgun', 'uzi', 'ak', 'rpg']],
  ['russian', 'Боец «Одессы»', ['ak', 'shotgun']],
  ['arab', 'Боец Аль-Бахар', ['uzi', 'shotgun']],
  ['lions', 'Боец «Львов»', ['bat', 'uzi']],
  ['iran', 'Иранский агент', ['uzi', 'ak']],
];
const WEAPON_NAME = { bat: 'с битой', shotgun: 'с дробовиком', uzi: 'с узи', ak: 'с автоматом', rpg: 'с РПГ' };
const WEAPON_EDIT = (pose) => `Edit the previous image of this exact character. Keep EXACTLY the same person, face, hair, clothes, colors, size, framing, top-down camera, facing direction (FACING RIGHT) and the solid magenta background. Change ONLY the arms and what he holds: ${pose}. Same art style, same lighting.`;

// Полный упорядоченный список: машины (с уроном), персонажи, фасады, объекты, текстуры, портреты
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
  for (const [file, title, desc] of FACADE_ASSETS) {
    out.push({ cat: 'facades', file, title, kind: 'new', size: '16:9', prompt: `${ASSET_STYLE.common.replace('single object centered, ', '')} ${ASSET_STYLE.facade} ${desc}` });
  }
  for (const [file, title, desc] of SHOP_ASSETS) {
    out.push({ cat: 'facades', file, title, kind: 'new', size: '16:9', prompt: `${ASSET_STYLE.common.replace('single object centered, ', '').replace('no text, no logos', 'no logos')} ${ASSET_STYLE.shop} ${desc}` });
  }
  for (const [file, title, desc] of PROP_ASSETS) {
    out.push({ cat: 'props', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common} ${desc} ${ASSET_STYLE.isolated}` });
  }
  for (const [file, title, desc] of TEXTURE_ASSETS) {
    out.push({ cat: 'textures', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common.replace('single object centered, ', '')} ${desc} ${ASSET_STYLE.texture}` });
  }
  for (const [file, title, desc] of PORTRAIT_ASSETS) {
    out.push({ cat: 'portraits', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.portrait} ${desc}` });
  }
  for (const [file, title, desc] of LANDMARK_FACADES) {
    out.push({ cat: 'facades', file, title, kind: 'new', size: '16:9', prompt: `${ASSET_STYLE.common.replace('single object centered, ', '')} ${ASSET_STYLE.facade} ${desc}` });
  }
  // глава 1 (batch: 'ch1' — отдельное задание CLAUDE_CHROME_ASSETS_CH1.md)
  const ch1 = (o) => out.push(Object.assign({ batch: 'ch1' }, o));
  for (const [file, title, desc] of CH1_PORTRAITS) ch1({ cat: 'portraits', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.portrait} ${desc}` });
  for (const [file, title, desc] of CH1_CHARS) ch1({ cat: 'chars', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common} ${ASSET_STYLE.person} ${desc} ${ASSET_STYLE.isolated}` });
  for (const [file, title, desc, damage] of CH1_VEHICLES) {
    const base = `${ASSET_STYLE.common} ${damage ? ASSET_STYLE.vehicle : ''} ${desc} ${ASSET_STYLE.isolated}`;
    ch1({ cat: 'vehicles', file, title, kind: 'new', size: damage ? '768x1024' : '1024x1024', prompt: base });
    if (damage) for (const st of DAMAGE_STAGES) ch1({ cat: 'vehicles', file: file + st.suffix, title: `${title} — ${st.title}`, kind: 'edit', base: file, size: '768x1024', prompt: st.prompt, full: `${base} ${st.prompt.replace(/^Edit the previous image of this exact vehicle\. Keep EXACTLY the same [^.]*\. /, '')}` });
  }
  for (const [file, title, desc] of CH1_PROPS) ch1({ cat: 'props', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common} ${desc} ${ASSET_STYLE.isolated}` });
  for (const [file, title, desc] of CH1_POSTERS) ch1({ cat: 'facades', file, title, kind: 'new', size: '16:9', prompt: `Flat bold billboard advertisement illustration, vivid colors, simple readable shapes, fills the whole image edge to edge, leave the lower third calm and uncluttered (text will be added later), NO text, NO letters, NO logos, NO watermark. ${desc}` });
  // кадры ходьбы героев — в самом конце, чтобы номера прежних картинок не сдвигались
  const charPrompt = (file) => out.find((a) => a.file === file).prompt;
  for (const [file, title] of WALK_HEROES) {
    for (const f of WALK_FRAMES) {
      out.push({ batch: 'walk', cat: 'chars', file: file + f.suffix, title: `${title} — ${f.title}`, kind: 'edit', base: file, size: '1024x1024',
        prompt: WALK_EDIT(f.pose), full: `${charPrompt(file)} Walking pose: ${f.pose}.` });
    }
  }
  // пролог: друзья Лёвы и их машины — после кадров ходьбы
  const pro = (o) => out.push(Object.assign({ batch: 'prologue' }, o));
  for (const [file, title, desc, damage] of PRO_VEHICLES) {
    const base = `${ASSET_STYLE.common} ${ASSET_STYLE.vehicle} ${desc} ${ASSET_STYLE.isolated}`;
    pro({ cat: 'vehicles', file, title, kind: 'new', size: '768x1024', prompt: base });
    if (damage) for (const st of DAMAGE_STAGES) pro({ cat: 'vehicles', file: file + st.suffix, title: `${title} — ${st.title}`, kind: 'edit', base: file, size: '768x1024', prompt: st.prompt, full: `${base} ${st.prompt.replace(/^Edit the previous image of this exact vehicle\. Keep EXACTLY the same [^.]*\. /, '')}` });
  }
  for (const [file, title, desc] of PRO_PROPS) pro({ cat: 'props', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common} ${desc} ${ASSET_STYLE.isolated}` });
  for (const [file, title, who, , bg] of PRO_PEOPLE) pro({ cat: 'portraits', file: 'portrait_' + file, title: `Портрет: ${title}`, kind: 'new', size: '1024x1024', ref: true, prompt: `${ASSET_STYLE.portrait} ${who} ${REF_PHOTO} ${bg}` });
  for (const [file, title, , clothes] of PRO_PEOPLE) pro({ cat: 'chars', file, title, kind: 'new', size: '1024x1024', ref: true, prompt: `${ASSET_STYLE.common} ${ASSET_STYLE.person} A man wearing ${clothes}. ${REF_PHOTO.replace('face, ', '')} ${ASSET_STYLE.isolated}` });
  // банды — в самом конце
  const gang = (o) => out.push(Object.assign({ batch: 'gangs' }, o));
  const gangCar = (file, title, desc) => {
    const base = `${ASSET_STYLE.common.replace('no text, no logos', 'no text')} ${ASSET_STYLE.vehicle.replace('generic design without any real brand badges or logos', 'no real brand badges')} ${GANG_CAR_STYLE} ${desc} ${ASSET_STYLE.isolated}`;
    gang({ cat: 'vehicles', file, title, kind: 'new', size: '768x1024', prompt: base });
    for (const st of DAMAGE_STAGES) gang({ cat: 'vehicles', file: file + st.suffix, title: `${title} — ${st.title}`, kind: 'edit', base: file, size: '768x1024', prompt: st.prompt, full: `${base} ${st.prompt.replace(/^Edit the previous image of this exact vehicle\. Keep EXACTLY the same [^.]*\. /, '')}` });
  };
  for (const [file, title, desc] of GANG_VEHICLES) gangCar(file, title, desc);
  for (const [file, title, desc] of GANG_PROPS) gang({ cat: 'props', file, title, kind: 'new', size: '1024x1024', prompt: `${ASSET_STYLE.common} ${desc} ${ASSET_STYLE.isolated}` });
  for (const [file, title, list] of WEAPON_CHARS) {
    const desc = CHAR_ASSETS.find((c) => c[0] === file)[2];
    for (const w of list) {
      gang({ cat: 'chars', file: file + '_' + w, title: `${title} ${WEAPON_NAME[w]}`, kind: 'edit', base: file, size: '1024x1024', prompt: WEAPON_EDIT(WEAPON_POSE[w]),
        full: `${ASSET_STYLE.common} ${ASSET_STYLE.person.replace(', arms relaxed', ', ' + WEAPON_POSE[w])} ${desc} ${ASSET_STYLE.isolated}` });
    }
  }
  // машины «Львов» и иранцев в карикатурном виде — после всего остального
  for (const [file, title, desc] of GANG_VEHICLES2) gangCar(file, title, desc);
  // убитые: правка готового спрайта каждого вида людей (кроме кошки) — в самом конце, после «Фолькса»
  const deadList = out.filter((a) => a.cat === 'chars' && a.kind === 'new' && a.file !== 'cat' && !/_(gun|bat|uzi|ak|rpg|shotgun)$/.test(a.file));
  const deadLater = deadList.map((a) => ({ batch: 'dead', cat: 'chars', file: a.file + '_dead', title: `${a.title} — убитый`, kind: 'edit', base: a.file, size: '1024x1024', refFile: `ref_${a.file}.png`,
    prompt: DEAD_EDIT(`ref_${a.file}.png`, a.title), full: `${a.prompt.replace(ASSET_STYLE.person, DEAD_POSE).replace(/ ?Base the [^.]*recognizable\./, ' Same face and build as the existing sprite of this character.')}` }));
  // «Фолькс» Лёвы — после всего остального
  for (const [file, title, desc] of LEVA_CAR) {
    const base = `${ASSET_STYLE.common} ${ASSET_STYLE.vehicle} ${desc} ${ASSET_STYLE.isolated}`;
    out.push({ batch: 'leva', cat: 'vehicles', file, title, kind: 'new', size: '768x1024', prompt: base });
    for (const st of DAMAGE_STAGES) out.push({ batch: 'leva', cat: 'vehicles', file: file + st.suffix, title: `${title} — ${st.title}`, kind: 'edit', base: file, size: '768x1024', prompt: st.prompt, full: `${base} ${st.prompt.replace(/^Edit the previous image of this exact vehicle\. Keep EXACTLY the same [^.]*\. /, '')}` });
  }
  out.push(...deadLater);
  // текстуры моделей — в самом конце
  for (const [file, title, desc] of MODEL_TEXTURES) out.push({ batch: 'modeltex', cat: 'textures', file, title: `Текстура модели: ${title}`, kind: 'new', size: '1024x1024', prompt: `${MODEL_TEX_STYLE} ${desc}` });
  // новости 34-го канала (js/news.js) — после текстур
  for (const [file, title, desc, ref] of NEWS_PORTRAITS) out.push({ batch: 'news', cat: 'portraits', file, title, kind: 'new', size: '1024x1024', ref: !!ref, prompt: `${ASSET_STYLE.portrait} ${desc}${ref ? ' ' + REF_PHOTO : ''}` });
  // текстуры моделей, добавленные позже (новые — только в конец этого списка)
  for (const [file, title, desc] of MODEL_TEXTURES_LATE) out.push({ batch: 'modeltex', cat: 'textures', file, title: `Текстура модели: ${title}`, kind: 'new', size: '1024x1024', prompt: `${MODEL_TEX_STYLE} ${desc}` });
  return out;
})();

// Что игра пытается загрузить из assets/gen/
const GEN_FILES = { textures: [], chars: [], vehicles: [], props: [], facades: [], portraits: [] };
for (const a of ASSET_MANIFEST) GEN_FILES[a.cat].push(a.file);

if (typeof module !== 'undefined') module.exports = { ASSET_MANIFEST, ASSET_STYLE, DAMAGE_STAGES, HOUSE_VARIANTS };
