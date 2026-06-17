import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          ? "border-b border-hairline bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-extrabold tracking-tight"
        >
          Startup<span className="text-accent">With</span>Shashank
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm text-cream/80">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.url} className="transition hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#flagship"
            className="rounded-full border border-hairline px-5 py-2 text-sm font-semibold transition hover:border-white/30 hover:bg-white/5"
          >
            Sign in
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hairline md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-hairline bg-ink/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-container flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.url}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-cream/80 transition hover:bg-white/5 hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#flagship"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-accent px-3 py-2.5 text-center font-semibold text-ink"
              >
                Sign in
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
