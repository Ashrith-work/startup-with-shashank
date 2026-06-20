import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Row as RowType } from "../content/hub";
import VentureCard from "./VentureCard";

/**
 * Titled horizontal rail of poster cards. Vertical padding gives the zoom room
 * (overflow-x:auto clips overflow-y).
 * - Desktop: hover arrows scroll by ~0.8 viewport; cards zoom on hover.
 * - Touch: the card centered in the rail is marked `active` so it auto-zooms as
 *   you scroll (no tap needed).
 */
export default function Row({ row, id }: { row: RowType; id?: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scroll = (dir: number) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * 0.8 * el.clientWidth, behavior: "smooth" });
  };

  // On touch devices, track which card is centered so it can auto-zoom.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;
    if (!isTouch) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const node = c as HTMLElement;
        const cc = node.offsetLeft + node.offsetWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIndex(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="group/row relative"
    >
      <h2 className="mb-1 px-5 font-display text-xl font-extrabold tracking-tight sm:px-12 sm:text-2xl">
        {row.title}
      </h2>

      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="absolute left-1 top-[58%] z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-fg opacity-0 transition hover:bg-black/80 group-hover/row:opacity-100 md:flex"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={rail}
        className="flex gap-2 overflow-x-auto scroll-smooth px-5 py-[54px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-12"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {row.items.map((item, i) => (
          <VentureCard
            key={item.label}
            item={item}
            active={activeIndex === i}
            position={
              i === 0 ? "first" : i === row.items.length - 1 ? "last" : "mid"
            }
          />
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="absolute right-1 top-[58%] z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-fg opacity-0 transition hover:bg-black/80 group-hover/row:opacity-100 md:flex"
      >
        <ChevronRight size={24} />
      </button>
    </motion.section>
  );
}
