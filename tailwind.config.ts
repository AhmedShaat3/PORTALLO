import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0B1324',
          900: '#0F1B33',
          850: '#132342',
          800: '#172B51',
          700: '#1E3866',
          600: '#25457B'
        },
        cyan: {
          400: '#E6EDF8',
          500: '#CBD8EC'
        },
        electric: {
          400: '#1A365D',
          500: '#1E3A6E',
          600: '#2B4C8A'
        },
        ink: {
          100: '#FFFFFF',
          300: '#DCE5F0',
          500: '#8899B0',
          700: '#5A6B82'
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse at top, rgba(26,54,93,0.14), transparent 60%)',
        'aurora': 'linear-gradient(120deg, #1A365D 0%, #1E3A6E 45%, #25457B 100%)',
        'panel-glass': 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))'
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(26,54,93,0.35)',
        'glow-blue': '0 0 60px -10px rgba(26,54,93,0.45)',
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
          '0%': { boxShadow: '0 0 0 0 rgba(26,54,93,0.5)' },
          '100%': { boxShadow: '0 0 0 16px rgba(26,54,93,0)' }
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