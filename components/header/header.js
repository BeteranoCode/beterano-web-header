function initHeader() {
  const isMap = window.location.href.includes("beterano-map");
  if (isMap) document.body.classList.add("map-page");

  const menuToggle = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const closeIcon = document.querySelector(".close-icon");
  const langSelect = document.getElementById("lang-desktop");

  function applyTranslations(lang) {
    const strings = window.translations?.[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (strings[key]) el.textContent = strings[key];
    });
  }

  function setLanguage(lang) {
    localStorage.setItem("beteranoLang", lang);
    document.documentElement.setAttribute("lang", lang);
    applyTranslations(lang);
    if (langSelect) langSelect.value = lang;
  }

  window.setLanguage = setLanguage;
  window.applyTranslations = applyTranslations;

  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      const isVisible = navWrapper.classList.toggle("show");
      hamburgerIcon.style.display = isVisible ? "none" : "inline";
      closeIcon.style.display = isVisible ? "inline" : "none";
    });
  }

  document.querySelectorAll(".nav-list a, .nav-extras-mobile a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  document.querySelectorAll(".lang-options-mobile button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      navWrapper.classList.remove("show");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    });
  });

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

  const savedLang = localStorage.getItem("beteranoLang") || "es";
  const interval = setInterval(() => {
    if (typeof window.translations === "object") {
      setLanguage(savedLang);
      clearInterval(interval);
    }
  }, 100);
  setTimeout(() => clearInterval(interval), 5000);
}

window.addEventListener("DOMContentLoaded", initHeader);
