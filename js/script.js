document.addEventListener("DOMContentLoaded", () => {

  // ----- MOBILE MENU TOGGLE -----
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if(menu && nav){
    // Toggle menu on hamburger click
    menu.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    // Close menu when a link is clicked (mobile-friendly)
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }

  // ----- SCROLL ANIMATION -----
  const sections = document.querySelectorAll("section");

  const scrollAnimation = () => {
    sections.forEach(section => {
      const position = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if(position < screenPosition){
        section.classList.add("visible");
      }
    });
  };

  // Run on scroll
  window.addEventListener("scroll", scrollAnimation);

  // Run once on load in case sections are already visible
  scrollAnimation();

});

/*
// HERO BACKGROUND SLIDESHOW
const hero = document.querySelector(".hero");

// List of background images
const heroImages = [
  "images/hero1.jpg",
  "images/hero2.jpg",
  "images/hero3.jpg"
];

let currentHeroIndex = 0;

// Preload images to avoid flash
heroImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// Function to change hero background
function changeHeroBackground() {
  currentHeroIndex++;
  if(currentHeroIndex >= heroImages.length) currentHeroIndex = 0;
  hero.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
}

// Optional: start with random image
currentHeroIndex = Math.floor(Math.random() * heroImages.length);
hero.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;

// Change every 5 seconds
setInterval(changeHeroBackground, 5000);

*/
