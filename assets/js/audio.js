/* Sprachen - Folgen finden und abspielen.
   Statt auf eine Website zu verlinken, holt die App über die öffentliche
   iTunes-Lookup-Schnittstelle die Folgenliste eines Podcasts und spielt die
   Audiodatei direkt ab. Kein Abo, kein Login, keine Suche nach der Folge.

   Zwei Wege, weil einer immer klemmt:
     1. fetch()  - itunes.apple.com liefert CORS-Freigabe
     2. JSONP    - <script>-Tag, funktioniert auch über file:// ohne CORS
   Klappt beides nicht, gibt es einen ehrlichen Hinweis plus Direktlink. */
(function (L) {
  'use strict';
  var h = L.h;

  var cache = {};

  function endpoint(id, country) {
    return 'https://itunes.apple.com/lookup?id=' + encodeURIComponent(id) +
      '&country=' + encodeURIComponent(country || 'us') +
      '&media=podcast&entity=podcastEpisode&limit=40';
  }

  function viaFetch(url) {
    if (typeof fetch !== 'function') return Promise.reject(new Error('kein fetch'));
    return fetch(url, { mode: 'cors', credentials: 'omit' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }

  function viaJsonp(url) {
    return new Promise(function (resolve, reject) {
      var name = '__lek_cb_' + Math.random().toString(36).slice(2);
      var s = document.createElement('script');
      var timer = setTimeout(function () { cleanup(); reject(new Error('Zeitüberschreitung')); }, 12000);
      function cleanup() {
        clearTimeout(timer);
        try { delete window[name]; } catch (e) { window[name] = undefined; }
        if (s.parentNode) s.parentNode.removeChild(s);
      }
      window[name] = function (data) { cleanup(); resolve(data); };
      s.onerror = function () { cleanup(); reject(new Error('Skript blockiert')); };
      s.src = url + '&callback=' + name;
      document.head.appendChild(s);
    });
  }

  /* Liefert { show, episodes:[{title, date, ms, url, page, desc}] } */
  L.podcast = function (id, country) {
    var key = id + '|' + (country || 'us');
    if (cache[key]) return cache[key];
    var url = endpoint(id, country);
    var pr = viaFetch(url)
      .catch(function () { return viaJsonp(url); })
      .then(function (data) {
        var res = (data && data.results) || [];
        var show = res.filter(function (r) { return r.wrapperType !== 'podcastEpisode'; })[0] || {};
        var eps = res.filter(function (r) { return r.wrapperType === 'podcastEpisode' && r.episodeUrl; })
          .map(function (r) {
            return {
              title: r.trackName || '',
              date: (r.releaseDate || '').slice(0, 10),
              ms: r.trackTimeMillis || 0,
              url: r.episodeUrl,
              page: r.trackViewUrl || '',
              desc: (r.shortDescription || r.description || '').replace(/<[^>]*>/g, '').trim()
            };
          })
          .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
        if (!eps.length) throw new Error('keine Folgen gefunden');
        return { show: { name: show.collectionName || '', art: show.artworkUrl100 || '', page: show.collectionViewUrl || '' }, episodes: eps };
      });
    cache[key] = pr;
    pr.catch(function () { delete cache[key]; });
    return pr;
  };

  L.fmtLen = function (ms) {
    if (!ms) return '';
    var m = Math.round(ms / 60000);
    return m + ' min';
  };
  L.fmtDay = function (iso, lang) {
    if (!iso) return '';
    var loc = { es: 'es-ES', fr: 'fr-FR' }[lang] || 'de-CH';
    try {
      return new Date(iso + 'T12:00:00').toLocaleDateString(loc, { day: 'numeric', month: 'long' });
    } catch (e) { return iso; }
  };

  /* ---------------------------------------------------------------
     Spieler: sucht die passende Folge, zeigt Titel und Datum an,
     spielt direkt ab. Mit Umschalter auf ältere Folgen.
     --------------------------------------------------------------- */
  L.player = function (src, lang, onEpisode) {
    var box = h('div', { class: 'player' });
    var status = h('div', { class: 'player-status' }, [
      h('span', { class: 'spinner', 'aria-hidden': 'true' }),
      h('span', { text: L.t('a.searching') })
    ]);
    box.appendChild(status);

    var minM = src.minMinutes || 0;
    var maxM = src.maxMinutes || 9999;

    L.podcast(src.itunesId, src.country).then(function (data) {
      var fit = data.episodes.filter(function (e) {
        var m = e.ms / 60000;
        return !e.ms || (m >= minM && m <= maxM);
      });
      var list = (fit.length ? fit : data.episodes).slice(0, 12);
      render(list, data);
    }).catch(function (err) {
      status.remove();
      box.appendChild(fallback(src, err));
    });

    function render(list, data) {
      status.remove();
      var idx = 0;
      var audio = h('audio', { controls: 'controls', preload: 'none', class: 'player-audio' });
      var title = h('div', { class: 'ep-title' });
      var meta = h('div', { class: 'ep-meta' });

      function pick(i) {
        idx = i;
        var e = list[i];
        audio.src = e.url;
        title.textContent = e.title;
        meta.innerHTML = '';
        meta.appendChild(h('span', { class: 'tag', text: L.fmtDay(e.date, lang) }));
        if (e.ms) meta.appendChild(h('span', { class: 'tag', text: L.fmtLen(e.ms) }));
        meta.appendChild(h('a', { class: 'tag link', href: e.url, target: '_blank', rel: 'noopener',
          text: L.t('a.file') }));
        if (onEpisode) onEpisode(e);
      }

      box.appendChild(h('div', { class: 'ep-head' }, [
        h('div', { class: 'ep-live', text: L.t('a.found') }),
        title, meta
      ]));
      box.appendChild(audio);

      if (list.length > 1) {
        var more = h('details', { class: 'ep-more' });
        more.appendChild(h('summary', { text: L.t('a.other', { n: list.length - 1 }) }));
        var ul = h('div', { class: 'ep-list' });
        list.forEach(function (e, i) {
          var b = h('button', { class: 'ep-item', type: 'button' }, [
            h('span', { class: 'ep-item-t', text: e.title }),
            h('span', { class: 'ep-item-m', text: L.fmtDay(e.date, lang) + (e.ms ? ' · ' + L.fmtLen(e.ms) : '') })
          ]);
          b.addEventListener('click', function () {
            ul.querySelectorAll('.ep-item').forEach(function (o) { o.classList.remove('on'); });
            b.classList.add('on');
            pick(i);
            audio.play().catch(function () {});
            L.fx.tap();
          });
          ul.appendChild(b);
        });
        more.appendChild(ul);
        box.appendChild(more);
        ul.querySelectorAll('.ep-item')[0].classList.add('on');
      }
      pick(0);
    }

    function fallback(src, err) {
      var wrap = h('div', { class: 'player-fail' });
      wrap.appendChild(h('div', { class: 'pf-head' }, [
        h('span', { text: '⚠' }),
        h('span', { text: L.t('a.failTitle') })
      ]));
      wrap.appendChild(h('p', { class: 'muted', text: L.t('a.failText') }));
      var row = h('div', { class: 'row', style: 'margin-top:10px' });
      if (src.homepage) {
        row.appendChild(h('a', { class: 'btn btn-sm', href: src.homepage, target: '_blank', rel: 'noopener',
          text: L.t('a.website') + ' ↗' }));
      }
      row.appendChild(h('a', {
        class: 'btn btn-sm', target: '_blank', rel: 'noopener',
        href: 'https://podcasts.apple.com/podcast/id' + src.itunesId,
        text: 'Apple Podcasts ↗'
      }));
      wrap.appendChild(row);
      wrap.appendChild(h('p', { class: 'muted', style: 'margin-top:8px;font-size:11.5px',
        text: '(' + (err && err.message ? err.message : 'unbekannter Fehler') + ')' }));
      return wrap;
    }

    return box;
  };

})(window.LEKTION);
