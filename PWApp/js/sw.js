const CACHE_NAME = 'cache-app-v1';
const urlsToCache = [
    "/", 
    "/index.html",
    "/page1.html",
    "/page2.html",
    "/page3.html",
    "/offline.html", // Página para offline
    "/css/styles.css",
    "/js/app.js",
    "/js/geolocation.js",
    "/js/indexeddb.js",
    "/img/icons/icon-192x192.png",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
];

// Evento de instalación: cachear recursos estáticos
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Almacenando recursos estáticos...');
            return cache.addAll(urlsToCache);
        })
    );
});

// Evento de activación: eliminar cachés antiguos
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activando...');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('[Service Worker] Eliminando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Evento de recuperación de recursos: buscar en caché o en la red
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        // Para solicitudes de navegación, intenta servir desde caché o una página offline
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || caches.match('/offline.html');
            })
        );
    } else {
        // Para otros recursos (CSS, JS, imágenes), busca en caché o en la red
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});
