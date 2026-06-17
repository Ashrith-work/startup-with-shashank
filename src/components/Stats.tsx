import { stats } from "../data/site";
import Section from "./Section";
import StatCounter from "./StatCounter";

export default function Stats() {
  return (
    <Section reveal={false}>
      <div className="rounded-3xl border border-hairline bg-white/[0.02] px-6 py-14 sm:px-12">
        <div className="grid gap-12 sm:grid-cols-3">
          {stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              decimal={"decimal" in s ? s.decimal : false}
              label={s.label}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
