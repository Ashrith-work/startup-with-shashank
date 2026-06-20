import { stats } from "../data/site";
import Section from "./Section";
import StatCounter from "./StatCounter";

export default function Stats() {
  return (
    <Section reveal={false}>
      <div className="rounded-3xl border border-hairline bg-white/[0.02] px-6 py-10 sm:px-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
          {stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              decimal={Boolean((s as { decimal?: boolean }).decimal)}
              label={s.label}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
