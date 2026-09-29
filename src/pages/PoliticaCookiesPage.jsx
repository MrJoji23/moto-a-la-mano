import { Helmet } from "react-helmet-async";
import PoliticaCookies from "../components/PoliticaCookies/PoliticaCookies";

const PoliticaCookiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Política de Cookies | Mega Moto</title>
        <meta
          name="description"
          content="Política de uso de cookies de Mega Moto: qué son, cuáles utilizamos y cómo puedes gestionarlas."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <PoliticaCookies />
    </>
  );
};

export default PoliticaCookiesPage;
