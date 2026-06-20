// =============================================================================
// SINGLE SOURCE OF TRUTH — all hub content lives here, typed.
// Components read from `hub`; never hardcode copy/URLs in JSX.
// =============================================================================

export type GradientKey =
  | "violet"
  | "amber"
  | "magenta"
  | "orange"
  | "teal"
  | "gold"
  | "red";

export interface CtaLink {
  label: string;
  href: string;
}

export interface VentureItem {
  label: string;
  blurb: string;
  href: string;
  /** Photo (object-cover). Falls back to `gradient` when null. */
  image: string | null;
  /** Named radial gradient used when there's no image. */
  gradient: GradientKey | null;
  /** Optional corner badge: "Start here" / "Few seats" / "Soon". */
  badge?: string;
  /** Open in a new tab (external links). */
  newTab: boolean;
}

export interface Row {
  title: string;
  items: VentureItem[];
}

export interface Hub {
  profile: { name: string; logo: string };
  nav: { links: string[]; cta: string; ctaHref: string };
  hero: {
    tag: string;
    title: string;
    desc: string;
    ctas: { primary: CtaLink; secondary: CtaLink };
    videoMp4: string; // PREFERRED — 16:9 muted loop; falls back to youtubeId
    youtubeId: string; // fallback (current id is a vertical Short)
  };
  rows: Row[];
  footer: {
    blurb: string;
    social: {
      instagram: string | null;
      youtube: string | null;
      linkedin: string | null;
      x: string | null;
    };
  };
}

const COURSE_URL = "https://startup-with-shashank.vercel.app/";
const BOOK_A_CALL = "mailto:ashrith@socialhippi.com";

export const hub: Hub = {
  profile: { name: "Shashank Sivapurapu", logo: "Shashank" },

  nav: { links: ["Ventures", "Course", "Book"], cta: "Book a 1:1", ctaHref: BOOK_A_CALL },

  hero: {
    tag: "Shashank Sivapurapu",
    title: "Everything I build, in one place.",
    desc: "A founder-education brand, a marketing studio, a saree label, and a travel company — plus a book, a course, and a few 1:1 seats. Pick a door.",
    ctas: {
      primary: { label: "Start with the course", href: COURSE_URL },
      secondary: { label: "Book a 1:1", href: BOOK_A_CALL },
    },
    videoMp4: "/hero.mp4", // drop a 16:9 muted loop here; until then the Short below is used
    youtubeId: "yhdE_7azl2A", // real Shashank Short (vertical → shows as a centered column)
  },

  rows: [
    {
      title: "Start here · Learn with Shashank",
      items: [
        {
          label: "Course",
          blurb: "Founder skills they don't teach in college.",
          href: COURSE_URL,
          image: "/images/course.jpg",
          gradient: "violet",
          badge: "Start here",
          newTab: true,
        },
        {
          label: "1:1 Mentorship",
          blurb: "Direct access. Real problems, not theory.",
          href: BOOK_A_CALL,
          image: "/images/mentorship.jpg",
          gradient: "red",
          badge: "Few seats",
          newTab: false,
        },
        {
          label: "Book",
          blurb: "TODO — the book, in one line.",
          href: "#",
          image: "/images/book.jpg",
          gradient: "amber",
          badge: "Soon",
          newTab: false,
        },
        {
          label: "Start with Shashank",
          blurb: "Founder education — the real version.",
          href: COURSE_URL,
          image: "/images/startup.jpg",
          gradient: "orange",
          newTab: true,
        },
      ],
    },
    {
      title: "The companies",
      items: [
        {
          label: "Social Hippi",
          blurb: "A marketing studio for hospitality & D2C.",
          href: "https://socialhippi.com",
          image: "/images/socialhippi.jpg",
          gradient: "magenta",
          newTab: true,
        },
        {
          label: "Nerige Story",
          blurb: "Handloom sarees, woven with story.",
          href: "https://nerigestory.com",
          image: "/images/nerige.jpg",
          gradient: null,
          newTab: true,
        },
        {
          label: "Trip to Luxury",
          blurb: "Curated luxury travel, done right.",
          href: "https://tripstoluxury.com",
          image: "/images/trips.jpg",
          gradient: "gold",
          newTab: true,
        },
        {
          label: "10 Minutes Friend",
          blurb: "TODO — what is this, in one line.",
          href: "#",
          image: "/images/tenmin.jpg",
          gradient: "teal",
          badge: "Soon",
          newTab: false,
        },
      ],
    },
  ],

  footer: {
    blurb:
      "Founder, educator, and the name behind a handful of companies. Everything I build lives here.",
    social: {
      instagram: "https://instagram.com/startupwithshashank",
      youtube: null,
      linkedin: null,
      x: null,
    },
  },
};

// Radial dark gradients used as card fallbacks when an item has no image.
export const gradients: Record<GradientKey, string> = {
  violet: "radial-gradient(120% 100% at 40% 22%,#5b3b8a,#241646 46%,#0a0814 84%)",
  amber: "radial-gradient(120% 100% at 40% 22%,#9a5a1c,#4a2c0d 46%,#0c0704 84%)",
  magenta: "radial-gradient(120% 100% at 45% 22%,#8a2360,#451030 46%,#10060c 84%)",
  orange: "radial-gradient(120% 100% at 40% 22%,#b5481c,#5e2410 46%,#140a06 84%)",
  teal: "radial-gradient(120% 100% at 40% 22%,#1c6a6a,#0e3434 46%,#04100f 84%)",
  gold: "radial-gradient(120% 100% at 40% 22%,#9a7a2c,#4a3a12 46%,#0c0a04 84%)",
  red: "radial-gradient(120% 100% at 50% 22%,#8a2230,#3d0f16 46%,#0b0506 84%)",
};
