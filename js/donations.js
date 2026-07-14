/* =====================================================================
   DONATIONS.JS
   Responsable de la interactividad de la sección de Donaciones:
   - Copiar el IBAN de la cuenta bancaria al portapapeles.
   - Copiar el número de SINPE Móvil al portapapeles.
   - Mostrar un mensaje temporal de "¡Copiado!" como confirmación.
   - Placeholder para el botón "Ver puntos de entrega" (donación en
     especie), que se puede conectar más adelante a un modal o a otra
     sección de la página.
   ===================================================================== */

/**
 * Copia un texto al portapapeles del usuario y da feedback visual
 * en el botón que se presionó (cambia el texto por un momento).
 * @param {string} text - Texto a copiar.
 * @param {HTMLElement} button - Botón que disparó la acción.
 */
function copyToClipboard(text, button) {
  // navigator.clipboard es la API moderna del navegador para copiar
  // texto sin necesidad de <input> ocultos ni document.execCommand.
  navigator.clipboard
    .writeText(text)
    .then(() => showCopiedFeedback(button))
    .catch(() => {
      // Si por alguna razón el navegador bloquea el acceso al
      // portapapeles (permisos, navegador muy antiguo, etc.),
      // avisamos al usuario de forma sencilla.
      alert('No se pudo copiar automáticamente. Cópialo manualmente: ' + text);
    });
}

/**
 * Cambia momentáneamente el contenido del botón para indicarle al
 * usuario que la copia fue exitosa, y luego lo restaura.
 * @param {HTMLElement} button
 */
function showCopiedFeedback(button) {
  const originalHTML = button.innerHTML;
  const originalText = button.textContent.trim();

  button.classList.add('is-copied');
  button.textContent = '¡Copiado!';

  setTimeout(() => {
    button.classList.remove('is-copied');
    button.innerHTML = originalHTML;
  }, 1800);

  // Evitamos warning de variable no usada en algunos linters
  void originalText;
}

function initDonations() {

  // -------------------- Botones de copiar (IBAN / SINPE) --------------------
  // Cada botón tiene un atributo "data-copy-target" que apunta al ID
  // del elemento que contiene el texto a copiar (ver index.html).
  const copyButtons = document.querySelectorAll('[data-copy-target]');

  copyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        copyToClipboard(targetEl.textContent.trim(), button);
      }
    });
  });

  // -------------------- Botón "Ver puntos de entrega" --------------------
  const puntosEntregaBtn = document.getElementById('btn-puntos-entrega');

  if (puntosEntregaBtn) {
    puntosEntregaBtn.addEventListener('click', () => {
      // TODO: reemplazar este alert por un modal o por scroll hacia
      // una sección con el listado real de puntos de entrega.
      alert(
        'Puntos de entrega de donaciones en especie:\n\n' +
        '- Sede principal: Calle Real, San José.\n' +
        '- Próximamente más puntos de entrega en el país.'
      );
    });
  }
}

window.initDonations = initDonations;
