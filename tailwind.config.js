/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0F19',
        charcoal: '#111827',
        accent: {
          violet: '#8B5CF6',
          cyan: '#06B6D4',
          pink: '#EC4899',
        },
        primary: {
          pink: '#EC4899',
          blue: '#06B6D4',
          dark: '#0B0F19',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(236,72,153,0.08) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
