import { checkRateLimit, getTransporter } from './mailer.js';

// Sin formidable ni bodyParser: false porque este formulario no lleva archivos,
// solo texto en JSON.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, celular, correo, asunto, mensaje, website } = req.body;

    // Honeypot: si viene lleno, es un bot. Respondemos "éxito" falso.
    if (website) {
      return res.status(200).json({ success: true });
    }

    // Límite: 3 envíos por hora por IP, 30 en total al día para este formulario
    const { blocked } = await checkRateLimit(req, 'contact', 3, 30);
    if (blocked) {
      return res.status(429).json({ error: 'Demasiados envíos, intenta más tarde' });
    }

    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.SALES_EMAIL, // correo del asesor comercial
      replyTo: correo,
      subject: `Nuevo contacto: ${asunto}`,
      html: `
        <h3>Nuevo mensaje del formulario comercial</h3>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Celular:</b> ${celular}</p>
        <p><b>Correo:</b> ${correo}</p>
        <p><b>Asunto:</b> ${asunto}</p>
        <p><b>Mensaje:</b><br>${mensaje}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
}