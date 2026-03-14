import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {
getFirestore,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


const firebaseConfig = {
apiKey: "AIzaSyB-Q-MFZDCgHnaVgMRrgxEL9YPrIqZwUrU",
authDomain: "redfuel-a2152.firebaseapp.com",
projectId: "redfuel-a2152",
storageBucket: "redfuel-a2152.firebasestorage.app",
messagingSenderId: "782154176195",
appId: "1:782154176195:web:46af20e4252e415ba77476"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function loadPrices(){

const ref = doc(db,"fuelPrices","current");

const snap = await getDoc(ref);

if(snap.exists()){

document.getElementById("petrolPrice").innerText =
"$" + snap.data().petrol;

document.getElementById("dieselPrice").innerText =
"$" + snap.data().diesel;

}

}

loadPrices();