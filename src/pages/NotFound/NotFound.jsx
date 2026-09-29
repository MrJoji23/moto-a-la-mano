import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => (
  <main className="not-found" aria-label="Página no encontrada">
    <Helmet>
      <title>Página no encontrada – Mega Moto</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <div className="not-found__glow" aria-hidden="true" />

    <p className="not-found__code">404</p>

    <h1 className="not-found__title">Página no encontrada</h1>

    <p className="not-found__desc">
      La URL que buscas no existe. Puede que haya sido movida o eliminada.
    </p>

    <Link to="/" className="not-found__btn">
      ← Volver al inicio
    </Link>
  </main>
);

export default NotFound;