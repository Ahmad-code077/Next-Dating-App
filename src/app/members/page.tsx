import MemberCard from '@/components/membersComp/MemberCard';
import { getMembers } from '../actions/memberActions';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';
import PaginationComponent from '@/components/PaginationComponent';
import { GetMemberParams } from '@/types';
import EmptyState from '@/components/EmptyState';

const MembersPage = async ({
  searchParams,
}: {
  searchParams: Promise<GetMemberParams>;
}) => {
  const searchParamdata = await searchParams;
  const { items: members, totalCount } = await getMembers(searchParamdata);
  const likeIds = await fetchCurrentUserLikeIds();

  if (members.length === 0) return <EmptyState />;

  return (
    <>
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-12 my-12'>
        {members &&
          members.map((member) => {
            return (
              <MemberCard
                key={member.userId}
                member={member}
                likeIds={likeIds}
              />
            );
          })}
      </section>
      <PaginationComponent totalCount={totalCount} />
    </>
  );
};
export default MembersPage;
