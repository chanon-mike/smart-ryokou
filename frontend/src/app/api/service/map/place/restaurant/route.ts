import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import getRestaurantData from './getRestaurantData';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';

export async function POST(req: NextRequest) {
  const { latitude, longitude } = await req.json();
  const apiKey = GOOGLE_MAPS_API_KEY;

  try {
    const restaurantData = await getRestaurantData(latitude, longitude, apiKey);
    return NextResponse.json(restaurantData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
