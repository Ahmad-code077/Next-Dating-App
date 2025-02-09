'use client';
import { calculateYear } from '@/lib/utils';
import { Card, CardBody, CardFooter } from '@heroui/react';
import { Member } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from '../LikeButton';

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
        className='border-none bg-card'
        radius='lg'
        isPressable
      >
        <CardBody className='overflow-visible p-0 '>
          <Image
            alt={member.name}
            className='w-full object-cover'
            width={300}
            height={200}
            src={member.image as string}
          />
          <div onClick={preventLinkAction}>
            <div className='absolute top-3 right-3 z-50'>
              <LikeButton targetId={member.userId} hasLiked={hasLiked} />
            </div>
          </div>
        </CardBody>
        <CardFooter className='text-small justify-between py-6 bg-card'>
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
