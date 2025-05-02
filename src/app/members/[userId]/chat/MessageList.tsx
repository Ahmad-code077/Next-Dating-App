'use client';
import { MessageDto } from '@/types';
import MessageBox from './MessageBox';
import { useCallback, useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { formatShortDateTime } from '@/lib/utils';

type Props = {
  initialMessages: {
    messages: MessageDto[];
    readCount: number;
  };
  currentUserId: string;
  chatId: string;
};

export default function MessageList({
  initialMessages,
  currentUserId,
  chatId,
}: Props) {
  const [messages, setMessages] = useState<MessageDto[]>(
    initialMessages.messages
  );

  const handleMessage = useCallback((message: MessageDto) => {
    return setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevState) =>
      prevState.map((message) =>
        messageIds.includes(message.id)
          ? {
              ...message,
              dateRead: formatShortDateTime(new Date()),
            }
          : message
      )
    );
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind('message:new', handleMessage);
    channel.bind('messages:read', handleReadMessages);

    return () => {
      channel.unsubscribe();

      channel.unbind('message:new', handleMessage);
      channel.unbind('messages:read', handleReadMessages);
    };
  }, [chatId, handleMessage]);

  return (
    <div>
      {messages.length === 0 ? (
        'No messages to display'
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
