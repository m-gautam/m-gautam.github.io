const cacheName = 'v2';

const cacheAssets = [
    'home.html',
    '/js/main.js',
    '/styles/style.css'
]

// call install event
self.addEventListener('install', (e) => {
    console.log('service worker installed');

    e.waitUntil(
        caches.open(cacheName)
            .then(
                cache => {
                    console.log('Service Worker: Caching Files');
                    cache.addAll(cacheAssets);
                }
            )
            .then(
                () => self.skipWaiting()
            )
    )
})

// call activate event
self.addEventListener('activate', (e) => {
    console.log('service worker activated');

    caches.keys().then(
        cacheNames => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        }
    )

})

// call fetch event
self.addEventListener('fetch',
    e => {
        console.log('Service Worker fetching');
        e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    })


