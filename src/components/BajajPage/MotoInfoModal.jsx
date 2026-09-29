import { useState,useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import {
  IoDocumentTextOutline,
  IoColorPaletteOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import Visor360 from "./Visor360";
import "./MotoInfoModal.css";

/* ── Número de WhatsApp de la empresa ── */
const WA_NUMBER = "573160404047";

const MotoInfoModal = ({ moto, onClose }) => {
  const [tab, setTab] = useState("info"); // 'info' | '360' | 'colores'
  const [colorSeleccionado, setColorSeleccionado] = useState(
    moto.colores ? moto.colores[0] : null,
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const esElectrica = moto.marca === "electricos";

  const handleCotizar = () => {
    const texto = encodeURIComponent(
      esElectrica
      ?`Hola! Estoy interesado en cotizar la *${moto.name}* - Precio desde ${moto.precio}. ¿Me pueden dar más información?`
      :`Hola! Estoy interesado en cotizar la *${moto.name}* (${moto.cc}) - Precio desde ${moto.precio}. ¿Me pueden dar más información?`,
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`, "_blank");
  };

  const tabs = [
    { id: "info", label: "Ficha Técnica", icon: <IoDocumentTextOutline /> },
    ...(moto.colores
      ? [{ id: "colores", label: "Colores", icon: <IoColorPaletteOutline /> }]
      : []),
    ...(moto.visor360
      ? [{ id: "360", label: "Vista 360°", icon: <IoRefreshOutline /> }]
      : []),
  ];

  const specs =esElectrica
      ? [
        { lbl: "Potencia",      val: moto.potencia     || "—" },
        { lbl: "Autonomía",     val: moto.autonomia    || "—" },
        { lbl: "Tiempo Carga",  val: moto.tiempo_carga || "—" },
        { lbl: "Peso",          val: moto.peso         || "—" },
        { lbl: "Tipo",          val: moto.tipo },
      ]
    : [
        { lbl: "Cilindrada",    val: moto.cc },
        { lbl: "Potencia",      val: moto.hp },
        { lbl: "Torque",        val: moto.torque       || "—" },
        { lbl: "Peso",          val: moto.peso         || "—" },
        { lbl: "Tanque",        val: moto.tanque       || "—" },
        { lbl: "Transmisión",   val: moto.transmision  || "—" },
        { lbl: "Tipo",          val: moto.tipo },
      ];

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="moto-modal__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <m.div
          className="moto-modal"
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ "--mc": esElectrica ? "var(--mm-accent-2)" : moto.color }}
        >
          {/* ── Header sin imagen de fondo ── */}
          <div className="moto-modal__header">
            <button
              className="moto-modal__close"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <FiX size={20} />
            </button>
            <span className="moto-modal__tipo">{moto.tipo}</span>
            <h2 className="moto-modal__name">{moto.name}</h2>
            <div className="moto-modal__price-row">
              <span className="moto-modal__desde">Desde</span>
              <span className="moto-modal__price">{moto.precio}</span>
            </div>
            <div className="moto-modal__accent-bar" />
          </div>

          {/* ── Tabs ── */}
          <div className="moto-modal__tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`moto-modal__tab ${tab === t.id ? "moto-modal__tab--active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                <span className="moto-modal__tab-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Body ── */}
          <div className="moto-modal__body">
            <AnimatePresence mode="wait">
              {/* ─── Tab: Ficha Técnica ─── */}
              {tab === "info" && (
                <m.div
                  key="info"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className={`moto-modal__tab-content ${esElectrica ? "moto-modal__tab-content--elec" : ""}`}
                >
                  {moto.descripcion && (
                    <p className="moto-modal__desc">{moto.descripcion}</p>
                  )}
                  <div className="moto-modal__specs-grid">
                    {specs.map((s) => (
                      <div key={s.lbl} className="moto-modal__spec-item">
                        <span className="moto-modal__spec-lbl">{s.lbl}</span>
                        <span className="moto-modal__spec-val">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </m.div>
              )}

              {/* ─── Tab: Colores ─── */}
              {tab === "colores" && moto.colores && (
                <m.div
                  key="colores"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="moto-modal__tab-content"
                >
                  <div className="moto-modal__color-preview">
                    <AnimatePresence mode="wait">
                      <m.img
                        key={colorSeleccionado?.estatica}
                        src={colorSeleccionado?.estatica}
                        alt={colorSeleccionado?.nombre}
                        className="moto-modal__color-img"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                    <span className="moto-modal__color-name">
                      {colorSeleccionado?.nombre}
                    </span>
                  </div>

                  <div className="moto-modal__color-palette">
                    {moto.colores.map((c) => (
                      <button
                        key={c.nombre}
                        className={`moto-modal__color-swatch ${colorSeleccionado?.nombre === c.nombre ? "moto-modal__color-swatch--active" : ""}`}
                        onClick={() => setColorSeleccionado(c)}
                        aria-label={c.nombre}
                        title={c.nombre}
                      >
                        <img
                          src={c.imagen}
                          alt={c.nombre}
                          className="moto-modal__swatch-img"
                          onError={(e) => {
                                const img = e.currentTarget;
                                const dot = img.nextElementSibling; 
                                if (dot) {
                                  img.style.display = "none";
                                  dot.style.display = "block";
                                }
                          }}
                        />
                        <span
                          className="moto-modal__swatch-dot"
                          style={{ background: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </m.div>
              )}

              {/* ─── Tab: 360° ─── */}
              {tab === "360" && moto.visor360 && (
                <m.div
                  key="360"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="moto-modal__tab-content"
                >
                  <div className="moto-modal__visor-wrapper">
                    <Visor360
                      images={moto.visor360}
                      name={moto.name}
                      autoPlay={true}
                      speed={200}
                    />
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Footer / CTA ── */}
          <div className="moto-modal__footer">
            <button className="moto-modal__btn-close-text" onClick={onClose}>
              Cerrar
            </button>
            <button className="moto-modal__btn-cotizar" onClick={handleCotizar}>
              <FaWhatsapp size={18} />
              Cotizar por WhatsApp
            </button>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
};

export default MotoInfoModal;
