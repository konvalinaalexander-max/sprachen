#!/usr/bin/env node
/* Was soll heute drankommen?
   Liest Profil, Lehrplan und Verlauf und schlägt pro Sprache eine Einheit vor.
   Aufruf:  npm run plan          (beide Sprachen)
            npm run plan -- es    (nur Spanisch) */
import { readJson, LANGS, today, daysBetween, col, rule, loadLessons } from './lib.mjs';

const want = process.argv.slice(2).filter((a) => LANGS[a]);
const langs = want.length ? want : Object.keys(LANGS);

const profile = readJson('learner/profile.json');
const cur = readJson('learner/curriculum.json');
const hist = readJson('learner/history.json');
const lessons = loadLessons();
const TODAY = today();

const rank = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5 };

console.log('');
console.log(col.b('  Lernstand am ' + TODAY));
console.log('');

for (const lang of langs) {
  const meta = profile.languages[lang];
  const items = cur[lang].items;
  const sessions = hist.sessions.filter((s) => s.sprache === lang)
    .sort((a, b) => (a.datum < b.datum ? 1 : -1));
  const last = sessions[0];
  const ceiling = rank[meta.target?.replace(/[^A-C0-9]/g, '').slice(0, 2)] || rank[meta.level] + 1;

  rule(`${LANGS[lang].toUpperCase()}  ·  ${meta.level} → ${meta.target}`);

  // Wann zuletzt?
  if (last) {
    const gap = daysBetween(last.datum, TODAY);
    console.log(`  Letzte Einheit: ${last.datum} (vor ${gap} Tag${gap === 1 ? '' : 'en'}) – „${last.titel || last.lektion}“`);
    if (last.ergebnis) console.log(`  Ergebnis damals: ${last.ergebnis.richtig}/${last.ergebnis.gesamt}`);
  } else {
    console.log(col.dim('  Noch keine abgeschlossene Einheit erfasst.'));
  }

  // Ausstehende Wiederholungen
  const due = items
    .filter((i) => i.lastSeen)
    .map((i) => {
      const iv = cur.intervalsDays[Math.min(i.box, cur.intervalsDays.length - 1)];
      return { ...i, over: daysBetween(i.lastSeen, TODAY) - iv };
    })
    .filter((i) => i.over >= 0)
    .sort((a, b) => b.over - a.over);

  const shaky = items.filter((i) => i.accuracy !== null && i.accuracy < 0.7)
    .sort((a, b) => a.accuracy - b.accuracy);

  const fresh = items.filter((i) => !i.lastSeen && (rank[i.cefr] || 9) <= ceiling);
  const priority = (meta.priorities || [])
    .map((id) => items.find((i) => i.id === id))
    .filter((i) => i && (!i.lastSeen || i.box < 3));

  // Zuletzt behandelt – nicht direkt wiederholen
  const recentTopics = new Set();
  lessons.filter((l) => l.lang === lang)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 2)
    .forEach((l) => (l.intro?.grammar || []).forEach((g) => g.id && recentTopics.add(g.id)));

  const pickMain = priority.find((i) => !recentTopics.has(i.id))
    || shaky.find((i) => !recentTopics.has(i.id))
    || fresh.find((i) => !recentTopics.has(i.id))
    || due.find((i) => !recentTopics.has(i.id))
    || fresh[0];

  const pickReview = due.filter((i) => i.id !== pickMain?.id && !recentTopics.has(i.id)).slice(0, 2);

  console.log('');
  console.log(col.b('  → Vorschlag für heute'));
  if (pickMain) {
    console.log(`     Hauptthema   ${col.green(pickMain.name)}  ${col.dim('[' + pickMain.id + ' · ' + pickMain.cefr + ']')}`);
    console.log(`                  ${col.dim(pickMain.why)}`);
    console.log(`                  ${col.dim('Status: ' + pickMain.status + ', Box ' + pickMain.box + (pickMain.accuracy !== null ? ', Trefferquote ' + Math.round(pickMain.accuracy * 100) + '%' : ''))}`);
  } else console.log(col.dim('     Kein Thema offen – Zeit für freie Vertiefung.'));

  if (pickReview.length) {
    console.log(`     Auffrischen  ${pickReview.map((i) => col.yellow(i.name) + col.dim(' (+' + i.over + 'd)')).join(', ')}`);
  } else {
    console.log(col.dim('     Auffrischen  nichts fällig'));
  }
  if (recentTopics.size) {
    const names = [...recentTopics].map((id) => items.find((i) => i.id === id)?.name || id);
    console.log(`     ${col.dim('Zuletzt dran (meiden): ' + names.join(', '))}`);
  }

  // Rückmeldungen aus der App
  const wishes = sessions.slice(0, 3).map((s) => s.umfrage?.wish).filter(Boolean);
  const diffs = sessions.slice(0, 3).map((s) => s.umfrage?.difficulty).filter(Boolean);
  if (wishes.length || diffs.length) {
    console.log('');
    console.log(col.b('  → Was er zuletzt gesagt hat'));
    if (diffs.length) {
      const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      const verdict = avg <= 2 ? col.yellow('zu leicht – anziehen') : avg >= 4 ? col.yellow('zu schwer – abbremsen') : col.green('Niveau passt');
      console.log(`     Schwierigkeit ${avg.toFixed(1)}/5 → ${verdict}`);
    }
    wishes.forEach((w) => console.log(`     „${w}“`));
  }

  // Hörquellen rotieren
  const usedSources = sessions.slice(0, 3).map((s) => s.hoeren?.folge?.quelle)
    .filter(Boolean)
    .concat(lessons.filter((l) => l.lang === lang)
      .sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 2)
      .map((l) => l.listening?.source?.name).filter(Boolean))
    .filter((v, i, a) => a.indexOf(v) === i);
  if (usedSources.length) {
    console.log('');
    console.log(`  ${col.dim('Zuletzt gehört: ' + usedSources.join(' → ') + '  (etwas anderes wählen)')}`);
  }

  const overview = { neu: items.filter((i) => !i.lastSeen).length,
                     gefestigt: items.filter((i) => i.box >= 3).length,
                     wackelig: shaky.length, faellig: due.length };
  console.log('');
  console.log(`  ${col.dim(`Inventar: ${items.length} Themen · ${overview.neu} unberührt · ${overview.gefestigt} gefestigt · ${overview.wackelig} wacklig · ${overview.faellig} fällig`)}`);
  console.log('');
}

console.log(col.dim('  Danach:  node tools/new-lesson.mjs <sprache> <kurzname>   → Gerüst anlegen'));
console.log(col.dim('           npm run check                                   → prüfen & Manifest bauen'));
console.log('');
