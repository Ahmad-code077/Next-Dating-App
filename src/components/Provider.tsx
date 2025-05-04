'use client';

import { getUnreadMessageCount } from '@/app/actions/messageActions';
import useMessageStore from '@/hooks/useMessageStore';
import { useNotificationChannel } from '@/hooks/useNotificationChannel';
import { usePresenceChannel } from '@/hooks/usePresenceChannel';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState, ReactNode, useRef, useCallback } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

const Provider = ({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
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

  usePresenceChannel();
  useNotificationChannel(userId);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;
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
