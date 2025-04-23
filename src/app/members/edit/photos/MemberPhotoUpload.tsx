'use client';

import { AddPhoto } from '@/app/actions/userAction';
import ImageUploadButton from '@/components/ImageUploadButton';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

export default function MemberPhotoUpload() {
  const router = useRouter();

  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    console.log('resutlt we get on upload the image 😃😃😃😃', result);
    if (result.info && typeof result.info === 'object') {
      await AddPhoto(result.info.secure_url, result.info.public_id);
      router.refresh();
    } else {
      toast.error('Problem adding image');
    }
  };
  return (
    <div>
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
}
