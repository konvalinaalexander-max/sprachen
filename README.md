# Sprachen

Ein Lernraum für Spanisch (B1) und Französisch (A2), der offline funktioniert.
Die Inhalte baut Claude – auf Zuruf im Chat, auf Basis dessen, was beim letzten
Mal gesessen hat und was nicht.

## Loslegen

**`sprachen.html` doppelklicken.** Eine einzige Datei, alles darin – Oberfläche,
Lektionen, Vokabeln. Kein Server, keine Installation, kein Internet. Die schickt
Claude nach jeder neuen Lektion in den Chat; speicher sie, wo du willst.

Wer lieber im Ordner arbeitet: `index.html` tut dasselbe, braucht aber den Rest
des Verzeichnisses daneben.

Wer es als App auf dem Handy will: Ordner irgendwo mit HTTPS ausliefern
(GitHub Pages genügt), Seite aufrufen, „zum Startbildschirm hinzufügen“.
Ab dann läuft alles offline, inklusive aller Lektionen.

```bash
npm run serve        # lokaler Server auf http://localhost:4321
```

## Eine Einheit

| | | |
|---|---|---|
| **Einstieg** | Grammatik, zugeschnitten auf den Text, der gleich kommt | 6 Min |
| **Wörter** | Vokabeln zum Aufdecken statt Liste | 4 Min |
| **Lesen** | der Text, Glossar im Antippen, Übersetzung auf Knopfdruck | 6 Min |
| **Training** | Textdetektiv, Blitzrunde, Satzschmiede, Verwandler, Paarjagd, Freischreiben | 10 Min |
| **Hören** | echter Podcast, drei Durchgänge | 10 Min |
| **Feedback** | Umfrage, Fehlerprotokoll, Bericht für Claude | 3 Min |

## Der Kreislauf

```
  „ich möchte heute lernen“
            ↓
  npm run plan          →  was ist fällig, was war zuletzt dran
            ↓
  Claude baut die Einheit, pusht sie
            ↓
  Lernen in der App
            ↓
  Bericht kopieren, in den Chat werfen
            ↓
  npm run report        →  Leitner-Boxen und Vorlieben wandern
            ↓
  beim nächsten Mal weiss Claude mehr
```

Der Fortschritt liegt im Browser (`localStorage`). Der kopierte Bericht ist die
Brücke zurück ins Repository – anders kommt eine Seite ohne Server nicht an
ihre eigenen Daten.

## Befehle

```bash
npm run plan            # Lernstand und Vorschlag für heute
npm run plan -- es      # nur Spanisch
npm run validate        # Lektionen prüfen
npm run build           # Manifest, Profil-Spiegel und Offline-Vorrat erneuern
npm run bundle          # sprachen.html neu pressen
npm run check           # alles drei, vor jedem Commit
npm run report -- <datei>   # Bericht aus der App einlesen
node tools/new-lesson.mjs fr <kurzname>   # Gerüst anlegen
```

## Wo was liegt

```
sprachen.html           die Einzeldatei zum Weitergeben (erzeugt)
index.html              Gerüst der App im Ordnerbetrieb
assets/js/core.js       Registry, Zustand, Klang, Textvergleich
assets/js/tasks.js      die sechs Aufgabentypen
assets/js/stations.js   die sechs Stationen
assets/js/app.js        Router und Rahmen
lessons/es|fr/*.js      je eine Lektion, ruft LEKTION.register()
learner/profile.json    Niveau, Ziele, Vorlieben
learner/curriculum.json 50 Grammatikthemen mit Leitner-Boxen
learner/history.json    jede abgeschlossene Einheit
tools/                  planen, prüfen, bauen, einlesen
docs/QUELLEN.md         kuratierte Hör- und Lesequellen
docs/METHODIK.md        warum die Einheit so gebaut ist
CLAUDE.md               Betriebshandbuch für Claude
```

Erzeugte Dateien – nicht von Hand ändern: `sprachen.html`, `lessons/manifest.js`,
`learner/profile.js`, der `PRECACHE`-Block in `sw.js`.
