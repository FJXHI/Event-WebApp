// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './scripts/i18n.js'
//import { messaging, onMessage, fetchFcmToken } from './scripts/firebase';
import { messaging, onMessage, getToken } from './scripts/firebase.ts';
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

// Receive messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log('Received message:', payload);
  console.log('onMessage');
});


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY }).then((currentToken) => {
  if (currentToken) {
    console.log('FCM Token:', currentToken);
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});



const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');
