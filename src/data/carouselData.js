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
import specsN125 from '../assets/images/banners-carousel/carburada-n125-specs.webp';
import specsNS200 from '../assets/images/banners-carousel/ns-200-specs.webp';
import specsSport110 from '../assets/images/banners-carousel/sport-110-specs.webp';
import specsApache160 from '../assets/images/banners-carousel/apache-160-specs.webp';
import specsApache200 from '../assets/images/banners-carousel/apache-200-specs.webp';

// ── Datos de slides del carrusel ───────────────
export const SLIDES = [
  {
    id: 0,
    tag: 'NUEVO LANZAMIENTO',
    model: 'Pulsar',
    title: 'N',
    titleAccent: '125',
    titleSub: 'CARBURADA',
    sub: 'SIENTE LA EMOCIÓN',
    badgeNum: '124',
    badgeLabel: 'cc',
    badgeDesc: 'MODELO 2027',
    bgImage: slideuno,
    bgImageMobile:slideunoMobil,
    specsImage: specsN125,
    
  },
  {
    id: 1,
    tag: 'NUEVA 2027',
    model: 'TVS',
    title: '',
    titleAccent: 'SPORT',
    titleSub: '110 FI',
    sub: 'Potencia pura — domina la ciudad',
    badgeNum: '109',
    badgeLabel: 'cc',
    badgeDesc: 'TRABAJO',
    bgImage: slidedos,
    bgImageMobile:slidedosMobil,
    specsImage: specsSport110,
  },
  {
    id: 2,
    tag: 'La mas vendida',
    model: 'PULSAR',
    title: 'NS',
    titleAccent: '200',
    titleSub: 'FI ABS SC',
    sub: 'Sin límites — conquista cada ruta',
    badgeNum: '24',
    badgeLabel: 'HP',
    badgeDesc: 'para rutas extremas',
    bgImage: slidetres,
    bgImageMobile:slidetresMobil,
    specsImage: specsNS200,
  },
  {
    id: 3,
    tag: 'NUEVO LANZAMIENTO',
    model: 'TVS',
    title: '',
    titleAccent: 'APACHE 160',
    titleSub: 'CARBURADA ABS',
    sub: '',
    badgeNum: '159',
    badgeLabel: 'cc',
    badgeDesc: 'DESAFIA LA CARRETERA',
    bgImage: slidecuatro,
    bgImageMobile:slidecuatroMobil,
    specsImage: specsApache160,
  },{
    id: 4,
    tag: 'NUEVO LANZAMIENTO',
    model: 'TVS',
    title: '',
    titleAccent: 'APACHE 200',
    titleSub: 'CARBURADA ABS',
    sub: 'Conquista tus sueños',
    badgeNum: '197',
    badgeLabel: 'CC',
    badgeDesc: 'Para desafios extremos',
    bgImage: slidecinco,
    bgImageMobile:slidecincoMobil,
    specsImage: specsApache200,
  },
];

// ── Configuración del carrusel ─────────────────
export const DELAY = 5000; // ms por slide
