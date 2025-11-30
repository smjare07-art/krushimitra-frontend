import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8W01zOr345gJrppUKDsj7hwffuk7qUcc",
  authDomain: "krushimetra.firebaseapp.com",
  projectId: "krushimetra",
  storageBucket: "krushimetra.appspot.com",
  messagingSenderId: "614934114480",
  appId: "1:614934114480:web:a88a43a91a7947167e8b75",
  measurementId: "G-VTCN4B68WP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
