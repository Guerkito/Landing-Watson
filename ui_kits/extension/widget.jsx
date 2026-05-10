/* eslint-disable */
// Static example — WATSON floating widget (Asistente Clínico).
// Reflects the production widget styles supplied by the team.

const Widget = () => (
  <div style={{
    position: "absolute", bottom: 30, right: 30, width: 320,
    background: "#ffffff", color: "#111827",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    border: "1px solid #e5e7eb", borderRadius: 16,
    boxShadow: "0 30px 60px rgba(15,23,42,0.18), 0 4px 12px rgba(15,23,42,0.08)",
    padding: 20, boxSizing: "border-box",
  }}>
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <span style={{
        width: 32, height: 32, borderRadius: 10, background: "#e8f0fe",
        color: "#1a73e8", display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      </span>
      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", flex: 1 }}>Asistente Clínico</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 3px rgba(16,185,129,0.18)" }}/>
        Listo
      </span>
    </div>

    {/* Audio visualizer (canvas 300×44, static) */}
    <div style={{
      width: "100%", height: 44, borderRadius: 10, background: "#f9fafb",
      border: "1px solid #e5e7eb", padding: "0 10px",
      display: "flex", alignItems: "center", gap: 2,
    }}>
      {[8,14,22,12,28,34,18,30,16,24,36,22,14,30,24,18,10,20,26,34,22,12,28,18,14,24,30,16,10,22,28,16,8,20,26,18,14,24,30,22].map((h, i) => (
        <span key={i} style={{
          flex: 1, height: h, background: "#1a73e8", borderRadius: 2, opacity: 0.35 + (i % 5) * 0.13,
        }}/>
      ))}
    </div>

    {/* Status text */}
    <div style={{
      marginTop: 14, fontSize: 11, fontWeight: 700, color: "#1a73e8",
      textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center",
    }}>
      Listo para grabar
    </div>

    {/* Primary button — 52px height, radius 12 */}
    <button style={{
      width: "100%", height: 52, marginTop: 12, borderRadius: 12, border: "none",
      background: "#1a73e8", color: "#fff", fontWeight: 700, fontSize: 14,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      cursor: "default", fontFamily: "inherit",
      boxShadow: "0 6px 16px rgba(26,115,232,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
      </svg>
      Iniciar grabación
    </button>

    {/* Pipeline states preview row */}
    <div style={{
      marginTop: 16, paddingTop: 14, borderTop: "1px solid #f1f3f5",
      display: "flex", justifyContent: "space-between", gap: 6,
    }}>
      {[
        ["Captura", "#f59e0b"],
        ["Transcripción", "#8b5cf6"],
        ["Análisis", "#06b6d4"],
        ["Listo", "#10b981"],
      ].map(([label, color], i) => (
        <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 22, height: 22, borderRadius: "50%",
            background: i === 0 ? color : "#fff",
            border: `1.5px solid ${color}`,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: i === 0 ? "#fff" : color, fontSize: 10, fontWeight: 700,
          }}>{i + 1}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

const ChromeFrame = () => (
  <div style={{ position: "absolute", inset: 0, background: "#dee1e6" }}>
    <div style={{ height: 40, display: "flex", alignItems: "flex-end", padding: "0 8px" }}>
      <span style={{ width: 200, height: 32, background: "#f1f3f4", borderRadius: "10px 10px 0 0", display: "flex", alignItems: "center", padding: "0 12px", fontFamily: "system-ui", fontSize: 12, color: "#3c4043", gap: 8 }}>
        <span style={{ width: 14, height: 14, background: "#1a73e8", borderRadius: 3 }}/>
        Dinámica Gerencial
      </span>
    </div>
    <div style={{ background: "#f1f3f4", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ flex: 1, background: "#fff", borderRadius: 999, padding: "6px 14px", fontFamily: "system-ui", fontSize: 12, color: "#3c4043" }}>
        his.clinicasanrafael.co/dinamica/consulta-externa
      </span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 80, bottom: 0, background: "linear-gradient(180deg,#fff,#eef1f6)", opacity: 0.9 }}>
      <div style={{ padding: 32, fontFamily: "Tahoma, system-ui", color: "#0a1530" }}>
        <div style={{ background: "#0e3a8a", color: "#fff", padding: "10px 18px", display: "inline-block", fontSize: 12, fontWeight: 600 }}>
          DINÁMICA GERENCIAL · SYAC · Consulta externa
        </div>
        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "200px 1fr", gap: 14, opacity: 0.5 }}>
          <div style={{ background: "#fff", border: "1px solid #c4cad6", padding: 12, height: 220, fontSize: 11 }}>Paciente · Andrés Suárez</div>
          <div style={{ background: "#fff", border: "1px solid #c4cad6", padding: 16, height: 380, fontSize: 12 }}>Historia clínica…</div>
        </div>
      </div>
    </div>
  </div>
);

const App = () => (
  <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
    <ChromeFrame/>
    <div style={{
      position: "absolute", left: 24, top: 100,
      padding: "10px 14px",
      background: "rgba(15,15,17,0.9)", color: "#FAFAFA",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
      fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
    }}>
      Widget flotante · Asistente Clínico
    </div>
    <Widget/>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
