// Firebase 라이브러리 가져오기 (importScripts 사용)
importScripts("https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging.js");

// Firebase 초기화
firebase.initializeApp({
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신:", payload);

  if (payload.notification) {
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
    });
  } else {
    console.warn("Notification payload가 비어 있습니다.");
  }
});
