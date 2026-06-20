/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A", // page canvas (near-black)
        surface: "#141414", // elevated cards
        line: "#242424", // hairline borders
        nav: "#F6F6F4", // (unused here)
        fg: "#FFFFFF", // primary text on dark
        muted: "#8A8A8A", // de-emphasized text
        dim: "#5E5E5E", // captions / legal
        accent: "#FF6B35", // warm orange, brand
      },
      borderRadius: {
        card: "8px", // Netflix-ish
      },
      maxWidth: {
        content: "1200px",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
