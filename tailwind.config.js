/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        bree: ['"Bree Serif"', 'serif'],
        arial: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}