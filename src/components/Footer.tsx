import { Instagram, Linkedin, Youtube } from "lucide-react";
import { brand, footer } from "../data/site";

export default function Footer() {
  const socials = [
    { key: "instagram", url: footer.socials.instagram, Icon: Instagram, label: "Instagram" },
    { key: "linkedin", url: footer.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { key: "youtube", url: footer.socials.youtube, Icon: Youtube, label: "YouTube" },
  ].filter((s) => s.url);

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-container gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand + app badges */}
        <div>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Startup<span className="text-accent">With</span>Shashank
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
            {brand.tagline}
          </p>

          {(footer.appStore.ios || footer.appStore.android) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {footer.appStore.ios && (
                <a
                  href={footer.appStore.ios}
                  className="rounded-xl border border-hairline px-4 py-2.5 text-sm font-medium transition hover:border-white/30 hover:bg-white/5"
                >
                  Download on iOS
                </a>
              )}
              {footer.appStore.android && (
                <a
                  href={footer.appStore.android}
                  className="rounded-xl border border-hairline px-4 py-2.5 text-sm font-medium transition hover:border-white/30 hover:bg-white/5"
                >
                  Get it on Android
                </a>
              )}
            </div>
          )}
        </div>

        {/* Explore column */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream/50">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm text-cream/75">
            {footer.nav.explore.map((l) => (
              <li key={l.label}>
                <a href={l.url} className="transition hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream/50">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm text-cream/75">
            {footer.nav.company.map((l) => (
              <li key={l.label}>
                <a href={l.url} className="transition hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ventures column — Shashank's other brands */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream/50">
            Ventures
          </h3>
          <ul className="space-y-2.5 text-sm text-cream/75">
            {footer.ventures.map((l) => (
              <li key={l.label}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal line + socials */}
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-cream/50">
            © 2026 {brand.name}. All rights reserved.
          </p>
          {socials.length > 0 && (
            <div className="flex items-center gap-3">
              {socials.map(({ key, url, Icon, label }) => (
                <a
                  key={key}
                  href={url}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-cream/70 transition hover:border-white/30 hover:text-cream"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
