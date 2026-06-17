import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Play, Volume2, VolumeX } from "lucide-react";
import { intro } from "../data/site";

/**
 * Full-screen intro overlay (z-index 100) shown on load with body scroll locked.
 *
 * Two video modes, driven by `intro.mp4`:
 *  - intro.mp4 set  → native <video autoplay muted loop playsinline> (recommended:
 *                     plays everywhere, no YouTube branding, full control of crop).
 *  - otherwise      → a PLAIN <iframe> youtube-nocookie embed. We deliberately do
 *                     NOT use the YouTube IFrame API — its external script is
 *                     blocked in sandboxed editor previews, so the player would
 *                     silently never load.
 *
 * IMPORTANT: YouTube embeds are blocked inside sandboxed editor previews, so the
 * iframe video only plays on a real host (Vercel) or a live preview. For
 * guaranteed playback everywhere, set `intro.mp4` to a self-hosted file.
 */

const YT_BASE = `https://www.youtube-nocookie.com/embed/${intro.youtubeId}`;
const ytSrc = (muted: boolean) =>
  `${YT_BASE}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${intro.youtubeId}` +
  `&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Intro({ onDismiss }: { onDismiss: () => void }) {
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);
  const reduceMotion = prefersReducedMotion();
  // When reduced motion is on we don't autoplay — wait for a manual play press.
  const [playing, setPlaying] = useState(!reduceMotion);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissedRef = useRef(false);

  const usingMp4 = Boolean(intro.mp4);

  // Lock body scroll while the overlay is mounted.
  useEffect(() => {
    document.body.classList.add("intro-locked");
    return () => document.body.classList.remove("intro-locked");
  }, []);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    // Stop playback so audio/video doesn't keep running behind the page.
    if (usingMp4) videoRef.current?.pause();
    setPlaying(false);
    setVisible(false);
    document.body.classList.remove("intro-locked");
    // Let the fade-out play before unmounting / revealing the page.
    window.setTimeout(onDismiss, 600);
  };

  // Dismiss on the first wheel / touch gesture.
  useEffect(() => {
    const handler = () => dismiss();
    window.addEventListener("wheel", handler, { passive: true, once: true });
    window.addEventListener("touchmove", handler, { passive: true, once: true });
    window.addEventListener("keydown", onKey);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Enter") dismiss();
    }
    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchmove", handler);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    if (usingMp4 && videoRef.current) {
      videoRef.current.muted = next;
      if (!next) void videoRef.current.play().catch(() => undefined);
    }
    // For the iframe, src is re-derived from `muted` below — a user gesture lets
    // the reloaded player start with sound.
  };

  const manualPlay = () => {
    setPlaying(true);
    if (usingMp4) void videoRef.current?.play().catch(() => undefined);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 overflow-hidden bg-ink"
          style={{ zIndex: 100 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          role="dialog"
          aria-label="Intro video"
        >
          {/* --- Video layer (z 1) --- */}
          {playing &&
            (usingMp4 ? (
              <video
                ref={videoRef}
                className="intro-media"
                autoPlay={!reduceMotion}
                muted={muted}
                loop
                playsInline
                poster={intro.poster || undefined}
                style={{ zIndex: 1 }}
              >
                <source src={intro.mp4} type="video/mp4" />
              </video>
            ) : (
              <iframe
                key={muted ? "muted" : "unmuted"}
                className="intro-media"
                src={ytSrc(muted)}
                title={intro.headline}
                allow="autoplay; encrypted-media"
                style={{ zIndex: 1 }}
              />
            ))}

          {/* --- Dark legibility gradient (z 2) --- */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 2,
              background:
                "linear-gradient(180deg, rgba(11,12,16,.72) 0%, rgba(11,12,16,.25) 35%, rgba(11,12,16,.55) 75%, rgba(11,12,16,.92) 100%)",
            }}
          />

          {/* --- Overlay UI (z 3) --- */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{ zIndex: 3 }}
          >
            {/* Top bar: wordmark + sound toggle */}
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <span className="font-display text-lg font-extrabold tracking-tight">
                Startup<span className="text-accent">With</span>Shashank
              </span>
              <button
                onClick={toggleSound}
                aria-pressed={!muted}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-black/30 text-cream backdrop-blur transition hover:border-white/30 hover:bg-black/50"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Centred title card */}
            <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent"
              >
                {intro.kicker}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
              >
                {intro.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-5 max-w-xl text-base text-cream/80 sm:text-lg"
              >
                {intro.sub}
              </motion.p>

              {/* Reduced-motion: manual play button for the video */}
              {reduceMotion && !playing && (
                <button
                  onClick={manualPlay}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-hairline bg-black/30 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:border-white/30"
                >
                  <Play size={16} /> Play video
                </button>
              )}

              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onClick={dismiss}
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-ink shadow-lg shadow-accent/20 transition hover:brightness-95"
              >
                Enter <ChevronDown size={18} />
              </motion.button>
            </div>

            {/* Bottom: scroll-to-begin chevron */}
            <div className="flex justify-center pb-8">
              <button
                onClick={dismiss}
                aria-label="Scroll to begin"
                className="flex flex-col items-center gap-2 text-cream/70 transition hover:text-cream"
              >
                <span className="text-xs uppercase tracking-[0.2em]">
                  Scroll to begin
                </span>
                <motion.span
                  animate={
                    reduceMotion ? undefined : { y: [0, 7, 0] }
                  }
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  <ChevronDown size={22} />
                </motion.span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
