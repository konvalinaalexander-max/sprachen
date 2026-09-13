/* es-2026-09-14-la-noche · formato: simulador */
LEKTION.register({
  id: 'es-2026-09-14-la-noche',
  lang: 'es',
  level: 'B1',
  date: '2026-09-14',
  minutes: 40,
  format: 'stage',
  stage: 'noche',
  grammarId: 'es-subjuntivo-presente',

  title: 'La noche',
  subtitle: 'Nueve horas en Madrid, de la puerta de tu casa al primer metro. Cada persona que te habla espera una respuesta, y casi todas piden subjuntivo.',
  stageKicker: 'Simulador · una noche',
  stageStart: 'Salir de casa',
  stageEnd: 'Amanece',
  stageIntro: 'Se juega con el móvil o con el ordenador. Puedes abrir la regla en cualquier momento, arriba a la derecha.',
  chuletaLabel: 'la regla',
  vocabTitle: 'palabras de la noche',

  intro: {
    hook: 'El subjuntivo no es un tiempo difícil. Es un modo, y sirve para una sola cosa: decir que algo todavía no es un hecho.',
    grammar: [{
      id: 'es-subjuntivo-presente',
      name: 'Presente de subjuntivo',
      why: 'Sin él no puedes pedir, desear, dudar ni opinar. O sea: no puedes hablar con nadie.',
      explain: 'Se forma casi siempre igual, y es mecánico:\n\n1. Coge la forma de *yo* del presente: habl_o_, com_o_, teng_o_, salg_o_.\n2. Quítale la *-o*.\n3. Ponle las terminaciones *del otro grupo*: los verbos en -ar toman _-e_, los de -er/-ir toman _-a_.\n\nhablar → habl_e_ · comer → com_a_ · tener → teng_a_ · salir → salg_a_\n\nLo que cuesta no es la forma: es saber *cuándo*. Y la respuesta corta es: cuando la frase no afirma un hecho, sino que lo desea, lo duda, lo valora o lo persigue.',
      table: {
        head: ['Lo que haces', 'Disparador', 'Ejemplo'],
        rows: [
          ['Pedir o querer algo de otro', 'querer que, pedir que, necesitar que', 'Quiero que _vengas_.'],
          ['Desear', 'ojalá, esperar que, que + deseo', 'Ojalá no _llueva_.'],
          ['Dudar o negar', 'no creo que, dudar que, no es verdad que', 'No creo que _sea_ buena idea.'],
          ['Valorar', 'es raro que, es normal que, me molesta que', 'Es raro que _pase_ a esta hora.'],
          ['Perseguir un fin', 'para que, a fin de que', 'Me voy para que _puedas_ dormir.'],
          ['Hablar del futuro', 'cuando, en cuanto, hasta que', 'Cuando _llegues_, me llamas.']
        ]
      },
      examples: [
        { src: 'Quiero que me _traigas_ tabaco.',
          note: 'Dos personas distintas: yo quiero, tú traes. Ahí entra el subjuntivo.' },
        { src: 'Quiero _traer_ tabaco.',
          note: 'Una sola persona: infinitivo y ya está. Sin *que*, sin subjuntivo.' },
        { src: 'Creo que _es_ buena idea. / No creo que _sea_ buena idea.',
          note: 'En afirmativo hay certeza y va indicativo. En cuanto lo niegas, se cae la certeza y entra el subjuntivo.' },
        { src: 'Cuando _salgamos_, te lo cuento.',
          note: 'Todavía no ha pasado. *Cuando* con futuro siempre pide subjuntivo, aunque en español el verbo parezca presente.' },
        { src: 'Irregulares que salen cada día: _sea, esté, vaya, haya, sepa, dé, tenga, venga, salga, pueda, quiera, diga_.',
          note: 'Son doce y se repiten sin parar. Merece la pena saberlas de memoria.' }
      ],
      pitfalls: [
        'Si el sujeto no cambia, no hay subjuntivo. *Quiero que yo vaya* no existe: es _quiero ir_. La pregunta previa siempre es: ¿quién hace qué?',
        'El imperativo negativo *ya es* subjuntivo. _Sube_ pero _no subas_. _Ven_ pero _no vengas_. Si dices eso, ya lo estás usando.',
        '*Cuando* con costumbre va en indicativo: _cuando salgo, llamo a Nacho_ (todos los días). Con futuro va en subjuntivo: _cuando salga, te llamo_ (esta noche). Misma palabra, dos modos.'
      ]
    }],
    vocab: [
      { term: 'el portal', def: 'La puerta grande por la que se entra a un edificio de viviendas.' },
      { term: 'a reventar', def: 'Tan lleno que ya no cabe nadie más.' },
      { term: 'la caña', def: 'Un vaso pequeño de cerveza. Lo que se pide por defecto en un bar.' },
      { term: 'las bravas', def: 'Patatas fritas con una salsa picante. La tapa más común de Madrid.' },
      { term: 'el bordillo', def: 'El borde de piedra entre la acera y la calle. Donde se sienta la gente.' },
      { term: 'la azotea', def: 'El techo plano de un edificio, cuando se puede subir.' },
      { term: 'plantarse', def: 'Presentarse en un sitio de golpe, sin avisar.' },
      { term: 'que os cunda', def: 'Que lo aprovechéis, que os dure. Fórmula de despedida muy española.' },
      { term: 'la lejía', def: 'El líquido fuerte con el que se limpia. Huele a piscina y a metro por la mañana.' },
      { term: 'pillar', def: 'Entender o captar algo. También conseguirlo. Muy coloquial.' },
      { term: 'la carpeta', def: 'Donde se llevan los papeles o los planos.' },
      { term: 'dar de sí', def: 'Rendir, durar más de lo que parecía.' }
    ]
  },

  escenas: [
    {
      hora: '20:40', lugar: 'Tu portal, Lavapiés',
      narracion: 'Sales del portal y el móvil vibra antes de que llegues a la esquina. Es Marta, tu compañera de piso. Lleva tres días encerrada con un examen y la voz le sale plana.',
      quien: 'Marta',
      dice: '¿Vas a pasar por el chino? Necesito una cosa.',
      reto: 'Contéstale usando *querer que*. Cuidado: detrás de _querer que_ el verbo cambia.',
      tipo: 'elegir', skill: 'erkennen', grammar: 'es-subjuntivo-presente',
      opciones: [
        { t: 'Dime qué quieres que *traiga*.', ok: true,
          why: 'Perfecto. *Querer que* con dos personas distintas pide subjuntivo. El presente normal sería _traigo_; aquí se convierte en _traiga_.' },
        { t: 'Dime qué quieres que *traigo*.',
          why: 'Es lo que dice todo el mundo al principio, y es justo el error central. *Querer que* obliga al subjuntivo: _traiga_.' },
        { t: 'Dime qué quieres que *traer*.',
          why: 'El infinitivo solo vale cuando no cambia la persona: _quiero traer_. En cuanto aparece *que* y otro sujeto, hace falta un verbo conjugado.' }
      ],
      gana: 'Te manda un audio de nueve segundos. No lo escuchas.',
      pierde: 'Marta tarda un rato en contestar.',
      explica: 'La regla de base: dos personas distintas + un verbo de voluntad (*querer, pedir, necesitar*) = subjuntivo. _Yo quiero_ / _tú traigas_. Si la persona es la misma, infinitivo: _quiero traer_.',
      siguiente: 'Ir hacia la plaza'
    },
    {
      hora: '21:20', lugar: 'Plaza de Olavide',
      narracion: 'Nacho ya está allí, sentado en el bordillo con dos latas calientes. Te ve llegar y se levanta como si tuviera un plan que ha pensado mucho.',
      quien: 'Nacho',
      dice: 'Nos plantamos en casa de Álvaro, cogemos su coche y nos vamos a Segovia. Ahora.',
      reto: 'Son las nueve y media, Álvaro no sabe nada y nadie tiene carné. Dile lo que piensas.',
      tipo: 'formas', skill: 'erkennen', grammar: 'es-subjuntivo-presente',
      frase: 'No creo que ___ buena idea.',
      formas: [
        { t: 'sea', ok: true, why: '*No creer que* tumba la certeza y arrastra el subjuntivo: _sea_.' },
        { t: 'es', why: '*Creo que es* sí funciona. Pero al negar — *no creo que* — se cae la certeza y entra el subjuntivo: _sea_.' },
        { t: 'será', why: 'El futuro suena a predicción, no a duda. Detrás de *no creo que* el español pide subjuntivo presente.' },
        { t: 'fuera', why: 'Ese es el imperfecto de subjuntivo, para lo irreal o lo pasado. Aquí hablas de ahora mismo: _sea_.' }
      ],
      gana: 'Nacho se encoge de hombros. Ya se le había ocurrido otra cosa.',
      pierde: 'Nacho lo toma como un sí.',
      explica: 'Creer, pensar y parecer en afirmativo llevan indicativo (_creo que es_). En negativo se dan la vuelta y piden subjuntivo (_no creo que sea_). Es de las pocas reglas del español que se puede memorizar tal cual.',
      siguiente: 'Entrar en el bar'
    },
    {
      hora: '22:05', lugar: 'Bar de la calle Espíritu Santo',
      narracion: 'El bar está a reventar. Pedís dos cañas y una ración de bravas. Pasan doce minutos. Nacho mira la barra como si la mirada fuera a traer la comida antes.',
      reto: 'Dile a Nacho que tienes la esperanza de que la comida llegue pronto. Escribe la frase entera, empezando por *Espero que*.',
      tipo: 'escribir', skill: 'produzieren', grammar: 'es-subjuntivo-presente',
      respuesta: ['Espero que la comida llegue pronto', 'Espero que llegue pronto la comida', 'Espero que lleguen pronto las bravas'],
      placeholder: 'Espero que …',
      pista: '_llegar_ es regular: yo lleg-*o* → quítale la -o → ponle la terminación del otro grupo (-e, porque es un verbo en -ar).',
      gana: 'Llegan justo cuando terminas la frase. Casualidad.',
      pierde: 'Las bravas tardan otros diez minutos.',
      explica: '*Esperar que* es deseo, así que subjuntivo: _llegue_. La formación es mecánica: coges la forma de *yo* del presente (lleg*o*), le quitas la -o y le pones las terminaciones del grupo contrario. Los verbos en -ar toman -e; los de -er/-ir toman -a.',
      siguiente: 'Bajar al metro'
    },
    {
      hora: '23:15', lugar: 'Metro, línea 5',
      narracion: 'En el andén, una chica con una carpeta enorme te pregunta la hora y después se queda mirando el panel de los minutos.',
      quien: 'Ella',
      dice: 'Es raro que el último tren pase a esta hora un jueves, ¿no?',
      reto: 'No te está dando un dato. ¿Qué te está diciendo en realidad?',
      tipo: 'elegir', skill: 'verstehen', grammar: 'es-subjuntivo-presente',
      opciones: [
        { t: 'Que le sorprende el horario. No lo afirma, lo valora.', ok: true,
          why: 'Exacto. *Es raro que* introduce una valoración personal, no un hecho. Por eso el verbo va en subjuntivo: _pase_.' },
        { t: 'Que está segura de que el tren no pasa a esa hora.',
          why: 'Si estuviera segura diría *el último tren no pasa a esta hora*, en indicativo. El subjuntivo _pase_ te avisa de que está opinando, no informando.' },
        { t: 'Que quiere que te cambies de andén.',
          why: 'No hay ninguna petición en la frase. Las peticiones llevan otros verbos: *te pido que, quiero que*.' }
      ],
      gana: 'Asientes. Ella sonríe y se mete en el tren contrario.',
      pierde: 'Dices algo raro. Ella vuelve a mirar el panel.',
      explica: 'Las expresiones de valoración — *es raro que, es normal que, está bien que, me molesta que* — no informan de un hecho: lo juzgan. Por eso arrastran subjuntivo. Compara: *es verdad que pasa* (dato, indicativo) frente a *es raro que pase* (juicio, subjuntivo).',
      siguiente: 'Seguir a Nacho'
    },
    {
      hora: '00:40', lugar: 'Un cuarto sin ascensor, Malasaña',
      narracion: 'Acabáis en casa de alguien a quien Nacho llama «un colega». Veinte personas, una mesa con hielo derretido y un vecino que ya ha subido una vez a decir algo.',
      quien: 'El vecino',
      dice: 'Es la tercera vez esta semana. La tercera.',
      reto: 'Nacho va directo al altavoz. Párale con *Te pido que no*.',
      tipo: 'formas', skill: 'erkennen', grammar: 'es-subjuntivo-presente',
      frase: 'Te pido que no ___ el volumen.',
      formas: [
        { t: 'subas', ok: true, why: '*Pedir que* es voluntad pura: subjuntivo. Y el negativo no cambia nada, sigue siendo _subas_.' },
        { t: 'subes', why: 'Ese es el presente de indicativo. Detrás de *te pido que* hace falta el subjuntivo: _subas_.' },
        { t: 'sube', why: '_sube_ es imperativo, y el imperativo no va detrás de *que*. Además, en negativo el imperativo usa formas de subjuntivo: _no subas_.' },
        { t: 'subir', why: 'El infinitivo iría sin *que* y con el mismo sujeto: _quiero subir_. Aquí hay dos personas.' }
      ],
      gana: 'Nacho deja la mano en el aire. El vecino baja.',
      pierde: 'La música sube. El vecino vuelve con otra cara.',
      explica: 'Fíjate en un detalle que casi nadie ve: el imperativo negativo *es* subjuntivo. _Sube_ pero _no subas_. _Ven_ pero _no vengas_. O sea que llevas años usándolo sin saberlo.',
      siguiente: 'Buscar aire'
    },
    {
      hora: '01:50', lugar: 'La azotea',
      narracion: 'Alguien encuentra la salida al tejado. Desde arriba, Madrid es una cosa naranja que no se acaba nunca. Nacho se calla por primera vez en toda la noche.',
      quien: 'Nacho',
      dice: '¿Tú te vas a quedar aquí? Digo, en Madrid.',
      reto: 'Contesta con un deseo. Empieza por *Ojalá* y usa el verbo *poder*.',
      tipo: 'escribir', skill: 'produzieren', grammar: 'es-subjuntivo-presente',
      respuesta: ['Ojalá pueda quedarme', 'Ojalá me pueda quedar', 'Ojalá pueda quedarme aquí'],
      placeholder: 'Ojalá …',
      pista: '*Ojalá* siempre lleva subjuntivo. De _poder_ sale _pueda_.',
      gana: 'Nacho no dice nada. Se queda mirando la misma dirección que tú.',
      pierde: 'Nacho enciende un cigarro y cambia de tema.',
      explica: '*Ojalá* viene del árabe *law šā’ allāh*, «si Dios quiere», y es la única palabra del español que obliga al subjuntivo sin necesitar *que*. _Ojalá venga. Ojalá pueda. Ojalá no llueva._',
      siguiente: 'Bajar a la calle'
    },
    {
      hora: '03:10', lugar: 'Churrería, Puerta del Sol',
      narracion: 'Chocolate con churros a las tres de la mañana, de pie, en un local con azulejos amarillos desde antes de que nacieras. A vuestro lado, un señor con chaqueta de obra desayuna en silencio.',
      quien: 'El señor',
      dice: 'Vosotros venís de la noche y yo voy hacia ella. Que os cunda.',
      reto: '¿Qué os acaba de desear?',
      tipo: 'elegir', skill: 'wortschatz', grammar: 'es-subjuntivo-presente',
      opciones: [
        { t: 'Que aprovechéis bien lo que queda de noche.', ok: true,
          why: '*Que os cunda* significa que os dure, que os rinda. Y fíjate en la forma: empieza por *que* y va en subjuntivo, porque es un deseo.' },
        { t: 'Que tengáis cuidado al volver a casa.',
          why: '*Cundir* no tiene que ver con el peligro: significa rendir o dar de sí. Una comida cunde, un día cunde.' },
        { t: 'Que le dejéis sitio en la barra.',
          why: 'No está pidiendo nada. *Que os cunda* es una fórmula de despedida, como *que vaya bien* o *que descanses*.' }
      ],
      gana: 'Le dices que igualmente. Él levanta la taza dos centímetros.',
      pierde: 'Contestas cualquier cosa. Él vuelve a su churro.',
      explica: 'Los deseos sueltos en español empiezan por *que* y llevan subjuntivo, siempre: _que te vaya bien_, _que descanses_, _que aproveche_, _que os cunda_. Es un *espero que* al que se le ha caído el principio.',
      siguiente: 'Volver andando'
    },
    {
      hora: '04:00', lugar: 'Calle Atocha, andando',
      escucha: true,
      narracion: 'Volvéis a pie porque ya no merece la pena coger nada. Nacho se pone un podcast en el móvil, a un volumen malísimo, y lo escucháis los dos sin hablar.',
      auto: 'A estas horas y en español de verdad: ¿cuánto has pillado?',
      placeholder: 'Va sobre …',
      siguiente: 'Seguir andando'
    },
    {
      hora: '05:10', lugar: 'Boca de metro, Antón Martín',
      narracion: 'Las cinco y diez. La entrada del metro huele a lejía. Nacho se sienta en el suelo del andén y saca el móvil para escribirle a alguien a quien le debe una disculpa.',
      reto: 'Explícale por qué te vas ya a casa. Empieza por *Me voy para que* y usa el verbo *poder*.',
      tipo: 'escribir', skill: 'produzieren', grammar: 'es-subjuntivo-presente',
      respuesta: ['Me voy para que puedas dormir', 'Me voy para que puedas dormir un poco', 'Me voy para que tú puedas dormir'],
      placeholder: 'Me voy para que …',
      pista: '*Para que* introduce una finalidad que afecta a otra persona. De _poder_ sale _puedas_.',
      gana: 'Nacho levanta la mano sin mirar. Es su forma de dar las gracias.',
      pierde: 'Nacho ni se entera. Se queda en el andén.',
      explica: '*Para que* lleva subjuntivo siempre, sin excepción, porque la finalidad todavía no ha ocurrido. Y otra vez la regla de los dos sujetos: si fueras tú quien va a dormir, dirías *me voy para dormir*, con infinitivo y sin *que*.',
      siguiente: 'Subir a la calle'
    }
  ],

  finales: [
    'Has dicho lo que no tocaba casi siempre. No pasa nada: el subjuntivo se aprende quemándolo, y esta noche lo has quemado entero.',
    'Ha sido una noche torcida. Pero ya sabes dónde está el problema, y eso vale más que acertar por casualidad.',
    'Ni bien ni mal. Has entendido a la gente, y eso es lo primero. Producir viene después.',
    'Buena noche. Has pedido, has dudado y has deseado sin sonar a libro de texto.',
    'Muy buena noche. El subjuntivo te ha salido sin pensarlo en casi todo.',
    'Noche redonda. Has hablado como alguien que vive aquí, no como alguien que estudia aquí.'
  ],

  listening: {
    headline: 'Lo que suena en el móvil de Nacho',
    source: {
      name: 'Español con Juan',
      icon: '🎙️', kind: 'Podcast semanal', level: 'B1–B2',
      what: 'Juan habla solo, en español, sobre cosas normales. Ni muy rápido ni muy lento.',
      itunesId: 976549237, country: 'us', minMinutes: 8, maxMinutes: 35,
      homepage: 'https://1001reasonstolearnspanish.com/podcasts/',
      transcriptUrl: 'https://1001reasonstolearnspanish.com/podcasts/',
      pick: 'Ya está cargado el episodio más reciente. Dale al play mientras «andáis».'
    },
    alternatives: [
      { name: 'Charlas Hispanas', icon: '🗣️', kind: 'Podcast diario', level: 'B1',
        what: 'Episodios cortos sobre vocabulario y cultura de América Latina.',
        itunesId: 1496665566, country: 'us', minMinutes: 4, maxMinutes: 20,
        homepage: 'https://charlashispanas.com/', pick: 'Cualquiera vale, son cortos.' },
      { name: 'Radio Ambulante', icon: '📻', kind: 'Periodismo narrativo', level: 'C1',
        what: 'Historias reales de toda América Latina. Difícil, pero tira de ti.',
        itunesId: 527614348, country: 'us', minMinutes: 15, maxMinutes: 45,
        homepage: 'https://radioambulante.org/', pick: 'Para cuando quieras pelearte con el idioma.' }
    ],
    pretask: [
      { term: 'según', def: 'de acuerdo con lo que dice alguien' },
      { term: 'sin embargo', def: 'pero, a pesar de eso' },
      { term: 'darse cuenta de', def: 'notar algo que antes no veías' },
      { term: 'a lo largo de', def: 'durante todo un periodo' },
      { term: 'en cuanto a', def: 'hablando del tema de…' },
      { term: 'por lo visto', def: 'parece ser que' }
    ]
  },

  outro: 'Nueve horas, ocho conversaciones y un modo verbal entero. Mira cómo ha ido.'
});
