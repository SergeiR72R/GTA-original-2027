# Задание для Claude в Chrome: 10 песен для радио «Хамсин FM» (Gemini)

> Генерируем в **Gemini** (gemini.google.com, создание музыки) под аккаунтом
> пользователя 10 коротких песен на иврите в разных жанрах. Тексты — готовые,
> ниже. Песни — для радио «Хамсин FM · Новая волна» в бесплатной игре.

## Как делать

1. Открой gemini.google.com, новый чат. Включи создание музыки («Create music» /
   «Создать музыку» в инструментах), если он не включается сам от слов
   «Create a song».
2. Для каждой песни вставь **весь блок «Запрос»** из задания одним сообщением,
   ничего не меняя: там жанр, голос, темп и точный текст на иврите.
3. Дождись трека. Скачай его кнопкой загрузки: нужен **аудиофайл (MP3)**; если
   есть только видео (MP4) — скачай видео, звук вытащим сами.
4. Имя файла — из заголовка песни, например `radio_g01_hamsin.mp3`.
   Загрузи файл в папку Google Диска, куда кладёшь ассеты игры.
5. **Сначала только песня № 1 — и остановись.** Пользователь послушает, как
   Gemini поёт на иврите (иврита нет в официальном списке языков). Если
   произношение плохое — по его команде замени текст на транслитерацию
   латиницей (израильское произношение: kh для ח/כ, ts для צ) и попробуй снова.
   Дальше иди тем способом, который он одобрит.
6. Если Gemini предлагает сделать трек длиннее (продлить, «extend», полная
   версия) — соглашайся: длинная песня лучше. Если нет — оставляй 30 секунд.
7. Если Gemini переписал текст по-своему или запел на другом языке —
   сгенерируй ещё раз, добавив в начало: «Use exactly these Hebrew lyrics,
   do not translate or change them.» После двух неудач — сообщи и иди дальше.
8. Кончился лимит — остановись и напиши, на какой песне; продолжим позже.

---

## 1. «Хамсин» — мизрахи-поп · `radio_g01_hamsin`

> Хамсин, кондиционер умер; «кондиционера нет, зато есть любовь».

**Запрос:**
```
Create a song. Genre: Israeli Mizrahi pop, darbuka, oud, synth strings, Mediterranean dance groove, 100 bpm. Vocals: female singer, sung in Hebrew with a natural Israeli accent. Use exactly these Hebrew lyrics, do not translate or change them:

חמסין בעיר, האוויר עומד
המזגן מת והלב בוער
יאללה חביבי, בוא כבר לים
רק אתה ואני וכל תל אביב שם

חמסין, חמסין, חם לי בלב
אין לי מזגן, אבל יש לי אהבה
```

## 2. «Аялон» — рэп / трап · `radio_g02_ayalon`

> Пробка на Аялоне, «огромная парковка, я тут уже год».

**Запрос:**
```
Create a song. Genre: Israeli hip hop trap, heavy 808 bass, car horns, gritty and humorous, 90 bpm. Vocals: male rapper, rapping in Hebrew with a natural Israeli accent. Use exactly these Hebrew lyrics, do not translate or change them:

שמונה בבוקר, אני תקוע באיילון
המנוע רותח, הקפה כבר קר
כולם צופרים כאילו זה יעזור
ואני בנתיב של העם, סנטימטר לשעה

איילון, איילון, חניון ענק
איילון, איילון, אני פה כבר שנה
```

## 3. «Будет хорошо» — рок-баллада репатрианта · `radio_g03_yihye_tov`

> Приехал из Петербурга с одним чемоданом; «будет хорошо — только скажите когда».

**Запрос:**
```
Create a song. Genre: Israeli soft rock ballad, acoustic and electric guitars, warm and bittersweet, 80 bpm. Vocals: male singer, sung in Hebrew with a light Russian accent. Use exactly these Hebrew lyrics, do not translate or change them:

באתי מפטרבורג עם מזוודה אחת
מעיל של חורף בעיר בלי חורף
עברית של "בסדר" ושל "תודה רבה"

יהיה טוב, יהיה טוב, כולם פה אומרים
אני כבר מאמין, אני רק שואל
יהיה טוב — אבל תגידו לי מתי
```

## 4. «Шакшука» — регги · `radio_g04_shakshuka`

> Утро в Яффо, шакшука, никто не спешит: «мир подождёт».

**Запрос:**
```
Create a song. Genre: Israeli reggae, offbeat guitar skank, warm bass, relaxed beach vibe, 75 bpm. Vocals: relaxed male singer, sung in Hebrew with a natural Israeli accent. Use exactly these Hebrew lyrics, do not translate or change them:

בוקר ביפו, הים כחול
שקשוקה במחבת, פיתה ביד
ואף אחד פה לא ממהר לשום מקום

שקשוקה, שקשוקה, לאט לאט
אל תלחץ, אחי, העולם מחכה
שקשוקה, שקשוקה, החיים זה פה
```

## 5. «Ротшильд» — синти-поп · `radio_g05_rothschild`

> Самокаты, капучино, три стартапа; «Тель-Авив — пузырь света».

**Запрос:**
```
Create a song. Genre: Israeli synth-pop, 80s synths, punchy drums, night-city vibe, upbeat, 118 bpm. Vocals: female singer, sung in Hebrew with a natural Israeli accent. Use exactly these Hebrew lyrics, do not translate or change them:

שדרות רוטשילד, קורקינטים חשמליים
קפה הפוך ושלושה סטארטאפים
כולם פה מנכ"לים, אף אחד לא ישן

תל אביב, תל אביב, בועה של אור
שכר דירה בשמיים, הלב על הרצפה
תל אביב, תל אביב, אני שלך הלילה
```

## 6. «Одесса» — шансон на иврите · `radio_g06_odessa`

> Ресторан в Рамат-Гане, дядя из Одессы: «не задавай вопросов, ешь и молчи».

**Запрос:**
```
Create a song. Genre: Russian chanson style ballad, accordion, acoustic guitar, restaurant atmosphere, waltz feel. Vocals: husky male singer, sung in Hebrew with a heavy Russian accent. Use exactly these Hebrew lyrics, do not translate or change them:

במסעדה ברמת גן, וודקה על השולחן
הדוד שלי מאודסה, הוא מכיר את כולם
אל תשאל שאלות, תאכל ותשתוק

אודסה, אודסה, הים שם אחר
אודסה, אודסה, אבל המחיר אותו מחיר
```

## 7. «Гондэр» — эфиопский грув · `radio_g07_gondar`

> От Гондэра до Лода; «эскиста в крови, юг — наш».

**Запрос:**
```
Create a song. Genre: Ethiopian-Israeli groove, ethio-jazz meets modern hip hop, pentatonic Ethiopian melody, krar, brass, bouncy rhythm, 105 bpm. Vocals: male singer in Hebrew with a group call-and-response. Use exactly these Hebrew lyrics, do not translate or change them:

מגונדר עד לוד, הדרך ארוכה
סבתא שרה באמהרית, אני עונה בעברית
וכשהמוזיקה מתחילה, אף אחד לא יושב

אסקיסטה! הכתפיים זזות
אסקיסטה! הקצב בדם
הדרום שלנו, השכונה שלנו
```

## 8. «Яффо» — восточный поп · `radio_g08_yafo`

> Порт Яффо, кофе с кардамоном; «море шепчет мне шалом, салям».

**Запрос:**
```
Create a song. Genre: Middle Eastern pop ballad, oud, qanun, darbuka, strings, warm and romantic, 95 bpm. Vocals: male singer, sung in Hebrew with a natural Israeli accent. Use exactly these Hebrew lyrics, do not translate or change them:

בנמל של יפו הדייגים חוזרים
ריח של קפה עם הל באוויר
והים לוחש לי שלום, סלאם

יפו, יפו, את הכי יפה בלילה
השעון במגדל עוצר בשבילך
יפו, יפו, הלב שלי נשאר אצלך
```

## 9. «Арнона» — панк · `radio_g09_arnona`

> Арнона, налоговая, «бланк! ещё бланк! печать! приходите во вторник!»

**Запрос:**
```
Create a song. Genre: Israeli punk rock, fast, distorted guitars, gang shouts, 180 bpm, angry but funny. Vocals: shouted male vocal in Hebrew with a natural Israeli accent. Use exactly these Hebrew lyrics, do not translate or change them:

ארנונה, ארנונה, עוד מכתב מהעירייה
התור בדואר הוא עד הרחוב
ואני רק רציתי לשלם חשבון!

טופס! טופס! עוד טופס אחד!
חותמת! חותמת! תחזור ביום שלישי!
```

## 10. «Хумус» — фанк / диско · `radio_g10_hummus`

> С фулем или с яйцом — каждый уверен, что у него лучший; «это не еда, это любовь».

**Запрос:**
```
Create a song. Genre: funky disco groove, slap bass, brass section, wah guitar, playful, 112 bpm. Vocals: female singer, sung in Hebrew with a natural Israeli accent. Use exactly these Hebrew lyrics, do not translate or change them:

חומוס עם פול, חומוס עם ביצה
כל אחד בטוח שאצלו הכי טוב
אבל כולם מנגבים עד הסוף

נגב, נגב, עם הפיתה עד הסוף
עם בצל, עם חריף, עם חמוצים בצד
חומוס, חומוס — זה לא אוכל, זה אהבה
```
