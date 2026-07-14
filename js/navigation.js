/* =====================================================================
   NAVIGATION.JS
   Responsable de todo lo relacionado con la navegación del sitio:
   - Scroll suave al hacer clic en los enlaces del menú (#inicio,
     #mission, #programs, etc.)
   - Abrir/cerrar el menú hamburguesa en pantallas pequeñas.
   - Compactar el navbar y darle sombra al hacer scroll.
   - Resaltar en el menú el enlace de la sección que se está viendo
     ("scrollspy").
   =====================================================================
   Este archivo expone una única función "initNavigation" en el objeto
   global "window", para que main.js pueda llamarla al cargar la
   página. Así cada archivo hace UNA sola cosa y es fácil de leer.
   ===================================================================== */

function initNavigation() {

  // Seleccionamos TODOS los enlaces cuyo "href" empiece con "#"
  // (por ejemplo: <a href="#programs">Programas</a>)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');

      // Si el href es solo "#" (sin id), no hacemos nada especial
      if (!targetId || targetId === '#') return;

      const targetSection = document.querySelector(targetId);

      // Si el elemento existe en la página, evitamos el salto brusco
      // por defecto del navegador y hacemos scroll animado hacia él.
      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  initMobileMenu();
  initNavbarScrollEffect();
  initScrollSpy();
}

/**
 * Controla el botón hamburguesa (#navbar-toggle) que en pantallas
 * pequeñas (< 768px, ver responsive.css) muestra u oculta el menú
 * de enlaces (#navbar-menu) como un desplegable. La animación de las
 * 3 barras convirtiéndose en una "X" vive en navbar.css, aquí solo
 * agregamos/quitamos la clase que la dispara.
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');

  if (!toggleBtn || !menu) return;

  function closeMenu() {
    menu.classList.remove('navbar__menu--open');
    toggleBtn.classList.remove('navbar__toggle--active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    menu.classList.add('navbar__menu--open');
    toggleBtn.classList.add('navbar__toggle--active');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('navbar__menu--open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerramos el menú al elegir una sección (el scroll suave ya se
  // encarga de llevar al usuario ahí).
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Cerramos el menú si el usuario hace clic fuera de él.
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnToggle = toggleBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle) {
      closeMenu();
    }
  });
}

/**
 * Agrega la clase "navbar--scrolled" (definida en navbar.css) apenas
 * el usuario baja un poco en la página, para que la barra se vea más
 * sólida y con sombra sobre el contenido en vez de flotar "plana".
 */
function initNavbarScrollEffect() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 40;

  const updateNavbarState = () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState, { passive: true });
}

/**
 * "Scrollspy": observa qué sección de la página está actualmente en
 * pantalla y le agrega la clase "navbar__link--active" (ver
 * navbar.css) al enlace del menú correspondiente, para que el usuario
 * siempre sepa en qué parte del sitio está.
 */
function initScrollSpy() {
  const sectionIds = ['inicio', 'mission', 'programs', 'donations', 'testimonials', 'contact', 'social'];

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const linksById = {};
  sectionIds.forEach((id) => {
    linksById[id] = document.querySelector(`.navbar__link[href="#${id}"]`);
  });

  function setActiveLink(activeId) {
    Object.entries(linksById).forEach(([id, link]) => {
      if (!link) return;
      link.classList.toggle('navbar__link--active', id === activeId);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      // Consideramos "activa" la sección que cruza una franja angosta
      // cerca del centro vertical de la pantalla, justo debajo del navbar.
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// Hacemos la función accesible desde otros archivos (main.js)
window.initNavigation = initNavigation;
