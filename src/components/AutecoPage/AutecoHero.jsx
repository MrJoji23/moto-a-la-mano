import { FaWhatsapp } from "react-icons/fa";
import { enlaceWhatsApp } from "../../data/contacto";
import "./AutecoHero.css";

const WA_URL = enlaceWhatsApp(
  "Hola, me gustaría información sobre las motos Auteco.",
);

const AutecoHero = () => {
  return (
    <section className="auteco-hero" aria-labelledby="auteco-hero-title">
      <div className="auteco-hero__inner">
        <h1 id="auteco-hero-title" className="auteco-hero__title">
          <span>Motos Auteco</span> en Bogotá
        </h1>
        <p className="auteco-hero__subtitle">
          TVS, Victory, Kymco, Ceronte y motos eléctricas. Financiamiento
          disponible.
        </p>
        <div className="auteco-hero__actions">
          <a href="#auteco-catalogo" className="btn btn--primary">
            Ver todo el portafolio
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--wa"
          >
            <FaWhatsapp size={16} aria-hidden="true" />
            Hablar con un asesor
          </a>
        </div>
      </div>
    </section>
  );
};

export default AutecoHero;
