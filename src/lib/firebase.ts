import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBbZZTUn0c0oZqpKT2MkZs8VWfhTUSOKtg",
  authDomain: "newsocialmedia-46397.firebaseapp.com",
  projectId: "newsocialmedia-46397",
  storageBucket: "newsocialmedia-46397.appspot.com",
  messagingSenderId: "351253927934",
  appId: "1:351253927934:web:03e8b0d6c7070ee0f112af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const bucket = getStorage(app)
export const db  = getFirestore(app)