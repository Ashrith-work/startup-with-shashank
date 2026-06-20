// =============================================================================
// SINGLE SOURCE OF TRUTH — all homepage content lives here, typed.
// Components read from `home`; never hardcode copy in JSX.
// Integrity: leave a slot empty to HIDE its module — never pad with fake data.
// =============================================================================

export interface NavLink {
  label: string;
  url: string;
}

export interface Category {
  label: string;
  image: string;
  /** Optional destination — card becomes clickable when set. */
  url?: string;
  /** Open `url` in a new tab. */
  external?: boolean;
  /** Renders a "Coming soon" badge + dims the card. */
  comingSoon?: boolean;
}

export interface Episode {
  title: string;
  /** YouTube id; thumbnail auto-derived if `thumbnail` is omitted. */
  videoId: string;
  thumbnail?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface HomeContent {
  nav: { links: NavLink[]; cta: string; ctaUrl: string };
  hero: {
    prefix: string;
    rotating: string[];
    teluguSubline: string;
    instagram: string;
    video: {
      /** Self-hosted MP4 (recommended for a clean full-screen cinematic look). */
      mp4: string;
      /** Optional poster shown while the MP4 loads. */
      poster?: string;
      /** YouTube fallback id (used if `mp4` is empty or fails to load). */
      videoId: string;
      caption: string;
    };
  };
  categories: Category[];
  podcast: { title: string; subtitle: string; episodes: Episode[] };
  flagship: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaUrl: string;
    image: string;
  };
  story: { headline: string; media: string };
  stats: Stat[];
  proof: { line: string; waitlistCount: number | null };
  footer: {
    wordmark: string;
    columns: FooterColumn[];
    socials: { instagram?: string; linkedin?: string; youtube?: string };
    apps: { ios: string | null; android: string | null };
  };
}

export const home: HomeContent = {
  nav: {
    links: [
      { label: "Courses", url: "#flagship" },
      { label: "Collab", url: "#story" },
      { label: "Blogs", url: "#story" },
      { label: "Reviews", url: "#stats" },
      { label: "Careers", url: "#footer" },
      { label: "Support", url: "mailto:ashrith@socialhippi.com" },
      { label: "Sign In", url: "#flagship" },
    ],
    cta: "Join the Waitlist",
    ctaUrl: "#flagship",
  },

  hero: {
    prefix: "Stop scrolling. Start ",
    rotating: ["building", "pitching", "closing", "fundraising"],
    // TODO: confirm exact wording with Shashank / a native speaker before shipping.
    teluguSubline: "కాలేజీలో నేర్పించని స్కిల్స్",
    instagram: "https://www.instagram.com/startupwithshashank/",
    // Cinematic intro video. Drop a file at public/intro.mp4 to self-host it;
    // until then it falls back to the YouTube Short below.
    video: {
      mp4: "/intro.mp4",
      poster: "",
      videoId: "yhdE_7azl2A",
      caption: "Introducing Shashank Sivapurapu",
    },
  },

  // Real ventures with real imagery (public/images/*). Add only what's real.
  categories: [
    { label: "Social Hippi", image: "/images/socialhippi.jpg", url: "https://www.socialhippi.com", external: true },
    { label: "Nerige Story", image: "/images/nerige.jpg", url: "https://www.nerigestory.com", external: true },
    { label: "Trips To Luxury", image: "/images/trips.jpg", url: "https://www.tripstoluxury.com", external: true },
    { label: "Startup With Shashank", image: "/images/startup.jpg", url: "https://www.instagram.com/startupwithshashank/", external: true },
    { label: "The Course", image: "/images/course.jpg", url: "#flagship", comingSoon: true },
    { label: "The Book", image: "/images/book.jpg", comingSoon: true },
  ],

  // No real episode list yet → empty array hides the whole section.
  // TODO: add real episodes as { title, videoId } to surface the strip.
  podcast: {
    title: "Telugu Founder Podcast",
    subtitle: "Long-form conversations with founders — launching soon.",
    episodes: [],
  },

  flagship: {
    eyebrow: "OUR FLAGSHIP COURSE",
    title: "Start with Shashank",
    subtitle:
      "From idea to first paying customers — the exact playbook for building a business in India, broken down step by step in Telugu.",
    cta: "Enroll",
    ctaUrl: "#flagship",
    image: "/images/portrait.jpg",
  },

  story: {
    headline: "From one idea to four founder-led ventures.",
    media: "/images/collage.jpg",
  },

  // Real, deliberately-set numbers.
  stats: [
    { value: "85K", label: "Followers" },
    { value: "540", label: "Posts" },
    { value: "320", label: "Reels" },
  ],

  // Shown only when `stats` is empty.
  proof: {
    line: "Founder of Social Hippi, Nerige Story & Trips To Luxury.",
    waitlistCount: null,
  },

  footer: {
    wordmark: "STOP SCROLLING. START BUILDING.", // tune
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Courses", url: "#flagship" },
          { label: "Reviews", url: "#stats" },
          { label: "Careers", url: "#footer" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", url: "#story" },
          { label: "Support", url: "mailto:ashrith@socialhippi.com" },
          { label: "Contact", url: "mailto:ashrith@socialhippi.com" },
        ],
      },
      {
        title: "Ventures",
        links: [
          { label: "Social Hippi", url: "https://www.socialhippi.com", external: true },
          { label: "Nerige Story", url: "https://www.nerigestory.com", external: true },
          { label: "Trips To Luxury", url: "https://www.tripstoluxury.com", external: true },
        ],
      },
    ],
    socials: {
      instagram: "https://www.instagram.com/startupwithshashank/",
      linkedin: "", // set to render the icon
      youtube: "",
    },
    apps: { ios: null, android: null }, // badges render only when a URL is set
  },
};
