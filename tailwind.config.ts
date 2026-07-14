import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#04060C',
          900: '#070B14',
          850: '#0A0F1C',
          800: '#0D1424',
          700: '#131B2E',
          600: '#1B2540'
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4'
        },
        electric: {
          400: '#3B82F6',
          500: '#2563EB',
          600: '#4F46E5'
        },
        ink: {
          100: '#EDF2FB',
          300: '#B7C4DA',
          500: '#7C8CA8',
          700: '#4A5875'
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse at top, rgba(59,130,246,0.14), transparent 60%)',
        'aurora': 'linear-gradient(120deg, #06B6D4 0%, #2563EB 45%, #4F46E5 100%)',
        'panel-glass': 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))'
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(34,211,238,0.35)',
        'glow-blue': '0 0 60px -10px rgba(59,130,246,0.45)',
        panel: '0 1px 1px rgba(255,255,255,0.06) inset, 0 8px 40px -12px rgba(0,0,0,0.6)'
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(34,211,238,0.5)' },
          '100%': { boxShadow: '0 0 0 16px rgba(34,211,238,0)' }
        }
      },
      animation: {
        scanline: 'scanline 6s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        blink: 'blink 1s step-start infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
