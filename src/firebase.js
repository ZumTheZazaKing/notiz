import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "notiz-43cf2.firebaseapp.com",
    projectId: "notiz-43cf2",
    storageBucket: "notiz-43cf2.appspot.com",
    messagingSenderId: "60840552390",
    appId: "1:60840552390:web:544d285c83eda686fcb4c7",
    measurementId: "G-SVCW1W8E0S"
}

export const firebaseApp = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
