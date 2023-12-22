import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { DistanceMatrix } from '@/types/distance';
import { getDistanceMatrixData } from './getDistanceMatrixData';

export async function POST(req: NextRequest) {
  const { originPlaceId, destinationPlaceId, apiKey } = await req.json();

  try {
    const response: DistanceMatrix = await getDistanceMatrixData(
      originPlaceId,
      destinationPlaceId,
      apiKey,
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Error: ${error}` }, { status: 400 });
  }
}
