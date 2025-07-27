document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");

  // Toggle menú hamburguesa
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      navWrapper.classList.toggle("show");
    });
  }

  // Mostrar menú de idiomas
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", () => {
      langMenu.classList.toggle("show");
    });

    // Cambio de idioma (solo placeholder)
    langMenu.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        console.log("Idioma seleccionado:", lang);
        // Aquí puedes integrar i18n.js o cambiar textos dinámicamente si deseas
        langMenu.classList.remove("show");
      });
    });
  }
});
