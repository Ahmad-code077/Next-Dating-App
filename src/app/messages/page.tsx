import { getMessagesByContainer } from '../actions/messageActions';
import MessageSidebar from './MessageSidebar';
import MessageTable from './MessageTable';

export default async function MessagePage({
  searchParams,
}: {
  searchParams: Promise<{ container: string }>;
}) {
  const container = (await searchParams).container;
  const messages = await getMessagesByContainer(container);

  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
      <div className='col-span-2'>
        <MessageSidebar />
      </div>
      <div className='col-span-10'>
        <MessageTable initialMessages={messages} />
      </div>
    </div>
  );
}
