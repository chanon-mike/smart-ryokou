import cacheService from '@/service/cache/service';
import type { DistanceMatrix } from '@/types/distance';
import axios from 'axios';

export const getDistanceMatrixData = async (
  originPlaceId: string,
  destinationPlaceId: string,
  apiKey: string,
): Promise<DistanceMatrix> => {
  try {
    const cacheKey = `distance:origin${originPlaceId},destination${destinationPlaceId}`;
    const cachedResult = await cacheService.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    const response = (
      await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
          key: apiKey,
          destinations: `place_id:${destinationPlaceId}`,
          origins: `place_id:${originPlaceId}`,
          mode: 'driving',
          language: 'ja',
        },
      })
    ).data;

    const data: DistanceMatrix = {
      distance: {
        text: response.rows[0].elements[0].distance.text,
        value: response.rows[0].elements[0].distance.value,
      },
      duration: {
        text: response.rows[0].elements[0].duration.text,
        value: response.rows[0].elements[0].duration.value,
      },
    };
    await cacheService.setKey(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    throw new Error(`An unexpected error occurred while fetching distance matrix: ${error}`);
  }
};
