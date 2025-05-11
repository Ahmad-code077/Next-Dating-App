'use client';
import { signInUser } from '@/app/actions/authActions';
import { loginFormType, loginSchema } from '@/lib/schema/LoginSchema';
import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import SocialLogin from './SocialLogin';
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });
  const router = useRouter();
  const onSubmit = async (data: loginFormType) => {
    const result = await signInUser(data);
    if (result.status === 'success') {
      toast.success('User Login successfully');
      router.push('/members');
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className='py-4 md:w-2/5 mx-auto my-12 bg-card'>
      <CardHeader className='px-4 flex-col items-center gap-3'>
        <div className='flex items-center justify-center gap-4 text-2xl sm:text-3xl'>
          <FaLock className='text-primary' /> Login
        </div>
        <div>Welcome Back to LoveFinder</div>
      </CardHeader>
      <CardBody className='overflow-visible py-1 '>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='my-2 gap-6 flex  flex-col'
        >
          <Input
            label='Email'
            type='email'
            variant='bordered'
            {...register('email')}
          />
          {errors.email && (
            <p className='px-2 text-red-600 '>{errors.email.message}</p>
          )}
          <Input
            label='Password'
            type={showPassword ? 'text' : 'password'}
            variant='bordered'
            {...register('password')}
            endContent={
              <button
                type='button'
                className='focus:outline-none'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className='text-default-400 hover:text-default-600' />
                ) : (
                  <FaEye className='text-default-400 hover:text-default-600' />
                )}
              </button>
            }
          />
          {errors.password && (
            <p className='px-2 text-red-600 '>{errors.password.message}</p>
          )}

          <SocialLogin />

          <div className='flex flex-col gap-2 text-center text-sm'>
            <p>
              Don&apos;t have an account?{' '}
              <Link href='/register' className='text-primary'>
                Sign up here
              </Link>
            </p>
            <Link href='/forgot-password' className='text-primary'>
              Forgot your password?
            </Link>
          </div>
          <Button
            type='submit'
            className={`py-6  ${!isValid && 'cursor-not-allowed'} text-lg `}
            variant='solid'
            color={!isValid ? 'default' : 'primary'}
            disabled={!isValid}
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
