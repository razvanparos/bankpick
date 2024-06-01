import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDws3HMecVSc6A6RLaSRJXvNFUV7IM9r-0",
  authDomain: "bankpick-843b2.firebaseapp.com",
  projectId: "bankpick-843b2",
  storageBucket: "bankpick-843b2.appspot.com",
  messagingSenderId: "91653592486",
  appId: "1:91653592486:web:7b37329a122c9dde9f2b67"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);