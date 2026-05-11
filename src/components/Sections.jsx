import React, { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons.jsx";
import { Eyebrow, Button, Counter } from "./atoms.jsx";
import { Widget, ChromeFrame } from "./Widget.jsx";
import HeroScene from "../scenes/HeroScene.jsx";
import OnyxVsCloudScene from "../scenes/OnyxVsCloudScene.jsx";
import { CONTACT, whatsappUrl, mailtoUrl } from "../lib/contact.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Header = () => (
  <header className="header">
    <div className="container header-inner">
      <a className="header-logo" href="#top" aria-label="WATSON">
        <svg width="120" height="24" viewBox="0 0 240 48" fill="none">
          <g transform="translate(8 24)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <circle cx="0" cy="0" r="3" fill="currentColor" stroke="none"/>
            <path d="M-9 0 Q-6 -4 -3 0 T 3 0 T 9 0"/>
            <path d="M-14 0 Q-10 -7 -6 0 T 6 0 T 14 0" opacity="0.55"/>
          </g>
          <text x="40" y="32" fontFamily="Geist, Inter, sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.02em" fill="currentColor">WATSON</text>
        </svg>
      </a>
      <nav className="header-nav">
        <a href="#solucion">La solución</a>
        <a href="#diferencia">Por qué funciona</a>
        <a href="#planes">Planes</a>
        <a href="#cumplimiento">Cumplimiento</a>
      </nav>
      <Button kind="primary" href={whatsappUrl()} target="_blank">Agendar reunión</Button>
    </div>
  </header>
);

export const Hero = () => {
  const [demoState, setDemoState] = useState("idle");
  return (
    <section className="bg-hero" id="top" style={{ position: "relative", overflow: "hidden" }}>
      <HeroScene />
      <div className="container hero" style={{ position: "relative", zIndex: 1 }}>
        <Eyebrow>Inteligencia clínica local · Colombia</Eyebrow>
        <h1>Sus médicos están perdiendo 2 horas al día llenando formularios.</h1>
        <p className="lede">
          Horas que podrían estar atendiendo pacientes. Existe una forma de recuperarlas
          sin cambiar cómo trabaja su equipo. WATSON escucha la consulta, transcribe en
          tiempo real con IA local y rellena la historia clínica directamente en
          Dinámica Gerencial.
        </p>
        <div className="ctas">
          <Button kind="primary" large href={whatsappUrl()} target="_blank">Agendar reunión <Icons.Arrow size={16}/></Button>
          <Button kind="secondary" large href="#solucion">Ver cómo funciona</Button>
        </div>

        <div className="hero-visual" style={{ position: "relative", height: 600, marginTop: 80, borderRadius: 24, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 30px 80px -20px rgba(37,99,235,0.18), 0 60px 120px -40px rgba(15,15,17,0.18)" }}>
          <ChromeFrame demoState={demoState} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, transparent 65%, rgba(255,255,255,0.55))" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, padding: 30, pointerEvents: "all" }}>
            <Widget onStateChange={setDemoState} />
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ kicker, title, lede, kickerColor }) => (
  <>
    {kicker && <Eyebrow color={kickerColor}>{kicker}</Eyebrow>}
    <h2 className="section-title">{title}</h2>
    {lede && <p className="section-lede">{lede}</p>}
  </>
);

export const Problem = () => (
  <section className="section">
    <div className="container">
      <SectionHeader kicker="01 · El problema" title="En cada consultorio se repite la misma pérdida." />
      <div className="two-col">
        <div className="problem-card">
          <Icons.Stethoscope size={28} className="icon"/>
          <h3>El médico digita mientras atiende.</h3>
          <p>Pierde contacto visual con el paciente. La consulta se vuelve una transacción de teclado, no una conversación clínica.</p>
        </div>
        <div className="problem-card">
          <Icons.Clipboard size={28} className="icon"/>
          <h3>Las historias quedan para después.</h3>
          <p>Al final del turno, el médico reconstruye de memoria lo que pasó en doce consultas. La calidad cae y se pierden datos críticos.</p>
        </div>
      </div>
      <p className="section-lede" style={{ marginTop: 56 }}>
        Historias clínicas de menor calidad, médicos agotados, ingresos que se escapan.
      </p>
    </div>
  </section>
);

export const CostStats = () => (
  <section className="section">
    <div className="container">
      <SectionHeader kicker="02 · El costo real" title="Lo que cuesta digitar a mano." />
      <div className="stat-grid">
        <div className="stat-card">
          <div className="num"><Counter to={6}/>–<Counter to={8}/> <span className="blue">min</span></div>
          <div className="label">Por historia clínica completa, según especialidad y volumen.</div>
        </div>
        <div className="stat-card">
          <div className="num"><Counter to={2} decimals={0}/> <span className="blue">h/día</span></div>
          <div className="label">25 pacientes/día = más de dos horas diarias solo digitando.</div>
        </div>
        <div className="stat-card">
          <div className="num">Glosas</div>
          <div className="label">EPS rechazan facturación por historias incompletas. Pérdida directa de ingreso.</div>
        </div>
      </div>
    </div>
  </section>
);

export const Affected = () => {
  const items = [
    { icon: <Icons.Stethoscope size={24}/>, title: "Médico", body: "Fatiga administrativa, pérdida de foco clínico, satisfacción profesional erosionada." },
    { icon: <Icons.Building size={24}/>, title: "Clínica", body: "Capacidad clínica desperdiciada en tareas que no requieren juicio médico." },
    { icon: <Icons.Briefcase size={24}/>, title: "Área administrativa", body: "Glosas recurrentes, retrabajo de auditoría, presión sobre el ciclo de facturación." },
    { icon: <Icons.User size={24}/>, title: "Paciente", body: "Consulta dividida entre persona y pantalla. Menor percepción de cuidado." },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHeader kicker="03 · Quién paga la factura" title="A quién afecta." />
        <div className="affected-grid">
          {items.map((it) => (
            <div className="affected-card" key={it.title}>
              <div className="icon">{it.icon}</div>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Solution = () => {
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const states = [
    { step: "01", title: "El médico habla naturalmente.", visual: "wave" },
    { step: "02", title: "ONYX transcribe y analiza en tiempo real.", visual: "json" },
    { step: "03", title: "Historia clínica completa en Dinámica Gerencial.", visual: "form" },
  ];
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const visual = el.querySelector(".solution-visual");
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        const idx = Math.min(states.length - 1, Math.floor(p * states.length * 0.999));
        setActive(idx);
        if (visual) visual.style.setProperty("--solution-progress", p.toFixed(4));
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section className="section" id="solucion" ref={wrapRef}>
      <div className="container">
        <SectionHeader kicker="04 · La solución" title="Tres estados. Un flujo invisible." />
        <div className="sticky-solution" style={{ marginTop: 56 }}>
          <div className="sticky-text">
            {states.map((s, i) => (
              <div key={s.step} className={`solution-state ${i === active ? "" : "inactive"}`} onClick={() => setActive(i)}>
                <div className="step">{s.step}</div>
                <h3>{s.title}</h3>
              </div>
            ))}
          </div>
          <div className="solution-visual">
            <div className="sv-frame">
              {active === 0 && (
                <div className="sv-step active hero-waves" style={{ color: "var(--blue)" }}>
                  <div className="bar">{Array.from({ length: 11 }).map((_, i) => <span key={i}/>) }</div>
                  <div className="step-label">CAPTURA DE AUDIO · LOCAL</div>
                </div>
              )}
              {active === 1 && (
                <div className="sv-step active" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                  <div style={{ color: "var(--blue)" }}>{"{"}</div>
                  <div style={{ paddingLeft: 16 }}>"motivo": <span style={{ color: "var(--fg)" }}>"cefalea 3d"</span>,</div>
                  <div style={{ paddingLeft: 16 }}>"signos": <span style={{ color: "var(--fg)" }}>"PA 140/90"</span>,</div>
                  <div style={{ paddingLeft: 16 }}>"dx": <span style={{ color: "var(--fg)" }}>"migraña sin aura"</span>,</div>
                  <div style={{ paddingLeft: 16 }}>"plan": <span style={{ color: "var(--fg)" }}>"AINE 400mg c/8h"</span></div>
                  <div style={{ color: "var(--blue)" }}>{"}"}</div>
                  <div className="step-label" style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-muted)" }}>MOTOR LOCAL · ESTRUCTURADO</div>
                </div>
              )}
              {active === 2 && (
                <div className="sv-step active" style={{ width: "100%" }}>
                  <div className="hero-form-demo" style={{ padding: 0, gridTemplateColumns: "1fr" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "var(--bg-card)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--fg-muted)", marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>Motivo de Consulta</div>
                        <div className="anim-text-1" style={{ fontSize: 13, padding: "8px 12px", background: "var(--bg)", borderRadius: 6, border: "1px solid var(--border)" }}>Cefalea pulsátil 3 días evolución.</div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <div style={{ fontSize: 9, fontWeight: 700, color: "var(--fg-muted)", marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>Tensión Arterial</div>
                          <div className="anim-text-2" style={{ fontSize: 13, padding: "8px 12px", background: "var(--bg)", borderRadius: 6, border: "1px solid var(--border)" }}>140/90</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 9, fontWeight: 700, color: "var(--fg-muted)", marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>Frecuencia Cardíaca</div>
                          <div className="anim-text-3" style={{ fontSize: 13, padding: "8px 12px", background: "var(--bg)", borderRadius: 6, border: "1px solid var(--border)" }}>88 lpm</div>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--fg-muted)", marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>Diagnóstico (CIE-10)</div>
                        <div className="anim-text-4" style={{ fontSize: 13, padding: "8px 12px", background: "var(--bg)", borderRadius: 6, border: "1px solid var(--border)" }}>G43.1 Migraña con aura</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--fg-muted)", marginBottom: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>Plan y Manejo</div>
                        <div className="anim-text-5" style={{ fontSize: 13, padding: "8px 12px", background: "var(--bg)", borderRadius: 6, border: "1px solid var(--border)", minHeight: 44 }}>Sumatriptán 6mg SC. Reposo relativo.</div>
                      </div>
                    </div>
                    <div className="step-label" style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green)" }}>INYECTADO EN DINÁMICA GERENCIAL</div>
                  </div>
                  <style>{`
                    .anim-text-1, .anim-text-2, .anim-text-3, .anim-text-4, .anim-text-5 {
                      color: transparent;
                      transition: all 0.5s ease-out;
                    }
                    .anim-text-1 { animation: fillText 0.5s ease-out forwards 0.2s; }
                    .anim-text-2 { animation: fillText 0.5s ease-out forwards 0.5s; }
                    .anim-text-3 { animation: fillText 0.5s ease-out forwards 0.7s; }
                    .anim-text-4 { animation: fillText 0.5s ease-out forwards 1.0s; }
                    .anim-text-5 { animation: fillText 0.5s ease-out forwards 1.2s; }

                    @keyframes fillText {
                      0% { color: transparent; background: var(--bg); border-color: var(--border); }
                      50% { color: var(--fg); background: rgba(37,99,235,0.12); border-color: rgba(37,99,235,0.4); }
                      100% { color: var(--fg); background: rgba(37,99,235,0.06); border-color: rgba(37,99,235,0.3); }
                    }
                  `}</style>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyDifferent = () => {
  const items = [
    { icon: <Icons.Settings size={24}/>, title: "Aprende su clínica en menos de 30 segundos.", body: "Mapeo automático de los formularios reales del HIS. Sin configurar campo por campo." },
    { icon: <Icons.HeartPulse size={24}/>, title: "Inteligencia por especialidad.", body: "Medicina General, Pediatría, Cardiología, Ginecología, Ortopedia, Dermatología, Psiquiatría." },
    { icon: <Icons.Shield size={24}/>, title: "Privacidad por diseño.", body: "100 % local. Audio borrado tras la consulta. Cumple Ley 1581 y Resolución 1995." },
    { icon: <Icons.Cpu size={24}/>, title: "Sin tocar el HIS.", body: "Funciona sobre Dinámica Gerencial sin modificarlo. Sin contratos adicionales con SYAC." },
  ];
  return (
    <section className="section" id="diferencia">
      <div className="container">
        <SectionHeader kicker="05 · Diferenciación" title="Por qué WATSON funciona donde otros han fallado." />
        <div className="why-grid">
          {items.map((it) => (
            <div className="why-card" key={it.title}>
              <div className="icon">{it.icon}</div>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BeforeAfter = () => {
  const pinRef = useRef(null);
  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      el.style.setProperty("--hp", p.toString());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  const items = [
    { kicker: "Tiempo por historia", hoy: "6–8 min", watson: "1.5 min" },
    { kicker: "Atención al paciente", hoy: "Dividida", watson: "100 %" },
    { kicker: "Pacientes/médico/día", hoy: "25", watson: "30–32" },
    { kicker: "Glosas EPS", hoy: "Frecuentes", watson: "Reducción significativa" },
  ];
  return (
    <section className="h-scroll-pin" ref={pinRef}>
      <div className="h-scroll-sticky">
        <div className="h-scroll-track">
          <div className="h-scroll-intro">
            <Eyebrow>06 · Impacto operativo</Eyebrow>
            <h2 className="section-title">Antes y después.</h2>
            <p className="section-lede">Desplácese para comparar métrica por métrica. Con 10 médicos: más de <span className="text-blue mono">18 horas clínicas</span> adicionales cada día.</p>
          </div>
          {items.map((it) => (
            <React.Fragment key={it.kicker}>
              <div className="h-scroll-card">
                <span className="kicker">Hoy · {it.kicker}</span>
                <span className="metric">{it.hoy}</span>
                <span className="label">Trabajo manual del médico durante y después de la consulta.</span>
              </div>
              <div className="h-scroll-card watson">
                <span className="kicker" style={{ color: "var(--blue)" }}>Con WATSON · {it.kicker}</span>
                <span className="metric">{it.watson}</span>
                <span className="label">Captura automática local. Sin interrumpir el flujo clínico.</span>
              </div>
            </React.Fragment>
          ))}
          <div className="h-scroll-card" style={{ background: "rgba(37,99,235,0.06)", borderColor: "rgba(37,99,235,0.3)" }}>
            <span className="kicker" style={{ color: "var(--blue)" }}>El resultado</span>
            <span className="metric"><Counter to={18}/> h</span>
            <span className="label">clínicas adicionales cada día con un equipo de 10 médicos.</span>
          </div>
        </div>
        <div className="h-scroll-progress"/>
      </div>
    </section>
  );
};

export const Roles = () => {
  const items = [
    { icon: <Icons.Briefcase size={22}/>, title: "Gerente", body: "ROI medible. Glosas a la baja, capacidad clínica al alza." },
    { icon: <Icons.Stethoscope size={22}/>, title: "Médico", body: "Recupera la consulta. Cero digitación durante la atención." },
    { icon: <Icons.User size={22}/>, title: "Paciente", body: "Atención completa, contacto visual restaurado." },
    { icon: <Icons.CheckCircle size={22}/>, title: "Calidad", body: "Historias completas, trazables, auditables." },
    { icon: <Icons.Award size={22}/>, title: "Institución", body: "Posición competitiva regional sin precedentes." },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHeader kicker="07 · Beneficio por rol" title="Cinco audiencias. Una decisión." />
        <div className="roles-grid">
          {items.map((it) => (
            <div className="role-card" key={it.title}>
              <div className="icon">{it.icon}</div>
              <h5>{it.title}</h5>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const OnyxVsCloud = () => (
  <section className="section" id="cumplimiento">
    <div className="container">
      <SectionHeader
        kicker="08 · ONYX vs Nube"
        title="El audio de un paciente nunca debe salir de su clínica."
        lede="Sobre 8.800 consultas/mes, así se compara IA local con IA en nube."
      />
      <OnyxVsCloudScene />
      <div className="compare-cards">
        <div className="card-cloud">
          <span className="label"><Icons.Cloud size={14} style={{ verticalAlign: "middle", marginRight: 6 }}/> IA en nube</span>
          <h4>OpenAI / Anthropic / Google</h4>
          <ul>
            <li><Icons.Alert size={16} style={{ color: "var(--red)", marginTop: 2, flexShrink: 0 }}/>Costo por token recurrente, mes a mes.</li>
            <li><Icons.Alert size={16} style={{ color: "var(--red)", marginTop: 2, flexShrink: 0 }}/>Latencia variable según red e infraestructura externa.</li>
            <li><Icons.Alert size={16} style={{ color: "var(--red)", marginTop: 2, flexShrink: 0 }}/>El audio del paciente viaja fuera de la red de la clínica.</li>
            <li><Icons.Alert size={16} style={{ color: "var(--red)", marginTop: 2, flexShrink: 0 }}/>Dependencia de un proveedor externo y de su disponibilidad.</li>
          </ul>
          <div className="savings">
            <span className="v">~$8.4 M</span>
            <span className="l">COP/mes estimado · costo recurrente</span>
          </div>
        </div>
        <div className="card-onyx">
          <span className="label"><Icons.Cpu size={14} style={{ verticalAlign: "middle", marginRight: 6 }}/> IA local · ONYX</span>
          <h4>Infraestructura de Alta Fidelidad</h4>
          <ul>
            <li><Icons.Check size={16} style={{ color: "var(--green)", marginTop: 2, flexShrink: 0 }}/>Pago único de licencia. Cero costo por consulta.</li>
            <li><Icons.Check size={16} style={{ color: "var(--green)", marginTop: 2, flexShrink: 0 }}/>Latencia controlada en LAN. {"<"} 800 ms end-to-end.</li>
            <li><Icons.Check size={16} style={{ color: "var(--green)", marginTop: 2, flexShrink: 0 }}/>Datos nunca salen de la red de la institución.</li>
            <li><Icons.Check size={16} style={{ color: "var(--green)", marginTop: 2, flexShrink: 0 }}/>Cumplimiento Ley 1581 y Resolución 1995 desde el primer día.</li>
          </ul>
          <div className="savings">
            <span className="v">$0</span>
            <span className="l">COP/mes recurrente · ahorro anual ~$100 M COP</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Pricing = () => {
  const plans = [
    {
      name: "Ala de Especialistas",
      scope: "Hasta 20 consultorios simultáneos",
      price: "$48.000.000",
      pitch: "Ideal para comenzar automatizando un área específica como Pediatría u Ortopedia. El punto de entrada perfecto para ver resultados reales antes de una adopción total.",
      points: [
        "Servidor local incluido + 20 micrófonos omnidireccionales",
        "Mapeo de 1 formato de historia clínica en Dinámica Gerencial",
        "Extensión instalada en los 20 computadores",
        "12 meses de soporte y capacitación",
      ],
    },
    {
      name: "Clínica Integral",
      scope: "Hasta 40 consultorios simultáneos",
      price: "$90.000.000",
      recommended: true,
      ribbonText: "El más elegido",
      pitch: "Para instituciones que quieren transformar todas sus consultas programadas y áreas prioritarias de una sola vez.",
      points: [
        "Servidor de alto rendimiento + 40 micrófonos + cableado completo",
        "Mapeo de hasta 3 formatos en Dinámica Gerencial",
        "Extensión instalada en los 40 computadores",
        "12 meses de soporte y capacitación",
      ],
    },
    {
      name: "Red Hospitalaria 24/7",
      scope: "Más de 80 consultorios simultáneos",
      price: "$180.000.000",
      pitch: "Para hospitales que operan sin parar y no pueden permitirse ninguna interrupción del sistema.",
      points: [
        "Clúster de 2 servidores en redundancia automática + UPS + 80 micrófonos",
        "Integración total en todas las áreas incluyendo urgencias",
        "Dashboard ejecutivo con métricas de automatización en tiempo real",
        "Extensión instalada en los 80 computadores",
      ],
    },
  ];
  return (
    <section className="section" id="planes">
      <div className="container">
        <SectionHeader kicker="09 · Planes" title="Tres tamaños, una filosofía: cero nube." />
        <div className="pricing">
          {plans.map((p) => (
            <div key={p.name} className={`plan${p.recommended ? " recommended" : ""}`}>
              {p.recommended && <span className="ribbon">{p.ribbonText || "Recomendado"}</span>}
              <h3>{p.name}</h3>
              <p className="scope">{p.scope}</p>
              <p className="plan-pitch">{p.pitch}</p>
              <div className="price">{p.price}<span className="cop">COP · pago único</span></div>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}><Icons.Check size={16} className="check"/>{pt}</li>
                ))}
              </ul>
              <Button
                kind={p.recommended ? "primary" : "secondary"}
                href={whatsappUrl(`Hola, me interesa el plan "${p.name}" de WATSON. ¿Podemos agendar una reunión?`)}
                target="_blank"
              >
                Agendar reunión
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FinalCTA = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const inst = data.get("institucion") || "";
    const ciudad = data.get("ciudad") || "";
    const consultorios = data.get("consultorios") || "";
    const contacto = data.get("contacto") || "";
    const body = [
      "Hola equipo Onyx,",
      "",
      "Me interesa agendar una reunión para conocer WATSON.",
      "",
      `Institución: ${inst}`,
      `Ciudad: ${ciudad}`,
      `Consultorios: ${consultorios}`,
      `Contacto: ${contacto}`,
      "",
      "Quedo atento(a).",
    ].join("\n");
    window.location.href = mailtoUrl(`Solicitud de reunión · WATSON · ${inst}`, body);
  };

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          kicker="10 · El momento de decidir"
          title="Las clínicas que adopten esto primero definirán el estándar de atención de la región."
          lede="Sin urgencia falsa. Sin oferta limitada. Una decisión ejecutiva sobre cómo se trabaja en su institución durante los próximos cinco años."
        />
        <div className="final-cta">
          <div>
            <h3>Hable con un asesor de Onyx.</h3>
            <p>Le mostramos una instalación piloto sobre Dinámica Gerencial en su propia red. Sin compromiso.</p>

            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              <a className="contact-method" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <Icons.Mic size={18} />
                <span className="cm-text">
                  <strong>WhatsApp</strong>
                  <em>{CONTACT.phoneDisplay}</em>
                </span>
                <Icons.Arrow size={16} className="cm-arrow" />
              </a>
              <a className="contact-method" href={mailtoUrl()}>
                <Icons.Clipboard size={18} />
                <span className="cm-text">
                  <strong>Correo</strong>
                  <em>{CONTACT.email}</em>
                </span>
                <Icons.Arrow size={16} className="cm-arrow" />
              </a>
            </div>

            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, color: "var(--fg-muted)", fontSize: 14 }}><Icons.Shield size={18}/> Cumple Ley 1581 de 2012 y Resolución 1995 de 1999.</div>
              <div style={{ display: "flex", gap: 10, color: "var(--fg-muted)", fontSize: 14 }}><Icons.CloudOff size={18}/> Cero conexión a internet requerida para operar.</div>
              <div style={{ display: "flex", gap: 10, color: "var(--fg-muted)", fontSize: 14 }}><Icons.Server size={18}/> Instalación en su red, sobre hardware certificado.</div>
            </div>
          </div>

          <form className="form-grid" onSubmit={onSubmit}>
            <label className="full">Institución <input name="institucion" placeholder="p. ej. Clínica del Country" required/></label>
            <label>Ciudad <input name="ciudad" placeholder="Bogotá" required/></label>
            <label>Consultorios <input name="consultorios" placeholder="20"/></label>
            <label className="full">Contacto (correo o teléfono) <input name="contacto" placeholder="director@clinica.co · +57 …" required/></label>
            <div className="submit-row">
              <span className="reply-note">Un asesor lo contactará en menos de 24 horas hábiles.</span>
              <Button kind="primary" type="submit">Enviar por correo <Icons.Arrow size={16}/></Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <a className="header-logo" href="#top">
            <svg width="120" height="24" viewBox="0 0 240 48" fill="none">
              <g transform="translate(8 24)" stroke="currentColor" strokeWidth="1.5" fill="none">
                <circle cx="0" cy="0" r="3" fill="currentColor" stroke="none"/>
                <path d="M-9 0 Q-6 -4 -3 0 T 3 0 T 9 0"/>
              </g>
              <text x="40" y="32" fontFamily="Geist, Inter, sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.02em" fill="currentColor">WATSON</text>
            </svg>
          </a>
          <p style={{ marginTop: 16, fontSize: 14, maxWidth: 36 + "ch", color: "var(--fg-muted)" }}>
            Inteligencia clínica local. Construido en Colombia para clínicas y hospitales de Colombia.
          </p>
        </div>
        <div>
          <h6>Producto</h6>
          <ul>
            <li>La solución</li><li>Por qué funciona</li><li>Planes</li><li>Integración HIS</li>
          </ul>
        </div>
        <div>
          <h6>Cumplimiento</h6>
          <ul>
            <li>Ley 1581 de 2012</li><li>Resolución 1995 de 1999</li><li>HIPAA · GDPR</li><li>Auditoría de borrado</li>
          </ul>
        </div>
        <div>
          <h6>Contacto Onyx</h6>
          <ul>
            <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp · {CONTACT.phoneDisplay}</a></li>
            <li><a href={mailtoUrl()}>{CONTACT.email}</a></li>
            <li>Colombia · respuesta en {"<"} 24 h</li>
          </ul>
        </div>
      </div>
      <div className="legal">
        <span>© 2026 WATSON. Todos los derechos reservados.</span>
        <span>ONYX — motor de IA local de alta fidelidad.</span>
      </div>
    </div>
  </footer>
);
