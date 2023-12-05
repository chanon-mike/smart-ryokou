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
        headers: {
          key: apiKey,
          fields: 'displayName,formatted_address,location,photos,rating,userRatingCount',
          languageCode,
        },
      })
    ).data;

    const data = {
      name: response.displayName.text,
      address: response.formatted_address,
      location: {
        lat: response.location.lat,
        lng: response.location.lng,
      },
      rating: response.rating,
      userRatingCount: response.userRatingCount,
      photo: response.photos[0].name,
    };
    await cacheService.setKey(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    throw new Error('An unexpected error occurred while fetching place details');
  }
};
