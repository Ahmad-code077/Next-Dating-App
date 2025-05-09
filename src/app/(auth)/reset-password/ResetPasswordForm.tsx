'use client';

import { resetPassword } from '@/app/actions/authActions';
import CardWrapper from '@/components/CardWrapper';
import ResultMessage from '@/components/ResultMessage';
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from '@/lib/schemas/ForgotPasswordSchema';
import { ActionResult } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordSchema>({
    mode: 'onTouched',
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    setResult(await resetPassword(data.password, searchParams.get('token')));
    reset();
  };

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText='Reset password'
      subHeaderText='Enter your new password below'
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-4'
        >
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            variant='bordered'
            defaultValue=''
            {...register('password')}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
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
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            variant='bordered'
            defaultValue=''
            {...register('confirmPassword')}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message as string}
            endContent={
              <button
                type='button'
                className='focus:outline-none'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className='text-default-400 hover:text-default-600' />
                ) : (
                  <FaEye className='text-default-400 hover:text-default-600' />
                )}
              </button>
            }
          />
          <Button
            type='submit'
            color='default'
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Reset password
          </Button>
        </form>
      }
      footer={<ResultMessage result={result} />}
    />
  );
}
