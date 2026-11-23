import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWMthR864EUsTDYzjRqP8DGKYzMUKM2Tk",
  authDomain: "mi-kiosco-final.firebaseapp.com",
  projectId: "mi-kiosco-final",
  storageBucket: "mi-kiosco-final.firebasestorage.app",
  messagingSenderId: "1029721541215",
  appId: "1:1029721541215:web:359716ddb212c04ed5a9ea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };