import axios from 'axios';

export const getPlacePhoto = async (photoId: string, apiKey: string): Promise<string> => {
  try {
    // const cacheKey = `placePhoto:${photoId}`;
    // const cachedResult = await cacheService.getKey(cacheKey);

    // if (cachedResult !== null) {
    //   return cachedResult;
    // }

    const response = (
      await axios.get(`https://places.googleapis.com/v1/${photoId}/media`, {
        params: {
          key: apiKey,
          maxHeightPx: 2000,
          maxWidthPx: 2000,
        },
        responseType: 'arraybuffer',
      })
    ).data;

    const photoInBase64 = Buffer.from(response, 'binary').toString('base64');
    // await cacheService.setKey(cacheKey, photoInBase64);

    return photoInBase64;
  } catch (error) {
    throw new Error(`An unexpected error occurred while fetching place photo ${error}`);
  }
};
