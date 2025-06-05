// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAnWiqD1x0w7EtgmOKVKKiaTTiULfL6b2Y",
  authDomain: "event-webapp-9c1d8.firebaseapp.com",
  projectId: "event-webapp-9c1d8",
  storageBucket: "event-webapp-9c1d8.firebasestorage.app",
  messagingSenderId: "882680103294",
  appId: "1:882680103294:web:502ee00cb8ac885869332f",
  measurementId: "G-VPE3DN8Q14"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
