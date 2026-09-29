import { useEffect, useRef, useState } from 'react';
import { FiSearch, FiSliders, FiX } from 'react-icons/fi';
import { CC_RANGOS, ORDENES } from '../../../data/catalogFilters';
import './GridFilters.css';

/**
 * Conjunto de controles del catálogo, reutilizado en la toolbar de escritorio
 * y dentro del drawer móvil. Vive fuera del componente padre para no
 * recrearse en cada render y para que los `id` de los `<label>` dependan
 * sólo del `idPrefix` (nunca se duplican en el DOM).
 *
 * `idPrefix` "gf-" en escritorio y "gf-m-" en el drawer: ambos se montan a la
 * vez cuando el drawer está abierto, así que los ids deben ser distintos.
 */
const FilterFields = ({
  idPrefix,
  filtros,
  rangosPrecio,
  busqueda,
  orden,
  marcas,
  marcaSeleccionada,
  onChange,
  onSearch,
  onOrdenChange,
  onMarcaSelect,
}) => (
  <>
    {onSearch && (
      <div className="gf-field gf-field--search">
        <label className="gf-label" htmlFor={`${idPrefix}buscar`}>
          Buscar
        </label>
        <div className="gf-search">
          <FiSearch className="gf-search__icon" aria-hidden="true" />
          <input
            id={`${idPrefix}buscar`}
            type="search"
            className="gf-input"
            placeholder="Nombre del modelo…"
            value={busqueda}
            onChange={(e) => onSearch(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
    )}

    <div className="gf-field">
      <label className="gf-label" htmlFor={`${idPrefix}cc`}>
        Cilindrada (cc)
      </label>
      <select
        id={`${idPrefix}cc`}
        className="gf-select"
        value={filtros.cc}
        onChange={(e) => onChange('cc', e.target.value)}
      >
        {CC_RANGOS.map((rango) => (
          <option key={rango.id} value={rango.id}>
            {rango.label}
          </option>
        ))}
      </select>
    </div>

    <div className="gf-field">
      <label className="gf-label" htmlFor={`${idPrefix}precio`}>
        Precio
      </label>
      <select
        id={`${idPrefix}precio`}
        className="gf-select"
        value={filtros.precio}
        onChange={(e) => onChange('precio', e.target.value)}
      >
        {rangosPrecio.map((rango) => (
          <option key={rango.id} value={rango.id}>
            {rango.label}
          </option>
        ))}
      </select>
    </div>

    {marcas.length > 0 && (
      <div className="gf-field">
        <label className="gf-label" htmlFor={`${idPrefix}linea`}>
          Línea
        </label>
        <select
          id={`${idPrefix}linea`}
          className="gf-select"
          value={marcaSeleccionada || ''}
          onChange={(e) => onMarcaSelect(e.target.value || null)}
        >
          <option value="">Todas las líneas</option>
          {marcas.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.name}
            </option>
          ))}
        </select>
      </div>
    )}

    {onOrdenChange && (
      <div className="gf-field">
        <label className="gf-label" htmlFor={`${idPrefix}orden`}>
          Ordenar por
        </label>
        <select
          id={`${idPrefix}orden`}
          className="gf-select"
          value={orden}
          onChange={(e) => onOrdenChange(e.target.value)}
        >
          {ORDENES.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.label}
            </option>
          ))}
        </select>
      </div>
    )}
  </>
);

/**
 * Toolbar de filtros del catálogo: desplegables, no chips.
 *
 * · Desktop: [Buscar] [Cilindrada] [Precio] [Línea] [Ordenar] + contador
 * · Mobile:  botón "Filtros" → drawer con los mismos campos + Aplicar / Limpiar
 *
 * El estado vive en la página: este componente sólo informa cambios mediante
 * `onChange('cc' | 'precio', value)`, `onSearch`, `onOrdenChange` y
 * `onMarcaSelect` —agnóstico de la forma de la UI (§12).
 */
const GridFilters = ({
  resultado = 0,
  total = 0,
  filtros = { cc: 'todo', precio: 'precio-todo' },
  busqueda = '',
  orden = '',
  marcas = [],
  marcaSeleccionada = null,
  rangosPrecio = [],
  onChange,
  onReset,
  onSearch,
  onOrdenChange,
  onMarcaSelect,
}) => {
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const drawerRef = useRef(null);
  const botonFiltrosRef = useRef(null);

  const hayFiltros =
    filtros.cc !== 'todo' ||
    filtros.precio !== 'precio-todo' ||
    Boolean(busqueda.trim()) ||
    Boolean(orden) ||
    Boolean(marcaSeleccionada);

  /* Foco al entrar al drawer, foco de vuelta al botón y Escape para salir
     (WCAG 2.4.3). El contenedor desktop queda inert mientras está abierto. */
  useEffect(() => {
    if (!drawerAbierto) return undefined;

    const botonFiltros = botonFiltrosRef.current;
    const primero = drawerRef.current?.querySelector(
      'input, select, button:not([disabled])',
    );
    primero?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawerAbierto(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const scrollPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = scrollPrevio;
      botonFiltros?.focus();
    };
  }, [drawerAbierto]);

  const cerrarDrawer = () => setDrawerAbierto(false);

  const limpiar = () => {
    onReset?.();
    onSearch?.('');
    onOrdenChange?.('');
    onMarcaSelect?.(null);
  };

  const cerrarAlPulsarFuera = (e) => {
    if (e.target === e.currentTarget) cerrarDrawer();
  };

  const propsControles = {
    filtros,
    rangosPrecio,
    busqueda,
    orden,
    marcas,
    marcaSeleccionada,
    onChange,
    onSearch,
    onOrdenChange,
    onMarcaSelect,
  };

  const activos = [
    filtros.cc !== 'todo',
    filtros.precio !== 'precio-todo',
    Boolean(marcaSeleccionada),
  ].filter(Boolean).length;

  return (
    <div className="gf">
      {/* ── Toolbar desktop ── */}
      <div className="gf-toolbar" aria-hidden={drawerAbierto ? 'true' : undefined}>
        <div className="gf-toolbar__row">
          <div className="gf-toolbar__controls">
            <FilterFields idPrefix="gf-" {...propsControles} />
          </div>

          <div className="gf-toolbar__meta">
            <p className="gf-count" role="status" aria-live="polite">
              {hayFiltros
                ? `${resultado} de ${total} ${total === 1 ? 'modelo' : 'modelos'}`
                : `${total} ${total === 1 ? 'modelo' : 'modelos'}`}
            </p>

            {hayFiltros && (
              <button type="button" className="gf-clear" onClick={limpiar}>
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Barra mobile ── */}
      <div className="gf-mobilebar" aria-hidden={drawerAbierto ? 'true' : undefined}>
        {onSearch && (
          <div className="gf-search gf-search--mobile">
            <FiSearch className="gf-search__icon" aria-hidden="true" />
            <input
              type="search"
              className="gf-input"
              placeholder="Buscar modelo…"
              value={busqueda}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Buscar modelo por nombre"
              autoComplete="off"
            />
          </div>
        )}

        <button
          type="button"
          ref={botonFiltrosRef}
          className="gf-btn-filtros"
          onClick={() => setDrawerAbierto(true)}
          aria-expanded={drawerAbierto}
          aria-haspopup="dialog"
        >
          <FiSliders aria-hidden="true" />
          Filtros
          {activos > 0 && <span className="gf-btn-filtros__badge">{activos}</span>}
        </button>
      </div>

      {/* ── Drawer mobile ── */}
      {drawerAbierto && (
        <div className="gf-backdrop" onClick={cerrarAlPulsarFuera} role="presentation">
          <aside
            ref={drawerRef}
            className="gf-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gf-drawer-title"
          >
            <header className="gf-drawer__header">
              <h2 className="gf-drawer__title" id="gf-drawer-title">
                Filtros
              </h2>
              <button
                type="button"
                className="gf-drawer__close"
                onClick={cerrarDrawer}
                aria-label="Cerrar filtros"
              >
                <FiX aria-hidden="true" />
              </button>
            </header>

            <div className="gf-drawer__body">
              <FilterFields idPrefix="gf-m-" {...propsControles} />
            </div>

            <footer className="gf-drawer__footer">
              <button type="button" className="gf-btn gf-btn--ghost" onClick={limpiar}>
                Limpiar filtros
              </button>
              <button
                type="button"
                className="gf-btn gf-btn--primary"
                onClick={cerrarDrawer}
              >
                Aplicar
                <span className="sr-only"> filtros y ver resultados</span>
              </button>
            </footer>
          </aside>
        </div>
      )}
    </div>
  );
};

export default GridFilters;
