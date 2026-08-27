import React from "react";
import { Eyebrow } from "./atoms.jsx";

const FAQ_ITEMS = [
  {
    q: "¿Qué es WATSON?",
    a: "Es una inteligencia artificial clínica local que escucha la consulta médica, transcribe en tiempo real y rellena la historia clínica directamente en Dinámica Gerencial, sin teclado y sin cambiar la forma de trabajar del médico.",
  },
  {
    q: "¿Con qué sistema de historia clínica se integra?",
    a: "WATSON funciona sobre Dinámica Gerencial sin modificarlo, y sin contratos adicionales con SYAC. Mapea automáticamente los formularios reales del HIS en menos de 30 segundos, sin configurar campo por campo.",
  },
  {
    q: "¿WATSON funciona sin internet?",
    a: "Sí. El audio se captura y procesa dentro de la red de la clínica con el motor local ONYX. Cero conexión a internet, cero servidores externos y latencia controlada en LAN.",
  },
  {
    q: "¿Los datos de los pacientes salen de la clínica?",
    a: "No. WATSON es 100% local: el audio se borra tras la consulta y cumple la Ley 1581 de 2012 (Habeas Data) y la Resolución 1995 de 1999. El audio de un paciente nunca sale de su clínica.",
  },
  {
    q: "¿Cuánto cuesta WATSON?",
    a: "Licencia de pago único con hardware incluido: $48.000.000 COP para hasta 20 consultorios, $90.000.000 COP para hasta 40 y $180.000.000 COP para redes hospitalarias 24/7. Cero costo por consulta.",
  },
  {
    q: "¿Cómo empiezo a usar WATSON?",
    a: "Agende una reunión: le mostramos una instalación piloto sobre Dinámica Gerencial en su propia red, sin compromiso. WhatsApp +57 302 552 3528 o correo onyxvip.agency@gmail.com.",
  },
];

const styles = `
.faq-grid { display: grid; gap: 12px; margin-top: 48px; }
.faq-item { border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card); overflow: hidden; }
.faq-item summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; cursor: pointer; font-family: var(--font-sans), sans-serif; font-weight: 600; font-size: 16px; color: var(--fg); list-style: none; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary .faq-plus { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: rgba(37,99,235,0.12); color: var(--blue); display: grid; place-items: center; font-size: 16px; transition: transform 0.25s ease; }
.faq-item[open] summary .faq-plus { transform: rotate(45deg); }
.faq-item .faq-body { padding: 0 20px 18px; color: var(--fg-muted); font-size: 15px; line-height: 1.65; }
`;

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <Eyebrow>Preguntas frecuentes</Eyebrow>
        <h2 className="section-title">Todo lo que debe saber antes de adoptar IA clínica.</h2>
        <div className="faq-grid">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                {item.q}
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-body">{item.a}</div>
            </details>
          ))}
        </div>
        <style>{styles}</style>
      </div>
    </section>
  );
}