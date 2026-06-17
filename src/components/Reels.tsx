import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { reels } from "../data/site";
import Section from "./Section";
import VideoModal from "./VideoModal";

/**
 * "Watch" section — a grid of reel tiles. Clicking a tile opens the same
 * in-page video popup the hero uses (autoplay YouTube Short, Esc / click-outside
 * to close, playback stops on close).
 *
 * Thumbnails use YouTube's auto-generated still for each videoId.
 */
export default function Reels() {
  const [active, setActive] = useState<{ videoId: string; title: string } | null>(
    null
  );

  return (
    <Section id="watch">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {reels.eyebrow}
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {reels.heading}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {reels.items.map((reel, i) => (
          <motion.button
            key={`${reel.videoId}-${i}`}
            type="button"
            onClick={() => setActive(reel)}
            aria-label={`Play: ${reel.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
            className="group relative block overflow-hidden rounded-2xl border border-hairline bg-white/[0.02] text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
          >
            <div className="relative" style={{ aspectRatio: "9 / 16" }}>
              <img
                src={`https://img.youtube.com/vi/${reel.videoId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
              <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition group-hover:scale-110">
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold leading-snug text-cream">
                {reel.title}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <VideoModal
        open={active !== null}
        videoId={active?.videoId ?? ""}
        title={active?.title}
        onClose={() => setActive(null)}
      />
    </Section>
  );
}
