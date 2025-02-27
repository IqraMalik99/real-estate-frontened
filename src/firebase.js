// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "real-estate-e8678.firebaseapp.com",
  projectId: "real-estate-e8678",
  storageBucket: "real-estate-e8678.appspot.com",
  messagingSenderId: "380666519509",
  appId: "1:380666519509:web:8b3a5442b544c25540a75c",
  measurementId: "G-Q5825YE3TM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);