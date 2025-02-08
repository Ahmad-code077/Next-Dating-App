import React from 'react';
import { auth } from '@/auth';
import TopNavClient from './TopNavClient';
export default async function TopNav() {
  const session = await auth();

  return <TopNavClient session={session} />;
}
