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
          glow: 'rgba(255, 107, 53, 0.45)',
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
        'glow-primary': '0 0 30px rgba(255, 107, 53, 0.45)',
        'glow-accent': '0 0 30px rgba(250, 204, 21, 0.45)',
        'glass': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
        'glass-elevated': '0 20px 60px 0 rgba(0, 0, 0, 0.6)',
        'spotlight': '0 25px 80px -15px rgba(0, 0, 0, 0.8)',
      },
      backdropBlur: {
        xs: '2px',
        xl: '24px',
        '2xl': '32px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
