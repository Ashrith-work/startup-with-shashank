import { ArrowUpRight } from "lucide-react";
import { gradients, type VentureItem } from "../content/hub";

/**
 * Poster card with a Netflix hover-zoom. Edge cards use an edge transform-origin
 * so they don't fly off the rail. Falls back to a named gradient when there's no
 * image — never empty. Honors prefers-reduced-motion (no scale).
 */
export default function VentureCard({
  item,
  position,
}: {
  item: VentureItem;
  position: "first" | "last" | "mid";
}) {
  const transformOrigin =
    position === "first"
      ? "left center"
      : position === "last"
        ? "right center"
        : "center";

  return (
    <a
      href={item.href}
      {...(item.newTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={item.label}
      style={{ transformOrigin }}
      className="group relative block aspect-video w-[260px] shrink-0 snap-start overflow-hidden rounded-card bg-surface transition-[transform,box-shadow] duration-300 ease-out hover:z-20 hover:scale-[1.27] hover:shadow-2xl hover:shadow-black/60 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:w-[300px]"
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

      <span className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-fg backdrop-blur transition group-hover:rotate-45 group-hover:bg-accent">
        <ArrowUpRight size={15} />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="font-display text-base font-bold leading-tight">
          {item.label}
        </h3>
        {/* blurb + Open reveal on hover via 0fr → 1fr grid trick */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 motion-reduce:transition-none">
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
