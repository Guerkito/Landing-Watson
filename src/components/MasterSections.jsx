import React, { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons.jsx";
import Marquee from "./Marquee.jsx";
import { whatsappUrl, CONTACT } from "../lib/contact.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// ─── Design tokens (local) ───────────────────────────────────────────────────
const C = {
  navy:    "#060E1A",
  mid:     "#0D1B2A",
  card:    "#0F1E30",
  border:  "rgba(255,255,255,0.07)",
  cobalt:  "#0057FF",
  cyan:    "#00D4FF",
  green:   "#00DF81",
  amber:   "#FFAA00",
  red:     "#FF4444",
  white:   "#FFFFFF",
  muted:   "#8B9EC7",
  mono:    "'Space Mono', 'Geist Mono', monospace",
  sans:    "'Space Grotesk', 'Geist', sans-serif",
};

// ─── Primitives ───────────────────────────────────────────────────────────────

/** clearstreet.io 1px-gap grid */
const Grid = ({ cols = 2, children, style }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: "1px",
    background: C.border,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    overflow: "hidden",
    ...style,
  }}>
    {children}
  </div>
);

const Cell = ({ children, style }) => (
  <div style={{ background: C.card, ...style }}>{children}</div>
);

const Label = ({ children, color = C.muted, style }) => (
  <p style={{ fontFamily: C.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color, margin: 0, ...style }}>
    {children}
  </p>
);

const SectionTag = ({ children, color = C.cobalt }) => (
  <p style={{ fontFamily: C.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color, margin: "0 0 18px" }}>
    {children}
  </p>
);

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, delay, ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
};

const useSpotlight = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = e => {
      const { left, top } = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - left}px`);
      el.style.setProperty("--my", `${e.clientY - top}px`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);
  return ref;
};

// Spotlight CSS must be in global.css — inline fallback
const spotStyle = {
  position: "relative",
  overflow: "hidden",
};
const SpotOverlay = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
    background: "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(0,87,255,0.07), transparent 50%)",
  }} />
);

// ─── Animated Demo ────────────────────────────────────────────────────────────

const SCRIPT = [
  "Paciente masculino, 45 años...",
  "Paciente masculino, 45 años, dolor lumbar 3 semanas, sin mejoría a manejo conservador.",
  "Signo de Lasègue positivo a 45°. Diagnóstico M54.5. Formulo acetaminofén 500mg c/8h por 5 días.",
];

const FORM_FIELDS = [
  { label: "Motivo de consulta",  value: "Dolor lumbar con irradiación a pierna derecha, 3 semanas" },
  { label: "Diagnóstico CIE-10",  value: "M54.5 — Lumbago con ciática" },
  { label: "TA (mmHg)",           value: "130/85",     half: true },
  { label: "FC (lpm)",            value: "78 lpm",     half: true },
  { label: "Medicamento",         value: "Acetaminofén 500mg c/8h × 5 días" },
];

const AnimatedDemo = () => {
  const transcriptRef = useRef(null);
  const statusRef = useRef(null);
  const fieldRefs = useRef([]);

  useEffect(() => {
    let dead = false;
    let tIdx = 0;

    const wait = ms => new Promise(r => setTimeout(r, ms));

    const loop = async () => {
      while (!dead) {
        const txt = SCRIPT[tIdx % SCRIPT.length];
        // type
        for (let i = 0; i <= txt.length && !dead; i++) {
          if (transcriptRef.current) transcriptRef.current.textContent = txt.slice(0, i);
          await wait(26 + Math.random() * 18);
        }
        if (dead) break;
        // processing state
        if (statusRef.current) statusRef.current.style.opacity = "1";
        await wait(900);
        if (dead) break;
        if (statusRef.current) statusRef.current.style.opacity = "0";
        // fill fields
        for (let i = 0; i < fieldRefs.current.length && !dead; i++) {
          const el = fieldRefs.current[i];
          if (!el) continue;
          el.dataset.state = "filling";
          await wait(320);
          if (dead) break;
          el.textContent = FORM_FIELDS[i].value;
          el.dataset.state = "filled";
        }
        await wait(2600);
        if (dead) break;
        // reset
        if (transcriptRef.current) transcriptRef.current.textContent = "";
        fieldRefs.current.forEach(el => { if (el) { el.textContent = ""; el.dataset.state = ""; } });
        tIdx++;
        await wait(600);
      }
    };

    const t = setTimeout(loop, 800);
    return () => { dead = true; clearTimeout(t); };
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 940, marginTop: 64 }}>
      <div style={{ background: C.card, border: `1px solid rgba(0,87,255,0.22)`, borderRadius: 18, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,87,255,0.14)" }}>
        {/* Header — clearstreet style, no colored dots */}
        <div style={{ background: C.mid, padding: "11px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Label>Dinámica Gerencial · Historia Clínica · HC #00847</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icons.DotFill size={7} color={C.green} />
            <Label color={C.green}>Watson activo</Label>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 300 }}>
          {/* Left — audio */}
          <div style={{ padding: 28, borderRight: `1px solid ${C.border}` }}>
            <Label color={C.muted} style={{ marginBottom: 14 }}>Audio de consulta</Label>
            <div style={{ display: "flex", alignItems: "center", gap: 3, height: 40, marginBottom: 16 }}>
              {[10,26,18,36,22,40,16,30,12,24,34,8,28].map((h, i) => (
                <div key={i} style={{ width: 4, borderRadius: 3, background: C.cobalt, height: h, animation: `demo-wave 1.1s ease-in-out ${i * 0.06}s infinite alternate` }} />
              ))}
            </div>
            <div style={{ background: "rgba(0,87,255,0.07)", border: `1px solid rgba(0,87,255,0.18)`, borderRadius: 10, padding: "12px 14px", minHeight: 72, fontSize: 13, lineHeight: 1.65, color: "#CBD5E1", position: "relative" }}>
              <span ref={transcriptRef} />
              <span style={{ display: "inline-block", width: 2, height: 13, background: C.cyan, marginLeft: 1, verticalAlign: "middle", animation: "demo-blink 1s infinite" }} />
            </div>
            <div ref={statusRef} style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 12, fontSize: 12, color: C.green, opacity: 0, transition: "opacity 0.3s" }}>
              <Icons.DotFill size={6} color={C.green} />
              <Label color={C.green}>Watson procesando</Label>
            </div>
          </div>

          {/* Right — HC fields */}
          <div style={{ padding: 28 }}>
            <Label color={C.muted} style={{ marginBottom: 14 }}>Historia clínica — llenándose automáticamente</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* field 0 */}
              <FieldSlot label={FORM_FIELDS[0].label} index={0} fieldRefs={fieldRefs} />
              {/* field 1 */}
              <FieldSlot label={FORM_FIELDS[1].label} index={1} fieldRefs={fieldRefs} />
              {/* fields 2+3 side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <FieldSlot label={FORM_FIELDS[2].label} index={2} fieldRefs={fieldRefs} />
                <FieldSlot label={FORM_FIELDS[3].label} index={3} fieldRefs={fieldRefs} />
              </div>
              {/* field 4 */}
              <FieldSlot label={FORM_FIELDS[4].label} index={4} fieldRefs={fieldRefs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FieldSlot = ({ label, index, fieldRefs }) => (
  <div>
    <Label color={C.muted} style={{ marginBottom: 4, fontSize: 10 }}>{label}</Label>
    <div
      ref={el => { fieldRefs.current[index] = el; }}
      style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 7, padding: "8px 10px", fontSize: 12, color: C.white, minHeight: 34, transition: "border-color 0.3s, background 0.3s" }}
      data-state=""
      onTransitionEnd={() => {}} // keep react happy
    />
  </div>
);

// CSS for field states — injected once
const DEMO_STYLE = `
  [data-state="filling"] { border-color: rgba(0,212,255,0.45) !important; background: rgba(0,212,255,0.06) !important; }
  [data-state="filled"]  { border-color: rgba(0,223,129,0.38) !important; background: rgba(0,223,129,0.05) !important; }
  @keyframes demo-wave  { from { height: 8px; } to { height: 38px; } }
  @keyframes demo-blink { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }
`;

// ─── HIS Mockup ───────────────────────────────────────────────────────────────

const HisMockup = () => {
  const [tab, setTab] = useState(0);
  const tabs = ["Anamnesis", "Constantes", "Diagnóstico", "Órdenes"];
  return (
    <div style={{ position: "relative" }}>
      <div style={{ background: C.card, border: `1px solid rgba(0,87,255,0.18)`, borderRadius: 16, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
        {/* topbar */}
        <div style={{ background: C.mid, padding: "10px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Label>DGH · Consulta Externa · HC #00847</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Icons.DotFill size={6} color={C.green} />
            <Label color={C.green}>Watson activo</Label>
          </div>
        </div>
        {/* tabs */}
        <div style={{ display: "flex", gap: 3, margin: "16px 18px 0", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 4 }}>
          {tabs.map((t, i) => (
            <div key={i} onClick={() => setTab(i)} style={{ flex: 1, padding: "6px", textAlign: "center", fontFamily: C.sans, fontSize: 11, fontWeight: 500, borderRadius: 6, cursor: "pointer", background: tab === i ? C.cobalt : "transparent", color: tab === i ? C.white : C.muted, transition: "all 0.2s" }}>
              {t}
            </div>
          ))}
        </div>
        {/* fields */}
        <div style={{ padding: "16px 18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Motivo de consulta", value: "Dolor lumbar con irradiación a pierna derecha, 3 semanas de evolución", full: true },
            { label: "Enfermedad actual",  value: "Paciente masculino 45 años con lumbalgia progresiva. Lasègue positivo a 45°. Sin mejoría a manejo conservador...", full: true, small: true },
          ].map((f, i) => (
            <div key={i}>
              <Label style={{ fontSize: 10, marginBottom: 4 }}>{f.label}</Label>
              <div style={{ background: "rgba(0,223,129,0.05)", border: "1px solid rgba(0,223,129,0.32)", borderRadius: 6, padding: "8px 10px", fontSize: f.small ? 11 : 12, color: C.white, lineHeight: 1.5 }}>{f.value}</div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[["TA","130/85",false],["FC","78 lpm",false],["CIE-10","M54.5",true]].map(([l,v,blue],i) => (
              <div key={i}>
                <Label style={{ fontSize: 10, marginBottom: 4 }}>{l}</Label>
                <div style={{ background: blue ? "rgba(0,87,255,0.07)" : "rgba(0,223,129,0.05)", border: `1px solid ${blue ? "rgba(0,87,255,0.3)" : "rgba(0,223,129,0.32)"}`, borderRadius: 6, padding: "7px 10px", fontSize: 12, color: blue ? C.cyan : C.white }}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            <Label style={{ fontSize: 10, marginBottom: 4 }}>Justificación clínica</Label>
            <div style={{ background: "rgba(0,223,129,0.05)", border: "1px solid rgba(0,223,129,0.32)", borderRadius: 6, padding: "8px 10px", fontSize: 11, color: C.white, lineHeight: 1.4 }}>Lumbago con déficit neurológico sin mejoría a manejo conservador por 3 semanas — Res. 2706/2025</div>
          </div>
        </div>
      </div>
      {/* floating confidence badge */}
      <div style={{ position: "absolute", bottom: 18, right: 18, background: C.cobalt, borderRadius: 10, padding: "9px 14px", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, boxShadow: "0 8px 28px rgba(0,87,255,0.45)", animation: "widget-float 3s ease-in-out infinite", fontFamily: C.sans }}>
        <Icons.Check size={14} color={C.white} />
        Watson · 94 / 100
      </div>
    </div>
  );
};

// ─── Audit Dashboard ──────────────────────────────────────────────────────────

const STATUS_COLOR = { red: C.red, amber: C.amber, green: C.green };

const AuditRows = [
  { status: "red",   hc: "HC-001 — M54.5", score: 45, value: "$2.890.000" },
  { status: "red",   hc: "HC-003 — I10",   score: 52, value: "$1.240.000" },
  { status: "amber", hc: "HC-007 — E119",  score: 67, value: "$340.000"   },
  { status: "amber", hc: "HC-012 — J069",  score: 71, value: "$180.000"   },
  { status: "green", hc: "HC-018 — K219",  score: 94, value: "$0"         },
];

const AuditDashboard = () => (
  <div style={{ background: C.card, border: `1px solid rgba(255,170,0,0.18)`, borderRadius: 16, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
    {/* header */}
    <div style={{ background: C.mid, padding: "12px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Label>Lote: Hospital San Jorge — Mayo 2026 (100 HCs)</Label>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Icons.AlertTriangle size={12} color={C.amber} />
        <Label color={C.amber}>$18.4M en riesgo</Label>
      </div>
    </div>
    {/* rows */}
    <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 7 }}>
      {AuditRows.map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "11px 13px", transition: "background 0.2s", cursor: "default" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
        >
          <Icons.DotFill size={8} color={STATUS_COLOR[r.status]} />
          <span style={{ fontFamily: C.sans, fontSize: 12, fontWeight: 600, color: C.white, flex: 1 }}>{r.hc}</span>
          {/* score bar */}
          <div style={{ width: 60, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${r.score}%`, background: STATUS_COLOR[r.status], borderRadius: 2 }} />
          </div>
          <Label color={C.muted} style={{ width: 36, textAlign: "right" }}>{r.score}/100</Label>
          <span style={{ fontFamily: C.mono, fontSize: 12, fontWeight: 700, color: STATUS_COLOR[r.status], width: 88, textAlign: "right" }}>{r.value}</span>
        </div>
      ))}
    </div>
    {/* footer */}
    <div style={{ padding: "12px 18px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Label>Total en riesgo:</Label>
        <span style={{ fontFamily: C.mono, fontSize: 13, fontWeight: 700, color: C.red }}>$18.4M COP</span>
      </div>
      <button style={{ background: "rgba(255,170,0,0.1)", color: C.amber, border: `1px solid rgba(255,170,0,0.28)`, borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: C.sans, display: "flex", alignItems: "center", gap: 6 }}>
        <Icons.FileUp size={13} color={C.amber} />
        Exportar Excel
      </button>
    </div>
  </div>
);

// ─── Header ──────────────────────────────────────────────────────────────────

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 60px", background: scrolled ? "rgba(6,14,26,0.94)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: `1px solid ${scrolled ? "rgba(0,87,255,0.14)" : "transparent"}`, transition: "background 0.35s, border-color 0.35s" }}>
      <div style={{ fontFamily: C.mono, fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>
        {"{ "}<span style={{ color: C.cyan }}>WATSON</span>{" }"}
      </div>
      <nav style={{ display: "flex", gap: 36 }}>
        {[["#como-funciona","Cómo funciona"],["#watson-medico","Watson Médico"],["#watson-auditor","Watson Auditor"],["#planes","Planes"]].map(([href, label]) => (
          <a key={href} href={href} style={{ fontFamily: C.sans, fontSize: 14, fontWeight: 500, color: C.muted, transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = C.white}
            onMouseLeave={e => e.target.style.color = C.muted}
          >{label}</a>
        ))}
      </nav>
      <a href={whatsappUrl()} style={{ background: C.cobalt, color: C.white, border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: C.sans, transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8 }}
        onMouseEnter={e => { e.currentTarget.style.background = "#2979FF"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.cobalt; e.currentTarget.style.transform = "translateY(0)"; }}>
        Solicitar demo <Icons.Arrow size={14} color={C.white} />
      </a>
    </header>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const Hero = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    let text;
    const ctx = gsap.context(() => {
      text = new SplitType(titleRef.current, { types: "chars,words" });
      gsap.from(text.chars, { y: 72, opacity: 0, stagger: 0.013, duration: 1.35, ease: "expo.out", delay: 0.15 });
      gsap.from(".hero-fade", { y: 22, opacity: 0, stagger: 0.09, duration: 0.9, delay: 0.9, ease: "expo.out" });
    }, titleRef);
    return () => { if (text) text.revert(); ctx.revert(); };
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 60px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* ambient glow */}
      <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", width: 760, height: 480, background: "radial-gradient(ellipse, rgba(0,87,255,0.16) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* badge */}
      <div className="hero-fade" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,87,255,0.1)", border: "1px solid rgba(0,87,255,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
        <Icons.DotFill size={6} color={C.cyan} />
        <Label color={C.cyan}>Inteligencia Clínica Ambiental · Colombia 2026</Label>
      </div>

      {/* headline — SplitType */}
      <div ref={titleRef}>
        <h1 style={{ fontSize: "clamp(44px, 6.5vw, 84px)", fontFamily: C.sans, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.03em", maxWidth: 860, margin: "0 auto" }}>
          El médico habla.<br />
          <span style={{ color: C.cyan }}>Watson llena todo.</span>
        </h1>
      </div>

      {/* sub */}
      <p className="hero-fade" style={{ marginTop: 24, maxWidth: 560, fontSize: 18, color: C.muted, lineHeight: 1.65, fontFamily: C.sans }}>
        Transcripción clínica con IA que inyecta datos en su HIS en tiempo real. Sin teclado. Sin errores. Sin glosas.
      </p>

      {/* CTAs */}
      <div className="hero-fade" style={{ display: "flex", gap: 12, marginTop: 36, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="#watson-medico" style={{ background: C.cobalt, color: C.white, borderRadius: 10, padding: "15px 30px", fontSize: 16, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: C.sans, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#2979FF"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,87,255,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.cobalt; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
          Ver cómo funciona <Icons.Arrow size={16} color={C.white} />
        </a>
        <a href="#planes" style={{ background: "transparent", color: C.white, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "15px 30px", fontSize: 16, fontWeight: 600, fontFamily: C.sans, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}>
          Ver planes
        </a>
      </div>

      {/* animated demo */}
      <AnimatedDemo />
    </section>
  );
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export const StatsBand = () => {
  const stats = [
    { num: "7 min", sub: "→ 90 seg", label: "Por historia clínica" },
    { num: "130+",                    label: "Clínicas en Colombia usan DGH" },
    { num: "99%",                     label: "Precisión de extracción clínica" },
    { num: "0",                       label: "Datos del paciente salen del hospital" },
  ];
  return (
    <Reveal>
      <div style={{ background: C.mid, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "56px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1100, margin: "0 auto" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 28px", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ fontFamily: C.mono, fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, letterSpacing: -2, background: `linear-gradient(135deg, ${C.white}, ${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
                {s.num}{s.sub && <span style={{ fontSize: "0.45em", verticalAlign: "middle", marginLeft: 6, color: C.muted, WebkitTextFillColor: C.muted }}>{s.sub}</span>}
              </div>
              <p style={{ fontFamily: C.sans, fontSize: 13, color: C.muted, marginTop: 8 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

// ─── Problema ─────────────────────────────────────────────────────────────────

const PROBLEMS = [
  { Icon: Icons.Clock,         title: "Tiempo perdido en digitación",  desc: "7 minutos promedio por HC. Un médico de 20 consultas pierde 2.3 h diarias solo en registro — no en pacientes." },
  { Icon: Icons.AlertTriangle, title: "Glosas por HC incompleta",      desc: "El 73% de las glosas ocurren por campos vacíos o sin justificación clínica. Dinero que la EPS no paga." },
  { Icon: Icons.FileCheck,     title: "MIPRES: el doble trabajo",      desc: "El médico completa DGH y vuelve a llenar MIPRES manualmente. 8 minutos extras por cada medicamento No PBS." },
];

export const Problema = () => {
  const spotRefs = [useSpotlight(), useSpotlight(), useSpotlight()];
  return (
    <section style={{ padding: "100px 60px", background: C.mid }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <Reveal>
            <SectionTag>El problema</SectionTag>
            <h2 style={{ fontFamily: C.sans, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.028em", lineHeight: 1.08, maxWidth: "14ch" }}>
              Sus médicos pierden 2 horas al día tecleando
            </h2>
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.65, color: C.muted, fontFamily: C.sans, maxWidth: "44ch" }}>
              Cada historia clínica tarda entre 5 y 12 minutos de digitación pura. Multiplicado por 20 pacientes al día, el médico dedica el 30% de su jornada al teclado.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PROBLEMS.map((p, i) => {
                const ref = spotRefs[i];
                return (
                  <div key={i} ref={ref} style={{ ...spotStyle, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 24px", display: "flex", gap: 16, alignItems: "flex-start", transition: "border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,87,255,0.3)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                  >
                    <SpotOverlay />
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <p.Icon size={18} color={C.red} />
                    </div>
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <h4 style={{ fontFamily: C.sans, fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 5 }}>{p.title}</h4>
                      <p style={{ fontFamily: C.sans, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ─── Cómo Funciona ────────────────────────────────────────────────────────────

const STEPS = [
  { Icon: Icons.Mic,       num: "01", title: "Médico habla",    desc: "Conduce la consulta con normalidad. Watson escucha en segundo plano a través del micrófono." },
  { Icon: Icons.Cpu,       num: "02", title: "IA procesa",      desc: "Faster-Whisper transcribe el audio. Qwen 2.5 extrae los datos clínicos estructurados en JSON." },
  { Icon: Icons.Shield,    num: "03", title: "Validación",      desc: "Sistema 2 verifica alergias, cruces farmacológicos y coherencia CIE-10 + CUPS antes de inyectar." },
  { Icon: Icons.CheckCircle, num: "04", title: "HC completa",   desc: "Todos los campos llenos en DGH. MIPRES autocompletado. El médico revisa y aprueba con un clic." },
];

export const ComoFunciona = () => (
  <section id="como-funciona" style={{ padding: "100px 60px", background: C.navy }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <SectionTag style={{ justifyContent: "center", display: "flex" }}>Cómo funciona</SectionTag>
          <h2 style={{ fontFamily: C.sans, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.028em", margin: "0 auto", maxWidth: "24ch" }}>
            De la voz a la historia clínica en 90 segundos
          </h2>
          <p style={{ marginTop: 14, fontSize: 17, color: C.muted, maxWidth: 480, margin: "14px auto 0", fontFamily: C.sans }}>
            Sin instalaciones complejas. Sin cambiar el flujo del médico.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <Grid cols={4}>
          {STEPS.map((s, i) => (
            <Cell key={i} style={{ padding: "40px 28px" }}>
              <Label color={C.cobalt} style={{ marginBottom: 20 }}>PASO {s.num}</Label>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(0,87,255,0.1)", border: "1px solid rgba(0,87,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <s.Icon size={22} color={C.cobalt} />
              </div>
              <h4 style={{ fontFamily: C.sans, fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 10 }}>{s.title}</h4>
              <p style={{ fontFamily: C.sans, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{s.desc}</p>
            </Cell>
          ))}
        </Grid>
      </Reveal>
    </div>
  </section>
);

// ─── Watson Médico ────────────────────────────────────────────────────────────

const MEDICO_FEATURES = [
  { Icon: Icons.Stethoscope, title: "Integración nativa con DGH",          desc: "Inyecta directamente en el HIS más usado en Colombia. Sin API, sin servidores externos. 100% local." },
  { Icon: Icons.Clipboard,   title: "Justificación CIE-10 + CUPS automática", desc: "Cada examen sale con su justificación clínica. El principal motivo de glosa, eliminado." },
  { Icon: Icons.FileCheck,   title: "Puente MIPRES — un solo clic",        desc: "Detecta medicamentos No PBS y autocompleta el portal del MinSalud. El médico solo hace clic en Guardar." },
  { Icon: Icons.Shield,      title: "Guardián Clínico integrado",          desc: "Antes de guardar, Watson verifica 50+ indicadores del SOGCS y bloquea errores que generarían glosas." },
];

export const WatsonMedico = () => (
  <section id="watson-medico" style={{ padding: "100px 60px", background: C.mid }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
      <Reveal>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.09)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
          <Icons.Stethoscope size={13} color={C.cyan} />
          <Label color={C.cyan}>Producto principal</Label>
        </div>
        <h2 style={{ fontFamily: C.sans, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.028em" }}>Watson Médico</h2>
        <p style={{ fontFamily: C.sans, marginTop: 16, fontSize: 17, lineHeight: 1.65, color: C.muted, maxWidth: "42ch" }}>
          Convierte la voz del médico en una historia clínica completa, validada y lista para facturar.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36 }}>
          {MEDICO_FEATURES.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,223,129,0.1)", border: "1px solid rgba(0,223,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <f.Icon size={17} color={C.green} />
              </div>
              <div>
                <h4 style={{ fontFamily: C.sans, fontSize: 14, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 4 }}>{f.title}</h4>
                <p style={{ fontFamily: C.sans, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <HisMockup />
      </Reveal>
    </div>
  </section>
);

// ─── Watson Auditor ───────────────────────────────────────────────────────────

const AUDITOR_FEATURES = [
  { Icon: Icons.FileUp,   title: "Carga masiva desde PDF",                desc: "Sube el lote con 100 HCs. Watson las separa, analiza contra 80 indicadores SOGCS y genera el semáforo en minutos." },
  { Icon: Icons.FilePen,  title: "Cartas de contestación automáticas",    desc: "Por cada glosa confirmada, genera la carta legal con sustento CIE-10 + CUPS + resolución del MinSalud." },
  { Icon: Icons.Users,    title: "Gestión multi-cliente enterprise",       desc: "Firmas auditoras con múltiples IPS como clientes. Asignación de lotes por auditor y métricas por equipo." },
  { Icon: Icons.BarChart, title: "Dashboard de recuperación de cartera",  desc: "Valor en riesgo, confirmado, contestado y recuperado. El director ve el ROI del equipo en tiempo real." },
];

export const WatsonAuditor = () => {
  const sr0 = useSpotlight();
  const sr1 = useSpotlight();
  const sr2 = useSpotlight();
  const sr3 = useSpotlight();
  const spotRefs = [sr0, sr1, sr2, sr3];
  return (
    <section id="watson-auditor" style={{ padding: "100px 60px", background: C.navy }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,170,0,0.09)", border: "1px solid rgba(255,170,0,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
            <Icons.Search size={13} color={C.amber} />
            <Label color={C.amber}>Producto complementario</Label>
          </div>
          <h2 style={{ fontFamily: C.sans, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.028em" }}>Watson Auditor</h2>
          <p style={{ fontFamily: C.sans, marginTop: 16, fontSize: 17, lineHeight: 1.65, color: C.muted, maxWidth: "52ch" }}>
            Para firmas auditoras, IPS y EPS que necesitan revisar cientos de historias clínicas y detectar glosas antes de que sean un problema.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 52, alignItems: "start" }}>
          <Reveal>
            <AuditDashboard />
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {AUDITOR_FEATURES.map((f, i) => {
                const ref = spotRefs[i];
                return (
                  <div key={i} ref={ref} style={{ ...spotStyle, background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start", transition: "border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,170,0,0.28)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                  >
                    <SpotOverlay />
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,170,0,0.1)", border: "1px solid rgba(255,170,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <f.Icon size={17} color={C.amber} />
                    </div>
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <h4 style={{ fontFamily: C.sans, fontSize: 14, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 4 }}>{f.title}</h4>
                      <p style={{ fontFamily: C.sans, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ─── Pricing ─────────────────────────────────────────────────────────────────

const PLANS = [
  { name: "Ala de Especialistas", price: "$28M", sub: "COP · pago único",
    features: ["15 consultorios simultáneos", "Servidor + 15 micrófonos", "1 formato DGH", "Soporte 12 meses", "Watson Médico completo"] },
  { name: "Clínica Integral", price: "$48M", sub: "COP · pago único", featured: true,
    features: ["30 consultorios simultáneos", "Servidor alto rendimiento + 30 micrófonos", "3 formatos DGH por especialidad", "Soporte prioritario 12 meses", "Watson Médico + Auditor interno", "Dashboard gerencial"] },
  { name: "Red Hospitalaria", price: "$75M", sub: "COP · pago único",
    features: ["50+ consultorios", "Clúster 2 servidores + UPS", "Formatos ilimitados", "Soporte 24/7 con SLA", "Watson Médico + Auditor completo", "Estadísticas epidemiológicas"] },
];

export const Pricing = () => (
  <section id="planes" style={{ padding: "100px 60px", background: C.mid }}>
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionTag style={{ justifyContent: "center", display: "flex" }}>Planes</SectionTag>
          <h2 style={{ fontFamily: C.sans, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.028em" }}>Inversión única. ROI inmediato.</h2>
          <p style={{ marginTop: 14, fontSize: 17, color: C.muted, maxWidth: 480, margin: "14px auto 0", fontFamily: C.sans }}>
            Hardware incluido. Instalación y capacitación sin costo adicional.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {PLANS.map((p, i) => (
            <div key={i} style={{ position: "relative", background: p.featured ? "linear-gradient(135deg, rgba(0,87,255,0.12), rgba(15,30,48,1))" : C.card, border: `1px solid ${p.featured ? "rgba(0,87,255,0.45)" : C.border}`, borderRadius: 18, padding: "36px 28px", transition: "transform 0.3s", boxShadow: p.featured ? "0 20px 60px rgba(0,87,255,0.18)" : "none" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {p.featured && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.cobalt, color: C.white, borderRadius: 100, padding: "4px 16px", fontFamily: C.mono, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                  Más popular
                </div>
              )}
              <Label style={{ marginBottom: 12 }}>{p.name}</Label>
              <div style={{ fontFamily: C.mono, fontSize: 38, fontWeight: 700, letterSpacing: -1, lineHeight: 1, color: C.white }}>{p.price}</div>
              <p style={{ fontFamily: C.sans, fontSize: 13, color: C.muted, marginTop: 4, marginBottom: 22 }}>{p.sub}</p>
              <div style={{ height: 1, background: C.border, marginBottom: 18 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Icons.Check size={14} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontFamily: C.sans, fontSize: 13, color: C.muted }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href={whatsappUrl(`Hola, quiero cotizar el plan ${p.name} de WATSON.`)} style={{ display: "block", textAlign: "center", marginTop: 28, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: C.sans, background: p.featured ? C.cobalt : "transparent", border: `1px solid ${p.featured ? "transparent" : "rgba(255,255,255,0.2)"}`, color: C.white, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = p.featured ? "#2979FF" : "rgba(255,255,255,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = p.featured ? C.cobalt : "transparent"; }}>
                Solicitar cotización
              </a>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={{ textAlign: "center", marginTop: 28, fontFamily: C.sans, fontSize: 14, color: C.muted }}>
          Watson Auditor para su firma auditora:{" "}
          <a href="#watson-auditor" style={{ color: C.cyan }}>ver producto enterprise</a>
        </p>
      </Reveal>
    </div>
  </section>
);

// ─── CTA final ────────────────────────────────────────────────────────────────

export const FinalCTA = () => (
  <section style={{ padding: "120px 60px", textAlign: "center", position: "relative", overflow: "hidden", background: C.navy }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,87,255,0.12) 0%, transparent 68%)", pointerEvents: "none" }} />
    <div style={{ position: "relative" }}>
      <Reveal>
        <h2 style={{ fontFamily: C.sans, fontSize: "clamp(36px,5.5vw,68px)", letterSpacing: "-0.032em", maxWidth: 680, margin: "0 auto", lineHeight: 1.04 }}>
          Listo para que Watson llene las historias clínicas{" "}
          <span style={{ color: C.cyan }}>por usted?</span>
        </h2>
        <p style={{ marginTop: 24, maxWidth: 460, margin: "24px auto 0", fontSize: 18, color: C.muted, lineHeight: 1.65, fontFamily: C.sans }}>
          Le mostramos la demo en vivo en su instalación de Dinámica Gerencial. 20 minutos. Sin compromisos.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
          <a href={whatsappUrl("Hola, quiero agendar una demo gratuita de WATSON.")} style={{ background: C.cobalt, color: C.white, borderRadius: 10, padding: "17px 34px", fontSize: 16, fontWeight: 600, fontFamily: C.sans, display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#2979FF"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,87,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.cobalt; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            Agendar demo gratuita <Icons.Arrow size={16} color={C.white} />
          </a>
          <a href={whatsappUrl()} style={{ background: "transparent", color: C.white, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "17px 34px", fontSize: 16, fontWeight: 600, fontFamily: C.sans, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}>
            Escribir por WhatsApp
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

export const Footer = () => (
  <footer style={{ padding: "36px 60px", borderTop: `1px solid ${C.border}`, background: C.mid, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ fontFamily: C.mono, fontSize: 17, fontWeight: 700 }}>
      {"{ "}<span style={{ color: C.cyan }}>WATSON</span>{" }"}
    </div>
    <p style={{ fontFamily: C.sans, fontSize: 13, color: C.muted }}>Desarrollado por Onyx · Fusagasugá, Colombia · 2026</p>
    <p style={{ fontFamily: C.sans, fontSize: 13, color: C.muted }}>Procesamiento 100% local · Habeas Data garantizado</p>
  </footer>
);

// ─── Master ───────────────────────────────────────────────────────────────────

export const MasterSections = () => (
  <>
    {/* inject demo CSS once */}
    <style>{DEMO_STYLE}</style>
    <main style={{ paddingTop: 72 }}>
      <Header />
      <Hero />
      <Marquee />
      <StatsBand />
      <Problema />
      <ComoFunciona />
      <WatsonMedico />
      <WatsonAuditor />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  </>
);

export default MasterSections;
