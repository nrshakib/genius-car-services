// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBomGgWPGOKbLmMomAFG1fokK7z7TXEbQY",
  authDomain: "genius-car-services-5b7b4.firebaseapp.com",
  projectId: "genius-car-services-5b7b4",
  storageBucket: "genius-car-services-5b7b4.appspot.com",
  messagingSenderId: "349351454072",
  appId: "1:349351454072:web:019436ff971faf64e0948d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;