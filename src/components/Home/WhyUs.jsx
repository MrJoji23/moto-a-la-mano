import {LazyMotion, domAnimation, m} from 'framer-motion';
import './WhyUs.css';

const WHY_US = [
  {
    icon: '✦',
    number: '01',
    title: 'Calidad Garantizada',
    desc: 'Todos nuestros productos son de primera calidad, con garantía directa del fabricante.',
  },
  {
    icon: '✦',
    number: '02',
    title: 'Envíos a Todo el País',
    desc: 'Recibe tus productos en la puerta de tu casa. Cobertura nacional con seguimiento en tiempo real.',
  },
  {
    icon: '✦',
    number: '03',
    title: 'Atención Personalizada',
    desc: 'Nuestro equipo de expertos te asesorará en todo lo que necesites, antes y después de tu compra.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

  export default function WhyUs(){
  return(
    <LazyMotion features={domAnimation}>
      <section className="section why-us">
        <m.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          ¿Por Qué <span>Elegirnos?</span>
        </m.h2>

        <div className="why-us__grid">
          {WHY_US.map((item, i) => (
            <m.div
              key={item.title}
              className="why-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="why-card__icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}    
      