/* Sprachen - die sechs Stationen einer Lerneinheit.
   Sobald eine Lektion offen ist, steht hier alles in der Zielsprache. */
(function (L) {
  'use strict';
  var h = L.h, esc = L.esc;
  var markup = function (s) { return L.markup(s); };
  var rich = function (s, n) { return L.rich(s, n); };
  var T = function (k, v) { return L.t(k, v); };

  L.STATIONS = [
    { id: 'intro' }, { id: 'vocab' }, { id: 'read' },
    { id: 'train' }, { id: 'listen' }, { id: 'wrap' }
  ];
  L.stationLabel = function (id) { return T('st.' + id); };

  L.views = {};

  /* ---------------- Startseite (bleibt deutsch: hier wird erst gewählt) ---------------- */
  function flagSvg(code) {
    if (code === 'fr') {
      return '<svg class="flag" viewBox="0 0 90 60" aria-hidden="true">' +
        '<rect width="30" height="60" fill="#0d2c8c"/><rect x="30" width="30" height="60" fill="#fff"/>' +
        '<rect x="60" width="30" height="60" fill="#d8283c"/></svg>';
    }
    return '<svg class="flag" viewBox="0 0 90 60" aria-hidden="true">' +
      '<rect width="90" height="60" fill="#c60b1e"/>' +
      '<rect y="15" width="90" height="30" fill="#ffc400"/></svg>';
  }

  L.views.home = function () {
    var prof = L.profile || { languages: {} };
    var wrap = h('div', { class: 'view wrap' });

    wrap.appendChild(h('div', { class: 'home-head' }, [
      h('div', { class: 'eyebrow', text: 'Heute ' + new Date().toLocaleDateString('de-CH', { day: 'numeric', month: 'long' }) }),
      h('h1', { html: 'Womit willst du <span class="grad">Zeit verlieren</span>?' }),
      h('p', {
        class: 'lead', style: 'margin-top:14px;max-width:52ch;margin-left:auto;margin-right:auto',
        text: 'Ab hier gilt nur noch die andere Sprache. Erklärungen, Aufgaben, Knöpfe – alles. Kein deutsches Wort mehr.'
      })
    ]));

    var picker = h('div', { class: 'picker' });
    ['es', 'fr'].forEach(function (lang) {
      var meta = prof.languages[lang] || {};
      var mine = L.catalog.filter(function (e) { return e.lang === lang; })
        .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
      var latest = mine[0];
      var doneCount = mine.filter(function (e) { return L.state.done[e.id]; }).length;
      var isFresh = latest && !L.state.done[latest.id];

      var card = h('button', { class: 'lang-card', 'data-l': lang, type: 'button' }, [
        h('span', { html: flagSvg(lang) }),
        h('h2', { text: meta.nativeName || (lang === 'es' ? 'Español' : 'Français') }),
        h('div', { class: 'native', text: meta.name || '' }),
        h('div', { class: 'meta' }, [
          h('span', { class: 'tag', text: (meta.level || '?') }),
          isFresh ? h('span', { class: 'tag hot', text: 'Neue Einheit' })
                  : h('span', { class: 'tag ghost', text: latest ? 'Nochmal machen' : 'Noch nichts da' }),
          doneCount ? h('span', { class: 'tag', text: doneCount + '× erledigt' }) : null
        ]),
        h('div', { class: 'cta' }, [
          h('span', { text: latest ? (latest.title || 'Loslegen') : 'Warten auf Claude' }),
          h('span', { class: 'arrow', text: '→' })
        ])
      ]);
      card.addEventListener('mouseenter', function () { document.body.dataset.lang = lang; });
      card.addEventListener('click', function () {
        if (!latest) { L.toast('Für diese Sprache liegt noch keine Einheit bereit.'); return; }
        L.fx.tap();
        L.go('#/lektion/' + latest.id);
      });
      picker.appendChild(card);
    });
    wrap.appendChild(picker);

    var older = L.catalog.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (older.length > 2) {
      wrap.appendChild(h('div', { class: 'card', style: 'margin-top:26px' }, [
        h('h3', { text: 'Frühere Einheiten' }),
        h('div', { class: 'stack', style: 'gap:2px;margin-top:10px' },
          older.slice(2).map(function (e) {
            return h('button', { class: 'menu-item', type: 'button', onclick: function () { L.go('#/lektion/' + e.id); } }, [
              h('span', { class: 'ic', text: e.lang === 'es' ? '🇪🇸' : '🇫🇷' }),
              h('span', {}, [
                h('div', { text: e.title }),
                h('div', { class: 'muted', style: 'font-size:12px', text: L.fmtDate(e.date, 'de') + (L.state.done[e.id] ? ' · erledigt' : '') })
              ])
            ]);
          }))
      ]));
    }

    var xp = L.state.xp;
    wrap.appendChild(h('p', {
      class: 'muted', style: 'text-align:center;margin-top:30px',
      text: xp ? ('Bisher ' + xp + ' XP' + (L.state.streakDays > 1 ? ' · ' + L.state.streakDays + ' Tage in Folge' : ''))
               : 'Noch keine XP. Das ändern wir gleich.'
    }));
    return wrap;
  };

  /* ---------------- Station 1: Einstieg ---------------- */
  L.views.intro = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    v.appendChild(h('div', {}, [
      h('div', { class: 'eyebrow', text: lesson.level + ' · ' + L.fmtDate(lesson.date, lesson.lang) }),
      h('h1', { text: lesson.title }),
      h('p', { class: 'lead', style: 'margin-top:14px', text: lesson.subtitle || '' })
    ]));

    if (lesson.intro && lesson.intro.hook) {
      v.appendChild(h('div', { class: 'card' }, [
        h('div', { class: 'task-kind', text: T('intro.hook') }),
        h('div', { class: 'prose', style: 'margin-top:9px', html: rich(lesson.intro.hook, 15.5) })
      ]));
    }

    (lesson.intro.grammar || []).forEach(function (g) {
      var body = h('div', { class: 'gbox-body' });
      if (g.explain) body.appendChild(h('div', { class: 'prose', html: rich(g.explain) }));

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
          r.forEach(function (c) { tr2.appendChild(h('td', { html: markup(c) })); });
          tb.appendChild(tr2);
        });
        t.appendChild(tb);
        body.appendChild(h('div', { class: 'scroll-x' }, [t]));
      }

      (g.examples || []).forEach(function (ex) {
        body.appendChild(h('div', { class: 'ex-line' }, [
          h('div', { class: 'src', html: markup(ex.src) }),
          ex.note ? h('div', { class: 'note', html: '→ ' + markup(ex.note) }) : null
        ]));
      });

      (g.pitfalls || []).forEach(function (p) {
        body.appendChild(h('div', { class: 'pitfall' }, [
          h('div', { class: 'ic', text: '⚠' }),
          h('div', {}, [h('p', { html: markup(p) })])
        ]));
      });

      v.appendChild(h('div', { class: 'gbox' }, [
        h('div', { class: 'gbox-head' }, [
          h('h3', { text: g.name }),
          g.why ? h('div', { class: 'why', html: markup(g.why) }) : null
        ]),
        body
      ]));
    });
    return v;
  };

  /* ---------------- Station 2: Wörter ---------------- */
  L.views.vocab = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var words = (lesson.intro && lesson.intro.vocab) || [];
    var opened = 0;

    v.appendChild(h('div', {}, [
      h('div', { class: 'eyebrow', text: T('vocab.eyebrow', { n: words.length }) }),
      h('h2', { text: T('vocab.title') }),
      h('p', { class: 'lead', style: 'margin-top:12px', text: T('vocab.lead') })
    ]));

    var grid = h('div', { class: 'vocab-grid' });
    words.forEach(function (w) {
      var card = h('button', { class: 'vcard', type: 'button' }, [
        h('span', { class: 'hint', text: T('vocab.tap') }),
        h('div', { class: 'term', text: w.term }),
        w.pos ? h('div', { class: 'pos', text: w.pos }) : null,
        h('div', { class: 'de', html: markup(w.def) }),
        w.example ? h('div', { class: 'ex', html: markup(w.example) }) : null
      ]);
      card.addEventListener('click', function () {
        var on = card.classList.toggle('open');
        if (on) {
          opened++; L.fx.flip();
          if (opened === words.length) { L.combo(T('vocab.all')); L.sparks(card, 16); }
        }
      });
      grid.appendChild(card);
    });
    v.appendChild(grid);
    return v;
  };

  /* ---------------- Station 3: Lesen ---------------- */
  function splitSentences(text) {
    var parts = text.match(/[^.!?…]+[.!?…]+["»]?|[^.!?…]+$/g) || [text];
    return parts.map(function (s) { return s.trim(); }).filter(Boolean);
  }

  L.sentencesOf = function (lesson) {
    var out = [];
    (lesson.reading.paragraphs || []).forEach(function (p, pi) {
      splitSentences(p.text).forEach(function (s, si) { out.push({ text: s, p: pi, s: si }); });
    });
    return out;
  };

  function glossed(text, glossary) {
    var html = esc(text);
    (glossary || []).forEach(function (g) {
      var term = g.term;
      var idx = html.toLowerCase().indexOf(esc(term).toLowerCase());
      if (idx === -1) return;
      var found = html.substr(idx, term.length);
      html = html.slice(0, idx) +
        '<span class="gl">' + found + '<span class="tip">' + esc(g.def) + '</span></span>' +
        html.slice(idx + term.length);
    });
    return html;
  }

  L.views.read = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var r = lesson.reading;
    var words = (r.paragraphs || []).reduce(function (n, p) { return n + p.text.split(/\s+/).length; }, 0);

    v.appendChild(h('div', {}, [
      h('div', { class: 'eyebrow', text: T('read.eyebrow', { n: Math.max(2, Math.round(words / 90)) }) }),
      h('h2', { text: T('read.title') }),
      h('p', { class: 'lead', style: 'margin-top:12px', text: T('read.lead') })
    ]));

    var paper = h('div', { class: 'paper' });
    paper.style.setProperty('--read-size', L.state.settings.readSize + 'px');

    var tools = h('div', { class: 'paper-tools' });
    var hasSimple = (r.paragraphs || []).some(function (p) { return p.simple; });
    if (hasSimple) {
      var tSimple = h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', text: T('read.simple') });
      tSimple.addEventListener('click', function () {
        var on = paper.classList.toggle('show-trans');
        tSimple.setAttribute('aria-pressed', on ? 'true' : 'false');
        L.fx.tap();
      });
      tools.appendChild(tSimple);
    }
    var tSmall = h('button', { class: 'chip', type: 'button', text: 'A−' });
    tSmall.addEventListener('click', function () {
      L.state.settings.readSize = Math.max(15, L.state.settings.readSize - 2);
      paper.style.setProperty('--read-size', L.state.settings.readSize + 'px'); L.save();
    });
    var tBig = h('button', { class: 'chip', type: 'button', text: 'A+' });
    tBig.addEventListener('click', function () {
      L.state.settings.readSize = Math.min(24, L.state.settings.readSize + 2);
      paper.style.setProperty('--read-size', L.state.settings.readSize + 'px'); L.save();
    });
    tools.appendChild(tSmall); tools.appendChild(tBig);
    paper.appendChild(tools);

    paper.appendChild(h('h2', { text: r.title }));
    paper.appendChild(h('div', { class: 'byline', text: [r.kicker, r.source && r.source.note].filter(Boolean).join(' · ') }));

    (r.paragraphs || []).forEach(function (p) {
      paper.appendChild(h('p', { html: glossed(p.text, r.glossary) }));
      if (p.simple) paper.appendChild(h('div', { class: 'trans', text: p.simple }));
    });

    paper.addEventListener('click', function (e) {
      var g = e.target.closest && e.target.closest('.gl');
      if (!g) return;
      paper.querySelectorAll('.gl.on').forEach(function (o) { if (o !== g) o.classList.remove('on'); });
      g.classList.toggle('on');
    });

    v.appendChild(paper);
    if (r.source && r.source.url) {
      v.appendChild(h('p', { class: 'muted', style: 'text-align:center' }, [
        h('a', { href: r.source.url, target: '_blank', rel: 'noopener', style: 'color:var(--a1)', text: T('read.source') })
      ]));
    }
    return v;
  };

  /* ---------------- Station 4: Training ---------------- */
  L.views.train = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var tasks = lesson.tasks || [];
    var S = L.session;
    var i = S.taskIndex || 0;

    if (i >= tasks.length) { v.appendChild(trainSummary(lesson)); return v; }

    var strip = h('div', { class: 'task-progress' });
    tasks.forEach(function (_, n) {
      var res = S.results[n];
      strip.appendChild(h('i', { class: res ? (res.correct ? 'done' : 'miss') : (n === i ? 'now' : '') }));
    });

    var task = tasks[i];
    var host = h('div', { class: 'task-shell' });
    host.appendChild(strip);
    host.appendChild(h('div', { class: 'task-head' }, [
      h('div', { class: 'task-num', text: String(i + 1) }),
      h('div', { style: 'flex:1' }, [
        h('div', { class: 'task-kind', text: T('k.' + task.type) }),
        h('div', { class: 'task-q', html: markup(task.prompt) })
      ])
    ]));

    var slot = h('div');
    host.appendChild(slot);
    host.appendChild(lookupText(lesson));

    var ctx = {
      lang: lesson.lang,
      sentences: L.sentencesOf(lesson),
      answered: function (res) {
        res.type = task.type;
        res.prompt = task.prompt;
        res.grammar = task.grammar || null;
        S.results[i] = res;
        if (res.correct) {
          S.streak = (S.streak || 0) + 1;
          L.addXp(10 + Math.min(S.streak, 5) * 2);
          L.fx.right(S.streak);
          if (S.streak >= 3) L.combo(S.streak + '×');
          L.sparks(slot, 10 + S.streak);
        } else {
          S.streak = 0;
          if (!res.freeform) L.fx.wrong();
        }
        L.persistProgress();
        var next = h('button', {
          class: 'btn btn-primary btn-block', type: 'button',
          text: i + 1 < tasks.length ? T('train.next') : T('train.finish')
        });
        next.addEventListener('click', function () {
          S.taskIndex = i + 1; L.persistProgress(); L.render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        host.appendChild(h('div', { style: 'margin-top:6px' }, [next]));
        next.focus();
      }
    };

    var engine = L.engines[task.type];
    if (!engine) slot.appendChild(h('p', { class: 'muted', text: 'Unbekannter Aufgabentyp: ' + task.type }));
    else slot.appendChild(engine(task, ctx));

    v.appendChild(host);
    return v;
  };

  function lookupText(lesson) {
    var open = false;
    var body = h('div', { style: 'display:none' });
    var btn = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', text: T('train.lookup') });
    btn.addEventListener('click', function () {
      open = !open;
      if (open && !body.childNodes.length) {
        var paper = h('div', { class: 'paper', style: 'padding:24px;margin-top:12px' });
        paper.style.setProperty('--read-size', '16px');
        paper.appendChild(h('h3', { style: 'color:var(--paper-ink)', text: lesson.reading.title }));
        (lesson.reading.paragraphs || []).forEach(function (p) {
          paper.appendChild(h('p', { html: glossed(p.text, lesson.reading.glossary) }));
        });
        paper.addEventListener('click', function (e) {
          var g = e.target.closest && e.target.closest('.gl');
          if (g) g.classList.toggle('on');
        });
        body.appendChild(paper);
      }
      body.style.display = open ? '' : 'none';
      btn.textContent = open ? T('train.lookupClose') : T('train.lookup');
      L.fx.tap();
    });
    return h('div', { style: 'margin-top:10px' }, [h('div', { class: 'row' }, [btn]), body]);
  }

  function trainSummary(lesson) {
    var S = L.session;
    var scored = S.results.filter(function (r) { return r && !r.freeform; });
    var right = scored.filter(function (r) { return r.correct; }).length;
    var pct = scored.length ? Math.round(right / scored.length * 100) : 100;
    var box = h('div', { class: 'stack-lg' });

    box.appendChild(h('div', { style: 'text-align:center' }, [
      ring(pct),
      h('h2', { style: 'margin-top:10px', text: pct >= 85 ? T('sum.great') : pct >= 60 ? T('sum.good') : T('sum.ok') }),
      h('p', { class: 'lead', style: 'margin-top:8px', text: T('sum.count', { r: right, t: scored.length }) })
    ]));

    var wrong = S.results.filter(function (r) { return r && !r.correct && !r.freeform; });
    if (wrong.length) {
      box.appendChild(h('div', { class: 'stack' }, [h('h3', { text: T('sum.review') })].concat(wrong.map(mistakeCard))));
    } else {
      box.appendChild(h('div', { class: 'card', style: 'text-align:center' }, [h('p', { text: T('sum.perfect') })]));
    }
    return box;
  }

  function mistakeCard(r) {
    return h('div', { class: 'mistake' }, [
      h('div', { class: 'q', html: markup(r.prompt) }),
      h('div', { class: 'line' }, [
        h('span', { class: 'lbl', text: T('m.you') }),
        h('span', { class: 'yours', text: r.yours || '—' })
      ]),
      h('div', { class: 'line' }, [
        h('span', { class: 'lbl', text: T('m.right') }),
        h('span', { class: 'right', text: r.right || '—' })
      ]),
      r.explain ? h('div', { class: 'exp', html: markup(r.explain) }) : null
    ]);
  }
  L.mistakeCard = mistakeCard;

  function ring(pct) {
    var R = 58, C = 2 * Math.PI * R;
    var svg = '<svg width="138" height="138" viewBox="0 0 138 138">' +
      '<circle cx="69" cy="69" r="' + R + '" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="9"/>' +
      '<circle cx="69" cy="69" r="' + R + '" fill="none" stroke="url(#gr)" stroke-width="9" stroke-linecap="round" ' +
      'stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pct / 100)).toFixed(1) + '"/>' +
      '<defs><linearGradient id="gr" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="var(--a1)"/><stop offset="100%" stop-color="var(--a2)"/>' +
      '</linearGradient></defs></svg>';
    return h('div', { class: 'score-ring' }, [h('div', { html: svg }), h('div', { class: 'val', html: pct + '<small>%</small>' })]);
  }
  L.ring = ring;

})(window.LEKTION);

/* Stationen 5 & 6: Hören und Bilanz. */
(function (L) {
  'use strict';
  var h = L.h, esc = L.esc;
  var markup = function (s) { return L.markup(s); };
  var T = function (k, v) { return L.t(k, v); };

  /* ---------------- Station 5: Hören ---------------- */
  L.views.listen = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var li = lesson.listening || {};
    var S = L.session;
    S.listening = S.listening || { notes: {}, passes: {}, selfRating: null, episode: null, sourceIdx: 0 };

    var sources = [li.source].concat(li.alternatives || []).filter(Boolean);

    v.appendChild(h('div', {}, [
      h('div', { class: 'eyebrow', text: T('l.eyebrow') }),
      h('h2', { text: li.headline || T('l.head') }),
      h('p', { class: 'lead', style: 'margin-top:12px', text: li.intro || T('l.intro') })
    ]));

    /* Quellenkarte mit eingebautem Spieler */
    var card = h('div', { class: 'source-card' });
    var head = h('div', { class: 'sc-head' });
    var icon = h('div', { class: 'sc-icon' });
    var info = h('div', { style: 'flex:1' });
    head.appendChild(icon); head.appendChild(info);
    card.appendChild(head);
    var playerSlot = h('div');
    card.appendChild(playerSlot);
    var pickNote = h('div');
    card.appendChild(pickNote);

    function showSource(n) {
      var src = sources[n];
      S.listening.sourceIdx = n;
      icon.textContent = src.icon || '🎧';
      info.innerHTML = '';
      info.appendChild(h('h3', { text: src.name }));
      if (src.what) info.appendChild(h('p', { style: 'font-size:13.5px;margin-top:5px', text: src.what }));
      var meta = h('div', { class: 'sc-meta' });
      if (src.kind) meta.appendChild(h('span', { class: 'tag', text: src.kind }));
      if (src.level) meta.appendChild(h('span', { class: 'tag', text: src.level }));
      if (src.transcriptUrl) {
        meta.appendChild(h('a', { class: 'tag link', href: src.transcriptUrl, target: '_blank', rel: 'noopener', text: T('l.transcript') + ' ↗' }));
      }
      info.appendChild(meta);

      playerSlot.innerHTML = '';
      playerSlot.appendChild(L.player(src, lesson.lang, function (ep) {
        S.listening.episode = { titel: ep.title, datum: ep.date, quelle: src.name, url: ep.url };
        L.persistProgress();
      }));

      pickNote.innerHTML = '';
      pickNote.appendChild(h('div', { class: 'alts' }, [
        h('div', { class: 'muted', style: 'line-height:1.6', html: '📌 ' + esc(src.pick || T('a.hearNow')) })
      ]));
      L.persistProgress();
    }

    /* Umschalter auf die Ausweichquellen */
    if (sources.length > 1) {
      var bar = h('div', { class: 'src-switch' });
      sources.forEach(function (src, n) {
        var b = h('button', { class: 'src-chip', type: 'button', 'aria-pressed': n === 0 ? 'true' : 'false' }, [
          h('span', { text: src.icon || '🎧' }),
          h('span', {}, [
            h('div', { class: 'sc-n', text: src.name }),
            src.level ? h('div', { class: 'sc-l', text: src.level }) : null
          ])
        ]);
        b.addEventListener('click', function () {
          bar.querySelectorAll('.src-chip').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          showSource(n); L.fx.tap();
        });
        bar.appendChild(b);
      });
      card.appendChild(h('div', { class: 'alts' }, [
        h('div', { class: 'task-kind', style: 'margin-bottom:9px', text: T('l.alts') }),
        bar
      ]));
    }

    v.appendChild(card);
    showSource(Math.min(S.listening.sourceIdx || 0, sources.length - 1));

    /* Vorentlastung */
    if (li.pretask && li.pretask.length) {
      var pre = h('div', { class: 'card' }, [
        h('h3', { text: T('l.pre') }),
        h('p', { class: 'muted', style: 'margin-top:6px', text: T('l.preLead') })
      ]);
      var g = h('div', { class: 'vocab-grid', style: 'margin-top:14px' });
      li.pretask.forEach(function (w) {
        var c = h('button', { class: 'vcard', type: 'button' }, [
          h('span', { class: 'hint', text: T('vocab.tap') }),
          h('div', { class: 'term', text: w.term }),
          h('div', { class: 'de', html: markup(w.def) })
        ]);
        c.addEventListener('click', function () { c.classList.toggle('open'); L.fx.flip(); });
        g.appendChild(c);
      });
      pre.appendChild(g);
      v.appendChild(pre);
    }

    /* Drei Durchgänge */
    var protocol = li.protocol || [
      { title: T('l.p1t'), how: T('l.p1h'), task: T('l.p1x'), placeholder: T('l.p1p') },
      { title: T('l.p2t'), how: T('l.p2h'), task: T('l.p2x'), placeholder: T('l.p2p') },
      { title: T('l.p3t'), how: T('l.p3h'), task: T('l.p3x'), placeholder: T('l.p3p') }
    ];
    var block = h('div', { class: 'stack' });
    block.appendChild(h('h3', { text: T('l.proto') }));
    protocol.forEach(function (p, idx) {
      var pane = h('div', { class: 'pass' + (idx === 0 ? ' active' : '') + (S.listening.passes[idx] ? ' done' : '') });
      var head2 = h('button', { class: 'pass-head', type: 'button' }, [
        h('div', { class: 'pass-n', text: S.listening.passes[idx] ? '✓' : String(idx + 1) }),
        h('div', { style: 'flex:1' }, [
          h('div', { class: 't', text: p.title }),
          h('div', { class: 's', text: p.how })
        ])
      ]);
      head2.addEventListener('click', function () {
        block.querySelectorAll('.pass').forEach(function (o) { if (o !== pane) o.classList.remove('active'); });
        pane.classList.toggle('active'); L.fx.tap();
      });
      var body = h('div', { class: 'pass-body' });
      body.appendChild(h('p', { style: 'font-size:14px', text: p.task }));
      var ta = h('textarea', { class: 'field', placeholder: p.placeholder || '', style: 'min-height:90px' });
      ta.value = S.listening.notes[idx] || '';
      ta.addEventListener('input', function () { S.listening.notes[idx] = ta.value; L.persistProgress(); });
      body.appendChild(ta);
      var ok = h('button', { class: 'btn btn-sm', type: 'button', text: T('l.passDone') });
      ok.addEventListener('click', function () {
        S.listening.passes[idx] = true;
        pane.classList.add('done');
        pane.querySelector('.pass-n').textContent = '✓';
        L.addXp(15); L.sparks(ok, 12); L.fx.right(idx + 1);
        L.persistProgress();
        var nxt = block.querySelectorAll('.pass')[idx + 1];
        if (nxt) { pane.classList.remove('active'); nxt.classList.add('active'); }
      });
      body.appendChild(h('div', { class: 'row' }, [ok]));
      pane.appendChild(head2); pane.appendChild(body);
      block.appendChild(pane);
    });
    v.appendChild(block);

    /* Selbsteinschätzung */
    var self = h('div', { class: 'card' }, [
      h('h3', { text: T('l.self') }),
      h('p', { class: 'muted', style: 'margin-top:6px', text: T('l.selfLead') })
    ]);
    var scale = h('div', { class: 'scale', style: 'margin-top:14px' });
    ['😵', '🙁', '🙂', '😄', '🤩'].forEach(function (e, i) {
      var b = h('button', { type: 'button', text: e, 'aria-label': (i + 1) + '/5',
        'aria-pressed': S.listening.selfRating === i + 1 ? 'true' : 'false' });
      b.addEventListener('click', function () {
        scale.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        S.listening.selfRating = i + 1; L.fx.tap(); L.persistProgress();
      });
      scale.appendChild(b);
    });
    self.appendChild(scale);
    self.appendChild(h('div', { class: 'scale-legend' }, [
      h('span', { text: T('l.low') }), h('span', { text: T('l.high') })
    ]));
    v.appendChild(self);
    return v;
  };

  /* ---------------- Station 6: Bilanz ---------------- */
  function survey() {
    return [
      { id: 'difficulty', type: 'scale', q: T('q.diff'), low: T('q.diffLow'), high: T('q.diffHigh'),
        emojis: ['🥱', '🙂', '👌', '😅', '🥵'] },
      { id: 'fun', type: 'scale', q: T('q.fun'), low: T('q.funLow'), high: T('q.funHigh'),
        emojis: ['😐', '🙂', '😊', '😃', '🔥'] },
      { id: 'more', type: 'choice', q: T('q.more'), options: [
        { id: 'deepen', label: T('q.more.deepen') },
        { id: 'same', label: T('q.more.same') },
        { id: 'new', label: T('q.more.new') }] },
      { id: 'weakest', type: 'choice', q: T('q.weak'), options: [
        { id: 'grammar', label: T('q.weak.grammar') },
        { id: 'vocab', label: T('q.weak.vocab') },
        { id: 'reading', label: T('q.weak.reading') },
        { id: 'listening', label: T('q.weak.listening') },
        { id: 'none', label: T('q.weak.none') }] },
      { id: 'length', type: 'choice', q: T('q.len'), options: [
        { id: 'short', label: T('q.len.short') },
        { id: 'ok', label: T('q.len.ok') },
        { id: 'long', label: T('q.len.long') }] },
      { id: 'wish', type: 'text', q: T('q.wish'), placeholder: T('q.wishP') }
    ];
  }

  L.views.wrap = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var S = L.session;
    S.survey = S.survey || {};
    var questions = survey();

    var scored = S.results.filter(function (r) { return r && !r.freeform; });
    var right = scored.filter(function (r) { return r.correct; }).length;
    var pct = scored.length ? Math.round(right / scored.length * 100) : 0;

    v.appendChild(h('div', { style: 'text-align:center' }, [
      h('div', { class: 'eyebrow', style: 'justify-content:center', text: T('e.done') }),
      L.ring(pct),
      h('h1', { style: 'margin-top:12px', text: praise(pct) }),
      h('p', { class: 'lead', style: 'margin-top:10px', text: lesson.outro || T('e.outro') })
    ]));

    v.appendChild(h('div', { class: 'stat-grid' }, [
      stat(right + '/' + scored.length, T('e.sRight')),
      stat(String(L.state.xp), T('e.sXp')),
      stat(Object.keys((S.listening && S.listening.passes) || {}).length + '/3', T('e.sPass')),
      stat(String(minutes()), T('e.sMin'))
    ]));

    var form = h('div', { class: 'card' });
    questions.forEach(function (q) {
      var blk = h('div', { class: 'q-block' }, [h('div', { class: 'q-title', text: q.q })]);
      if (q.type === 'scale') {
        var sc = h('div', { class: 'scale' });
        q.emojis.forEach(function (e, i) {
          var b = h('button', { type: 'button', text: e, 'aria-pressed': S.survey[q.id] === i + 1 ? 'true' : 'false' });
          b.addEventListener('click', function () {
            sc.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            S.survey[q.id] = i + 1; L.fx.tap(); L.persistProgress(); refresh();
          });
          sc.appendChild(b);
        });
        blk.appendChild(sc);
        blk.appendChild(h('div', { class: 'scale-legend' }, [h('span', { text: q.low }), h('span', { text: q.high })]));
      } else if (q.type === 'choice') {
        var ch = h('div', { class: 'choices' });
        q.options.forEach(function (o) {
          var b = h('button', { class: 'choice', type: 'button', text: o.label,
            'aria-pressed': S.survey[q.id] === o.id ? 'true' : 'false' });
          b.addEventListener('click', function () {
            ch.querySelectorAll('.choice').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            S.survey[q.id] = o.id; L.fx.tap(); L.persistProgress(); refresh();
          });
          ch.appendChild(b);
        });
        blk.appendChild(ch);
      } else {
        var ta = h('textarea', { class: 'field', placeholder: q.placeholder || '', style: 'min-height:80px' });
        ta.value = S.survey[q.id] || '';
        ta.addEventListener('input', function () { S.survey[q.id] = ta.value; L.persistProgress(); refresh(); });
        blk.appendChild(ta);
      }
      form.appendChild(blk);
    });
    v.appendChild(form);

    v.appendChild(diagnose(lesson));

    var wrong = S.results.filter(function (r) { return r && !r.correct && !r.freeform; });
    if (wrong.length) {
      v.appendChild(h('div', { class: 'stack' }, [h('h3', { text: T('e.mistakes') })].concat(wrong.map(L.mistakeCard))));
    }

    var reportCard = h('div', { class: 'card' });
    reportCard.appendChild(h('h3', { text: T('e.reportT') }));
    reportCard.appendChild(h('p', { style: 'margin-top:8px;font-size:14.5px', text: T('e.reportX') }));
    var pre = h('div', { class: 'report-box' });
    reportCard.appendChild(h('div', { style: 'margin-top:14px' }, [pre]));
    var copyBtn = h('button', { class: 'btn btn-primary', type: 'button', text: T('e.copy') });
    var dlBtn = h('button', { class: 'btn', type: 'button', text: T('e.dl') });
    reportCard.appendChild(h('div', { class: 'row', style: 'margin-top:12px' }, [githubButton(lesson), copyBtn, dlBtn]));
    v.appendChild(reportCard);

    function refresh() { pre.textContent = L.buildReport(lesson); }
    refresh();

    copyBtn.addEventListener('click', function () {
      var txt = L.buildReport(lesson);
      var done = function () { L.toast(T('e.copied')); L.sparks(copyBtn, 14); L.fx.done(); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt, done); });
      } else fallbackCopy(txt, done);
      finishLesson(lesson);
    });
    dlBtn.addEventListener('click', function () {
      var blob = new Blob([L.buildReport(lesson)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'bericht-' + lesson.id + '.json';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      finishLesson(lesson);
    });

    var home = h('button', { class: 'btn btn-ghost btn-block', type: 'button', text: T('e.home') });
    home.addEventListener('click', function () { finishLesson(lesson); L.go('#/'); });
    v.appendChild(home);
    return v;
  };

  /* ---------------- Niveau-Diagnose ----------------
     Nicht die Punktzahl, sondern: was kann er, was noch nicht.
     Wird auch in den Bericht geschrieben und landet so im Lernstand. */
  var SKILLS = ['verstehen', 'erkennen', 'produzieren', 'wortschatz'];
  function skillOf(task, res) {
    if (task && task.skill) return task.skill;
    return { evidence: 'verstehen', choice: 'erkennen', pairs: 'wortschatz',
             transform: 'produzieren', forge: 'produzieren', write: 'produzieren' }[res.type] || 'erkennen';
  }

  L.skillScores = function (lesson) {
    var S = L.session, out = {};
    S.results.forEach(function (r, i) {
      if (!r) return;
      var sk = skillOf((lesson.tasks || [])[i], r);
      var b = out[sk] || (out[sk] = { right: 0, total: 0 });
      b.total++;
      if (r.correct) b.right++;
      else if (r.freeform) b.total--;     // Freitext wird nicht gegen ihn gezählt
    });
    return out;
  };

  function verdictFor(q) {
    return q >= 0.8 ? { t: T('d.solid'), c: 'ok' } : q >= 0.5 ? { t: T('d.mixed'), c: 'mid' } : { t: T('d.weak'), c: 'no' };
  }

  function diagnose(lesson) {
    var S = L.session;
    var scores = L.skillScores(lesson);
    var box = h('div', { class: 'card diag' });
    box.appendChild(h('h3', { text: T('d.title') }));
    box.appendChild(h('p', { class: 'muted', style: 'margin-top:6px', text: T('d.lead') }));

    var rows = h('div', { class: 'diag-rows' });
    SKILLS.forEach(function (sk) {
      var b = scores[sk];
      var q = b && b.total ? b.right / b.total : null;
      var vd = q === null ? { t: T('d.none'), c: 'na' } : verdictFor(q);
      rows.appendChild(h('div', { class: 'diag-row ' + vd.c }, [
        h('div', { class: 'dr-name', text: T('d.' + sk) }),
        h('div', { class: 'dr-bar' }, [h('i', { style: 'width:' + (q === null ? 0 : Math.round(q * 100)) + '%' })]),
        h('div', { class: 'dr-v', text: vd.t + (q === null ? '' : '  ' + b.right + '/' + b.total) })
      ]));
    });

    var lr = S.listening && S.listening.selfRating;
    if (lr) {
      rows.appendChild(h('div', { class: 'diag-row ' + (lr >= 4 ? 'ok' : lr >= 3 ? 'mid' : 'no') }, [
        h('div', { class: 'dr-name', text: T('st.listen') }),
        h('div', { class: 'dr-bar' }, [h('i', { style: 'width:' + (lr / 5 * 100) + '%' })]),
        h('div', { class: 'dr-v', text: lr + '/5' })
      ]));
    }
    box.appendChild(rows);

    /* Pro Grammatikthema, mit Namen aus der Lektion */
    var byG = {};
    S.results.forEach(function (r) {
      if (!r || !r.grammar || r.freeform) return;
      var g = byG[r.grammar] || (byG[r.grammar] = { right: 0, total: 0 });
      g.total++; if (r.correct) g.right++;
    });
    var names = {};
    (lesson.intro.grammar || []).forEach(function (g) { names[g.id] = g.name; });
    var keys = Object.keys(byG);
    if (keys.length) {
      var list = h('div', { class: 'stack', style: 'gap:8px;margin-top:18px' });
      list.appendChild(h('div', { class: 'task-kind', text: T('d.next') }));
      keys.forEach(function (id) {
        var g = byG[id], q = g.right / g.total, vd = verdictFor(q);
        list.appendChild(h('div', { class: 'diag-item ' + vd.c }, [
          h('span', { class: 'di-n', text: names[id] || id }),
          h('span', { class: 'di-v', text: vd.t }),
          h('span', { class: 'di-q', text: g.right + '/' + g.total })
        ]));
      });
      box.appendChild(list);
    }
    return box;
  }

  /* ---------------- Bericht nach GitHub ---------------- */
  function githubButton(lesson) {
    var repo = (L.profile && L.profile.github) || '';
    var btn = h('button', { class: 'btn', type: 'button', text: T('g.save') });
    btn.addEventListener('click', function () {
      if (!repo) { L.toast(T('g.no'), 3600); return; }
      var body = '```json\n' + L.buildReport(lesson) + '\n```';
      var url = 'https://github.com/' + repo + '/issues/new' +
        '?title=' + encodeURIComponent('Lernbericht ' + lesson.id) +
        '&body=' + encodeURIComponent(body);
      if (url.length > 7500) {
        url = 'https://github.com/' + repo + '/issues/new' +
          '?title=' + encodeURIComponent('Lernbericht ' + lesson.id) +
          '&body=' + encodeURIComponent('```json\n' + L.buildReport(lesson, true) + '\n```');
      }
      window.open(url, '_blank', 'noopener');
      L.toast(T('g.saved'), 4200);
      finishLesson(lesson);
    });
    return btn;
  }

  function fallbackCopy(txt, done) {
    var ta = document.createElement('textarea');
    ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); }
    catch (e) { L.toast(T('e.copyFail'), 3600); }
    ta.remove();
  }

  function finishLesson(lesson) {
    var S = L.session;
    if (L.state.done[lesson.id]) return;
    var scored = S.results.filter(function (r) { return r && !r.freeform; });
    L.state.done[lesson.id] = {
      at: new Date().toISOString(),
      right: scored.filter(function (r) { return r.correct; }).length,
      total: scored.length, minutes: minutes()
    };
    L.addXp(40); L.save();
  }

  function minutes() {
    var S = L.session;
    return Math.max(1, Math.round((Date.now() - (S.startedAt || Date.now())) / 60000));
  }
  function stat(n, l) { return h('div', { class: 'stat' }, [h('div', { class: 'n', text: n }), h('div', { class: 'l', text: l })]); }
  function praise(p) { return p >= 90 ? T('e.p90') : p >= 70 ? T('e.p70') : p >= 45 ? T('e.p45') : T('e.p0'); }

  /* ---------------- Bericht ---------------- */
  L.buildReport = function (lesson, kurz) {
    var S = L.session;
    var scored = S.results.filter(function (r) { return r && !r.freeform; });
    var byGrammar = {};
    S.results.forEach(function (r) {
      if (!r || !r.grammar || r.freeform) return;
      var g = byGrammar[r.grammar] || (byGrammar[r.grammar] = { right: 0, total: 0 });
      g.total++; if (r.correct) g.right++;
    });
    var report = {
      bericht: 'lerneinheit', version: 2,
      lektion: lesson.id, sprache: lesson.lang, niveau: lesson.level,
      datum: new Date().toISOString().slice(0, 10), minuten: minutes(),
      ergebnis: { richtig: scored.filter(function (r) { return r.correct; }).length, gesamt: scored.length },
      grammatik: byGrammar,
      fehler: S.results.filter(function (r) { return r && !r.correct && !r.freeform; })
        .map(function (r) { return { typ: r.type, thema: r.grammar, meins: r.yours, richtig: r.right }; }),
      freitext: S.results.filter(function (r) { return r && r.freeform; }).map(function (r) { return r.yours; }),
      hoeren: {
        folge: (S.listening && S.listening.episode) || null,
        durchgaenge: Object.keys((S.listening && S.listening.passes) || {}).length,
        selbsteinschaetzung: (S.listening && S.listening.selfRating) || null,
        notizen: (S.listening && S.listening.notes) || {}
      },
      umfrage: S.survey || {},
      koennen: L.skillScores(lesson)
    };
    if (kurz) { delete report.freitext; report.hoeren.notizen = {}; }
    return 'LERNBERICHT ' + lesson.id + '\n' + JSON.stringify(report, null, 1);
  };

})(window.LEKTION);
