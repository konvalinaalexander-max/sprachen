#!/usr/bin/env node
/* Nimmt den Bericht aus der App entgegen und schreibt den Lernstand fort.

   node tools/report.mjs inbox/bericht-es-....json
   ... oder den kopierten Text einfach reinpipen:
   pbpaste | node tools/report.mjs -

   Aktualisiert: learner/history.json, learner/curriculum.json, learner/profile.json */
import { readFileSync } from 'node:fs';
import { readJson, writeJson, loadLessons, today, col, rule } from './lib.mjs';

const arg = process.argv[2];
if (!arg) {
  console.error('Aufruf: node tools/report.mjs <datei|->');
  process.exit(1);
}
const raw = arg === '-' ? readFileSync(0, 'utf8') : readFileSync(arg, 'utf8');

// Die App stellt eine Kopfzeile voran – die JSON-Klammer suchen wir uns.
const start = raw.indexOf('{');
if (start === -1) { console.error(col.red('Kein JSON im Bericht gefunden.')); process.exit(1); }
let r;
try { r = JSON.parse(raw.slice(start)); }
catch (e) { console.error(col.red('Bericht ist kein gültiges JSON: ') + e.message); process.exit(1); }
if (r.bericht !== 'lerneinheit') { console.error(col.red('Das sieht nicht nach einem Lernbericht aus.')); process.exit(1); }

const history = readJson('learner/history.json');
const curriculum = readJson('learner/curriculum.json');
const profile = readJson('learner/profile.json');
const lesson = loadLessons().find((l) => l.id === r.lektion);

console.log('');
rule('Bericht einlesen');
console.log(`  ${r.lektion}  ·  ${r.sprache.toUpperCase()} ${r.niveau}  ·  ${r.minuten} Min  ·  ${r.ergebnis.richtig}/${r.ergebnis.gesamt} richtig`);

/* --- Verlauf --- */
if (history.sessions.some((s) => s.lektion === r.lektion && s.datum === r.datum)) {
  console.log(col.yellow('  Für diesen Tag ist die Einheit schon erfasst – wird ersetzt.'));
  history.sessions = history.sessions.filter((s) => !(s.lektion === r.lektion && s.datum === r.datum));
}
history.sessions.push({
  datum: r.datum, lektion: r.lektion, titel: lesson?.title || null, sprache: r.sprache,
  niveau: r.niveau, minuten: r.minuten, ergebnis: r.ergebnis, grammatik: r.grammatik || {},
  fehler: r.fehler || [], hoeren: r.hoeren || {}, umfrage: r.umfrage || {}
});
history.sessions.sort((a, b) => (a.datum < b.datum ? 1 : -1));

/* --- Leitner-Boxen --- */
const items = curriculum[r.sprache].items;
const touched = new Set(Object.keys(r.grammatik || {}));
// Themen, die in der Lektion erklärt, aber nicht abgefragt wurden, zählen als "gesehen"
(lesson?.intro?.grammar || []).forEach((g) => g.id && touched.add(g.id));

const moves = [];
for (const id of touched) {
  const it = items.find((i) => i.id === id);
  if (!it) { console.log(col.yellow(`  Unbekanntes Thema im Bericht: ${id}`)); continue; }
  const g = r.grammatik?.[id];
  const acc = g && g.total ? g.right / g.total : null;
  const before = it.box;

  if (acc === null) {
    it.box = Math.max(it.box, 1);
    it.status = it.status === 'neu' ? 'gesehen' : it.status;
  } else if (acc >= 0.8) {
    it.box = Math.min(curriculum.intervalsDays.length - 1, it.box + 1);
    it.status = it.box >= 3 ? 'gefestigt' : 'gesehen';
  } else if (acc >= 0.5) {
    it.status = 'gesehen';
  } else {
    it.box = Math.max(0, it.box - 1);
    it.status = 'wacklig';
  }

  it.seen += 1;
  it.lastSeen = r.datum;
  it.accuracy = acc === null ? it.accuracy
    : it.accuracy === null ? acc
    : Math.round((it.accuracy * 0.4 + acc * 0.6) * 100) / 100;
  it.history.push({ datum: r.datum, richtig: g?.right ?? null, gesamt: g?.total ?? null });
  moves.push({ name: it.name, before, after: it.box, acc, status: it.status });
}
curriculum.updatedAt = today();

/* --- Vorlieben nachziehen --- */
const u = r.umfrage || {};
const prefs = profile.preferences;
if (u.difficulty) {
  // 1 = viel zu leicht, 5 = viel zu schwer  →  Bias in die Gegenrichtung
  const delta = u.difficulty <= 2 ? 1 : u.difficulty >= 4 ? -1 : 0;
  prefs.difficultyBias = Math.max(-2, Math.min(2, (prefs.difficultyBias || 0) + delta));
}
if (u.wish && String(u.wish).trim()) {
  prefs.notes.unshift({ datum: r.datum, sprache: r.sprache, wunsch: String(u.wish).trim() });
  prefs.notes = prefs.notes.slice(0, 12);
}
if (u.weakest && u.weakest !== 'Nichts davon') {
  prefs.notes.unshift({ datum: r.datum, sprache: r.sprache, wacklig: u.weakest });
  prefs.notes = prefs.notes.slice(0, 12);
}
// Hörniveau nachsteuern
if (r.hoeren?.selbsteinschaetzung !== null && r.hoeren?.selbsteinschaetzung !== undefined) {
  const langMeta = profile.languages[r.sprache];
  langMeta.hoeren = { zuletzt: r.hoeren.quelle || null, verstaendnis: r.hoeren.selbsteinschaetzung, datum: r.datum };
}
profile.updatedAt = today();

writeJson('learner/history.json', history);
writeJson('learner/curriculum.json', curriculum);
writeJson('learner/profile.json', profile);

console.log('');
console.log(col.b('  Lehrplan angepasst'));
moves.forEach((m) => {
  const arrow = m.after > m.before ? col.green('↑') : m.after < m.before ? col.red('↓') : col.dim('→');
  const q = m.acc === null ? col.dim('nur erklärt') : Math.round(m.acc * 100) + '%';
  console.log(`    ${arrow} ${m.name}  ${col.dim(`Box ${m.before}→${m.after}, ${q}, ${m.status}`)}`);
});
if (u.difficulty) console.log(`  ${col.dim('Schwierigkeits-Bias jetzt: ' + prefs.difficultyBias)}`);
if (u.wish) console.log(`  ${col.dim('Wunsch notiert: „' + u.wish + '“')}`);
console.log('');
console.log(col.green('  Gespeichert. `npm run plan` zeigt jetzt den neuen Stand.'));
console.log('');
