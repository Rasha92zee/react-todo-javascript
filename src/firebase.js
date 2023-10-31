// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-M8DyPm2ap0J1yLGXLqwmIKznCKmphx4",
  authDomain: "react-todo-ca80f.firebaseapp.com",
  projectId: "react-todo-ca80f",
  storageBucket: "react-todo-ca80f.appspot.com",
  messagingSenderId: "1006736287178",
  appId: "1:1006736287178:web:75abfc21ef73b929ab9b33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};