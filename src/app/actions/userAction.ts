'use server';

import {
  memberEditFormSchema,
  MemberEditFormSchema,
} from '@/lib/schema/MemberEditFormSchema';
import { ActionResult } from '@/types';
import { getAuthUserId } from './authActions';
import { prisma } from '@/lib/prisma';
import { Member, Photo } from '@prisma/client';
import { cloudinary } from '@/lib/cloudinary';

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

export async function AddPhoto(url: string, publicId: string) {
  try {
    const userId = await getAuthUserId();
    return prisma.member.update({
      where: {
        userId,
      },
      data: {
        photos: {
          create: [{ url, publicId }],
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setMainImage(photo: Photo) {
  console.log('phto recieved  📷📷📷📷📷', photo);
  const userId = await getAuthUserId();
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        image: photo.url,
      },
    });
    return prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteImage(photo: Photo) {
  try {
    const userId = await getAuthUserId();

    if (photo.publicId) {
      const result = await cloudinary.v2.uploader.destroy(photo.publicId);
      console.log('Cloudinary delete result:', result);

      if (result.result !== 'ok') {
        throw new Error('Failed to delete image from Cloudinary');
      }
    }
    return await prisma.member.update({
      where: { userId },
      data: {
        photos: {
          delete: { id: photo.id },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
