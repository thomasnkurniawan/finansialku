// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;