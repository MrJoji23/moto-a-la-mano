// ── Datos de marcas principales ─────────────────
import bajajLogo from '../assets/images/bajaj.jpg';
import autecoLogo from '../assets/images/auteco.jpg';

export const BRANDS = [
  {
    id: 'bajaj',
    name: 'Bajaj',
    logo: bajajLogo,
    tagline: 'La marca #1 en Colombia',
    description: 'Compañia India, mayor fabricante de motocicletas y motocarros del mundo',
    color: '#FF9F1C',
    bgGlow: 'rgba(255, 159, 28, 0.15)',
    models: ['BOXER', 'PULSAR', 'DOMINAR', 'DISCOVER'],
    stat: { num: '20', label: 'modelos' },
  },
  {
    id: 'auteco',
    name: 'Auteco',
    logo: autecoLogo,
    tagline: 'La marca #1 en Colombia',
    description: 'Tecnología India con el mejor precio del mercado. Motos urbanas, deportivas y de trabajo.',
    color: '#2E3339',
    bgGlow: 'rgba(46, 51, 57, 0.2)',
    models: ['TVS', 'VICTORY', 'KYMCO', 'CEROTE', 'ELECTRICOS'],
    stat: { num: '+40', label: 'modelos' },
  },
];
