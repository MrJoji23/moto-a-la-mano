// ConsentManager.jsx - Botón completamente a la derecha

import { useState } from "react";
import { PiCookieDuotone } from "react-icons/pi";
import "./ConsentManager.css";

const ConsentManager = ({ onAccept }) => {
  const [showBanner, setShowBanner] = useState(() => {
    return !localStorage.getItem("cookieConsent");
  });

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
    if (onAccept) onAccept();
  };

  return (
    <>
      {showBanner && (
        <div className="consent-banner fixed-bottom">
          <div className="container-fluid py-3 px-4">
            <div className="row align-items-center g-3">
              <div className="col-12 col-md-8">
                <div className="d-flex align-items-center gap-3">
                  <PiCookieDuotone
                    className="flex-shrink-0"
                    size={24}
                    style={{ color: "var(--color-primary)" }}
                  />
                  <p>
                    Utilizamos cookies para mejorar tu experiencia en nuestro
                    sitio. Al continuar navegando, aceptas nuestro{" "}
                    <a href="/politica-de-cookies">uso de cookies</a>.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <button
                  onClick={acceptCookies}
                  className="btn-accept ms-auto d-block"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsentManager;
