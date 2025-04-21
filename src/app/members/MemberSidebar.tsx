'use client';
import { calculateYear } from '@/lib/utils';
import { IoCloseCircleOutline } from 'react-icons/io5';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@heroui/react';

import { Member } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
type Props = {
  member: Member;
  toggleSidebar: () => void;
  navLinks: { name: string; href: string }[];
};
export default function MemberSidebar({
  member,
  toggleSidebar,
  navLinks,
}: Props) {
  const pathname = usePathname();

  return (
    <Card className='w-full  md:mt-10 items-center h-[100dvh] md:h-full'>
      <div className='w-full flex items-center justify-end px-4 py-2'>
        <button onClick={toggleSidebar} className='flex md:hidden'>
          <IoCloseCircleOutline size={40} />
        </button>
      </div>
      <Image
        height={120}
        width={120}
        src={member.image || '/images/user.png'}
        alt='User profile main image'
        className='rounded-full md:mt-6 aspect-square object-cover'
      />
      <CardBody>
        <div className='flex flex-col items-center'>
          <div className='text-2xl'>
            {member.name}, {calculateYear(member.dateOfBirth)}
          </div>
          <div className='text-sm text-neutral-500'>
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className='my-3' />
        <nav className='flex flex-col p-4 ml-4 text-2xl gap-4'>
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              onClick={toggleSidebar}
              className={`block rounded 
              ${
                pathname === link.href
                  ? 'text-primary'
                  : 'hover:text-primary/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href='/members'
          fullWidth
          color='default'
          variant='bordered'
        >
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
}
