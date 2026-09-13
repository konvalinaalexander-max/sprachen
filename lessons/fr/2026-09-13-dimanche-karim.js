/* fr-2026-09-13-dimanche-karim */
LEKTION.register({
  id: 'fr-2026-09-13-dimanche-karim',
  lang: 'fr',
  level: 'A2',
  date: '2026-09-13',
  minutes: 32,
  title: 'Ein Sonntag in Marseille',
  subtitle: "Die eine Vergangenheitsform, mit der du auf Französisch sofort erzählen kannst – passé composé mit avoir.",

  intro: {
    hook: "Auf Französisch erzählst du fast alles Vergangene mit zwei Bausteinen: einer Form von *avoir* und einem *participe passé*. Mehr braucht es erst mal nicht.\n\nJ'ai mangé. Il a dormi. Nous avons pris le bus. Fertig.\n\nHeute begleitest du Karim durch seinen freien Sonntag – und wirst merken, dass fast jeder Satz dieser Geschichte nach demselben Muster gebaut ist. Wenn du das Muster einmal siehst, siehst du es überall.",
    grammar: [{
      id: 'fr-passe-compose-avoir',
      name: 'Passé composé mit avoir',
      why: "Die Standard-Vergangenheit. Rund 90% aller französischen Verben bilden sie mit avoir.",
      explain: "Zwei Teile, immer in dieser Reihenfolge:\n\n*avoir im Präsens* + *participe passé*\n\nDas Partizip ändert sich nicht – egal wer spricht. _J'ai mangé_, _elles ont mangé_: dasselbe Wort. Das macht diese Zeit so bequem.",
      table: {
        head: ['avoir', 'Beispiel', 'Deutsch'],
        rows: [
          ["j'_ai_", "j'ai mangé", 'ich habe gegessen'],
          ['tu _as_', 'tu as dormi', 'du hast geschlafen'],
          ['il / elle _a_', 'elle a pris le bus', 'sie hat den Bus genommen'],
          ['nous _avons_', 'nous avons marché', 'wir sind gelaufen'],
          ['vous _avez_', 'vous avez entendu', 'ihr habt gehört'],
          ['ils / elles _ont_', 'ils ont payé', 'sie haben bezahlt']
        ]
      },
      examples: [
        { src: "Karim _a dormi_ jusqu'à dix heures.", de: 'Karim hat bis zehn Uhr geschlafen.', note: 'dormir → dormi. Verben auf -ir hängen meist einfach -i an.' },
        { src: "Il _a préparé_ un café et il _a ouvert_ la fenêtre.", de: 'Er machte einen Kaffee und öffnete das Fenster.', note: 'préparer → préparé (regelmässig), ouvrir → ouvert (unregelmässig). Beide brauchen avoir.' },
        { src: "Ils _ont pris_ le bus.", de: 'Sie nahmen den Bus.', note: 'prendre → pris. Die häufigen Verben sind unregelmässig – wie im Deutschen auch.' },
        { src: "Il _n'a pas_ dormi.", de: 'Er hat nicht geschlafen.', note: 'Die Verneinung legt sich um *avoir*, nicht um das Partizip. Nie: _il a pas dormi_ in geschriebenem Französisch.' }
      ],
      pitfalls: [
        "Das Partizip passt sich bei *avoir* nicht an das Subjekt an. *Elle a mangé* – nicht _mangée_. (Bei *être* wäre das anders, aber das ist ein Thema für ein andermal.)",
        "Ein paar sehr häufige Verben nehmen nicht avoir, sondern *être*: aller, venir, partir, arriver, rester, entrer, sortir, monter, descendre, naître, mourir, tomber. _J'ai allé_ gibt es nicht – es heisst _je suis allé_. Merk dir für heute nur: Bewegungsverben sind anders.",
        "*ne … pas* umschliesst nur die Form von avoir: _je n'ai pas compris_. Das Partizip bleibt draussen vor der Tür."
      ]
    }],
    vocab: [
      { term: "d'habitude", pos: 'adverbe', de: 'normalerweise', example: "D'habitude, il travaille le samedi." },
      { term: 'la boulangerie', pos: 'nom f.', de: 'die Bäckerei', example: "Il travaille à la boulangerie de son oncle." },
      { term: 'dehors', pos: 'adverbe', de: 'draussen', example: "Dehors, il a entendu les cloches." },
      { term: 'la cloche', pos: 'nom f.', de: 'die Glocke', example: "les cloches de l'église" },
      { term: 'le contraire', pos: 'nom m.', de: 'das Gegenteil', example: "Il a fait exactement le contraire." },
      { term: 'le portefeuille', pos: 'nom m.', de: 'das Portemonnaie', example: "Bastien a oublié son portefeuille." },
      { term: 'oublier', pos: 'verbe', de: 'vergessen', example: "Il a oublié son portefeuille — comme toujours." },
      { term: 'marcher', pos: 'verbe', de: 'gehen, zu Fuss laufen', example: "Ils ont marché jusqu'au parc." },
      { term: 'le bateau', pos: 'nom m.', de: 'das Boot, das Schiff', example: "Ils ont regardé les bateaux." },
      { term: 'retrouver', pos: 'verbe', de: 'jemanden treffen (verabredet)', example: "Karim a retrouvé sa sœur au cinéma." },
      { term: 'ennuyeux', pos: 'adjectif', de: 'langweilig', example: "Le film était long et un peu ennuyeux." },
      { term: 'presque', pos: 'adverbe', de: 'fast, beinahe', example: "Mais il n'a pas dormi. Presque." },
      { term: 'avoir de la chance', pos: 'expression', de: 'Glück haben', example: "On a de la chance d'habiter ici." }
    ]
  },

  reading: {
    title: 'Le dimanche de Karim',
    kicker: 'Kurzgeschichte',
    source: { kind: 'adaptiert', note: 'Für dich auf A2 geschrieben – jeder Satz benutzbar' },
    glossary: [
      { term: "D'habitude", de: 'normalerweise' },
      { term: 'Dehors', de: 'draussen' },
      { term: 'cloches', de: 'Glocken' },
      { term: 'le contraire', de: 'das Gegenteil' },
      { term: 'portefeuille', de: 'Portemonnaie' },
      { term: 'ennuyeux', de: 'langweilig' },
      { term: 'Presque', de: 'fast' }
    ],
    paragraphs: [
      {
        text: "Dimanche dernier, Karim a dormi jusqu'à dix heures. C'est rare. D'habitude, il travaille le samedi et le dimanche à la boulangerie de son oncle.",
        de: 'Letzten Sonntag hat Karim bis zehn Uhr geschlafen. Das ist selten. Normalerweise arbeitet er samstags und sonntags in der Bäckerei seines Onkels.'
      },
      {
        text: "Il a préparé un café très fort et il a ouvert la fenêtre. Dehors, il a entendu les cloches de l'église et les cris des enfants sur la place. Il a pensé : « Aujourd'hui, je ne fais rien. »",
        de: 'Er machte sich einen sehr starken Kaffee und öffnete das Fenster. Draussen hörte er die Kirchenglocken und das Rufen der Kinder auf dem Platz. Er dachte: „Heute tue ich gar nichts.“'
      },
      {
        text: "Alors il a fait exactement le contraire. Il a téléphoné à son ami Bastien et ils ont pris le bus jusqu'au Vieux-Port de Marseille. Ils ont mangé des sardines grillées dans un petit restaurant. Karim a payé, parce que Bastien a oublié son portefeuille — comme toujours.",
        de: 'Also tat er genau das Gegenteil. Er rief seinen Freund Bastien an, und sie nahmen den Bus zum Alten Hafen von Marseille. Sie assen gegrillte Sardinen in einem kleinen Restaurant. Karim bezahlte, weil Bastien sein Portemonnaie vergessen hatte – wie immer.'
      },
      {
        text: "L'après-midi, ils ont marché jusqu'au parc et ils ont regardé les bateaux pendant deux heures. Ils n'ont pas beaucoup parlé. Bastien a dit une seule phrase : « On a de la chance d'habiter ici. » Karim a répondu : « Oui. »",
        de: 'Am Nachmittag liefen sie bis zum Park und schauten zwei Stunden lang den Booten zu. Sie redeten nicht viel. Bastien sagte einen einzigen Satz: „Wir haben Glück, dass wir hier wohnen.“ Karim antwortete: „Ja.“'
      },
      {
        text: "Le soir, Karim a retrouvé sa sœur au cinéma. Le film était long et un peu ennuyeux, mais il n'a pas dormi. Presque.",
        de: 'Am Abend traf Karim seine Schwester im Kino. Der Film war lang und ein bisschen langweilig, aber er schlief nicht ein. Fast.'
      }
    ]
  },

  tasks: [
    {
      type: 'evidence',
      kind: 'Textdetektiv',
      prompt: 'Karim arbeitet normalerweise auch am Sonntag.',
      verdict: 'richtig',
      evidence: 'il travaille le samedi et le dimanche à la boulangerie de son oncle',
      explain: "Steht direkt da – und zwar im Präsens, weil es eine Gewohnheit ist. Der Rest der Geschichte erzählt einen einzelnen Sonntag, deshalb passé composé."
    },
    {
      type: 'evidence',
      kind: 'Textdetektiv',
      prompt: 'Bastien hat das Essen bezahlt.',
      verdict: 'falsch',
      evidence: "Karim a payé, parce que Bastien a oublié son portefeuille",
      explain: "Umgekehrt: *Karim a payé*. Und das kleine *comme toujours* am Satzende verrät, dass Bastien das öfter macht."
    },
    {
      type: 'evidence',
      kind: 'Textdetektiv',
      prompt: 'Karim wohnt seit seiner Kindheit in Marseille.',
      verdict: 'unklar',
      explain: "Marseille kommt vor, Karims Kindheit nicht. Bastien sagt zwar *on a de la chance d'habiter ici* – aber seit wann die beiden dort wohnen, erfährst du nie. Beim Leseverstehen gilt: nur zählen, was wirklich dasteht."
    },
    {
      type: 'choice',
      kind: 'Blitzrunde',
      grammar: 'fr-passe-compose-avoir',
      prompt: 'Wie lautet das participe passé von *prendre*?',
      options: [
        { text: 'ils ont pris', why: "Richtig. *prendre → pris*. Die Familie dazu: apprendre → appris, comprendre → compris." },
        { text: 'ils ont prendu', why: "Klingt logisch, gibt es aber nicht. Die -u-Endung gehört zu Verben wie entendre → entendu, répondre → répondu. *prendre* tanzt aus der Reihe." },
        { text: 'ils ont prené', why: "-é ist die Endung der -er-Verben (parler → parlé). *prendre* endet nicht auf -er." },
        { text: 'ils ont prendé', why: "Diese Form gibt es im Französischen nicht – hier wurden Infinitiv und Endung einfach zusammengeklebt." }
      ],
      answer: 0,
      praise: 'Sitzt.'
    },
    {
      type: 'transform',
      kind: 'Verwandler',
      grammar: 'fr-passe-compose-avoir',
      prompt: 'Setz den Satz ins passé composé.',
      source: 'Il prépare un café et il ouvre la fenêtre.',
      answer: ["Il a préparé un café et il a ouvert la fenêtre."],
      hint: 'Zwei Verben, also zweimal avoir. Und ouvrir ist unregelmässig.',
      explain: "*préparer* ist brav: préparé. *ouvrir* nicht: ouvert. Jedes Verb bekommt sein eigenes *a* – man kann es nicht einmal für beide benutzen."
    },
    {
      type: 'transform',
      kind: 'Verwandler',
      grammar: 'fr-passe-compose-avoir',
      prompt: 'Verneine diesen Satz.',
      source: 'Il a dormi pendant le film.',
      answer: ["Il n'a pas dormi pendant le film.", "Il n'a pas dormi pendant le film"],
      hint: 'ne … pas legt sich um den Teil, der konjugiert ist.',
      explain: "*ne* und *pas* umschliessen *a*, nicht *dormi*: _il n'a pas dormi_. Vor einem Vokal wird ne zu n'. Genauso im Text: _Ils n'ont pas beaucoup parlé._"
    },
    {
      type: 'forge',
      kind: 'Satzschmiede',
      grammar: 'fr-passe-compose-avoir',
      prompt: 'Bau den Satz: *Sie haben gegrillte Sardinen in einem kleinen Restaurant gegessen.*',
      solution: 'Ils ont mangé des sardines grillées dans un petit restaurant',
      distractors: ['sont', 'mangés', 'ils'],
      explain: "*manger* nimmt avoir → _ils ont mangé_. Das Partizip bleibt unverändert (nicht _mangés_). Und beachte: das Adjektiv *grillées* passt sich sehr wohl an – aber an *sardines*, nicht ans Verb."
    },
    {
      type: 'pairs',
      kind: 'Paarjagd',
      grammar: 'fr-passe-compose-avoir',
      prompt: 'Infinitiv und participe passé zusammenbringen. Alle sechs kommen im Text vor.',
      pairs: [
        ['faire', 'fait'],
        ['prendre', 'pris'],
        ['dire', 'dit'],
        ['ouvrir', 'ouvert'],
        ['entendre', 'entendu'],
        ['répondre', 'répondu']
      ],
      explain: "Muster erkennen lohnt sich: -endre und -ondre werden zu -endu / -ondu. Der Rest ist Auswendiglernen – aber es sind zum Glück nur etwa dreissig Verben, und du benutzt sie täglich."
    },
    {
      type: 'write',
      kind: 'Freischreiben',
      grammar: 'fr-passe-compose-avoir',
      prompt: 'Dein letzter Sonntag. Vier bis sechs Sätze, alle im passé composé. Es darf banal sein – Karims Tag war es auch.',
      placeholder: "Dimanche dernier, j'ai …",
      minWords: 25,
      mustUse: ["j'ai", 'dimanche'],
      checklist: [
        "Jeder Vergangenheitssatz hat eine Form von *avoir* darin.",
        'Kein Partizip hat ein zusätzliches -e oder -s bekommen.',
        'Ich habe mindestens ein unregelmässiges Partizip benutzt (fait, pris, vu, eu …).',
        'Ein Satz ist verneint (n… pas).'
      ],
      model: "Dimanche dernier, j'ai dormi jusqu'à neuf heures. J'ai pris un café et j'ai lu les nouvelles. L'après-midi, j'ai téléphoné à ma mère et nous avons parlé pendant une heure. Après, j'ai fait les courses. Le soir, j'ai regardé un film avec un ami. Nous n'avons pas beaucoup aimé le film, mais nous avons beaucoup ri."
    }
  ],

  listening: {
    headline: 'Zehn Minuten echte Nachrichten',
    intro: "Jetzt kommt richtiges Französisch aus dem Radio – aber langsam gesprochen und mit einfacherem Wortschatz. RFI macht das seit Jahrzehnten für Französischlernende, jeden Abend neu. Und es gibt ein Transkript zum Mitlesen.",
    source: {
      name: 'Journal en français facile (RFI)',
      icon: '📻',
      kind: 'Nachrichten, werktags neu',
      duration: '10 Min',
      level: 'A2–B1',
      what: "Das Weltgeschehen in zehn Minuten, in klarem und langsamem Französisch – gemacht von einem echten Nachrichtensender, nicht von einer Lern-App. Zu jeder Sendung gibt es das Transkript.",
      url: 'https://francaisfacile.rfi.fr/',
      cta: 'Zur Sendung',
      transcript: true,
      pick: "Nimm die Ausgabe von heute oder gestern. Beim ersten Mal: nur die ersten fünf Minuten – das reicht völlig. Lies das Transkript erst NACH dem zweiten Durchgang, sonst liest du statt zu hören."
    },
    alternatives: [
      { name: 'RFI – Podcast-Übersicht', url: 'https://www.rfi.fr/fr/podcasts/', why: 'Falls der direkte Link nicht lädt: hier alle RFI-Podcasts, „Journal en français facile“ ist darunter.' },
      { name: 'Coffee Break French', url: 'https://coffeebreaklanguages.com/coffeebreakfrench/', why: 'Wenn Nachrichten heute zu viel sind: Dialoge mit englischer Erklärung dazwischen, ab absolutem Anfängerniveau.' },
      { name: 'News in Slow French', url: 'https://www.newsinslowfrench.com/', why: 'Dieselbe Idee wie RFI, noch etwas langsamer, mit mitlaufendem Transkript.' },
      { name: 'InnerFrench', url: 'https://innerfrench.com/podcast/', why: 'Für den Tag, an dem du mehr willst: langsames, sehr klares Französisch über Kultur und Gesellschaft (B1). Hebt dich sichtbar auf die nächste Stufe.' }
    ],
    pretask: [
      { term: 'le journal', de: 'die Nachrichtensendung' },
      { term: "aujourd'hui", de: 'heute' },
      { term: 'selon', de: 'laut, gemäss' },
      { term: 'le gouvernement', de: 'die Regierung' },
      { term: 'une grève', de: 'ein Streik' },
      { term: 'des milliers de', de: 'Tausende von' },
      { term: 'à la suite de', de: 'infolge von' },
      { term: "il s'agit de", de: 'es geht um' }
    ]
  },

  outro: "Ein banaler Sonntag – und trotzdem zwanzig Sätze Vergangenheit. Genau so lernt man das. Noch drei kurze Fragen, dann bist du durch."
});
