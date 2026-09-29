import { Helmet } from 'react-helmet-async';
import Financiamiento from '../../components/Financiamiento/Financiamiento';
import './FinanciamientoPage.css';

const FinanciamientoPage = () => {
  return (
    <main className="financiamiento-page">
      <Helmet>
        <title>Financiamiento – MotoCenter</title>
        <meta
          name="description"
          content="Financia tu moto hasta en el 100% con Banco de Bogotá, Vanti, Progreser, Sufi, Crediorbe, Avanza, Pick, Sistecredito y Addi 77. Cuotas flexibles, sin filas y proceso 100% online."
        />
        <link rel="canonical" href="https://motocenter.com/financiamiento" />
        <meta property="og:title" content="Financiamiento – MotoCenter" />
        <meta
          property="og:description"
          content="Financia tu moto con las mejores tasas. Banco de Bogotá, Vanti, Progreser y más."
        />
        <meta property="og:url" content="https://motocenter.com/financiamiento" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Financiamiento />
    </main>
  );
};

export default FinanciamientoPage;