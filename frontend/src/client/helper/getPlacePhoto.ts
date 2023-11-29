import cacheClient from '@/client/service/cache/implement';
import axios from 'axios';

export const getPlacePhoto = async (placeId: string, apiKey: string): Promise<string> => {
  try {
    // Cache location data
    const cacheKey = `placePhoto:${placeId}`;
    const cachedResult = await cacheClient.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    // If not cached, fetch from google search api
    const response = (
      await axios.get(`https://places.googleapis.com/v1/${placeId}/media`, {
        headers: {
          key: apiKey,
          maxHeightPx: 100,
          maxWidthPx: 100,
        },
      })
    ).data;

    cacheClient.setKey(cacheKey, JSON.stringify(response));

    return response;
  } catch (error) {
    throw new Error('An unexpected error occurred while fetching place photo');
  }
};
