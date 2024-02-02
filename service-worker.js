console.log(self);
self.addEventListener('install', (event) => {
    console.log('[SW] Install:', event);
// Activate itself, no need to wait for the user to activate
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activate:', event);

// Immediately gets control over the client's page
    event.waitUntil(clients.claim());

    // This line will only be executed after 
    // getting control over all open pages.
    
})


self.addEventListener('fetch', () => {
return;
});