const CACHE_NAME = 'pain-app-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './logo.jpg',
  './1.jpg',
  './2.jpg',
  './3.jpg',
  './4.jpg',
  './5.jpg',
  './6.jpg',
  './7.jpg',
  './8.jpg',
  './icon-192.png',
  './icon-512.png'
];

// ติดตั้ง Service Worker และ Cache ไฟล์
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// ดึงข้อมูลจาก Cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
