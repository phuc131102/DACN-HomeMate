// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log(import.meta.env); 
const firebaseConfig = {
  apiKey: "AIzaSyCtgoS8nTNTzZCB0yuPuV0gDumYwRWvtaA",
  authDomain: "chatapp-b883f.firebaseapp.com",
  projectId: "chatapp-b883f",
  storageBucket: "chatapp-b883f.appspot.com",
  messagingSenderId: "979127250786",
  appId: "1:979127250786:web:3b0ad818b3528a13a1463b",
  measurementId: "G-M6P344J9V3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()
export const storage = getStorage()