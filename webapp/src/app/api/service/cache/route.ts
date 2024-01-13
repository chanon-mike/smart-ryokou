import type { NextRequest } from 'next/server';

import cacheService from '@/service/cache/service';

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');

  if (!key) {
    return Response.error();
  }

  try {
    const data = await cacheService.getKey(key as string);
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { key, value } = data;

  if (!key || !value) {
    return Response.error();
  }

  try {
    await cacheService.setKey(key, value);
    return Response.json({ message: 'Key and value set successfully' });
  } catch (error) {
    console.error('Error setting data in cache:', error);
    return Response.error();
  }
}
