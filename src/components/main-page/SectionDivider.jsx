import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

export default function SectionDivider() {
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="section-divider"
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </LazyMotion>
  );
}