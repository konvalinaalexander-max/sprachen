/* Sprachen - die sechs Stationen einer Lerneinheit. */
(function (L) {
  'use strict';
  var h = L.h, esc = L.esc;

  L.STATIONS = [
    { id: 'intro',  label: 'Einstieg' },
    { id: 'vocab',  label: 'Wörter' },
    { id: 'read',   label: 'Lesen' },
    { id: 'train',  label: 'Training' },
    { id: 'listen', label: 'Hören' },
    { id: 'wrap',   label: 'Feedback' }
  ];

  L.views = {};

  /* ---------------- Startseite: zwei Flaggen ---------------- */
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

    var head = h('div', { class: 'home-head' }, [
      h('div', { class: 'eyebrow', text: 'Heute ' + new Date().toLocaleDateString('de-CH', { day: 'numeric', month: 'long' }) }),
      h('h1', { html: 'Womit willst du <span class="grad">Zeit verlieren</span>?' }),
      h('p', { class: 'lead', style: 'margin-top:14px;max-width:52ch;margin-left:auto;margin-right:auto',
        text: 'Eine Einheit dauert eine gute halbe Stunde: erst verstehen, dann lesen, dann spielen, zum Schluss echtes Hören.' })
    ]);
    wrap.appendChild(head);

    var picker = h('div', { class: 'picker' });
    ['es', 'fr'].forEach(function (lang) {
      var meta = prof.languages[lang] || {};
      var todays = L.catalog.filter(function (e) { return e.lang === lang; })
        .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
      var latest = todays[0];
      var doneCount = todays.filter(function (e) { return L.state.done[e.id]; }).length;
      var isFresh = latest && !L.state.done[latest.id];

      var card = h('button', { class: 'lang-card', 'data-l': lang, type: 'button' }, [
        h('span', { html: flagSvg(lang) }),
        h('h2', { text: meta.name || (lang === 'es' ? 'Spanisch' : 'Französisch') }),
        h('div', { class: 'native', text: meta.nativeName || '' }),
        h('div', { class: 'meta' }, [
          h('span', { class: 'tag', text: 'Niveau ' + (meta.level || '?') }),
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
        if (!latest) { L.toast('Für diese Sprache liegt noch keine Einheit bereit. Sag Claude Bescheid.'); return; }
        L.fx.tap();
        L.go('#/lektion/' + latest.id);
      });
      picker.appendChild(card);
    });
    wrap.appendChild(picker);

    // Archiv
    var older = L.catalog.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (older.length > 2) {
      var arch = h('div', { class: 'card', style: 'margin-top:26px' }, [
        h('h3', { text: 'Frühere Einheiten' }),
        h('div', { class: 'stack', style: 'gap:2px;margin-top:10px' },
          older.slice(2).map(function (e) {
            return h('button', { class: 'menu-item', type: 'button', onclick: function () { L.go('#/lektion/' + e.id); } }, [
              h('span', { class: 'ic', text: e.lang === 'es' ? '🇪🇸' : '🇫🇷' }),
              h('span', {}, [
                h('div', { text: e.title }),
                h('div', { class: 'muted', style: 'font-size:12px', text: L.fmtDate(e.date) + (L.state.done[e.id] ? ' · erledigt' : '') })
              ])
            ]);
          }))
      ]);
      wrap.appendChild(arch);
    }

    var xp = L.state.xp;
    wrap.appendChild(h('p', { class: 'muted', style: 'text-align:center;margin-top:30px',
      text: xp ? ('Bisher ' + xp + ' XP gesammelt' + (L.state.streakDays > 1 ? ' · ' + L.state.streakDays + ' Tage in Folge' : '')) : 'Noch keine XP. Das ändern wir gleich.' }));
    return wrap;
  };

  /* ---------------- Station 1: Einstieg + Grammatik ---------------- */
  L.views.intro = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    v.appendChild(h('div', {}, [
      h('div', { class: 'eyebrow', text: lesson.level + ' · ' + L.fmtDate(lesson.date) }),
      h('h1', { text: lesson.title }),
      h('p', { class: 'lead', style: 'margin-top:14px', text: lesson.subtitle || '' })
    ]));

    if (lesson.intro && lesson.intro.hook) {
      v.appendChild(h('div', { class: 'card' }, [
        h('div', { class: 'task-kind', text: 'Worum es heute geht' }),
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
          ex.de ? h('div', { class: 'trg', text: ex.de }) : null,
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

  var markup = L.markup, rich = L.rich;

  /* ---------------- Station 2: Wörter ---------------- */
  L.views.vocab = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var words = (lesson.intro && lesson.intro.vocab) || [];
    var opened = 0;

    v.appendChild(h('div', {}, [
      h('div', { class: 'eyebrow', text: 'Station 2 · ' + words.length + ' Wörter' }),
      h('h2', { text: 'Die Wörter, die gleich im Text auf dich warten' }),
      h('p', { class: 'lead', style: 'margin-top:12px',
        text: 'Erst raten, dann aufdecken. Was du selbst errätst, bleibt hängen - was du nur liest, nicht.' })
    ]));

    var grid = h('div', { class: 'vocab-grid' });
    words.forEach(function (w) {
      var card = h('button', { class: 'vcard', type: 'button' }, [
        h('span', { class: 'hint', text: 'tippen' }),
        h('div', { class: 'term', text: w.term }),
        w.pos ? h('div', { class: 'pos', text: w.pos }) : null,
        h('div', { class: 'de', text: w.de }),
        w.example ? h('div', { class: 'ex', html: markup(w.example) }) : null
      ]);
      card.addEventListener('click', function () {
        var on = card.classList.toggle('open');
        if (on) { opened++; L.fx.flip(); if (opened === words.length) { L.combo('Alle aufgedeckt'); L.sparks(card, 16); } }
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
        '<span class="gl">' + found + '<span class="tip">' + esc(g.de) + '</span></span>' +
        html.slice(idx + term.length);
    });
    return html;
  }

  L.views.read = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var r = lesson.reading;
    var words = (r.paragraphs || []).reduce(function (n, p) { return n + p.text.split(/\s+/).length; }, 0);

    v.appendChild(h('div', {}, [
      h('div', { class: 'eyebrow', text: 'Station 3 · ca. ' + Math.max(2, Math.round(words / 90)) + ' Min Lesezeit' }),
      h('h2', { text: 'Jetzt lesen - ohne Wörterbuch' }),
      h('p', { class: 'lead', style: 'margin-top:12px',
        text: 'Unterstrichene Wörter kannst du antippen. Alles andere: erraten. Du musst nicht jedes Wort verstehen, um den Text zu verstehen.' })
    ]));

    var paper = h('div', { class: 'paper' });
    paper.style.setProperty('--read-size', L.state.settings.readSize + 'px');

    var tools = h('div', { class: 'paper-tools' });
    var tTrans = h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', text: 'Übersetzung' });
    tTrans.addEventListener('click', function () {
      var on = paper.classList.toggle('show-trans');
      tTrans.setAttribute('aria-pressed', on ? 'true' : 'false');
      L.fx.tap();
    });
    var tBig = h('button', { class: 'chip', type: 'button', text: 'A+' });
    tBig.addEventListener('click', function () {
      L.state.settings.readSize = Math.min(24, L.state.settings.readSize + 2);
      paper.style.setProperty('--read-size', L.state.settings.readSize + 'px'); L.save();
    });
    var tSmall = h('button', { class: 'chip', type: 'button', text: 'A−' });
    tSmall.addEventListener('click', function () {
      L.state.settings.readSize = Math.max(15, L.state.settings.readSize - 2);
      paper.style.setProperty('--read-size', L.state.settings.readSize + 'px'); L.save();
    });
    tools.appendChild(tTrans); tools.appendChild(tSmall); tools.appendChild(tBig);
    paper.appendChild(tools);

    paper.appendChild(h('h2', { text: r.title }));
    paper.appendChild(h('div', { class: 'byline', text: (r.kicker || '') + (r.source && r.source.note ? ' · ' + r.source.note : '') }));

    (r.paragraphs || []).forEach(function (p) {
      paper.appendChild(h('p', { html: glossed(p.text, r.glossary) }));
      if (p.de) paper.appendChild(h('div', { class: 'trans', text: p.de }));
    });

    // Tippen auf Mobilgeräten zeigt die Glosse ebenfalls
    paper.addEventListener('click', function (e) {
      var g = e.target.closest && e.target.closest('.gl');
      if (!g) return;
      paper.querySelectorAll('.gl.on').forEach(function (o) { if (o !== g) o.classList.remove('on'); });
      g.classList.toggle('on');
    });

    v.appendChild(paper);
    if (r.source && r.source.url) {
      v.appendChild(h('p', { class: 'muted', style: 'text-align:center' }, [
        h('a', { href: r.source.url, target: '_blank', rel: 'noopener', style: 'color:var(--a1)', text: 'Originalquelle ansehen ↗' })
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

    var strip = h('div', { class: 'task-progress' });
    tasks.forEach(function (_, n) {
      var res = S.results[n];
      strip.appendChild(h('i', { class: res ? (res.correct ? 'done' : 'miss') : (n === i ? 'now' : '') }));
    });

    if (i >= tasks.length) {
      v.appendChild(trainSummary(lesson));
      return v;
    }

    var task = tasks[i];
    var host = h('div', { class: 'task-shell' });
    host.appendChild(strip);
    host.appendChild(h('div', { class: 'task-head' }, [
      h('div', { class: 'task-num', text: String(i + 1) }),
      h('div', { style: 'flex:1' }, [
        h('div', { class: 'task-kind', text: (task.kind || kindName(task.type)) }),
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
          var bonus = Math.min(S.streak, 5) * 2;
          L.addXp(10 + bonus);
          L.fx.right(S.streak);
          if (S.streak >= 3) L.combo(S.streak + '× in Folge');
          L.sparks(slot, 10 + S.streak);
        } else {
          S.streak = 0;
          if (!res.freeform) L.fx.wrong();
        }
        L.persistProgress();
        var next = h('button', { class: 'btn btn-primary btn-block', type: 'button',
          text: i + 1 < tasks.length ? 'Weiter' : 'Training abschliessen' });
        next.addEventListener('click', function () {
          S.taskIndex = i + 1;
          L.persistProgress();
          L.render();
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

  /* Aufklappbarer Blick zurück in den Lesetext – ohne die Station zu verlassen. */
  function lookupText(lesson) {
    var open = false;
    var body = h('div', { style: 'display:none' });
    var btn = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', text: '📄 Text nachschlagen' });
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
      btn.textContent = open ? '📄 Text zuklappen' : '📄 Text nachschlagen';
      L.fx.tap();
    });
    return h('div', { style: 'margin-top:10px' }, [h('div', { class: 'row' }, [btn]), body]);
  }

  function kindName(t) {
    return { choice: 'Blitzrunde', evidence: 'Textdetektiv', forge: 'Satzschmiede',
             transform: 'Verwandler', pairs: 'Paarjagd', write: 'Freischreiben' }[t] || 'Aufgabe';
  }

  function trainSummary(lesson) {
    var S = L.session;
    var scored = S.results.filter(function (r) { return r && !r.freeform; });
    var right = scored.filter(function (r) { return r.correct; }).length;
    var box = h('div', { class: 'stack-lg' });
    var pct = scored.length ? Math.round(right / scored.length * 100) : 100;

    box.appendChild(h('div', { style: 'text-align:center' }, [
      ring(pct),
      h('h2', { style: 'margin-top:10px', text: pct >= 85 ? 'Das sass.' : pct >= 60 ? 'Solide Runde.' : 'Alles Material zum Lernen.' }),
      h('p', { class: 'lead', style: 'margin-top:8px', text: right + ' von ' + scored.length + ' auf Anhieb richtig.' })
    ]));

    var wrong = S.results.filter(function (r) { return r && !r.correct && !r.freeform; });
    if (wrong.length) {
      box.appendChild(h('div', { class: 'stack' }, [
        h('h3', { text: 'Das schauen wir uns nochmal an' })
      ].concat(wrong.map(mistakeCard))));
    } else {
      box.appendChild(h('div', { class: 'card', style: 'text-align:center' }, [
        h('p', { text: 'Kein einziger Fehler. Beim nächsten Mal drehe ich auf.' })
      ]));
    }
    return box;
  }

  function mistakeCard(r) {
    return h('div', { class: 'mistake' }, [
      h('div', { class: 'q', html: markup(r.prompt) }),
      h('div', { class: 'line' }, [
        h('span', { class: 'lbl', text: 'Du' }),
        h('span', { class: 'yours', text: r.yours || '—' })
      ]),
      h('div', { class: 'line' }, [
        h('span', { class: 'lbl', text: 'Richtig' }),
        h('span', { class: 'right', text: r.right || '—' })
      ]),
      r.explain ? h('div', { class: 'exp', html: markup(r.explain) }) : null
    ]);
  }
  L.mistakeCard = mistakeCard;

  function ring(pct) {
    var R = 58, C = 2 * Math.PI * R;
    var off = C * (1 - pct / 100);
    var svg = '<svg width="138" height="138" viewBox="0 0 138 138">' +
      '<circle cx="69" cy="69" r="' + R + '" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="9"/>' +
      '<circle cx="69" cy="69" r="' + R + '" fill="none" stroke="url(#gr)" stroke-width="9" stroke-linecap="round" ' +
      'stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/>' +
      '<defs><linearGradient id="gr" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="var(--a1)"/><stop offset="100%" stop-color="var(--a2)"/>' +
      '</linearGradient></defs></svg>';
    return h('div', { class: 'score-ring' }, [
      h('div', { html: svg }),
      h('div', { class: 'val', html: pct + '<small>%</small>' })
    ]);
  }
  L.ring = ring;

})(window.LEKTION);

/* Stationen 5 & 6: Hören und Feedback. */
(function (L) {
  'use strict';
  var h = L.h, esc = L.esc;

  /* ---------------- Station 5: Hören (echte Quellen) ---------------- */
  L.views.listen = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var li = lesson.listening || {};
    var src = li.source || {};
    var S = L.session;
    S.listening = S.listening || { notes: {}, passes: {}, selfRating: null };

    v.appendChild(h('div', {}, [
      h('div', { class: 'eyebrow', text: 'Station 5 · echtes Material' }),
      h('h2', { text: li.headline || 'Jetzt ohne Stützräder' }),
      h('p', { class: 'lead', style: 'margin-top:12px',
        text: li.intro || 'Das hier ist nicht für Lernende gemacht. Genau darum ist es wertvoll. Du musst nicht alles verstehen - du musst durchkommen.' })
    ]));

    /* Quellenkarte */
    var card = h('div', { class: 'source-card' });
    card.appendChild(h('div', { class: 'sc-head' }, [
      h('div', { class: 'sc-icon', text: src.icon || '🎧' }),
      h('div', { style: 'flex:1' }, [
        h('h3', { text: src.name || 'Hörquelle' }),
        h('p', { style: 'font-size:13.5px;margin-top:5px', text: src.what || '' }),
        h('div', { class: 'sc-meta' }, [
          src.duration ? h('span', { class: 'tag', text: '⏱ ' + src.duration }) : null,
          src.kind ? h('span', { class: 'tag', text: src.kind }) : null,
          src.level ? h('span', { class: 'tag', text: src.level }) : null,
          src.transcript ? h('span', { class: 'tag hot', text: 'mit Transkript' }) : null
        ])
      ])
    ]));

    if (src.audioUrl) {
      var au = h('audio', { controls: 'controls', preload: 'none', src: src.audioUrl, style: 'width:100%;padding:0 22px 14px' });
      card.appendChild(au);
    }

    var actions = h('div', { class: 'sc-actions' });
    if (src.url) {
      actions.appendChild(h('a', { class: 'btn btn-primary', href: src.url, target: '_blank', rel: 'noopener',
        text: (src.cta || 'Folge öffnen') + ' ↗' }));
    }
    if (src.transcriptUrl) {
      actions.appendChild(h('a', { class: 'btn', href: src.transcriptUrl, target: '_blank', rel: 'noopener', text: 'Transkript ↗' }));
    }
    card.appendChild(actions);

    if (src.pick) {
      card.appendChild(h('div', { class: 'alts' }, [
        h('div', { class: 'muted', style: 'line-height:1.6', html: '📌 ' + esc(src.pick) })
      ]));
    }

    if (li.alternatives && li.alternatives.length) {
      var alts = h('div', { class: 'alts' });
      alts.appendChild(h('div', { class: 'task-kind', style: 'margin-bottom:6px', text: 'Falls das nicht passt' }));
      li.alternatives.forEach(function (a) {
        alts.appendChild(h('a', { class: 'alt-link', href: a.url, target: '_blank', rel: 'noopener' }, [
          h('span', {}, [
            h('div', { text: a.name }),
            h('div', { class: 'why', text: a.why || '' })
          ]),
          h('span', { class: 'go', text: '↗' })
        ]));
      });
      card.appendChild(alts);
    }
    v.appendChild(card);

    /* Vorentlastung */
    if (li.pretask && li.pretask.length) {
      var pre = h('div', { class: 'card' }, [
        h('h3', { text: 'Diese Wörter kommen mit ziemlicher Sicherheit vor' }),
        h('p', { class: 'muted', style: 'margin-top:6px', text: 'Kurz anschauen - dann hakt dein Ohr später nicht daran fest.' })
      ]);
      var g = h('div', { class: 'vocab-grid', style: 'margin-top:14px' });
      li.pretask.forEach(function (w) {
        var c = h('button', { class: 'vcard', type: 'button' }, [
          h('span', { class: 'hint', text: 'tippen' }),
          h('div', { class: 'term', text: w.term }),
          h('div', { class: 'de', text: w.de })
        ]);
        c.addEventListener('click', function () { c.classList.toggle('open'); L.fx.flip(); });
        g.appendChild(c);
      });
      pre.appendChild(g);
      v.appendChild(pre);
    }

    /* Drei Durchgänge */
    var protocol = li.protocol || defaultProtocol(lesson.lang);
    var block = h('div', { class: 'stack' });
    block.appendChild(h('h3', { text: 'Drei Durchgänge - mehr braucht es nicht' }));
    protocol.forEach(function (p, idx) {
      var pane = h('div', { class: 'pass' + (idx === 0 ? ' active' : '') + (S.listening.passes[idx] ? ' done' : '') });
      var head = h('button', { class: 'pass-head', type: 'button' }, [
        h('div', { class: 'pass-n', text: S.listening.passes[idx] ? '✓' : String(idx + 1) }),
        h('div', { style: 'flex:1' }, [
          h('div', { class: 't', text: p.title }),
          h('div', { class: 's', text: p.how })
        ])
      ]);
      head.addEventListener('click', function () {
        block.querySelectorAll('.pass').forEach(function (o) { if (o !== pane) o.classList.remove('active'); });
        pane.classList.toggle('active');
        L.fx.tap();
      });
      var body = h('div', { class: 'pass-body' });
      body.appendChild(h('p', { style: 'font-size:14px', text: p.task }));
      var ta = h('textarea', { class: 'field', placeholder: p.placeholder || 'Notiere in Stichworten …', style: 'min-height:90px' });
      ta.value = S.listening.notes[idx] || '';
      ta.addEventListener('input', function () { S.listening.notes[idx] = ta.value; L.persistProgress(); });
      body.appendChild(ta);
      var ok = h('button', { class: 'btn btn-sm', type: 'button', text: 'Durchgang erledigt' });
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
      pane.appendChild(head); pane.appendChild(body);
      block.appendChild(pane);
    });
    v.appendChild(block);

    /* Selbsteinschätzung */
    var self = h('div', { class: 'card' }, [
      h('h3', { text: 'Wie viel ist hängen geblieben?' }),
      h('p', { class: 'muted', style: 'margin-top:6px', text: 'Ehrlich sein lohnt sich - danach richte ich das nächste Hörmaterial aus.' })
    ]);
    var scale = h('div', { class: 'scale', style: 'margin-top:14px' });
    ['😵', '🙁', '🙂', '😄', '🤩'].forEach(function (e, i) {
      var b = h('button', { type: 'button', text: e, 'aria-pressed': 'false', 'aria-label': (i + 1) + ' von 5' });
      b.addEventListener('click', function () {
        scale.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        S.listening.selfRating = i + 1;
        L.fx.tap(); L.persistProgress();
      });
      if (S.listening.selfRating === i + 1) b.setAttribute('aria-pressed', 'true');
      scale.appendChild(b);
    });
    self.appendChild(scale);
    self.appendChild(h('div', { class: 'scale-legend' }, [
      h('span', { text: 'kaum was verstanden' }), h('span', { text: 'fast alles' })
    ]));
    v.appendChild(self);
    return v;
  };

  function defaultProtocol(lang) {
    var L1 = lang === 'fr' ? 'Französisch' : 'Spanisch';
    return [
      { title: 'Einmal ganz durch, ohne Pause',
        how: 'Nichts nachschlagen, nichts zurückspulen',
        task: 'Worum geht es? Ein bis zwei Sätze auf Deutsch genügen. Wenn du nur das Thema erwischst: völlig in Ordnung.',
        placeholder: 'Es geht um …' },
      { title: 'Nochmal - diesmal mit Bleistift',
        how: 'Pausieren erlaubt',
        task: 'Sammle Zahlen, Namen, Orte und fünf Wörter, die du wiedererkannt hast. Auch Bruchstücke zählen.',
        placeholder: 'Zahlen / Namen / Wörter …' },
      { title: 'Eine Minute laut nachsprechen',
        how: 'Irgendeine Stelle, die du magst',
        task: 'Wähl eine Passage und sprich parallel mit. Rhythmus vor Perfektion - so baust du ' + L1 + '-Melodie auf.',
        placeholder: 'Welche Stelle? Was war schwierig auszusprechen?' }
    ];
  }

  /* ---------------- Station 6: Umfrage + Abschluss ---------------- */
  var DEFAULT_SURVEY = [
    { id: 'difficulty', type: 'scale', q: 'War die Einheit vom Niveau her passend?',
      low: 'viel zu leicht', high: 'viel zu schwer', emojis: ['🥱', '🙂', '👌', '😅', '🥵'] },
    { id: 'fun', type: 'scale', q: 'Und - hat es Spass gemacht?',
      low: 'zäh', high: 'mehr davon', emojis: ['😐', '🙂', '😊', '😃', '🔥'] },
    { id: 'more', type: 'choice', q: 'Willst du beim nächsten Mal am gleichen Thema dranbleiben?',
      options: ['Ja, gleiches Grammatikthema vertiefen', 'Gleiches Thema, aber anderer Inhalt', 'Nein, etwas Neues'] },
    { id: 'weakest', type: 'choice', q: 'Was hat sich am wackligsten angefühlt?',
      options: ['Die Grammatik', 'Der Wortschatz', 'Der Lesetext', 'Das Hörverstehen', 'Nichts davon'] },
    { id: 'length', type: 'choice', q: 'Zur Länge:',
      options: ['Zu kurz, ich hätte weitergemacht', 'Genau richtig', 'Zu lang'] },
    { id: 'wish', type: 'text', q: 'Wunsch an die nächste Einheit?',
      placeholder: 'z.B. mehr Subjuntivo, Thema Reisen, längerer Hörtext …' }
  ];

  L.views.wrap = function (lesson) {
    var v = h('div', { class: 'view wrap stack-lg' });
    var S = L.session;
    S.survey = S.survey || {};
    var questions = (lesson.survey && lesson.survey.length ? lesson.survey : DEFAULT_SURVEY);

    var scored = S.results.filter(function (r) { return r && !r.freeform; });
    var right = scored.filter(function (r) { return r.correct; }).length;
    var pct = scored.length ? Math.round(right / scored.length * 100) : 0;

    v.appendChild(h('div', { style: 'text-align:center' }, [
      h('div', { class: 'eyebrow', style: 'justify-content:center', text: 'Geschafft' }),
      L.ring(pct),
      h('h1', { style: 'margin-top:12px', text: praise(pct) }),
      h('p', { class: 'lead', style: 'margin-top:10px', text: lesson.outro || 'Noch drei Fragen - damit die nächste Einheit besser auf dich passt als diese.' })
    ]));

    v.appendChild(h('div', { class: 'stat-grid' }, [
      stat(right + '/' + scored.length, 'richtig'),
      stat(String(L.state.xp), 'XP gesamt'),
      stat(String(Object.keys(S.listening && S.listening.passes || {}).length) + '/3', 'Hördurchgänge'),
      stat(minutes(), 'Minuten')
    ]));

    /* Umfrage */
    var form = h('div', { class: 'card' });
    questions.forEach(function (q) {
      var blk = h('div', { class: 'q-block' }, [h('div', { class: 'q-title', text: q.q })]);
      if (q.type === 'scale') {
        var sc = h('div', { class: 'scale' });
        (q.emojis || ['1', '2', '3', '4', '5']).forEach(function (e, i) {
          var b = h('button', { type: 'button', text: e, 'aria-pressed': S.survey[q.id] === i + 1 ? 'true' : 'false' });
          b.addEventListener('click', function () {
            sc.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            S.survey[q.id] = i + 1; L.fx.tap(); L.persistProgress(); refreshDone();
          });
          sc.appendChild(b);
        });
        blk.appendChild(sc);
        blk.appendChild(h('div', { class: 'scale-legend' }, [
          h('span', { text: q.low || '' }), h('span', { text: q.high || '' })
        ]));
      } else if (q.type === 'choice') {
        var ch = h('div', { class: 'choices' });
        q.options.forEach(function (o) {
          var b = h('button', { class: 'choice', type: 'button', text: o, 'aria-pressed': S.survey[q.id] === o ? 'true' : 'false' });
          b.addEventListener('click', function () {
            ch.querySelectorAll('.choice').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            S.survey[q.id] = o; L.fx.tap(); L.persistProgress(); refreshDone();
          });
          ch.appendChild(b);
        });
        blk.appendChild(ch);
      } else {
        var ta = h('textarea', { class: 'field', placeholder: q.placeholder || '', style: 'min-height:80px' });
        ta.value = S.survey[q.id] || '';
        ta.addEventListener('input', function () {
          S.survey[q.id] = ta.value; L.persistProgress(); refreshDone();
        });
        blk.appendChild(ta);
      }
      form.appendChild(blk);
    });
    v.appendChild(form);

    /* Fehlerrückblick */
    var wrong = S.results.filter(function (r) { return r && !r.correct && !r.freeform; });
    if (wrong.length) {
      v.appendChild(h('div', { class: 'stack' }, [
        h('h3', { text: 'Dein Fehlerprotokoll - das nimmst du mit' })
      ].concat(wrong.map(L.mistakeCard))));
    }

    /* Bericht für Claude */
    var reportCard = h('div', { class: 'card' });
    reportCard.appendChild(h('h3', { text: 'Und jetzt das Wichtigste' }));
    reportCard.appendChild(h('p', { style: 'margin-top:8px;font-size:14.5px',
      text: 'Kopier den Bericht und wirf ihn Claude in den Chat. Damit weiss er beim nächsten Mal, was sitzt, was wackelt und worauf du Lust hast.' }));
    var pre = h('div', { class: 'report-box' });
    reportCard.appendChild(h('div', { style: 'margin-top:14px' }, [pre]));

    var copyBtn = h('button', { class: 'btn btn-primary', type: 'button', text: '📋 Bericht kopieren' });
    var dlBtn = h('button', { class: 'btn', type: 'button', text: '⬇ Als Datei' });
    reportCard.appendChild(h('div', { class: 'row', style: 'margin-top:12px' }, [copyBtn, dlBtn]));
    v.appendChild(reportCard);

    function refreshDone() { pre.textContent = L.buildReport(lesson); }
    refreshDone();

    copyBtn.addEventListener('click', function () {
      var txt = L.buildReport(lesson);
      var done = function () { L.toast('Kopiert. Ab damit in den Chat.'); L.sparks(copyBtn, 14); L.fx.done(); };
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

    var home = h('button', { class: 'btn btn-ghost btn-block', type: 'button', text: 'Zurück zur Übersicht' });
    home.addEventListener('click', function () { finishLesson(lesson); L.go('#/'); });
    v.appendChild(home);
    return v;
  };

  function fallbackCopy(txt, done) {
    var ta = document.createElement('textarea');
    ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); }
    catch (e) { L.toast('Kopieren klappt hier nicht - nimm den Knopf «Als Datei».', 3600); }
    ta.remove();
  }

  function finishLesson(lesson) {
    var S = L.session;
    if (L.state.done[lesson.id]) return;
    var scored = S.results.filter(function (r) { return r && !r.freeform; });
    L.state.done[lesson.id] = {
      at: new Date().toISOString(),
      right: scored.filter(function (r) { return r.correct; }).length,
      total: scored.length,
      minutes: minutes()
    };
    L.addXp(40);
    L.save();
  }

  function minutes() {
    var S = L.session;
    return Math.max(1, Math.round((Date.now() - (S.startedAt || Date.now())) / 60000));
  }
  function stat(n, l) { return h('div', { class: 'stat' }, [h('div', { class: 'n', text: n }), h('div', { class: 'l', text: l })]); }
  function praise(p) {
    if (p >= 90) return 'Das war stark.';
    if (p >= 70) return 'Gut gemacht.';
    if (p >= 45) return 'Durchgezogen - zählt.';
    return 'Angefangen ist die halbe Miete.';
  }

  /* ---------------- Bericht ---------------- */
  L.buildReport = function (lesson) {
    var S = L.session;
    var scored = S.results.filter(function (r) { return r && !r.freeform; });
    var byGrammar = {};
    S.results.forEach(function (r) {
      if (!r || !r.grammar || r.freeform) return;
      var g = byGrammar[r.grammar] || (byGrammar[r.grammar] = { right: 0, total: 0 });
      g.total++; if (r.correct) g.right++;
    });
    var report = {
      bericht: 'lerneinheit',
      version: 1,
      lektion: lesson.id,
      sprache: lesson.lang,
      niveau: lesson.level,
      datum: new Date().toISOString().slice(0, 10),
      minuten: minutes(),
      ergebnis: { richtig: scored.filter(function (r) { return r.correct; }).length, gesamt: scored.length },
      grammatik: byGrammar,
      fehler: S.results.filter(function (r) { return r && !r.correct && !r.freeform; })
        .map(function (r) { return { typ: r.type, thema: r.grammar, meins: r.yours, richtig: r.right }; }),
      freitext: S.results.filter(function (r) { return r && r.freeform; })
        .map(function (r) { return r.yours; }),
      hoeren: {
        quelle: (lesson.listening && lesson.listening.source && lesson.listening.source.name) || null,
        durchgaenge: Object.keys((S.listening && S.listening.passes) || {}).length,
        selbsteinschaetzung: (S.listening && S.listening.selfRating) || null,
        notizen: (S.listening && S.listening.notes) || {}
      },
      umfrage: S.survey || {}
    };
    return 'LERNBERICHT ' + lesson.id + '\n' + JSON.stringify(report, null, 1);
  };

})(window.LEKTION);
