const cacheName = 'pain-app-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './1.jpg', './2.jpg', './3.jpg', './4.jpg', 
  './5.jpg', './6.jpg', './7.jpg', './8.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});