# Betriebshandbuch

Für Claude. Alexander sagt im Chat „ich möchte heute lernen“ – dann läuft das hier ab.

## Ablauf einer Anfrage

```bash
npm run plan          # 1. Was ist dran? Beide Sprachen, oder: npm run plan -- es
```

`tools/plan.mjs` liest `learner/` und sagt pro Sprache:
- **Hauptthema** – neu, wacklig oder priorisiert
- **Auffrischen** – was nach Leitner-Intervall fällig ist
- **Zuletzt dran (meiden)** – Themen der letzten zwei Einheiten
- **Was er zuletzt gesagt hat** – Schwierigkeitsurteil und Wünsche aus der Umfrage
- **Zuletzt gehört** – damit die Hörquelle rotiert

Dem Vorschlag folgen, es sei denn, Alexander sagt im Chat etwas anderes. Sein Wort schlägt das Tool.

**Wichtig:** Nicht blind beide Sprachen neu bauen. Wenn `plan` zeigt, dass Französisch
gestern lief und Spanisch vor einer Woche, dann macht heute nur Spanisch Sinn –
ausser er verlangt beides.

```bash
node tools/new-lesson.mjs es mercado     # 2. Gerüst
# 3. füllen (siehe unten)
npm run check                            # 4. prüfen + Manifest + sprachen.html bauen
git add -A && git commit && git push
```

**Zum Schluss immer `sprachen.html` mit SendUserFile in den Chat legen.** Das ist
die Datei, mit der er arbeitet – eine einzige HTML-Datei, Doppelklick genügt.
Er will sie jedes Mal hier haben, nicht aus dem Repository holen müssen.
`npm run check` baut sie mit; eine Lektion ohne frisch gebündelte Datei ist nicht
ausgeliefert.

Dazu im Chat: kurz sagen, was ihn erwartet (Thema, Grammatik, Hörquelle) – nicht die
ganze Lektion nacherzählen. Die Überraschung ist Teil des Spass.

## Wenn er einen Bericht schickt

Am Ende jeder Einheit spuckt die App einen `LERNBERICHT …`-Block aus. Kommt der im Chat:

```bash
# Text in eine Datei unter inbox/ legen, dann:
node tools/report.mjs inbox/bericht-....json
git add -A && git commit -m "Lernstand nach <Lektion>" && git push
```

Das schreibt `learner/history.json`, verschiebt die Leitner-Boxen in
`learner/curriculum.json` und zieht die Vorlieben in `learner/profile.json` nach.
**Nie von Hand an den Boxen drehen** – ausser er sagt ausdrücklich „das kann ich schon“.

Danach kurz rückmelden, was sich verschoben hat, und was daraus für nächstes Mal folgt.

## Wie eine gute Lektion aussieht

Sechs Stationen, zusammen 30–40 Minuten:

| Station | Inhalt | Zeit |
|---|---|---|
| Einstieg | Hook + **eine** Grammatik, auf den Text zugeschnitten | 6 Min |
| Wörter | 8–14 Vokabeln, alle aus dem Text | 4 Min |
| Lesen | der Text, mit Glossar und Übersetzung auf Abruf | 6 Min |
| Training | 6–9 Aufgaben, gemischte Typen | 10 Min |
| Hören | echte externe Quelle, drei Durchgänge | 10 Min |
| Feedback | Umfrage + Fehlerprotokoll + Bericht | 3 Min |

### Der Lesetext
Selbst schreiben, nicht kopieren. Gründe: exaktes Niveau, die Zielgrammatik kommt
dicht genug vor, funktioniert offline, kein Urheberrecht. Authentisch bleibt es
trotzdem – echte Themen, echte Stimmen, gerne nach einer realen Meldung gebaut.
Dann `reading.source.url` auf das Original setzen.

Länge: A1 80–220, A2 120–320, B1 200–450, B2 280–600 Wörter. Der Prüfer meckert sonst.

Was einen Text gut macht: eine Person, ein Konflikt, ein Detail, das hängen bleibt.
Keine Lehrbuchdialoge über das Buchen von Hotelzimmern.

### Die Aufgaben
Sechs Typen stehen bereit – `choice`, `evidence`, `forge`, `transform`, `pairs`, `write`.
Mindestens drei verschiedene pro Einheit, sonst wird es zäh.

**Jede falsche Antwort braucht eine Erklärung.** Bei `choice` gehört an *jede* Option
ein `why` – auch an die richtige. Das ist der eigentliche Lernmoment, nicht das Ankreuzen.

`evidence` ist die Textverständnis-Aufgabe: Aussage beurteilen, dann den belegenden
Satz im Text anklicken. Das Zitat in `evidence` muss **wörtlich** im Text stehen –
der Prüfer schlägt sonst Alarm. Immer eine Aussage einbauen, die *nicht* im Text steht
(`verdict: 'unklar'`); das trainiert, nicht zu ergänzen, was plausibel klingt.

`write` zum Schluss: produzieren lassen, dann Musterlösung und Selbstcheck.

### Die Hörquelle
Kommt aus dem echten Internet, nie selbst erzeugt – das war eine ausdrückliche Ansage.
`docs/QUELLEN.md` hat die kuratierte Liste. Regeln:
- 10–15 Minuten, sonst sprengt es den Rahmen
- **rotieren** – `plan` zeigt, was zuletzt lief
- Transkript ist ein starkes Plus
- immer 2–4 `alternatives`, denn Links sterben
- `source.pick` sagt konkret, welche Folge zu nehmen ist („die neueste, 10–15 Min“)
- verlinkt wird die stabile Übersichtsseite, nicht eine einzelne Folge von heute

Die drei Durchgänge sind bewusst nicht folgenbezogen: global verstehen → Details
sammeln → eine Minute nachsprechen. Das funktioniert mit jeder Folge und ist
methodisch solider als Fragen zu einer Sendung, die niemand vorher gehört hat.

## Ton
Sie duzen sich. Trocken, warm, keine Ausrufezeichen-Pädagogik, kein Schulmeister.
Erklärungen dürfen eine Meinung haben („Deutsch hilft dir hier nicht“). Lob knapp.
Kein „Super gemacht!!“ – das merkt man sofort.

## Technik in einem Absatz
Statische Seite ohne Bauschritt: klassische `<script>`-Tags, damit `index.html`
auch per Doppelklick aus dem Dateisystem läuft. Lektionen sind `.js`-Dateien, die
`LEKTION.register({…})` aufrufen; `tools/build-manifest.mjs` erzeugt daraus
`lessons/manifest.js`, spiegelt `learner/profile.json` nach `learner/profile.js`
und pflegt die Vorladeliste in `sw.js`. Fortschritt liegt im `localStorage` des
Browsers – deshalb der Bericht zum Kopieren als Brücke zurück ins Repository.

`tools/bundle.mjs` presst am Ende alles – Stylesheet, alle Skripte, alle Lektionen,
das Symbol – in die eine Datei `sprachen.html`. Die läuft allein in einem leeren
Ordner, ohne eine einzige externe Anfrage. Im Bündel ist `LEKTION.standalone` gesetzt;
daran hängt, was ohne den Rest des Ordners nicht funktionieren würde.

`npm run check` vor jedem Commit. Kein Commit mit rotem Prüfer.
