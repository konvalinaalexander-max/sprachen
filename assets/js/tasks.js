/* Sprachen - Aufgabentypen.
   Jede Engine bekommt (task, ctx) und liefert ein Element.
   ctx.answered({correct, yours, right, explain, skipped}) meldet das Ergebnis zurück. */
(function (L) {
  'use strict';
  var h = L.h, esc = L.esc;
  var markup = function (s) { return L.markup(s); };
  var T = function (k, v) { return L.t(k, v); };
  L.engines = {};

  function verdict(good, title, bodyHtml) {
    return h('div', { class: 'verdict ' + (good ? 'good' : 'bad') }, [
      h('div', { class: 'ic', text: good ? '✓' : '✕' }),
      h('div', {}, [
        h('div', { class: 't', text: title }),
        h('p', { html: bodyHtml || '' })
      ])
    ]);
  }
  L.verdictBox = verdict;

  function lockButtons(root) {
    root.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
  }

  /* Akzent-Schnelltasten unter Eingabefeldern */
  function accentBar(lang, field) {
    var sets = {
      es: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'],
      fr: ['é', 'è', 'ê', 'à', 'â', 'ç', 'î', 'ô', 'û', 'ë']
    };
    var bar = h('div', { class: 'accents' });
    (sets[lang] || []).forEach(function (ch) {
      bar.appendChild(h('button', {
        class: 'acc', type: 'button', text: ch, tabindex: '-1',
        onclick: function (e) {
          e.preventDefault();
          var s = field.selectionStart, en = field.selectionEnd;
          field.value = field.value.slice(0, s) + ch + field.value.slice(en);
          field.focus();
          field.selectionStart = field.selectionEnd = s + ch.length;
          L.fx.tap();
        }
      }));
    });
    return bar;
  }

  /* =============== 1. Blitz: Auswahl mit Begründung =============== */
  L.engines.choice = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    var opts = h('div', { class: 'opts' });
    var keys = 'ABCD';
    var order = task.keepOrder ? task.options.map(function (_, i) { return i; })
                               : L.shuffle(task.options.map(function (_, i) { return i; }));

    order.forEach(function (idx, pos) {
      var o = task.options[idx];
      var label = typeof o === 'string' ? o : o.text;
      var btn = h('button', { class: 'opt', type: 'button' }, [
        h('span', { class: 'key', text: keys[pos] || '·' }),
        h('span', { html: esc(label) })
      ]);
      btn.addEventListener('click', function () {
        var right = (idx === task.answer);
        lockButtons(root);
        opts.querySelectorAll('.opt').forEach(function (b, i) {
          var oi = order[i];
          if (oi === task.answer) b.classList.add('right');
          else if (b === btn) b.classList.add('wrong');
          else b.classList.add('faded');
        });
        var chosen = task.options[idx];
        var why = (typeof chosen === 'object' && chosen.why) ? chosen.why : '';
        var body = (right ? '' : '<b>' + T('v.shouldBe') + '</b> ' + esc(labelOf(task.options[task.answer])) + '<br>')
          + markup(why || task.explain || '');
        if (why && task.explain) body += '<br><span class="muted">' + markup(task.explain) + '</span>';
        root.appendChild(verdict(right, right ? (task.praise || T('v.hit')) : T('v.miss'), body));
        ctx.answered({
          correct: right,
          yours: labelOf(chosen),
          right: labelOf(task.options[task.answer]),
          explain: why || task.explain || ''
        });
      });
      opts.appendChild(btn);
    });
    function labelOf(o) { return typeof o === 'string' ? o : o.text; }
    root.appendChild(opts);
    return root;
  };

  /* =============== 2. Textdetektiv: Aussage prüfen + Beleg klicken =============== */
  L.engines.evidence = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    var choices = [
      { id: 'richtig', label: T('v.yes') },
      { id: 'falsch', label: T('v.no') },
      { id: 'unklar', label: T('v.unclear') }
    ];
    var opts = h('div', { class: 'opts' });
    choices.forEach(function (c, i) {
      var b = h('button', { class: 'opt', type: 'button' }, [
        h('span', { class: 'key', text: ['✓', '✕', '?'][i] }),
        h('span', { text: c.label })
      ]);
      b.addEventListener('click', function () { pick(c.id, b); });
      opts.appendChild(b);
    });
    root.appendChild(opts);

    function pick(id, btn) {
      var right = (id === task.verdict);
      lockButtons(root);
      opts.querySelectorAll('.opt').forEach(function (b, i) {
        if (choices[i].id === task.verdict) b.classList.add('right');
        else if (b === btn) b.classList.add('wrong');
        else b.classList.add('faded');
      });
      if (task.verdict !== 'unklar' && task.evidence && ctx.sentences) {
        root.appendChild(evidenceStep(right));
      } else {
        root.appendChild(verdict(right, right ? T('v.sharpEye') : T('v.notQuite'), markup(task.explain || '')));
        ctx.answered({ correct: right, yours: labelFor(id), right: labelFor(task.verdict), explain: task.explain || '' });
      }
    }
    function labelFor(id) {
      for (var i = 0; i < choices.length; i++) if (choices[i].id === id) return choices[i].label;
      return id;
    }

    function evidenceStep(verdictWasRight) {
      var box = h('div', { class: 'stack' });
      box.appendChild(h('p', { class: 'muted', text: T('v.proveIt') }));
      var ev = h('div', { class: 'evidence' });
      var found = false;
      ctx.sentences.forEach(function (s) {
        var isIt = !found && task.evidence && s.text.indexOf(task.evidence) !== -1;
        if (isIt) found = true;
        var span = h('span', { class: 'sent', text: s.text + ' ' });
        span.addEventListener('click', function () {
          if (ev.dataset.locked) return;
          ev.dataset.locked = '1';
          span.classList.add(isIt ? 'picked-right' : 'picked-wrong');
          if (!isIt) {
            ev.querySelectorAll('.sent').forEach(function (o, i) {
              if (ctx.sentences[i].text.indexOf(task.evidence) !== -1) o.classList.add('picked-right');
            });
          }
          isIt ? L.fx.right(0) : L.fx.wrong();
          var all = verdictWasRight && isIt;
          box.appendChild(verdict(all,
            all ? T('v.bothRight') : (verdictWasRight ? T('v.halfRight') : T('v.notQuite')),
            markup(task.explain || '')));
          ctx.answered({
            correct: all,
            yours: labelFor(task.verdict === 'unklar' ? 'unklar' : (verdictWasRight ? task.verdict : 'x')) + (isIt ? ' + richtiger Beleg' : ' + falscher Beleg'),
            right: labelFor(task.verdict) + ' (Beleg: "' + task.evidence + '")',
            explain: task.explain || ''
          });
        });
        ev.appendChild(span);
      });
      box.appendChild(ev);
      return box;
    }
    return root;
  };

  /* =============== 3. Satzschmiede: Wortfolge bauen =============== */
  L.engines.forge = function (task, ctx) {
    var root = h('div', { class: 'forge' });
    var target = task.solution.split(/\s+/);
    var bankWords = L.shuffle(target.concat(task.distractors || []));
    var slot = h('div', { class: 'slot' });
    var bank = h('div', { class: 'bank' });
    var picked = [];

    function refresh() {
      slot.innerHTML = '';
      slot.classList.toggle('filled', picked.length > 0);
      picked.forEach(function (p, i) {
        var w = h('button', { class: 'word in-slot', type: 'button', text: p.word });
        w.addEventListener('click', function () {
          if (root.dataset.locked) return;
          picked.splice(i, 1);
          p.el.classList.remove('used');
          L.fx.tap(); refresh();
        });
        slot.appendChild(w);
      });
      check.disabled = picked.length === 0 || !!root.dataset.locked;
    }

    bankWords.forEach(function (w) {
      var el = h('button', { class: 'word', type: 'button', text: w });
      el.addEventListener('click', function () {
        if (root.dataset.locked || el.classList.contains('used')) return;
        el.classList.add('used');
        picked.push({ word: w, el: el });
        L.fx.tap(); refresh();
      });
      bank.appendChild(el);
    });

    var check = h('button', { class: 'btn btn-primary', type: 'button', text: T('f.check'), disabled: true });
    check.addEventListener('click', function () {
      var mine = picked.map(function (p) { return p.word; }).join(' ');
      var res = L.matches(mine, [task.solution].concat(task.alsoAccept || []));
      root.dataset.locked = '1';
      slot.classList.add(res.ok ? 'ok' : 'no');
      bank.querySelectorAll('.word').forEach(function (b) { b.disabled = true; });
      check.remove();
      var body = res.ok
        ? markup(task.explain || '')
        : '<b>' + T('f.correct') + '</b> ' + esc(task.solution) + '<br>' + markup(task.explain || '');
      root.appendChild(verdict(res.ok, res.ok ? T('f.built') : T('f.order'), body));
      ctx.answered({ correct: res.ok, yours: mine, right: task.solution, explain: task.explain || '' });
    });

    root.appendChild(h('p', { class: 'muted', text: T('f.hint') }));
    root.appendChild(slot);
    root.appendChild(bank);
    root.appendChild(h('div', { class: 'row' }, [check]));
    refresh();
    return root;
  };

  /* =============== 4. Verwandler: umformen und tippen =============== */
  L.engines.transform = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    if (task.source) {
      root.appendChild(h('div', { class: 'ex-line' }, [h('div', { class: 'src', html: esc(task.source) })]));
    }
    var field = h('input', { class: 'field', type: 'text', placeholder: task.placeholder || T('t.placeholder'), autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
    var check = h('button', { class: 'btn btn-primary', type: 'button', text: T('f.check') });
    var row = h('div', { class: 'type-row' }, [field, check]);
    root.appendChild(row);
    root.appendChild(accentBar(ctx.lang, field));

    var hintBtn = null;
    if (task.hint) {
      hintBtn = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', text: T('t.nudge') });
      hintBtn.addEventListener('click', function () {
        hintBtn.replaceWith(h('p', { class: 'muted', html: '💡 ' + esc(task.hint) }));
      });
      root.appendChild(h('div', { class: 'row' }, [hintBtn]));
    }

    function submit() {
      var mine = field.value.trim();
      if (!mine) { field.focus(); return; }
      var accepted = [].concat(task.answer);
      var res = L.matches(mine, accepted);
      field.disabled = true; check.disabled = true;
      if (hintBtn && hintBtn.parentNode) hintBtn.disabled = true;

      var body = '';
      if (res.ok && !res.exact) {
        body = T('t.accents') + ' <b>' + esc(res.target) + '</b><br>';
      } else if (!res.ok) {
        var d = L.diff(mine, accepted[0]);
        var html = d.map(function (p) {
          return '<span class="' + p[0] + '">' + esc(p[1]) + '</span>';
        }).join('');
        body = '<div class="diff" style="margin-bottom:8px">' + html + '</div>';
      }
      body += markup(task.explain || '');
      if (accepted.length > 1 && res.ok) {
        body += '<br><span class="muted">' + T('t.also') + ' ' + esc(accepted.slice(1).join(' · ')) + '</span>';
      }
      root.appendChild(verdict(res.ok, res.ok ? (res.exact ? T('t.exact') : T('t.almost')) : T('t.look'), body));
      ctx.answered({
        correct: res.ok,
        exact: res.exact,
        yours: mine,
        right: accepted[0],
        explain: task.explain || ''
      });
    }
    check.addEventListener('click', submit);
    field.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    setTimeout(function () { field.focus(); }, 120);
    return root;
  };

  /* =============== 5. Paarjagd: zusammenbringen =============== */
  L.engines.pairs = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    var left = L.shuffle(task.pairs.map(function (p, i) { return { i: i, t: p[0] }; }));
    var right = L.shuffle(task.pairs.map(function (p, i) { return { i: i, t: p[1] }; }));
    var sel = null, hits = 0, misses = 0;
    var colA = h('div', { class: 'pcol' }), colB = h('div', { class: 'pcol' });

    function make(item, side, col) {
      var b = h('button', { class: 'pitem', type: 'button', text: item.t });
      b.addEventListener('click', function () {
        if (b.classList.contains('matched')) return;
        if (!sel) {
          sel = { item: item, side: side, el: b };
          b.classList.add('sel'); L.fx.tap();
          return;
        }
        if (sel.el === b) { b.classList.remove('sel'); sel = null; return; }
        if (sel.side === side) { sel.el.classList.remove('sel'); sel = { item: item, side: side, el: b }; b.classList.add('sel'); return; }
        if (sel.item.i === item.i) {
          sel.el.classList.remove('sel');
          sel.el.classList.add('matched'); b.classList.add('matched');
          hits++; L.fx.right(hits); L.sparks(b, 8);
          sel = null;
          if (hits === task.pairs.length) finish();
        } else {
          var a = sel.el;
          a.classList.remove('sel'); a.classList.add('shake'); b.classList.add('shake');
          misses++; L.fx.wrong();
          setTimeout(function () { a.classList.remove('shake'); b.classList.remove('shake'); }, 420);
          sel = null;
        }
      });
      col.appendChild(b);
    }
    left.forEach(function (it) { make(it, 'a', colA); });
    right.forEach(function (it) { make(it, 'b', colB); });

    function finish() {
      var clean = misses === 0;
      var body = clean ? markup(task.explain || '')
        : T('p.tries', { n: misses }) + ' ' + markup(task.explain || '');
      root.appendChild(verdict(clean, clean ? T('p.clean') : T('p.done'), body));
      ctx.answered({
        correct: clean,
        partial: Math.max(0, 1 - misses / (task.pairs.length * 1.5)),
        yours: misses + ' Fehlversuche',
        right: task.pairs.length + ' Paare',
        explain: task.explain || ''
      });
    }

    root.appendChild(h('p', { class: 'muted', text: T('p.hint') }));
    root.appendChild(h('div', { class: 'pairs' }, [colA, colB]));
    return root;
  };

  /* =============== 6. Freischreiben: produzieren, dann vergleichen =============== */
  L.engines.write = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    var field = h('textarea', { class: 'field', placeholder: task.placeholder || T('w.placeholder') });
    root.appendChild(field);
    root.appendChild(accentBar(ctx.lang, field));

    if (task.mustUse && task.mustUse.length) {
      var chips = h('div', { class: 'row', style: 'margin-top:4px' });
      chips.appendChild(h('span', { class: 'muted', text: T('w.use') }));
      task.mustUse.forEach(function (w) { chips.appendChild(h('span', { class: 'tag ghost', text: w, 'data-w': w })); });
      root.appendChild(chips);
      field.addEventListener('input', function () {
        var v = L.norm(field.value);
        chips.querySelectorAll('.tag').forEach(function (t) {
          var got = v.indexOf(L.norm(t.getAttribute('data-w'))) !== -1;
          t.classList.toggle('ghost', !got);
          t.classList.toggle('hot', got);
        });
      });
    }

    var go = h('button', { class: 'btn btn-primary', type: 'button', text: T('w.go') });
    root.appendChild(h('div', { class: 'row' }, [go]));

    go.addEventListener('click', function () {
      var mine = field.value.trim();
      var words = mine ? mine.split(/\s+/).length : 0;
      field.disabled = true; go.remove();
      var used = (task.mustUse || []).filter(function (w) { return L.norm(mine).indexOf(L.norm(w)) !== -1; });
      var enough = words >= (task.minWords || 15);

      var panel = h('div', { class: 'stack' });
      panel.appendChild(h('div', { class: 'card' }, [
        h('div', { class: 'task-kind', text: T('w.model') }),
        h('p', { style: 'margin-top:8px;color:var(--ink);font-size:15.5px;line-height:1.7', html: markup(task.model).replace(/\n/g, '<br>') })
      ]));

      if (task.checklist && task.checklist.length) {
        var list = h('div', { class: 'stack', style: 'gap:8px' });
        list.appendChild(h('h3', { text: T('w.compare') }));
        var ticked = 0;
        task.checklist.forEach(function (c) {
          var b = h('button', { class: 'opt', type: 'button' }, [
            h('span', { class: 'key', text: '○' }),
            h('span', { text: c })
          ]);
          b.addEventListener('click', function () {
            var on = b.classList.toggle('right');
            b.querySelector('.key').textContent = on ? '✓' : '○';
            ticked += on ? 1 : -1;
            L.fx.tap();
          });
          list.appendChild(b);
        });
        panel.appendChild(h('div', { class: 'card' }, [list]));
      }
      root.appendChild(panel);

      var note = [];
      note.push(T('w.words', { n: words }));
      if ((task.mustUse || []).length) note.push(T('w.hit', { a: used.length, b: task.mustUse.length }));
      L.fx.done();
      ctx.answered({
        correct: enough && used.length >= Math.ceil(((task.mustUse || []).length) * 0.6),
        freeform: true,
        yours: mine,
        right: task.model,
        explain: note.join(' · ')
      });
    });
    return root;
  };

  /* =============== 7. Zeitstrahl: Reihenfolge herstellen =============== */
  L.engines.order = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    root.appendChild(h('p', { class: 'muted', text: T('o.hint') }));
    var linie = h('div', { class: 'ord-linie' });
    var vorrat = h('div', { class: 'ord-vorrat' });
    root.appendChild(linie); root.appendChild(vorrat);

    var pos = 0, fehler = 0, n = task.items.length;
    L.shuffle(task.items.map(function (t, i) { return { t: t, i: i }; })).forEach(function (it) {
      var b = h('button', { class: 'ord-karte', type: 'button' }, [
        h('span', { class: 'ord-t', html: markup(it.t) })
      ]);
      b.addEventListener('click', function () {
        if (b.disabled) return;
        if (it.i === pos) {
          b.disabled = true; b.classList.add('weg');
          var gesetzt = h('div', { class: 'ord-platz' }, [
            h('span', { class: 'ord-n', text: String(pos + 1) }),
            h('span', { class: 'ord-t', html: markup(it.t) })
          ]);
          linie.appendChild(gesetzt);
          pos++; L.fx.right(pos);
          if (pos === n) fertig();
        } else {
          fehler++; L.fx.wrong();
          b.classList.add('wackel');
          setTimeout(function () { b.classList.remove('wackel'); }, 420);
        }
      });
      vorrat.appendChild(b);
    });

    function fertig() {
      var sauber = fehler === 0;
      var body = sauber ? markup(task.explain || '')
        : T('p.tries', { n: fehler }) + ' ' + markup(task.explain || '');
      root.appendChild(verdict(sauber, sauber ? T('o.clean') : T('o.done'), body));
      ctx.answered({
        correct: sauber, partial: Math.max(0, 1 - fehler / (n * 1.5)),
        yours: fehler + ' ✗', right: n + ' ✓', explain: task.explain || ''
      });
    }
    return root;
  };

  /* =============== 8. Fehlersuche: das eine falsche Wort =============== */
  L.engines.spot = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    root.appendChild(h('p', { class: 'muted', text: T('s.hint') }));
    var satz = h('div', { class: 'spot-satz' });
    var teile = task.sentence.split(/(\s+)/);
    var treffer = false;
    teile.forEach(function (w) {
      if (/^\s+$/.test(w)) { satz.appendChild(document.createTextNode(w)); return; }
      var blank = L.norm(w) === L.norm(task.wrong);
      var ist = blank && !treffer;
      if (ist) treffer = true;
      var b = h('button', { class: 'spot-w', type: 'button', text: w });
      b.addEventListener('click', function () {
        if (satz.dataset.zu) return;
        satz.dataset.zu = '1';
        satz.querySelectorAll('.spot-w').forEach(function (x) { x.disabled = true; });
        b.classList.add(ist ? 'richtig' : 'falsch');
        if (!ist) {
          satz.querySelectorAll('.spot-w').forEach(function (x, k) { if (x.__ist) x.classList.add('richtig'); });
        }
        ist ? L.fx.right(1) : L.fx.wrong();
        var body = '<b>' + T('s.should') + '</b> ' + esc(task.right) + '<br>' + markup(task.explain || '');
        root.appendChild(verdict(ist, ist ? T('s.found') : T('s.missed'), body));
        ctx.answered({
          correct: ist, yours: w, right: task.wrong + ' → ' + task.right,
          explain: task.explain || ''
        });
      });
      b.__ist = ist;
      satz.appendChild(b);
    });
    root.appendChild(satz);
    return root;
  };

  /* =============== 9. Gespräch: Repliken wählen =============== */
  L.engines.dialog = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    root.appendChild(h('p', { class: 'muted', text: T('dl.hint') }));
    var chat = h('div', { class: 'dlg' });
    root.appendChild(chat);

    var luecken = task.lines.filter(function (l) { return l.options; });
    var offen = 0, fehler = 0;

    function zeichne() {
      chat.innerHTML = '';
      var gezeigt = 0;
      for (var i = 0; i < task.lines.length; i++) {
        var l = task.lines[i];
        if (l.options) {
          if (gezeigt < offen) {
            var gew = l.__gewaehlt;
            chat.appendChild(h('div', { class: 'dlg-z mein' }, [
              h('div', { class: 'dlg-von', text: l.von || T('dl.turn') }),
              h('div', { class: 'dlg-blase ' + (l.__ok ? 'gut' : 'schlecht'), html: markup(gew) })
            ]));
            gezeigt++;
            continue;
          }
          chat.appendChild(auswahl(l));
          return;
        }
        chat.appendChild(h('div', { class: 'dlg-z' }, [
          h('div', { class: 'dlg-von', text: l.von || '' }),
          h('div', { class: 'dlg-blase', html: markup(l.text) })
        ]));
      }
      fertig();
    }

    function auswahl(l) {
      var box = h('div', { class: 'dlg-wahl' });
      box.appendChild(h('div', { class: 'dlg-von', text: l.von || T('dl.turn') }));
      var opts = h('div', { class: 'opts' });
      L.shuffle(l.options.map(function (_, k) { return k; })).forEach(function (k) {
        var o = l.options[k];
        var b = h('button', { class: 'opt', type: 'button' }, [
          h('span', { class: 'key', text: '»' }),
          h('span', { html: markup(o.t) })
        ]);
        b.addEventListener('click', function () {
          opts.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; });
          l.__gewaehlt = o.t; l.__ok = !!o.ok;
          if (!o.ok) fehler++;
          o.ok ? L.fx.right(offen + 1) : L.fx.wrong();
          if (o.why) box.appendChild(h('p', { class: 'porque muted', html: markup(o.why) }));
          setTimeout(function () { offen++; zeichne(); }, o.why ? 1500 : 550);
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
      return box;
    }

    function fertig() {
      var sauber = fehler === 0;
      root.appendChild(verdict(sauber, sauber ? T('p.clean') : T('p.done'),
        (sauber ? '' : T('p.tries', { n: fehler }) + ' ') + markup(task.explain || '')));
      ctx.answered({
        correct: sauber, partial: 1 - fehler / Math.max(1, luecken.length),
        yours: (luecken.length - fehler) + '/' + luecken.length,
        right: luecken.length + '/' + luecken.length, explain: task.explain || ''
      });
    }
    zeichne();
    return root;
  };

})(window.LEKTION);
