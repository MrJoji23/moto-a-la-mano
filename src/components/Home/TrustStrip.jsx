import { Link } from 'react-router-dom';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { STORES } from '../../data/storesData';
import SectionDivider from '../main-page/SectionDivider';
import './TrustStrip.css';

/* Franja de confianza: datos duros + garantía +WhatsApp.
   Sustituye al antiguo bloque "HeroCopy", que duplicaba el titular y los
   CTAs del hero. El H1 vive únicamente en el hero (§9 SEO). */

const STATS = [
  { value: String(STORES.length), label: 'Sedes' },
  { value: '+60', label: 'Modelos' },
  { value: '10', label: 'Financieras' },
  { value: '100%', label: 'Garantía' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function TrustStrip() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="trust-strip" aria-labelledby="trust-strip-title">
        <h2 id="trust-strip-title" className="sr-only">
          Por qué comprar en MotoCenter
        </h2>

        <div className="trust-strip__inner">
          <m.dl
            className="trust-strip__stats"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="trust-stat">
                <dt className="trust-stat__label">{label}</dt>
                <dd className="trust-stat__value">{value}</dd>
              </div>
            ))}
          </m.dl>

          <m.p
            className="trust-strip__note"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            Concesionario oficial <strong>Bajaj</strong> y <strong>Auteco</strong>.
            Financiamos hasta el 100 %, recibimos tu moto usada como parte de pago
            y tenemos taller propio.{' '}
            <Link to="/financiamiento" className="trust-strip__link">
              Ver opciones de financiamiento
            </Link>
          </m.p>
        </div>

        <SectionDivider />
      </section>
    </LazyMotion>
  );
}
