import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Category } from "../content/home";
import CategoryCard from "./CategoryCard";

/**
 * Row of portrait category cards.
 * - Desktop: Netflix-style hover-expand (hovered card grows, siblings shrink).
 * - Mobile: horizontal scroll with scroll-snap.
 * Renders nothing if there are no categories (never pad with placeholders).
 */
export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  if (categories.length === 0) return null;

  const growFor = (i: number) => {
    if (reduce || hovered === null) return 1;
    return hovered === i ? 1.8 : 0.7;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden md:overflow-x-visible"
      style={{ scrollbarWidth: "none" }}
    >
      {categories.map((c, i) => (
        <CategoryCard
          key={c.label}
          category={c}
          grow={growFor(i)}
          onEnter={() => !reduce && setHovered(i)}
          onLeave={() => setHovered(null)}
        />
      ))}
    </motion.div>
  );
}
