// Все тексты игры в одном файле для вычитки — и обратно в код.
//   node tools/texts.js export [файл]   — собрать TEXTS.md (по умолчанию)
//   node tools/texts.js apply <файл>    — внести правки из отредактированной копии
// Каждая строка файла: [метка] текст. Правки сравниваются с TEXTS.md из
// репозитория, а место в коде ищется по старому тексту рядом с меткой —
// поэтому они встают на место, даже если код с тех пор сдвинулся.
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SOURCES = [
  ['index.html', 'Титульный экран и меню'],
  ['js/missions.js', 'Сюжет: миссии и диалоги'],
  ['js/chapter1.js', 'Сюжет: перебивки и глава 1 «Одесса»'],
  ['js/prologue.js', 'Сюжет: миссии пролога с друзьями (Семён, Дима, Данис)'],
  ['js/news.js', 'Новости 34-го канала: корреспондент Сергей Аусбендер'],
  ['js/story.js', 'Сюжет: общие подсказки'],
  ['js/jobs.js', 'Подработки: «Шмоне-Бис» и такси'],
  ['js/factions.js', 'Фракции'],
  ['js/police.js', 'Полиция и розыск'],
  ['js/game.js', 'Сообщения и подсказки в игре'],
  ['js/hud.js', 'Интерфейс'],
  ['js/navmap.js', 'Карта города (M)'],
  ['js/shops.js', 'Оружейные'],
  ['js/entities.js', 'Персонажи, оружие, предметы'],
  ['js/people.js', 'Люди'],
  ['js/map.js', 'Город: районы, места, вывески'],
  ['js/facades.js', 'Вывески и надписи на домах'],
  ['js/vehicles.js', 'Машины'],
  ['js/audio.js', 'Радио'],
  ['js/textures.js', 'Текстуры'],
  ['js/render3d.js', '3D-графика'],
];
const LETTERS = /[А-Яа-яЁё֐-׿]/;

// Строковые литералы JS (с учётом комментариев, шаблонов и регулярных выражений)
function jsStrings(src) {
  const out = [];
  let i = 0, line = 1, prev = '';
  const n = src.length;
  function readString(q) {
    const start = i, sl = line;
    i++;
    let raw = '';
    while (i < n && src[i] !== q) {
      if (src[i] === '\\') { raw += src[i] + src[i + 1]; i += 2; continue; }
      if (src[i] === '\n') line++;
      raw += src[i++];
    }
    i++;
    out.push({ q, raw, line: sl, start, end: i });
  }
  function readTemplate() {
    const start = i, sl = line;
    i++;
    let raw = '';
    while (i < n && src[i] !== '`') {
      if (src[i] === '\\') { raw += src[i] + src[i + 1]; i += 2; continue; }
      if (src[i] === '$' && src[i + 1] === '{') {
        // выражение внутри шаблона: ищем парную скобку, пропуская вложенные строки
        let depth = 1, j = i + 2;
        while (j < n && depth) {
          const c = src[j];
          if (c === "'" || c === '"') { j++; while (j < n && src[j] !== c) j += src[j] === '\\' ? 2 : 1; }
          else if (c === '`') { j++; while (j < n && src[j] !== '`') j += src[j] === '\\' ? 2 : 1; }
          else if (c === '{') depth++;
          else if (c === '}') depth--;
          j++;
        }
        raw += src.slice(i, j);
        i = j;
        continue;
      }
      if (src[i] === '\n') line++;
      raw += src[i++];
    }
    i++;
    out.push({ q: '`', raw, line: sl, start, end: i });
  }
  while (i < n) {
    const c = src[i];
    if (c === '\n') { line++; i++; continue; }
    if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); for (let k = i; k < e; k++) if (src[k] === '\n') line++; i = e + 2; continue; }
    if (c === "'" || c === '"') { readString(c); prev = 'a'; continue; }
    if (c === '`') { readTemplate(); prev = 'a'; continue; }
    if (c === '/' && (prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev))) {
      // регулярное выражение
      i++;
      let cls = false;
      while (i < n && (cls || src[i] !== '/')) { if (src[i] === '\\') i++; else if (src[i] === '[') cls = true; else if (src[i] === ']') cls = false; i++; }
      i++;
      while (/[a-z]/.test(src[i])) i++;
      prev = 'a';
      continue;
    }
    if (!/\s/.test(c)) prev = /[\w$)\]]/.test(c) ? 'a' : c;
    i++;
  }
  return out;
}

// Показ строки: экранирование \' и \" снимаем, ${выражение} → {выражение}
const show = (s) => (s.q === '`' ? s.raw.replace(/\$\{/g, '{') : s.raw).replace(/\\(['"`])/g, '$1');

function collect() {
  const entries = [];
  for (const [file, title] of SOURCES) {
    const src = fs.readFileSync(path.join(root, file), 'utf8');
    const short = path.basename(file).replace(/\.\w+$/, '');
    const list = [];
    if (file.endsWith('.html')) {
      // текст между тегами (в том числе многострочный абзац) и подписи в атрибутах
      const body = src.replace(/<(script|style)[\s\S]*?<\/\1>/g, (m) => m.replace(/[^\n]/g, ' '));
      const lineAt = (k) => src.slice(0, k).split('\n').length;
      for (const m of body.matchAll(/>([^<>]+)</g)) {
        if (LETTERS.test(m[1])) list.push({ q: 'html', raw: m[1], line: lineAt(m.index + 1 + m[1].search(/\S/)) });
      }
      for (const m of body.matchAll(/(?:title|placeholder|alt)="([^"]+)"/g)) {
        if (LETTERS.test(m[1])) list.push({ q: 'html', raw: m[1], line: lineAt(m.index) });
      }
      list.sort((a, b) => a.line - b.line);
    } else {
      // имена говорящих в диалогах: const ITZIK = 'Ицик «Фалафель»'
      const names = {};
      for (const m of src.matchAll(/^const ([A-Z_]+) = '([^']+)';/gm)) names[m[1]] = m[2];
      for (const s of jsStrings(src)) {
        if (!LETTERS.test(s.raw)) continue;
        const before = src.slice(Math.max(0, s.start - 40), s.start);
        const who = before.match(/\[\s*([A-Z_]+)\s*,\s*$/);
        s.who = who && names[who[1]];
        s.title = /title:\s*$/.test(before) && file === 'js/missions.js' && /^\s{4}title:/m.test(src.slice(src.lastIndexOf('\n', s.start), s.start + 1));
        list.push(s);
      }
    }
    const perLine = {};
    for (const s of list) {
      const k = (perLine[s.line] = (perLine[s.line] || 0) + 1);
      s.id = `${short}:${s.line}${k > 1 ? '.' + k : ''}`;
      s.file = file;
      s.text = s.q === 'html' ? s.raw.replace(/\s+/g, ' ').trim() : show(s);
    }
    entries.push({ file, title, list });
  }
  return entries;
}

function exportTexts(out) {
  const groups = collect();
  const rev = require('child_process').execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
  let md = `# Все тексты игры «ХАМСИН» — на вычитку

Собрано из кода (версия ${rev}): \`node tools/texts.js export\`.

## Как править

* Каждая строка — \`[метка] текст\`. Меняйте только текст после метки.
  Метку не трогайте: по ней правка найдёт место в игре.
* Фрагменты в фигурных скобках — \`{name}\`, \`{formatMoney(x)}\` и т.п. —
  игра подставляет сама (имя, сумму, число). Их можно переставить внутри
  фразы, но не переименовывать и не удалять.
* \`\\n\` — перенос строки.
* Чтобы оставить комментарий, а не правку, начните строку с \`>\` под
  нужной строкой, например: \`> слишком длинно, сократить\`.
* Строки не удаляйте и не добавляйте — если реплика лишняя, напишите это
  комментарием.
* Иврит в вывесках и «слове дня» тоже можно поправить.

`;
  let total = 0;
  for (const g of groups) {
    if (!g.list.length) continue;
    md += `\n## ${g.title}\n\n`;
    let mission = 0;
    for (const s of g.list) {
      if (s.title) md += `\n### Миссия ${++mission}. ${s.text}\n\n`;
      md += `[${s.id}]${s.who ? ' ' + s.who + ':' : ''} ${s.text}\n`;
      total++;
    }
  }
  fs.writeFileSync(out, md);
  console.log(`Готово: ${total} строк → ${path.relative(process.cwd(), out)}`);
}

// Обратно: код ← текст. Шаблонные {x} возвращаются в ${x}, кавычки экранируются.
function encode(s, text) {
  if (s.q === 'html') return s.raw.match(/^\s*/)[0] + text + s.raw.match(/\s*$/)[0];
  let t = text;
  if (s.q === '`') t = t.replace(/(^|[^$])\{/g, '$1${');
  t = t.replace(new RegExp(`(?<!\\\\)${s.q === '`' ? '`' : s.q}`, 'g'), '\\' + s.q);
  return t;
}

// Сравниваем отредактированный файл с исходным TEXTS.md из репозитория и
// ищем изменённые строки в коде по старому тексту (ближайшую к метке).
function readTexts(text) {
  const map = {};
  for (const l of text.split('\n')) {
    const m = l.match(/^\[([\w-]+):(\d+)(?:\.\d+)?\] ?(.*)$/);
    if (m) map[l.slice(1, l.indexOf(']'))] = { short: m[1], line: +m[2], body: m[3] };
  }
  return map;
}

function applyTexts(file, baseFile) {
  // исходник для сравнения — TEXTS.md той версии, что указана в шапке файла
  const editedText = fs.readFileSync(file, 'utf8');
  const rev = (editedText.match(/версия ([0-9a-f]{7,40})/) || [])[1];
  let baseText = fs.readFileSync(baseFile, 'utf8');
  if (rev) {
    // в истории TEXTS.md ищем вариант с той же версией в шапке
    const git = (c) => require('child_process').execSync(c, { cwd: root }).toString();
    const found = git('git log --format=%H -- TEXTS.md').split('\n').filter(Boolean)
      .map((h) => git(`git show ${h}:TEXTS.md`)).find((t) => t.includes(`версия ${rev})`));
    if (found) baseText = found;
    else console.log(`! TEXTS.md версии ${rev} нет в истории — сравниваю с текущим`);
  }
  const base = readTexts(baseText), edited = readTexts(editedText);
  const all = collect().flatMap((g) => g.list);
  const changed = [], srcs = {};
  for (const [id, e] of Object.entries(edited)) {
    const b = base[id];
    if (!b) { console.log(`! неизвестная метка: ${id}`); continue; }
    if (b.body === e.body) continue;
    // кандидаты: тот же файл, тот же старый текст (вместе с именем говорящего)
    // (в старых файлах реплика могла идти без имени говорящего)
    const cands = all.filter((s) => path.basename(s.file).replace(/\.\w+$/, '') === b.short
      && (s.text === b.body || (s.who && `${s.who}: ${s.text}` === b.body)));
    if (!cands.length) { console.log(`! не найдено в коде (уже менялось?): ${id}`); continue; }
    cands.sort((x, y) => Math.abs(x.line - b.line) - Math.abs(y.line - b.line));
    const s = cands[0];
    let text = e.body;
    if (s.who && b.body !== s.text) {
      if (!text.startsWith(s.who + ': ')) { console.log(`! ${id}: имя говорящего меняется в его отдельной строке — пропущено`); continue; }
      text = text.slice(s.who.length + 2);
    }
    const src = srcs[s.file] || (srcs[s.file] = fs.readFileSync(path.join(root, s.file), 'utf8'));
    const from = s.q === 'html' ? s.raw : s.q + s.raw + s.q;
    const to = s.q === 'html' ? encode(s, text) : s.q + encode(s, text) + s.q;
    let off = 0;
    for (let k = 1; k < s.line; k++) off = src.indexOf('\n', off) + 1;
    // для HTML метка указывает на начало текста, литерал может начаться раньше
    const at = src.indexOf(from, s.q === 'html' ? Math.max(0, src.lastIndexOf('>', off)) : off);
    if (at < 0) { console.log(`! не найдено: ${id}`); continue; }
    srcs[s.file] = src.slice(0, at) + to + src.slice(at + from.length);
    changed.push(`${id}: ${s.text}\n   → ${text}`);
  }
  for (const [f, src] of Object.entries(srcs)) fs.writeFileSync(path.join(root, f), src);
  console.log(changed.join('\n') || 'Изменений нет');
  console.log(`\nИзменено строк: ${changed.length}`);
  const notes = editedText.split('\n').filter((l) => l.startsWith('>'));
  if (notes.length) console.log(`\nКомментарии (${notes.length}):\n${notes.join('\n')}`);
}

const [cmd, arg] = process.argv.slice(2);
if (cmd === 'apply') applyTexts(arg, path.join(root, 'TEXTS.md'));
else exportTexts(arg || path.join(root, 'TEXTS.md'));
