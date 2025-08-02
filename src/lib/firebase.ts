import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZBVQBTYhhhzAWy5VMmRevxXHLjApRFvk",
  authDomain: "rune-catalogue.firebaseapp.com",
  projectId: "rune-catalogue",
  storageBucket: "rune-catalogue.firebasestorage.app",
  messagingSenderId: "708830780650",
  appId: "1:708830780650:web:39c328b3bbc43d253acb93",
  measurementId: "G-254T9J3FRQ"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
