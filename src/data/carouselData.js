import slideuno from '../assets/images/banners-carousel/125_carburada.webp';
import slideunoMobil from '../assets/images/banners-carousel/125_carburada_mobil.webp';
import slidedos from '../assets/images/banners-carousel/sport-110.webp';
import slidedosMobil from '../assets/images/banners-carousel/sport_110_mobil.webp';
import slidetres from '../assets/images/banners-carousel/ns-200.webp';
import slidetresMobil from '../assets/images/banners-carousel/ns_200_mobil.webp';
import slidecuatro from '../assets/images/banners-carousel/apache-160.webp';
import slidecuatroMobil from '../assets/images/banners-carousel/apache_160_mobil.webp';
import slidecinco from '../assets/images/banners-carousel/apache-200.webp';
import slidecincoMobil from '../assets/images/banners-carousel/apache_200_mobil.webp';

// ── Datos de slides del carrusel ───────────────
/* Cada slide declara UNA línea de título, UN subtítulo y el promo que se
   muestra como chip discreto. Nada más: el hero no lleva bloques de
   especificaciones ni contadores, según el sistema visual MotoCenter. */
export const SLIDES = [
  {
    id: 0,
    eyebrow: 'Bajaj',
    title: 'Pulsar N125',
    subtitle: 'Ligera, económica y lista para todos los días.',
    promo: 'Nuevo 2027',
    bgImage: slideuno,
    bgImageMobile: slideunoMobil,
    alt: 'Bajaj Pulsar N125 negra — MotoCenter Bogotá',
  },
  {
    id: 1,
    eyebrow: 'TVS',
    title: 'Sport 110 FI',
    subtitle: 'Potencia pura para dominar la ciudad.',
    promo: 'Trabajo',
    bgImage: slidedos,
    bgImageMobile: slidedosMobil,
    alt: 'TVS Sport 110 FI — MotoCenter Bogotá',
  },
  {
    id: 2,
    eyebrow: 'Bajaj',
    title: 'NS200 FI ABS SC',
    subtitle: 'Sin límites: conquista cada ruta.',
    promo: 'Más vendida',
    bgImage: slidetres,
    bgImageMobile: slidetresMobil,
    alt: 'Bajaj NS200 FI ABS SC — MotoCenter Bogotá',
  },
  {
    id: 3,
    eyebrow: 'TVS',
    title: 'Apache 160',
    subtitle: 'Desafía la carretera.',
    promo: 'Nuevo lanzamiento',
    bgImage: slidecuatro,
    bgImageMobile: slidecuatroMobil,
    alt: 'TVS Apache 160 — MotoCenter Bogotá',
  },
  {
    id: 4,
    eyebrow: 'TVS',
    title: 'Apache 200',
    subtitle: 'Conquista tus sueños.',
    promo: 'Nuevo lanzamiento',
    bgImage: slidecinco,
    bgImageMobile: slidecincoMobil,
    alt: 'TVS Apache 200 — MotoCenter Bogotá',
  },
];

// ── Configuración del carrusel ─────────────────
export const DELAY = 5000; // ms por slide
