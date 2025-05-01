import CardInnerWrapper from '@/components/CardInnerWrapper';
import React from 'react';
import ChatForm from './ChatForm';
import { getMessageThread } from '@/app/actions/messageActions';
import { getAuthUserId } from '@/app/actions/authActions';
import MessageList from './MessageList';
import { createChatId } from '@/lib/utils';
export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const recipientUserId = (await params).userId;
  const messages = await getMessageThread(recipientUserId);
  const userId = await getAuthUserId();

  const chatId = createChatId(userId, recipientUserId);
  return (
    <CardInnerWrapper
      header='Chat'
      body={
        <MessageList
          initialMessages={messages}
          currentUserId={userId}
          chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
}
