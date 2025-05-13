'use client';

import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

export const useRole = () => {
  const { data: session, status } = useSession({
    required: false,
  });

  return status === 'loading'
    ? null
    : (session?.user?.role as Role | undefined);
};
