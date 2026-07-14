/* =====================================================================
   ANIMATIONS.JS
   Responsable de las animaciones "al hacer scroll": las tarjetas y
   secciones aparecen suavemente (fade + desplazamiento) en el momento
   en que entran en el área visible de la pantalla, en vez de estar
   siempre visibles desde el principio.

   Técnica usada: IntersectionObserver, una API nativa del navegador
   que "avisa" cuando un elemento entra o sale de la pantalla, sin
   tener que estar calculando el scroll manualmente (más eficiente
   que escuchar el evento "scroll").
   ===================================================================== */

function initScrollAnimations() {

  // Lista de selectores a los que queremos aplicar la animación de
  // aparición. Se puede ampliar fácilmente agregando más elementos.
  const selectors = [
    '.program-card',
    '.donation-card',
    '.testimonial-card',
    '.social-card',
    '.mission__feature',
  ];

  const elements = document.querySelectorAll(selectors.join(', '));

  // Si el navegador no soporta IntersectionObserver (muy poco común
  // hoy en día), simplemente mostramos todo de una vez y salimos.
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // A cada elemento le agregamos la clase que lo deja "invisible" al
  // inicio (definida en global.css como .reveal-on-scroll).
  elements.forEach((el) => el.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // El elemento ya es visible en pantalla -> lo mostramos
          entry.target.classList.add('is-visible');
          // Dejamos de observarlo: la animación solo debe pasar una vez
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // se activa cuando el 15% del elemento es visible
    }
  );

  elements.forEach((el) => observer.observe(el));
}

window.initScrollAnimations = initScrollAnimations;
