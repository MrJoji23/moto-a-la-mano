import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './MotoMetodo.css';
import SectionDivider from '../main-page/SectionDivider';

const WA_NUMBER = '573160404047';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/**
 * "Parte de pago" — Idea B: todo centrado.
 * Label + título + subtítulo corto + CTA, sin imagen, sin icono ni columnas.
 */
export default function MotoMetodo() {
  const handleWhatsApp = () => {
    const texto = encodeURIComponent(
      'Hola! Tengo una moto usada y me gustaría saber más información sobre cómo usarla como parte de pago para adquirir una nueva. ¿Me pueden ayudar?'
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`, '_blank');
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="tradein" aria-labelledby="tradein-title">
        <m.div
          className="tradein__inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <m.span className="tradein__eyebrow" variants={fadeUp} custom={0}>
            ¿Moto usada?
          </m.span>

          <m.h2 id="tradein-title" className="tradein__title" variants={fadeUp} custom={1}>
            ¡La recibimos como <span className="tradein__accent">parte de pago</span>!
          </m.h2>

          <m.p className="tradein__sub" variants={fadeUp} custom={2}>
            Trae tu moto usada y úsala para estrenar la que siempre soñaste.
            Fácil, rápido y sin complicaciones.
          </m.p>

          <m.div className="tradein__actions" variants={fadeUp} custom={3}>
            <m.button
              type="button"
              className="tradein__cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleWhatsApp}
            >
              Más información <FaArrowRight size={13} aria-hidden="true" />
            </m.button>
          </m.div>
        </m.div>

        <SectionDivider />
      </section>
    </LazyMotion>
  );
}
