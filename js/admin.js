import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
getFirestore,
doc,
setDoc,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "NERO-a2152.firebaseapp.com",
  projectId: "NERO-a2152",
  storageBucket: "NERO-a2152.firebasestorage.app",
  messagingSenderId: "782154176195",
  appId: "1:782154176195:web:46af20e4252e415ba77476"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* ---------------------------
UPDATE FUEL PRICES
---------------------------- */

const form = document.getElementById("priceForm");

form.addEventListener("submit", async function(e){

e.preventDefault();

const petrol = document.getElementById("petrolInput").value;
const diesel = document.getElementById("dieselInput").value;

await setDoc(doc(db,"fuel_prices","petrol"),{
price:Number(petrol)
});

await setDoc(doc(db,"fuel_prices","diesel"),{
price:Number(diesel)
});

alert("Fuel prices updated!");

});


/* ---------------------------
POST NEWS
---------------------------- */

window.postNews = async function(){

const title = document.getElementById("newsTitle").value;
const image = document.getElementById("newsImage").value;
const text = document.getElementById("newsText").value;

await addDoc(collection(db,"updates"),{

title:title,
image:image,
text:text,
date:new Date()

});

alert("News posted!");

}