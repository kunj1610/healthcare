// Import Firebase core functionality
import { initializeApp } from "firebase/app";
// Import Firestore functionality and methods
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Firebase configuration object containing credentials and settings and the api
const firebaseConfig = {
  apiKey: "AIzaSyA1E-vptPLqQC1VMUSIjM_hb3VvVb46IMc",
  authDomain: "healthcare-1bf91.firebaseapp.com",
  projectId: "healthcare-1bf91", 
  storageBucket: "healthcare-1bf91.firebasestorage.app",
  messagingSenderId: "261691498992",
  appId: "1:261691498992:web:60452ca38312d42b8e3d35"
};

// Initialize Firebase app with config
const app = initializeApp(firebaseConfig);
// Get Firestore database instance
const db = getFirestore(app);

// Export Firestore methods and database instance for use in other files
export { getDocs, db, collection, addDoc, query, where };

