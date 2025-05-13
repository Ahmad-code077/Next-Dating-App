import React from 'react';
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from '../actions/likeActions';
import ListsTab from './ListsTab';

export const dynamic = 'force-dynamic';

export default async function ListsPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const searchParam = (await searchParams).type;
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParam);
  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  );
}
