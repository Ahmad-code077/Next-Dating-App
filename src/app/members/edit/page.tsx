import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';

import EditForm from './EditForm';
import CardInnerWrapper from '@/components/CardInnerWrapper';

const MemberEditPage = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  return (
    <CardInnerWrapper
      header='Edit Profile'
      body={<>{member && <EditForm member={member} />}</>}
    />
  );
};
export default MemberEditPage;
