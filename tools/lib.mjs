import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const p = (...s) => join(ROOT, ...s);

export const readJson = (rel) => JSON.parse(readFileSync(p(rel), 'utf8'));
export const writeJson = (rel, obj) => writeFileSync(p(rel), JSON.stringify(obj, null, 2) + '\n');

export const LANGS = { es: 'Spanisch', fr: 'Französisch' };

export const today = () => new Date().toISOString().slice(0, 10);
export const daysBetween = (a, b) =>
  Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);

/* Alle Lektionsdateien einsammeln und die register()-Objekte auswerten,
   ohne einen Browser zu brauchen. */
export function loadLessons() {
  const out = [];
  for (const lang of Object.keys(LANGS)) {
    const dir = p('lessons', lang);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
      const code = readFileSync(join(dir, f), 'utf8');
      const sandbox = { lessons: [] };
      const fn = new Function('LEKTION', code);
      try {
        fn({ register: (l) => sandbox.lessons.push(l), manifest: () => {} });
      } catch (err) {
        throw new Error(`${lang}/${f}: ${err.message}`);
      }
      for (const l of sandbox.lessons) out.push({ ...l, _file: `lessons/${lang}/${f}` });
    }
  }
  return out;
}

/* Farbige Konsolenausgabe, aber nur wenn ein Terminal zuschaut. */
const tty = process.stdout.isTTY;
const c = (code) => (s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
export const col = {
  b: c('1'), dim: c('2'), red: c('31'), green: c('32'),
  yellow: c('33'), blue: c('34'), magenta: c('35'), cyan: c('36')
};
export const rule = (t = '') =>
  console.log(col.dim('─'.repeat(4)) + (t ? ' ' + col.b(t) + ' ' : '') + col.dim('─'.repeat(Math.max(4, 66 - t.length))));
