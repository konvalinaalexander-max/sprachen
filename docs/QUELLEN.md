# Quellen fürs Hören und Lesen

Stand 13. September 2026.

## Wie das Hören jetzt funktioniert

Früher stand in der Lektion ein Link auf eine Website. Das war schlecht: mal
landete man auf einer Abo-Seite, mal wusste man nicht, welche Folge gemeint war.

Jetzt trägt jede Quelle nur noch eine **iTunes-Kennung**. Die App fragt damit im
Browser die öffentliche Apple-Schnittstelle nach der Folgenliste, nimmt die
neueste Folge in der passenden Länge und hängt die **Audiodatei direkt in den
Player**. Auf dem Bildschirm stehen Titel, Datum und Dauer – es gibt keine Frage
mehr, welche Folge gemeint ist. Wer eine andere will, klappt die Liste auf.

Zwei Wege werden probiert, weil einer immer klemmt: erst `fetch`, dann JSONP
(ein `<script>`-Tag, das auch ohne CORS und über `file://` funktioniert). Klappt
beides nicht – meist weil man offline ist –, erscheint ein ehrlicher Hinweis mit
zwei Direktlinks statt eines kaputten Players.

**Auswahlkriterien:** kostenlos, ohne Bezahlschranke, vollständig in der
Zielsprache. Sendungen mit englischen Erklärstrecken (Coffee Break, die
Duolingo-Podcasts, News in Slow) fallen raus – sie brechen die Immersion genauso
wie Deutsch.

---

## Spanisch

| Quelle | iTunes-ID | Niveau | Länge | Transkript |
|---|---|---|---|---|
| [Español con Juan](https://1001reasonstolearnspanish.com/podcasts/) | `976549237` | B1–B2 | 10–30 Min | teilweise |
| [Charlas Hispanas](https://charlashispanas.com/) | `1496665566` | B1 | 4–15 Min | ja |
| [Radio Ambulante](https://radioambulante.org/) | `527614348` | C1 | 25–35 Min | ja, vollständig |

**Español con Juan** ist die Standardwahl: Juan spricht allein, komplett auf
Spanisch, über Alltägliches. Nicht zu schnell, nicht zu langsam – genau eine
Stufe über B1. **Charlas Hispanas** für Tage mit wenig Energie, kurze Folgen.
**Radio Ambulante** ist eigentlich zu schwer, aber es ist Erzähljournalismus von
NPR, und die Geschichten ziehen einen durch. Für den Tag mit Lust auf Kampf.

### Lesen (als Vorlage für eigene Texte)
- [El País](https://elpais.com/) – Standardzeitung, B2+
- [BBC Mundo](https://www.bbc.com/mundo) – kürzer, klarer gebaut, B1+
- [Practica Español](https://practicaespanol.com/) – Agenturmeldungen nach Niveau sortiert

---

## Französisch

| Quelle | iTunes-ID | Niveau | Länge | Transkript |
|---|---|---|---|---|
| [Journal en français facile (RFI)](https://francaisfacile.rfi.fr/) | `1573764973` | A2–B1 | 10 Min | ja |
| [One Thing In A French Day](https://onethinginafrenchday.podbean.com/) | `210206924` | A2–B1 | 3–6 Min | ja |
| [Français Authentique](https://www.francaisauthentique.com/) | `500549470` | A2–B1 | 5–20 Min | ja |
| [InnerFrench](https://innerfrench.com/podcast/) | `1231472946` | B1–B2 | 20–40 Min | ja |

**RFI** ist die Hauptquelle: echte Nachrichten, werktags neu, langsam gesprochen,
öffentlich-rechtlich und mit Transkript. Genau das Format, das gewünscht war.
**One Thing In A French Day** ist das Gegenteil – drei Minuten Pariser Alltag,
sehr sanft. **Français Authentique** erklärt Ausdrücke, ohne je in eine andere
Sprache zu wechseln. **InnerFrench** ist das Ziel, auf das hingearbeitet wird.

### Lesen
- [1jour1actu](https://www.1jour1actu.com/) – Nachrichten für Kinder, sprachlich ideal für A2
- [RFI Savoirs](https://savoirs.rfi.fr/) – Lernmaterial mit Transkripten
- [Le Monde](https://www.lemonde.fr/) – für später

---

## Warum die Lesetexte selbst geschrieben sind

Bewusste Entscheidung, kein Kompromiss:

1. **Niveau trifft genau.** Ein echter Zeitungsartikel ist für A2 unbrauchbar und für B1 zufällig mal zu leicht, mal zu schwer.
2. **Die Zielgrammatik kommt oft genug vor.** In einem gefundenen Text steht das Imperfecto vielleicht zweimal. Zu wenig, um ein Muster zu sehen.
3. **Offline.** Ein Text im Repository ist immer da. Ein Link ist es nicht.
4. **Urheberrecht.** Fremde Artikel gehören nicht in ein fremdes Repository.

Authentizität geht dabei nicht verloren: Themen und Tonfall kommen aus echten
Quellen, oft direkt nach einer realen Meldung gebaut.

**Beim Hören ist es umgekehrt** – da wurde ausdrücklich echtes Material verlangt,
und das ist richtig so: Nachrichtensprecher, Podcast-Gäste und Interviewpartner
klingen anders als jedes Lehrwerk.

## Wenn eine Quelle nicht mehr geht

iTunes-Kennungen sind langlebig, aber Sendungen werden eingestellt. Wenn der
Player dauerhaft nichts findet: neue Kennung suchen (die Zahl hinter `id` in
jeder `podcasts.apple.com`-Adresse), hier eintragen und in den betroffenen
Lektionen ersetzen.
