/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0F3D2B',
          light: '#1a5c40',
          dark: '#081f16',
          50: '#f0f9f4',
          100: '#d6f0e2',
          200: '#b0e0c9',
          300: '#7cc9aa',
          400: '#46ab86',
          500: '#268f6a',
          600: '#1a7256',
          700: '#165c46',
          800: '#124939',
          900: '#0F3D2B',
        },
        gold: {
          DEFAULT: '#D4A017',
          light: '#e8b82e',
          dark: '#b08010',
          50: '#fdf9ed',
          100: '#f9f0cb',
          200: '#f2de8e',
          300: '#ebc84e',
          400: '#e3b028',
          500: '#D4A017',
          600: '#b08010',
          700: '#8a610f',
          800: '#714f13',
          900: '#5f4215',
        },
        beige: {
          DEFAULT: '#F5F0E6',
          dark: '#e8dfc8',
          deeper: '#d9cdb0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'Helvetica', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scroll-down': 'scrollDown 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,160,23,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(212,160,23,0.8)' },
        },
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: 1 },
          '50%': { transform: 'translateY(8px)', opacity: 0.5 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
