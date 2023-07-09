import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCgtRJ48R4dLMU6EowILF2MWNkYQEZdhA",
  authDomain: "netflix-clone-1d655.firebaseapp.com",
  projectId: "netflix-clone-1d655",
  storageBucket: "netflix-clone-1d655.appspot.com",
  messagingSenderId: "590011359510",
  appId: "1:590011359510:web:1ca4f0d0c4a3a7c5a67037",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
