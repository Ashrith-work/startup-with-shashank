import { why } from "../data/site";
import Section from "./Section";
import WhyCard from "./WhyCard";

export default function Why() {
  return (
    <Section id="why">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {why.eyebrow}
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {why.heading}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {why.cards.map((card, i) => (
          <WhyCard key={card.title} index={i} {...card} />
        ))}
      </div>
    </Section>
  );
}
