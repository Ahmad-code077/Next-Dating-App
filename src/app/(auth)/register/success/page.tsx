'use client';

import CardWrapper from '@/components/CardWrapper';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

export default function RegisterSuccessPage() {
  const router = useRouter();

  return (
    <CardWrapper
      headerText='Registration Successful!'
      subHeaderText='Your account has been created'
      headerIcon={FaCheckCircle}
      iconColor='primary'
      body={
        <div className='text-center space-y-2 text-default-600'>
          <p>We&apos;ve sent a verification email to your inbox.</p>
          <p>
            Please check your email and click the verification link to activate
            your account.
          </p>
          <p className='text-sm text-default-400 mt-4'>
            Note: The verification email might be in your{' '}
            <span className='text-primary'>spam</span> folder.
          </p>
        </div>
      }
      action={() => router.push('/login')}
      actionLabel='Go to login page'
    />
  );
}
