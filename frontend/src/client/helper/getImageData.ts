import cacheClient from '@/client/service/cache/implement';
import axios from 'axios';

export const getImageData = async (
  placeName: string,
  apiKey: string,
  cx: string,
): Promise<string> => {
  try {
    // Cache location data
    const cacheKey = `image:${placeName}`;
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
    let imageData;
    if (response.items) {
      imageData = response.items[0].link;
      cacheClient.setKey(cacheKey, JSON.stringify(imageData));
    } else {
      // When google cannot find image, use default
      imageData =
        'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk';
    }

    return imageData;
  } catch (error) {
    throw new Error('An unexpected error occurred while fetching image data');
  }
};
