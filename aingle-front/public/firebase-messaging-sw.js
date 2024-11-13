// importScripts(
//   "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
// );

// self.addEventListener("install", function (e) {
//   self.skipWaiting();
// });

// self.addEventListener("activate", function (e) {
//   console.log("fcm service worker가 실행되었습니다.");
// });

// const firebaseConfig = {
//   apiKey: "AIzaSyCj8ziF_YZzfJCQAM7oOYIhJDI-c2-fOs8",
//   authDomain: "aingle-ab0b9.firebaseapp.com",
//   projectId: "aingle-ab0b9",
//   storageBucket: "aingle-ab0b9.firebasestorage.app",
//   messagingSenderId: "935748386192",
//   appId: "1:935748386192:web:5daa90f9e20041efb3c715",
//   measurementId: "G-J5271LZYWK",
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.title;
//   const notificationOptions = {
//     body: payload.body,
//     // icon: payload.icon
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // export function registerServiceWorker() {
// //   if ("serviceWorker" in navigator) {
// //     window.addEventListener("load", function () {
// //       navigator.serviceWorker
// //         .register("/firebase-messaging-sw.js")
// //         .then(function (registration) {
// //           console.log(
// //             "Service Worker가 scope에 등록되었습니다.:",
// //             registration.scope
// //           );
// //         })
// //         .catch(function (err) {
// //           console.log("Service Worker 등록 실패:", err);
// //         });
// //     });
// //   }
// // }
