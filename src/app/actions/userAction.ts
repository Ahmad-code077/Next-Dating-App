'use server';

import {
  memberEditFormSchema,
  MemberEditFormSchema,
} from '@/lib/schema/MemberEditFormSchema';
import { ActionResult } from '@/types';
import { getAuthUserId } from './authActions';
import { prisma } from '@/lib/prisma';
import { Member } from '@prisma/client';

export async function UpdateMemberProfile(
  data: MemberEditFormSchema,
  isNameUpdated: boolean
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserId();
    const validatedData = memberEditFormSchema.safeParse(data);

    if (!validatedData.success)
      return { status: 'error', error: validatedData.error.errors };
    const { name, description, city, country } = validatedData.data;

    if (isNameUpdated) {
      await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    });
    return { status: 'success', data: member };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'something went wrong' };
  }
}
