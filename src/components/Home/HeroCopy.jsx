import { Link } from 'react-router-dom';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { STORES } from '../../data/storesData';
import SectionDivider from '../main-page/SectionDivider';
import './HeroCopy.css';

const WA_URL =
  'https://api.whatsapp.com/send?phone=573054300302&text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20sobre%20motos%20y%20accesorios.';

const STATS = [
  { value: String(STORES.length), label: 'Puntos de venta' },
  { value: '+60', label: 'Modelos' },
  { value: '10', label: 'Financieras' },
];

export default function HeroCopy() {
  const reduce = useReducedMotion();

  const item = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] },
  });

  return (
    <LazyMotion features={domAnimation}>
      <section className="hero-copy" aria-labelledby="hero-title">
        <div className="hero-copy__inner">
          <m.p className="hero-copy__eyebrow" {...item(0)}>
            Bogotá · Soacha · La Calera
          </m.p>

          <m.h1 id="hero-title" className="hero-copy__title" {...item(1)}>
            Tu próxima moto <br />
            empieza en <span>MotoCenter</span>
          </m.h1>

          <m.p className="hero-copy__sub" {...item(2)}>
            Concesionario oficial Bajaj y Auteco. Financiación hasta el 100 %,
            recibimos tu moto usada y te acompañamos con servicio técnico.
          </m.p>

          <m.div className="hero-copy__actions" {...item(3)}>
            <Link to="/bajaj" className="btn btn--primary">
              Ver motos Bajaj <FaArrowRight size={12} aria-hidden="true" />
            </Link>
            <Link to="/auteco" className="btn btn--ghost">
              Ver motos Auteco
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa"
            >
              <FaWhatsapp size={16} aria-hidden="true" /> Hablar con un asesor
            </a>
          </m.div>

          <m.dl className="hero-copy__stats" {...item(4)}>
            {STATS.map(({ value, label }) => (
              <div key={label} className="hero-stat">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </m.dl>
        </div>
        <SectionDivider />
      </section>
    </LazyMotion>
  );
}