/* English for Mum — service worker (generated at build time). */
const VERSION = '20261003-supabase3';
const SHELL = 'efm-shell-' + VERSION;
const RUNTIME = 'efm-runtime-v1';
const PRECACHE = ["./assets/app-4SPHSBLZ.css","./assets/app-ICOKYTHB.js","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./index.html","./invite.html","./manifest.webmanifest","./"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('efm-shell-') && k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Never cache API / auth / speech traffic.
  if (/supabase\.co|microsoft\.com|anthropic\.com/.test(url.host) || url.pathname.includes('/functions/v1/')) return;
  // Runtime config always from network first (so credentials can be changed without rebuild).
  if (url.origin === self.location.origin && url.pathname.endsWith('/config.js')) {
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(RUNTIME).then((c) => c.put(req, copy)); return r; }).catch(() => caches.match(req)));
    return;
  }
  // Fonts: stale-while-revalidate.
  if (/fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith(caches.open(RUNTIME).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((r) => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  // App shell: cache first, navigation falls back to index.html.
  e.respondWith(
    caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then((hit) => hit || fetch(req).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : undefined)),
  );
});

self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });
