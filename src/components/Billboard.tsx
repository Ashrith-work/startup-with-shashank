import { motion } from "framer-motion";
import { Info, Play } from "lucide-react";
import { hub } from "../content/hub";
import VideoBackground from "./VideoBackground";

const HERO_FALLBACK =
  "radial-gradient(75% 80% at 72% 28%,#2c3a16,#161a0e 42%,#0B0C0A 82%)";

export default function Billboard() {
  const h = hub.hero;
  const { primary, secondary } = h.ctas;

  return (
    <section
      id="top"
      className="relative flex min-h-[80vh] items-end overflow-hidden bg-bg"
    >
      <VideoBackground
        mp4={h.videoMp4}
        youtubeId={h.youtubeId}
        poster={h.poster}
        fallback={HERO_FALLBACK}
      />

      {/* z2 glow + legibility fade + overall dim */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(60% 60% at 75% 30%, rgba(198,242,78,.14), transparent 60%)," +
            "linear-gradient(180deg, rgba(10,10,10,.15) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,.92) 100%)," +
            "linear-gradient(90deg, rgba(10,10,10,.75) 0%, rgba(10,10,10,0) 55%)," +
            "rgba(10,10,10,.28)",
        }}
      />

      {/* z3 content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 w-full max-w-[640px] px-5 pb-16 pt-32 sm:px-12 sm:pb-20"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {h.tag}
        </p>
        <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {h.title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-fg/80 sm:text-lg">{h.desc}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={primary.href}
            {...(primary.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-bg transition hover:bg-white/90"
          >
            <Play size={18} fill="currentColor" /> {primary.label}
          </a>
          <a
            href={secondary.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-7 py-3 font-bold text-fg backdrop-blur transition hover:bg-white/25"
          >
            <Info size={18} /> {secondary.label}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
