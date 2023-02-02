/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@smartive-education/thierry-simon-mumble/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [
    require('./node_modules/@smartive-education/thierry-simon-mumble/mumble-presets'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
