import React, { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMemberByUserId } from '@/app/actions/memberActions';
import ResponsiveMemberLayout from '../ResponsiveMemberLayout';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  return (
    <ResponsiveMemberLayout member={member}>{children}</ResponsiveMemberLayout>
  );
}
