'use client';
import { registerFrom, registerSchema } from '@/lib/schema/RegisterSchema';
import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaHeart } from 'react-icons/fa';
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<registerFrom>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const RegisterFormSubmit = (data: registerFrom) => {
    console.log(data);
  };
  return (
    <Card className='py-4 md:w-2/5 mx-auto my-12 bg-card'>
      <CardHeader className='px-4 flex-col items-center gap-3'>
        <div className='flex items-center justify-center gap-4 text-2xl sm:text-3xl'>
          <FaHeart className='text-primary' /> Register
        </div>
        <p className='text-center'>
          Discover Your Perfect Match with LoveFinder
        </p>
      </CardHeader>
      <CardBody className='overflow-visible py-1 '>
        <form
          onSubmit={handleSubmit(RegisterFormSubmit)}
          className='my-2 gap-6 flex  flex-col'
        >
          <Input
            label='Name'
            type='text'
            variant='bordered'
            {...register('name')}
          />
          {errors.name && (
            <p className='px-2 text-red-600 '>{errors.name.message}</p>
          )}
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
            type='password'
            variant='bordered'
            {...register('password')}
          />

          {errors.password && (
            <p className='px-2 text-red-600 '>{errors.password.message}</p>
          )}
          <p className='text-center'>
            Already have an account?{' '}
            <Link className='text-primary' href={'/login'}>
              Login
            </Link>
          </p>
          <Button
            type='submit'
            className={`py-6  ${!isValid && 'cursor-not-allowed'}  text-lg`}
            variant='solid'
            color={!isValid ? 'default' : 'primary'}
            disabled={!isValid}
          >
            Sign Up
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default RegisterForm;
