importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDovs02EzOw0Ldd4IjoOMzoNJ22ckUFI0Y",
    authDomain: "bdproyectospc.firebaseapp.com",
    projectId: "bdproyectospc",
    storageBucket: "bdproyectospc.appspot.com",
    messagingSenderId: "314363157691",
    appId: "1:314363157691:web:f18bdf84472d4ab5b35d9e",
    measurementId: "G-YGZJ6VYD32"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
