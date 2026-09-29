import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import AutecoPage from '../pages/AutecoPage/AutecoPage';
import BajajPage from '../pages/BajajPage/BajajPage';
import FinanciamientoPage from '../pages/Home/FinanciamientoPage';
import TratamientoDatosPage from '../pages/TratamientoDatosPage';
import ScrollToTop from '../components/Home/ScrollToTop';
import NotFound from '../pages/NotFound/NotFound';
import AboutUs from '../pages/aboutUs/aboutUs';
import PqrsPage from '../pages/PQRS/PQRS';

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Secciones del homepage — redirigen a / con su ancla */}
          <Route path="productos"  element={<Navigate to="/#productos"  replace />} />
          <Route path="servicios"  element={<Navigate to="/#servicios"  replace />} />
          <Route path="nosotros"   element={<Navigate to="/#nosotros"   replace />} />
          <Route path="contacto"   element={<Navigate to="/#contacto"   replace />} />

          {/* Páginas propias */}
          <Route path="auteco"               element={<AutecoPage />} />
          <Route path="bajaj"                element={<BajajPage />} />
          <Route path="financiamiento"       element={<FinanciamientoPage />} />
          <Route path="tratamiento-de-datos" element={<TratamientoDatosPage />} />
          <Route path="sobre-nosotros"             element={<AboutUs />} />
          <Route path="pqrs"                 element={<PqrsPage />} />


          {/* 404 — nunca renderiza el homepage para URLs inexistentes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;