import cacheService from '@/service/cache/service';
import type { PlaceDetails } from '@/types/place-details';
import axios from 'axios';

export const getPlaceDetails = async (
  placeId: string,
  apiKey: string,
  languageCode: 'en' | 'ja',
): Promise<PlaceDetails> => {
  try {
    const cacheKey = `placeDetails:${placeId}`;
    const cachedResult = await cacheService.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    const response = (
      await axios.get(`https://places.googleapis.com/v1/places/${placeId}`, {
        params: {
          key: apiKey,
          fields: 'displayName,formatted_address,location,photos,rating,userRatingCount',
          languageCode,
        },
      })
    ).data;

    const data = {
      name: response.displayName.text,
      location: {
        lat: response.location.latitude,
        lng: response.location.longitude,
      },
      rating: response.rating,
      userRatingCount: response.userRatingCount,
      photo: response.photos[0].name,
    };
    await cacheService.setKey(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    throw new Error(`An unexpected error occurred while fetching place details: ${error}`);
  }
};
