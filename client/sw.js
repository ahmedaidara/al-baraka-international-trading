const CACHE_NAME = "abit-v1";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "../shared/css/design-system.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // Ne jamais mettre en cache les données Firebase / API sensibles
  if (event.request.url.includes("firestore") || 
      event.request.url.includes("googleapis") ||
      event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        // Cache uniquement les assets statiques publics
        if (response.ok && (event.request.url.includes(".css") || event.request.url.includes(".js") || event.request.url.includes("icons/"))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Page hors ligne simple
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
