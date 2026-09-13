/* es-2026-09-13-moto */
LEKTION.register({
  id: 'es-2026-09-13-moto',
  lang: 'es',
  level: 'B1',
  date: '2026-09-13',
  minutes: 45,
  title: 'La noche que perdí la moto',
  subtitle: 'Madrid, julio, cuarenta grados y una Vespa de ochocientos euros. Y los dos pasados que necesitas para contar cualquier desastre.',

  intro: {
    hook: 'El español tiene dos pasados. El alemán, en la práctica, uno solo. Ahí está el problema, y no se arregla traduciendo.\n\nPiensa en cualquier historia que hayas contado en un bar. Por un lado está *lo que pasó*: salí, bebí, perdí la moto. Por otro lado está *cómo estaba todo*: hacía calor, el bar estaba lleno, yo tenía veinticuatro años y ninguna idea de nada.\n\nLo que pasó va en indefinido. Cómo estaba todo, en imperfecto.\n\nHoy lees la historia de una noche en Madrid que terminó mal. Mientras lees, fíjate en una sola cosa: cuándo el texto *avanza* y cuándo solo *describe*.',
    grammar: [{
      id: 'es-indefinido-imperfecto',
      name: 'Indefinido y imperfecto',
      why: 'Es el eje de cualquier historia en español. Sin esto no puedes contar ni una noche de viernes.',
      explain: 'Los dos son pasado. La pregunta nunca es *cuándo* pasó, sino otra: ¿esta frase hace avanzar la historia o construye el escenario?\n\n_El indefinido_ (salí, perdí, pagué) presenta un hecho terminado. Pasa y se acaba. La cámara sigue adelante.\n\n_El imperfecto_ (hacía, estaba, tenía) presenta un estado, una costumbre o una descripción. No tiene principio ni final: simplemente era así. La cámara mira alrededor.\n\nY una advertencia que ahorra muchos errores: la duración no decide nada. Tres años pueden ir en indefinido si los cuentas como un bloque cerrado.',
      table: {
        head: ['', 'Indefinido', 'Imperfecto'],
        rows: [
          ['La pregunta', '*¿Qué pasó entonces?*', '*¿Cómo estaba todo?*'],
          ['-ar (aparcar)', 'aparqu_é_, aparc_aste_, aparc_ó_', 'aparc_aba_, aparc_abas_, aparc_aba_'],
          ['-er / -ir (perder)', 'perd_í_, perd_iste_, perd_ió_', 'perd_ía_, perd_ías_, perd_ía_'],
          ['Irregulares', 'fui, tuve, hizo, estuvo, dijo, quiso', 'solo tres: _era_, _iba_, _veía_'],
          ['Palabras que avisan', 'aquella noche, a las cinco, de repente', 'siempre, cada día, mientras, todavía'],
          ['Para qué sirve', 'la cadena de hechos', 'el fondo: edad, calor, ambiente, humor']
        ]
      },
      examples: [
        { src: '_Hacía_ un calor que no se podía aguantar.',
          note: 'Decorado. Así estaba la noche, sin principio ni final.' },
        { src: 'Aquella noche _aparqué_ la moto en una calle estrecha.',
          note: 'Hecho. Un punto en la línea del tiempo; la historia salta hacia delante.' },
        { src: 'El bar _estaba_ lleno cuando _llegamos_.',
          note: 'Los dos juntos: la situación que ya existía (imperfecto) y lo que ocurre dentro de ella (indefinido). Este es el esquema básico de toda narración.' },
        { src: 'Nacho ya _llevaba_ cuatro cervezas.',
          note: 'Situación en curso. Nadie cuenta cuándo empezó ni cuándo terminó: solo cómo estaba en ese momento.' },
        { src: '_Pagué_ doscientos diez euros de multa.',
          note: 'Hecho cerrado, con su cifra y su final. Indefinido sin discusión.' }
      ],
      pitfalls: [
        'Traducir desde el alemán no te ayuda casi nunca. Una misma frase alemana puede ser _tenía una moto_ (estado, años) o _tuve una moto_ (de 2019 a 2021, bloque cerrado). Pregúntate siempre: ¿decorado o acción?',
        'Algunos verbos cambian de significado. _Conocía a Nacho_ = ya lo conocía de antes. _Conocí a una chica_ = la conocí en ese momento. Igual: _sabía_ (lo tenía en la cabeza) frente a _supe_ (me enteré), _quería_ (tenía la intención) frente a _quise_ (lo intenté de verdad).',
        'El imperfecto no significa "hace mucho tiempo". Significa que miras la acción por dentro, sin sus bordes. Por eso vale también para ayer: _ayer llovía cuando salí_.'
      ]
    }],
    vocab: [
      { term: 'aguantar', pos: 'verbo', def: 'Soportar algo desagradable sin rendirse.', example: 'Hacía un calor que no se podía aguantar.' },
      { term: 'una broma pesada', pos: 'expresión', def: 'Una broma que no hace gracia, que molesta.', example: 'Madrid en julio es una broma pesada.' },
      { term: 'de mierda', pos: 'expresión (vulgar)', def: 'Muy malo. Se usa muchísimo y en cualquier bar, pero no en una carta formal.', example: 'Un contrato de mierda en una empresa de reparto.' },
      { term: 'el reparto', pos: 'sustantivo', def: 'El trabajo de llevar paquetes o comida a casa de la gente.', example: 'Trabajaba en una empresa de reparto.' },
      { term: 'de segunda mano', pos: 'expresión', def: 'Que ya ha tenido otro dueño antes que tú.', example: 'Una Vespa de segunda mano.' },
      { term: 'el candado', pos: 'sustantivo', def: 'Cierre de metal con llave que se pone a una bici o una moto.', example: 'Le puse el candado y me fui.' },
      { term: 'merecer la pena', pos: 'expresión', def: 'Valer el esfuerzo o el tiempo que cuesta.', example: 'No pasó nada que merezca la pena.' },
      { term: 'amanecer', pos: 'verbo', def: 'Empezar a haber luz por la mañana.', example: 'Todavía no había amanecido.' },
      { term: 'el hueco', pos: 'sustantivo', def: 'Espacio vacío donde antes había algo.', example: 'Solo un hueco entre dos coches.' },
      { term: 'la comisaría', pos: 'sustantivo', def: 'La oficina donde trabaja la policía.', example: 'Fui a la comisaría a las siete.' },
      { term: 'el número de bastidor', pos: 'sustantivo', def: 'El número que identifica una moto o un coche, como su DNI.', example: 'No me sabía el número de bastidor.' },
      { term: 'el expediente', pos: 'sustantivo', def: 'El conjunto de papeles de un caso oficial.', example: 'Me dio un número de expediente.' },
      { term: 'la grúa', pos: 'sustantivo', def: 'Camión que se lleva los vehículos mal aparcados.', example: 'Se la había llevado la grúa.' },
      { term: 'la multa', pos: 'sustantivo', def: 'Dinero que pagas al Estado cuando has hecho algo prohibido.', example: 'Pagué doscientos diez euros de multa.' },
      { term: 'la señal', pos: 'sustantivo', def: 'El cartel en la calle que dice lo que está permitido y lo que no.', example: 'Yo nunca había leído la señal.' },
      { term: 'el chaval', pos: 'sustantivo (coloquial)', def: 'Chico joven. Palabra muy normal en España, nada formal.', example: 'Un chaval de diecinueve años.' }
    ]
  },

  reading: {
    title: 'La noche que perdí la moto',
    kicker: 'Primera persona',
    source: { kind: 'adaptado', note: 'Escrito para ti en el español que se habla, no en el de los libros' },
    glossary: [
      { term: 'aguantar', def: 'soportar' },
      { term: 'broma pesada', def: 'broma que no hace gracia' },
      { term: 'de mierda', def: 'muy malo (vulgar, pero normalísimo)' },
      { term: 'reparto', def: 'llevar paquetes a la gente' },
      { term: 'de segunda mano', def: 'usado, no nuevo' },
      { term: 'candado', def: 'cierre de metal con llave' },
      { term: 'reguetón', def: 'música latina de fiesta' },
      { term: 'merezca la pena', def: 'valga el esfuerzo' },
      { term: 'amanecido', def: 'llegado la luz del día' },
      { term: 'hueco', def: 'espacio vacío' },
      { term: 'comisaría', def: 'oficina de la policía' },
      { term: 'bastidor', def: 'el número que identifica la moto' },
      { term: 'expediente', def: 'papeles de un caso oficial' },
      { term: 'grúa', def: 'camión que se lleva los coches' },
      { term: 'carga y descarga', def: 'zona solo para camiones que dejan mercancía' },
      { term: 'multa', def: 'dinero que pagas por algo prohibido' },
      { term: 'chaval', def: 'chico joven' }
    ],
    paragraphs: [
      {
        text: 'Eran las once y media de la noche y hacía un calor que no se podía aguantar. Madrid en julio es una broma pesada: el asfalto sigue quemando a medianoche y la gente sale a la calle porque en casa no hay quien duerma.',
        simple: 'Era de noche y hacía muchísimo calor. En Madrid, en julio, la gente sale a la calle porque en casa no se puede dormir.'
      },
      {
        text: 'Yo tenía veinticuatro años, un contrato de mierda en una empresa de reparto y una Vespa de segunda mano que me había costado ochocientos euros y tres meses de discusiones con mi madre. Aquella noche la aparqué en una calle estrecha de Lavapiés, le puse el candado, le di dos palmadas en el asiento como un idiota y me fui a buscar a Nacho.',
        simple: 'Yo tenía veinticuatro años y una moto vieja. Aquella noche la dejé en una calle pequeña y fui a ver a mi amigo Nacho.'
      },
      {
        text: 'El bar estaba lleno. Había gente de pie hasta en la puerta, el aire olía a cerveza caliente y alguien había puesto reguetón a un volumen que no dejaba hablar. Nacho ya llevaba cuatro cervezas y estaba en esa fase en la que todo le parece una idea excelente.',
        simple: 'El bar estaba lleno de gente y había mucho ruido. Nacho ya había bebido bastante.'
      },
      {
        text: '—Nos vamos a Malasaña —dijo. —No tengo dinero. —Yo tampoco. Vamos igual.',
        simple: 'Nacho quiso ir a otro barrio. Ninguno de los dos tenía dinero, pero fueron igual.'
      },
      {
        text: 'Y fuimos. Esa parte siempre la cuento rápido, porque entre las dos y las cinco de la mañana no pasó nada que merezca la pena. Bebimos, gritamos, conocí a una chica que estudiaba Derecho y que me explicó durante veinte minutos por qué el sistema judicial español no funciona. Le di mi número. Nunca me escribió.',
        simple: 'Estuvieron de fiesta hasta las cinco. Conoció a una chica, le dio su número y ella nunca contestó.'
      },
      {
        text: 'Lo cuento sin pena. A esa edad yo repartía paquetes doce horas al día por mil doscientos euros y creía que todo era temporal: el trabajo, el piso compartido, los tres compañeros que dejaban los platos sucios cuatro días. Lo único que sentía mío era la moto.',
        simple: 'En esa época trabajaba mucho por poco dinero. Pensaba que era una situación temporal. La moto era lo único suyo.'
      },
      {
        text: 'A las cinco y media salimos. Todavía no había amanecido, pero el cielo ya tenía ese color gris sucio que en Madrid significa que has hecho algo mal. Volvimos andando hasta Lavapiés. Tardamos cuarenta minutos porque Nacho quiso comprar un bocadillo y luego se lo comió sentado en un banco, muy despacio, como si tuviera todo el tiempo del mundo.',
        simple: 'Salieron a las cinco y media y volvieron andando. Tardaron mucho porque Nacho se paró a comer.'
      },
      {
        text: 'Cuando llegué a la calle, la moto no estaba.',
        simple: 'La moto ya no estaba allí.'
      },
      {
        text: 'No había cristales rotos. No había restos del candado. No había nada. Solo un hueco entre dos coches y una mancha de aceite en el suelo. Me quedé mirando ese hueco durante dos minutos enteros, como un imbécil, esperando que apareciera.',
        simple: 'No había señales de robo. Solo un espacio vacío. Él se quedó mirando sin saber qué hacer.'
      },
      {
        text: 'Nacho fue el primero que habló. Dijo: «Tío, igual la aparcaste en otra calle.» No la había aparcado en otra calle.',
        simple: 'Nacho pensó que quizá la había dejado en otro sitio. No era verdad.'
      },
      {
        text: 'Fui a la comisaría a las siete de la mañana, sin dormir, oliendo a tabaco y con la camisa pegada a la espalda. El policía que me atendió no levantó la vista del ordenador. Me preguntó el modelo, el color y el número de bastidor. No me sabía el número de bastidor. Entonces me miró medio segundo, y en ese medio segundo cabía toda su opinión sobre mi generación.',
        simple: 'Fue a la policía muy temprano. El policía le pidió datos que él no sabía y lo miró mal.'
      },
      {
        text: 'Rellené un papel. Me dijo que lo normal es que no aparezca nunca, que en Madrid desaparecen unas veinte motos al día y que casi todas terminan en piezas. Me dio un número de expediente y volvió al ordenador. Salí a la calle y ya eran las ocho, y la ciudad había empezado otra vez como si nada.',
        simple: 'El policía le dijo que casi nunca se recuperan las motos. Él salió a la calle a las ocho.'
      },
      {
        text: 'Tres días después me llamaron. La moto había aparecido. Nadie la había robado: se la había llevado la grúa, porque aquella calle era zona de carga y descarga entre las ocho y las diez de la mañana y yo nunca había leído la señal.',
        simple: 'Tres días después le llamaron: la moto no estaba robada. Se la había llevado la grúa por aparcar mal.'
      },
      {
        text: 'Pagué doscientos diez euros de multa y ochenta y cinco de depósito. En total, casi cuatro veces lo que valía la moto en ese momento.',
        simple: 'Tuvo que pagar casi trescientos euros, mucho más de lo que valía la moto.'
      },
      {
        text: 'Vendí la Vespa en septiembre, por quinientos euros, a un chaval de diecinueve años que tenía exactamente la misma cara que yo había tenido en abril. No le dije nada de la señal. Ahora voy en metro y duermo bien.',
        simple: 'En septiembre vendió la moto a un chico joven. No le contó el problema. Ahora va en metro.'
      }
    ]
  },

  tasks: [
    {
      type: 'evidence', skill: 'verstehen',
      prompt: 'La moto no era nueva cuando la compró.',
      verdict: 'richtig',
      evidence: 'una Vespa de segunda mano que me había costado ochocientos euros',
      explain: 'Está en el segundo párrafo: *una Vespa de segunda mano*. Y fíjate en _había costado_: es pluscuamperfecto, lo que pasó **antes** de la noche que se cuenta.'
    },
    {
      type: 'evidence', skill: 'verstehen',
      prompt: 'Alguien le robó la moto aquella noche.',
      verdict: 'falsch',
      evidence: 'se la había llevado la grúa',
      explain: 'Justo lo contrario: *Nadie la había robado: se la había llevado la grúa*. El texto te lo prepara antes, cuando dice que no había cristales rotos ni restos del candado. Las pistas estaban ahí.'
    },
    {
      type: 'evidence', skill: 'verstehen',
      prompt: 'Nacho pagó una parte de la multa.',
      verdict: 'unklar',
      explain: 'El texto no dice ni una palabra sobre eso. Nacho desaparece de la historia después del banco. Lo difícil de la comprensión lectora no es entender: es no añadir lo que suena lógico pero no está escrito.'
    },
    {
      type: 'choice', skill: 'erkennen',
      grammar: 'es-indefinido-imperfecto',
      prompt: '¿Por qué el texto dice *Eran las once y media* y no *Fueron las once y media*?',
      options: [
        { text: 'Porque la hora es decorado: dice cómo estaba la escena, no lo que pasó.',
          why: 'Exacto. La hora, el tiempo y la edad son el fondo de la escena. Por eso la hora en una narración va casi siempre en imperfecto.' },
        { text: 'Porque son las once y media de la noche y no del día.',
          why: 'Eso no cambia nada gramaticalmente. *Eran las tres de la tarde* funciona igual.' },
        { text: 'Porque *ser* siempre va en imperfecto cuando se habla del pasado.',
          why: 'No. En el mismo texto tienes *Nacho fue el primero que habló*, en indefinido. Depende del papel de la frase, no del verbo.' },
        { text: 'Porque la frase está al principio del texto.',
          why: 'La posición no decide nada. Un texto puede empezar perfectamente con un hecho en indefinido.' }
      ],
      answer: 0,
      praise: 'Has hecho la pregunta correcta.'
    },
    {
      type: 'transform', skill: 'produzieren',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Esta frase está en presente. Cuéntala como una *costumbre de aquella época*.',
      source: 'Reparto paquetes doce horas al día y creo que todo es temporal.',
      answer: [
        'Repartía paquetes doce horas al día y creía que todo era temporal.',
        'Yo repartía paquetes doce horas al día y creía que todo era temporal.'
      ],
      hint: 'Tres verbos, y los tres describen cómo era tu vida entonces. Ninguno es un hecho puntual.',
      explain: 'Los tres van en imperfecto: _repartía_, _creía_, _era_. Con indefinido (_repartí, creí, fue_) sonaría a un solo día concreto, no a una etapa de la vida.'
    },
    {
      type: 'forge', skill: 'produzieren',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Construye la frase: la situación era que el bar ya estaba lleno, y dentro de esa situación ocurre la llegada.',
      solution: 'El bar estaba lleno cuando llegamos',
      alsoAccept: ['Cuando llegamos el bar estaba lleno'],
      distractors: ['estuvo', 'llegábamos', 'era'],
      explain: 'El esquema básico de toda narración española: el fondo en imperfecto (_estaba_), el hecho que ocurre dentro en indefinido (_llegamos_). Si inviertes las formas, inviertes la película.'
    },
    {
      type: 'pairs', skill: 'wortschatz',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Estos verbos cambian de significado según la forma. Une cada uno con lo que quiere decir.',
      pairs: [
        ['conocía a Nacho', 'ya lo conocía desde antes'],
        ['conocí a una chica', 'la conocí en ese momento, por primera vez'],
        ['sabía el número', 'lo tenía en la cabeza'],
        ['supe la verdad', 'me enteré de repente'],
        ['quería vender la moto', 'tenía la intención'],
        ['quise arrancarla', 'lo intenté de verdad']
      ],
      explain: 'Con *conocer, saber, querer* y *poder*, la diferencia no es de duración sino de significado. El imperfecto describe el estado; el indefinido marca el momento exacto en que ese estado empieza, o el intento concreto.'
    },
    {
      type: 'choice', skill: 'erkennen',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'En el texto: *Bebimos, gritamos, conocí a una chica.* ¿Qué pasaría con *Bebíamos, gritábamos, conocía a una chica*?',
      options: [
        { text: 'Se convertiría en una rutina repetida, no en una sola noche.',
          why: 'Justo. El imperfecto abre las acciones y las repite. Y entonces *aquella noche* ya no encajaría en la frase.' },
        { text: 'No cambiaría nada, solo suena más literario.',
          why: 'Cambia bastante. El indefinido cierra los hechos; el imperfecto los deja abiertos. Aquí el texto habla de **una** noche concreta.' },
        { text: 'Sería incorrecto: *conocer* no tiene imperfecto.',
          why: 'Sí lo tiene: _conocía_. Lo que pasa es que significa otra cosa, "ya la conocía de antes", y eso contradice la historia.' },
        { text: 'Se entendería como una suposición sobre el futuro.',
          why: 'No. El imperfecto nunca es futuro. Solo cambia la mirada: de hecho cerrado a situación abierta.' }
      ],
      answer: 0
    },
    {
      type: 'write', skill: 'produzieren',
      grammar: 'es-indefinido-imperfecto',
      prompt: 'Ahora tú. Cuenta una noche que terminó peor de lo que empezó. Primero cómo estaba todo (imperfecto), después qué pasó (indefinido). Sin filtro: nadie más lo va a leer.',
      placeholder: 'Era un viernes y yo estaba …',
      minWords: 50,
      mustUse: ['era', 'estaba', 'de repente'],
      checklist: [
        'He empezado describiendo la situación, con imperfecto (era, estaba, había, tenía…).',
        'Los hechos que hacen avanzar la historia están en indefinido (salí, perdí, dije…).',
        'No he metido ningún hecho puntual en imperfecto por error.',
        'He escrito por lo menos una frase que no habría escrito en un examen.'
      ],
      model: 'Era un viernes de febrero y estábamos en casa de Marco, que vivía en un cuarto piso sin ascensor. No teníamos ningún plan. A las once alguien dijo que había una fiesta en el otro lado de la ciudad y de repente todos estábamos en la calle buscando un taxi. No encontramos ninguno. Fuimos andando cuarenta minutos con un frío horrible y cuando llegamos la fiesta ya se había terminado. Volvimos en el primer metro de la mañana, sin hablar. Marco todavía lo cuenta como si hubiera sido una buena noche.'
    }
  ],

  listening: {
    headline: 'Y ahora, español de verdad',
    intro: 'Esto no está hecho para estudiantes: es español que habla para españoles. No vas a entenderlo todo, y no pasa nada. Tu oído está aprendiendo, aunque tu cabeza crea que no.',
    source: {
      name: 'Español con Juan',
      icon: '🎙️',
      kind: 'Podcast semanal',
      level: 'B1–B2',
      what: 'Juan habla solo, en español, sobre cosas normales: la comida, los vecinos, la nostalgia, las manías de la gente. Ni muy rápido ni muy lento. Justo el escalón siguiente al tuyo.',
      itunesId: 976549237,
      country: 'us',
      minMinutes: 8,
      maxMinutes: 35,
      homepage: 'https://1001reasonstolearnspanish.com/podcasts/',
      transcriptUrl: 'https://1001reasonstolearnspanish.com/podcasts/',
      pick: 'El episodio más reciente ya está cargado aquí arriba: dale al play y listo. Si el tema no te dice nada, abre la lista y elige otro. El interés importa más que el nivel.'
    },
    alternatives: [
      {
        name: 'Charlas Hispanas', icon: '🗣️', kind: 'Podcast diario', level: 'B1',
        what: 'Episodios cortos sobre vocabulario, expresiones y cultura de América Latina. Perfecto para un día con poca energía.',
        itunesId: 1496665566, country: 'us', minMinutes: 4, maxMinutes: 20,
        homepage: 'https://charlashispanas.com/',
        pick: 'Cualquier episodio vale. Son cortos, así que puedes escuchar dos.'
      },
      {
        name: 'Radio Ambulante', icon: '📻', kind: 'Periodismo narrativo', level: 'C1',
        what: 'Historias reales de toda América Latina: cárceles, fronteras, dinero, familias que se rompen. Es más difícil de lo que necesitas, pero las historias tiran de ti hacia delante.',
        itunesId: 527614348, country: 'us', minMinutes: 15, maxMinutes: 45,
        homepage: 'https://radioambulante.org/',
        pick: 'Para el día que quieras ponerte a prueba de verdad. En su web tienes la transcripción completa de cada episodio.'
      }
    ],
    pretask: [
      { term: 'el barrio', def: 'la parte de la ciudad donde vives' },
      { term: 'el alquiler', def: 'el dinero que pagas cada mes por una vivienda' },
      { term: 'según', def: 'de acuerdo con lo que dice alguien' },
      { term: 'la encuesta', def: 'estudio en el que se pregunta a mucha gente' },
      { term: 'a lo largo de', def: 'durante todo un periodo de tiempo' },
      { term: 'en cuanto a', def: 'hablando del tema de…' },
      { term: 'sin embargo', def: 'pero, a pesar de eso' },
      { term: 'darse cuenta de', def: 'notar algo que antes no veías' }
    ]
  },

  outro: 'Una noche, dos pasados y trescientos euros tirados. Unas preguntas rápidas y has terminado.'
});
