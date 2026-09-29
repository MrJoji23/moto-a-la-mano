import { BAJAJ_BRANDS } from '../../data/BAJAJ/bajajData';
import LineasSelector from '../main-page/LineasSelector/LineasSelector';

const BajajBrandsSection = ({ marcaSeleccionada, onMarcaSelect }) => (
  <LineasSelector
    tituloId="bajaj-lineas-title"
    eyebrow="Líneas Bajaj"
    titulo="Toda la"
    tituloAccent="gama"
    descripcion="Pulsa la línea que te interesa para ver sólo sus modelos. Vuelve a pulsarla para ver el catálogo completo."
    lineas={BAJAJ_BRANDS}
    seleccion={marcaSeleccionada}
    onSelect={onMarcaSelect}
    accentVar="--mm-accent"
  />
);

export default BajajBrandsSection;
