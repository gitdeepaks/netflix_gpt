// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkjbfgx89unLRgBZ4bbhT7WRyDF9bIVVk",
  authDomain: "netflixai-200f1.firebaseapp.com",
  projectId: "netflixai-200f1",
  storageBucket: "netflixai-200f1.appspot.com",
  messagingSenderId: "575183880781",
  appId: "1:575183880781:web:1bb39fdb64b04620d85204",
  measurementId: "G-R5L828L7GQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
