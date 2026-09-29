import { useRef } from 'react';
import { LazyMotion,domAnimation, m, useInView } from 'framer-motion';
import { AUTECO_BRANDS } from '../../data/AUTECO/autecoData';
import './AutecoBrandsSection.css';

const AutecoBrandsSection = ({ marcaSeleccionada, onMarcaSelect }) => {
  const brandsRef = useRef(null);
  const brandsInView = useInView(brandsRef, { once: true, margin: '-60px' });

  const handleClick = (id) => {
    onMarcaSelect(marcaSeleccionada === id ? null : id); // toggle: click mismo = deseleccionar
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="auteco-section" ref={brandsRef}>
        <m.h1
          className="auteco-section__title"
          initial={{ opacity: 0, x: -20 }}
          animate={brandsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: .5 }}
        >
          Mega Moto <span>Auteco</span>
        </m.h1>

        <m.div
          className="auteco-brands-grid"
          initial="hidden"
          animate={brandsInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: .09 } } }}
        >
          {AUTECO_BRANDS.map((brand) => (
            <m.div
              key={brand.id}
              className={`abrand-card${marcaSeleccionada === brand.id ? ' abrand-card--active' : ''}`}
              style={{ '--bc': brand.color }}
              variants={{
                hidden:  { opacity: 0, scale: 0.95, y: 20 },
                visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: .5, ease: [.22,.61,.36,1] } },
              }}
              whileHover={{ y: -5, transition: { duration: .22 } }}
              onClick={() => handleClick(brand.id)}
            >
              <img src={brand.bg} alt={brand.name} className="abrand-card__img" />
              <div className="abrand-card__overlay" />
              <div className="abrand-card__tint" />
              <div className="abrand-card__content">
                <h3 className="abrand-card__name">{brand.name}</h3>
                <p className="abrand-card__tagline">{brand.tagline}</p>
              </div>
              <div className="abrand-card__bar" />
            </m.div>
          ))}
        </m.div>

          {marcaSeleccionada && (
          <m.button
            className="auteco-clear-filter"
            onClick={() => onMarcaSelect(null)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
          >
          ← Ver todas las marcas
          </m.button>
        )}
      </div>
    </LazyMotion>
  );
};

export default AutecoBrandsSection;