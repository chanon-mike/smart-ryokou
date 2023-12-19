import type { PlaceDetails } from '@/types/place-details';

export interface MapPlaceServiceInterface {
  getPlaceData(placeName: string): Promise<PlaceDetails>;
}
