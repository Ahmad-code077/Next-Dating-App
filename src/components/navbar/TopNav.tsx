import React from 'react';
import { auth } from '@/auth';
import TopNavClient from './TopNavClient';
import { getUserInfoForNav } from '@/app/actions/authActions';
import FiltersWrapper from './FiltersWrapper';
import { Role } from '@prisma/client';
export default async function TopNav() {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  return (
    <>
      <TopNavClient
        userInfo={userInfo as { image: string; name: string }}
        role={session?.user.role as Role}
      />
      <FiltersWrapper />
    </>
  );
}
