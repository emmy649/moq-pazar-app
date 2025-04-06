self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
});

self.addEventListener('fetch', function (event) {
  // може да кешираш тук, ако искаш офлайн версия
});
