function initHeader() {
  // === Elementos DOM que usaremos ===
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const closeIcon = document.querySelector(".close-icon");
  const langSelect = document.getElementById("lang-desktop");

  // === Cambiar idioma globalmente ===
  function setLanguage(lang) {
    localStorage.setItem("beteranoLang", lang);              // Guardamos idioma
    document.documentElement.setAttribute("lang", lang);     // Modificamos <html lang="...">
    applyTranslations(lang);                                 // Aplicamos textos traducidos
    if (langSelect) langSelect.value = lang;                 // Actualiza selector desktop si existe
  }

  // === Aplicar las traducciones a todos los elementos con data-i18n
  function applyTranslations(lang) {
    const strings = window.translations?.[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (strings[key]) {
        el.textContent = strings[key];
      }
    });
  }

  // === Exponer funciones globalmente para usarlas en otros scripts o apps React
  window.setLanguage = setLanguage;
  window.applyTranslations = applyTranslations;

  // === Alternar menú hamburguesa (abrir/cerrar)
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      const isVisible = navWrapper.classList.toggle("show");
      hamburgerIcon.style.display = isVisible ? "none" : "inline";
      closeIcon.style.display = isVisible ? "inline" : "none";
    });
  }

  // === Cerrar menú al hacer clic en un enlace
  document.querySelectorAll(".nav-list a, .nav-extras-mobile a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // === Cambiar idioma desde selector en desktop
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  // === Cambiar idioma desde botones móviles
  document.querySelectorAll(".lang-options-mobile button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // === Si hay botón visual (globo o icono de idioma) con menú flotante
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evitar cierre inmediato
      langMenu.classList.toggle("show");
    });

    langMenu.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang);
        langMenu.classList.remove("show");
      });
    });
  }

  // === Cerrar menús al hacer clic fuera
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

  // === Aplicar idioma guardado tras la inserción dinámica del header
  const savedLang = localStorage.getItem("beteranoLang") || "es";

  // Espera hasta que el DOM y las traducciones estén listas
  const interval = setInterval(() => {
    if (typeof window.translations === "object") {
      setLanguage(savedLang);
      clearInterval(interval);
    }
  }, 100);

  // Seguridad: no dejar intervalos colgados
  setTimeout(() => clearInterval(interval), 5000);
}

// === Espera al DOM completo (tras header-loader.js)
window.addEventListener("DOMContentLoaded", initHeader);
