// beterano-web-header/components/header/header-loader.js
(async function loadHeader() {
  const container = document.getElementById("header-container");
  if (!container) return;

  const isLocal = location.hostname === "localhost";
  const baseUrl =
    "https://beteranocode.github.io/beterano-web-header/components/header";
  const version = "1.0.1"; // sube si quieres forzar cache-bust

  // Utilidad: marca la app como lista, ajusta offset y lanza evento SIEMPRE en document
  const markReady = () => {
    // Si ya existe el announcement y el header, calcula altura real
    const a = document.getElementById("announcement-bar");
    const h = document.getElementById("site-header");
    if (a && h && a.offsetHeight > 0 && h.offsetHeight > 0) {
      const total = Math.round(a.offsetHeight + h.offsetHeight);
      document.documentElement.style.setProperty("--header-offset", `${total}px`);
    }
    document.body.classList.add("header-loaded");
    document.dispatchEvent(new Event("beteranoHeaderReady"));
  };

  if (isLocal) {
    // Modo local: no cargamos remoto; simulamos altura y notificamos
    document.documentElement.style.setProperty("--header-offset", "125px");
    document.body.classList.add("local-dev");
    markReady();
    return;
  }

  try {
    // 1) Insertar HTML del header
    const html = await fetch(`${baseUrl}/header.html?v=${version}`).then((r) =>
      r.text()
    );
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
      // Idioma
      let lang = localStorage.getItem("beteranoLang");
      if (!lang) {
        const browser = navigator.language.slice(0, 2);
        lang = window.translations?.[browser] ? browser : "en";
        localStorage.setItem("beteranoLang", lang);
      }
      document.documentElement.setAttribute("lang", lang);
      window.applyTranslations?.(lang);

      // Sincronizar selects (si existen)
      const desktopLang = document.getElementById("lang-desktop");
      const mobileLang = document.getElementById("lang-mobile");
      if (desktopLang) desktopLang.value = lang;
      if (mobileLang) mobileLang.value = lang;

      const changeLang = (selected) => {
        if (selected === lang) return;
        localStorage.setItem("beteranoLang", selected);
        document.documentElement.setAttribute("lang", selected);
        location.reload();
      };
      desktopLang?.addEventListener("change", (e) => changeLang(e.target.value));
      mobileLang?.addEventListener("change", (e) => changeLang(e.target.value));

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
            document.documentElement.style.setProperty(
              "--header-offset",
              `${total}px`
            );
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
    // fallback muy básico
    document.documentElement.style.setProperty("--header-offset", "85px");
    markReady();
  }
})();
