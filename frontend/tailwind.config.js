/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBackground: 'rgb(31,41,59)',
        'custom-green': '#10B981',
      },
      keyframes: {
        'tilt-shake': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        'tilt-shake': 'tilt-shake 0.5s ease-in-out 0.2s both',
      },
    },
  },
  plugins: [],
}

// ll