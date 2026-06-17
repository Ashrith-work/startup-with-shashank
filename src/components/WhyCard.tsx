import { motion } from "framer-motion";
import { BookOpen, Clock, Zap, type LucideIcon } from "lucide-react";

// Map the icon keys used in site.ts → lucide components.
const ICONS: Record<string, LucideIcon> = {
  book: BookOpen,
  zap: Zap,
  clock: Clock,
};

interface WhyCardProps {
  icon: string;
  title: string;
  body: string;
  index: number;
}

export default function WhyCard({ icon, title, body, index }: WhyCardProps) {
  const Icon = ICONS[icon] ?? BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl border border-hairline bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/20">
        <Icon size={22} strokeWidth={2} aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-relaxed text-cream/70">{body}</p>
    </motion.div>
  );
}
