
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaK-Udb9Qe4G3cbdxIi5CHlqP_N5lrBp4",
  authDomain: "moviepicker-587e5.firebaseapp.com",
  projectId: "moviepicker-587e5",
  storageBucket: "moviepicker-587e5.firebasestorage.app",
  messagingSenderId: "324336566836",
  appId: "1:324336566836:web:c55a7b4d0fd2f930174061"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
