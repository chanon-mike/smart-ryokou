import cacheClient from '@/client/service/cache/implement';
import axios from 'axios';

export const getImageData = async (
  placeName: string,
  apiKey: string,
  cx: string,
): Promise<string> => {
  try {
    // Cache location data
    const cacheKey = `location:${placeName}`;
    const cachedResult = await cacheClient.getKey(cacheKey);

    if (cachedResult !== null) {
      return JSON.parse(cachedResult);
    }

    // If not cached, fetch from google search api
    const response = (
      await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${placeName}&key=${apiKey}&cx=${cx}&searchType=image`,
      )
    ).data;
    const imageData = response.items[0].link;

    cacheClient.setKey(cacheKey, JSON.stringify(imageData));

    return imageData;
  } catch (error) {
    throw new Error('An unexpected error occurred while fetching image data');
  }
};
