import { useState } from "react";
import { Link } from "react-router-dom";
import { PiCookieDuotone } from "react-icons/pi";
import "./ConsentManager.css";

const ConsentManager = ({ onAccept }) => {
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("cookieConsent");
  });

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
    if (onAccept) onAccept();
  };

  if (!showBanner) return null;

  return (
    <aside className="consent-banner fixed-bottom" aria-label="Aviso de cookies">
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-8">
            <div className="d-flex align-items-center gap-3">
              <PiCookieDuotone
                className="flex-shrink-0"
                size={24}
                aria-hidden="true"
                style={{ color: "var(--mm-accent)" }}
              />
              <p className="mb-0">
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio.
                Al continuar navegando, aceptas nuestro{" "}
                <Link to="/politica-de-cookies">uso de cookies</Link>.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <button
              type="button"
              onClick={acceptCookies}
              className="btn-accept w-100"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ConsentManager;
