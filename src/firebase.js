import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {

  apiKey:
    "AIzaSyBmCcU5E1EM-Zfz8RlOEIfiHleOiRVniJs",

  authDomain:
    "familyconnectai.firebaseapp.com",

  projectId:
    "familyconnectai",

  storageBucket:
    "familyconnectai.firebasestorage.app",

  messagingSenderId:
    "217082518730",

  appId:
    "1:217082518730:web:6aebaa2f97ede6b62ce833"

};

const app =
  initializeApp(firebaseConfig);

export const db =
  getFirestore(app);

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();

export const storage =
  getStorage(app);

export default app;