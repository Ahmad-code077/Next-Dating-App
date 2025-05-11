import { Alert } from '@heroui/react';
import LoginForm from './LoginForm';

const Login = async ({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) => {
  const error = (await searchParams).error;

  return (
    <div className='mt-12'>
      {error === 'OAuthAccountNotLinked' && (
        <Alert className='max-w-md mx-auto mb-4' color='danger'>
          This email is already linked with a different login method. Please
          sign in using that method.{' '}
        </Alert>
      )}
      <LoginForm />{' '}
    </div>
  );
};
export default Login;
