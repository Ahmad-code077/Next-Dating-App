import { auth } from '@/auth';
import { Button } from '@heroui/react';
import { FaHeart, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const session = await auth();

  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-background'>
      <div className='max-w-4xl mx-auto px-4 py-8 text-center'>
        <div className='mb-8 relative flex justify-center'>
          <div className='relative w-[200px] sm:w-[250px] md:w-[300px] aspect-square'>
            <Image
              src='/hero-img.jpg'
              alt='Love Finder'
              fill
              sizes='(max-width: 640px) 200px, (max-width: 768px) 250px, 300px'
              quality={95}
              className='object-cover rounded-full shadow-2xl ring-4 ring-primary/30 
                 transition-transform duration-300 hover:scale-105'
              priority
            />
          </div>
        </div>

        <h1 className='text-5xl font-bold mb-4 text-primary'>
          Find Your Perfect Match
        </h1>

        <p className='text-xl text-foreground/80 mb-8'>
          Join thousands of singles looking for meaningful connections
        </p>

        {session ? (
          <Button
            as={Link}
            href='/members'
            size='lg'
            color='primary'
            className='font-semibold'
            startContent={<FaHeart />}
          >
            Browse Matches
          </Button>
        ) : (
          <div className='flex gap-4 justify-center'>
            <Button
              as={Link}
              href='/login'
              size='lg'
              variant='bordered'
              color='primary'
              startContent={<FaSignInAlt />}
            >
              Login
            </Button>
            <Button
              as={Link}
              href='/register'
              size='lg'
              color='primary'
              startContent={<FaUserPlus />}
            >
              Sign Up
            </Button>
          </div>
        )}

        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              title: 'Find Matches',
              description:
                'Browse through profiles and find your perfect match',
            },
            {
              title: 'Connect',
              description: 'Chat and get to know your matches better',
            },
            {
              title: 'Meet',
              description: 'Take your connection to the next level',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className='p-6 bg-card rounded-xl shadow-sm border border-border'
            >
              <h3 className='text-xl font-semibold mb-2 text-foreground'>
                {feature.title}
              </h3>
              <p className='text-foreground/70'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
