importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBfimOu2e0xAMoRyM-rwNMgAk9G_Hgt558',
  authDomain: 'blackrituals.firebaseapp.com',
  projectId: 'blackrituals',
  storageBucket: 'blackrituals.firebasestorage.app',
  messagingSenderId: '511685923038',
  appId: '1:511685923038:web:4db052df64ebb1e194724f'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: 'https://i.postimg.cc/mD0dbHM0/1000287857.png'
  });
});
