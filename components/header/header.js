(function waitForHeaderElements() {
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");

  // ⚠️ Si aún no se han insertado los elementos, esperar
  if (!menuToggle || !navWrapper) {
    setTimeout(waitForHeaderElements, 50); // Intenta otra vez en 50ms
    return;
  }

  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const closeIcon = document.querySelector(".close-icon");

  // ✅ Lógica del botón hamburguesa
  menuToggle.addEventListener("click", () => {
    const isVisible = navWrapper.classList.toggle("show");

    hamburgerIcon.style.display = isVisible ? "none" : "inline";
    closeIcon.style.display = isVisible ? "inline" : "none";
  });

  // ✅ Cerrar menú al hacer clic en un enlace
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // ✅ Menú de idiomas
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

  // ✅ Cierre general al hacer clic fuera
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

  console.log("✅ header.js ejecutado con éxito");
})();
