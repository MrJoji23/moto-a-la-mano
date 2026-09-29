import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import "./LineasSelector.css";

/**
 * Selector de líneas de una misma marca (Pulsar, Boxer, TVS, Kymco…).
 *
 * No es una fila de chips: son tarjetas con logo y tagline que filtran el
 * catálogo de la página; volver a pulsar la línea activa la deselecciona y
 * restaura el catálogo completo. El desplegable "Línea" de la toolbar
 * comparte el mismo estado, así que ambas vistas quedan sincronizadas.
 */
const LineasSelector = ({
  eyebrow,
  titulo,
  tituloAccent,
  descripcion,
  lineas,
  seleccion,
  onSelect,
  accentVar = "--mm-accent",
  tituloId = "lineas-selector-title",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const alternar = (id) => onSelect(seleccion === id ? null : id);

  return (
    <LazyMotion features={domAnimation}>
      <section className="lineas" ref={ref} aria-labelledby={tituloId}>
        <m.div
          className="lineas__header"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="lineas__eyebrow">{eyebrow}</span>
          <h2 id={tituloId} className="lineas__title">
            {titulo} <span style={{ color: `var(${accentVar})` }}>{tituloAccent}</span>
          </h2>
          <p className="lineas__desc">{descripcion}</p>
        </m.div>

        <m.ul
          className="lineas__grid"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {lineas.map((linea) => {
            const activa = seleccion === linea.id;

            return (
              <m.li
                key={linea.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
              >
                <button
                  type="button"
                  className={`linea-card${activa ? " linea-card--active" : ""}`}
                  style={{
                    "--brand-color": linea.color,
                    "--brand-accent": `var(${accentVar})`,
                  }}
                  aria-pressed={activa}
                  onClick={() => alternar(linea.id)}
                >
                  <span className="linea-card__logo-wrap">
                    <img
                      src={linea.bg}
                      alt=""
                      className="linea-card__logo"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="linea-card__body">
                    <span className="linea-card__name">{linea.name}</span>
                    <span className="linea-card__tagline">{linea.tagline}</span>
                  </span>
                  <span className="linea-card__check" aria-hidden="true">
                    {activa ? "✓" : "→"}
                  </span>
                </button>
              </m.li>
            );
          })}
        </m.ul>
      </section>
    </LazyMotion>
  );
};

export default LineasSelector;
