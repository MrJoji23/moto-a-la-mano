// ── Paleta de acentos por línea de producto ───────────────────────
// Todos los valores pertenecen a la identidad MotoCenter (Dark Carbon /
// Speed Amber / Cyber Cyan). No se usan rojos ni azules: el acento se
// toma siempre de ámbar, cian, violeta neón, verde o neutros.

/** Acentos permitidos, indexados paracycling por línea. */
export const ACENTOS = [
  "#ff9f1c", // Speed Amber
  "#00e5ff", // Cyber Cyan
  "#c77dff", // Violeta neón
  "#4ade80", // Verde luminoso
  "#ffc46b", // Ámbar claro
  "#66eeff", // Cian claro
  "#f5f6f8", // Blanco suave
];

/** Acento por marca: Bajaj cálido, Auteco cian. */
export const COLOR_POR_MARCA = {
  bajaj: "#ff9f1c",
  auteco: "#00e5ff",
  honda: "#c77dff",
};

/** Acento por línea (slug normalizado en `tipos.js`). */
export const COLOR_POR_LINEA = {
  // ── Bajaj ──
  STREET: "#ffc46b",
  NAKED_SPORT: "#ff9f1c",
  FULL_FAIRING: "#e88a00",
  SPORT: "#66eeff",
  TOURER: "#f5f6f8",
  ADVENTURE: "#4ade80",
  URBANA: "#4ade80",
  TRABAJO: "#a1a1aa",
  ECONOMIA: "#c77dff",

  // ── Auteco ──
  AUTOMATICA: "#00e5ff",
  SEMIAUTOMATICA: "#66eeff",
  SCOOTER: "#c77dff",
  TODO_TERRENO: "#ff9f1c",
  MOTOCARRO: "#e88a00",
  ELECTRICA: "#4ade80",
  BICICLETA_ELECTRICA: "#4ade80",
};

/** Color hex → tripleta `r, g, b` para `rgba()` en JS/CSS inline. */
export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(", ");
}

/** Resuelve el acento de un moto según marca y línea. */
export function acentoDeMoto(marca, tipoSlug) {
  const porLinea = COLOR_POR_LINEA[tipoSlug];
  if (porLinea) return porLinea;
  return COLOR_POR_MARCA[String(marca).toLowerCase()] ?? ACENTOS[0];
}
