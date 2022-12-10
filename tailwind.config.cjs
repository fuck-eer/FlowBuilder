/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '488px',
        md: '769px',
        lg: '1281px',
      },
      boxShadow: {
        lg: '0px 8px 12px -4px rgba(0, 0, 0, 0.25)',
        card: '-6px 6px 8px 0px rgba(0,0,0,0.30)',
      },
      colors: {
        'yellow-1': '#FFD553',
        'orange-1': '#F18805',
        'blue-1': '#4361EE',
        'dark-1': '#1e1e1e',
        'dark-2': '#777777',
        'pink-1': '#F72585',
        'gray-1': '#8F8F8F',
        'gray-5': '#D9D9D9',
        'gray-6': '#EEEEEE',
        'gray-7': '#FBFBFD',
        'error-1': '#F04438',
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', 'sans-serif'],
        bebas: ["'Bebas Neue'", 'cursive'],
      },
      keyframes: {
        pinger: {
          '75%, 100%': {
            transform: 'scale(1.5)',
            opacity: 0,
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
