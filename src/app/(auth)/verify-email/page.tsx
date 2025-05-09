import { verifyEmail } from '@/app/actions/authActions';
import CardWrapper from '@/components/CardWrapper';
import ResultMessage from '@/components/ResultMessage';
import { MdOutlineMailOutline } from 'react-icons/md';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  const result = await verifyEmail(token);
  console.log('result from verify email page', result);
  return (
    <CardWrapper
      headerText='Verify your email address'
      headerIcon={MdOutlineMailOutline}
      footer={<ResultMessage result={result} />}
    />
  );
}
