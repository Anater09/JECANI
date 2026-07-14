/* =====================================================================
   MAIN.JS
   Punto de entrada ("entry point") del sitio. Este es el ÚNICO archivo
   que se encarga de:
     1) Esperar a que el HTML esté completamente cargado.
     2) Llamar, en orden, a las funciones "init..." de los demás
        archivos JS (theme.js, navigation.js, animations.js, donations.js).
     3) Manejar la lógica simple que no amerita su propio archivo:
        el formulario de contacto y el formulario de newsletter.

   IMPORTANTE: en index.html, este script se carga DESPUÉS de theme.js,
   navigation.js, animations.js y donations.js, así que las funciones
   "initTheme", "initNavigation", "initScrollAnimations" e
   "initDonations" ya existen en "window" cuando este archivo se ejecuta.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------- Inicializar módulos --------------------
  if (typeof window.initTheme === 'function') {
    window.initTheme();
  }

  if (typeof window.initNavigation === 'function') {
    window.initNavigation();
  }

  if (typeof window.initScrollAnimations === 'function') {
    window.initScrollAnimations();
  }

  if (typeof window.initDonations === 'function') {
    window.initDonations();
  }

  // -------------------- Formulario de contacto --------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const telefono = document.getElementById('telefono').value.trim();

      if (!nombre || !telefono) {
        alert('Por favor completa tu nombre y número telefónico.');
        return;
      }

      // TODO: aquí se debe conectar con un backend / servicio de
      // correo (ej. Formspree, EmailJS, un endpoint propio, etc.)
      // para que el mensaje realmente se envíe. Por ahora solo
      // confirmamos al usuario que su solicitud fue recibida.
      console.log('Formulario de contacto enviado:', { nombre, telefono });
      alert(`¡Gracias, ${nombre}! Te contactaremos muy pronto al ${telefono}.`);

      contactForm.reset();
    });
  }

  // -------------------- Formulario de newsletter (footer) --------------------
  const newsletterForm = document.getElementById('newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email) {
        alert('Por favor ingresa un correo válido.');
        return;
      }

      // TODO: conectar con el servicio real de newsletter (Mailchimp,
      // Brevo, etc.)
      console.log('Suscripción a newsletter:', email);
      alert('¡Gracias por suscribirte a nuestras novedades!');

      newsletterForm.reset();
    });
  }

});
