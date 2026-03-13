document.addEventListener("DOMContentLoaded", () => {

const input = document.getElementById("fuelAmount");
const pointsDisplay = document.getElementById("points");

if(!input || !pointsDisplay) return;

let storedPoints = parseInt(localStorage.getItem("points")) || 0;

pointsDisplay.textContent = storedPoints;

input.addEventListener("input", () => {

const litres = parseFloat(input.value);

if(!litres){
pointsDisplay.textContent = storedPoints;
return;
}

const newPoints = storedPoints + Math.floor(litres * 2);

pointsDisplay.textContent = newPoints;

});

});