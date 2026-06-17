// =============================================================================
// SINGLE SOURCE OF TRUTH
// Every visible string / media reference on the site lives here.
// Fill the `<<< >>>` placeholders with real values when you have them — each one
// already has a sensible default so the site renders immediately.
// =============================================================================

export const brand = {
  name: "StartupWithShashank",
  accent: "#2F80ED", // <<< swap for the real brand accent hex >>>
  tagline: "Founder skills they don't teach in college — in your language.",
};

export const intro = {
  kicker: "An education for builders",
  headline: "Stop scrolling. Start building.",
  sub: "Founder skills they don't teach in college — in your language.",
  // Plays full-screen on load. See <Intro /> for behaviour.
  youtubeId: "yhdE_7azl2A", // https://youtube.com/shorts/yhdE_7azl2A
  mp4: "", // optional: "/intro.mp4" → uses native <video> if set (recommended)
  poster: "", // optional poster image for the MP4
};

export const hero = {
  eyebrow: "Learn what college didn't teach you",
  headline: "Real founder skills that fuel your growth and confidence.",
  // The last phrase of the headline gets the accent colour. Keep it as a
  // standalone trailing clause for the highlight to look intentional.
  headlineAccent: "growth and confidence.",
  sub: "No fluff, no theory dumps — just hands-on startup lessons taught through real stories, in Telugu, that you can use the same day.",
  primaryCta: { label: "Enroll now", url: "#flagship" }, // <<<enroll url>>>
  secondaryCta: { label: "Watch a case study", url: "#why" }, // <<<case study url>>>
  // Hero featured image + play button → opens the video popup modal.
  // Drop the file at public/images/promo.jpg; a gradient shows until it exists.
  promoImage: "/images/promo.jpg",
  videoId: "yhdE_7azl2A", // YouTube Short played in the hero popup
  videoCaption: "Introducing Shashank Sivapurapu",
};

export const flagship = {
  eyebrow: "Our flagship course",
  badge: "Most popular",
  title: "Start with Shashank", // <<<Flagship course name>>>
  body: "From idea to first paying customers — the exact playbook for building a business in India, broken down step by step through real company stories.",
  priceNow: "₹4,999", // <<< real price >>>
  priceWas: "₹9,999", // optional strikethrough; set to "" if none
  meta: "12 modules · 40+ lessons · lifetime access · certificate",
  cta: { label: "Enroll now", url: "#flagship" }, // <<<enroll url>>>
  image: "/images/course.jpg", // drop public/images/course.jpg; gradient until then
};

// Shashank's ventures — rendered as a card grid (each image is optional; a
// gradient placeholder shows until you drop the file into public/images/).
export const ventures = {
  eyebrow: "The ecosystem",
  heading: "Everything Shashank is building.",
  cards: [
    { name: "Social Hippi", status: "Live", year: "2019", image: "/images/socialhippi.jpg", url: "https://www.socialhippi.com", external: true },
    { name: "Nerige Story", status: "Live", year: "2019", image: "/images/nerige.jpg", url: "https://www.nerigestory.com", external: true },
    { name: "Startup With Shashank", status: "Live", year: "", image: "/images/startup.jpg", url: "https://www.instagram.com/startupwithshashank/", external: true },
    { name: "Trips To Luxury", status: "Live", year: "2021", image: "/images/trips.jpg", url: "https://www.tripstoluxury.com", external: true },
    { name: "The Course", status: "In the works", year: "", image: "/images/course.jpg", url: "#flagship", external: false },
    { name: "The Book", status: "Coming soon", year: "", image: "/images/book.jpg", url: "", external: false },
    { name: "10 Minutes Friend", status: "Closed", year: "", image: "/images/tenmin.jpg", url: "", external: false },
    { name: "1-to-1 Mentorship", status: "Closed", year: "", image: "/images/mentorship.jpg", url: "", external: false },
  ],
};

export const why = {
  eyebrow: "Why learn with us",
  heading: "Built for thinkers, not note-takers.",
  cards: [
    {
      icon: "book",
      title: "Learn through real stories",
      body: "Every concept is taught through real startup case studies — because that's how you actually remember it.",
    },
    {
      icon: "zap",
      title: "No fluff, just the good stuff",
      body: "Step-by-step exercises in every module. You practice and apply, instead of drowning in theory.",
    },
    {
      icon: "clock",
      title: "Designed for how you learn",
      body: "Visuals, examples and hands-on practice — paced for working founders, on any device.",
    },
  ],
};

// PLACEHOLDER stats — swap the numbers/labels for the real Instagram figures.
export const stats = [
  { label: "Followers", value: 120, suffix: "k+" },
  { label: "Posts", value: 1200, suffix: "+" },
  { label: "Avg rating / 5", value: 4.9, suffix: "", decimal: true },
];

// PLACEHOLDER reels — each opens in the hero-style video popup. Replace the
// `videoId` (YouTube id) and `title` for each tile with the real ones.
export const reels = {
  eyebrow: "Watch",
  heading: "Lessons in 60 seconds.",
  items: [
    { videoId: "yhdE_7azl2A", title: "How I got my first 100 customers" },
    { videoId: "yhdE_7azl2A", title: "Pricing mistakes founders make" },
    { videoId: "yhdE_7azl2A", title: "The one metric that matters" },
    { videoId: "yhdE_7azl2A", title: "Bootstrapping vs raising money" },
    { videoId: "yhdE_7azl2A", title: "Hiring your first employee" },
    { videoId: "yhdE_7azl2A", title: "Finding your first idea" },
    { videoId: "yhdE_7azl2A", title: "Marketing with zero budget" },
    { videoId: "yhdE_7azl2A", title: "When to quit your job" },
  ],
};

export const contact = {
  eyebrow: "Get in touch",
  heading: "Questions? Talk to us.",
  body: "Course help, collaborations, or press — drop us a line and we'll get back to you.",
  email: "ashrith@socialhippi.com",
  instagram: "https://www.instagram.com/startupwithshashank/",
};

export const finalCta = {
  heading: "Say goodbye to passive learning.",
  body: "Practical skills you can use today, in 2026, and for the rest of your founding journey. Start now.",
  cta: { label: "Start learning", url: "#flagship" }, // <<<enroll url>>>
};

export const footer = {
  nav: {
    explore: [
      { label: "Courses", url: "#flagship" },
      { label: "Collab", url: "#why" },
      { label: "Blogs", url: "#why" },
      { label: "Careers", url: "#final" },
    ],
    company: [
      { label: "About", url: "#why" },
      { label: "Support", url: "#contact" },
      { label: "Contact", url: "#contact" },
    ],
  },
  socials: {
    instagram: "https://www.instagram.com/startupwithshashank/",
    linkedin: "", // <<<url>>>
    youtube: "", // <<<url>>>
  },
  // Shashank's other ventures — rendered as a footer column.
  ventures: [
    { label: "Social Hippi", url: "https://www.socialhippi.com" },
    { label: "Nerige Story", url: "https://www.nerigestory.com" },
    { label: "Trips To Luxury", url: "https://www.tripstoluxury.com" },
  ],
  appStore: {
    ios: "", // <<<url>>> — render a badge only if its URL is set
    android: "", // <<<url>>>
  },
};

export const navLinks = [
  { label: "Courses", url: "#flagship" },
  { label: "Ventures", url: "#ventures" },
  { label: "Watch", url: "#watch" },
  { label: "Why us", url: "#why" },
  { label: "Contact", url: "#contact" },
  { label: "Support", url: "#contact" },
];
