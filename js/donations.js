/* =====================================================================
   DONATIONS.JS
   Responsable de la interactividad de la sección de Donaciones:
   - Copiar el IBAN de la cuenta bancaria al portapapeles.
   - Copiar el número de SINPE Móvil al portapapeles.
   - Mostrar un mensaje temporal de "¡Copiado!" como confirmación.
   - Modal "Puntos de Entrega" (donación en especie).
   - Modal "Donación en especie vía Yo Me Uno".
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

/**
 * Convierte un <div class="modal"> en un diálogo funcional: expone
 * open()/close(), y engancha automáticamente el overlay, el botón "×"
 * y cualquier otro elemento con [data-modal-close] dentro del modal,
 * además de la tecla Escape.
 * @param {HTMLElement} modal
 */
function setupModal(modal) {
  const closeTriggers = modal.querySelectorAll('[data-modal-close]');

  const open = () => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  closeTriggers.forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      close();
    }
  });

  return { open, close };
}

const YOMEUNO_URL = 'https://www.yomeuno.com/costa-rica/organizaciones/fundacion-jecani';

/**
 * Controla el modal que ayuda a preparar una donación en especie antes
 * de continuar en Yo Me Uno. Yo Me Uno no permite precargar su
 * formulario desde un sitio externo, así que este modal es solo una
 * guía para el donante: al enviarlo, únicamente lo redirigimos a la
 * plataforma real en una pestaña nueva (los datos no viajan con él).
 */
function initModalEspecie() {
  const openBtn = document.getElementById('btn-especie-yomeuno');
  const modal = document.getElementById('modal-especie');

  if (!openBtn || !modal) return;

  const form = document.getElementById('form-especie-yomeuno');
  const { open, close } = setupModal(modal);

  openBtn.addEventListener('click', open);

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.open(YOMEUNO_URL, '_blank', 'noopener');
      close();
      form.reset();
    });
  }
}

/**
 * Controla el modal con el listado de puntos de entrega para
 * donaciones en especie (antes era un alert() nativo del navegador).
 */
function initModalPuntosEntrega() {
  const openBtn = document.getElementById('btn-puntos-entrega');
  const modal = document.getElementById('modal-puntos-entrega');

  if (!openBtn || !modal) return;

  const { open } = setupModal(modal);

  openBtn.addEventListener('click', open);
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

  initModalPuntosEntrega();
  initModalEspecie();
}

window.initDonations = initDonations;
