import { getAuthUserId } from '@/app/actions/authActions';
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from '@/app/actions/memberActions';
import React from 'react';
import MemberPhotoUpload from './MemberPhotoUpload';
import CardInnerWrapper from '@/components/CardInnerWrapper';
import MemberPhotosWithRole from './MemberPhotosWithRole';

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardInnerWrapper
        header='Edit Photos'
        body={
          <>
            <MemberPhotoUpload />
            <MemberPhotosWithRole
              photos={photos ?? []}
              editing={true}
              mainImageUrl={member?.image ?? null}
            />
          </>
        }
      />
    </>
  );
}
