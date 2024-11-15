// service-worker.js
// 서비스 워커 설치 이벤트
self.addEventListener("install", (event) => {
  self.skipWaiting(); // 새 서비스 워커가 즉시 활성화되도록 합니다.
});

// 서비스 워커 활성화 이벤트
self.addEventListener("activate", (event) => {
  self.clients.claim(); // 새 서비스 워커가 즉시 활성화되도록 합니다.
});

// 요청 가로채기 이벤트
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
