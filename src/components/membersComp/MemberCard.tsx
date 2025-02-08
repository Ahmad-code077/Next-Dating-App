import { calculateYear } from '@/lib/utils';
import { Card, CardBody, CardFooter } from '@heroui/react';
import { Member } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  member: Member;
};
const MemberCard = ({ member }: Props) => {
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
        </CardBody>
        <CardFooter className='text-small justify-between py-6'>
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
