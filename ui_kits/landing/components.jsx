/* eslint-disable */
// WATSON landing — reusable components.
// Exposes window.WATSON namespace; consumed by landing.jsx.

const { useState, useEffect, useRef } = React;

// ---------- Icon (Lucide-style stroke 1.5px) ----------
const Icon = ({ d, size = 24, color = "currentColor", style, ...rest }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={style} {...rest}
  >
    {d}
  </svg>
);

// Common icon path bodies as components for reuse
const Icons = {
  Mic: (p) => <Icon {...p} d={<><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/><path d="M8 22h8"/></>}/>,
  AudioLines: (p) => <Icon {...p} d={<><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></>}/>,
  Shield: (p) => <Icon {...p} d={<><path d="M20 13c0 5-3.5 7.5-8 8.5-4.5-1-8-3.5-8-8.5V6l8-3 8 3z"/><path d="m9 12 2 2 4-4"/></>}/>,
  Lock: (p) => <Icon {...p} d={<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>}/>,
  Stethoscope: (p) => <Icon {...p} d={<><path d="M4 4v6a4 4 0 0 0 8 0V4"/><path d="M6 4h.01M10 4h.01"/><path d="M12 14v3a4 4 0 0 0 8 0"/><circle cx="20" cy="11" r="2"/></>}/>,
  Clipboard: (p) => <Icon {...p} d={<><rect x="7" y="5" width="10" height="16" rx="2"/><path d="M9 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M9 11h6M9 15h6"/></>}/>,
  Building: (p) => <Icon {...p} d={<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21V12h6v9"/><path d="M8 7h.01M12 7h.01M16 7h.01"/></>}/>,
  Cpu: (p) => <Icon {...p} d={<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></>}/>,
  CloudOff: (p) => <Icon {...p} d={<><path d="M3 3l18 18"/><path d="M22 17.5a4.5 4.5 0 0 0-3.5-7.4 7 7 0 0 0-13.4 2.4"/><path d="M5.5 8A4.5 4.5 0 0 0 6 17h12"/></>}/>,
  Cloud: (p) => <Icon {...p} d={<><path d="M17.5 19a4.5 4.5 0 1 0 0-9 7 7 0 0 0-13.4 2.4A4.5 4.5 0 0 0 5.5 19h12z"/></>}/>,
  Check: (p) => <Icon {...p} d={<path d="m5 12 5 5 9-11"/>}/>,
  CheckCircle: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>}/>,
  Alert: (p) => <Icon {...p} d={<><path d="m12 3-9 16h18z"/><path d="M12 10v4M12 17h.01"/></>}/>,
  Arrow: (p) => <Icon {...p} d={<><path d="M5 12h14M13 5l7 7-7 7"/></>}/>,
  User: (p) => <Icon {...p} d={<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>}/>,
  Users: (p) => <Icon {...p} d={<><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M17 11a4 4 0 0 0 0-8"/><path d="M22 21a7 7 0 0 0-5-6.7"/></>}/>,
  Briefcase: (p) => <Icon {...p} d={<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></>}/>,
  Activity: (p) => <Icon {...p} d={<path d="M3 12h4l2-7 4 14 2-7h6"/>}/>,
  Award: (p) => <Icon {...p} d={<><circle cx="12" cy="9" r="6"/><path d="m9 13-2 8 5-3 5 3-2-8"/></>}/>,
  Server: (p) => <Icon {...p} d={<><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 8h.01M7 17h.01"/></>}/>,
  Settings: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>}/>,
  HeartPulse: (p) => <Icon {...p} d={<><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-.6 1-1.5 2-2.5 3"/><path d="M3.5 13H8l2-3 3 6 2-3h5.5"/></>}/>,
};

// ---------- Tiny atoms ----------
const Eyebrow = ({ children, color }) => (
  <div className="eyebrow-row" style={color ? { color } : null}>{children}</div>
);

const Button = ({ kind = "primary", children, large, ...rest }) => (
  <button className={`btn btn-${kind}${large ? " btn-lg" : ""}`} {...rest}>
    {children}
  </button>
);

// Animated number counter triggered on viewport entry
function useCountUp(target, decimals = 0) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1200;
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Number((target * eased).toFixed(decimals)));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, decimals]);
  return [val, ref];
}

const Counter = ({ to, decimals = 0, suffix, prefix }) => {
  const [val, ref] = useCountUp(to, decimals);
  return <span ref={ref}>{prefix}{val.toLocaleString("es-CO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
};

// ---------- Header ----------
const Header = () => (
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
      <Button kind="primary">Solicitar demo</Button>
    </div>
  </header>
);

// ---------- Hero ----------
const Hero = () => (
  <section className="bg-hero" id="top">
    <div className="container hero">
      <Eyebrow>Inteligencia clínica local · Colombia</Eyebrow>
      <h1>Sus médicos están perdiendo 2 horas al día llenando formularios.</h1>
      <p className="lede">
        Horas que podrían estar atendiendo pacientes. Existe una forma de recuperarlas
        sin cambiar cómo trabaja su equipo. WATSON escucha la consulta, transcribe en
        tiempo real con IA local y rellena la historia clínica directamente en
        Dinámica Gerencial.
      </p>
      <div className="ctas">
        <Button kind="primary" large>Solicitar demo <Icons.Arrow size={16}/></Button>
        <Button kind="secondary" large>Ver cómo funciona</Button>
      </div>

      <div className="hero-visual">
        <div className="hero-form-demo">
          <div className="form-mock" aria-hidden="true">
            <div className="row label"></div>
            <div className="row fill"></div>
            <div className="row label" style={{ width: "22%" }}></div>
            <div className="row fill r2"></div>
            <div className="row fill r2" style={{ width: "70%" }}></div>
            <div className="row label" style={{ width: "30%" }}></div>
            <div className="row fill r3"></div>
            <div className="row fill r3" style={{ width: "85%" }}></div>
            <div className="row fill r4" style={{ width: "55%" }}></div>
          </div>
          <div className="hero-waves">
            <div className="bar"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
            <div className="step-label">ESCUCHANDO · ONYX local</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------- Generic section header ----------
const SectionHeader = ({ kicker, title, lede, kickerColor }) => (
  <>
    {kicker && <Eyebrow color={kickerColor}>{kicker}</Eyebrow>}
    <h2 className="section-title">{title}</h2>
    {lede && <p className="section-lede">{lede}</p>}
  </>
);

// ---------- 02 Problem ----------
const Problem = () => (
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

// ---------- 03 Costo real ----------
const CostStats = () => (
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

// ---------- 04 A quién afecta ----------
const Affected = () => {
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

// ---------- 05 Solución (sticky, scroll-driven) ----------
const Solution = () => {
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
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      const idx = Math.min(states.length - 1, Math.floor(p * states.length * 0.999));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section" id="solucion" ref={wrapRef} style={{ minHeight: "260vh" }}>
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
            {/* WAVE */}
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
                  <div className="step-label" style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-muted)" }}>QWEN 2.5 · ESTRUCTURADO</div>
                </div>
              )}
              {active === 2 && (
                <div className="sv-step active" style={{ width: "100%" }}>
                  <div className="hero-form-demo" style={{ padding: 0, gridTemplateColumns: "1fr" }}>
                    <div className="form-mock">
                      <div className="row label"></div>
                      <div className="row fill" style={{ '--p': '90%' }}></div>
                      <div className="row label" style={{ width: "30%" }}></div>
                      <div className="row fill r2"></div>
                      <div className="row fill r3" style={{ width: "70%" }}></div>
                    </div>
                    <div className="step-label" style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green)" }}>INYECTADO EN DINÁMICA GERENCIAL</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- 06 Por qué funciona ----------
const WhyDifferent = () => {
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

// ---------- 07 Antes y después — horizontal sticky scroll ----------
const BeforeAfter = () => {
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

// ---------- 08 Beneficio por rol ----------
const Roles = () => {
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

// ---------- 09 ONYX vs Cloud ----------
const OnyxVsCloud = () => (
  <section className="section" id="cumplimiento">
    <div className="container">
      <SectionHeader
        kicker="08 · ONYX vs Nube"
        title="El audio de un paciente nunca debe salir de su clínica."
        lede="Sobre 8.800 consultas/mes, así se compara IA local con IA en nube."
      />
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
          <h4>Whisper + Qwen 2.5 sobre Ollama</h4>
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

// ---------- 10 Planes ----------
const Pricing = () => {
  const plans = [
    {
      name: "Ala de Especialistas", scope: "Hasta 20 consultorios", price: "$48.000.000",
      points: ["Instalación on-site en su red", "Capacitación a médicos y soporte de IT", "12 meses de soporte y actualizaciones", "Mapeo automático del HIS"],
    },
    {
      name: "Clínica Integral", scope: "Hasta 40 consultorios", price: "$90.000.000",
      recommended: true,
      points: ["Todo lo del plan anterior", "Configuración multi-especialidad", "Auditoría de cumplimiento incluida", "Tablero de operación para IT clínico"],
    },
    {
      name: "Red Hospitalaria 24/7", scope: "80+ consultorios", price: "$180.000.000",
      points: ["Todo lo del plan anterior", "Clúster ONYX redundante con failover", "SLA de operación 24/7", "Onboarding por sede"],
    },
  ];
  return (
    <section className="section" id="planes">
      <div className="container">
        <SectionHeader kicker="09 · Planes" title="Tres tamaños, una filosofía: cero nube." />
        <div className="pricing">
          {plans.map((p) => (
            <div key={p.name} className={`plan${p.recommended ? " recommended" : ""}`}>
              {p.recommended && <span className="ribbon">Recomendado</span>}
              <h3>{p.name}</h3>
              <p className="scope">{p.scope}</p>
              <div className="price">{p.price}<span className="cop">COP · pago único</span></div>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}><Icons.Check size={16} className="check"/>{pt}</li>
                ))}
              </ul>
              <Button kind={p.recommended ? "primary" : "secondary"}>Solicitar demo</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- 11/12 Decisión + Final CTA ----------
const FinalCTA = () => (
  <section className="section">
    <div className="container">
      <SectionHeader
        kicker="10 · El momento de decidir"
        title="Las clínicas que adopten esto primero definirán el estándar de atención de la región."
        lede="Sin urgencia falsa. Sin oferta limitada. Una decisión ejecutiva sobre cómo se trabaja en su institución durante los próximos cinco años."
      />
      <div className="final-cta">
        <div>
          <h3>Hable con un asesor.</h3>
          <p>Le mostramos una instalación piloto sobre Dinámica Gerencial en su propia red. Sin compromiso.</p>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 10, color: "var(--fg-muted)", fontSize: 14 }}><Icons.Shield size={18}/> Cumple Ley 1581 de 2012 y Resolución 1995 de 1999.</div>
            <div style={{ display: "flex", gap: 10, color: "var(--fg-muted)", fontSize: 14 }}><Icons.CloudOff size={18}/> Cero conexión a internet requerida para operar.</div>
            <div style={{ display: "flex", gap: 10, color: "var(--fg-muted)", fontSize: 14 }}><Icons.Server size={18}/> Instalación en su red, sobre hardware certificado.</div>
          </div>
        </div>
        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
          <label className="full">Institución <input placeholder="p. ej. Clínica del Country"/></label>
          <label>Ciudad <input placeholder="Bogotá"/></label>
          <label>Consultorios <input placeholder="20"/></label>
          <label className="full">Contacto (correo o teléfono) <input placeholder="director@clinica.co · +57 …"/></label>
          <div className="submit-row">
            <span className="reply-note">Un asesor lo contactará en menos de 24 horas hábiles.</span>
            <Button kind="primary">Enviar solicitud <Icons.Arrow size={16}/></Button>
          </div>
        </form>
      </div>
    </div>
  </section>
);

// ---------- Footer ----------
const Footer = () => (
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
          <h6>Contacto</h6>
          <ul>
            <li>contacto@watson.health</li><li>+57 (1) 000 0000</li><li>Bogotá · Medellín · Cali</li>
          </ul>
        </div>
      </div>
      <div className="legal">
        <span>© 2026 WATSON. Todos los derechos reservados.</span>
        <span>ONYX — motor de IA local. Whisper + Qwen 2.5 sobre Ollama.</span>
      </div>
    </div>
  </footer>
);

// Export all to global so landing.jsx can pick them up
Object.assign(window, {
  WATSONIcons: Icons,
  WATSONHeader: Header,
  WATSONHero: Hero,
  WATSONProblem: Problem,
  WATSONCostStats: CostStats,
  WATSONAffected: Affected,
  WATSONSolution: Solution,
  WATSONWhyDifferent: WhyDifferent,
  WATSONBeforeAfter: BeforeAfter,
  WATSONRoles: Roles,
  WATSONOnyxVsCloud: OnyxVsCloud,
  WATSONPricing: Pricing,
  WATSONFinalCTA: FinalCTA,
  WATSONFooter: Footer,
  WATSONButton: Button,
});
