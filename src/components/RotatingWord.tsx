import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Cycles through `words`, swapping the visible one every ~2.2s with a vertical
 * slide + fade. The words are stacked in a single grid cell so the swap happens
 * in place. Respects prefers-reduced-motion (no transform, no auto-cycle).
 */
export default function RotatingWord({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const id = window.setInterval(
      () => setI((p) => (p + 1) % words.length),
      2200
    );
    return () => window.clearInterval(id);
  }, [words.length, reduce]);

  const word = words[i] ?? "";

  return (
    <span className={`relative inline-grid align-bottom ${className}`}>
      {/* Invisible widest word reserves the box so layout doesn't jump. */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={reduce ? false : { y: "0.7em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-0.7em", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap text-fg"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
