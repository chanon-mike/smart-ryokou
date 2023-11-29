import cacheClient from '@/client/service/cache/implement';
import axios from 'axios';

export const getPlaceId = async (placeName: string, apiKey: string): Promise<string> => {
  try {
    // Cache location data
    const cacheKey = `placeId:${placeName}`;
    const cachedResult = await cacheClient.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    // If not cached, fetch from google search api
    const response = (
      await axios.post(
        'https://places.googleapis.com/v1/places:searchText',
        {
          textQuery: placeName,
        },
        {
          headers: {
            key: apiKey,
          },
        },
      )
    ).data;

    const placeId = response.places[0].id;
    cacheClient.setKey(cacheKey, JSON.stringify(placeId));

    return placeId;
  } catch (error) {
    throw new Error('An unexpected error occurred while fetching place Id');
  }
};
