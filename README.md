# Fundación Jecani — Sitio Web

Sitio web institucional de la Fundación Jecani, convertido de **Tailwind CSS
(CDN)** a **HTML + CSS + JavaScript puro**, organizado en archivos separados
y comentados para que cualquier persona pueda entenderlo y mantenerlo sin
depender de un framework de utilidades.

## 📁 Estructura del proyecto

```
Fundacion-Jecani/
│
├── index.html                 # Estructura completa de la página (una sola página, con anclas)
│
├── css/
│   ├── reset.css               # Normaliza los estilos por defecto del navegador
│   ├── variables.css           # Colores, tipografías, radios, sombras (custom properties)
│   ├── global.css              # Estilos base + componentes reutilizables (botones, tarjetas)
│   ├── navbar.css              # Barra de navegación superior
│   ├── hero.css                # Sección de portada
│   ├── mission.css             # Sección "Nuestra Misión"
│   ├── programs.css            # Sección "Etapas de la Restauración"
│   ├── donations.css           # Sección "Donaciones"
│   ├── testimonials.css        # Sección "Voces de Esperanza"
│   ├── social.css              # Sección "Redes Sociales"
│   ├── contact.css             # Sección de contacto + mapa + formulario
│   ├── footer.css              # Pie de página
│   └── responsive.css          # Media queries (tablet / celular), se carga al final
│
├── js/
│   ├── navigation.js           # Navbar: scroll suave, menú móvil, encogerse al hacer scroll, scrollspy
│   ├── animations.js           # Animaciones de aparición al hacer scroll (IntersectionObserver)
│   ├── donations.js            # Copiar IBAN / SINPE al portapapeles, botón de puntos de entrega
│   ├── theme.js                # Modo oscuro: alterna data-theme y recuerda la preferencia
│   └── main.js                 # Punto de entrada: inicializa todo + formularios de contacto/newsletter
│
├── ts/
│   └── README.md               # Explica por qué no se usa TypeScript por ahora (y cómo migrar si hiciera falta)
│
├── assets/
│   ├── img/                    # Imágenes del sitio (ver README interno con la lista de nombres esperados)
│   ├── icons/                  # Iconos SVG de redes sociales (Instagram, Facebook, TikTok, YouTube, WhatsApp)
│   └── fonts/                  # Reservada para alojar fuentes localmente (opcional, ver README interno)
│
└── README.md                   # Este archivo
```

## 🧠 ¿Por qué esta separación?

El diseño original usaba **Tailwind CSS vía CDN**, lo que significa que
todos los estilos vivían como clases larguísimas directamente en el HTML
(`class="flex items-center gap-3 ..."`). Eso es rápido para prototipar,
pero difícil de leer y mantener para alguien que no conoce Tailwind.

Aquí cada sección del sitio tiene:
- **Su propio archivo CSS**, con nombres de clases descriptivos en español
  usando la metodología **BEM** (`bloque__elemento--modificador`), por
  ejemplo: `.program-card__title`, `.btn--primary`.
- **Comentarios explicando qué hace cada bloque de reglas**, para que se
  entienda sin necesidad de conocer Tailwind ni BEM de antemano.

## 🖥️ Cómo ver el sitio

No se necesita instalar nada. Basta con abrir `index.html` directamente en
el navegador, o servirlo con cualquier servidor local, por ejemplo:

```bash
# Opción 1: doble clic en index.html

# Opción 2: con Python (si lo tienes instalado)
python3 -m http.server 5500
# y luego abrir http://localhost:5500 en el navegador

# Opción 3: con la extensión "Live Server" de VS Code
```

## ⚠️ Pendientes antes de publicar el sitio

1. **Imágenes**: descargar y colocar en `assets/img/` las fotografías
   listadas en `assets/img/README.md` (actualmente el HTML apunta a
   nombres de archivo locales que aún no existen).
2. **Logo**: agregar el logo real en `assets/img/logo-jecani.png`.
3. **Formularios**: los formularios de contacto y newsletter
   (`js/main.js`) solo muestran una alerta de confirmación; falta
   conectarlos a un servicio real de envío de correos o a un backend
   propio.
4. **Enlaces de redes sociales**: reemplazar los `href="#"` de la sección
   de redes sociales y del footer por los enlaces reales de la fundación.
5. **PayPal**: reemplazar el `href="#"` del botón de PayPal por el enlace
   real de donación.
6. **Datos de contacto**: verificar que el teléfono, la dirección, el
   número de SINPE Móvil y los IBAN bancarios sean los datos reales y
   vigentes de la fundación.

## 🎨 Sistema de diseño (resumen)

Definido en `css/variables.css`:
- **Color primario:** verde `#2d6a4f` (marca institucional).
- **Tipografía de títulos:** "Source Serif 4" (serif, elegante).
- **Tipografía de texto:** "Inter" (sans-serif, muy legible).
- **Iconos:** Material Symbols Outlined (Google).

## 📱 Responsive

Todas las reglas de adaptación a pantallas pequeñas están centralizadas en
`css/responsive.css`, agrupadas por 3 puntos de quiebre (`1024px`, `768px`,
`640px`) y comentadas sección por sección, para que sea fácil ajustar el
comportamiento en móviles sin tener que buscar en cada archivo CSS.
# JECANI
