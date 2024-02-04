const cacheStorage = 'Nazmul Music App';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheStorage)
            .then((cache) => {
                return cache.addAll([
                    '/index.html',
                    '/main.css',
                    '/images/MusicApp Icon.png',
                    '/app.js',
                    '/manifest.json',
                    '/icons',
                    '/service-worker.js',
                    '/icons/favicon-32x32.png',
                    '/icons/android-chrome-192x192.png'
                ]);
            })
    );
});
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            clients.claim(),
            caches.keys().then((cName) => {
                return Promise.all(
                    cName
                        .filter((name) => name !== cacheStorage)
                        .map((cacheDelete) => {
                            return caches.delete(cacheDelete);
                        })
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
            })
    );
});

function networkFallback(reqq) {
    return caches.open(cacheStorage)
        .then(cache => {
            const res = cache.match(reqq);
            const req = fetch(reqq);

            return Promise.all([res, req])
                .then(([res, netRes]) => {
                    if (netRes && netRes.status === 200) {
                        cache.put(reqq, netRes.clone());
                    }
                    return netRes || res;
                })
                .catch(() => {
                    return res;
                });
        });
}
