(function initHeader() {
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const closeIcon = document.querySelector(".close-icon");

  // Toggle menú hamburguesa
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      const isVisible = navWrapper.classList.toggle("show");

      // Alternar iconos ☰ ↔ ✕ 
      hamburgerIcon.style.display = isVisible ? "none" : "inline";
      closeIcon.style.display = isVisible ? "inline" : "none";
    });
  }

  // Cerrar hamburguesa al hacer clic en un enlace
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
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

  // Cerrar todo al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove("show");
    }

    if (!navWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    }
  });
})();
