importScripts("https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: process.env.VITE_REACT_APP_API_KEY, // define 주입된 값으로 대체
  authDomain: process.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: process.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: process.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.VITE_REACT_APP_APP_ID,
  measurementId: process.env.VITE_REACT_APP_MEASUREMENT_ID,
});

// Messaging 생성
const messaging = firebase.messaging();

// 백그라운드 메시지
messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지:", payload);

  if (payload.notification) {
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
    });
  } else {
    console.warn("Notification payload가 비어 있음");
  }
});
