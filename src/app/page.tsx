import { ThemeSwitcher } from '@/components/themeSwitch/ThemeSwitcher';
import { Button } from '@heroui/react';

export default function Home() {
  return (
    <div className='bg-secondary '>
      <h1>Navbar or other stuff</h1>
      <Button className='bg-card border border-border'>Click me</Button>
      <ThemeSwitcher />
    </div>
  );
}
