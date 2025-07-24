// header/hamburger.js

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");

  toggle?.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  langBtn?.addEventListener("click", () => {
    langMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove("show");
    }
  });
});
