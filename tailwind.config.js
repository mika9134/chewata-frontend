/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode
        'surface-primary': '#FFFFFF',
        'surface-secondary': '#F5F7FA',
        'surface-tertiary': '#E9ECEF',
        'text-primary': '#000000',
        'text-secondary': '#6C757D',
        'text-tertiary': '#868E96',
        'border': '#DEE2E6',
        'ring': '#4C6FFF', // Brand Blue
        
        // Dark Mode
        'dark-surface-primary': '#1A1A1A',
        'dark-surface-secondary': '#242424',
        'dark-surface-tertiary': '#2C2C2C',
        'dark-text-primary': '#F5F5F5',
        'dark-text-secondary': '#AAAAAA',
        'dark-text-tertiary': '#888888',
        'dark-border': '#404040',
        'dark-ring': '#4C6FFF',

        // Brand
        'primary': '#4C6FFF', // Brand Blue
        'primary-light': '#F2F4FF', // Very light blue for backgrounds
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },
      borderRadius: {
        '4xl': '2rem', // 32px
      }
    },
  },
  plugins: [],
}