// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaOmWAIZQn5fDaFS8_zeQCaKFUfJUkvIo",
  authDomain: "newonlineshop-d607a.firebaseapp.com",
  databaseURL: "https://newonlineshop-d607a-default-rtdb.firebaseio.com",
  projectId: "newonlineshop-d607a",
  storageBucket: "newonlineshop-d607a.firebasestorage.app",
  messagingSenderId: "1092752519930",
  appId: "1:1092752519930:web:623384e5b5f558bb21cf43",
  measurementId: "G-LYBX164X3D",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);