'use client';

import CardWrapper from '@/components/CardWrapper';
import { useSearchParams } from 'next/navigation';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let message = 'Something went wrong during authentication.';
  if (error === 'OAuthAccountNotLinked') {
    message = 'This account is already linked with a different provider.';
  }

  return (
    <CardWrapper
      headerText='Authentication Error'
      headerIcon={FaExclamationTriangle}
      iconColor='primary'
      subHeaderText={message}
      action={() => window.history.back()}
      actionLabel='Go back'
    />
  );
}
