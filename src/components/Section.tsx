import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Disable the scroll-reveal wrapper (e.g. for full-bleed panels). */
  reveal?: boolean;
}

/**
 * Consistent vertical rhythm + max-width container with a subtle
 * fade / slide-up reveal as the section scrolls into view.
 */
export default function Section({
  id,
  children,
  className = "",
  reveal = true,
}: SectionProps) {
  const inner = (
    <div className="mx-auto w-full max-w-container px-5 sm:px-8">{children}</div>
  );

  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      {reveal ? (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {inner}
        </motion.div>
      ) : (
        inner
      )}
    </section>
  );
}
