import nodemailer from 'nodemailer';
import { createClient } from 'redis';

// Reutilizamos la misma conexión entre invocaciones "calientes" de la función,
// en vez de abrir una conexión nueva a Redis en cada solicitud.
let redisClient;

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (err) => console.error('Redis error:', err));
    await redisClient.connect();
  }
  return redisClient;
}

/**
 * Revisa si una IP ha excedido el límite de envíos para un formulario específico.
 * Cada formulario (formId) tiene su propio contador independiente, así que
 * el spam en un formulario no bloquea al otro.
 */
export async function checkRateLimit(req, formId, maxPorHora, maxPorDia) {
  const redis = await getRedisClient();

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  // Límite por hora, por IP
  const ipKey = `rl:${formId}:ip:${ip}`;
  const ipCount = await redis.incr(ipKey);
  if (ipCount === 1) await redis.expire(ipKey, 3600); // la clave expira en 1 hora
  if (ipCount > maxPorHora) {
    return { blocked: true, reason: 'ip' };
  }

  // Límite global del día (protección extra si muchas IPs distintas atacan a la vez)
  const today = new Date().toISOString().slice(0, 10); // ej: 2026-07-24
  const dayKey = `rl:${formId}:day:${today}`;
  const dayCount = await redis.incr(dayKey);
  if (dayCount === 1) await redis.expire(dayKey, 86400); // expira en 24h
  if (dayCount > maxPorDia) {
    return { blocked: true, reason: 'day' };
  }

  return { blocked: false };
}

/**
 * Crea el transportador de Nodemailer configurado con tu cuenta de Gmail.
 * Usa las variables de entorno GMAIL_USER y GMAIL_APP_PASSWORD.
 */
export function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}