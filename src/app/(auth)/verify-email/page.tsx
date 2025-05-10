import { verifyEmail } from '@/app/actions/authActions';
import CardWrapper from '@/components/CardWrapper';
import ResultMessage from '@/components/ResultMessage';
import { MdOutlineMailOutline } from 'react-icons/md';
import Link from 'next/link';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  const result = await verifyEmail(token);

  return (
    <div>
      <CardWrapper
        headerText='Verify your email address'
        headerIcon={MdOutlineMailOutline}
        subHeaderText={
          result.status === 'success'
            ? 'Your email has been verified successfully'
            : 'There was a problem verifying your email'
        }
        footer={
          <div className='flex flex-col items-center gap-4'>
            <ResultMessage result={result} />
            {result.status === 'success' && (
              <div className='text-center'>
                <p className='text-default-600 mb-2'>
                  You can now login to your account
                </p>
                <Link
                  href='/login'
                  className='text-primary hover:underline font-medium'
                >
                  Go to login page
                </Link>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
