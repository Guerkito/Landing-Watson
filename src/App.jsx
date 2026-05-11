import { useEffect } from "react";
import {
  Header, Hero, Problem, CostStats, Affected, Solution,
  WhyDifferent, BeforeAfter, Roles, OnyxVsCloud, Pricing, FinalCTA, Footer,
} from "./components/Sections.jsx";
import { initLenis, destroyLenis } from "./lib/scroll.js";
import { initReveals, destroyReveals } from "./lib/reveals.js";
import { initMagnetic, destroyMagnetic } from "./lib/magnetic.js";

const useHeroParallax = () => {
  useEffect(() => {
    const hero = document.querySelector(".bg-hero");
    if (!hero) return;
    const sections = Array.from(document.querySelectorAll(".section"));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = hero.offsetHeight || 1;
        const p = Math.min(1, Math.max(0, window.scrollY / h));
        hero.style.setProperty("--p", p.toString());
        const vh = window.innerHeight;
        sections.forEach((s) => {
          const r = s.getBoundingClientRect();
          const entered = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.6)));
          s.style.setProperty("--sp", entered.toString());
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
};

export default function App() {
  useEffect(() => {
    initLenis();
    initReveals();
    initMagnetic();
    return () => {
      destroyLenis();
      destroyReveals();
      destroyMagnetic();
    };
  }, []);
  useHeroParallax();

  return (
    <>
      <div className="scroll-progress"/>
      <Header />
      <main>
        <Hero />
        <Problem />
        <CostStats />
        <Affected />
        <Solution />
        <WhyDifferent />
        <BeforeAfter />
        <Roles />
        <OnyxVsCloud />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
