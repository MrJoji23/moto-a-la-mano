import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';
import { BRANDS } from '../../data/brandsData';
import './Brands.css';
import SectionDivider from '../main-page/SectionDivider';
import HondaTeaserCard from './HondaTeaserCard';

// Importar imágenes locales
import bajajLogo from '../../assets/images/bajaj.jpg';
import autecoLogo from '../../assets/images/auteco.jpg';

// Agregar logos a las marcas
const BRANDS_WITH_LOGOS = BRANDS.map((brand) => ({
  ...brand,
  logo: brand.id === 'bajaj' ? bajajLogo : autecoLogo,
}));



// ── Animaciones ────────────────────────────────
const containerVariants = {
  hidden : {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden : { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
};

const titleVariants = {
  hidden : { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};



// ── Componente ─────────────────────────────────
const Brands = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();

  const handleBrandClick = (brandId) => {
    navigate(`/${brandId}`);
  };

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
                {BRANDS_WITH_LOGOS.map((brand) => (
                  <m.button
                    key={brand.id}
                    className="brand-tile"
                    variants={cardVariants}
                    style={{
                      '--brand-color': brand.color,
                      '--brand-glow':  brand.bgGlow,
                    }}
                    whileHover="hover"
                    onClick={() => handleBrandClick(brand.id)}
                  >
                    <m.div
                      className="brand-tile__glow"
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="brand-tile__bar" />

                    <div className="brand-tile__body">
                      <div className="brand-tile__logo-wrap">
                        <img src={brand.logo} alt={brand.name} className="brand-tile__logo" />
                      </div>

                      <div className="brand-tile__info">
                        <p className="brand-tile__tagline">{brand.tagline}</p>
                        <h3 className="brand-tile__name">{brand.name}</h3>
                        <p className="brand-tile__desc">{brand.description}</p>

                        <ul className="brand-tile__models">
                          {brand.models.map((m) => (
                            <li key={m} className="brand-tile__model-tag">{m}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="brand-tile__stat">
                        <span className="brand-tile__stat-num">{brand.stat.num}</span>
                        <span className="brand-tile__stat-label">{brand.stat.label}</span>
                      </div>
                    </div>

                    <m.div
                      className="brand-tile__arrow"
                      variants={{ hover: { x: 6 } }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </m.div>
                  </m.button>
                ))}

                {/* ── Teaser Honda: se retira cuando la marca quede activa ── */}
                <HondaTeaserCard />
              </m.div>

            </m.div>
            <SectionDivider/>
      </section>
    </LazyMotion>
  );
};

export default Brands;