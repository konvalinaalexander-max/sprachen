/* Sprachen - Router, Rahmen, Menü. */
(function (L) {
  'use strict';
  var h = L.h;
  var root, railEl, footEl, current = { id: null, station: null };

  L.go = function (hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  };

  /* ---------------- Sitzung ---------------- */
  function newSession(lesson) {
    return { lessonId: lesson.id, startedAt: Date.now(), results: [], taskIndex: 0, streak: 0,
             listening: { notes: {}, passes: {}, selfRating: null }, survey: {}, station: 'intro' };
  }
  L.persistProgress = function () {
    if (!L.session) return;
    L.state.progress[L.session.lessonId] = L.session;
    L.save();
  };

  /* ---------------- Router ---------------- */
  function route() {
    var hash = location.hash || '#/';
    var m = hash.match(/^#\/lektion\/([^/]+)(?:\/([^/]+))?/);
    if (!m) {
      current = { id: null, station: null };
      L.session = null;
      L.uiLang = 'de';
      document.body.dataset.view = 'home';
      document.body.dataset.lang = 'es';
      draw(L.views.home());
      return;
    }
    var id = decodeURIComponent(m[1]);
    var entry = L.catalog.filter(function (e) { return e.id === id; })[0];
    if (!entry) { draw(missing(id)); return; }

    document.body.dataset.view = 'lesson';
    document.body.dataset.lang = entry.lang;
    L.uiLang = entry.lang;          // ab hier keine deutsche Silbe mehr

    L.load(entry).then(function (lesson) {
      if (!L.session || L.session.lessonId !== lesson.id) {
        var saved = L.state.progress[lesson.id];
        L.session = (saved && saved.results) ? saved : newSession(lesson);
        L.session.startedAt = L.session.startedAt || Date.now();
      }
      var erste = lesson.format === 'stage' ? 'stage' : 'intro';
      var station = m[2] || L.session.station || erste;
      if (!L.views[station]) station = erste;
      if (lesson.format === 'stage' && station !== 'stage' && station !== 'wrap') station = 'stage';
      L.session.station = station;
      current = { id: id, station: station };
      document.body.dataset.view = station === 'stage' ? 'stage' : 'lesson';
      L.persistProgress();
      draw(L.views[station](lesson), lesson, station);
    }).catch(function (err) {
      draw(missing(id, err.message));
    });
  }
  L.render = function () {
    var entry = L.catalog.filter(function (e) { return e.id === current.id; })[0];
    if (!entry) return route();
    var lesson = L.lessons[entry.id];
    draw(L.views[current.station](lesson), lesson, current.station);
  };

  function missing(id, why) {
    return h('div', { class: 'view wrap empty' }, [
      h('div', { class: 'big', text: '🗺️' }),
      h('h2', { text: L.t('err.title') }),
      h('p', { class: 'lead', style: 'margin-top:10px', text: why || id }),
      h('div', { class: 'row', style: 'justify-content:center;margin-top:22px' }, [
        h('button', { class: 'btn btn-primary', type: 'button', text: L.t('err.home'), onclick: function () { L.go('#/'); } })
      ])
    ]);
  }

  /* ---------------- Zeichnen ---------------- */
  function draw(view, lesson, station) {
    root.innerHTML = '';
    root.appendChild(view);
    drawRail(lesson, station);
    drawFoot(lesson, station);
    updateBadges();
    if (!window.__noscroll) window.scrollTo(0, 0);
  }

  function drawRail(lesson, station) {
    railEl.innerHTML = '';
    if (!lesson || lesson.format === 'stage') { railEl.style.display = 'none'; return; }
    railEl.style.display = '';
    var inner = h('div', { class: 'rail-inner' });
    var cur = L.STATIONS.map(function (s) { return s.id; }).indexOf(station);
    L.STATIONS.forEach(function (s, i) {
      var state = i < cur ? 'done' : i === cur ? 'active' : 'todo';
      var b = h('button', { class: 'rail-step', 'data-state': state, type: 'button',
        disabled: i > cur + 1 ? 'disabled' : null }, [
        h('span', { class: 'bar' }, [h('i')]),
        h('span', { text: L.stationLabel(s.id) })
      ]);
      b.addEventListener('click', function () { L.go('#/lektion/' + lesson.id + '/' + s.id); });
      inner.appendChild(b);
    });
    railEl.appendChild(inner);
  }

  function drawFoot(lesson, station) {
    footEl.innerHTML = '';
    if (!lesson || lesson.format === 'stage') { footEl.style.display = 'none'; return; }
    var idx = L.STATIONS.map(function (s) { return s.id; }).indexOf(station);
    var next = L.STATIONS[idx + 1];

    // Im Training übernimmt die Aufgabe selbst das Weiterblättern
    if (station === 'train') {
      var tasks = lesson.tasks || [];
      if ((L.session.taskIndex || 0) < tasks.length) { footEl.style.display = 'none'; return; }
    }
    if (station === 'wrap') { footEl.style.display = 'none'; return; }

    footEl.style.display = '';
    var inner = h('div', { class: 'footbar-inner' });
    inner.appendChild(h('div', { class: 'hint', text: hintFor(station) }));
    var b = h('button', { class: 'btn btn-primary', type: 'button', text: labelFor(station) });
    b.addEventListener('click', function () {
      L.fx.tap();
      L.go('#/lektion/' + lesson.id + '/' + (next ? next.id : 'wrap'));
    });
    inner.appendChild(b);
    footEl.appendChild(inner);
  }

  function labelFor(station) {
    return L.t('foot.' + station) === 'foot.' + station ? L.t('foot.next') : L.t('foot.' + station);
  }
  function hintFor(station) {
    var k = 'hint.' + station;
    return L.t(k) === k ? '' : L.t(k);
  }

  /* ---------------- Kopfzeile ---------------- */
  function updateBadges() {
    var xp = document.getElementById('xp-badge');
    if (xp) xp.innerHTML = '<b>' + L.state.xp + '</b> XP';
    var st = document.getElementById('streak-badge');
    if (st) {
      if (L.state.streakDays > 1) { st.style.display = ''; st.innerHTML = '<span class="flame">🔥</span><b>' + L.state.streakDays + '</b>'; }
      else st.style.display = 'none';
    }
  }

  /* ---------------- Menü ---------------- */
  function openMenu() {
    var sheet = document.getElementById('sheet');
    var box = sheet.querySelector('.sheet-inner');
    box.innerHTML = '';
    box.appendChild(h('h3', { text: L.t('menu.title'), style: 'margin-bottom:14px' }));

    var items = [];
    if (L.session) {
      items.push(['🏠', L.t('menu.leave'), function () { close(); L.go('#/'); }]);
      items.push(['↺', L.t('menu.restart'), function () {
        delete L.state.progress[L.session.lessonId];
        L.session = null; L.save(); close();
        location.hash = '#/lektion/' + current.id;
        route();
      }, 'danger']);
    }
    items.push([L.state.settings.sound ? '🔊' : '🔇',
      L.state.settings.sound ? L.t('menu.soundOff') : L.t('menu.soundOn'), function () {
        L.state.settings.sound = !L.state.settings.sound; L.save(); close();
        L.toast(L.state.settings.sound ? L.t('toast.soundOn') : L.t('toast.soundOff'));
      }]);
    if (!L.standalone) {
      items.push(['📖', L.t('menu.docs'), function () { close(); window.open('docs/QUELLEN.md', '_blank'); }]);
    }
    items.push(['🧹', L.t('menu.reset'), function () {
      if (confirm(L.t('menu.confirm'))) {
        L.resetAll(); L.session = null; close(); L.go('#/'); L.toast(L.t('toast.reset'));
      }
    }, 'danger']);

    items.forEach(function (it, i) {
      if (i === items.length - 1) box.appendChild(h('div', { class: 'menu-sep' }));
      box.appendChild(h('button', { class: 'menu-item ' + (it[3] || ''), type: 'button', onclick: it[2] }, [
        h('span', { class: 'ic', text: it[0] }),
        h('span', { text: it[1] })
      ]));
    });
    box.appendChild(h('div', { class: 'menu-sep' }));
    box.appendChild(h('button', { class: 'btn btn-ghost btn-block', type: 'button', text: L.t('menu.close'), onclick: close }));
    sheet.classList.add('open');
    function close() { sheet.classList.remove('open'); }
  }

  /* ---------------- Start ---------------- */
  function boot() {
    root = document.getElementById('view');
    railEl = document.getElementById('rail');
    footEl = document.getElementById('footbar');

    document.getElementById('menu-btn').addEventListener('click', openMenu);
    document.getElementById('brand').addEventListener('click', function () { L.go('#/'); });
    document.getElementById('sheet').addEventListener('click', function (e) {
      if (e.target.id === 'sheet') e.target.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') document.getElementById('sheet').classList.remove('open');
    });
    document.addEventListener('xp:changed', updateBadges);
    window.addEventListener('hashchange', route);
    route();

    if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})(window.LEKTION);
