import { heroui } from '@heroui/react';
import { Config } from 'tailwindcss/types/config';

const tailwindConfig: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui({})],
};

export default tailwindConfig;
