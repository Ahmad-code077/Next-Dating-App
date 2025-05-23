import React, { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMemberByUserId } from '@/app/actions/memberActions';
import ResponsiveMemberLayout from '../ResponsiveMemberLayout';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/${member.userId}`;
  const navLinks = [
    { name: 'Profile', href: `${basePath}` },
    {
      name: 'Photos',
      href: `${basePath}/photos`,
    },
    { name: 'Chat', href: `${basePath}/chat` },
  ];

  return (
    <ResponsiveMemberLayout member={member} navLinks={navLinks}>
      {children}
    </ResponsiveMemberLayout>
  );
}
