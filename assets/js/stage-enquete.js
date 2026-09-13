/* Bühne "L'enquête" – Escape Room in einer Pariser Wohnung.
   Fünf Gegenstände, fünf Rätsel, fünf Zeitfragmente. Wer die Bewegungen
   in die richtige Reihenfolge bringt, kommt durch die Tür.
   Alles CSS und SVG: Zinkdächer, Regen, Fischgrätparkett, Stuck. */
(function (L) {
  'use strict';
  var h = L.h, esc = L.esc;

  var ICONES = {
    pendule: '<circle cx="24" cy="24" r="16"/><path d="M24,14 L24,24 L31,28"/>',
    bureau: '<path d="M8,20 L40,20 L40,38 L8,38 Z"/><path d="M8,20 L24,10 L40,20"/><circle cx="24" cy="29" r="2.2"/>',
    telephone: '<path d="M14,12 h20 a3,3 0 0 1 3,3 v18 a3,3 0 0 1 -3,3 h-20 a3,3 0 0 1 -3,-3 v-18 a3,3 0 0 1 3,-3 z"/><path d="M17,19 h14 M17,25 h14 M17,31 h8"/>',
    valise: '<path d="M9,17 h30 v20 h-30 z"/><path d="M18,17 v-4 h12 v4"/><path d="M9,26 h30"/>',
    tableau: '<path d="M11,10 h26 v28 h-26 z"/><path d="M15,31 l7,-10 l5,7 l4,-5 l6,8 z"/><circle cx="19" cy="17" r="2.4"/>'
  };

  function fenetre() {
    return '<svg class="vitre" viewBox="0 0 300 460" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="cielP" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#4b5f7d"/><stop offset="58%" stop-color="#6d82a0"/>' +
      '<stop offset="100%" stop-color="#93a4bb"/></linearGradient></defs>' +
      '<rect width="300" height="460" fill="url(#cielP)"/>' +
      '<g class="toits">' +
      '<path d="M0,460 L0,352 L46,352 L46,330 L58,330 L58,352 L96,352 L96,300 L150,272 L204,300 L204,352 ' +
      'L236,352 L236,336 L248,336 L248,352 L300,352 L300,460 Z"/>' +
      '<path d="M120,272 L120,246 L132,246 L132,272 M170,268 L170,240 L182,240 L182,268"/>' +
      '<rect x="128" y="312" width="18" height="24" rx="2" class="lucarne"/>' +
      '<rect x="158" y="312" width="18" height="24" rx="2" class="lucarne"/>' +
      '<path d="M262,352 L262,286 M256,294 L268,294 M258,304 L266,304"/>' +
      '</g></svg>';
  }

  function parquet() {
    return '<svg class="parquet-svg" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><pattern id="fish" width="60" height="60" patternUnits="userSpaceOnUse">' +
      '<rect width="60" height="60" fill="#3b2a20"/>' +
      '<path d="M0,0 L30,30 L30,60 L0,30 Z" fill="#4a3527"/>' +
      '<path d="M30,0 L60,30 L60,60 L30,30 Z" fill="#43301f"/>' +
      '<path d="M0,0 L30,30 M30,0 L60,30 M0,30 L30,60 M30,30 L60,60" stroke="#2b1e16" stroke-width="1.2"/>' +
      '</pattern></defs>' +
      '<rect width="1200" height="260" fill="url(#fish)"/>' +
      '<rect width="1200" height="260" fill="url(#solOmbre)"/>' +
      '<defs><linearGradient id="solOmbre" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#0d1016" stop-opacity=".60"/>' +
      '<stop offset="100%" stop-color="#0d1016" stop-opacity=".08"/></linearGradient></defs>' +
      '</svg>';
  }

  L.stages.enquete = function (lesson) {
    var S = L.session;
    S.stage = S.stage || { resolus: {}, fragments: [], phase: 'intro' };
    var objets = lesson.objets || [];

    var root = h('div', { class: 'enquete' });
    var piece = h('div', { class: 'piece' });
    root.appendChild(piece);

    /* Wand mit Stuck */
    var mur = h('div', { class: 'mur' });
    mur.appendChild(h('div', { class: 'moulure m1' }));
    mur.appendChild(h('div', { class: 'moulure m2' }));
    mur.appendChild(h('div', { class: 'corniche' }));
    mur.appendChild(h('div', { class: 'plinthe' }));
    piece.appendChild(mur);

    /* Fenster mit Regen */
    var fen = h('div', { class: 'fenetre', html: fenetre() });
    fen.appendChild(h('div', { class: 'pluie' }));
    fen.appendChild(h('div', { class: 'croisillon v' }));
    fen.appendChild(h('div', { class: 'croisillon hh' }));
    fen.appendChild(h('div', { class: 'reflet' }));
    piece.appendChild(fen);
    piece.appendChild(h('div', { class: 'lumiere' }));

    /* Boden */
    piece.appendChild(h('div', { class: 'parquet', html: parquet() }));

    /* Tür */
    var porte = h('div', { class: 'porte' }, [
      h('div', { class: 'porte-p' }),
      h('div', { class: 'porte-p bas' }),
      h('div', { class: 'poignee' })
    ]);
    piece.appendChild(porte);

    /* Gegenstände */
    var objDom = {};
    objets.forEach(function (o) {
      var b = h('button', {
        class: 'objet', type: 'button', 'aria-label': o.nom,
        style: 'left:' + o.x + '%; top:' + o.y + '%'
      }, [
        h('span', { class: 'ob-cercle', html: '<svg viewBox="0 0 48 48">' + (ICONES[o.icone] || ICONES.valise) + '</svg>' }),
        h('span', { class: 'ob-nom', text: o.nom })
      ]);
      b.addEventListener('click', function () { if (!S.stage.resolus[o.id]) ouvrir(o); });
      objDom[o.id] = b;
      piece.appendChild(b);
    });

    /* Kopf und Zeitleiste */
    var bandeau = h('div', { class: 'bandeau' });
    root.appendChild(bandeau);
    var frise = h('div', { class: 'frise' });
    root.appendChild(frise);

    var dossier = h('div', { class: 'dossier-fond' });
    root.appendChild(dossier);
    var chuleta = L.chuleta(lesson, lesson.chuletaLabel || 'aide-mémoire');
    root.appendChild(chuleta.fond);

    function majBandeau() {
      bandeau.innerHTML = '';
      bandeau.appendChild(h('div', {}, [
        h('div', { class: 'bd-t', text: lesson.stageKicker || 'Enquête' }),
        h('div', { class: 'bd-l', text: lesson.lieu || '' })
      ]));
      var n = Object.keys(S.stage.resolus).length;
      bandeau.appendChild(h('div', { class: 'bd-d' }, [
        h('div', { class: 'bd-c' }, [
          h('span', { text: n + '/' + objets.length }),
          h('span', { class: 'bd-x', text: lesson.compteur || 'indices' })
        ]),
        chuleta.btn
      ]));
    }

    function majFrise() {
      frise.innerHTML = '';
      objets.forEach(function (o) {
        var f = S.stage.resolus[o.id] ? o.fragment : null;
        frise.appendChild(h('div', { class: 'fr-case' + (f ? ' plein' : '') }, [
          h('div', { class: 'fr-h', text: f ? f.heure : '??:??' }),
          h('div', { class: 'fr-t', text: f ? f.texte : '—' })
        ]));
      });
    }

    function majObjets() {
      objets.forEach(function (o) {
        objDom[o.id].classList.toggle('fait', !!S.stage.resolus[o.id]);
      });
      if (Object.keys(S.stage.resolus).length === objets.length) porte.classList.add('prete');
    }

    /* ---------------- Dossier ---------------- */
    function fermer() {
      dossier.classList.remove('ouvert');
      setTimeout(function () { dossier.innerHTML = ''; }, 320);
    }

    function ouvrir(o) {
      L.thunk('open');
      dossier.innerHTML = '';
      var card = h('div', { class: 'dossier' });
      card.appendChild(h('button', { class: 'ds-x', type: 'button', text: '✕', 'aria-label': 'fermer', onclick: fermer }));
      card.appendChild(h('div', { class: 'ds-k', text: o.nom }));
      card.appendChild(h('p', { class: 'ds-i', html: L.markup(o.indice) }));

      var zone = h('div', { class: 'ds-zone' });
      card.appendChild(zone);
      dossier.appendChild(card);
      dossier.classList.add('ouvert');

      var e = o.enigme;
      zone.appendChild(h('div', { class: 'ds-q', html: L.markup(e.question) }));
      (e.type === 'ecrire' ? ecrire : e.type === 'formes' ? formes : choisir)(o, e, zone);
    }

    function resoudre(o, e, zone, ok, mien, bon) {
      L.stageAnswer({
        type: e.type || 'choisir', prompt: e.question, correct: ok,
        yours: mien, right: bon, explain: e.explication || '',
        skill: e.skill || 'produzieren', grammar: e.grammar || lesson.grammarId || null
      });
      if (ok) { L.accordion([261.63, 329.63, 392], 1.2); }
      else { L.thunk('lock'); }

      var box = h('div', { class: 'ds-r ' + (ok ? 'oui' : 'non') });
      box.appendChild(h('div', { class: 'ds-rt', text: ok ? (e.reussite || 'Ça colle.') : (e.echec || 'Non.') }));
      if (!ok && bon) box.appendChild(h('div', { class: 'ds-rc', html: '→ <b>' + esc(bon) + '</b>' }));
      if (e.explication) box.appendChild(h('p', { class: 'ds-rx', html: L.markup(e.explication) }));
      zone.appendChild(box);

      /* Der Hinweis wird immer freigeschaltet – sonst steckt man fest. */
      S.stage.resolus[o.id] = { ok: ok };
      L.persistProgress();
      majBandeau(); majFrise(); majObjets();

      var frag = h('div', { class: 'ds-frag' }, [
        h('div', { class: 'ds-fh', text: o.fragment.heure }),
        h('div', { class: 'ds-ft', html: L.markup(o.fragment.texte) })
      ]);
      zone.appendChild(frag);

      var suite = h('button', { class: 'btn-enq', type: 'button',
        text: Object.keys(S.stage.resolus).length === objets.length ? (lesson.versPorte || 'Aller à la porte') : (e.suite || 'Noter et continuer') });
      suite.addEventListener('click', function () {
        fermer();
        if (Object.keys(S.stage.resolus).length === objets.length) setTimeout(finale, 380);
      });
      zone.appendChild(suite);
      setTimeout(function () { suite.focus(); }, 60);
    }

    function choisir(o, e, zone) {
      var caja = h('div', { class: 'ds-opts' });
      L.shuffle(e.options.map(function (_, k) { return k; })).forEach(function (k) {
        var op = e.options[k];
        var b = h('button', { class: 'ds-opt', type: 'button', html: L.markup(op.t) });
        b.__ok = !!op.ok;
        b.addEventListener('click', function () {
          caja.querySelectorAll('.ds-opt').forEach(function (x) {
            x.disabled = true;
            x.classList.add(x.__ok ? 'bon' : (x === b ? 'faux' : 'pale'));
          });
          var bonne = e.options.filter(function (z) { return z.ok; })[0];
          if (op.why) zone.appendChild(h('p', { class: 'ds-w', html: L.markup(op.why) }));
          resoudre(o, e, zone, !!op.ok, op.t, op.ok ? '' : (bonne ? bonne.t : ''));
        });
        caja.appendChild(b);
      });
      zone.appendChild(caja);
    }

    function formes(o, e, zone) {
      var trou = h('span', { class: 'trou', text: '·····' });
      var ph = h('div', { class: 'ds-phrase' });
      var parts = (e.phrase || '').split('___');
      ph.appendChild(document.createTextNode(parts[0] || ''));
      ph.appendChild(trou);
      ph.appendChild(document.createTextNode(parts[1] || ''));
      zone.appendChild(ph);
      var caja = h('div', { class: 'ds-chips' });
      L.shuffle(e.formes.slice()).forEach(function (f) {
        var b = h('button', { class: 'ds-chip', type: 'button', text: f.t });
        b.addEventListener('click', function () {
          caja.querySelectorAll('.ds-chip').forEach(function (x) { x.disabled = true; });
          trou.textContent = f.t;
          trou.classList.add(f.ok ? 'bon' : 'faux');
          var bonne = e.formes.filter(function (z) { return z.ok; })[0];
          if (f.why) zone.appendChild(h('p', { class: 'ds-w', html: L.markup(f.why) }));
          resoudre(o, e, zone, !!f.ok, f.t, f.ok ? '' : (bonne ? bonne.t : ''));
        });
        caja.appendChild(b);
      });
      zone.appendChild(caja);
    }

    function ecrire(o, e, zone) {
      var champ = h('input', { class: 'ds-champ', type: 'text', placeholder: e.placeholder || 'Écris la phrase …',
        autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
      var ok = h('button', { class: 'btn-enq mini', type: 'button', text: 'Vérifier' });
      zone.appendChild(h('div', { class: 'ds-fila' }, [champ, ok]));
      zone.appendChild(L.accentRow('fr', champ));
      if (e.aide) {
        var a = h('button', { class: 'ds-aide', type: 'button', text: 'Un indice ?' });
        a.addEventListener('click', function () { a.replaceWith(h('p', { class: 'ds-w', html: '💡 ' + L.markup(e.aide) })); });
        zone.appendChild(a);
      }
      function go() {
        var mien = champ.value.trim();
        if (!mien) { champ.focus(); return; }
        var r = L.matches(mien, [].concat(e.reponse));
        champ.disabled = true; ok.disabled = true;
        if (!r.ok) {
          zone.appendChild(h('div', { class: 'diff ds-w', html: L.diff(mien, [].concat(e.reponse)[0]).map(function (x) {
            return '<span class="' + x[0] + '">' + esc(x[1]) + '</span>';
          }).join('') }));
        } else if (!r.exact) {
          zone.appendChild(h('p', { class: 'ds-w', html: 'Juste, mais il manque les accents : <b>' + esc(r.target) + '</b>' }));
        }
        resoudre(o, e, zone, r.ok, mien, r.ok ? '' : [].concat(e.reponse)[0]);
      }
      ok.addEventListener('click', go);
      champ.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') go(); });
      setTimeout(function () { champ.focus(); }, 140);
    }

    /* ---------------- Finale: die Zeitleiste ordnen ---------------- */
    function finale() {
      var f = lesson.finale || {};
      dossier.innerHTML = '';
      var card = h('div', { class: 'dossier large' });
      card.appendChild(h('div', { class: 'ds-k', text: f.titre || 'La porte' }));
      card.appendChild(h('p', { class: 'ds-i', html: L.markup(f.consigne || '') }));
      var zone = h('div', { class: 'ds-zone' });
      card.appendChild(zone);
      dossier.appendChild(card);
      dossier.classList.add('ouvert');

      /* Erst das Wort, das den ganzen Fall erklärt – dann die Chronologie. */
      if (f.mot && !S.stage.motFait) {
        zone.appendChild(h('div', { class: 'ds-q', html: L.markup(f.mot.question) }));
        var cm = h('div', { class: 'ds-opts' });
        L.shuffle(f.mot.options.map(function (_, k) { return k; })).forEach(function (k) {
          var op = f.mot.options[k];
          var b = h('button', { class: 'ds-opt', type: 'button', html: L.markup(op.t) });
          b.__ok = !!op.ok;
          b.addEventListener('click', function () {
            cm.querySelectorAll('.ds-opt').forEach(function (x) {
              x.disabled = true;
              x.classList.add(x.__ok ? 'bon' : (x === b ? 'faux' : 'pale'));
            });
            var bonne = f.mot.options.filter(function (z) { return z.ok; })[0];
            L.stageAnswer({
              type: 'mot', prompt: f.mot.question, correct: !!op.ok,
              yours: op.t, right: op.ok ? '' : (bonne ? bonne.t : ''),
              explain: f.mot.explication || '', skill: 'wortschatz', grammar: null
            });
            op.ok ? L.accordion([293.66, 369.99], 0.7, 0.06) : L.thunk('lock');
            if (op.why) zone.appendChild(h('p', { class: 'ds-w', html: L.markup(op.why) }));
            if (f.mot.explication) zone.appendChild(h('p', { class: 'ds-w', html: L.markup(f.mot.explication) }));
            S.stage.motFait = true; L.persistProgress();
            var puis = h('button', { class: 'btn-enq', type: 'button', text: f.mot.suite || 'Ouvrir la serrure' });
            puis.addEventListener('click', function () { finale(); });
            zone.appendChild(puis);
            setTimeout(function () { puis.focus(); }, 50);
          });
          cm.appendChild(b);
        });
        zone.appendChild(cm);
        return;
      }

      var ordre = f.ordre || objets.map(function (o) { return o.id; });
      var restants = L.shuffle(ordre.slice());
      var pos = 0, fautes = 0;
      var ligne = h('div', { class: 'timeline' });
      var stock = h('div', { class: 'stock' });
      zone.appendChild(ligne); zone.appendChild(stock);

      function carte(id) {
        var o = objets.filter(function (x) { return x.id === id; })[0];
        return h('button', { class: 'tl-carte', type: 'button', 'data-id': id }, [
          h('span', { class: 'tl-h', text: o.fragment.heure }),
          h('span', { class: 'tl-t', text: o.fragment.texte })
        ]);
      }

      restants.forEach(function (id) {
        var c = carte(id);
        c.addEventListener('click', function () {
          if (c.disabled) return;
          if (id === ordre[pos]) {
            c.disabled = true; c.classList.add('pris');
            var copie = carte(id); copie.disabled = true; copie.classList.add('place');
            ligne.appendChild(copie);
            pos++;
            L.thunk('tick'); L.accordion([392, 493.88], 0.5, 0.05);
            if (pos === ordre.length) fini(fautes);
          } else {
            fautes++;
            c.classList.add('secoue');
            L.thunk('lock');
            setTimeout(function () { c.classList.remove('secoue'); }, 420);
          }
        });
        stock.appendChild(c);
      });

      function fini(fautes) {
        L.stageAnswer({
          type: 'timeline', prompt: f.consigne || 'chronologie',
          correct: fautes === 0, yours: fautes + ' erreur(s)', right: '0',
          explain: f.explication || '', skill: 'verstehen', grammar: lesson.grammarId || null
        });
        porte.classList.add('ouverte');
        root.classList.add('sortie');
        L.accordion([261.63, 329.63, 392, 523.25], 2.2, 0.08);
        var res = h('div', { class: 'ds-r oui' }, [
          h('div', { class: 'ds-rt', text: fautes === 0 ? (f.parfait || 'Sans une seule erreur.') : (f.reussite || 'La porte s\'ouvre.') }),
          f.explication ? h('p', { class: 'ds-rx', html: L.markup(f.explication) }) : null
        ]);
        zone.appendChild(res);
        if (lesson.listening && lesson.listening.source) zone.appendChild(ecoute());
        var sortir = h('button', { class: 'btn-enq', type: 'button', text: f.sortir || 'Sortir' });
        sortir.addEventListener('click', function () { L.stageDone(lesson); });
        zone.appendChild(sortir);
      }
    }

    function ecoute() {
      S.listening = S.listening || { notes: {}, passes: {}, selfRating: null };
      var src = lesson.listening.source;
      var box = h('div', { class: 'ds-radio' });
      box.appendChild(h('div', { class: 'ds-k', style: 'margin-bottom:8px', text: lesson.listening.headline || src.name }));
      if (lesson.listening.intro) box.appendChild(h('p', { class: 'ds-i', text: lesson.listening.intro }));
      box.appendChild(L.player(src, 'fr', function (ep) {
        S.listening.episode = { titel: ep.title, datum: ep.date, quelle: src.name, url: ep.url };
        L.persistProgress();
      }));
      var sc = h('div', { class: 'onda-scale', style: 'margin-top:12px' });
      ['😵', '🙁', '🙂', '😄', '🤩'].forEach(function (em, k) {
        var b = h('button', { type: 'button', text: em });
        b.addEventListener('click', function () {
          sc.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on');
          S.listening.selfRating = k + 1; S.listening.passes[0] = true;
          L.addXp(20); L.persistProgress();
        });
        sc.appendChild(b);
      });
      box.appendChild(h('p', { class: 'ds-w', style: 'margin-top:10px', text: lesson.listening.auto || 'Tu en as compris combien ?' }));
      box.appendChild(sc);
      return box;
    }

    /* ---------------- Vorspann ---------------- */
    function intro() {
      dossier.innerHTML = '';
      var card = h('div', { class: 'dossier centre' }, [
        h('div', { class: 'ds-k', text: lesson.stageKicker || 'Enquête' }),
        h('h1', { class: 'ds-titre', text: lesson.title }),
        h('p', { class: 'ds-i', text: lesson.subtitle || '' }),
        h('p', { class: 'ds-brief', html: L.markup(lesson.brief || '') })
      ]);
      var go = h('button', { class: 'btn-enq', type: 'button', text: lesson.stageStart || 'Commencer' });
      go.addEventListener('click', function () {
        S.stage.phase = 'jeu'; L.persistProgress();
        fermer(); L.accordion([220, 277.18, 329.63], 1.6);
      });
      card.appendChild(go);
      dossier.appendChild(card);
      dossier.classList.add('ouvert');
    }

    majBandeau(); majFrise(); majObjets();
    if (S.stage.phase === 'intro') intro();
    else if (Object.keys(S.stage.resolus).length === objets.length) finale();
    return root;
  };

})(window.LEKTION);
