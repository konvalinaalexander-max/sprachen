/* Bühne "La noche" – ein Abend in Madrid, Stunde für Stunde.
   Der Himmel wandert mit der Uhrzeit, die Fenster gehen an, und man muss
   den Leuten das Richtige sagen. Alles CSS und SVG, kein einziges Bild. */
(function (L) {
  'use strict';
  var h = L.h, esc = L.esc;

  var SKY = {
    top: ['#4a5fa8', '#2a2a5c', '#141a3a', '#080a16'],
    mid: ['#e8814a', '#7a4a72', '#2a2450', '#0e1228'],
    low: ['#ffc46b', '#d9694f', '#4a3355', '#171a32']
  };

  function skylineFar() {
    return '<svg class="sky-far" viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="M0,240 L0,168 L48,168 L48,150 L74,150 L74,168 L128,168 L128,120 L142,120 L142,104 ' +
      'L156,104 L156,120 L170,120 L170,168 L232,168 L232,140 L300,140 L300,158 L352,158 L352,112 ' +
      'L366,112 L366,92 L380,92 L380,112 L394,112 L394,158 L452,158 L452,176 L520,176 L520,132 ' +
      'L548,132 Q562,96 576,132 L604,132 L604,176 L668,176 L668,146 L736,146 L736,164 L790,164 ' +
      'L790,118 L804,118 L804,98 L818,98 L818,118 L832,118 L832,164 L900,164 L900,180 L968,180 ' +
      'L968,138 L1036,138 L1036,160 L1104,160 L1104,150 L1140,150 L1140,168 L1200,168 L1200,240 Z"/>' +
      '</svg>';
  }

  function skylineNear() {
    var win = '';
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 26; c++) {
        var x = 40 + c * 44, y = 96 + r * 40;
        win += '<rect class="win" data-i="' + (r * 26 + c) + '" x="' + x + '" y="' + y + '" width="17" height="23" rx="2"/>';
      }
    }
    return '<svg class="sky-near" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="M0,260 L0,84 L200,84 L200,64 L214,64 L214,84 L470,84 L470,58 L484,58 L484,84 ' +
      'L760,84 L760,70 L774,70 L774,84 L1010,84 L1010,62 L1024,62 L1024,84 L1200,84 L1200,260 Z"/>' +
      '<g class="antennas">' +
      '<path d="M300,84 L300,44 M292,54 L308,54 M294,64 L306,64"/>' +
      '<path d="M880,84 L880,38 M872,48 L888,48"/>' +
      '<circle cx="600" cy="66" r="13" class="dish"/><path d="M600,79 L600,84"/>' +
      '</g>' +
      '<g class="tendedero"><path d="M120,92 Q300,116 480,92"/>' +
      '<rect x="196" y="104" width="20" height="26" rx="2"/>' +
      '<rect x="248" y="108" width="26" height="20" rx="2"/>' +
      '<rect x="320" y="110" width="18" height="28" rx="2"/>' +
      '<rect x="388" y="106" width="24" height="22" rx="2"/></g>' +
      '<g class="wins">' + win + '</g>' +
      '</svg>';
  }

  function balcony() {
    var bars = '';
    for (var i = 0; i < 44; i++) bars += '<path d="M' + (18 + i * 27) + ',0 L' + (18 + i * 27) + ',96"/>';
    return '<svg class="balcon" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">' +
      '<g class="rail">' + bars +
      '<path d="M0,8 L1200,8"/><path d="M0,52 L1200,52"/><path d="M0,96 L1200,96"/></g>' +
      '<g class="maceta"><path d="M980,96 L980,58 L1052,58 L1046,96 Z"/>' +
      '<path d="M990,58 q6,-34 26,-30 q-4,20 -26,30 Z"/>' +
      '<path d="M1020,58 q-2,-30 22,-26 q0,20 -22,26 Z"/></g>' +
      '</svg>';
  }

  L.stages.noche = function (lesson) {
    var S = L.session;
    S.stage = S.stage || { i: 0, onda: 3 };
    var escenas = lesson.escenas || [];

    var root = h('div', { class: 'noche' });
    var sky = h('div', { class: 'noche-sky' });
    var sun = h('div', { class: 'astro sol' });
    var moon = h('div', { class: 'astro luna' });
    var stars = h('div', { class: 'stars' });
    for (var s = 0; s < 60; s++) {
      stars.appendChild(h('i', {
        style: 'left:' + (Math.random() * 100).toFixed(2) + '%;top:' + (Math.random() * 62).toFixed(2) +
          '%;animation-delay:' + (Math.random() * 4).toFixed(2) + 's;--s:' + (Math.random() * 0.6 + 0.5).toFixed(2)
      }));
    }
    var far = h('div', { class: 'layer far', html: skylineFar() });
    var near = h('div', { class: 'layer near', html: skylineNear() });
    var bal = h('div', { class: 'layer bal', html: balcony() });
    sky.appendChild(stars); sky.appendChild(sun); sky.appendChild(moon);
    root.appendChild(sky); root.appendChild(far); root.appendChild(near); root.appendChild(bal);
    root.appendChild(h('div', { class: 'noche-vig' }));

    /* Kopfleiste: Uhrzeit, Ort, Stimmung */
    var hud = h('div', { class: 'hud' });
    var hHora = h('div', { class: 'hud-hora' });
    var hLugar = h('div', { class: 'hud-lugar' });
    var hOnda = h('div', { class: 'onda' });
    hud.appendChild(h('div', {}, [hHora, hLugar]));
    var ch = L.chuleta(lesson, lesson.chuletaLabel || 'la regla');
    hud.appendChild(h('div', { class: 'hud-d' }, [hOnda, ch.btn]));
    root.appendChild(hud);
    root.appendChild(ch.fond);

    var panel = h('div', { class: 'noche-panel' });
    root.appendChild(panel);

    function pintarOnda() {
      hOnda.innerHTML = '';
      hOnda.appendChild(h('span', { class: 'onda-l', text: 'buena onda' }));
      for (var i = 0; i < 5; i++) {
        hOnda.appendChild(h('i', { class: i < S.stage.onda ? 'on' : '' }));
      }
    }

    function ambiente(t) {
      sky.style.setProperty('--sky-top', L.ramp(SKY.top, t));
      sky.style.setProperty('--sky-mid', L.ramp(SKY.mid, t));
      sky.style.setProperty('--sky-low', L.ramp(SKY.low, t));
      stars.style.opacity = Math.max(0, Math.min(1, (t - 0.22) / 0.45));
      sun.style.opacity = t < 0.42 ? String(1 - t / 0.42) : '0';
      sun.style.transform = 'translate(-50%,0) translateY(' + (t * 190).toFixed(0) + 'px)';
      moon.style.opacity = t > 0.5 ? String(Math.min(1, (t - 0.5) / 0.3)) : '0';
      moon.style.transform = 'translate(-50%,0) translateY(' + (60 - t * 46).toFixed(0) + 'px)';
      var lit = Math.round(t * 62);
      near.querySelectorAll('.win').forEach(function (w, i) {
        w.classList.toggle('lit', (i * 7 + 3) % 78 < lit);
      });
      root.style.setProperty('--glow', L.ramp(['#ffb066', '#ff8a5c', '#b06a8a', '#5b6ba8'], t));
    }

    /* ---------------- Titelbild ---------------- */
    function portada() {
      ambiente(0);
      hud.style.opacity = '0';
      panel.classList.add('centro');
      panel.innerHTML = '';
      var card = h('div', { class: 'portada' }, [
        h('div', { class: 'p-kicker', text: lesson.stageKicker || 'Simulador' }),
        h('h1', { class: 'p-title', text: lesson.title }),
        h('p', { class: 'p-sub', text: lesson.subtitle || '' }),
        h('div', { class: 'p-meta' }, [
          h('span', { class: 'tag', text: lesson.level }),
          h('span', { class: 'tag', text: escenas.length + ' escenas' }),
          h('span', { class: 'tag', text: '~' + (lesson.minutes || 40) + ' min' })
        ])
      ]);
      var go = h('button', { class: 'btn-noche', type: 'button', text: lesson.stageStart || 'Salir de casa' });
      go.addEventListener('click', function () {
        L.pluck(196, 1.4); L.pluck(293.66, 1.4, 0.16);
        hud.style.opacity = '1';
        S.stage.i = 0; pintar();
      });
      card.appendChild(go);
      if (lesson.stageIntro) card.appendChild(h('p', { class: 'p-note', text: lesson.stageIntro }));
      panel.appendChild(card);
    }

    /* ---------------- Eine Szene ---------------- */
    function pintar() {
      var i = S.stage.i;
      if (i >= escenas.length) return final();
      panel.classList.remove('centro');
      var e = escenas[i];
      var t = escenas.length > 1 ? i / (escenas.length - 1) : 0;
      ambiente(t);
      pintarOnda();
      hHora.textContent = e.hora || '';
      hLugar.textContent = e.lugar || '';
      L.persistProgress();

      panel.innerHTML = '';
      var card = h('div', { class: 'escena' });
      card.appendChild(h('div', { class: 'esc-n', text: (i + 1) + '/' + escenas.length }));

      var narr = h('p', { class: 'esc-narr' });
      card.appendChild(narr);
      var cuerpo = h('div', { class: 'esc-cuerpo' });
      card.appendChild(cuerpo);
      panel.appendChild(card);

      /* Tippen lässt sich überspringen – wer schnell liest, wartet nicht. */
      var tecleo = L.typeOut(narr, e.narracion || '', 11, function () {
        card.classList.remove('tecleando');
        if (e.escucha) return escucha(e, cuerpo);
        if (e.quien) {
          cuerpo.appendChild(h('div', { class: 'burbuja' }, [
            h('div', { class: 'b-quien', text: e.quien }),
            h('div', { class: 'b-dice', html: L.markup(e.dice || '') })
          ]));
        }
        if (e.reto) cuerpo.appendChild(h('div', { class: 'esc-reto', html: L.markup(e.reto) }));
        (e.tipo === 'escribir' ? escribir : e.tipo === 'formas' ? formas : elegir)(e, cuerpo);
      });
      card.classList.add('tecleando');
      card.addEventListener('click', function (ev) {
        if (card.classList.contains('tecleando') && !ev.target.closest('button, input, textarea')) tecleo.stop();
      });
    }

    function marcar(e, ok, mio, correcto) {
      S.stage.onda = Math.max(0, Math.min(5, S.stage.onda + (ok ? 1 : -1)));
      pintarOnda();
      if (ok) { L.pluck(329.63, 1.2); L.clap([0, 0.13, 0.24], 0.1); }
      else { L.pluck(146.83, 0.9, 0.18); }
      L.stageAnswer({
        type: e.tipo || 'elegir', prompt: e.reto || e.narracion, correct: ok,
        yours: mio, right: correcto, explain: e.explica || '',
        skill: e.skill || 'produzieren', grammar: e.grammar || null
      });
    }

    function reaccion(cuerpo, ok, e, mio, correcto) {
      var box = h('div', { class: 'reaccion ' + (ok ? 'si' : 'no') });
      box.appendChild(h('div', { class: 'r-t', text: ok ? (e.gana || '¡Eso!') : (e.pierde || 'Uf.') }));
      if (!ok && correcto) box.appendChild(h('div', { class: 'r-c', html: '→ <b>' + esc(correcto) + '</b>' }));
      if (e.explica) box.appendChild(h('p', { class: 'r-x', html: L.markup(e.explica) }));
      cuerpo.appendChild(box);
      var sig = h('button', { class: 'btn-noche', type: 'button',
        text: S.stage.i + 1 < escenas.length ? (e.siguiente || 'Seguir') : 'Volver a casa' });
      sig.addEventListener('click', function () {
        S.stage.i++; L.persistProgress(); pintar();
      });
      cuerpo.appendChild(sig);
      setTimeout(function () { sig.focus(); }, 40);
    }

    function elegir(e, cuerpo) {
      var caja = h('div', { class: 'opciones' });
      L.shuffle(e.opciones.map(function (_, k) { return k; })).forEach(function (k) {
        var o = e.opciones[k];
        var b = h('button', { class: 'opcion', type: 'button', html: L.markup(o.t) });
        b.addEventListener('click', function () {
          caja.querySelectorAll('.opcion').forEach(function (x) { x.disabled = true; });
          var correcta = e.opciones.filter(function (z) { return z.ok; })[0];
          [].slice.call(caja.children).forEach(function (x) {
            if (x.__ok) x.classList.add('bien');
            else if (x === b) x.classList.add('mal');
            else x.classList.add('gris');
          });
          if (o.why) cuerpo.appendChild(h('p', { class: 'porque', html: L.markup(o.why) }));
          marcar(e, !!o.ok, o.t, correcta ? correcta.t : '');
          reaccion(cuerpo, !!o.ok, e, o.t, o.ok ? '' : (correcta ? correcta.t : ''));
        });
        b.__ok = !!o.ok;
        caja.appendChild(b);
      });
      cuerpo.appendChild(caja);
    }

    function formas(e, cuerpo) {
      var hueco = h('span', { class: 'hueco', text: '·····' });
      var frase = h('div', { class: 'frase' });
      var partes = (e.frase || '').split('___');
      frase.appendChild(document.createTextNode(partes[0] || ''));
      frase.appendChild(hueco);
      frase.appendChild(document.createTextNode(partes[1] || ''));
      cuerpo.appendChild(frase);

      var caja = h('div', { class: 'chips' });
      L.shuffle(e.formas.slice()).forEach(function (f) {
        var b = h('button', { class: 'chip-f', type: 'button', text: f.t });
        b.addEventListener('click', function () {
          caja.querySelectorAll('.chip-f').forEach(function (x) { x.disabled = true; });
          hueco.textContent = f.t;
          hueco.classList.add(f.ok ? 'bien' : 'mal');
          var correcta = e.formas.filter(function (z) { return z.ok; })[0];
          if (!f.ok && correcta) {
            setTimeout(function () { hueco.textContent = correcta.t; hueco.classList.remove('mal'); hueco.classList.add('bien'); }, 900);
          }
          if (f.why) cuerpo.appendChild(h('p', { class: 'porque', html: L.markup(f.why) }));
          marcar(e, !!f.ok, f.t, correcta ? correcta.t : '');
          reaccion(cuerpo, !!f.ok, e, f.t, f.ok ? '' : (correcta ? correcta.t : ''));
        });
        caja.appendChild(b);
      });
      cuerpo.appendChild(caja);
    }

    function escribir(e, cuerpo) {
      var campo = h('input', { class: 'campo', type: 'text', placeholder: e.placeholder || 'Escríbelo …',
        autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
      var ok = h('button', { class: 'btn-noche mini', type: 'button', text: 'Decirlo' });
      cuerpo.appendChild(h('div', { class: 'fila' }, [campo, ok]));
      cuerpo.appendChild(L.accentRow('es', campo));
      if (e.pista) {
        var p = h('button', { class: 'pista', type: 'button', text: '¿Una pista?' });
        p.addEventListener('click', function () { p.replaceWith(h('p', { class: 'porque', html: '💡 ' + L.markup(e.pista) })); });
        cuerpo.appendChild(p);
      }
      function enviar() {
        var mio = campo.value.trim();
        if (!mio) { campo.focus(); return; }
        var r = L.matches(mio, [].concat(e.respuesta));
        campo.disabled = true; ok.disabled = true;
        if (!r.ok) {
          var d = L.diff(mio, [].concat(e.respuesta)[0]);
          cuerpo.appendChild(h('div', { class: 'diff porque', html: d.map(function (x) {
            return '<span class="' + x[0] + '">' + esc(x[1]) + '</span>';
          }).join('') }));
        } else if (!r.exact) {
          cuerpo.appendChild(h('p', { class: 'porque', html: 'Bien, pero faltan las tildes: <b>' + esc(r.target) + '</b>' }));
        }
        marcar(e, r.ok, mio, [].concat(e.respuesta)[0]);
        reaccion(cuerpo, r.ok, e, mio, r.ok ? '' : [].concat(e.respuesta)[0]);
      }
      ok.addEventListener('click', enviar);
      campo.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') enviar(); });
      setTimeout(function () { campo.focus(); }, 120);
    }

    /* Hörszene: der echte Podcast, in die Nacht eingebaut */
    function escucha(e, cuerpo) {
      S.listening = S.listening || { notes: {}, passes: {}, selfRating: null };
      var src = (lesson.listening && lesson.listening.source) || null;
      if (src) {
        cuerpo.appendChild(h('div', { class: 'radio' }, [
          h('div', { class: 'radio-n', text: src.name }),
          L.player(src, 'es', function (ep) {
            S.listening.episode = { titel: ep.title, datum: ep.date, quelle: src.name, url: ep.url };
            L.persistProgress();
          })
        ]));
      }
      var ta = h('textarea', { class: 'campo', placeholder: e.placeholder || 'Dos frases: ¿de qué va?', style: 'min-height:84px' });
      ta.value = S.listening.notes[0] || '';
      ta.addEventListener('input', function () { S.listening.notes[0] = ta.value; L.persistProgress(); });
      cuerpo.appendChild(ta);

      cuerpo.appendChild(h('p', { class: 'esc-reto', html: L.markup(e.auto || '¿Cuánto has pillado?') }));
      var sc = h('div', { class: 'onda-scale' });
      ['😵', '🙁', '🙂', '😄', '🤩'].forEach(function (em, k) {
        var b = h('button', { type: 'button', text: em });
        b.addEventListener('click', function () {
          sc.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on');
          S.listening.selfRating = k + 1;
          S.listening.passes[0] = true;
          L.addXp(20); L.persistProgress(); L.clap([0, 0.12], 0.12);
        });
        sc.appendChild(b);
      });
      cuerpo.appendChild(sc);
      var sig = h('button', { class: 'btn-noche', type: 'button', text: e.siguiente || 'Seguir' });
      sig.addEventListener('click', function () { S.stage.i++; L.persistProgress(); pintar(); });
      cuerpo.appendChild(sig);
    }

    /* ---------------- Amanecer ---------------- */
    function final() {
      ambiente(1);
      hud.style.opacity = '0';
      panel.classList.add('centro');
      panel.innerHTML = '';
      var onda = S.stage.onda;
      var txt = (lesson.finales && (lesson.finales[onda] || lesson.finales[Math.min(5, Math.max(0, onda))])) || '';
      var card = h('div', { class: 'portada final' }, [
        h('div', { class: 'p-kicker', text: '05:40' }),
        h('h1', { class: 'p-title', text: lesson.stageEnd || 'Amanece' }),
        h('p', { class: 'p-sub', text: txt }),
        h('div', { class: 'onda big' })
      ]);
      var o = card.querySelector('.onda');
      for (var i = 0; i < 5; i++) o.appendChild(h('i', { class: i < onda ? 'on' : '' }));
      var go = h('button', { class: 'btn-noche', type: 'button', text: 'Ver cómo ha ido' });
      go.addEventListener('click', function () { L.pluck(261.63, 1.6); L.stageDone(lesson); });
      card.appendChild(go);
      panel.appendChild(card);
      L.clap([0, 0.14, 0.26, 0.46], 0.13);
    }

    (S.stage.i > 0 ? pintar : portada)();
    return root;
  };

})(window.LEKTION);
