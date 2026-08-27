import React from "react";

const FAQ_ITEMS = [
  {
    q: "¿Qué es WATSON?",
    a: "Es una inteligencia artificial clínica local que escucha la consulta médica, la transcribe y completa automáticamente la historia clínica en Dinámica Gerencial en 90 segundos, sin teclado y sin cambiar la forma de trabajar del médico.",
  },
  {
    q: "¿Con qué sistemas de información hospitalaria (HIS) se integra?",
    a: "Con Dinámica Gerencial (DGH), el sistema de historia clínica más usado por las clínicas en Colombia. WATSON inyecta los datos campo por campo: motivo de consulta, enfermedad actual, signos vitales, diagnóstico CIE-10, plan de manejo y medicamentos.",
  },
  {
    q: "¿Los datos de los pacientes salen de la clínica?",
    a: "No. WATSON corre 100% en la red local de la institución: el audio se procesa localmente y los datos del paciente nunca salen del hospital. Cumple la Ley 1581 de 2012, el Habeas Data y la Resolución 1995 de 1999.",
  },
  {
    q: "¿WATSON funciona sin internet?",
    a: "Sí. El procesamiento de voz y la extracción de datos ocurren en servidores locales dentro de la clínica, con latencia controlada en LAN de menos de 800 ms y cero costo por consulta.",
  },
  {
    q: "¿Cuánto cuesta WATSON?",
    a: "Licencia de pago único con hardware incluido: $48.000.000 COP para hasta 20 consultorios, $90.000.000 COP para hasta 40 y $180.000.000 COP para redes hospitalarias 24/7. No hay costo recurrente por consulta.",
  },
  {
    q: "¿Cumple con la normatividad colombiana?",
    a: "Sí: Ley 1581 de 2012 (protección de datos), Habeas Data, Resolución 1995 de 1999 (historia clínica), 80 indicadores del SOGCS evaluados en tiempo real y Resolución 1888 de 2025. Incluye validación farmacológica y justificación CIE-10 + CUPS.",
  },
  {
    q: "¿Cómo empiezo a usar WATSON?",
    a: "Solicite una demo gratuita: le mostramos el producto en vivo sobre su propia instalación de Dinámica Gerencial en 20 minutos y sin compromisos. Escríbanos por WhatsApp al +57 302 552 3528.",
  },
];

const styles = `
.faq-section { padding: 88px 24px; max-width: 760px; margin: 0 auto; }
.faq-section h2 { font-family: var(--font-sans, 'Space Grotesk'), sans-serif; font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; margin: 12px 0 8px; text-align: center; }
.faq-section .faq-sub { text-align: center; color: var(--gray400, #667085); margin: 0 auto 40px; font-size: 16px; }
.faq-item { border: 1px solid var(--gray100, #e4e7ec); border-radius: 12px; margin-bottom: 12px; background: #fff; overflow: hidden; }
.faq-item summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; cursor: pointer; font-family: var(--font-sans, 'Space Grotesk'), sans-serif; font-weight: 600; font-size: 16px; list-style: none; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary .faq-plus { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: var(--blue-light, #eaf1ff); color: var(--blue, #1a6bff); display: grid; place-items: center; font-size: 16px; transition: transform 0.25s ease; }
.faq-item[open] summary .faq-plus { transform: rotate(45deg); }
.faq-item .faq-body { padding: 0 20px 18px; color: var(--gray600, #475467); font-size: 15px; line-height: 1.65; }
`;

export default function Faq() {
  return (
    <section className="faq-section" id="faq" style={{ background: "#fff" }}>
      <style>{styles}</style>
      <p className="section-tag" style={{ color: "var(--blue)", textAlign: "center" }}>Preguntas frecuentes</p>
      <h2>Todo lo que debe saber antes de adoptar <em style={{ color: "var(--blue)" }}>IA clínica</em></h2>
      <p className="faq-sub">Respuestas directas sobre WATSON, Dinámica Gerencial y el cumplimiento normativo.</p>
      {FAQ_ITEMS.map((item) => (
        <details key={item.q} className="faq-item">
          <summary>
            {item.q}
            <span className="faq-plus">+</span>
          </summary>
          <div className="faq-body">{item.a}</div>
        </details>
      ))}
    </section>
  );
}