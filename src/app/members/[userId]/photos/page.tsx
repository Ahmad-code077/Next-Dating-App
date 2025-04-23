import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import CardInnerWrapper from '@/components/CardInnerWrapper';
import Image from 'next/image';
import React from 'react';

export default async function PhotosPage({
  params, // Use params as a Promise
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const photos = await getMemberPhotosByUserId(userId);

  return (
    <CardInnerWrapper
      header='Photos'
      body={
        <>
          {' '}
          <div className='grid grid-cols-2  md:grid-cols-4 gap-3'>
            {photos?.map((photo) => (
              <div key={photo.id}>
                <Image
                  src={(photo.url as string) || '/images/user.png'}
                  alt='Image of member'
                  width={200}
                  height={200}
                  quality={90}
                  className='object-cover aspect-square rounded-md  '
                  sizes='(min-width: 768px) 200px, 100vw'
                />
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
