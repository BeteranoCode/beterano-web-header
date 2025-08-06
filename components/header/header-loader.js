(async function loadHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const isLocal = location.hostname === 'localhost';

  if (isLocal) {
    console.warn("🔧 Modo local detectado. Simulando carga de header para evitar error CORS.");
    document.dispatchEvent(new Event("beteranoHeaderReady"));
    return;
  }

  const baseUrl = 'https://beteranocode.github.io/beterano-web-header/components/header';
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
        const browserLang = navigator.language.slice(0, 2);
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

      const changeLang = (selectedLang) => {
        localStorage.setItem("beteranoLang", selectedLang);
        document.documentElement.setAttribute("lang", selectedLang);
        location.reload(); // 🔁 Recarga para aplicar traducción a todos los elementos
      };

      desktopLang?.addEventListener("change", (e) => {
        const selected = e.target.value;
        if (selected !== lang) changeLang(selected);
      });

      mobileLang?.addEventListener("change", (e) => {
        const selected = e.target.value;
        if (selected !== lang) changeLang(selected);
      });

      // 4️⃣ Cargar JS: header.js y luego hamburger.js
      const script = document.createElement('script');
      script.src = `${baseUrl}/header.js?v=${version}`;
      script.onload = () => {
        const hamburger = document.createElement('script');
        hamburger.src = `${baseUrl}/hamburger.js?v=${version}`;
        document.body.appendChild(hamburger);

        // ✅ Esperar hasta que header esté completamente visible
        const waitUntilVisible = () => {
          const a = document.getElementById("announcement-bar");
          const h = document.getElementById("site-header");
          if (a && h && a.offsetHeight > 0 && h.offsetHeight > 0) {
            window.dispatchEvent(new Event("beteranoHeaderReady"));
          } else {
            setTimeout(waitUntilVisible, 50);
          }
        };
        waitUntilVisible();
      };
      document.body.appendChild(script);
    };

    document.head.appendChild(langScript);

  } catch (e) {
    console.error("❌ Error cargando header:", e);
  }
})();
