import { Instagram, Linkedin, Youtube } from "lucide-react";
import { hub } from "../content/hub";

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external: boolean }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
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
  );
}

export default function Footer() {
  const { footer, rows, profile } = hub;
  const toLinks = (items: typeof rows[number]["items"]) =>
    items.map((i) => ({ label: i.label, href: i.href, external: i.newTab }));

  const socials = [
    { url: footer.social.instagram, Icon: Instagram, label: "Instagram" },
    { url: footer.social.youtube, Icon: Youtube, label: "YouTube" },
    { url: footer.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
  ].filter((s) => Boolean(s.url));

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-12">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight">
              <span className="inline-block h-5 w-5 rounded-[5px] bg-accent" />
              {profile.logo}
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">{footer.blurb}</p>
          </div>

          <FooterCol title="Learn" links={toLinks(rows[0].items)} />
          <FooterCol title="Companies" links={toLinks(rows[1].items)} />

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide">Connect</h3>
            {socials.length > 0 && (
              <div className="mt-4 flex gap-3">
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
          </div>
        </div>

        <p className="mt-12 text-xs text-dim">
          © 2026 {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
