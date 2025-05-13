// components/HomeSessionActions.tsx

import Link from 'next/link';
import { Button } from '@heroui/react';
import { FaHeart, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { auth } from '@/auth';

export default async function HomeSessionActions() {
  const session = await auth();

  return session ? (
    <Button
      as={Link}
      href='/members'
      size='lg'
      color='primary'
      className='font-semibold'
      startContent={<FaHeart />}
    >
      Browse Matches
    </Button>
  ) : (
    <div className='flex gap-4 justify-center'>
      <Button
        as={Link}
        href='/login'
        size='lg'
        variant='bordered'
        color='primary'
        startContent={<FaSignInAlt />}
      >
        Login
      </Button>
      <Button
        as={Link}
        href='/register'
        size='lg'
        color='primary'
        startContent={<FaUserPlus />}
      >
        Sign Up
      </Button>
    </div>
  );
}
