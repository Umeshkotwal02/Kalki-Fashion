// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAG0Xp54MC2VldtQfHJFRJaFPpjs-xvYek",
  authDomain: "kalkifashion-476d4.firebaseapp.com",
  databaseURL: "https://kalkifashion-476d4-default-rtdb.firebaseio.com",
  projectId: "kalkifashion-476d4",
  storageBucket: "kalkifashion-476d4.firebasestorage.app",
  messagingSenderId: "690575161885",
  appId: "1:690575161885:web:168bfc976ceea8c89fe4f4"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
const storage = getStorage(app);
