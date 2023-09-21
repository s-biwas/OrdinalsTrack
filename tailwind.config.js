/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Grey1: "#CDCDCD",
        Grey2: "#B3B3B3",
        Grey3: "#747474",
        Grey4: "#38383E",
        Grey5: "#2B2B31",
        Grey6: "#26262C",
        Grey7: "#222228",
        Grey8: "#25252B",
        Grey9: "#17171D",
        Blue1: "#3640F0"
      },
      fontFamily: {
        custom: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
};
