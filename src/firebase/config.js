// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD9aIKkLMo02AGuATMFCmSaimqHFmgNStU",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "peerconnect-29624.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "peerconnect-29624",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "peerconnect-29624.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "207308484699",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:207308484699:web:e0fb497344145055f28f7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

console.log('✅ Firebase configuration loaded successfully');

export default app;
