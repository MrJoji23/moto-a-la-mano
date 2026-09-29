import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import HondaCountdownBar from '../components/HondaCountdownBar/HondaCountdownBar';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <HondaCountdownBar />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;