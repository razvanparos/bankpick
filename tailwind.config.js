/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors:{
        'primaryBlue':'#0066FF',
        'darkBlue': '#161622',
        'gray': '#707070',
        'darkGray':'#1E1E2D'
      },
    },
  },
  plugins: [],
}
