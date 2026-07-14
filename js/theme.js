/* =====================================================================
   THEME.JS
   Modo oscuro: alterna el atributo "data-theme" del <html> entre
   "light" y "dark". Todos los colores del sitio están definidos como
   variables CSS (ver variables.css), así que cambiar ese atributo
   repinta automáticamente toda la página sin tocar ningún otro CSS.

   El tema con el que arranca la página se decide ANTES de que este
   archivo cargue: hay un script mínimo e inline en el <head> de
   index.html que lee la preferencia guardada (o el modo del sistema
   operativo) y aplica el atributo de inmediato, para evitar un
   parpadeo del tema equivocado apenas se abre el sitio. Aquí solo
   conectamos el botón para poder cambiarlo después.
   ===================================================================== */

const THEME_STORAGE_KEY = 'jecani-theme';

function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector('.material-symbols-outlined');

  function applyIcon(theme) {
    // Mostramos el icono de la acción que se puede hacer, no el estado
    // actual (si estamos en oscuro, se ofrece pasar a claro, y viceversa).
    if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    toggleBtn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  }

  applyIcon(document.documentElement.getAttribute('data-theme') || 'light');

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyIcon(next);
  });
}

window.initTheme = initTheme;
