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

getToken(messaging, {
  vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
}).then((currentToken) => {
  if (currentToken) {
    console.log('Debug: FCM Token:', currentToken);
  } else {
    console.warn('No registration token available.');
  }
}).catch((err) => {
  console.error('An error occurred while retrieving token.', err);
});

// Revice messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data?.action === 'navigate') {
    const url = event.data.url
    window.location.hash = url // z. B. /#/news?id=123
  }
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
