'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@heroui/react';
import { useState } from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '../themeSwitch/ThemeSwitcher';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

export default function TopNavClient({ session }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Members', href: '/members' },
    { label: 'Lists', href: '/lists' },
    { label: 'Messages', href: '/messages' },
  ];

  const authItems = [
    { label: 'Login', href: '/login', variant: 'light' },
    { label: 'Sign Up', href: '/register', variant: 'primary' },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className='md:hidden'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='text-foreground'
        />
      </NavbarContent>

      {/* Brand Logo */}
      <NavbarBrand className='text-center flex  justify-center md:justify-start'>
        <Link href='/' className='font-bold text-xl text-primary '>
          LoveFinder
        </Link>
      </NavbarBrand>

      {/* Desktop Navigation */}
      <NavbarContent
        style={{ justifyContent: 'space-between' }}
        className='hidden md:flex  md:items-center justify-between '
      >
        {navItems.map((item) => (
          <NavLinks key={item.href} href={item.href} label={item.label} />
        ))}
      </NavbarContent>

      {/* User Authentication */}
      <NavbarContent justify='end'>
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          authItems.map((item) => (
            <NavbarItem key={item.href}>
              <Button
                as={Link}
                href={item.href}
                color={item.variant === 'primary' ? 'primary' : undefined}
                variant={item.variant === 'primary' ? 'solid' : 'bordered'}
                className={
                  item.variant === 'primary'
                    ? 'bg-primary text-white'
                    : 'text-foreground'
                }
              >
                {item.label}
              </Button>
            </NavbarItem>
          ))
        )}
      </NavbarContent>

      <ThemeSwitcher />

      {/* Mobile Menu */}
      <NavbarMenu className='bg-card'>
        {session?.user
          ? [...navItems].map((item) => (
              <NavbarMenuItem key={item.href} className='my-2'>
                <Link
                  className='w-full text-foreground'
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))
          : [...navItems, ...authItems].map((item) => (
              <NavbarMenuItem key={item.href} className='my-2'>
                <Link
                  className='w-full text-foreground'
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
      </NavbarMenu>
    </Navbar>
  );
}
