import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { home } from "../content/home";

/**
 * Hidden at the top; slides in once the hero is scrolled past.
 * Desktop: bottom-right pill. Mobile: full-width bottom bar.
 */
export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const { cta, ctaUrl } = home.nav;

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={ctaUrl}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-accent px-6 py-4 font-bold text-fg shadow-2xl transition hover:brightness-110 md:inset-x-auto md:bottom-6 md:right-6 md:rounded-full md:px-7 md:py-3"
        >
          {cta} <ArrowRight size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
