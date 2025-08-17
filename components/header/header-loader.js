// beterano-web-header/components/header/header-loader.js
(async function loadHeader() {
  const container = document.getElementById("header-container");
  if (!container) return;

  const isLocal = location.hostname === "localhost";
  const baseUrl = "https://beteranocode.github.io/beterano-web-header/components/header";
  const sharedUrl = "https://beteranocode.github.io/beterano-web-header/components/shared";
  const version = "1.1.0"; // ⬅️ súbelo para bust de caché cuando cambies algo

  // Utilidad: marca la app como lista, ajusta offset y lanza evento SIEMPRE en document
  const markReady = () => {
    const a = document.getElementById("announcement-bar");
    const h = document.getElementById("site-header");
    if (a && h && a.offsetHeight > 0 && h.offsetHeight > 0) {
      const total = Math.round(a.offsetHeight + h.offsetHeight);
      document.documentElement.style.setProperty("--header-offset", `${total}px`);
    }
    document.body.classList.add("header-loaded");
    document.dispatchEvent(new Event("beteranoHeaderReady"));
  };

  // Importa el bridge i18n compartido (modo módulo)
  const { getInitialLang, setGlobalLang } = await import(`${sharedUrl}/i18n-bridge.js?v=${version}`);

  if (isLocal) {
    // Modo local: no cargamos remoto; simulamos altura y notificamos
    document.documentElement.style.setProperty("--header-offset", "125px");
    document.body.classList.add("local-dev");
    // Asegura un idioma inicial coherente en local también
    const init = getInitialLang();
    setGlobalLang(init);
    markReady();
    return;
  }

  try {
    // 1) Insertar HTML del header
    const html = await fetch(`${baseUrl}/header.html?v=${version}`).then((r) => r.text());
    container.innerHTML = html;

    // 2) Asegurar CSS cargado una sola vez
    if (!document.querySelector("[data-global-header-style]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${baseUrl}/header.css?v=${version}`;
      link.dataset.globalHeaderStyle = "true";
      document.head.appendChild(link);
    }

    // 3) Cargar traducciones
    const langScript = document.createElement("script");
    langScript.src = `${baseUrl}/lang.js?v=${version}`;

    langScript.onload = () => {
      // Lista de idiomas permitidos a partir de window.translations o fallback
      const allowed = Array.isArray(window?.translations?._allowed)
        ? window.translations._allowed
        : Object.keys(window?.translations || { es:1, en:1, de:1, fr:1, it:1, nl:1, pl:1 });

      // Inicializa idioma global (URL > localStorage > cookie > navegador)
      const initLang = getInitialLang(allowed);
      const lang = setGlobalLang(initLang); // persist + <html lang> + evento

      // Aplica traducciones al header
      document.documentElement.setAttribute("lang", lang);
      window.applyTranslations?.(lang);

      // Sincroniza selects (si existen)
      const desktopLang = document.getElementById("lang-desktop");
      const mobileLang  = document.getElementById("lang-mobile");
      if (desktopLang) desktopLang.value = lang;
      if (mobileLang)  mobileLang.value  = lang;

      // Cambio de idioma desde los selects → actualiza global y re-aplica sin recargar
      const onChange = (selectedRaw) => {
        const selected = (selectedRaw || "").slice(0, 2).toLowerCase();
        if (!allowed.includes(selected)) return;
        if (selected === lang) return;
        const applied = setGlobalLang(selected);
        document.documentElement.setAttribute("lang", applied);
        window.applyTranslations?.(applied); // ❌ sin reload, ✅ re-render header
        if (desktopLang) desktopLang.value = applied;
        if (mobileLang)  mobileLang.value  = applied;
        // recalcular offset por si cambian textos/altura
        setTimeout(markReady, 50);
      };

      desktopLang?.addEventListener("change", (e) => onChange(e.target.value));
      mobileLang?.addEventListener("change", (e) => onChange(e.target.value));

      // 4) Cargar JS del header y el hamburger
      const headerJs = document.createElement("script");
      headerJs.src = `${baseUrl}/header.js?v=${version}`;
      headerJs.onload = () => {
        const hamburger = document.createElement("script");
        hamburger.src = `${baseUrl}/hamburger.js?v=${version}`;
        document.body.appendChild(hamburger);

        // Esperar a que ambos bloques tengan altura
        const waitUntilVisible = () => {
          const a = document.getElementById("announcement-bar");
          const h = document.getElementById("site-header");
          if (a && h && a.offsetHeight > 0 && h.offsetHeight > 0) {
            const total = Math.round(a.offsetHeight + h.offsetHeight);
            document.documentElement.style.setProperty("--header-offset", `${total}px`);
            markReady();
          } else {
            setTimeout(waitUntilVisible, 60);
          }
        };
        waitUntilVisible();
      };
      document.body.appendChild(headerJs);
    };

    document.head.appendChild(langScript);
  } catch (e) {
    console.error("❌ Error cargando header:", e);
    document.documentElement.style.setProperty("--header-offset", "85px");
    markReady();
  }
})();
