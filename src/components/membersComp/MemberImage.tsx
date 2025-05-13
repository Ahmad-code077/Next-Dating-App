'use client';

import { Button, Image } from '@heroui/react';
import { Photo } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import clsx from 'clsx';
import { ImCheckmark, ImCross } from 'react-icons/im';

type Props = {
  photo: Photo | null;
};
import { useRole } from '@/hooks/useRole';
import { approvePhoto, rejectPhoto } from '@/app/actions/adminActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function MemberImage({ photo }: Props) {
  const role = useRole();
  const isAdmin = role === 'ADMIN';
  const router = useRouter();

  if (!photo) return null;

  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log('errrpr at approve image', error);
        throw error;
      }
    }
  };

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log('error at approve image', error);
        throw error;
      }
    }
  };

  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt='Image of member'
          src={photo.publicId}
          width={300}
          height={300}
          crop='fill'
          gravity='faces'
          priority
          className={clsx('rounded-2xl', {
            'opacity-40': !photo.isApproved && !isAdmin,
          })}
        />
      ) : (
        <Image src={photo?.url || '/images/user.png'} alt='Image of user' />
      )}
      {!photo?.isApproved && !isAdmin && (
        <div className='absolute bottom-2 w-full bg-slate-200 p-1'>
          <div className='flex justify-center text-danger font-semibold'>
            Awaiting approval
          </div>
        </div>
      )}
      {isAdmin && (
        <div className='flex flex-row gap-2 mt-2'>
          <Button
            onClick={() => approve(photo.id)}
            color='success'
            variant='bordered'
            fullWidth
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            onClick={() => reject(photo)}
            color='danger'
            variant='bordered'
            fullWidth
          >
            <ImCross size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
