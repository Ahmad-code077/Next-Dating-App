'use client';

import { messageSchema, MessageSchemaType } from '@/lib/schema/MessageSchema';
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiPaperAirplane } from 'react-icons/hi2';

const ChatForm = () => {
  const {
    formState: { errors, isSubmitting, isValid },
    register,
    reset,
    handleSubmit,
  } = useForm<MessageSchemaType>({
    defaultValues: {
      text: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(messageSchema),
  });

  const onMessageSubmit = async (data: MessageSchemaType) => {
    console.log('Message submitted:', data); // Handle message submission logic here
    reset();
  };
  return (
    <div>
      <form
        className='flex  items-center justify-center gap-2'
        onSubmit={handleSubmit(onMessageSubmit)}
      >
        <Input
          type='text'
          placeholder='Send Message'
          {...register('text')}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <Button
          type='submit'
          isIconOnly
          color='default'
          radius='full'
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane />
        </Button>

        <div className='flex flex-col'>
          {errors.root?.serverError && (
            <p className='text-danger text-sm'>
              {errors.root.serverError.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
export default ChatForm;
