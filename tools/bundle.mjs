#!/usr/bin/env node
/* Presst die ganze App in eine einzige HTML-Datei: sprachen.html
   Doppelklick genügt – kein Ordner, kein Server, kein Internet.
   Das ist die Datei, die Alexander im Chat bekommt. */
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { loadLessons, p, col, rule } from './lib.mjs';

const esc = (js) => String(js).replace(/<\/script/gi, '<\\/script');

const css = readFileSync(p('assets/css/app.css'), 'utf8');
const icon = readFileSync(p('assets/icons/icon.svg'), 'utf8');
const iconUri = 'data:image/svg+xml;base64,' + Buffer.from(icon, 'utf8').toString('base64');

const scripts = [
  'assets/js/core.js',
  'assets/js/tasks.js',
  'assets/js/stations.js',
  'learner/profile.js',
  'lessons/manifest.js'
];
for (const l of loadLessons()) scripts.push(l._file);
scripts.push('assets/js/app.js');

let html = readFileSync(p('index.html'), 'utf8');

// Externe Verweise raus, Inhalte rein
html = html.replace(/[ \t]*<link rel="manifest"[^>]*>\n?/, '');
html = html.replace(/[ \t]*<link rel="icon"[^>]*>\n?/, `<link rel="icon" href="${iconUri}" type="image/svg+xml">\n`);
html = html.replace(/[ \t]*<link rel="apple-touch-icon"[^>]*>\n?/, '');
html = html.replace(/[ \t]*<link rel="stylesheet" href="assets\/css\/app.css">\n?/,
  '<style>\n' + css + '\n</style>\n');

const inlined = scripts.map((f) => {
  const body = readFileSync(p(f), 'utf8');
  return '<script>/* ' + f + ' */\n' + esc(body) + '</script>';
}).join('\n');

// Alle einzelnen <script src="…"> durch den einen Block ersetzen
html = html.replace(/<script src="[^"]+"><\/script>\s*/g, '');
html = html.replace('</body>',
  '<script>window.LEKTION = { standalone: true };</script>\n' + inlined + '\n</body>');

html = html.replace('<title>Sprachen</title>',
  '<title>Sprachen</title>\n<!-- Eine Datei, alles drin. Erzeugt von tools/bundle.mjs – Änderungen hier gehen beim nächsten Bauen verloren. -->');

writeFileSync(p('sprachen.html'), html);
const kb = Math.round(statSync(p('sprachen.html')).size / 1024);

console.log('');
rule('Bündeln');
console.log(`  sprachen.html  ${col.green(kb + ' KB')}  ·  ${scripts.length} Skripte + Stylesheet + Symbol eingebettet`);
console.log(col.dim('  Doppelklick genügt. Keine weiteren Dateien nötig.'));
console.log('');
