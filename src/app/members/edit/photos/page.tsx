import { getAuthUserId } from '@/app/actions/authActions';
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from '@/app/actions/memberActions';
import MemberPhotos from '@/components/membersComp/MemberPhoto';
import { CardBody, CardHeader, Divider } from '@heroui/react';
import React from 'react';

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className='flex flex-row justify-between items-center'>
        <div className='text-2xl font-semibold text-default'>Edit Profile</div>
      </CardHeader>
      <Divider />
      <CardBody>
        {/* <MemberPhotoUpload /> */}
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardBody>
    </>
  );
}
