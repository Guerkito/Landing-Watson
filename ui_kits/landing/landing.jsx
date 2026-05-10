/* eslint-disable */
const { useEffect: useFx } = React;

// Global scroll wiring: reveals + hero parallax + per-section progress
const useScrollSystem = () => {
  useFx(() => {
    // Auto-tag cards/headings for reveal animation
    const revealSelectors = ".section-title, .section-lede, .eyebrow-row, .problem-card, .stat-card, .affected-card, .why-card, .role-card, .plan, .compare-cards > div, .final-cta, .hero-visual, .compare-wrap";
    document.querySelectorAll(revealSelectors).forEach((el, i) => {
      el.setAttribute("data-reveal", "");
      el.setAttribute("data-reveal-delay", String(i % 4));
    });

    // Reveal observer (fallback when view-timeline unsupported)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-in"); });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // Hero parallax — set --p on .bg-hero based on scroll progress past hero
    const hero = document.querySelector(".bg-hero");
    // Section progress for titles
    const sections = Array.from(document.querySelectorAll(".section"));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (hero) {
          const h = hero.offsetHeight || 1;
          const p = Math.min(1, Math.max(0, window.scrollY / h));
          hero.style.setProperty("--p", p.toString());
        }
        const vh = window.innerHeight;
        sections.forEach((s) => {
          const r = s.getBoundingClientRect();
          // 0 when top entered, 1 when near middle
          const entered = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.6)));
          s.style.setProperty("--sp", entered.toString());
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); io.disconnect(); };
  }, []);
};

const App = () => {
  useScrollSystem();
  return (
    <>
      <div className="scroll-progress"/>
      <WATSONHeader />
      <main>
        <WATSONHero />
        <WATSONProblem />
        <WATSONCostStats />
        <WATSONAffected />
        <WATSONSolution />
        <WATSONWhyDifferent />
        <WATSONBeforeAfter />
        <WATSONRoles />
        <WATSONOnyxVsCloud />
        <WATSONPricing />
        <WATSONFinalCTA />
      </main>
      <WATSONFooter />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
