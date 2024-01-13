import axios from 'axios';

import cacheService from '@/server/service/cache/service';
import type { MapPlaceServiceInterface } from '@/server/service/map/place/interface';
import s3Service from '@/server/service/s3/service';
import type { PlaceDetails } from '@/types/place-details';

class MapPlaceService implements MapPlaceServiceInterface {
  async getPlaceId(placeName: string, apiKey: string): Promise<string> {
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
  }

  async getPlaceDetails(
    placeId: string,
    apiKey: string,
    languageCode: 'en' | 'ja',
  ): Promise<PlaceDetails> {
    try {
      const cacheKey = `placeDetails:${placeId}`;
      const cachedResult = await cacheService.getKey(cacheKey);

      if (cachedResult !== null) {
        return JSON.parse(cachedResult);
      }

      const response = (
        await axios.get(`https://places.googleapis.com/v1/places/${placeId}`, {
          params: {
            key: apiKey,
            fields: 'displayName,formatted_address,location,photos,rating,userRatingCount',
            languageCode,
          },
        })
      ).data;

      const data = {
        placeId,
        name: response.displayName.text,
        location: {
          lat: response.location.latitude,
          lng: response.location.longitude,
        },
        rating: response.rating,
        userRatingCount: response.userRatingCount,
        photo: response.photos[0].name,
      };
      await cacheService.setKey(cacheKey, JSON.stringify(data));

      return data;
    } catch (error) {
      throw new Error(`An unexpected error occurred while fetching place details: ${error}`);
    }
  }

  async getPlacePhoto(photoId: string, apiKey: string): Promise<string> {
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
  }
}

const mapPlaceService = new MapPlaceService();

export default mapPlaceService;
