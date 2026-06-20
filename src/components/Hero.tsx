import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import { home } from "../content/home";
import RotatingWord from "./RotatingWord";
import CategoryGrid from "./CategoryGrid";
import VideoModal from "./VideoModal";

/**
 * Centered hero: rotating-emphasis headline + Telugu sub-line (the brand
 * differentiator stays here, not in the footer), an Instagram Follow button and
 * a Watch button that opens the YouTube Short popup, with the category grid below.
 */
export default function Hero() {
  const { prefix, rotating, teluguSubline, instagram, video } = home.hero;
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="top" className="px-6 pt-28 sm:pt-36">
      <div className="mx-auto max-w-content text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl font-display text-hero font-black tracking-tight text-muted"
        >
          {prefix}
          <RotatingWord words={rotating} />
          <span className="text-fg">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          lang="te"
          style={{ fontFamily: '"Noto Sans Telugu", system-ui, sans-serif' }}
          className="mt-6 text-lg text-muted sm:text-xl"
        >
          {teluguSubline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 font-bold text-fg transition hover:brightness-110"
          >
            <Instagram size={18} /> Follow on Instagram
          </a>
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3 font-bold text-fg transition hover:border-white/30 hover:bg-white/5"
          >
            <Play size={18} /> Watch
          </button>
        </motion.div>
      </div>

      <div className="mx-auto mt-14 max-w-content">
        <CategoryGrid categories={home.categories} />
      </div>

      <VideoModal
        open={videoOpen}
        videoId={video.videoId}
        title={video.caption}
        onClose={() => setVideoOpen(false)}
      />
    </section>
  );
}
