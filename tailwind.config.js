/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto", "sans-serif;"],
      },
      colors: {
        "purple-bg": "#8774e1",
        "primary-color": "#2c1b7d",
        "secondary-color": "#795dff",
        "dark-bg": "#191b1c",
        "dark-dark": "#121414",
        "gray-sm": "#7a7771",
        "gray-lg": "#b2aca2",
        "dark-item-hover": "#1d1f20",
      },
      backgroundImage: {
        "cat-bg-normal": "url('https://wallpapercave.com/wp/wp2039820.jpg')",
        "cat-bg-dark":
          "url('https://i.pinimg.com/736x/aa/a2/73/aaa2733c561e6ed0098f918ceddfdc33.jpg')",
      },
    },
  },
  plugins: [],
};
