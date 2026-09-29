import React from "react";
import {FaHandshake, FaUserFriends, FaUsers, FaFlagCheckered, FaLightbulb} from "react-icons/fa";
import styles from "./aboutUs.module.css";
import bannerImage from "../../assets/images/aboutUsbanner.webp";

// Textos del banner — edítalos directo aquí
const BANNER_TITLE = "MotoCenter";
const BANNER_SUBTITLE = "Conócenos"; // opcional, deja vacío si no quieres subtítulo

function AboutUsBanner() {
  return (
    <header
      className={styles.banner}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className={styles.bannerOverlay} />
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>{BANNER_TITLE}</h1>
        {BANNER_SUBTITLE && (
          <p className={styles.bannerSubtitle}>{BANNER_SUBTITLE}</p>
        )}
      </div>
    </header>
  );
}

const VALORES = [
  {
    icon: FaHandshake,
    titulo: "Integridad",
    descripcion:
      "Actuamos con honestidad, ética, transparencia y responsabilidad en cada una de nuestras decisiones y acciones. Cumplimos nuestros compromisos, respetamos la normatividad vigente y promovemos relaciones basadas en la confianza con clientes, colaboradores, proveedores y demás grupos de interés.",
    aplicacion: [
      "Cumpliendo lo que prometemos.",
      "Actuando con transparencia en todas las negociaciones.",
      "Respetando las políticas y procedimientos de la empresa.",
      "Cuidando los recursos y la información de la organización.",
      "Asumiendo la responsabilidad por nuestras acciones.",
    ],
  },
  {
    icon: FaUserFriends,
    titulo: "Orientación al Cliente",
    descripcion:
      "Ponemos al cliente en el centro de nuestras decisiones, comprendiendo sus necesidades para ofrecer productos, servicios y soluciones de movilidad que superen sus expectativas, generando experiencias positivas y relaciones duraderas.",
    aplicacion: [
      "Brindando una atención amable, respetuosa y oportuna.",
      "Escuchando activamente las necesidades del cliente.",
      "Ofreciendo asesoría clara y soluciones oportunas.",
      "Cumpliendo los tiempos y compromisos adquiridos.",
      "Atendiendo las inquietudes y oportunidades de mejora con actitud de servicio.",
    ],
  },
  {
    icon: FaUsers,
    titulo: "Trabajo en Equipo",
    descripcion:
      "Fomentamos la colaboración, el respeto y la comunicación efectiva entre todas las áreas de la organización, convencidos de que el trabajo conjunto fortalece nuestros resultados y contribuye al crecimiento de la empresa.",
    aplicacion: [
      "Compartiendo conocimientos y experiencias.",
      "Apoyando a nuestros compañeros cuando lo requieren.",
      "Comunicándonos de manera abierta y respetuosa.",
      "Trabajando con objetivos comunes.",
      "Valorando las ideas y aportes de cada integrante del equipo.",
    ],
  },
  {
    icon: FaFlagCheckered,
    titulo: "Compromiso",
    descripcion:
      "Asumimos con responsabilidad nuestras funciones, orientando nuestros esfuerzos hacia el cumplimiento de los objetivos organizacionales, la satisfacción del cliente y la mejora continua de nuestros procesos.",
    aplicacion: [
      "Cumpliendo oportunamente nuestras responsabilidades.",
      "Manteniendo una actitud proactiva frente a los retos.",
      "Buscando soluciones antes que excusas.",
      "Cuidando la calidad de nuestro trabajo.",
      "Representando con orgullo y responsabilidad a MotoCenter.",
    ],
  },
  {
    icon: FaLightbulb,
    titulo: "Innovación",
    descripcion:
      "Promovemos una cultura de aprendizaje, creatividad y mejora continua que nos permita fortalecer nuestros procesos, optimizar nuestros servicios e incorporar nuevas ideas que generen valor para nuestros clientes y para la organización.",
    aplicacion: [
      "Proponiendo nuevas ideas para mejorar los procesos.",
      "Aprovechando la tecnología para aumentar la eficiencia.",
      "Aprendiendo constantemente y compartiendo conocimientos.",
      "Adaptándonos a los cambios del mercado y de nuestros clientes.",
      "Buscando formas de ofrecer un mejor servicio y una mejor experiencia.",
    ],
  },
];

const POLITICAS = [
  {
    codigo: "SST LN 001 V.2",
    titulo: "Política de Seguridad y Salud en el Trabajo",
    fechaRevision: "15/04/2026",
    parrafos: [
      "MOTOCENTER STORE es una organización dedicada a la comercialización de motocicletas, repuestos, accesorios y prestación de servicios asociados al sector automotriz, comprometida con la protección de la seguridad, salud y bienestar físico, mental y social de sus trabajadores, contratistas, proveedores, clientes y demás partes interesadas. La organización desarrolla sus actividades bajo condiciones de trabajo seguras y controladas, orientadas a la prevención de accidentes de trabajo, enfermedades laborales y daños a la propiedad, mediante la identificación de peligros, evaluación y valoración de riesgos, así como la implementación de medidas de intervención y control que permitan eliminar o minimizar los riesgos presentes en cada uno de sus procesos.",
      "Para ello, MOTOCENTER STORE diseña, implementa, mantiene y mejora continuamente el Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST), destinando los recursos humanos, físicos, tecnológicos y financieros necesarios para garantizar su eficacia y el cumplimiento de los requisitos legales aplicables y demás compromisos asumidos por la organización en materia de Seguridad y Salud en el Trabajo.",
      "La organización promueve una cultura basada en el autocuidado, la prevención y la participación activa de los trabajadores, fortaleciendo ambientes de trabajo seguros, saludables y orientados al mejoramiento continuo de las condiciones laborales y la calidad de vida de todos sus colaboradores. Todos los trabajadores, contratistas y partes interesadas tienen la responsabilidad de cumplir las normas, procedimientos y lineamientos establecidos por la organización en materia de Seguridad y Salud en el Trabajo, participando activamente en las actividades de promoción, prevención y control definidas dentro del SG-SST.",
      "Para el cumplimiento de esta política, la organización establece los siguientes objetivos:",
    ],
    lista: [
      "Identificar, evaluar y controlar de manera oportuna los peligros y riesgos asociados a las actividades desarrolladas por la organización.",
      "Proteger la seguridad y salud de los trabajadores y demás partes interesadas mediante la mejora continua del Sistema de Gestión de Seguridad y Salud en el Trabajo.",
      "Promover la calidad de vida laboral mediante la prevención de incidentes, accidentes de trabajo, enfermedades laborales y daños a la propiedad.",
      "Garantizar el cumplimiento de los requisitos legales y otros requisitos aplicables en materia de Seguridad y Salud en el Trabajo.",
      "Disponer de los recursos necesarios para el diseño, implementación, ejecución, seguimiento, evaluación y mejora continua del SG-SST.",
    ],
    cierre:
      "Esta política será comunicada, divulgada y revisada periódicamente, garantizando su pertinencia y alineación con los objetivos estratégicos y operacionales de la organización.",
  },
  {
    codigo: "SST LN 002 V.2",
    titulo: "Política de Prevención del Acoso Laboral y Sexual",
    fechaRevision: "15/04/2026",
    parrafos: [
      "MOTOCENTER STORE S.A.S. manifiesta su firme compromiso con la promoción y protección de la dignidad humana, el respeto por los derechos fundamentales, la igualdad de oportunidades, la equidad, la inclusión y la construcción de ambientes de trabajo seguros, saludables y libres de cualquier forma de acoso, violencia, discriminación o conducta que afecte la integridad física, psicológica, moral o emocional de las personas. La organización adopta una política de cero tolerancia frente al acoso laboral, el acoso sexual en el contexto laboral, la violencia física, psicológica, verbal, sexual, económica o simbólica, las conductas de hostigamiento, intimidación, persecución, humillación, maltrato, represalias y cualquier acto de discriminación basado, entre otros, en el sexo, género, identidad o expresión de género, orientación sexual, edad, origen étnico o racial, nacionalidad, discapacidad, condición de salud, estado civil, embarazo, condición socioeconómica, religión, ideología, opinión política, afiliación sindical o cualquier otra condición protegida por la legislación colombiana.",
      "Esta política aplica a todos los trabajadores, directivos, socios, aprendices, practicantes, contratistas, subcontratistas, proveedores, visitantes y demás partes interesadas que interactúen con la organización, independientemente del tipo de vínculo contractual o del lugar donde se desarrollen las actividades laborales, incluyendo modalidades presenciales, remotas, virtuales, en misión o durante actividades sociales, académicas o institucionales relacionadas con la empresa.",
      "Con el propósito de prevenir la ocurrencia de estas conductas, la organización implementará acciones permanentes orientadas a promover una cultura organizacional basada en el respeto, la ética, la equidad, la diversidad, la inclusión y la sana convivencia:",
    ],
    lista: [
      "Identificar, evaluar y controlar los factores de riesgo psicosocial relacionados con la violencia y el acoso en el trabajo dentro del Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST).",
      "Desarrollar programas de capacitación, sensibilización y formación dirigidos a todos los niveles de la organización sobre prevención del acoso laboral, acoso sexual, violencia, discriminación, respeto por los derechos humanos, comunicación asertiva, resolución de conflictos y convivencia laboral.",
      "Divulgar de manera permanente los derechos, deberes, canales de comunicación, mecanismos de denuncia y rutas internas y externas de atención.",
      "Promover el liderazgo respetuoso y la gestión preventiva de los conflictos laborales, garantizando mecanismos seguros, accesibles y confidenciales para la recepción de quejas, denuncias o reportes.",
    ],
    parrafosFinal: [
      "MOTOCENTER STORE S.A.S. prohíbe cualquier forma de represalia, intimidación, amenaza o revictimización contra las personas que, de buena fe, presenten una queja, participen como testigos o colaboren en los procesos de investigación o intervención, garantizando la protección de sus derechos durante todo el procedimiento. Como parte de su estrategia preventiva, la organización mantendrá conformado y en funcionamiento el Comité de Convivencia Laboral, el cual desarrollará las funciones preventivas y conciliatorias establecidas por la normatividad vigente.",
      "Toda conducta que constituya acoso laboral, acoso sexual, violencia o discriminación será atendida mediante los procedimientos internos establecidos por la organización y podrá dar lugar a la adopción de medidas preventivas, correctivas, disciplinarias, administrativas o legales, conforme a la legislación vigente y al Reglamento Interno de Trabajo.",
      "La Alta Dirección asignará los recursos humanos, técnicos, físicos y financieros necesarios para la implementación, mantenimiento, seguimiento y mejora continua de esta política, integrándola al Sistema de Gestión de Seguridad y Salud en el Trabajo, promoviendo la participación activa de los trabajadores.",
    ],
    cierre:
      "Todos los trabajadores y demás partes interesadas son responsables de contribuir al mantenimiento de un ambiente laboral basado en el respeto, la dignidad humana, la igualdad, la inclusión, la comunicación respetuosa y la convivencia pacífica, actuando con integridad y reportando oportunamente cualquier conducta que pueda vulnerar los principios establecidos en esta política.",
  },
  {
    codigo: "SST LN 003 V.2",
    titulo: "Política de Prevención del Consumo de Alcohol, Drogas y Tabaco",
    fechaRevision: "15/04/2026",
    parrafos: [
      "MOTOCENTER STORE S.A.S. reconoce la importancia de promover ambientes de trabajo seguros, saludables y productivos, orientados a la protección de la salud, seguridad y bienestar de todos los trabajadores, contratistas, aprendices y demás partes interesadas. La organización es consciente de que el consumo de alcohol, tabaco, sustancias psicoactivas, drogas, fármacos no prescritos o cualquier otra sustancia que genere alteraciones en las capacidades físicas, mentales o cognitivas puede afectar el desempeño laboral, incrementar la probabilidad de incidentes y accidentes de trabajo, deteriorar el ambiente laboral y comprometer la seguridad, eficiencia y productividad de las operaciones.",
      "Por lo anterior, MOTOCENTER STORE S.A.S. establece los siguientes lineamientos: se prohíbe el consumo, posesión, distribución o comercialización de alcohol, sustancias psicoactivas, drogas ilícitas o cualquier sustancia que genere dependencia dentro de las instalaciones de la organización o durante el desarrollo de actividades laborales.",
      "Se prohíbe el ingreso o permanencia de trabajadores, contratistas o visitantes bajo efectos de alcohol, sustancias psicoactivas o cualquier sustancia que altere sus condiciones físicas o mentales y pueda poner en riesgo la seguridad propia o de terceros. La organización promoverá actividades de prevención, sensibilización y capacitación orientadas a fortalecer hábitos de vida saludable.",
      "Se fomentará la participación voluntaria de los trabajadores en programas de orientación, apoyo, rehabilitación o tratamiento cuando se identifiquen situaciones asociadas al consumo de estas sustancias.",
      "Los trabajadores que se encuentren bajo tratamiento médico con medicamentos que puedan afectar el desempeño seguro de sus funciones deberán informar oportunamente a su jefe inmediato y/o al área de Seguridad y Salud en el Trabajo, con el fin de evaluar y establecer las medidas preventivas necesarias.",
      "La organización podrá realizar pruebas preventivas, de control o verificación conforme a la normatividad vigente, respetando la dignidad, confidencialidad y derechos de los trabajadores.",
    ],
    cierre:
      "El incumplimiento de esta política podrá dar lugar a la aplicación de medidas disciplinarias establecidas en el Reglamento Interno de Trabajo y demás disposiciones legales aplicables. La alta dirección se compromete a divulgar, implementar y mantener esta política como parte integral del SG-SST, promoviendo una cultura de autocuidado, prevención y responsabilidad individual y colectiva.",
  },
  {
    codigo: "SST LN 004 V.2",
    titulo: "Política de Seguridad Vial",
    fechaRevision: "15/04/2026",
    parrafos: [
      "MOTOCENTER STORE S.A.S., comprometida con la protección de la vida, la integridad y la salud de sus trabajadores, contratistas, proveedores, visitantes y demás actores viales, establece la presente Política de Seguridad Vial como parte integral del Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST), con el propósito de prevenir los accidentes de tránsito, promover una cultura de movilidad segura y fortalecer el comportamiento responsable de todos los usuarios de la vía.",
      "La organización se compromete a identificar, evaluar y controlar los riesgos asociados a los desplazamientos laborales e in itinere, promoviendo el cumplimiento de la legislación vigente y la mejora continua de su desempeño en seguridad vial.",
      "Para el cumplimiento de esta política, MOTOCENTER STORE S.A.S. se compromete a cumplir y hacer cumplir la legislación nacional vigente en materia de tránsito, transporte y seguridad vial, entre otras acciones:",
    ],
    lista: [
      "Promover comportamientos seguros y responsables en todos los actores viales: conductores, motociclistas, ciclistas y peatones.",
      "Garantizar que los conductores cuenten con la licencia de conducción vigente, la competencia requerida y las condiciones físicas y mentales necesarias.",
      "Mantener los vehículos utilizados para fines laborales en adecuadas condiciones de funcionamiento, con mantenimiento preventivo, correctivo e inspecciones preoperacionales.",
      "Promover el uso permanente y adecuado de todos los elementos de protección personal y dispositivos de seguridad exigidos por la legislación.",
      "Exigir el cumplimiento de los límites de velocidad establecidos por las autoridades competentes.",
      "Prohibir el uso de teléfonos móviles o dispositivos electrónicos que generen distracción durante la conducción.",
      "Gestionar adecuadamente la fatiga, estableciendo pausas activas cuando la conducción continua supere cuatro (4) horas.",
      "Mantener una política de cero tolerancia frente a la conducción bajo los efectos del alcohol, sustancias psicoactivas o medicamentos que alteren la capacidad para conducir.",
      "Desarrollar programas permanentes de capacitación en seguridad vial, conducción preventiva y eficiente, y atención inicial de emergencias.",
      "Investigar los accidentes e incidentes viales laborales para identificar causas y prevenir su recurrencia.",
    ],
    cierre:
      "Todos los trabajadores, contratistas y demás personas que conduzcan vehículos o se desplacen en desarrollo de actividades relacionadas con la organización son responsables de cumplir esta política. La Alta Dirección revisará periódicamente su cumplimiento, con el propósito de fortalecer una cultura organizacional basada en la prevención, el autocuidado y el respeto por la vida.",
  },
  {
    codigo: "SST LN 005 V.2",
    titulo: "Política de Desconexión Laboral",
    fechaRevision: "15/04/2026",
    parrafos: [
      "MOTOCENTER STORE S.A.S., comprometida con la protección de la salud, el bienestar físico, mental y social de sus trabajadores, reconoce el derecho a la desconexión laboral como un elemento fundamental para favorecer el equilibrio entre la vida laboral, personal y familiar, prevenir los factores de riesgo psicosocial y promover ambientes de trabajo saludables, productivos y respetuosos.",
      "En cumplimiento de la legislación colombiana vigente y como parte integral del SG-SST, la organización garantiza el respeto por los tiempos de descanso, vacaciones, licencias, incapacidades, permisos y demás periodos de no disponibilidad laboral, promoviendo una cultura organizacional basada en la confianza, el respeto, la planeación adecuada del trabajo y el uso responsable de las tecnologías. Esta política aplica a todos los trabajadores de MOTOCENTER STORE S.A.S., cualquiera sea su modalidad de trabajo, nivel jerárquico, jornada laboral o tipo de vinculación, así como a los directivos y líderes que ejerzan funciones de supervisión.",
      "La organización reconoce que la desconexión laboral consiste en el derecho que tiene todo trabajador a no recibir, atender ni responder llamadas telefónicas, mensajes, correos electrónicos, comunicaciones por aplicaciones de mensajería instantánea, plataformas digitales u otros requerimientos relacionados con el trabajo fuera de su jornada laboral o durante sus periodos de descanso legalmente establecidos, salvo las excepciones previstas por la legislación aplicable. Ningún trabajador será objeto de presión, discriminación, sanción, evaluación desfavorable, represalia o cualquier otro trato adverso por ejercer este derecho. Para garantizar la efectividad de esta política, MOTOCENTER STORE S.A.S. se compromete a:",
    ],
    lista: [
      "Promover el respeto por los horarios de trabajo, descanso y recuperación de los trabajadores.",
      "Planificar adecuadamente las actividades para evitar requerimientos innecesarios fuera de la jornada laboral.",
      "Fomentar el uso responsable de los medios tecnológicos y de comunicación corporativos.",
      "Sensibilizar y capacitar periódicamente a trabajadores y líderes sobre el derecho a la desconexión laboral, la prevención del riesgo psicosocial y el bienestar laboral.",
      "Identificar, evaluar y gestionar los factores de riesgo psicosocial relacionados con la sobrecarga laboral, la hiperconectividad y el exceso de jornada.",
      "Garantizar que los líderes y jefes inmediatos ejerzan un liderazgo respetuoso de los tiempos de descanso de sus equipos de trabajo.",
      "Divulgar los mecanismos internos para la presentación de inquietudes, reportes o quejas relacionadas con el incumplimiento de esta política.",
    ],
    parrafosFinal: [
      "Las únicas excepciones para establecer comunicaciones fuera de la jornada laboral corresponderán a situaciones de fuerza mayor, caso fortuito, emergencias, eventos que representen un riesgo para la seguridad y salud de las personas, la continuidad del negocio o aquellas circunstancias expresamente permitidas por la legislación vigente.",
      "Los trabajadores que consideren vulnerado su derecho a la desconexión laboral podrán presentar su situación de manera confidencial a través de los canales internos establecidos por la organización, tales como Gestión Humana, Seguridad y Salud en el Trabajo o el Comité de Convivencia Laboral, garantizando el respeto por la confidencialidad, el debido proceso y la prohibición de cualquier forma de represalia.",
    ],
    cierre:
      "La Alta Dirección asignará los recursos necesarios para la implementación, divulgación, seguimiento y mejora continua de esta política, verificando periódicamente su cumplimiento e integrándola a las estrategias de promoción de la salud mental, prevención del riesgo psicosocial y fortalecimiento de la cultura organizacional.",
  },
  {
    codigo: "SST LN 006 V.2",
    titulo: "Reglamento de Higiene y Seguridad Industrial",
    fechaRevision: "01/04/2026",
    parrafos: [
      "Razón social: MotoCenter Store. NIT: 901868822-1. Actividad económica: distribución y comercialización de motocicletas, repuestos y accesorios, así como prestación de servicios técnicos y mantenimiento. Domicilio principal: Bogotá D.C., Colombia.",
      "La empresa MOTOCENTER STORE S.A.S, en cumplimiento de lo establecido en la legislación colombiana vigente en materia de Seguridad y Salud en el Trabajo, especialmente lo dispuesto en el Código Sustantivo del Trabajo, la Ley 9 de 1979, Resolución 2400 de 1979, Decreto 1072 de 2015 y demás normas concordantes, adopta el presente Reglamento de Higiene y Seguridad Industrial, el cual tiene como finalidad establecer las normas y lineamientos orientados a la prevención de accidentes de trabajo, enfermedades laborales y la protección integral de la salud y seguridad de los trabajadores.",
      "Artículo 1. Objetivo: garantizar condiciones de trabajo seguras y saludables para todos los trabajadores, contratistas, aprendices y demás partes interesadas que desarrollen actividades dentro de las instalaciones o en representación de la organización, mediante la implementación de medidas de prevención, control y mejora continua en Seguridad y Salud en el Trabajo.",
      "Artículo 2. Compromiso de la organización: implementar y mantener el SG-SST; identificar los peligros, evaluar y valorar los riesgos; implementar medidas de prevención y control; cumplir con la normatividad legal vigente; promover ambientes de trabajo seguros, saludables y libres de condiciones inseguras; disponer de los recursos necesarios para el funcionamiento del SG-SST.",
      "Artículo 3. Responsabilidades de los trabajadores: cumplir las normas y procedimientos establecidos en el presente reglamento; utilizar adecuadamente los elementos de protección personal suministrados; informar oportunamente condiciones inseguras, incidentes, accidentes y actos inseguros; participar en capacitaciones, simulacros y actividades de promoción y prevención; velar por el autocuidado y la seguridad propia y de sus compañeros.",
      "Artículo 4. Factores de riesgo: entre otros, riesgos mecánicos por manipulación de herramientas, equipos y motocicletas; riesgos locativos asociados a almacenamiento, tránsito y áreas operativas; riesgos biomecánicos por manipulación manual de cargas y posturas prolongadas; riesgos químicos derivados del uso de lubricantes, combustibles, pinturas y solventes; riesgos físicos por exposición a ruido, iluminación y vibraciones; riesgos eléctricos; riesgos de tránsito asociados a desplazamientos laborales y pruebas de motocicletas; riesgos psicosociales derivados de la carga laboral y atención al público.",
      "Artículo 5. Elementos de protección personal: la empresa suministrará los elementos de protección personal requeridos de acuerdo con la actividad desarrollada, y los trabajadores estarán obligados a utilizarlos correctamente, mantenerlos en buen estado y reportar cualquier deterioro o necesidad de reposición.",
      "Artículo 6. Prevención y control: mantener instalaciones seguras y ordenadas; realizar inspecciones periódicas de seguridad; garantizar el mantenimiento preventivo y correctivo de herramientas, equipos y vehículos; ejecutar programas de vigilancia epidemiológica y promoción de la salud; gestionar adecuadamente sustancias químicas y residuos generados; fortalecer la preparación y respuesta ante emergencias.",
      "Artículo 7. Reporte de incidentes y accidentes: todo incidente, accidente de trabajo o condición insegura deberá ser reportado inmediatamente al jefe inmediato o al área de Seguridad y Salud en el Trabajo, con el fin de realizar la respectiva investigación y establecer acciones preventivas y correctivas.",
      "Artículo 8. Prohibiciones: se prohíbe a los trabajadores ingresar o permanecer en estado de embriaguez o bajo efectos de sustancias psicoactivas; manipular equipos o herramientas sin autorización o capacitación; retirar o modificar dispositivos de seguridad; realizar actos inseguros que pongan en riesgo su integridad o la de terceros; incumplir las normas de seguridad vial y de tránsito durante actividades laborales.",
      "Artículo 9. Comités y participación: la empresa garantizará la conformación y funcionamiento de los mecanismos de participación establecidos por la normatividad vigente, incluyendo el COPASST y el Comité de Convivencia Laboral.",
      "Artículo 10. Vigencia: el presente Reglamento entra en vigencia a partir de su publicación y divulgación, y permanecerá vigente mientras la organización desarrolle sus actividades económicas o hasta que sea actualizado conforme a cambios normativos, operacionales o administrativos.",
    ],
  },
];

export default function AboutUs() {
  return (
    <main className={styles.aboutUs}>
      <AboutUsBanner />

      <div className={styles.container}>
        <p className={styles.metaLine}>MOTOCENTER · Actualizado abril 2026</p>

        {/* Misión y Visión */}
        <div className={styles.misionVisionGrid}>
          <article className={styles.mvCard}>
            <span className={styles.mvEyebrow}>Misión</span>
            <p className={styles.mvText}>
              En MotoCenter nos dedicamos a la comercialización de
              motocicletas, repuestos y accesorios originales de las marcas
              Bajaj y Auteco, así como a la prestación de servicios técnicos
              especializados, ofreciendo soluciones integrales de movilidad
              que contribuyen a satisfacer las necesidades y expectativas de
              nuestros clientes. Trabajamos con un equipo humano altamente
              comprometido y competente, actuando con integridad, orientación
              al cliente, trabajo en equipo, compromiso e innovación, para
              brindar productos y servicios de alta calidad que generen
              confianza, seguridad y una experiencia diferenciadora. A través
              de la mejora continua de nuestros procesos, el fortalecimiento
              de nuestras relaciones con clientes, proveedores y aliados
              estratégicos, y una gestión responsable y sostenible, buscamos
              crear valor para nuestros grupos de interés, contribuir al
              desarrollo del sector y consolidarnos como una organización
              sólida, confiable y orientada a la excelencia.
            </p>
          </article>

          <article className={styles.mvCard}>
            <span className={styles.mvEyebrow}>Visión</span>
            <p className={styles.mvText}>
              Para el año 2032, MotoCenter será reconocida como una
              organización referente en el sector de la movilidad,
              distinguiéndose por la excelencia en la comercialización de
              motocicletas, repuestos, accesorios y la prestación de servicios
              técnicos especializados de las marcas Bajaj y Auteco.
              Fortaleceremos nuestra presencia en el mercado mediante un
              crecimiento sostenible, la apertura gradual de nuevas sedes y el
              desarrollo continuo de nuestras capacidades operativas y
              comerciales. Nuestra gestión estará fundamentada en estándares
              internacionales de calidad, orientando nuestros procesos bajo
              los lineamientos de la Norma ISO 9001 y el enfoque de mejora
              continua, consolidando una cultura organizacional basada en la
              integridad, la orientación al cliente, el trabajo en equipo, el
              compromiso y la innovación, para generar valor sostenible a
              nuestros clientes, colaboradores, proveedores, aliados
              estratégicos y demás grupos de interés.
            </p>
          </article>
        </div>

        {/* Valores */}
        <div className={styles.valoresHeader}>
          <span className={styles.mvEyebrow}>Nuestros Valores</span>
        </div>

        <div className={styles.valoresGrid}>
          {VALORES.map(({ icon: Icon, titulo, descripcion, aplicacion }) => (
            <article className={styles.valorCard} key={titulo}>
              <div className={styles.valorIconWrap}>
                <Icon className={styles.valorIcon} />
              </div>
              <h3 className={styles.valorTitulo}>{titulo}</h3>
              <p className={styles.valorDescripcion}>{descripcion}</p>

              <details className={styles.valorDetails}>
                <summary className={styles.valorSummary}>
                  ¿Cómo lo aplicamos en nuestro quehacer diario?
                </summary>
                <ul className={styles.valorLista}>
                  {aplicacion.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </div>

        {/* Políticas SST */}
        <div className={styles.valoresHeader}>
          <span className={styles.mvEyebrow}>
            Políticas
          </span>
        </div>

        <div className={styles.politicasColumna}>
          {POLITICAS.map((p) => (
            <details className={styles.politicaItem} key={p.codigo}>
              <summary className={styles.politicaSummary}>
                <span className={styles.politicaSummaryText}>
                  <span className={styles.politicaCodigo}>{p.codigo}</span>
                  <span className={styles.politicaTitulo}>{p.titulo}</span>
                </span>
                <span className={styles.politicaChevron} aria-hidden="true" />
              </summary>

              <div className={styles.politicaContenido}>
                {p.parrafos.map((texto, i) => (
                  <p key={i}>{texto}</p>
                ))}

                {p.lista && (
                  <ul>
                    {p.lista.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {p.parrafosFinal &&
                  p.parrafosFinal.map((texto, i) => (
                    <p key={`f-${i}`}>{texto}</p>
                  ))}

                {p.cierre && <p>{p.cierre}</p>}

                <div className={styles.politicaFirma}>
                  {p.fechaRevision && (
                    <p className={styles.politicaFecha}>
                      Fecha de revisión: {p.fechaRevision}
                    </p>
                  )}
                  <p>Cordialmente,</p>
                  <p className={styles.politicaFirmante}>
                    JORGE ENRIQUE PIRAJAN MANCERA
                    <br />
                    <span>Representante Legal</span>
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}