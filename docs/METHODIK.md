# Warum die Einheit so gebaut ist

Kein Zufall, sondern sechs Entscheidungen.

## 1. Erklärung vor dem Text, nicht danach
Wer eine Struktur kennt, bevor er ihr begegnet, erkennt sie beim Lesen wieder –
statt sie zu überlesen. Der Einstieg behandelt genau *ein* Thema, und zwar das,
das im Text gleich dicht vorkommt. Zwei Themen gleichzeitig lernt niemand.

## 2. Wörter raten, bevor man sie aufdeckt
Die Vokabelkarten zeigen die Bedeutung erst auf Klick. Der kurze Moment des
Ratens ist der Grund, warum sie hängen bleibt – ein abgerufenes Wort sitzt
deutlich besser als ein gelesenes. Deshalb sind die Karten verschleiert und
nicht einfach eine Liste.

## 3. Lesen ohne Wörterbuch
Nur ein Dutzend Wörter sind unterstrichen. Der Rest wird erraten. Wer bei jedem
unbekannten Wort nachschlägt, liest nicht – er entschlüsselt. Die Übersetzung
liegt daneben, aber auf Knopfdruck, nicht daneben im Blickfeld.

## 4. Aufgaben, die nicht nach Schule riechen
Sechs Formen, bewusst verschieden:

- **Textdetektiv** – Aussage beurteilen *und* den belegenden Satz anklicken.
  Zwingt zurück in den Text, statt Erinnerung abzufragen. Die Option
  „steht nicht im Text“ trainiert, nicht zu ergänzen, was plausibel klingt.
- **Blitzrunde** – Auswahl, bei der *jede* Option erklärt wird. Der Lernmoment
  liegt in der Begründung, nicht im Ankreuzen.
- **Satzschmiede** – Wortkacheln antippen. Wortstellung wird begreifbar statt
  behauptet. Ein paar Kacheln passen nicht.
- **Verwandler** – selbst tippen. Bei Fehlern wird Wort für Wort verglichen und
  farbig markiert, was fehlt. Akzente werden verziehen, aber angemerkt.
- **Paarjagd** – Zusammengehöriges verbinden, mit Fehlversuch-Zähler.
- **Freischreiben** – produzieren, dann Musterlösung und Selbstcheck. Ohne Note.

Nach jedem Fehler kommt sofort die Erklärung, am Ende nochmal das ganze
Fehlerprotokoll. Nichts bleibt unkommentiert.

## 5. Hören zum Schluss, mit echtem Material
Ein Podcast von Muttersprachlern für Muttersprachler. Nicht alles zu verstehen
ist der Normalzustand, nicht das Scheitern.

Drei Durchgänge statt Verständnisfragen:
1. **einmal ganz durch** – nur das Thema erfassen
2. **nochmal mit Notizen** – Zahlen, Namen, wiedererkannte Wörter
3. **eine Minute nachsprechen** – Rhythmus und Melodie, nicht Inhalt

Das funktioniert mit jeder Folge, auch mit einer, die heute erst erschienen ist.
Und es ist ehrlicher als Fragen zu einer Sendung, die vorher niemand gehört hat.

## 6. Die Umfrage ist kein Höflichkeitsformular
Sie ist der Rückkanal. Schwierigkeitsurteil, Wunschthema und Selbsteinschätzung
beim Hören gehen in `learner/` und steuern die nächste Einheit: Was wacklig war,
kommt früher zurück. Was zu leicht war, zieht das Niveau an.

## Die Wiederholungslogik
Jedes Grammatikthema sitzt in einer Leitner-Box 0–5 mit den Abständen
**0, 1, 3, 7, 16, 35 Tagen**.

- 80% und mehr richtig → eine Box hoch, der Abstand wächst
- 50–79% → Box bleibt
- unter 50% → eine Box runter, kommt bald wieder
- nur erklärt, nicht abgefragt → zählt als „gesehen“

`npm run plan` rechnet daraus aus, was fällig ist. Themen der letzten zwei
Einheiten werden übersprungen – Abstand ist der ganze Sinn der Sache.
