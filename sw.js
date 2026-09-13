/* Sprachen - Service Worker.
   Alles Eigene wird vorgeladen, damit die App offline startet.
   Fremde Audioquellen werden bewusst NICHT abgefangen (CORS/Urheberrecht). */
const VERSION = 'sprachen-v1';
/* PRECACHE:BEGIN - von tools/build-manifest.mjs erzeugt, nicht von Hand ändern */
const PRECACHE = [
  "./",
  "./index.html",
  "./app.webmanifest",
  "./assets/css/app.css",
  "./assets/icons/icon.svg",
  "./assets/js/core.js",
  "./assets/js/i18n.js",
  "./assets/js/audio.js",
  "./assets/js/tasks.js",
  "./assets/js/stations.js",
  "./assets/js/app.js",
  "./learner/profile.js",
  "./lessons/manifest.js",
  "./lessons/es/2026-09-13-moto.js",
  "./lessons/fr/2026-09-13-soiree-ratee.js"
];
/* PRECACHE:END */

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => Promise.allSettled(PRECACHE.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // Podcasts & Co. gehen direkt ins Netz

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) {
        // Im Hintergrund auffrischen, damit neue Lektionen ankommen
        fetch(req).then((res) => {
          if (res && res.ok) caches.open(VERSION).then((c) => c.put(req, res.clone()));
        }).catch(() => {});
        return hit;
      }
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
