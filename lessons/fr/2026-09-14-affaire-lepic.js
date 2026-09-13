/* fr-2026-09-14-affaire-lepic · format: escape room */
LEKTION.register({
  id: 'fr-2026-09-14-affaire-lepic',
  lang: 'fr',
  level: 'A2',
  date: '2026-09-14',
  minutes: 40,
  format: 'stage',
  stage: 'lepic',         // 3D-Welt; fällt ohne WebGL auf 'enquete' (2D) zurück
  grammarId: 'fr-passe-compose-etre',

  title: "L'affaire du 12 rue Lepic",
  subtitle: "Camille Roussel a disparu hier soir. Son appartement est fermé de l'intérieur. Cinq objets, cinq heures, une porte.",
  stageKicker: 'Enquête',
  lieu: '12 rue Lepic · Paris 18e',
  compteur: 'indices',
  stageStart: "Commencer l'enquête",
  chuletaLabel: 'aide-mémoire',
  vocabTitle: 'les mots du dossier',
  versPorte: 'Aller à la porte',
  brief: "Tu es enfermé dans son appartement, au troisième étage, la pluie contre la vitre. La porte ne s'ouvre que si tu remets la soirée dans l'ordre.\n\nChaque objet cache une heure et un mouvement : quelqu'un est arrivé, quelqu'un est reparti, quelqu'un est descendu. Et tous ces verbes-là ont une chose en commun.\n\nTouche un objet pour l'examiner. L'aide-mémoire est en haut à droite si tu bloques.",

  intro: {
    hook: "Presque tous les verbes français font leur passé avec *avoir*. Mais une petite liste prend *être* — et ce sont exactement les verbes dont tu as besoin pour raconter qui est allé où.",
    grammar: [{
      id: 'fr-passe-compose-etre',
      name: 'Le passé composé avec être',
      why: "Sans ces verbes, tu ne peux raconter aucun déplacement. Or une soirée, c'est une suite de déplacements.",
      explain: "Environ quinze verbes forment leur passé composé avec *être* au lieu d'*avoir*. Ce sont presque tous des verbes de mouvement ou de changement d'état.\n\naller · venir · arriver · partir · entrer · sortir · monter · descendre · rester · tomber · naître · mourir · passer · retourner · rentrer\n\nEt avec *être*, il se passe quelque chose que l'on ne voit jamais avec *avoir* : *le participe s’accorde avec le sujet*, exactement comme un adjectif.",
      table: {
        head: ['sujet', 'avec être', 'accord'],
        rows: [
          ['il', 'il est all_é_', '– rien'],
          ['elle', 'elle est all_ée_', '+e'],
          ['ils', 'ils sont all_és_', '+s'],
          ['elles', 'elles sont all_ées_', '+es'],
          ['Camille (une femme)', 'elle est desc_endue_', '+e'],
          ['Marc et Paul', 'ils sont part_is_', '+s']
        ]
      },
      examples: [
        { src: "Marc _est arrivé_ à 20h15.",
          note: "arriver → être. Marc est masculin, donc pas de -e." },
        { src: "Camille _est descendue_ avec la valise.",
          note: "descendre → être, et Camille est féminin : *descendue*." },
        { src: "Elle _a mangé_ avant de partir.",
          note: "manger → avoir. Aucun accord, jamais : *elle a mangé*, pas _mangée_." },
        { src: "Les préfixes ne changent rien : partir → _repartir_, venir → _revenir_, entrer → _rentrer_.",
          note: "Tous gardent être." },
        { src: "Elle _est sortie_. / Elle _a sorti_ les poubelles.",
          note: "Le cas piège : avec un complément d'objet, six de ces verbes passent à avoir — monter, descendre, sortir, passer, rentrer, retourner." }
      ],
      pitfalls: [
        "L'erreur numéro un : *j'ai allé*. Ça n'existe pas. C'est *je suis allé*.",
        "L'erreur numéro deux : oublier le -e au féminin. *Elle est parti* est faux ; c'est *elle est partie*. À l'oral on ne l'entend pas, à l'écrit ça se voit tout de suite.",
        "Ne confonds pas *il est arrivé* (passé composé, il raconte) avec *il était arrivé* (plus-que-parfait, quelque chose s'était passé avant). Les deux existent, mais ils ne racontent pas au même moment."
      ]
    }],
    vocab: [
      { term: 'la pendule', def: "une horloge posée sur un meuble ou accrochée au mur" },
      { term: 'le secrétaire', def: "un petit bureau fermé, avec des tiroirs" },
      { term: 'le tiroir', def: "la partie d'un meuble qu'on tire pour l'ouvrir" },
      { term: 'le répondeur', def: "la machine qui enregistre les messages du téléphone" },
      { term: 'la concierge', def: "la personne qui s'occupe de l'entrée de l'immeuble" },
      { term: "l'ascenseur", def: "la petite cabine qui monte et descend dans l'immeuble" },
      { term: 'le cadre', def: "le bord en bois autour d'un tableau" },
      { term: 'scotché', def: "collé avec du ruban adhésif" },
      { term: 'un aller simple', def: "un billet pour partir sans revenir" },
      { term: 'fêlé', def: "cassé sans être en morceaux ; il y a une ligne dans le verre" },
      { term: 'la vitre', def: "le verre plat d'une fenêtre ou d'une pendule" },
      { term: 'le rapport', def: "le texte où un enquêteur écrit ce qu'il a trouvé" }
    ]
  },

  objets: [
    {
      id: 'pendule', nom: 'La pendule', icone: 'pendule', x: 38, y: 25,
      indice: "Elle est par terre, la vitre fêlée. Les aiguilles se sont arrêtées à *19h40*. Quelqu'un l'a fait tomber en passant, et personne ne l'a relevée.",
      enigme: {
        type: 'choisir', skill: 'erkennen',
        question: "Écris la première ligne de ton rapport. Quelle phrase est juste ?",
        options: [
          { t: "La pendule *est* tombée à 19h40.", ok: true,
            why: "*tomber* fait partie de la liste : il prend être. Et le participe s'accorde — *la pendule* est féminin, donc *tombée*." },
          { t: "La pendule *a* tombé à 19h40.",
            why: "*tomber* ne prend jamais avoir. Il est dans la liste des quinze : aller, venir, arriver, partir, entrer, sortir, monter, descendre, rester, tomber, naître, mourir, passer, retourner, rentrer." },
          { t: "La pendule *est* tombé à 19h40.",
            why: "Bon auxiliaire, mauvais accord. Avec être, le participe suit le sujet : *la pendule* est féminin singulier, donc *tombée* avec un -e." }
        ],
        explication: "Avec *être*, le participe passé s'accorde comme un adjectif : il est tombé, elle est tombée, ils sont tombés, elles sont tombées. Avec *avoir*, jamais : elle a mangé, et c'est tout.",
        reussite: "Première ligne écrite.", echec: "Pas encore.",
        suite: 'Noter et continuer'
      },
      fragment: { heure: '19h40', texte: 'La pendule est tombée.' }
    },
    {
      id: 'secretaire', nom: 'Le secrétaire', icone: 'bureau', x: 45, y: 57,
      indice: "Dans le tiroir du haut, une lettre commencée et jamais finie :\n\n« Marc, quand tu es arrivé hier soir à *20h15*, j'avais déjà décidé. Je ne t'en veux pas. »",
      enigme: {
        type: 'formes', skill: 'verstehen',
        question: "D'après la lettre, complète la ligne suivante de ton rapport.",
        phrase: "Marc ___ arrivé à 20h15.",
        formes: [
          { t: 'est', ok: true, why: "*arriver* prend être. Marc est masculin, donc pas de -e : *est arrivé*." },
          { t: 'a', why: "Non : *arriver* est dans la liste des verbes avec être. *Il a arrivé* n'existe pas." },
          { t: 'était', why: "*était arrivé* existe, mais c'est le plus-que-parfait : « il était déjà arrivé avant autre chose ». Ici tu racontes simplement le fait : *il est arrivé*." },
          { t: 'sont', why: "Marc est une seule personne. *sont* est pour ils ou elles." }
        ],
        explication: "Retiens les deux niveaux : *il est arrivé* raconte l'événement ; *il était arrivé* le place avant un autre événement passé. Camille utilise le deuxième dans sa lettre — *j'avais déjà décidé* — parce que sa décision venait avant la visite de Marc.",
        reussite: "20h15, noté.", echec: "Relis la liste.",
        suite: 'Noter et continuer'
      },
      fragment: { heure: '20h15', texte: 'Marc est arrivé.' }
    },
    {
      id: 'telephone', nom: 'Le téléphone', icone: 'telephone', x: 57, y: 34,
      indice: "Le répondeur clignote. Un seul message, enregistré à *21h04*. La voix de Marc, fatiguée :\n\n« Bon. Je suis reparti. Tu avais raison, je crois. Rappelle-moi quand même. »",
      enigme: {
        type: 'ecrire', skill: 'produzieren',
        question: "Écris ce que tu notes pour 21h00. Utilise *Marc* et le verbe *repartir*.",
        reponse: ["Marc est reparti", "Marc est reparti à 21h00", "Marc est reparti à 21 heures"],
        placeholder: "Marc …",
        aide: "*repartir* suit *partir*. Et Marc est masculin.",
        explication: "Les préfixes ne changent pas l'auxiliaire : partir → *repartir*, venir → *revenir*, entrer → *rentrer*, monter → *remonter*. Tous restent avec être. Le seul vrai changement, c'est le sens.",
        reussite: "21h00, noté.", echec: "Presque.",
        suite: 'Noter et continuer'
      },
      fragment: { heure: '21h00', texte: 'Marc est reparti.' }
    },
    {
      id: 'valise', nom: 'La valise', icone: 'valise', x: 28, y: 66,
      indice: "Une valise à moitié faite, posée près de la porte. Dedans : deux pulls, un passeport, un chargeur. Rien de sentimental.\n\nLa concierge dit qu'elle a entendu l'ascenseur vers *22h30*.",
      enigme: {
        type: 'choisir', skill: 'erkennen',
        question: "La concierge raconte. Quelle phrase est correcte ?",
        options: [
          { t: "Camille *est descendue* avec la valise.", ok: true,
            why: "*descendre* avec être, parce qu'il n'y a pas de complément d'objet direct. Et l'accord au féminin : *descendue*." },
          { t: "Camille *a descendu* avec la valise.",
            why: "Ici, *descendre* n'a pas de complément d'objet : il prend être. (Avec un objet, ça changerait : *elle a descendu la valise* signifie qu'elle a porté la valise en bas.)" },
          { t: "Camille *est descendu* avec la valise.",
            why: "Bon auxiliaire, accord oublié. Camille est une femme : *descendue*, avec un -e." },
          { t: "Camille *est descendus* avec la valise.",
            why: "Le -s marque le pluriel, et Camille est une seule personne." }
        ],
        explication: "Six verbes de la liste changent d'auxiliaire quand ils ont un complément d'objet direct : *monter, descendre, sortir, passer, rentrer, retourner*. Compare : *elle est sortie* (elle-même) et *elle a sorti les poubelles* (elle a sorti quelque chose).",
        reussite: "22h30, noté.", echec: "Regarde l'accord.",
        suite: 'Noter et continuer'
      },
      fragment: { heure: '22h30', texte: 'Camille est descendue avec la valise.' }
    },
    {
      id: 'tableau', nom: 'Le tableau', icone: 'tableau', x: 20, y: 33,
      indice: "Un port au coucher du soleil, peinture sans valeur. Mais au dos du cadre, scotché : un billet de train.\n\nParis – Marseille. Départ *23h12*. Une seule personne. Aller simple.",
      enigme: {
        type: 'ecrire', skill: 'produzieren',
        question: "Écris la dernière ligne de ton rapport. Utilise *Camille*, le verbe *monter* et *dans le train*.",
        reponse: ["Camille est montée dans le train", "Camille est montée dans le train de Marseille", "Camille est montée dans le train à 23h12"],
        placeholder: "Camille …",
        aide: "Elle monte elle-même, donc être. Et elle est une femme.",
        explication: "*monter* prend être quand on monte soi-même : *elle est montée*. S'il y avait un objet — *elle a monté la valise* — ce serait avoir, et sans accord. Le verbe est le même ; c'est la phrase autour qui décide.",
        reussite: "Le dossier est complet.", echec: "Encore un essai.",
        suite: 'Noter et continuer'
      },
      fragment: { heure: '23h12', texte: 'Camille est montée dans le train.' }
    }
  ],

  finale: {
    titre: 'La porte',
    consigne: "Avant la serrure, une dernière chose. Puis cinq moments, une seule chronologie : clique-les dans l'ordre, du plus tôt au plus tard.",
    mot: {
      question: "Sur le billet, deux mots décident de toute l'affaire : *un aller simple*. Qu'est-ce que ça veut dire ?",
      options: [
        { t: "Un billet pour partir, sans billet de retour.", ok: true,
          why: "Voilà pourquoi ce n'est pas une disparition. Un aller-retour, elle revenait. Un aller simple, non." },
        { t: "Un billet bon marché, en deuxième classe.",
          why: "Le prix n'a rien à voir. *Simple* s'oppose ici à *aller-retour*, pas à *cher*." },
        { t: "Un billet pour une seule personne.",
          why: "Ça, c'est écrit à côté : « une seule personne ». *Aller simple* parle du trajet, pas du nombre de voyageurs." },
        { t: "Un billet valable un seul jour.",
          why: "Non. Un aller simple peut être utilisé plus tard ; ce qui compte, c'est qu'il n'y a pas de retour." }
      ],
      explication: "*Un aller simple* face à *un aller-retour*. Deux mots, et l'enquête change de nature : Camille n'a pas disparu, elle est partie.",
      suite: 'Ouvrir la serrure'
    },
    ordre: ['pendule', 'secretaire', 'telephone', 'valise', 'tableau'],
    parfait: "Sans une seule hésitation. La porte s'ouvre.",
    reussite: "La serrure cède. La porte s'ouvre sur le palier.",
    explication: "Personne n'a disparu. Camille est partie, et elle l'avait décidé avant même que Marc arrive : c'est ce que dit son plus-que-parfait dans la lettre. Toute l'enquête tenait dans un auxiliaire.",
    sortir: 'Sortir'
  },

  listening: {
    headline: "Sur le palier, la radio du voisin",
    intro: "La porte est ouverte. Chez le voisin du dessus, quelqu'un écoute les informations. Reste deux minutes à écouter avant de descendre.",
    auto: "Tu en as compris combien ?",
    source: {
      name: 'Journal en français facile (RFI)',
      icon: '📻', kind: 'Informations, chaque jour de la semaine', level: 'A2–B1',
      what: "L'actualité du monde en dix minutes, dans un français clair et lent.",
      itunesId: 1573764973, country: 'us', minMinutes: 5, maxMinutes: 20,
      homepage: 'https://francaisfacile.rfi.fr/',
      transcriptUrl: 'https://francaisfacile.rfi.fr/',
      pick: "L'émission la plus récente est déjà chargée. Cinq minutes suffisent."
    },
    alternatives: [
      { name: 'One Thing In A French Day', icon: '🥖', kind: 'Journal personnel', level: 'A2–B1',
        what: "Trois minutes de la vie de Laetitia à Paris. Très court, entièrement en français.",
        itunesId: 210206924, country: 'us', minMinutes: 2, maxMinutes: 12,
        homepage: 'https://onethinginafrenchday.podbean.com/',
        pick: "Un épisode dure moins longtemps qu'un café." },
      { name: 'Français Authentique', icon: '🎧', kind: 'Podcast hebdomadaire', level: 'A2–B1',
        what: "Johan explique une expression, lentement, sans passer par une autre langue.",
        itunesId: 500549470, country: 'us', minMinutes: 5, maxMinutes: 25,
        homepage: 'https://www.francaisauthentique.com/',
        pick: "Quand tu veux comprendre une expression jusqu'au bout." }
    ],
    pretask: [
      { term: 'selon', def: "d'après ce que dit quelqu'un" },
      { term: 'une enquête', def: "le travail de la police pour comprendre ce qui est arrivé" },
      { term: 'à la suite de', def: "après quelque chose, à cause de cela" },
      { term: "il s'agit de", def: "le sujet est…" },
      { term: 'des milliers de', def: "un très grand nombre de" },
      { term: 'le gouvernement', def: "les personnes qui dirigent un pays" }
    ]
  },

  outro: "Cinq objets, cinq déplacements, un seul auxiliaire. Voilà ce que ça donne."
});
