/* eslint-disable */
// WATSON · Dashboard Gerencia — vista del dueño / gerente de clínica.
// Enfoque: ROI, horas recuperadas, impacto en glosas, adopción de médicos, facturación.

const Stroke = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const I = {
  Home: (p) => <Stroke {...p} d={<><path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/></>}/>,
  Chart: (p) => <Stroke {...p} d={<><path d="M3 3v18h18"/><path d="M7 15l4-6 4 4 5-8"/></>}/>,
  Coins: (p) => <Stroke {...p} d={<><ellipse cx="9" cy="7" rx="6" ry="2.5"/><path d="M3 7v5c0 1.4 2.7 2.5 6 2.5"/><path d="M3 12v5c0 1.4 2.7 2.5 6 2.5"/><ellipse cx="15" cy="14" rx="6" ry="2.5"/><path d="M9 14v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5"/></>}/>,
  Users: (p) => <Stroke {...p} d={<><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5 5"/></>}/>,
  Shield: (p) => <Stroke {...p} d={<><path d="M20 13c0 5-3.5 7.5-8 8.5-4.5-1-8-3.5-8-8.5V6l8-3 8 3z"/><path d="m9 12 2 2 4-4"/></>}/>,
  Doc: (p) => <Stroke {...p} d={<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 14h8M8 18h5"/></>}/>,
  Gear: (p) => <Stroke {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8h0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>}/>,
  Up: (p) => <Stroke {...p} d={<><path d="M7 17 17 7"/><path d="M9 7h8v8"/></>}/>,
  Down: (p) => <Stroke {...p} d={<><path d="M7 7l10 10"/><path d="M17 9v8h-8"/></>}/>,
  Clock: (p) => <Stroke {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>}/>,
  Bell: (p) => <Stroke {...p} d={<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></>}/>,
  Download: (p) => <Stroke {...p} d={<><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/></>}/>,
  Check: (p) => <Stroke {...p} d={<path d="m5 12 5 5 9-11"/>}/>,
};

const cop = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
const num = (n) => new Intl.NumberFormat("es-CO").format(n);

// ---------- Sidebar ----------
const Sidebar = () => {
  const items = [
    ["Resumen", I.Home, true],
    ["Facturación", I.Coins, false],
    ["Adopción médica", I.Users, false],
    ["Calidad clínica", I.Doc, false],
    ["Cumplimiento", I.Shield, false],
    ["Auditoría", I.Chart, false],
    ["Configuración", I.Gear, false],
  ];
  return (
    <aside style={{ width: 240, borderRight: "1px solid var(--line)", padding: "20px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 18px" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
          <path d="M5 12 Q8 7 11 12 T 17 12"/>
          <path d="M2 12 Q6 4 10 12 T 18 12 T 22 12" opacity="0.5"/>
        </svg>
        <strong style={{ fontSize: 15, letterSpacing: "-0.01em" }}>WATSON</strong>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--fg-3)", textTransform: "uppercase", marginLeft: "auto", border: "1px solid var(--line)", padding: "2px 6px", borderRadius: 6 }}>Gerencia</span>
      </div>
      {items.map(([label, Icon, active]) => (
        <div key={label} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
          borderRadius: 8, color: active ? "var(--fg-1)" : "var(--fg-2)",
          background: active ? "rgba(255,255,255,0.04)" : "transparent",
          fontSize: 13, cursor: "default"
        }}>
          <Icon/> {label}
        </div>
      ))}
      <div style={{ marginTop: "auto", padding: 10, fontSize: 11, color: "var(--fg-3)", border: "1px solid var(--line)", borderRadius: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ok)", marginBottom: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ok)" }}/>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>ONYX operando</span>
        </div>
        Última sincronización con Dinámica Gerencial: hace 2 min.
      </div>
    </aside>
  );
};

// ---------- Top bar ----------
const TopBar = () => (
  <div style={{ display: "flex", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid var(--line)", gap: 16 }}>
    <div>
      <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>Clínica San Rafael · Bogotá</div>
      <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Buenos días, Dra. Carolina.</h1>
    </div>
    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 12, color: "var(--fg-2)" }}>
        <I.Clock size={14}/> Últimos 30 días <span style={{ color: "var(--fg-3)" }}>▾</span>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 12, color: "var(--fg-2)" }}>
        <I.Download size={14}/> Reporte ejecutivo
      </div>
      <div style={{ position: "relative", padding: 8, border: "1px solid var(--line)", borderRadius: 8, color: "var(--fg-2)" }}>
        <I.Bell size={16}/>
        <span style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/>
      </div>
      <div style={{ width: 32, height: 32, borderRadius: 999, background: "linear-gradient(135deg,#2563EB,#7C3AED)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>CV</div>
    </div>
  </div>
);

// ---------- Hero KPI strip ----------
const HeroKPI = () => (
  <div style={{ padding: "28px 32px 8px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 18 }}>
      {/* Big ROI block */}
      <div style={{ background: "linear-gradient(180deg, rgba(37,99,235,0.10), rgba(37,99,235,0.02))", border: "1px solid rgba(37,99,235,0.25)", borderRadius: 14, padding: 22, position: "relative", overflow: "hidden" }}>
        <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "#7DA7FF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Retorno acumulado · 30 días</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1, color: "var(--fg-1)" }}>{cop(82_400_000)}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--ok)", fontSize: 13, fontWeight: 500 }}>
            <I.Up size={14}/> +18%
          </span>
        </div>
        <p style={{ marginTop: 10, fontSize: 12, color: "var(--fg-2)", lineHeight: 1.55, maxWidth: 380 }}>
          Suma de horas clínicas recuperadas, glosas evitadas y consultas adicionales facturables. Calculado contra el mes anterior a la instalación.
        </p>
        <div style={{ display: "flex", gap: 18, marginTop: 14, fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>
          <span><span style={{ color: "var(--fg-1)" }}>$ 41.2 M</span> tiempo médico</span>
          <span><span style={{ color: "var(--fg-1)" }}>$ 28.9 M</span> glosas evitadas</span>
          <span><span style={{ color: "var(--fg-1)" }}>$ 12.3 M</span> consultas extra</span>
        </div>
      </div>

      {/* Small KPIs */}
      <KPI label="Horas clínicas recuperadas" value="412 h" delta="+22%" mono="13.7 h/día"/>
      <KPI label="Glosas EPS por HC incompleta" value="2.1%" delta="-71%" deltaPositive mono="vs 7.3% antes"/>
      <KPI label="Adopción médica" value="92%" delta="+8 pp" mono="34 de 37 médicos"/>
    </div>
  </div>
);

const KPI = ({ label, value, delta, mono, deltaPositive }) => {
  const positive = deltaPositive ?? (typeof delta === "string" && delta.startsWith("+"));
  // For glosas, a decrease is positive — we let caller pass deltaPositive override.
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 22, background: "var(--bg-2)" }}>
      <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--fg-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--fg-1)" }}>{value}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: positive ? "var(--ok)" : "var(--danger)", fontSize: 12, fontWeight: 500 }}>
          {positive ? <I.Up size={12}/> : <I.Down size={12}/>} {delta}
        </span>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>{mono}</div>
    </div>
  );
};

// ---------- Two-column body ----------

// Facturación chart
const BillingChart = () => {
  // 30-day sparkline-like bars, billing impact in millions COP
  const data = [12,14,13,16,15,18,17,19,21,20,22,24,23,25,27,26,28,30,29,32,33,35,34,37,38,40,41,43,45,47];
  const max = Math.max(...data);
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 22, background: "var(--bg-2)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--fg-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Facturación adicional · diaria</div>
          <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Consultas extra atendidas gracias a WATSON</h3>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>+ {num(847)}</div>
          <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>consultas · 30 días</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 130 }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: "100%",
              background: i >= 20 ? "var(--accent)" : "rgba(37,99,235,0.35)",
              height: `${(v / max) * 100}%`,
              borderRadius: "3px 3px 0 0",
              minHeight: 4,
            }}/>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 10, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>
        <span>1 abr</span><span>10 abr</span><span>20 abr</span><span>30 abr</span>
      </div>
    </div>
  );
};

// Departments table
const DeptTable = () => {
  const rows = [
    ["Medicina General", 14, 4280, "1.6 min", "98%", "var(--ok)"],
    ["Pediatría",        6, 1820, "1.4 min", "96%", "var(--ok)"],
    ["Cardiología",      4, 980,  "2.1 min", "94%", "var(--ok)"],
    ["Ginecología",      5, 1410, "1.7 min", "91%", "var(--ok)"],
    ["Ortopedia",        4, 1240, "1.9 min", "88%", "var(--accent)"],
    ["Dermatología",     2,  520, "1.3 min", "97%", "var(--ok)"],
    ["Psiquiatría",      2,  430, "2.6 min", "82%", "var(--warn, #F59E0B)"],
  ];
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--bg-2)", overflow: "hidden" }}>
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--fg-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Por especialidad</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Adopción y calidad por servicio</h3>
        </div>
        <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>Últimos 30 días</div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            <th style={th}>Especialidad</th>
            <th style={th}>Médicos</th>
            <th style={th}>Consultas</th>
            <th style={th}>Tiempo / HC</th>
            <th style={th}>Calidad HC</th>
            <th style={th}>Adopción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, docs, cons, t, q, color]) => {
            const adopt = Math.min(100, parseInt(q));
            return (
              <tr key={name} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={td}>{name}</td>
                <td style={{ ...td, color: "var(--fg-2)" }}>{docs}</td>
                <td style={{ ...td, fontFamily: "var(--font-mono)" }}>{num(cons)}</td>
                <td style={{ ...td, fontFamily: "var(--font-mono)", color: "var(--fg-2)" }}>{t}</td>
                <td style={{ ...td, fontFamily: "var(--font-mono)" }}>{q}</td>
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${adopt}%`, height: "100%", background: color }}/>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--fg-2)", minWidth: 32, textAlign: "right" }}>{adopt}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const th = { textAlign: "left", padding: "10px 16px", fontWeight: 500 };
const td = { padding: "12px 16px", color: "var(--fg-1)" };

// Glosas comparison
const Glosas = () => (
  <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 22, background: "var(--bg-2)" }}>
    <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--fg-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Glosas EPS</div>
    <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 18px" }}>Historias rechazadas por información incompleta</h3>

    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Bar label="Antes de WATSON" sub="ene 2026" value={7.3} max={10} color="var(--danger)" valueLabel="7.3% · $ 41.2 M"/>
      <Bar label="Mes 1" sub="feb 2026" value={4.6} max={10} color="rgba(239,68,68,0.55)" valueLabel="4.6%"/>
      <Bar label="Mes 2" sub="mar 2026" value={2.9} max={10} color="rgba(245,158,11,0.7)" valueLabel="2.9%"/>
      <Bar label="Mes 3" sub="abr 2026" value={2.1} max={10} color="var(--ok)" valueLabel="2.1% · $ 12.3 M"/>
    </div>

    <div style={{ marginTop: 18, padding: 14, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
      <I.Check size={16}/>
      <div style={{ fontSize: 12, lineHeight: 1.5 }}>
        <strong>$ 28.9 M COP</strong> recuperados en 90 días por glosas evitadas en EPS Sura, Sanitas y Compensar.
      </div>
    </div>
  </div>
);

const Bar = ({ label, sub, value, max, color, valueLabel }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
      <span><strong style={{ color: "var(--fg-1)", fontWeight: 500 }}>{label}</strong> <span style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: 10, marginLeft: 6 }}>{sub}</span></span>
      <span style={{ fontFamily: "var(--font-mono)", color: "var(--fg-2)" }}>{valueLabel}</span>
    </div>
    <div style={{ height: 10, background: "rgba(255,255,255,0.04)", borderRadius: 5, overflow: "hidden" }}>
      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: color, transition: "width .8s ease" }}/>
    </div>
  </div>
);

// Doctor leaderboard
const DoctorAdoption = () => {
  const docs = [
    ["Dra. M. Velasco", "Medicina General", 312, 96, "var(--ok)"],
    ["Dr. R. Mendoza", "Cardiología", 218, 94, "var(--ok)"],
    ["Dra. L. Caicedo", "Pediatría", 287, 92, "var(--ok)"],
    ["Dr. J. Pardo", "Ortopedia", 196, 78, "var(--accent)"],
    ["Dr. F. Bermúdez", "Psiquiatría", 142, 62, "#F59E0B"],
  ];
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--bg-2)", padding: 22 }}>
      <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--fg-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Adopción por médico</div>
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>Top y atención requerida</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {docs.map(([name, dept, n, adopt, color]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,0.04)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-2)" }}>
              {name.split(" ").slice(-1)[0][0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: "var(--fg-1)", fontWeight: 500 }}>{name}</div>
              <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>{dept} · {num(n)} consultas</div>
            </div>
            <div style={{ width: 110, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${adopt}%`, height: "100%", background: color }}/>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-2)", minWidth: 28, textAlign: "right" }}>{adopt}%</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: 12, background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, fontSize: 12, color: "var(--fg-2)", lineHeight: 1.5 }}>
        <strong style={{ color: "#F59E0B" }}>Sugerencia.</strong> Dr. Bermúdez (Psiquiatría) requiere acompañamiento. WATSON puede agendar una sesión de calibración por especialidad.
      </div>
    </div>
  );
};

// Compliance card — clinic manager always wants reassurance
const Compliance = () => (
  <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--bg-2)", padding: 22 }}>
    <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--fg-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Cumplimiento normativo</div>
    <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>Estado actual</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {[
        ["Ley 1581 de 2012 · Protección de datos", "Conforme"],
        ["Resolución 1995 de 1999 · Historia clínica", "Conforme"],
        ["Audio borrado tras consulta", "100% · 12,680 sesiones"],
        ["Datos fuera de la red de clínica", "Cero eventos"],
        ["Última auditoría interna", "abr 2026 · sin hallazgos"],
      ].map(([label, value]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, paddingBottom: 10, borderBottom: "1px solid var(--line)" }}>
          <span style={{ width: 18, height: 18, borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "var(--ok)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <I.Check size={11}/>
          </span>
          <span style={{ flex: 1, color: "var(--fg-2)" }}>{label}</span>
          <span style={{ color: "var(--fg-1)", fontFamily: "var(--font-mono)", fontSize: 11 }}>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

// ---------- Layout ----------
const App = () => (
  <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", color: "var(--fg-1)" }}>
    <Sidebar/>
    <main style={{ flex: 1, minWidth: 0 }}>
      <TopBar/>
      <HeroKPI/>
      <div style={{ padding: "20px 32px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <BillingChart/>
        <Glosas/>
      </div>
      <div style={{ padding: "0 32px 40px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <DeptTable/>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <DoctorAdoption/>
          <Compliance/>
        </div>
      </div>
    </main>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
