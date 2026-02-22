// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBH0BLXASUYbdLYrGvBQagwu-NDJsOIRlA",
  authDomain: "vital-guard-5f961.firebaseapp.com",
  projectId: "vital-guard-5f961",
  storageBucket: "vital-guard-5f961.appspot.com",
  messagingSenderId: "862951050515",
  appId: "1:862951050515:web:2bebddea4e8828968c1ee6",
  measurementId: "G-WSCN4B2TFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
