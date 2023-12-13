import s3Service from '@/service/s3/service';
import axios from 'axios';

export const getPlacePhoto = async (photoId: string, apiKey: string): Promise<string> => {
  try {
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

    const responseS3 = await s3Service.uploadJpgPhoto(`${photoId}.jpg`, photoInBase64);
    console.log(responseS3);
    return responseS3;
  } catch (error) {
    throw new Error(`An unexpected error occurred while fetching place photo ${error}`);
  }
};
