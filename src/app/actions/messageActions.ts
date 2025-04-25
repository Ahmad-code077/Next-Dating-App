'use server';

import { messageSchema, MessageSchemaType } from '@/lib/schema/MessageSchema';
import { getAuthUserId } from './authActions';
import { prisma } from '@/lib/prisma';
import { ActionResult } from '@/types';
import { Message } from '@prisma/client';
import { mapMessageToMessageDto } from '@/lib/mappings';

export async function createMessage(
  data: MessageSchemaType,
  recipientUserId: string
): Promise<ActionResult<Message>> {
  try {
    const userId = await getAuthUserId();
    const validateData = messageSchema.safeParse(data);
    if (!validateData.success) {
      return {
        status: 'error',
        error: validateData.error.errors,
      };
    }

    const { text } = validateData.data;

    // Create a new message in the database
    const message = await prisma.message.create({
      data: {
        text,
        senderId: userId,
        recipientId: recipientUserId,
      },
    });

    return { status: 'success', data: message };
  } catch (error) {
    console.log('error at creating message', error);
    throw new Error('Failed to create message');
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: 'asc',
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log('error at getting message thread', error);
    throw new Error('Failed to get message thread');
  }
}

export async function getMessagesByContainer(container: string) {
  try {
    const userId = await getAuthUserId();
    const conditions = {
      [container === 'outbox' ? 'senderId' : 'recipientId']: userId,
      ...(container === 'outbox'
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };
    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: 'asc',
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log('error at getting messages by container', error);
    throw new Error('Failed to get messages by container');
  }
}
