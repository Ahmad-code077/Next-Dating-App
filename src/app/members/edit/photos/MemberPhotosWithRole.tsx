'use client';

import MemberPhotos from '@/components/membersComp/MemberPhoto';
import RoleProvider from '@/components/RoleProvider';
import { Photo, Role } from '@prisma/client';

type Props = {
  photos: Photo[];
  editing?: boolean;
  mainImageUrl?: string | null;
};

export default function MemberPhotosWithRole(props: Props) {
  return (
    <RoleProvider>
      {(role: Role | undefined | null) => (
        <MemberPhotos {...props} role={role} />
      )}
    </RoleProvider>
  );
}
