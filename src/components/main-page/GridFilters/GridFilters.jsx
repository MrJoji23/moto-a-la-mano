import './GridFilters.css';

/**
 * Barra de filtros reutilizable del catálogo.
 * Es "controlada": recibe el estado y los `<option>` ya calculados,
 * de modo que la lógica de filtrado vive en la página y la UI es agnóstica.
 */
const GridFilters = ({ resultado, filtros, campos, onChange, onReset }) => {
  const hayFiltros = campos.some((campo) => filtros[campo.name]);

  return (
    <div className="grid-filters">
      <div className="grid-filters__fields">
        {campos.map((campo) => (
          <div className="grid-filters__field" key={campo.name}>
            <label className="grid-filters__label" htmlFor={`filtro-${campo.name}`}>
              {campo.label}
            </label>
            <select
              id={`filtro-${campo.name}`}
              name={campo.name}
              className="grid-filters__select"
              value={filtros[campo.name] ?? ""}
              onChange={onChange}
            >
              <option value="">{campo.todos}</option>
              {campo.opciones.map((opcion) => (
                <option key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {hayFiltros && (
          <button type="button" className="grid-filters__reset" onClick={onReset}>
            Limpiar filtros
          </button>
        )}
      </div>

      <p className="grid-filters__count" role="status" aria-live="polite">
        {resultado === 1
          ? "1 modelo encontrado"
          : `${resultado} modelos encontrados`}
      </p>
    </div>
  );
};

export default GridFilters;
