import { useState, useEffect, useRef, useCallback, useInsertionEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { SLIDES, DELAY } from '../../data/carouselData';
import './Carousel.css';

function useEffectEvent(fn) {
  const ref = useRef(fn);
  useInsertionEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => ref.current(...args), []);
}

// ── Animaciones (moto y texto siguen animándose con Framer Motion) ──
const contentVariants = {
  enter: { x: 50, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
  exit: { x: -30, opacity: 0, transition: { duration: 0.4 } },
};

const motoVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 } },
  exit: { x: -50, opacity: 0, transition: { duration: 0.35 } },
};

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const touchStartX = useRef(null);
  const preloadedImages = useRef({});

  // ── Navegar a un slide ──────────────────────
  const goTo = useCallback((index) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
    setProgressKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // ── Autoplay ─────────────────────────────────
  const onTick = useEffectEvent(() => {
    goTo(current + 1);
  });

  useEffect(() => {
    const timeout = setTimeout(onTick, DELAY);
    return () => clearTimeout(timeout);
  }, [current]);

  // ── Teclado ─────────────────────────────────
  const onKeyDown = useEffectEvent((e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // ── Touch / Swipe ────────────────────────────
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  useEffect(() => {
    const nextIndex = (current + 1) % SLIDES.length;
    const nextSlide = SLIDES[nextIndex];

    [nextSlide.motoImage, nextSlide.specsImage].forEach((src) => {
      if (!preloadedImages.current[src]) {
        const img = new Image();
        img.src = src;
        preloadedImages.current[src] = img;
      }
    });
  }, [current]);

  const slide = SLIDES[current];
  const isFirstSlide = current === 0;

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="carousel"
        aria-label="Hero carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        <div className="carousel__bg">
          {SLIDES.map((s, i) => (
            <picture
              key={s.id}
              className={`carousel__bg-layer ${i === current ? 'is-active' : ''}`}
            >
              <source media="(max-width: 768px)" srcSet={s.bgImageMobile} />
              <img
                src={s.bgImage}
                alt=""
                className="carousel__bg-img"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                width="1920"
                height="1080"
              />
            </picture>
          ))}
          <div className="carousel__bg-overlay" />
        </div>

        {/* Contenido */}
        <div className="carousel__inner">
          {/* Moto */}
          <AnimatePresence mode="wait">
            <m.div
              key={`moto-${slide.id}`}
              className="carousel__moto"
              variants={motoVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <img
                src={slide.motoImage}
                alt=""
                loading={isFirstSlide ? 'eager' : 'lazy'}
                fetchPriority={isFirstSlide ? 'high' : 'auto'}
              />
            </m.div>
          </AnimatePresence>

          {/* Texto */}
          <AnimatePresence mode="wait">
            <m.div
              key={`content-${slide.id}`}
              className="carousel__content"
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <span className="c-tag">{slide.tag}</span>
              <p className="c-model">{slide.model}</p>

              <h2 className="c-title">
                {slide.title}
                <span className="c-title__accent">{slide.titleAccent}</span>
                <br />
                <em className="c-title__sub">{slide.titleSub}</em>
              </h2>

              <p className="c-sub">{slide.sub}</p>

              <div className="c-badge">
                <span className="c-badge__num">{slide.badgeNum}</span>
                <div className="c-badge__text">
                  <strong>{slide.badgeLabel}</strong>
                  {slide.badgeDesc}
                </div>
              </div>

              <div className="c-specs-image">
                <img
                  src={slide.specsImage}
                  alt="Especificaciones técnicas"
                  loading={isFirstSlide ? 'eager' : 'lazy'}
                  fetchPriority={isFirstSlide ? 'high' : 'auto'}
                />
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Flechas */}
        <button className="carousel__arrow carousel__arrow--prev" onClick={prev} aria-label="Anterior">
          ❮
        </button>
        <button className="carousel__arrow carousel__arrow--next" onClick={next} aria-label="Siguiente">
          ❯
        </button>

        {/* Dots */}
        <div className="carousel__dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`carousel__dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Contador */}
        <div className="carousel__count" aria-hidden="true">
          <span>{String(current + 1).padStart(2, '0')}</span>
          &nbsp;/&nbsp;
          {String(SLIDES.length).padStart(2, '0')}
        </div>

        {/* Barra de progreso */}
        <div
          key={progressKey}
          className="carousel__progress"
          style={{ '--progress-duration': `${DELAY}ms` }}
        />
      </section>
    </LazyMotion>
  );
};

export default Carousel;