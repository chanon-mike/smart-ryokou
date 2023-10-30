import sessionRepositoryPromise from '@/service/database/session/repository';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return Response.error();
  }

  const sessionRepository = await sessionRepositoryPromise;
  const session = await sessionRepository.find(id);

  if (session) {
    return NextResponse.json({ session });
  } else {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const sessionRepository = await sessionRepositoryPromise;

  try {
    const insertedId = await sessionRepository.insert(data);
    return NextResponse.json({ message: 'Session created', sessionId: insertedId });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const sessionRepository = await sessionRepositoryPromise;

  const success = await sessionRepository.update(data);

  if (success) {
    return NextResponse.json({ message: 'Session updated' });
  } else {
    return NextResponse.error();
  }
}
