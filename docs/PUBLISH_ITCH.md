# Как выложить «ХАМСИН» на itch.io

Архив для загрузки собирается так (`index.html` — в корне архива, только файлы игры):

```
FILES=$(git ls-files | grep -vE "^(tools/|docs/|\.claude/|.*\.md$|\.gitignore|\.nojekyll|start\.(sh|bat))")
git archive --format=zip -o hamsin-itch.zip HEAD -- $FILES
```

## Шаги (≈ 10 минут)

1. На itch.io: меню профиля (справа вверху) → **Upload new project**.
2. **Title:** `ХАМСИН — Часть 1: Тель-Авив`. **Project URL:** `hamsin-tel-aviv`.
3. **Short description or tagline:** текст «Коротко» ниже (английский).
4. **Classification:** Games. **Kind of project:** **HTML**.
5. **Release status:** In development. **Pricing:** **No payments** (бесплатно).
6. **Uploads → Upload files:** `hamsin-itch.zip` → отметь **This file will be played in the browser**.
7. **Embed options:**
   - Viewport dimensions: **1280 × 720**;
   - **Fullscreen button** — включить;
   - Mobile friendly — выключить (нужна клавиатура);
   - Automatically start on page load — выключить (игра запускается по кнопке Run).
8. **Details:**
   - Description — текст ниже (можно все три языка подряд);
   - Genre: **Action**;
   - Tags: `top-down`, `open-world`, `driving`, `crime`, `satire`, `israel`, `tel-aviv`, `retro`, `3d`, `singleplayer`;
   - Languages: **Russian**, **Hebrew**;
   - Inputs: **Keyboard**, **Mouse**.
9. **Cover image:** `itch_cover_630x500.png`. **Screenshots:** `shot_*.png`.
10. **Visibility:** сначала **Draft** → Save → **View page** → нажми Run и проверь.
    Всё работает — поменяй на **Public** и сохрани.

Ссылка будет: `https://<твоё-имя-на-itch>.itch.io/hamsin-tel-aviv`.

Обновление: Edit game → Uploads → загрузи новый `hamsin-itch.zip` (старый удали).

## Тексты страницы

### Коротко (tagline, EN)

A satirical top-down crime game in Tel Aviv: a fresh immigrant from St. Petersburg, stolen cars, gangs, police chases and the khamsin.

### Описание (RU)

**ХАМСИН — Часть 1: Тель-Авив.** Криминальный экшен с видом сверху в духе
игр конца 90-х. Лёва Гольдман три дня назад прилетел из Петербурга: съёмная
«дира» во Флорентине, ₪ 500 в кармане и иврит на уровне «беседер». Доставка
еды, такси — а потом работа посерьёзнее у «Одессы», клана Аль-Бахар и «Львов
Гондэра».

- Тель-Авив: набережная, Шук а-Кармель, Яффо, Азриэли, Аялон, Рамат-Ган.
- Пролог и глава 1: миссии с погонями, перестрелками и выбором.
- Угоны, полиция, покраска, оружейные, подработка в такси и «Шмоне-Бис».
- Хамсин, шаббат, радио «Хамсин FM» с песнями на иврите.
- Русский и иврит. Бесплатно и навсегда.

Все персонажи и организации вымышлены; сатира — на всех по-доброму.

**Управление:** WASD — ходьба/руль, мышь или пробел — стрельба, F — сесть в
машину, E — действие, M — карта, R — радио, Esc — пауза.

### Description (EN)

**HAMSIN — Part 1: Tel Aviv.** A satirical top-down crime game inspired by
late-90s classics. Lyova Goldman just moved from St. Petersburg: a rented
flat in Florentin, ₪500 in his pocket and Hebrew at the "beseder" level. Food
delivery, taxi shifts — and then bigger jobs for rival gangs.

Steal cars, escape the police, repaint your ride, survive the khamsin heatwave
and listen to Hebrew songs on Hamsin FM. Russian and Hebrew interface. Free forever.

All characters and organizations are fictional.

### תיאור (HE)

**חמסין — חלק 1: תל אביב.** משחק פשע סאטירי במבט מלמעלה. ליובה גולדמן עלה
לפני שלושה ימים מסנט פטרבורג: דירה שכורה בפלורנטין, 500 ₪ בכיס ועברית ברמת
"בסדר". משלוחי אוכל, מונית — ואחר כך עבודות רציניות יותר אצל הכנופיות.

גונבים רכבים, בורחים מהמשטרה, צובעים את האוטו, שורדים את החמסין ומקשיבים
לשירים בעברית ברדיו "חמסין FM". ממשק ברוסית ובעברית. חינם, לתמיד.

כל הדמויות והארגונים בדויים.
