#!/usr/bin/env node
/* Was kann er, was nicht.
   Zieht alles zusammen, was das System über ihn weiß, und sagt es in Klartext.
   Aufruf: npm run profil  (oder: npm run profil -- es) */
import { readJson, LANGS, today, daysBetween, col, rule } from './lib.mjs';

const want = process.argv.slice(2).filter((a) => LANGS[a]);
const langs = want.length ? want : Object.keys(LANGS);

const profile = readJson('learner/profile.json');
const skills = readJson('learner/skills.json');
const curriculum = readJson('learner/curriculum.json');
const history = readJson('learner/history.json');

const LBL = {
  verstehen: 'Text verstehen', erkennen: 'Formen erkennen',
  produzieren: 'Selbst produzieren', wortschatz: 'Wortschatz', hoeren: 'Hörverstehen'
};
const ORDER = ['verstehen', 'erkennen', 'wortschatz', 'produzieren', 'hoeren'];

const urteil = (w) => w >= 0.8 ? col.green('sitzt') : w >= 0.6 ? col.yellow('wackelt') : col.red('noch nicht');
const bar = (w) => {
  const n = Math.round(w * 16);
  return '█'.repeat(n) + col.dim('·'.repeat(16 - n));
};
const trend = (v) => {
  if (!v || v.length < 2) return '';
  const d = v[v.length - 1].q - v[v.length - 2].q;
  return d > 0.08 ? col.green(' ↑') : d < -0.08 ? col.red(' ↓') : col.dim(' →');
};

console.log('');
console.log(col.b('  Sprachprofil  ·  Stand ' + (skills.updatedAt || 'noch leer')));

for (const lang of langs) {
  const meta = profile.languages[lang];
  const s = skills[lang] || {};
  const sessions = history.sessions.filter((x) => x.sprache === lang);
  console.log('');
  rule(`${LANGS[lang].toUpperCase()}  ·  ${meta.level} → ${meta.target}  ·  ${sessions.length} Einheit(en)`);

  const gemessen = ORDER.filter((k) => s[k]);
  if (!gemessen.length) {
    console.log(col.dim('  Noch keine Messwerte. Nach der ersten Einheit steht hier etwas.'));
    continue;
  }

  console.log('');
  for (const k of ORDER) {
    const v = s[k];
    if (!v) { console.log(`  ${LBL[k].padEnd(19)} ${col.dim('– nie geprüft')}`); continue; }
    console.log(`  ${LBL[k].padEnd(19)} ${bar(v.wert)} ${String(Math.round(v.wert * 100)).padStart(3)}%${trend(v.verlauf)}  ${urteil(v.wert)}  ${col.dim('(' + v.geprueft + ' Aufgaben)')}`);
  }

  /* Was das für die nächste Einheit heißt */
  const stark = gemessen.filter((k) => s[k].wert >= 0.8).map((k) => LBL[k]);
  const schwach = gemessen.filter((k) => s[k].wert < 0.6).map((k) => LBL[k]);
  const mittel = gemessen.filter((k) => s[k].wert >= 0.6 && s[k].wert < 0.8).map((k) => LBL[k]);

  console.log('');
  console.log(col.b('  Klartext'));
  if (stark.length) console.log(`    Kann er: ${col.green(stark.join(', '))}`);
  if (mittel.length) console.log(`    Halb:    ${col.yellow(mittel.join(', '))}`);
  if (schwach.length) console.log(`    Nicht:   ${col.red(schwach.join(', '))}`);

  if (schwach.length) {
    console.log(col.dim(`    → Nächste Einheit auf "${schwach[0]}" zuschneiden: mehr Aufgaben dieser Art.`));
  } else if (mittel.length) {
    console.log(col.dim(`    → "${mittel[0]}" braucht noch Wiederholung, der Rest kann anziehen.`));
  } else {
    console.log(col.dim('    → Alles über 80%. Niveau anheben oder Text länger machen.'));
  }

  /* Wackelige Themen aus dem Lehrplan */
  const wack = curriculum[lang].items
    .filter((i) => i.accuracy !== null && i.accuracy < 0.7)
    .sort((a, b) => a.accuracy - b.accuracy).slice(0, 4);
  if (wack.length) {
    console.log('');
    console.log(col.b('  Themen, die nicht sitzen'));
    wack.forEach((i) => console.log(`    ${col.red('•')} ${i.name} ${col.dim(Math.round(i.accuracy * 100) + '%, Box ' + i.box)}`));
  }

  /* Fehlermuster über alle Einheiten */
  const fehler = sessions.flatMap((x) => x.fehler || []);
  if (fehler.length >= 3) {
    const proTyp = {};
    fehler.forEach((f) => { proTyp[f.typ] = (proTyp[f.typ] || 0) + 1; });
    const top = Object.entries(proTyp).sort((a, b) => b[1] - a[1]).slice(0, 3);
    console.log('');
    console.log(col.b('  Wo die Fehler passieren'));
    top.forEach(([t, n]) => console.log(`    ${t.padEnd(12)} ${n}×`));
  }

  /* Was er selbst gesagt hat */
  const notes = (profile.preferences.notes || []).filter((n) => n.sprache === lang).slice(0, 3);
  if (notes.length) {
    console.log('');
    console.log(col.b('  Seine eigenen Worte'));
    notes.forEach((n) => {
      const t = n.wunsch ? '„' + n.wunsch + '“' : n.wacklig ? 'fand ' + n.wacklig + ' wacklig' : n.naechstesMal || '';
      if (t) console.log(`    ${col.dim(n.datum)} ${t}`);
    });
  }
}

const letzte = history.sessions[0];
if (letzte) {
  const tage = daysBetween(letzte.datum, today());
  console.log('');
  console.log(col.dim(`  Letzte Einheit vor ${tage} Tag(en). ${tage > 6 ? 'Lange her – eher wiederholen als Neues.' : ''}`));
}
console.log('');
