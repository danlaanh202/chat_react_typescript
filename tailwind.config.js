/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto", "sans-serif;"],
      },
      colors: {
        "purple-bg": "#8774e1",
        "primary-color": "#2c1b7d",
        "light-primary-color": "#3390ec",
        "secondary-color": "#795dff",
        "dark-bg": "#191b1c",
        "dark-dark": "#121414",
        "gray-sm": "#7a7771",
        "gray-lg": "#b2aca2",
        "dark-item-hover": "#1d1f20",
        "dark-date-bg": "#371537",
        "light-date-bg": "#a3be76",
        "light-message-bg": "#eeffde",
        "light-gradient-from": "#87b28a",
        "dark-gradient-from": "#4b1860",
        "dark-gradient-to": "#5e4558",
      },
      backgroundImage: {
        "cat-template": "url('../public/pattern.svg')",
        "cat-bg-normal":
          "url('https://i.pinimg.com/736x/3d/8c/2f/3d8c2f2c82c1c9ef1e27be645cd1aa17.jpg')",
        "cat-bg-dark":
          "url('https://i.pinimg.com/736x/aa/a2/73/aaa2733c561e6ed0098f918ceddfdc33.jpg')",
      },
    },
  },
  plugins: [],
};
