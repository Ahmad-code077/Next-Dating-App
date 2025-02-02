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

const TopNav = () => {
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
      className='bg-card dark:bg-card'
      classNames={{
        item: [
          'flex px-2',
          'data-[active=true]:text-primary dark:data-[active=true]:text-primary ',
        ],
      }}
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className='md:hidden '>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='text-foreground'
        />
      </NavbarContent>
      {/* Brand Logo */}
      <NavbarBrand>
        <Link href='/' className='font-bold text-xl text-primary'>
          LoveFinder
        </Link>
      </NavbarBrand>
      {/* Desktop Navigation */}
      <NavbarContent className='hidden md:flex gap-6'>
        {navItems.map((item) => (
          <NavLinks key={item.href} href={item.href} label={item.label} />
        ))}
      </NavbarContent>
      {/* Desktop Auth Buttons */}
      <NavbarContent justify='end' className='hidden md:flex'>
        {authItems.map((item) => (
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
        ))}
      </NavbarContent>
      <ThemeSwitcher />
      {/* Mobile Menu */}
      <NavbarMenu className='bg-card'>
        {[...navItems, ...authItems].map((item) => (
          <NavbarMenuItem key={item.href} className='my-2'>
            <Link
              className='w-full text-foreground gap-12'
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
};

export default TopNav;
