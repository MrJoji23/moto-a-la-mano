import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SLIDES, DELAY } from '../../data/carouselData';
import './Carousel.css';

/* WhatsApp comercial (§10: CTA siempre visible) */
const WA_URL =
  'https://api.whatsapp.com/send?phone=573054300302&text=Hola%2C%20quiero%20asesor%C3%ADa%20para%20elegir%20mi%20moto.';

/* ── Animaciones (200–300ms, ease-out) ── */
const contentVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

const Chevron = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false"
    style={direction === 'prev' ? { transform: 'rotate(180deg)' } : undefined}
  >
    <path d="m9 5 7 7-7 7" />
  </svg>
);

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const touchStartX = useRef(null);
  const preloadedImages = useRef({});

  const total = SLIDES.length;

  const goTo = useCallback(
    (index) => setCurrent(((index % total) + total) % total),
    [total],
  );

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  /* ── Autoplay: se detiene con hover, focus, reduced-motion ── */
  useEffect(() => {
    if (paused || reduce) return undefined;
    const timeout = setTimeout(next, DELAY);
    return () => clearTimeout(timeout);
  }, [current, paused, reduce, next]);

  /* ── Teclado: solo mientras el carrusel tiene el foco ── */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  /* ── Touch / Swipe ── */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  /* ── Precarga de la imagen siguiente (y no las 8 por adelantado) ── */
  useEffect(() => {
    const nextSlide = SLIDES[(current + 1) % total];
    [nextSlide.bgImage, nextSlide.bgImageMobile].forEach((src) => {
      if (src && !preloadedImages.current[src]) {
        const img = new Image();
        img.src = src;
        preloadedImages.current[src] = img;
      }
    });
  }, [current, total]);

  const slide = SLIDES[current];

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="hero"
        aria-roledescription="carrusel"
        aria-label="Modelos destacados"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onKeyDown={onKeyDown}
      >
        {/* ── Fondo a pantalla ── */}
        <div className="hero__bg" aria-hidden="true">
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className={`hero__bg-layer${i === current ? ' is-active' : ''}`}
              aria-hidden="true"
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={s.bgImageMobile} />
                <img
                  src={s.bgImage}
                  alt=""
                  className="hero__bg-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  /* El LCP es la foto del primer slide: se prioriza. */
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  decoding="async"
                  width="1920"
                  height="1080"
                />
              </picture>
            </div>
          ))}
          <div className="hero__scrim" />
        </div>

        {/* ── Contenido ── */}
        <div className="hero__inner">
          <AnimatePresence mode="wait">
            <m.div
              key={`content-${slide.id}`}
              className="hero__content"
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {slide.promo && (
                <p className="hero__chip">
                  <span className="hero__chip-dot" aria-hidden="true" />
                  {slide.promo}
                </p>
              )}

              <p className="hero__eyebrow">{slide.eyebrow}</p>

              {/* Único H1 de la vista (§9 SEO) */}
              <h1 className="hero__title">{slide.title}</h1>

              <p className="hero__subtitle">{slide.subtitle}</p>

              <div className="hero__actions">
                <Link to="/bajaj" className="btn btn--primary">
                  Ver motos
                </Link>
                <a
                  className="btn btn--ghost"
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablar con un asesor
                </a>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        {/* ── Controles ── */}
        <div className="hero__controls">
          <div className="hero__dots" role="tablist" aria-label="Elegir modelo">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                className={`hero__dot${i === current ? ' is-active' : ''}`}
                aria-selected={i === current}
                aria-label={`Ver ${s.title}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <div className="hero__arrows">
            <button
              type="button"
              className="hero__arrow"
              onClick={prev}
              aria-label="Modelo anterior"
            >
              <Chevron direction="prev" />
            </button>
            <button
              type="button"
              className="hero__arrow"
              onClick={next}
              aria-label="Modelo siguiente"
            >
              <Chevron />
            </button>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Carousel;
