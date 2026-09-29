import formidable from 'formidable';
import fs from 'fs';
import { checkRateLimit, getTransporter } from './mailer.js';

// Igual que send-application.js: no dejamos que Vercel parsee el body
// automáticamente porque viene como multipart/form-data (por el archivo PDF).
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const form = formidable({ maxFileSize: 5 * 1024 * 1024 }); // 5MB máx por archivo
    const [fields, files] = await form.parse(req);

    // Honeypot: si este campo invisible viene lleno, es un bot.
    const honeypot = fields.website?.[0] || '';
    if (honeypot) {
      return res.status(200).json({ success: true });
    }

    // Límite: 3 envíos por hora por IP, 30 en total al día para este formulario
    const { blocked } = await checkRateLimit(req, 'pqrs', 3, 30);
    if (blocked) {
      return res.status(429).json({ error: 'Demasiados envíos, intenta más tarde' });
    }

    const tipoSolicitud = fields.tipoSolicitud?.[0] || '';
    const nombre = fields.nombre?.[0] || '';
    const documento = fields.documento?.[0] || '';
    const celular = fields.celular?.[0] || '';
    const correo = fields.correo?.[0] || '';
    const descripcion = fields.descripcion?.[0] || '';
    const adjunto = files.adjunto?.[0];

    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.PQRS_EMAIL, // correo dedicado para PQRS
      replyTo: correo,
      subject: `Nueva PQRS: ${tipoSolicitud}`,
      html: `
        <h3>Nueva PQRS recibida</h3>
        <p><b>Tipo de solicitud:</b> ${tipoSolicitud}</p>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Documento:</b> ${documento}</p>
        <p><b>Celular:</b> ${celular}</p>
        <p><b>Correo:</b> ${correo}</p>
        <p><b>Descripción:</b><br>${descripcion}</p>
      `,
      attachments: adjunto
        ? [{ filename: adjunto.originalFilename, path: adjunto.filepath }]
        : [],
    });

    if (adjunto) fs.unlink(adjunto.filepath, () => {});

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al enviar la PQRS' });
  }
}