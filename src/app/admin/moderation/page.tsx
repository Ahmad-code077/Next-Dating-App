import { getUnapprovedPhotos } from '@/app/actions/adminActions';
import MemberPhotos from '@/components/membersComp/MemberPhoto';
import RoleProvider from '@/components/RoleProvider';
import { Card, Divider } from '@heroui/react';
import { FaCheckCircle } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default async function PhotoModerationPage() {
  const photos = await getUnapprovedPhotos();
  return (
    <div className='flex flex-col mt-10 gap-3'>
      <h3 className='text-2xl'>Photos awaiting moderation</h3>
      <Divider />

      {photos.length > 0 ? (
        <RoleProvider>
          {(role) => <MemberPhotos photos={photos} role={role} />}
        </RoleProvider>
      ) : (
        <Card className='p-8 flex flex-col items-center justify-center gap-4 bg-default-50'>
          <div className='rounded-full bg-success-100 p-6'>
            <FaCheckCircle size={48} className='text-success-500' />
          </div>
          <div className='text-center'>
            <h3 className='text-xl font-semibold text-default-600'>
              All Clear!
            </h3>
            <p className='text-default-400 mt-2'>
              No photos are currently waiting for moderation.
            </p>
            <p className='text-sm text-default-300 mt-1'>
              New photos will appear here when users upload them.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
