'use client';

import { getUnreadMessageCount } from '@/app/actions/messageActions';
import useMessageStore from '@/hooks/useMessageStore';
import { useNotificationChannel } from '@/hooks/useNotificationChannel';
import { usePresenceChannel } from '@/hooks/usePresenceChannel';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState, ReactNode, useRef, useCallback } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

const Provider = ({
  children,
  userId,
  profileComplete,
}: {
  children: ReactNode;
  userId: string;
  profileComplete: boolean;
}) => {
  const [mounted, setMounted] = useState(false);

  const isUnreadCountSet = useRef(false);
  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
};

export default Provider;
