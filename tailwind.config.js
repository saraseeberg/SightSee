/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey1: '#767474',
        lightmodeGreen: '#B5D5C5', 
        darkmodeGreen: '#0D7C66',
      }
    },
  },
  plugins: [],
}