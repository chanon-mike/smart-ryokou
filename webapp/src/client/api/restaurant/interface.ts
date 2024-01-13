import type { ApiContext } from '@/client/apiContext';
import type { Location } from '@/types/recommendation';

export type GetRestaurantInterface = (
  context: ApiContext,
  request: GetRestaurantRequest,
) => Promise<GetRestaurantResponse>;

export interface GetRestaurantRequest {
  latitude: number;
  longitude: number;
}

export type GetRestaurantResponse = Location[];
