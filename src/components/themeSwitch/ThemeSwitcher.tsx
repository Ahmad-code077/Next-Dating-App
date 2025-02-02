// app/components/ThemeSwitcher.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
      className='p-2 rounded-lg hover:bg-foreground/10 transition-colors'
      aria-label={`Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {theme === 'dark' ? (
        <BiSun className='w-6 h-6 text-foreground' />
      ) : (
        <BiMoon className='w-6 h-6 text-foreground' />
      )}
    </button>
  );
}
