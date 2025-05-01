'use client';
import { MessageDto } from '@/types';
import MessageBox from './MessageBox';
import { useCallback, useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';

export default function MessageList({
  initialMessages,
  currentUserId,
  chatId,
}: {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}) {
  const [messages, setMessages] = useState<MessageDto[]>(initialMessages);

  const handleMessage = useCallback((message: MessageDto) => {
    console.log(
      'new message from the chat to check it 😎😎😎😎😎😎😎😎😎',
      message,
      initialMessages
    );
    return setMessages((prevMessages) => [...prevMessages, message]);
  }, []);
  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind('message:new', handleMessage);
    return () => {
      channel.unsubscribe();

      channel.unbind('message:new', handleMessage);
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
