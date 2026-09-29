import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import AutecoPage from '../pages/AutecoPage/AutecoPage';
import BajajPage from '../pages/BajajPage/BajajPage';
import FinanciamientoPage from '../pages/Home/FinanciamientoPage';
import TratamientoDatosPage from '../pages/TratamientoDatosPage';
import PoliticaCookiesPage from '../pages/PoliticaCookiesPage';
import NotFound from '../pages/NotFound/NotFound';
import AboutUs from '../pages/aboutUs/aboutUs';
import PqrsPage from '../pages/PQRS/PQRS';
import ScrollToTop from '../components/Home/ScrollToTop';

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="bajaj" element={<BajajPage />} />
          <Route path="auteco" element={<AutecoPage />} />
          <Route path="financiamiento" element={<FinanciamientoPage />} />
          <Route path="tratamiento-de-datos" element={<TratamientoDatosPage />} />
          <Route path="politica-de-cookies" element={<PoliticaCookiesPage />} />
          <Route path="sobre-nosotros" element={<AboutUs />} />
          <Route path="pqrs" element={<PqrsPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;