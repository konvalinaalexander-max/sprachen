/* Sprachen - Aufgabentypen.
   Jede Engine bekommt (task, ctx) und liefert ein Element.
   ctx.answered({correct, yours, right, explain, skipped}) meldet das Ergebnis zurück. */
(function (L) {
  'use strict';
  var h = L.h, esc = L.esc, markup = function (s) { return L.markup(s); };
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
        var body = (right ? '' : '<b>Richtig wäre:</b> ' + esc(labelOf(task.options[task.answer])) + '<br>')
          + markup(why || task.explain || '');
        if (why && task.explain) body += '<br><span class="muted">' + markup(task.explain) + '</span>';
        root.appendChild(verdict(right, right ? (task.praise || 'Sitzt.') : 'Knapp daneben', body));
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
      { id: 'richtig', label: 'Stimmt' },
      { id: 'falsch', label: 'Stimmt nicht' },
      { id: 'unklar', label: 'Steht nicht im Text' }
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
        root.appendChild(verdict(right, right ? 'Gutes Auge.' : 'Nicht ganz', markup(task.explain || '')));
        ctx.answered({ correct: right, yours: labelFor(id), right: labelFor(task.verdict), explain: task.explain || '' });
      }
    }
    function labelFor(id) {
      for (var i = 0; i < choices.length; i++) if (choices[i].id === id) return choices[i].label;
      return id;
    }

    function evidenceStep(verdictWasRight) {
      var box = h('div', { class: 'stack' });
      box.appendChild(h('p', { class: 'muted', text: 'Und jetzt der Beweis: Klick den Satz an, der das belegt.' }));
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
            all ? 'Urteil und Beleg - beides sauber.' : (verdictWasRight ? 'Urteil ja, Beleg nein.' : 'Nicht ganz'),
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

    var check = h('button', { class: 'btn btn-primary', type: 'button', text: 'Prüfen', disabled: true });
    check.addEventListener('click', function () {
      var mine = picked.map(function (p) { return p.word; }).join(' ');
      var res = L.matches(mine, [task.solution].concat(task.alsoAccept || []));
      root.dataset.locked = '1';
      slot.classList.add(res.ok ? 'ok' : 'no');
      bank.querySelectorAll('.word').forEach(function (b) { b.disabled = true; });
      check.remove();
      var body = res.ok
        ? markup(task.explain || '')
        : '<b>Richtig:</b> ' + esc(task.solution) + '<br>' + markup(task.explain || '');
      root.appendChild(verdict(res.ok, res.ok ? 'Perfekt gebaut.' : 'Fast - schau die Reihenfolge an', body));
      ctx.answered({ correct: res.ok, yours: mine, right: task.solution, explain: task.explain || '' });
    });

    root.appendChild(h('p', { class: 'muted', text: 'Tippe die Wörter in der richtigen Reihenfolge an. Ein paar passen nicht.' }));
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
    var field = h('input', { class: 'field', type: 'text', placeholder: task.placeholder || 'Deine Lösung …', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
    var check = h('button', { class: 'btn btn-primary', type: 'button', text: 'Prüfen' });
    var row = h('div', { class: 'type-row' }, [field, check]);
    root.appendChild(row);
    root.appendChild(accentBar(ctx.lang, field));

    var hintBtn = null;
    if (task.hint) {
      hintBtn = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', text: 'Kleiner Schubs' });
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
        body = 'Inhaltlich richtig - nur die Akzente fehlen: <b>' + esc(res.target) + '</b><br>';
      } else if (!res.ok) {
        var d = L.diff(mine, accepted[0]);
        var html = d.map(function (p) {
          return '<span class="' + p[0] + '">' + esc(p[1]) + '</span>';
        }).join('');
        body = '<div class="diff" style="margin-bottom:8px">' + html + '</div>';
      }
      body += markup(task.explain || '');
      if (accepted.length > 1 && res.ok) {
        body += '<br><span class="muted">Auch möglich: ' + esc(accepted.slice(1).join(' · ')) + '</span>';
      }
      root.appendChild(verdict(res.ok, res.ok ? (res.exact ? 'Genau so.' : 'Richtig - fast perfekt') : 'Schau mal genau hin', body));
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
        : 'Du hast <b>' + misses + '</b> Fehlversuch' + (misses === 1 ? '' : 'e') + ' gebraucht. ' + markup(task.explain || '');
      root.appendChild(verdict(clean, clean ? 'Alles auf Anhieb.' : 'Geschafft.', body));
      ctx.answered({
        correct: clean,
        partial: Math.max(0, 1 - misses / (task.pairs.length * 1.5)),
        yours: misses + ' Fehlversuche',
        right: task.pairs.length + ' Paare',
        explain: task.explain || ''
      });
    }

    root.appendChild(h('p', { class: 'muted', text: 'Immer zwei antippen, die zusammengehören.' }));
    root.appendChild(h('div', { class: 'pairs' }, [colA, colB]));
    return root;
  };

  /* =============== 6. Freischreiben: produzieren, dann vergleichen =============== */
  L.engines.write = function (task, ctx) {
    var root = h('div', { class: 'stack' });
    var field = h('textarea', { class: 'field', placeholder: task.placeholder || 'Schreib los - Fehler sind hier ausdrücklich erlaubt.' });
    root.appendChild(field);
    root.appendChild(accentBar(ctx.lang, field));

    if (task.mustUse && task.mustUse.length) {
      var chips = h('div', { class: 'row', style: 'margin-top:4px' });
      chips.appendChild(h('span', { class: 'muted', text: 'Bau ein:' }));
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

    var go = h('button', { class: 'btn btn-primary', type: 'button', text: 'Fertig - Musterlösung zeigen' });
    root.appendChild(h('div', { class: 'row' }, [go]));

    go.addEventListener('click', function () {
      var mine = field.value.trim();
      var words = mine ? mine.split(/\s+/).length : 0;
      field.disabled = true; go.remove();
      var used = (task.mustUse || []).filter(function (w) { return L.norm(mine).indexOf(L.norm(w)) !== -1; });
      var enough = words >= (task.minWords || 15);

      var panel = h('div', { class: 'stack' });
      panel.appendChild(h('div', { class: 'card' }, [
        h('div', { class: 'task-kind', text: 'So könnte es klingen' }),
        h('p', { style: 'margin-top:8px;color:var(--ink);font-size:15.5px;line-height:1.7', html: markup(task.model).replace(/\n/g, '<br>') })
      ]));

      if (task.checklist && task.checklist.length) {
        var list = h('div', { class: 'stack', style: 'gap:8px' });
        list.appendChild(h('h3', { text: 'Vergleich deinen Text damit:' }));
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
      note.push(words + ' Wörter geschrieben');
      if ((task.mustUse || []).length) note.push(used.length + '/' + task.mustUse.length + ' Zielwörter benutzt');
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

})(window.LEKTION);
