import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';

import EditForm from './EditForm';

const MemberEditPage = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  return (
    <section className='p-6'>{member && <EditForm member={member} />}</section>
  );
};
export default MemberEditPage;
