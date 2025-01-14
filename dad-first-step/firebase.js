import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMxw5NbYFfTQlaTpBj5CUePhyTYKnMokI",
  authDomain: "dads-first-step.firebaseapp.com",
  projectId: "dads-first-step",
  storageBucket: "dads-first-step.firebasestorage.app",
  messagingSenderId: "1052702875901",
  appId: "1:1052702875901:web:236a8dc28842b01810de94",
  measurementId: "G-3KBF5JKTBZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
