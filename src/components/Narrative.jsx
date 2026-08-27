import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import "../styles/narrative.css";

export default function Narrative() {
  const containerRef = useRef(null);

  useEffect(() => {
    const textElements = containerRef.current.querySelectorAll('.scrub-text');
    
    textElements.forEach((el) => {
      const split = new SplitType(el, { types: 'chars' });
      
      gsap.to(split.chars, {
        color: "#FFFFFF",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 25%",
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <section className="narrative" ref={containerRef} style={{ background: "var(--bg-bone)", padding: "160px 0" }}>
      <div className="container">
        <div className="narrative-content" style={{ gap: "60px" }}>
          <h2 className="scrub-text" style={{ fontSize: "clamp(48px, 6vw, 100px)", color: "rgba(0,0,0,0.05)" }}>
            Un especialista senior en Colombia invierte hasta el 40% de su jornada en registro documental.
          </h2>
          <h2 className="scrub-text" style={{ fontSize: "clamp(48px, 6vw, 100px)", color: "rgba(0,0,0,0.05)" }}>
            Esta ineficiencia no solo erosiona el margen operativo, sino que compromete la seguridad del paciente.
          </h2>
          <h2 className="scrub-text accent" style={{ fontSize: "clamp(48px, 6vw, 100px)", color: "rgba(26, 107, 255, 0.1)" }}>
            Es momento de devolver el enfoque médico a la práctica clínica.
          </h2>
        </div>
      </div>
    </section>
  );
}
