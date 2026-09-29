import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import './AutecoHero.css';
import banner from '../../assets/images/logos-auteco/banner-auteco.webp';
import bannerMobil from '../../assets/images/logos-auteco/auteco_banner_mobi.webp';

const AutecoHero = () => {
  const heroRef = useRef(null);

  return (
    <LazyMotion features={domAnimation}>
      <Helmet>
        
        <link
          rel="preload"
          as="image"
          href={banner}
          media="(min-width: 769px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={bannerMobil}
          media="(max-width: 768px)"
          fetchPriority="high"
        />
      </Helmet>
      
      <div
        className="auteco-hero px-3 px-sm-4 px-md-5 py-5"
        ref={heroRef}
        style={{
          '--auteco-hero-bg-desktop': `url(${banner})`,
          '--auteco-hero-bg-mobile': `url(${bannerMobil})`,
        }}
      >
        <div className="auteco-hero__scroll-indicator" aria-hidden="true">
          <span className="auteco-hero__scroll-label">scroll</span>
          <div className="auteco-hero__chevrons">
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline className="chev chev--1" points="4,4 12,11 20,4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <polyline className="chev chev--2" points="4,13 12,20 20,13" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <polyline className="chev chev--3" points="4,22 12,29 20,22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default AutecoHero;