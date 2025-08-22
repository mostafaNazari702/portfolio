const themeToggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
}

function loadTheme() {
  const stored = localStorage.getItem("theme");
  const useDark = stored === "dark" || (!stored && prefersDark);
  setTheme(useDark);
}

themeToggle.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark-mode"));
});

loadTheme();


window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = 0;
  setTimeout(() => loader.style.display = "none", 500);
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});