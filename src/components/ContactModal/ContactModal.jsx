import { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error' | 'limite'

  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    correo: '',
    asunto: '',
    mensaje: '',
    comoNosConociste: '',
    website: '' // honeypot: campo trampa para bots, invisible para humanos
  });

  // Evitar scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    // Envío desactivado temporalmente: el botón es sólo de vista,
    // no dispara ninguna petición ni front ni back.
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      celular: '',
      correo: '',
      asunto: '',
      mensaje: '',
      comoNosConociste: '',
      website: ''
    });
    setStatus('idle');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <m.div
            className="contact-modal-overlay"
            role="button"
            tabIndex={0}
            aria-label="Cerrar modal"
            onClick={handleClose}
            onKeyDown={(e) => e.key === 'Escape' && handleClose()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.div
              className="contact-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Formulario de contacto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── ÉXITO ── */}
              {status === 'success' && (
                <div className="status-container">
                  <div className="status-card">
                    <div className="status-icon success-bg">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="status-title">¡Mensaje Enviado!</h3>
                    <p className="status-description">
                      Recibimos tu mensaje correctamente. Te responderemos pronto.
                    </p>
                  </div>
                </div>
              )}

              {/* ── ERROR ── */}
              {status === 'error' && (
                <div className="status-container">
                  <div className="status-card">
                    <div className="status-icon error-bg">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                    <h3 className="status-title">Algo salió mal</h3>
                    <p className="status-description">
                      No pudimos enviar tu mensaje. Por favor intenta de nuevo.
                    </p>
                    <button className="contact-modal__submit retry-btn" onClick={() => setStatus('idle')}>
                      Reintentar
                    </button>
                  </div>
                </div>
              )}

              {/* ── LÍMITE ALCANZADO ── */}
              {status === 'limite' && (
                <div className="status-container">
                  <div className="status-card">
                    <div className="status-icon error-bg">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                    <h3 className="status-title">Límite alcanzado</h3>
                    <p className="status-description">
                      Enviaste varios mensajes en poco tiempo. Intenta de nuevo más tarde.
                    </p>
                    <button className="contact-modal__submit retry-btn" onClick={() => setStatus('idle')}>
                      Entendido
                    </button>
                  </div>
                </div>
              )}

              {/* ── FORMULARIO ── */}
              {status === 'idle' && (
                <>
                  <button className="contact-modal__close" aria-label="Cerrar modal" onClick={handleClose}>
                    &times;
                  </button>
                  <h2 className="contact-modal__title">Contáctanos</h2>
                  <p className="contact-modal__subtitle">Escríbenos y te responderemos pronto</p>

                  <form className="contact-modal__form" onSubmit={sendEmail}>

                    {/* Campo honeypot: oculto visualmente, los bots sí lo llenan */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={updateField}
                      style={{ position: 'absolute', left: '-9999px' }}
                      tabIndex="-1"
                      autoComplete="off"
                    />

                    <div className="contact-modal__field">
                      <label htmlFor="nombre">Nombre</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={updateField}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div className="contact-modal__field">
                      <label htmlFor="celular">Celular</label>
                      <input
                        type="tel"
                        id="celular"
                        name="celular"
                        value={formData.celular}
                        onChange={updateField}
                        placeholder="Tu número de celular"
                        required
                      />
                    </div>
                    <div className="contact-modal__field">
                      <label htmlFor="correo">Correo</label>
                      <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={updateField}
                        placeholder="tu@correo.com"
                        required
                      />
                    </div>
                    <div className="contact-modal__field">
                      <label htmlFor="asunto">Asunto</label>
                      <input
                        type="text"
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={updateField}
                        placeholder="¿En qué podemos ayudarte?"
                        required
                      />
                    </div>
                    <div className="contact-modal__field">
                      <label htmlFor="mensaje">Mensaje</label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={updateField}
                        placeholder="Escribe tu mensaje aquí..."
                        rows="4"
                        required
                      />
                    </div>
                    <div className="contact-modal__field">
                      <label htmlFor="comoNosConociste">¿Cómo nos conociste?</label>
                      <select
                        id="comoNosConociste"
                        name="comoNosConociste"
                        value={formData.comoNosConociste}
                        onChange={updateField}
                        required
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="TikTok">TikTok</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Google / Búsqueda en internet">Google / Búsqueda en internet</option>
                        <option value="Recomendación de un amigo/familiar">Recomendación de un amigo/familiar</option>
                        <option value="Publicidad en la calle / vallas">Publicidad en la calle / vallas</option>
                        <option value="Ya soy cliente">Ya soy cliente</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <button type="submit" className="contact-modal__submit" disabled>Enviar Mensaje</button>
                  </form>
                </>
              )}

            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default ContactModal;