import formidable from 'formidable';
import fs from 'fs';
import { checkRateLimit, getTransporter } from './mailer.js';

// Vercel no debe parsear el body automáticamente porque viene como
// multipart/form-data (por el archivo del CV). Lo parseamos manualmente
// con formidable dentro del handler.
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
    // Respondemos "success" falso para no darle pistas de que fue detectado.
    const honeypot = fields.website?.[0] || '';
    if (honeypot) {
      return res.status(200).json({ success: true });
    }

    // Límite: 3 envíos por hora por IP, 30 en total al día para este formulario
    const { blocked } = await checkRateLimit(req, 'application', 3, 30);
    if (blocked) {
      return res.status(429).json({ error: 'Demasiados envíos, intenta más tarde' });
    }

    const nombre = fields.nombre?.[0] || '';
    const apellidos = fields.apellidos?.[0] || '';
    const celular = fields.celular?.[0] || '';
    const correo = fields.correo?.[0] || '';
    const cargo = fields.cargo?.[0] || '';
    const motivo = fields.motivo?.[0] || '';
    const cvFile = files.cvFile?.[0];

    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.HR_EMAIL, // correo de Recursos Humanos
      replyTo: correo,
      subject: `Nueva postulación: ${cargo}`,
      html: `
        <h3>Nueva postulación recibida</h3>
        <p><b>Nombre:</b> ${nombre} ${apellidos}</p>
        <p><b>Celular:</b> ${celular}</p>
        <p><b>Correo:</b> ${correo}</p>
        <p><b>Cargo de interés:</b> ${cargo}</p>
        <p><b>Motivo:</b><br>${motivo}</p>
      `,
      attachments: cvFile
        ? [{ filename: cvFile.originalFilename, path: cvFile.filepath }]
        : [],
    });

    // Borra el archivo temporal del servidor una vez enviado el correo
    if (cvFile) fs.unlink(cvFile.filepath, () => {});

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al enviar la postulación' });
  }
}