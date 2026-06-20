import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { home } from "../content/home";

/**
 * Full-width band of episode thumbnails. Hidden entirely when there are no
 * episodes (no invented data).
 */
export default function PodcastStrip() {
  const { title, subtitle, episodes } = home.podcast;
  if (episodes.length === 0) return null;

  return (
    <section id="podcast" className="bg-surface py-[72px] md:py-[120px]">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-section-title font-black uppercase tracking-tight">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-muted">{subtitle}</p>
        </motion.div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
          {episodes.map((e, i) => (
            <a
              key={`${e.videoId}-${i}`}
              href={`https://www.youtube.com/watch?v=${e.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video w-72 shrink-0 snap-start overflow-hidden rounded-card bg-bg"
            >
              <img
                src={
                  e.thumbnail ??
                  `https://img.youtube.com/vi/${e.videoId}/hqdefault.jpg`
                }
                alt={e.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition group-hover:scale-110">
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 text-sm font-semibold text-fg">
                {e.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
