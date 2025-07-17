import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import {
  initializeFirestore,
  persistentLocalCache
} from "firebase/firestore";

// Use your actual Firebase config here
const firebaseConfig = {
    apiKey: "AIzaSyC_kz802asczkQ31Ju0UguYDZ4m3f12wgo",
    authDomain: "movie-watchlist-5b732.firebaseapp.com",
    projectId: "movie-watchlist-5b732",
    storageBucket: "movie-watchlist-5b732.firebasestorage.app",
    messagingSenderId: "951357228982",
    appId: "1:951357228982:web:4cfd99d153b6c98c2fa317",
    measurementId: "G-7D1SPQDQW9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});