'use client';
import { registerUser } from '@/app/actions/authActions';
import {
  profileSchema,
  registerFromType,
  registerSchema,
} from '@/lib/schema/RegisterSchema';
import { handleFormServerErrors } from '@/lib/utils';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { FaHeart } from 'react-icons/fa';
import UserDetailsForm from './UserDetailsForm';
import { useState } from 'react';
import ProfileDetailsForm from './ProfileDetailsForm';

const RegisterForm = () => {
  const stepSchemas = [registerSchema, profileSchema];
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = stepSchemas[activeStep];

  const registerFormMethods = useForm<registerFromType>({
    resolver: zodResolver(currentValidationSchema),
    mode: 'onTouched',
  });
  const {
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = registerFormMethods;

  const router = useRouter();
  const onSubmit = async () => {
    // console.log('get values', getValues());
    const result = await registerUser(getValues());
    if (result.status === 'success') {
      router.push('/register/success');
    } else {
      handleFormServerErrors(result, setError);
    }
  };
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;
      case 1:
        return <ProfileDetailsForm />;
      default:
        return 'Unknown step';
    }
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
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
      <CardBody className='overflow-visible py-1'>
        <FormProvider {...registerFormMethods}>
          <form onSubmit={handleSubmit(onNext)}>
            <div className='space-y-4'>
              {getStepContent(activeStep)}
              {errors.root?.serverError && (
                <p className='text-danger text-sm'>
                  {errors.root.serverError.message}
                </p>
              )}
              <div className='flex flex-row items-center gap-6'>
                {activeStep !== 0 && (
                  <Button onClick={onBack} fullWidth>
                    Back
                  </Button>
                )}
                <Button
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  fullWidth
                  color='default'
                  type='submit'
                >
                  {activeStep === stepSchemas.length - 1
                    ? 'Submit'
                    : 'Continue'}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
