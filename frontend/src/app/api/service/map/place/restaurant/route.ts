import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import getRestaurantData from './getRestaurantData';

export async function POST(req: NextRequest) {
  const { latitude, longitude, apiKey } = await req.json();

  try {
    const restaurantData = await getRestaurantData(latitude, longitude, apiKey);
    return NextResponse.json(restaurantData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
