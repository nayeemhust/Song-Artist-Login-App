console.log(self);
self.addEventListener('install', (event) => {
    console.log('[SW] Install:', event);
// Activate itself, no need to wait for the user to activate
    self.skipWaiting();


console.log(caches);
event.waitUntil(
    caches.open('cacheAssets')
.then((cache) => {
    console.log('Cache', cache)
    // cache.add('/index.html');
    // cache.add('/app.js');
    // cache.addAll([
    //     '/index.html',
    //     '/app.js']);

})
.catch((error) => {
    console.log('Cache failed', error);
})
);
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activate:', event);

// Immediately gets control over the client's page
    event.waitUntil(clients.claim());

    // This line will only be executed after 
    // getting control over all open pages.

})

self.addEventListener('fetch', (event) => {
event.respondWith(
    caches.match(event.request)
    .then((response) => {
        console.log('Response:', response);
        return response;
    })
    .catch((error) => {
    console.log('Match Failed:', error);
    })
);

});