window.translations = {
  es: {
    constructionNotice: "🚧 Web en construcción 🚧",
    home: "Inicio",
    clubWA: "Club Whatsapp",
    market: "Market",
    mechAI: "Mech AI",
    findRestorer: "Encuentra un restaurador",
    apps: "Apps",
    shop: "Tienda",
    faq: "FAQ",
    contact: "Contacto",
    login: "Iniciar sesión"
  },
  en: {
    constructionNotice: "🚧 Website in construction 🚧",
    home: "Home",
    clubWA: "WhatsApp Club",
    market: "Marketplace",
    mechAI: "Mech AI",
    findRestorer: "Find a Restorer",
    apps: "Apps",
    shop: "Shop",
    faq: "FAQ",
    contact: "Contact",
    login: "Login"
  },
  de: {
    constructionNotice: "🚧 Website im Aufbau 🚧",
    home: "Startseite",
    clubWA: "WhatsApp Club",
    market: "Marktplatz",
    mechAI: "Mech AI",
    findRestorer: "Restaurator finden",
    apps: "Apps",
    shop: "Shop",
    faq: "FAQ",
    contact: "Kontakt",
    login: "Einloggen"
  },
  fr: {
    constructionNotice: "🚧 Site en construction 🚧",
    home: "Accueil",
    clubWA: "Club WhatsApp",
    market: "Marché",
    mechAI: "Mech AI",
    findRestorer: "Trouver un restaurateur",
    apps: "Apps",
    shop: "Boutique",
    faq: "FAQ",
    contact: "Contact",
    login: "Connexion"
  },
  it: {
    constructionNotice: "🚧 Sito in costruzione 🚧",
    home: "Home",
    clubWA: "Club WhatsApp",
    market: "Mercato",
    mechAI: "Mech AI",
    findRestorer: "Trova un restauratore",
    apps: "App",
    shop: "Negozio",
    faq: "FAQ",
    contact: "Contatto",
    login: "Accedi"
  },
  nl: {
    constructionNotice: "🚧 Website in aanbouw 🚧",
    home: "Home",
    clubWA: "WhatsApp Club",
    market: "Marktplaats",
    mechAI: "Mech AI",
    findRestorer: "Vind een restaurateur",
    apps: "Apps",
    shop: "Winkel",
    faq: "FAQ",
    contact: "Contact",
    login: "Inloggen"
  },
  pl: {
    constructionNotice: "🚧 Strona w budowie 🚧",
    home: "Strona główna",
    clubWA: "Klub WhatsApp",
    market: "Rynek",
    mechAI: "Mech AI",
    findRestorer: "Znajdź renowatora",
    apps: "Aplikacje",
    shop: "Sklep",
    faq: "FAQ",
    contact: "Kontakt",
    login: "Zaloguj się"
  }
};

// ✅ FUNCION DE TRADUCCIÓN GLOBAL
window.applyTranslations = function (lang) {
  const t = window.translations?.[lang] || {};
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
};
