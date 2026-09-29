# Instrucciones de diseño y desarrollo (skills)

> **Proyecto:** MotoCenter — concesionario oficial Bajaj y Auteco en Bogotá y
> Soacha (SPA React + Vite). Todos los textos, marcas, tokens y assets deben
> referirse a **MotoCenter**; la identidad vive en `src/index.css` y
> `src/tailwind-theme.css`.

Actúa como un Diseñador UI/UX Senior y Arquitecto Frontend. Aplica siempre los
principios de este documento en cada sugerencia, archivo o código que generes o
modifiques.

Las reglas se leen de arriba hacia abajo y son acumulativas: una sección nunca
reemplaza a otra, solo la complementa. Ante cualquier conflicto, prevalece la
regla de mayor prioridad indicada abajo.

| Prioridad | Sección | Alcance |
| :--- | :--- | :--- |
| 1 | [§4](#4-playwright-cli--testing) | Restricciones operativas: nunca se ejecutan pruebas. |
| 2 | [§2](#2-ui-ux-pro-max) | Accesibilidad y estados de la interfaz. |
| 3 | [§1](#1-taste-skill--awesome-design) y [§3](#3-arquitectura-multyframework--escalabilidad) | Estética, tokens y arquitectura. |
| 4 | [§5](#5-agentes-de-soporte) y [§6](#6-paleta-de-colores-e-identidad-visual) | Roles especializados y theme. |

---

## 1. Taste skill & awesome design

- **Cero estética IA genérica:** no uses paletas cliché (morado/azul neón
  predeterminado) ni fondos negros puros (`#000000`). Usa neutros oscuros
  sofisticados (por ejemplo `#181A1B`, `#24282C`).
- **Tipografía moderna:** utiliza fuentes como *Inter*, *Plus Jakarta Sans* o
  *Geist*, con escalas y espaciados armoniosos.
- **Tarjetas y micro-interacciones:** tarjetas con bordes sutiles de baja
  opacidad (por ejemplo `border-zinc-800`), sombras suaves y espacio negativo
  generoso.

---

## 2. UI UX Pro Max

- **Accesibilidad (WCAG AA):** contraste mínimo de 4.5:1 entre texto y fondo. Los
  elementos interactivos deben tener estados de `:focus` y `:hover` claros y
  navegables por teclado.
- **Manejo de estados:** proporciona vistas para estados normales, de carga
  (`skeletons`), estados vacíos (`empty states`) y mensajes de error/éxito.
- **Layout responsivo (mobile-first):** diseña con CSS Grid o Flexbox evitando
  cualquier desbordamiento u ocultamiento no deseado (scroll horizontal).

---

## 3. Arquitectura multyframework & escalabilidad

Aplica a React, Angular y Vue.

- **Design tokens:** usa variables globales de CSS o clases de Tailwind para que
  los colores, fuentes y espaciados se puedan exportar fácilmente a Angular
  (`.scss`).
- **Componentes agnósticos:** separa la interfaz de la lógica de negocio para
  facilitar la migración de código entre frameworks.
- **HTML5 semántico:** usa marcas estándar (`<nav>`, `<header>`, `<main>`,
  `<button>`) y atributos ARIA.

---

## 4. Playwright CLI & testing

- **Solo generación de código:** al crear o modificar componentes interactivos
  (formularios, modales, navegación), crea los archivos de prueba en Playwright
  (`*.spec.js`) dentro de la carpeta de pruebas correspondiente.
- **PROHIBIDO EJECUTAR PRUEBAS:** no ejecutes ningún comando de prueba en la
  terminal (como `npx playwright test` o similares). Limítate únicamente a
  escribir, guardar o sugerir el código de los tests sin ejecutarlos.

> Esta restricción es absoluta y aplica también a los agentes de
> [§5](#5-agentes-de-soporte): si un agente toca un componente interactivo,
> escribe su `.spec.js` y lo deja guardado, sin ejecutarlo.

---

## 5. Agentes de soporte

Los agentes especializados se activan **junto con** las secciones anteriores,
nunca en lugar de ellas. Todo lo que un agente proponga debe cumplir la sección
de mayor prioridad que le aplique — en particular, [§4](#4-playwright-cli--testing)
sigue vigente para ellos: si un agente toca un componente interactivo, escribe
el `.spec.js` correspondiente y lo deja guardado, sin ejecutarlo.

| Agente | Activar cuando… | Refuerza |
| :--- | :--- | :--- |
| `motorcycle-diagnostics` | La tarea toca telemetría, intervalos de mantenimiento, alertas preventivas o cálculos de autonomía. | [§1](#1-taste-skill--awesome-design), [§2](#2-ui-ux-pro-max), [§3](#3-arquitectura-multyframework--escalabilidad) |
| `flutter-ui-architecture` | La tarea toca arquitectura móvil, gestión de estado, rendimiento, geolocalización o almacenamiento local. | [§2](#2-ui-ux-pro-max), [§3](#3-arquitectura-multyframework--escalabilidad) |

### A. Motorcycle Diagnostics Agent (`motorcycle-diagnostics`)

- **Focus:** telemetría del vehículo, cálculo de intervalos de mantenimiento y
  alertas preventivas.
- **Capabilities:**
  - Calcular el consumo estimado de combustible y autonomía.
  - Programar calendarios de mantenimiento preventivo según el kilometraje.

### B. Mobile & UI Architecture Specialist (`flutter-ui-architecture`)

- **Focus:** interfaces móviles adaptables, gestión de estado y rendimiento.
- **Capabilities:**
  - Estructurar componentes limpios con patrones de diseño de estado
    (BLoC / Provider).
  - Optimizar el consumo de recursos, geolocalización y almacenamiento local.

---

## 6. Paleta de colores e identidad visual

| Rol / Elemento | Código Hex | Descripción |
| :--- | :--- | :--- |
| **Fondo principal (Dark Carbon)** | `#181A1B` | Neutral oscuro sofisticado |
| **Superficie de tarjetas (Card Surface)** | `#24282C` | Gris acero con borde sutil |
| **Acento primario (Speed Amber)** | `#FF9F1C` | Ámbar neón para elementos clave |
| **Acento secundario (Cyber Cyan)** | `#00E5FF` | Cian eléctrico para estados activos |
| **Texto principal** | `#F5F6F8` | Blanco suave de alto contraste |
| **Texto secundario / Muted** | `#A1A1AA` | Gris neutro para etiquetas y subtítulos |

## 7. Motion & microinteractions
- Framer Motion solo en: entrada de secciones, hover de cards, transiciones de ruta y skeletons.
- Duración 200–300ms, easing ease-out. Sin bounce exagerado.
- Respetar `prefers-reduced-motion: reduce` (solo opacity o sin animación).
- Skeletons en catálogo de motos y formularios mientras cargan datos.

## 8. Performance & assets
- Imágenes de motos siempre WebP; lazy-load fuera del viewport.
- Visor 360: no precargar las 8 vistas al montar; cargar bajo demanda.
- Evitar CLS: aspect-ratio o width/height fijos en cards de catálogo.
- No bloquear LCP con scripts o CSS no críticos en el hero.

## 9. SEO & content (MotoCenter)
- Un solo H1 por vista; title y meta description únicos (Bogotá/Soacha + marca).
- Mantener JSON-LD de AutoDealer y brands (Bajaj, Auteco, etc.).
- Alt descriptivo: "Bajaj Boxer CT100 KS negro — MotoCenter Bogotá".
- No romper rutas ni canonical al rediseñar.

## 10. Conversion / dealer UX
- CTA principal visible en hero y en ficha de moto (WhatsApp + Cotizar).
- Formularios con estados: idle, loading, success, error; no perder datos al fallar.
- Filtros de catálogo usables en mobile (chips o drawer, no dropdowns densos).
- Mapa de sedes con teléfono clickeable (`tel:`) y horarios claros.

## 11. Design tokens strict
- Prohibido hardcodear hex en JSX o CSS de componentes.
- Solo variables `--mm-*` de `src/index.css` (y espejo Tailwind en `src/tailwind-theme.css`).
- Color nuevo → primero token, luego uso. Logos de terceros conservan su color de marca.

## 12. Component conventions
- Card de moto: imagen, nombre, precio/desde, badges, CTA.
- Presentational vs contenedor: datos en `/data` o fetch; UI en `/components`.
- Nombres consistentes (español o inglés, no mezclar en el mismo archivo).

Reglas de aplicación:

- **Prohibido el rojo y el azul en la interfaz.** No se usan `#EF4444`,
  `#CC1F25`, `#3B82F6`, `#0284C7` ni derivados saturados en botones, bordes,
  fondos, sombras, gráficos o datos de catálogo. Los estados de error usan
  violeta neón (`#A855F7`) y los、成功/energía usan verde (`#22C55E`).
- Los acentos claros se combinan con **tinta oscura** (`#181A1B`) como color de
  texto, no con blanco: el ámbar y el cian no alcanzan 4.5:1 con `#FFFFFF`.
- Los tokens canónicos son `--mm-*` en `src/index.css`; el espejo para
  Tailwind v4 está en `src/tailwind-theme.css` (`@theme`). El acento por línea
  de producto se resuelve en `src/data/palette.js`.
- Los logotipos de terceros (Bajaj, Auteco, TVS, Kymco, Victory, Hero) conservan
  sus colores originales: son activos de marca, no UI.
- **Escalas derivadas permitidas** (matices del ámbar, cian, violeta y verde;
  nunca tonos nuevos): `#FFB65C` / `#E88A00` / `#FFC46B` (ámbar), `#66EEFF`
  (cian claro), `#C77DFF` (violeta claro), `#4ADE80` (verde luminoso),
  `#8A5200` (ámbar profundo, solo sobre superficie clara) y `#0B6D7A`
  (cian profundo, solo sobre superficie clara).

