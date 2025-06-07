// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './scripts/i18n.js'
import { messaging, onMessage, fetchFcmToken } from './scripts/firebase';
import './assets/main.css'
import router from './router'
import { applyTheme } from './scripts/functions.ts'

//logic for dark mode
const storedTheme = localStorage.getItem('theme');
//const theme = ['light', 'dark', 'system'].includes(storedTheme ?? '') ? storedTheme : 'system';
const theme = storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
  ? storedTheme
  : 'system'

applyTheme(theme);



// Einmalige Service Worker Registrierung + FCM Token holen
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Event-WebApp/firebase-messaging-sw.js', {
    scope: '/Event-WebApp/',
  })
    .then(async (registration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await fetchFcmToken(registration);
        if (token) {
          console.log('FCM Token:', token);
          // Optional: an Backend senden
          alert(token); // Nur zu Debugzwecken
        } else {
          console.warn('Kein FCM-Token verfügbar.');
        }
      } else {
        console.warn('Benachrichtigungsberechtigung nicht erteilt.');
      }
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}

// Nachrichten im Vordergrund empfangen
onMessage(messaging, (payload) => {
  console.log('Foreground-Nachricht empfangen:', payload);
  // Optional: UI-Benachrichtigung anzeigen
});

// Kommunikation vom Service Worker zur App
navigator.serviceWorker.addEventListener('message', (event) => {
  console.log('Message vom Service Worker:', event.data);
  if (event.data?.action === 'navigate') {
    const url = event.data.url;
    router.push(url).catch((err) => {
      console.error('Navigation fehlgeschlagen:', err);
    });
  }
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');


/*

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Event-WebApp/firebase-messaging-sw.js', {
    scope: '/Event-WebApp/'
  })
  .then(function (registration) {
    console.log('Service Worker registered with scope:', registration.scope);
  })
  .catch(function (err) {
    console.log('Service Worker registration failed:', err);
  });
}



// *** Start of the updated FCM Token Retrieval Logic ***




async function initializeFCM() {
  try {
    // Request permission to receive notifications
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('Notification permission granted.');

      // --- Crucial Step: Explicitly register your service worker ---

      // Scope dont work
      //const registration = await navigator.serviceWorker.register('/Event-WebApp/firebase-messaging-sw.js', { scope: '/' });
      const registration = await navigator.serviceWorker.register('/Event-WebApp/firebase-messaging-sw.js');
      console.log('Service worker registered with scope: ', registration.scope);

      // Pass the service worker registration to getToken
      // Also include your vapidKey here
      const currentToken = await getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });

      if (currentToken) {
        console.log('Debug: FCM Token:', currentToken);
        alert(currentToken);
        // Here is where you would typically send the token to your backend server
        // ...
      } else {
        // Show permission request UI if needed, though Notification.requestPermission() handles most of this
        console.warn('No registration token available.');
      }
    } else {
      console.warn('Unable to get permission to notify.');
      // Handle cases where permission is denied or not granted
    }
  } catch (err) {
    console.error('An error occurred during FCM setup or token retrieval.', err);
    // Handle specific errors, e.g., unsupported browser, network issues
  }
}

// Call the asynchronous function to start the FCM setup and token retrieval
initializeFCM();

// *** End of the updated FCM Token Retrieval Logic ***


// Revice messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // You might want to display a notification to the user here
  // For example, using the Notification API or a custom UI element
});

// Listener for messages from the service worker
// This is useful if your service worker needs to communicate something back to the main app thread
navigator.serviceWorker.addEventListener('message', (event) => {
  console.log('Message from service worker:', event.data);
  if (event.data?.action === 'navigate') {
    const url = event.data.url
    // Use Vue Router's navigation if available and appropriate
    router.push(url).catch(err => {
        // Handle potential navigation errors
        console.error('Navigation failed:', err);
        // Fallback to window.location.hash if needed
        // window.location.hash = url;
    });
  }
});*/