//carpeta principal
export { AUTECO_BRANDS } from './filterAuteco';
 
export { TVS_MOTOS   } from './tvs';
export { VICTORY_MOTOS  } from './victory';
export { KYMCO_MOTOS } from './kymco';
export { CERONTE_MOTOS} from './ceronte';
export { ELECTRICOS } from './electricos';
 
import { TVS_MOTOS   } from './tvs';
import { VICTORY_MOTOS  } from './victory';
import { KYMCO_MOTOS } from './kymco';
import { CERONTE_MOTOS} from './ceronte';
import { ELECTRICOS } from './electricos';
 
export const AUTECO_MOTOS = [
  ...VICTORY_MOTOS,
  ...TVS_MOTOS,
  ...KYMCO_MOTOS,
  ...CERONTE_MOTOS,
  ...ELECTRICOS
];