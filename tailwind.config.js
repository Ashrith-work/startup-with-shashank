/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A", // page canvas (near-black)
        surface: "#141414", // elevated cards / strips
        nav: "#F6F6F4", // light top nav over dark body
        ink: "#0A0A0A", // text on the light nav
        fg: "#FFFFFF", // primary text on dark
        muted: "#9A9A9A", // de-emphasized text
        dim: "#6B6B6B", // captions / footer
        accent: "#E5484D", // single CTA accent
      },
      borderRadius: {
        card: "14px",
      },
      maxWidth: {
        content: "1200px",
      },
      fontSize: {
        hero: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05" }],
        "section-title": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.1" }],
      },
      fontFamily: {
        display: ["Satoshi", "system-ui", "sans-serif"],
        body: ["Satoshi", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
