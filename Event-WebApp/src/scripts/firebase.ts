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

// Optional: Analytics
let analytics;
analyticsSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

const messaging = getMessaging(app);

/**
 * Holt den FCM Token mit einer übergebenen Service Worker Registrierung.
 */
export async function fetchFcmToken(registration: ServiceWorkerRegistration): Promise<string | null> {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    return token;
  } catch (err) {
    console.warn('FCM-Token konnte nicht geholt werden:', err);
    return null;
  }
}

export { app, analytics, messaging, onMessage };
