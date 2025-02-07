'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState, ReactNode } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

const Provider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>; // Prevent mismatch during SSR

  return (
    <HeroUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
          transition={Bounce}
        />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default Provider;
