// PWA Disabled: Self-unregister service worker and clear caches
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.registration.unregister().then(() => {
    return self.clients.matchAll();
  }).then((clients) => {
    clients.forEach((client) => {
      if (client.url && 'navigate' in client) {
        client.navigate(client.url);
      }
    });
  });
});