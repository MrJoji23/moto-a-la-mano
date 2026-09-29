import { useState } from 'react';
import './JobApplicationModal.css';

const JobApplicationModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    celular: '',
    correo: '',
    cargo: '',
    motivo: '',
    cvFile: null,
    cvFileName: '',
    website: '' // honeypot: campo trampa para bots, invisible para humanos
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cvFile' && files && files[0]) {
      setFormData(prev => ({
        ...prev,
        cvFile: files[0],
        cvFileName: files[0].name
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('apellidos', formData.apellidos);
    data.append('celular', formData.celular);
    data.append('correo', formData.correo);
    data.append('cargo', formData.cargo);
    data.append('motivo', formData.motivo);
    data.append('website', formData.website); // honeypot

    if (formData.cvFile) {
      data.append('cvFile', formData.cvFile);
    }

    try {
      const response = await fetch('/api/send-application', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => handleClose(), 4000);
      } else if (response.status === 429) {
        setStatus('limite');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '', apellidos: '', celular: '', correo: '',
      cargo: '', motivo: '', cvFile: null, cvFileName: '', website: ''
    });
    setStatus('idle');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="job-modal-overlay" onClick={handleClose}>
      <div className="job-modal-content" onClick={e => e.stopPropagation()}>

        {status === 'success' && (
          <div className="status-container">
            <div className="status-card">
              <div className="status-icon success-bg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="status-title">¡Postulación Enviada!</h3>
              <p className="status-description">Hemos recibido tu CV correctamente. Nos pondremos en contacto pronto.</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="status-container">
            <div className="status-card">
              <div className="status-icon error-bg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <h3 className="status-title">Algo salió mal</h3>
              <p className="status-description">No pudimos procesar tu envío. Por favor, contacta al administrador o intenta de nuevo.</p>
              <button className="job-btn-submit retry-btn" onClick={() => setStatus('idle')}>Reintentar</button>
            </div>
          </div>
        )}

        {status === 'limite' && (
          <div className="status-container">
            <div className="status-card">
              <div className="status-icon error-bg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <h3 className="status-title">Límite alcanzado</h3>
              <p className="status-description">Ya enviaste varias postulaciones en poco tiempo. Intenta de nuevo más tarde.</p>
              <button className="job-btn-submit retry-btn" onClick={() => setStatus('idle')}>Entendido</button>
            </div>
          </div>
        )}

        {status === 'idle' && (
          <>
            <div className="job-modal-header">
              <h3>Trabaja con Nosotros</h3>
              <button className="job-modal-close" onClick={handleClose}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="job-modal-form">

              {/* Campo honeypot: oculto visualmente, los bots sí lo llenan */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ position: 'absolute', left: '-9999px' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Nombre *</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="job-form-group">
                  <label>Apellidos *</label>
                  <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                </div>
              </div>
              <div className="job-form-group">
                <label>Celular *</label>
                <input type="tel" name="celular" value={formData.celular} onChange={handleChange} required />
              </div>
              <div className="job-form-group">
                <label>Correo electrónico *</label>
                <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
              </div>
              <div className="job-form-group">
                <label>Cargo de interés *</label>
                <select name="cargo" value={formData.cargo} onChange={handleChange} required>
                  <option value="">Selecciona un cargo</option>
                  <option value="Asesor de Ventas">Asesor de Ventas</option>
                  <option value="Técnico de Mantenimiento">Técnico de Mantenimiento</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="job-form-group">
                <label>¿Por qué quieres unirte? *</label>
                <textarea name="motivo" value={formData.motivo} onChange={handleChange} required rows="3" />
              </div>
              <div className="job-form-group">
                <label>Hoja de vida (CV)</label>
                <input type="file" name="cvFile" onChange={handleChange} accept=".pdf,.doc,.docx" />
              </div>
              <div className="job-modal-actions">
                <button type="submit" className="job-btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
                </button>
                <button type="button" className="job-btn-cancel" onClick={handleClose}>Cancelar</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default JobApplicationModal;