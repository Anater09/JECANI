# Carpeta `assets/fonts/`

Actualmente el proyecto **no** almacena archivos de fuente localmente:
las tipografías (`Source Serif 4`, `Inter` y los iconos `Material Symbols
Outlined`) se cargan directamente desde **Google Fonts** mediante los
`<link>` que están en el `<head>` de `index.html`.

Esta carpeta se deja preparada por si en el futuro se decide **alojar las
fuentes de forma local** (recomendable para mejorar la privacidad, el
rendimiento offline, o cumplir con políticas de RGPD/cookies de terceros).

## Cómo migrar a fuentes locales (opcional)

1. Descargar los archivos `.woff2` de "Source Serif 4" e "Inter" desde
   [Google Fonts](https://fonts.google.com/).
2. Colocarlos aquí, por ejemplo:
   - `assets/fonts/source-serif-4.woff2`
   - `assets/fonts/inter.woff2`
3. Declarar cada fuente en `css/variables.css` (o en un nuevo archivo
   `fonts.css`) usando `@font-face`:
   ```css
   @font-face {
     font-family: 'Inter';
     src: url('../assets/fonts/inter.woff2') format('woff2');
     font-weight: 400 600;
     font-display: swap;
   }
   ```
4. Eliminar los `<link>` de Google Fonts en `index.html`.
