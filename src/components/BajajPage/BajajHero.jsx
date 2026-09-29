import { FaWhatsapp } from "react-icons/fa";
import "./BajajHero.css";

const WA_URL =
  "https://api.whatsapp.com/send?phone=573054300302&text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20las%20motos%20Bajaj.";

const BajajHero = () => {
  return (
    <section className="bajaj-hero" aria-labelledby="bajaj-hero-title">
      <div className="bajaj-hero__inner">
        <h1 id="bajaj-hero-title" className="bajaj-hero__title">
          <span>Motos Bajaj</span> en Bogotá y Soacha
        </h1>
        <p className="bajaj-hero__subtitle">
          Encuentra tu modelo ideal: Pulsar, Boxer, Dominar o Discover.
          Financiamiento disponible hasta el 100%.
        </p>
        <div className="bajaj-hero__actions">
          <a href="#bajaj-catalogo" className="btn btn--primary">
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

export default BajajHero;
