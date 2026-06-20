import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX, X } from "lucide-react";
import { home } from "../content/home";

const SEEN_KEY = "sws-intro-seen";

/**
 * Full-screen cinematic intro shown once per browser session.
 * - Plays a self-hosted MP4 (native <video>, object-cover) for a clean,
 *   chrome-free full-bleed look. Falls back to the YouTube Short if `mp4` is
 *   empty or the file fails to load.
 * - Slow fade-in + gentle continuous Ken Burns zoom + dark legibility gradient.
 * - Muted autoplay (browsers require it) with a tap-to-unmute toggle.
 * - "Enter" / Close / Esc dismiss it; media unmounts so audio stops.
 * - Respects prefers-reduced-motion.
 */
export default function CinematicPopup() {
  const { mp4, poster, videoId, caption } = home.hero.video;
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [mp4Failed, setMp4Failed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const usingMp4 = Boolean(mp4) && !mp4Failed;

  // Auto-open once per session, after a short beat.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* sessionStorage unavailable — just show it */
    }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    if (usingMp4) videoRef.current?.pause();
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  // Esc / Enter to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    const v = videoRef.current;
    if (usingMp4 && v) {
      v.muted = next;
      if (!next) void v.play().catch(() => undefined);
    }
    // For the YouTube fallback, the iframe is re-keyed on `muted` below so the
    // user gesture can start sound.
  };

  const ytSrc =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}` +
    `&controls=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3`;

  const zoom = reduce
    ? {}
    : {
        initial: { scale: 1.05 },
        animate: { scale: 1.14 },
        transition: {
          duration: 18,
          ease: "easeInOut" as const,
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
      };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 1.2, ease: "easeInOut" }}
          role="dialog"
          aria-modal="true"
          aria-label={caption}
        >
          {/* Media cover layer with a slow, continuous cinematic zoom. */}
          <motion.div className="absolute inset-0" {...zoom}>
            {usingMp4 ? (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted={muted}
                loop
                playsInline
                poster={poster || undefined}
                onError={() => setMp4Failed(true)}
              >
                <source src={mp4} type="video/mp4" />
              </video>
            ) : (
              <iframe
                key={muted ? "muted" : "unmuted"}
                className="cinematic-media"
                src={ytSrc}
                title={caption}
                allow="autoplay; encrypted-media; picture-in-picture"
              />
            )}
          </motion.div>

          {/* Dark legibility gradient. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.12) 35%, rgba(0,0,0,.45) 72%, rgba(0,0,0,.9) 100%)",
            }}
          />

          {/* Overlay UI. */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <span className="font-display text-lg font-black tracking-tight text-fg">
                Startup<span className="text-accent">With</span>Shashank
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  aria-pressed={!muted}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-4 text-sm font-semibold text-fg backdrop-blur transition hover:bg-black/50"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {muted ? "Unmute" : "Mute"}
                </button>
                <button
                  onClick={close}
                  aria-label="Close intro"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-fg backdrop-blur transition hover:bg-black/50"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mt-auto flex flex-col items-center gap-4 px-6 pb-12 text-center">
              <p className="max-w-xl text-sm text-fg/80">{caption}</p>
              <button
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-bold text-fg shadow-lg transition hover:brightness-110"
              >
                Enter <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
