/* Sprachen - Kern: Registry, Zustand, Klang, Kleinkram.
   Bewusst ohne ES-Module, damit die App auch über file:// startet. */
(function (global) {
  'use strict';

  var LEKTION = global.LEKTION || {};
  global.LEKTION = LEKTION;

  /* ---------- Registry ---------- */
  LEKTION.lessons = {};          // id -> Lektionsobjekt
  LEKTION.catalog = [];          // Kurzeinträge aus manifest.js
  LEKTION.manifest = function (entries) { LEKTION.catalog = entries || []; };
  LEKTION.register = function (lesson) {
    LEKTION.lessons[lesson.id] = lesson;
    document.dispatchEvent(new CustomEvent('lesson:ready', { detail: lesson.id }));
  };
  LEKTION.load = function (entry) {
    return new Promise(function (resolve, reject) {
      if (LEKTION.lessons[entry.id]) return resolve(LEKTION.lessons[entry.id]);
      var s = document.createElement('script');
      s.src = entry.file;
      s.onload = function () {
        LEKTION.lessons[entry.id]
          ? resolve(LEKTION.lessons[entry.id])
          : reject(new Error('Lektion ' + entry.id + ' hat sich nicht registriert.'));
      };
      s.onerror = function () { reject(new Error('Datei nicht ladbar: ' + entry.file)); };
      document.head.appendChild(s);
    });
  };

  /* ---------- Zustand (localStorage) ---------- */
  var KEY = 'sprachen.v1';
  var blank = {
    xp: 0,
    streakDays: 0,
    lastDay: null,
    done: {},        // lessonId -> {at, score, total, minutes}
    progress: {},    // lessonId -> laufender Zwischenstand
    settings: { readSize: 18, sound: true }
  };

  function read() {
    try {
      var raw = global.localStorage && localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(blank));
      var d = JSON.parse(raw);
      for (var k in blank) if (!(k in d)) d[k] = blank[k];
      for (var s in blank.settings) if (!(s in d.settings)) d.settings[s] = blank.settings[s];
      return d;
    } catch (e) { return JSON.parse(JSON.stringify(blank)); }
  }

  var S = read();
  LEKTION.state = S;
  LEKTION.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  };
  LEKTION.resetAll = function () {
    S = JSON.parse(JSON.stringify(blank));
    LEKTION.state = S;
    LEKTION.save();
  };

  LEKTION.addXp = function (n) {
    S.xp += n;
    var today = new Date().toISOString().slice(0, 10);
    if (S.lastDay !== today) {
      var y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      S.streakDays = (S.lastDay === y) ? S.streakDays + 1 : 1;
      S.lastDay = today;
    }
    LEKTION.save();
    document.dispatchEvent(new CustomEvent('xp:changed'));
  };

  /* ---------- Klang: synthetisiert, also offline ---------- */
  var ctx = null;
  function audio() {
    if (!S.settings.sound) return null;
    if (!ctx) {
      var AC = global.AudioContext || global.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, dur, type, vol, delay) {
    var c = audio(); if (!c) return;
    var t0 = c.currentTime + (delay || 0);
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol || 0.09, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  LEKTION.fx = {
    tap:   function () { tone(520, 0.07, 'sine', 0.05); },
    right: function (streak) {
      var base = 523.25, step = Math.min(streak || 0, 6);
      tone(base * Math.pow(1.0595, step * 2), 0.13, 'sine', 0.085);
      tone(base * Math.pow(1.0595, step * 2 + 4), 0.17, 'sine', 0.06, 0.07);
    },
    wrong: function () { tone(196, 0.16, 'triangle', 0.07); tone(146, 0.22, 'triangle', 0.05, 0.06); },
    done:  function () { [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) { tone(f, 0.3, 'sine', 0.07, i * 0.09); }); },
    flip:  function () { tone(740, 0.05, 'sine', 0.035); }
  };

  /* ---------- Partikel & Toast ---------- */
  LEKTION.sparks = function (el, n) {
    if (!el || global.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    var r = el.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var cs = getComputedStyle(document.body);
    var colors = [cs.getPropertyValue('--a1').trim() || '#7c8cff', cs.getPropertyValue('--a2').trim() || '#c084fc', '#3ddc97'];
    for (var i = 0; i < (n || 14); i++) {
      (function (i) {
        var p = document.createElement('i');
        p.className = 'spark';
        p.style.background = colors[i % colors.length];
        p.style.left = cx + 'px'; p.style.top = cy + 'px';
        document.body.appendChild(p);
        var a = (Math.PI * 2 * i) / (n || 14) + Math.random() * 0.6;
        var d = 55 + Math.random() * 85;
        p.animate([
          { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
          { transform: 'translate(' + (Math.cos(a) * d - 50) + '%,' + (Math.sin(a) * d + 60 - 50) + '%) scale(0)', opacity: 0 }
        ], { duration: 620 + Math.random() * 340, easing: 'cubic-bezier(.2,.8,.3,1)' })
         .onfinish = function () { p.remove(); };
      })(i);
    }
  };

  LEKTION.combo = function (text) {
    var el = document.getElementById('combo');
    if (!el) return;
    el.textContent = text;
    el.classList.remove('go');
    void el.offsetWidth;
    el.classList.add('go');
  };

  var toastTimer;
  LEKTION.toast = function (msg, ms) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, ms || 2400);
  };

  /* ---------- Helfer ---------- */
  LEKTION.h = function (tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'html') el.innerHTML = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) el.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  };

  LEKTION.esc = function (s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /* Autoren-Auszeichnung: *fett* und _hervorgehoben_. Wird überall verwendet,
     wo Lektionstexte gerendert werden – Erklärungen, Notizen, Rückmeldungen. */
  LEKTION.markup = function (s) {
    return LEKTION.esc(s)
      .replace(/\*([^*]+)\*/g, '<b style="color:var(--ink)">$1</b>')
      .replace(/_([^_]+)_/g, '<span class="hl-word">$1</span>');
  };

  /* Mehrere Absätze mit Auszeichnung. */
  LEKTION.rich = function (s, size) {
    return LEKTION.markup(s).split(/\n{2,}/).map(function (para) {
      return '<p style="line-height:1.72;font-size:' + (size || 15) + 'px">' +
        para.replace(/\n/g, '<br>') + '</p>';
    }).join('');
  };

  LEKTION.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  /* Vergleich von Freitext: Akzente, Groß-/Kleinschreibung und Zeichensetzung
     werden verziehen - der Inhalt zählt. Akzentfehler werden separat gemeldet. */
  LEKTION.norm = function (s, keepAccents) {
    var t = String(s || '').trim().toLowerCase().replace(/[¿¡]/g, '')
      .replace(/[.,;:!?"'«»]/g, '').replace(/\s+/g, ' ');
    if (!keepAccents && t.normalize) t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return t;
  };
  LEKTION.matches = function (input, accepted) {
    var list = Array.isArray(accepted) ? accepted : [accepted];
    var loose = LEKTION.norm(input), strict = LEKTION.norm(input, true);
    for (var i = 0; i < list.length; i++) {
      if (strict === LEKTION.norm(list[i], true)) return { ok: true, exact: true, target: list[i] };
    }
    for (var j = 0; j < list.length; j++) {
      if (loose === LEKTION.norm(list[j])) return { ok: true, exact: false, target: list[j] };
    }
    return { ok: false, exact: false, target: list[0] };
  };

  /* Wortweiser Vergleich für die Korrekturanzeige */
  LEKTION.diff = function (a, b) {
    var A = String(a).split(/(\s+)/), B = String(b).split(/(\s+)/);
    var n = A.length, m = B.length, i, j;
    var dp = [];
    for (i = 0; i <= n; i++) { dp[i] = []; for (j = 0; j <= m; j++) dp[i][j] = 0; }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) {
      dp[i][j] = LEKTION.norm(A[i]) === LEKTION.norm(B[j])
        ? dp[i + 1][j + 1] + 1
        : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
    var out = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (LEKTION.norm(A[i]) === LEKTION.norm(B[j])) { out.push(['keep', B[j]]); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push(['del', A[i]]); i++; }
      else { out.push(['add', B[j]]); j++; }
    }
    while (i < n) out.push(['del', A[i++]]);
    while (j < m) out.push(['add', B[j++]]);
    return out;
  };

  LEKTION.fmtDate = function (iso, lang) {
    var loc = { es: 'es-ES', fr: 'fr-FR' }[lang] || 'de-CH';
    try {
      return new Date(iso + 'T12:00:00').toLocaleDateString(loc,
        { weekday: 'long', day: 'numeric', month: 'long' });
    } catch (e) { return iso; }
  };

})(window);
