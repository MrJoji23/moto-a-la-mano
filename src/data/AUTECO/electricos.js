import segway_b110s from '../../assets/images/logos-auteco/segway-b110s.webp';
import segway_e110s from '../../assets/images/logos-auteco/segway-e110s.webp';
import segway_e125s from '../../assets/images/logos-auteco/segway-e125s.webp';
import segway_x160 from '../../assets/images/logos-auteco/segway-x160.webp';
/*import starker_avanti_x from '../../assets/images/logos-auteco/starker-avanti-x.webp';*/
import starker_cooljoy from '../../assets/images/logos-auteco/starker-cooljoy.webp';
import starker_skuty_one from '../../assets/images/logos-auteco/starker-skuty-one.webp';
import starker_star_k from '../../assets/images/logos-auteco/starker-star-k.webp';
import starker_star_k_pro from '../../assets/images/logos-auteco/starker-star-k-pro.webp';
import starker_thunder_1500 from '../../assets/images/logos-auteco/starker-thunder-1500.webp';
import super_soco_cpx from '../../assets/images/logos-auteco/super-soco-cpx.webp';
import super_soco_cux from '../../assets/images/logos-auteco/super-soco-cux.webp';
import super_soco_tc_max from '../../assets/images/logos-auteco/super-soco-tc-max.webp';
import super_soco_tc_wanderer from '../../assets/images/logos-auteco/super-soco-tc-wanderer.webp';
import super_soco_ts_street_hunter from '../../assets/images/logos-auteco/super-soco-ts-street-hunter.webp';
import super_soco_vmoto_citi from '../../assets/images/logos-auteco/super-soco-vmoto-citi.webp';
import tvs_iqube from '../../assets/images/logos-auteco/tvs-iqube.webp';
import minca_antara from '../../assets/images/logos-auteco/minca-ats-antara-pro-2400w.webp';
import minca_core from '../../assets/images/logos-auteco/minca-ats-core-1600w.webp';
import minca_nano from '../../assets/images/logos-auteco/minca-ats-nano-400w.webp';
import minca_nova from '../../assets/images/logos-auteco/minca-ats-nova-700w.webp';

export const ELECTRICOS = [
{
  id: 'minca_antara_2400w',
  marca: 'electricos',
  name: 'Minca ATS Antara Pro 2400w',
  autonomia: '70 km',
  potencia: '2400 W',
  tiempo_carga: '9-10 h',
  tipo: 'Moto Eléctrica',
  precio: '$4.790.000',
  img: minca_antara,
  destacado: 'Nuevo Lanzamiento',
  peso: '38 kg',
  descripcion: 'Velocidad que desafía la rutina: Minca 2400W Pura potencia, suspensión inteligente para cualquier terreno y certificación IPX4 que te protege del agua. Display de última generación con botonería táctil para un viaje ágil y sin interrupciones. Modo Turbo opcional para incrementar el torque en pendientes muy pronunciadas.'
},
{
  id: 'minca_core_1600w',
  marca: 'electricos',
  name: 'Minca ATS Core 1600w',
  autonomia: '60 km',
  potencia: '1600 W',
  tiempo_carga: '9-10 h',
  tipo: 'Moto Eléctrica',
  precio: '$3.790.000',
  img: minca_core,
  destacado: 'Nuevo Lanzamiento',
  peso: '26 kg',
  descripcion: 'Minca 1600W ATS: Hasta 60 km de autonomía con suspensión inteligente para terrenos reales. Certificación IPX4 contra el agua y control intuitivo gracias a su display avanzado con botonería táctil. Tecnología lista para tu ciudad.'
},
{
  id: 'minca_nova_700w',
  marca: 'electricos',
  name: 'Minca ATS Nova 700w',
  autonomia: '40 km',
  potencia: '700 W',
  tiempo_carga: '7-8 h',
  tipo: 'Moto Eléctrica',
  precio: '$2.618.000',
  img: minca_nova,
  destacado: 'Nuevo Lanzamiento',
  peso: '24 kg',
  descripcion: 'Minca 700W ATS: 37 km/h de velocidad máxima y hasta 40 km de autonomía. Suspensión inteligente que se adapta a la ciudad real, protección IPX4 contra el agua y control moderno con display de botonería táctil. Sistema de pulsera que hace el plegado más fácil y seguro.'
},
{
  id: 'minca_nano_400w',
  marca: 'electricos',
  name: 'Minca ATS Nano 400w',
  autonomia: '25 km',
  potencia: '400 W',
  tiempo_carga: '5-6 h',
  tipo: 'Moto Eléctrica',
  precio: '$1.990.000',
  img: minca_nano,
  destacado: 'Nuevo Lanzamiento',
  peso: '22 kg',
  descripcion: 'Minca 400W ATS: 30 km/h de velocidad y hasta 25 km de autonomía. Suspensión inteligente para terrenos reales, certificación IPX4 contra el agua y control moderno con display de botonería táctil. Sistema de pulsera que hace el plegado simple y seguro.'
},
{
  id: 'starker-star-k',
  marca: 'electricos',
  name: 'Starker Star K',
  autonomia: '15 km',
  potencia: '500 W',
  tiempo_carga: '6-8 h',
  tipo: 'Moto Eléctrica',
  precio: '$2.599.000',
  img: starker_star_k,
  peso: '32 kg',
  descripcion: 'La moto eléctrica para los más pequeños de la casa (4 a 7 años). Motor de 500W, velocidad limitada a 25 km/h y frenos de disco que garantizan una experiencia segura. El regalo ideal para introducir a los niños al mundo de las motos desde temprana edad.'
},
{
  id: 'super-soco-tc-max',
  marca: 'electricos',
  name: 'Super Soco TC Max',
  autonomia: '110 km',
  potencia: '3.9 kW',
  tiempo_carga: '6-8 h',
  tipo: 'Moto Eléctrica',
  precio: '$12.999.000',
  img: super_soco_tc_max,
  peso: '98 kg',
  descripcion: 'La moto eléctrica más rápida del mercado colombiano. Con 100 km/h de velocidad máxima, 110 km de autonomía y un diseño naked premium inspirado en el estilo clásico, la TC Max es la referencia absoluta en movilidad eléctrica de alto rendimiento. Batería de litio extraíble y certificación IP65.'
},
{
  id: 'super-soco-tc-wanderer',
  marca: 'electricos',
  name: 'Super Soco TC Wanderer',
  autonomia: '55 km',
  potencia: '2.5 kW',
  tiempo_carga: '6-7 h',
  tipo: 'Moto Eléctrica',
  precio: '$9.999.000',
  img: super_soco_tc_wanderer,
  peso: '88 kg',
  descripcion: 'La versión retro-aventurera de la familia TC de Super Soco. Diseño vintage con alma eléctrica moderna, 55 km de autonomía y manejo ágil en ciudad. Para el piloto urbano que quiere diferenciarse con un estilo único sin renunciar a la tecnología eléctrica.'
},
{
  id: 'starker-skuty-one',
  marca: 'electricos',
  name: 'Starker Skuty One',
  autonomia: '40 km',
  potencia: '350 W',
  tiempo_carga: '7 h',
  tipo: 'Moto Eléctrica',
  precio: '$2.999.000',
  img: starker_skuty_one,
  peso: '72 kg',
  descripcion: 'Scooter eléctrico compacto y accesible, ideal para primeros desplazamientos urbanos. Ligero, fácil de maniobrar y con una autonomía suficiente para el día a día de ciudad. La puerta de entrada más económica al mundo de la movilidad eléctrica de Stärker.'
},
{
  id: 'super-soco-cpx',
  marca: 'electricos',
  name: 'Super Soco CPX',
  autonomia: '110 km',
  potencia: '4 kW',
  tiempo_carga: '7-8 h',
  tipo: 'Moto Eléctrica',
  precio: '$12.999.000',
  img: super_soco_cpx,
  peso: '112 kg',
  descripcion: 'El maxi-scooter eléctrico premium de Super Soco. Diseño elegante piso plano, motor de 4 kW, velocidad máxima de 90 km/h y batería extraíble de alta capacidad. Combina confort de scooter urbano con prestaciones de moto eléctrica de segmento superior.'
},
{
  id: 'starker-cooljoy',
  marca: 'electricos',
  name: 'Starker Cooljoy',
  autonomia: '60 km',
  potencia: '500 W',
  tiempo_carga: '6-8 h',
  tipo: 'Moto Eléctrica',
  precio: '$3.449.000',
  img: starker_cooljoy,
  peso: '82 kg',
  descripcion: 'Scooter eléctrico de diseño fresco y juvenil con 60 km de autonomía. Práctico, ligero y económico para trayectos cortos de ciudad. El Cooljoy es la opción perfecta para quienes buscan una alternativa eléctrica asequible sin sacrificar estilo.'
},
{
  id: 'tvs-iqube',
  marca: 'electricos',
  name: 'TVS iQube',
  autonomia: '100 km',
  potencia: '4.6 kW',
  tiempo_carga: '6 h',
  tipo: 'Moto Eléctrica',
  precio: '$9.999.999',
  img: tvs_iqube,
  peso: '110 kg',
  descripcion: 'El scooter eléctrico más tecnológico de TVS. Motor BLDC de 4.6 kW, 100 km de autonomía y conectividad inteligente vía app con geo-fencing, alertas de colisión y navegación integrada. Batería IP67, frenado regenerativo y pantalla digital completa para el commuter urbano más exigente.'
},
{
  id: 'starker-thunder-1500',
  marca: 'electricos',
  name: 'Starker Thunder 1500',
  autonomia: '60 km',
  potencia: '1.5 kW',
  tiempo_carga: '6-8 h',
  tipo: 'Moto Eléctrica',
  precio: '$8.999.000',
  img: starker_thunder_1500,
  peso: '95 kg',
  descripcion: 'La naked eléctrica urbana de Stärker con motor de 1.5 kW y 60 km de autonomía. Diseño musculoso y deportivo, frenado de disco y manejo ágil. Una propuesta de mayor potencia dentro de la gama Stärker para el usuario que busca más carácter eléctrico en ciudad.'
},
{
  id: 'super-soco-vmoto-citi',
  marca: 'electricos',
  name: 'Super Soco Vmoto Citi',
  autonomia: '107 km',
  potencia: '4 kW',
  tiempo_carga: '7 h',
  tipo: 'Moto Eléctrica',
  precio: '$14.990.000',
  img: super_soco_vmoto_citi,
  peso: '112 kg',
  descripcion: 'Scooter eléctrico urbano de la línea Vmoto con 107 km de autonomía y motor de 4 kW. Diseño moderno, asiento amplio y espacioso, y batería de litio de alto rendimiento. La solución integral de Super Soco para el commuter que busca autonomía y confort en un solo paquete.'
},
{
  id: 'starker-star-k-pro',
  marca: 'electricos',
  name: 'Starker Star K Pro',
  autonomia: '40 km',
  potencia: '350 W',
  tiempo_carga: '6-8 h',
  tipo: 'Moto Eléctrica',
  precio: '$3.999.000',
  img: starker_star_k_pro,
  peso: '38 kg',
  descripcion: 'Versión mejorada de la Star K para niños de 7 a 9 años. Mayor autonomía (40 km), mismo motor seguro de 350W y una experiencia de manejo más completa. Diseñada para que los pequeños continúen su aprendizaje con una moto más capaz a medida que crecen.'
},
{
  id: 'segway-x160',
  marca: 'electricos',
  name: 'Segway X160',
  autonomia: '35 km',
  potencia: '2 kW',
  tiempo_carga: '4-6 h',
  tipo: 'Bicicleta Eléctrica',
  precio: '$13.499.000',
  img: segway_x160,
  peso: '86 kg',
  descripcion: 'Bicicleta eléctrica off-road de alto rendimiento de Segway. Motor de 2 kW, suspensión de largo recorrido y neumáticos todo terreno para afrontar senderos y caminos sin pavimentar. Diseñada para los aventureros que quieren explorar el campo sin emisiones y sin ruido.'
},
{
  id: 'super-soco-ts-street-hunter',
  marca: 'electricos',
  name: 'Super Soco TS Street Hunter',
  autonomia: '55 km',
  potencia: '2.5 kW',
  tiempo_carga: '6-7 h',
  tipo: 'Moto Eléctrica',
  precio: '$11.499.000',
  img: super_soco_ts_street_hunter,
  peso: '89 kg',
  descripcion: 'La naked eléctrica más deportiva de Super Soco. Motor Bosch de 2.5 kW con par de 180 Nm, velocidad máxima de 75 km/h y estética street-fighter que intimida desde el semáforo. Ligera, rápida y conectada: la moto eléctrica para quienes el diseño y el rendimiento van de la mano.'
},
{
  id: 'segway-e110s',
  marca: 'electricos',
  name: 'Segway E110S',
  autonomia: '57 km',
  potencia: '1.5 kW',
  tiempo_carga: '4-5 h',
  tipo: 'Moto Eléctrica',
  precio: '$7.499.000',
  img: segway_e110s,
  peso: '112 kg',
  descripcion: 'Scooter eléctrico inteligente de Segway con sistema RideyGo! y antirrobo AHRS con GPS y SIM 4G integrados. Bloqueo/desbloqueo automático por Bluetooth, 3 modos de conducción y pantalla digital a color. Tecnología de primer nivel en un scooter urbano moderno y conectado.'
},
{
  id: 'segway-e125s',
  marca: 'electricos',
  name: 'Segway E125S',
  autonomia: '108 km',
  potencia: '3 kW',
  tiempo_carga: '4-5 h',
  tipo: 'Moto Eléctrica',
  precio: '$11.990.000',
  img: segway_e125s,
  peso: '120 kg',
  descripcion: 'La versión premium del E110S con mayor batería (2880 Wh), picos de potencia de 3 kW y autonomía ampliada. Conserva toda la tecnología conectada de la línea Segway —GPS, Airlock, RideyGo!— con mejor rendimiento para quienes necesitan recorrer más kilómetros cada día.'
},
{
  id: 'super-soco-cux',
  marca: 'electricos',
  name: 'Super Soco CUx',
  autonomia: '65 km',
  potencia: '1.3 kW',
  tiempo_carga: '6-8 h',
  tipo: 'Moto Eléctrica',
  precio: '$6.999.000',
  img: super_soco_cux,
  peso: '78 kg',
  descripcion: 'El ciclomotor eléctrico más compacto de Super Soco. Diseño retro-moderno, motor 1.3 kW silencioso, batería extraíble y 65 km de autonomía. Ligero y manejable, ideal para desplazamientos cortos en ciudad con el estilo característico de la marca y cero emisiones.'
},
{
  id: 'segway-b110s',
  marca: 'electricos',
  name: 'Segway B110S',
  autonomia: '72 km',
  potencia: '800 W',
  tiempo_carga: '4-5 h',
  tipo: 'Moto Eléctrica',
  precio: '$6.499.000',
  img: segway_b110s,
  peso: '98 kg',
  descripcion: 'Scooter eléctrico urbano de entrada de Segway. Motor de 800W eficiente, 72 km de autonomía y diseño limpio y minimalista. La opción más accesible de la línea Segway para quien quiere dar el paso a la movilidad eléctrica con una marca de tecnología reconocida mundialmente.'
},
/*{
  id: 'starker-avanti-x',
  marca: 'electricos',
  name: 'Starker Avanti X',
  autonomia: '90 km',
  potencia: '2 kW',
  tiempo_carga: '9-10 h',
  tipo: 'Moto Eléctrica',
  precio: '$5.999.000',
  img: starker_avanti_x,
  peso: '92 kg',
  descripcion: 'La moto eléctrica de mayor autonomía de la gama Stärker con 90 km por carga. Motor de 2 kW, diseño urbano elegante y una propuesta orientada al commuter que hace recorridos largos diariamente. La Avanti X demuestra que movilidad sostenible y alcance real no son incompatibles.'
}*/
];