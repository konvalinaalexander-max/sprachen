#!/usr/bin/env node
/* Hält die drei erzeugten Dateien auf Stand:
     lessons/manifest.js     – Inhaltsverzeichnis für die App
     learner/profile.js      – Profil als Script (damit es auch über file:// lädt)
     sw.js                   – Vorladeliste des Service Workers
   Mit --check wird nur verglichen (für CI), ohne zu schreiben. */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { loadLessons, readJson, p, col, rule } from './lib.mjs';

const checkOnly = process.argv.includes('--check');
const changed = [];

function put(rel, content) {
  const abs = p(rel);
  const old = existsSync(abs) ? readFileSync(abs, 'utf8') : null;
  if (old === content) return;
  changed.push(rel);
  if (!checkOnly) writeFileSync(abs, content);
}

/* --- Inhaltsverzeichnis --- */
const lessons = loadLessons().sort((a, b) => (a.date === b.date ? a.lang.localeCompare(b.lang) : (a.date < b.date ? 1 : -1)));
const entries = lessons.map((l) => ({
  id: l.id, lang: l.lang, level: l.level, date: l.date,
  title: l.title, subtitle: l.subtitle || '',
  minutes: l.minutes || 35,
  grammar: (l.intro?.grammar || []).map((g) => g.id),
  file: l._file,
  /* Ändert sich mit jeder Bearbeitung der Datei – ein alter Spielstand passt dann nicht mehr */
  rev: createHash('sha1').update(readFileSync(p(l._file))).digest('hex').slice(0, 10)
}));

put('lessons/manifest.js',
  '/* Erzeugt von tools/build-manifest.mjs – nicht von Hand ändern. */\n' +
  'LEKTION.manifest(' + JSON.stringify(entries, null, 2) + ');\n');

/* --- Profil fürs Frontend --- */
const profile = readJson('learner/profile.json');
delete profile._doc;
put('learner/profile.js',
  '/* Erzeugt von tools/build-manifest.mjs aus learner/profile.json. */\n' +
  'LEKTION.profile = ' + JSON.stringify(profile, null, 2) + ';\n');

/* --- Vorladeliste des Service Workers --- */
const shell = ['./', './index.html', './app.webmanifest',
  './assets/css/app.css', './assets/icons/icon.svg',
  './assets/js/core.js', './assets/js/i18n.js', './assets/js/audio.js', './assets/js/tasks.js',
  './assets/js/stations.js', './assets/js/app.js',
  './learner/profile.js', './lessons/manifest.js'];
const list = shell.concat(lessons.map((l) => './' + l._file));
const sw = readFileSync(p('sw.js'), 'utf8');
const block = '/* PRECACHE:BEGIN - von tools/build-manifest.mjs erzeugt, nicht von Hand ändern */\n' +
  'const PRECACHE = ' + JSON.stringify(list, null, 2) + ';\n' +
  '/* PRECACHE:END */';
const nextSw = sw.replace(/\/\* PRECACHE:BEGIN[\s\S]*?PRECACHE:END \*\//, block);
if (nextSw === sw && !sw.includes('PRECACHE:BEGIN')) {
  console.error(col.red('sw.js: Markierungen PRECACHE:BEGIN/END fehlen.'));
  process.exit(1);
}
put('sw.js', nextSw);

console.log('');
rule('Bauen');
console.log(`  ${entries.length} Lektion(en) im Verzeichnis, ${list.length} Dateien im Offline-Vorrat`);
if (!changed.length) console.log(col.green('  Nichts zu tun – alles aktuell.'));
else if (checkOnly) {
  console.log(col.red('  Nicht aktuell: ' + changed.join(', ')));
  console.log(col.dim('  Bitte `npm run build` ausführen.'));
  console.log('');
  process.exit(1);
} else changed.forEach((f) => console.log('  ' + col.green('geschrieben ') + f));
console.log('');
