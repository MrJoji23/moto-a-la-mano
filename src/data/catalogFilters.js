/**
 * Lógica de filtrado del catálogo (Bajaj / Auteco).
 *
 * Vive fuera de los componentes para que la UI sea agnóstica (§12) y el
 * cálculo sea testeable de forma aislada. No muta los objetos de /data: sólo
 * lee `cc` y `precio` tal como vienen en el repo.
 */

/* ── Parseo seguro ─────────────────────────────── */

/** "124,59 cc" | "102cc" | 150 → número, o `null` si no se puede leer. */
export const parseCc = (valor) => {
  if (valor == null) return null;
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : null;

  const match = String(valor).match(/[0-9]+(?:[.,][0-9]+)?/);
  if (!match) return null;

  const numero = Number(match[0].replace(',', '.'));
  return Number.isFinite(numero) ? numero : null;
};

/** "$7.599.000" | 7599000 → número, o `null` si no se puede leer. */
export const parsePrecio = (valor) => {
  if (valor == null) return null;
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : null;

  // Sólo dígitos: '$7.599.000' → '7599000'
  const digitos = String(valor).replace(/\D/g, '');
  if (!digitos) return null;

  const numero = Number(digitos);
  return Number.isFinite(numero) && numero > 0 ? numero : null;
};

/* ── Rangos de cilindrada (cc) ─────────────────── */

/* Límites enteros y excluyentes entre sí: un 125 cc cae sólo en "Hasta 125 cc"
   y un 150 cc sólo en "126 – 150 cc". Se compara sobre el cc redondeado para
   que 124,59 y 124,9 se comporten igual que 125. */
export const CC_RANGOS = [
  { id: 'todo', label: 'Todas', min: 0, max: Infinity },
  { id: 'cc-125', label: 'Hasta 125 cc', min: 0, max: 125 },
  { id: 'cc-150', label: '126 – 150 cc', min: 126, max: 150 },
  { id: 'cc-200', label: '151 – 200 cc', min: 151, max: 200 },
  { id: 'cc-250', label: '201 – 250 cc', min: 201, max: 250 },
  { id: 'cc-300', label: '251 – 300 cc', min: 251, max: 300 },
  { id: 'cc-mas', label: 'Más de 300 cc', min: 301, max: Infinity },
];

export const rangoCcPorId = (id) =>
  CC_RANGOS.find((rango) => rango.id === id) || CC_RANGOS[0];

/* ── Rangos de precio ──────────────────────────── */

const MILLON = 1_000_000;

/** "hasta $8 M" · "$8 – $12 M" · "más de $20 M" */
const compacto = (valor) => `$${Math.round(valor / MILLON)} M`;

/** Cortes legibles redondeados a múltiplos de $500.000. */
const redondearCorte = (valor) => Math.round(valor / 500_000) * 500_000;

/**
 * Rangos de precio **contiguos** derivados de los precios reales del catálogo
 * que se está mostrando: [0, corte1], [corte1, corte2], [corte2, ∞). Nunca
 * dejan huecos, así que todo modelo con precio cae en exactamente un rango.
 *
 * Los cortes se toman de los cuartiles de la distribución real (redondeados a
 * $500.000) para que los rangos tengan aproximadamente la misma cantidad de
 * modelos, en vez de un primer rango con una sola moto.
 */
export const construirRangosPrecio = (motos) => {
  const precios = motos
    .map((moto) => parsePrecio(moto.precio))
    .filter((valor) => valor !== null)
    .sort((a, b) => a - b);

  const base = { min: 0, max: Infinity };
  if (precios.length < 3) {
    return [{ id: 'precio-todo', label: 'Todos los precios', ...base }];
  }

  const cuartil = (fraccion) =>
    precios[Math.min(precios.length - 1, Math.floor(precios.length * fraccion))];

  /* Redondeo al alza para no dejar el corte cutting entre dos modelos. */
  const corte1 = redondearCorte(cuartil(0.5));
  const corte2 = Math.max(redondearCorte(cuartil(0.9)), corte1 + 500_000);

  return [
    { id: 'precio-todo', label: 'Todos los precios', ...base },
    { id: 'precio-1', label: `Hasta ${compacto(corte1)}`, min: 0, max: corte1 },
    {
      id: 'precio-2',
      label: `${compacto(corte1)} – ${compacto(corte2)}`,
      min: corte1,
      max: corte2,
    },
    { id: 'precio-3', label: `Más de ${compacto(corte2)}`, min: corte2, max: Infinity },
  ];
};

export const rangoPrecioPorId = (rangos, id) =>
  rangos.find((rango) => rango.id === id) || rangos[0];

/* ── Búsqueda de texto ─────────────────────────── */

const normalizar = (texto) =>
  String(texto ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export const coincideBusqueda = (moto, consulta) => {
  const q = normalizar(consulta.trim());
  if (!q) return true;

  const campos = [moto.name, moto.marca, moto.tipoLabel, moto.tipo, moto.cc];
  return campos.some((campo) => normalizar(campo).includes(q));
};

/* ── Orden ─────────────────────────────────────── */

/** Sin dato → al final, nunca rompe el orden. */
const precioSeguro = (moto) => parsePrecio(moto.precio) ?? Infinity;
const ccSeguro = (moto) => parseCc(moto.cc) ?? Infinity;

const COMPARADORES = {
  'precio-asc': (a, b) => precioSeguro(a) - precioSeguro(b),
  'precio-desc': (a, b) => precioSeguro(b) - precioSeguro(a),
  'cc-asc': (a, b) => ccSeguro(a) - ccSeguro(b),
  'cc-desc': (a, b) => ccSeguro(b) - ccSeguro(a),
  'nombre-asc': (a, b) => normalizar(a.name).localeCompare(normalizar(b.name), 'es'),
  'nombre-desc': (a, b) => normalizar(b.name).localeCompare(normalizar(a.name), 'es'),
};

export const ORDENES = [
  { id: '', label: 'Relevancia' },
  { id: 'precio-asc', label: 'Precio: menor a mayor' },
  { id: 'precio-desc', label: 'Precio: mayor a menor' },
  { id: 'cc-asc', label: 'Cilindrada: menor a mayor' },
  { id: 'cc-desc', label: 'Cilindrada: mayor a menor' },
  { id: 'nombre-asc', label: 'Nombre: A–Z' },
  { id: 'nombre-desc', label: 'Nombre: Z–A' },
];

export const ordenarMotos = (motos, orden) => {
  const comparador = COMPARADORES[orden];
  if (!comparador) return motos;
  return [...motos].sort(comparador);
};

/* ── Filtro principal ──────────────────────────── */

export const FILTROS_INICIALES = { cc: 'todo', precio: 'precio-todo' };

/**
 * Aplica cc + precio + búsqueda sobre un catálogo ya acotado por marca/línea.
 *
 * Un modelo sin `cc` o sin `precio` queda fuera cuando hay un rango activo
 * (no se puede afirmar que encaje), y permanece visible con "Todos".
 */
export const filtrarMotos = (motos, { cc, precio, busqueda }, rangosPrecio) => {
  const rangoCc = rangoCcPorId(cc);
  const rangoPrecio = rangoPrecioPorId(rangosPrecio, precio);
  const filtrandoCc = rangoCc.id !== 'todo';
  const filtrandoPrecio = rangoPrecio.id !== 'precio-todo';

  return motos.filter((moto) => {
    if (filtrandoCc) {
      const valor = parseCc(moto.cc);
      if (valor === null) return false;
      /* Se compara el cc redondeado: así 124,59 y 124,9 caen en "Hasta 125 cc"
         y 150,4 en "151 – 200 cc", sin huecos ni solapes en los límites. */
      const entero = Math.round(valor);
      if (entero < rangoCc.min || entero > rangoCc.max) return false;
    }

    if (filtrandoPrecio) {
      const valor = parsePrecio(moto.precio);
      if (valor === null || valor < rangoPrecio.min || valor > rangoPrecio.max) return false;
    }

    return coincideBusqueda(moto, busqueda);
  });
};
