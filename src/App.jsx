import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/original.css";
import "./styles/responsive.css";
import { Icons } from "./components/Icons.jsx";
import { PLANS } from "./lib/plans.js";
import { whatsappUrl } from "./lib/contact.js";
import Faq from "./components/Faq.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const timeRef = useRef(null);
  const glosasRef = useRef(null);
  const c1Ref = useRef(null);
  const c2Ref = useRef(null);
  const c3Ref = useRef(null);
  const c4Ref = useRef(null);
  const dbStatusRef = useRef(null);

  useEffect(() => {
    // 1. Reveal on scroll
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold:0.12});
    
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // 2. Counter animation utility
    function animateVal(el, target, suffix, duration) {
      if (!el) return;
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.round(start) + suffix;
        if (start >= target) clearInterval(timer);
      }, 16);
    }

    // 3. Stats Observer for bottom counters
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateVal(c1Ref.current, 140, ' min', 1500);
          animateVal(c2Ref.current, 130, '', 1800);
          animateVal(c3Ref.current, 0, '%', 800);
          animateVal(c4Ref.current, 80, '', 1600);
          statsObs.disconnect();
        }
      });
    }, {threshold:0.3});
    
    const bigStats = document.querySelector('.big-stats');
    if(bigStats) statsObs.observe(bigStats);

    // 4. Hero counters animate on load
    const t1 = setTimeout(() => {
      const el = timeRef.current;
      if(!el) return;
      let v = 0, target = 90;
      const t = setInterval(() => {
        v = Math.min(v + 3, target);
        el.textContent = v + 's';
        if (v >= target) clearInterval(t);
      }, 20);
    }, 600);

    const t2 = setTimeout(() => {
      const el = glosasRef.current;
      if(!el) return;
      let v = 0, target = 18000000;
      const step = target / 60;
      const t = setInterval(() => {
        v = Math.min(v + step, target);
        el.textContent = '$' + Math.round(v/1000000).toFixed(1) + 'M';
        if (v >= target) clearInterval(t);
      }, 25);
    }, 800);

    // Auditor Sticky Scroll Logic
    const auditorSteps = document.querySelectorAll('.auditor-step');
    const pdfOverlay = document.getElementById('pdf-overlay');
    const letterPanel = document.getElementById('letter-panel');
    const dhTitle = document.querySelector('.dh-title');

    const scrollCtx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        auditorSteps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
              if (self.isActive) {
                auditorSteps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');

                if (i === 0) {
                  if (pdfOverlay) pdfOverlay.classList.add('visible');
                  if (letterPanel) letterPanel.classList.remove('open');
                  if (dhTitle) dhTitle.innerHTML = `Hospital San Jorge &middot; Mayo 2026 &middot; 100 HCs <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--navy)"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
                } else if (i === 1) {
                  if (pdfOverlay) pdfOverlay.classList.remove('visible');
                  if (letterPanel) letterPanel.classList.add('open');
                  if (dhTitle) dhTitle.innerHTML = `Hospital San Jorge &middot; Mayo 2026 &middot; 100 HCs <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--navy)"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
                } else if (i === 2) {
                  if (pdfOverlay) pdfOverlay.classList.remove('visible');
                  if (letterPanel) letterPanel.classList.remove('open');
                  if (dhTitle) dhTitle.innerHTML = `Clínica El Rosario &middot; Mayo 2026 &middot; 450 HCs <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--navy)"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
                }
              }
            }
          });
        });
      });
    });

    // 5. Advanced HC demo animation loop (Extension + DGH Form)
    let demoState = 0; // 0: listening, 1: processing, 2: injecting, 3: done
    let masterTimer;
    let charIdx = 0;
    const transcriptText = "Paciente refiere dolor lumbar con irradiación a pierna derecha, intensidad 8/10, desde hace 3 semanas.";
    const transcript = document.getElementById('ext-transcript');

    function runMasterDemo() {
      const badge = document.getElementById('ext-badge');
      const waveBars = document.querySelectorAll('.db-wave-bar');
      const log1 = document.getElementById('log-1');
      const log2 = document.getElementById('log-2');
      const log3 = document.getElementById('log-3');
      const audioBox = document.querySelector('.ext-audio-box');
      
      const df1 = document.getElementById('df1');
      const dfea = document.getElementById('df-ea');
      const df2 = document.getElementById('df2');
      const df3 = document.getElementById('df3');
      const df4 = document.getElementById('df4');
      const df5 = document.getElementById('df5');
      const df6 = document.getElementById('df6');
      const dbStatus = dbStatusRef.current;

      if (!badge) return;

      if (demoState === 0) {
        // Reset everything
        badge.textContent = "ESCUCHANDO...";
        badge.className = "ext-status-badge listening";
        audioBox.classList.add("active");
        waveBars.forEach(b => b.classList.add('active'));
        
        [log1, log2, log3].forEach(l => { l.className = "ext-action-item"; l.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle></svg> <span>...</span>`; });
        log1.querySelector('span').textContent = "Capturando audio";
        log2.querySelector('span').textContent = "Extrayendo CIE-10 y CUPS";
        log3.querySelector('span').textContent = "Inyectando en DGH";

        [df1, dfea, df2, df3, df4, df5, df6].forEach(el => { if(el) { el.textContent = ""; el.className = "db-field-val"; } });
        if(dbStatus) dbStatus.style.display = "none";

        charIdx = 0;
        if (transcript) transcript.textContent = "";

        function typeWriter() {
          if (!transcript) {
            demoState = 1;
            masterTimer = setTimeout(runMasterDemo, 1200);
            return;
          }
          if (charIdx < transcriptText.length) {
            transcript.textContent += transcriptText.charAt(charIdx);
            charIdx++;
            masterTimer = setTimeout(typeWriter, 30);
          } else {
            demoState = 1;
            masterTimer = setTimeout(runMasterDemo, 800);
          }
        }
        typeWriter();
      } 
      else if (demoState === 1) {
        // Processing
        badge.textContent = "PROCESANDO";
        badge.className = "ext-status-badge processing";
        audioBox.classList.remove("active");
        waveBars.forEach(b => b.classList.remove('active'));
        
        log1.className = "ext-action-item done";
        log1.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M20 6L9 17l-5-5"></path></svg> <span>Audio capturado</span>`;
        
        log2.className = "ext-action-item active";
        log2.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> <span>Extrayendo entidades clínicas...</span>`;
        
        masterTimer = setTimeout(() => {
          demoState = 2;
          runMasterDemo();
        }, 1500);
      }
      else if (demoState === 2) {
        // Injecting
        badge.textContent = "INYECTANDO";
        badge.className = "ext-status-badge injecting";
        log2.className = "ext-action-item done";
        log2.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M20 6L9 17l-5-5"></path></svg> <span>Entidades extraídas</span>`;
        
        log3.className = "ext-action-item active";
        log3.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> <span>Inyectando en Dinámica Gerencial...</span>`;

        // Sequential injection
        const fields = [
          { el: df1, val: "Dolor lumbar agudo" },
          { el: dfea, val: "Paciente refiere dolor con irradiación a pierna derecha desde hace 3 semanas, intensidad 8/10. No cede con analgésicos leves." },
          { el: df3, val: "130/85" },
          { el: df4, val: "78" },
          { el: df5, val: "36.5" },
          { el: df2, val: "M54.5 — Lumbago con ciática" },
          { el: df6, val: "Acetaminofén 500mg c/8h × 5 días. Reposo relativo." }
        ];
        
        let fIdx = 0;
        function injectField() {
          if (fIdx < fields.length) {
            const f = fields[fIdx];
            if(f.el) {
              f.el.classList.add("active");
              masterTimer = setTimeout(() => {
                f.el.textContent = f.val;
                f.el.classList.remove("active");
                f.el.classList.add("done");
                fIdx++;
                masterTimer = setTimeout(injectField, 250);
              }, 200);
            } else {
              fIdx++;
              injectField();
            }
          } else {
            demoState = 3;
            masterTimer = setTimeout(runMasterDemo, 500);
          }
        }
        injectField();
      }
      else if (demoState === 3) {
        // Done
        badge.textContent = "COMPLETADO";
        badge.className = "ext-status-badge done";
        
        log3.className = "ext-action-item done";
        log3.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M20 6L9 17l-5-5"></path></svg> <span>Inyección exitosa</span>`;
        
        if (dbStatus) dbStatus.style.display = 'flex';
        
        masterTimer = setTimeout(() => {
          demoState = 0;
          runMasterDemo();
        }, 5000); // Wait 5s before restarting
      }
    }
    const t3 = setTimeout(runMasterDemo, 1000);

    // 6. Smooth nav scroll
    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const t = document.querySelector(href);
        if (t) t.scrollIntoView({behavior:'smooth'});
      }
    };
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(a => a.addEventListener('click', handleNavClick));

    // Cleanup
    return () => {
      obs.disconnect();
      statsObs.disconnect();
      scrollCtx.revert();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(masterTimer);
      links.forEach(a => a.removeEventListener('click', handleNavClick));
    };
  }, []);

  return (
    <>
      <nav>
        <div className="logo">{`{ ↖ `}<span>WATSON</span>{` }`}</div>
        <div className="nav-links">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#watson-medico">Watson Médico</a>
          <a href="#watson-auditor">Watson Auditor</a>
          <a href="#planes">Planes</a>
        </div>
        <button className="nav-cta">Solicitar demo &rarr;</button>
      </nav>

      <section className="hero-section">
        <div className="hero">
          <div className="hero-left reveal">
            <div className="hero-eyebrow">IA Clínica Local &middot; Colombia</div>
            <h1 className="hero-h1">El médico habla.<br/><em>Watson llena</em><br/>la historia clínica.</h1>
            <p className="hero-sub">Transcripción clínica con inteligencia artificial que inyecta datos en Dinámica Gerencial en tiempo real. Sin teclado. Sin errores. Sin glosas.</p>
            <div className="hero-btns">
              <button className="btn-dark">Solicitar demo gratuita &rarr;</button>
              <button className="btn-outline">Ver cómo funciona</button>
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--gray400)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "12px" }}>Casos de uso</div>
            <div className="hero-pills">
              <div className="pill">Medicina General <span className="pill-arrow">&#8599;</span></div>
              <div className="pill">Urgencias <span className="pill-arrow">&#8599;</span></div>
              <div className="pill">Especialistas <span className="pill-arrow">&#8599;</span></div>
              <div className="pill">MIPRES <span className="pill-arrow">&#8599;</span></div>
              <div className="pill">Auditoría <span className="pill-arrow">&#8599;</span></div>
            </div>
          </div>

          <div className="hero-right reveal">
            <div className="hero-stat-row">
              <div className="stat-float-card" style={{ flex: 1 }}>
                <div className="stat-mini-label">Tiempo por HC</div>
                <div className="stat-big" ref={timeRef}>0s</div>
                <div className="stat-sub">antes: 7 minutos</div>
                <div className="stat-trend">&uarr; 96% más rápido</div>
              </div>
              <div className="stat-float-card blue" style={{ flex: 1 }}>
                <div className="stat-mini-label white">Glosas evitadas</div>
                <div className="stat-big white" ref={glosasRef}>$0</div>
                <div className="stat-sub white">este mes</div>
                <div style={{ display: "flex", gap: "5px", alignItems: "flex-end", height: "40px", marginTop: "12px" }}>
                  <div className="sbar" style={{ height: "20px" }}></div>
                  <div className="sbar" style={{ height: "28px" }}></div>
                  <div className="sbar" style={{ height: "24px" }}></div>
                  <div className="sbar" style={{ height: "38px" }}></div>
                  <div className="sbar" style={{ height: "32px" }}></div>
                  <div className="sbar" style={{ height: "44px" }}></div>
                  <div className="sbar" style={{ height: "36px" }}></div>
                </div>
              </div>
            </div>

            <div className="hero-dark-card">
              <div className="hdc-glow"></div>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div className="hdc-label">Procesamiento de voz</div>
                  <div id="vwave" style={{ marginBottom: "14px" }}>
                    <div className="vb" style={{ height: "8px" }}></div>
                    <div className="vb" style={{ height: "22px" }}></div>
                    <div className="vb" style={{ height: "16px" }}></div>
                    <div className="vb" style={{ height: "30px" }}></div>
                    <div className="vb" style={{ height: "20px" }}></div>
                    <div className="vb" style={{ height: "34px" }}></div>
                    <div className="vb" style={{ height: "14px" }}></div>
                    <div className="vb" style={{ height: "26px" }}></div>
                    <div className="vb" style={{ height: "10px" }}></div>
                    <div className="vb" style={{ height: "20px" }}></div>
                    <div className="vb" style={{ height: "28px" }}></div>
                    <div className="vb" style={{ height: "8px" }}></div>
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>"...signos vitales estables, Lasègue positivo a 45 grados, diagnóstico M54.5..."</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
                <div className="hdc-chip"><Icons.CheckCircle size={14} /> CIE-10 Automático</div>
                <div className="hdc-chip"><Icons.Shield size={14} /> Auditable 100%</div>
                <div className="hdc-chip"><Icons.Lock size={14} /> Privacidad Total</div>
              </div>
            </div>

            <div className="stat-row-two">
              <div className="stat-float-card">
                <div className="stat-mini-label">Atención Efectiva</div>
                <div className="stat-big" style={{ fontSize: "36px" }}>100%</div>
                <div className="stat-sub">contacto visual con el paciente</div>
              </div>
              <div className="stat-float-card">
                <div className="stat-mini-label">Retorno (ROI)</div>
                <div className="stat-big" style={{ fontSize: "28px", color: "var(--green)" }}>3.2x</div>
                <div className="stat-sub">recuperado en 6 meses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="productos-section" id="productos">
        <div className="reveal">
          <p className="section-tag" style={{ color: "var(--cyan)" }}>Productos Watson</p>
          <h2 className="section-h2" style={{ color: "#fff" }}>Todo lo que su institución necesita para cerrar el ciclo clínico</h2>
        </div>
        <div className="services-top">
          <div className="svc-card dark-card reveal">
            <div className="svc-icon"><Icons.Mic size={24} /></div>
            <h3>Watson Médico</h3>
            <p>El médico habla, Watson escucha y llena la historia clínica en Dinámica Gerencial automáticamente. Con validación farmacológica y justificación CIE-10 + CUPS incluida.</p>
            <div className="svc-tags">
              <span className="svc-tag">HC automática</span>
              <span className="svc-tag green">MIPRES</span>
            </div>
          </div>
          <div className="svc-card dark-card reveal">
            <div className="svc-icon"><Icons.Search size={24} /></div>
            <h3>Watson Auditor</h3>
            <p>Plataforma para firmas auditoras y EPS. Carga masiva de HCs en PDF, análisis contra 80 indicadores del SOGCS, semáforo por HC y reporte Excel listo para la EPS.</p>
            <div className="svc-tags">
              <span className="svc-tag">Glosas</span>
              <span className="svc-tag amber">Enterprise</span>
            </div>
          </div>
          <div className="svc-card dark-card reveal">
            <div className="svc-icon"><Icons.BarChart size={24} /></div>
            <h3>Dashboard Gerencial</h3>
            <p>El gerente ve en tiempo real las horas recuperadas, las glosas evitadas en COP y el score promedio de calidad de las historias clínicas de toda la institución.</p>
            <div className="svc-tags">
              <span className="svc-tag">ROI en tiempo real</span>
            </div>
          </div>
        </div>
      </section>

      <div className="dark-band" id="watson-medico">
        <div className="dark-band-inner">
          <div className="db-right reveal">
            <p className="section-tag" style={{ color: "var(--cyan)" }}>Watson Médico</p>
            <h2 className="section-h2" style={{ color: "#fff", maxWidth: "100%" }}>De la voz del médico a la HC completa en 90 segundos</h2>
            <p className="section-sub" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "100%", marginTop: "20px", marginLeft: "auto", marginRight: "auto" }}>El médico conduce la consulta normalmente. Watson escucha, transcribe, extrae los datos clínicos y los inyecta campo por campo en Dinámica Gerencial. Sin cambiar la forma de trabajar del médico.</p>
            
            <div className="db-stats-row">
              <div className="db-stat">
                <div className="db-stat-num" style={{ color: "var(--cyan)" }}>&minus;96%</div>
                <div className="db-stat-label">Tiempo de digitación</div>
              </div>
              <div className="db-stat">
                <div className="db-stat-num" style={{ color: "var(--green)" }}>50+</div>
                <div className="db-stat-label">Indicadores SOGCS</div>
              </div>
              <div className="db-stat">
                <div className="db-stat-num" style={{ color: "var(--cyan)" }}>0</div>
                <div className="db-stat-label">Datos en la nube</div>
              </div>
              <div className="db-stat">
                <div className="db-stat-num" style={{ color: "var(--green)" }}>+5</div>
                <div className="db-stat-label">Pacientes extra/día</div>
              </div>
            </div>
          </div>

          <div className="db-visual reveal">
            
            {/* Massive DGH Form - 80% Screen */}
            <div className="db-hc-card">
              <div className="db-hc-top">
                <div style={{ display: "flex", gap: "8px" }}>
                  <div className="db-dot" style={{ background: "#FF5F57" }}></div>
                  <div className="db-dot" style={{ background: "#FEBC2E" }}></div>
                  <div className="db-dot" style={{ background: "#28C840" }}></div>
                </div>
                <span className="db-hc-title">Dinámica Gerencial — Evolución Médica #00847</span>
              </div>
              
              <div className="db-form-layout">
                <div className="form-col-left">
                  <div className="db-field">
                    <div className="db-field-label">Motivo de consulta</div>
                    <div className="db-field-val" id="df1"></div>
                  </div>
                  <div className="db-field">
                    <div className="db-field-label">Enfermedad Actual</div>
                    <div className="db-field-val" id="df-ea" style={{ minHeight: "80px" }}></div>
                  </div>
                  <div className="db-field">
                    <div className="db-field-label">Plan de Manejo y Medicamentos</div>
                    <div className="db-field-val" id="df6" style={{ minHeight: "80px" }}></div>
                  </div>
                </div>
                
                <div className="form-col-right">
                  <div className="db-field-grid">
                    <div>
                      <div className="db-field-label">TA (mmHg)</div>
                      <div className="db-field-val" id="df3"></div>
                    </div>
                    <div>
                      <div className="db-field-label">FC (lpm)</div>
                      <div className="db-field-val" id="df4"></div>
                    </div>
                    <div>
                      <div className="db-field-label">Temp &deg;C</div>
                      <div className="db-field-val" id="df5"></div>
                    </div>
                  </div>
                  <div className="db-field" style={{ marginTop: "20px" }}>
                    <div className="db-field-label">Diagnóstico Principal (CIE-10)</div>
                    <div className="db-field-val" id="df2" style={{ color: "var(--cyan)", fontWeight: 600 }}></div>
                  </div>
                  
                  <div className="db-status" id="dbstatus" ref={dbStatusRef} style={{ display: "none" }}>
                    Validación clínica superada &middot; Score 98/100
                  </div>
                </div>
              </div>
            </div>

            {/* Watson Extension Simulator - Small Corner Widget */}
            <div className="watson-extension dark-mode">
              <div className="ext-header">
                <div className="ext-title"><Icons.Sparkles size={16} color="var(--cyan)"/> Watson AI</div>
                <div className="ext-status-badge" id="ext-badge">ESCUCHANDO</div>
              </div>
              <div className="ext-body">
                <div className="ext-audio-box">
                  <div id="dbwave" style={{ display: "flex", alignItems: "center", gap: "3px", height: "24px", position: "relative", top: 0 }}>
                    <div className="db-wave-bar active" style={{ height: "6px" }}></div>
                    <div className="db-wave-bar active" style={{ height: "18px" }}></div>
                    <div className="db-wave-bar active" style={{ height: "12px" }}></div>
                    <div className="db-wave-bar active" style={{ height: "26px" }}></div>
                    <div className="db-wave-bar active" style={{ height: "20px" }}></div>
                    <div className="db-wave-bar active" style={{ height: "30px" }}></div>
                    <div className="db-wave-bar active" style={{ height: "14px" }}></div>
                    <div className="db-wave-bar active" style={{ height: "22px" }}></div>
                  </div>
                </div>
                <div className="ext-action-log">
                  <div className="ext-action-item" id="log-1">
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle></svg> 
                    <span>Capturando audio</span>
                  </div>
                  <div className="ext-action-item" id="log-2">
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle></svg> 
                    <span>Procesando CIE-10</span>
                  </div>
                  <div className="ext-action-item" id="log-3">
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle></svg> 
                    <span>Inyectando en DGH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-badge">
              <div className="fb-icon" style={{ background: "#ECFDF5", color: "var(--green)" }}><Icons.Shield size={20}/></div>
              <div className="fb-text">
                <h4>Guardián Clínico</h4>
                <p>Alergias verificadas &middot; Sin glosas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="about-section-dark" id="como-funciona">
        <div className="about-grid">
          <div className="reveal">
            <p className="section-tag" style={{ color: "var(--cyan)" }}>CÓMO FUNCIONA</p>
            <h2 className="section-h2" style={{ color: "white" }}>A través de IA clínica local y procesamiento en tiempo real</h2>
            <p className="section-sub" style={{ color: "rgba(255,255,255,0.7)" }}>Watson corre completamente dentro de la red de su clínica. El audio se procesa localmente. Los datos del paciente nunca salen del hospital. Cumplimiento total con Habeas Data y la Resolución 1995/1999.</p>
            <div style={{ marginTop: "36px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button className="btn-dark" style={{ fontSize: "14px", padding: "12px 24px", background: "var(--blue)", border: "none" }}>Solicitar demo &rarr;</button>
              <button className="btn-outline" style={{ fontSize: "14px", padding: "11px 22px", borderColor: "rgba(255,255,255,0.3)", color: "white" }}>Ver video</button>
            </div>
          </div>
          <div className="about-visual reveal">
            <div className="metrics-float">
              
              <div className="metric-card redesigned">
                <div className="metric-icon redesigned blue"><Icons.Mic size={24}/></div>
                <div className="metric-text redesigned">
                  <h4>Escucha y Transcripción Clínica</h4>
                  <p>Capta y transcribe la voz del médico en tiempo real con precisión.</p>
                  <div style={{ marginTop: 12, background: "var(--gray50)", padding: 8, borderRadius: 8, display: "flex", gap: 12, alignItems: "center" }}>
                     <div className="micro-anim-wave">
                        <span style={{animationDelay: "0ms"}}></span>
                        <span style={{animationDelay: "100ms", height: "16px"}}></span>
                        <span style={{animationDelay: "200ms", height: "8px"}}></span>
                     </div>
                     <div style={{ fontSize: 11, fontFamily: "monospace", color: "var(--gray600)" }}>...paciente refiere dolor</div>
                  </div>
                </div>
                <div className="metric-val redesigned green">99%</div>
              </div>

              <div className="metric-card redesigned">
                <div className="metric-icon redesigned green"><Icons.Cpu size={24}/></div>
                <div className="metric-text redesigned">
                  <h4>Análisis y Extracción de Datos Médicos</h4>
                  <p>La IA identifica entidades médicas y estructura la información para su inyección.</p>
                  <div style={{ position: "relative", marginTop: 12, background: "var(--gray50)", padding: 8, borderRadius: 8, overflow: "hidden" }}>
                     <div className="micro-anim-scanner"></div>
                     <div style={{ fontSize: 10, color: "var(--gray400)", marginBottom: 4 }}>"Acetaminofén 500mg"</div>
                     <div style={{ display: "inline-block", background: "var(--blue-light)", color: "var(--blue)", fontSize: 10, padding: "2px 6px", borderRadius: 4 }}>Medicamento</div>
                  </div>
                </div>
                <div className="metric-val redesigned">1.8s</div>
              </div>

              <div className="metric-card redesigned">
                <div className="metric-icon redesigned amber" style={{ color: "var(--amber)"}}>
                  <Icons.Shield size={24}/>
                </div>
                <div className="metric-text redesigned">
                  <h4>Validación y Verificación de Datos</h4>
                  <p>Cruza diagnósticos y medicamentos contra bases de datos de la industria.</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                     <div style={{ fontSize: 10, padding: "4px 8px", background: "var(--gray50)", borderRadius: 4 }}>M54.5</div>
                     <Icons.Arrow size={12} color="var(--gray400)"/>
                     <div style={{ fontSize: 10, padding: "4px 8px", background: "#ECFDF5", color: "var(--green)", borderRadius: 4, display: "flex", alignItems: "center", gap: 4 }}><Icons.CheckCircle size={10}/> CIE-10</div>
                  </div>
                </div>
                <div className="metric-val redesigned" style={{ color: "var(--amber)" }}>100%</div>
              </div>

              <div className="metric-card redesigned">
                <div className="metric-icon redesigned" style={{ background: "var(--blue-light)", color: "var(--blue)" }}><Icons.Clipboard size={24}/></div>
                <div className="metric-text redesigned">
                  <h4>Inyección Automática de Datos</h4>
                  <p>Completa automáticamente cada campo de la Historia Clínica del paciente.</p>
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                     <div className="micro-anim-fill" style={{ width: "80%", height: 12, background: "var(--blue-light)", borderRadius: 4 }}></div>
                     <div className="micro-anim-fill" style={{ width: "60%", height: 12, background: "var(--gray100)", borderRadius: 4, animationDelay: "0.5s" }}></div>
                  </div>
                </div>
                <div className="metric-val redesigned green">&#10003;</div>
              </div>

            </div>
          </div>
        </div>
        <div className="big-stats reveal">
          <div className="big-stats-grid">
            <div className="big-stat">
              <div className="big-stat-num" ref={c1Ref}>0</div>
              <div className="big-stat-label">min ahorrados por médico al día</div>
            </div>
            <div className="big-stat">
              <div className="big-stat-num" ref={c2Ref}>0</div>
              <div className="big-stat-label">clínicas en Colombia usan DGH</div>
            </div>
            <div className="big-stat">
              <div className="big-stat-num" ref={c3Ref}>0%</div>
              <div className="big-stat-label">datos del paciente en servidores externos</div>
            </div>
            <div className="big-stat">
              <div className="big-stat-num" ref={c4Ref}>0</div>
              <div className="big-stat-label">indicadores del SOGCS evaluados en tiempo real</div>
            </div>
          </div>
        </div>
      </section>

      <section className="auditor-section" id="watson-auditor">
      <div className="auditor-sticky-wrapper">
        <div className="auditor-left-col">
          <div className="reveal auditor-intro">
            <p className="section-tag">Watson Auditor Enterprise</p>
            <h2 className="section-h2" style={{ maxWidth: "100%", fontSize: "clamp(32px, 4vw, 48px)" }}>Automatice la revisión del 100% de las historias clínicas.</h2>
            <p className="section-sub" style={{ maxWidth: "100%" }}>Carga masiva desde PDF, análisis contra 80 indicadores SOGCS y exportación directa a Excel. El proceso de 45 minutos por HC ahora tarda 30 segundos.</p>
          </div>

          <div className="auditor-step active">
            <h4><Icons.FileUp size={28} /> Carga masiva desde PDF</h4>
            <p>Sube cientos de Historias Clínicas a la vez. Watson las separa, analiza y genera un semáforo de riesgo por cada documento en minutos.</p>
          </div>
          
          <div className="auditor-step">
            <h4><Icons.FilePen size={28} /> Cartas de contestación</h4>
            <p>Para cada glosa confirmada, el motor genera la carta legal con sustento CIE-10 y resolución pertinente, lista para ser radicada a la EPS.</p>
          </div>

          <div className="auditor-step">
            <h4><Icons.Building size={28} /> Gestión Multi-Cliente</h4>
            <p>Diseñado para firmas auditoras. Cambie entre los perfiles de sus clientes hospitalarios en un solo clic, manteniendo la seguridad de los datos.</p>
          </div>
        </div>

        <div className="auditor-right-col">
          <div className="auditor-dashboard">
            
            {/* Header */}
            <div className="dh-header">
              <div className="dh-title">Hospital San Jorge &middot; Mayo 2026 &middot; 100 HCs <Icons.ChevronRight size={14}/></div>
              <div className="dh-badge">&#9888; $18.4M en riesgo</div>
            </div>

            {/* List View */}
            <div className="dh-list">
              <div className="dh-row highlight">
                <div className="dh-dot" style={{ background: "var(--red)" }}></div>
                <span className="dh-hc">HC-001 &middot; M54.5 Lumbago</span>
                <span className="dh-score">45/100</span>
                <span className="dh-val" style={{ color: "var(--red)" }}>$2.890.000</span>
              </div>
              <div className="dh-row">
                <div className="dh-dot" style={{ background: "var(--red)" }}></div>
                <span className="dh-hc">HC-003 &middot; I10 Hipertensión</span>
                <span className="dh-score">52/100</span>
                <span className="dh-val" style={{ color: "var(--red)" }}>$1.240.000</span>
              </div>
              <div className="dh-row">
                <div className="dh-dot" style={{ background: "var(--amber)" }}></div>
                <span className="dh-hc">HC-007 &middot; E119 Diabetes</span>
                <span className="dh-score">67/100</span>
                <span className="dh-val" style={{ color: "var(--amber)" }}>$340.000</span>
              </div>
              <div className="dh-row">
                <div className="dh-dot" style={{ background: "var(--amber)" }}></div>
                <span className="dh-hc">HC-012 &middot; J069 Faringitis</span>
                <span className="dh-score">71/100</span>
                <span className="dh-val" style={{ color: "var(--amber)" }}>$180.000</span>
              </div>
              <div className="dh-row">
                <div className="dh-dot" style={{ background: "var(--green)" }}></div>
                <span className="dh-hc">HC-018 &middot; K219 ERGE</span>
                <span className="dh-score">94/100</span>
                <span className="dh-val" style={{ color: "var(--green)" }}>$0</span>
              </div>
            </div>

            {/* Slide-in Letter Panel (State 2) */}
            <div className="letter-panel" id="letter-panel">
              <div className="lp-header"><Icons.FileCheck size={16}/> Documento Generado</div>
              <div className="lp-title">Contestación Glosa HC-001</div>
              <div className="lp-skeleton" style={{ width: "100%" }}></div>
              <div className="lp-skeleton" style={{ width: "80%" }}></div>
              <div className="lp-skeleton" style={{ width: "90%" }}></div>
              
              <div style={{ marginTop: "24px", padding: "12px", background: "var(--blue-light)", borderRadius: "8px", border: "1px solid var(--blue-mid)" }}>
                <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--blue)", display: "block", marginBottom: "4px" }}>SUSTENTO CLÍNICO</span>
                <div style={{ display: "inline-block", background: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", color: "var(--navy)", border: "1px solid var(--gray200)" }}>CIE-10 M54.5</div>
              </div>
              
              <div className="lp-skeleton" style={{ width: "100%", marginTop: "24px" }}></div>
              <div className="lp-skeleton" style={{ width: "60%" }}></div>
            </div>

            {/* PDF Upload Overlay (State 0) */}
            <div className="pdf-overlay" id="pdf-overlay">
              <div className="pdf-box">
                <Icons.FileUp size={48} color="var(--blue)" style={{ marginBottom: "16px" }}/>
                <h3 style={{ color: "var(--navy)", marginBottom: "8px" }}>Suelte los PDFs aquí</h3>
                <p style={{ color: "var(--gray600)", fontSize: "14px" }}>Watson procesará hasta 500 HCs simultáneas.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      </section>

      <section className="onyx-compare-section" id="cumplimiento">
        <div className="onyx-compare-inner reveal">
          <p className="section-tag" style={{ textAlign: "center" }}>ONYX vs Nube</p>
          <h2 className="section-h2" style={{ maxWidth: "100%", textAlign: "center", margin: "0 auto" }}>
            El audio de un paciente nunca debe salir de su clínica.
          </h2>
          <p className="section-sub" style={{ textAlign: "center", margin: "16px auto 0" }}>
            Sobre 8.800 consultas/mes, así se compara IA local con IA en nube.
          </p>
          <div className="compare-cards">
            <div className="card-cloud">
              <span className="compare-label"><Icons.Cloud size={14} /> IA en nube</span>
              <h4>OpenAI / Anthropic / Google</h4>
              <ul>
                <li><Icons.Alert size={16} /> Costo por token recurrente, mes a mes.</li>
                <li><Icons.Alert size={16} /> Latencia variable según red e infraestructura externa.</li>
                <li><Icons.Alert size={16} /> El audio del paciente viaja fuera de la red de la clínica.</li>
                <li><Icons.Alert size={16} /> Dependencia de un proveedor externo y de su disponibilidad.</li>
              </ul>
              <div className="compare-savings">
                <span className="compare-val">~$8.4 M</span>
                <span className="compare-note">COP/mes estimado · costo recurrente</span>
              </div>
            </div>
            <div className="card-onyx">
              <span className="compare-label"><Icons.Cpu size={14} /> IA local · ONYX</span>
              <h4>Infraestructura de Alta Fidelidad</h4>
              <ul>
                <li><Icons.Check size={16} /> Pago único de licencia. Cero costo por consulta.</li>
                <li><Icons.Check size={16} /> Latencia controlada en LAN. &lt; 800 ms end-to-end.</li>
                <li><Icons.Check size={16} /> Datos nunca salen de la red de la institución.</li>
                <li><Icons.Check size={16} /> Cumplimiento Ley 1581 y Resolución 1995 desde el primer día.</li>
              </ul>
              <div className="compare-savings">
                <span className="compare-val onyx">$0</span>
                <span className="compare-note">COP/mes recurrente · ahorro anual ~$100 M COP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq />

      <div className="planes-section" id="planes">
        <div className="planes-inner">
          <p className="section-tag reveal" style={{ textAlign: "center" }}>Planes Watson Médico</p>
          <h2 className="section-h2 reveal" style={{ maxWidth: "100%", fontSize: "clamp(28px,3.5vw,44px)", textAlign: "center" }}>
            Tres tamaños, una filosofía: cero nube.
          </h2>
          <p className="section-sub reveal" style={{ margin: "12px auto 0", textAlign: "center" }}>
            Hardware, instalación y capacitación incluidos en todos los planes.
          </p>
          <div className="planes-grid">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`plan reveal${plan.featured ? " featured" : ""}`}>
                {plan.featured && <div className="plan-tag">{plan.tag}</div>}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-scope">{plan.scope}</div>
                <p className="plan-pitch">{plan.pitch}</p>
                <div className="plan-price">{plan.price}</div>
                <div className="plan-period">COP &middot; pago único</div>
                <div className="plan-divider"></div>
                <div className="plan-features">
                  {plan.features.map((feature) => (
                    <div key={feature} className="pf">{feature}</div>
                  ))}
                </div>
                <a
                  className="btn-plan"
                  href={whatsappUrl(`Hola, me interesa el plan "${plan.name}" de WATSON. ¿Podemos agendar una reunión?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar reunión
                </a>
              </div>
            ))}
          </div>
          <p className="reveal" style={{ marginTop: "28px", fontSize: "14px", color: "var(--gray400)" }}>¿Firma auditora o EPS? <a href="#watson-auditor" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>Ver Watson Auditor Enterprise &rarr;</a></p>
        </div>
      </div>

      <div className="cta-band">
        <h2 className="reveal">¿Listo para que Watson cuide<br/>sus <em>historias clínicas</em>?</h2>
        <p className="reveal">Le mostramos la demo en vivo en su propia instalación de Dinámica Gerencial. 20 minutos. Sin compromisos.</p>
        <div className="cta-btns reveal">
          <a className="btn-white" href={whatsappUrl("Hola, quiero agendar una demo gratuita de WATSON.")} target="_blank" rel="noopener noreferrer">Agendar demo gratuita &rarr;</a>
          <a className="btn-ghost" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-inner">
          <span className="ticker-item">Watson Médico <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Watson Auditor <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Dinámica Gerencial <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">CIE-10 + CUPS <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">MIPRES <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Habeas Data <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">IA Local <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">SOGCS <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Resolución 1888/2025 <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Watson Médico <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Watson Auditor <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Dinámica Gerencial <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">CIE-10 + CUPS <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">MIPRES <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Habeas Data <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">IA Local <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">SOGCS <span className="ticker-dot">&#10022;</span></span>
          <span className="ticker-item">Resolución 1888/2025 <span className="ticker-dot">&#10022;</span></span>
        </div>
      </div>

      <footer>
        <div className="footer-logo">{`{ ↖ `}<span>WATSON</span>{` }`}</div>
        <div className="footer-info">Desarrollado por Onyx &middot; Fusagasugá, Colombia &middot; 2026 &middot; v{__BUILD_ID__}</div>
        <div className="footer-right">Procesamiento 100% local &middot; Habeas Data garantizado</div>
      </footer>
    </>
  );
}
