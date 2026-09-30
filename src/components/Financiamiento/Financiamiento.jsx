import './Financiamiento.css';
import { enlaceWhatsApp } from '../../data/contacto';

const WA_URL = enlaceWhatsApp(
  'Hola, me gustaría recibir información sobre los métodos de financiamiento disponibles.',
);

const metodos = [
  {
    id: 1,
    nombre: 'Nequi',
    descripcion:
      'Recibe tu desembolso o paga tus cuotas directo desde la app Nequi. Rápido, seguro y sin filas.',
  },
  {
    id: 2,
    nombre: 'Nu',
    descripcion:
      'Usa tu cuenta digital de Nu para pagar tus cuotas. Aprobación ágil y proceso 100% online.',
  },
  {
    id: 3,
    nombre: 'Davivienda',
    descripcion:
      'Financia tu moto y paga con tu Banco Davivienda. Cuotas flexibles y sin complicaciones.',
  },
];

const Financiamiento = () => {
  return (
    <div className="fin-wrapper">

      {/* BANNER HERO */}
      <section className="fin-banner">
        <div className="fin-banner-content">
          <h1 className="fin-banner-title mt-3">
            Financia tu moto<br />
            <span>Sin complicaciones</span>
          </h1>
          <p className="fin-banner-text">
            Con MotoCenter puedes financiar hasta el 100% de tu moto. Elige
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

      {/* SECCIÓN MÉTODOS DE PAGO */}
      <section className="fin-section">
        <h2 className="fin-section-title">Métodos de financiamiento</h2>
        <div className="fin-grid">
          {metodos.map((m) => (
            <div key={m.id} className="fin-card">
              <h3 className="fin-card-nombre">{m.nombre}</h3>
              <p className="fin-card-desc">{m.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Financiamiento;