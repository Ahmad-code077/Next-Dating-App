'use client';
import { toggleLikeMember } from '@/app/actions/likeActions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';

type Props = {
  targetId: string;
  hasLiked: boolean;
};

export default function LikeButton({
  targetId,
  hasLiked: initialHasLiked,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [optimisticHasLiked, setOptimisticHasLiked] = useState(initialHasLiked);

  async function toggleLike() {
    // Optimistically update UI immediately
    setOptimisticHasLiked(!optimisticHasLiked);
    setIsLoading(true);

    try {
      const result = await toggleLikeMember(targetId, optimisticHasLiked);

      if (!result.success) {
        throw new Error(result.error);
      }

      // Refresh data after successful mutation
      router.refresh();
    } catch (error) {
      // Revert optimistic update if error occurs
      setOptimisticHasLiked(initialHasLiked);

      console.error('Toggle like error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to toggle like'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      onClick={() => !isLoading && toggleLike()}
      className={`relative hover:opacity-80 transition cursor-pointer ${
        isLoading ? 'opacity-50' : ''
      }`}
    >
      <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
      />
      <AiFillHeart
        size={24}
        className={
          optimisticHasLiked
            ? 'fill-rose-500 animate-pulse'
            : 'fill-neutral-500/70'
        }
      />
      {isLoading && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <span className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></span>
        </span>
      )}
    </div>
  );
}
