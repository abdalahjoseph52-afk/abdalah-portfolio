import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Security: Key is now pulled from the environment file
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "abdalah-portfolio.firebaseapp.com",
  projectId: "abdalah-portfolio",
  storageBucket: "abdalah-portfolio.firebasestorage.app",
  messagingSenderId: "552545673034",
  appId: "1:552545673034:web:0c854f320b391516af2bb3",
  measurementId: "G-ZK7TDKDKZD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);