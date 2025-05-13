'use client';

import { useRole } from '@/hooks/useRole';
import { Role } from '@prisma/client';
import React from 'react';

export default function RoleProvider({
  children,
}: {
  children: (role: Role | undefined | null) => React.ReactNode;
}) {
  const role = useRole();
  return <>{children(role)}</>;
}
