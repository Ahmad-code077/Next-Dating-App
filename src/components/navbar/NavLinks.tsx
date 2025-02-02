import { NavbarItem } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  label: string;
};

const NavLinks = ({ href, label }: Props) => {
  const pathName = usePathname();
  return (
    <NavbarItem isActive={pathName === href} as={Link} href={href}>
      {label}
    </NavbarItem>
  );
};
export default NavLinks;
