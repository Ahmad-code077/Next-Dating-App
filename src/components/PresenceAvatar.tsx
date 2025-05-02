import usePresenceStore from '@/hooks/usePresenceStore';
import { Avatar, Badge } from '@heroui/react';
import React from 'react';

type Props = {
  userId?: string;
  src?: string | null;
};

export default function PresenceAvatar({ userId, src }: Props) {
  // const { membersId } = usePresenceStore((state) => ({
  //   membersId: state.membersId,
  // }));
  const membersId = usePresenceStore((state) => state.membersId);

  const isOnline = userId && membersId.indexOf(userId) !== -1;

  return (
    <Badge content='' color='success' shape='circle' isInvisible={!isOnline}>
      <Avatar src={src || '/images/user.png'} alt='User avatar' />
    </Badge>
  );
}
