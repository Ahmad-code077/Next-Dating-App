// Home.tsx
import Image from 'next/image';
import HomeSessionActions from '@/components/HomeSessionActions';

export default function Home() {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-background'>
      <div className='max-w-4xl mx-auto px-4 py-8 text-center'>
        {/* Hero Image */}
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

        <h1 className='text-3xl sm:text-5xl font-semibold mb-4 '>
          Find Your{' '}
          <span className='font-grotesque text-[2.24rem] sm:text-[4.15rem] text-primary'>
            Perfect Match
          </span>
        </h1>

        <p className='text-xl text-foreground/80 mb-8'>
          Join thousands of singles looking for meaningful connections
        </p>

        {/* Session Actions */}
        <HomeSessionActions />

        {/* Features */}
        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* ...feature cards */}
        </div>
      </div>
    </div>
  );
}
