// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChvGPC22A3ERVW5Mytpk75ScqEgtPBPCc",
  authDomain: "imposing-cab-383020.firebaseapp.com",
  projectId: "imposing-cab-383020",
  storageBucket: "imposing-cab-383020.appspot.com",
  messagingSenderId: "747319824814",
  appId: "1:747319824814:web:a99a12ef2e5145f67c383f",
  measurementId: "G-JSB42VNDHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // export auth 
export const provider = new GoogleAuthProvider();
// lets firebase know that you wanna sign in w google