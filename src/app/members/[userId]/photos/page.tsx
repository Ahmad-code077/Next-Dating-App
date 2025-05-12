import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import CardInnerWrapper from '@/components/CardInnerWrapper';
import { Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { FaImage } from 'react-icons/fa';

export default async function PhotosPage({
  params, // Use params as a Promise
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const photos = await getMemberPhotosByUserId(userId);
  console.log('photos url in the cleint 😀😀😀😀😀', photos);

  return (
    <CardInnerWrapper
      header='Photos'
      body={
        <>
          {' '}
          <div className='grid grid-cols-2  md:grid-cols-4 gap-3'>
            {(photos?.length as number) > 0 ? (
              photos?.map((photo) => (
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
              ))
            ) : (
              <Card className='col-span-full p-8 flex flex-col items-center justify-center gap-4 bg-default-50'>
                <div className='rounded-full bg-default-100 p-6'>
                  <FaImage size={48} className='text-default-400' />
                </div>
                <div className='text-center'>
                  <h3 className='text-lg font-semibold text-default-600'>
                    No Photos Yet
                  </h3>
                  <p className='text-sm text-default-400'>
                    When photos are added, they will appear here
                  </p>
                </div>
              </Card>
            )}
          </div>
        </>
      }
    />
  );
}
