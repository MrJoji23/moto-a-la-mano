import { Helmet } from "react-helmet-async";
import { useState } from "react";
import AutecoHero from "../../components/AutecoPage/AutecoHero";
import AutecoBrandsSection from "../../components/AutecoPage/AutecoBrandsSection";
import ElectricSection from "../../components/AutecoPage/ElectricSection";
import AutecoMotosGrid from "../../components/AutecoPage/AutecoMotosGrid";
import "./AutecoPage.css";

const AutecoPage = () => {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

  return (
    <main className="auteco-page">
      <Helmet>
        <title>Motos Auteco en Bogotá | TVS, Victory, Kymco, Ceronte, Eléctricos – MotoCenter Mobility</title>
        <meta
          name="description"
          content="Concesionario oficial Auteco en Bogotá. TVS, Victory Motorcycles, Kymco Scooters, Ceronte y motos eléctricas. Financiamiento disponible. ¡Cotiza hoy en MotoCenter Mobility!"
        />
        <link rel="canonical" href="https://motocenter.com/auteco" />
        <meta
          property="og:title"
          content="Motos Auteco en Bogotá | TVS, Victory, Kymco – MotoCenter Mobility"
        />
        <meta
          property="og:description"
          content="Concesionario oficial Auteco en Bogotá. TVS, Victory, Kymco, Ceronte y motos eléctricas con financiamiento disponible."
        />
        <meta property="og:url" content="https://motocenter.com/auteco" />
        <meta
          property="og:image"
          content="https://motocenter.com/og-image.jpg"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <AutecoHero />
      <AutecoBrandsSection
        marcaSeleccionada={marcaSeleccionada}
        onMarcaSelect={setMarcaSeleccionada}
      />
      {marcaSeleccionada === "electricos" && <ElectricSection />}
      {marcaSeleccionada !== "electricos" && (
        <AutecoMotosGrid marcaSeleccionada={marcaSeleccionada} />
      )}
    </main>
  );
};

export default AutecoPage;