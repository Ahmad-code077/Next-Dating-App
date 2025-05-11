'use client';
import { calculateYear } from '@/lib/utils';
import { Card, CardBody, CardFooter } from '@heroui/react';
import { Member } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from '../LikeButton';
import PresenceDot from '../PresenceDot';

type Props = {
  member: Member;
  likeIds: string[];
};
const MemberCard = ({ member, likeIds }: Props) => {
  const hasLiked = likeIds.includes(member.userId);
  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <section>
      <Card
        isFooterBlurred
        as={Link}
        href={`/members/${member?.userId}`}
        className='border-none bg-card w-full aspect-[3/4] '
        radius='lg'
        isPressable
      >
        <CardBody className='overflow-visible p-0 relative h-full '>
          <div className='relative w-full h-full'>
            <Image
              alt={member.name}
              className='object-cover'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              src={(member.image as string) || '/images/user.png'}
              priority
            />
            <div onClick={preventLinkAction}>
              <div className='absolute top-3 right-3 z-10'>
                <LikeButton targetId={member.userId} hasLiked={hasLiked} />
              </div>
              <div className='absolute top-2 left-2 z-20'>
                <PresenceDot member={member} />
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className='text-small justify-between py-6 bg-card/60 backdrop-blur-md'>
          <b>
            {member.name} , {calculateYear(member?.dateOfBirth)}
          </b>

          <p className='text-default-500 capitalize'>{member.gender}</p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default MemberCard;
