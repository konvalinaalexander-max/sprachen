/* fr-2026-09-14-la-cage-descalier */
LEKTION.register({
  id: 'fr-2026-09-14-la-cage-descalier',
  lang: 'fr',
  level: 'A2',
  date: '2026-09-14',
  minutes: 44,
  title: "Qu'est-ce qui s'est passé hier",
  subtitle: "Un samedi à treize heures, un escalier qui n'est pas le tien, et un ami qui a tout vu. Le passé composé avec être, du début à la fin.",

  intro: {
    hook: "Hier tu as appris à dire *j'ai payé*, *j'ai couru*, *j'ai tout raté*. Neuf verbes sur dix marchent comme ça.\n\nLe dixième te met dehors.\n\nIl y a une petite liste de verbes — une quinzaine — qui refusent *avoir*. Et ce sont exactement ceux dont tu as besoin pour raconter une nuit : *aller*, *venir*, *partir*, *sortir*, *monter*, *descendre*, *tomber*, *rester*, *rentrer*.\n\nAvec ceux-là, deux choses changent. L'auxiliaire devient *être*. Et le participe se met à bouger : il regarde qui fait l'action et il change de forme.\n\nAujourd'hui tu lis une conversation entre deux amis, un samedi après-midi. L'un ne se souvient de rien. L'autre se souvient de tout.",
    vocabMode: 'campos',
    grammar: [{
      id: 'fr-passe-compose-etre',
      name: "Le passé composé avec être",
      why: "Sans ces quinze verbes tu ne peux pas raconter un déplacement. Et un déplacement, c'est le début de presque toutes les histoires.",
      explain: "La construction est la même qu'avec avoir, un seul mot change :\n\n*être au présent* + *participe passé*\n\n_Je suis allé. Elle est partie. On est sortis._\n\nLa liste tient dans une phrase, apprends-la comme une chanson : *aller, venir, arriver, partir, entrer, sortir, monter, descendre, rester, tomber, passer, rentrer, retourner, naître, mourir*. Ajoute *devenir* et *revenir*, qui suivent *venir*.\n\nEt voilà la nouveauté qui fait mal : avec être, *le participe s'accorde avec le sujet*. Un homme dit _je suis allé_, une femme dit _je suis allée_, deux amis disent _on est allés_. À l'oral tu n'entends presque rien. À l'écrit, tout se voit.",
      table: {
        head: ['qui parle', 'la forme', 'ce qui change'],
        rows: [
          ['un homme, lui', 'je suis _allé_', 'rien'],
          ['une femme, elle', 'je suis _allée_', '+ e'],
          ['Camille', 'elle est _partie_', '+ e'],
          ['*on* = deux amis', 'on est _sortis_', '+ s'],
          ['elle, aux toilettes', 'elle est _descendue_', '+ e'],
          ['le groupe entier', 'nous sommes _restés_', '+ s'],
          ['elles, ses copines', 'elles sont _venues_', '+ es']
        ]
      },
      examples: [
        { src: "On _est sortis_ de chez toi à vingt et une heures.",
          note: "*on* veut dire *nous* : deux garçons, donc un -s. Beaucoup de gens l'oublient à l'écrit et ça se voit tout de suite." },
        { src: "Camille _est arrivée_ vers vingt-trois heures.",
          note: "Une femme, donc un -e. Tu ne l'entends pas, tu dois y penser." },
        { src: "Elle _est descendue_ aux toilettes et elle _n'est_ jamais _remontée_.",
          note: "La négation entoure *est*, jamais le participe : _elle n'est pas remontée_." },
        { src: "Tu _es tombé_ rue Championnet.",
          note: "*tomber* prend être, alors qu'en allemand ou en anglais rien ne le laisse deviner. Il faut l'apprendre avec la liste." },
        { src: "Je _me suis réveillé_ dans une cage d'escalier.",
          note: "Les verbes avec un petit *me*, *te*, *se* prennent aussi être : _je me suis réveillé_, _tu t'es relevé_, _elle s'est assise_." },
        { src: "Tu _n'es pas rentré_.",
          note: "*rentrer* est dans la liste. _Tu n'as pas rentré_ n'existe pas, sauf si tu rentres quelque chose : *j'ai rentré la voiture*." }
      ],
      pitfalls: [
        "Six verbes changent de camp quand un objet les suit. *Je suis sorti* (j'ai quitté un lieu) mais *j'ai sorti la poubelle* (j'ai sorti quelque chose). Pareil pour monter, descendre, rentrer, retourner, passer. Regarde s'il y a un objet juste après le verbe : s'il y en a un, c'est avoir.",
        "L'accord suit le sujet, pas la personne à qui tu écris. Si tu es un homme, tu écris _je suis resté_ même si tu envoies le message à une femme.",
        "*passer* avec être veut dire se déplacer : _je suis passé devant chez toi_. Avec avoir, c'est le temps : _j'ai passé trois heures là_. Les deux sont corrects, ils ne disent pas la même chose."
      ]
    }],
    vocab: [
      { term: 'une cage d’escalier', pos: 'nom f.', campo: "L'immeuble", def: "la partie d'un immeuble où se trouvent les escaliers", example: "Je me suis réveillé dans une cage d'escalier." },
      { term: 'la poubelle', pos: 'nom f.', campo: "L'immeuble", def: "le récipient où on met ce qu'on jette", example: "Je suis descendue sortir la poubelle à six heures." },
      { term: 'par effraction', pos: 'expression', campo: "L'immeuble", def: "en cassant une porte ou une fenêtre pour entrer", example: "Vous n'êtes pas entré par effraction." },
      { term: 'le palier', pos: 'nom m.', campo: "L'immeuble", def: "l'espace plat entre deux étages, devant les portes", example: "Tu as dormi sur le palier du deuxième." },

      { term: 'une tournée', pos: 'nom f.', campo: 'La nuit', def: "toutes les boissons du groupe, payées par une seule personne", example: "Tu as payé quatre tournées." },
      { term: 'un blouson', pos: 'nom m.', campo: 'La nuit', def: "une veste courte qui s'arrête à la taille", example: "Tu lui as donné ton blouson." },
      { term: 'balles', pos: 'nom f. (familier)', campo: 'La nuit', def: "façon familière de dire euros quand on parle vite", example: "C'était un blouson à quatre-vingt-dix balles." },
      { term: 'vomir', pos: 'verbe', campo: 'La nuit', def: "rejeter par la bouche ce qu'on a bu ou mangé", example: "Tu as déjà vomi, devant le kebab." },
      { term: 'se relever', pos: 'verbe', campo: 'La nuit', def: "se remettre debout après être tombé", example: "Tu es tombé, tu t'es relevé." },
      { term: 'le sens', pos: 'nom m.', campo: 'La nuit', def: "la direction dans laquelle quelque chose va", example: "Je suis monté dans le mauvais sens." },

      { term: 'le loyer', pos: 'nom m.', campo: 'Lundi matin', def: "l'argent qu'on donne chaque mois pour son logement", example: "C'est ma part du loyer." },
      { term: 'une part', pos: 'nom f.', campo: 'Lundi matin', def: "ce que chacun doit donner quand on partage quelque chose", example: "Ma part du loyer." },
      { term: 'un entretien', pos: 'nom m.', campo: 'Lundi matin', def: "le rendez-vous où une entreprise décide si elle te prend", example: "L'entretien est lundi à neuf heures." },
      { term: 'une capture d’écran', pos: 'nom f.', campo: 'Lundi matin', def: "l'image de ce qui était affiché sur ton téléphone", example: "J'ai la capture d'écran." }
    ]
  },

  reading: {
    style: 'chat',
    yo: 'Moi',
    title: "Théo · samedi",
    kicker: 'Conversation',
    source: { kind: 'adapté', note: "Écrit pour toi au niveau A2, dans la langue qu'on écrit vraiment à treize heures un samedi" },
    glossary: [
      { term: "cage d'escalier", def: "la partie de l'immeuble avec les escaliers" },
      { term: 'palier', def: "l'espace devant les portes, entre deux étages" },
      { term: 'capture', def: "l'image de l'écran du téléphone" },
      { term: 'tournées', def: 'les boissons payées pour tout le monde' },
      { term: 'blouson', def: 'une veste courte' },
      { term: 'balles', def: 'euros, en langage familier' },
      { term: 'vomi', def: 'rejeté par la bouche' },
      { term: 'effraction', def: 'entrée en cassant la porte' },
      { term: 'poubelle', def: 'où on met ce qu’on jette' },
      { term: 'relevé', def: 'remis debout' },
      { term: 'loyer', def: "l'argent du logement, chaque mois" },
      { term: 'entretien', def: "le rendez-vous pour un travail" },
      { term: 'sens', def: 'la direction' }
    ],
    paragraphs: [
      { von: 'Théo', hora: '13:07', text: "T'es vivant ?" },
      { von: 'Théo', hora: '13:07', text: "Réponds juste oui ou non." },
      { von: 'Moi', hora: '13:41', text: "oui" },
      { von: 'Moi', hora: '13:41', text: "je crois" },
      { von: 'Moi', hora: '13:42', text: "Je me suis réveillé dans une cage d'escalier. Pas la mienne.",
        simple: "Il s'est réveillé dans l'escalier d'un immeuble inconnu." },
      { von: 'Théo', hora: '13:42', text: "Je sais. Je suis passé devant à quatre heures et tu étais déjà assis par terre, sur le palier du deuxième.",
        simple: "Théo est passé à quatre heures du matin. Il l'a vu par terre." },
      { von: 'Moi', hora: '13:43', text: "Tu es passé et tu m'as laissé là ????" },
      { von: 'Théo', hora: '13:43', text: "Je suis monté te chercher. Tu m'as dit de partir, et tu l'as dit trois fois.",
        simple: "Théo est monté. Mais son ami lui a demandé de s'en aller." },
      { von: 'Moi', hora: '13:44', text: "…" },
      { von: 'Moi', hora: '13:44', text: "Raconte tout. Je n'ai aucun souvenir après le deuxième bar.",
        simple: "Il ne se souvient de rien après le deuxième bar." },
      { von: 'Théo', hora: '13:46', text: "On est sortis de chez toi à vingt et une heures. Tu as dit : une bière et je rentre.",
        simple: "Ils sont partis de chez lui à vingt et une heures, pour une seule bière." },
      { von: 'Théo', hora: '13:46', text: "Tu as dit ça à vingt et une heures zéro quatre exactement. J'ai la capture d'écran." },
      { von: 'Moi', hora: '13:47', text: "d'accord" },
      { von: 'Théo', hora: '13:48', text: "On est allés au Zanzibar. Camille est arrivée vers vingt-trois heures avec trois personnes.",
        simple: "Au deuxième bar, Camille est arrivée à vingt-trois heures avec des amis." },
      { von: 'Moi', hora: '13:48', text: "Camille est venue ?" },
      { von: 'Théo', hora: '13:49', text: "Elle est venue. Elle ne savait pas que tu étais là." },
      { von: 'Théo', hora: '13:49', text: "Elle est restée vingt minutes. Elle est partie quand tu es allé la voir au bar.",
        simple: "Elle est restée vingt minutes. Elle est partie après qu'il lui a parlé." },
      { von: 'Moi', hora: '13:50', text: "Je suis allé lui parler ?" },
      { von: 'Théo', hora: '13:50', text: "Tu es allé lui parler." },
      { von: 'Théo', hora: '13:51', text: "Tu lui as expliqué que tu avais un entretien lundi et que ta vie allait changer. Six minutes.",
        simple: "Il lui a parlé de son entretien de lundi pendant six minutes." },
      { von: 'Moi', hora: '13:51', text: "non" },
      { von: 'Théo', hora: '13:51', text: "si" },
      { von: 'Théo', hora: '13:52', text: "Après, elle est descendue aux toilettes et elle n'est jamais remontée. Son manteau est resté sur la chaise pendant une heure.",
        simple: "Elle est descendue aux toilettes et elle n'est pas revenue. Son manteau est resté là." },
      { von: 'Moi', hora: '13:53', text: "Je vais vomir" },
      { von: 'Théo', hora: '13:53', text: "Tu as déjà vomi. Devant le kebab de la rue Ordener. À une heure vingt.",
        simple: "Il a déjà vomi à une heure vingt, devant un kebab." },
      { von: 'Moi', hora: '13:54', text: "Et mon blouson ?" },
      { von: 'Théo', hora: '13:54', text: "Tu es sorti du bar vers deux heures et tu l'as donné à un type qui avait froid.",
        simple: "Vers deux heures, il a donné son blouson à un homme qui avait froid." },
      { von: 'Moi', hora: '13:55', text: "C'était un blouson à quatre-vingt-dix balles" },
      { von: 'Théo', hora: '13:55', text: "Il avait froid." },
      { von: 'Moi', hora: '13:56', text: "Il avait froid, et moi j'ai quatre euros sur mon compte.",
        simple: "Lui, il n'a plus que quatre euros." },
      { von: 'Théo', hora: '13:57', text: "Tu as payé quatre tournées. J'ai compté. Cent dix-huit euros.",
        simple: "Il a payé quatre tournées : cent dix-huit euros." },
      { von: 'Moi', hora: '13:57', text: "C'est ma part du loyer" },
      { von: 'Théo', hora: '13:58', text: "Je sais." },
      { von: 'Moi', hora: '14:02', text: "Attends" },
      { von: 'Moi', hora: '14:02', text: "Il y a un papier dans ma poche" },
      { von: 'Théo', hora: '14:02', text: "Lis." },
      { von: 'Moi', hora: '14:05', text: "« Je suis descendue sortir la poubelle à six heures et vous étiez là, dans mon escalier. Vous n'êtes pas entré par effraction, la porte était ouverte. Je vous ai laissé dormir parce qu'il faisait froid. Ne revenez pas. — 2e gauche »",
        simple: "Une voisine est descendue à six heures, elle l'a vu et elle l'a laissé dormir. Mais elle ne veut pas le revoir." },
      { von: 'Théo', hora: '14:05', text: "Elle est plus sympa que moi." },
      { von: 'Moi', hora: '14:06', text: "Elle a écrit ça à la main" },
      { von: 'Moi', hora: '14:06', text: "Elle est descendue, elle m'a vu, et elle est remontée chercher un stylo.",
        simple: "Elle est remontée chez elle juste pour prendre un stylo." },
      { von: 'Théo', hora: '14:07', text: "Oui. Et toi tu es resté là quatre heures de plus." },
      { von: 'Moi', hora: '14:09', text: "Je suis rentré comment" },
      { von: 'Théo', hora: '14:09', text: "Tu n'es pas rentré. Tu es encore là-bas ?" },
      { von: 'Moi', hora: '14:10', text: "…" },
      { von: 'Moi', hora: '14:10', text: "je suis dans le métro ligne 12 et je crois que je suis monté dans le mauvais sens",
        simple: "Il est dans le métro, mais dans la mauvaise direction." },
      { von: 'Théo', hora: '14:11', text: "Évidemment." },
      { von: 'Théo', hora: '14:14', text: "Tu es tombé une fois aussi. Rue Championnet, vers trois heures. Tu t'es relevé tout seul et tu as dit : ça va, c'est le sol qui est monté.",
        simple: "Vers trois heures il est tombé rue Championnet. Il s'est relevé seul." },
      { von: 'Moi', hora: '14:14', text: "ça au moins c'est drôle" },
      { von: 'Théo', hora: '14:15', text: "Non." },
      { von: 'Moi', hora: '14:22', text: "Théo" },
      { von: 'Moi', hora: '14:22', text: "elle est partie à cause de moi hier" },
      { von: 'Théo', hora: '14:24', text: "Elle est partie, oui. Mais elle est partie il y a sept mois. Hier elle est seulement sortie d'un bar.",
        simple: "Elle l'a quitté il y a sept mois. Hier, elle a seulement quitté un bar." },
      { von: 'Moi', hora: '14:31', text: "L'entretien est lundi à neuf heures" },
      { von: 'Théo', hora: '14:31', text: "Alors tu as un jour et demi." },
      { von: 'Moi', hora: '14:32', text: "pour quoi faire" },
      { von: 'Théo', hora: '14:32', text: "Pour devenir quelqu'un qui ne donne pas son blouson." },
      { von: 'Moi', hora: '14:33', text: "je préfère le blouson" },
      { von: 'Théo', hora: '14:33', text: "Moi aussi." }
    ]
  },

  tasks: [
    {
      type: 'order', skill: 'verstehen',
      prompt: "Théo raconte dans le désordre. Remets la nuit dans l'ordre.",
      items: [
        "Ils sont sortis de chez lui pour une seule bière.",
        "Camille est arrivée au Zanzibar avec trois personnes.",
        "Il a vomi devant le kebab de la rue Ordener.",
        "Il est sorti du bar et il a donné son blouson.",
        "Il est tombé rue Championnet et il s'est relevé.",
        "Une voisine est descendue sortir la poubelle et l'a trouvé."
      ],
      explain: "Toutes les heures sont dans la conversation, mais jamais dans l'ordre : *21h*, *23h*, *1h20*, *2h*, *3h*, *6h*. C'est comme ça qu'on raconte vraiment une nuit — par morceaux, dans le désordre. Lire, c'est aussi remettre les morceaux à leur place."
    },
    {
      type: 'evidence', skill: 'verstehen',
      prompt: "Théo l'a vu dans l'escalier et il est reparti sans rien faire.",
      verdict: 'falsch',
      evidence: "Je suis monté te chercher.",
      explain: "Théo est monté le chercher. C'est l'autre qui l'a renvoyé, trois fois. Fais attention à qui fait quoi : *je suis monté* et *tu m'as dit de partir* ont deux sujets différents dans la même ligne."
    },
    {
      type: 'evidence', skill: 'verstehen',
      prompt: "Camille est partie du bar parce qu'elle était gênée par lui.",
      verdict: 'unklar',
      explain: "On sait *quand* elle est partie — juste après qu'il est allé lui parler. On ne sait pas *pourquoi*. Personne ne le dit, et elle n'écrit jamais dans la conversation. Le texte te tend le piège : l'ordre des choses ressemble à une cause, mais ce n'est pas écrit."
    },
    {
      type: 'spot', skill: 'erkennen', grammar: 'fr-passe-compose-etre',
      prompt: "Un mot est faux dans cette phrase. Clique dessus.",
      sentence: "Camille est descendu aux toilettes et elle n'est jamais remontée.",
      wrong: 'descendu',
      right: 'descendue',
      explain: "Avec être, le participe s'accorde avec le sujet, et le sujet est une femme : *descendue*. La preuve est dans la même phrase : *remontée* a bien son -e. Les deux participes doivent se ressembler."
    },
    {
      type: 'choice', skill: 'erkennen', grammar: 'fr-passe-compose-etre',
      prompt: "Quatre phrases avec *sortir*. Une seule utilise *avoir* à juste titre. Laquelle ?",
      answer: 0,
      options: [
        { text: "J'ai sorti la poubelle à six heures.",
          why: "Oui. Il y a un objet juste après le verbe (*la poubelle*), donc le sens change : tu sors *quelque chose*. Et avec un objet, c'est avoir. Même règle pour monter, descendre, rentrer, passer." },
        { text: "J'ai sorti du bar à deux heures.",
          why: "Ici il n'y a pas d'objet : tu quittes un lieu. Donc être : _je suis sorti du bar_." },
        { text: "Je suis sorti la poubelle à six heures.",
          why: "Avec être, *sortir* veut dire quitter un endroit. On ne quitte pas une poubelle." },
        { text: "Tu as sorti de chez toi à vingt et une heures.",
          why: "*sortir de chez toi* est un déplacement, sans objet. La phrase du texte dit _on est sortis de chez toi_." }
      ],
      praise: "Exactement."
    },
    {
      type: 'dialog', skill: 'produzieren', grammar: 'fr-passe-compose-etre',
      prompt: "Dimanche, Camille t'écrit. Choisis tes réponses.",
      lines: [
        { von: 'Camille', text: "Salut. Théo m'a dit que tu ne te souvenais de rien." },
        { von: 'Moi', options: [
          { t: "Je me suis réveillé dans un escalier à Pantin. Donc non, pas grand-chose.", ok: true,
            why: "Les verbes avec un petit *me* prennent être eux aussi : _je me suis réveillé_." },
          { t: "J'ai me réveillé dans un escalier à Pantin.",
            why: "L'auxiliaire est *être*, et le *me* se place avant lui : _je me suis réveillé_." },
          { t: "Je suis réveillé dans un escalier à Pantin.",
            why: "Sans le *me*, la phrase décrit un état : tu es simplement debout, les yeux ouverts. Il manque l'action." }
        ] },
        { von: 'Camille', text: "Tu es venu me parler au bar. Tu m'as parlé de ton entretien pendant six minutes." },
        { von: 'Moi', options: [
          { t: "Théo me l'a raconté. Je suis désolé. Tu es partie à cause de ça ?", ok: true,
            why: "*partir* prend être, et tu écris à une femme qui parle d'elle : _tu es partie_, avec le -e." },
          { t: "Théo me l'a raconté. Je suis désolé. Tu as parti à cause de ça ?",
            why: "*partir* ne prend jamais avoir. C'est un des premiers de la liste." },
          { t: "Théo me l'a raconté. Je suis désolé. Tu es parti à cause de ça ?",
            why: "Bon auxiliaire, mauvais accord : le sujet ici, c'est elle. _Tu es partie._" }
        ] },
        { von: 'Camille', text: "Non. Je suis descendue aux toilettes et après je suis rentrée, c'est tout. J'étais fatiguée." },
        { von: 'Moi', options: [
          { t: "D'accord. Moi je ne suis pas rentré du tout. Je suis resté dans l'escalier jusqu'à midi.", ok: true,
            why: "Deux verbes de la liste, et la négation entoure *suis* : _je ne suis pas rentré_. Pas de -e : c'est lui qui parle." },
          { t: "D'accord. Moi je n'ai pas rentré du tout. J'ai resté dans l'escalier jusqu'à midi.",
            why: "*rentrer* et *rester* sont tous les deux dans la liste. Avoir est faux deux fois." },
          { t: "D'accord. Moi je ne suis pas rentrée du tout. Je suis restée dans l'escalier jusqu'à midi.",
            why: "Les -e sont de trop. L'accord suit le sujet, pas la personne à qui tu écris." }
        ] },
        { von: 'Camille', text: "Va à ton entretien lundi. Et ne parle pas de ta vie qui va changer." },
        { von: 'Moi', options: [
          { t: "Promis. Merci d'être venue quand même.", ok: true,
            why: "Elle est venue, donc *venue* garde son -e, même après *d'être*. Petit détail, et pourtant c'est celui qu'elle verra." },
          { t: "Promis. Merci d'avoir venu quand même.",
            why: "*venir* ne prend pas avoir, jamais." },
          { t: "Promis. Merci d'être venu quand même.",
            why: "Bon auxiliaire, mais c'est elle qui est venue : _venue_." }
        ] }
      ],
      explain: "Quatre réponses, quatre fois la même décision : quel auxiliaire, puis quel accord. C'est tout le passé composé avec être. Le reste, c'est du vocabulaire."
    },
    {
      type: 'transform', skill: 'produzieren', grammar: 'fr-passe-compose-etre',
      prompt: "Mets au passé composé. Attention : c'est Camille qui parle d'elle-même.",
      source: "Je descends aux toilettes et je rentre chez moi.",
      answer: [
        "Je suis descendue aux toilettes et je suis rentrée chez moi.",
        "Je suis descendue aux toilettes et je suis rentrée chez moi",
        "Je suis descendue aux toilettes et je suis rentrée chez moi ."
      ],
      hint: "Deux verbes de la liste, donc deux fois *être*. Et une femme qui parle d'elle.",
      explain: "*descendre → descendue*, *rentrer → rentrée*. Chaque verbe reçoit son propre *suis* : on ne peut pas en mettre un seul pour les deux. Et les deux -e viennent du sujet, pas du verbe."
    },
    {
      type: 'pairs', skill: 'wortschatz', grammar: 'fr-passe-compose-etre',
      prompt: "Les participes de la liste. Associe chaque infinitif à sa forme.",
      pairs: [
        ['aller', 'allé'],
        ['venir', 'venu'],
        ['descendre', 'descendu'],
        ['naître', 'né'],
        ['mourir', 'mort'],
        ['devenir', 'devenu']
      ],
      explain: "Les deux derniers sont ceux qu'on oublie, parce qu'on ne les utilise pas tous les jours — jusqu'au jour où on en a besoin. *Il est mort* et *elle est née* sont des phrases qu'on finit toujours par dire."
    },
    {
      type: 'choice', skill: 'wortschatz', grammar: 'fr-passe-compose-etre',
      prompt: "*C'était un blouson à quatre-vingt-dix balles.* Qu'est-ce que *balles* veut dire ici ?",
      answer: 0,
      options: [
        { text: "Des euros. C'est le mot familier, celui qu'on utilise entre amis.",
          why: "Oui. On le dit tout le temps à l'oral : *ça coûte vingt balles*. Jamais dans une lettre, jamais à ton entretien de lundi." },
        { text: "Des objets ronds avec lesquels on joue.",
          why: "C'est le sens normal du mot, mais on ne compte pas un blouson en objets ronds. Le contexte décide." },
        { text: "Des heures de travail.",
          why: "Non. Le mot pour ça serait *des heures*, tout simplement." },
        { text: "Une marque de vêtements connue.",
          why: "Non, et la préposition te le dit : *à quatre-vingt-dix balles* annonce toujours un prix." }
      ]
    },
    {
      type: 'write', skill: 'produzieren', grammar: 'fr-passe-compose-etre',
      prompt: "À toi. Raconte le pire réveil de ta vie : où tu t'es réveillé, comment tu es arrivé là, ce que tu as fait ensuite. Cinq ou six phrases. Au moins quatre verbes avec être.",
      placeholder: "Je me suis réveillé …",
      minWords: 45,
      mustUse: ['je suis', 'je me suis'],
      checklist: [
        "J'ai utilisé au moins quatre verbes de la liste (aller, venir, partir, sortir, monter, descendre, tomber, rester, rentrer).",
        "Chaque participe s'accorde avec celui qui fait l'action.",
        "Je n'ai écrit *j'ai* devant aucun verbe de la liste.",
        "Une phrase au moins est à la forme négative, avec *ne … pas* autour de *suis*.",
        "J'ai écrit une phrase que je n'aurais pas écrite dans un examen."
      ],
      model: "Je me suis réveillé à quatre heures du matin dans le train, et le train était arrêté. Je suis descendu sur un quai que je ne connaissais pas. Il n'y avait personne. Je suis sorti de la gare et je suis resté vingt minutes devant un distributeur qui ne marchait pas. Après, un chauffeur est arrivé et il m'a demandé trente euros. Je ne suis pas monté dans sa voiture, je suis rentré à pied et je suis arrivé chez moi à sept heures. Je ne suis jamais retourné dans cette ville."
    }
  ],

  listening: {
    headline: "Dix minutes avec quelqu'un qui explique lentement",
    intro: "Aujourd'hui, pas d'informations. Johan parle seul au micro et il explique une expression française, doucement, sans jamais passer par une autre langue. C'est exactement la vitesse qu'il te faut : assez lente pour suivre, assez vraie pour ne pas être un exercice.",
    source: {
      name: 'Français Authentique',
      icon: '🎧',
      kind: 'Podcast, un nouvel épisode par semaine',
      level: 'A2–B1',
      what: "Johan prend une expression, une idée ou une question de ses auditeurs et il en parle pendant dix ou quinze minutes. Débit lent, mots simples, zéro traduction.",
      itunesId: 500549470,
      country: 'us',
      minMinutes: 5,
      maxMinutes: 25,
      homepage: 'https://www.francaisauthentique.com/',
      transcriptUrl: 'https://www.francaisauthentique.com/',
      pick: "L'épisode le plus récent est déjà chargé : appuie sur play. Dix minutes suffisent, même si l'épisode est plus long."
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
        name: 'Journal en français facile (RFI)', icon: '📻', kind: 'Informations, chaque jour de la semaine', level: 'A2–B1',
        what: "L'actualité du monde en dix minutes, dans un français clair et lent, par une vraie radio publique. Transcription disponible.",
        itunesId: 1573764973, country: 'us', minMinutes: 5, maxMinutes: 20,
        homepage: 'https://francaisfacile.rfi.fr/',
        transcriptUrl: 'https://francaisfacile.rfi.fr/',
        pick: "Quand tu veux des vraies informations et pas une histoire."
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
      { term: 'une expression', def: "un groupe de mots qu'on dit toujours ensemble" },
      { term: 'au fait', def: "façon de changer de sujet : à propos…" },
      { term: 'du coup', def: "petit mot très fréquent qui veut dire : alors, donc" },
      { term: 'quelque part', def: "dans un endroit qu'on ne nomme pas" },
      { term: "il s'agit de", def: "le sujet est…" },
      { term: 'petit à petit', def: 'lentement, par étapes' },
      { term: 'avoir du mal à', def: "trouver quelque chose difficile" },
      { term: 'en fait', def: "pour dire la vérité, contre ce qu'on croyait" }
    ]
  },

  outro: "Une nuit, un escalier, et une quinzaine de verbes qui refusent *avoir*. Le reste de ta vie en français dépend de cette petite liste."
});
