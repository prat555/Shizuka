import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBJNfpnqRu-B3e-H1Ae_NToHwSyECTFn8",
  authDomain: "shizuka-ce798.firebaseapp.com",
  projectId: "shizuka-ce798",
  storageBucket: "shizuka-ce798.firebasestorage.app",
  messagingSenderId: "957657368311",
  appId: "1:957657368311:web:187e629fb17abaa00875f2",
  measurementId: "G-D8PH0YLLB7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 