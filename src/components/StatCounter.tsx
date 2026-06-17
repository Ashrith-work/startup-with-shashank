import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  decimal?: boolean;
  label: string;
}

/**
 * Framer-Motion count-up. Animates from 0 → value the first time it scrolls
 * into view. Respects prefers-reduced-motion (jumps straight to the value).
 */
export default function StatCounter({
  value,
  suffix = "",
  decimal = false,
  label,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  const formatted = decimal ? display.toFixed(1) : Math.round(display).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
        {formatted}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wide text-cream/60">
        {label}
      </div>
    </motion.div>
  );
}
