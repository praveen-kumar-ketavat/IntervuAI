// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBASuDigx9tJeYGizovudbRjF9hZJw3DNU",
  authDomain: "ai-mock-interviews-5d264.firebaseapp.com",
  projectId: "ai-mock-interviews-5d264",
  storageBucket: "ai-mock-interviews-5d264.firebasestorage.app",
  messagingSenderId: "826591173450",
  appId: "1:826591173450:web:cee5da7639b57682763fb3",
  measurementId: "G-PR586Z9X8Y"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);