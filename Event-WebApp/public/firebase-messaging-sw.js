// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

/*
firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});*/

firebase.initializeApp({
  apiKey: "AIzaSyAPW1bXotTgbEdA5szLIuPCwR_64rTCDZg",
  authDomain: "event-webapp-40477.firebaseapp.com",
  projectId: "event-webapp-40477",
  storageBucket: "event-webapp-40477.firebasestorage.app",
  messagingSenderId: "906690214531",
  appId: "1:906690214531:web:dde39d9cb120c4c67c79b6",
  measurementId: "G-J0DVNGWEYS"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png',
    data: {
      url: payload.data?.url
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close()
  const url = event.notification?.data?.url || '/news' // fallback

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        
        // Falls Tab schon offen, wechseln und navigieren
        if (client.url.includes('/') && 'focus' in client) {
          client.postMessage({ action: 'navigate', url })
          return client.focus()
        }
      }
      // Ansonsten neuen Tab öffnen
      return clients.openWindow(url)
    })
  )
})
