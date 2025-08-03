(async function loadHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const baseUrl = 'https://beteranocode.github.io/components/header';
  const version = '1.0.0';

  try {
    const html = await fetch(`${baseUrl}/header.html?v=${version}`).then(res => res.text());
    container.innerHTML = html;

    if (!document.querySelector('[data-global-header-style]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${baseUrl}/header.css?v=${version}`;
      link.dataset.globalHeaderStyle = 'true';
      document.head.appendChild(link);
    }

    const langScript = document.createElement('script');
    langScript.src = `${baseUrl}/lang.js?v=${version}`;
    langScript.onload = () => {
      const lang = localStorage.getItem("beteranoLang") || "es";
      document.documentElement.setAttribute("lang", lang);
      window.applyTranslations?.(lang);

      const desktopLang = document.getElementById("lang-desktop");
      const mobileLang = document.getElementById("lang-mobile");
      if (desktopLang) desktopLang.value = lang;
      if (mobileLang) mobileLang.value = lang;

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
    console.error("Error cargando header:", e);
  }
})();
