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
import { Role } from '@prisma/client';

type Props = {
  userInfo: { image: string; name: string } | null;
  role: Role | null;
};

export default function TopNavClient({ userInfo, role }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems = [
    { label: 'Members', href: '/members' },
    { label: 'Lists', href: '/lists' },
    { label: 'Messages', href: '/messages' },
  ];

  const authItems = [
    { label: 'Login', href: '/login', variant: 'light' },
    { label: 'Sign Up', href: '/register', variant: 'primary' },
  ];

  const adminLinks = [{ label: 'Photo Moderation', href: '/admin/moderation' }];

  // Final Links Logic
  const isAdmin = role === 'ADMIN';
  const isLoggedIn = !!userInfo;

  const links = isAdmin
    ? adminLinks
    : isLoggedIn
      ? navItems
      : [...navItems, ...authItems];

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='z-30'
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className='md:hidden'>
        <NavbarMenuToggle className='text-foreground' />
      </NavbarContent>

      {/* Brand Logo */}
      <NavbarBrand className='text-center flex justify-center md:justify-start'>
        <Link
          href='/'
          className='font-bold text-3xl text-primary font-grotesque '
        >
          LoveFinder
        </Link>
      </NavbarBrand>

      {/* Desktop Navigation */}
      <NavbarContent
        className='hidden md:flex md:items-center md:justify-center md:gap-12'
        justify='center'
      >
        {links
          .filter((item) => !authItems.some((auth) => auth.href === item.href))
          .map((item) => (
            <NavLinks key={item.href} href={item.href} label={item.label} />
          ))}
      </NavbarContent>

      {/* Auth Buttons or User Menu */}
      <NavbarContent justify='end'>
        {isLoggedIn ? (
          <UserMenu user={userInfo!} />
        ) : (
          authItems.map((item) => (
            <NavbarItem key={item.href} className='hidden md:flex'>
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
        {links.map((item) => (
          <NavbarMenuItem key={item.href} className='my-2'>
            <Link
              className='w-full text-foreground'
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
