// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1UUh2Z7MgdxtXiuEvAgI-CacsqCU_9RE",
  authDomain: "beauty-shop-11ab8.firebaseapp.com",
  projectId: "beauty-shop-11ab8",
  storageBucket: "beauty-shop-11ab8.firebasestorage.app",
  messagingSenderId: "492587231427",
  appId: "1:492587231427:web:38d96b8984f15c49f45a76",
  measurementId: "G-Y1706QV9SW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
