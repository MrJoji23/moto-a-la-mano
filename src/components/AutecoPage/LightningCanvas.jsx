import { useRef, useEffect } from 'react';
import { tokenColor, tokenRgb } from '../../utils/cssTokens';
import './LightningCanvas.css';

const isMobile = () => window.innerWidth < 768;

const debounce = (fn, ms) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

const LightningCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', {alpha: true});
    let mobile = isMobile();
    const CIAN = tokenColor('--mm-accent-2', '#00e5ff');
    const CIAN_RGB = tokenRgb('--mm-accent-2', '#00e5ff');

    const doResize = () => {
      mobile= isMobile();
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    doResize();
    const onResize = debounce(doResize, 150);
    window.addEventListener('resize', onResize, {passive: true});

    const bolt = (x1, y1, x2, y2, depth, alpha) => {
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${CIAN_RGB},${alpha})`;
        ctx.lineWidth   = alpha * 1.5;
        if(!mobile){
          ctx.shadowColor = CIAN;
          ctx.shadowBlur  = 8;
        }
        ctx.stroke();
        ctx.shadowBlur= 0;
        return;
      }
      const spread = mobile ? 40 : 60;
      const mx = (x1 + x2) / 2 + (Math.random() - .5) * spread * (depth / 4);
      const my = (y1 + y2) / 2 + (Math.random() - .5) * spread * (depth / 4);
      bolt(x1, y1, mx, my, depth - 1, alpha);
      bolt(mx, my, x2, y2, depth - 1, alpha);
      if (Math.random() > .55 && depth > 1) {
        const bx = mx + (Math.random() - .5) * (mobile ? 60 : 120);
        const by = my + Math.random() * 80;
        bolt(mx, my, bx, by, depth - 2, alpha * .45);
      }
    };

    let frame;
    let tick = 0;
    let visible= true;

    const MOBILE_SKIP=3;

    const draw = () => {
      frame = requestAnimationFrame(draw);

      if(!visible) return;
      if(mobile && tick % MOBILE_SKIP !==0){
        tick++; return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      const effectiveTick = mobile ? Math.floor(tick / MOBILE_SKIP) : tick;
      if (effectiveTick % 18 === 0) {
        ctx.save();
        const startX = Math.random() * canvas.width;
        const endX   = startX + (Math.random() - .5) * (mobile ? 180 : 300);
        const maxDepth = mobile ? 3 : 4;
        bolt(startX, 0, endX, canvas.height, maxDepth, .7 + Math.random() * .3);
        ctx.restore();
      }
      const phase = effectiveTick % 18;
      if (phase < 3) {
        ctx.fillStyle = `rgba(${CIAN_RGB},${.03 - phase * .01})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="lightning-canvas" />;
};

export default LightningCanvas;
