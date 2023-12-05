import cacheService from '@/service/cache/service';
import axios from 'axios';

export const getPlacePhoto = async (photoId: string, apiKey: string): Promise<string> => {
  try {
    const cacheKey = `placePhoto:${photoId}`;
    const cachedResult = await cacheService.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    const response = (
      await axios.get(`https://places.googleapis.com/v1/${photoId}/media`, {
        params: {
          key: apiKey,
          maxHeightPx: 100,
          maxWidthPx: 100,
        },
      })
    ).data;

    await cacheService.setKey(cacheKey, JSON.stringify(response));

    return response;
  } catch (error) {
    throw new Error(`An unexpected error occurred while fetching place photo ${error}`);
  }
};
