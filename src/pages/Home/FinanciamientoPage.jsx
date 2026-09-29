import { Helmet } from "react-helmet-async";
import Financiamiento from "../../components/Financiamiento/Financiamiento";

export default function FinanciamientoPage() {
  return (
    <main>
      <Helmet>
        <title>Financiamiento de Motos | Mega Moto</title>
        <meta
          name="description"
          content="Financia tu moto en Mega Moto con cuotas accesibles. Bajaj, Auteco y más marcas. Aprobación rápida y sin complicaciones."
        />
        <link rel="canonical" href="https://mega-moto.com/financiamiento" />
        <meta
          property="og:title"
          content="Financiamiento de Motos | Mega Moto"
        />
        <meta
          property="og:description"
          content="Financia tu moto en Mega Moto con cuotas accesibles. Bajaj, Auteco y más marcas. Aprobación rápida y sin complicaciones."
        />
        <meta
          property="og:url"
          content="https://mega-moto.com/financiamiento"
        />
        <meta
          property="og:image"
          content="https://mega-moto.com/og-image.jpg"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Financiamiento />
    </main>
  );
}
