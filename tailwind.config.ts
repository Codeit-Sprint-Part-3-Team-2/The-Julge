import type { Config } from 'tailwindcss';

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
  plugins: [],
} satisfies Config;
