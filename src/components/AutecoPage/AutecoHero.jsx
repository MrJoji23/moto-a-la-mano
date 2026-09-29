import { FaWhatsapp } from "react-icons/fa";
import "./AutecoHero.css";

const WA_URL =
  "https://api.whatsapp.com/send?phone=573054300302&text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20las%20motos%20Auteco.";

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
