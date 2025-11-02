/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "grid-slate-200":
          "linear-gradient(to right, rgba(226,232,240,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.3) 1px, transparent 1px)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
