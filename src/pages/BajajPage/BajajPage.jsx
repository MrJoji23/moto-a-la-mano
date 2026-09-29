import { Helmet } from "react-helmet-async";
import { useState } from "react";
import BajajHero from "../../components/BajajPage/BajajHero";
import BajajBrandsSection from "../../components/BajajPage/BajajBrandsSection";
import BajajMotosGrid from "../../components/BajajPage/BajajMotosGrid";
import "./BajajPage.css";

const BajajPage = () => {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

  return (
    <main className="bajaj-page">
      <Helmet>
        <title>Motos Bajaj en Bogotá y Soacha | Pulsar, Boxer, Dominar, Discover – MotoCenter Store</title>
        <meta
          name="description"
          content="Concesionario oficial Bajaj en Bogotá y Soacha. Pulsar, Boxer, Dominar y Discover con financiamiento disponible. ¡Visítanos en MotoCenter Store!"
        />
        <link rel="canonical" href="https://motocenter.com/bajaj" />
        <meta
          property="og:title"
          content="Motos Bajaj en Bogotá | Pulsar, Boxer, Dominar, Discover – MotoCenter Store"
        />
        <meta
          property="og:description"
          content="Concesionario oficial Bajaj en Bogotá y Soacha. Pulsar, Boxer, Dominar y Discover con financiamiento disponible."
        />
        <meta property="og:url" content="https://motocenter.com/bajaj" />
        <meta
          property="og:image"
          content="https://motocenter.com/og-image.jpg"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <BajajHero />
      <BajajBrandsSection
        marcaSeleccionada={marcaSeleccionada}
        onMarcaSelect={setMarcaSeleccionada}
      />
      <BajajMotosGrid
        marcaSeleccionada={marcaSeleccionada}
        onMarcaSelect={setMarcaSeleccionada}
      />
    </main>
  );
};

export default BajajPage;