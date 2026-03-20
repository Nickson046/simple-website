document.addEventListener("DOMContentLoaded", () => {

  // ── MOBILE MENU ──
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.classList.remove("open");
      });
    });

    // close on outside click
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove("active");
        menuToggle.classList.remove("open");
      }
    });
  }

  // ── HEADER SCROLL SHRINK ──
  const header = document.getElementById("mainHeader");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    });
  }

  // ── SCROLL REVEAL ──
  const sections = document.querySelectorAll("section");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(s => {
    if (!s.classList.contains("hero")) {
      revealObserver.observe(s);
    }
  });

  // ── HAMBURGER ANIMATION ──
  const style = document.createElement("style");
  style.textContent = `
    .menu-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .menu-toggle.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .menu-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `;
  document.head.appendChild(style);

});
