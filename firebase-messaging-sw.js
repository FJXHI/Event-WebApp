// Event-Webapp/Public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.9.0/firebase-messaging-compat.js');

// Firebase-Configuration
/*
// Dont work
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};*/


const firebaseConfig = {
  apiKey: "AIzaSyAPW1bXotTgbEdA5szLIuPCwR_64rTCDZg",
  authDomain: "event-webapp-40477.firebaseapp.com",
  projectId: "event-webapp-40477",
  storageBucket: "event-webapp-40477.firebasestorage.app",
  messagingSenderId: "906690214531",
  appId: "1:906690214531:web:dde39d9cb120c4c67c79b6",
  measurementId: "G-J0DVNGWEYS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//import config from "./firebase.config.ts";
//firebase.initializeApp(config);

const messaging = firebase.messaging();

// recive background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[FCM] Message received background:', payload);

  const notificationTitle = payload.notification.title || 'Nachricht';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png',
    data: {
      url: payload.data?.url
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

