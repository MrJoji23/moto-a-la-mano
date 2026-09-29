import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FaMotorcycle, FaTools, FaWrench, FaWallet } from 'react-icons/fa';
import './Services.css';
import SectionDivider from '../main-page/SectionDivider';

// ── Datos ──────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    title: 'Venta de Motos',
    desc: 'Encuentra la moto perfecta para ti. Tenemos las mejores marcas del mercado con financiación disponible.',
    icon: <FaMotorcycle />,
  },
  {
    id: 2,
    title: 'Venta de Repuestos',
    desc: 'Los mejores repuestos originales y alternativos para mantener tu moto en perfecto estado.',
    icon: <FaTools />,
  },
  {
    id: 3,
    title: 'Mantenimiento',
    desc: 'Servicio técnico especializado para tu moto. Revisiones, cambios de aceite, frenos y mucho más a cargo de expertos.',
    icon: <FaWrench />,
  },
  {
    id: 4,
    title: 'Financiamiento',
    desc: 'Paga a cuotas sin complicaciones y consigue hoy mismo la moto de tus sueños.',
    icon: <FaWallet />,
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

export default function Services() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="section services">
        <m.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Nuestros <span>Servicios</span>
        </m.h2>

        <div className="row g-4">
          {SERVICES.map((service, i) => (
            <div className="col-12 col-sm-6 col-lg-3" key={service.id}>
              <m.div
                className="service-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <span className="service-card__icon">{service.icon}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </m.div>
            </div>
          ))}
        </div>
        <SectionDivider/>
      </section>
    </LazyMotion>
  );
}