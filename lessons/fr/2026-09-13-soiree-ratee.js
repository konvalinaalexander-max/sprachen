/* fr-2026-09-13-soiree-ratee */
LEKTION.register({
  id: 'fr-2026-09-13-soiree-ratee',
  lang: 'fr',
  level: 'A2',
  date: '2026-09-13',
  minutes: 42,
  title: "La soirée où j'ai tout raté",
  subtitle: "Quarante-deux euros, une chemise mouillée et sept minutes de silence. Tout au passé composé avec avoir.",

  intro: {
    hook: "Pour raconter une soirée en français, tu n'as besoin que de deux morceaux :\n\nune forme d'*avoir* + un *participe passé*.\n\nJ'ai couru. J'ai payé. Elle n'a pas écrit. C'est tout.\n\nAujourd'hui tu lis l'histoire d'un type qui a rencontré une fille et qui a tout raté, étape par étape. Presque chaque phrase est construite de la même façon. Quand tu vois le modèle une fois, tu le vois partout.",
    grammar: [{
      id: 'fr-passe-compose-avoir',
      name: 'Le passé composé avec avoir',
      why: "C'est le passé normal du français parlé. Environ neuf verbes sur dix le forment avec avoir.",
      explain: "Deux morceaux, toujours dans cet ordre :\n\n*avoir au présent* + *participe passé*\n\nLe participe ne change pas, même si c'est une femme qui parle ou s'il y a plusieurs personnes. _J'ai payé_, _elles ont payé_ : le même mot. C'est ce qui rend ce temps facile.\n\nPour former le participe : -er donne -é (payer → payé), -ir donne -i (finir → fini), -re donne souvent -u (attendre → attendu). Et puis il y a les irréguliers, qui sont malheureusement les plus utilisés.",
      table: {
        head: ['avoir', 'exemple', 'le participe vient de'],
        rows: [
          ["j'_ai_", "j'ai payé", 'payer (-er → -é)'],
          ['tu _as_', 'tu as couru', '*courir → couru*'],
          ['il / elle _a_', 'elle a attendu', 'attendre (-re → -u)'],
          ['nous _avons_', 'nous avons ri', '*rire → ri* (irrégulier)'],
          ['vous _avez_', 'vous avez bu', '*boire → bu* (irrégulier)'],
          ['ils / elles _ont_', 'ils ont dit', '*dire → dit* (irrégulier)']
        ]
      },
      examples: [
        { src: "J'_ai couru_ presque deux kilomètres.",
          note: 'courir → couru. Un des irréguliers qu’on utilise tous les jours.' },
        { src: "On _a commandé_ deux bières et j'_ai payé_.",
          note: "Deux verbes, donc deux fois avoir. On ne peut pas en utiliser un seul pour les deux." },
        { src: "Elle _n'a pas_ écrit.",
          note: "La négation entoure *avoir*, jamais le participe. À l'écrit : _elle n'a pas écrit_, pas _elle a pas écrit_." },
        { src: "Elle _a bu_ une gorgée et elle _a dit_ : « D'accord. »",
          note: 'boire → bu, dire → dit. Deux participes très courts, deux verbes très fréquents.' },
        { src: "Nadia _a regardé_ ma chemise.",
          note: "Le participe reste *regardé* même si c'est elle qui regarde. Avec avoir, pas d'accord avec le sujet." }
      ],
      pitfalls: [
        "Avec *avoir*, le participe ne s'accorde pas avec le sujet. On écrit *elle a payé*, jamais _elle a payée_. (Avec *être*, c'est différent, mais c'est pour un autre jour.)",
        "Quelques verbes très fréquents prennent *être* : aller, venir, partir, arriver, rester, entrer, sortir, monter, descendre, rentrer, naître, mourir, tomber. _J'ai allé_ n'existe pas : on dit _je suis allé_. Dans le texte, tu verras *je suis rentré à pied* et *il est reparti* — c'est exactement ce cas.",
        "*ne … pas* se met autour de la forme d'avoir seulement : _je n'ai pas compris_. Devant une voyelle, *ne* devient *n'*. À l'oral, beaucoup de gens laissent tomber le *ne* — mais pas à l'écrit."
      ]
    }],
    vocab: [
      { term: 'rater', pos: 'verbe', def: 'ne pas réussir quelque chose', example: "La soirée où j'ai tout raté." },
      { term: 'le compte en banque', pos: 'nom m.', def: "l'endroit où se trouve ton argent", example: "J'ai regardé mon compte en banque." },
      { term: 'mouillé', pos: 'adjectif', def: "plein d'eau ; le contraire de sec", example: "La chemise complètement mouillée." },
      { term: 'la tournée', pos: 'nom f.', def: 'quand une seule personne paie les boissons de tout le monde', example: "On a commandé la deuxième tournée." },
      { term: 'une infirmière', pos: 'nom f.', def: "la personne qui s'occupe des malades à l'hôpital", example: "Elle est infirmière de nuit." },
      { term: 'une gorgée', pos: 'nom f.', def: "la petite quantité qu'on boit en une seule fois", example: "Elle a bu une gorgée de bière." },
      { term: 'drôle', pos: 'adjectif', def: 'qui fait rire les autres', example: "J'ai voulu être drôle." },
      { term: 'le colocataire', pos: 'nom m.', def: "la personne avec qui tu partages l'appartement", example: "Une histoire sur mon ancien colocataire." },
      { term: 'faire la bise', pos: 'expression', def: 'se dire au revoir en touchant la joue de l’autre', example: "Elle m'a fait la bise." },
      { term: 'la station-service', pos: 'nom f.', def: "l'endroit où on met de l'essence dans la voiture", example: "Devant une station-service." },
      { term: 'garer', pos: 'verbe', def: 'mettre une voiture quelque part et l’arrêter', example: "Un homme a garé sa voiture à côté de moi." },
      { term: 'baisser la vitre', pos: 'expression', def: 'ouvrir la fenêtre de la voiture', example: "Il a baissé la vitre." },
      { term: 'hocher la tête', pos: 'expression', def: 'bouger la tête de haut en bas pour dire oui', example: "Il a hoché la tête." },
      { term: 'suffire', pos: 'verbe', def: 'être assez, ne pas demander plus', example: "Trente secondes suffisent." },
      { term: 'honnête', pos: 'adjectif', def: 'qui dit la vérité, sans jouer un rôle', example: "La conversation la plus honnête de la soirée." }
    ]
  },

  reading: {
    title: "La soirée où j'ai tout raté",
    kicker: 'Première personne',
    source: { kind: 'adapté', note: "Écrit pour toi au niveau A2, avec le vocabulaire qu'on utilise vraiment" },
    glossary: [
      { term: 'raté', def: 'pas réussi' },
      { term: 'compte en banque', def: "là où est ton argent" },
      { term: 'mouillée', def: "pleine d'eau" },
      { term: 'tournée', def: 'les boissons payées par une seule personne' },
      { term: 'infirmière', def: "elle s'occupe des malades" },
      { term: 'gorgée', def: 'petite quantité à boire' },
      { term: 'drôle', def: 'qui fait rire' },
      { term: 'colocataire', def: 'la personne avec qui tu habites' },
      { term: 'bise', def: 'bonjour ou au revoir sur la joue' },
      { term: 'station-service', def: "là où on met de l'essence" },
      { term: 'garé', def: 'arrêté sa voiture' },
      { term: 'vitre', def: 'la fenêtre de la voiture' },
      { term: 'hoché', def: 'bougé la tête pour dire oui' },
      { term: 'suffisent', def: 'sont assez' },
      { term: 'honnête', def: 'vraie, sans jouer un rôle' }
    ],
    paragraphs: [
      {
        text: "Vendredi dernier, j'ai rencontré une fille. Enfin, j'ai essayé.",
        simple: "Vendredi, il a essayé de rencontrer une fille."
      },
      {
        text: "Elle s'appelle Nadia. On a parlé pendant trois semaines sur une application et elle a proposé un verre. J'ai dit oui trop vite. Après, j'ai regardé mon compte en banque : quarante-deux euros jusqu'à la fin du mois. J'ai dit oui quand même.",
        simple: "Ils ont parlé trois semaines sur une application. Il a accepté un rendez-vous, mais il n'avait presque pas d'argent."
      },
      {
        text: "Vendredi, j'ai quitté le travail à dix-huit heures. J'ai pris une douche, j'ai mis ma seule chemise propre et j'ai attendu le bus vingt minutes. Le bus n'est pas venu. Alors j'ai couru. J'ai couru presque deux kilomètres, en chemise, au mois de juillet. Tu imagines le résultat.",
        simple: "Le bus n'est pas arrivé. Il a couru deux kilomètres en juillet. Il a beaucoup transpiré."
      },
      {
        text: "Je suis arrivé avec dix minutes de retard et la chemise complètement mouillée. Nadia a regardé ma chemise. Elle n'a rien dit. C'était pire.",
        simple: "Il est arrivé en retard, avec la chemise mouillée. Elle n'a rien dit du tout."
      },
      {
        text: "On a commandé deux bières et j'ai payé : onze euros. J'ai fait un calcul rapide dans ma tête et j'ai compris que je pouvais payer exactement deux tournées, pas trois.",
        simple: "Il a payé les bières. Avec son argent, il pouvait payer deux fois, pas plus."
      },
      {
        text: "Au début, ça a bien marché. Elle a parlé de son travail — elle est infirmière de nuit — et elle a raconté des histoires d'hôpital que je ne peux pas répéter ici. J'ai ri. Elle a ri. J'ai pensé : d'accord, ça va aller.",
        simple: "Au début, tout allait bien. Elle a raconté son travail à l'hôpital et ils ont ri."
      },
      {
        text: "Et puis j'ai fait la chose stupide.",
        simple: "Ensuite, il a fait une bêtise."
      },
      {
        text: "J'ai voulu être drôle. J'ai raconté une histoire sur mon ancien colocataire, une histoire avec beaucoup de détails, une histoire que mes amis adorent. Elle a duré sept minutes et personne n'a ri. À la fin, Nadia a bu une gorgée de bière et elle a dit : « D'accord. »",
        simple: "Il a raconté une longue histoire drôle. Personne n'a ri. Nadia a seulement dit « d'accord »."
      },
      {
        text: "Il y a eu un silence. Un vrai. Pas un silence agréable.",
        simple: "Après, il y a eu un silence désagréable."
      },
      {
        text: "On a commandé la deuxième tournée. J'ai payé encore. On a parlé de la météo — la météo ! — et elle a regardé son téléphone deux fois. Vers vingt-trois heures, elle a dit qu'elle travaillait tôt le lendemain. C'était peut-être vrai.",
        simple: "Ils ont bu encore une bière. Ils ont parlé de la météo. Elle est partie vers onze heures."
      },
      {
        text: "On s'est dit au revoir devant le bar. Elle m'a fait la bise. J'ai dit : « On se refait ça. » Elle a souri et elle a répondu : « Oui, peut-être. » Peut-être.",
        simple: "Ils se sont dit au revoir. Elle a répondu « peut-être », pas « oui »."
      },
      {
        text: "Je suis rentré à pied parce que je n'avais plus assez pour le taxi. En chemin, j'ai acheté un kebab à trois euros cinquante. C'était le pire kebab de ma vie, et je l'ai mangé debout, tout seul, devant une station-service.",
        simple: "Il est rentré à pied. Il a mangé un mauvais kebab, seul, dans la rue."
      },
      {
        text: "Un homme a garé sa voiture à côté de moi. Il a baissé la vitre et il m'a demandé si ça allait. J'ai répondu que oui. Il a hoché la tête et il est reparti. C'est la conversation la plus honnête que j'ai eue de toute la soirée.",
        simple: "Un inconnu lui a demandé si tout allait bien. C'était le meilleur moment de la soirée."
      },
      {
        text: "Le lendemain matin, j'ai regardé mon téléphone. Elle n'a pas écrit. Deux jours après, elle n'a toujours pas écrit.",
        simple: "Le lendemain et deux jours après, elle n'a pas écrit."
      },
      {
        text: "Mais j'ai gardé une chose de cette soirée : je sais maintenant que je n'ai pas besoin de sept minutes pour être drôle. Trente secondes suffisent. Et si personne ne rit à la trentième seconde, il faut s'arrêter.",
        simple: "Il a quand même appris quelque chose : une histoire drôle doit être courte."
      },
      {
        text: "C'est cher, quarante-deux euros pour apprendre ça. Mais ce n'est pas le plus cher que j'ai payé. Et puis, j'ai raté la soirée, pas la leçon.",
        simple: "La leçon a coûté quarante-deux euros. Il a raté la soirée, mais il a appris quelque chose."
      }
    ]
  },

  tasks: [
    {
      type: 'evidence', skill: 'verstehen',
      prompt: "C'est lui qui a payé les boissons.",
      verdict: 'richtig',
      evidence: "On a commandé deux bières et j'ai payé",
      explain: "C'est écrit deux fois : *On a commandé deux bières et j'ai payé* et plus tard *J'ai payé encore*. Le mot *encore* te dit que c'est la deuxième fois."
    },
    {
      type: 'evidence', skill: 'verstehen',
      prompt: "Son histoire de sept minutes a beaucoup fait rire Nadia.",
      verdict: 'falsch',
      evidence: "Elle a duré sept minutes et personne n'a ri",
      explain: "Exactement le contraire : *personne n'a ri*. Et le « D'accord » de Nadia après une gorgée de bière n'est pas une réponse — c'est une façon polie de changer de sujet."
    },
    {
      type: 'evidence', skill: 'verstehen',
      prompt: "Nadia a trouvé la soirée agréable.",
      verdict: 'unklar',
      explain: "On ne sait rien de ce qu'elle a pensé. Elle a dit « peut-être » et elle n'a pas écrit — mais le texte ne donne jamais son avis. En compréhension écrite, seul ce qui est écrit compte, pas ce qu'on devine."
    },
    {
      type: 'choice', skill: 'erkennen',
      grammar: 'fr-passe-compose-avoir',
      prompt: "Quel est le participe passé de *courir* ?",
      options: [
        { text: "j'ai couru", why: "Correct. *courir → couru*. Même modèle : boire → bu, lire → lu, voir → vu." },
        { text: "j'ai courru", why: "Un r de trop. C'est l'infinitif qui a deux r au futur (*je courrai*), pas le participe." },
        { text: "j'ai couri", why: "La terminaison -i existe (finir → fini, dormir → dormi), mais *courir* ne la prend pas." },
        { text: "j'ai couré", why: "-é appartient aux verbes en -er (payer → payé). *courir* ne finit pas en -er." }
      ],
      answer: 0,
      praise: 'Parfait.'
    },
    {
      type: 'transform', skill: 'produzieren',
      grammar: 'fr-passe-compose-avoir',
      prompt: "Mets cette phrase au passé composé.",
      source: "Je prends une douche et je mets ma seule chemise propre.",
      answer: ["J'ai pris une douche et j'ai mis ma seule chemise propre."],
      hint: "Deux verbes, donc deux fois *avoir*. Et les deux participes sont irréguliers.",
      explain: "*prendre → pris*, *mettre → mis*. Deux irréguliers dans la même phrase, et les deux finissent par un son qu'on n'entend pas. Chaque verbe reçoit son propre *ai*."
    },
    {
      type: 'transform', skill: 'produzieren',
      grammar: 'fr-passe-compose-avoir',
      prompt: "Mets cette phrase à la forme négative.",
      source: "Elle a écrit le lendemain.",
      answer: ["Elle n'a pas écrit le lendemain.", "Elle n'a pas écrit le lendemain"],
      hint: "*ne … pas* se met autour du mot qui est conjugué, pas autour du participe.",
      explain: "*ne* et *pas* entourent *a*, pas *écrit* : _elle n'a pas écrit_. Devant une voyelle, *ne* devient *n'*. Tu as le même modèle dans le texte : _elle n'a toujours pas écrit_."
    },
    {
      type: 'forge', skill: 'produzieren',
      grammar: 'fr-passe-compose-avoir',
      prompt: "Construis la phrase : il a mangé le kebab debout, seul, devant une station-service.",
      solution: "Je l'ai mangé debout tout seul devant une station-service",
      distractors: ['suis', 'mangée', 'été'],
      explain: "*manger* prend avoir → _j'ai mangé_. Le participe ne change pas (pas _mangée_). Le petit *l'* devant *ai* remplace *le kebab* : c'est un pronom, et il se met toujours avant le verbe."
    },
    {
      type: 'pairs', skill: 'wortschatz',
      grammar: 'fr-passe-compose-avoir',
      prompt: "Associe chaque infinitif à son participe passé. Les six sont dans le texte.",
      pairs: [
        ['courir', 'couru'],
        ['prendre', 'pris'],
        ['boire', 'bu'],
        ['dire', 'dit'],
        ['rire', 'ri'],
        ['avoir', 'eu']
      ],
      explain: "Il y a des modèles : beaucoup d'irréguliers finissent en -u (couru, bu, eu, vu, lu). D'autres en -is (pris, mis) ou en -it (dit, écrit). Ce sont environ trente verbes, et tu les utilises tous les jours."
    },
    {
      type: 'choice', skill: 'erkennen',
      grammar: 'fr-passe-compose-avoir',
      prompt: "Dans le texte : *Je suis rentré à pied.* Pourquoi *suis* et non *ai* ?",
      options: [
        { text: "Parce que *rentrer* fait partie des verbes de mouvement qui prennent être.",
          why: "Oui. aller, venir, partir, arriver, rentrer, sortir, monter, descendre… tous avec être. C'est le sujet de la prochaine fois." },
        { text: "Parce que la phrase parle de lui-même.",
          why: "Non, ça ne change rien. *J'ai payé* parle aussi de lui et prend avoir." },
        { text: "Parce que la phrase est au présent.",
          why: "Non, *suis rentré* est bien un passé composé : *être* au présent + participe passé. Même construction, autre auxiliaire." },
        { text: "Parce qu'il y a *à pied* dans la phrase.",
          why: "Le complément ne décide rien. On dit *j'ai marché à pied* avec avoir. C'est le verbe *rentrer* qui décide." }
      ],
      answer: 0
    },
    {
      type: 'write', skill: 'produzieren',
      grammar: 'fr-passe-compose-avoir',
      prompt: "À toi. Raconte une soirée qui s'est mal passée. Cinq ou six phrases, toutes au passé composé. Sois honnête : personne d'autre ne va le lire.",
      placeholder: "Samedi dernier, j'ai …",
      minWords: 40,
      mustUse: ["j'ai", "je n'ai pas"],
      checklist: [
        "Chaque phrase au passé a une forme d'*avoir* dedans.",
        "Aucun participe n'a reçu un -e ou un -s en plus.",
        "J'ai utilisé au moins deux participes irréguliers (fait, pris, bu, vu, eu…).",
        "Une phrase au moins est à la forme négative (n'… pas).",
        "J'ai écrit une phrase que je n'aurais pas écrite dans un examen."
      ],
      model: "Samedi dernier, j'ai organisé un petit dîner chez moi. J'ai acheté trop de nourriture et j'ai oublié le vin. Mon ami Théo a apporté une bouteille, mais il a cassé deux verres en arrivant. Après, j'ai brûlé les pâtes. On a commandé des pizzas et on a attendu une heure et demie. Personne n'a rien dit, mais je n'ai pas dormi de la nuit. La semaine prochaine, on va au restaurant."
    }
  ],

  listening: {
    headline: 'Dix minutes de vraies informations',
    intro: "Maintenant, du français de la radio : parlé lentement, avec des mots simples, mais fait par une vraie chaîne d'information. RFI le fait depuis des dizaines d'années pour les gens qui apprennent le français. Et il y a une transcription pour lire en même temps.",
    source: {
      name: 'Journal en français facile (RFI)',
      icon: '📻',
      kind: 'Informations, chaque jour de la semaine',
      level: 'A2–B1',
      what: "L'actualité du monde en dix minutes, dans un français clair et lent. Ce n'est pas une application pour apprendre : c'est une vraie radio qui parle doucement.",
      itunesId: 1573764973,
      country: 'us',
      minMinutes: 5,
      maxMinutes: 20,
      homepage: 'https://francaisfacile.rfi.fr/',
      transcriptUrl: 'https://francaisfacile.rfi.fr/',
      pick: "L'émission la plus récente est déjà chargée ici : appuie sur play. La première fois, écoute seulement les cinq premières minutes, ça suffit. Et lis la transcription seulement APRÈS la deuxième écoute, sinon tu lis au lieu d'écouter."
    },
    alternatives: [
      {
        name: 'One Thing In A French Day', icon: '🥖', kind: 'Journal personnel, deux fois par semaine', level: 'A2–B1',
        what: "Laetitia raconte trois ou quatre minutes de sa vie à Paris : le marché, la pluie, ses enfants. Très court, entièrement en français.",
        itunesId: 210206924, country: 'us', minMinutes: 2, maxMinutes: 12,
        homepage: 'https://onethinginafrenchday.podbean.com/',
        pick: "Pour un jour de fatigue. Un épisode dure moins longtemps qu'un café."
      },
      {
        name: 'Français Authentique', icon: '🎧', kind: 'Podcast, chaque semaine', level: 'A2–B1',
        what: "Johan explique une expression ou une idée, lentement et clairement, sans jamais passer par une autre langue.",
        itunesId: 500549470, country: 'us', minMinutes: 5, maxMinutes: 25,
        homepage: 'https://www.francaisauthentique.com/',
        pick: "Bien quand tu veux comprendre une expression française jusqu'au bout."
      },
      {
        name: 'InnerFrench', icon: '🚀', kind: 'Podcast, deux fois par mois', level: 'B1–B2',
        what: "Hugo parle de culture, d'histoire et de société. C'est au-dessus de ton niveau, mais son français est d'une clarté rare.",
        itunesId: 1231472946, country: 'us', minMinutes: 10, maxMinutes: 45,
        homepage: 'https://innerfrench.com/podcast/',
        pick: "Le jour où tu veux voir jusqu'où tu es monté."
      }
    ],
    pretask: [
      { term: 'le journal', def: "l'émission qui donne les informations" },
      { term: "aujourd'hui", def: 'ce jour, maintenant' },
      { term: 'selon', def: "d'après ce que dit quelqu'un" },
      { term: 'le gouvernement', def: 'les personnes qui dirigent un pays' },
      { term: 'une grève', def: 'quand les travailleurs arrêtent de travailler pour protester' },
      { term: 'des milliers de', def: 'un très grand nombre de' },
      { term: 'à la suite de', def: 'après quelque chose, à cause de cela' },
      { term: "il s'agit de", def: 'le sujet est…' }
    ]
  },

  outro: "Une soirée ratée, quarante-deux euros, et vingt phrases au passé composé. Encore quelques questions et c'est fini."
});
