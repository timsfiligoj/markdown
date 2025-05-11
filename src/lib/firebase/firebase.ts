import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLxF93x7NwUPPRA4XflBDTC72yeZ3CL80",
  authDomain: "deepresearchvisual-c33df.firebaseapp.com",
  projectId: "deepresearchvisual-c33df",
  storageBucket: "deepresearchvisual-c33df.firebasestorage.app",
  messagingSenderId: "286108236177",
  appId: "1:286108236177:web:9d9ce97ebb5dca198e0230",
  measurementId: "G-JKMGGR5DXD"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
