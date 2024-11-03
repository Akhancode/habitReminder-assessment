/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "heatmap-empty": "#ebedf0",
        "heatmap-scale-1": "#c6e48b",
        "heatmap-scale-2": "#7bc96f",
        "heatmap-scale-3": "#239a3b",
        "heatmap-scale-4": "#196127",
      },
      // fontFamily: {
      //   sans: ["Nunito Sans", "sans-serif"], // Change 'Inter' to your chosen font
      // },
    },
  },
  plugins: [],
};
