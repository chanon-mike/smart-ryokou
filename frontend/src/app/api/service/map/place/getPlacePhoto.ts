import s3Service from '@/service/s3/service';
import axios from 'axios';

export const getPlacePhoto = async (photoId: string, apiKey: string): Promise<string> => {
  try {
    const PhotoUrlS3 = await s3Service.getObjectUrl(`${photoId}.jpg`);
    if (PhotoUrlS3 !== null) {
      return PhotoUrlS3;
    }

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
    const photoInBase64 = Buffer.from(response, 'binary');

    // Return the url of the uploaded image
    return await s3Service.uploadJpgPhoto(`${photoId}.jpg`, photoInBase64);
  } catch (error) {
    throw new Error(`An unexpected error occurred while fetching place photo ${error}`);
  }
};
