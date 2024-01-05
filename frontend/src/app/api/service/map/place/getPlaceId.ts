// import cacheClient from '@/client/service/cache/implement';
import axios from 'axios';

import cacheService from '@/service/cache/service';

export const getPlaceId = async (placeName: string, apiKey: string): Promise<string> => {
  try {
    const cacheKey = `placeId:${placeName}`;
    const cachedResult = await cacheService.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    const response = (
      await axios.post(
        'https://places.googleapis.com/v1/places:searchText',
        {
          textQuery: placeName,
        },
        {
          headers: {
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id',
          },
        },
      )
    ).data;

    const placeId = response.places[0].id;
    await cacheService.setKey(cacheKey, JSON.stringify(placeId));

    return placeId;
  } catch (error) {
    throw new Error(`An unexpected error occurred while fetching place Id ${error}`);
  }
};
