import axios from 'axios';

import type {
  GetRestaurantRequest,
  GetRestaurantResponse,
} from '@/client/api/get-restaurant/interface';
import type { ApiContext } from '@/client/ApiContext';
import type { Location } from '@/types/recommendation';

export const getRestaurant = async (context: ApiContext, request: GetRestaurantRequest) => {
  if (context.requireAuth && !context.isAuth) {
    throw new Error('User unauthorized');
  }

  try {
    const response = await axios.post<GetRestaurantResponse>('/api/service/map/place/restaurant', {
      latitude: request.latitude,
      longitude: request.longitude,
    });
    const restaurantData: Location[] = response.data;
    return restaurantData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
