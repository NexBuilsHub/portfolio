/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#ff006e',
          blue: '#00d4ff',
          dark: '#0a0a0a',
        }
      }
    },
  },
  plugins: [],
}

