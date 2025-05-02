'use client';

import PresenceAvatar from '@/components/PresenceAvatar';
import { timeAgo } from '@/lib/utils';
import { MessageDto } from '@/types';
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
          <div className='self-end'>
            <PresenceAvatar
              src={message.senderImage}
              userId={message.senderId}
            />
          </div>
        )}

        <div
          className={`flex flex-col w-[80%] sm:w-[55%]  px-4 py-2 ${
            isCurrentUserSender
              ? 'rounded-l-xl rounded-tr-xl text-white bg-blue-100'
              : 'rounded-r-xl rounded-tl-xl bg-green-100'
          }`}
        >
          <div className='flex justify-between items-center w-full'>
            {message.dateRead && message.recipientId !== currentUserId && (
              <span className='text-xs text-black italic text-center'>
                (Read {timeAgo(message.dateRead)})
              </span>
            )}

            <span className='text-sm font-semibold text-gray-900 text-center'>
              {message.senderName}
            </span>

            <span className='text-sm text-gray-500 text-center'>
              {message.created}
            </span>
          </div>

          <p className='text-sm py-3 text-gray-900'>{message.text}</p>
        </div>

        {isCurrentUserSender && (
          <div className='self-end'>
            <PresenceAvatar
              src={message.senderImage}
              userId={message.senderId}
            />
          </div>
        )}
      </div>

      <div ref={messageEndRef} />
    </div>
  );
}
