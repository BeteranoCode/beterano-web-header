document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  const hamburgerIcon = toggleButton?.querySelector(".hamburger-icon");
  const closeIcon = toggleButton?.querySelector(".close-icon");

  if (!toggleButton || !navWrapper) return;

  toggleButton.addEventListener("click", () => {
    const isOpen = navWrapper.classList.toggle("open");
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.style.display = isOpen ? "none" : "inline";
      closeIcon.style.display = isOpen ? "inline" : "none";
    }
  });
});
