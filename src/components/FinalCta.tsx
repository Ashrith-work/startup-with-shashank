import { ArrowRight } from "lucide-react";
import { finalCta } from "../data/site";
import Section from "./Section";

export default function FinalCta() {
  return (
    <Section id="final">
      <div
        className="relative overflow-hidden rounded-3xl border border-hairline px-6 py-16 text-center sm:px-12 sm:py-20"
        style={{
          background:
            "radial-gradient(120% 140% at 50% 0%, color-mix(in srgb, var(--accent) 22%, #0B0C10) 0%, #101117 60%, #0B0C10 100%)",
        }}
      >
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {finalCta.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/75">
          {finalCta.body}
        </p>
        <a
          href={finalCta.cta.url}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-semibold text-ink shadow-lg shadow-accent/25 transition hover:brightness-95"
        >
          {finalCta.cta.label} <ArrowRight size={18} />
        </a>
      </div>
    </Section>
  );
}
