import { useRef } from 'react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';
import { BAJAJ_BRANDS } from '../../data/BAJAJ/bajajData';
import './BajajBrandsSection.css';

const BajajBrandsSection = ({ marcaSeleccionada, onMarcaSelect }) => {
  const brandsRef = useRef(null);
  const brandsInView = useInView(brandsRef, { once: true, margin: '-60px' });

  return (
    <LazyMotion features={domAnimation}>
      <div className="bajaj-section" ref={brandsRef}>
        <m.h1
          className="bajaj-section__title"
          initial={{ opacity: 0, x: -20 }}
          animate={brandsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: .5 }}
        >
          Mega Moto  <span>Bajaj</span>
        </m.h1>

        <m.div
          className="bajaj-brands-grid"
          initial="hidden"
          animate={brandsInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: .09 } } }}
        >
          {BAJAJ_BRANDS.map((brand) => (
            <m.div
              key={brand.id}
              className={`bbrand-card ${marcaSeleccionada === brand.id ? 'bbrand-card--active' : ''}`}
              style={{ '--bc': brand.color,
                backgroundImage: `url(${brand.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              variants={{
                hidden:   { opacity: 0, scale: 0.95, y: 20 },
                visible:  { opacity: 1, scale: 1,    y: 0,  transition: { duration: .5, ease: [.22,.61,.36,1] } },
              }}
              whileHover={{ y: -5, transition: { duration: .22 } }}
              onClick={() => onMarcaSelect(marcaSeleccionada === brand.id ? null : brand.id)}
            >
              <div className="bbrand-card__content">
                <h3 className="bbrand-card__name">{brand.name}</h3>
                <p className="bbrand-card__tagline">{brand.tagline}</p>
              </div>
              <div className="bbrand-card__bar" />
            </m.div>
          ))}
        </m.div>

        {marcaSeleccionada && (
          <m.button
            className="bajaj-clear-filter"
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

export default BajajBrandsSection;