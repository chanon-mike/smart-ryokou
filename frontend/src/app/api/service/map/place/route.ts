import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getPlaceId } from './getPlaceId';
import type { PlaceDetails } from '@/types/place-details';
import { getPlaceDetails } from './getPlaceDetails';
import { getPlacePhoto } from './getPlacePhoto';

export async function POST(req: NextRequest) {
  const { placeName, apiKey } = await req.json();

  try {
    const placeId: string = await getPlaceId(placeName, apiKey);
    const placeDetails: PlaceDetails = await getPlaceDetails(placeId, apiKey, 'ja');
    const placePhoto: string = await getPlacePhoto(placeId, apiKey);

    const response: PlaceDetails = {
      name: placeDetails.name,
      address: placeDetails.address,
      location: placeDetails.location,
      rating: placeDetails.rating,
      userRatingCount: placeDetails.userRatingCount,
      photo: placePhoto,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `An unexpected error occurred while fetching place: ${error}` },
      { status: 500 },
    );
  }
}
