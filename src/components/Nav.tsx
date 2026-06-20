import { useState } from "react";
import { Menu, X } from "lucide-react";
import { home } from "../content/home";

/** Sticky LIGHT nav bar sitting over the dark body. Collapses to a sheet on mobile. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const { links, cta, ctaUrl } = home.nav;

  return (
    <header className="sticky top-0 z-50 bg-nav text-ink">
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <a href="#top" className="font-display text-lg font-black tracking-tight">
          StartupWithShashank
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              className="text-sm font-medium text-ink/70 transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-fg transition hover:brightness-110"
          >
            {cta}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 md:hidden">
          <div className="mx-auto flex max-w-content flex-col px-6 py-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                onClick={() => setOpen(false)}
                className="py-2.5 text-ink/80 transition hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href={ctaUrl}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-accent px-5 py-2.5 text-center font-bold text-fg"
            >
              {cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
