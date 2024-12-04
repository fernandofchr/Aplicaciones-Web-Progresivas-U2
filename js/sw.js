const CACHE_ESTATICO = "cacheEstatico-v2";
const CACHE_DINAMICO = "cacheDinamico-v2";
const RECURSOS_ESTATICOS = [
    "/",
    "/index.html",
    //"/page1.html",
    //"/page2.html",
    //"/page3.html",
    "/offline.html", // Página para offline
    "/css/styles.css",
    "/js/app.js",
    "/js/geolocation.js",
    "/js/indexeddb.js",
    "/img/icons/icon-192x192.png",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
];


// Instalación: cachear recursos estáticos
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Instalando...");
    event.waitUntil(
        caches.open(CACHE_ESTATICO).then((cache) => {
            console.log("[Service Worker] Almacenando recursos estáticos...");
            return cache.addAll(RECURSOS_ESTATICOS);
        })
    );
});

// Activación: limpiar cachés antiguos
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activando...");
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_ESTATICO && key !== CACHE_DINAMICO) {
                        console.log("[Service Worker] Eliminando caché antiguo:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cacheResponse) => {
            // Retorna el recurso desde el caché si existe
            if (cacheResponse) {
                console.log("[Service Worker] Sirviendo desde caché:", event.request.url);
                return cacheResponse;
            }

            // Si no está en el caché, intenta obtenerlo desde la red
            return fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_DINAMICO).then((cache) => {
                        cache.put(event.request, networkResponse.clone()); // Cachear dinámicamente
                        return networkResponse;
                    });
                })
                .catch((error) => {
                    console.error("[Service Worker] No se pudo obtener el recurso:", error);
                    // Si no se puede obtener, no hace nada (evita mostrar una página offline).
                });
        })
    );
});

