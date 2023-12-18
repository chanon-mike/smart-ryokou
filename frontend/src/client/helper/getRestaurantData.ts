// TODO: move this to api layer

import cacheClient from '@/client/service/cache/implement';
import type { Location } from '@/types/recommendation';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import axios from 'axios';

interface LocationRestriction {
  circle: {
    center: { latitude: number; longitude: number };
    radius: number;
  };
}

interface RequestBody {
  includedTypes: string[];
  languageCode: string;
  maxResultCount: number;
  locationRestriction: LocationRestriction;
}

interface Place {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  displayName: {
    text: string;
    languageCode: string; // ja
  };
}

const getImageFromPlaceID = () => {
  return 'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk';
};

const getRestaurantData = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const cacheKey = `restaurant:${latitude},${longitude}`;
    const cachedResult = await cacheClient.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.id,places.location', // Modify this based on your requirements
    };

    // If not cached, fetch from google maps api
    const requestBody: RequestBody = {
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

    const url = 'https://places.googleapis.com/v1/places:searchNearby';

    try {
      const response = await axios.post(url, requestBody, { headers });

      console.log('response', response);

      const places: Array<Place> = response.data.places;
      console.log('places', places);
      const restaurants: Array<Location> = places.map((p) => {
        return {
          name: p.displayName.text,
          description: '',
          imageUrl: getImageFromPlaceID(), // consider using template restaurant image
          lat: p.location.latitude,
          lng: p.location.longitude,
        };
      });
      console.log('restaurants', restaurants);

      cacheClient.setKey(cacheKey, JSON.stringify(restaurants));
      return restaurants;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  } catch (error) {
    console.log(`error`, error);
    throw new Error('An unexpected error occurred while fetching location data');
  }
};

export default getRestaurantData;
