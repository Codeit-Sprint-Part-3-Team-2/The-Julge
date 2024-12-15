import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Spoqa Han Sans Neo"', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          50: '#7D7986',
          40: '#A4A1AA',
          30: '#CBC9CF',
          20: '#E5E4E7',
          10: '#F2F2F3',
          5: '#FAFAFA',
          black: '#111322',
          white: '#FFFFFF',
        },
        red: {
          40: '#FF4040',
          30: '#FF8D72',
          20: '#FFAF9B',
          10: '#FFEBE7',
        },
        blue: {
          20: '#0080FF',
          10: '#CCE6FF',
        },
        green: {
          20: '#20A81E',
          10: '#D4F7D4',
        },
        kakao: '#FEE500',
        orange: '#EA3C12',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.no-spinner': {
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          '-moz-appearance': 'textfield',
        },
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: '#7d7986',
          'border-radius': '40px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: '#9ca3af',
        },
        '.custom-scrollbar::-webkit-scrollbar-button': {
          display: 'none',
        },
      });
    }),
  ],
} satisfies Config;
