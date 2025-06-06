// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './scripts/i18n.js'
import { messaging, getToken, onMessage } from './scripts/firebase';
import './assets/main.css'
import router from './router'
import { applyTheme } from './scripts/functions.ts'

//logic for dark mode
const storedTheme = localStorage.getItem('theme')
const theme = storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
  ? storedTheme
  : 'system'

applyTheme(theme)

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
});


const app = createApp(App)
app.use(i18n)
app.use(router) // Make sure router is initialized before being used
app.mount('#app')
