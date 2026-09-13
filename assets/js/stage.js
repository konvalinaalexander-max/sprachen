/* Sprachen - Bühne.
   Manche Einheiten sind keine sechs Stationen, sondern ein eigenes Stück:
   ein Simulator, ein Escape Room. Sie bringen ihre eigene Darstellung mit,
   liefern aber dieselben Daten zurück wie eine normale Einheit, damit
   Diagnose, Bericht und Lernstand unverändert weiterlaufen. */
(function (L) {
  'use strict';
  var h = L.h;

  L.stages = {};

  /* Ein Ergebnis in die laufende Sitzung schreiben – gleiche Form wie bei
     den normalen Aufgaben, damit L.skillScores und der Bericht es verstehen. */
  L.stageAnswer = function (res) {
    var S = L.session;
    S.results = S.results || [];
    S.results.push({
      type: res.type || 'stage',
      prompt: res.prompt || '',
      correct: !!res.correct,
      yours: res.yours || '',
      right: res.right || '',
      explain: res.explain || '',
      skill: res.skill || 'erkennen',
      grammar: res.grammar || null,
      freeform: !!res.freeform
    });
    if (res.correct) {
      S.streak = (S.streak || 0) + 1;
      L.addXp(12 + Math.min(S.streak, 6) * 3);
    } else {
      S.streak = 0;
    }
    L.persistProgress();
  };

  L.stageDone = function (lesson) {
    L.persistProgress();
    L.go('#/lektion/' + lesson.id + '/wrap');
  };

  /* Farbverlauf zwischen Stützstellen – für Himmel, Licht, Stimmung. */
  L.mixHex = function (a, b, t) {
    var pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    var r = Math.round((pa >> 16) + ((pb >> 16) - (pa >> 16)) * t);
    var g = Math.round(((pa >> 8) & 255) + (((pb >> 8) & 255) - ((pa >> 8) & 255)) * t);
    var bl = Math.round((pa & 255) + ((pb & 255) - (pa & 255)) * t);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1);
  };
  L.ramp = function (stops, t) {
    t = Math.max(0, Math.min(1, t));
    var n = stops.length - 1;
    var i = Math.min(Math.floor(t * n), n - 1);
    return L.mixHex(stops[i], stops[i + 1], t * n - i);
  };

  /* ---------------- Klang für die Bühnen ----------------
     Alles synthetisiert: keine Dateien, funktioniert offline. */
  /* Klang ist Beiwerk: ein Audiofehler darf niemals eine Aufgabe blockieren. */
  function safe(fn) {
    return function () {
      try { return fn.apply(null, arguments); }
      catch (e) { if (window.console) console.warn('Klang aus:', e.message); }
    };
  }

  function ac() {
    if (!L.state.settings.sound) return null;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!L._ac) L._ac = new AC();
    if (L._ac.state === 'suspended') L._ac.resume();
    return L._ac;
  }

  /* Karplus-Strong: eine gezupfte Nylonsaite aus Rauschen und Verzögerung. */
  L.pluck = safe(function (freq, dur, vol) {
    var c = ac(); if (!c) return;
    var sr = c.sampleRate, n = Math.floor(sr * (dur || 1.1));
    var N = Math.round(sr / freq);
    var buf = c.createBuffer(1, n, sr), d = buf.getChannelData(0);
    var ring = new Float32Array(N);
    for (var i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
    var p = 0, last = 0;
    for (var j = 0; j < n; j++) {
      var cur = ring[p];
      var out = (cur + last) * 0.498;      // leichte Dämpfung = weicher Nylonklang
      ring[p] = out; last = cur;
      p = (p + 1) % N;
      d[j] = out * Math.exp(-2.2 * j / n);
    }
    var s = c.createBufferSource(); s.buffer = buf;
    var g = c.createGain(); g.gain.value = vol || 0.22;
    var f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 3200;
    s.connect(f); f.connect(g); g.connect(c.destination);
    s.start();
  });

  /* Palmas: trockenes Händeklatschen aus gefiltertem Rauschen. */
  L.clap = safe(function (times, vol) {
    var c = ac(); if (!c) return;
    (times || [0]).forEach(function (t) {
      var n = Math.floor(c.sampleRate * 0.06);
      var buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
      var s = c.createBufferSource(); s.buffer = buf;
      var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1600; f.Q.value = 1.1;
      var g = c.createGain(); g.gain.value = vol || 0.16;
      s.connect(f); f.connect(g); g.connect(c.destination);
      s.start(c.currentTime + t);
    });
  });

  /* Akkordeon: zwei leicht verstimmte Sägezähne mit Vibrato. */
  L.accordion = safe(function (freqs, dur, vol) {
    var c = ac(); if (!c) return;
    var t0 = c.currentTime, d = dur || 1.4;
    var master = c.createGain();
    master.gain.setValueAtTime(0, t0);
    master.gain.linearRampToValueAtTime(vol || 0.07, t0 + 0.12);
    master.gain.setValueAtTime(vol || 0.07, t0 + d - 0.25);
    master.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    var lfo = c.createOscillator(), lg = c.createGain();
    lfo.frequency.value = 5.2; lg.gain.value = 3.4;
    lfo.connect(lg); lfo.start(t0); lfo.stop(t0 + d);
    (freqs || [220]).forEach(function (f) {
      [-3.5, 3.5].forEach(function (det) {
        var o = c.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = f;
        o.detune.value = det;
        lg.connect(o.detune);
        var fil = c.createBiquadFilter();
        fil.type = 'lowpass'; fil.frequency.value = 2000;
        o.connect(fil); fil.connect(master);
        o.start(t0); o.stop(t0 + d);
      });
    });
    master.connect(c.destination);
  });

  /* Schloss, Klicken, Ticken. */
  L.thunk = safe(function (kind) {
    var c = ac(); if (!c) return;
    var t0 = c.currentTime;
    var n = Math.floor(c.sampleRate * 0.09);
    var buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 6);
    var s = c.createBufferSource(); s.buffer = buf;
    var f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = kind === 'tick' ? 4200 : kind === 'open' ? 900 : 300;
    f.Q.value = 2.4;
    var g = c.createGain(); g.gain.value = kind === 'tick' ? 0.05 : 0.2;
    s.connect(f); f.connect(g); g.connect(c.destination);
    s.start(t0);
    if (kind !== 'tick') {
      var o = c.createOscillator(), og = c.createGain();
      o.frequency.setValueAtTime(kind === 'open' ? 180 : 90, t0);
      o.frequency.exponentialRampToValueAtTime(kind === 'open' ? 90 : 45, t0 + 0.2);
      og.gain.setValueAtTime(0.14, t0);
      og.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.25);
      o.connect(og); og.connect(c.destination);
      o.start(t0); o.stop(t0 + 0.26);
    }
  });

  /* Spickzettel: die Grammatik der Einheit, jederzeit aufklappbar.
     Ohne das müsste man raten – eine Bühne ersetzt die Erklärung nicht. */
  L.chuleta = function (lesson, label) {
    var fond = h('div', { class: 'chuleta-fond' });
    var btn = h('button', { class: 'chuleta-btn', type: 'button' }, [
      h('span', { text: '✦' }), h('span', { text: label || 'la regla' })
    ]);
    btn.addEventListener('click', function () {
      if (!fond.childNodes.length) {
        var card = h('div', { class: 'chuleta' });
        card.appendChild(h('button', { class: 'ch-x', type: 'button', text: '✕',
          onclick: function () { fond.classList.remove('ouvert'); } }));
        (lesson.intro.grammar || []).forEach(function (g) {
          card.appendChild(h('div', { class: 'ch-k', text: g.name }));
          if (g.explain) card.appendChild(h('div', { class: 'prose ch-x2', html: L.rich(g.explain, 14.5) }));
          if (g.table && g.table.rows) {
            var t = h('table', { class: 'gtable' });
            if (g.table.head) {
              var tr = h('tr');
              g.table.head.forEach(function (c) { tr.appendChild(h('th', { text: c })); });
              t.appendChild(h('thead', {}, [tr]));
            }
            var tb = h('tbody');
            g.table.rows.forEach(function (r) {
              var tr2 = h('tr');
              r.forEach(function (c) { tr2.appendChild(h('td', { html: L.markup(c) })); });
              tb.appendChild(tr2);
            });
            t.appendChild(tb);
            card.appendChild(h('div', { class: 'scroll-x' }, [t]));
          }
          (g.examples || []).forEach(function (ex) {
            card.appendChild(h('div', { class: 'ch-ex' }, [
              h('div', { class: 'ch-s', html: L.markup(ex.src) }),
              ex.note ? h('div', { class: 'ch-n', html: L.markup(ex.note) }) : null
            ]));
          });
          (g.pitfalls || []).forEach(function (pf) {
            card.appendChild(h('div', { class: 'ch-p', html: '⚠ ' + L.markup(pf) }));
          });
        });
        if ((lesson.intro.vocab || []).length) {
          card.appendChild(h('div', { class: 'ch-k', style: 'margin-top:18px', text: lesson.vocabTitle || '·' }));
          var vg = h('div', { class: 'ch-voc' });
          lesson.intro.vocab.forEach(function (v) {
            vg.appendChild(h('div', { class: 'ch-v' }, [
              h('b', { text: v.term }),
              h('span', { html: L.markup(v.def) })
            ]));
          });
          card.appendChild(vg);
        }
        fond.appendChild(card);
        fond.addEventListener('click', function (ev) {
          if (ev.target === fond) fond.classList.remove('ouvert');
        });
      }
      fond.classList.add('ouvert');
    });
    return { btn: btn, fond: fond };
  };

  /* Kleine Helfer, die beide Bühnen brauchen */
  L.typeOut = function (el, text, speed, done) {
    el.textContent = '';
    var fertig = false;
    function ende() { if (fertig) return; fertig = true; el.textContent = text; if (done) done(); }
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      ende(); return { stop: ende };
    }
    var i = 0, stopped = false;
    (function step() {
      if (stopped || fertig) return;
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(step, speed || 18);
      else ende();
    })();
    return { stop: function () { stopped = true; ende(); } };
  };

  L.accentRow = function (lang, field) {
    var sets = { es: ['á', 'é', 'í', 'ó', 'ú', 'ñ'], fr: ['é', 'è', 'ê', 'à', 'ç', 'û'] };
    var bar = h('div', { class: 'accents' });
    (sets[lang] || []).forEach(function (ch) {
      bar.appendChild(h('button', { class: 'acc', type: 'button', text: ch, tabindex: '-1',
        onclick: function (e) {
          e.preventDefault();
          var s = field.selectionStart, en = field.selectionEnd;
          field.value = field.value.slice(0, s) + ch + field.value.slice(en);
          field.focus(); field.selectionStart = field.selectionEnd = s + ch.length;
        } }));
    });
    return bar;
  };

})(window.LEKTION);
