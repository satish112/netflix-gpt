// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-3c5T3OFBhmThCWRf-owRYxWB_QUjkeE",
  authDomain: "netflixgpt-544b8.firebaseapp.com",
  projectId: "netflixgpt-544b8",
  storageBucket: "netflixgpt-544b8.appspot.com",
  messagingSenderId: "190008127340",
  appId: "1:190008127340:web:0b9343d5a61fb36a8b0d49",
  measurementId: "G-FCDBBR36MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();