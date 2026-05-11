import { gsap } from "gsap";

const MAGNETIC_SELECTOR = ".btn-primary";
const STRENGTH = 0.32;

const cleanups = [];

export function initMagnetic() {
  if (cleanups.length) return;

  document.querySelectorAll(MAGNETIC_SELECTOR).forEach((el) => {
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      gsap.to(el, { x: dx, y: dy, duration: 0.5, ease: "power3.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.5)" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { clearProps: "x,y" });
    });
  });
}

export function destroyMagnetic() {
  cleanups.forEach((fn) => fn());
  cleanups.length = 0;
}
