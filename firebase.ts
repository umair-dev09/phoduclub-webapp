
// firebase.ts

import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCMz_lLMxo8lKAhc72m-kKiRyOZXrRONrY",
    authDomain: "phodu-club.firebaseapp.com",
    projectId: "phodu-club",
    storageBucket: "phodu-club.appspot.com",
    messagingSenderId: "169021243686",
    appId: "1:169021243686:web:1bebef5b42a90ebfb9c1e7",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// Get Auth instance
const auth = getAuth(app);
auth.useDeviceLanguage;
const db = getFirestore(app);
export { auth ,db};
