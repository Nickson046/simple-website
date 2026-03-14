import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "redfuel-a2152.firebaseapp.com",
  projectId: "redfuel-a2152",
  storageBucket: "redfuel-a2152.firebasestorage.app",
  messagingSenderId: "782154176195",
  appId: "1:782154176195:web:46af20e4252e415ba77476"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);