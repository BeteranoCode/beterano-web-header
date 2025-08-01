function initHeader() {
  // === Referencias a elementos del DOM ===
  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const closeIcon = document.querySelector(".close-icon");
  const langSelect = document.getElementById("lang-desktop");
  const searchIcon = document.querySelector(".icon-search");
  const cartIcon = document.querySelector(".icon-cart");

  // === Detectar si estamos en beterano-map ===
  const isMap = window.location.href.includes("beterano-map");

  // Si estamos en beterano-map, ocultar iconos innecesarios
  const loginIcon = document.querySelector(".icon-login");
  if (isMap) {
    if (searchIcon) searchIcon.style.display = "none";
    if (cartIcon) cartIcon.style.display = "none";
    // loginIcon permanece visible
  }



  // === Cambio de idioma global ===
  function setLanguage(lang) {
    localStorage.setItem("beteranoLang", lang);              // Guardar preferencia
    document.documentElement.setAttribute("lang", lang);     // Cambiar lang del <html>
    applyTranslations(lang);                                 // Aplicar traducciones
    if (langSelect) langSelect.value = lang;                 // Sincronizar selector desktop
  }

  // === Aplicar traducciones según los data-i18n
  function applyTranslations(lang) {
    const strings = window.translations?.[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (strings[key]) {
        el.textContent = strings[key];
      }
    });
  }

  // === Exponer funciones globales
  window.setLanguage = setLanguage;
  window.applyTranslations = applyTranslations;

  // === Mostrar/Ocultar menú hamburguesa
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      const isVisible = navWrapper.classList.toggle("show");
      hamburgerIcon.style.display = isVisible ? "none" : "inline";
      closeIcon.style.display = isVisible ? "inline" : "none";
    });
  }

  // === Cerrar menú hamburguesa al hacer clic en una opción
  document.querySelectorAll(".nav-list a, .nav-extras-mobile a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // === Cambio de idioma desde selector desktop
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  // === Cambio de idioma desde botones móviles
  document.querySelectorAll(".lang-options-mobile button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  // === Menú flotante de idiomas desde globo/botón
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

  // === Cerrar menús flotantes al hacer clic fuera
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

  // === Aplicar idioma guardado al cargar
  const savedLang = localStorage.getItem("beteranoLang") || "es";

  // Espera hasta que lang.js haya definido window.translations
  const interval = setInterval(() => {
    if (typeof window.translations === "object") {
      setLanguage(savedLang);
      clearInterval(interval);
    }
  }, 100);

  // Seguridad: forzar cancelación del intervalo en 5 segundos
  setTimeout(() => clearInterval(interval), 5000);
}

// === Ejecutar al cargar el DOM (tras header-loader.js) ===
window.addEventListener("DOMContentLoaded", initHeader);
