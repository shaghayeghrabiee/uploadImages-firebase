// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9a95YmIPgRwm6POERwgbaSq6RxX6L3CI",
  authDomain: "uploadingfile-a9509.firebaseapp.com",
  projectId: "uploadingfile-a9509",
  storageBucket: "uploadingfile-a9509.appspot.com",
  messagingSenderId: "491301259943",
  appId: "1:491301259943:web:9be528ddfe5dc9b2742982",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage= getStorage(app);