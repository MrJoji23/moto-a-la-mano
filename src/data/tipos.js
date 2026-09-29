/**
 * Segmentos canónicos del catálogo.
 *
 * Los archivos de datos crudos usan etiquetas heterogéneas para el mismo
 * concepto ("Trabajo" / "TRABAJO", "Semiautomáticas" / "SEMIAUTOMATICA"…),
 * por lo que cada registro se normaliza contra estas tablas. Así los filtros
 * de la UI nunca dependen de la grafía con la que se escribió el dato.
 */

const match = (table, value) => {
  const key = String(value ?? "")
    .trim()
    .toLowerCase();
  return table.find((tipo) => tipo.raw.includes(key));
};

const withLabel = (table) => {
  const byslug = new Map(table.map((tipo) => [tipo.slug, tipo.label]));
  return (value) => {
    const tipo = match(table, value);
    return { slug: tipo?.slug ?? "OTROS", label: byslug.get(tipo?.slug) ?? "Otros" };
  };
};

/* ── Bajaj ──────────────────────────────────────── */
export const BAJAJ_TIPOS = [
  { slug: "STREET", label: "Street", raw: ["street"] },
  { slug: "NAKED_SPORT", label: "Naked Sport", raw: ["naked sport", "naked"] },
  { slug: "FULL_FAIRING", label: "Full Fairing", raw: ["full fairing"] },
  { slug: "SPORT", label: "Sport", raw: ["sport", "deportiva"] },
  { slug: "TOURER", label: "Tourer", raw: ["tourer"] },
  { slug: "ADVENTURE", label: "Adventure", raw: ["adventure tourer", "adventure"] },
  { slug: "URBANA", label: "Urbana", raw: ["urbana", "urban"] },
  { slug: "TRABAJO", label: "Trabajo", raw: ["trabajo", "motocarro", "carga"] },
  { slug: "ECONOMIA", label: "Economía", raw: ["economia", "economía"] },
];

export const normalizeBajajTipo = withLabel(BAJAJ_TIPOS);

/* ── Auteco ─────────────────────────────────────── */
export const AUTECO_TIPOS = [
  { slug: "SPORT", label: "Sport", raw: ["sport"] },
  { slug: "AUTOMATICA", label: "Automática", raw: ["automatica", "automática"] },
  {
    slug: "SEMIAUTOMATICA",
    label: "Semiautomática",
    raw: ["semiautomatica", "semiautomática", "semiautomaticas", "semiautomáticas"],
  },
  { slug: "SCOOTER", label: "Scooter", raw: ["scooter"] },
  { slug: "URBANA", label: "Urbana", raw: ["urbanas", "urbana"] },
  { slug: "STREET", label: "Street", raw: ["street"] },
  { slug: "TODO_TERRENO", label: "Todo terreno", raw: ["todo terreno", "tod terreno"] },
  { slug: "TRABAJO", label: "Trabajo", raw: ["trabajo"] },
  { slug: "MOTOCARRO", label: "Motocarro", raw: ["motocarro", "moto carro"] },
  { slug: "ELECTRICA", label: "Moto eléctrica", raw: ["moto electrica", "moto eléctrica"] },
  {
    slug: "BICICLETA_ELECTRICA",
    label: "Bicicleta eléctrica",
    raw: ["bicicleta electrica", "bicicleta eléctrica"],
  },
];

export const normalizeAutecoTipo = withLabel(AUTECO_TIPOS);
