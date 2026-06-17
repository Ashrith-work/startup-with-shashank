import { ArrowRight, Sparkles } from "lucide-react";
import { flagship } from "../data/site";
import Section from "./Section";
import SmartImage from "./SmartImage";

export default function Flagship() {
  return (
    <Section id="flagship">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy column */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {flagship.eyebrow}
          </p>
          {flagship.badge && (
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-accent/20">
              <Sparkles size={13} /> {flagship.badge}
            </span>
          )}
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {flagship.title}
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-cream/75">
            {flagship.body}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold">
              {flagship.priceNow}
            </span>
            {flagship.priceWas && (
              <span className="text-lg text-cream/40 line-through">
                {flagship.priceWas}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm text-cream/55">{flagship.meta}</p>

          <a
            href={flagship.cta.url}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-ink shadow-lg shadow-accent/20 transition hover:brightness-95"
          >
            {flagship.cta.label} <ArrowRight size={18} />
          </a>
        </div>

        {/* Image / gradient card column */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-hairline shadow-2xl shadow-black/40">
            <SmartImage
              src={flagship.image}
              alt={`${flagship.title} course cover`}
              fit="cover"
              fallbackLabel={flagship.title}
              className="h-full w-full"
            />

            {/* Flagship tag */}
            <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold backdrop-blur">
              Flagship
            </span>

            {/* modules / lessons chip */}
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-cream/80 backdrop-blur">
              {flagship.meta.split("·").slice(0, 2).join("·").trim()}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
