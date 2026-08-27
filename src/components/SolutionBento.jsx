import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/bento.css";

const BentoCard = ({ title, desc, icon, size = "small" }) => {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    
    // 3D Tilt
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(card, {
      rotationY: x * 8,
      rotationX: -y * 8,
      duration: 0.6,
      ease: "expo.out"
    });

    // Spotlight
    const sx = e.clientX - left;
    const sy = e.clientY - top;
    gsap.to(spotlight, {
      opacity: 1,
      x: sx,
      y: sy,
      duration: 0.4,
      ease: "expo.out"
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)"
    });
    gsap.to(spotlightRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "expo.out"
    });
  };

  return (
    <div 
      className={`bento-card ${size}`} 
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="spotlight" ref={spotlightRef} />
      <div className="card-content">
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default function SolutionBento() {
  return (
    <section className="solution-bento" id="producto" style={{ padding: "180px 0" }}>
      <div className="container">
        <div className="bento-header" style={{ marginBottom: "100px" }}>
          <span className="mono">05 · La Solución</span>
          <h2 style={{ fontSize: "var(--fs-h2)", marginTop: "20px", lineHeight: "0.9" }}>Una extensión.<br/>Poder clínico total.</h2>
        </div>
        
        <div className="bento-grid">
          <BentoCard 
            size="large"
            title="Integración Nativa DGH"
            desc="Watson detecta los formularios de Dinámica Gerencial automáticamente. Inyecta diagnósticos, procedimientos y evolución sin que el médico tenga que copiar o pegar nada."
            icon="↗"
          />
          <BentoCard 
            title="IA 100% Local"
            desc="Todo el procesamiento de voz ocurre en el equipo. Sin nube, sin latencia, máxima privacidad."
            icon="🔒"
          />
          <BentoCard 
            title="+11.000 CIE-10"
            desc="Acceso instantáneo a toda la base de diagnósticos oficial de Colombia, incluso sin conexión."
            icon="📋"
          />
          <BentoCard 
            size="medium"
            title="Instalación en 5 Minutos"
            desc="Una extensión de Chrome. Sin servidores complejos, sin cambios en la infraestructura de la clínica."
            icon="⚡"
          />
          <BentoCard 
            title="CUPS & DCI"
            desc="Codificación automática de procedimientos y medicamentos con estándares de MinSalud."
            icon="💊"
          />
        </div>
      </div>
    </section>
  );
}
