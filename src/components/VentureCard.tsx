import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gradients, type VentureItem } from "../content/hub";

/**
 * Poster card with a Netflix zoom that works on BOTH pointer and touch:
 * - Desktop: hover zooms.
 * - Touch: the parent Row marks the card centered in the rail as `active`, so it
 *   auto-zooms as you scroll — no tap needed.
 * Edge cards use an edge transform-origin so they don't clip. Falls back to a
 * named gradient when there's no image. Honors prefers-reduced-motion.
 */
export default function VentureCard({
  item,
  position,
  active = false,
}: {
  item: VentureItem;
  position: "first" | "last" | "mid";
  active?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const zoomed = hovered || active;

  const transformOrigin =
    position === "first"
      ? "left center"
      : position === "last"
        ? "right center"
        : "center";

  return (
    <a
      href={item.href}
      {...(item.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={item.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transformOrigin }}
      className={`relative block aspect-video w-[72vw] shrink-0 snap-center overflow-hidden rounded-card bg-surface transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transition-none sm:w-[300px] ${
        zoomed
          ? "z-20 scale-[1.18] shadow-2xl shadow-black/60 ring-1 ring-accent/70 motion-reduce:scale-100"
          : ""
      }`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: item.gradient ? gradients[item.gradient] : undefined }}
        />
      )}

      {/* bottom scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      {item.badge && (
        <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-fg">
          {item.badge}
        </span>
      )}

      <span
        className={`absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full backdrop-blur transition ${
          zoomed ? "rotate-45 bg-accent text-fg" : "bg-black/50 text-fg"
        }`}
      >
        <ArrowUpRight size={15} />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="font-display text-base font-bold leading-tight">
          {item.label}
        </h3>
        {/* blurb + Open reveal when zoomed, via 0fr → 1fr grid trick */}
        <div
          className={`grid transition-all duration-300 motion-reduce:transition-none ${
            zoomed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="pt-1 text-xs text-fg/75">{item.blurb}</p>
            <span className="mt-1 inline-block text-xs font-semibold text-accent">
              Open ↗
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
