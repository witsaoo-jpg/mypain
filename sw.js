const CACHE_NAME = "pain-assessment-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./logo.jpeg",
  "./1.jpg", 
  "./2.jpg", 
  "./3.jpg", 
  "./4.jpg",
  "./5.jpg", 
  "./6.jpg", 
  "./7.jpg", 
  "./8.jpg"
  // อย่าลืมใส่ไฟล์ icon-192.png ถ้ามี
];

// ติดตั้ง Service Worker และ Cache ไฟล์
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets");
      return cache.addAll(ASSETS);
    })
  );
});

// ดึงไฟล์จาก Cache เมื่อออฟไลน์
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
