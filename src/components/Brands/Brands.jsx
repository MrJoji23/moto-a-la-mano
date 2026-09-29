import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';
import { BRANDS } from '../../data/brandsData';
import './Brands.css';
import SectionDivider from '../main-page/SectionDivider';
import HondaTeaserCard from './HondaTeaserCard';

/* ── Animaciones ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Componente ── */
const Brands = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <LazyMotion features={domAnimation}>
      <section id="marcas" className="brands" ref={ref}>
        {/* ── Vista principal ── */}
        <m.div key="grid">
          <m.div
            className="brands__header"
            variants={titleVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className="brands__eyebrow">Distribuidores Oficiales</span>
            <h2 className="brands__title">
              Nuestras <span className="brands__title-accent">Marcas</span>
            </h2>
            <p className="brands__desc">
              Trabajamos con las marcas líderes del mercado para ofrecerte la mejor relación calidad-precio.
            </p>
          </m.div>

          <m.div
            className="brands__grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {BRANDS.map((brand) => (
              <Link
                key={brand.id}
                to={`/${brand.id}`}
                className="brand-tile"
                style={{ '--brand-color': brand.color }}
              >
                <m.div
                  className="brand-tile__inner"
                  variants={cardVariants}
                >
                  <span className="brand-tile__glow" aria-hidden="true" />

                  <span className="brand-tile__bar" aria-hidden="true" />

                  <span className="brand-tile__body">
                    <span className="brand-tile__logo-wrap">
                      <img src={brand.logo} alt="" className="brand-tile__logo" />
                    </span>

                    <span className="brand-tile__info">
                      <span className="brand-tile__tagline">{brand.tagline}</span>
                      <span className="brand-tile__name">{brand.name}</span>
                      <span className="brand-tile__desc">{brand.description}</span>

                      <span className="brand-tile__models">
                        {brand.models.map((modelo) => (
                          <span key={modelo} className="brand-tile__model-tag">
                            {modelo}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="brand-tile__stat">
                      <span className="brand-tile__stat-num">{brand.stat.num}</span>
                      <span className="brand-tile__stat-label">{brand.stat.label}</span>
                    </span>

                    <span className="brand-tile__arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </m.div>
              </Link>
            ))}

            {/* ── Teaser Honda ── */}
            <HondaTeaserCard />
          </m.div>
        </m.div>

        <SectionDivider />
      </section>
    </LazyMotion>
  );
};

export default Brands;