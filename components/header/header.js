function initHeader() {
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const closeIcon = document.querySelector(".close-icon");
  const langSelect = document.getElementById("lang-desktop");

  // === Función para cambiar el idioma global ===
  function setLanguage(lang) {
    localStorage.setItem("beteranoLang", lang);             // Guardar en localStorage
    document.documentElement.setAttribute("lang", lang);    // Actualizar <html lang="...">
    applyTranslations(lang);                                // Aplicar traducciones al DOM
    if (langSelect) langSelect.value = lang;                // Actualizar selector si está visible
  }

  // === Función para aplicar traducciones en todos los elementos con data-i18n ===
  function applyTranslations(lang) {
    const strings = window.translations?.[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (strings[key]) {
        el.textContent = strings[key];
      }
    });
  }

  // === Exponer funciones globalmente para que otros proyectos (beterano-map, etc.) puedan usarlas ===
  window.setLanguage = setLanguage;
  window.applyTranslations = applyTranslations;

  // === Toggle del menú hamburguesa
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      const isVisible = navWrapper.classList.toggle("show");
      hamburgerIcon.style.display = isVisible ? "none" : "inline";
      closeIcon.style.display = isVisible ? "inline" : "none";
    });
  }

  // === Cerrar el menú al hacer clic en un enlace del nav principal
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // === Selección de idioma desde el selector <select> en desktop
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  // === Selección de idioma desde los botones del menú hamburguesa (mobile)
  document.querySelectorAll(".lang-options-mobile button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // === Selector visual lateral (botón con icono) solo si está presente
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

  // === Cerrar menús si se hace clic fuera del nav o selector
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

  // === Aplicar idioma guardado al cargar (tras la inserción dinámica del header)
  const savedLang = localStorage.getItem("beteranoLang") || "es";
  setLanguage(savedLang); // usa setLanguage para aplicar traducción y actualizar <html lang="">
}

// ✅ Ejecutar después de que el DOM esté completamente listo (incluido el header inyectado por header-loader.js)
window.addEventListener("DOMContentLoaded", initHeader);
