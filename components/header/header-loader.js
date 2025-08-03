(async function loadHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const baseUrl = 'https://beteranocode.github.io/components/header';
  const version = '1.0.0';

  try {
    // 1. Insertar HTML del header
    const html = await fetch(`${baseUrl}/header.html?v=${version}`).then(res => res.text());
    container.innerHTML = html;

    // 2. Cargar CSS una sola vez
    if (!document.querySelector('[data-global-header-style]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${baseUrl}/header.css?v=${version}`;
      link.dataset.globalHeaderStyle = 'true';
      document.head.appendChild(link);
    }

    // 3. Cargar lang.js
    const langScript = document.createElement('script');
    langScript.src = `${baseUrl}/lang.js?v=${version}`;
    langScript.onload = () => {
      // 🌍 Detectar idioma por navegador si no hay preferencia
      let lang = localStorage.getItem("beteranoLang");
      if (!lang) {
        const browserLang = navigator.language || navigator.userLanguage;
        lang = browserLang.slice(0, 2); // "es-ES" → "es"
        if (!window.translations[lang]) lang = "en"; // fallback
        localStorage.setItem("beteranoLang", lang);
      }

      // 🌐 Establecer idioma activo
      document.documentElement.setAttribute("lang", lang);
      if (typeof window.applyTranslations === "function") {
        window.applyTranslations(lang);
      } else {
        console.warn("❗ applyTranslations no está definida aún");
      }

      // 🎛️ Sincronizar selectores
      const desktopLang = document.getElementById("lang-desktop");
      const mobileLang = document.getElementById("lang-mobile");
      if (desktopLang) desktopLang.value = lang;
      if (mobileLang) mobileLang.value = lang;

      // 📥 Eventos de cambio de idioma
      desktopLang?.addEventListener("change", (e) => {
        const selected = e.target.value;
        localStorage.setItem("beteranoLang", selected);
        document.documentElement.setAttribute("lang", selected);
        window.applyTranslations?.(selected);
        if (mobileLang) mobileLang.value = selected;
      });

      mobileLang?.addEventListener("change", (e) => {
        const selected = e.target.value;
        localStorage.setItem("beteranoLang", selected);
        document.documentElement.setAttribute("lang", selected);
        window.applyTranslations?.(selected);
        if (desktopLang) desktopLang.value = selected;
      });

      // 4. Cargar scripts de comportamiento
      const script = document.createElement('script');
      script.src = `${baseUrl}/header.js?v=${version}`;
      script.onload = () => {
        const hamburger = document.createElement('script');
        hamburger.src = `${baseUrl}/hamburger.js?v=${version}`;
        document.body.appendChild(hamburger);
      };
      document.body.appendChild(script);
    };

    document.head.appendChild(langScript);

  } catch (e) {
    console.error("❌ Error cargando header:", e);
  }
})();
