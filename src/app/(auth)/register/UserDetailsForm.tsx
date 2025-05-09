'use client';

import { Input } from '@heroui/react';
import Link from 'next/link';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function UserDetailsForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='space-y-4'>
      <Input
        defaultValue={getValues('name')}
        label='Name'
        variant='bordered'
        {...register('name')}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
      />
      <Input
        defaultValue={getValues('email')}
        label='Email'
        variant='bordered'
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <Input
        defaultValue={getValues('password')}
        label='Password'
        variant='bordered'
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
        endContent={
          <button
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
      />
      <p className='text-center text-sm'>
        Already have an account?{' '}
        <Link href='/login' className='text-primary'>
          Login here
        </Link>
      </p>{' '}
    </div>
  );
}
