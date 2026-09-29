import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FaAward, FaShippingFast, FaHeadset } from 'react-icons/fa';
import './WhyUs.css';

/* Nada de copy de e-commerce: esto es un concesionario. */
const WHY_US = [
  {
    Icon: FaAward,
    number: '01',
    title: 'Concesionario oficial',
    desc: 'Somos distribuidor autorizado Bajaj y Auteco: garantía de fábrica, repuestos originales y respaldo real del fabricante.',
  },
  {
    Icon: FaShippingFast,
    number: '02',
    title: 'Entrega y prueba de manejo',
    desc: 'Preparas tu moto antes de entregarla y te la probamos en ruta. Sin sorpresas el primer día.',
  },
  {
    Icon: FaHeadset,
    number: '03',
    title: 'Acompañamiento real',
    desc: 'Un asesor fijo te acompaña antes y después de la compra. Taller propio para que tu moto nunca se detenga.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function WhyUs() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="section why-us" aria-labelledby="why-us-title">
        <m.h2
          id="why-us-title"
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          ¿Por Qué <span>Elegirnos?</span>
        </m.h2>

        <div className="why-us__grid">
          {WHY_US.map(({ Icon, title, number, desc }, i) => (
            <m.div
              key={title}
              className="why-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <span className="why-card__icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="why-card__number" aria-hidden="true">
                {number}
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}