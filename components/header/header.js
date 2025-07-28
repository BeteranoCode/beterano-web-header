document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const iconHamburger = document.querySelector(".hamburger-icon");
  const iconClose = document.querySelector(".close-icon");

  // Toggle menú hamburguesa
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navWrapper.classList.toggle("show");

      // Alternar íconos ☰ ↔ ✕
      if (isOpen) {
        iconHamburger.style.display = "none";
        iconClose.style.display = "inline";
      } else {
        iconHamburger.style.display = "inline";
        iconClose.style.display = "none";
      }
    });
  }

  // Cerrar hamburguesa al hacer clic en un enlace
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrapper.classList.remove("show");
      iconHamburger.style.display = "inline";
      iconClose.style.display = "none";
    });
  });

  // Toggle menú de idioma
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langMenu.classList.toggle("show");
    });

    langMenu.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        console.log("Idioma seleccionado:", lang);
        langMenu.classList.remove("show");
      });
    });
  }

  // Cierre global al hacer clic fuera de nav o menú de idiomas
  document.addEventListener("click", (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove("show");
    }

    if (!navWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
      navWrapper.classList.remove("show");
      iconHamburger.style.display = "inline";
      iconClose.style.display = "none";
    }
  });
});
