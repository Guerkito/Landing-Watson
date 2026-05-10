/* eslint-disable */
// Interactive Demo — WATSON floating widget (Asistente Clínico).
// Reflects the production widget styles supplied by the team.

const Widget = ({ onStateChange }) => {
  const [status, setStatus] = React.useState("idle");
  const [transcription, setTranscription] = React.useState("");
  
  const startDemo = () => {
    if (status !== "idle") {
      setStatus("idle");
      setTranscription("");
      if (onStateChange) onStateChange("idle");
      return;
    }
    
    setStatus("recording");
    if (onStateChange) onStateChange("recording");
    
    setTimeout(() => {
      setStatus("transcribing");
      const text = "Paciente masculino 45 años, cefalea pulsátil 3 días evolución. TA 140/90. Plan: Acetaminofén 500mg.";
      let curr = "";
      const interval = setInterval(() => {
        curr = text.substring(0, curr.length + 3);
        setTranscription(curr);
        if (curr.length >= text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setStatus("done");
            if (onStateChange) onStateChange("done");
          }, 1000);
        }
      }, 50);
    }, 2000);
  };

  return (
    <div style={{
      position: "absolute", bottom: 30, right: 30, width: 320,
      background: "#ffffff", color: "#111827",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      border: "1px solid #e5e7eb", borderRadius: 16,
      boxShadow: "0 30px 60px rgba(15,23,42,0.18), 0 4px 12px rgba(15,23,42,0.08)",
      padding: 20, boxSizing: "border-box",
      transition: "transform 0.3s ease",
      transform: status === "done" ? "translateY(-5px)" : "none"
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
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: status === "idle" ? "#10b981" : "#f59e0b", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: status === "idle" ? "#10b981" : "#f59e0b", boxShadow: `0 0 0 3px ${status === "idle" ? "rgba(16,185,129,0.18)" : "rgba(245,158,11,0.18)"}` }}/>
          {status === "idle" ? "Listo" : "Activo"}
        </span>
      </div>

      {/* Dynamic Content Area */}
      <div style={{
        width: "100%", height: 50, borderRadius: 10, background: "#f9fafb",
        border: "1px solid #e5e7eb", padding: "0 10px",
        display: "flex", alignItems: "center", gap: 2, overflow: "hidden", position: "relative"
      }}>
        {status === "idle" && (
          <div style={{ width: "100%", textAlign: "center", fontSize: 11, fontWeight: 600, color: "#9ca3af" }}>Esperando audio...</div>
        )}
        {status === "recording" && [8,14,22,12,28,34,18,30,16,24,36,22,14,30,24,18,10,20,26,34].map((h, i) => (
          <span key={i} style={{
            flex: 1, height: h, background: "#1a73e8", borderRadius: 2, opacity: 0.35 + (i % 5) * 0.13,
            animation: `pulse-bar 1s infinite alternate ${i * 0.05}s`
          }}/>
        ))}
        {(status === "transcribing" || status === "done") && (
          <div style={{ fontSize: 11, color: "#374151", padding: "4px 0", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <span style={{ color: "#1a73e8", fontWeight: 700, marginRight: 4 }}>&gt;</span>
            {transcription}
            {status !== "done" && <span style={{ animation: "blink 1s infinite" }}>|</span>}
          </div>
        )}
      </div>

      {/* Primary button */}
      <button onClick={startDemo} style={{
        width: "100%", height: 52, marginTop: 12, borderRadius: 12, border: "none",
        background: status === "recording" ? "#ef4444" : "#1a73e8", color: "#fff", fontWeight: 700, fontSize: 14,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        cursor: "pointer", fontFamily: "inherit",
        boxShadow: `0 6px 16px ${status === "recording" ? "rgba(239,68,68,0.35)" : "rgba(26,115,232,0.35)"}, inset 0 1px 0 rgba(255,255,255,0.2)`,
        transition: "background 0.3s"
      }}>
        {status === "idle" ? "Iniciar grabación" : status === "recording" ? "Detener" : status === "done" ? "Reiniciar" : "Procesando..."}
      </button>

      {/* Pipeline states */}
      <div style={{
        marginTop: 16, paddingTop: 14, borderTop: "1px solid #f1f3f5",
        display: "flex", justifyContent: "space-between", gap: 6,
      }}>
        {[
          ["Captura", "#f59e0b", status !== "idle"],
          ["Texto", "#8b5cf6", status === "transcribing" || status === "done"],
          ["HIS", "#10b981", status === "done"],
        ].map(([label, color, active], i) => (
          <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: active ? 1 : 0.4 }}>
            <span style={{
              width: 22, height: 22, borderRadius: "50%",
              background: active ? color : "#fff",
              border: `1.5px solid ${color}`,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              color: active ? "#fff" : color, fontSize: 10, fontWeight: 700,
            }}>{i + 1}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse-bar { 0% { transform: scaleY(0.5); } 100% { transform: scaleY(1.5); } }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

const TypewriterText = ({ text, delay = 0 }) => {
  return (
    <span style={{ 
      display: "inline-block", 
      overflow: "hidden", 
      whiteSpace: "nowrap", 
      animation: `typing 1s steps(${text.length}, end) forwards ${delay}s`,
      width: "0"
    }}>
      {text}
    </span>
  );
};

const ChromeFrame = ({ demoState }) => (
  <div style={{ position: "absolute", inset: 0, background: "#dee1e6" }}>
    <style>{`
      @keyframes typing {
        from { width: 0; }
        to { width: 100%; }
      }
    `}</style>
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
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fff", border: "1px solid #c4cad6", padding: 12, fontSize: 11, opacity: 0.5 }}>Paciente · Andrés Suárez</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
               <div style={{ background: demoState === "done" ? "#ecfdf5" : "#fff", border: `1px solid ${demoState === "done" ? "#10b981" : "#c4cad6"}`, padding: 12, fontSize: 11, transition: "1s" }}>
                  <span style={{ display: "block", fontSize: 9, fontWeight: 700, color: "#6b7280", marginBottom: 2 }}>Motivo de Consulta</span>
                  {demoState === "done" ? <TypewriterText text="Cefalea pulsátil" delay={0} /> : "..."}
               </div>
               <div style={{ background: demoState === "done" ? "#ecfdf5" : "#fff", border: `1px solid ${demoState === "done" ? "#10b981" : "#c4cad6"}`, padding: 12, fontSize: 11, transition: "1s 0.1s" }}>
                  <span style={{ display: "block", fontSize: 9, fontWeight: 700, color: "#6b7280", marginBottom: 2 }}>Enfermedad Actual</span>
                  {demoState === "done" ? <TypewriterText text="3 días de evolución." delay={0.2} /> : "..."}
               </div>
             </div>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <div style={{ background: demoState === "done" ? "#ecfdf5" : "#fff", border: `1px solid ${demoState === "done" ? "#10b981" : "#c4cad6"}`, padding: 10, fontSize: 11, transition: "1s 0.2s" }}>
                  <span style={{ display: "block", fontSize: 9, fontWeight: 700, color: "#6b7280", marginBottom: 2 }}>TA</span>
                  {demoState === "done" ? <TypewriterText text="140/90" delay={0.4} /> : "..."}
                </div>
                <div style={{ background: demoState === "done" ? "#ecfdf5" : "#fff", border: `1px solid ${demoState === "done" ? "#10b981" : "#c4cad6"}`, padding: 10, fontSize: 11, transition: "1s 0.3s" }}>
                  <span style={{ display: "block", fontSize: 9, fontWeight: 700, color: "#6b7280", marginBottom: 2 }}>FC</span>
                  {demoState === "done" ? <TypewriterText text="88 lpm" delay={0.5} /> : "..."}
                </div>
                <div style={{ background: demoState === "done" ? "#ecfdf5" : "#fff", border: `1px solid ${demoState === "done" ? "#10b981" : "#c4cad6"}`, padding: 10, fontSize: 11, transition: "1s 0.4s" }}>
                  <span style={{ display: "block", fontSize: 9, fontWeight: 700, color: "#6b7280", marginBottom: 2 }}>Temp</span>
                  {demoState === "done" ? <TypewriterText text="36.5 °C" delay={0.6} /> : "..."}
                </div>
             </div>
             <div style={{ background: demoState === "done" ? "#ecfdf5" : "#fff", border: `1px solid ${demoState === "done" ? "#10b981" : "#c4cad6"}`, padding: 12, minHeight: 48, fontSize: 11, transition: "1s 0.5s" }}>
                <span style={{ display: "block", fontSize: 9, fontWeight: 700, color: "#6b7280", marginBottom: 2 }}>Diagnóstico (CIE-10)</span>
                {demoState === "done" ? <TypewriterText text="G431 - Migraña con aura" delay={0.7} /> : "..."}
             </div>
             <div style={{ background: demoState === "done" ? "#ecfdf5" : "#fff", border: `1px solid ${demoState === "done" ? "#10b981" : "#c4cad6"}`, padding: 12, minHeight: 48, fontSize: 11, transition: "1s 0.6s" }}>
                <span style={{ display: "block", fontSize: 9, fontWeight: 700, color: "#6b7280", marginBottom: 2 }}>Plan de Manejo</span>
                {demoState === "done" ? <TypewriterText text="Acetaminofén 500mg. Reposo." delay={0.9} /> : "..."}
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WidgetApp = () => {
  const [demoState, setDemoState] = React.useState("idle");
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      <ChromeFrame demoState={demoState}/>
      <div style={{
        position: "absolute", left: 24, top: 100,
        padding: "10px 14px",
        background: "rgba(15,15,17,0.9)", color: "#FAFAFA",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
        fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        Widget flotante · Asistente Clínico
      </div>
      <Widget onStateChange={setDemoState}/>
    </div>
  );
};

// Export to window
window.WATSONWidget = Widget;
window.WATSONChromeFrame = ChromeFrame;

if (document.getElementById("root") && !window.WATSONHeader) {
  ReactDOM.createRoot(document.getElementById("root")).render(<WidgetApp/>);
}

