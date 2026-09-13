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
const skills = readJson('learner/skills.json');
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
  fehler: r.fehler || [], hoeren: r.hoeren || {}, umfrage: r.umfrage || {},
  koennen: r.koennen || {}
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
const WEAK = { grammar: 'Grammatik', vocab: 'Wortschatz', reading: 'Lesetext', listening: 'Hörverstehen' };
if (u.weakest && WEAK[u.weakest]) {
  prefs.notes.unshift({ datum: r.datum, sprache: r.sprache, wacklig: WEAK[u.weakest] });
  prefs.notes = prefs.notes.slice(0, 12);
}
const MORE = { deepen: 'gleiches Thema vertiefen', same: 'gleiches Thema, anderer Inhalt', new: 'etwas Neues' };
if (u.more && MORE[u.more]) {
  prefs.notes.unshift({ datum: r.datum, sprache: r.sprache, naechstesMal: MORE[u.more] });
  prefs.notes = prefs.notes.slice(0, 12);
}
// Hörniveau nachsteuern
if (r.hoeren?.selbsteinschaetzung !== null && r.hoeren?.selbsteinschaetzung !== undefined) {
  const f = r.hoeren.folge || {};
  profile.languages[r.sprache].hoeren = {
    zuletzt: f.quelle || null, folge: f.titel || null,
    verstaendnis: r.hoeren.selbsteinschaetzung, datum: r.datum
  };
}
profile.updatedAt = today();

/* --- Fertigkeitsprofil: gleitender Mittelwert, neue Daten zaehlen mehr --- */
const skillMoves = [];
const bucket = skills[r.sprache];
for (const [name, v] of Object.entries(r.koennen || {})) {
  if (!v || !v.total) continue;
  const q = v.right / v.total;
  const cur = bucket[name];
  const next = cur
    ? { wert: Math.round((cur.wert * 0.55 + q * 0.45) * 100) / 100,
        geprueft: cur.geprueft + v.total,
        verlauf: [...(cur.verlauf || []), { datum: r.datum, q: Math.round(q * 100) / 100, n: v.total }].slice(-10) }
    : { wert: Math.round(q * 100) / 100, geprueft: v.total, verlauf: [{ datum: r.datum, q: Math.round(q * 100) / 100, n: v.total }] };
  skillMoves.push({ name, von: cur ? cur.wert : null, nach: next.wert, n: v.total });
  bucket[name] = next;
}
if (r.hoeren?.selbsteinschaetzung) {
  const q = (r.hoeren.selbsteinschaetzung - 1) / 4;
  const cur = bucket.hoeren;
  bucket.hoeren = cur
    ? { wert: Math.round((cur.wert * 0.55 + q * 0.45) * 100) / 100, geprueft: cur.geprueft + 1,
        verlauf: [...(cur.verlauf || []), { datum: r.datum, q: Math.round(q * 100) / 100, n: 1 }].slice(-10) }
    : { wert: Math.round(q * 100) / 100, geprueft: 1, verlauf: [{ datum: r.datum, q: Math.round(q * 100) / 100, n: 1 }] };
  skillMoves.push({ name: 'hoeren', von: cur ? cur.wert : null, nach: bucket.hoeren.wert, n: 1 });
}
skills.updatedAt = today();

writeJson('learner/skills.json', skills);
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
if (r.hoeren?.folge?.titel) console.log(`  ${col.dim('Gehört: „' + r.hoeren.folge.titel + '“ (' + (r.hoeren.folge.quelle || '?') + ')')}`);
if (skillMoves.length) {
  console.log('');
  console.log(col.b('  Koennensprofil'));
  const LBL = { verstehen: 'Text verstehen', erkennen: 'Formen erkennen',
                produzieren: 'Selbst produzieren', wortschatz: 'Wortschatz', hoeren: 'Hoerverstehen' };
  for (const m of skillMoves) {
    const pfeil = m.von === null ? col.dim('neu') : m.nach > m.von ? col.green('↑') : m.nach < m.von ? col.red('↓') : col.dim('→');
    const bar = '█'.repeat(Math.round(m.nach * 12)).padEnd(12, '·');
    console.log(`    ${pfeil} ${(LBL[m.name] || m.name).padEnd(18)} ${bar} ${Math.round(m.nach * 100)}%`);
  }
}

console.log('');
console.log(col.green('  Gespeichert. `npm run plan` und `npm run profil` zeigen den neuen Stand.'));
console.log('');
