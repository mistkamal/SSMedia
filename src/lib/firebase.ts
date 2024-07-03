import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCNxVDSadKW_ilEj3WzhCC8W4oMKn6XoKo",
  authDomain: "social-media-ad80c.firebaseapp.com",
  projectId: "social-media-ad80c",
  storageBucket: "social-media-ad80c.appspot.com",
  messagingSenderId: "307584054247",
  appId: "1:307584054247:web:cba2311c7b1a5e60588342"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const db  = getFirestore(app)