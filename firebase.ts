// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHKfMPnUeBEE2ifnytK1C6E7QFI4WsJJQ",
  authDomain: "netflix-clone-89163.firebaseapp.com",
  projectId: "netflix-clone-89163",
  storageBucket: "netflix-clone-89163.appspot.com",
  messagingSenderId: "1010747205131",
  appId: "1:1010747205131:web:595af402e36bd55851490e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
