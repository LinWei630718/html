const CACHE_NAME = 'big2-cache-v1';
const urlsToCache = [
  './twbig2.html',
  './manifest.json',
  // 如果你有放圖片圖示，也要加進來
  './icon-192.png',
  './icon-512.png'
];

// 安裝時將核心檔案存入快取
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截請求，優先從快取讀取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取裡有，就直接回傳快取；沒有就去網路抓
        return response || fetch(event.request);
      })
  );
});
