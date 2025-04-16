// ********************************************************** //
//                       CODED BY                             //
//                  Mad Cre@tive Lab                          //                                           
// ********************************************************** //



const CACHE_NAME = 'whatsapp-clone-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/appicon.png',
    '/appicon.png',
    '/img/qanta-192.png',
    '/img/qanta-512.png',
    '/manifest.json'
    
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

/* self.addEventListener('install', event => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);

}); */

self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});


self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: './appicon.png',
        badge: './badge.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

