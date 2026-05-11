import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const REVEAL_CARD_SELECTOR =
  ".eyebrow-row, .section-lede, .problem-card, .stat-card, .affected-card, .why-card, .role-card, .plan, .compare-cards > div, .final-cta, .hero-visual, .compare-wrap, .h-scroll-card";

const splitInstances = [];
let initialized = false;

export function initReveals() {
  if (initialized) return;
  initialized = true;

  requestAnimationFrame(() => {
    const titles = document.querySelectorAll("h1, .section-title");
    titles.forEach((el) => {
      if (el.dataset.splitDone === "1") return;
      el.dataset.splitDone = "1";

      const split = new SplitType(el, { types: "words", tagName: "span" });
      splitInstances.push(split);

      gsap.set(split.words, { yPercent: 110, opacity: 0 });

      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.05,
        stagger: 0.045,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });

      Array.from(el.querySelectorAll(".word")).forEach((w) => {
        w.style.display = "inline-block";
        w.style.overflow = "hidden";
        w.style.lineHeight = "1.05";
        w.style.paddingBottom = "0.05em";
      });
    });

    document.querySelectorAll(REVEAL_CARD_SELECTOR).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  });
}

export function destroyReveals() {
  splitInstances.forEach((s) => s.revert?.());
  splitInstances.length = 0;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  initialized = false;
}
