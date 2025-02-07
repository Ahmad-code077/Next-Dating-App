import React from 'react';
import { auth } from '@/auth';
import TopNavClient from './TopNavClient'; // ✅ Import Client Component

export default async function TopNav() {
  const session = await auth(); // ✅ Fetch session in server component

  return <TopNavClient session={session} />;
}
