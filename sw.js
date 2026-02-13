const CACHE_NAME = "pain-assessment-v2"; // เปลี่ยนชื่อเวอร์ชั่นเมื่อแก้โค้ด
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./logo.jpeg",   // ตรวจสอบว่าไฟล์จริงเป็น .jpeg หรือ .jpg
  "./icon-192.png",
  "./1.jpg", 
  "./2.jpg", 
  "./3.jpg", 
  "./4.jpg",
  "./5.jpg", 
  "./6.jpg", 
  "./7.jpg", 
  "./8.jpg"
];

// ติดตั้งและ Cache ไฟล์
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ดึงไฟล์จาก Cache เมื่อไม่มีเน็ต
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
