import { Link } from "react-router-dom";
import "../TratamientoDatos/TratamientoDatos.css";

const PoliticaCookies = () => {
  return (
    <main className="td-wrapper">
      <article className="td-document">
        <header className="td-doc-header">
          <h1 className="td-doc-title">Política de Uso de Cookies</h1>
          <p className="td-doc-meta">MOTOCENTER · Actualizado enero 2025</p>
        </header>

        <div className="td-content">
          <h2>¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            navegador cuando visitas un sitio web. Se utilizan para recordar
            información sobre tu navegación y para mejorar tu experiencia,
            permitiéndonos ofrecerte contenidos y funciones relevantes.
          </p>

          <h2>¿Qué tipos de cookies utilizamos?</h2>
          <p>
            <strong>Cookies esenciales o técnicas:</strong> son necesarias para
            el funcionamiento básico del sitio. Permiten, por ejemplo, recordar
            tu elección sobre el consentimiento de cookies o mantener la sesión
            activa al enviar un formulario. No requieren consentimiento previo.
          </p>
          <p>
            <strong>Cookies analíticas:</strong> nos ayudan a conocer de forma
            agregada cómo se utiliza el sitio (páginas visitadas, tiempo de
            permanencia, origen del tráfico) con el fin de mejorar la
            navegación. Se activan únicamente cuando has dado tu consentimiento.
          </p>
          <p>
            <strong>Cookies de terceros:</strong> algunas funcionalidades
            embebidas, como mapas, chats de atención o reproductores de video,
            pueden almacenar cookies bajo la responsabilidad de esos
            proveedores. El uso de saidas queda sujeto a sus propias
            políticas de privacidad.
          </p>

          <h2>¿Cómo Puedes Gestionar Tus Cookies?</h2>
          <p>
            Puedes aceptar, rechazar o retirar tu consentimiento en cualquier
            momento. Puedes hacerlo borrando las cookies desde la configuración
            de tu navegador o bloqueando nuestro aviso de consentimiento, que
            volverá a mostrarse en tu próxima visita.
          </p>
          <p>
            La mayoría de los navegadores también permiten bloquear
            temporalmente las cookies de terceros o la totalidad de las cookies
            desde su configuración de privacidad. Ten en cuenta que desactivar
            las cookies esenciales puede impedir que el sitio funcione
            correctamente.
          </p>

          <h2>Cambios en Esta Política</h2>          <p>
            Podemos actualizar esta política para reflejar cambios legales,
            técnicos o en nuestros proveedores. Cualquier modificación será
            publicada en esta misma página, indicando la fecha de la última
            actualización.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tienes alguna pregunta sobre esta política o sobre el tratamiento
            de tu información personal, escríbenos a través de nuestros canales
            de atención o visita nuestra página de{" "}
            <Link to="/tratamiento-de-datos">Tratamiento de Datos Personales</Link>.
          </p>
        </div>
      </article>
    </main>
  );
};

export default PoliticaCookies;
