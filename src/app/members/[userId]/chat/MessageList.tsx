'use client';
import { MessageDto } from '@/types';
import MessageBox from './MessageBox';
import { useCallback, useEffect, useRef, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { formatShortDateTime } from '@/lib/utils';
import useMessageStore from '@/hooks/useMessageStore';

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
  const setReadCount = useRef(false);

  const [messages, setMessages] = useState<MessageDto[]>(
    initialMessages.messages
  );

  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);
  const handleMessage = useCallback((message: MessageDto) => {
    console.log('Received new message via Pusher: 😐😐😐😐😐😐😐😐😐', message);
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
    if (!setReadCount.current) {
      updateUnreadCount(-initialMessages.readCount);
      setReadCount.current = true;
    }
  }, [initialMessages.readCount, updateUnreadCount]);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    console.log('Subscribed to channel:', chatId);

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
