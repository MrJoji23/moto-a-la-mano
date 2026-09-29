import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HondaCountdownBar.css';

// Misma fecha que HondaTeaserCard — ajústala en ambos lados si cambia
const LAUNCH_DATE = new Date('2026-10-01T00:00:00-05:00');
const DISMISS_KEY = 'hondaBarDismissed';

const getDaysLeft = () => {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { dias: 0, terminado: true };
  return { dias: Math.ceil(diff / (1000 * 60 * 60 * 24)), terminado: false };
};

const HondaCountdownBar = () => {
  const [{ dias, terminado }, setTiempo] = useState(getDaysLeft);
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(DISMISS_KEY) === 'true'
  );
  const navigate = useNavigate();

  const visible = !terminado && !dismissed;

  // Recalcula el conteo cada minuto (no necesita más precisión, solo mostramos días)
  useEffect(() => {
    const interval = setInterval(() => setTiempo(getDaysLeft()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Sincroniza una clase en <html> para que el navbar sepa cuánto espacio reservar
  useEffect(() => {
    document.documentElement.classList.toggle('honda-bar-active', visible);
    return () => document.documentElement.classList.remove('honda-bar-active');
  }, [visible]);

  if (!visible) return null;

  const handleClick = () => {
    if (window.location.pathname === '/') {
      document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    sessionStorage.setItem(DISMISS_KEY, 'true');
    setDismissed(true);
  };

  return (
    <div
      className="honda-bar"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <p className="honda-bar__text">
        ¡¡¡¡Preparate porque HONDA llega a MegaMoto — faltan <strong>{dias}</strong> día{dias === 1 ? '' : 's'}!!!!
      </p>
      <button
        className="honda-bar__close"
        onClick={handleDismiss}
        aria-label="Cerrar aviso"
      >
        ×
      </button>
    </div>
  );
};

export default HondaCountdownBar;