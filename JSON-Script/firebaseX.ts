const registration = await navigator.serviceWorker.ready;

const messaging = firebase.messaging();

const token = await messaging.getToken({
            serviceWorkerRegistration: registration,
            vapidKey: "",
        });

const vapidKey = 'foo123...';
const serviceWorkerRegistration = await navigator
    .serviceWorker
    .register('/build/firebase-messaging-service-worker.js');

await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration,
})