import { Helmet } from 'react-helmet-async';
import { lazy, Suspense, useRef } from 'react';
import { useInView } from 'framer-motion';
import Carousel from '../../components/Carousel/Carousel';
import HeroCopy from '../../components/Home/HeroCopy';
import Brands from '../../components/Brands/Brands';
import MotoMetodo from '../../components/MotoMetodo/MotoMetodo';
import Services from '../../components/Home/Services';
import WhyUs from '../../components/Home/WhyUs';
import './Home.css';

const Map = lazy(() => import('../../components/Map/Map'));

const Home = () => {
  const mapWrapperRef = useRef(null);
  const mapInView = useInView(mapWrapperRef, { once: true, margin: '300px' });

  return (
    <main className="home">
      <Helmet>
        <title>Mega Moto Group | Concesionario Bajaj y Auteco en Bogotá</title>
        <meta
          name="description"
          content="Mega Moto Group: concesionario oficial Bajaj y Auteco en Bogotá y Soacha. Pulsar, Boxer, Dominar, Discover, TVS, Kymco y más al mejor precio. Financiamiento fácil, recibimos tu moto como parte de pago, garantía y servicio técnico. ¡Cotiza hoy!"
        />
        <link rel="canonical" href="https://mega-moto.com/" />
        <meta property="og:title" content="Mega Moto Group | Concesionario Bajaj y Auteco en Bogotá" />
        <meta
          property="og:description"
          content="Concesionario oficial Bajaj y Auteco en Bogotá y Soacha. Financiamiento fácil y servicio técnico. ¡Tu próxima moto te espera!"
        />
        <meta property="og:url" content="https://mega-moto.com/" />
        <meta property="og:image" content="https://mega-moto.com/og-image.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Carousel />
      <HeroCopy />
      <Brands />
      <MotoMetodo />
      <Services />
      <WhyUs />

      <div ref={mapWrapperRef} id="mapa" className="map-slot">
        {mapInView && (
          <Suspense fallback={<div className="map-skeleton" role="status" aria-label="Cargando mapa" />}>
            <Map />
          </Suspense>
        )}
      </div>
    </main>
  );
};

export default Home;