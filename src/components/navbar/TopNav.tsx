import React from 'react';
import { auth } from '@/auth';
import TopNavClient from './TopNavClient';
import { getUserInfoForNav } from '@/app/actions/authActions';
export default async function TopNav() {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  return (
    <TopNavClient userInfo={userInfo as { image: string; name: string }} />
  );
}
