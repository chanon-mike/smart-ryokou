import type { Location } from '@/types/recommendation';

export interface MapPlaceRestaurantServiceInterface {
  getRestaurantData: (lat: number, lng: number, apiKey: string) => Promise<Location[]>;
}
