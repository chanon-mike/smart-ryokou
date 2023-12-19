import type { Location } from '@/types/recommendation';
import type { ApiContext } from '../../ApiContext';

export type GetRestaurantInterface = (
  context: ApiContext,
  request: GetRestaurantRequest,
) => Promise<GetRestaurantResponse>;

export interface GetRestaurantRequest {
  latitude: number;
  longitude: number;
}

export type GetRestaurantResponse = Location[];
