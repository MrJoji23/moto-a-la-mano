import { useEffect, useState } from 'react';
import hondaLogo from '../../assets/images/logohonda.webp';
import './HondaTeaserCard.css';

const LAUNCH_DATE = new Date('2026-10-01T00:00:00-05:00');

const getTimeLeft = () => {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { dias: 0, horas: 0, min: 0, seg: 0, terminado: true };
  }
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / (1000 * 60)) % 60),
    seg: Math.floor((diff / 1000) % 60),
    terminado: false,
  };
};

const HondaTeaserCard = () => {
  const [tiempo, setTiempo] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTiempo(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="brand-tile honda-tile">
      <span className="honda-tile__badge">Próximamente</span>

      <div className="brand-tile__body">
        <div className="honda-tile__logo-wrap">
          <img src={hondaLogo} alt="Honda" className="honda-tile__logo" />
        </div>

        <div className="brand-tile__info">
          <p className="brand-tile__tagline">Se acerca una nueva era</p>
          <h3 className="brand-tile__name">Honda</h3>
          <p className="brand-tile__desc">
            Muy pronto sumamos a Honda, la marca de motos más grande del
            mundo, a nuestro portafolio de MotoCenter.
          </p>
        </div>

        <div className="honda-tile__countdown">
          <span className="sr-only">
            {tiempo.terminado
              ? 'Honda ya está disponible en nuestro portafolio.'
              : `Lanzamiento previsto el 1 de octubre de 2026. Faltan ${tiempo.dias} días.`}
          </span>
          <div className="honda-tile__countdown-inner" aria-hidden="true">
            {tiempo.terminado ? (
              <span className="honda-tile__live">¡Ya está aquí!</span>
            ) : (
              [
                { label: 'Días', val: tiempo.dias },
                { label: 'Hrs', val: tiempo.horas },
                { label: 'Min', val: tiempo.min },
                { label: 'Seg', val: tiempo.seg },
              ].map((u) => (
                <div className="honda-tile__unit" key={u.label}>
                  <span className="honda-tile__unit-num">
                    {String(u.val).padStart(2, '0')}
                  </span>
                  <span className="honda-tile__unit-lbl">{u.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HondaTeaserCard;