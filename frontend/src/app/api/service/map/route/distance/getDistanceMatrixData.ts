import cacheService from '@/service/cache/service';
import type { DistanceMatrix } from '@/types/distance';
import axios from 'axios';

export const getDistanceMatrixData = async (
  originPlaceId: string,
  destinationPlaceId: string,
  apiKey: string,
): Promise<DistanceMatrix> => {
  const cacheKey = `distance:origin${originPlaceId},destination${destinationPlaceId}`;
  const cachedResult = await cacheService.getKey(cacheKey);

  if (cachedResult !== null) {
    return JSON.parse(cachedResult);
  }

  const response = await getDistanceMatrixFromGoogleMaps(originPlaceId, destinationPlaceId, apiKey);

  try {
    const elements = response.rows[0].elements[0];
    const data: DistanceMatrix = {
      distance: {
        text: elements.distance.text,
        value: elements.distance.value,
      },
      duration: {
        text: elements.duration.text,
        value: elements.duration.value,
      },
    };
    await cacheService.setKey(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    throw new Error('Invalid response from Google Maps API');
  }
};

const getDistanceMatrixFromGoogleMaps = async (
  originPlaceId: string,
  destinationPlaceId: string,
  apiKey: string,
) => {
  try {
    const response = (
      await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
          key: apiKey,
          destinations: `place_id:${destinationPlaceId}`,
          origins: `place_id:${originPlaceId}`,
          language: 'ja',
        },
      })
    ).data;

    // In case of place without calculation result (e.g. Shiretoko Peninsula -> Asahikawa)
    if (response.rows.elements === undefined) {
      return {
        rows: [
          {
            elements: [
              {
                distance: {
                  text: '不明',
                  value: 0,
                },
                duration: {
                  text: '不明',
                  value: 0,
                },
              },
            ],
          },
        ],
      };
    }

    return response;
  } catch (error) {
    throw new Error(`An unexpected error occurred while fetching distance matrix: ${error}`);
  }
};
