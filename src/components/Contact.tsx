import { Instagram, Mail } from "lucide-react";
import { contact } from "../data/site";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact">
      <div className="rounded-3xl border border-hairline bg-white/[0.02] px-6 py-14 sm:px-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {contact.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {contact.heading}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/75">
              {contact.body}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-3 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/20">
                <Mail size={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-cream/50">
                  Email us
                </span>
                <span className="font-display text-lg font-bold">
                  {contact.email}
                </span>
              </span>
            </a>

            {contact.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-2xl border border-hairline bg-white/[0.02] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/20">
                  <Instagram size={20} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-cream/50">
                    DM us
                  </span>
                  <span className="font-display text-lg font-bold">
                    @startupwithshashank
                  </span>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
