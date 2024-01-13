import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import mapPlaceService from '@/service/map/place/service';
import type { PlaceDetails } from '@/types/place-details';

export async function POST(req: NextRequest) {
  const { placeName } = await req.json();
  const apiKey = GOOGLE_MAPS_API_KEY;

  try {
    const placeId: string = await mapPlaceService.getPlaceId(placeName, apiKey);
    const placeDetails: PlaceDetails = await mapPlaceService.getPlaceDetails(placeId, apiKey, 'ja');
    const placePhoto: string = await mapPlaceService.getPlacePhoto(placeDetails.photo, apiKey);

    const response: PlaceDetails = {
      placeId,
      name: placeDetails.name,
      location: placeDetails.location,
      rating: placeDetails.rating,
      userRatingCount: placeDetails.userRatingCount,
      photo: placePhoto, // photo url
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
