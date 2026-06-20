/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0809", // near-black canvas
        surface: "#16100F", // elevated cards
        line: "#2A1E1F", // hairline borders
        nav: "#F6F6F4", // (unused here)
        fg: "#F6EEEC", // primary text
        muted: "#A89698", // de-emphasized text
        dim: "#6E5F60", // captions / legal
        accent: "#E11D48", // crimson, brand
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
