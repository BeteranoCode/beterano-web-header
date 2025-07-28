(async function loadHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const baseUrl = 'https://beteranocode.github.io/components/header';
  const version = '1.0.0';

  try {
    // 1. Insertar HTML
    const html = await fetch(`${baseUrl}/header.html?v=${version}`).then(res => res.text());
    container.innerHTML = html;

    // 2. Insertar CSS solo una vez
    if (!document.querySelector('[data-global-header-style]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${baseUrl}/header.css?v=${version}`;
      link.dataset.globalHeaderStyle = 'true';
      document.head.appendChild(link);
    }

    // 3. Ejecutar JS cuando el HTML ya está insertado
    const script = document.createElement('script');
    script.src = `${baseUrl}/header.js?v=${version}`;
    script.onload = () => console.log('✅ header.js cargado y ejecutado correctamente');
    document.body.appendChild(script);
  } catch (e) {
    console.error("Error cargando header:", e);
  }
})();
