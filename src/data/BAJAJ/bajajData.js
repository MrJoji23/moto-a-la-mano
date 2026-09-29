// ── Catálogo Bajaj ─────────────────────────────────────────────
export { BAJAJ_BRANDS } from './filterBajaj';
export { BAJAJ_TIPOS, normalizeBajajTipo } from '../tipos';

import { BOXER_MOTOS } from './boxer';
import { PULSAR_MOTOS } from './pulsar';
import { DOMINAR_MOTOS } from './dominar';
import { DISCOVER_MOTOS } from './discover';
import { normalizeBajajTipo } from '../tipos';
import { acentoDeMoto, hexToRgb } from '../palette';

const CRUDO = [
  ...PULSAR_MOTOS,
  ...DOMINAR_MOTOS,
  ...DISCOVER_MOTOS,
  ...BOXER_MOTOS,
];

/**
 * Añade `tipoSlug` / `tipoLabel` para que los filtros no dependan de la grafía
 * y `color` / `colorRgb` con el acento MotoCenter de cada línea.
 */
export const BAJAJ_MOTOS = CRUDO.map((moto) => {
  const tipo = normalizeBajajTipo(moto.tipo);
  const color = acentoDeMoto("bajaj", tipo.slug);
  return { ...moto, tipoSlug: tipo.slug, tipoLabel: tipo.label, color, colorRgb: hexToRgb(color) };
});

export const BAJAJ_MARCAS = [...new Set(BAJAJ_MOTOS.map((moto) => moto.marca))];
