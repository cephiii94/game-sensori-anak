/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sensory: {
          blue: '#38bdf8',
          yellow: '#facc15',
          pink: '#f472b6',
          green: '#4ade80',
          purple: '#c084fc',
          orange: '#fb923c'
        }
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 0.8s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
