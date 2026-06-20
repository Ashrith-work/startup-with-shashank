import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { home } from "../content/home";

/** Two-column flagship pitch. Image stacks on top on mobile. */
export default function FlagshipCourse() {
  const f = home.flagship;

  return (
    <section id="flagship" className="py-[72px] md:py-[120px]">
      <div className="mx-auto grid max-w-content items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {f.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-section-title font-black tracking-tight">
            {f.title}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            {f.subtitle}
          </p>
          <a
            href={f.ctaUrl}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-bold text-fg transition hover:brightness-110"
          >
            {f.cta} <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-first md:order-last"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-card">
            <img
              src={f.image}
              alt={f.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
