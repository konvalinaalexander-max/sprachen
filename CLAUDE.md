# Betriebshandbuch

Für Claude. Alexander sagt im Chat „ich möchte heute lernen“ – dann läuft das hier ab.

## Vier Regeln, die nicht verhandelbar sind

**1. Kein deutsches Wort in einer Lektionsdatei.** Titel, Erklärungen, Aufgaben,
Rückmeldungen, Wortschatz, Hörstation – alles in der Zielsprache, auf einem Niveau,
das er versteht. Wortbedeutungen werden *einsprachig* erklärt (`def`), so wie in
einem Lernerwörterbuch: `el taller` → `Local donde se arreglan coches`. Keine
Übersetzung, auch nicht als Hilfe. `npm run validate` sucht nach deutschen Wörtern
und bricht ab, wenn es welche findet. Deutsch gibt es nur auf der Startseite,
wo die Sprache erst gewählt wird, und im Menü-Rahmen der Startseite.

**2. Der Ton ist der eines 26-jährigen Mannes, nicht der eines Lehrbuchs.**
Die Texte sollen ihm gefallen, nicht seiner Lehrerin. Nah am Leben, roh, direkt:
Geld, Arbeit, Nächte, Fehlschläge, Sex, Alkohol, Behörden, Peinlichkeiten. Umgangs-
sprache gehört dazu, auch das gelegentliche Kraftwort – so redet man, und genau das
soll er lernen. Wortschatzeinträge markieren das dann als *(vulgar)* / *(familier)*.
Keine geglätteten Lehrbuchsituationen, keine Hotelbuchungen, keine Kinder auf dem
Spielplatz. Eine Person, ein Konflikt, ein Detail, das wehtut oder komisch ist.
Keine Belehrung am Schluss.

**3. Keine Einheit sieht aus wie die davor.**
Der Aufbau bleibt: sechs Stationen, Lesetext, Aufgabenliste. Was sich jedes Mal
ändert, sind die Modalitäten. Überkonstruierte 3D-Bühnen sind abgeschafft – sie
haben in der Praxis nicht funktioniert. Was bleibt, ist Abwechslung in drei
Schaltern:

- **Wortschatz** – `intro.vocabMode`
  - `raten` (Vorgabe): Wort sichtbar, Bedeutung verdeckt. Er rät und deckt auf.
  - `definicion`: umgedreht. Die Definition steht da, das Wort ist verdeckt –
    deutlich härter, gut wenn `skills.json` beim Wortschatz hohe Werte zeigt.
  - `campos`: nach Wortfeldern gruppiert. Jedes Wort braucht dann ein `campo`,
    drei bis vier Felder mit sprechenden Namen.
- **Lesetext** – `reading.style`
  - `zeitung` (Vorgabe): Artikel mit Dachzeile.
  - `chat`: Nachrichtenverlauf. Braucht `reading.yo` (wer von beiden er ist) und
    an jedem Absatz ein `von`, optional `hora`. Die Absätze sind einzelne
    Nachrichten; `simple` nur bei den längeren.
  - `carta`: Brief oder Mail. Braucht `reading.meta` als Liste von `[Feld, Wert]`
    für den Briefkopf, optional `reading.firma` für die Unterschrift.
- **Aufgaben** – neun Typen: `choice`, `evidence`, `forge`, `transform`, `pairs`,
  `write`, `order` (Zeitstrahl: Schritte in die richtige Reihenfolge klicken),
  `spot` (ein falsches Wort im Satz finden) und `dialog` (Gesprächsblasen, eigene
  Repliken wählen; jede Lücke braucht `options` mit genau einem `ok: true`).
  Mindestens fünf verschiedene pro Einheit, und nie zweimal hintereinander
  dieselbe Auswahl.

`npm run plan` zeigt unter **„Zuletzt gebaut (variieren!)“**, welcher Modus,
welcher Stil und welche Aufgabentypen zuletzt dran waren, und was noch frei ist.
Daran halten. Das ist die ganze Regel – kein Umschalter mehr, keine zweite
Betriebsart.

**4. Die Hörquelle wird abgespielt, nicht verlinkt.** Er will nicht auf einer
Website landen, auf der er ein Abo abschliessen soll. Deshalb trägt jede Quelle
eine `itunesId`; die App holt darüber zur Laufzeit die Folgenliste und spielt die
Audiodatei direkt im Player ab, mit Folgentitel und Datum. Ein `url`-Feld gibt es
nicht mehr – der Prüfer lehnt es ab. `homepage` ist nur der Notausgang, falls die
Folgenliste nicht lädt.

## Ablauf einer Anfrage

```bash
npm run profil        # 1. Was kann er, was nicht? (aus seinen Antworten)
npm run plan          # 2. Welches Thema ist dran? Beide Sprachen, oder: -- es
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

**Vor dem Bauen immer erst `npm run profil`.** Das sagt, was er wirklich kann –
aus seinen Antworten, nicht aus seiner Selbsteinschätzung. Steht dort
„Selbst produzieren 30%“, dann braucht die nächste Einheit mehr `transform`,
`forge` und `write` und weniger Ankreuzen. Steht dort „Text verstehen 95%“,
dann darf der Text härter werden.

**Zum Schluss immer `sprachen.html` mit SendUserFile in den Chat legen.** Das ist
die Datei, mit der er arbeitet – eine einzige HTML-Datei, Doppelklick genügt.
Er will sie jedes Mal hier haben, nicht aus dem Repository holen müssen.
`npm run check` baut sie mit; eine Lektion ohne frisch gebündelte Datei ist nicht
ausgeliefert.

Dazu im Chat: kurz sagen, was ihn erwartet (Thema, Grammatik, Hörquelle) – nicht die
ganze Lektion nacherzählen. Die Überraschung ist Teil des Spass.

## Wenn er einen Bericht schickt

Am Ende jeder Einheit erzeugt die App einen `LERNBERICHT …`-Block. Drei Wege,
wie der zurückkommt:

1. **GitHub-Knopf** (der bequemste): Die App öffnet ein vorausgefülltes Issue im
   Repository. Er drückt nur noch „Create“. Dann hier das Issue lesen
   (`mcp__github__issue_read`), den JSON-Block herausnehmen, verarbeiten, und das
   Issue mit einem kurzen Kommentar schliessen.
2. **Kopieren** und in den Chat werfen.
3. **Als Datei** herunterladen und schicken.

Verarbeitet wird immer gleich:

```bash
# JSON-Block in eine Datei unter inbox/ legen, dann:
node tools/report.mjs inbox/bericht-....json
git add -A && git commit -m "Lernstand nach <Lektion>" && git push
```

Das schreibt `learner/history.json`, verschiebt die Leitner-Boxen in
`learner/curriculum.json`, zieht die Vorlieben in `learner/profile.json` nach und
schreibt **`learner/skills.json`** fort – das Können-Profil, das aus seinen
Antworten entsteht. **Nie von Hand an den Boxen drehen** – ausser er sagt
ausdrücklich „das kann ich schon“.

Danach kurz rückmelden, was sich verschoben hat, und was daraus für nächstes Mal folgt.

## Wie eine gute Lektion aussieht

Sechs Stationen, zusammen 40–45 Minuten. Er ist schnell und will gefordert werden:

| Station | Inhalt | Zeit |
|---|---|---|
| Einstieg | Hook + **eine** Grammatik, auf den Text zugeschnitten | 7 Min |
| Wörter | 8–14 Vokabeln, alle aus dem Text | 4 Min |
| Lesen | der Text, mit Glossar und einfacherer Fassung auf Abruf | 10 Min |
| Training | 8–10 Aufgaben, gemischte Typen | 12 Min |
| Hören | echte externe Quelle, drei Durchgänge | 10 Min |
| Feedback | Umfrage + Fehlerprotokoll + Bericht | 3 Min |

### Der Lesetext
Selbst schreiben, nicht kopieren. Gründe: exaktes Niveau, die Zielgrammatik kommt
dicht genug vor, funktioniert offline, kein Urheberrecht. Authentisch bleibt es
trotzdem – echte Themen, echte Stimmen, gerne nach einer realen Meldung gebaut.
Dann `reading.source.url` auf das Original setzen.

Länge: **rund zwei A4-Seiten.** A1 250–500, A2 420–750, B1 600–1000, B2 700–1200
Wörter. Der Prüfer meckert sonst. Lieber am oberen Rand als am unteren – kurze
Texte langweilen ihn.

Zu jedem Absatz gehört `simple`: dieselbe Aussage noch einmal, in einfacheren
Sätzen derselben Sprache. Das ersetzt die frühere Übersetzung und hält die
Immersion. Keine deutschen Übersetzungen mehr, das Feld `de` ist abgeschafft.

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

**Jede Aufgabe braucht ein `skill`:** `verstehen`, `erkennen`, `produzieren` oder
`wortschatz`. Daraus baut die App am Schluss die Niveau-Diagnose („was kannst du,
was nicht“) und daraus entsteht `learner/skills.json`. Ohne `skill` fällt die
Aufgabe aus der Diagnose – der Prüfer warnt. Auf Verteilung achten: mindestens
zwei Aufgaben pro Fertigkeit, sonst ist die Messung Rauschen.

### Die Hörquelle
Kommt aus dem echten Internet, nie selbst erzeugt – das war eine ausdrückliche Ansage.
`docs/QUELLEN.md` hat die kuratierte Liste mit allen iTunes-Kennungen. Regeln:
- `itunesId` ist Pflicht, `country: 'us'` (grösster Katalog, alle Sendungen drin)
- `minMinutes` / `maxMinutes` setzen, sonst rutscht eine 90-Minuten-Folge herein
- **keine Quelle mit Bezahlschranke.** Öffentlich-rechtlich oder frei, sonst nicht
- **keine Sendung mit englischen Erklärteilen** – das bricht die Immersion genauso
  wie Deutsch. Coffee Break und die Duolingo-Podcasts fallen damit raus
- **rotieren** – `plan` zeigt, was zuletzt tatsächlich gehört wurde
- Transkript ist ein starkes Plus
- immer 2–3 `alternatives`, alle mit eigener `itunesId`; sie sind im Player
  direkt umschaltbar
- `source.pick` erklärt, was ihn erwartet – nicht mehr, welchen Link er suchen soll

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
