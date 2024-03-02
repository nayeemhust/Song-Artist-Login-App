const cacheStorage = 'NazmulMusicApp';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheStorage)
            .then( (cache) => {
                cache.addAll([
                    '/index.html',
                    '/main.css',
                    '/images/MusicApp Icon.png',
                    '/js/app.js',
                    '/manifest.json',
                    '/icons',
                    '/service-worker.js',
                    '/icons/favicon-32x32.png',
                    '/icons/android-chrome-192x192.png'
                ]);
            })
            .catch(error => {
                console.error('Failed to cache some resources:', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            clients.claim(),
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.filter((cacheName) => cacheName !== cacheStorage)
                        .map((cacheName) => caches.delete(cacheName))
                );
            })
        ])
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return networkFallback(event.request);
            })
            .catch(() => {
                // Handle errors if needed
            })
    );
});

function networkFallback(request) {
    return fetch(request)
        .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return networkResponse;
            }

            const responseToCache = networkResponse.clone();

            caches.open(cacheStorage)
                .then((cache) => {
                    cache.put(request, responseToCache);
                });

            return networkResponse;
        })
        .catch(() => {
            // Handle errors if needed
        });
}
