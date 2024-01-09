import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import mapRouteService from '@/service/map/route/service';
import type { DistanceMatrix } from '@/types/distance';

const defaultDistanceMatrix: DistanceMatrix = {
  distance: {
    text: '不明',
    value: 0,
  },
  duration: {
    text: '不明',
    value: 0,
  },
};

export async function GET(req: NextRequest) {
  const originPlaceId = req.nextUrl.searchParams.get('originPlaceId');
  const destinationPlaceId = req.nextUrl.searchParams.get('destinationPlaceId');
  const apiKey = GOOGLE_MAPS_API_KEY;

  if (!originPlaceId || !destinationPlaceId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const response: DistanceMatrix = await mapRouteService.getDistanceMatrixData(
      originPlaceId,
      destinationPlaceId,
      apiKey,
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    // return NextResponse.json({ error }, { status: 400 });
    // Return default value instead of error
    return NextResponse.json(defaultDistanceMatrix);
  }
}
