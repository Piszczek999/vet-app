// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdJcuvZyZgluzxpBw3qzFPY3Stt9KeXao",
  authDomain: "doctor-vet-86278.firebaseapp.com",
  projectId: "doctor-vet-86278",
  storageBucket: "doctor-vet-86278.appspot.com",
  messagingSenderId: "563613002643",
  appId: "1:563613002643:web:4fb59572a6b4e5195e1666",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
