import { useMemo, useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { AUTECO_MOTOS, AUTECO_BRANDS } from '../../data/AUTECO/autecoData';
import {
  FILTROS_INICIALES,
  construirRangosPrecio,
  filtrarMotos,
  ordenarMotos,
} from '../../data/catalogFilters';
import MotoInfoModal from '../BajajPage/MotoInfoModal';
import GridFilters from '../main-page/GridFilters/GridFilters';
import { abrirWhatsApp } from '../../data/contacto';
import './AutecoMotosGrid.css';

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

/* La línea "Eléctricos" no aparece en el desplegable: sus motos no tienen
   cilindrada, así que no encajan en los rangos de cc del filtro. Siguen
   estando en el catálogo general (AUTECO_MOTOS las incluye). */
const LINEAS_CON_GRID = AUTECO_BRANDS.filter((marca) => marca.id !== 'electricos');

const AutecoMotosGrid = ({ marcaSeleccionada, onMarcaSelect }) => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('');
  const [motoSeleccionada, setMotoSeleccionada] = useState(null);

  const motoActiva = !marcaSeleccionada || marcaSeleccionada === "todas";

  const catalogo = useMemo(
    () =>
      motoActiva
        ? AUTECO_MOTOS
        : AUTECO_MOTOS.filter((moto) => moto.marca === marcaSeleccionada),
    [marcaSeleccionada, motoActiva],
  );

  const rangosPrecio = useMemo(() => construirRangosPrecio(catalogo), [catalogo]);

  const motos = useMemo(
    () => ordenarMotos(filtrarMotos(catalogo, { ...filtros, busqueda }, rangosPrecio), orden),
    [catalogo, filtros, busqueda, rangosPrecio, orden],
  );

  const marcaActual = AUTECO_BRANDS.find((b) => b.id === marcaSeleccionada);
  const subtitulo = marcaActual
    ? marcaActual.tagline
    : "TVS, Victory, Kymco, Ceronte y eléctricas con la mejor relación precio-calidad.";

  const handleFilterChange = (name, value) => {
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFiltros(FILTROS_INICIALES);
    setBusqueda('');
    setOrden('');
  };

  const handleCotizar = (moto, e) => {
    e.stopPropagation();
    const texto = encodeURIComponent(
      `Hola! Estoy interesado en cotizar la *${moto.name}* (${moto.cc}) - Precio desde ${moto.precio}. ¿Me pueden dar más información?`,
    );
    abrirWhatsApp(texto);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="auteco-catalogo"
        className="auteco-motos-grid"
        aria-labelledby="auteco-grid-title"
      >
        <m.h2
          id="auteco-grid-title"
          className="auteco-grid__title"
          initial={{ opacity: 0, x: -20 }}
          animate={gridInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45 }}
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

        <p className="auteco-grid__subtitle">{subtitulo}</p>

        <GridFilters
          resultado={motos.length}
          total={catalogo.length}
          filtros={filtros}
          rangosPrecio={rangosPrecio}
          busqueda={busqueda}
          onSearch={setBusqueda}
          orden={orden}
          onOrdenChange={setOrden}
          marcas={LINEAS_CON_GRID}
          marcaSeleccionada={marcaSeleccionada === 'todas' ? null : marcaSeleccionada}
          onMarcaSelect={onMarcaSelect}
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
              className="auteco-grid"
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              variants={CONTAINER_VARIANTS}
            >
              {motos.map((moto) => (
                <m.li
                  key={moto.id}
                  className={`auteco-mcard${moto.destacado ? " auteco-mcard--featured" : ""}`}
                  variants={CARD_VARIANTS}
                  whileHover={shouldReduce ? NO_HOVER : HOVER_ANIM}
                  transition={HOVER_TRANS}
                >
                  <button
                    type="button"
                    className="auteco-mcard__hit"
                    onClick={() => setMotoSeleccionada(moto)}
                    aria-label={`Ver ficha de la ${moto.name}`}
                  />

                  {moto.destacado && (
                    <span className="auteco-mcard__badge">{moto.destacado}</span>
                  )}

                  <div className="auteco-mcard__img-wrap">
                    <img
                      src={moto.img}
                      alt={moto.name}
                      className="auteco-mcard__img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="auteco-mcard__img-overlay" />
                    <span className="auteco-mcard__tipo">{moto.tipoLabel}</span>

                    {moto.colores?.length > 0 && (
                      <div
                        className="auteco-mcard__color-dots"
                        role="img"
                        aria-label={`${moto.colores.length} colores disponibles`}
                      >
                        {moto.colores.slice(0, 4).map((color) => (
                          <span
                            key={color.nombre}
                            className="auteco-mcard__color-dot"
                            style={{ background: color.hex }}
                            title={color.nombre}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="auteco-mcard__body">
                    <h3 className="auteco-mcard__name">{moto.name}</h3>

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
                      <div className="auteco-mcard__price">
                        <span className="auteco-mcard__desde">Desde</span>
                        <span className="auteco-mcard__precio">{moto.precio}</span>
                      </div>
                    </div>

                    <div className="auteco-mcard__actions">
                      <button
                        type="button"
                        className="auteco-mcard__btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMotoSeleccionada(moto);
                        }}
                      >
                        Info
                      </button>

                      <button
                        type="button"
                        className="auteco-mcard__btn-solid"
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

        <AnimatePresence>
          {motoSeleccionada && (
            <MotoInfoModal
              moto={motoSeleccionada}
              onClose={() => setMotoSeleccionada(null)}
            />
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
};

export default AutecoMotosGrid;
