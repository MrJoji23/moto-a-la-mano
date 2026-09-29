import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import styles from "./PQRS.module.css";
import bannerImage from "../../assets/images/bannerPQRS.webp";

const BANNER_TITLE = "PQRS";
const BANNER_SUBTITLE = "Peticiones, Quejas, Reclamos y Sugerencias";

const TIPOS_SOLICITUD = ["Petición", "Queja", "Reclamo", "Sugerencia"];

function PqrsBanner() {
  return (
    <header
      className={styles.banner}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className={styles.bannerOverlay} />
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>{BANNER_TITLE}</h1>
        {BANNER_SUBTITLE && (
          <p className={styles.bannerSubtitle}>{BANNER_SUBTITLE}</p>
        )}
      </div>
    </header>
  );
}

export default function PqrsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle"); // 'idle' | 'success' | 'error' | 'limite'
  const [formData, setFormData] = useState({
    tipoSolicitud: "",
    nombre: "",
    documento: "",
    celular: "",
    correo: "",
    descripcion: "",
    adjunto: null,
    adjuntoNombre: "",
    website: "" // honeypot
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "adjunto" && files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        adjunto: files[0],
        adjuntoNombre: files[0].name
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
    data.append("website", formData.website); // honeypot

    if (formData.adjunto) {
      data.append("adjunto", formData.adjunto);
    }

    try {
      const response = await fetch("/api/send-pqrs", {
        method: "POST",
        body: data
      });

      if (response.ok) {
        setStatus("success");
      } else if (response.status === 429) {
        setStatus("limite");
      } else {
        setStatus("error");
      }
    } catch (error) {
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
      website: ""
    });
    setStatus("idle");
  };

  return (
    <section className={styles.pqrs}>
      <PqrsBanner />

      <div className={styles.container}>
        <p className={styles.metaLine}>MEGA MOTO GROUP · Atención al cliente</p>

        <div className={styles.introHeader}>
          <span className={styles.eyebrow}>Cuéntanos qué sucedió</span>
          <p className={styles.introText}>
            Completa el siguiente formulario y nuestro equipo se pondrá en
            contacto contigo lo antes posible.
          </p>
        </div>

        <div className={styles.formCard}>
          {status === "success" && (
            <div className={styles.statusWrap}>
              <div className={`${styles.statusIcon} ${styles.successBg}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className={styles.statusTitle}>¡Solicitud Enviada!</h3>
              <p className={styles.statusDescription}>
                Hemos recibido tu PQRS correctamente. Te contactaremos pronto.
              </p>
              <button className={styles.btnSubmit} onClick={resetForm}>
                Enviar otra solicitud
              </button>
            </div>
          )}

          {status === "error" && (
            <div className={styles.statusWrap}>
              <div className={`${styles.statusIcon} ${styles.errorBg}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className={styles.statusTitle}>Algo salió mal</h3>
              <p className={styles.statusDescription}>
                No pudimos procesar tu solicitud. Intenta de nuevo.
              </p>
              <button className={styles.btnSubmit} onClick={() => setStatus("idle")}>
                Reintentar
              </button>
            </div>
          )}

          {status === "limite" && (
            <div className={styles.statusWrap}>
              <div className={`${styles.statusIcon} ${styles.errorBg}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className={styles.statusTitle}>Límite alcanzado</h3>
              <p className={styles.statusDescription}>
                Enviaste varias solicitudes en poco tiempo. Intenta de nuevo más tarde.
              </p>
              <button className={styles.btnSubmit} onClick={() => setStatus("idle")}>
                Entendido
              </button>
            </div>
          )}

          {status === "idle" && (
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Honeypot: oculto visualmente, los bots sí lo llenan */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ position: "absolute", left: "-9999px" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className={styles.formGroup}>
                <label>Tipo de solicitud *</label>
                <select
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

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nombre completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Documento de identidad *</label>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Celular *</label>
                  <input
                    type="tel"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Correo electrónico *</label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Descripción *</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Describe tu petición, queja, reclamo o sugerencia con el mayor detalle posible"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Adjuntar soporte (PDF, opcional)</label>
                <div className={styles.uploadArea}>
                  <label
                    htmlFor="adjunto"
                    className={`${styles.uploadLabel} ${
                      formData.adjuntoNombre ? styles.uploadLabelSelected : ""
                    }`}
                  >
                    <FaFileAlt className={styles.uploadIcon} />
                    {formData.adjuntoNombre || "Selecciona un archivo PDF"}
                  </label>
                  <input
                    type="file"
                    id="adjunto"
                    name="adjunto"
                    accept=".pdf"
                    onChange={handleChange}
                    className={styles.fileInput}
                  />
                  <span className={styles.hint}>Tamaño máximo: 5MB</span>
                </div>
              </div>

              <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}