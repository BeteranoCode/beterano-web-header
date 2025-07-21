document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-btn');
  const langMenu = document.getElementById('lang-menu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', () => {
      langMenu.classList.toggle('show');
    });
  }
});
