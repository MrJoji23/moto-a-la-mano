import { AUTECO_BRANDS } from '../../data/AUTECO/autecoData';
import LineasSelector from '../main-page/LineasSelector/LineasSelector';

const AutecoBrandsSection = ({ marcaSeleccionada, onMarcaSelect }) => (
  <LineasSelector
    tituloId="auteco-lineas-title"
    eyebrow="Líneas Auteco"
    titulo="Toda la"
    tituloAccent="gama"
    descripcion="Pulsa la línea que te interesa para ver sólo sus modelos. Vuelve a pulsarla para ver el catálogo completo."
    lineas={AUTECO_BRANDS}
    seleccion={marcaSeleccionada}
    onSelect={onMarcaSelect}
    accentVar="--mm-brand-auteco"
  />
);

export default AutecoBrandsSection;
