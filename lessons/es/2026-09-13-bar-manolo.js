/* es-2026-09-13-bar-manolo */
LEKTION.register({
  id: 'es-2026-09-13-bar-manolo',
  lang: 'es',
  level: 'B1',
  date: '2026-09-13',
  minutes: 36,
  title: 'Das letzte Bar im Viertel',
  subtitle: 'Eine Geschichte aus Madrid – und die zwei Vergangenheiten, ohne die man auf Spanisch nichts erzählen kann.',

  intro: {
    hook: 'Spanisch hat zwei Vergangenheiten, und Deutsch nur eine. Genau da geht es schief.\n\nDenk an einen Film: Es gibt die *Handlung* – jemand kommt herein, sagt etwas, geht wieder. Und es gibt die *Kulisse* – es war Winter, das Licht war schlecht, alle waren müde. Handlung ist Indefinido. Kulisse ist Imperfecto.\n\nHeute liest du die Geschichte einer Bar, die 47 Jahre lang jeden Morgen um sechs aufmachte. Achte beim Lesen darauf, wann der Text erzählt – und wann er beschreibt.',
    grammar: [{
      id: 'es-indefinido-imperfecto',
      name: 'Indefinido vs. Imperfecto',
      why: 'Die Erzähl-Achse des Spanischen. Wer das kann, klingt sofort erwachsen.',
      explain: 'Beide sind Vergangenheit. Die Frage ist nie „wann?“, sondern: *Bringt der Satz die Geschichte voran – oder baut er die Bühne?*\n\n_Indefinido_ (compró, cerró, entró): ein Ereignis, abgeschlossen, es passiert und ist vorbei. Die Kamera läuft weiter.\n\n_Imperfecto_ (tenía, había, conocía): Zustand, Gewohnheit, Beschreibung. Kein Anfang, kein Ende – es war einfach so. Die Kamera schwenkt über die Szene.',
      table: {
        head: ['', 'Indefinido', 'Imperfecto'],
        rows: [
          ['Frage dahinter', '*Was geschah dann?*', '*Wie war es?*'],
          ['-ar (comprar)', 'compr_é_, compr_aste_, compr_ó_', 'compr_aba_, compr_abas_, compr_aba_'],
          ['-er/-ir (vender)', 'vend_í_, vend_iste_, vend_ió_', 'vend_ía_, vend_ías_, vend_ía_'],
          ['Unregelmässig', 'fui, tuve, hizo, estuvo, dijo', 'nur drei: _era_, _iba_, _veía_'],
          ['Signalwörter', 'un día, ayer, en 1978, de repente', 'siempre, cada mañana, mientras, antes'],
          ['Typische Rolle', 'Ereigniskette', 'Hintergrund, Alter, Wetter, Gefühl']
        ]
      },
      examples: [
        { src: 'El barrio _era_ otro. _Había_ talleres y una fábrica.', de: 'Das Viertel war ein anderes. Es gab Werkstätten und eine Fabrik.', note: 'Kulisse – so sah es damals eben aus.' },
        { src: 'Un martes de marzo, la fábrica _cerró_.', de: 'An einem Dienstag im März schloss die Fabrik.', note: 'Ereignis. Ein Punkt auf der Zeitachse, die Geschichte springt vorwärts.' },
        { src: 'Los clientes _pedían_ un carajillo hasta que _sonó_ la sirena.', de: 'Die Gäste bestellten (immer) einen Carajillo, bis die Sirene ertönte.', note: 'Beide zusammen: die laufende Gewohnheit wird von einem Ereignis unterbrochen. Das ist das Grundmuster.' },
        { src: 'Cuando su mujer _murió_, _pensó_ en cerrar.', de: 'Als seine Frau starb, dachte er ans Aufhören.', note: 'Zwei Ereignisse nacheinander – kein Hintergrund weit und breit.' }
      ],
      pitfalls: [
        'Deutsch hilft dir hier *nicht*. „Er hatte eine Bar“ kann beides sein: _tenía un bar_ (jahrelang, Zustand) oder _tuvo un bar_ (von 1978 bis 2025, abgeschlossener Block). Frag dich immer: Kulisse oder Ereignis?',
        'Bestimmte Verben kippen die Bedeutung. _Conocía a Manuel_ = ich kannte ihn. _Conocí a Manuel_ = ich lernte ihn kennen. Ebenso: _sabía_ (wusste) / _supe_ (erfuhr), _quería_ (wollte) / _quise_ (versuchte tatsächlich).',
        'Eine Zeitspanne mit Anfang UND Ende ist Indefinido, auch wenn sie ewig gedauert hat: _Durante cuarenta y siete años, el bar abrió cada mañana._ Der ganze Block ist abgeschlossen.'
      ]
    }],
    vocab: [
      { term: 'el taller', pos: 'sustantivo', de: 'die Werkstatt', example: 'Había talleres, pescaderías y una fábrica de muebles.' },
      { term: 'la pescadería', pos: 'sustantivo', de: 'der Fischladen', example: 'Las pescaderías se convirtieron en cafeterías.' },
      { term: 'el mono (de trabajo)', pos: 'sustantivo', de: 'der Blaumann, Overall', example: 'Los clientes entraban con el mono de trabajo.' },
      { term: 'el carajillo', pos: 'sustantivo', de: 'Kaffee mit einem Schuss Schnaps', example: 'Pedían un carajillo y discutían de fútbol.' },
      { term: 'la hostelería', pos: 'sustantivo', de: 'das Gastgewerbe', example: 'No sabía nada de hostelería, pero sabía hacer café.' },
      { term: 'despedir', pos: 'verbo', de: 'entlassen', example: 'Primero despidieron a cincuenta trabajadores.' },
      { term: 'vaciarse', pos: 'verbo', de: 'sich leeren', example: 'Entendí que el barrio se estaba vaciando.' },
      { term: 'el piso turístico', pos: 'sustantivo', de: 'die Ferienwohnung', example: 'Los talleres se convirtieron en pisos turísticos.' },
      { term: 'resistir', pos: 'verbo', de: 'durchhalten, standhalten', example: 'Manuel resistió veinte años más.' },
      { term: 'cobrar', pos: 'verbo', de: 'kassieren, Geld verlangen', example: 'Manuel no le cobró.' },
      { term: 'el jubilado', pos: 'sustantivo', de: 'der Rentner', example: 'Era Andrés, jubilado, ochenta y un años.' },
      { term: 'el propietario', pos: 'sustantivo', de: 'der Eigentümer, Vermieter', example: 'El propietario quiere abrir una tienda de ropa.' },
      { term: 'añadir', pos: 'verbo', de: 'hinzufügen', example: 'Luego se ríe y añade una frase.' },
      { term: 'exagerar', pos: 'verbo', de: 'übertreiben', example: 'Tampoco hay que exagerar.' }
    ]
  },

  reading: {
    title: 'El último bar del barrio',
    kicker: 'Reportage',
    source: {
      kind: 'adaptiert',
      note: 'Nach dem Muster spanischer Lokalreportagen für dich auf B1 geschrieben'
    },
    glossary: [
      { term: 'hostelería', de: 'Gastgewerbe' },
      { term: 'talleres', de: 'Werkstätten' },
      { term: 'mono de trabajo', de: 'Blaumann, Arbeitsoverall' },
      { term: 'carajillo', de: 'Kaffee mit Schnaps' },
      { term: 'sirena', de: 'Sirene (Schichtende)' },
      { term: 'despidieron', de: 'sie entließen (despedir)' },
      { term: 'se estaba vaciando', de: 'leerte sich gerade' },
      { term: 'pisos turísticos', de: 'Ferienwohnungen' },
      { term: 'jubilado', de: 'Rentner' },
      { term: 'cobró', de: 'er kassierte (cobrar)' }
    ],
    paragraphs: [
      {
        text: 'Durante cuarenta y siete años, el Bar Manolo abrió cada mañana a las seis. Manuel Ortega, que entonces tenía veintidós años, lo compró en 1978 con el dinero que su padre le había dejado. No sabía nada de hostelería, pero sabía hacer café.',
        de: 'Siebenundvierzig Jahre lang öffnete die Bar Manolo jeden Morgen um sechs. Manuel Ortega, damals zweiundzwanzig, kaufte sie 1978 mit dem Geld, das sein Vater ihm hinterlassen hatte. Er wusste nichts über das Gastgewerbe, aber er konnte Kaffee machen.'
      },
      {
        text: 'El barrio era otro. Había talleres, pescaderías y una fábrica de muebles que daba trabajo a doscientas personas. Los clientes entraban con el mono de trabajo, pedían un carajillo y discutían de fútbol hasta que sonaba la sirena. Manuel los conocía a todos por su nombre.',
        de: 'Das Viertel war ein anderes. Es gab Werkstätten, Fischläden und eine Möbelfabrik, die zweihundert Menschen Arbeit gab. Die Gäste kamen im Blaumann herein, bestellten einen Carajillo und stritten über Fußball, bis die Sirene ertönte. Manuel kannte sie alle beim Namen.'
      },
      {
        text: 'Un martes de marzo, la fábrica cerró. Fue rápido: primero despidieron a cincuenta trabajadores, luego a cien, y en junio ya no quedaba nadie. "Aquel verano entendí que el barrio se estaba vaciando", cuenta Manuel. Poco a poco, los talleres se convirtieron en pisos turísticos y las pescaderías en cafeterías donde un café cuesta cuatro euros.',
        de: 'An einem Dienstag im März schloss die Fabrik. Es ging schnell: Zuerst entließen sie fünfzig Arbeiter, dann hundert, und im Juni war niemand mehr übrig. „In jenem Sommer begriff ich, dass sich das Viertel leerte“, erzählt Manuel. Nach und nach wurden aus den Werkstätten Ferienwohnungen und aus den Fischläden Cafés, in denen ein Kaffee vier Euro kostet.'
      },
      {
        text: 'Manuel resistió veinte años más. Subió el precio del café una sola vez, de un euro a un euro diez, y lo hizo pidiendo perdón. Cuando su mujer murió en 2019, pensó en cerrar, pero no lo hizo. "Mientras entrara alguien por esa puerta, yo estaba aquí."',
        de: 'Manuel hielt noch zwanzig Jahre durch. Den Kaffeepreis erhöhte er ein einziges Mal, von einem Euro auf einen Euro zehn – und entschuldigte sich dabei. Als seine Frau 2019 starb, dachte er ans Aufhören, tat es aber nicht. „Solange jemand durch diese Tür kam, war ich hier.“'
      },
      {
        text: 'El viernes pasado entró el último cliente. Era Andrés, jubilado, ochenta y un años, cliente desde 1981. Pidió lo de siempre. Manuel no le cobró.',
        de: 'Letzten Freitag kam der letzte Gast herein. Es war Andrés, Rentner, einundachtzig Jahre, Stammgast seit 1981. Er bestellte das Übliche. Manuel kassierte nichts.'
      },
      {
        text: 'Ahora el local está vacío. El propietario quiere abrir una tienda de ropa. Manuel tiene sesenta y nueve años y dice que va a dormir hasta las nueve por primera vez en su vida. Luego se ríe y añade: "Bueno, hasta las siete. Tampoco hay que exagerar."',
        de: 'Jetzt steht das Lokal leer. Der Eigentümer will einen Kleiderladen eröffnen. Manuel ist neunundsechzig und sagt, er werde zum ersten Mal in seinem Leben bis neun schlafen. Dann lacht er und fügt hinzu: „Na gut, bis sieben. Man muss es ja nicht übertreiben.“'
      }
    ]
  },

  tasks: [
    {
      type: 'evidence',
      kind: 'Textdetektiv',
      prompt: 'Manuel kaufte die Bar mit geerbtem Geld.',
      verdict: 'richtig',
      evidence: 'con el dinero que su padre le había dejado',
      explain: 'Im Text steht: *lo compró en 1978 con el dinero que su padre le había dejado*. Nebenbei siehst du dort das Plusquamperfekt (había dejado) – die Vorvergangenheit: Der Vater hatte ihm das Geld hinterlassen, bevor Manuel kaufte.'
    },
    {
      type: 'evidence',
      kind: 'Textdetektiv',
      prompt: 'Die Fabrik entließ alle Arbeiter am selben Tag.',
      verdict: 'falsch',
      evidence: 'primero despidieron a cincuenta trabajadores, luego a cien',
      explain: 'Es lief gestaffelt: *primero … luego … y en junio ya no quedaba nadie*. Achte auf die Zeitformen: die Entlassungen sind Ereignisse (Indefinido), aber *quedaba* beschreibt einen Zustand – deshalb Imperfecto.'
    },
    {
      type: 'evidence',
      kind: 'Textdetektiv',
      prompt: 'Manuel will in einem anderen Viertel eine neue Bar aufmachen.',
      verdict: 'unklar',
      explain: 'Davon steht kein Wort im Text. Er sagt nur, dass er ausschlafen will – und nimmt das sofort wieder halb zurück. Die Kunst beim Leseverstehen ist, nicht zu ergänzen, was plausibel klingt.'
    },
    {
      type: 'choice',
      kind: 'Blitzrunde',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Warum heisst es *El barrio era otro* – und nicht *fue otro*?',
      options: [
        { text: 'Weil beschrieben wird, wie das Viertel damals war – Kulisse, kein Ereignis.', why: 'Genau. Keine Handlung, kein Anfang, kein Ende: nur der Zustand von damals. Klassisches Imperfecto.' },
        { text: 'Weil es lange gedauert hat.', why: 'Dauer allein entscheidet nicht. *Durante cuarenta y siete años, el bar abrió* dauerte auch lange – und steht trotzdem im Indefinido, weil der Zeitraum als abgeschlossener Block erzählt wird.' },
        { text: 'Weil *ser* immer im Imperfecto steht.', why: 'Nein. *Fue rápido* steht im selben Text im Indefinido. Es kommt auf die Rolle im Satz an, nicht auf das Verb.' },
        { text: 'Weil kein konkretes Datum genannt wird.', why: 'Auch ohne Datum kann Indefinido stehen: *Un día cerró*. Der Unterschied ist Kulisse gegen Ereignis, nicht Datum gegen kein Datum.' }
      ],
      answer: 0,
      praise: 'Genau die richtige Frage gestellt.'
    },
    {
      type: 'transform',
      kind: 'Verwandler',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Der Satz steht in der Gegenwart. Erzähl ihn als *Gewohnheit von damals*.',
      source: 'Cada mañana abre a las seis y saluda a todos por su nombre.',
      answer: [
        'Cada mañana abría a las seis y saludaba a todos por su nombre.',
        'Cada mañana abría a las seis y saludaba a todos por sus nombres.'
      ],
      hint: '„Cada mañana“ ist das Signal. Beide Verben landen in derselben Zeit.',
      explain: '*Cada mañana* schreit Gewohnheit – also Imperfecto: _abría_, _saludaba_. Mit Indefinido (_abrió, saludó_) würde daraus ein einziger Morgen statt eines ganzen Lebensabschnitts.'
    },
    {
      type: 'forge',
      kind: 'Satzschmiede',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Bau den Satz: *Die Gäste bestellten (immer) einen Carajillo, bis die Sirene ertönte.*',
      solution: 'Los clientes pedían un carajillo hasta que sonó la sirena',
      alsoAccept: ['Los clientes pedían un carajillo hasta que sonaba la sirena'],
      distractors: ['pidieron', 'sonaba', 'estaban'],
      explain: 'Das Grundmuster jeder spanischen Erzählung: laufender Hintergrund im Imperfecto (_pedían_), unterbrochen von einem Ereignis im Indefinido (_sonó_). Die Sirene ist der Knall, der die Szene beendet.'
    },
    {
      type: 'pairs',
      kind: 'Paarjagd',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Diese Verben ändern ihre Bedeutung je nach Zeitform. Finde die Paare.',
      pairs: [
        ['conocía a Manuel', 'ich kannte Manuel (schon länger)'],
        ['conocí a Manuel', 'ich lernte Manuel kennen'],
        ['sabía la verdad', 'ich wusste die Wahrheit'],
        ['supe la verdad', 'ich erfuhr die Wahrheit'],
        ['quería cerrar', 'ich wollte schliessen'],
        ['quise cerrar', 'ich versuchte zu schliessen']
      ],
      explain: 'Bei *conocer, saber, querer, poder* ist der Unterschied nicht die Dauer, sondern die Bedeutung. Imperfecto = der Zustand. Indefinido = der Moment, in dem der Zustand einsetzt oder ein Versuch stattfand.'
    },
    {
      type: 'write',
      kind: 'Freischreiben',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Jetzt du: Erzähl von einem Ort aus deiner Kindheit, den es nicht mehr gibt. Erst die Kulisse (Imperfecto), dann was passierte (Indefinido).',
      placeholder: 'Cuando yo era pequeño, había …',
      minWords: 35,
      mustUse: ['era', 'había', 'un día'],
      checklist: [
        'Ich habe mit einer Beschreibung im Imperfecto angefangen (era, había, tenía …).',
        'Mindestens ein Ereignis steht im Indefinido (cerró, vino, se fue …).',
        'Ich habe kein Ereignis versehentlich ins Imperfecto gesetzt.',
        'Ich habe mich getraut, einen Satz zu schreiben, der länger ist als nötig.'
      ],
      model: 'Cuando yo era pequeño, había una papelería en la esquina de mi calle. La dueña se llamaba Rosa y siempre tenía un caramelo debajo del mostrador. Los sábados yo iba con mi abuelo y comprábamos el periódico. Un día de invierno, Rosa no abrió. Estuvo enferma tres semanas y después vendió la tienda. Ahora hay un banco. Nunca entré.'
    }
  ],

  listening: {
    headline: 'Und jetzt echtes Spanisch, ungebremst',
    intro: 'Zehn bis fünfzehn Minuten, gesprochen von Muttersprachlern für Muttersprachler-Tempo. Du wirst nicht alles verstehen – das ist keine Panne, das ist der Punkt. Dein Ohr lernt gerade Spanisch, nicht dein Kopf.',
    source: {
      name: 'Hoy Hablamos',
      icon: '🎙️',
      kind: 'Podcast, täglich',
      duration: '10–15 Min',
      level: 'B1–B2',
      what: 'Jeden Werktag eine Folge zu Kultur, Alltag und Aktuellem aus Spanien. Deutlich gesprochen, aber ohne Lern-Zeitlupe – genau die Stufe über dem, wo du stehst.',
      url: 'https://hoyhablamos.com/',
      cta: 'Podcast öffnen',
      transcript: true,
      pick: 'Nimm die neueste Folge, die 10–15 Minuten lang ist. Wenn dich ein Titel neugierig macht: nimm den. Interesse schlägt Niveau.'
    },
    alternatives: [
      { name: 'News in Slow Spanish (Intermediate)', url: 'https://www.newsinslowspanish.com/home/news/intermediate', why: 'Wenn Hoy Hablamos heute zu schnell ist – gleiche Inhalte, halbes Tempo, mit mitlaufendem Transkript.' },
      { name: 'Charlas Hispanas', url: 'https://charlashispanas.com/', why: 'Kurze Folgen zu Wortschatz und Landeskunde, mit vollständiger Transkription.' },
      { name: 'Radio Ambulante (NPR)', url: 'https://radioambulante.org/', why: 'Echter Erzähljournalismus aus ganz Lateinamerika. Anspruchsvoll (C1), aber die Geschichten ziehen einen durch – und alle Folgen haben Transkript.' },
      { name: 'RTVE Play Radio', url: 'https://www.rtve.es/play/radio/', why: 'Öffentlich-rechtliches Radio aus Spanien. Nachrichten, ungefiltert, kein Lernmaterial.' }
    ],
    pretask: [
      { term: 'el barrio', de: 'das Stadtviertel' },
      { term: 'el alquiler', de: 'die Miete' },
      { term: 'según', de: 'laut, gemäss' },
      { term: 'la encuesta', de: 'die Umfrage' },
      { term: 'a lo largo de', de: 'im Laufe von' },
      { term: 'en cuanto a', de: 'was … betrifft' },
      { term: 'sin embargo', de: 'jedoch, allerdings' },
      { term: 'darse cuenta de', de: 'etwas bemerken' }
    ]
  },

  outro: 'Eine Bar, zwei Vergangenheiten, ein ganzes Stadtviertel. Noch kurz drei Fragen – damit die nächste Einheit genauer auf dich passt.'
});
