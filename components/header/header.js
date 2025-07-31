function initHeader() {
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const closeIcon = document.querySelector(".close-icon");
  const langSelect = document.getElementById("lang-desktop");

  // === Función para cambiar el idioma ===
  function setLanguage(lang) {
    localStorage.setItem("beteranoLang", lang);
    applyTranslations(lang);
    if (langSelect) langSelect.value = lang;
  }

  // === Función para aplicar traducciones desde window.translations ===
  function applyTranslations(lang) {
    const strings = window.translations?.[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (strings[key]) {
        el.textContent = strings[key];
      }
    });
  }

  // === Toggle menú hamburguesa ===
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      const isVisible = navWrapper.classList.toggle("show");
      hamburgerIcon.style.display = isVisible ? "none" : "inline";
      closeIcon.style.display = isVisible ? "inline" : "none";
    });
  }

  // === Cerrar menú al hacer clic en un enlace ===
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // === Idioma desde menú desplegable desktop ===
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  // === Idioma desde menú hamburguesa móvil ===
  document.querySelectorAll(".lang-options-mobile button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // === Menú de idioma lateral hamburguesa ===
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langMenu.classList.toggle("show");
    });

    langMenu.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang);
        langMenu.classList.remove("show");
      });
    });
  }

  // === Cerrar menús al hacer clic fuera ===
  document.addEventListener("click", (e) => {
    if (!langBtn?.contains(e.target) && !langMenu?.contains(e.target)) {
      langMenu?.classList.remove("show");
    }
    if (!navWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    }
  });

  // === Cargar idioma guardado al iniciar después del renderizado completo
  const savedLang = localStorage.getItem("beteranoLang") || "es";
  applyTranslations(savedLang);
  if (langSelect) langSelect.value = savedLang;
}

// ✅ Ejecutar solo después de que todo el DOM (incluido el header cargado dinámicamente) esté listo
window.addEventListener("DOMContentLoaded", initHeader);
