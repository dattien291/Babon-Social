// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCAYlT2RMU0WUNDVPpvBHIyyw7uk793XI",
  authDomain: "babon-social.firebaseapp.com",
  projectId: "babon-social",
  storageBucket: "babon-social.appspot.com",
  messagingSenderId: "853026396863",
  appId: "1:853026396863:web:374b199919b10cff08040a",
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
