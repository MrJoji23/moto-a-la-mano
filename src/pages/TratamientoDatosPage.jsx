import { Helmet } from "react-helmet-async";
import TratamientoDatos from "../components/TratamientoDatos/TratamientoDatos";

const TratamientoDatosPage = () => {
  return (
    <>
      <Helmet>
        <title>Tratamiento de Datos | Mega Moto</title>
        <meta
          name="description"
          content="Política de tratamiento de datos personales de Mega Moto, conforme a la normativa colombiana de protección de datos."
        />
        <link
          rel="canonical"
          href="https://mega-moto.com/tratamiento-de-datos"
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <TratamientoDatos />
    </>
  );
};

export default TratamientoDatosPage;
