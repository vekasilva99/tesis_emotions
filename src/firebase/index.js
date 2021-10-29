import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCpNmtdgezrlMVZTyXB5K5vLJWLm7gj1UU",
    authDomain: "emotions-ai.firebaseapp.com",
    projectId: "emotions-ai",
    storageBucket: "emotions-ai.appspot.com",
    messagingSenderId: "976666424532",
    appId: "1:976666424532:web:5d02b66af56e7ea1217741",
    measurementId: "G-8TVFLLCH0C"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export {storage, firebase as default};