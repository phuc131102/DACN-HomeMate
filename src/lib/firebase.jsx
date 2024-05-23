// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
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