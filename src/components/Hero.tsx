import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { hero } from "../data/site";
import SmartImage from "./SmartImage";
import VideoModal from "./VideoModal";

/**
 * Centered hero. The trailing `hero.headlineAccent` phrase (if it appears at the
 * end of the headline) is rendered in the brand accent colour.
 */
export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { headline, headlineAccent } = hero;
  const hasAccent =
    headlineAccent && headline.endsWith(headlineAccent);
  const lead = hasAccent
    ? headline.slice(0, headline.length - headlineAccent.length)
    : headline;

  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden pt-20"
    >
      {/* soft radial accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <div className="mx-auto w-full max-w-container px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-block rounded-full border border-hairline bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream/70"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
        >
          {lead}
          {hasAccent && <span className="text-accent">{headlineAccent}</span>}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/75"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={hero.primaryCta.url}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-ink shadow-lg shadow-accent/20 transition hover:brightness-95"
          >
            {hero.primaryCta.label} <ArrowRight size={18} />
          </a>
          <a
            href={hero.secondaryCta.url}
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3 font-semibold transition hover:border-white/30 hover:bg-white/5"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>

        {/* Promo image with play button → opens the video popup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Play video: ${hero.videoCaption}`}
            className="group relative block w-full overflow-hidden rounded-3xl border border-hairline shadow-2xl shadow-black/40"
          >
            <SmartImage
              src={hero.promoImage}
              alt={hero.videoCaption}
              fit="cover"
              fallbackLabel={hero.videoCaption}
              className="aspect-video w-full"
            />
            <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
            <span className="absolute inset-0 m-auto flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_rgba(0,0,0,.33)] transition group-hover:scale-105">
              <Play size={26} fill="currentColor" className="ml-1" />
            </span>
          </button>
        </motion.div>

        <motion.a
          href="#flagship"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 inline-flex flex-col items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-cream/50 transition hover:text-cream/80"
        >
          Uncover what's next
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <ChevronDown size={18} />
          </motion.span>
        </motion.a>
      </div>

      <VideoModal
        open={videoOpen}
        videoId={hero.videoId}
        title={hero.videoCaption}
        onClose={() => setVideoOpen(false)}
      />
    </section>
  );
}
