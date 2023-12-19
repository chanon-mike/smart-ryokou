import type { PlaceDetails } from '@/types/place-details';
import type { Location } from '@/types/recommendation';

export interface MapPlaceServiceInterface {
  getPlaceData(placeName: string): Promise<PlaceDetails>;
  getRestaurantData(latitude: number, longitude: number): Promise<Location[]>;
}
