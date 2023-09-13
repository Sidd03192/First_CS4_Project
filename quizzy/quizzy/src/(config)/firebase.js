// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2bg08K5Q8FOUlSRlnfXEaz2k0B4d1aJ8",
  authDomain: "quizzy-7a3f7.firebaseapp.com",
  projectId: "quizzy-7a3f7",
  storageBucket: "quizzy-7a3f7.appspot.com",
  messagingSenderId: "185267944456",
  appId: "1:185267944456:web:2aed7a15decb583155a5bd",
  measurementId: "G-2Q1DZ6ZD5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// app conencts our project to firebase.

export const auth = getAuth(app);
export const googleProvider= new GoogleAuthProvider();
export const db= new getFirestore(app);