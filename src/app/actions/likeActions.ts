'use server';
import { prisma } from '@/lib/prisma';
import { getAuthUserId } from './authActions';
import { Prisma } from '@prisma/client';
import { pusherServer } from '@/lib/pusher';

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  //   // the target id is the id of the user which is liked and the userId is the login user id
  //   // the target id is passed on click to the like button when the specific user card button click then the targetUserId is provided
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      throw new Error('User is not authenticated');
    }

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) throw new Error('User not found');

    const member = await prisma.member.findUnique({
      where: { userId },
    });
    if (!member) throw new Error('Complete your profile first!');

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      const like = await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
        select: {
          sourceMember: {
            select: {
              name: true,
              image: true,
              userId: true,
            },
          },
        },
      });

      await pusherServer.trigger(`private-${targetUserId}`, 'like:new', {
        name: like.sourceMember.name,
        image: like.sourceMember.image,
        userId: like.sourceMember.userId,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error in toggleLikeMember:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          success: false,
          error: 'Like record not found',
        };
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
export async function fetchCurrentUserLikeIds() {
  try {
    const userId = await getAuthUserId();
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });
    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchLikedMembers(type = 'source') {
  try {
    const userId = await getAuthUserId();
    switch (type) {
      case 'source':
        return await fetchSourceLikes(userId);
      case 'target':
        return await fetchTargetLikes(userId);
      case 'mutual':
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function fetchSourceLikes(userId: string) {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });
  return sourceList.map((x) => x.targetMember);
}
async function fetchTargetLikes(userId: string) {
  const targetList = await prisma.like.findMany({
    where: { targetUserId: userId }, // who targer the login user ie who target me
    select: { sourceMember: true },
  });
  return targetList.map((x) => x.sourceMember);
}
async function fetchMutualLikes(userId: string) {
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });
  const likedIds = likedUsers.map((x) => x.targetUserId);
  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });
  return mutualList.map((x) => x.sourceMember);
}
