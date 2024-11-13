/// <reference lib="webworker" />

import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};

// Firebase 초기화
initializeApp(firebaseConfig);
const messaging = getMessaging();

// 백그라운드 메시지 처리
onBackgroundMessage(messaging, (payload) => {
  console.log("백그라운드 메시지 수신:", payload);

  if (payload.notification) {
    (self as unknown as ServiceWorkerGlobalScope).registration.showNotification(
      payload.notification.title!,
      {
        body: payload.notification.body,
      }
    );
  } else {
    console.warn("Notification payload가 비어 있습니다.");
  }
});
