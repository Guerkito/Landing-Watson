import { useEffect, useState } from "react";

const QUERY = "(max-width: 880px)";

export default function useIsMobile() {
  const [match, setMatch] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setMatch(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return match;
}
