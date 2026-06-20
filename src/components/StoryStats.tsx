import { motion } from "framer-motion";
import { home } from "../content/home";

/**
 * Brand-story media block + either a real stats row or, if no stats are set,
 * the `proof` credibility line. Never renders an empty band.
 */
export default function StoryStats() {
  const { story, stats, proof } = home;
  const hasStats = stats.length > 0;

  return (
    <section id="stats" className="py-[72px] md:py-[120px]">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-card"
        >
          <img
            src={story.media}
            alt=""
            loading="lazy"
            className="h-[clamp(16rem,40vw,30rem)] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <h2 className="absolute inset-x-6 bottom-6 max-w-2xl font-display text-section-title font-black tracking-tight text-fg">
            {story.headline}
          </h2>
        </motion.div>

        {hasStats ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 grid grid-cols-3 gap-6 text-center"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-black tracking-tight sm:text-6xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-wide text-muted sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="mt-12 text-center text-lg text-muted">
            {proof.line}
            {proof.waitlistCount
              ? ` · ${proof.waitlistCount}+ on the waitlist`
              : ""}
          </p>
        )}
      </div>
    </section>
  );
}
