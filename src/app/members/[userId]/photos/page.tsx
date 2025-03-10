import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import { CardHeader, Divider, CardBody, Image } from '@heroui/react';
import React from 'react';

export default async function PhotosPage({
  params, // Use params as a Promise
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className='text-2xl font-semibold text-default'>
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-2  md:grid-cols-4 gap-3'>
          {photos?.map((photo) => (
            <div key={photo.id}>
              <Image
                src={(photo.url as string) || '/images/user.png'}
                alt='Image of member'
                className='object-cover aspect-square'
                sizes='24px'
              />
            </div>
          ))}
        </div>
      </CardBody>
    </>
  );
}
