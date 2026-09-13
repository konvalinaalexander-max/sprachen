# Warum die Einheit so gebaut ist

Kein Zufall, sondern sieben Entscheidungen.

## 0. Sobald man drin ist, gibt es kein Deutsch mehr
Startseite deutsch, alles danach einsprachig: Erklärungen, Aufgaben, Knöpfe,
Rückmeldungen. Auch die Wortbedeutungen – die werden erklärt wie in einem
Lernerwörterbuch (*el taller: local donde se arreglan coches*), nicht übersetzt.

Das ist kein Purismus, sondern das Verfahren mit der besten Belegdecke: Wer die
Bedeutung über eine Umschreibung in der Zielsprache erschliesst, verarbeitet sie
tiefer als beim Ablesen eines deutschen Wortes – und lernt die Umschreibung
gleich mit. Nebeneffekt: Man gewöhnt sich daran, Bedeutung aus Kontext zu bauen,
statt auf eine Übersetzung zu warten. Genau das braucht man beim Hören.

Wer trotzdem hängt, hat zwei Netze: das Glossar im Text und die einfachere
Fassung jedes Absatzes auf Knopfdruck – beide in derselben Sprache.

## 1. Erklärung vor dem Text, nicht danach
Wer eine Struktur kennt, bevor er ihr begegnet, erkennt sie beim Lesen wieder –
statt sie zu überlesen. Der Einstieg behandelt genau *ein* Thema, und zwar das,
das im Text gleich dicht vorkommt. Zwei Themen gleichzeitig lernt niemand.

## 2. Wörter raten, bevor man sie aufdeckt
Die Vokabelkarten zeigen die Bedeutung erst auf Klick. Der kurze Moment des
Ratens ist der Grund, warum sie hängen bleibt – ein abgerufenes Wort sitzt
deutlich besser als ein gelesenes. Deshalb sind die Karten verschleiert und
nicht einfach eine Liste.

## 3. Lesen ohne Wörterbuch, und zwar lange
Der Text ist rund zwei A4-Seiten lang. Das ist Absicht: Bei kurzen Texten bleibt
man im Entschlüsselungsmodus. Erst nach ein paar hundert Wörtern kippt das Lesen
in echtes Lesen – man hört auf, Wörter einzeln zu prüfen, und folgt der Geschichte.

Nur ein Dutzend Wörter sind unterstrichen. Der Rest wird erraten. Die einfachere
Fassung liegt daneben, aber auf Knopfdruck, nicht im Blickfeld.

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

## 5. Hören zum Schluss, mit echtem Material – und ohne Hindernislauf
Ein Podcast von Muttersprachlern für Muttersprachler. Nicht alles zu verstehen
ist der Normalzustand, nicht das Scheitern.

Die App sucht die neueste Folge selbst und spielt sie direkt ab, mit Titel und
Datum auf dem Schirm. Kein Link auf eine Website, keine Abo-Schranke, keine
Frage, welche Folge gemeint ist. Jede Sekunde Reibung vor dem Play-Knopf ist
eine Sekunde, in der man es doch sein lässt.

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
