/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a0009",
        shadow: "#120018",
        blood: "#8B0000",
        crimson: "#C0392B",
        ember: "#E74C3C",
        gold: "#C9A84C",
        silk: "#F5E6C8",
        mist: "#A89880",
        steel: "#2A2A3A",
      },
      fontFamily: {
        logo: ["Cinzel Decorative", "serif"],
        heading: ["Cinzel", "serif"],
        body: ["Crimson Text", "Georgia", "serif"],
        ui: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
