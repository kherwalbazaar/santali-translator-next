import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDibEiFIDdmB3f5FaA4ASWpP9YygmOv-34",
  authDomain: "santali-disctionary.firebaseapp.com",
  databaseURL: "https://santali-disctionary.firebaseio.com",
  projectId: "santali-disctionary",
  storageBucket: "santali-disctionary.firebasestorage.app",
  messagingSenderId: "450281122427",
  appId: "1:450281122427:web:3181f975266cbe436790de",
  measurementId: "G-3F1VY70ZVF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, db, analytics };
