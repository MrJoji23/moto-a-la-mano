import { useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BAJAJ_MOTOS, BAJAJ_BRANDS } from '../../data/BAJAJ/bajajData';
import Visor360 from './Visor360';
import MotoInfoModal from './MotoInfoModal';
import './BajajMotosGrid.css';

/* ── Numero de Whatsapp ───────────────────────── */
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
 
const HOVER_ANIM  = { y: -5 };
const HOVER_TRANS = { duration: 0.22 };
const NO_HOVER    = {};

/* ─── Modal 360 variants ── */
const OVERLAY_VARIANTS = {
  hidden : { opacity: 0 },
  visible: { opacity: 1 },
};
const MODAL_VARIANTS = {
  hidden : { scale: 0.92, opacity: 0 },
  visible: { scale: 1,    opacity: 1 },
  exit   : { scale: 0.92, opacity: 0 },
};

const BajajMotosGrid = ({ marcaSeleccionada }) => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  const [moto360Seleccionada, setMoto360Seleccionada] = useState(null);
  const [motoInfoSeleccionada, setMotoInfoSeleccionada] = useState(null);

  const filteredMotos = marcaSeleccionada
    ? BAJAJ_MOTOS.filter(moto => moto.marca === marcaSeleccionada)
    : BAJAJ_MOTOS;

  const tituloMarca = marcaSeleccionada
    ? BAJAJ_BRANDS.find(b => b.id === marcaSeleccionada)?.name
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
            className="bajaj-grid__title"
            initial={{ opacity: 0, x: -20 }}
            animate={gridInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .5 }}
          >
            {tituloMarca ? (
              <> Modelos <span>{tituloMarca}</span> </>
            ) : (
              <> Línea de <span>Modelos</span> </>
            )}
          </m.h2>

          <m.div
            className="bajaj-grid"
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={CONTAINER_VARIANTS}
          >
            {filteredMotos.map((moto) => (
              <m.div
                key={moto.id}
                className={`bajaj-card${moto.destacado ? ' bajaj-card--featured' : ''}`}
                style={{ '--bc': moto.color }}
                variants={CARD_VARIANTS}
                whileHover={shouldReduce ? NO_HOVER : HOVER_ANIM}
                transition={HOVER_TRANS}
                onClick={() => setMotoInfoSeleccionada(moto)}
              >
                {moto.destacado && (
                  <span className="bajaj-card__featured-badge">Nuevo Lanzamientro</span>
                )}

                <div className="bajaj-card__img-wrap">
                  <img src={moto.img} alt={moto.name} className="bajaj-card__img" loading="lazy" decoding="async"/>
                  <div className="bajaj-card__img-overlay" />
                  <span className="bajaj-card__tipo-badge">{moto.tipo}</span>

                  {/* Badge de colores disponibles */}
                  {moto.colores && (
                    <div className="bajaj-card__color-dots">
                      {moto.colores.slice(0, 4).map(c => (
                        <span
                          key={c.nombre}
                          className="bajaj-card__color-dot"
                          style={{ background: c.hex }}
                          title={c.nombre}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="bajaj-card__body">
                  <div className="bajaj-card__header">
                    <h3 className="bajaj-card__name">{moto.name}</h3>
                  </div>

                  <div className="bajaj-card__specs">
                    <div className="bajaj-card__spec">
                      <span className="bajaj-card__spec-val">{moto.hp}</span>
                      <span className="bajaj-card__spec-lbl">Potencia</span>
                    </div>
                    <div className="bajaj-card__spec-divider" />
                    <div className="bajaj-card__spec">
                      <span className="bajaj-card__spec-val">{moto.cc}</span>
                      <span className="bajaj-card__spec-lbl">Cilindrada</span>
                    </div>
                  </div>

                  <div className="bajaj-card__footer">
                    <div>
                      <span className="bajaj-card__desde">Desde</span>
                      <span className="bajaj-card__precio">{moto.precio}</span>
                    </div>
                    <div className="bajaj-card__actions">
                      {/* Botón 360 — solo si tiene visor360 y NO se abrirá en modal de info */}
                      {moto.visor360 && !moto.colores && (
                        <button
                          className="bajaj-card__btn-360"
                          onClick={e => { e.stopPropagation(); setMoto360Seleccionada(moto); }}
                          aria-label="Ver en 360°"
                        >
                          <span className="bajaj-card__btn-360-icon">↻</span>
                          360°
                        </button>
                      )}
                      <button
                        className="bajaj-card__btn-outline"
                        onClick={e => { e.stopPropagation(); setMotoInfoSeleccionada(moto); }}
                      >
                        Info
                      </button>
                      <button
                        className="bajaj-card__btn-solid bajaj-card__btn-solid--wa"
                        onClick={e => handleCotizar(moto, e)}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" style={{ flexShrink: 0 }}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.124 1.532 5.858L.067 23.491a.5.5 0 00.625.583l5.852-1.532A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                        </svg>
                        Cotizar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bajaj-card__bar" />
              </m.div>
            ))}
          </m.div>
        </div>

        {/* ── Modal 360 standalone (motos sin colores) ── */}
        <AnimatePresence>
          {moto360Seleccionada && (
            <m.div
              className="bajaj-modal-360"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoto360Seleccionada(null)}
            >
              <m.div
                className="bajaj-modal-360__content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="bajaj-modal-360__close"
                  onClick={() => setMoto360Seleccionada(null)}
                  aria-label="Cerrar"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="bajaj-modal-360__title">{moto360Seleccionada.name}</h3>
                <Visor360
                  images={moto360Seleccionada.visor360}
                  name={moto360Seleccionada.name}
                  autoPlay={true}
                  speed={200}
                />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        {/* ── Modal Info completo ── */}
        <AnimatePresence>
          {motoInfoSeleccionada && (
            <MotoInfoModal
              moto={motoInfoSeleccionada}
              onClose={() => setMotoInfoSeleccionada(null)}
            />
          )}
        </AnimatePresence>
      </>
    </LazyMotion>
  );
};

export default BajajMotosGrid;