console.log(self);
self.addEventListener('install', (event) => {
    console.log('[SW] Install:', event);
});




self.addEventListener('fetch', () => {
return;
});