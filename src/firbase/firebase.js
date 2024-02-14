// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider}  from "firebase/auth";
import{getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrbnV4QpUvOXjEZgs-T5zDThBbK11XEj8",
    authDomain: "chat-8299c.firebaseapp.com",
    projectId: "chat-8299c",
    storageBucket: "chat-8299c.appspot.com",
    messagingSenderId: "252463353301",
    appId: "1:252463353301:web:61c98cf8f493840265c15c",
    measurementId: "G-MXZ99256F8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);