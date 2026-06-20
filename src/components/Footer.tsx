import { Instagram, Linkedin, Youtube } from "lucide-react";
import { home } from "../content/home";

export default function Footer() {
  const f = home.footer;

  const socials = [
    { url: f.socials.instagram, Icon: Instagram, label: "Instagram" },
    { url: f.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { url: f.socials.youtube, Icon: Youtube, label: "YouTube" },
  ].filter((s) => Boolean(s.url));

  const hasApps = Boolean(f.apps.ios || f.apps.android);

  return (
    <footer id="footer" className="border-t border-white/10 bg-bg">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="max-w-md font-display text-2xl font-black leading-tight text-dim sm:text-3xl">
              {f.wordmark}
            </p>

            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-dim">Follow us</span>
                {socials.map(({ url, Icon, label }) => (
                  <a
                    key={label}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted transition hover:text-fg"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            )}

            {hasApps && (
              <div className="mt-6 flex flex-wrap gap-3">
                {f.apps.ios && (
                  <a
                    href={f.apps.ios}
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm text-muted transition hover:text-fg"
                  >
                    App Store
                  </a>
                )}
                {f.apps.android && (
                  <a
                    href={f.apps.android}
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm text-muted transition hover:text-fg"
                  >
                    Google Play
                  </a>
                )}
              </div>
            )}
          </div>

          {f.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-fg">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.url}
                      {...(l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-muted transition hover:text-fg"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-dim">
          © 2026 StartupWithShashank. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
