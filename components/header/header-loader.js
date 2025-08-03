(async function loadHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const baseUrl = 'https://beteranocode.github.io/components/header';
  const version = '1.0.0';

  try {
    // 1. Insertar HTML del header
    const html = await fetch(`${baseUrl}/header.html?v=${version}`).then(res => res.text());
    container.innerHTML = html;

    // 2. Cargar CSS si no está cargado
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
      // 🔁 Detectar idioma
      let lang = localStorage.getItem("beteranoLang");
      if (!lang) {
        const browserLang = navigator.language.slice(0, 2);
        lang = window.translations?.[browserLang] ? browserLang : "en";
        localStorage.setItem("beteranoLang", lang);
      }

      // 🌐 Aplicar idioma
      document.documentElement.setAttribute("lang", lang);
      window.applyTranslations?.(lang);

      // 🎛️ Sincronizar selects
      const desktopLang = document.getElementById("lang-desktop");
      const mobileLang = document.getElementById("lang-mobile");
      if (desktopLang) desktopLang.value = lang;
      if (mobileLang) mobileLang.value = lang;

      // 📥 Escuchar cambios (con recarga)
      const changeLang = (selectedLang) => {
        localStorage.setItem("beteranoLang", selectedLang);
        document.documentElement.setAttribute("lang", selectedLang);
        // window.applyTranslations?.(selectedLang); // si NO quieres recarga
        location.reload(); // 🔁 Fuerza traducción en todos los textos visibles
      };

      desktopLang?.addEventListener("change", (e) => {
        const selected = e.target.value;
        if (selected !== lang) changeLang(selected);
      });

      mobileLang?.addEventListener("change", (e) => {
        const selected = e.target.value;
        if (selected !== lang) changeLang(selected);
      });

      // 4. Cargar JS: header.js y luego hamburger.js
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
