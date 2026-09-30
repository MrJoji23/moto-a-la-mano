// ── Contacto ──────────────────────────────────────────────────────────────
/**
 * Número de WhatsApp comercial, en formato internacional sin `+` ni espacios
 * (el que exige `wa.me` y `api.whatsapp.com/send?phone=`).
 *
 * ⚠️ NUMERO DE EJEMPLO — no es un número real y no abre ningún chat.
 * Para producción, sustituir por el número comercial definitivo de MotoCenter.
 */
export const WHATSAPP_NUMERO = "300000000";

/** Enlace de WhatsApp con mensaje prellenado, para usar en `<a href>`. */
export const enlaceWhatsApp = (texto = "") =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}` +
  (texto ? `&text=${encodeURIComponent(texto)}` : "");

/** Abre WhatsApp en una pestaña nueva desde un `onClick`. */
export const abrirWhatsApp = (texto = "") =>
  window.open(
    `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`,
    "_blank",
    "noopener",
  );
