(async function loadHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const baseUrl = 'https://beteranocode.github.io/components/header';
  const version = '1.0.0'; // Para control de caché

  // 1. Insertar HTML
  const html = await fetch(`${baseUrl}/header.html?v=${version}`).then(res => res.text());
  container.innerHTML = html;

  // 2. Insertar CSS si no está
  if (!document.querySelector('[data-global-header-style]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${baseUrl}/header.css?v=${version}`;
    link.dataset.globalHeaderStyle = 'true';
    document.head.appendChild(link);
  }

  // 3. Insertar JS funcional
  const script = document.createElement('script');
  script.src = `${baseUrl}/header.js?v=${version}`;
  script.defer = true;
  document.body.appendChild(script);
})();
