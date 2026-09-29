import './GridFilters.css';

/**
 * Barra de filtros del catálogo en formato chips.
 * Es "controlada": recibe el estado y las opciones ya calculadas, de modo
 * que la lógica de filtrado vive en la página y la UI es agnóstica (§12).
 *
 * Contrato de `onChange`: se sintetiza un evento con
 * `{ target: { name, value } }` para no obligar a reescribir las páginas
 * que hoy leen `e.target.name` / `e.target.value` de un `<select>`.
 */
const GridFilters = ({ resultado, filtros, campos, onChange, onReset }) => {
  const hayFiltros = campos.some((campo) => filtros[campo.name]);

  const seleccionar = (name, value) => {
    onChange({ target: { name, value } });
  };

  return (
    <div className="grid-filters">
      {campos.map((campo) => (
        <fieldset
          key={campo.name}
          className="grid-filters__group"
          data-testid={`filtro-${campo.name}`}
        >
          <legend className="grid-filters__legend">{campo.label}</legend>

          <div className="grid-filters__chips">
            {/* Chip "todos": siempre presente para poder limpiar un campo */}
            <button
              type="button"
              className="chip"
              aria-pressed={!filtros[campo.name]}
              onClick={() => seleccionar(campo.name, '')}
            >
              {campo.todos}
            </button>

            {campo.opciones.map((opcion) => (
              <button
                key={opcion.value}
                type="button"
                className="chip"
                aria-pressed={filtros[campo.name] === opcion.value}
                onClick={() => seleccionar(campo.name, opcion.value)}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="grid-filters__foot">
        <p className="grid-filters__count" role="status" aria-live="polite">
          {resultado === 1 ? '1 modelo encontrado' : `${resultado} modelos encontrados`}
        </p>

        {hayFiltros && (
          <button type="button" className="grid-filters__reset" onClick={onReset}>
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default GridFilters;
