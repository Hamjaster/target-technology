// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArFVAsvu2UG3pAkdlHPD0c9D4XOE9_Gxk",
    authDomain: "target-tech-1ad32.firebaseapp.com",
    projectId: "target-tech-1ad32",
    storageBucket: "target-tech-1ad32.appspot.com",
    messagingSenderId: "356225522988",
    appId: "1:356225522988:web:1017c6b541f769a7c42089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)