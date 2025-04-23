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

type Props = {
  userInfo: { image: string; name: string };
};

export default function TopNavClient({ userInfo }: Props) {
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
  const menuItems = !!userInfo ? navItems : [...navItems, ...authItems];

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
      <NavbarBrand className='text-center flex  justify-center md:justify-start'>
        <Link href='/' className='font-bold text-xl text-primary '>
          LoveFinder
        </Link>
      </NavbarBrand>

      {/* Desktop Navigation */}
      <NavbarContent
        style={{ justifyContent: 'space-between' }}
        className='hidden md:flex  md:items-center  '
      >
        {navItems.map((item) => (
          <NavLinks key={item.href} href={item.href} label={item.label} />
        ))}
      </NavbarContent>

      {/* User Authentication */}
      <NavbarContent justify='end'>
        {!!userInfo ? (
          <UserMenu user={userInfo as { image: string; name: string }} />
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
        {menuItems.map((item) => (
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
