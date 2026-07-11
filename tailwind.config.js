/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F1ECE1',
        paper: '#FAF8F2',
        ink: '#2B2823',
        s: { DEFAULT: '#3E6B96', dark: '#284A69' },
        v: { DEFAULT: '#B9503F', dark: '#873A2C' },
        o: { DEFAULT: '#5C8A52', dark: '#3E6338' },
        c: { DEFAULT: '#7A5A9E', dark: '#563F72' },
        help: { DEFAULT: '#CC8A34', dark: '#9B6A24' },
        mod: { DEFAULT: '#C17C93', dark: '#94576B' },
        factory: {
          orange: '#C97A3E',
          steel: '#8A8C82',
          dark: '#4A4A42',
        },
      },
      fontFamily: {
        display: ['"Anton"', '"Zen Kaku Gothic New"', 'sans-serif'],
        head: ['"Zen Kaku Gothic New"', '"Archivo Expanded"', 'sans-serif'],
        body: ['"Zen Kaku Gothic New"', '"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        brut: '6px 6px 0 0 #2B2823',
        'brut-sm': '3px 3px 0 0 #2B2823',
        'brut-lg': '10px 10px 0 0 #2B2823',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pop': {
          '0%': { transform: 'scale(0.85)' },
          '60%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(420px) rotate(540deg)', opacity: '0' },
        },
        'combine-pop': {
          '0%': { transform: 'scale(0.7)', opacity: '0' },
          '60%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'suck-in': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-16px) scale(0.4)', opacity: '0' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.35s cubic-bezier(0.22,1,0.36,1) both',
        'pop': 'pop 0.35s cubic-bezier(0.22,1,0.36,1) both',
        'shake': 'shake 0.4s ease-in-out',
        'confetti-fall': 'confetti-fall 1.6s ease-in forwards',
        'combine-pop': 'combine-pop 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'suck-in': 'suck-in 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
}
