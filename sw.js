/* ================================================
   NERO ADMIN — SERVICE WORKER
   Handles: offline caching, push notifications
================================================ */

const CACHE_NAME    = "nero-admin-v1";
const OFFLINE_PAGE  = "/pages/admin.html";

// Assets to cache on install for offline use
const PRECACHE = [
  "/pages/admin.html",
  "/pages/admin-manifest.json",
  "/css/style.css",
  "/js/theme.js",
  "/js/script.js",
  "/images/nerologo2.png",
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500&display=swap"
];

/* ── INSTALL: pre-cache all assets ── */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

/* ── ACTIVATE: clean old caches ── */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── FETCH: serve from cache, fall back to network ── */
self.addEventListener("fetch", event => {
  // Skip non-GET and Firebase/Google API requests — always go to network for those
  if (
    event.request.method !== "GET" ||
    event.request.url.includes("firestore") ||
    event.request.url.includes("firebase") ||
    event.request.url.includes("googleapis") && !event.request.url.includes("fonts")
  ) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful responses
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback: return cached admin page
        if (event.request.destination === "document") {
          return caches.match(OFFLINE_PAGE);
        }
      });
    })
  );
});

/* ── PUSH NOTIFICATIONS ── */
self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};

  const title   = data.title   || "NERO Admin";
  const options = {
    body:    data.body    || "You have a new notification.",
    icon:    "/images/nerologo2.png",
    badge:   "/images/nerologo2.png",
    vibrate: [100, 50, 100],
    data:    { url: data.url || "/pages/admin.html" },
    actions: [
      { action: "open",    title: "Open Admin" },
      { action: "dismiss", title: "Dismiss"    }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/* ── NOTIFICATION CLICK ── */
self.addEventListener("notificationclick", event => {
  event.notification.close();

  if (event.action === "dismiss") return;

  const url = event.notification.data?.url || "/pages/admin.html";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      // If admin tab already open, focus it
      for (const client of clientList) {
        if (client.url.includes("admin") && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

/* ── BACKGROUND SYNC (for offline price updates) ── */
self.addEventListener("sync", event => {
  if (event.tag === "sync-prices") {
    event.waitUntil(syncPendingUpdates());
  }
});

async function syncPendingUpdates() {
  // This fires when connectivity is restored
  // Actual sync logic is handled in admin.html via IndexedDB
  const allClients = await clients.matchAll();
  allClients.forEach(client => {
    client.postMessage({ type: "SYNC_READY" });
  });
}

