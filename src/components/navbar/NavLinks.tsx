import useMessageStore from '@/hooks/useMessageStore';
import { NavbarItem } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  label: string;
};

const NavLinks = ({ href, label }: Props) => {
  const pathName = usePathname();
  const unreadCount = useMessageStore((state) => state.unreadCount);

  return (
    <NavbarItem
      isActive={pathName === href}
      as={Link}
      href={href}
      className='text-center font-nunito text-xl'
    >
      {label}
      {href === '/messages' && unreadCount > 0 && (
        <span className='ml-1'>({unreadCount})</span>
      )}
    </NavbarItem>
  );
};
export default NavLinks;
