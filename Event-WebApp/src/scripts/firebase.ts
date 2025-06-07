// src/scripts/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as analyticsSupported } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Optional: Analytics (funktioniert nur in HTTPS und in unterstützten Browsern)
let analytics;
analyticsSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Messaging vorbereiten
const messaging = getMessaging(app);

// Registriere Service Worker mit benutzerdefiniertem Pfad
navigator.serviceWorker.register('/Event-WebApp/firebase-messaging-sw.js')
  .then((registration) => {
    console.log('Service Worker registriert:', registration);
    // Token mit expliziter Übergabe der SW-Registrierung holen
    return getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
  })
  .then((token) => {
    console.log('FCM-Token:', token);
  })
  .catch((err) => {
    console.warn('FCM-Token konnte nicht geholt werden:', err);
  });

export { app, analytics, messaging, getToken, onMessage };
