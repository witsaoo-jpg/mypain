const CACHE_NAME = 'pain-app-v2';
const assets = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'logo.jpg',
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // ใช้ addAll แบบระมัดระวัง ถ้าไฟล์ใดไฟล์หนึ่งหายไป ตัวอื่นจะไม่ถูก cache เลย
      return cache.addAll(assets).catch(err => console.error("Cache Error:", err));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
