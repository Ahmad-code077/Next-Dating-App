'use client';

import { useEffect, useState } from 'react';
import MemberSidebar from './MemberSidebar';
import { Card } from '@heroui/react';
import { Member } from '@prisma/client';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';

export default function ResponsiveMemberLayout({
  member,
  children,
  navLinks,
}: {
  member: Member;
  children: React.ReactNode;
  navLinks: { name: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsOpen(e.matches);
    };

    // Initialize state based on current screen size
    setIsOpen(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='md:grid md:grid-cols-12 md:gap-5  mb-16'>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className='md:hidden fixed right-6 top-24 z-20 p-2  rounded-lg shadow-lg bg-white'
      >
        {isOpen ? (
          <GoSidebarExpand size={'20'} className='text-black' />
        ) : (
          <GoSidebarCollapse size={'20'} className='text-black' />
        )}
      </button>

      {/* Responsive Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0 md:relative md:col-span-3 ${
          isOpen ? 'translate-x-0' : ''
        }`}
      >
        <MemberSidebar
          member={member}
          toggleSidebar={toggleSidebar}
          navLinks={navLinks}
        />
      </div>

      {/* Main Content */}
      <div className='md:col-span-9'>
        <Card className='md:ml-20 lg:ml-6 mt-10 h-[calc(100vh-40px)]'>
          {children}
        </Card>
      </div>
    </div>
  );
}
