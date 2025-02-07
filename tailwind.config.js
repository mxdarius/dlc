/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#f9f9f9',
        accent: '#313131',
        'accent-hover': '#414141',
        surface: '#242424',
        'surface-hover': '#2f2f2f',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(145deg, #1a1a1a 0%, #242424 100%)',
      },
    },
  },
  plugins: [],
}
