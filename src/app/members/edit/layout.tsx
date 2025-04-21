import React, { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMemberByUserId } from '@/app/actions/memberActions';
import ResponsiveMemberLayout from '../ResponsiveMemberLayout';
import { getAuthUserId } from '@/app/actions/authActions';

export default async function Layout({ children }: { children: ReactNode }) {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  const basePath = `/members/edit`;

  const navLinks = [
    { name: 'Edit Profile', href: `${basePath}` },
    {
      name: 'Update Photos',
      href: `${basePath}/photos`,
    },
  ];

  return (
    <ResponsiveMemberLayout member={member} navLinks={navLinks}>
      {children}
    </ResponsiveMemberLayout>
  );
}
