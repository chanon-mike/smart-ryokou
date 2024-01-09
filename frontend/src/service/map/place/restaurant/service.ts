import axios from 'axios';

import cacheClient from '@/client/service/cache/implement';
import { generateObjectId } from '@/libs/helper';
import cacheService from '@/service/cache/service';
import mapPlaceService from '@/service/map/place/service';
import type { Location } from '@/types/recommendation';

class MapPlaceRestaurantService implements MapPlaceRestaurantService {
  async getRestaurantData(
    latitude: number,
    longitude: number,
    apiKey: string,
  ): Promise<Location[]> {
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

      const places: SearchNearbyResponse[] = response.data.places;
      const restaurants: Location[] = await Promise.all(
        places.map(async (p) => {
          return {
            id: generateObjectId(),
            placeId: p.id,
            name: p.displayName.text,
            description: '',
            photo: await mapPlaceService.getPlacePhoto(p.photos[0].name, apiKey),
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
  }
}

const mapPlaceRestaurantService = new MapPlaceRestaurantService();

export default mapPlaceRestaurantService;

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
