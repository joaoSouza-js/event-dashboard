/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: 'Roboto, sans-serif', // Adds a new `font-display` class
      },
      colors: {
        gray: {
          900: "#121214"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
   
  ],
}