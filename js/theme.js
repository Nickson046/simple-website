const toggle = document.getElementById("themeToggle");

// Apply saved theme on load
const saved = localStorage.getItem("theme");
if (saved === "light") {
  document.body.classList.add("light");
  if (toggle) toggle.textContent = "☀️";
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    toggle.textContent = isLight ? "☀️" : "🌙";
  });
}
