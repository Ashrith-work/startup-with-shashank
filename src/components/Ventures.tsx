import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ventures } from "../data/site";
import Section from "./Section";
import SmartImage from "./SmartImage";

// Status → pill colour.
const STATUS_STYLE: Record<string, string> = {
  Live: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20",
  "In the works": "bg-accent/15 text-accent ring-accent/20",
  "Coming soon": "bg-sky-500/15 text-sky-300 ring-sky-400/20",
  Closed: "bg-white/10 text-cream/50 ring-white/15",
};

export default function Ventures() {
  return (
    <Section id="ventures">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {ventures.eyebrow}
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {ventures.heading}
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ventures.cards.map((card, i) => {
          const pill =
            STATUS_STYLE[card.status] ?? "bg-white/10 text-cream/60 ring-white/15";
          const clickable = Boolean(card.url);

          const inner = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={card.image}
                  alt={card.name}
                  fit="contain"
                  fallbackLabel={card.name}
                  className="h-full w-full bg-black/20"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${pill}`}
                >
                  {card.status}
                  {card.year ? ` · ${card.year}` : ""}
                </span>
                {clickable && card.external && (
                  <span className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-cream opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight size={15} />
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <h3 className="font-display text-base font-bold">{card.name}</h3>
              </div>
            </>
          );

          const cardClass =
            "group block overflow-hidden rounded-2xl border border-hairline bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/40";

          return (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              {clickable ? (
                <a
                  href={card.url}
                  className={cardClass}
                  {...(card.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {inner}
                </a>
              ) : (
                <div className={`${cardClass} cursor-default`}>{inner}</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
