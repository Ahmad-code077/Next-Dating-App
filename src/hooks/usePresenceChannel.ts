import { useCallback, useEffect, useRef } from 'react';
import usePresenceStore from './usePresenceStore';
import { Channel, Members } from 'pusher-js';
import { pusherClient } from '@/lib/pusher';
import { updateLastActive } from '@/app/actions/memberActions';
type PresenceMember = { id: string };

export const usePresenceChannel = (
  userId: string | null,
  profileComplete: boolean
) => {
  const set = usePresenceStore((state) => state.set);
  const add = usePresenceStore((state) => state.add);
  const remove = usePresenceStore((state) => state.remove);

  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (memberIds: string[]) => {
      set(memberIds);
    },
    [set]
  );

  const handleAddMember = useCallback(
    (memberId: string) => {
      add(memberId);
    },
    [add]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      remove(memberId);
    },
    [remove]
  );

  useEffect(() => {
    if (!userId || !profileComplete) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe('presence-love-finder');

      channelRef.current.bind(
        'pusher:subscription_succeeded',
        async (members: Members) => {
          handleSetMembers(Object.keys(members.members));
          await updateLastActive();
        }
      );

      channelRef.current.bind(
        'pusher:member_added',
        (member: PresenceMember) => {
          handleAddMember(member.id);
        }
      );

      channelRef.current.bind(
        'pusher:member_removed',
        (member: PresenceMember) => {
          // comming form these
          handleRemoveMember(member.id);
        }
      );
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(
          'pusher:subscription_succeeded',
          handleSetMembers
        );
        channelRef.current.unbind('pusher:member_added', handleAddMember);
        channelRef.current.unbind('pusher:member_removed', handleRemoveMember);
      }
    };
  }, [handleAddMember, handleRemoveMember, handleSetMembers, userId]);
};
