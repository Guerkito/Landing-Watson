import { useEffect, useRef, useState } from "react";

export const Eyebrow = ({ children, color }) => (
  <div className="eyebrow-row" style={color ? { color } : null}>{children}</div>
);

export const Button = ({ kind = "primary", children, large, href, target, rel, ...rest }) => {
  const className = `btn btn-${kind}${large ? " btn-lg" : ""}`;
  if (href) {
    return (
      <a className={className} href={href} target={target} rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export function useCountUp(target, decimals = 0) {
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

export const Counter = ({ to, decimals = 0, suffix, prefix }) => {
  const [val, ref] = useCountUp(to, decimals);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("es-CO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
};
