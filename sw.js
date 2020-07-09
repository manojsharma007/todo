var OFFLINE_VERSION = 0;
var CACHE_NAME = 'offline';
var OFFLINE_URL = '/offline.html';
self.addEventListener('install', function (event) {
    event.waitUntil(async function () {
        var cache = await caches.open(CACHE_NAME);
        await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
    }());
});

self.addEventListener('activate', function (event) {
    event.waitUntil(async function () {
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    }());
    self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    if (event.request.mode === 'navigate') {
        event.respondWith(async function () {
            try {
                var preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }
                var networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                var cache = await caches.open(CACHE_NAME);
                var cachedResponse = await cache.match(OFFLINE_URL);
                return cachedResponse;
            }
        }());
    }
});