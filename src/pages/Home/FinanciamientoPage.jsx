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
          content="Financia tu moto hasta en el 100% con MotoCenter. Paga con Nequi, Nu o Davivienda, en cuotas flexibles y proceso 100% online en Bogotá y Soacha."
        />
        <link rel="canonical" href="https://motocenter.com/financiamiento" />
        <meta property="og:title" content="Financiamiento – MotoCenter" />
        <meta
          property="og:description"
          content="Financia tu moto y paga con Nequi, Nu o Davivienda. Cuotas flexibles y sin filas."
        />
        <meta property="og:url" content="https://motocenter.com/financiamiento" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Financiamiento />
    </main>
  );
};

export default FinanciamientoPage;