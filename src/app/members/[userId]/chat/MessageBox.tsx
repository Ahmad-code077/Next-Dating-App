'use client';

import { MessageDto } from '@/types';
import { Avatar } from '@heroui/react';
import React, { useRef, useEffect } from 'react';

type Props = {
  message: MessageDto;
  currentUserId: string;
};

export default function MessageBox({ message, currentUserId }: Props) {
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className='grid grid-rows-1'>
      <div
        className={`flex gap-2 mb-3 ${
          isCurrentUserSender ? 'justify-end text-right' : 'justify-start'
        }`}
      >
        {!isCurrentUserSender && (
          <Avatar
            name={message.senderName}
            className='self-end'
            src={message.senderImage || '/images/user.png'}
          />
        )}

        <div
          className={`flex flex-col max-w-[80%] sm:max-w-[60%] px-4 py-2 ${
            isCurrentUserSender
              ? 'rounded-l-xl rounded-tr-xl text-white bg-blue-100'
              : 'rounded-r-xl rounded-tl-xl bg-green-100'
          }`}
        >
          <div className='flex justify-between items-center w-full'>
            {message.dateRead && message.recipientId !== currentUserId && (
              <span className='text-xs text-black italic'>
                (Read x mins ago)
              </span>
            )}
            <div className='flex justify-between w-full'>
              <p className='text-sm font-semibold text-gray-900 text-start'>
                {message.senderName}
              </p>
              <p className='text-sm text-gray-500 ml-2'>{message.created}</p>
            </div>
          </div>
          <p className='text-sm py-3 text-gray-900'>{message.text}</p>
        </div>

        {isCurrentUserSender && (
          <Avatar
            name={message.senderName}
            className='self-end'
            src={message.senderImage || '/images/user.png'}
          />
        )}
      </div>

      <div ref={messageEndRef} />
    </div>
  );
}
