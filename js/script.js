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