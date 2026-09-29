import { useMemo, useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { BAJAJ_MOTOS, BAJAJ_BRANDS, BAJAJ_TIPOS } from '../../data/BAJAJ/bajajData';
import Visor360 from './Visor360';
import MotoInfoModal from './MotoInfoModal';
import GridFilters from '../main-page/GridFilters/GridFilters';
import './BajajMotosGrid.css';

/* ── WhatsApp comercial ─────────────────────────── */
const WA_NUMBER = '573160404047';

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const HOVER_ANIM = { y: -5 };
const HOVER_TRANS = { duration: 0.22 };
const NO_HOVER = {};

const FILTROS_INICIALES = { tipo: "", submarca: "" };

const filterMotos = (motos, filtros) =>
  motos.filter(
    (moto) =>
      (!filtros.tipo || moto.tipoSlug === filtros.tipo) &&
      (!filtros.submarca || moto.marca === filtros.submarca),
  );

const BajajMotosGrid = ({ marcaSeleccionada }) => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [moto360Seleccionada, setMoto360Seleccionada] = useState(null);
  const [motoInfoSeleccionada, setMotoInfoSeleccionada] = useState(null);

  /* La marca viene del selector superior de la página; al cambiarla,
     los filtros locales que ya no apliquen se limpian. */
  const motoActiva = !marcaSeleccionada || marcaSeleccionada === "todas";

  const motos = useMemo(() => {
    const base = motoActiva
      ? BAJAJ_MOTOS
      : BAJAJ_MOTOS.filter((moto) => moto.marca === marcaSeleccionada);

    return filterMotos(base, filtros);
  }, [marcaSeleccionada, motoActiva, filtros]);

  const marcaActual = BAJAJ_BRANDS.find((b) => b.id === marcaSeleccionada);
  const subtitulo = marcaActual
    ? marcaActual.tagline
    : "Street, naked, full fairing y adventure con el mejor precio del mercado.";

  const campos = useMemo(
    () => [
      {
        name: "tipo",
        label: "Segmento",
        todos: "Todos",
        opciones: BAJAJ_TIPOS.filter((tipo) =>
          BAJAJ_MOTOS.some((moto) => moto.tipoSlug === tipo.slug),
        ).map((tipo) => ({ value: tipo.slug, label: tipo.label })),
      },
      {
        name: "submarca",
        label: "Línea",
        todos: "Todas",
        opciones: BAJAJ_BRANDS.map((marca) => ({
          value: marca.id,
          label: marca.name,
        })),
      },
    ],
    [],
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setFiltros(FILTROS_INICIALES);

  const handleCotizar = (moto, e) => {
    e.stopPropagation();
    const texto = encodeURIComponent(
      `Hola! Estoy interesado en cotizar la *${moto.name}* (${moto.cc}) - Precio desde ${moto.precio}. ¿Me pueden dar más información?`,
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`, "_blank", "noopener");
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="bajaj-catalogo"
        className="bajaj-motos-grid"
        aria-labelledby="bajaj-grid-title"
      >
        <m.h2
          id="bajaj-grid-title"
          className="bajaj-grid__title"
          initial={{ opacity: 0, x: -20 }}
          animate={gridInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {marcaActual ? (
            <>
              Modelos <span>{marcaActual.name}</span>
            </>
          ) : (
            <>
              Línea de <span>Modelos</span>
            </>
          )}
        </m.h2>

        <p className="bajaj-grid__subtitle">{subtitulo}</p>

        <GridFilters
          resultado={motos.length}
          filtros={filtros}
          campos={campos}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        <div ref={gridRef}>
          {motos.length === 0 ? (
            <div className="motos-empty">
              <h3 className="motos-empty__title">Sin resultados</h3>
              <p className="motos-empty__text">
                No hay motos que cumplan con esa combinación. Prueba a quitar
                algún filtro.
              </p>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleReset}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <m.ul
              className="bajaj-grid"
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={CONTAINER_VARIANTS}
            >
              {motos.map((moto) => (
                <m.li
                  key={moto.id}
                  className={`bajaj-card${moto.destacado ? " bajaj-card--featured" : ""}`}
                  variants={CARD_VARIANTS}
                  whileHover={shouldReduce ? NO_HOVER : HOVER_ANIM}
                  transition={HOVER_TRANS}
                >
                  <button
                    type="button"
                    className="bajaj-card__hit"
                    onClick={() => setMotoInfoSeleccionada(moto)}
                    aria-label={`Ver ficha de la ${moto.name}`}
                  />

                  {moto.destacado && (
                    <span className="bajaj-card__featured-badge">Nuevo lanzamiento</span>
                  )}

                  <div className="bajaj-card__img-wrap">
                    <img
                      src={moto.img}
                      alt={moto.name}
                      className="bajaj-card__img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="bajaj-card__img-overlay" />
                    <span className="bajaj-card__tipo-badge">{moto.tipoLabel}</span>

                    {moto.colores?.length > 0 && (
                      <div
                        className="bajaj-card__color-dots"
                        role="img"
                        aria-label={`${moto.colores.length} colores disponibles`}
                      >
                        {moto.colores.slice(0, 4).map((color) => (
                          <span
                            key={color.nombre}
                            className="bajaj-card__color-dot"
                            style={{ background: color.hex }}
                            title={color.nombre}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bajaj-card__body">
                    <h3 className="bajaj-card__name">{moto.name}</h3>

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
                      <div className="bajaj-card__price">
                        <span className="bajaj-card__desde">Desde</span>
                        <span className="bajaj-card__precio">{moto.precio}</span>
                      </div>
                    </div>

                    <div className="bajaj-card__actions">
                      {moto.visor360 && !moto.colores && (
                        <button
                          type="button"
                          className="bajaj-card__btn-360"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMoto360Seleccionada(moto);
                          }}
                        >
                          <span className="bajaj-card__btn-360-icon" aria-hidden="true">
                            ↻
                          </span>
                          360°
                        </button>
                      )}

                      <button
                        type="button"
                        className="bajaj-card__btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMotoInfoSeleccionada(moto);
                        }}
                      >
                        Info
                      </button>

                      <button
                        type="button"
                        className="bajaj-card__btn-solid"
                        onClick={(e) => handleCotizar(moto, e)}
                      >
                        <FaWhatsapp size={13} aria-hidden="true" />
                        <span>Cotizar</span>
                      </button>
                    </div>
                  </div>
                </m.li>
              ))}
            </m.ul>
          )}
        </div>

        {/* Modal 360° */}
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
                role="dialog"
                aria-modal="true"
                aria-label={`Vista 360 de la ${moto360Seleccionada.name}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="bajaj-modal-360__close"
                  onClick={() => setMoto360Seleccionada(null)}
                  aria-label="Cerrar"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="bajaj-modal-360__title">{moto360Seleccionada.name}</h3>
                <Visor360
                  images={moto360Seleccionada.visor360}
                  name={moto360Seleccionada.name}
                  autoPlay
                  speed={200}
                />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Ficha completa */}
        <AnimatePresence>
          {motoInfoSeleccionada && (
            <MotoInfoModal
              moto={motoInfoSeleccionada}
              onClose={() => setMotoInfoSeleccionada(null)}
            />
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
};

export default BajajMotosGrid;
