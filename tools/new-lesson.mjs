#!/usr/bin/env node
/* Legt ein Gerüst an, das die Prüfung besteht, sobald es gefüllt ist.
   node tools/new-lesson.mjs es mercado-recuerdos */
import { writeFileSync, existsSync } from 'node:fs';
import { p, today, LANGS, readJson, col } from './lib.mjs';

const [lang, slug] = process.argv.slice(2);
if (!LANGS[lang] || !slug) {
  console.error('Aufruf: node tools/new-lesson.mjs <es|fr> <kurzname>');
  process.exit(1);
}
const profile = readJson('learner/profile.json');
const level = profile.languages[lang].level;
const date = today();
const id = `${lang}-${date}-${slug}`;
const rel = `lessons/${lang}/${date}-${slug}.js`;
if (existsSync(p(rel))) { console.error(col.red('Gibt es schon: ' + rel)); process.exit(1); }

const tpl = `/* ${id} */
LEKTION.register({
  id: '${id}',
  lang: '${lang}',
  level: '${level}',
  date: '${date}',
  minutes: 35,
  title: 'TITEL',
  subtitle: 'Ein Satz, der Lust macht.',

  intro: {
    hook: 'Warum das heute dran ist – zwei, drei Sätze, direkt angesprochen.',
    grammar: [{
      id: 'GRAMMATIK-ID-AUS-curriculum.json',
      name: 'Anzeigename',
      why: 'Wofür man das im Alltag braucht.',
      explain: 'Erklärung. *fett* hebt hervor, _so_ markiert Formen.',
      table: { head: ['', 'Form'], rows: [['ich', 'form']] },
      examples: [{ src: 'Beispielsatz mit _Form_.', de: 'Übersetzung.', note: 'Was hier passiert.' }],
      pitfalls: ['Der typische Fehler – und wie man ihn vermeidet.']
    }],
    vocab: [{ term: 'palabra', pos: 'sustantivo', de: 'das Wort', example: 'Ein Satz aus dem Text.' }]
  },

  reading: {
    title: 'Titel des Textes',
    kicker: 'Gattung, z.B. Reportage',
    source: { kind: 'adaptiert', note: 'Woher der Stoff kommt.', url: null },
    paragraphs: [{ text: 'Absatz im Original.', de: 'Absatz auf Deutsch.' }],
    glossary: [{ term: 'wort', de: 'Bedeutung' }]
  },

  tasks: [
    // Typen: choice, evidence, forge, transform, pairs, write
  ],

  listening: {
    headline: 'Überschrift der Hörstation',
    intro: 'Ein Satz zur Einordnung.',
    source: {
      name: 'Quelle', icon: '🎧', kind: 'Podcast', duration: '10 Min', level: '${level}',
      what: 'Was das ist.', url: 'https://…', transcript: false,
      pick: 'Welche Folge genau genommen werden soll.'
    },
    alternatives: [{ name: 'Ausweichquelle', url: 'https://…', why: 'Wann die besser passt.' }],
    pretask: [{ term: 'wort', de: 'Bedeutung' }]
  },

  outro: 'Schlusssatz vor der Umfrage.'
});
`;
writeFileSync(p(rel), tpl);
console.log(col.green('\n  Angelegt: ') + rel + '\n');
