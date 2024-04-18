// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAg391jSYhLPcAeJGXvLwI1zAjVB4pMslg",
    authDomain: "todoshka-fc32b.firebaseapp.com",
    projectId: "todoshka-fc32b",
    storageBucket: "todoshka-fc32b.appspot.com",
    messagingSenderId: "1013454830516",
    appId: "1:1013454830516:web:9442ac0d8b020aad21d0e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }