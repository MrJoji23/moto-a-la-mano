import {LazyMotion, domAnimation, m} from 'framer-motion';
import './HeroCopy.css';
import SectionDivider from '../main-page/SectionDivider';

// ── Animaciones ─────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};
export default function HeroCopy(){
  return (
    <LazyMotion features={domAnimation}> 
      <section className="hero-copy">
        <div className="hero-copy__inner">
          {/* Texto izquierdo */}
          <m.div
            className="hero-copy__text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            <m.span className="hero-copy__eyebrow" variants={fadeUp} custom={0}>
              Bogotá · Motos &amp; Repuestos
            </m.span>
            <m.h1 variants={fadeUp} custom={1}>
              Bienvenido a{' '}
              <span className="accent-blue">Mega</span>
              <span className="accent-red">Moto</span>
              <span className="accent-red"> Group</span>
            </m.h1>
            <m.p className="hero-copy__sub" variants={fadeUp} custom={2}>
              Tu destino número uno de motos Bajaj y Auteco, accesorios, repuestos y servicios de mantenimiento en Bogotá y Soacha. Calidad y confianza desde el primer día. ¡Empieza a rodar hoy!
            </m.p>
          </m.div>
        </div>
        <SectionDivider/>
      </section>
    </LazyMotion> 
  );
}