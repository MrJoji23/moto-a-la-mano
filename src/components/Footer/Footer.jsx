import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/iconomotos.webp';
import { FaInstagram, FaFacebookF, FaTiktok, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import './Footer.css';
import JobApplicationModal from './JobApplicationModal';

const Footer = () => {
  const [showJobModal, setShowJobModal] = useState(false);

  return (
    <footer className="footer-container">
      <div className="footer-accent-line" aria-hidden="true" />

      <div className="footer-content">

        {/* SECCIÓN PRINCIPAL: Empresa */}
        <div className="footer-company-section">
          <div className="company-header">
            <div className="logo-wrapper">
              <img
                src={logo}
                alt="MotoCenter"
                className="footer-logo-img"
              />
            </div>
            <div className="company-info">
              <h3 className="company-name">MOTOCENTER</h3>
              <p className="company-razon">MotoCenter S.A.S</p>
            </div>
          </div>
        </div>

        {/* GRILLA SECUNDARIA */}
        <div className="footer-grid">

          {/* CONTACTO */}
          <div className="footer-section section-left">
            <h4 className="footer-label">Contacto</h4>
            <p className="footer-main-text">
              <FaPhoneAlt size={11} className="icon-red" />
               Servicio Tecnico: 316 0404047
            </p>
            <p className="footer-main-text">
              <FaPhoneAlt size={9} className="icon-red" /> Comercial: 305 4300302
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/motocenter/" className="social-box" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
              <a href="https://www.facebook.com/people/MotoCenter/" className="social-box" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="https://www.tiktok.com/@motocenter" className="social-box" aria-label="TikTok">
                <FaTiktok size={14} />
              </a>
            </div>
          </div>

          {/* SERVICIOS */}
          <div className="footer-section section-center">
            <h4 className="footer-label">Servicios</h4>
            <ul className="footer-links">
              <li><Link to="/#mapa">Mapa</Link></li>
              <li><Link to="/#marcas">Marcas</Link></li>
              <li><Link to="/financiamiento">Financiamiento</Link></li>
              <li><Link to="/tratamiento-de-datos">Tratamiento de datos</Link></li>
              <li><Link to="/pqrs">PQRSF</Link></li>
              <li>
                <button
                  type="button"
                  className="footer-link-button"
                  onClick={() => setShowJobModal(true)}
                >
                  Trabaja con Nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* UBICACIÓN */}
          <div className="footer-section section-right">
            <h4 className="footer-label">Encuéntranos en</h4>
            <p className="footer-main-text">Bogotá, Colombia</p>
            <p className="footer-sub-text">Av. Calle 63 #110-10</p>
            <p className="footer-sub-text">Barrio Villa Gladys</p>
            <Link to="/#mapa" className="map-link">
              <FaMapMarkerAlt size={11} aria-hidden="true" /> Ver en mapa →
            </Link>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          <div className="footer-developers">
            <span className="footer-developers-label">Desarrollado por:</span>
            <div className="footer-developers-links">
              <span className="footer-developers-divider">|</span>
              <a href="https://github.com/MrJoji23" target="_blank" rel="noopener noreferrer">
                <u> Juan Marin </u>
              </a>
            </div>
          </div>
          <p className="copyright-text">
            © 2026 MOTOCENTER | TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>

        <JobApplicationModal
          isOpen={showJobModal}
          onClose={() => setShowJobModal(false)}
        />

      </div>
    </footer>
  );
};

export default Footer;