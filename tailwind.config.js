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
        "pastel-orange": "#FFE5B4", // Example pastel orange
        "pastel-green": "#C3E0DC", // Example pastel green
        "pastel-purple": "#E7E3F7", // Example pastel purple
        "pastel-pink": "#F4D8E6", // Example pastel pink
        "pastel-blue": "#C6E8E7", // Example pastel blue
        "pastel-light-blue": "#D6EAF8", // Example light pastel blue
        "pastel-gray": "#E0E0E0", // Example gray for the completed task
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']// Change 'Inter' to your chosen font
      },
    },
  },
  plugins: [],
};
