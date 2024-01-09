import type { PlaceDetails } from '@/types/place-details';

export interface MapPlaceServiceInterface {
  getPlaceId(placeName: string, apiKey: string): Promise<string>;
  getPlaceDetails(
    placeId: string,
    apiKey: string,
    languageCode: 'en' | 'ja',
  ): Promise<PlaceDetails>;
  getPlacePhoto(photoReference: string, apiKey: string): Promise<string>;
}
