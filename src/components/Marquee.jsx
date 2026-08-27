import "../styles/marquee.css";

export default function Marquee() {
  const items = [
    "Integración nativa con DGH",
    "+11.000 códigos CIE-10",
    "+5.000 códigos CUPS",
    "Funciona offline",
    "100% local",
    "Compatible con Chrome",
    "Instalación en 5 minutos",
    "Transcripción con IA",
    "Llenado automático"
  ];

  return (
    <div className="marquee-wrapper">
      <div className="marquee">
        <div className="marquee-content">
          {items.concat(items).map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
