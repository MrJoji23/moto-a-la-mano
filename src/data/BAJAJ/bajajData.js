//carpeta principal
export { BAJAJ_BRANDS } from './filterBajaj';
 
export { BOXER_MOTOS   } from './boxer';
export { PULSAR_MOTOS  } from './pulsar';
export { DOMINAR_MOTOS } from './dominar';
export { DISCOVER_MOTOS} from './discover';
 
import { BOXER_MOTOS   } from './boxer';
import { PULSAR_MOTOS  } from './pulsar';
import { DOMINAR_MOTOS } from './dominar';
import { DISCOVER_MOTOS} from './discover';

export const BAJAJ_MOTOS = [
  ...PULSAR_MOTOS,
  ...DOMINAR_MOTOS,
  ...DISCOVER_MOTOS,
  ...BOXER_MOTOS,
];