(async function loadHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const baseUrl = 'https://beteranocode.github.io/components/header';
  const version = '1.0.0';

  try {
    // 1️⃣ Insertar el HTML del header desde GitHub Pages
    const html = await fetch(`${baseUrl}/header.html?v=${version}`).then(res => res.text());
    container.innerHTML = html;

    // 2️⃣ Inyectar estilos CSS del header si aún no se ha hecho
    if (!document.querySelector('[data-global-header-style]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${baseUrl}/header.css?v=${version}`;
      link.dataset.globalHeaderStyle = 'true';
      document.head.appendChild(link);
    }

    // 3️⃣ Cargar archivo de traducciones (lang.js)
    const langScript = document.createElement('script');
    langScript.src = `${baseUrl}/lang.js?v=${version}`;

    langScript.onload = () => {
      // 🗺️ Detectar idioma desde localStorage o navegador
      let lang = localStorage.getItem("beteranoLang");
      if (!lang) {
        const browserLang = navigator.language.slice(0, 2); // ej. 'es'
        lang = window.translations?.[browserLang] ? browserLang : "en";
        localStorage.setItem("beteranoLang", lang);
      }

      // 🌐 Aplicar idioma al documento
      document.documentElement.setAttribute("lang", lang);
      window.applyTranslations?.(lang);

      // 🔄 Sincronizar selects de idioma (desktop + mobile)
      const desktopLang = document.getElementById("lang-desktop");
      const mobileLang = document.getElementById("lang-mobile");
      if (desktopLang) desktopLang.value = lang;
      if (mobileLang) mobileLang.value = lang;

      // 🎛️ Al cambiar idioma → guardar, recargar y aplicar
      const changeLang = (selectedLang) => {
        localStorage.setItem("beteranoLang", selectedLang);
        document.documentElement.setAttribute("lang", selectedLang);
        location.reload(); // 🔁 Recarga para aplicar traducción a todos los elementos visibles
      };

      desktopLang?.addEventListener("change", (e) => {
        const selected = e.target.value;
        if (selected !== lang) changeLang(selected);
      });

      mobileLang?.addEventListener("change", (e) => {
        const selected = e.target.value;
        if (selected !== lang) changeLang(selected);
      });

      // 4️⃣ Cargar JS adicional: header.js + hamburger.js
      const script = document.createElement('script');
      script.src = `${baseUrl}/header.js?v=${version}`;
      script.onload = () => {
        const hamburger = document.createElement('script');
        hamburger.src = `${baseUrl}/hamburger.js?v=${version}`;
        document.body.appendChild(hamburger);
      };
      document.body.appendChild(script);

      // ✅ Emitir evento personalizado para React (App.jsx)
      window.dispatchEvent(new Event("beteranoHeaderReady"));
    };

    document.head.appendChild(langScript);

  } catch (e) {
    console.error("❌ Error cargando header:", e);
  }
})();
