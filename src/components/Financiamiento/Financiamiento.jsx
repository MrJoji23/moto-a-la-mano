import './Financiamiento.css';

import addiLogo from '../../assets/images/logos-financiamientos/addi.webp';
import avanzaLogo from '../../assets/images/logos-financiamientos/avanza.webp';
import bancoLogo from '../../assets/images/logos-financiamientos/banco-de-bogota.webp';
import exitoLogo from '../../assets/images/logos-financiamientos/exito77.webp';
import sufiLogo from '../../assets/images/logos-financiamientos/logo-sufi.webp';
import pickLogo from '../../assets/images/logos-financiamientos/pick.webp';
import sistecreditoLogo from '../../assets/images/logos-financiamientos/sistecredito.webp';
import vantiLogo from '../../assets/images/logos-financiamientos/vanti.webp';
import progreserLogo from '../../assets/images/logos-financiamientos/progreser.webp';
import crediorbeLogo from '../../assets/images/logos-financiamientos/crediorbe.webp';


const WA_URL =
  "https://api.whatsapp.com/send?phone=573054300302&text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20los%20m%C3%A9todos%20de%20financiamiento%20disponibles.";

const financieras = [
  {
    id: 1,
    nombre: 'Banco de Bogotá',
    logo: bancoLogo,
    titulo: 'Financia con Banco de Bogotá',
    descripcion: 'Crédito de moto con las mejores tasas del mercado. Aprobación rápida y proceso sencillo.',
  },
  {
    id: 2,
    nombre: 'Vanti',
    logo: vantiLogo,
    titulo: 'Financia con Vanti',
    descripcion: 'Financiación accesible para todos. Cuotas cómodas y aprobación en minutos.',
  },
  {
    id: 3,
    nombre: 'Progreser',
    logo: progreserLogo,
    titulo: 'Financia con Progreser',
    descripcion: 'Créditos para el progreso. Condiciones flexibles adaptadas a tu capacidad de pago.',
  },
  {
    id: 4,
    nombre: 'Sufi',
    logo: sufiLogo,
    titulo: 'Financia con Sufi',
    descripcion: 'Crédito de consumo fácil y rápido. Financia hasta el 100% de tu moto.',
  },
  {
    id: 5,
    nombre: 'Crediorbe',
    logo: crediorbeLogo,
    titulo: 'Financia con Crediorbe',
    descripcion: 'Soluciones de crédito a tu medida. Proceso ágil y sin complicaciones.',
  },
  {
    id: 6,
    nombre: 'Avanza',
    logo: avanzaLogo,
    titulo: 'Financia con Avanza',
    descripcion: 'Avanza hacia tu moto ideal. Financiación con tasas competitivas y plazos flexibles.',
  },
  {
    id: 7,
    nombre: 'Pick',
    logo: pickLogo,
    titulo: 'Financia con Pick',
    descripcion: 'Escoge tu plan de financiación. Aprobación inmediata y sin papeleo innecesario.',
  },
  {
    id: 8,
    nombre: 'Sistecredito',
    logo: sistecreditoLogo,
    titulo: 'Financia con Sistecredito',
    descripcion: 'Créditos rápidos y seguros. Financiación inmediata con tasas competitivas.',
  },
  {
    id: 9,
    nombre: 'Addi',
    logo: addiLogo,
    titulo: 'Financia con Addi',
    descripcion: 'Créditos rápidos y accesibles. Financiación inmediata con aprobación en minutos.',
  },
  {
    id: 10,
    nombre: 'Éxito 77',
    logo: exitoLogo,
    titulo: 'Financia con Éxito 77',
    descripcion: 'Paga a cuotas con tu tarjeta Éxito. Financiamiento cómodo sin complicaciones.',
  },
];

const Financiamiento = () => {
  return (
    <div className="fin-wrapper">

      {/* BANNER HERO */}
      <section className="fin-banner">
        <div className="fin-banner-overlay" />
        <div className="fin-banner-content">
          <h1 className="fin-banner-title mt-3">
            Financia tu moto<br />
            <span>Sin complicaciones</span>
          </h1>
          <p className="fin-banner-text">
            Con MegaMoto puedes financiar hasta el 100% de tu moto. Elige
            entre nuestras opciones de financiamiento y estrena sin
            preocuparte por el pago inmediato.
          </p>
          <ul className="fin-banner-list">
            <li><span className="fin-check">✔</span> Aprobación rápida sin papeleo innecesario</li>
            <li><span className="fin-check">✔</span> Opciones flexibles según tu capacidad de pago</li>
            <li><span className="fin-check">✔</span> Proceso 100% online, sin filas ni trámites complicados</li>
          </ul>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fin-banner-btn"
          >
            Contactar un asesor
          </a>
        </div>
      </section>

      {/* SECCIÓN FINANCIERAS */}
      <section className="fin-section">
        <h2 className="fin-section-title ">Financiamos tu moto</h2>
        <div className="fin-grid">
          {financieras.map((f) => (
            <div key={f.id} className="fin-card">
              <div className="fin-card-header">
                <img src={f.logo} alt={f.nombre} className="fin-card-logo" />
                <span className="fin-card-nombre">{f.nombre}</span>
              </div>
              <h3 className="fin-card-titulo">{f.titulo}</h3>
              <p className="fin-card-desc">{f.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Financiamiento;