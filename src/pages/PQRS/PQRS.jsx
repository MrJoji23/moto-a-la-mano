import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import "./PQRS.css";

const TIPOS_SOLICITUD = ["Petición", "Queja", "Reclamo", "Sugerencia"];

function PqrsBanner() {
  return (
    <header className="pqrs-banner">
      <div className="pqrs-banner__overlay" />
      <div className="pqrs-banner__content">
        <h1 className="pqrs-banner__title">Peticiones, Quejas,<br />Reclamos y Sugerencias</h1>
        <p className="pqrs-banner__subtitle">
          Completa el siguiente formulario y nuestro equipo se pondrá en contacto
          contigo lo antes posible.
        </p>
      </div>
    </header>
  );
}

export default function PqrsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    tipoSolicitud: "",
    nombre: "",
    documento: "",
    celular: "",
    correo: "",
    descripcion: "",
    adjunto: null,
    adjuntoNombre: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "adjunto" && files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        adjunto: files[0],
        adjuntoNombre: files[0].name,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const data = new FormData();
    data.append("tipoSolicitud", formData.tipoSolicitud);
    data.append("nombre", formData.nombre);
    data.append("documento", formData.documento);
    data.append("celular", formData.celular);
    data.append("correo", formData.correo);
    data.append("descripcion", formData.descripcion);
    data.append("website", formData.website);

    if (formData.adjunto) {
      data.append("adjunto", formData.adjunto);
    }

    try {
      const response = await fetch("/api/send-pqrs", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setStatus("success");
      } else if (response.status === 429) {
        setStatus("limite");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      tipoSolicitud: "",
      nombre: "",
      documento: "",
      celular: "",
      correo: "",
      descripcion: "",
      adjunto: null,
      adjuntoNombre: "",
      website: "",
    });
    setStatus("idle");
  };

  return (
    <main className="pqrs-page">
      <PqrsBanner />

      <div className="pqrs-page__container">
        <p className="pqrs-page__meta">MEGA MOTO GROUP · Atención al cliente</p>

        <div className="pqrs-page__intro">
          <span className="pqrs-page__eyebrow">Cuéntanos qué sucedió</span>
          <p className="pqrs-page__introText">
            Completa el siguiente formulario y nuestro equipo se pondrá en
            contacto contigo lo antes posible.
          </p>
        </div>

        <div className="pqrs-page__formCard">
          {status === "success" && (
            <div className="pqrs-page__statusWrap">
              <div className="pqrs-page__statusIcon pqrs-page__successBg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="pqrs-page__statusTitle">¡Solicitud Enviada!</h3>
              <p className="pqrs-page__statusDescription">
                Hemos recibido tu PQRS correctamente. Te contactaremos pronto.
              </p>
              <button
                className="pqrs-page__btnSubmit"
                onClick={resetForm}
              >
                Enviar otra solicitud
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="pqrs-page__statusWrap">
              <div className="pqrs-page__statusIcon pqrs-page__errorBg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className="pqrs-page__statusTitle">Algo salió mal</h3>
              <p className="pqrs-page__statusDescription">
                No pudimos procesar tu solicitud. Intenta de nuevo.
              </p>
              <button
                className="pqrs-page__btnSubmit"
                onClick={() => setStatus("idle")}
              >
                Reintentar
              </button>
            </div>
          )}

          {status === "limite" && (
            <div className="pqrs-page__statusWrap">
              <div className="pqrs-page__statusIcon pqrs-page__errorBg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className="pqrs-page__statusTitle">Límite alcanzado</h3>
              <p className="pqrs-page__statusDescription">
                Enviaste varias solicitudes en poco tiempo. Intenta de nuevo más tarde.
              </p>
              <button
                className="pqrs-page__btnSubmit"
                onClick={() => setStatus("idle")}
              >
                Entendido
              </button>
            </div>
          )}

          {status === "idle" && (
            <form onSubmit={handleSubmit} className="pqrs-page__form">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ position: "absolute", left: "-9999px" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="pqrs-page__formRow">
              <div className="pqrs-page__formGroup">
                <label htmlFor="tipoSolicitud">Tipo de solicitud *</label>
                <select
                  id="tipoSolicitud"
                  name="tipoSolicitud"
                  value={formData.tipoSolicitud}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  {TIPOS_SOLICITUD.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pqrs-page__formGroup">
                <label htmlFor="documento">Documento de identidad *</label>
                <input
                  id="documento"
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="pqrs-page__formRow">
              <div className="pqrs-page__formGroup">
                <label htmlFor="celular">Celular *</label>
                <input
                  id="celular"
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>
              <div className="pqrs-page__formGroup">
                <label htmlFor="correo">Correo electrónico *</label>
                <input
                  id="correo"
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="pqrs-page__formGroup">
              <label htmlFor="descripcion">Descripción *</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Describe tu petición, queja, reclamo o sugerencia con el mayor detalle posible"
              />
            </div>

            <div className="pqrs-page__formGroup">
              <label htmlFor="adjunto">Adjuntar soporte (PDF, opcional)</label>
              <div className="pqrs-page__uploadArea">
                <label htmlFor="adjunto" className="pqrs-page__uploadLabel">
                  <input
                    type="file"
                    id="adjunto"
                    name="adjunto"
                    accept=".pdf,application/pdf"
                    onChange={handleChange}
                    className="pqrs-page__fileInput"
                  />
                  <FaFileAlt className="pqrs-page__uploadIcon" aria-hidden="true" />
                  {formData.adjuntoNombre || "Selecciona un archivo PDF"}
                </label>
                <span className="pqrs-page__hint">Tamaño máximo: 5MB</span>
              </div>
            </div>

              <button
                type="submit"
                className="pqrs-page__btnSubmit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}