// ── Catálogo Auteco ────────────────────────────────────────────
export { AUTECO_BRANDS } from './filterAuteco';
export { AUTECO_TIPOS, normalizeAutecoTipo } from '../tipos';
export { ELECTRICOS } from './electricos';

import { TVS_MOTOS } from './tvs';
import { VICTORY_MOTOS } from './victory';
import { KYMCO_MOTOS } from './kymco';
import { CERONTE_MOTOS } from './ceronte';
import { ELECTRICOS } from './electricos';
import { normalizeAutecoTipo } from '../tipos';
import { acentoDeMoto, hexToRgb } from '../palette';

const CRUDO = [
  ...VICTORY_MOTOS,
  ...TVS_MOTOS,
  ...KYMCO_MOTOS,
  ...CERONTE_MOTOS,
  ...ELECTRICOS,
];

/**
 * Añade `tipoSlug` / `tipoLabel` para que los filtros no dependan de la grafía
 * y `color` / `colorRgb` con el acento MotoCenter de cada línea.
 */
export const AUTECO_MOTOS = CRUDO.map((moto) => {
  const tipo = normalizeAutecoTipo(moto.tipo);
  const color = acentoDeMoto("auteco", tipo.slug);
  return { ...moto, tipoSlug: tipo.slug, tipoLabel: tipo.label, color, colorRgb: hexToRgb(color) };
});

export const AUTECO_MARCAS = [...new Set(AUTECO_MOTOS.map((moto) => moto.marca))];
