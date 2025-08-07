/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        skyCustom: '#7DD6E8',
        darkSky: '#4FC3D9',
        lightSky: '#CFF2F9',
        pointedBluetSky: '#B1F2FF',
        darkest: '#2D2D2D',
        darkCard: '#404040',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
