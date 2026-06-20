import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Row as RowType } from "../content/hub";
import VentureCard from "./VentureCard";

/**
 * A titled horizontal rail of poster cards. Vertical padding gives the
 * hover-zoom room (overflow-x:auto clips overflow-y). Desktop hover arrows
 * scroll by ~0.8 viewport.
 */
export default function Row({ row, id }: { row: RowType; id?: string }) {
  const rail = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * 0.8 * el.clientWidth, behavior: "smooth" });
  };

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
        style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: "20px" }}
      >
        {row.items.map((item, i) => (
          <VentureCard
            key={item.label}
            item={item}
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
