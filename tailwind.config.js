/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0C0A", // charcoal canvas
        surface: "#151711", // elevated cards
        line: "#23261D", // hairline borders
        nav: "#F6F6F4", // (unused here)
        fg: "#F2F5EC", // primary text
        muted: "#9AA08C", // de-emphasized text
        dim: "#6A6F5E", // captions / legal
        accent: "#C6F24E", // electric lime, brand
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
