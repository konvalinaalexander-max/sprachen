#!/usr/bin/env node
/* Prüft jede Lektionsdatei, bevor sie in der App landet.
   Findet u.a. Belegzitate, die gar nicht im Text stehen – der häufigste Autorenfehler. */
import { loadLessons, readJson, col, rule, LANGS } from './lib.mjs';

const TYPES = ['choice', 'evidence', 'forge', 'transform', 'pairs', 'write'];
const errors = [];
const warns = [];

let lessons;
try {
  lessons = loadLessons();
} catch (e) {
  console.error(col.red('Lektion nicht ladbar: ') + e.message);
  process.exit(1);
}

const curriculum = readJson('learner/curriculum.json');
const knownGrammar = new Set(
  Object.keys(LANGS).flatMap((l) => curriculum[l].items.map((i) => i.id))
);

const ids = new Set();

for (const l of lessons) {
  const E = (m) => errors.push(`${l._file}: ${m}`);
  const W = (m) => warns.push(`${l._file}: ${m}`);

  for (const f of ['id', 'lang', 'level', 'date', 'title', 'intro', 'reading', 'tasks', 'listening']) {
    if (!l[f]) E(`Feld "${f}" fehlt`);
  }
  if (!l.id) continue;
  if (ids.has(l.id)) E(`doppelte id "${l.id}"`);
  ids.add(l.id);
  if (!LANGS[l.lang]) E(`unbekannte Sprache "${l.lang}"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(l.date || '')) E(`date muss YYYY-MM-DD sein, ist "${l.date}"`);
  if (l.id && !l.id.startsWith(l.lang + '-')) W(`id sollte mit "${l.lang}-" beginnen`);

  /* Einstieg */
  const grammar = l.intro?.grammar || [];
  if (!grammar.length) E('intro.grammar ist leer – ohne Erklärung keine Einheit');
  grammar.forEach((g, i) => {
    if (!g.id) E(`intro.grammar[${i}]: id fehlt`);
    else if (!knownGrammar.has(g.id)) E(`intro.grammar[${i}]: "${g.id}" steht nicht im Lehrplan (learner/curriculum.json)`);
    if (!g.name) E(`intro.grammar[${i}]: name fehlt`);
    if (!g.examples?.length) W(`intro.grammar[${i}] (${g.id}): keine Beispiele`);
  });
  const vocab = l.intro?.vocab || [];
  if (vocab.length < 6) W(`nur ${vocab.length} Vokabeln – 8 bis 14 sind der Richtwert`);
  vocab.forEach((v, i) => { if (!v.term || !v.de) E(`intro.vocab[${i}]: term/de fehlt`); });

  /* Lesetext */
  const paras = l.reading?.paragraphs || [];
  if (!paras.length) E('reading.paragraphs ist leer');
  const fullText = paras.map((p) => p.text).join(' ');
  const words = fullText.split(/\s+/).filter(Boolean).length;
  const limits = { A1: [80, 220], A2: [120, 320], B1: [200, 450], B2: [280, 600] };
  const lim = limits[l.level] || [100, 600];
  if (words < lim[0]) W(`Lesetext hat nur ${words} Wörter (Richtwert ${l.level}: ${lim[0]}–${lim[1]})`);
  if (words > lim[1]) W(`Lesetext hat ${words} Wörter – für ${l.level} eher lang (${lim[0]}–${lim[1]})`);
  paras.forEach((p, i) => { if (!p.de) W(`reading.paragraphs[${i}]: keine Übersetzung hinterlegt`); });
  (l.reading?.glossary || []).forEach((g, i) => {
    if (!fullText.toLowerCase().includes(String(g.term).toLowerCase()))
      E(`reading.glossary[${i}]: "${g.term}" kommt im Text gar nicht vor`);
  });

  /* Aufgaben */
  const tasks = l.tasks || [];
  if (tasks.length < 5) W(`nur ${tasks.length} Aufgaben – 6 bis 9 halten die Einheit bei ~35 Minuten`);
  const kinds = new Set(tasks.map((t) => t.type));
  if (kinds.size < 3) W(`nur ${kinds.size} verschiedene Aufgabentypen – wird schnell öde`);
  const hasComprehension = tasks.some((t) => t.type === 'evidence' || t.comprehension);
  if (!hasComprehension) W('keine Textverständnis-Aufgabe dabei');

  tasks.forEach((t, i) => {
    const T = (m) => E(`tasks[${i}] (${t.type}): ${m}`);
    if (!TYPES.includes(t.type)) return T(`unbekannter Typ – erlaubt: ${TYPES.join(', ')}`);
    if (!t.prompt) T('prompt fehlt');
    if (t.grammar && !knownGrammar.has(t.grammar)) T(`grammar "${t.grammar}" steht nicht im Lehrplan`);
    if (!t.grammar && t.type !== 'evidence' && t.type !== 'write')
      warns.push(`${l._file}: tasks[${i}] ohne grammar-Zuordnung – zählt nicht in die Wiederholungsplanung`);

    if (t.type === 'choice') {
      if (!Array.isArray(t.options) || t.options.length < 2) T('mindestens zwei options');
      if (typeof t.answer !== 'number' || !t.options?.[t.answer]) T('answer zeigt auf keine gültige Option');
      const missing = (t.options || []).filter((o) => typeof o === 'object' && !o.why).length;
      if (missing) warns.push(`${l._file}: tasks[${i}]: ${missing} Option(en) ohne Begründung "why"`);
      if (!t.explain && (t.options || []).every((o) => typeof o === 'string')) T('explain fehlt – ohne Erklärung kein Lerneffekt');
    }
    if (t.type === 'evidence') {
      if (!['richtig', 'falsch', 'unklar'].includes(t.verdict)) T('verdict muss richtig|falsch|unklar sein');
      if (t.verdict !== 'unklar') {
        if (!t.evidence) T('evidence (Zitat aus dem Text) fehlt');
        else if (!fullText.includes(t.evidence))
          T(`Belegzitat "${t.evidence.slice(0, 42)}…" steht so nicht im Lesetext`);
      }
      if (!t.explain) T('explain fehlt');
    }
    if (t.type === 'forge') {
      if (!t.solution) T('solution fehlt');
      if (!t.distractors?.length) warns.push(`${l._file}: tasks[${i}]: keine Ablenker – zu einfach`);
      if (!t.explain) T('explain fehlt');
    }
    if (t.type === 'transform') {
      if (!t.answer) T('answer fehlt');
      if (!t.explain) T('explain fehlt');
    }
    if (t.type === 'pairs') {
      if (!Array.isArray(t.pairs) || t.pairs.length < 3) T('mindestens drei Paare');
      (t.pairs || []).forEach((pr, k) => { if (!Array.isArray(pr) || pr.length !== 2) T(`pairs[${k}] muss [a, b] sein`); });
    }
    if (t.type === 'write') {
      if (!t.model) T('model (Musterlösung) fehlt');
    }
  });

  /* Hören */
  const src = l.listening?.source;
  if (!src) E('listening.source fehlt');
  else {
    if (!src.name) E('listening.source.name fehlt');
    if (!src.url) E('listening.source.url fehlt – ohne Link keine Hörstation');
    if (src.url && !/^https:\/\//.test(src.url)) E('listening.source.url muss https sein');
    if (!src.duration) warns.push(`${l._file}: keine Dauer bei der Hörquelle angegeben`);
    if (!src.pick) warns.push(`${l._file}: kein Hinweis, welche Folge genommen werden soll (source.pick)`);
  }
  (l.listening?.alternatives || []).forEach((a, i) => {
    if (!a.url || !/^https:\/\//.test(a.url)) E(`listening.alternatives[${i}]: gültige https-URL fehlt`);
  });
  if (!(l.listening?.alternatives || []).length)
    warns.push(`${l._file}: keine Ausweichquelle – wenn der Link tot ist, steht die Station still`);
}

console.log('');
rule('Prüfung');
console.log(`  ${lessons.length} Lektion(en) geladen`);
warns.forEach((w) => console.log('  ' + col.yellow('Hinweis  ') + w));
errors.forEach((e) => console.log('  ' + col.red('Fehler   ') + e));
console.log('');
if (errors.length) {
  console.log(col.red(`  ${errors.length} Fehler – so geht das nicht live.`));
  process.exit(1);
}
console.log(col.green(`  Alles in Ordnung${warns.length ? ` (${warns.length} Hinweis${warns.length === 1 ? '' : 'e'})` : ''}.`));
console.log('');
