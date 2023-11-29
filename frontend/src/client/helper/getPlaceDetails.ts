import cacheClient from '@/client/service/cache/implement';
import type { PlaceDetails } from '@/types/place-details';
import axios from 'axios';

export const getPlaceDetails = async (
  placeId: string,
  apiKey: string,
  languageCode: 'en' | 'ja',
): Promise<PlaceDetails> => {
  try {
    // Cache location data
    const cacheKey = `placeDetails:${placeId}`;
    const cachedResult = await cacheClient.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    // If not cached, fetch from google search api
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
    cacheClient.setKey(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    throw new Error('An unexpected error occurred while fetching place details');
  }
};
