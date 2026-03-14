/*document.addEventListener("DOMContentLoaded", () => {

const petrolElement = document.getElementById("petrolPrice");
const dieselElement = document.getElementById("dieselPrice");

if(!petrolElement || !dieselElement) return;

let petrol = localStorage.getItem("petrol") || 1.45;
let diesel = localStorage.getItem("diesel") || 1.38;

petrolElement.textContent = petrol;
dieselElement.textContent = diesel;

});*/

/*new code */
import { db } from "../firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

async function loadPrices() {

  const docRef = doc(db, "fuel_prices", "prices");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    const data = docSnap.data();

    document.getElementById("petrolPrice").innerText = "$" + data.petrol;
    document.getElementById("dieselPrice").innerText = "$" + data.diesel;

  }
}

loadPrices();