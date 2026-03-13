document.addEventListener("DOMContentLoaded", () => {

const petrolElement = document.getElementById("petrolPrice");
const dieselElement = document.getElementById("dieselPrice");

if(!petrolElement || !dieselElement) return;

let petrol = localStorage.getItem("petrol") || 1.45;
let diesel = localStorage.getItem("diesel") || 1.38;

petrolElement.textContent = petrol;
dieselElement.textContent = diesel;

});