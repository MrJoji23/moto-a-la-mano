/**
 * Lectura de design tokens desde JS.
 *
 * Algunos contextos (canvas 2D, iconos de Leaflet, valores de framer-motion)
 * no resuelven `var(--mm-*)` por sí solos. En lugar de hardcodear el hex en
 * el componente, se lee el token canónico del tema. Así la fuente de verdad
 * sigue siendo `src/index.css` y cambiar un token se propaga a todos lados.
 */

const cache = new Map();

export const tokenColor = (name, fallback) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return fallback;

  const cached = cache.get(name);
  if (cached) return cached;

  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const resolved = value || fallback;
  cache.set(name, resolved);
  return resolved;
};

/** Vacía la caché: úsese si el tema puede cambiar en caliente. */
export const clearTokenCache = () => cache.clear();

/** Lista de channels "r, g, b" a partir de un token hex o rgb. */
export const tokenRgb = (name, fallback) => {
  const color = tokenColor(name, fallback);

  const hexMatch = /^#([0-9a-f]{6})$/i.exec(color);
  if (hexMatch) {
    const int = parseInt(hexMatch[1], 16);
    const r = Math.floor(int / 65536) % 256;
    const g = Math.floor(int / 256) % 256;
    const b = int % 256;
    return `${r}, ${g}, ${b}`;
  }

  return color;
};
