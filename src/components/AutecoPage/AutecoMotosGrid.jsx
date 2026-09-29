import { useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AUTECO_MOTOS, AUTECO_BRANDS } from '../../data/AUTECO/autecoData';
import MotoInfoModal from '../BajajPage/MotoInfoModal';
import './AutecoMotosGrid.css';

/* ── Número de WhatsApp de la empresa ── */
const WA_NUMBER = '573160404047';

const CONTAINER_VARIANTS = {
  hidden : {},
  visible: { transition: { staggerChildren: 0.05 } },
};
 
const CARD_VARIANTS = {
  hidden : { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
  },
};
 
const HOVER_ANIM   = { y: -5 };
const HOVER_TRANS  = { duration: 0.22 };
const NO_HOVER     = {};

const AutecoMotosGrid = ({ marcaSeleccionada }) => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();
  const [motoSeleccionada, setMotoSeleccionada] = useState(null);

  const filteredMotos = marcaSeleccionada 
    ? AUTECO_MOTOS.filter(moto => moto.marca === marcaSeleccionada)
    : AUTECO_MOTOS.filter(moto => moto.marca !== 'electricos');

  const tituloMarca = marcaSeleccionada 
    ? AUTECO_BRANDS.find(b => b.id === marcaSeleccionada)?.name 
    : null;

  const handleCotizar = (moto, e) => {
    e.stopPropagation();
    const texto = encodeURIComponent(
      `Hola! Estoy interesado en cotizar la *${moto.name}* (${moto.cc}) - Precio desde ${moto.precio}. ¿Me pueden dar más información?`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`, '_blank');
  };

 
  return (
    <LazyMotion features={domAnimation}>
      <>
        <div ref={gridRef}>
          <m.h2
            className="auteco-grid__title"
            initial={{ opacity: 0, x: -20 }}
            animate={gridInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .45 }}
          >
            {tituloMarca ? (
              <>
                Modelos <span>{tituloMarca}</span>
              </>
            ) : (
              <>
                Línea de <span>Modelos</span>
              </>
            )}
          </m.h2>

          <m.div
            className="auteco-motos-grid"
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={CONTAINER_VARIANTS}
          >
            {filteredMotos.map((moto) => (
              <m.div
                key={moto.id}
                className={`auteco-mcard${moto.destacado ? ' auteco-mcard--featured' : ''}`}
                style={{ '--bc': moto.color, '--bc-rgb': moto.colorRgb || '204,31,37' }}
                variants={CARD_VARIANTS}
                whileHover={shouldReduce ? NO_HOVER : HOVER_ANIM}
                transition={HOVER_TRANS}
                onClick={() => setMotoSeleccionada(moto)}
              >
                {moto.destacado && (
                  <span className="auteco-mcard__badge">{moto.destacado}</span>
                )}

                <div className="auteco-mcard__img-wrap">
                  <img src={moto.img} alt={moto.name} className="auteco-mcard__img" loading="lazy" decoding="async"/>
                  <div className="auteco-mcard__img-overlay" />
                  <span className="auteco-mcard__tipo">{moto.tipo}</span>

                  {/* Badge de colores disponibles */}
                  {moto.colores && (
                    <div className="auteco-mcard__color-dots">
                      {moto.colores.slice(0, 4).map(c => (
                        <span
                          key={c.nombre}
                          className="auteco-mcard__color-dot"
                          style={{ background: c.hex }}
                          title={c.nombre}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="auteco-mcard__body">
                  <div className="auteco-mcard__header">
                    <h3 className="auteco-mcard__name">{moto.name}</h3>
                  </div>

                  <div className="auteco-mcard__specs">
                    <div className="auteco-mcard__spec">
                      <span className="auteco-mcard__spec-val">{moto.hp}</span>
                      <span className="auteco-mcard__spec-lbl">Potencia</span>
                    </div>
                    <div className="auteco-mcard__spec-divider" />
                    <div className="auteco-mcard__spec">
                      <span className="auteco-mcard__spec-val">{moto.cc}</span>
                      <span className="auteco-mcard__spec-lbl">Cilindrada</span>
                    </div>
                  </div>

                  <div className="auteco-mcard__footer">
                    <div>
                      <span className="auteco-mcard__desde">Desde</span>
                      <span className="auteco-mcard__precio">{moto.precio}</span>
                    </div>
                    <div className="auteco-mcard__actions">
                      <button 
                        className="auteco-mcard__btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMotoSeleccionada(moto);
                        }}
                      >
                        Info
                      </button>
                      <button 
                        className="auteco-mcard__btn-solid auteco-mcard__btn-solid--wa"
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
                <div className="auteco-mcard__bar" />
              </m.div>
            ))}
          </m.div>
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

export default AutecoMotosGrid;