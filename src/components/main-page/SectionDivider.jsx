import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function SectionDivider() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="section-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 2, ease: [0.22, 0.61, 0.36, 1] }}
      />
    </LazyMotion>
  );
}