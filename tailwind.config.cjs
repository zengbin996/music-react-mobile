/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        '45': '45px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
