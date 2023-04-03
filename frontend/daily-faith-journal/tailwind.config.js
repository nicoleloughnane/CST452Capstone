/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      //font family
      fontFamily: {
        //prioritize libre franklin font, otherwise rely on another sans font 
        sans: ["Libre Franklin", ...defaultTheme.fontFamily.sans],
      },
      //colors 
      colors: {
        //brand color palette (tailwind makes classes for these)
        "brand-darkpurple": "#775DAB",
        "brand-darkpurple-2": "#270041",
        "brand-lightpurple": "#EDD2FF",
        "brand-lightpink": "#FFE6FF",
        "brand-background": "#F1F1F1",
        "brand-cream": "#F3EFE0",
        "brand-gray": "#1E1E1E",
        "brand-black": "#222222",
        "brand-green": "#30BA91",
        "brand-red": "#BA3049",
      },
      //box shadow
      boxShadow: {
             //for hover effects on buttons
             gray: "0 0 3px 3px #1E1E1E",
             cream: "0 0 3px 3px #F3EFE0",
             pink: "0 0 3px 3px #EDD2FF",
      }
    },
  },
  plugins: [],
}
