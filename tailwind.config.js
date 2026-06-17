/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0C10",
        cream: "#F5F3EF",
        accent: "var(--accent)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      borderColor: {
        hairline: "rgba(255,255,255,.09)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};
