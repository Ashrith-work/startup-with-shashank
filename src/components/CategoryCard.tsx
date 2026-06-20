import { motion } from "framer-motion";
import type { Category } from "../content/home";

/**
 * Single portrait category tile. `grow` drives the Netflix-style flex-expand
 * (the grid passes 1.8 for the hovered card, 0.7 for its siblings, 1 at rest).
 */
export default function CategoryCard({
  category,
  grow,
  onEnter,
  onLeave,
}: {
  category: Category;
  grow: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      animate={{ flexGrow: grow }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ flexBasis: 0 }}
      className={`group relative h-[clamp(15rem,32vw,24rem)] min-w-[68vw] shrink-0 snap-start overflow-hidden rounded-card md:min-w-0 ${
        category.comingSoon ? "opacity-70" : ""
      }`}
    >
      <img
        src={category.image}
        alt={category.label}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {category.comingSoon && (
        <span className="absolute right-3 top-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-fg backdrop-blur">
          Coming soon
        </span>
      )}

      <span className="absolute inset-x-4 bottom-4 z-20 font-display text-lg font-bold leading-tight text-fg">
        {category.label}
      </span>

      {/* Full-card click target when a destination is set. */}
      {category.url && (
        <a
          href={category.url}
          {...(category.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          aria-label={category.label}
          className="absolute inset-0 z-10"
        />
      )}
    </motion.div>
  );
}
