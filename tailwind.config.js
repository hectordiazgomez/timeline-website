/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
  extend: {
    fontFamily: {
      sans: ['Cormorant Garamond', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
    fontSize: {
      base: ['2rem', '2rem'],
      },
  },
},
  plugins: [],
}

