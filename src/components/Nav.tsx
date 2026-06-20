import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { hub } from "../content/hub";

/** Maps a nav label to an in-page anchor. */
const hrefFor = (label: string) =>
  label === "Ventures"
    ? "#companies"
    : label === "Course" || label === "Book"
      ? "#learn"
      : "#top";

/** Dark Netflix-style nav: transparent over the billboard, solid after scroll. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { links, cta, ctaHref } = hub.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-5 sm:px-12">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight"
        >
          <span className="inline-block h-5 w-5 rounded-[5px] bg-accent" />
          {hub.profile.logo}
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-7 min-[860px]:flex">
          {links.map((l) => (
            <a
              key={l}
              href={hrefFor(l)}
              className="text-sm font-medium text-fg/80 transition hover:text-fg"
            >
              {l}
            </a>
          ))}
          <a
            href={ctaHref}
            className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-fg transition hover:brightness-110"
          >
            {cta}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line min-[860px]:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg/95 backdrop-blur min-[860px]:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <a
                key={l}
                href={hrefFor(l)}
                onClick={() => setOpen(false)}
                className="py-2.5 text-fg/80 transition hover:text-fg"
              >
                {l}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center font-bold text-fg"
            >
              {cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
