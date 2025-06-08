// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './scripts/i18n.js';
import { messaging, onMessage, getToken } from './scripts/firebase';
import './assets/main.css';
import router from './router';
import { baseUrl, applyTheme } from './scripts/functions.ts';

const app = createApp(App);

// Logic for dark mode
const storedTheme = localStorage.getItem('theme');
//const theme = ['light', 'dark', 'system'].includes(storedTheme ?? '') ? storedTheme : 'system';
const theme = storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
  ? storedTheme
  : 'system';

applyTheme(theme);

/*
// ----- Service Worker registriation (Important) -----
// Promise for Service Worker Registration
let serviceWorkerRegistrationPromise: Promise<ServiceWorkerRegistration | null>;

if ('serviceWorker' in navigator) {
  serviceWorkerRegistrationPromise = navigator.serviceWorker.register(`${baseUrl}firebase-messaging-sw.js`, {
      scope: `${baseUrl}` // Scope for the service worker path
    })
    .then((registration) => {
      console.log('[FCM] Service Worker successfully registered with scope:', registration.scope);
      return registration; // Return the registration
    })
    .catch((error) => {
      console.error('[FCM] Service Worker Registration failed:', error);
      return null;
    });
} else {
  console.warn('Service Workers are not supported by this browser. Push messages may not function.');
  serviceWorkerRegistrationPromise = Promise.resolve(null); // Resolve with null if service workers are not supported
}

// ----- Firebase Cloud Messaging (FCM) Logik -----
// Warten Sie auf die Service Worker Registrierung, BEVOR Sie getToken aufrufen.
serviceWorkerRegistrationPromise
  .then((registration) => {
    if (registration) {
      console.log('FCM Messaging Service Worker ist bereit:', registration);

      // Receive messages when the app is in the foreground
      // Übergeben Sie die ServiceWorkerRegistration direkt an onMessage
      onMessage(messaging, (payload) => { // KEINE OPTIONS HIER! onMessage akzeptiert keine SW-Optionen.
        console.log('Received message (foreground):', payload);
        // Hier können Sie eine benutzerdefinierte UI-Benachrichtigung anzeigen
      });

      // Get FCM registration token
      // Fordern Sie die Berechtigung direkt hier an, da es ein User-zentrierter Prozess ist.
      // Firebase wird die Berechtigung bei getToken anfordern, wenn sie noch nicht erteilt wurde.
      return Notification.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            // HIER ist der entscheidende Punkt: serviceWorkerRegistration Option
            return getToken(messaging, {
              vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
              serviceWorkerRegistration: registration // <-- Diese Option ist entscheidend!
            });
          } else {
            console.log('Benachrichtigungsberechtigung verweigert.');
            return null;
          }
        });
    } else {
      console.warn('Firebase Messaging Service Worker konnte nicht registriert werden. Keine Push-Nachrichten.');
      return null; // Kein Token, da SW nicht registriert
    }
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      // Senden Sie dieses Token an Ihren Backend-Server, um Push-Benachrichtigungen zu senden.
    } else {
      console.log('Kein Registrierungstoken verfügbar oder Berechtigung verweigert.');
    }
  })
  .catch((err) => {
    console.error('An error occurred during FCM initialization or token retrieval. ', err);
  });
*/

// Vue App Mounten
app.use(i18n);
app.use(router);
app.mount('#app');
