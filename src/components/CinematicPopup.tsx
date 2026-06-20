import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { home } from "../content/home";

const SEEN_KEY = "sws-intro-seen";

/**
 * Auto-opening, muted, cinematic video popup shown once per browser session.
 * - Slow fade-in of the backdrop + a gentle continuous Ken Burns zoom on the
 *   video for a cinematic feel.
 * - Muted autoplay (required by browsers) with a tap-to-unmute toggle. The
 *   iframe is re-keyed on mute change so a user gesture can start sound.
 * - Esc / click-outside / Close dismiss it; the iframe unmounts so audio stops.
 * Respects prefers-reduced-motion (no zoom, instant fade).
 */
export default function CinematicPopup() {
  const { videoId, caption } = home.hero.video;
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const reduce = useReducedMotion();

  // Auto-open once per session, after a short beat.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* sessionStorage unavailable — just show it */
    }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}` +
    `&controls=0&rel=0&playsinline=1&modestbranding=1`;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 1.1, ease: "easeInOut" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={caption}
        >
          <motion.div
            className="relative w-[min(420px,92vw)]"
            initial={reduce ? false : { scale: 0.96, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={reduce ? undefined : { scale: 0.96, opacity: 0 }}
            transition={{ duration: reduce ? 0.2 : 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -top-11 right-0 flex items-center gap-5">
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                aria-pressed={!muted}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition hover:text-muted"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {muted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={close}
                aria-label="Close video"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition hover:text-muted"
              >
                <X size={16} /> Close
              </button>
            </div>

            <div
              className="overflow-hidden rounded-card bg-black shadow-2xl"
              style={{ aspectRatio: "9 / 16" }}
            >
              {/* Gentle continuous zoom (Ken Burns) for the cinematic feel. */}
              <motion.div
                className="h-full w-full"
                initial={reduce ? false : { scale: 1.04 }}
                animate={reduce ? undefined : { scale: 1.12 }}
                transition={{
                  duration: 16,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <iframe
                  key={muted ? "muted" : "unmuted"}
                  className="h-full w-full border-0"
                  src={src}
                  title={caption}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </div>

            <p className="mt-4 text-center text-sm text-muted">{caption}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
