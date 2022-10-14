/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg-color': '#292929',
        'text-color': '#D3D3D3',
        'hover-color': '#797979',
        'secondary-bg-color': '#404040',
        'additional-color': '#4F4F4F'
      },
    },

  },
  plugins: [],
}