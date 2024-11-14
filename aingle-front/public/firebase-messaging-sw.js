importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCj8ziF_YZzfJCQAM7oOYIhJDI-c2-fOs8",
  authDomain: "aingle-ab0b9.firebaseapp.com",
  projectId: "aingle-ab0b9",
  storageBucket: "aingle-ab0b9.firebasestorage.app",
  messagingSenderId: "935748386192",
  appId: "1:935748386192:web:5daa90f9e20041efb3c715",
  measurementId: "G-J5271LZYWK",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
  console.log("Service Worker activated");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request, { mode: "cors", cache: "no-store" }).catch(() => {
      return new Response("Network error occurred", { status: 408 });
    })
  );
});

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || "Default Title";
  const notificationOptions = {
    body: payload.notification.body || "Default body",
    icon: payload.notification.icon || "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
