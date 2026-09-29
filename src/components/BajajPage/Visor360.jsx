import { useState, useRef, useEffect, useCallback, useReducer } from 'react';
import { LazyMotion,domAnimation, m,AnimatePresence } from 'framer-motion';
import './Visor360.css';

const dragReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { isDragging: true, startX: action.payload };
    case 'MOVE':
      return { ...state, startX: action.payload };
    case 'END':
      return { isDragging: false, startX: 0 };
    default:
      return state;
  }
};

const Visor360 = ({ images, name, autoPlay = false, speed = 150 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drag, dispatchDrag]= useReducer(dragReducer, {isDragging:false, starX:0});
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => autoPlay);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  const totalImages = images.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !drag.isDragging) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
      }, speed);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, drag.isDragging, totalImages, speed]);

  // Hide hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = useCallback((clientX) => {
    dispatchDrag({type: "START", payload: clientX});
    setIsAutoPlaying(false);
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!drag.isDragging) return;
    
    const diff = clientX - drag.startX;
    const threshold = 30;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
      } else {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
      }
      dispatchDrag({type: "MOVE", payload: clientX});
    }
  }, [drag.isDragging, drag.startX, totalImages]);

  const handleDragEnd = useCallback(() => {
    dispatchDrag({type: "END"});
  }, []);

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (drag.isDragging) handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <LazyMotion features={domAnimation}>
    <m.div
      className="visor360"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="visor360__header">
        <div className="visor360__title-group">
          <span className="visor360__icon">↻</span>
          <h3 className="visor360__title">Vista 360°</h3>
        </div>
        <button
          className={`visor360__autoplay-btn ${isAutoPlaying ? 'visor360__autoplay-btn--active' : ''}`}
          onClick={toggleAutoPlay}
          aria-label={isAutoPlaying ? 'Pausar rotación' : 'Iniciar rotación'}
        >
          {isAutoPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      <div
        ref={containerRef}
        role="img"
        aria-label={`Vista 360° de ${name}`}
        className={`visor360__container ${drag.isDragging ? 'visor360__container--dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <m.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${name} - Vista ${currentIndex + 1}`}
            className="visor360__image"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 0.15 }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Hint overlay */}
        <AnimatePresence>
          {showHint && !drag.isDragging && (
            <m.div
              className="visor360__hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="visor360__hint-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                  <path d="M14 8l-4 4 4 4" />
                  <path d="M10 8l4 4-4 4" />
                </svg>
                <span>Arrastra para rotar</span>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          className="visor360__nav visor360__nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            goToImage((currentIndex - 1 + totalImages) % totalImages);
          }}
          aria-label="Imagen anterior"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="visor360__nav visor360__nav--next"
          onClick={(e) => {
            e.stopPropagation();
            goToImage((currentIndex + 1) % totalImages);
          }}
          aria-label="Siguiente imagen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="visor360__progress">
        <div className="visor360__progress-bar">
          <m.div
            className="visor360__progress-fill"
            animate={{ width: `${((currentIndex + 1) / totalImages) * 100}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="visor360__dots">
          {images.map((src, index) => (
            <button
              key={src}
              className={`visor360__dot ${index === currentIndex ? 'visor360__dot--active' : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </m.div>
  </LazyMotion>
  );
};

export default Visor360;
