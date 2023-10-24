
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFLfpyumBeZLyFoEuf9MWkh-lUbWpUnLE",
  authDomain: "fchat-5dc24.firebaseapp.com",
  projectId: "fchat-5dc24",
  storageBucket: "fchat-5dc24.appspot.com",
  messagingSenderId: "943826552292",
  appId: "1:943826552292:web:925ce03ef1053bbe3873f1",
  measurementId: "G-P7D9MEC4GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider= new GoogleAuthProvider();
export const db = getFirestore(app);
