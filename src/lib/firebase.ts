// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVZFWMUQ7_JGgmamuCC5pwshYy826ps5c",
  authDomain: "match-summaries.firebaseapp.com",
  projectId: "match-summaries",
  storageBucket: "match-summaries.firebasestorage.app",
  messagingSenderId: "1040113286031",
  appId: "1:1040113286031:web:76b2892a627f67251ee9fa"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
