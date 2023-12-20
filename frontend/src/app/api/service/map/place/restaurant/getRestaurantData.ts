import cacheClient from '@/client/service/cache/implement';
import type { Location } from '@/types/recommendation';
import axios from 'axios';
import { getPlacePhoto } from '../getPlacePhoto';
import { generateObjectId } from '@/libs/helper';
import cacheService from '@/service/cache/service';

interface LocationRestriction {
  circle: {
    center: { latitude: number; longitude: number };
    radius: number;
  };
}

interface SearchNearbyRequestBody {
  includedTypes: string[];
  languageCode: string;
  maxResultCount: number;
  locationRestriction: LocationRestriction;
}

interface SearchNearbyResponse {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  displayName: {
    text: string;
    languageCode: string; // ja
  };
  rating: number;
  userRatingCount: number;
  photos: [
    {
      name: string;
    },
  ];
}

const getRestaurantData = async (
  latitude: number,
  longitude: number,
  apiKey: string,
): Promise<Location[]> => {
  const cacheKey = `restaurant:${latitude},${longitude}`;
  const cachedResult = await cacheService.getKey(cacheKey);

  if (cachedResult !== null) {
    return JSON.parse(cachedResult);
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask':
      'places.displayName,places.id,places.location,places.rating,places.userRatingCount,places.photos',
  };

  const requestBody: SearchNearbyRequestBody = {
    includedTypes: ['restaurant'],
    maxResultCount: 5,
    languageCode: 'ja',
    locationRestriction: {
      circle: {
        center: { latitude, longitude },
        radius: 1500,
      },
    },
  };

  try {
    const response = await axios.post(
      'https://places.googleapis.com/v1/places:searchNearby',
      requestBody,
      { headers },
    );

    const places: Array<SearchNearbyResponse> = response.data.places;
    const restaurants: Array<Location> = await Promise.all(
      places.map(async (p) => {
        console.log('Restaurant:', p.displayName.text, p.location.latitude, p.location.longitude);
        return {
          id: generateObjectId(),
          placeId: p.id,
          name: p.displayName.text,
          description: '',
          photo: await getPlacePhoto(p.photos[0].name, apiKey),
          rating: p.rating,
          userRatingCount: p.userRatingCount,
          lat: p.location.latitude,
          lng: p.location.longitude,
        };
      }),
    );

    cacheClient.setKey(cacheKey, JSON.stringify(restaurants));
    return restaurants;
  } catch (error) {
    console.error('An unexpected error occurred while fetching restaurant data', error);
    return [];
  }
};

export default getRestaurantData;
