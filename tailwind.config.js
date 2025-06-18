/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nba: {
          blue: '#17408B',
          red: '#C9082A',
          darkblue: '#0D2240',
          silver: '#8D9093',
          warmgray: '#E6E7E8'
        },
        eastern: {
          primary: '#1D428A',
          secondary: '#C8102E'
        },
        western: {
          primary: '#862633',
          secondary: '#FDBB30'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'bracket': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'team-card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'bracket': '0.5rem',
      },
      animation: {
        'bracket-pulse': 'bracket-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'bracket-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      },
    },
  },
  plugins: [],
}