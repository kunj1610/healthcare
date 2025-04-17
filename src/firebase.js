import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1E-vptPLqQC1VMUSIjM_hb3VvVb46IMc",
  authDomain: "healthcare-1bf91.firebaseapp.com",
  projectId: "healthcare-1bf91",
  storageBucket: "healthcare-1bf91.firebasestorage.app",
  messagingSenderId: "261691498992",
  appId: "1:261691498992:web:60452ca38312d42b8e3d35"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { getDocs, db, collection, addDoc, query, where };


