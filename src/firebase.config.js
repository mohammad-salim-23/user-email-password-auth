// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWrp4w1AhZxfPxgJrKYjyLGEUMq9diWKw",
  authDomain: "user-email-password-auth-c49a0.firebaseapp.com",
  projectId: "user-email-password-auth-c49a0",
  storageBucket: "user-email-password-auth-c49a0.appspot.com",
  messagingSenderId: "305317864321",
  appId: "1:305317864321:web:e70d257c87d2004f347e80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;