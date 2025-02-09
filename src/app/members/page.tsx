import MemberCard from '@/components/membersComp/MemberCard';
import { getMembers } from '../actions/memberActions';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';

const MembersPage = async () => {
  const members = await getMembers();
  const likeIds = await fetchCurrentUserLikeIds();
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-12 my-12'>
      {members &&
        members.map((member) => {
          return (
            <MemberCard key={member.userId} member={member} likeIds={likeIds} />
          );
        })}
    </section>
  );
};
export default MembersPage;
