(function () {
  console.log("🍔 hamburger.js cargado");
  const toggleButton = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  console.log("Botón:", toggleButton);
  console.log("NavWrapper:", navWrapper);

  if (!toggleButton || !navWrapper) return;

  toggleButton.addEventListener("click", () => {
    const isOpen = navWrapper.classList.toggle("open");
    console.log("Estado menú:", isOpen);

    const hamburgerIcon = toggleButton.querySelector(".hamburger-icon");
    const closeIcon = toggleButton.querySelector(".close-icon");
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.style.display = isOpen ? "none" : "inline";
      closeIcon.style.display = isOpen ? "inline" : "none";
    }
  });
})();
