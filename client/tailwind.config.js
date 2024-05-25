/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-change-now': '#343443',
        'input-gray': '#3e3e59',
        'input-currency': '#36324a',
        'yellow-green-corp': '#cdff00',
        'blue-corp': '#00ffff',
      },
    },
  },
  plugins: [],
};
