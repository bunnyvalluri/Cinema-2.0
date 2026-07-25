/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          hover: '#E55A2B',
          light: '#FF885B',
          glow: 'rgba(255, 107, 53, 0.35)',
        },
        secondary: {
          DEFAULT: '#1E293B',
          light: '#334155',
          dark: '#0F172A',
        },
        accent: {
          DEFAULT: '#FACC15',
          hover: '#EAB308',
        },
        success: '#10B981',
        danger: '#EF4444',
        dark: {
          bg: '#0B0F19',
          card: '#151C2C',
          border: '#242F46',
          muted: '#94A3B8',
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px rgba(255, 107, 53, 0.4)',
        'glow-accent': '0 0 25px rgba(250, 204, 21, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
