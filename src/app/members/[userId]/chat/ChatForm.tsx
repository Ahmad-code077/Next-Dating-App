'use client';

import { createMessage } from '@/app/actions/messageActions';
import useMessageStore from '@/hooks/useMessageStore';
import { messageSchema, MessageSchemaType } from '@/lib/schema/MessageSchema';
import { handleFormServerErrors } from '@/lib/utils';
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { HiPaperAirplane } from 'react-icons/hi2';

const ChatForm = () => {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const {
    formState: { errors, isSubmitting, isValid },
    register,
    reset,
    setError,
    handleSubmit,
  } = useForm<MessageSchemaType>({
    defaultValues: {
      text: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(messageSchema),
  });
  const addMessage = useMessageStore((state) => state.add);

  const onMessageSubmit = async (data: MessageSchemaType) => {
    console.log('Message submitted:', data);

    const result = await createMessage(data, params.userId);
    if (result.status === 'error') {
      handleFormServerErrors(result, setError);
    } else {
      reset();
      router.refresh();
      console.log('Message created:', result.data);
      addMessage(result.data);
    }
  };
  return (
    <div className='w-full'>
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
