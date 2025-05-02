import { auth } from '@/auth';
import { pusherServer } from '@/lib/pusher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response('Unauthorised', { status: 401 });
  }

  const body = await request.formData();

  console.log('body at the route of  api/pusher-auth 😋😋😋😎', body);
  const socketId = body.get('socket_id') as string;
  const channel = body.get('channel_name') as string;
  const data = {
    user_id: session.user.id,
  };
  console.log('📡 socketId:', socketId);
  console.log('📡 channel:', channel);
  const authResonse = pusherServer.authorizeChannel(socketId, channel, data);

  return NextResponse.json(authResonse);
}
