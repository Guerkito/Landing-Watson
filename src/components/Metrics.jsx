import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/metrics.css";

const MetricCard = ({ value, label, prefix = "", suffix = "" }) => {
  const numberRef = useRef(null);

  useEffect(() => {
    const val = parseFloat(value.replace(/[^0-9.-]/g, ''));
    const isInt = !value.includes('.');

    gsap.from(numberRef.current, {
      innerText: 0,
      duration: 2,
      snap: { innerText: isInt ? 1 : 0.1 },
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 90%",
      },
      onUpdate: function() {
        numberRef.current.innerText = prefix + parseFloat(this.targets()[0].innerText).toLocaleString() + suffix;
      }
    });
  }, [value, prefix, suffix]);

  return (
    <div className="metric-card">
      <div className="metric-value" ref={numberRef}>{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
};

export default function Metrics() {
  return (
    <section className="metrics">
      <div className="container">
        <div className="metrics-grid">
          <MetricCard value="70" suffix="%" prefix="-" label="Tiempo en documentación por consulta" />
          <MetricCard value="5" suffix=" min" prefix="< " label="Instalación y configuración inicial" />
          <MetricCard value="100" suffix="%" label="Los datos nunca salen del equipo" />
          <MetricCard value="11000" prefix="+" label="Códigos CIE-10 disponibles offline" />
        </div>
      </div>
    </section>
  );
}
