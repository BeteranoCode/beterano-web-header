# BETERANO Web Header

Este directorio forma parte del repositorio `beteranocode.github.io` y contiene el encabezado web reutilizable para todos los proyectos del ecosistema BETERANO.

## Contenido
- `/header/header.html` → HTML del header
- `/header/header.css` → estilos responsive
- `/header/header.js` → menú desplegable móvil

## URL de uso
- `https://beteranocode.github.io/header/header.html`
- `https://beteranocode.github.io/header/header.css`
- `https://beteranocode.github.io/header/header.js`

## Cómo integrarlo
```html
<link rel="stylesheet" href="https://beteranocode.github.io/header/header.css">
<script src="https://beteranocode.github.io/header/header.js" defer></script>
<div id="header-placeholder"></div>
<script>
  fetch('https://beteranocode.github.io/header/header.html')
    .then(res => res.text())
    .then(html => document.getElementById('header-placeholder').innerHTML = html);
</script>
```
