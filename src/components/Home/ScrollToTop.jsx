import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RETRY_MS = 120;
const RETRIES = 8;

/**
 * Restaura el scroll al navegar dentro del SPA.
 * - Sin hash  -> vuelve al inicio.
 * - Con hash  -> desplaza hasta la sección correspondiente (respeta
 *                `scroll-padding-top` para no quedar oculta bajo el navbar fijo).
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const target = hash.slice(1);
    let attempts = 0;

    const scrollToHash = () => {
      const element = document.getElementById(target);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      // La sección puede montarse de forma diferida (lazy / animated).
      if (attempts < RETRIES) {
        attempts += 1;
        window.setTimeout(scrollToHash, RETRY_MS);
      }
    };

    scrollToHash();
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
