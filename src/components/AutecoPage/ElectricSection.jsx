import { useState } from 'react';
import { LazyMotion, domAnimation, m,AnimatePresence, useReducedMotion } from 'framer-motion';
import { ELECTRICOS } from '../../data/AUTECO/autecoData';
import LightningCanvas from './LightningCanvas';
import './ElectricSection.css';
import MotoInfoModal from '../BajajPage/MotoInfoModal';

const WA_NUMBER = '573160404047';

const CONTAINER_VARIANTS = {
  hidden : {},
  visible: { transition: { staggerChildren: 0.07 } },
};
 
const CARD_VARIANTS = {
  hidden : { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] },
  },
};
 
const HOVER_ANIM  = { y: -7 };
const HOVER_TRANS = { duration: 0.22 };
const NO_HOVER    = {};
 
const SHOW_LIGHTNING = typeof window !== 'undefined' && window.innerWidth >= 768;

const ElectricSection = () => {
  const shouldReduce = useReducedMotion();
  const [motoSeleccionada, setMotoSeleccionada] = useState(null);

  const handleCotizar = (moto, e) => {
    e.stopPropagation();
    const texto = encodeURIComponent(
      `Hola! Estoy interesado en cotizar la *${moto.name}* - Precio desde ${moto.precio}. ¿Me pueden dar más información?`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`, '_blank');
  };

  return (
  <LazyMotion features={domAnimation}>
   <> 
      <div className="elec-section">
        {SHOW_LIGHTNING && !shouldReduce && <LightningCanvas />}
        <div className="elec-grid-bg" />

        <div className="elec-inner">
          <m.div
            className="elec-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .5 }}
          >
            <span className="elec-eyebrow"> Nueva era</span>
            <h2 className="elec-title">
              Movilidad<br />
              <span className="elec-title--glow">Eléctrica</span>
            </h2>
            <p className="elec-desc">
              Cero emisiones, máxima potencia. La revolución eléctrica ya llegó a Colombia.
            </p>

          </m.div>

          <m.div
            className="elec-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={CONTAINER_VARIANTS}
          >
            {ELECTRICOS.map((moto) => (
              <m.div
                key={moto.id}
                className="elec-card"
                variants={CARD_VARIANTS}
                whileHover={shouldReduce ? NO_HOVER : HOVER_ANIM}
                transition={HOVER_TRANS}
                onClick={() => setMotoSeleccionada(moto)}
              >
                <div className="elec-card__img-wrap">
                  <img src={moto.img} alt={moto.name} className="elec-card__img" loading="lazy" decoding="async" />
                  <div className="elec-card__img-overlay" />
                  {moto.destacado && (<span className="elec-card__featured">{moto.destacado}</span>)}
                </div>
                <div className="elec-card__body">
                  <span className="elec-card__tipo">{moto.tipo}</span>
                  <h3 className="elec-card__name">{moto.name}</h3>
                  <div className="elec-card__specs">
                    <div className="elec-card__spec">
                      <span className="elec-card__spec-val">{moto.potencia}</span>
                      <span className="elec-card__spec-lbl">Potencia</span>
                    </div>
                    <div className="elec-card__spec">
                      <span className="elec-card__spec-val">{moto.autonomia}</span>
                      <span className="elec-card__spec-lbl">Autonomía</span>
                    </div>
                    <div className="elec-card__spec">
                      <span className="elec-card__spec-val">{moto.tiempo_carga}</span>
                      <span className="elec-card__spec-lbl">Carga</span>
                    </div>
                  </div>
                  <div className="elec-card__footer">
                    <span className="elec-card__precio">{moto.precio}</span>
                      <div className="elec-card__actions"> 
                      <button
                        className="elec-card__btn-outline" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setMotoSeleccionada(moto);
                        }}
                      >
                        Info
                      </button>
                      <button
                        className="elec-card__btn elec-card__btn--wa" 
                        onClick={(e) => handleCotizar(moto, e)}
                      >
                         <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" style={{ flexShrink: 0 }}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.124 1.532 5.858L.067 23.491a.5.5 0 00.625.583l5.852-1.532A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                        </svg>
                        Cotizar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="elec-card__glow-bar" />
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
      {/* ── Modal Info completo ── */}
      <AnimatePresence>
        {motoSeleccionada && (
          <MotoInfoModal
            moto={motoSeleccionada}
            onClose={() => setMotoSeleccionada(null)}
          />
        )}
      </AnimatePresence>
    </>
  </LazyMotion>
  );
};

export default ElectricSection;
