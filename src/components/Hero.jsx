import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import "../styles/hero.css";

export default function Hero() {
  const titleRef = useRef(null);
  const lensRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 }); // Start off-screen

  useEffect(() => {
    // Staggered Title Reveal
    const text = new SplitType(titleRef.current, { types: 'chars,words' });
    
    gsap.from(text.chars, {
      y: 100,
      skewY: 10,
      opacity: 0,
      stagger: 0.02,
      duration: 1.5,
      ease: "expo.out",
      delay: 0.5
    });

    // Cursor Follow with Easing
    const handleMouseMove = (e) => {
      gsap.to(lensRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      text.revert();
    };
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title" ref={titleRef}>
          EL MÉDICO HABLA.<br/>WATSON ESCRIBE.
        </h1>
        <p className="hero-subtitle">
          Transcripción de consultas en tiempo real con llenado automático de formularios en Dinámica Gerencial (DGH). Sin digitar. Sin errores.
        </p>
        <button className="hero-cta">Solicitar acceso anticipado</button>
      </div>

      {/* Interactive Lens Mask */}
      <div className="lens-wrapper" ref={lensRef}>
        <div className="lens-content">
          <video 
            src="/assets/onyx-mark.jpg" // Using existing asset as placeholder for video
            autoPlay 
            muted 
            loop 
            className="lens-video"
          />
        </div>
      </div>
    </section>
  );
}
