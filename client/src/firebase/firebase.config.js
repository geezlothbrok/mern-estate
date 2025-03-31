import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "property-app-caa91.firebaseapp.com",
  databaseURL: "https://property-app-caa91-default-rtdb.firebaseio.com",
  projectId: "property-app-caa91",
  storageBucket: "property-app-caa91.appspot.com",
  messagingSenderId: "67480340041",
  appId: "1:67480340041:web:79eaaa6889d9968c8c6198"
};

const app = initializeApp(firebaseConfig);


const storage = getStorage(app); 
const auth = getAuth(app); 
const db = getFirestore(app);

export { app, storage, auth, db };
