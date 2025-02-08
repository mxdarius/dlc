/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#E5E5E5',
        accent: '#1a1a1a',
        'accent-hover': '#242424',
        surface: '#0a0a0a',
        'surface-hover': '#0f0f0f',
        'surface-dark': '#050505',
        'text-muted': '#9CA3AF',
      },
      letterSpacing: {
        'ultra': '0.05em'
      },
      fontSize: {
        'title': ['clamp(1.5rem, 4vw, 3rem)', {
          letterSpacing: '0.05em',
          lineHeight: '1.2',
          fontWeight: '700',
          textTransform: 'uppercase'
        }]
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(145deg, #000000 0%, #050505 100%)',
        'geometric-pattern': 'url("geometric-bg.svg")',
      },
    },
  },
  plugins: [],
}